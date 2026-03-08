import { useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useGame } from '@/hooks/useGames'
import { usePlayers } from '@/hooks/usePlayers'
import { useGameTimer } from '@/hooks/useGameTimer'
import { updateScore, deleteGame } from '@/db/gameService'
import { addPlayer, deletePlayer, updatePlayer, importPlayers } from '@/db/playerService'
import { parseRosterFile, type RosterEntry } from '@/utils/csvImport'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import type { Player } from '@/types'

// ─── Score Button ────────────────────────────────────────────────────────────
function ScoreBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-2xl bg-surface-700 hover:bg-surface-600 text-white text-2xl font-bold flex items-center justify-center active:scale-90 transition-all"
    >
      {label}
    </button>
  )
}

// ─── Scoreboard ──────────────────────────────────────────────────────────────
function Scoreboard({ gameId, homeTeam, guestTeam, homeScore, guestScore }: {
  gameId: string; homeTeam: string; guestTeam: string; homeScore: number; guestScore: number
}) {
  async function change(home: number, guest: number) {
    await updateScore(gameId, Math.max(0, home), Math.max(0, guest))
  }
  return (
    <div className="card flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 w-full">
        {/* Heimteam */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <p className="text-sm text-surface-500 font-medium truncate w-full text-center">{homeTeam}</p>
          <div className="flex items-center gap-3">
            <ScoreBtn label="−" onClick={() => change(homeScore - 1, guestScore)} />
            <span className="text-6xl font-black text-white w-16 text-center tabular-nums">{homeScore}</span>
            <ScoreBtn label="+" onClick={() => change(homeScore + 1, guestScore)} />
          </div>
        </div>

        {/* Trennlinie */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <span className="text-4xl font-bold text-surface-600">:</span>
        </div>

        {/* Gastteam */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <p className="text-sm text-surface-500 font-medium truncate w-full text-center">{guestTeam}</p>
          <div className="flex items-center gap-3">
            <ScoreBtn label="−" onClick={() => change(homeScore, guestScore - 1)} />
            <span className="text-6xl font-black text-white w-16 text-center tabular-nums">{guestScore}</span>
            <ScoreBtn label="+" onClick={() => change(homeScore, guestScore + 1)} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Timer ───────────────────────────────────────────────────────────────────
function GameTimer() {
  const { minute, half, status, start, pause, resume, nextHalf, reset } = useGameTimer()

  const statusLabels: Record<typeof status, string> = {
    idle: '–', running: 'Läuft', paused: 'Pausiert',
    halftime: 'Halbzeit', finished: 'Abgepfiffen',
  }
  const statusColors: Record<typeof status, string> = {
    idle: 'gray', running: 'green', paused: 'yellow',
    halftime: 'yellow', finished: 'red',
  }

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Spielzeit</h3>
        <Badge variant={statusColors[status] as 'green' | 'yellow' | 'red' | 'gray'}>
          {statusLabels[status]}
        </Badge>
      </div>

      {/* Anzeige */}
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <p className="text-5xl font-black text-white tabular-nums">{String(minute).padStart(2, '0')}'</p>
          <p className="text-sm text-surface-600 mt-1">{half}. Halbzeit</p>
        </div>
      </div>

      {/* Steuerung */}
      <div className="flex gap-2">
        {status === 'idle' && (
          <button className="btn-primary flex-1 justify-center" onClick={start} id="timer-start">Start</button>
        )}
        {status === 'running' && (
          <button className="btn-secondary flex-1 justify-center" onClick={pause} id="timer-pause">Pause</button>
        )}
        {status === 'paused' && (
          <button className="btn-primary flex-1 justify-center" onClick={resume} id="timer-resume">Weiter</button>
        )}
        {status === 'halftime' && (
          <button className="btn-primary flex-1 justify-center" onClick={nextHalf} id="timer-nexthalf">2. Halbzeit</button>
        )}
        {(status !== 'idle') && (
          <button className="btn-secondary px-4 justify-center" onClick={reset} id="timer-reset" title="Zurücksetzen">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Spieler-Tab ─────────────────────────────────────────────────────────────
function PlayersTab({ gameId }: { gameId: string }) {
  const players = usePlayers(gameId)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ number: '', name: '' })
  const [addForm, setAddForm] = useState({ number: '', name: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [importPreview, setImportPreview]   = useState<RosterEntry[] | null>(null)
  const [importError, setImportError]       = useState('')
  const [showImportModal, setShowImportModal] = useState(false)

  async function handleAdd() {
    const num = parseInt(addForm.number)
    if (isNaN(num) || !addForm.name.trim()) return
    await addPlayer({ gameId, number: num, name: addForm.name.trim(), team: 'guest' })
    setAddForm({ number: '', name: '' })
    setShowAddForm(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Spieler löschen?')) return
    await deletePlayer(id)
  }

  function startEdit(p: Player) {
    setEditingId(p.id)
    setEditForm({ number: String(p.number), name: p.name })
  }

  async function saveEdit(id: string) {
    const num = parseInt(editForm.number)
    if (!isNaN(num) && editForm.name.trim()) {
      await updatePlayer(id, { number: num, name: editForm.name.trim() })
    }
    setEditingId(null)
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError('')
    try {
      const entries = await parseRosterFile(file)
      if (entries.length === 0) throw new Error('Keine gültigen Einträge gefunden.')
      setImportPreview(entries)
      setShowImportModal(true)
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Import fehlgeschlagen.')
    } finally {
      e.target.value = ''   // reset file input
    }
  }

  async function confirmImport() {
    if (!importPreview) return
    await importPlayers(gameId, 'guest', importPreview)
    setImportPreview(null)
    setShowImportModal(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex gap-2">
        <button className="btn-secondary gap-2 flex-1 justify-center" onClick={() => setShowAddForm(!showAddForm)} id="add-player-btn">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Spieler hinzufügen
        </button>
        <button
          className="btn-secondary gap-2 flex-1 justify-center"
          onClick={() => fileInputRef.current?.click()}
          id="import-roster-btn"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          CSV / XLSX
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Import-Fehler */}
      {importError && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {importError}
        </p>
      )}

      {/* Spieler hinzufügen (Inline-Form) */}
      {showAddForm && (
        <div className="card flex gap-2 items-end">
          <div>
            <label className="block text-xs text-surface-500 mb-1">Nr.</label>
            <input
              type="number"
              value={addForm.number}
              onChange={(e) => setAddForm((f) => ({ ...f, number: e.target.value }))}
              className="w-16 bg-surface-900 border border-surface-600 rounded-lg px-2 py-2 text-white text-center focus:outline-none focus:border-primary-500"
              placeholder="7"
              id="add-player-number"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-surface-500 mb-1">Name</label>
            <input
              type="text"
              value={addForm.name}
              onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="w-full bg-surface-900 border border-surface-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
              placeholder="Max Mustermann"
              id="add-player-name"
            />
          </div>
          <button className="btn-primary px-4 py-2 justify-center" onClick={handleAdd} id="add-player-confirm">
            Hinzufügen
          </button>
        </div>
      )}

      {/* Spielerliste */}
      {players?.length === 0 && !showAddForm && (
        <p className="text-surface-600 text-sm text-center py-8">
          Noch keine Spieler. CSV importieren oder manuell hinzufügen.
        </p>
      )}

      {players && players.length > 0 && (
        <div className="flex flex-col gap-2">
          {players.map((p) => (
            <div key={p.id} className="card flex items-center gap-3">
              {editingId === p.id ? (
                <>
                  <input
                    type="number"
                    value={editForm.number}
                    onChange={(e) => setEditForm((f) => ({ ...f, number: e.target.value }))}
                    className="w-14 bg-surface-900 border border-surface-600 rounded-lg px-2 py-1.5 text-white text-center focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                    className="flex-1 bg-surface-900 border border-surface-600 rounded-lg px-3 py-1.5 text-white focus:outline-none"
                  />
                  <button className="btn-primary px-3 py-1.5 text-sm" onClick={() => saveEdit(p.id)}>✓</button>
                  <button className="btn-secondary px-3 py-1.5 text-sm" onClick={() => setEditingId(null)}>✕</button>
                </>
              ) : (
                <>
                  <span className="w-10 h-10 rounded-xl bg-primary-600/20 text-primary-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                    {p.number}
                  </span>
                  <span className="flex-1 text-white font-medium">{p.name}</span>
                  <button className="btn-icon text-surface-600 hover:text-white" onClick={() => startEdit(p)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    </svg>
                  </button>
                  <button className="btn-icon text-surface-600 hover:text-red-400" onClick={() => handleDelete(p.id)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Import-Vorschau-Modal */}
      <Modal isOpen={showImportModal} onClose={() => { setShowImportModal(false); setImportPreview(null) }} title={`Import-Vorschau (${importPreview?.length ?? 0} Spieler)`} maxWidth="max-w-md">
        <div className="flex flex-col gap-4">
          <div className="max-h-64 overflow-y-auto flex flex-col gap-1">
            {importPreview?.map((e, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-surface-700">
                <span className="w-8 text-primary-400 font-bold text-sm text-center">{e.number}</span>
                <span className="text-white text-sm">{e.name}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-secondary flex-1 justify-center" onClick={() => { setShowImportModal(false); setImportPreview(null) }}>
              Abbrechen
            </button>
            <button className="btn-primary flex-1 justify-center" onClick={confirmImport} id="confirm-import-btn">
              {importPreview?.length} Spieler übernehmen
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// ─── GameDetailPage ───────────────────────────────────────────────────────────
type TabId = 'overview' | 'players' | 'tracking' | 'analyse'

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Übersicht' },
  { id: 'players',  label: 'Kader' },
  { id: 'tracking', label: 'Tracking' },
  { id: 'analyse',  label: 'Analyse' },
]

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const game = useGame(id)
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  if (game === undefined) {
    return <div className="p-6 text-surface-600">Lade…</div>
  }
  if (game === null) {
    return <div className="p-6 text-red-400">Spiel nicht gefunden.</div>
  }

  async function handleDeleteGame() {
    if (!confirm(`Spiel "${game!.homeTeam} vs ${game!.guestTeam}" wirklich löschen?`)) return
    await deleteGame(game!.id)
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sub-Header */}
      <div className="px-6 pt-4 pb-0 bg-surface-800 border-b border-surface-700">
        <div className="flex items-start justify-between mb-3">
          <div>
            {game.competition && <Badge variant="blue">{game.competition}</Badge>}
            <h1 className="text-xl font-bold text-white mt-1">
              {game.homeTeam} <span className="text-surface-600">vs</span> {game.guestTeam}
            </h1>
            <p className="text-surface-600 text-sm">
              {new Date(game.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={handleDeleteGame}
            className="btn-icon text-surface-600 hover:text-red-400"
            title="Spiel löschen"
            id="delete-game-btn"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-surface-600 hover:text-surface-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab-Inhalt */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-4">
            <Scoreboard
              gameId={game.id}
              homeTeam={game.homeTeam}
              guestTeam={game.guestTeam}
              homeScore={game.homeScore}
              guestScore={game.guestScore}
            />
            <GameTimer />
          </div>
        )}
        {activeTab === 'players' && <PlayersTab gameId={game.id} />}
        {activeTab === 'tracking' && (
          <div className="flex flex-col items-center justify-center gap-3 h-40 text-center">
            <p className="text-surface-600">Canvas-Eingabe wird in Phase 4 implementiert.</p>
            <Link to={`/spiel/${game.id}/tracking`} className="btn-primary">
              Zur Tracking-Ansicht →
            </Link>
          </div>
        )}
        {activeTab === 'analyse' && (
          <div className="flex flex-col items-center justify-center gap-3 h-40 text-center">
            <p className="text-surface-600">Analyse-Dashboards werden in Phase 6 implementiert.</p>
            <Link to={`/spiel/${game.id}/analyse`} className="btn-primary">
              Zur Analyse-Ansicht →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
