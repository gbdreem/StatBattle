// ---------- Athlete pages: #players (directory) · #p-<slug> (one athlete). Data: players.js (shared with Mystery Player / Career Path) ----------
// NFL passing/rushing/receiving yards per season, 1999 on, from the Yardage Spinner data (nflverse; 2026 = through week 10).
const LG = {
  nfl:{name:'NFL', sport:'football', title:'Super Bowl', titles:'Super Bowls', mvp:'AP MVP', origin:'College'},
  nba:{name:'NBA', sport:'basketball', title:'NBA title', titles:'NBA titles', mvp:'NBA MVP', origin:'College'},
  mlb:{name:'MLB', sport:'baseball', title:'World Series', titles:'World Series titles', mvp:'MVP', origin:'Born in'},
  nhl:{name:'NHL', sport:'hockey', title:'Stanley Cup', titles:'Stanley Cups', mvp:'Hart Trophy', origin:'Born in'}
};
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const CUR_SEASON = 2026;

// Preview rating (temporary): career honors only, until stat-based ratings arrive with the data feed.
// Peak = MVPs (10 pts each, max 4) · Winning = titles (5 pts each, max 6) · Longevity = seasons (1 pt each, max 20) · Legacy = Hall of Fame (10)
// Raw score out of 100 is scaled against the best in the same league: OVR = 60 + 39 × (raw / league best) ^ 0.8
const RATING_PARTS = [
  {k:'peak', name:'Peak', max:40, how:'MVP awards, 10 points each (up to 4)'},
  {k:'win', name:'Winning', max:30, how:'Championships, 5 points each (up to 6)'},
  {k:'long', name:'Longevity', max:20, how:'Seasons played, 1 point each (up to 20)'},
  {k:'legacy', name:'Legacy', max:10, how:'Hall of Fame inductee: 10 points'}
];
const ATHLETES = (window.SB_PLAYERS || []).map(r => {
  const [lg, name, pos, origin, first, last, draft, stints, titles, mvps, hof, alts] = r;
  const end = last || CUR_SEASON, seasons = end - first + 1;
  const parts = {peak: Math.min(mvps,4)*10, win: Math.min(titles,6)*5, long: Math.min(seasons,20), legacy: hof === 1 ? 10 : 0};
  const st = stints.split('|').map(s => { const m = s.match(/^(.*) (\d{4})-(\d{4})?$/); return {team:m[1], from:+m[2], to:m[3] ? +m[3] : 0}; });
  return {lg, name, pos, origin, first, last, draft, stints:st, titles, mvps, hof, alts: alts || [], parts,
    raw: parts.peak + parts.win + parts.long + parts.legacy, slug: slugify(name), seasons,
    team: last ? st[st.length-1].team : st[st.length-1].team};
});
const bestRaw = {};
ATHLETES.forEach(a => bestRaw[a.lg] = Math.max(bestRaw[a.lg] || 1, a.raw));
ATHLETES.forEach(a => a.ovr = a.formula = Math.round(60 + 39 * Math.pow(a.raw / bestRaw[a.lg], 0.8)));
const athBySlug = Object.fromEntries(ATHLETES.map(a => [a.slug, a]));
const athByName = {};
ATHLETES.forEach(a => [a.name, ...a.alts].forEach(n => athByName[n.toLowerCase()] = a));
const athLink = n => { const a = athByName[String(n).toLowerCase()]; return a ? `<a class="alink" href="#p-${a.slug}">${esc(n)}</a>` : esc(n); };
const tier = o => o >= 90 ? 'gold' : o >= 80 ? 'silver' : 'bronze';

const SILHOUETTE = `<svg viewBox="0 0 120 120" aria-hidden="true" class="sil"><circle cx="60" cy="44" r="22"/><path d="M18 120c0-26 19-44 42-44s42 18 42 44z"/></svg>`;
const draftText = (d, lg) => Array.isArray(d) ? `${d[0]} · Round ${d[1]}, pick ${d[2]}` :
  ({pre:'Before the draft era', und:'Undrafted', ifa:'International free agent', npb:'Signed from Japan (NPB)', nd:'Not drafted'})[d] || '—';
const hofText = a => a.hof === 1 ? 'Inducted' : a.hof === 0 ? 'Eligible, not inducted' : a.last ? 'Not yet eligible' : 'Active player';
const yrs = a => `${a.first}–${a.last || 'present'}`;

