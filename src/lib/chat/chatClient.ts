import { io, Socket } from "socket.io-client"

export interface Message {
  messageId: string
  conversationId: string
  sender: string
  senderInfo?: {
    id: string
    name: string
    avatar?: string
  }
  content: string
  attachments?: string[]
  createdAt: Date
}

export interface Conversation {
  conversationId: string
  type: "direct" | "group"
  name?: string
  participants: {
    userId: string
    role: string
    joinedAt: Date
  }[]
  lastMessage?: {
    content: string
    sender: string
    timestamp: Date
  }
  createdAt: Date
  updatedAt: Date
}

export interface UserStatus {
  userId: string
  status: "online" | "offline"
}

export interface UserTyping {
  conversationId: string
  userId: string
  isTyping: boolean
}

export interface MessageRead {
  conversationId: string
  messageId: string
  userId: string
}

export interface ChatClientHandlers {
  onMessage: (message: Message) => void
  onConversationJoined: (data: { conversationId: string }) => void
  onMessageSent: (message: Partial<Message>) => void
  onMessageRead: (data: MessageRead) => void
  onUserTyping: (data: UserTyping) => void
  onUserStatus: (data: UserStatus) => void
  onError: (error: any) => void
}

export class GNChatClient {
  private apiUrl: string
  private socketUrl: string
  private authToken: string
  private socket: Socket | null = null
  public conversations: Conversation[] = []
  public currentConversation: string | null = null
  private handlers: ChatClientHandlers = {
    onMessage: () => {},
    onConversationJoined: () => {},
    onMessageSent: () => {},
    onMessageRead: () => {},
    onUserTyping: () => {},
    onUserStatus: () => {},
    onError: () => {},
  }

  constructor(apiUrl: string, socketUrl: string, authToken: string) {
    this.apiUrl = apiUrl
    this.socketUrl = socketUrl
    this.authToken = authToken
  }

  // Initialize the chat client
  async init(): Promise<boolean> {
    try {
      if (!this.authToken) {
        console.error("Authentication token is missing")
        return false
      }

      console.log(
        "Connecting to socket server with token:",
        this.authToken ? "Token exists" : "No token"
      )

      // Connect to socket server with auth token in query params AND auth object
      // Một số server có thể sử dụng query params, một số khác sử dụng auth object
      const socketPath = process.env.NEXT_PUBLIC_SOCKET_PATH || "/socket.io"
      console.log("Socket path:", socketPath)

      this.socket = io(this.socketUrl, {
        auth: {
          token: this.authToken,
        },
        query: {
          token: this.authToken,
        },
        path: socketPath,
        transports: ["websocket", "polling"], // Thử cả websocket và polling
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000, // Tăng timeout lên 10 giây
      })

      // Thêm event listener cho lỗi kết nối
      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message)
      })

      // Set up event listeners
      this.setupSocketListeners()

      // Load initial conversations
      try {
        await this.loadConversations()
      } catch (error) {
        console.error("Failed to load conversations:", error)
        // Không return false ở đây, vẫn cho phép kết nối socket thành công
      }

      return true
    } catch (error) {
      console.error("Failed to initialize chat client:", error)
      return false
    }
  }

  // Set up socket event listeners
  private setupSocketListeners(): void {
    if (!this.socket) return

    this.socket.on("connect", () => {
      console.log("Connected to chat server")
      console.log("Socket ID:", this.socket?.id)
    })

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from chat server. Reason:", reason)
    })

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message)
    })

    this.socket.on("connect_timeout", () => {
      console.error("Connection timeout")
    })

    this.socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to chat server after", attemptNumber, "attempts")
    })

    this.socket.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error.message)
    })

    this.socket.on("reconnect_failed", () => {
      console.error("Failed to reconnect to chat server")
    })

    this.socket.on("message:new", (message: Message) => {
      console.log("New message received:", message)
      this.handlers.onMessage(message)
    })

    this.socket.on(
      "conversation:joined",
      (data: { conversationId: string }) => {
        console.log("Joined conversation:", data.conversationId)
        this.handlers.onConversationJoined(data)
      }
    )

    this.socket.on("message:sent", (message: Partial<Message>) => {
      console.log("Message sent confirmation:", message)
      this.handlers.onMessageSent(message)
    })

    this.socket.on("message:read", (data: MessageRead) => {
      console.log("Message read:", data)
      this.handlers.onMessageRead(data)
    })

    this.socket.on("user:typing", (data: UserTyping) => {
      console.log("User typing:", data)
      this.handlers.onUserTyping(data)
    })

    this.socket.on("user:status", (data: UserStatus) => {
      console.log("User status update:", data)
      this.handlers.onUserStatus(data)
    })

    this.socket.on("error", (error: any) => {
      console.error("Socket error:", error)
      this.handlers.onError(error)
    })

    // Thêm event listener cho authentication error
    this.socket.on("auth_error", (error: any) => {
      console.error("Authentication error:", error)
      this.handlers.onError(error)
    })
  }

  // Register event handlers
  on<K extends keyof ChatClientHandlers>(
    event: K,
    handler: ChatClientHandlers[K]
  ): void {
    this.handlers[event] = handler
  }

  // Load user conversations
  async loadConversations(): Promise<Conversation[]> {
    try {
      const response = await fetch(`${this.apiUrl}/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to load conversations")
      }

      const data = await response.json()
      this.conversations = data.data
      return this.conversations
    } catch (error) {
      console.error("Error loading conversations:", error)
      throw error
    }
  }

  // Join a conversation
  joinConversation(conversationId: string): void {
    this.currentConversation = conversationId
    this.socket?.emit("conversation:join", { conversationId })
  }

  // Send a message
  sendMessage(content: string, attachments: string[] = []): void {
    if (!this.currentConversation) {
      throw new Error("No active conversation")
    }

    this.socket?.emit("message:send", {
      conversationId: this.currentConversation,
      content,
      attachments,
    })
  }

  // Mark message as read
  markMessageAsRead(messageId: string): void {
    if (!this.currentConversation) {
      throw new Error("No active conversation")
    }

    this.socket?.emit("message:read", {
      conversationId: this.currentConversation,
      messageId,
    })
  }

  // Send typing indicator
  sendTypingStatus(isTyping: boolean): void {
    if (!this.currentConversation) {
      throw new Error("No active conversation")
    }

    this.socket?.emit("user:typing", {
      conversationId: this.currentConversation,
      isTyping,
    })
  }

  // Create a new conversation
  async createConversation(
    type: "direct" | "group",
    name: string | null,
    participants: string[]
  ): Promise<Conversation> {
    try {
      const response = await fetch(`${this.apiUrl}/chat/conversations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          name,
          participants,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create conversation")
      }

      const data = await response.json()
      this.conversations.push(data.data)
      return data.data
    } catch (error) {
      console.error("Error creating conversation:", error)
      throw error
    }
  }

  // Load messages for a conversation
  async loadMessages(
    conversationId: string,
    limit = 50,
    before: string | null = null
  ): Promise<Message[]> {
    try {
      let url = `${this.apiUrl}/chat/conversations/${conversationId}/messages?limit=${limit}`
      if (before) {
        url += `&before=${before}`
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to load messages")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error loading messages:", error)
      throw error
    }
  }

  // Search users
  async searchUsers(query: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}/users?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to search users")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error searching users:", error)
      throw error
    }
  }

  // Disconnect from chat server
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}
