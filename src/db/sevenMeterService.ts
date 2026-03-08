import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db/database'
import type { SevenMeter } from '@/types'

export async function addSevenMeter(
  data: Omit<SevenMeter, 'id' | 'createdAt'>
): Promise<SevenMeter> {
  const sevenMeter: SevenMeter = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...data,
  }
  await db.sevenMeters.add(sevenMeter)
  return sevenMeter
}

export async function getSevenMetersForGame(gameId: string): Promise<SevenMeter[]> {
  return db.sevenMeters.where('gameId').equals(gameId).sortBy('createdAt')
}

export async function getSevenMetersForPlayer(
  gameId: string,
  playerId: string
): Promise<SevenMeter[]> {
  return db.sevenMeters
    .where('gameId')
    .equals(gameId)
    .filter((s) => s.playerId === playerId)
    .sortBy('createdAt')
}

export async function deleteSevenMeter(id: string): Promise<void> {
  await db.sevenMeters.delete(id)
}
