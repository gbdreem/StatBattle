# Contributing to StatBattle

Thanks for helping. StatBattle is split into areas, and each has its own folder, label and issue form, so suggestions land with the right part of the game.

| Area | Folder(s) | Label |
|---|---|---|
| Game modes | `modes/`, `games/<mode>/` | `area: modes` (plus `mode: <name>`) |
| Hall of Records | `hall/` | `area: hall-of-records` |
| Player pages and ratings | `players/` | `area: player-pages` |
| Data | `data/`, `tools/` | `area: data` |
| Site shell, design and art | `index.html`, `css/`, `js/`, `assets/` | `area: site` |

## Suggesting something

Open an issue and pick the form for your area: a new game mode idea, a Hall of Records correction or addition, a player rating suggestion, a data correction, or a bug. Corrections need a source link.

## Making a change

1. Fork the repo (or, if you have write access, work in this one).
2. Create a branch named after the area and the change, for example:
   - `hall/add-la-liga-champions`
   - `modes/stat-club-first-version`
   - `players/fix-ohtani-draft`
   - `data/2026-week-12-yards`
3. Keep each pull request to one area and one change. A Hall of Records fix and a new game mode are two pull requests.
4. Run the site locally (`python3 -m http.server 8000`) and check the pages you touched, on a narrow phone-sized window too.
5. Open a pull request and fill in the template. Say which area it touches and how you checked it.

Branches are for work in progress: each one becomes a pull request and is deleted once it's merged. The permanent split between areas is the folder structure, not long-lived branches.

## Area guides

### Game modes
- A mode's card (name, sports, rules shown on the home page) is an entry in `MODES` in `modes/catalog.js`. Put its id in one of the `CATS` lists to show it under a game type.
- A playable game lives in `games/<mode-id>/index.html`. Link it from the mode's `live` field (one URL per sport).
- Games can use the shared player pool (`../../data/players.js`), the sport backgrounds (`../../assets/bg/<sport>.png`) and the team logos (`../../assets/logos/<team>.png`).
- When a player wins, call `window.StatBattle?.recordWin(modeId, sportId)` if it exists, so the home page can count the win later.
- Describe new rules in `docs/game-design.md` in the same pull request.

### Hall of Records
- One file per tab: `hall/records.js` (all-time records), `champions.js`, `leaders.js`, `all-league.js`, `famous.js`. Rows are `|`-separated text, one per line, newest first.
- A field starting with `—` shows greyed out (for "Not held" years or awards that didn't exist yet).
- Every new or corrected fact needs a source in the pull request (the league's site, Sports Reference, Wikipedia's lists). Update `HALL_UPDATED` in `hall/records.js` when you re-check figures.

### Player pages and ratings
- Athletes come from `data/players.js` (format explained at the top of that file). Add a player there and they get a page automatically.
- **Ratings:** edit `players/ratings.json` (`"athlete-slug": 1-99`). The owner reviews every rating change and has the final say.
- Formula ideas go in an issue first: the rating formula affects every player.

### Data
- `data/player_seasons.json` is NFL weekly stats summed per player, team and regular season (nflverse, 1999 onward). After changing it, run `python3 tools/build-nfl-yards.py` to refresh `players/nfl-yards.js`.
- Don't commit data you don't have the right to share. Say where data came from and under what terms.

## Style

- Plain HTML, CSS and JavaScript; no frameworks or build step.
- Escape anything that goes into HTML with `esc()`.
- Controls need visible focus and a 44px touch target; check dark mode.
- Write player-facing text in short, plain sentences.
