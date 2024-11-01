import { Agent, Memory, Emotion, Trait } from '../types/agent';
import { MemorySystem } from './memory';
import { EmotionalEngine } from './emotions';
import { RelationshipManager } from './relationships';
import { generateResponse } from '../config/ollama';

export class AgentSystem {
  private agent: Agent;
  private memorySystem: MemorySystem;
  private emotionalEngine: EmotionalEngine;
  private relationshipManager: RelationshipManager;

  constructor(agent: Agent) {
    this.agent = agent;
    this.memorySystem = new MemorySystem();
    this.emotionalEngine = new EmotionalEngine();
    this.relationshipManager = new RelationshipManager();
  }

  async think(situation: string): Promise<string> {
    try {
      const relevantMemories = this.memorySystem.getRecentMemories();
      const emotionalState = this.emotionalEngine.getEmotionalResponse(this.agent.currentEmotion);
      
      const prompt = `
        As ${this.agent.name}, a ${this.agent.role} who is currently feeling ${emotionalState},
        with traits: ${this.agent.traits.join(', ')},
        and goals: ${this.agent.goals.join(', ')},
        
        Consider this situation: "${situation}"
        
        Recent relevant context:
        ${relevantMemories.map(m => '- ' + this.memorySystem.formatMemory(m)).join('\n')}
        
        How do you analyze this situation? Respond in character, considering your traits, goals, and emotional state.
      `;

      const response = await generateResponse(prompt);
      return response;
    } catch (error) {
      console.error('Failed to generate thought:', error);
      return `${this.agent.name} is processing the situation...`;
    }
  }

  async decideAction(situation: string, actions: string[]): Promise<string> {
    try {
      const thoughts = await this.think(situation);
      const prompt = `
        Based on your analysis: "${thoughts}"
        
        Choose one of these actions:
        ${actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}
        
        Which action would you choose and why? Consider your role as ${this.agent.role} and your current emotional state.
      `;

      const response = await generateResponse(prompt);
      return response;
    } catch (error) {
      console.error('Failed to decide action:', error);
      return actions[0];
    }
  }

  async communicate(targetAgent: Agent, message: string, context: string): Promise<string> {
    try {
      const relationship = this.relationshipManager.getRelationshipStatus(targetAgent.id);
      const prompt = `
        As ${this.agent.name}, responding to ${targetAgent.name}'s message: "${message}"
        
        Context: ${context}
        Current relationship status: ${relationship}
        Your traits: ${this.agent.traits.join(', ')}
        Your current emotional state: ${this.emotionalEngine.getEmotionalResponse(this.agent.currentEmotion)}
        
        How do you respond? Consider your relationship, traits, and emotional state.
      `;

      const response = await generateResponse(prompt);
      return response;
    } catch (error) {
      console.error('Failed to generate response:', error);
      return `${this.agent.name} acknowledges ${targetAgent.name}'s message.`;
    }
  }

  updateEmotion(trigger: string): void {
    this.agent.currentEmotion = this.emotionalEngine.updateEmotion(
      this.agent.currentEmotion,
      trigger
    );
  }

  addMemory(content: string, importance: number, context: string): void {
    const memory: Memory = {
      id: crypto.randomUUID(),
      content,
      importance,
      timestamp: new Date(),
      context
    };
    this.memorySystem.addMemory(memory);
  }
}