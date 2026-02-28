// ============================================================================
// Space Station Layout — Map dimensions, furniture placement, floor colors, walk grid
// ============================================================================

import type { FurnitureItem, Zone, ZoneId, TileType } from '@/lib/types';
import { ZONES_TEMPLATE, buildZoneMap } from './zones';

// ---------------------------------------------------------------------------
// Map Dimensions
// ---------------------------------------------------------------------------

export const MAP_COLS = 24;
export const MAP_ROWS = 20;

// ---------------------------------------------------------------------------
// Floor color helper - Metallic space station tiles
// ---------------------------------------------------------------------------

export function getFloorColor(col: number, row: number): string {
  // Default metallic floor - checkerboard pattern
  const isLight = (col + row) % 2 === 0;
  let base = isLight ? '#2a3544' : '#232d3c';

  // Command Bridge — blue accent floor
  if (col >= 10 && col <= 14 && row >= 1 && row <= 5) {
    return isLight ? '#1a3050' : '#152840';
  }

  // Central Hub (main command area) — orange accent
  if (col >= 7 && col <= 16 && row >= 7 && row <= 14) {
    return isLight ? '#3a2820' : '#302018';
  }

  // Mess Hall — warm amber floor
  if (col >= 18 && col <= 22 && row >= 1 && row <= 5) {
    return isLight ? '#3a3020' : '#302818';
  }

  // Briefing Room — teal accent
  if (col >= 2 && col <= 6 && row >= 1 && row <= 5) {
    return isLight ? '#203038' : '#182830';
  }

  // Research Bay — green accent
  if (col >= 1 && col <= 5 && row >= 8 && row <= 12) {
    return isLight ? '#203028' : '#182820';
  }

  // Crew Quarters — purple/restful
  if (col >= 1 && col <= 5 && row >= 14 && row <= 18) {
    return isLight ? '#2a2535' : '#22202d';
  }

  // Observation Deck — deep blue (space view)
  if (col >= 18 && col <= 22 && row >= 8 && row <= 12) {
    return isLight ? '#151830' : '#101428';
  }

  // Server Core — cold blue/cyan
  if (col >= 18 && col <= 22 && row >= 14 && row <= 18) {
    return isLight ? '#182530' : '#141f28';
  }

  // Airlock — warning yellow/orange stripes effect
  if (col >= 10 && col <= 14 && row >= 17 && row <= 19) {
    return (col + row) % 3 === 0 ? '#4a3500' : '#2a2520';
  }

  // Project Labs — orange work areas
  if ((col >= 5 && col <= 7 && row >= 6 && row <= 8) ||
      (col >= 16 && col <= 18 && row >= 6 && row <= 8) ||
      (col >= 10 && col <= 14 && row >= 14 && row <= 16)) {
    return isLight ? '#3a2a18' : '#302210';
  }

  return base;
}

// ---------------------------------------------------------------------------
// Furniture layout builder - Space Station
// ---------------------------------------------------------------------------

