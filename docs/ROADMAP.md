# Entwicklungs-Roadmap: Handball Wurfbild-Analyse App

**Version:** 1.1
**Datum:** 2026-03-08

---

## Uebersicht

```
Phase 0  ──▶  Phase 1  ──▶  Phase 2  ──▶  Phase 3
Planung       Setup         Datenmodell    Spielverw.

    ──▶  Phase 4  ──▶  Phase 5  ──▶  Phase 6  ──▶  Phase 7
         Tracking       7m-Modus      Analyse        Cloud

    ──▶  Phase 8  ──▶  Phase 9
         Testing        Deployment
```

---

## Phase 0 – Planung & Dokumentation ✅ (aktuell)

**Ziel:** Alle Anforderungen klar definiert, Projektstruktur aufgesetzt.

**Deliverables:**
- [x] README.md
- [x] Pflichtenheft (PFLICHTENHEFT.md)
- [x] User Stories (USER_STORIES.md)
- [x] Roadmap (ROADMAP.md)
- [ ] Wireframes / Mockups (Grundskizzen der wichtigsten Masken)
- [ ] Datenmodell-Entwurf (Entitaeten und ihre Beziehungen)

**Git-Branch:** `docs/phase-0-planning`

---

## Phase 1 – Projekt-Setup & PWA-Grundgerüst ✅

**Ziel:** Lauffaehige Basis-App, die als PWA auf dem iPad installierbar ist.

**Aufgaben:**
- [x] Vite + React + TypeScript Projekt initialisieren
- [x] Tailwind CSS einrichten
- [x] ESLint + Prettier konfigurieren
- [x] PWA-Manifest erstellen (Icons, Farben, Splash-Screen)
- [x] Service Worker einrichten (Workbox via vite-plugin-pwa)
- [x] Basis-Routing einrichten (React Router v6)
- [x] Leere Seiten-Struktur anlegen (Startseite, Tracking, Analyse, Einstellungen)
- [x] Grundlegendes Layout (AppLayout, Header, BottomNav) erstellen
- [x] CI/CD Pipeline aufsetzen (GitHub Actions: Lint + Build)

**User Stories:** US-01, US-02

**Git-Branch:** `feature/phase-1-setup` → gemergt in `develop` → `main`

---

## Phase 2 – Datenmodell & lokale Datenbank

**Ziel:** Alle Daten koennen lokal gespeichert und abgerufen werden.

**Aufgaben:**
- [ ] Datenmodell finalisieren (Spiel, Spieler, Wurf, 7m-Situation)
- [ ] Dexie.js installieren und konfigurieren
- [ ] IndexedDB-Schema erstellen
- [ ] CRUD-Operationen fuer alle Entitaeten implementieren
- [ ] Custom Hooks fuer Datenzugriff (useGame, usePlayer, useShot)
- [ ] Beispieldaten (Seed) fuer Entwicklungs-Tests

**Datenmodell (Entwurf):**
```typescript
interface Game {
  id: string
  date: string
  homeTeam: string
  guestTeam: string
  competition?: string
  homeScore: number
  guestScore: number
  createdAt: string
  syncedAt?: string
}

interface Player {
  id: string
  gameId: string
  number: number        // Trikotnummer
  name: string
  team: 'home' | 'guest'
}

interface Shot {
  id: string
  gameId: string
  playerId: string
  minute?: number
  score: { home: number; guest: number }
  half: 1 | 2
  drawData: string      // JSON: SVG-Pfad / Canvas-Punkte
  shotType: ShotType    // 'schlagwurf' | 'sprungwurf' | ...
  feint: boolean        // Koerpertaeuschung
  result: ShotResult    // 'goal' | 'saved' | 'blocked' | 'missed'
  createdAt: string
}

interface SevenMeter {
  id: string
  gameId: string
  playerId: string
  minute?: number
  score: { home: number; guest: number }
  feints: number        // Anzahl Antaeuschungen
  drawData?: string
  result: 'goal' | 'saved' | 'missed'
  createdAt: string
}
```

**Git-Branch:** `feature/phase-2-database`

---

## Phase 3 – Spielverwaltung

**Ziel:** Nutzer kann Spiele anlegen, Kader importieren und den Spielstand verfolgen.

**Aufgaben:**
- [ ] Startseite: Spieluebersicht (Liste + "Neues Spiel" Button)
- [ ] Formular: Neues Spiel anlegen
- [ ] Kader-Import per CSV/XLSX (Papa Parse / SheetJS)
- [ ] Spieler manuell hinzufuegen / bearbeiten / loeschen
- [ ] Spielstand-Anzeige mit +/- Buttons
- [ ] Spielzeit-Timer (1. / 2. Halbzeit, Pause)

**User Stories:** US-03, US-04, US-05, US-06, US-07

**Git-Branch:** `feature/phase-3-game-management`

---

## Phase 4 – Canvas-Eingabemaske (Tracking)

**Ziel:** Kerne der App – Wuerfe koennen erfasst und gespeichert werden.

**Aufgaben:**
- [ ] Spielfeld-Komponente (halbes Feld + Tor) als SVG oder Canvas
- [ ] Stift-/Touch-Zeichnung implementieren (Pointer Events API)
- [ ] Apple Pencil Druckempfindlichkeit (optional, v1.1)
- [ ] Unterscheidung Laufweg / Ballflugkurve (Farbe)
- [ ] Werfer-Schnellauswahl (Spieler-Grid)
- [ ] Wurfart-Buttons (5 Optionen)
- [ ] Koerpertaeuschung-Toggle
- [ ] Ergebnis-Buttons (Tor / Gehalten / Geblockt / Vorbei)
- [ ] Symbol-Platzierung am Wurfziel
- [ ] Undo-Funktion
- [ ] Wurf speichern (lokale DB)

