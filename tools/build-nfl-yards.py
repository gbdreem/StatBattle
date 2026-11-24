"""Rebuild players/nfl-yards.js from data/players.js and data/player_seasons.json.

Run from the repo root:  python3 tools/build-nfl-yards.py
Needs Node.js (to read data/players.js) and Python 3.
"""
import collections, json, subprocess, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
pool = json.loads(subprocess.check_output(
    ['node', '-e', "global.window={};require('./data/players.js');process.stdout.write(JSON.stringify(window.SB_PLAYERS))"],
    cwd=root))
seasons = json.loads((root / 'data/player_seasons.json').read_text())
by_name = collections.defaultdict(list)
for r in seasons:
    by_name[r['player']].append(r)

out = {}
for p in pool:
    if p[0] != 'nfl':
        continue
    name, first, last = p[1], p[4], p[5] or 9999
    names = [name] + (p[11] if len(p) > 11 else [])
    rows = [r for n in names for r in by_name.get(n, []) if first <= r['year'] <= last]
    if not rows:
        continue
    total = collections.Counter()
    for r in rows:
        total[r['playerId']] += r.get('passYds', 0) + r['rushYds'] + r['recYds']
    pid = total.most_common(1)[0][0]  # same-name players: keep the one with the most yards in his career span
    mine = sorted((r for r in rows if r['playerId'] == pid), key=lambda r: (r['year'], r['team']))
    out[name] = [[r['year'], r['team'], r.get('passYds', 0), r['rushYds'], r['recYds']] for r in mine]

header = ("// NFL passing/rushing/receiving yards per season for the athletes in data/players.js, 1999 on (from data/player_seasons.json).\n"
          "// Rows: [season, team, pass yds, rush yds, rec yds]. Regenerate with tools/build-nfl-yards.py when the season data changes.\n")
(root / 'players/nfl-yards.js').write_text(header + 'const NFL_YARDS = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
print(f'Wrote {len(out)} players to players/nfl-yards.js')
