// Game modes: every mode card (MODES), parked ideas (CONCEPTS), and the home page game types (CATS).
// To add a mode: add it to MODES, then put its id in one of the CATS lists. A built game goes in games/<mode>/ and is linked from its `live` field.
const MODES = [
  {id:'mystery-player',ic:'mystery',name:'Mystery Player',sports:ALL,time:'3 to 5 min',fmt:'Clues revealed one at a time',
   live:{basketball:'games/mystery-player/index.html',football:'games/mystery-player/index.html',baseball:'games/mystery-player/index.html',hockey:'games/mystery-player/index.html'},liveHash:1,liveNote:'Opens Mystery Player (NFL, NBA, MLB and NHL so far)',
   g:'Clues about a hidden player are revealed one at a time, starting with Years Active. Every guess has to fit the clues shown.',
   d:s=>`Clues about a hidden ${s.lg} player are revealed one at a time. Years Active always comes first, then clues like ${s.who}.`,
   r:['Years Active is revealed first','You can only guess a player who fits every clue shown','Each wrong guess reveals another clue']},
  {id:'leaderboard-fill-in',ic:'board',name:'Leaderboard Fill-In',sports:ALL,time:'5 to 10 min',fmt:'Top 10 to 25 list',
   g:'Name every player on a stat leaderboard before the clock runs out.',
   d:s=>`Name the players on a stat leaderboard, like ${s.board}, before the clock runs out.`,
   r:['Pick a category and start the timer','Every correct name drops into its rank','Give up any time to reveal the rest']},
  {id:'higher-or-lower',ic:'hilo',name:'Higher or Lower',sports:ALL,time:'1 to 5 min',fmt:'Play until you miss',
   g:'Two players side by side. Call which one has the bigger number and keep your streak alive.',
   d:s=>`Two players side by side. Who had more ${s.hilo}? Keep calling it right to grow your streak.`,
   r:['Compare the stat shown for both players','Pick higher or lower for the new player','One miss ends the run']},
  {id:'stat-line-reveal',ic:'line',name:'Stat Line Reveal',sports:ALL,time:'2 to 4 min',fmt:'5 lines a round',
   g:'See a single game or season stat line and name the player who put it up.',
   d:s=>`See one stat line, like ${s.line}, and name the player who put it up.`,
   r:['Read the stat line and its date','Guess the player; context clues unlock after misses','Three guesses per line']},
  {id:'career-path',ic:'path',name:'Career Path',sports:FIVE,time:'2 to 4 min',fmt:'Up to 6 clues',
   live:{basketball:'games/career-path/index.html',football:'games/career-path/index.html',baseball:'games/career-path/index.html',hockey:'games/career-path/index.html'},liveHash:1,liveNote:'Opens Career Path (NFL, NBA, MLB and NHL so far)',
   g:'A player’s career is revealed one stop at a time. Name him with as few clues as you can.',
   d:s=>`A player’s ${s.career} are revealed one clue at a time. Name him as early as you can.`,
   r:['Start with the first stop on his résumé','Reveal another clue whenever you’re stuck','Points drop with each clue you use']},
  {id:'stat-spinner',ic:'spin',name:'Stat Spinner',sports:FIVE,time:'3 to 5 min',fmt:'3 spins to hit the target',
   live:{football:'games/yardage-spinner/index.html'},
   g:'Spin a wheel of teams and name a player for each. His best season with that team adds to your total. Hit the target before your spins run out.',
   d:s=>s.id==='football'
     ? 'Spin a wheel of all 32 NFL teams and name a player for the team it lands on. His best passing, rushing or receiving season with that team adds to your total. Reach the yardage target before your spins run out.'
     : `Spin a wheel of ${s.lg} teams and name a player for the team it lands on. His best season of ${s.spin} with that team adds to your total. Reach the target before your spins run out.`,
   r:s=>s.id==='football'
     ? ['Pick Passing (11,111, 12,500 or 14,000 yards), Rushing (4,000, 4,500 or 5,000) or Receiving (4,000, 4,400 or 4,750)','Spin and name a player for the team the wheel lands on','His best season with that team is added to your total; you get one re-spin per game']
     : [`Pick a target total of ${s.spin}`,'Spin and name a player for the team the wheel lands on','His best season with that team is added to your total; you get one re-spin per game']},
  {id:'stat-club',ic:'club',name:'Stat Club',sports:FIVE,time:'3 to 6 min',fmt:'One club per round',
   g:'Find out how many players made a stat club, like averaging 25+ points in a season, and see each one\u2019s team. Name them all.',
   d:s=>`Name every member of a stat club, like ${s.club}. You see how many players made it and the team each one played for, but not their names.`,
   r:['See the club, how many players made it, and each member\u2019s team','Type a name; a correct one fills in next to his team','Give up any time to reveal the rest']},
  {id:'draft-mode',ic:'draft',name:'Draft Mode',sports:['football'],time:'5 to 8 min',fmt:'5 roster slots',
   g:'Build a lineup under a constraint. The best combined stat total wins.',
   d:()=>'Build a lineup under a constraint, such as one player per decade or a draft-pick salary cap. Best combined stat total wins.',
   r:['See the constraint and the stat being scored','Pick a player for each slot','Your total goes on your best-score list']}
];

