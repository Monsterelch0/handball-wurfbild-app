# Phase 3 – Spielverwaltung

Spieler können Spiele anlegen, Kader importieren, den Spielstand verfolgen und den Timer bedienen.

## Proposed Changes

### Abhängigkeiten
```bash
npm install papaparse xlsx
npm install --save-dev @types/papaparse
```

---

### Routing

#### [MODIFY] `src/router.tsx`
Neue Route: `/spiel/:id` → `GameDetailPage`

---

### Seiten & Komponenten

#### [MODIFY] `src/pages/HomePage.tsx`
- Echte Spielliste via `useGames()` Hook
- `GameCard` Komponente: Datum, Heim vs Gast, Ergebnis, chevron
- "Neues Spiel" → öffnet `NewGameModal`
- Klick auf Karte → navigiert zu `/spiel/:id`

#### [NEW] `src/components/game/NewGameModal.tsx`
- Overlay-Modal, Felder: Datum, Heimteam, Gastteam, Wettbewerb
- Submit → `createGame()` → Modal schließen
- Schließen per ESC oder X-Button

#### [NEW] `src/pages/GameDetailPage.tsx`
Tabs: **Übersicht** | **Kader** | **Tracking** | **Analyse**

**Übersicht-Tab:**
- Scoreboard: Heimteam `[–] [23] [+]` vs Gastteam
- `updateScore()` bei jedem Klick
- Spielzeit-Timer (via `useGameTimer` Hook)
  - Start / Pause / Stopp
  - Halbzeit-Umschaltung (1. HZ → Pause → 2. HZ)
  - Aktuelle Minute wird State gehalten

**Kader-Tab:**
- Spielerliste (sortiert nach Nummer)
- "+" Button → Inline-Formular Nummer + Name
- Import-Button → file input (`.csv`, `.xlsx`)
- Import-Vorschau-Modal → Bestätigen → `importPlayers()`
- Edit/Delete pro Spieler

#### [NEW] `src/hooks/useGameTimer.ts`
```typescript
// Zustand: minute (0–60), half (1|2), status (idle|running|paused|halftime)
// Methoden: start(), pause(), resume(), nextHalf(), reset()
// Auto-increment via setInterval (1 Spielminute = 1 Sekunde in Dev, 60s in Prod)
```

#### [NEW] `src/utils/csvImport.ts`
- `parseCSV(file)` via papaparse → `Array<{number, name}>`
- `parseXLSX(file)` via xlsx → gleiche Struktur
- Spalten-Erkennung: "Nr"/"Nummer"/"#" und "Name"/"Spieler"

---

### Neue Shared-Komponenten

#### [NEW] `src/components/ui/Modal.tsx`
Wiederverwendbares Modal mit Backdrop, ESC-Handling, Portal

#### [NEW] `src/components/ui/Badge.tsx`
Kleines Label für Spielstatus, Wettbewerb etc.

---

## Commit-Plan

| # | Commit |
|---|---|
| 1 | `feat: papaparse und xlsx installiert, CSV/XLSX-Import-Utility` |
| 2 | `feat: Spieluebersicht mit echten Daten und Neues-Spiel-Modal` |
| 3 | `feat: GameDetailPage mit Scoreboard und Spielzeit-Timer` |
| 4 | `feat: Kader-Verwaltung mit manuellem Hinzufuegen und CSV/XLSX-Import` |

---

## Verification Plan

```bash
npm run lint   # 0 Fehler
npm run build  # erfolgreich
npm run dev    # testen
```

**Browser-Test-Schritte:**
1. "Neues Spiel" anlegen → erscheint in der Liste
2. Spiel öffnen → Spielstand +/- klicken
3. Timer starten → Minute zählt hoch
4. Kader-Tab → CSV-Datei importieren → Spieler erscheinen sortiert
5. Spieler bearbeiten + löschen
