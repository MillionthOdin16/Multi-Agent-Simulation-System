import React, { useState } from 'react';
import { Play, Pause, MessageCircle } from 'lucide-react';
import { useAgentStore } from '../store/agentStore';

export function SimulationControls() {
  const [isRunning, setIsRunning] = useState(false);
  const [topic, setTopic] = useState('');
  const { agents, getAgentSystem } = useAgentStore();

  const toggleSimulation = async () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      await startDiscussion();
    }
  };

  const startDiscussion = async () => {
    if (!topic.trim()) return;

    const discussionTopic = `Let's discuss: ${topic}`;
    
    // Start a chain reaction of responses
    for (const initiator of agents) {
      const initiatorSystem = getAgentSystem(initiator.id);
      if (!initiatorSystem) continue;

      // Generate initial thoughts
      const thoughts = await initiatorSystem.think(discussionTopic);
      
      // Share thoughts with other agents
      for (const responder of agents) {
        if (responder.id === initiator.id) continue;
        
        const responderSystem = getAgentSystem(responder.id);
        if (!responderSystem) continue;

        // Generate response
        const response = await responderSystem.communicate(
          initiator,
          thoughts,
          discussionTopic
        );

        // Add memories for both agents
        initiatorSystem.addMemory(
          `Shared thoughts about ${topic} with ${responder.name}`,
          0.7,
          'discussion'
        );

        responderSystem.addMemory(
          `Responded to ${initiator.name}'s thoughts about ${topic}`,
          0.7,
          'discussion'
        );
      }
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSimulation}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Stop Simulation
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Simulation
            </>
          )}
        </button>

        <div className="flex-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a discussion topic..."
              className="flex-1 px-3 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => startDiscussion()}
              disabled={!topic.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4" />
              Discuss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}