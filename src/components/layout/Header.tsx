// Sync status indicator – will be connected to cloud sync in Phase 7
const SyncIcon = ({ status }: { status: 'online' | 'offline' | 'syncing' }) => {
  if (status === 'syncing') {
    return (
      <svg
        className="w-4 h-4 animate-spin text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    )
  }
  return (
    <div
      className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-400' : 'bg-surface-600'}`}
      title={status === 'online' ? 'Online' : 'Offline'}
    />
  )
}

export default function Header() {
  // Placeholder – will be replaced with real sync state from Phase 7
  const syncStatus: 'online' | 'offline' | 'syncing' = 'offline'

  return (
    <header className="bg-surface-800 border-b border-surface-700 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {/* App Logo / Icon */}
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm select-none">
          WB
        </div>
        <span className="font-semibold text-white text-sm">Wurfbild</span>
      </div>

      {/* Sync Status */}
      <div className="flex items-center gap-2 text-xs text-surface-600" id="sync-status">
        <SyncIcon status={syncStatus} />
        <span>{syncStatus === 'offline' ? 'Offline' : syncStatus === 'syncing' ? 'Synchronisiere…' : 'Online'}</span>
      </div>
    </header>
  )
}
