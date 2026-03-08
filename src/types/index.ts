// ─── Enums / Union Types ───────────────────────────────────────────────────

export type ShotType = 'schlagwurf' | 'sprungwurf' | 'dreher' | 'heber' | 'kempa'

export type ShotResult = 'goal' | 'saved' | 'blocked' | 'missed'

export type SevenMeterResult = 'goal' | 'saved' | 'missed'

export type TeamSide = 'home' | 'guest'

// ─── Score ─────────────────────────────────────────────────────────────────

export interface Score {
  home: number
  guest: number
}

// ─── Game ──────────────────────────────────────────────────────────────────

export interface Game {
  id: string
  date: string           // ISO date: '2026-03-08'
  homeTeam: string
  guestTeam: string
  competition?: string   // z.B. 'Verbandsliga Nord'
  homeScore: number
  guestScore: number
  createdAt: string      // ISO datetime
  syncedAt?: string
}

// ─── Player ────────────────────────────────────────────────────────────────

export interface Player {
  id: string
  gameId: string
  number: number         // Trikotnummer
  name: string
  team: TeamSide
}

// ─── Shot ──────────────────────────────────────────────────────────────────

export interface Shot {
  id: string
  gameId: string
  playerId: string
  minute?: number        // Spielminute 0–60
  half: 1 | 2
  score: Score           // Spielstand zum Zeitpunkt des Wurfs
  drawData: string       // JSON-String: Canvas-Pfad-Daten
  shotType: ShotType
  feint: boolean         // Körpertäuschung vorhanden?
  result: ShotResult
  createdAt: string
}

// ─── 7-Meter ───────────────────────────────────────────────────────────────

export interface SevenMeter {
  id: string
  gameId: string
  playerId: string
  minute?: number
  score: Score
  feints: number         // Anzahl Antäuschungen (0–5+)
  drawData?: string      // optionale Wurfrichtungs-Daten
  result: SevenMeterResult
  createdAt: string
}
