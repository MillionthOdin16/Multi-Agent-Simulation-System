import { Emotion } from '../types/agent';

export class EmotionalEngine {
  private readonly transitionRules = new Map<Emotion, Map<string, Emotion>>();

  constructor() {
    this.initializeTransitionRules();
  }

  private initializeTransitionRules(): void {
    // Happy transitions
    const happyTransitions = new Map<string, Emotion>();
    happyTransitions.set('negative_interaction', 'neutral');
    happyTransitions.set('threat', 'cautious');
    
    // Neutral transitions
    const neutralTransitions = new Map<string, Emotion>();
    neutralTransitions.set('positive_interaction', 'happy');
    neutralTransitions.set('negative_interaction', 'cautious');

    // Cautious transitions
    const cautiousTransitions = new Map<string, Emotion>();
    cautiousTransitions.set('threat_confirmed', 'upset');
    cautiousTransitions.set('positive_interaction', 'neutral');

    // Upset transitions
    const upsetTransitions = new Map<string, Emotion>();
    upsetTransitions.set('apology', 'cautious');
    upsetTransitions.set('time_passed', 'neutral');

    this.transitionRules.set('happy', happyTransitions);
    this.transitionRules.set('neutral', neutralTransitions);
    this.transitionRules.set('cautious', cautiousTransitions);
    this.transitionRules.set('upset', upsetTransitions);
  }

  updateEmotion(currentEmotion: Emotion, trigger: string): Emotion {
    const transitions = this.transitionRules.get(currentEmotion);
    return transitions?.get(trigger) || currentEmotion;
  }

  getEmotionalResponse(emotion: Emotion): string {
    const responses = {
      happy: 'enthusiastic and open',
      neutral: 'balanced and measured',
      cautious: 'reserved and careful',
      upset: 'defensive and distant'
    };
    return responses[emotion];
  }
}