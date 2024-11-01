import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Agent } from '../types/agent';

interface Message {
  from: Agent;
  content: string;
  timestamp: Date;
}

export function CommunicationLog({ 
  messages,
  selectedAgent 
}: { 
  messages: Message[];
  selectedAgent: Agent | null;
}) {
  const filteredMessages = selectedAgent
    ? messages.filter(m => 
        m.from.id === selectedAgent.id || 
        m.content.includes(selectedAgent.name)
      )
    : messages;

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Communication Log
      </h2>
      
      {filteredMessages.length > 0 ? (
        <div className="space-y-4">
          {filteredMessages.map((message, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{message.from.name}</span>
                <span className="text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-200">{message.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          {selectedAgent 
            ? "No communications yet for this agent" 
            : "Select an agent to view their communications"}
        </p>
      )}
    </div>
  );
}