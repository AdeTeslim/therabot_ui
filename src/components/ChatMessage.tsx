import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex items-start gap-3 mb-4 animate-slide-in ${isBot ? 'justify-start' : 'justify-end flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot 
          ? 'bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600' 
          : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'
      }`}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${isBot ? 'items-start' : 'items-end'} flex flex-col`}>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
          isBot 
            ? 'bg-white text-gray-800 rounded-tl-md' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};