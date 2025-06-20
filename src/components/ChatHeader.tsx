import React from 'react';
import { Brain, Circle } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
        <Brain className="text-white" size={20} />
      </div>
      
      <div className="flex-1">
        <h1 className="font-semibold text-gray-800 text-lg">TheraBot</h1>
        <div className="flex items-center gap-2">
          <Circle className="text-green-500 fill-current" size={8} />
          <span className="text-sm text-gray-500">Online - Here to help</span>
        </div>
      </div>
    </div>
  );
};