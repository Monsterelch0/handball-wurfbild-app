import Dexie, { type EntityTable } from 'dexie'
import type { Game, Player, Shot, SevenMeter } from '@/types'

class WurfbildDB extends Dexie {
  games!: EntityTable<Game, 'id'>
  players!: EntityTable<Player, 'id'>
  shots!: EntityTable<Shot, 'id'>
  sevenMeters!: EntityTable<SevenMeter, 'id'>

  constructor() {
    super('WurfbildDB')

    this.version(1).stores({
      // Primary key first, then indexed fields
      games: 'id, createdAt',
      players: 'id, gameId, [gameId+team], number',
      shots: 'id, gameId, playerId, [gameId+playerId], createdAt',
      sevenMeters: 'id, gameId, playerId, createdAt',
    })
  }
}

// Singleton – wird in der gesamten App verwendet
export const db = new WurfbildDB()
