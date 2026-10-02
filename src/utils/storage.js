const KEY = 'ambiora-arena-v1'
const empty = { players: [], teams: [], fixtures: [] }
export function loadTournament() { try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') } } catch { return empty } }
export function saveTournament(data) { localStorage.setItem(KEY, JSON.stringify(data)) }
export function clearTournament() { localStorage.removeItem(KEY) }
