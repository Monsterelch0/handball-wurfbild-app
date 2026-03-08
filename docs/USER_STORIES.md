# User Stories: Handball Wurfbild-Analyse App

**Version:** 1.0
**Datum:** 2026-03-08

Format: *Als [Rolle] moechte ich [Funktion], damit [Nutzen].*

Schaetzung: **XS** (<1h) | **S** (1–3h) | **M** (3–8h) | **L** (1–2 Tage) | **XL** (>2 Tage)

---

## Epos 1: App-Setup & Offline-Verfuegbarkeit

### US-01 – PWA-Installation
> Als Torwart moechte ich die App auf dem Homescreen meines iPads installieren koennen,
> damit ich sie wie eine native App starten kann ohne immer den Browser oeffnen zu muessen.

- **Akzeptanzkriterien:**
  - [ ] "Zum Homescreen hinzufuegen"-Banner erscheint automatisch
  - [ ] App startet im Fullscreen-Modus (kein Browser-UI)
  - [ ] App-Icon und Splash-Screen sind vorhanden
- **Groesse:** S
- **Phase:** 1

### US-02 – Offline-Betrieb
> Als App-Nutzer moechte ich, dass die App komplett offline im Browser meines iPads funktioniert,
> damit ich in Sporthallen ohne Netz keine Daten verliere.

- **Akzeptanzkriterien:**
  - [ ] App ist nach einmaligem Laden vollstaendig offline nutzbar
  - [ ] Alle Spielerfassungen werden lokal gespeichert
  - [ ] Kein Fehler / kein Datenverlust bei fehlender Internetverbindung
  - [ ] Klare Status-Anzeige "Offline" / "Online"
- **Groesse:** M
- **Phase:** 1–2

---

## Epos 2: Spielverwaltung

### US-03 – Neues Spiel anlegen
> Als Torwart moechte ich vor dem Spiel ein neues Spiel mit Datum, Heim- und Gastmannschaft anlegen koennen,
> damit alle erfassten Daten dem richtigen Spiel zugeordnet werden.

- **Akzeptanzkriterien:**
  - [ ] Formular: Datum, Heimteam, Gastteam, Wettbewerb (optional)
  - [ ] Spiel wird lokal gespeichert und ist sofort aktiv
  - [ ] Spiel erscheint in der Spieluebersicht
- **Groesse:** S
- **Phase:** 3

### US-04 – Kader per CSV importieren
> Als Torwart moechte ich vor dem Spiel den gegnerischen Kader per CSV- oder Excel-Datei laden koennen,
> damit ich in der Halle nicht alle Namen einzeln eintippen muss.

- **Akzeptanzkriterien:**
  - [ ] Upload-Dialog fuer .csv und .xlsx Dateien
  - [ ] Spalten-Mapping: Trikotnummer + Name (Vorname / Nachname)
  - [ ] Vorschau der importierten Spieler vor dem Bestaetigen
  - [ ] Fehlermeldung bei ungueltigen Dateien
- **Groesse:** M
- **Phase:** 3

### US-05 – Spieler manuell hinzufuegen
> Als Torwart moechte ich einzelne Spieler mit Trikotnummer und Name manuell eintragen koennen,
> damit ich auch ohne Datei-Import schnell loslegen kann.

- **Akzeptanzkriterien:**
  - [ ] Einfaches Formular: Nummer + Name
  - [ ] Spieler erscheint sofort in der Schnellauswahl
- **Groesse:** XS
- **Phase:** 3

### US-06 – Spielstand verfolgen
> Als Torwart moechte ich den aktuellen Spielstand per +/- Buttons verfolgen koennen,
> damit ich spaeter Wuerfe mit dem Spielstand korrelieren kann (z.B. Crunchtime-Analyse).

- **Akzeptanzkriterien:**
  - [ ] +/- Buttons fuer Heim und Gast sichtbar waehrend des Trackings
  - [ ] Spielstand wird mit jedem erfassten Wurf als Kontext gespeichert
- **Groesse:** S
- **Phase:** 3

### US-07 – Spielzeit tracken
> Als Torwart moechte ich die Spielminute nebenbei tracken koennen,
> damit ich erkenne, wie der Gegner in Drucksituationen (letzte 5 Minuten) wirft.

- **Akzeptanzkriterien:**
  - [ ] Start/Stopp Timer fuer 1. Halbzeit (0–30 min) und 2. Halbzeit (30–60 min)
  - [ ] Aktuelle Spielminute wird automatisch jedem Wurf mitgegeben
  - [ ] Halbzeit-Pause-Modus (Timer pausiert, kein Datenverlust)
