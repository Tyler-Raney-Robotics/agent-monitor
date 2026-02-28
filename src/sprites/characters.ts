// ============================================================================
// Space Station Character Sprite System
// ============================================================================

import type { CharacterAnim, Direction, AgentAvatar, OwnerAvatar } from '@/lib/types';

interface CharPalette {
  skin: string;
  skinShadow: string;
  hair: string;
  hairLight: string;
  top: string;
  topLight: string;
  accent: string;
  accentFrame: string;
  pants: string;
  shoes: string;
  eyes: string;
  helmet?: string;
  visor?: string;
}

const BASE_SKIN = '#FFDAB9';
const BASE_SKIN_SHADOW = '#E8C4A0';

function agentPalette(avatar: AgentAvatar, color: string): CharPalette {
  switch (avatar) {
    case 'commander':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#2D1B00', hairLight: '#4A2F10',
        top: '#1a2a4a', topLight: '#2a3a5a', // Navy command uniform
        accent: color, accentFrame: '#ffd700', // Gold rank insignia
        pants: '#1a2a4a', shoes: '#2a2a2a', eyes: '#333333',
        helmet: '#3a4a5a', visor: '#00ccff',
      };
    case 'engineer':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#1A1A1A', hairLight: '#333333',
        top: '#ff6b00', topLight: lighten('#ff6b00', 20), // Orange jumpsuit
        accent: '#ffaa00', accentFrame: '#ff8800',
        pants: '#4a3a2a', shoes: '#3a3a3a', eyes: '#333333',
        helmet: '#4a4a4a', visor: '#ffaa00',
      };
    case 'scientist':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#3E2723', hairLight: '#5D4037',
        top: '#e8e8f0', topLight: '#f8f8ff', // White lab coat
        accent: color, accentFrame: '#00ccff',
        pants: '#2a2a3a', shoes: '#3E2723', eyes: '#333333',
        helmet: '#e8e8f0', visor: '#88ffaa',
      };
    case 'technician':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#6D4C41', hairLight: '#8D6E63',
        top: '#3a5a5a', topLight: lighten('#3a5a5a', 25), // Teal utility suit
        accent: '#00ff88', accentFrame: '#00cc66',
        pants: '#2a3a3a', shoes: '#2a2a2a', eyes: '#333333',
        helmet: '#4a5a5a', visor: '#00ff88',
      };
    case 'droid':
      return {
        skin: '#607D8B', skinShadow: '#546E7A', // Metallic gray
        hair: '#455A64', hairLight: '#607D8B',
        top: '#37474F', topLight: '#455A64',
        accent: color, accentFrame: color,
        pants: '#263238', shoes: '#1a1a1a', eyes: '#ff6b00', // Orange sensor eyes
        helmet: '#546E7A', visor: '#ff6b00',
      };
    case 'alien_cat':
      return {
        skin: '#b8e8ff', skinShadow: '#88d0ff', // Light blue alien fur
        hair: '#66ccff', hairLight: '#99ddff',
        top: color, topLight: lighten(color, 20),
        accent: '#ff88aa', accentFrame: '#ff6699',
        pants: '#3a4a5a', shoes: '#2a3a4a', eyes: '#ff00aa', // Magenta cat eyes
        helmet: '#4a6080', visor: '#ff88dd',
      };
    case 'alien_dog':
      return {
        skin: '#d0c0e8', skinShadow: '#b0a0c8', // Lavender alien fur
        hair: '#8868a8', hairLight: '#a888c8',
        top: color, topLight: lighten(color, 20),
        accent: '#ffcc00', accentFrame: '#ffaa00',
        pants: '#3a3a4a', shoes: '#2a2a3a', eyes: '#ff8800', // Amber eyes
        helmet: '#5a4a6a', visor: '#ffcc00',
      };
  }
}

