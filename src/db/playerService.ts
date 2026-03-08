import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db/database'
import type { Player, TeamSide } from '@/types'

export async function addPlayer(
  data: Omit<Player, 'id'>
): Promise<Player> {
  const player: Player = { id: uuidv4(), ...data }
  await db.players.add(player)
  return player
}

export async function getPlayersForGame(gameId: string): Promise<Player[]> {
  return db.players.where('gameId').equals(gameId).sortBy('number')
}

export async function getPlayersByTeam(gameId: string, team: TeamSide): Promise<Player[]> {
  return db.players
    .where('[gameId+team]')
    .equals([gameId, team])
    .sortBy('number')
}

export async function updatePlayer(id: string, changes: Partial<Player>): Promise<void> {
  await db.players.update(id, changes)
}

export async function deletePlayer(id: string): Promise<void> {
  await db.players.delete(id)
}

/**
 * Bulk-Import aus CSV-geparsten Daten.
 * Erwartet ein Array von { number, name } – team wird als Parameter übergeben.
 */
export async function importPlayers(
  gameId: string,
  team: TeamSide,
  entries: Array<{ number: number; name: string }>
): Promise<Player[]> {
  const players: Player[] = entries.map((e) => ({
    id: uuidv4(),
    gameId,
    team,
    number: e.number,
    name: e.name,
  }))
  await db.players.bulkAdd(players)
  return players
}
