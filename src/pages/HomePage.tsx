import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGames } from '@/hooks/useGames'
import NewGameModal from '@/components/game/NewGameModal'
import Badge from '@/components/ui/Badge'
import type { Game } from '@/types'

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
  </svg>
)

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('de-DE', {
    weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card w-full text-left flex items-center gap-4 hover:border-surface-600 hover:bg-surface-700/50 transition-all duration-150 active:scale-[0.99]"
      id={`game-card-${game.id}`}
    >
      {/* Datum */}
      <div className="flex-shrink-0 text-center w-14">
        <p className="text-2xl font-bold text-white">
          {new Date(game.date).getDate().toString().padStart(2, '0')}
        </p>
        <p className="text-xs text-surface-600 uppercase">
          {new Date(game.date).toLocaleDateString('de-DE', { month: 'short' })}
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-12 bg-surface-700 flex-shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {game.competition && <Badge variant="blue">{game.competition}</Badge>}
          <span className="text-xs text-surface-600">{formatDate(game.date)}</span>
        </div>
        <p className="text-white font-semibold truncate">
          {game.homeTeam} <span className="text-surface-600 font-normal">vs</span> {game.guestTeam}
        </p>
        <p className="text-primary-400 font-mono font-bold text-sm mt-0.5">
          {game.homeScore} : {game.guestScore}
        </p>
      </div>

      <ChevronRightIcon />
    </button>
  )
}

export default function HomePage() {
  const navigate   = useNavigate()
  const games      = useGames()
  const [showNew, setShowNew] = useState(false)

  return (
    <div className="flex flex-col h-full p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Spiele</h1>
          <p className="text-surface-600 text-sm mt-0.5">
            {games?.length ?? 0} {games?.length === 1 ? 'Spiel' : 'Spiele'}
          </p>
        </div>
        <button className="btn-primary gap-2" id="new-game-btn" onClick={() => setShowNew(true)}>
          <PlusIcon />
          Neues Spiel
        </button>
      </div>

      {/* Spielliste */}
      <div className="flex-1 overflow-y-auto">
        {games === undefined && (
          <div className="text-center text-surface-600 mt-12">Lade…</div>
        )}

        {games?.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center mt-20">
            <div className="w-20 h-20 rounded-full bg-surface-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Noch keine Spiele</h2>
              <p className="text-surface-600 text-sm mt-1 max-w-xs">
                Erstelle ein neues Spiel, um mit der Erfassung zu beginnen.
              </p>
            </div>
            <button className="btn-primary gap-2" onClick={() => setShowNew(true)} id="new-game-empty-btn">
              <PlusIcon />
              Erstes Spiel anlegen
            </button>
          </div>
        )}

        {games && games.length > 0 && (
          <div className="flex flex-col gap-3">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => navigate(`/spiel/${game.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <NewGameModal
        isOpen={showNew}
        onClose={() => setShowNew(false)}
        onCreated={(id) => { setShowNew(false); navigate(`/spiel/${id}`) }}
      />
    </div>
  )
}
