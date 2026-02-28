// ============================================================================
// Zone Definitions — Space Station Command Center Areas
// ============================================================================

import type { Zone, ZoneId } from '@/lib/types';

// ---------------------------------------------------------------------------
// Zone templates - Space Station Layout
// ---------------------------------------------------------------------------

export const ZONES_TEMPLATE: Record<ZoneId, Omit<Zone, 'id'>> = {
  // Individual crew console stations (in the central hub)
  console_0: { label: 'Console Alpha', emoji: '🖥️', center: { col: 10, row: 9 }, minCol: 9, maxCol: 11, minRow: 8, maxRow: 10 },
  console_1: { label: 'Console Beta', emoji: '🖥️', center: { col: 13, row: 9 }, minCol: 12, maxCol: 14, minRow: 8, maxRow: 10 },
  console_2: { label: 'Console Gamma', emoji: '🖥️', center: { col: 10, row: 12 }, minCol: 9, maxCol: 11, minRow: 11, maxRow: 13 },
  console_3: { label: 'Console Delta', emoji: '🖥️', center: { col: 13, row: 12 }, minCol: 12, maxCol: 14, minRow: 11, maxRow: 13 },
  console_4: { label: 'Console Epsilon', emoji: '🖥️', center: { col: 8, row: 10 }, minCol: 7, maxCol: 9, minRow: 9, maxRow: 11 },
  console_5: { label: 'Console Zeta', emoji: '🖥️', center: { col: 15, row: 10 }, minCol: 14, maxCol: 16, minRow: 9, maxRow: 11 },

  // Command Bridge - top center (captain's area)
  command_bridge: { label: 'Command Bridge', emoji: '🚀', center: { col: 12, row: 3 }, minCol: 10, maxCol: 14, minRow: 1, maxRow: 5 },

  // Mess Hall - right side (food/break area)
  mess_hall: { label: 'Mess Hall', emoji: '🍜', center: { col: 20, row: 3 }, minCol: 18, maxCol: 22, minRow: 1, maxRow: 5 },

  // Briefing Room - left side
  briefing_room: { label: 'Briefing Room', emoji: '📋', center: { col: 4, row: 3 }, minCol: 2, maxCol: 6, minRow: 1, maxRow: 5 },

  // Research Bay - left wing
  research_bay: { label: 'Research Bay', emoji: '🔬', center: { col: 3, row: 10 }, minCol: 1, maxCol: 5, minRow: 8, maxRow: 12 },

  // Crew Quarters - bottom left
  crew_quarters: { label: 'Crew Quarters', emoji: '🛏️', center: { col: 3, row: 16 }, minCol: 1, maxCol: 5, minRow: 14, maxRow: 18 },

  // Observation Deck - top right (windows to space)
  observation_deck: { label: 'Observation Deck', emoji: '🌌', center: { col: 20, row: 10 }, minCol: 18, maxCol: 22, minRow: 8, maxRow: 12 },

  // Server Core - right wing
  server_core: { label: 'Server Core', emoji: '💾', center: { col: 20, row: 16 }, minCol: 18, maxCol: 22, minRow: 14, maxRow: 18 },

  // Airlock - bottom center
  airlock: { label: 'Airlock', emoji: '🚪', center: { col: 12, row: 18 }, minCol: 10, maxCol: 14, minRow: 17, maxRow: 19 },

  // Project Labs - specialized work areas extending from central hub
  project_lab_1: { label: 'Lab Module A', emoji: '⚗️', center: { col: 6, row: 7 }, minCol: 5, maxCol: 7, minRow: 6, maxRow: 8 },
  project_lab_2: { label: 'Lab Module B', emoji: '🧬', center: { col: 17, row: 7 }, minCol: 16, maxCol: 18, minRow: 6, maxRow: 8 },
  project_lab_3: { label: 'Lab Module C', emoji: '⚙️', center: { col: 12, row: 15 }, minCol: 10, maxCol: 14, minRow: 14, maxRow: 16 },
};

// ---------------------------------------------------------------------------
// Build zone map for N agents
// ---------------------------------------------------------------------------

export function buildZoneMap(agentCount: number): Record<ZoneId, Zone> {
  const zones: Partial<Record<ZoneId, Zone>> = {};
  for (const [id, tmpl] of Object.entries(ZONES_TEMPLATE)) {
    const zoneId = id as ZoneId;
    // Only include consoles that have agents
    if (zoneId.startsWith('console_')) {
      const idx = parseInt(zoneId.replace('console_', ''), 10);
      if (idx >= agentCount) continue;
    }
    zones[zoneId] = { id: zoneId, ...tmpl };
  }
  return zones as Record<ZoneId, Zone>;
}

// ---------------------------------------------------------------------------
// Get zone by id
// ---------------------------------------------------------------------------

export function getZone(id: ZoneId, agentCount: number): Zone | undefined {
  const zones = buildZoneMap(agentCount);
  return zones[id];
}

// ---------------------------------------------------------------------------
// Get a random walkable point within a zone
// ---------------------------------------------------------------------------

export function getRandomPointInZone(zone: Zone): { col: number; row: number } {
  const col = zone.minCol + Math.floor(Math.random() * (zone.maxCol - zone.minCol + 1));
  const row = zone.minRow + Math.floor(Math.random() * (zone.maxRow - zone.minRow + 1));
  return { col, row };
}
