import { Relationship } from '../types/agent';

export class RelationshipManager {
  private relationships: Map<string, Relationship> = new Map();

  updateTrust(agentId: string, delta: number): void {
    const relationship = this.relationships.get(agentId);
    if (relationship) {
      relationship.trust = Math.max(0, Math.min(100, relationship.trust + delta));
      this.updateQuality(agentId);
    }
  }

  private updateQuality(agentId: string): void {
    const relationship = this.relationships.get(agentId);
    if (relationship) {
      const interactionFactor = Math.min(1, relationship.interactions / 100);
      relationship.quality = (relationship.trust * interactionFactor) / 100;
    }
  }

  logInteraction(agentId: string): void {
    const relationship = this.relationships.get(agentId);
    if (relationship) {
      relationship.interactions++;
      relationship.lastInteraction = new Date();
      this.updateQuality(agentId);
    }
  }

  getRelationshipStatus(agentId: string): string {
    const relationship = this.relationships.get(agentId);
    if (!relationship) return 'unknown';

    if (relationship.quality > 0.8) return 'close ally';
    if (relationship.quality > 0.6) return 'friend';
    if (relationship.quality > 0.4) return 'acquaintance';
    if (relationship.quality > 0.2) return 'distant';
    return 'stranger';
  }
}