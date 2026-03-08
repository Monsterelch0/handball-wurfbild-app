# Phase 3 – Spielverwaltung

## Git
- [x] Branch `feature/phase-3-game-management` erstellt

## Abhängigkeiten
- [ ] `papaparse` + `@types/papaparse` – CSV-Parser
- [ ] `xlsx` – Excel-Import

## Spielübersicht (HomePage)
- [ ] `useGames` Hook einbinden – echte DB-Daten
- [ ] Spielliste mit Karten (Datum, Teams, Ergebnis)
- [ ] "Neues Spiel" Button → öffnet Modal

## Neues Spiel anlegen (NewGameModal)
- [ ] Modal-Komponente mit Formular
- [ ] Felder: Datum, Heimteam, Gastteam, Wettbewerb (optional)
- [ ] `createGame()` aufrufen bei Submit
- [ ] Validierung + Fehlermeldungen

## Spieldetail-Seite (GameDetailPage)
- [ ] Route `/spiel/:id` – Übersicht eines Spiels
- [ ] Spielstand-Anzeige (groß) + +/- Buttons
- [ ] Spielzeit-Timer (Start/Stopp, 1. + 2. Halbzeit, Pause)
- [ ] Navigation zu Tracking / Analyse
- [ ] Spiel löschen (mit Bestätigung)

## Kader-Verwaltung (PlayersTab)
- [ ] Spielerliste des Spiels anzeigen
- [ ] Spieler manuell hinzufügen (Nummer + Name)
- [ ] CSV-Import (`papaparse`) – Spalten: Nummer, Name
- [ ] XLSX-Import (`xlsx`) – gleiche Spalten
- [ ] Spieler bearbeiten + löschen
- [ ] Import-Vorschau vor Bestätigung

## Git-Commits
- [ ] `feat: Abhängigkeiten papaparse und xlsx installiert`
- [ ] `feat: Spielübersicht und Neues-Spiel-Modal`
- [ ] `feat: Spieldetail-Seite mit Spielstand und Timer`
- [ ] `feat: Kader-Verwaltung mit CSV/XLSX-Import`
- [ ] Merge → develop → main

## Verifikation
- [ ] `npm run build` ohne Fehler
- [ ] `npm run lint` ohne Fehler
- [ ] Browser-Test: Spiel anlegen, Spieler importieren, Spielstand +/-
- [ ] ROADMAP.md aktualisieren
