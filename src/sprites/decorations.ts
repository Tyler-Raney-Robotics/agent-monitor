// ============================================================================
// Space Station Decoration Sprites — Walls, backgrounds, zone labels, overlays
// ============================================================================

import { gridToScreen, TILE_W, TILE_H, MAP_OFFSET_X, MAP_OFFSET_Y } from '@/engine/isometric';
import { MAP_COLS, MAP_ROWS } from '@/office/layout';

// ---------------------------------------------------------------------------
// Background / Deep Space
// ---------------------------------------------------------------------------

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dayNightPhase: number,
): void {
  // Deep space gradient - always space-like, but varies slightly
  const grad = ctx.createLinearGradient(0, 0, width, height);
  
  if (dayNightPhase < 0.3) {
    // "Day" shift - slightly brighter deep space
    grad.addColorStop(0, '#0a0e1a');
    grad.addColorStop(0.5, '#0d1525');
    grad.addColorStop(1, '#0a1020');
  } else if (dayNightPhase < 0.6) {
    // "Evening" shift - warmer nebula tones
    grad.addColorStop(0, '#1a0a15');
    grad.addColorStop(0.5, '#150818');
    grad.addColorStop(1, '#0a0510');
  } else {
    // "Night" shift - deepest space
    grad.addColorStop(0, '#050810');
    grad.addColorStop(0.5, '#030508');
    grad.addColorStop(1, '#010205');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Stars - always visible in space
  const starAlpha = 0.3 + dayNightPhase * 0.4;
  ctx.fillStyle = `rgba(255,255,255,${starAlpha})`;
  
  // Fixed star field
  const stars = [
    [30, 15], [80, 45], [150, 20], [220, 55], [300, 25],
    [380, 40], [450, 18], [520, 50], [600, 30], [680, 45],
    [50, 70], [120, 85], [200, 75], [280, 90], [360, 80],
    [440, 95], [530, 72], [620, 88], [700, 78], [760, 92],
    [40, 110], [100, 125], [170, 115], [250, 130], [340, 120],
    [420, 135], [500, 112], [580, 128], [660, 118], [740, 132],
    [60, 150], [140, 165], [230, 155], [320, 170], [400, 160],
  ];
  
  for (const [sx, sy] of stars) {
    ctx.fillRect(sx, sy, 2, 2);
  }

  // Twinkling stars
  const twinkleStars = [
    [180, 35], [420, 65], [600, 42], [100, 95], [550, 85],
    [280, 145], [680, 155], [350, 45], [480, 110],
  ];
  
  for (let i = 0; i < twinkleStars.length; i++) {
    const [sx, sy] = twinkleStars[i];
    const twinkle = Math.sin(Date.now() * 0.002 + i * 1.5) > 0.3;
    if (twinkle) {
      ctx.fillStyle = `rgba(255,255,255,${starAlpha + 0.3})`;
      ctx.fillRect(sx, sy, 3, 3);
      // Cross sparkle
      ctx.fillRect(sx - 1, sy + 1, 5, 1);
      ctx.fillRect(sx + 1, sy - 1, 1, 5);
    }
  }

  // Distant nebula (subtle)
  const nebulaGrad = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, 200);
  nebulaGrad.addColorStop(0, 'rgba(255, 107, 0, 0.05)');
  nebulaGrad.addColorStop(0.5, 'rgba(255, 50, 100, 0.03)');
  nebulaGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = nebulaGrad;
  ctx.fillRect(0, 0, width, height);

  // Second nebula patch
  const nebulaGrad2 = ctx.createRadialGradient(width * 0.15, height * 0.7, 0, width * 0.15, height * 0.7, 150);
  nebulaGrad2.addColorStop(0, 'rgba(0, 150, 255, 0.04)');
  nebulaGrad2.addColorStop(0.5, 'rgba(100, 0, 200, 0.02)');
  nebulaGrad2.addColorStop(1, 'transparent');
  ctx.fillStyle = nebulaGrad2;
  ctx.fillRect(0, 0, width, height);
}

// ---------------------------------------------------------------------------
// Station Hull Walls
// ---------------------------------------------------------------------------

