import { create } from 'zustand';
import { Agent } from '../types/agent';
import { defaultAgents } from '../data/defaultAgents';
import { AgentSystem } from '../lib/agent';

interface Message {
  from: Agent;
  content: string;
  timestamp: Date;
}

interface AgentStore {
  agents: Agent[];
  selectedAgentId: string | null;
  agentSystems: Map<string, AgentSystem>;
  messages: Message[];
  initializeAgents: () => void;
  selectAgent: (id: string | null) => void;
  getSelectedAgent: () => Agent | null;
  getAgentSystem: (id: string) => AgentSystem | null;
  addMessage: (from: Agent, content: string) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [],
  selectedAgentId: null,
  agentSystems: new Map(),
  messages: [],

  initializeAgents: () => {
    const agentSystems = new Map<string, AgentSystem>();
    defaultAgents.forEach(agent => {
      agentSystems.set(agent.id, new AgentSystem(agent));
    });

    set({ 
      agents: defaultAgents,
      agentSystems
    });
  },

  selectAgent: (id: string | null) => {
    set({ selectedAgentId: id });
  },

  getSelectedAgent: () => {
    const { agents, selectedAgentId } = get();
    return agents.find(a => a.id === selectedAgentId) || null;
  },

  getAgentSystem: (id: string) => {
    const { agentSystems } = get();
    return agentSystems.get(id) || null;
  },

  addMessage: (from: Agent, content: string) => {
    set(state => ({
      messages: [...state.messages, {
        from,
        content,
        timestamp: new Date()
      }]
    }));
  }
}));