export function buildFurnitureLayout(agentCount: number): FurnitureItem[] {
  const items: FurnitureItem[] = [];

  // --- Crew Console Stations (up to 6) in central hub ---
  const consolePositions = [
    { col: 10, row: 9 },   // Alpha
    { col: 13, row: 9 },   // Beta
    { col: 10, row: 12 },  // Gamma
    { col: 13, row: 12 },  // Delta
    { col: 8, row: 10 },   // Epsilon
    { col: 15, row: 10 },  // Zeta
  ];
  const chairPositions = [
    { col: 10, row: 10 },
    { col: 13, row: 10 },
    { col: 10, row: 13 },
    { col: 13, row: 13 },
    { col: 8, row: 11 },
    { col: 15, row: 11 },
  ];

  for (let i = 0; i < Math.min(agentCount, 6); i++) {
    items.push({ type: 'console_station', ...consolePositions[i] });
    items.push({ type: 'command_chair', ...chairPositions[i] });
  }

  // --- Command Bridge ---
  items.push({ type: 'big_console', col: 12, row: 2 });
  items.push({ type: 'captain_chair', col: 12, row: 3 });
  items.push({ type: 'viewport', col: 10, row: 1 });
  items.push({ type: 'viewport', col: 14, row: 1 });
  items.push({ type: 'holographic_display', col: 11, row: 4 });
  items.push({ type: 'holographic_display', col: 13, row: 4 });
  items.push({ type: 'status_panel', col: 10, row: 4 });
  items.push({ type: 'status_panel', col: 14, row: 4 });

  // --- Briefing Room ---
  items.push({ type: 'briefing_table', col: 4, row: 3 });
  items.push({ type: 'briefing_chair', col: 3, row: 3 });
  items.push({ type: 'briefing_chair', col: 5, row: 3 });
  items.push({ type: 'briefing_chair', col: 4, row: 2 });
  items.push({ type: 'briefing_chair', col: 4, row: 4 });
  items.push({ type: 'star_map', col: 6, row: 2 });
  items.push({ type: 'holographic_display', col: 2, row: 2 });

  // --- Mess Hall ---
  items.push({ type: 'food_synthesizer', col: 20, row: 2 });
  items.push({ type: 'water_recycler', col: 22, row: 2 });
  items.push({ type: 'briefing_table', col: 20, row: 4 });
  items.push({ type: 'command_chair', col: 19, row: 4 });
  items.push({ type: 'command_chair', col: 21, row: 4 });
  items.push({ type: 'oxygen_plant', col: 18, row: 2 });

  // --- Research Bay ---
  items.push({ type: 'research_console', col: 2, row: 9 });
  items.push({ type: 'research_console', col: 2, row: 11 });
  items.push({ type: 'specimen_tank', col: 4, row: 9 });
  items.push({ type: 'specimen_tank', col: 4, row: 11 });
  items.push({ type: 'holographic_display', col: 3, row: 10 });

  // --- Crew Quarters ---
  items.push({ type: 'cryopod', col: 2, row: 15 });
  items.push({ type: 'cryopod', col: 2, row: 17 });
  items.push({ type: 'cryopod', col: 4, row: 15 });
  items.push({ type: 'cryopod', col: 4, row: 17 });
  items.push({ type: 'oxygen_plant', col: 3, row: 14 });

  // --- Observation Deck ---
  items.push({ type: 'viewport', col: 19, row: 9 });
  items.push({ type: 'viewport', col: 21, row: 9 });
  items.push({ type: 'viewport', col: 19, row: 11 });
  items.push({ type: 'viewport', col: 21, row: 11 });
  items.push({ type: 'command_chair', col: 20, row: 10 });

  // --- Server Core ---
  items.push({ type: 'server_rack', col: 19, row: 15 });
  items.push({ type: 'server_rack', col: 21, row: 15 });
  items.push({ type: 'server_rack', col: 19, row: 17 });
  items.push({ type: 'server_rack', col: 21, row: 17 });
  items.push({ type: 'status_panel', col: 20, row: 14 });
  items.push({ type: 'warning_light', col: 18, row: 14 });
  items.push({ type: 'warning_light', col: 22, row: 14 });

  // --- Airlock ---
  items.push({ type: 'airlock_door', col: 12, row: 18 });
  items.push({ type: 'warning_light', col: 10, row: 17 });
  items.push({ type: 'warning_light', col: 14, row: 17 });
  items.push({ type: 'status_panel', col: 11, row: 17 });
  items.push({ type: 'status_panel', col: 13, row: 17 });

  // --- Project Labs ---
  // Lab Module A (left)
  items.push({ type: 'research_console', col: 6, row: 7 });
  items.push({ type: 'command_chair', col: 5, row: 7 });
  items.push({ type: 'holographic_display', col: 7, row: 6 });

  // Lab Module B (right)
  items.push({ type: 'research_console', col: 17, row: 7 });
  items.push({ type: 'command_chair', col: 18, row: 7 });
  items.push({ type: 'holographic_display', col: 16, row: 6 });

  // Lab Module C (bottom)
  items.push({ type: 'research_console', col: 11, row: 15 });
  items.push({ type: 'research_console', col: 13, row: 15 });
  items.push({ type: 'holographic_display', col: 12, row: 14 });

  // --- Decorations scattered ---
  items.push({ type: 'mission_patch', col: 7, row: 1 });
  items.push({ type: 'mission_patch', col: 16, row: 1 });
  items.push({ type: 'star_map', col: 1, row: 1 });
  items.push({ type: 'status_panel', col: 6, row: 10 });
  items.push({ type: 'status_panel', col: 17, row: 10 });
  items.push({ type: 'oxygen_plant', col: 7, row: 14 });
  items.push({ type: 'oxygen_plant', col: 16, row: 14 });

  // Floor grating in corridors
  items.push({ type: 'floor_grating', col: 7, row: 5 });
  items.push({ type: 'floor_grating', col: 16, row: 5 });
  items.push({ type: 'floor_grating', col: 7, row: 13 });
  items.push({ type: 'floor_grating', col: 16, row: 13 });

  return items;
}

