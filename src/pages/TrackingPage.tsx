import { useParams } from 'react-router-dom'

export default function TrackingPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex flex-col h-full p-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Tracking</h1>
        <p className="text-surface-600 text-sm mt-0.5">Spiel-ID: {id}</p>
      </div>

      {/* Canvas Placeholder */}
      <div className="flex-1 card flex items-center justify-center border-dashed">
        <div className="text-center text-surface-600">
          <svg
            className="w-16 h-16 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
            />
          </svg>
          <p className="font-medium">Canvas-Eingabemaske</p>
          <p className="text-sm mt-1">Wird in Phase 4 implementiert</p>
        </div>
      </div>

      {/* Placeholder Action Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {['Tor', 'Gehalten', 'Geblockt', 'Vorbei'].map((label) => (
          <button key={label} className="btn-secondary py-4 text-sm" id={`result-${label.toLowerCase()}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