- **Groesse:** S
- **Phase:** 3

---

## Epos 3: Live-Tracking (Eingabemaske)

### US-08 – Wurfweg zeichnen
> Als Torwart auf der Bank moechte ich mit dem Apple Pencil den Lauf- und Wurfweg des Gegners
> auf einem virtuellen Spielfeld zeichnen koennen,
> damit die Flugbahn exakt dokumentiert ist.

- **Akzeptanzkriterien:**
  - [ ] Spielfeld-Draufsicht als Zeichenflaeche (halbes Feld + Tor)
  - [ ] Glatte Stift-Kurven ohne spuerbare Latenz (<20 ms)
  - [ ] Unterschied zwischen Laufweg und Ballflugkurve visuell erkennbar (Farbe / Stil)
  - [ ] Finger-Eingabe als Fallback wenn kein Pencil verfuegbar
- **Groesse:** XL
- **Phase:** 4

### US-09 – Werfer auswaehlen
> Als Torwart moechte ich nach dem Zeichnen schnell den Werfer per Trikotnummer oder Name auswaehlen,
> damit jeder Wurf eindeutig einem Spieler zugeordnet ist.

- **Akzeptanzkriterien:**
  - [ ] Schnellauswahl-Raster aller Kader-Spieler (Nummer gross, Name klein)
  - [ ] Suche per Eingabe der Trikotnummer
  - [ ] Letzter Werfer wird vorausgewaehlt (schnelle Mehrfach-Erfassung)
- **Groesse:** S
- **Phase:** 4

### US-10 – Wurfart klassifizieren
> Als Torwart moechte ich nach dem Zeichnen schnell die Wurfart per Button markieren,
> damit ich die Wurfvorbereitung des Gegners spaeter analysieren kann.

- **Akzeptanzkriterien:**
  - [ ] Buttons: Schlagwurf, Sprungwurf, Dreher, Heber, Kempa
  - [ ] Maximal eine Wurfart waehlabar
  - [ ] Buttons sind gross genug fuer Finger-Bedienung mit Handschuh / Harz
- **Groesse:** S
- **Phase:** 4

### US-11 – Koerpertaeuschung markieren
> Als Torwart moechte ich per Toggle angeben, ob der Werfer eine Koerpertaeuschung gemacht hat,
> um spaeter Muster bei Antaeuschern zu erkennen.

- **Akzeptanzkriterien:**
  - [ ] Deutlich sichtbarer Ja/Nein-Toggle
  - [ ] Standard: Nein (schnelle Eingabe ohne Antaeuschung)
- **Groesse:** XS
- **Phase:** 4

### US-12 – Wurfergebnis erfassen
> Als Torwart moechte ich nach dem Zeichnen auf einen grossen Button (Tor / Gehalten / Geblockt / Vorbei) tippen,
> damit die App automatisch das passende Symbol (O, X, ◻) an das Ende der Wurfkurve setzt.

- **Akzeptanzkriterien:**
  - [ ] 4 gut sichtbare Ergebnis-Buttons (farbkodiert empfohlen)
  - [ ] Passendes Symbol wird automatisch am Wurfziel platziert
  - [ ] Speichern des Wurfs wird erst nach Ergebnis-Auswahl abgeschlossen
- **Groesse:** S
- **Phase:** 4

### US-13 – Letzten Eintrag rueckgaengig machen
> Als Torwart moechte ich den zuletzt gespeicherten Wurf per Undo-Button rueckgaengig machen koennen,
> damit ich Vertipper sofort korrigieren kann ohne den ganzen Eintrag loeschen zu muessen.

- **Akzeptanzkriterien:**
  - [ ] Undo-Button immer sichtbar auf der Tracking-Maske
  - [ ] Bestaetigung vor dem Loeschen (Accidental-Touch vermeiden)
  - [ ] Redo wird nicht benoetigt (v1.0)
- **Groesse:** S
- **Phase:** 4

---

## Epos 4: 7-Meter-Modus

### US-14 – 7-Meter erfassen
> Als Torwart moechte ich bei einem 7-Meter ein spezielles Eingabe-Menue oeffnen koennen,
> damit die Strafwurf-Situation vollstaendig und separat dokumentiert wird.

- **Akzeptanzkriterien:**
  - [ ] Gut sichtbarer "7m"-Button auf der Tracking-Maske
  - [ ] Eigene Maske: Schuetze, Anzahl Antaeuschungen, Wurfrichtung, Ergebnis
- **Groesse:** M
- **Phase:** 5