// Mentions of this athlete across the Hall of Records (leaders, champions' MVP columns, all-league teams)
const hallMentions = a => {
  const names = [a.name, ...a.alts].map(n => n.toLowerCase()), out = [];
  Object.entries(HALL).forEach(([sp, h]) => {
    (h.leaders || []).forEach(l => {
      let rank = 0, prev = null;
      l.rows.forEach((r, i) => {
        if (r[1] !== prev) rank = i + 1; prev = r[1];
        const nm = r[0].replace(/\*$/, '').toLowerCase();
        if (l.cols[0] !== 'Mark' && names.includes(nm)) out.push({k:'Leaders', t:`No. ${rank}, ${l.name.toLowerCase()}`, v:`${r[1]}${r[2] ? ' · ' + r[2] : ''}`, sp});
      });
    });
    (h.champs || []).forEach(c => {
      const mi = c.cols.findIndex(x => /MVP|Conn Smythe/.test(x));
      if (mi < 0) return;
      c.rows.forEach(r => { const v = (r[mi] || '').toLowerCase(); if (names.some(n => v.includes(n))) out.push({k:'Champions', t:c.cols[mi], v:`${r[0]} · ${r[1]}`, sp}); });
    });
    if (h.allLeague) h.allLeague.rows.forEach(r => { if (r.some(v => names.includes(String(v).toLowerCase()))) out.push({k:h.allLeague.label, t:h.allLeague.title, v:r[0], sp}); });
  });
  return out;
};

let pLg = '', pQ = '';
const athCard = a => `<a class="acard" href="#p-${a.slug}">
  <span class="aov ${tier(a.ovr)}"><b>${a.ovr}</b><small>OVR</small></span>
  <span class="aimg">${SILHOUETTE}</span>
  <span class="anm">${esc(a.name)}</span>
  <span class="ameta">${esc(a.pos)} · ${LG[a.lg].name} · ${esc(a.team)}</span></a>`;
const athMatch = a => (!pLg || a.lg === pLg) && (!pQ || [a.name, ...a.alts, ...a.stints.map(s => s.team)].join(' ').toLowerCase().includes(pQ.toLowerCase()));
const renderPlayersGrid = () => {
  const list = ATHLETES.filter(athMatch).sort((x, y) => y.ovr - x.ovr || x.name.localeCompare(y.name));
  $('agrid').innerHTML = list.length ? list.map(athCard).join('') : `<p class="aempty">No players match. Try another name or team.</p>`;
  $('acnt').textContent = `${list.length} ${list.length === 1 ? 'player' : 'players'}`;
};
const renderPlayers = () => {
  $('alg').innerHTML = [['','All'], ...Object.entries(LG).map(([k, v]) => [k, v.name])].map(([k, n]) => `<button data-lg="${k}" aria-pressed="${k === pLg}">${n}</button>`).join('');
  $('aq').value = pQ;
  renderPlayersGrid();
};

