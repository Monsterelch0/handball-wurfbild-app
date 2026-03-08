export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full p-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Einstellungen</h1>
        <p className="text-surface-600 text-sm mt-0.5">App-Konfiguration</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Sync Section */}
        <div className="card">
          <h2 className="font-semibold text-white mb-3">Synchronisation</h2>
          <button className="btn-secondary w-full justify-center" id="sync-btn">
            Jetzt synchronisieren
          </button>
          <p className="text-surface-600 text-xs mt-2 text-center">
            Zuletzt synchronisiert: –
          </p>
        </div>

        {/* App Info */}
        <div className="card">
          <h2 className="font-semibold text-white mb-3">App-Info</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-surface-600">Version</span>
              <span className="text-white">0.1.0 (Phase 1)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-600">Datenbank</span>
              <span className="text-white">IndexedDB (lokal)</span>
            </div>
          </div>
        </div>

        {/* Placeholder for future settings */}
        <div className="card border-dashed">
          <p className="text-surface-600 text-sm text-center">
            Weitere Einstellungen folgen in späteren Phasen (Dark Mode, Linkshänder, Cloud-Account)
          </p>
        </div>
      </div>
    </div>
  )
}
