'use client';

import { useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import ConversationList from './ConversationList';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import NewConversationDialog from './NewConversationDialog';

export default function ChatLayout() {
  const { isInitialized, activeConversationId } = useChatStore();
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Connecting to chat...</h2>
          <p className="text-muted-foreground">Please wait while we connect to the chat service.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar with conversations */}
      <div className="w-80 border-r border-border flex flex-col h-full">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-semibold text-xl">Conversations</h2>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsNewConversationOpen(true)}
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full">
        {activeConversationId ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ChatMessages conversationId={activeConversationId} />
            </div>
            <div className="border-t border-border p-4">
              <MessageInput />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-semibold mb-2">Select a conversation</h2>
              <p className="text-muted-foreground mb-4">
                Choose an existing conversation from the sidebar or start a new one.
              </p>
              <Button onClick={() => setIsNewConversationOpen(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Start a new conversation
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New conversation dialog */}
      <NewConversationDialog 
        open={isNewConversationOpen} 
        onOpenChange={setIsNewConversationOpen} 
      />
    </div>
  );
}
