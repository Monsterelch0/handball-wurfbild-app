import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export interface RosterEntry {
  number: number
  name: string
}

// Mögliche Spalten-Namen im CSV/XLSX
const NUMBER_KEYS = ['nr', 'nummer', '#', 'no', 'number', 'trikotnummer']
const NAME_KEYS   = ['name', 'spieler', 'player', 'nachname', 'vorname und nachname']

function findKey(headers: string[], candidates: string[]): string | undefined {
  return headers.find((h) => candidates.includes(h.toLowerCase().trim()))
}

function normalizeRows(rows: Record<string, unknown>[]): RosterEntry[] {
  if (rows.length === 0) return []
  const headers = Object.keys(rows[0])
  const numKey  = findKey(headers, NUMBER_KEYS)
  const nameKey = findKey(headers, NAME_KEYS)

  if (!numKey || !nameKey) {
    throw new Error(
      `Konnte Spalten nicht erkennen. Benötigt: Nummer (${NUMBER_KEYS.join('/')}) und Name (${NAME_KEYS.join('/')})`
    )
  }

  return rows
    .map((row) => ({
      number: Number(row[numKey]),
      name: String(row[nameKey] ?? '').trim(),
    }))
    .filter((e) => !isNaN(e.number) && e.number > 0 && e.name.length > 0)
}

/** Parst eine CSV-Datei und gibt RosterEntry[] zurück */
export async function parseCSV(file: File): Promise<RosterEntry[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          resolve(normalizeRows(result.data))
        } catch (e) {
          reject(e)
        }
      },
      error: (err) => reject(new Error(err.message)),
    })
  })
}

/** Parst eine XLSX/XLS-Datei und gibt RosterEntry[] zurück */
export async function parseXLSX(file: File): Promise<RosterEntry[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet    = workbook.Sheets[workbook.SheetNames[0]]
        const rows     = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
        resolve(normalizeRows(rows))
      } catch (e) {
        reject(e)
      }
    }
    reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden'))
    reader.readAsArrayBuffer(file)
  })
}

/** Wählt automatisch den richtigen Parser anhand der Dateiendung */
export async function parseRosterFile(file: File): Promise<RosterEntry[]> {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext === 'csv') return parseCSV(file)
  if (ext === 'xlsx' || ext === 'xls') return parseXLSX(file)
  throw new Error(`Nicht unterstütztes Format: .${ext}. Bitte .csv oder .xlsx verwenden.`)
}
