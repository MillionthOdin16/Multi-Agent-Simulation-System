export type Emotion = 'happy' | 'neutral' | 'cautious' | 'upset';

export type Trait = 'analytical' | 'creative' | 'diplomatic' | 'assertive';

export interface Memory {
  id: string;
  content: string;
  importance: number;
  timestamp: Date;
  context: string;
}

export interface Relationship {
  agentId: string;
  trust: number;
  quality: number;
  interactions: number;
  lastInteraction: Date;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  traits: Trait[];
  goals: string[];
  currentEmotion: Emotion;
  memories: Memory[];
  relationships: Map<string, Relationship>;
}