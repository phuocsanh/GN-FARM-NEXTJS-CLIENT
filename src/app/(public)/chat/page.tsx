'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';
import ChatLayout from './components/ChatLayout';

export default function ChatPage() {
  const router = useRouter();
  const { isInitialized, initializeClient } = useChatStore();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Redirect to login if no token
      router.push('/login');
      return;
    }
    
    if (!isInitialized) {
      // Initialize chat client
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
      
      initializeClient(apiUrl, socketUrl, token).catch(error => {
        console.error('Failed to initialize chat:', error);
      });
    }
  }, [isInitialized, initializeClient, router]);

  return (
    <div className="h-screen bg-background">
      <ChatLayout />
    </div>
  );
}