// Parked concepts: not shown on the page; move one into MODES (and into CATS) to bring it back
const CONCEPTS = [
  // Head-to-Head and Category Steal: removed from the page 2026-11-20 along with the Versus game type
  {id:'head-to-head',ic:'vs',name:'Head-to-Head Stat Battles',sports:['football'],time:'About 5 min',fmt:'Best of 7',
   g:'Race the computer through the same question set. Faster correct answers win each round.',
   d:()=>'Race the computer through the same question set. Faster correct answers win each round.',
   r:['You and the CPU get the same question','Answer faster and correct to take the round','Best of seven rounds wins']},
  {id:'category-steal',ic:'steal',name:'Category Steal',sports:['football'],time:'3 to 6 min',fmt:'Sudden death',
   g:'Trade answers with the computer in a category. Repeat a name or run out of time and you lose.',
   d:()=>'Trade answers in a category like quarterbacks with a 4,000-yard season. Repeat a name or run out of time and you lose.',
   r:['A category is drawn and you go first','Alternate turns naming a valid player','No repeats; 15 seconds per turn']},
  {id:'daily-puzzle',ic:'cal',name:'Daily Puzzle',sports:ALL,time:'About 5 min',fmt:'1 puzzle a day',
   g:'One shared puzzle a day with a shareable emoji-grid result.',d:()=>'One shared puzzle a day. Solve it, then share an emoji-grid result that shows how you did without spoiling the answer.',
   r:['A new puzzle unlocks at midnight your time','Everyone gets the same puzzle','Share your result card when you finish']},
  {id:'daily-leaderboard',ic:'trophy',name:'Daily Leaderboard',sports:ALL,time:'About 5 min',fmt:'1 ranked run a day',
   g:'Everyone plays the same challenge each day, ranked by time and accuracy.',d:()=>'Everyone plays the same challenge each day and gets ranked by time and accuracy.',
   r:['One attempt per day','Accuracy counts first, then time','Check where you finished after the reset']}
];


// ---------- Game types (umbrella categories). Each mode belongs to exactly one. ----------
const CATS = [
  {id:'guess', ic:'mystery', name:'Guess the Player',
   g:'Clues, career stops and stat lines. Work out who it is before you run out of guesses.',
   modes:['mystery-player','career-path','stat-line-reveal']},
  {id:'numbers', ic:'board', name:'Know the Numbers',
   g:'Leaderboards, stat clubs, stat comparisons and a spin to hit a target. How well do you know the totals?',
   modes:['leaderboard-fill-in','stat-club','higher-or-lower','stat-spinner']},
  // A single mode can sit on the home page by itself: its card opens the mode panel directly
  {id:'draft', single:'draft-mode'}
];
const modeById = id => MODES.find(m => m.id === id);
const catSports = c => c.single ? modeById(c.single).sports : ALL.filter(id => c.modes.some(mid => modeById(mid).sports.includes(id)));
const reachIds = ids => ids.length === SPORTS.length ? 'All 7 sports' : ids.length === 1 ? byId(ids[0]).name + ' only' : ids.length + ' sports';
const ballsHTML = ids => ids.map(id => `<span title="${byId(id).name}">${SVGS[id]||''}</span>`).join('');

const modeCard = m => `<button class="mode" data-id="${m.id}" aria-label="${esc(m.name)}. ${esc(reach(m))}: ${m.sports.map(id=>byId(id).name).join(', ')}">
  <span class="ic">${glyph(m.ic,'var(--turf)')}</span>
  <h3>${esc(m.name)}</h3><p>${esc(m.g)}</p>
  <span class="sp"><span class="balls">${ballsHTML(m.sports)}</span><span>${esc(reach(m))}</span></span>
</button>`;

$('cats').innerHTML = CATS.map(c => {
  const ids = catSports(c);
  if (c.single) {
    const m = modeById(c.single), rules = typeof m.r === 'function' ? m.r(byId(ids[0])) : m.r;
    return `<button class="cat" data-mode="${m.id}" aria-label="${esc(m.name)}. ${esc(reachIds(ids))}">
  <span class="ic">${glyph(m.ic,'var(--turf)')}</span>
  <h2>${esc(m.name)}</h2><p>${esc(m.g)}</p>
  <span class="cm">${rules.map((x,i) => `<span><i class="n">${i+1}</i>${esc(x)}</span>`).join('')}</span>
  <span class="sp"><span class="balls">${ballsHTML(ids)}</span><span>${esc(m.time)} · ${esc(reachIds(ids))}</span></span>
</button>`;
  }
  return `<button class="cat" data-cat="${c.id}" aria-label="${esc(c.name)}: ${c.modes.map(id=>modeById(id).name).join(', ')}. ${reachIds(ids)}">
  <span class="ic">${glyph(c.ic,'var(--turf)')}</span>
  <h2>${esc(c.name)}</h2><p>${esc(c.g)}</p>
  <span class="cm">${c.modes.map(id => { const m = modeById(id); return `<span><i>${glyph(m.ic,'var(--turf)')}</i>${esc(m.name)}</span>`; }).join('')}</span>
  <span class="sp"><span class="balls">${ballsHTML(ids)}</span><span>${c.modes.length} modes · ${esc(reachIds(ids))}</span></span>
</button>`;
}).join('');
$('hallIc').innerHTML = glyph('trophy','var(--turf)');
$('hallBalls').innerHTML = ballsHTML(ALL);

// ---------- Hall of Records data (checked 2026-11-19) ----------
// recs: {k: record, v: value, who: holder, d: detail, fresh: set in the last year}
// champs: one or more tabs, each a table. hi = index of the champion column.
