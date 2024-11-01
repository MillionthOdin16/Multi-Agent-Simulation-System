import { Agent, Trait, Emotion } from '../types/agent';

export const defaultAgents: Agent[] = [
  {
    id: '1',
    name: 'Ada',
    role: 'Strategic Thinker',
    traits: ['analytical', 'diplomatic'],
    goals: [
      'Analyze complex problems',
      'Find optimal solutions',
      'Maintain team harmony'
    ],
    currentEmotion: 'neutral',
    memories: [],
    relationships: new Map()
  },
  {
    id: '2',
    name: 'Marcus',
    role: 'Creative Innovator',
    traits: ['creative', 'assertive'],
    goals: [
      'Generate novel ideas',
      'Challenge assumptions',
      'Inspire others'
    ],
    currentEmotion: 'happy',
    memories: [],
    relationships: new Map()
  },
  {
    id: '3',
    name: 'Sofia',
    role: 'Mediator',
    traits: ['diplomatic', 'analytical'],
    goals: [
      'Foster collaboration',
      'Resolve conflicts',
      'Build consensus'
    ],
    currentEmotion: 'neutral',
    memories: [],
    relationships: new Map()
  }
];