**User Stories:** US-08, US-09, US-10, US-11, US-12, US-13

**Git-Branch:** `feature/phase-4-canvas-tracking`

---

## Phase 5 – 7-Meter-Modus

**Ziel:** Strafwuerfe werden separat und detailliert erfasst.

**Aufgaben:**
- [ ] "7m"-Button in der Tracking-Maske
- [ ] 7m-Eingabe-Maske (Schuetze, Antaeuschungen, Wurfrichtung, Ergebnis)
- [ ] Antaeusch-Zaehler (+/- Buttons, 0–5+)
- [ ] Vereinfachtes Tor-Raster fuer Wurfrichtung
- [ ] 7m-Daten in DB speichern

**User Stories:** US-14, US-15

**Git-Branch:** `feature/phase-5-seven-meter`

---

## Phase 6 – Analyse-Dashboards

**Ziel:** Erfasste Daten werden visuell ausgewertet.

**Aufgaben:**
- [ ] Navigationsstruktur Analyse-Bereich
- [ ] Heatmap-Komponente (Tor-Raster mit Farbintensitaet)
- [ ] Kachel-Ansicht (Grid: ein Tor pro Spieler)
- [ ] Detailansicht einzelner Spieler
- [ ] 7m-Historienuebersicht (Liste + Statistik)
- [ ] Filter-Panel (Spieler, Halbzeit, Spielstand, Wurfart)
- [ ] Spielarchiv (Liste + Oeffnen vergangener Spiele)
- [ ] Export als PNG (html2canvas oder aehnlich)

**User Stories:** US-16, US-17, US-18, US-19, US-20

**Git-Branch:** `feature/phase-6-analytics`

---

## Phase 7 – Cloud-Sync

**Ziel:** Daten werden sicher in der Cloud gesichert und geraeteuebergreifend verfuegbar.

**Aufgaben:**
- [ ] Backend-Technologie entscheiden (Supabase / eigene REST-API)
- [ ] Authentifizierung (Login / Account)
- [ ] Sync-Logik (lokale Daten → Cloud bei WLAN)
- [ ] Konfliktbehandlung (Timestamp-basiert)
- [ ] Manueller Sync-Button
- [ ] DSGVO-Hinweise und Datenschutzerklaerung

**User Stories:** US-21, US-22

**Git-Branch:** `feature/phase-7-cloud-sync`

---

## Phase 8 – Testing & Optimierung

**Ziel:** App ist stabil, performant und fuer den Einsatz in der Halle bereit.

**Aufgaben:**
- [ ] Unit-Tests fuer Datenbankschicht und Berechnungslogik (Vitest)
- [ ] Komponenten-Tests (React Testing Library)
- [ ] E2E-Test: kompletter Wurf-Erfassungs-Zyklus (Playwright)
- [ ] Performance-Audit (Lighthouse)
- [ ] Stift-Latenz messen und optimieren
- [ ] Usability-Test mit echtem Nutzer (Torwart / Betreuer)
- [ ] Bugfixes aus dem Usability-Test

**Git-Branch:** `feature/phase-8-testing`

---

## Phase 9 – Deployment

**Ziel:** App ist produktiv erreichbar und kann auf iPads installiert werden.

**Aufgaben:**
- [ ] Hosting-Provider auswaehlen (Vercel / Netlify / eigener Server)
- [ ] Domain und HTTPS konfigurieren
- [ ] Automatisches Deployment via GitHub Actions (main-Branch → Produktion)
- [ ] Monitoring / Error Tracking einrichten (Sentry o.ae.)
- [ ] Initiales Onboarding fuer erste Testnutzer

**Git-Branch:** `feature/phase-9-deployment`

---

## Branch-Strategie (Zusammenfassung)

| Branch-Typ | Namensschema | Zweck |
|---|---|---|
| `main` | – | Stabiler Release-Stand |
| `develop` | – | Integrations-Branch |
| `feature/*` | `feature/phase-X-name` | Neue Funktionalitaet |
| `fix/*` | `fix/kurze-beschreibung` | Bugfixes |
| `docs/*` | `docs/kurze-beschreibung` | Nur Dokumentation |

**Merge-Reihenfolge:** `feature/*` → `develop` → `main`

Kein direktes Pushen auf `main`. Aenderungen immer per Pull Request.

---

## Priortaeten-Matrix

| Phase | Aufwand | Nutzen | Prioritaet |
|---|---|---|---|
| 0 – Planung | Gering | Hoch | Erledigt |
| 1 – Setup | Mittel | Hoch (Basis) | Hoch |
| 2 – Datenbank | Mittel | Hoch (Basis) | Hoch |
| 3 – Spielverw. | Mittel | Hoch | Hoch |
| 4 – Tracking | Hoch | Sehr hoch (Kernfunktion) | Sehr hoch |
| 5 – 7m-Modus | Gering | Hoch | Hoch |
| 6 – Analyse | Hoch | Sehr hoch | Hoch |
| 7 – Cloud-Sync | Hoch | Mittel (nice-to-have) | Mittel |
| 8 – Testing | Mittel | Hoch | Hoch |
| 9 – Deployment | Gering | Hoch | Hoch |