### US-15 – Antaeuschungs-Zaehler
> Als Torwart moechte ich eintragen koennen, wie oft der 7m-Schuetze angetaeuscht hat,
> damit ich dem Stamm-Keeper diese Info in der Halbzeit geben kann.

- **Akzeptanzkriterien:**
  - [ ] Zaehler 0–5+ per +/- Buttons
  - [ ] Wert wird in der 7m-Historie angezeigt
- **Groesse:** XS
- **Phase:** 5

---

## Epos 5: Analyse & Dashboards

### US-16 – Heatmap ansehen
> Als Trainer / Torwart moechte ich eine Gesamt-Heatmap aller gegnerischen Wuerfe im Tor-Raster sehen,
> damit ich in der Halbzeitpause sofort erkenne, wo die "Schokoladenseite" des Gegners liegt.

- **Akzeptanzkriterien:**
  - [ ] Tor-Raster (3x2 Zonen) mit Farb-Intensitaet je nach Treffer-Dichte
  - [ ] Trennbar nach: alle Wuerfe / nur Tore / nur gehalten
  - [ ] Filtert nach den allgemeinen Filter-Optionen
- **Groesse:** L
- **Phase:** 6

### US-17 – Kachel-Ansicht pro Spieler
> Als Torwart moechte ich eine Ansicht mit mehreren kleinen Einzel-Toren oeffnen koennen,
> in der die Wuerfe nach gegnerischen Spielern sortiert sind,
> damit ich mir einzelne Schuetzen genau ansehen kann (analog Papiervorlage).

- **Akzeptanzkriterien:**
  - [ ] Grid: ein kleines Tor pro Spieler mit allen eingezeichneten Wuerfen
  - [ ] Klick auf Kachel oeffnet Detailansicht des Spielers
  - [ ] Trikotnummer und Name ueber jeder Kachel
- **Groesse:** L
- **Phase:** 6

### US-18 – 7m-Historie anzeigen
> Als Torwart moechte ich eine Uebersicht aller 7m-Situationen mit Schuetze und Antaeusch-Muster sehen,
> damit ich mich und den Stamm-Keeper gezielt vorbereiten kann.

- **Akzeptanzkriterien:**
  - [ ] Liste aller 7m-Situationen mit: Spielminute, Schuetze, Anzahl Antaeuschungen, Wurfrichtung, Ergebnis
  - [ ] Kumulierte Statistik pro Schuetze (ueber mehrere Spiele)
- **Groesse:** M
- **Phase:** 6

### US-19 – Wurfbilder filtern
> Als Trainer moechte ich die Analyse-Ansichten nach Spieler, Spielstand, Halbzeit und Wurfart filtern koennen,
> damit ich gezielte Situationsanalysen durchfuehren kann.

- **Akzeptanzkriterien:**
  - [ ] Multi-Filter: Spieler (Mehrfachauswahl), Halbzeit, Spielstand-Spanne, Wurfart
  - [ ] Filter-Status immer sichtbar und einfach zuruecksetzbar
- **Groesse:** M
- **Phase:** 6

### US-20 – Spielarchiv nutzen
> Als Torwart moechte ich das Wurfbild-Archiv aus der Hinrunde oeffnen koennen,
> damit ich mich vor dem Rueckspiel perfekt auf die gegnerischen Werfer vorbereiten kann.

- **Akzeptanzkriterien:**
  - [ ] Liste aller gespeicherten Spiele (Datum, Gegner, Ergebnis)
  - [ ] Oeffnen und vollstaendige Analyse vergangener Spiele
  - [ ] Spieler-uebergreifende Saisonstatistik
- **Groesse:** M
- **Phase:** 6

---

## Epos 6: Cloud-Sync

### US-21 – Automatische Synchronisation
> Als Nutzer moechte ich, dass meine lokalen Daten automatisch synchronisiert werden, sobald WLAN verfuegbar ist,
> damit das Archiv auf allen meinen Geraeten aktuell ist.

- **Akzeptanzkriterien:**
  - [ ] Automatischer Sync-Start bei WLAN-Verbindung
  - [ ] Status-Indikator (zuletzt synchronisiert: ...)
  - [ ] Kein Datenverlust bei Sync-Unterbrechung
- **Groesse:** XL
- **Phase:** 7

### US-22 – Manueller Sync
> Als Nutzer moechte ich per Button manuell eine Synchronisation ausloesen koennen,
> damit ich den Upload-Zeitpunkt selbst kontrollieren kann.

- **Akzeptanzkriterien:**
  - [ ] "Jetzt synchronisieren"-Button in den Einstellungen
  - [ ] Fortschritts-Feedback waehrend des Syncs
- **Groesse:** S
- **Phase:** 7
