// ---------- Hall of Records: full histories, leaders, all-league teams, famous teams (checked 2026-11-22) ----------
// Rows are written one per line, fields split by "|". A field starting with "—" shows muted (not held / not awarded).
const R = s => s.trim().split('\n').map(l => l.trim().split('|'));
const SEASON = y => `${y-1}–${String(y).slice(2)}`;          // 2026 -> 2025–26
const seasonRows = s => R(s).map(r => [SEASON(+r[0]), ...r.slice(1)]);

