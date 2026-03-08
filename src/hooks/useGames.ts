import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import type { Game } from '@/types'

/** Reaktive Liste aller Spiele, neueste zuerst */
export function useGames(): Game[] | undefined {
  return useLiveQuery(() => db.games.orderBy('createdAt').reverse().toArray())
}

/** Reaktives einzelnes Spiel */
export function useGame(id: string | undefined): Game | undefined {
  return useLiveQuery(() => (id ? db.games.get(id) : undefined), [id])
}
