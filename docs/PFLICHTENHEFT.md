# Pflichtenheft: Handball Wurfbild-Analyse App (PWA)

**Version:** 1.0
**Datum:** 2026-03-08
**Status:** In Bearbeitung

---

## 1. Zielsetzung

Entwicklung einer Tablet-optimierten Progressive Web App (PWA) zur digitalen Erfassung und Analyse von Handball-Wurfbildern waehrend des Spielbetriebs.

Die App richtet sich an den Amateur- und Semi-Profi-Bereich (Fokus: Verbandsliga) und soll die bisherige Zettelwirtschaft ersetzen.

---

## 2. Zielgruppe & Bedienung

**Hauptnutzer:** Der zweite Torwart (oder Betreuer) auf der Bank.

**Hardware:** iPad mit Apple Pencil (oder kompatiblem Stylus).

**Besonderheit:** Die Bedienung muss "harzresistent" sein – primaere Eingabe ueber den Stift und grosse Touch-Buttons (min. 44x44pt Tippen ohne praezise Feinmotorik).

---

## 3. Funktionale Anforderungen

### 3.1 Spielverwaltung

| ID | Anforderung | Prioritaet |
|---|---|---|
| F-SV-01 | Anlegen eines neuen Spiels (Heim vs. Gast, Datum, Wettbewerb) | Muss |
| F-SV-02 | Import des Gegner-Kaders per CSV/Excel-Datei | Muss |
| F-SV-03 | Manuelles Anlegen einzelner Spieler (Name, Trikotnummer) | Muss |
| F-SV-04 | API-Anbindung an nuLiga / handball.net fuer Kader-Import | Kann |
| F-SV-05 | Spielzeit-Erfassung (Start/Stopp-Timer fuer 1. und 2. Halbzeit) | Muss |
| F-SV-06 | Spielstand-Erfassung (+/- Zähler fuer Heim und Gast) | Muss |
| F-SV-07 | Anzeige der aktuellen Spielminute waehrend des Trackings | Sollte |

### 3.2 In-Game Tracking – Eingabemaske

| ID | Anforderung | Prioritaet |
|---|---|---|
| F-TR-01 | Digitale Zeichenflaeche mit Spielfeld-Draufsicht und Tor-Darstellung | Muss |
| F-TR-02 | Freihand-Eingabe von Laufweg (Stift / Finger) | Muss |
| F-TR-03 | Freihand-Eingabe der Ballflugkurve | Muss |
| F-TR-04 | Schnellauswahl des Werfers per Trikotnummer oder Name | Muss |
| F-TR-05 | Wurfart-Buttons: Schlagwurf, Sprungwurf, Dreher, Heber, Kempa | Muss |
| F-TR-06 | Koerpertaeuschung: Ja / Nein Toggle | Muss |
| F-TR-07 | Ergebnis-Buttons: Tor (O), Gehalten (X), Geblockt (◻), Vorbei | Muss |
| F-TR-08 | Automatisches Setzen des Ergebnis-Symbols ans Ende der Wurfkurve | Muss |
| F-TR-09 | Undo-Funktion fuer die letzte Eingabe | Muss |
| F-TR-10 | Konfirmations-Schritt vor dem Speichern (Vorschau des Eintrags) | Sollte |
| F-TR-11 | Haptisches Feedback bei Button-Aktionen (falls unterstuetzt) | Kann |

### 3.3 7-Meter-Modus

| ID | Anforderung | Prioritaet |
|---|---|---|
| F-7M-01 | Spezielles Eingabe-Menue fuer 7-Meter-Situationen | Muss |
| F-7M-02 | Auswahl des Schuetzen aus dem Kader | Muss |
| F-7M-03 | Zaehler fuer Anzahl der Antaeuschungen (0–5+) | Muss |
| F-7M-04 | Ergebnis-Erfassung: Tor / Gehalten / Vorbei | Muss |
| F-7M-05 | Zeichenflaeche fuer Wurfrichtung (vereinfachtes Tor-Raster) | Sollte |

### 3.4 Auswertung & Analyse

