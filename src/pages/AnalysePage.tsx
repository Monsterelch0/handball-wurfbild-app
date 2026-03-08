import { useParams } from 'react-router-dom'

export default function AnalysePage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex flex-col h-full p-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Analyse</h1>
        <p className="text-surface-600 text-sm mt-0.5">Spiel-ID: {id}</p>
      </div>

      {/* Placeholder Dashboard */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {[
          { label: 'Heatmap', desc: 'Phase 6' },
          { label: 'Kachel-Ansicht', desc: 'Phase 6' },
          { label: '7m-Historie', desc: 'Phase 6' },
          { label: 'Filter', desc: 'Phase 6' },
        ].map((item) => (
          <div
            key={item.label}
            className="card flex flex-col items-center justify-center gap-2 border-dashed min-h-[120px]"
          >
            <p className="font-semibold text-white">{item.label}</p>
            <p className="text-surface-600 text-sm">Wird in {item.desc} implementiert</p>
          </div>
        ))}
      </div>
    </div>
  )
}