// ---------------------------------------------------------------------------
// Walk grid (pathfinding) - Space Station
// ---------------------------------------------------------------------------

export function createWalkGrid(agentCount: number): TileType[][] {
  const grid: TileType[][] = [];
  for (let r = 0; r < MAP_ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < MAP_COLS; c++) {
      // Outer hull walls
      if (r === 0 || c === 0 || r === MAP_ROWS - 1 || c === MAP_COLS - 1) {
        grid[r][c] = 'wall';
      } else {
        grid[r][c] = 'floor';
      }
    }
  }

  // --- Command Bridge bulkheads ---
  for (let c = 9; c <= 15; c++) {
    grid[5][c] = c === 12 ? 'door' : 'wall'; // Door at center
  }
  grid[2][9] = 'wall';
  grid[3][9] = 'wall';
  grid[4][9] = 'wall';
  grid[2][15] = 'wall';
  grid[3][15] = 'wall';
  grid[4][15] = 'wall';

  // --- Briefing Room bulkheads ---
  for (let c = 1; c <= 7; c++) {
    grid[5][c] = c === 4 ? 'door' : 'wall';
  }
  grid[2][7] = 'wall';
  grid[3][7] = 'wall';
  grid[4][7] = 'wall';

  // --- Mess Hall bulkheads ---
  for (let c = 16; c <= 23; c++) {
    grid[5][c] = c === 20 ? 'door' : 'wall';
  }
  grid[2][16] = 'wall';
  grid[3][16] = 'wall';
  grid[4][16] = 'wall';

  // --- Research Bay bulkheads ---
  for (let r = 7; r <= 13; r++) {
    grid[r][6] = r === 10 ? 'door' : 'wall';
  }
  grid[7][1] = 'wall';
  grid[7][2] = 'wall';
  grid[7][3] = 'wall';
  grid[7][4] = 'wall';
  grid[7][5] = 'wall';
  grid[13][1] = 'wall';
  grid[13][2] = 'wall';
  grid[13][3] = 'wall';
  grid[13][4] = 'wall';
  grid[13][5] = 'wall';

  // --- Crew Quarters bulkheads ---
  for (let r = 13; r <= 19; r++) {
    grid[r][6] = r === 16 ? 'door' : 'wall';
  }

  // --- Observation Deck bulkheads ---
  for (let r = 7; r <= 13; r++) {
    grid[r][17] = r === 10 ? 'door' : 'wall';
  }
  grid[7][18] = 'wall';
  grid[7][19] = 'wall';
  grid[7][20] = 'wall';
  grid[7][21] = 'wall';
  grid[7][22] = 'wall';
  grid[13][18] = 'wall';
  grid[13][19] = 'wall';
  grid[13][20] = 'wall';
  grid[13][21] = 'wall';
  grid[13][22] = 'wall';

  // --- Server Core bulkheads ---
  for (let r = 13; r <= 19; r++) {
    grid[r][17] = r === 16 ? 'door' : 'wall';
  }

  // --- Airlock bulkheads ---
  for (let c = 9; c <= 15; c++) {
    grid[16][c] = c === 12 ? 'door' : 'wall';
  }

  // Mark furniture tiles
  const furniture = buildFurnitureLayout(agentCount);
  for (const item of furniture) {
    if (item.type !== 'floor_grating') {
      if (grid[item.row]?.[item.col] === 'floor') {
        grid[item.row][item.col] = 'furniture';
      }
    }
  }

  return grid;
}

// ---------------------------------------------------------------------------
// Zone builder (re-export from zones.ts for convenience)
// ---------------------------------------------------------------------------

export function buildZones(agentCount: number): Record<ZoneId, Zone> {
  return buildZoneMap(agentCount);
}