| ID | Anforderung | Prioritaet |
|---|---|---|
| F-AN-01 | Kachel-Ansicht: Mehrere kleine Tore nebeneinander (nach Spieler) | Muss |
| F-AN-02 | Heatmap-Ansicht: Aggregierte Uebersicht aller Wuerfe im Tor-Raster | Muss |
| F-AN-03 | 7m-Historie: Uebersicht der Schuetzen mit Antaeusch-Mustern | Muss |
| F-AN-04 | Filterfunktion: nach Spieler, Spielstand, Halbzeit, Wurfart | Muss |
| F-AN-05 | Export der Auswertung als PDF oder PNG | Sollte |
| F-AN-06 | Spielarchiv: Vergangene Spiele oeffnen und vergleichen | Muss |
| F-AN-07 | Spieler-Profil: Saisonweite Wurfbild-Statistik pro Gegner-Spieler | Kann |

### 3.5 Daten & Synchronisation

| ID | Anforderung | Prioritaet |
|---|---|---|
| F-DB-01 | Vollstaendige Offline-Funktionalitaet (kein Netz erforderlich) | Muss |
| F-DB-02 | Lokale Speicherung aller Spieldaten per IndexedDB | Muss |
| F-DB-03 | Automatische Cloud-Synchronisation bei WLAN-Verfuegbarkeit | Sollte |
| F-DB-04 | Manuelle Sync-Funktion (Button "Jetzt synchronisieren") | Sollte |
| F-DB-05 | Konfliktbehandlung bei parallelen Geraete-Eingaben | Kann |

---

## 4. Nicht-funktionale Anforderungen

### 4.1 Performance

- App-Start (Cold Start) in unter 3 Sekunden auf iPad Air (2020 oder neuer)
- Stift-Latenenz bei Zeicheneingabe unter 20 ms
- Seiten-Wechsel innerhalb der App unter 300 ms

### 4.2 Usability

- Alle interaktiven Elemente mindestens 44x44 Punkt gross
- Kontrastarmes Design vermeiden (WCAG AA als Mindeststandard)
- Dark Mode unterstuetzt (besonders fuer schlechte Hallenbeleuchtung)
- Linksseitige Bedienung optional einstellbar

### 4.3 Zuverlaessigkeit & Datensicherheit

- Kein Datenverlust bei App-Absturz (persistentes Speichern nach jedem Wurf)
- Lokale Daten niemals ohne explizite Nutzeraktion geloescht
- Cloud-Daten verschluesselt uebertragen (HTTPS/TLS)
- DSGVO-konformes Datenschutzkonzept (Spielerdaten nur fuer registrierte Nutzer)

### 4.4 Kompatibilitaet

- Primaer: Safari auf iPadOS 16+
- Sekundaer: Chrome auf Android-Tablets
- Dektop: Chrome und Firefox (aktuelle Version)
- Apple Pencil (1. und 2. Generation) als primaeres Eingabegeraet

---

## 5. Systemgrenzen & Abgrenzung

**Im Scope:**
- Digitale Wurfbild-Erfassung und -Auswertung
- Gegner-Analyse (Wuerfe der anderen Mannschaft)
- Offline-First-Betrieb auf Tablet

**Nicht im Scope (v1.0):**
- Video-Analyse oder -Integration
- Automatische Wurferkennung per KI/Computer Vision
- Echtzeit-Sharing mit anderen Geraeten waehrend des Spiels
- Verwaltung der eigenen Mannschaft / Taktik-Tool

---

## 6. Glossar

| Begriff | Bedeutung |
|---|---|
| Wurfbild | Grafische Darstellung aller Wuerfe eines Spielers / Teams auf einem Tor-Raster |
| Heatmap | Farbkodierte Uebersicht, in welchen Torbereichen die meisten Wuerfe landen |
| Kachel-Ansicht | Mehrere kleine Torbilder nebeneinander, je eines pro Spieler (analog Papiervorlage) |
| 7m-Modus | Spezial-Erfassungsmaske fuer Strafwuerfe (7-Meter) |
| Antaeuschung | Scheinbewegung des Werfers vor dem eigentlichen Wurfabschluss |
| PWA | Progressive Web App – Webanwendung mit App-aehnlicher Funktionalitaet (Offline, Homescreen) |
| IndexedDB | Browser-interne Datenbank fuer groessere Offline-Datensaetze |
