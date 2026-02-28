// ============================================================================
// Behavior → Zone + Animation Mapping (Space Station)
// ============================================================================

import type { AgentBehavior, CharacterAnim, ZoneId, Particle } from '@/lib/types';

export interface BehaviorMapping {
  /** Target zone (or '_own_desk' for the agent's assigned console) */
  zone: ZoneId | '_own_desk';
  /** Animation to play once at the zone */
  anim: CharacterAnim;
  /** Optional speech bubble text */
  bubble?: string;
  /** Particle effect to spawn */
  particle?: Particle['type'];
  /** Priority: higher means agent moves faster */
  priority: number;
}

export const BEHAVIOR_MAP: Record<AgentBehavior, BehaviorMapping> = {
  // Work
  working: {
    zone: '_own_desk',
    anim: 'sit_typing',
    bubble: '🖥️ On station...',
    particle: 'code',
    priority: 3,
  },
  thinking: {
    zone: '_own_desk',
    anim: 'sit_idle',
    bubble: '🤔 Analyzing...',
    particle: 'question',
    priority: 2,
  },
  researching: {
    zone: 'research_bay',
    anim: 'headphones',
    bubble: '🔬 Researching',
    particle: 'sparkle',
    priority: 2,
  },
  meeting: {
    zone: 'briefing_room',
    anim: 'raise_hand',
    bubble: '📋 Mission brief',
    priority: 3,
  },
  deploying: {
    zone: 'server_core',
    anim: 'run',
    bubble: '🚀 Deploying!',
    particle: 'lightning',
    priority: 4,
  },
  debugging: {
    zone: 'project_lab_1',
    anim: 'sit_typing',
    bubble: '🐛 Debugging...',
    particle: 'error',
    priority: 3,
  },

  // Interaction
  receiving_task: {
    zone: 'command_bridge',
    anim: 'hand_task',
    bubble: '📋 New orders!',
    particle: 'sparkle',
    priority: 4,
  },
  reporting: {
    zone: 'command_bridge',
    anim: 'thumbs_up',
    bubble: '✅ Mission complete!',
    particle: 'check',
    priority: 3,
  },

  // Life
  idle: {
    zone: 'mess_hall',
    anim: 'drink_coffee',
    bubble: '☕ Ration break',
    particle: 'coffee_steam',
    priority: 0,
  },
  coffee: {
    zone: 'mess_hall',
    anim: 'drink_coffee',
    bubble: '☕ Synthesized coffee',
    particle: 'coffee_steam',
    priority: 1,
  },
  snacking: {
    zone: 'mess_hall',
    anim: 'stand',
    bubble: '🍜 Nutrient pack',
    priority: 1,
  },
  toilet: {
    zone: 'crew_quarters',
    anim: 'walk_frame1',
    priority: 1,
  },
  sleeping: {
    zone: 'crew_quarters',
    anim: 'sleep',
    bubble: '😴 Cryo-rest',
    particle: 'zzz',
    priority: 0,
  },
  napping: {
    zone: '_own_desk',
    anim: 'sleep',
    bubble: '😴 Quick rest',
    particle: 'zzz',
    priority: 0,
  },

  // Anomaly
  panicking: {
    zone: 'airlock',
    anim: 'run',
    bubble: '🚨 Alert!',
    particle: 'error',
    priority: 5,
  },
  dead: {
    zone: '_own_desk',
    anim: 'sleep',
    bubble: '💀 System failure',
    particle: 'smoke',
    priority: 0,
  },
  overloaded: {
    zone: '_own_desk',
    anim: 'sit_typing',
    bubble: '🔥 Overloaded!',
    particle: 'smoke',
    priority: 4,
  },
  reviving: {
    zone: '_own_desk',
    anim: 'stand',
    bubble: '🔄 Rebooting...',
    particle: 'lightning',
    priority: 3,
  },
};

/** Get the actual zone ID for a behavior, resolving '_own_desk' to agent's console */
export function resolveZone(behavior: AgentBehavior, deskZone: ZoneId): ZoneId {
  const mapping = BEHAVIOR_MAP[behavior];
  return mapping.zone === '_own_desk' ? deskZone : mapping.zone;
}