function ownerPalette(avatar: OwnerAvatar): CharPalette {
  switch (avatar) {
    case 'captain':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#2a1800', hairLight: '#4a2800',
        top: '#1a1a3a', topLight: '#2a2a4a', // Dark command uniform
        accent: '#ffd700', accentFrame: '#ffaa00', // Gold captain insignia
        pants: '#1a1a2a', shoes: '#2a2a2a', eyes: '#333333',
        helmet: '#2a3a4a', visor: '#00ccff',
      };
    case 'admiral':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#5a5a5a', hairLight: '#7a7a7a', // Gray hair
        top: '#0a0a2a', topLight: '#1a1a3a', // Darker formal uniform
        accent: '#ffd700', accentFrame: '#ff6b00',
        pants: '#0a0a1a', shoes: '#1a1a1a', eyes: '#333333',
        helmet: '#1a2a3a', visor: '#ffd700',
      };
    case 'mission_control':
      return {
        skin: BASE_SKIN, skinShadow: BASE_SKIN_SHADOW,
        hair: '#4a3020', hairLight: '#6a4030',
        top: '#2a4a5a', topLight: '#3a5a6a', // Teal mission control uniform
        accent: '#00ff88', accentFrame: '#00cc66',
        pants: '#2a3a4a', shoes: '#2a2a2a', eyes: '#333333',
        helmet: '#3a4a5a', visor: '#00ff88',
      };
  }
}

function px(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  color: string,
  scale: number, ox: number, oy: number,
): void {
  ctx.fillStyle = color;
  ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
}

function lighten(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + pct);
  const g = Math.min(255, ((n >> 8) & 0xff) + pct);
  const b = Math.min(255, (n & 0xff) + pct);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function drawCharacter(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  anim: CharacterAnim,
  direction: Direction,
  tick: number,
  palette: CharPalette,
  emoji: string,
  isDroid: boolean,
  hasAntenna: boolean,
): void {
  const scale = 2;
  const ox = x - 12;
  const oy = y - 36;

  ctx.save();

  if (direction === 'w') {
    ctx.translate(x, 0);
    ctx.scale(-1, 1);
    ctx.translate(-x, 0);
  }

  const frame = Math.floor(tick / 8) % 2;

  ctx.font = '12px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.save();
  if (direction === 'w') {
    ctx.translate(x, 0);
    ctx.scale(-1, 1);
    ctx.translate(-x, 0);
  }
  ctx.fillText(emoji, x, oy + 2);
  ctx.restore();

  // Hair/Helmet
  if (isDroid) {
    // Droid head casing
    for (let i = 3; i <= 8; i++) px(ctx, i, 2, palette.helmet || '#546E7A', scale, ox, oy);
    for (let i = 2; i <= 9; i++) px(ctx, i, 3, palette.helmet || '#546E7A', scale, ox, oy);
    // Antenna
    px(ctx, 5, 1, '#ff6b00', scale, ox, oy);
    px(ctx, 6, 0, '#ffaa00', scale, ox, oy);
  } else {
    // Hair
    for (let i = 3; i <= 8; i++) px(ctx, i, 2, palette.hair, scale, ox, oy);
    for (let i = 2; i <= 9; i++) px(ctx, i, 3, palette.hair, scale, ox, oy);
  }

  // Antenna for aliens
  if (hasAntenna) {
    px(ctx, 4, 1, palette.accent, scale, ox, oy);
    px(ctx, 4, 0, palette.accentFrame, scale, ox, oy);
    px(ctx, 7, 1, palette.accent, scale, ox, oy);
    px(ctx, 7, 0, palette.accentFrame, scale, ox, oy);
  }

  // Head/face
  for (let i = 3; i <= 8; i++) px(ctx, i, 4, palette.skin, scale, ox, oy);
  for (let i = 3; i <= 8; i++) px(ctx, i, 5, palette.skin, scale, ox, oy);
  for (let i = 3; i <= 8; i++) px(ctx, i, 6, palette.skin, scale, ox, oy);
  for (let i = 4; i <= 7; i++) px(ctx, i, 7, palette.skin, scale, ox, oy);

  // Eyes (droids have glowing sensors)
  if (tick % 120 < 115) {
    if (isDroid) {
      px(ctx, 4, 5, palette.eyes, scale, ox, oy);
      px(ctx, 5, 5, palette.eyes, scale, ox, oy);
      px(ctx, 6, 5, palette.eyes, scale, ox, oy);
      px(ctx, 7, 5, palette.eyes, scale, ox, oy);
      // Pulsing effect
      if (tick % 20 < 10) {
        px(ctx, 5, 5, lighten(palette.eyes, 40), scale, ox, oy);
        px(ctx, 6, 5, lighten(palette.eyes, 40), scale, ox, oy);
      }
    } else {
      px(ctx, 5, 5, palette.eyes, scale, ox, oy);
      px(ctx, 7, 5, palette.eyes, scale, ox, oy);
    }
  } else {
    px(ctx, 5, 5, palette.skinShadow, scale, ox, oy);
    px(ctx, 7, 5, palette.skinShadow, scale, ox, oy);
  }

  // Mouth
  if (!isDroid) {
    px(ctx, 5, 7, palette.skinShadow, scale, ox, oy);
    px(ctx, 6, 7, palette.skinShadow, scale, ox, oy);
  }

  // Rank insignia / badge on shoulder
  px(ctx, 3, 8, palette.accentFrame, scale, ox, oy);

  drawBody(ctx, anim, frame, palette, scale, ox, oy);

  ctx.restore();
}

