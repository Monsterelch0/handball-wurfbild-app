import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db/database'
import type { Shot, ShotType, ShotResult } from '@/types'

export async function addShot(data: Omit<Shot, 'id' | 'createdAt'>): Promise<Shot> {
  const shot: Shot = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...data,
  }
  await db.shots.add(shot)
  return shot
}

export async function getShotsForGame(gameId: string): Promise<Shot[]> {
  return db.shots.where('gameId').equals(gameId).sortBy('createdAt')
}

export async function getShotsForPlayer(gameId: string, playerId: string): Promise<Shot[]> {
  return db.shots
    .where('[gameId+playerId]')
    .equals([gameId, playerId])
    .sortBy('createdAt')
}

export async function getShotsFiltered(
  gameId: string,
  filters?: {
    playerId?: string
    half?: 1 | 2
    shotType?: ShotType
    result?: ShotResult
  }
): Promise<Shot[]> {
  let collection = db.shots.where('gameId').equals(gameId)
  const shots = await collection.toArray()

  return shots.filter((s) => {
    if (filters?.playerId && s.playerId !== filters.playerId) return false
    if (filters?.half && s.half !== filters.half) return false
    if (filters?.shotType && s.shotType !== filters.shotType) return false
    if (filters?.result && s.result !== filters.result) return false
    return true
  })
}

export async function deleteShot(id: string): Promise<void> {
  await db.shots.delete(id)
}

export async function getLastShot(gameId: string): Promise<Shot | undefined> {
  const shots = await db.shots.where('gameId').equals(gameId).sortBy('createdAt')
  return shots.at(-1)
}
