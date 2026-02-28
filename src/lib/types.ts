// ============================================================================
// Agent Dashboard — Core Type Definitions (Space Station Theme)
// ============================================================================

// ---------------------------------------------------------------------------
// Agent Behavior System
// ---------------------------------------------------------------------------

/** All possible agent behaviors/states */
export type AgentBehavior =
  // Work
  | 'working'
  | 'thinking'
  | 'researching'
  | 'meeting'
  | 'deploying'
  | 'debugging'
  // Interaction
  | 'receiving_task'
  | 'reporting'
  // Life
  | 'idle'
  | 'coffee'
  | 'snacking'
  | 'toilet'
  | 'sleeping'
  | 'napping'
  // Anomaly
  | 'panicking'
  | 'dead'
  | 'overloaded'
  | 'reviving';

/** Agent states compatible with the office engine (mapped from AgentBehavior) */
export type AgentState =
  | 'idle'
  | 'working'
  | 'thinking'
  | 'researching'
  | 'meeting'
  | 'deploying'
  | 'resting'
  | 'receiving_task'
  | 'reporting'
  | 'waiting'
  | 'arriving';

/** Space station zone identifiers */
export type ZoneId =
  | 'console_0' | 'console_1' | 'console_2' | 'console_3' | 'console_4' | 'console_5'
  | 'command_bridge'
  | 'mess_hall'
  | 'briefing_room'
  | 'research_bay'
  | 'crew_quarters'
  | 'observation_deck'
  | 'server_core'
  | 'airlock'
  | 'project_lab_1'
  | 'project_lab_2'
  | 'project_lab_3';

/** Pixel coordinate in screen space */
export interface ScreenPos {
  x: number;
  y: number;
}

/** Grid coordinate in isometric tile space */
export interface GridPos {
  col: number;
  row: number;
}

/** Character facing direction */
export type Direction = 'n' | 's' | 'e' | 'w';

/** Character animation state */
export type CharacterAnim =
  | 'stand'
  | 'walk_frame1'
  | 'walk_frame2'
  | 'sit_typing'
  | 'drink_coffee'
  | 'raise_hand'
  | 'headphones'
  | 'sleep'
  | 'run'
  | 'sit_idle'
  | 'thumbs_up'
  | 'hand_task';

/** Furniture/object type (space station) */
export type FurnitureType =
  | 'console_station'
  | 'command_chair'
  | 'holographic_display'
  | 'viewport'
  | 'bulkhead'
  | 'airlock_door'
  | 'server_rack'
  | 'oxygen_plant'
  | 'cryopod'
  | 'food_synthesizer'
  | 'water_recycler'
  | 'briefing_table'
  | 'briefing_chair'
  | 'research_console'
  | 'specimen_tank'
  | 'status_panel'
  | 'star_map'
  | 'mission_patch'
  | 'warning_light'
  | 'floor_grating'
  | 'big_console'
  | 'captain_chair';

/** A furniture item placed on the map */
export interface FurnitureItem {
  type: FurnitureType;
  col: number;
  row: number;
  variant?: number;
}

/** Zone definition */
export interface Zone {
  id: ZoneId;
  label: string;
  emoji: string;
  center: GridPos;
  minCol: number;
  maxCol: number;
  minRow: number;
  maxRow: number;
}

/** A speech bubble */
export interface Bubble {
  text: string;
  ttl: number;
  x: number;
  y: number;
}

/** Effect particle */
export interface Particle {
  type: 'zzz' | 'sparkle' | 'code' | 'question' | 'check' | 'coffee_steam' | 'smoke' | 'error' | 'lightning';
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

/** Tile walkability */
export type TileType = 'floor' | 'wall' | 'furniture' | 'door';

/** State transition info */
export interface StateTransition {
  targetZone: ZoneId | '_own_desk';
  agentAnim: CharacterAnim;
  ownerAnim: CharacterAnim;
  bubble?: string;
  particles?: Particle['type'];
}

// ---------------------------------------------------------------------------
// Agent Runtime (Office Engine)
// ---------------------------------------------------------------------------

export interface AgentRuntime {
  id: string;
  currentState: AgentState;
  pos: GridPos;
  screenPos: ScreenPos;
  direction: Direction;
  anim: CharacterAnim;
  path: GridPos[];
  transitioning: boolean;
  deskZone: ZoneId;
}

export interface OwnerRuntime {
  anim: CharacterAnim;
}

export interface OfficeState {
  agents: AgentRuntime[];
  owner: OwnerRuntime;
  bubbles: Bubble[];
  particles: Particle[];
  tick: number;
  autoMode: boolean;
  autoTimer: number;
  dayNightPhase: number;
}

// ---------------------------------------------------------------------------
// Dashboard Data Types
// ---------------------------------------------------------------------------

/** Avatar preset for agents (space crew) */
export type AgentAvatar = 'commander' | 'engineer' | 'scientist' | 'technician' | 'droid' | 'alien_cat' | 'alien_dog';

/** Avatar preset for the owner */
export type OwnerAvatar = 'captain' | 'admiral' | 'mission_control';

/** Theme preset */
export type ThemeName = 'default' | 'dark' | 'cozy' | 'cyberpunk';

/** Single AI agent configuration */
export interface AgentConfig {
  id: string;
  name: string;
  emoji: string;
  color: string;
  avatar: AgentAvatar;
}

/** Owner configuration */
export interface OwnerConfig {
  name: string;
  emoji: string;
  avatar: OwnerAvatar;
}

/** Gateway connection settings */
export interface GatewayConfig {
  url: string;
  token: string;
}

/** Root configuration for the dashboard */
export interface DashboardConfig {
  agents: AgentConfig[];
  owner: OwnerConfig;
  gateway: GatewayConfig;
  theme: ThemeName;
  connected: boolean;
  demoMode: boolean;
}

// ---------------------------------------------------------------------------
// Agent Dashboard State
// ---------------------------------------------------------------------------

/** Token usage snapshot */
export interface TokenUsage {
  timestamp: number;
  input: number;
  output: number;
  total: number;
}

/** A single task */
export interface AgentTask {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'failed';
  startedAt: number;
  completedAt?: number;
  tokenUsage?: number;
}

/** Activity feed event */
export interface ActivityEvent {
  id: string;
  agentId: string;
  agentName: string;
  agentEmoji: string;
  type: 'state_change' | 'task_start' | 'task_complete' | 'task_fail' | 'tool_call' | 'message' | 'error' | 'system';
  message: string;
  timestamp: number;
}

/** Full agent dashboard state */
export interface AgentDashboardState {
  behavior: AgentBehavior;
  officeState: AgentState;
  currentTask: AgentTask | null;
  taskHistory: AgentTask[];
  tokenUsage: TokenUsage[];
  totalTokens: number;
  contextTokens?: number;
  totalTasks: number;
  lastActivity: number;
  sessionLog: string[];
  uptime: number;
}

/** System-wide statistics */
export interface SystemStats {
  totalAgents: number;
  activeAgents: number;
  totalTokens: number;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  uptime: number;
  connected: boolean;
}
