'use client';

import { useChatStore } from '@/stores/chatStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function ConversationList() {
  const { conversations, activeConversationId, setActiveConversation, userStatuses } = useChatStore();

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No conversations yet. Start a new one!
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {conversations.map((conversation) => {
        // For direct conversations, get the other participant
        const otherParticipant = conversation.type === 'direct' 
          ? conversation.participants.find(p => p.userId !== 'current-user-id') // Replace with actual user ID
          : null;
        
        // Determine conversation name
        const conversationName = conversation.type === 'direct' && otherParticipant
          ? `User ${otherParticipant.userId}` // Replace with actual user name
          : conversation.name || `Group ${conversation.conversationId}`;
        
        // Determine online status for direct chats
        const isOnline = otherParticipant 
          ? userStatuses[otherParticipant.userId] === 'online'
          : false;
        
        // Get last message preview
        const lastMessagePreview = conversation.lastMessage
          ? conversation.lastMessage.content.length > 30
            ? `${conversation.lastMessage.content.substring(0, 30)}...`
            : conversation.lastMessage.content
          : 'No messages yet';

        return (
          <button
            key={conversation.conversationId}
            className={cn(
              "w-full flex items-center p-3 rounded-lg text-left",
              "hover:bg-accent/50 transition-colors",
              activeConversationId === conversation.conversationId && "bg-accent"
            )}
            onClick={() => setActiveConversation(conversation.conversationId)}
          >
            <div className="relative">
              <Avatar>
                {conversation.type === 'direct' ? (
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant?.userId}`} />
                ) : (
                  <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${conversation.conversationId}`} />
                )}
                <AvatarFallback>
                  {conversationName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {conversation.type === 'direct' && (
                <span className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                  isOnline ? "bg-green-500" : "bg-gray-400"
                )} />
              )}
            </div>
            
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <p className="font-medium truncate">{conversationName}</p>
                {conversation.lastMessage && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {lastMessagePreview}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
