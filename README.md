# StatBattle

A sports trivia game: guess the player, know the numbers, draft a lineup, and browse a Hall of Records and player pages for 7 sports (football, basketball, baseball, hockey, soccer, tennis, MMA).

It is a static site: plain HTML, CSS and JavaScript with no build step. Open `index.html` through any local web server, or publish the repo with GitHub Pages.

## Run it locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` straight from disk mostly works, but the player ratings file and the game data files load with `fetch`, which browsers block on `file://` pages. Use a server.

## What's where

Each part of the game lives in its own folder, so people can work on one part without touching the rest.

| Folder | What it is | Start here |
|---|---|---|
| `index.html` | The home page shell: markup for every view, then the scripts in load order | |
| `css/` | `base.css` (page, top bar, mode cards, profile), `hall.css`, `players.css` | |
| `js/core.js` | Sports list, sport icons, shared helpers. Loaded first | |
| `modes/catalog.js` | Every game mode card (`MODES`), parked ideas (`CONCEPTS`), home page game types (`CATS`) | Adding or changing a mode |
| `games/<mode>/` | Each playable game, one folder per mode | Building a game |
| `hall/` | Hall of Records data, one file per tab, plus `view.js` (the renderer) | Corrections and new lists |
| `players/` | Player pages (`athletes.js`), ratings (`ratings.js`, `ratings.json`), NFL season stats | Player pages and ratings |
| `data/` | Shared data: the player pool (`players.js`), name dictionary, NFL season stats 1999–2026 | Data fixes |
| `assets/` | Pixel-art backgrounds, team logos, sport icons | Art |
| `js/app.js` | Routing between views and the mode panel. Loaded last | |
| `js/profile.js` | Levels, badges and dev mode | |
| `prototypes/` | Earlier experiments kept for reference, not linked from the site | |
| `docs/game-design.md` | The design doc: every mode, its rules and open questions | Read this first |
| `tools/` | Scripts that regenerate derived data | |

### Games

| Mode | Folder | Status |
|---|---|---|
| Mystery Player | `games/mystery-player/` | Playable (NFL, NBA, MLB, NHL) |
| Career Path | `games/career-path/` | Playable (NFL, NBA, MLB, NHL) |
| Stat Spinner (Yardage Spinner) | `games/yardage-spinner/` | Playable (NFL) |
| Higher or Lower | `games/higher-or-lower/` | Prototype (NFL), not linked from the home page yet |
| Franchise Leaders | `games/franchise-leaders/` | Prototype (NFL) |
| Leaderboard Fill-In, Stat Club, Stat Line Reveal, Draft Mode | not built yet | Their cards are in `modes/catalog.js`; ideas in `docs/game-design.md` |

### How the home page scripts fit together

The scripts are plain (non-module) scripts loaded in order from `index.html`, and they share top-level names. Order matters: `core.js` → `modes/` → `hall/` → `players/` → `app.js` → `profile.js`. A new file goes in the right spot in that list. Names declared at the top level of one file are visible to every later file, so pick specific names.

Views are addressed by plain hashes: `#hall`, `#players`, `#p-<athlete-slug>` (for example `#p-tom-brady`), `#ratings`, `#type-guess`, `#type-numbers`.

## Player ratings

Each athlete's rating comes from, in order of priority:

1. **The owner's live edits** on the claude.ai version of the site (saved in that page's database; only the owner can write them).
2. **`players/ratings.json`**: owner-approved ratings kept in this repo. Keys are athlete slugs or full names, values are whole numbers from 1 to 99.
3. **The formula** in `players/athletes.js` (currently a temporary, honors-only preview).

To suggest a rating change, open a pull request that edits `players/ratings.json` and explain why. The owner has the final say: changes to that file need the owner's approval (see `.github/CODEOWNERS`).

The ratings editor itself only appears in dev mode (tap the logo 5 times, or add `#dev` to the address, then enter the password). The password is checked in the page's own code, so it hides the editor rather than securing it.

## Known gaps

- Football season stats cover 1999 onward only, from nflverse play-by-play data, and can differ from official totals by a few yards.
- NBA, MLB, NHL, soccer, tennis and MMA season stats aren't in yet.
- Game results aren't shared between games, so levels and per-player game stats don't count yet.
- On GitHub Pages there is no database: Yardage Spinner's game history lasts only for the visit, and ratings come from `ratings.json` only.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