export function drawWalls(ctx: CanvasRenderingContext2D): void {
  // Draw outer hull edges of the station
  ctx.strokeStyle = '#37474F';
  ctx.lineWidth = 3;

  const topLeft = gridToScreen({ col: 0, row: 0 });
  const topRight = gridToScreen({ col: MAP_COLS - 1, row: 0 });
  const bottomLeft = gridToScreen({ col: 0, row: MAP_ROWS - 1 });

  ctx.beginPath();
  ctx.moveTo(bottomLeft.x - TILE_W / 2, bottomLeft.y);
  ctx.lineTo(topLeft.x, topLeft.y - TILE_H / 2);
  ctx.lineTo(topRight.x + TILE_W / 2, topRight.y);
  ctx.stroke();

  // Hull plating details
  ctx.strokeStyle = '#455A64';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(bottomLeft.x - TILE_W / 2 + 5, bottomLeft.y - 2);
  ctx.lineTo(topLeft.x, topLeft.y - TILE_H / 2 + 5);
  ctx.lineTo(topRight.x + TILE_W / 2 - 5, topRight.y - 2);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function drawDividerWall(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
): void {
  const { x, y } = gridToScreen({ col, row });
  const wallH = 20;

  // Top surface - metallic
  ctx.fillStyle = '#455A64';
  ctx.beginPath();
  ctx.moveTo(x, y - TILE_H / 2 - wallH);
  ctx.lineTo(x + TILE_W / 2, y - wallH);
  ctx.lineTo(x, y + TILE_H / 2 - wallH);
  ctx.lineTo(x - TILE_W / 2, y - wallH);
  ctx.closePath();
  ctx.fill();

  // Left face - darker metal
  ctx.fillStyle = '#37474F';
  ctx.beginPath();
  ctx.moveTo(x - TILE_W / 2, y - wallH);
  ctx.lineTo(x, y + TILE_H / 2 - wallH);
  ctx.lineTo(x, y + TILE_H / 2);
  ctx.lineTo(x - TILE_W / 2, y);
  ctx.closePath();
  ctx.fill();

  // Right face - darkest
  ctx.fillStyle = '#263238';
  ctx.beginPath();
  ctx.moveTo(x + TILE_W / 2, y - wallH);
  ctx.lineTo(x, y + TILE_H / 2 - wallH);
  ctx.lineTo(x, y + TILE_H / 2);
  ctx.lineTo(x + TILE_W / 2, y);
  ctx.closePath();
  ctx.fill();

  // Orange accent stripe
  ctx.fillStyle = '#ff6b00';
  ctx.fillRect(x - 4, y - wallH + 2, 8, 2);
}

// ---------------------------------------------------------------------------
// Zone Labels
// ---------------------------------------------------------------------------

export function drawZoneLabel(
  ctx: CanvasRenderingContext2D,
  label: string,
  emoji: string,
  col: number,
  row: number,
  alpha: number,
): void {
  const { x, y } = gridToScreen({ col, row });
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  // Glow effect
  ctx.shadowColor = '#ff6b00';
  ctx.shadowBlur = 4;
  ctx.fillStyle = '#ff6b00';
  ctx.fillText(`${emoji} ${label}`, x, y + TILE_H + 4);
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Night Overlay (dimming during "night" cycle)
// ---------------------------------------------------------------------------

export function drawNightOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dayNightPhase: number,
): void {
  // In space, "night" is just power-saving mode - slightly dimmer
  if (dayNightPhase <= 0.5) return;
  const alpha = Math.min(0.2, (dayNightPhase - 0.5) * 0.4);
  ctx.fillStyle = `rgba(0, 0, 20, ${alpha})`;
  ctx.fillRect(0, 0, width, height);
}

// ---------------------------------------------------------------------------
// Station Status Overlay (optional HUD elements)
// ---------------------------------------------------------------------------

export function drawStationHUD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tick: number,
): void {
  // Corner brackets (sci-fi HUD style)
  ctx.strokeStyle = '#ff6b0040';
  ctx.lineWidth = 2;
  
  // Top-left bracket
  ctx.beginPath();
  ctx.moveTo(20, 40);
  ctx.lineTo(20, 20);
  ctx.lineTo(40, 20);
  ctx.stroke();
  
  // Top-right bracket
  ctx.beginPath();
  ctx.moveTo(width - 20, 40);
  ctx.lineTo(width - 20, 20);
  ctx.lineTo(width - 40, 20);
  ctx.stroke();
  
  // Bottom-left bracket
  ctx.beginPath();
  ctx.moveTo(20, height - 40);
  ctx.lineTo(20, height - 20);
  ctx.lineTo(40, height - 20);
  ctx.stroke();
  
  // Bottom-right bracket
  ctx.beginPath();
  ctx.moveTo(width - 20, height - 40);
  ctx.lineTo(width - 20, height - 20);
  ctx.lineTo(width - 40, height - 20);
  ctx.stroke();

  // Station name (top center)
  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#ff6b0080';
  ctx.textAlign = 'center';
  ctx.fillText('◆ SPACE STATION COMMAND CENTER ◆', width / 2, 15);
  
  // Scan line effect (subtle)
  const scanY = (tick * 2) % height;
  ctx.fillStyle = 'rgba(0, 204, 255, 0.03)';
  ctx.fillRect(0, scanY, width, 2);
}
