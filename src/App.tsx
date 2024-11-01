import React, { useEffect } from 'react';
import { Brain, Users, Heart } from 'lucide-react';
import { useAgentStore } from './store/agentStore';
import type { Agent } from './types/agent';
import { SimulationControls } from './components/SimulationControls';
import { CommunicationLog } from './components/CommunicationLog';

function AgentCard({ agent, isSelected, onClick }: { 
  agent: Agent; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-700/50 hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold">{agent.name}</h3>
      <p className="text-sm opacity-80">{agent.role}</p>
      <div className="mt-2 text-xs">
        <span className={`inline-block px-2 py-1 rounded ${
          isSelected ? 'bg-indigo-500' : 'bg-gray-600'
        }`}>
          {agent.currentEmotion}
        </span>
      </div>
    </div>
  );
}

function AgentDetails({ agent }: { agent: Agent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold mb-2">Traits</h3>
        <div className="space-y-1">
          {agent.traits.map(trait => (
            <div key={trait} className="text-sm bg-gray-700/50 px-3 py-1 rounded">
              {trait}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Goals</h3>
        <div className="space-y-1">
          {agent.goals.map(goal => (
            <div key={goal} className="text-sm bg-gray-700/50 px-3 py-1 rounded">
              {goal}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const { 
    agents, 
    selectedAgentId, 
    initializeAgents, 
    selectAgent, 
    getSelectedAgent 
  } = useAgentStore();

  useEffect(() => {
    initializeAgents();
  }, [initializeAgents]);

  const selectedAgent = getSelectedAgent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Multi-Agent Simulation System</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SimulationControls />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Agent List */}
          <div className="lg:col-span-1 bg-gray-800/50 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Agents
            </h2>
            <div className="space-y-2">
              {agents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={agent.id === selectedAgentId}
                  onClick={() => selectAgent(agent.id)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Agent Details */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Agent Details
              </h2>
              {selectedAgent ? (
                <AgentDetails agent={selectedAgent} />
              ) : (
                <p className="text-gray-400">Select an agent to view details</p>
              )}
            </div>

            {/* Relationships */}
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Relationships
              </h2>
              {selectedAgent ? (
                <p className="text-gray-400">No active relationships</p>
              ) : (
                <p className="text-gray-400">Select an agent to view relationships</p>
              )}
            </div>

            {/* Communication Log */}
            <CommunicationLog 
              messages={[]} 
              selectedAgent={selectedAgent}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;