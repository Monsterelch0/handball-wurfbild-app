import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import type { SevenMeter } from '@/types'

/** Reaktive 7m-Liste eines Spiels */
export function useSevenMeters(gameId: string | undefined): SevenMeter[] | undefined {
  return useLiveQuery(
    () =>
      gameId ? db.sevenMeters.where('gameId').equals(gameId).sortBy('createdAt') : [],
    [gameId]
  )
}
