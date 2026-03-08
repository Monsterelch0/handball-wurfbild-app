import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db/database'
import type { Game } from '@/types'

export async function createGame(
  data: Omit<Game, 'id' | 'createdAt' | 'homeScore' | 'guestScore'>
): Promise<Game> {
  const game: Game = {
    id: uuidv4(),
    homeScore: 0,
    guestScore: 0,
    createdAt: new Date().toISOString(),
    ...data,
  }
  await db.games.add(game)
  return game
}

export async function getGame(id: string): Promise<Game | undefined> {
  return db.games.get(id)
}

export async function getAllGames(): Promise<Game[]> {
  return db.games.orderBy('createdAt').reverse().toArray()
}

export async function updateScore(
  id: string,
  homeScore: number,
  guestScore: number
): Promise<void> {
  await db.games.update(id, { homeScore, guestScore })
}

export async function updateGame(id: string, changes: Partial<Game>): Promise<void> {
  await db.games.update(id, changes)
}

export async function deleteGame(id: string): Promise<void> {
  // Kaskadierendes Löschen aller zugehörigen Daten
  await db.transaction('rw', db.games, db.players, db.shots, db.sevenMeters, async () => {
    await db.shots.where('gameId').equals(id).delete()
    await db.sevenMeters.where('gameId').equals(id).delete()
    await db.players.where('gameId').equals(id).delete()
    await db.games.delete(id)
  })
}
