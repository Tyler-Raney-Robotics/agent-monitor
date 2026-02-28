// ============================================================================
// Space Station Furniture Sprite Drawing — Pixel art isometric furniture
// ============================================================================

import type { FurnitureType } from '@/lib/types';
import { gridToScreen, TILE_W, TILE_H } from '@/engine/isometric';
import { drawIsometricBlock } from '@/engine/isometric';

function px(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  color: string,
): void {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

// ---------------------------------------------------------------------------
// Space Station Furniture
// ---------------------------------------------------------------------------

function drawConsoleStation(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Console base - metallic
  drawIsometricBlock(ctx, { col, row }, 14, '#546E7A', '#455A64', '#37474F');
  // Main screen
  const monY = y - 26;
  px(ctx, x - 10, monY - 14, 20, 14, '#1a1a2e');
  px(ctx, x - 8, monY - 12, 16, 10, tick % 60 < 55 ? '#00ccff' : '#0099cc');
  // Screen flicker / data lines
  if (tick % 60 < 55) {
    for (let i = 0; i < 4; i++) {
      const w = 3 + Math.floor(Math.random() * 8);
      px(ctx, x - 6, monY - 10 + i * 2, w, 1, '#00ffff');
    }
  }
  // Orange status light
  px(ctx, x + 6, monY - 10, 2, 2, tick % 30 < 20 ? '#ff6b00' : '#aa4400');
  // Monitor stand
  px(ctx, x - 2, monY, 4, 3, '#37474F');
  // Control panel
  px(ctx, x - 8, y - 10, 16, 4, '#2a3a4a');
  px(ctx, x - 6, y - 9, 3, 2, '#ff6b00');
  px(ctx, x - 2, y - 9, 3, 2, '#00ff88');
  px(ctx, x + 2, y - 9, 3, 2, '#00ccff');
}

function drawCommandChair(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Seat - ergonomic space chair
  px(ctx, x - 8, y - 6, 16, 4, '#37474F');
  px(ctx, x - 6, y - 4, 12, 2, '#455A64');
  // Back - tall command chair back
  px(ctx, x - 8, y - 20, 3, 16, '#2a3a4a');
  px(ctx, x + 5, y - 20, 3, 16, '#2a3a4a');
  px(ctx, x - 8, y - 20, 16, 4, '#3a4a5a');
  // Headrest
  px(ctx, x - 6, y - 22, 12, 3, '#455A64');
  // Armrests
  px(ctx, x - 10, y - 10, 3, 6, '#37474F');
  px(ctx, x + 7, y - 10, 3, 6, '#37474F');
  // Base/swivel
  px(ctx, x - 3, y - 2, 6, 4, '#1a1a1a');
  px(ctx, x - 2, y + 2, 4, 2, '#0a0a0a');
}

function drawBigConsole(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Large command console surface
  drawIsometricBlock(ctx, { col, row }, 14, '#455A64', '#37474F', '#263238');
  // Triple monitors
  px(ctx, x - 20, y - 30, 14, 12, '#1a1a2e');
  px(ctx, x - 18, y - 28, 10, 8, tick % 80 < 75 ? '#00ccff' : '#0088aa');
  px(ctx, x - 3, y - 32, 16, 14, '#1a1a2e');
  px(ctx, x - 1, y - 30, 12, 10, tick % 80 < 70 ? '#ff6b00' : '#aa4400');
  px(ctx, x + 10, y - 30, 14, 12, '#1a1a2e');
  px(ctx, x + 12, y - 28, 10, 8, tick % 80 < 65 ? '#00ff88' : '#00aa55');
  // Stands
  px(ctx, x - 14, y - 18, 3, 4, '#37474F');
  px(ctx, x + 1, y - 18, 3, 4, '#37474F');
  px(ctx, x + 16, y - 18, 3, 4, '#37474F');
  // Control panel buttons
  px(ctx, x - 10, y - 12, 20, 4, '#2a3a4a');
  for (let i = 0; i < 5; i++) {
    const colors = ['#ff6b00', '#00ff88', '#00ccff', '#ffaa00', '#ff3355'];
    px(ctx, x - 8 + i * 4, y - 11, 2, 2, tick % (40 + i * 5) < 30 ? colors[i] : '#333333');
  }
}

function drawCaptainChair(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Throne-like captain's chair
  px(ctx, x - 10, y - 6, 20, 5, '#1a1a3a');
  px(ctx, x - 8, y - 4, 16, 3, '#2a2a4a');
  // High back
  px(ctx, x - 10, y - 26, 20, 22, '#0a0a2a');
  px(ctx, x - 8, y - 24, 16, 18, '#1a1a3a');
  // Gold trim
  px(ctx, x - 10, y - 26, 20, 2, '#ffd700');
  px(ctx, x - 10, y - 6, 2, 2, '#ffd700');
  px(ctx, x + 8, y - 6, 2, 2, '#ffd700');
  // Armrests with controls
  px(ctx, x - 14, y - 12, 5, 8, '#1a1a3a');
  px(ctx, x + 9, y - 12, 5, 8, '#1a1a3a');
  px(ctx, x - 13, y - 10, 3, 4, '#ff6b00');
  px(ctx, x + 10, y - 10, 3, 4, '#00ccff');
  // Base
  px(ctx, x - 4, y - 1, 8, 4, '#0a0a1a');
}

function drawHolographicDisplay(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Projector base
  px(ctx, x - 6, y - 4, 12, 4, '#37474F');
  px(ctx, x - 4, y - 6, 8, 3, '#455A64');
  // Holographic projection (animated)
  const alpha = 0.4 + Math.sin(tick * 0.05) * 0.2;
  ctx.fillStyle = `rgba(0, 204, 255, ${alpha})`;
  ctx.beginPath();
  ctx.ellipse(x, y - 20, 10 + Math.sin(tick * 0.03) * 2, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  // Hologram lines
  ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x - 8, y - 16 - i * 4);
    ctx.lineTo(x + 8, y - 16 - i * 4);
    ctx.stroke();
  }
  // Light beam
  ctx.fillStyle = `rgba(0, 204, 255, 0.15)`;
  ctx.beginPath();
  ctx.moveTo(x - 3, y - 6);
  ctx.lineTo(x - 10, y - 30);
  ctx.lineTo(x + 10, y - 30);
  ctx.lineTo(x + 3, y - 6);
  ctx.closePath();
  ctx.fill();
}

