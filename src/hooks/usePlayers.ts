import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import type { Player } from '@/types'

/** Reaktive Spielerliste eines Spiels, sortiert nach Trikotnummer */
export function usePlayers(gameId: string | undefined): Player[] | undefined {
  return useLiveQuery(
    () => (gameId ? db.players.where('gameId').equals(gameId).sortBy('number') : []),
    [gameId]
  )
}