const statTable = a => {
  const rows = a.lg === 'nfl' ? NFL_YARDS[a.name] : null;
  if (!rows) {
    const why = a.lg === 'nfl' ? (a.last && a.last < 1999 ? 'His career ended before 1999, where the current football data starts.' : 'Defensive stats are not in the data yet; it has passing, rushing and receiving yards only.')
      : `${LG[a.lg].name} season stats arrive with the licensed data feed.`;
    return `<div class="anostat"><b>Season stats coming soon</b><span>${why}</span></div>`;
  }
  const cols = [['Pass yds',2],['Rush yds',3],['Rec yds',4]].filter(([, i]) => rows.some(r => Math.abs(r[i]) >= 50));
  const tot = cols.map(([, i]) => rows.reduce((s, r) => s + r[i], 0));
  const best = cols.map(([, i]) => Math.max(...rows.map(r => r[i])));
  const n = v => v.toLocaleString('en-US');
  return `<div class="tw"><table class="ct ast"><caption class="vh">${esc(a.name)}: regular-season yards by season</caption>
    <thead><tr><th scope="col">Season</th><th scope="col">Team</th>${cols.map(([c]) => `<th scope="col" class="num">${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.slice().reverse().map(r => `<tr><td>${r[0]}${r[0] === CUR_SEASON ? ' <span class="act">Thru wk 10</span>' : ''}</td><td>${esc(r[1])}</td>${cols.map(([, i], j) => `<td class="num${r[i] === best[j] && r[i] > 0 ? ' hi' : ''}">${n(r[i])}</td>`).join('')}</tr>`).join('')}</tbody>
    <tfoot><tr><th scope="row" colspan="2">Total${a.first < 1999 ? ' (since 1999)' : ''}</th>${tot.map(t => `<td class="num">${n(t)}</td>`).join('')}</tr></tfoot></table></div>
    <p class="hnote">Regular season. Best season in bold. ${a.first < 1999 ? `Seasons before 1999 (${a.first}–1998) are not in the data yet. ` : ''}A season split between teams shows one row per team. Totals come from the game’s play-by-play data and can differ from official totals by a few yards.</p>`;
};

const renderAthlete = a => {
  const L = LG[a.lg], ment = hallMentions(a);
  const modes = ['Mystery Player', 'Career Path', ...(a.lg === 'nfl' && NFL_YARDS[a.name] ? ['Stat Spinner'] : [])];
  $('pbody').innerHTML = `
  <div class="ahero" style="background-image:url(${BG[L.sport]})">
    <div class="afut ${tier(a.ovr)}">
      <div class="afut-top"><b>${a.ovr}</b><span>${esc(a.pos)}</span><i>${SVGS[L.sport] || ''}</i></div>
      <div class="afut-img">${SILHOUETTE}</div>
      <div class="afut-nm">${esc(a.name)}</div>
    </div>
    <div class="ahead">
      <span class="akick">${L.name} · ${esc(a.pos)} · ${a.last ? 'Retired' : 'Active'}</span>
      <h1 tabindex="-1" id="ptitle">${esc(a.name)}</h1>
      <p>${esc(a.team)}${a.last ? ' (last team)' : ''} · ${yrs(a)} · ${a.seasons} ${a.seasons === 1 ? 'season' : 'seasons'}</p>
      <div class="ahon">
        <span><b>${a.titles}</b>${a.titles === 1 ? L.title : L.titles}</span>
        <span><b>${a.mvps}</b>${L.mvp}${a.mvps === 1 ? '' : 's'}</span>
        <span><b>${a.hof === 1 ? 'Yes' : '—'}</b>Hall of Fame</span>
      </div>
    </div>
  </div>
  <div class="agrid2">
    <section class="apanel">
      <h2>Rating</h2>
      <div class="arate"><span class="aov big ${tier(a.ovr)}"><b>${a.ovr}</b><small>OVR</small></span>
        <p>${a.set ? `<span class="rset">Set by StatBattle</span> The formula below would give ${a.formula}.` : `<span class="rform">Formula preview</span> A temporary rating from career honors only, scaled against the best ${L.name} player in the pool.`}</p></div>
      <h3 class="rh">How the formula scores this player</h3>
      ${RATING_PARTS.map(p => `<div class="abar"><div class="abar-l"><b>${p.name}</b><span>${a.parts[p.k]} / ${p.max}</span></div>
        <div class="abar-t" role="img" aria-label="${p.name}: ${a.parts[p.k]} of ${p.max}"><i style="width:${(a.parts[p.k] / p.max) * 100}%"></i></div><small>${p.how}</small></div>`).join('')}
      ${ratingEditor(a)}
    </section>
    <section class="apanel">
      <h2>Bio</h2>
      <dl class="abio">
        <dt>League</dt><dd>${L.name}</dd>
        <dt>Position</dt><dd>${esc(a.pos)}</dd>
        <dt>${L.origin}</dt><dd>${esc(a.origin || '—')}</dd>
        <dt>Draft</dt><dd>${esc(draftText(a.draft, a.lg))}</dd>
        <dt>Career</dt><dd>${yrs(a)}</dd>
        <dt>Hall of Fame</dt><dd>${hofText(a)}</dd>
      </dl>
      <h2 class="mt">Career path</h2>
      <ol class="apath">${a.stints.map(s => `<li><b>${esc(s.team)}</b><span>${s.from}–${s.to || 'present'}</span></li>`).join('')}</ol>
    </section>
  </div>
  <section class="apanel">
    <h2>Season stats</h2>
    ${statTable(a)}
  </section>
  <div class="agrid2">
    <section class="apanel">
      <h2>In the Hall of Records</h2>
      ${ment.length ? `<ul class="ament">${ment.map(m => `<li><a href="#hall" data-hsport="${m.sp}"><small>${esc(m.k)}</small><b>${esc(m.t)}</b><span>${esc(m.v)}</span></a></li>`).join('')}</ul>`
        : `<p class="aempty">Not on any Hall of Records list yet.</p>`}
    </section>
    <section class="apanel">
      <h2>In StatBattle</h2>
      <p class="asm">Appears in</p>
      <div class="amodes">${modes.map(m => `<span>${m}</span>`).join('')}</div>
      <div class="asoon">
        <div><b>—</b><span>Times played</span></div>
        <div><b>—</b><span>Solve rate</span></div>
        <div><b>—</b><span>Avg. clues to solve</span></div>
      </div>
      <p class="hnote">Game stats fill in once all games save results in one place.</p>
    </section>
  </div>`;
};