function drawViewport(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Window frame - metallic
  px(ctx, x - 18, y - 40, 36, 36, '#37474F');
  px(ctx, x - 16, y - 38, 32, 32, '#263238');
  // Space view
  px(ctx, x - 14, y - 36, 28, 28, '#0a0e1a');
  // Stars
  const starPositions = [
    [-10, -32], [-5, -28], [2, -34], [8, -26], [-8, -20],
    [6, -18], [-2, -14], [10, -30], [-12, -24], [4, -22],
  ];
  for (const [sx, sy] of starPositions) {
    const twinkle = Math.sin(tick * 0.1 + sx + sy) > 0.3;
    px(ctx, x + sx, y + sy, 2, 2, twinkle ? '#ffffff' : '#aaaaaa');
  }
  // Distant planet
  ctx.fillStyle = '#ff6b00';
  ctx.beginPath();
  ctx.arc(x + 8, y - 16, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#cc5500';
  ctx.beginPath();
  ctx.arc(x + 9, y - 15, 2, 0, Math.PI * 2);
  ctx.fill();
  // Frame rivets
  px(ctx, x - 16, y - 38, 2, 2, '#546E7A');
  px(ctx, x + 14, y - 38, 2, 2, '#546E7A');
  px(ctx, x - 16, y - 8, 2, 2, '#546E7A');
  px(ctx, x + 14, y - 8, 2, 2, '#546E7A');
}

function drawBulkhead(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  const wallH = 24;
  // Heavy metal bulkhead
  ctx.fillStyle = '#2a3a4a';
  ctx.beginPath();
  ctx.moveTo(x, y - TILE_H / 2 - wallH);
  ctx.lineTo(x + TILE_W / 2, y - wallH);
  ctx.lineTo(x, y + TILE_H / 2 - wallH);
  ctx.lineTo(x - TILE_W / 2, y - wallH);
  ctx.closePath();
  ctx.fill();
  // Left face
  ctx.fillStyle = '#1a2a3a';
  ctx.beginPath();
  ctx.moveTo(x - TILE_W / 2, y - wallH);
  ctx.lineTo(x, y + TILE_H / 2 - wallH);
  ctx.lineTo(x, y + TILE_H / 2);
  ctx.lineTo(x - TILE_W / 2, y);
  ctx.closePath();
  ctx.fill();
  // Right face
  ctx.fillStyle = '#0a1a2a';
  ctx.beginPath();
  ctx.moveTo(x + TILE_W / 2, y - wallH);
  ctx.lineTo(x, y + TILE_H / 2 - wallH);
  ctx.lineTo(x, y + TILE_H / 2);
  ctx.lineTo(x + TILE_W / 2, y);
  ctx.closePath();
  ctx.fill();
  // Warning stripe
  px(ctx, x - 6, y - 10, 12, 3, '#ff6b00');
}

function drawAirlockDoor(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Door frame
  px(ctx, x - 14, y - 36, 28, 32, '#37474F');
  // Door panels
  px(ctx, x - 12, y - 34, 11, 28, '#455A64');
  px(ctx, x + 1, y - 34, 11, 28, '#455A64');
  // Center seam
  px(ctx, x - 1, y - 34, 2, 28, '#263238');
  // Warning lights
  const alertOn = tick % 40 < 20;
  px(ctx, x - 10, y - 32, 4, 4, alertOn ? '#ff3355' : '#661122');
  px(ctx, x + 6, y - 32, 4, 4, alertOn ? '#ff3355' : '#661122');
  // Handle/controls
  px(ctx, x - 2, y - 20, 4, 8, '#ff6b00');
  // Pressure indicator
  px(ctx, x - 6, y - 8, 12, 3, '#00ff88');
}

function drawServerRack(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Rack body
  px(ctx, x - 10, y - 38, 20, 34, '#1a1a2e');
  px(ctx, x - 8, y - 36, 16, 30, '#0a0a1a');
  // Server units with blinking lights
  for (let i = 0; i < 5; i++) {
    const uy = y - 34 + i * 6;
    px(ctx, x - 7, uy, 14, 4, '#263238');
    // Status lights
    const lightOn1 = ((tick + i * 7) % 20) < 14;
    const lightOn2 = ((tick + i * 3) % 30) < 25;
    const lightOn3 = ((tick + i * 11) % 25) < 18;
    px(ctx, x - 5, uy + 1, 2, 2, lightOn1 ? '#00ff88' : '#004422');
    px(ctx, x - 2, uy + 1, 2, 2, lightOn2 ? '#00ccff' : '#003344');
    px(ctx, x + 1, uy + 1, 2, 2, lightOn3 ? '#ff6b00' : '#442200');
    // Vents
    for (let v = 0; v < 2; v++) {
      px(ctx, x + 4 + v * 2, uy + 1, 1, 2, '#37474F');
    }
  }
  // Power indicator
  px(ctx, x - 8, y - 6, 16, 2, tick % 60 < 55 ? '#00ff88' : '#004422');
}

function drawOxygenPlant(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Cylindrical container
  px(ctx, x - 6, y - 20, 12, 16, '#37474F');
  px(ctx, x - 4, y - 18, 8, 12, '#00aa55');
  // Dome top
  ctx.fillStyle = '#455A64';
  ctx.beginPath();
  ctx.arc(x, y - 20, 6, Math.PI, 0);
  ctx.fill();
  // Bioluminescent plant inside
  const sway = Math.sin(tick * 0.04) * 2;
  ctx.fillStyle = '#00ff88';
  ctx.beginPath();
  ctx.ellipse(x + sway * 0.5, y - 12, 3, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#88ffaa';
  ctx.beginPath();
  ctx.ellipse(x - 2 + sway, y - 10, 2, 3, -0.3, 0, Math.PI * 2);
  ctx.fill();
  // O2 bubbles
  if (tick % 30 < 20) {
    ctx.fillStyle = '#88ffaa80';
    ctx.beginPath();
    ctx.arc(x + 2, y - 22 - (tick % 15), 2, 0, Math.PI * 2);
    ctx.fill();
  }
  // Base
  px(ctx, x - 7, y - 4, 14, 4, '#263238');
}

function drawCryopod(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Pod base
  px(ctx, x - 8, y - 4, 16, 6, '#263238');
  // Pod body
  px(ctx, x - 7, y - 26, 14, 24, '#37474F');
  // Glass viewing window
  px(ctx, x - 5, y - 22, 10, 14, '#0a2a3a');
  px(ctx, x - 4, y - 20, 8, 10, '#1a4a5a');
  // Frost effect
  const frostAlpha = 0.3 + Math.sin(tick * 0.02) * 0.1;
  ctx.fillStyle = `rgba(200, 230, 255, ${frostAlpha})`;
  ctx.fillRect(x - 4, y - 18, 8, 6);
  // Status lights
  px(ctx, x - 6, y - 6, 3, 2, tick % 80 < 70 ? '#00ff88' : '#004422');
  px(ctx, x + 3, y - 6, 3, 2, '#00ccff');
  // Life signs indicator
  if (tick % 40 < 35) {
    px(ctx, x - 2, y - 8, 4, 1, '#00ff88');
  }
}

function drawFoodSynthesizer(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Machine body
  px(ctx, x - 10, y - 28, 20, 24, '#455A64');
  px(ctx, x - 8, y - 24, 16, 16, '#37474F');
  // Display screen
  px(ctx, x - 6, y - 22, 12, 8, '#1a1a2e');
  px(ctx, x - 5, y - 21, 10, 6, tick % 90 < 80 ? '#ff6b00' : '#aa4400');
  // Dispensing slot
  px(ctx, x - 4, y - 12, 8, 6, '#263238');
  // Control buttons
  px(ctx, x - 6, y - 6, 4, 3, '#00ff88');
  px(ctx, x + 2, y - 6, 4, 3, '#00ccff');
  // Steam/dispensing effect
  if (tick % 60 < 20) {
    ctx.fillStyle = '#FFFFFF40';
    ctx.fillRect(x - 2, y - 16 - (tick % 10), 4, 3);
  }
}

function drawWaterRecycler(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Main body
  px(ctx, x - 8, y - 26, 16, 22, '#37474F');
  // Water tank (visible)
  px(ctx, x - 6, y - 22, 12, 14, '#1a4a6a');
  // Water level animation
  const level = 8 + Math.sin(tick * 0.03) * 2;
  px(ctx, x - 5, y - 10 - level, 10, level, '#00ccff');
  // Bubbles
  if (tick % 20 < 15) {
    px(ctx, x - 2 + (tick % 6), y - 14, 2, 2, '#88ddff');
  }
  // Controls
  px(ctx, x - 6, y - 6, 12, 3, '#263238');
  px(ctx, x - 4, y - 5, 3, 1, '#00ff88');
  px(ctx, x + 1, y - 5, 3, 1, tick % 40 < 30 ? '#00ccff' : '#004455');
}

function drawBriefingTable(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Hexagonal table top
  drawIsometricBlock(ctx, { col, row }, 10, '#3a4a5a', '#2a3a4a', '#1a2a3a');
  // Central holographic projector
  px(ctx, x - 3, y - 14, 6, 4, '#263238');
  px(ctx, x - 2, y - 16, 4, 3, '#00ccff');
}

function drawBriefingChair(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Simple space chair
  px(ctx, x - 6, y - 6, 12, 4, '#455A64');
  px(ctx, x - 6, y - 14, 12, 10, '#37474F');
  // Legs
  px(ctx, x - 4, y - 2, 2, 4, '#263238');
  px(ctx, x + 2, y - 2, 2, 4, '#263238');
}

function drawResearchConsole(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Console body
  drawIsometricBlock(ctx, { col, row }, 12, '#3a5a4a', '#2a4a3a', '#1a3a2a');
  // Screen
  px(ctx, x - 8, y - 24, 16, 10, '#1a1a2e');
  px(ctx, x - 6, y - 22, 12, 6, tick % 70 < 65 ? '#00ff88' : '#00aa55');
  // Data visualization
  if (tick % 70 < 65) {
    for (let i = 0; i < 4; i++) {
      const h = 2 + Math.floor(Math.random() * 3);
      px(ctx, x - 4 + i * 3, y - 20, 2, h, '#88ffcc');
    }
  }
  // Microscope/sensor
  px(ctx, x + 4, y - 16, 4, 8, '#546E7A');
  px(ctx, x + 5, y - 18, 2, 3, '#00ccff');
}

function drawSpecimenTank(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Tank frame
  px(ctx, x - 8, y - 30, 16, 26, '#37474F');
  // Glass/liquid
  px(ctx, x - 6, y - 28, 12, 22, '#0a3a4a');
  // Specimen (floating blob)
  const floatY = Math.sin(tick * 0.04) * 3;
  ctx.fillStyle = '#ff88aa';
  ctx.beginPath();
  ctx.ellipse(x, y - 16 + floatY, 4, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  // Bubbles
  if (tick % 25 < 20) {
    ctx.fillStyle = '#88ffff60';
    ctx.beginPath();
    ctx.arc(x - 3, y - 10 - (tick % 12), 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 2, y - 8 - (tick % 15), 2, 0, Math.PI * 2);
    ctx.fill();
  }
  // Base
  px(ctx, x - 8, y - 4, 16, 4, '#263238');
}

function drawStatusPanel(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Panel frame
  px(ctx, x - 10, y - 24, 20, 18, '#37474F');
  px(ctx, x - 8, y - 22, 16, 14, '#1a1a2e');
  // Status bars
  px(ctx, x - 6, y - 20, 12, 2, '#00ff88');
  px(ctx, x - 6, y - 16, 10, 2, '#00ccff');
  px(ctx, x - 6, y - 12, 8, 2, tick % 50 < 40 ? '#ffaa00' : '#aa6600');
  // Blinking indicator
  px(ctx, x + 4, y - 20, 2, 2, tick % 30 < 20 ? '#ff6b00' : '#442200');
}

function drawStarMap(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Frame
  px(ctx, x - 14, y - 30, 28, 24, '#37474F');
  // Map background (deep space)
  px(ctx, x - 12, y - 28, 24, 20, '#0a0e1a');
  // Star systems
  const stars = [[-8, -24], [-3, -20], [4, -26], [8, -18], [-6, -14], [2, -12], [6, -22]];
  for (const [sx, sy] of stars) {
    const twinkle = Math.sin(tick * 0.08 + sx * sy) > 0;
    px(ctx, x + sx, y + sy, 2, 2, twinkle ? '#ffffff' : '#888888');
  }
  // Route line
  ctx.strokeStyle = '#ff6b00';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);
  ctx.beginPath();
  ctx.moveTo(x - 8, y - 24);
  ctx.lineTo(x + 2, y - 18);
  ctx.lineTo(x + 8, y - 12);
  ctx.stroke();
  ctx.setLineDash([]);
  // Current position (blinking)
  if (tick % 40 < 30) {
    px(ctx, x - 8, y - 24, 3, 3, '#ff3355');
  }
}

function drawMissionPatch(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Circular patch
  ctx.fillStyle = '#1a2a4a';
  ctx.beginPath();
  ctx.arc(x, y - 16, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Rocket icon
  ctx.fillStyle = '#ff6b00';
  ctx.beginPath();
  ctx.moveTo(x, y - 24);
  ctx.lineTo(x - 4, y - 12);
  ctx.lineTo(x + 4, y - 12);
  ctx.closePath();
  ctx.fill();
  // Stars
  px(ctx, x - 6, y - 20, 2, 2, '#ffffff');
  px(ctx, x + 4, y - 18, 2, 2, '#ffffff');
}

function drawWarningLight(ctx: CanvasRenderingContext2D, col: number, row: number, tick: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Mount
  px(ctx, x - 4, y - 8, 8, 6, '#37474F');
  // Light dome
  const on = tick % 30 < 15;
  ctx.fillStyle = on ? '#ff3355' : '#661122';
  ctx.beginPath();
  ctx.arc(x, y - 12, 5, Math.PI, 0);
  ctx.fill();
  // Glow effect when on
  if (on) {
    ctx.fillStyle = 'rgba(255, 51, 85, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y - 12, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFloorGrating(ctx: CanvasRenderingContext2D, col: number, row: number): void {
  const { x, y } = gridToScreen({ col, row });
  // Metallic grating pattern
  ctx.fillStyle = '#2a3a4a80';
  ctx.beginPath();
  ctx.moveTo(x, y - TILE_H / 2);
  ctx.lineTo(x + TILE_W / 2, y);
  ctx.lineTo(x, y + TILE_H / 2);
  ctx.lineTo(x - TILE_W / 2, y);
  ctx.closePath();
  ctx.fill();
  // Grating lines
  ctx.strokeStyle = '#1a2a3a';
  ctx.lineWidth = 1;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * 4, y - TILE_H / 4);
    ctx.lineTo(x + i * 4, y + TILE_H / 4);
    ctx.stroke();
  }
}

// ---------------------------------------------------------------------------
// Main dispatcher
// ---------------------------------------------------------------------------

export function drawFurniture(
  ctx: CanvasRenderingContext2D,
  type: FurnitureType,
  col: number,
  row: number,
  tick: number,
): void {
  switch (type) {
    case 'console_station': return drawConsoleStation(ctx, col, row, tick);
    case 'command_chair': return drawCommandChair(ctx, col, row);
    case 'big_console': return drawBigConsole(ctx, col, row, tick);
    case 'captain_chair': return drawCaptainChair(ctx, col, row);
    case 'holographic_display': return drawHolographicDisplay(ctx, col, row, tick);
    case 'viewport': return drawViewport(ctx, col, row, tick);
    case 'bulkhead': return drawBulkhead(ctx, col, row);
    case 'airlock_door': return drawAirlockDoor(ctx, col, row, tick);
    case 'server_rack': return drawServerRack(ctx, col, row, tick);
    case 'oxygen_plant': return drawOxygenPlant(ctx, col, row, tick);
    case 'cryopod': return drawCryopod(ctx, col, row, tick);
    case 'food_synthesizer': return drawFoodSynthesizer(ctx, col, row, tick);
    case 'water_recycler': return drawWaterRecycler(ctx, col, row, tick);
    case 'briefing_table': return drawBriefingTable(ctx, col, row);
    case 'briefing_chair': return drawBriefingChair(ctx, col, row);
    case 'research_console': return drawResearchConsole(ctx, col, row, tick);
    case 'specimen_tank': return drawSpecimenTank(ctx, col, row, tick);
    case 'status_panel': return drawStatusPanel(ctx, col, row, tick);
    case 'star_map': return drawStarMap(ctx, col, row, tick);
    case 'mission_patch': return drawMissionPatch(ctx, col, row);
    case 'warning_light': return drawWarningLight(ctx, col, row, tick);
    case 'floor_grating': return drawFloorGrating(ctx, col, row);
  }
}
