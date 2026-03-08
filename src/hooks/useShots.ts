import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import type { Shot, ShotType, ShotResult } from '@/types'

interface ShotFilters {
  playerId?: string
  half?: 1 | 2
  shotType?: ShotType
  result?: ShotResult
}

/** Reaktive Wurfliste, optional gefiltert */
export function useShots(
  gameId: string | undefined,
  filters?: ShotFilters
): Shot[] | undefined {
  return useLiveQuery(
    async () => {
      if (!gameId) return []
      const shots = await db.shots.where('gameId').equals(gameId).sortBy('createdAt')
      if (!filters) return shots
      return shots.filter((s) => {
        if (filters.playerId && s.playerId !== filters.playerId) return false
        if (filters.half && s.half !== filters.half) return false
        if (filters.shotType && s.shotType !== filters.shotType) return false
        if (filters.result && s.result !== filters.result) return false
        return true
      })
    },
    [gameId, filters?.playerId, filters?.half, filters?.shotType, filters?.result]
  )
}