function drawBody(
  ctx: CanvasRenderingContext2D,
  anim: CharacterAnim,
  frame: number,
  p: CharPalette,
  scale: number, ox: number, oy: number,
): void {
  if (anim === 'sit_typing' || anim === 'sit_idle') {
    for (let row = 8; row <= 11; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    // Suit details
    px(ctx, 5, 9, p.accent, scale, ox, oy);
    px(ctx, 6, 9, p.accent, scale, ox, oy);
    px(ctx, 5, 10, p.topLight, scale, ox, oy);
    px(ctx, 6, 10, p.topLight, scale, ox, oy);

    if (anim === 'sit_typing') {
      const armOff = frame;
      px(ctx, 2, 9 + armOff, p.top, scale, ox, oy);
      px(ctx, 1, 10, p.skin, scale, ox, oy);
      px(ctx, 9, 9 + armOff, p.top, scale, ox, oy);
      px(ctx, 10, 10, p.skin, scale, ox, oy);
    } else {
      px(ctx, 2, 9, p.top, scale, ox, oy);
      px(ctx, 2, 10, p.skin, scale, ox, oy);
      px(ctx, 9, 9, p.top, scale, ox, oy);
      px(ctx, 9, 10, p.skin, scale, ox, oy);
    }
    for (let i = 3; i <= 8; i++) px(ctx, i, 12, p.pants, scale, ox, oy);
    px(ctx, 3, 13, p.shoes, scale, ox, oy);
    px(ctx, 4, 13, p.shoes, scale, ox, oy);
    px(ctx, 7, 13, p.shoes, scale, ox, oy);
    px(ctx, 8, 13, p.shoes, scale, ox, oy);

  } else if (anim === 'sleep') {
    for (let row = 8; row <= 10; row++) {
      for (let i = 2; i <= 9; i++) {
        px(ctx, i, row, p.top, scale, ox, oy);
      }
    }

  } else if (anim === 'walk_frame1' || anim === 'walk_frame2') {
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    // Suit stripe
    px(ctx, 5, 10, p.accent, scale, ox, oy);
    px(ctx, 6, 10, p.accent, scale, ox, oy);
    
    if (anim === 'walk_frame1') {
      px(ctx, 2, 9, p.top, scale, ox, oy);
      px(ctx, 2, 10, p.skin, scale, ox, oy);
      px(ctx, 9, 10, p.top, scale, ox, oy);
      px(ctx, 9, 11, p.skin, scale, ox, oy);
      px(ctx, 4, 13, p.pants, scale, ox, oy);
      px(ctx, 4, 14, p.shoes, scale, ox, oy);
      px(ctx, 7, 13, p.pants, scale, ox, oy);
      px(ctx, 8, 14, p.shoes, scale, ox, oy);
    } else {
      px(ctx, 2, 10, p.top, scale, ox, oy);
      px(ctx, 2, 11, p.skin, scale, ox, oy);
      px(ctx, 9, 9, p.top, scale, ox, oy);
      px(ctx, 9, 10, p.skin, scale, ox, oy);
      px(ctx, 3, 13, p.pants, scale, ox, oy);
      px(ctx, 3, 14, p.shoes, scale, ox, oy);
      px(ctx, 7, 13, p.pants, scale, ox, oy);
      px(ctx, 7, 14, p.shoes, scale, ox, oy);
    }

  } else if (anim === 'drink_coffee') {
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    px(ctx, 2, 9, p.top, scale, ox, oy);
    px(ctx, 2, 10, p.skin, scale, ox, oy);
    px(ctx, 9, 8, p.top, scale, ox, oy);
    px(ctx, 9, 7, p.skin, scale, ox, oy);
    // Space mug (cylindrical)
    px(ctx, 10, 7, '#607D8B', scale, ox, oy);
    px(ctx, 10, 6, '#546E7A', scale, ox, oy);
    px(ctx, 11, 7, '#78909C', scale, ox, oy);
    if (frame === 0) {
      px(ctx, 10, 5, '#FFFFFF80', scale, ox, oy);
      px(ctx, 11, 4, '#FFFFFF60', scale, ox, oy);
    } else {
      px(ctx, 11, 5, '#FFFFFF80', scale, ox, oy);
      px(ctx, 10, 4, '#FFFFFF60', scale, ox, oy);
    }
    drawStandingLegs(ctx, p, scale, ox, oy);

  } else if (anim === 'raise_hand') {
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    px(ctx, 2, 9, p.top, scale, ox, oy);
    px(ctx, 2, 10, p.skin, scale, ox, oy);
    px(ctx, 9, 8, p.top, scale, ox, oy);
    px(ctx, 9, 7, p.top, scale, ox, oy);
    px(ctx, 9, 6, p.skin, scale, ox, oy);
    drawStandingLegs(ctx, p, scale, ox, oy);

  } else if (anim === 'headphones') {
    // Space headset
    px(ctx, 2, 3, '#ff6b00', scale, ox, oy);
    px(ctx, 3, 2, '#ff6b00', scale, ox, oy);
    px(ctx, 8, 2, '#ff6b00', scale, ox, oy);
    px(ctx, 9, 3, '#ff6b00', scale, ox, oy);
    px(ctx, 2, 4, '#ff8800', scale, ox, oy);
    px(ctx, 2, 5, '#ff8800', scale, ox, oy);
    px(ctx, 9, 4, '#ff8800', scale, ox, oy);
    px(ctx, 9, 5, '#ff8800', scale, ox, oy);
    // Mic
    px(ctx, 1, 6, '#455A64', scale, ox, oy);
    px(ctx, 1, 7, '#37474F', scale, ox, oy);
    
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    px(ctx, 2, 9, p.top, scale, ox, oy);
    px(ctx, 2, 10, p.skin, scale, ox, oy);
    px(ctx, 9, 9, p.top, scale, ox, oy);
    px(ctx, 9, 10, p.skin, scale, ox, oy);
    drawStandingLegs(ctx, p, scale, ox, oy);

  } else if (anim === 'thumbs_up') {
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        if (i >= 5 && i <= 6 && row >= 9) {
          px(ctx, i, row, p.accent, scale, ox, oy);
        } else {
          px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
        }
      }
    }
    px(ctx, 2, 9, p.top, scale, ox, oy);
    px(ctx, 2, 10, p.skin, scale, ox, oy);
    px(ctx, 9, 8, p.top, scale, ox, oy);
    px(ctx, 9, 7, p.skin, scale, ox, oy);
    px(ctx, 9, 6, '#FFD700', scale, ox, oy);
    drawStandingLegs(ctx, p, scale, ox, oy);

  } else if (anim === 'hand_task') {
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        if (i >= 5 && i <= 6 && row >= 9) {
          px(ctx, i, row, p.accent, scale, ox, oy);
        } else {
          px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
        }
      }
    }
    px(ctx, 2, 9, p.top, scale, ox, oy);
    px(ctx, 2, 10, p.skin, scale, ox, oy);
    px(ctx, 9, 9, p.top, scale, ox, oy);
    px(ctx, 10, 9, p.skin, scale, ox, oy);
    // Datapad
    px(ctx, 11, 8, '#37474F', scale, ox, oy);
    px(ctx, 11, 9, '#37474F', scale, ox, oy);
    px(ctx, 12, 8, '#00ccff', scale, ox, oy);
    px(ctx, 12, 9, '#00aadd', scale, ox, oy);
    drawStandingLegs(ctx, p, scale, ox, oy);

  } else if (anim === 'run') {
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    // Running arms
    px(ctx, 1, 9, p.top, scale, ox, oy);
    px(ctx, 1, 10, p.skin, scale, ox, oy);
    px(ctx, 10, 8, p.top, scale, ox, oy);
    px(ctx, 10, 9, p.skin, scale, ox, oy);
    // Running legs (wider stance)
    px(ctx, 3, 13, p.pants, scale, ox, oy);
    px(ctx, 2, 14, p.shoes, scale, ox, oy);
    px(ctx, 8, 13, p.pants, scale, ox, oy);
    px(ctx, 9, 14, p.shoes, scale, ox, oy);

  } else {
    // Default standing pose
    for (let row = 8; row <= 12; row++) {
      for (let i = 3; i <= 8; i++) {
        px(ctx, i, row, row === 8 ? p.topLight : p.top, scale, ox, oy);
      }
    }
    // Suit details
    px(ctx, 5, 10, p.topLight, scale, ox, oy);
    px(ctx, 6, 10, p.topLight, scale, ox, oy);
    px(ctx, 2, 9, p.top, scale, ox, oy);
    px(ctx, 2, 10, p.skin, scale, ox, oy);
    px(ctx, 9, 9, p.top, scale, ox, oy);
    px(ctx, 9, 10, p.skin, scale, ox, oy);
    drawStandingLegs(ctx, p, scale, ox, oy);
  }
}

