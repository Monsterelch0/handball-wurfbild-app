import { v4 as uuidv4 } from 'uuid'
import { db } from '@/db/database'
import type { Game, Player, Shot, SevenMeter } from '@/types'

/**
 * Befüllt die Datenbank mit einem Demo-Spiel für Entwicklungszwecke.
 * Wird nur ausgeführt, wenn die DB noch keine Spiele enthält.
 */
export async function seedDatabase(): Promise<void> {
  const count = await db.games.count()
  if (count > 0) return // Bereits geseedet

  const now = new Date()
  const gameId = uuidv4()

  // ── Demo-Spiel ────────────────────────────────────────────────────────────
  const game: Game = {
    id: gameId,
    date: now.toISOString().split('T')[0],
    homeTeam: 'TSV Musterhausen',
    guestTeam: 'HC Demo-Gegner',
    competition: 'Verbandsliga Nord',
    homeScore: 28,
    guestScore: 25,
    createdAt: now.toISOString(),
  }

  // ── Demo-Spieler (Gegner-Kader) ───────────────────────────────────────────
  const players: Player[] = [
    { id: uuidv4(), gameId, number: 1, name: 'Max Torwart', team: 'guest' },
    { id: uuidv4(), gameId, number: 5, name: 'Jonas Linksaußen', team: 'guest' },
    { id: uuidv4(), gameId, number: 7, name: 'Felix Rückraum', team: 'guest' },
    { id: uuidv4(), gameId, number: 9, name: 'Lukas Kreismitte', team: 'guest' },
    { id: uuidv4(), gameId, number: 11, name: 'Tim Rechtsaußen', team: 'guest' },
    { id: uuidv4(), gameId, number: 14, name: 'Nico Pivot', team: 'guest' },
  ]

  // ── Demo-Würfe ────────────────────────────────────────────────────────────
  const p = (name: string) => players.find((pl) => pl.name === name)!

  const shots: Shot[] = [
    {
      id: uuidv4(), gameId, playerId: p('Felix Rückraum').id,
      minute: 8, half: 1, score: { home: 3, guest: 4 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'sprungwurf', feint: false, result: 'goal',
      createdAt: new Date(now.getTime() + 1000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Felix Rückraum').id,
      minute: 14, half: 1, score: { home: 6, guest: 7 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'schlagwurf', feint: true, result: 'saved',
      createdAt: new Date(now.getTime() + 2000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Jonas Linksaußen').id,
      minute: 18, half: 1, score: { home: 8, guest: 9 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'dreher', feint: false, result: 'goal',
      createdAt: new Date(now.getTime() + 3000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Lukas Kreismitte').id,
      minute: 22, half: 1, score: { home: 10, guest: 10 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'heber', feint: false, result: 'blocked',
      createdAt: new Date(now.getTime() + 4000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Nico Pivot').id,
      minute: 35, half: 2, score: { home: 16, guest: 15 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'sprungwurf', feint: false, result: 'goal',
      createdAt: new Date(now.getTime() + 5000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Tim Rechtsaußen').id,
      minute: 42, half: 2, score: { home: 19, guest: 18 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'kempa', feint: false, result: 'missed',
      createdAt: new Date(now.getTime() + 6000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Felix Rückraum').id,
      minute: 51, half: 2, score: { home: 22, guest: 22 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'schlagwurf', feint: true, result: 'goal',
      createdAt: new Date(now.getTime() + 7000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Jonas Linksaußen').id,
      minute: 58, half: 2, score: { home: 27, guest: 24 },
      drawData: JSON.stringify({ type: 'path', points: [] }),
      shotType: 'dreher', feint: true, result: 'saved',
      createdAt: new Date(now.getTime() + 8000).toISOString(),
    },
  ]

  // ── Demo-7m ───────────────────────────────────────────────────────────────
  const sevenMeters: SevenMeter[] = [
    {
      id: uuidv4(), gameId, playerId: p('Felix Rückraum').id,
      minute: 27, score: { home: 13, guest: 12 },
      feints: 2, result: 'goal',
      createdAt: new Date(now.getTime() + 9000).toISOString(),
    },
    {
      id: uuidv4(), gameId, playerId: p('Nico Pivot').id,
      minute: 47, score: { home: 21, guest: 20 },
      feints: 3, result: 'saved',
      createdAt: new Date(now.getTime() + 10000).toISOString(),
    },
  ]

  // ── Alles in einer Transaktion speichern ──────────────────────────────────
  await db.transaction('rw', db.games, db.players, db.shots, db.sevenMeters, async () => {
    await db.games.add(game)
    await db.players.bulkAdd(players)
    await db.shots.bulkAdd(shots)
    await db.sevenMeters.bulkAdd(sevenMeters)
  })

  console.info('[Seed] Demo-Spiel angelegt:', game.homeTeam, 'vs', game.guestTeam)
}
