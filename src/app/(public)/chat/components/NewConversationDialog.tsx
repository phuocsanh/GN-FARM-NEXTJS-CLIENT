'use client';

import { useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, User } from 'lucide-react';

interface NewConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewConversationDialog({
  open,
  onOpenChange,
}: NewConversationDialogProps) {
  const [conversationType, setConversationType] = useState<'direct' | 'group'>('direct');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { createConversation, setActiveConversation } = useChatStore();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // This is a mock implementation - in a real app, you'd use the chat client to search users
      // const results = await chatClient.searchUsers(searchQuery);
      
      // Mock search results
      const mockResults = [
        { id: '1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
        { id: '2', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
        { id: '3', name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateConversation = async () => {
    try {
      if (selectedUsers.length === 0) {
        return;
      }
      
      const name = conversationType === 'group' ? groupName : null;
      const conversation = await createConversation(conversationType, name, selectedUsers);
      
      // Set the new conversation as active
      setActiveConversation(conversation.conversationId);
      
      // Close the dialog
      onOpenChange(false);
      
      // Reset form
      setSearchQuery('');
      setGroupName('');
      setSelectedUsers([]);
      setSearchResults([]);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Conversation type selection */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={conversationType === 'direct' ? 'default' : 'outline'}
              onClick={() => setConversationType('direct')}
              className="flex-1"
            >
              <User className="h-4 w-4 mr-2" />
              Direct Message
            </Button>
            <Button
              type="button"
              variant={conversationType === 'group' ? 'default' : 'outline'}
              onClick={() => setConversationType('group')}
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              Group Chat
            </Button>
          </div>
          
          {/* Group name (for group chats) */}
          {conversationType === 'group' && (
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
          )}
          
          {/* User search */}
          <div className="space-y-2">
            <Label htmlFor="user-search">
              {conversationType === 'direct' ? 'Search User' : 'Search Users'}
            </Label>
            <div className="flex space-x-2">
              <Input
                id="user-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Selected users */}
          {selectedUsers.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Users</Label>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map(userId => {
                  const user = searchResults.find(u => u.id === userId);
                  return (
                    <div 
                      key={userId}
                      className="flex items-center bg-accent rounded-full pl-1 pr-2 py-1"
                    >
                      <Avatar className="h-6 w-6 mr-1">
                        <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`} />
                        <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user?.name || `User ${userId}`}</span>
                      <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => toggleUserSelection(userId)}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Label>Search Results</Label>
              <div className="border rounded-md divide-y max-h-40 overflow-y-auto">
                {searchResults.map(user => (
                  <button
                    key={user.id}
                    type="button"
                    className="flex items-center w-full p-2 hover:bg-accent text-left"
                    onClick={() => toggleUserSelection(user.id)}
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    {selectedUsers.includes(user.id) && (
                      <span className="ml-auto">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreateConversation}
            disabled={
              selectedUsers.length === 0 || 
              (conversationType === 'group' && !groupName.trim())
            }
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
