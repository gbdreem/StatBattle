# StatBattle — Game design (modes, Hall of Records, player pages)

_Last updated: 2026-11-22 (Hall of Records expanded: full champion histories, leaders, all-league teams, famous teams)_

## Home page structure (2026-11-20)

The home page opens on **two game types, a Draft Mode card** and a **Hall of Records** card. Opening a type shows only its modes, which open the sport-picker panel. The Draft Mode card opens its panel directly.

| Home card | Modes | Sports |
|---|---|---|
| **Guess the Player** | Mystery Player, Career Path, Stat Line Reveal | All 7 |
| **Know the Numbers** | Leaderboard Fill-In, Stat Club, Higher or Lower, Stat Spinner | All 7 |
| **Draft Mode** (single mode, no type page) | Draft Mode | Football only |

- **Versus was removed 2026-11-20.** Its Draft Mode got its own home card in the same spot. Head-to-Head Stat Battles and Category Steal were taken off the page and parked as concepts (see below).
- Grouping lives in `CATS` in the home page script; moving a mode id between lists regroups it. An entry with `single:'<mode id>'` shows that one mode as a home card (with its 3 steps) that opens the mode panel directly. A type with 4 modes shows them as a 2 × 2 grid.
- Views are addressed by plain hashes: `#type-guess`, `#type-numbers`, `#hall` (the artifact host only passes plain `#name` hashes, not `#a/b`). The old `#type-versus` now falls back to the home view.
- The top bar has the logo, Single player / Multiplayer (Multiplayer locked, "Coming soon") and the level/profile badge. The Casual / Expert toggle was removed on 2026-11-20.
- **Hall of Records** (`#hall`), expanded 2026-11-22: pick one of the 7 sports, then switch between five tabs (the 4th and 5th are named per sport). The sport's pixel-art background heads the panel. Data lives in `HALL` in the page script; recent figures checked 2026-11-22.
  - **Records:** 8 all-time records per sport, "New" tag on ones set in the last year.
  - **Champions:** full histories, newest first, with a decade filter and a team/player search on any list over 20 rows. Not-held years are explicit rows. NBA Finals 1947–2026 (BAA years tagged, Finals MVP from 1969); Super Bowl I–LX plus an **NFL Championship 1920–69** tab; World Series 1903–2026 (MVP from 1955); Stanley Cup 1918–2026 (Conn Smythe from 1965); Soccer: Champions League 1956–2026, World Cup 1930–2026, **Premier League** 1993–2026; Tennis: **men's and women's** Open Era Slam grids 1968–2026; MMA: current UFC champions plus a **lineal heavyweight boxing** line, Corbett 1892 to Usyk 2024.
  - **Leaders:** top-10 lists with ranks and an "Active" tag. Football: career and single-season passing, rushing and receiving yards. Basketball: career points, rebounds, assists, and every 70-point game (incl. Bam Adebayo's 83, Mar 2026). Baseball: career HR, season HR, career pitching wins. Hockey: career goals, career points, season goals. Soccer: Premier League and Champions League career goals. Tennis: Slam titles, men and women. MMA: a short table of career marks. Career totals run through the last completed season (NFL 2025, NBA/NHL 2025–26).
  - **All-league tab:** All-Pro (2025 AP first team), All-NBA (2025–26 first team), All-MLB (2025 first team; 2026 team due in December), All-Stars (2025–26 NHL first team), Team of the Year (2025–26 PFA), Year-end No. 1 (tennis, ATP 1973–2026 and WTA 1975–2026). No tab for MMA.
  - **Famous teams** (Rivalries for tennis, Iconic fights for MMA): 7–8 cards each with years, record, why it's famous and key people.
  - Not yet: other soccer leagues (La Liga, Serie A, Ligue 1, Bundesliga, pre-1992 English champions), UFC title reigns by division, All-Pro/All-NBA history beyond the latest season, Team pages. Leaders need a refresh after each season.

## Athlete pages (built 2026-11-24, preview)

- On the home page under **Browse**, a **Player pages** card opens `#players`: every athlete in the shared pool (`players.js`, copied beside the home page, the same file Mystery Player and Career Path use), with league chips, a name/team search, and cards sorted by rating. Each athlete has a page at `#p-<slug>` (e.g. `#p-tom-brady`). Names in the Hall of Records Leaders tab link to these pages.
- Every athlete uses the same blank silhouette for now (no photos).
- Page sections: a hero with a FIFA-style card (rating, position, sport icon; gold 90+, silver 80–89, bronze below), honors (titles, MVPs, Hall of Fame); **Preview rating** with four bars; **Bio** (league, position, college or birth country, draft, career span, Hall of Fame status); **Career path** (team stints); **Season stats**; **In the Hall of Records** (every leader list, Finals/Super Bowl/World Series MVP and all-league mention, each linking to that Hall tab); **In StatBattle** (modes he appears in, plus placeholder game stats).
- **Preview rating (temporary, honors only):** Peak = MVPs × 10 (max 4), Winning = titles × 5 (max 6), Longevity = seasons (max 20), Legacy = Hall of Fame 10. Raw score out of 100, scaled against the best in the same league: OVR = 60 + 39 × (raw ÷ league best)^0.8. So each league's top player is 99 (Ruth, Howe/Gretzky, Kareem/Jordan, Brady); active players rate lower because honors pile up over a career. Code: `RATING_PARTS` and the `ATHLETES` map in the home page script.
- **Owner has the final say on ratings (2026-11-24).** Whatever formula is used, a rating the owner sets always wins, and keeps winning after formula changes. Stored in the home page's database at `ratings/<athlete slug>` = `{ovr (1–99), note, at}`; the declared rule lets everyone read and **only the artifact's owner write** (`{path:"ratings", read:"view", write:"owner"}`). Each athlete page shows the final rating with a "Set by StatBattle" or "Formula preview" tag, the formula's number beside it, and an editor (rating, optional note, Save, Use formula). `#ratings` is a bulk editor: league/search filters, "only players with your rating", inline number inputs with unsaved changes highlighted, Save all, Use formula per row, and Copy all as JSON / Paste JSON for backups (keys can be slugs or names). The directory has an "Edit ratings" button. If the page isn't running on claude.ai (no database), editing is disabled with a note.
  - **Dev mode only (2026-11-24):** the rating editors (the athlete-page box, the "Edit ratings" button and `#ratings`) only show in dev mode. Turning dev mode on (5 quick taps on the logo, or `#dev` in the link) now asks for a password: **111**. Turning it off (the pink "DEV MODE · turn off" pill) needs none. Dev mode is remembered in that browser. `#ratings` without dev mode shows "Dev mode needed". The password is checked in the page's own code, so it hides the editor rather than securing it; saving is still limited to the owner by the database rule. `DEV_PASS` in the second script changes it.
  - **To do before sharing StatBattle:** declare the `user` capability (from claude.ai or a session with network access) so the page can tell it's the owner and hide the editors from everyone else. Until then other viewers would see the editor, but any save they try is refused by the rule and the editor turns read-only.
- **Stats:** only NFL players from 1999 on have season stats (passing/rushing/receiving yards per season and team, from the Yardage Spinner's nflverse data, embedded as `NFL_YARDS`; 2026 is through week 10). Defenders (Ray Lewis, Ed Reed, Aaron Donald) and pre-1999 careers show "coming soon"; NBA/MLB/NHL wait for the data feed.
- **Next:** a stat-based rating (era-adjusted value stats such as AV, Win Shares, WAR, point shares) once the licensed feed arrives; more athletes beyond the 124; real game stats per athlete (times played, solve rate) once the games save results in one shared place.

## Modes by sport (live on the home page)

| Sport | Modes |
|---|---|
| Football | Mystery Player, Leaderboard Fill-In, Stat Club, Higher or Lower, Stat Line Reveal, Career Path, Stat Spinner, Draft Mode |
| Basketball, Baseball, Hockey, Soccer | Mystery Player, Leaderboard Fill-In, Stat Club, Higher or Lower, Stat Line Reveal, Career Path, Stat Spinner |
| Tennis, MMA | Mystery Player, Leaderboard Fill-In, Higher or Lower, Stat Line Reveal |

All modes run as single player for now; Multiplayer is shown as "Coming soon".

## Game modes

### Solo / puzzle
1. **Mystery Player (Wordle-style)** — Guess a hidden player; each guess gives feedback on team, division, position, jersey number, age, draft year (higher/lower arrows for numbers).
   - **Built 2026-11-19** ([game](https://claude.ai/artifact/SevJPYpv5i1DuFsF7UMSdk)) with the **clue-reveal** rules from the home page card, not the Wordle grid (the grid stays an idea). Big 4 leagues (NFL, NBA, MLB, NHL); unlimited rounds.
     - Eight clues in order: Years active → Position → Draft → College (NFL/NBA) or birth country (MLB/NHL) → Titles → MVP awards → Hall of Fame → one team he played for (his longest stint). Clue 1 is open; each wrong guess opens the next.
     - A guess must fit every open clue or it's turned back without cost. Fit rules: careers overlap; same position group (e.g. any DB, any guard); same draft year (or same route, e.g. undrafted); same college/country; same title, MVP and Hall of Fame counts; played for the team.
     - Points 8 → 1 by clues used; 8th wrong guess loses. Per-sport record (played, solved, streak, best) in the browser.
     - The game was built with its own Casual (active since 2016) / Expert (any era) pool, read from the link as `#<sport>-<pool>`. Since the site-wide toggle was removed (2026-11-20), the home page always opens it as `#<sport>-expert` (every era, no filter). Removing the pool from the game itself needs an edit in that game's chat.
     - The home page's Play button opens it for those four sports; soccer, tennis and MMA still go to placeholders.

   **Ideas (not built yet)**
   - **Mystery Player Race (multiplayer)** — added 2026-11-19. Everyone sees the same hidden player.
     - The game reveals a random bio fact at predetermined, timed intervals (the same schedule for every round).
     - Players can make as many guesses as they want, at any time. There's no cost for a wrong guess.
     - The first player to name him wins the round. That's the whole round.
     - Match: first to win 3 rounds wins.
     - _To decide:_ the interval length, which facts are in the random draw, and what happens if every fact is out and nobody has it.
     - Needs the Multiplayer feature (the page `room` capability could carry the live match).
2. **Leaderboard Fill-In (Sporcle-style)** — Name the top N in a stat category (e.g., top 25 single-season rushing TDs) against a timer. Buildable from Pro Football Reference exports. The Hall of Records' Leaders tab (2026-11-22) already holds ready-made top-10 lists for every sport.
3. **Higher or Lower** — Two players side by side ("Who had more career receiving yards?"); keep going until you miss.
4. **Career Path / "Who Am I?"** — Show a player's team sequence, draft slot, college, etc.; reveal clues one at a time, fewer clues = more points.
   - **Built 2026-11-19** ([game](https://claude.ai/artifact/6t8vdAsbminUxHv6WQ1URn)): Big 4 leagues, same player pool and controls as Mystery Player (including its built-in Casual / Expert pool; the home page now always opens it as Expert). Six clues: his stops in order (team + years; a 5th clue lists any stops past four), then draft, college/country, position, titles, MVPs. Reveal a clue any time; a wrong guess also opens one; points 6 → 1; a wrong guess with all six open ends the round. Prefers players with 2+ teams (one-team careers fill in when that pool is under 8). Soccer isn't in yet.
   - **Shared player pool (`players.js` in both games):** 124 hand-built players (NFL 33, NBA 32, MLB 30, NHL 29), checked 2026-11-19 including 2025-26 awards, the 2026 Hall of Fame classes and two 2026 moves (LeBron to the 76ers, Giannis to the Heat). Other active players' teams run through the 2025-26 season. Replace with the licensed Sports Reference feed when it arrives (same fields: player, positions, college/country, draft, team stints, titles, MVPs, HOF).
   - Not yet: the level system can't count these wins, because each game is a separate artifact with its own browser storage (the games call `window.StatBattle.recordWin` if it exists); the name dictionary isn't wired in (matching is prefix + typo only); soccer, tennis and MMA pools.
5. **Stat Line Reveal** — Show a single game/season stat line (e.g., "27/34, 412 yds, 5 TD, Week 9 2019"); name the player.
6. **Stat Spinner** — This is the **Yardage Spinner** game ([prototype](https://claude.ai/artifact/UgNTK8UWuiThZ35qMLbM5R), built 2026-11-10). Pick a stat (Rushing, Receiving or Passing) and a level, spin a wheel of all 32 NFL teams and name a player for the team it lands on; his best season with that team is added to your total. Reach the target in **3 spins** (cut from 5 on 2026-11-18; `SPINS_PER_GAME` in the page, and the home page card says "3 spins to hit the target"). One re-spin per game, or pass. Picks are logged in a side panel with each player's best season and yards. Any position counts: RBs and TEs score their receiving yards in Receiving.
   - Targets (Easy / Medium / Hard), set per stat in `STATS[...].targets`, listed on the home page card:
     - **Rushing** 4,000 / 4,500 / 5,000
     - **Receiving** 4,000 / 4,400 / 4,750 (changed 2026-11-18)
     - **Passing** 11,111 / 12,500 / 14,000 (added 2026-11-18). Meant as QB passing yards. Any player is accepted, as in the other stats; a non-QB scores only his trick-play passing yards (e.g. McCaffrey's best with Carolina is 50). A QB-only rule would need position data added to `player_seasons.json`. For scale: the median team's best passing season since 1999 is about 4,780; the best three-team draws reach ~16,000 (Brees 2011 + Manning 2013 + Mahomes 2022 = 16,262).
   - Status (2026-11-18): football has real player data. It's in `player_seasons.json`, served beside the page and loaded at startup: nflverse weekly stats summed per player, team and regular season, 1999–2026 (2026 through week 10), keyed by PFR player ID, with `rushYds`, `recYds` and (on rows that have it) `passYds`. Seasons before 1999 wait for the licensed Sports Reference feed. Known gaps in nflverse: one 1999 game (Rams–Ravens opener; Warner 1999 is 309 short), two 2000 games, half of Jacksonville's 2001 and 2002 seasons; a few 2011 seasons ~60 yards off (Brees 2011 shows 5,535 vs 5,476 official). The last 10 seasons check out. If the file fails to load, the page falls back to manual mode (names logged, yards typed in on the end screen). The home page's football Play button opens it.
   - Name matching (2026-11-18): uses the StatBattle name dictionary (`names.json` beside the page; see `name-dictionary.md`), so "Matt Stafford", "Zeke Elliott", "Chad Ochocinco" and "Amon-Ra Saint Brown" all count.
   - Wheel look (2026-11-18): 702 px wide on laptop/desktop (1.3× the old 540; narrower screens fit their column). Every slice is the team's primary color with the user's **pixel-art logo** near the rim and the three-letter code just inside it; all 32 logos are in (`logos/<abbr>.png`, listed in `TEAM_LOGOS`). The secondary-color bands were tried and removed. Team primary/secondary colors were checked against the user's list on 2026-11-18 (Jets, Ravens, Jaguars, Titans, Cowboys and Buccaneers corrected); secondaries still color the team takeover screen and the pick chips. The Cowboys' secondary per that list is navy #041E42 (their grey #869397 is listed as tertiary).
   - End of game: the result screen ("You hit it" / "Came up short") has a × button, and Esc closes it too. Closing leaves the finished game on screen (final total vs target, progress bar, picks panel), with **See result** and **Play again** buttons under the wheel.
   - **Best possible** (2026-11-18): the result screen shows the highest-scoring answer for each team the wheel landed on, their total, and how the player's total compares ("You got 4,419 (85%)"). Matching picks are outlined and tagged "Your pick". A player's season counts once, so a season split between two teams can't be banked twice. Re-spun teams don't count.
   - Game history (2026-11-18): a "Game history" panel under the picks lists every finished game, newest first: Hit/Short, stat and level, date, total vs target with the margin, and (expandable) each team, player, season and yards. Newest 200 games are kept; "Clear history" needs two taps. Stored with the page's `db` capability. Right now it's one owner-only record (`editors/yardage-spinner-history`, readable and writable only by the owner and editors), because the `user` capability (viewer ids) couldn't be declared from a network-off session. **To do before sharing the game:** declare `user` alongside `db` (from a session with network access, or on claude.ai). The code then switches to a private history per player (`data/users/<id>/yardage-spinner-history`) and folds the owner's existing games into the owner's own history. Until then, other players see only the current visit's games.
   - Difficulty with 3 spins: in the 1999–2026 data the median team's best-ever season is about 1,650 rushing and 1,580 receiving. Rushing Hard (5,000, ~1,667 a spin) is only reachable on a strong spin even with perfect answers.
   - Player pool: every season in the data (1999 on). There is no Casual / Expert setting (removed site-wide 2026-11-20).
   - Basketball, baseball, hockey and soccer versions still need their stat and targets chosen. The home page currently uses points, home runs, goals and league goals as placeholders.
   - Sibling game: **Franchise Leaders** (2026-11-13) uses the same wheel to ask for a team's all-time passing, rushing or receiving leader, with a 3-spin Gauntlet. Same data format plus `passYds`. It doesn't have the logos, color fixes or name dictionary yet.

   **Ideas (not built yet)**
   - **Stat Spinner Duel (multiplayer)** — Two players are matched up for one game. Rules settled 2026-11-18:
     - The game picks the category at random (passing, receiving or rushing yards) and a random target somewhere between that category's Easy and Hard targets.
     - 3 spins. Each wheel spin counts for both players: they answer for the same team. **No re-spins and no passing on purpose** in the duel.
     - Each player names a player in secret, with **30 seconds per pick**. If the time runs out, that pick is an automatic pass (0 yards). Neither sees the other's pick until both have locked in (or timed out); then both drafted players and both running totals are revealed.
     - Both players may name the same player, and each scores him in full. While picking, nothing hints that the other player chose the same one (no "taken" marker, no warning); it only shows at the reveal like any other pick.
     - Result after 3 spins:
       - Only one player reaches the target → that player wins.
       - Both fall short → the higher total wins. **Equal totals → both win.**
       - Both reach it → they play another game in one of the other two categories, chosen at random (e.g. both clear rushing → the next game is receiving or passing), **with a new random target** between that category's Easy and Hard. If both clear that one too, the last remaining category is played, again with a new random target.
       - **Both clear all three categories → both win.**
     - Needs the Multiplayer feature (the page `room` capability could carry the live match). All three categories now have targets.
   - **Special filters** — Optional rules laid over a game that change which seasons count, e.g. "Only 2015–2020 counts". The best season with the landed team is then taken from inside the filter only. Other filter ideas in the same spirit: a single decade, "rookie seasons only", "players who never made a Pro Bowl" (needs awards data). Could appear as daily challenges or as a setup option. Works naturally with Best possible (it would compute the best answers under the same filter).
7. **Stat Club** — added 2026-11-19. Questions like "X players averaged more than 25 PPG in 2017. Name them." The game says how many players made the club and shows a slot for each one with only his **team** filled in, not his name. You type names in any order; a correct one fills in next to his team. Give up any time to reveal the rest.
   - On the home page under **Know the Numbers**, for Basketball, Football, Baseball, Hockey and Soccer (`stat-club` in `MODES`; per-sport example in `SPORTS[...].club`). Not built yet, so Play goes to a placeholder.
   - Example clubs used on the home page (counts deliberately not stated): 25+ points per game in 2016–17 (NBA), 1,500+ receiving yards in 2021 (NFL), 40+ home runs in 2019 (MLB), 40+ goals in 2022–23 (NHL), 20+ Premier League goals in 2023–24.
   - How it differs from Leaderboard Fill-In: that one is a ranked top N; Stat Club is everyone over a threshold in one season, with team hints.
   - _To decide:_
     - Timer or untimed; a cap on wrong guesses or not; scoring (e.g. % named, bonus for no misses).
     - Traded players: show every team he played for that season, his last team, or "2 teams"?
     - Slot order: by stat value (gives away who's on top) or by team name.
     - Rate stats (PPG, batting average) need a qualifier, e.g. the league's minimum games or plate appearances.
     - Season naming for NBA/NHL: "2017" could mean 2016–17 or 2017–18. Show seasons as "2016–17" to avoid it (the data system keys them by end year).
     - Club size: keep clubs between roughly 5 and 25 members so a round stays fair; pick thresholds per season to land there.
     - Single-season only, or also career clubs (e.g. "players with 500 career home runs")?
     - Tennis and MMA versions (e.g. players with 5+ titles in a season).
   - Data: player-season stats with one row per team per season (see `sports-data-system.md` and the records tracker). Football since 1999 already exists in `player_seasons.json` for yards clubs.
8. **Draft Mode** — Build a lineup under a constraint (one player per decade, draft-pick "salary cap", etc.); best combined stat total wins. Football only for now. Since 2026-11-20 it has its own card on the home page (it used to sit under Versus). Single player against your own best score; not built yet, so Play goes to a placeholder.

### Multiplayer ideas
See **Mystery Player Race** under Mystery Player and **Stat Spinner Duel** under Stat Spinner. The parked Head-to-Head and Category Steal (below) were the original multiplayer modes.

### Parked concepts
Kept as ideas, not shown on the site. Their definitions are still in the home page code under `CONCEPTS`; moving one into `MODES` (and into `CATS`) brings it back.
- **Daily Puzzle** (parked 2026-11-17) — One shared puzzle per day with a shareable (emoji-style) result.
- **Daily Leaderboard** (parked 2026-11-17) — Everyone plays the same puzzle; ranked by time and accuracy.
- **Head-to-Head Stat Battles** (parked 2026-11-20, with the Versus type) — Two players race through the same question set or draft from the same pool in real time. On the page it was football only, played against the computer, best of 7.
- **Category Steal** (parked 2026-11-20, with the Versus type) — Players alternate naming answers in a category (e.g., "QBs with a 4,000-yard season"); a repeat or timeout loses. On the page it was football only, against the computer, 15 seconds per turn.

## Team pages (browse / reference feature)

One page per franchise (all 32), built around two sections. Natural home: a link from the Hall of Records.

### All-Time Team Roster
- A full starting lineup of each franchise's best-ever players, by position. Suggested slots: QB, 2 RB, 3 WR, TE, 5 OL, 4 DL, 3 LB, 4 DB, K, P (plus optional KR/PR).
- Each player is shown in their **prime**: the single best season with that franchise, or a short peak span (e.g., best consecutive 2–3 seasons) when one season undersells them.
- Player card shows: name, years with the team, prime season(s), the prime stat line for their position, and accolades in that span (Pro Bowl, All-Pro, MVP/OPOY/DPOY).
- Only seasons played *for that team* count (e.g., Peyton Manning appears on the Colts and Broncos rosters with different primes).
- OL and kickers have thin stat lines — show games started, All-Pro/Pro Bowl count, and (for K/P) FG%, long, punt average instead.

**Open questions**
- How is "prime" chosen — a formula (e.g., Approximate Value, yards + TD weighting) or hand-picked? A formula scales to 32 teams; hand-picking is more defensible.
- Relocated franchises: does the Titans page include the Houston Oilers years? (PFR groups them by franchise, so the default would be yes.)
- Let users vote or submit their own all-time roster to compare against the default?

### Franchise Statistical Feats
Single-season and career franchise leaders, each showing player, total, and year(s):
- **Passing:** yards, TDs, completions, passer rating (min. attempts)
- **Rushing:** yards, TDs, yards per carry (min. attempts)
- **Receiving:** yards, receptions, TDs
- **Defense:** sacks, interceptions, forced fumbles, defensive TDs
- **Special teams / scoring:** points, field goals, longest FG, return TDs
- **Single-game records** (stretch): most passing/rushing/receiving yards in a game

**Data caveats**
- Sacks only became an official stat in 1982, so pre-1982 pass rushers (e.g., Deacon Jones) won't show up in sack leaders. Either label the category "since 1982" or use unofficial historical totals with a note.
- Forced fumbles and tackles are spotty in older seasons; consider limiting those to the eras with reliable data.
- Source: PFR franchise pages and Stathead team queries (see `stathead-scraper-notes.md`).

### Hooks into game modes
- **Name the All-Time Roster** — Sporcle-style: fill in a franchise's all-time lineup from position slots.
- **Franchise Leader Higher or Lower** — "Who has more career rushing yards for the Bears?"
- **Mystery Player** clue: "Member of the Steelers' all-time team."

## Champions (every sport)

Each sport gets a "Champions" page listing every champion for every year, newest first, with a filter by decade and by team/player. **Done in the Hall of Records' Champions tab on 2026-11-22** for the competitions listed under Hall of Records above (with decade filter and search). Still to add from the table below: La Liga, Serie A, Ligue 1, Bundesliga, the pre-Premier League English First Division, and UFC title reigns by division.

**Suggested columns:** Year/season, champion, runner-up, result (series score, final score, or method of victory), and finals MVP where the sport has one. Clicking a champion links to that team's page (or the player's page for tennis and combat sports).

### Sources (canonical lists)
| Sport | Competition(s) | Source |
|---|---|---|
| Basketball | NBA Finals | [List of NBA champions](https://en.wikipedia.org/wiki/List_of_NBA_champions) |
| Football | Super Bowl | [List of Super Bowl champions](https://en.wikipedia.org/wiki/List_of_Super_Bowl_champions) |
| Baseball | World Series | [List of World Series champions](https://en.wikipedia.org/wiki/List_of_World_Series_champions) |
| Hockey | Stanley Cup | [List of Stanley Cup champions](https://en.wikipedia.org/wiki/List_of_Stanley_Cup_champions) |
| Soccer | European Cup / UEFA Champions League | [List of European Cup and UEFA Champions League finals](https://en.wikipedia.org/wiki/List_of_European_Cup_and_UEFA_Champions_League_finals) |
| Soccer | England (First Division / Premier League) | [List of English football champions](https://en.wikipedia.org/wiki/List_of_English_football_champions) |
| Soccer | Spain (La Liga) | [List of Spanish football champions](https://en.wikipedia.org/wiki/List_of_Spanish_football_champions) |
| Soccer | Italy (Serie A) | [List of Italian football champions](https://en.wikipedia.org/wiki/List_of_Italian_football_champions) |
| Soccer | France (Ligue 1) | [List of French football champions](https://en.wikipedia.org/wiki/List_of_French_football_champions) |
| Soccer | Germany (Bundesliga) | [List of German football champions](https://en.wikipedia.org/wiki/List_of_German_football_champions) |
| Tennis | Grand Slam men's singles | [List of Grand Slam men's singles champions](https://en.wikipedia.org/wiki/List_of_Grand_Slam_men%27s_singles_champions) |
| MMA | World heavyweight boxing champions | [List of world heavyweight boxing champions](https://en.wikipedia.org/wiki/List_of_world_heavyweight_boxing_champions) |
| MMA | UFC champions | [List of UFC champions](https://en.wikipedia.org/wiki/List_of_UFC_champions) |

Soccer gets one page with a tab per competition (Champions League, England, Spain, Italy, France, Germany). MMA gets two tabs (UFC, Heavyweight Boxing). The Hall currently also has a World Cup tab for soccer.

### Display notes per sport
- **Year labeling:** The NBA, NHL and European soccer leagues span two calendar years. Label them by season (e.g., "2023–24"). Label the Super Bowl by the season it concludes, with the game number and date shown too (e.g., "2023 season — Super Bowl LVIII, Feb 2024").
- **Years with no champion:** Show these as explicit rows ("Not held — reason") rather than skipping them. Examples are the 1994 World Series (players' strike), the 1919 and 2004–05 Stanley Cups (flu pandemic, lockout), and wartime gaps in the European leagues.
- **Stripped or reassigned titles:** Show both the original and the official result where a title was revoked, as with the Italian 2004–05 and 2005–06 titles in the Calciopoli scandal. Follow the source list for who is officially credited.
- **Era splits:** Several lists change names or formats partway through. Examples are the BAA years of the NBA, the European Cup becoming the Champions League in 1992, the First Division becoming the Premier League, the pre-Bundesliga German championship, and amateur vs. Open Era tennis. Tag each row with its era so it can be filtered.
- **Tennis:** Each year has four rows, one per Slam. Show it as a year × tournament grid (AO / RG / Wimbledon / USO). There are edge cases to handle: the Australian Open was held twice in 1977 and skipped in 1986, and Wimbledon was cancelled in 2020.
- **UFC and boxing:** These have title *reigns* by weight class, not one champion per year. Show a timeline of reigns for each division with the champion, dates won and lost, and title defenses. Interim titles get a label. For heavyweight boxing, there can be several champions at once across the sanctioning bodies (WBA, WBC, IBF, WBO), plus the lineal champion. Show these as parallel tracks. (The Hall shows the lineal line only for now.)

### Hooks into game modes
- **Leaderboard Fill-In:** "Name every NBA champion of the 1990s" or "Name every Champions League winner since 2000."
- **Mystery Player / Team clue:** "Won the Stanley Cup in the 2010s."
- **Higher or Lower:** "Which franchise has more World Series titles?"
- **Category Steal** (parked): Alternate naming Wimbledon champions until someone repeats or runs out of time.

### Open questions
- ~~Should Super Bowl coverage include the NFL championships from before the Super Bowl era?~~ Added 2026-11-22 as its own "NFL Championship (1920–69)" tab. AFL champions (1960–69) are not in yet.
- ~~Should tennis add women's singles?~~ Added 2026-11-22.
- Heavyweight boxing is filed under MMA here, as requested. Should the sport be renamed "Combat Sports," or should boxing become its own sport?

## Home page and progression ideas
- **Sport icons as level orbs** — The pixel-art ball icons on the home page's sport picker become orbs that show your level progress in that sport. The orb fills up as you earn progress playing that sport's modes, so a glance at the row of sports shows where you're furthest along.
  - _To decide:_ how the fill is drawn (rising liquid, a ring around the ball, or the ball's pixels lighting up), what earns progress (points, wins, modes completed), how levels are numbered and shown (a level number on or under the orb), and what an empty orb looks like for a sport you haven't played.

## Noted features (cross-mode)
- **Autocomplete player search** — Prevents misspelling frustration on all name-entry modes.
- **Casual / Expert mode — removed 2026-11-20.** It was a site-wide top-bar toggle (Casual = last 10 years, Expert = full history). The home page no longer shows it, and game links no longer carry a `pool` setting. Mystery Player and Career Path still have the option built in; the home page opens them as Expert (every era). Yardage Spinner never used it.
- **Streaks** — Track consecutive days played / correct answers to drive retention.
