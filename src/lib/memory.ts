import { Memory } from '../types/agent';
import { formatDistanceToNow } from 'date-fns';

export class MemorySystem {
  private memories: Memory[] = [];
  private readonly maxMemories = 100;

  addMemory(memory: Memory): void {
    this.memories.push(memory);
    this.consolidateMemories();
  }

  private consolidateMemories(): void {
    if (this.memories.length > this.maxMemories) {
      this.memories.sort((a, b) => b.importance - a.importance);
      this.memories = this.memories.slice(0, this.maxMemories);
    }
  }

  retrieveRelevantMemories(context: string, limit = 5): Memory[] {
    return this.memories
      .filter(memory => memory.context.includes(context))
      .sort((a, b) => b.importance - a.importance)
      .slice(0, limit);
  }

  getRecentMemories(limit = 5): Memory[] {
    return [...this.memories]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  formatMemory(memory: Memory): string {
    return `${memory.content} (${formatDistanceToNow(memory.timestamp)} ago)`;
  }
}