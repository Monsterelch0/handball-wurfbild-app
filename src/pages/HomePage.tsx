import { Link } from 'react-router-dom'

// Placeholder icon components
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
    />
  </svg>
)

export default function HomePage() {
  return (
    <div className="flex flex-col h-full p-6 gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Spiele</h1>
          <p className="text-surface-600 text-sm mt-0.5">Wurfbild-Analyse</p>
        </div>
        <button className="btn-primary gap-2" id="new-game-btn">
          <PlusIcon />
          Neues Spiel
        </button>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-surface-800 flex items-center justify-center text-surface-600">
          <CalendarIcon />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Noch keine Spiele</h2>
          <p className="text-surface-600 text-sm mt-1 max-w-xs">
            Erstelle dein erstes Spiel, um mit der Wurfbild-Erfassung zu beginnen.
          </p>
        </div>
        <button className="btn-primary gap-2" id="new-game-empty-btn">
          <PlusIcon />
          Erstes Spiel anlegen
        </button>
      </div>

      {/* Demo link for development */}
      <div className="text-center text-surface-700 text-xs">
        <Link to="/spiel/demo/tracking" className="hover:text-surface-500 transition-colors">
          → Demo: Tracking-Ansicht öffnen
        </Link>
        {' · '}
        <Link to="/spiel/demo/analyse" className="hover:text-surface-500 transition-colors">
          → Demo: Analyse-Ansicht öffnen
        </Link>
      </div>
    </div>
  )
}
