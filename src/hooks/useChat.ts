import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: "Hello! I'm TheraBot, your mental health companion. I'm here to listen and support you. How are you feeling today?",
        isBot: true,
        timestamp: new Date()
      }
    ],
    isLoading: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    try {
      // Simulate API call - replace with actual API integration
      const response = await callGroqBackend(content);

      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }));
    }
  }, []);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    sendMessage,
    messagesEndRef
  };
};

const callGroqBackend = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch("https://therabot-backend-6ier.onrender.com/api/chat", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    if (data.reply) {
      return data.reply;
    } else {
      return "I'm here for you, but I had trouble understanding. Can you try again?";
    }
  } catch (error) {
    console.error("Groq backend error:", error);
    return "I'm sorry, I couldn't connect right now. Please try again shortly.";
  }
};
