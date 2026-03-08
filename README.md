# Handball Wurfbild-Analyse App

Eine Tablet-optimierte Progressive Web App (PWA) zur digitalen Erfassung und Analyse von Handball-Wurfbildern waehrend des Spielbetriebs.

## Projektziel

Diese App ersetzt die klassische "Zettelwirtschaft" bei der Torwart-Analyse. Sie richtet sich an den Amateur- und Semi-Profi-Bereich (Fokus: Verbandsliga) und ermoeglicht eine schnelle, intuitive Dokumentation und Auswertung gegnerischer Wuerfe direkt von der Bank aus.

## Kernfunktionen (Ueberblick)

- **Spielverwaltung** – Kader-Import, Spielstand- und Zeiterfassung
- **Live-Tracking** – Freihand-Zeichnung von Lauf- und Wurfwegen per Apple Pencil
- **Wurfklassifikation** – Wurfart, Koerpertaeuschung, Ergebnis (Tor / Gehalten / Geblockt / Vorbei)
- **7-Meter-Modus** – Spezialerfassung fuer Strafwuerfe inkl. Antaeusch-Zaehler
- **Analyse-Dashboards** – Heatmap, Kachel-Ansicht, Spieler- und Situationsfilter
- **Offline-First** – vollstaendig nutzbar ohne Internetverbindung (IndexedDB)
- **Cloud-Sync** – automatische Synchronisation sobald WLAN verfuegbar ist

## Zielgruppe & Hardware

| Rolle | Hardware | Eingabe |
|---|---|---|
| Zweiter Torwart / Betreuer auf der Bank | iPad | Apple Pencil + grosse Touch-Buttons |
| Trainer (Analyse) | Laptop / Tablet | Maus / Touch |

## Tech-Stack

| Schicht | Technologie |
|---|---|
| Frontend | React (TypeScript) |
| Styling | Tailwind CSS |
| Zeichenflaeche | Canvas API / Fabric.js |
| Lokale DB | IndexedDB (via Dexie.js) |
| PWA / Offline | Service Worker, Web App Manifest |
| Cloud-Sync | REST-API (TBD – supabase oder eigener Backend) |
| Build | Vite |

## Projektstruktur (geplant)

```
handball-wurfbild-app/
├── docs/               # Pflichtenheft, User Stories, Wireframes
├── src/
│   ├── components/     # React-Komponenten
│   ├── pages/          # Seitenansichten (Tracking, Analyse, ...)
│   ├── store/          # State Management
│   ├── db/             # IndexedDB-Schicht (Dexie)
│   ├── hooks/          # Custom React Hooks
│   └── utils/          # Hilfsfunktionen
├── public/             # Statische Assets, Icons, Manifest
└── tests/              # Unit- und Integrationstests
```

## Branch-Strategie

```
main              ← stabiler Release-Stand
develop           ← Integrations-Branch (Feature-Branches werden hier gemergt)
feature/*         ← neue Funktionalitaet (z.B. feature/canvas-tracking)
fix/*             ← Bugfixes
docs/*            ← reine Dokumentationsaenderungen
```

## Entwicklungs-Phasen

Detaillierte Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md)

| Phase | Inhalt |
|---|---|
| 0 | Planung & Dokumentation (aktuelle Phase) |
| 1 | Projekt-Setup (Vite + React + PWA Grundgeruest) |
| 2 | Datenmodell & lokale Datenbank (IndexedDB) |
| 3 | Spielverwaltung & Kader-Import |
| 4 | Canvas-Eingabemaske (Zeichnung + Buttons) |
| 5 | 7-Meter-Modus |
| 6 | Analyse-Dashboards (Heatmap, Kachel) |
| 7 | Cloud-Sync |
| 8 | Testing & Optimierung |
| 9 | Deployment |

## Dokumente

- [Pflichtenheft](docs/PFLICHTENHEFT.md)
- [User Stories](docs/USER_STORIES.md)
- [Roadmap](docs/ROADMAP.md)

## Lizenz

TBD
