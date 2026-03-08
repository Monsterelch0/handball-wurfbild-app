import { useState, type FormEvent } from 'react'
import Modal from '@/components/ui/Modal'
import { createGame } from '@/db/gameService'

interface NewGameModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (gameId: string) => void
}

export default function NewGameModal({ isOpen, onClose, onCreated }: NewGameModalProps) {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    date: today,
    homeTeam: '',
    guestTeam: '',
    competition: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.homeTeam.trim()) { setError('Heimteam ist erforderlich.'); return }
    if (!form.guestTeam.trim()) { setError('Gastteam ist erforderlich.'); return }
    if (form.homeTeam.trim() === form.guestTeam.trim()) {
      setError('Heim- und Gastteam dürfen nicht identisch sein.')
      return
    }
    setLoading(true)
    try {
      const game = await createGame({
        date: form.date,
        homeTeam: form.homeTeam.trim(),
        guestTeam: form.guestTeam.trim(),
        competition: form.competition.trim() || undefined,
      })
      setForm({ date: today, homeTeam: '', guestTeam: '', competition: '' })
      onCreated(game.id)
    } catch (e) {
      setError('Fehler beim Erstellen des Spiels.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Neues Spiel anlegen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Datum */}
        <div>
          <label className="block text-sm font-medium text-surface-400 mb-1">Datum</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            className="w-full bg-surface-900 border border-surface-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
            id="game-date-input"
          />
        </div>

        {/* Teams */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-surface-400 mb-1">Heimteam *</label>
            <input
              type="text"
              value={form.homeTeam}
              onChange={(e) => set('homeTeam', e.target.value)}
              placeholder="z.B. TSV Musterhausen"
              className="w-full bg-surface-900 border border-surface-600 rounded-xl px-4 py-3 text-white placeholder-surface-600 focus:outline-none focus:border-primary-500"
              id="home-team-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-400 mb-1">Gastteam *</label>
            <input
              type="text"
              value={form.guestTeam}
              onChange={(e) => set('guestTeam', e.target.value)}
              placeholder="z.B. HC Gegner"
              className="w-full bg-surface-900 border border-surface-600 rounded-xl px-4 py-3 text-white placeholder-surface-600 focus:outline-none focus:border-primary-500"
              id="guest-team-input"
            />
          </div>
        </div>

        {/* Wettbewerb */}
        <div>
          <label className="block text-sm font-medium text-surface-400 mb-1">
            Wettbewerb <span className="text-surface-600">(optional)</span>
          </label>
          <input
            type="text"
            value={form.competition}
            onChange={(e) => set('competition', e.target.value)}
            placeholder="z.B. Verbandsliga Nord"
            className="w-full bg-surface-900 border border-surface-600 rounded-xl px-4 py-3 text-white placeholder-surface-600 focus:outline-none focus:border-primary-500"
            id="competition-input"
          />
        </div>

        {/* Fehler */}
        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 justify-center"
            id="create-game-submit"
          >
            {loading ? 'Speichere…' : 'Spiel anlegen'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