function drawStandingLegs(
  ctx: CanvasRenderingContext2D,
  p: CharPalette,
  scale: number, ox: number, oy: number,
): void {
  for (let i = 4; i <= 7; i++) px(ctx, i, 13, p.pants, scale, ox, oy);
  px(ctx, 4, 14, p.shoes, scale, ox, oy);
  px(ctx, 5, 14, p.shoes, scale, ox, oy);
  px(ctx, 6, 14, p.shoes, scale, ox, oy);
  px(ctx, 7, 14, p.shoes, scale, ox, oy);
}

export function drawAgent(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  anim: CharacterAnim,
  direction: Direction,
  tick: number,
  avatar: AgentAvatar,
  color: string,
  emoji: string,
): void {
  const pal = agentPalette(avatar, color);
  const isDroid = avatar === 'droid';
  const hasAntenna = avatar === 'alien_cat' || avatar === 'alien_dog';
  drawCharacter(ctx, x, y, anim, direction, tick, pal, emoji, isDroid, hasAntenna);
}

export function drawOwner(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  anim: CharacterAnim,
  tick: number,
  avatar: OwnerAvatar,
  emoji: string,
): void {
  const pal = ownerPalette(avatar);
  drawCharacter(ctx, x, y, anim, 's', tick, pal, emoji, false, false);
}

export function drawNameTag(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  name: string,
  color: string,
): void {
  ctx.save();
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.fillText(name, x, y + 4);
  ctx.restore();
}
