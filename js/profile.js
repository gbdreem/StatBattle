/* ---------- Profile, levels and badges (ported from OverAll) ----------
   Levels come from wins: reaching Level n takes n(n+1)/2 total wins (Level 1 = 1 win, Level 2 = 3, Level 10 = 55, Level 33 = 561).
   A win is each mode's own win (beat the CPU, solve the puzzle, hit the target...). Games call
   window.StatBattle.recordWin(modeId, sportId) when the player wins; nothing else changes the count.
   Badges unlock by level and are purely cosmetic. One badge is equipped and shows next to the player's name.
   Dev mode (5 quick taps on the logo, or #dev in the link, then the password) unlocks the ratings editor and shows Level 100 with every badge open. It is display
   only: real wins are never changed, and a badge equipped in dev mode is saved separately (devBadge). */
{
const PKEY = 'sb-profile', DEV_KEY = 'sb-dev', DEFAULT_NAME = 'Player';
const MAX_LEVEL = 100, DEV_LEVEL = 100;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* 16x16 pixel badge shapes. o outline, h highlight, f fill, s shadow, w emblem */
const SHAPES = {
  medal:['.....oooooo.....','...oohhhhhhoo...','..ohhffffffsso..','.ohffffwwffffso.','.ohfffwwwwfffso.','ohffwwwwwwwwffso','ohfffwwwwwwfffso','ohffffwwwwffffso','ohfffwwffwwfffso','ohffwwffffwwffso','.ohffffffffffso.','.ohffffffffffso.','..osffffffffso..','...oossssssoo...','.....oooooo.....','................'],
  shield:['oooooooooooooooo','ohhhhhhhhhhhhhfo','ohffffffffffffso','ohfffffwwfffffso','ohffffwwwwffffso','ohfwwwwwwwwwwfso','ohffwwwwwwwwffso','ohfffwwwwwwfffso','ohffwwwffwwwffso','.ohfwwffffwwfso.','.ohffffffffffso.','..ohffffffffso..','...ohffffffso...','....ossffsso....','.....ossssso....','.......oo.......'],
  star:['.......oo.......','......ohho......','......ohfo......','.....ohffso.....','oooooohffsoooooo','ohhhhhffffffffso','.ohhffffffffsso.','..ohffffffffso..','...ohffffffso...','...ohffffffso...','..ohfffssfffso..','..ohffso.offso..','.ohfso....ohfso.','.oso........oso.','.oo..........oo.','................'],
  crown:['................','................','.o.....oo.....o.','oho...ohho...oso','ohfo.ohffso.ofso','ohffohffffsoffso','ohffffffffffffso','ohffwffwwffwffso','ohfffffffffffsso','ohhhhhhhhhhhhhso','ohffffffffffffso','osssssssssssssso','oooooooooooooooo','................','................','................'],
  trophy:['..oooooooooooo..','oooohhfffffsoooo','o..ohhffffffso.o','o..ohffwwfffso.o','o..ohfwwwwffso.o','.oooohffwwffsoo.','....ohffffffso..','.....ohffffso...','......ohffso....','.......ohso.....','.......ohso.....','.....oohffsoo...','....ohhffffsso..','....osssssssso..','....oooooooooo..','................']
};
const shade = (hex, t) => { // t>0 lighten toward white, t<0 darken toward black
  const n = parseInt(hex.slice(1),16), r=n>>16, g=(n>>8)&255, b=n&255, k = t>0 ? 255 : 0, a = Math.abs(t);
  const m = v => Math.round(v + (k - v) * a);
  return '#' + [m(r),m(g),m(b)].map(v=>v.toString(16).padStart(2,'0')).join('');
};
const draw = (shape, f, w) => {
  const pal = {o:'#18201c', h:shade(f,.38), f, s:shade(f,-.3), w: w || '#ffffff'};
  return '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">' +
    SHAPES[shape].flatMap((row,y)=>[...row].map((c,x)=>pal[c]?`<rect x="${x}" y="${y}" width="1" height="1" fill="${pal[c]}"/>`:'')).join('') + '</svg>';
};

/* Badges, one per level 0-33. Placeholder pixel art: swap in the owner's art later by giving a badge an img data URI. */
const BALLS = ['basketball','football','baseball','hockey','soccer','tennis','mma'];
const BALL_NAMES = {basketball:'Basketball',football:'Football',baseball:'Baseball',hockey:'Hockey Puck',soccer:'Soccer Ball',tennis:'Tennis Ball',mma:'Fight Glove'};
const BADGES = [
  {name:'Rookie', shape:'medal', f:'#8d9a94'},
  ...BALLS.map(id => ({name:BALL_NAMES[id], ball:id})),
  ...[['Turf','#0e5a3a'],['Chalk','#e4ebe6','#0e5a3a'],['Signal Orange','#ff5a1f'],['Red','#d33a2c'],['Gold','#e2b23a','#5a3e05'],['Navy','#22366f'],
      ['Sky','#3aa3e0'],['Purple','#6b3fb5'],['Teal','#138a8a'],['Pink','#e0569a'],['Black','#2e3230'],['Maroon','#7a1f2e']]
    .map(([n,f,w]) => ({name:n+' Shield', shape:'shield', f, w})),
  ...[['Bronze','#b8743a'],['Silver','#aab4bb','#3b4650'],['Gold','#e9b730','#5a3e05'],['Platinum','#d9e2e7','#4a5a66'],['Emerald','#1fa060'],['Sapphire','#2756c9']]
    .map(([n,f,w]) => ({name:n+' Star', shape:'star', f, w})),
  ...[['Ruby','#c7243a'],['Gold','#e9b730','#c7243a'],['Diamond','#bfe8f5','#2a7fa8'],['Obsidian','#2a2236','#b58cff']]
    .map(([n,f,w]) => ({name:n+' Crown', shape:'crown', f, w})),
  ...[['Silver Trophy','#aab4bb','#ffffff'],['Gold Trophy','#e9b730','#fff4c7'],['Diamond Trophy','#bfe8f5','#ffffff'],['Hall of Fame','#7a2fd0','#ffd84a']]
    .map(([n,f,w]) => ({name:n, shape:'trophy', f, w}))
].map((b,i) => ({...b, level:i}));
const badgeArt = b => b.ball ? ((window.SB_SVGS||{})[b.ball] || draw('medal','#8d9a94')) : draw(b.shape, b.f, b.w);

/* storage */
const loadP = () => { try{ const p = JSON.parse(localStorage.getItem(PKEY)||'{}'); return (p && typeof p==='object') ? p : {}; }catch(e){ return {}; } };
const saveP = p => { try{ localStorage.setItem(PKEY, JSON.stringify(p)); }catch(e){} };
let DEV = false; try{ DEV = localStorage.getItem(DEV_KEY) === '1'; }catch(e){}

/* levels */
const levelFromWins = w => Math.min(MAX_LEVEL, Math.floor((Math.sqrt(8*w+1)-1)/2));
const winsFor = L => L*(L+1)/2;
const realWins = () => loadP().wins || 0;
const shownWins = () => DEV ? winsFor(DEV_LEVEL) : realWins();
const levelInfo = w => {
  const L = levelFromWins(w);
  if(L >= MAX_LEVEL) return {L, pct:100, max:true};
  const into = w - winsFor(L), need = L + 1;
  return {L, pct:Math.floor(into/need*100), into, need, left:need-into, max:false};
};
const userName = () => (loadP().name || '').trim() || DEFAULT_NAME;
const badgeKey = () => DEV ? 'devBadge' : 'badge';
const equipped = () => {           // falls back to Rookie if the saved badge is not unlocked at the shown level
  const L = levelInfo(shownWins()).L, b = BADGES.find(x => x.name === loadP()[badgeKey()]);
  return b && L >= b.level ? b : BADGES[0];
};

/* top-bar chip */
const chip = document.createElement('button');
chip.className = 'prof'; chip.id = 'profChip'; chip.type = 'button';
document.querySelector('.top').appendChild(chip);
const renderChip = () => {
  const info = levelInfo(shownWins()), tip = info.max ? 'Max level' : `${info.pct}% to Level ${info.L+1}`;
  chip.setAttribute('aria-label', `${userName()}, Level ${info.L}, ${tip}. Open profile and badges`);
  chip.innerHTML = `<span class="pb-ic">${badgeArt(equipped())}</span>
    <span class="who"><small>Level ${info.L}</small><b>${esc(userName())}</b></span>
    <span class="lvl" style="--pct:${info.pct}" aria-hidden="true"><b>${info.L}</b></span>`;
};

/* profile + badges dialog */
const scrim = document.createElement('div');
scrim.className = 'scrim'; scrim.id = 'pscrim';
scrim.innerHTML = `<div class="panel" role="dialog" aria-modal="true" aria-labelledby="pp-t">
  <div class="ph ph-prof"><span class="pb-big" id="pp-b"></span><div><h2 id="pp-t"></h2><div class="k" id="pp-k"></div></div>
    <button class="x" id="pp-x" aria-label="Close">&times;</button></div>
  <div class="pb" id="pp-body"></div></div>`;
document.body.appendChild(scrim);
let lastFocus = null;
const renderPanel = () => {
  const info = levelInfo(shownWins()), eq = equipped(), wins = shownWins();
  $('pp-b').innerHTML = badgeArt(eq);
  $('pp-t').textContent = userName();
  $('pp-k').textContent = `Level ${info.L} · ${eq.name} badge${DEV ? ' · Dev mode' : ''}`;
  const card = b => {
    const open = info.L >= b.level, on = open && b.name === eq.name, left = Math.max(0, winsFor(b.level) - wins);
    return `<div class="bcard ${open?'open':'locked'}${on?' equipped':''}">
      <span class="bart">${badgeArt(b)}</span><b>${esc(b.name)}</b>
      <small>${b.level ? 'Level '+b.level : 'Starter'}</small>
      ${open ? `<button type="button" data-b="${esc(b.name)}" aria-pressed="${on}">${on?'Equipped ✓':'Equip'}</button>`
             : `<span class="lockline">${winsFor(b.level)} wins total<br>${left} to go</span>`}
    </div>`;
  };
  $('pp-body').innerHTML = `
    <form class="nameform" id="pp-form"><label class="vh" for="pp-name">Username</label>
      <input class="pname-in" id="pp-name" maxlength="16" value="${esc(userName())}" autocomplete="off">
      <button class="btn ghost" type="submit">Save name</button></form>
    <div><h4>Level ${info.L}${info.max ? ' · Max' : ''}</h4>
      <div class="prog" role="progressbar" aria-label="Progress to the next level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${info.pct}"><i style="width:${info.pct}%"></i></div>
      <div class="prow"><span>${info.max ? 'Max level reached' : `${info.into} of ${info.need} wins to Level ${info.L+1}`}</span><span>${DEV ? 'Dev mode: real wins '+realWins() : wins+' total wins'}</span></div></div>
    <p class="status">Win a game to level up: beat the computer, solve the puzzle or hit the target, depending on the mode. Each level unlocks a new badge to show next to your name.</p>
    <div><h4>Badges · ${BADGES.filter(b=>info.L>=b.level).length} of ${BADGES.length} unlocked</h4><div class="bgrid">${BADGES.map(card).join('')}</div></div>`;
  $('pp-form').onsubmit = e => { e.preventDefault(); const p = loadP(); p.name = $('pp-name').value.trim() || DEFAULT_NAME; saveP(p); renderPanel(); renderChip(); };
  $('pp-body').querySelectorAll('.bcard button[data-b]').forEach(btn => btn.onclick = () => {
    if(btn.getAttribute('aria-pressed') === 'true') return;
    const p = loadP(); p[badgeKey()] = btn.dataset.b; saveP(p); renderPanel(); renderChip();
    const again = [...$('pp-body').querySelectorAll('.bcard button[data-b]')].find(x => x.dataset.b === btn.dataset.b); if(again) again.focus();
  });
};
const openPanel = () => { lastFocus = document.activeElement; renderPanel(); scrim.classList.add('open'); $('pp-x').focus(); };
const closePanel = () => { scrim.classList.remove('open'); if(lastFocus) lastFocus.focus(); };
chip.addEventListener('click', openPanel);
$('pp-x').addEventListener('click', closePanel);
scrim.addEventListener('click', e => { if(e.target === scrim) closePanel(); });
document.addEventListener('keydown', e => {
  if(!scrim.classList.contains('open')) return;
  if(e.key === 'Escape') closePanel();
  if(e.key === 'Tab'){
    const f = [...scrim.querySelectorAll('button,input')];
    const i = f.indexOf(document.activeElement);
    if(e.shiftKey && i <= 0){ e.preventDefault(); f[f.length-1].focus(); }
    else if(!e.shiftKey && i === f.length-1){ e.preventDefault(); f[0].focus(); }
  }
});

/* level-up toast */
const toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role','status'); document.body.appendChild(toast);
let toastT = null;
const showToast = (b, text) => {
  toast.innerHTML = `<span class="bart">${badgeArt(b)}</span><span>${text}</span>`;
  toast.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('show'), 3200);
};

/* dev mode */
let pill = null;
const setDev = on => {
  DEV = on; try{ on ? localStorage.setItem(DEV_KEY,'1') : localStorage.removeItem(DEV_KEY); }catch(e){}
  if(on && !pill){ pill = document.createElement('button'); pill.type = 'button'; pill.className = 'dev-pill'; pill.textContent = 'DEV MODE · turn off';
    pill.title = 'Dev mode unlocks the ratings editor and shows Level 100 with every badge. Your real wins are unchanged.'; pill.onclick = () => setDev(false); document.body.appendChild(pill); }
  if(!on && pill){ pill.remove(); pill = null; }
  window.SB_DEV = on; window.dispatchEvent(new Event('sb-devchange'));
  renderChip(); if(scrim.classList.contains('open')) renderPanel();
};
/* Turning dev mode ON needs the password (a light gate in page code, not real security: rating saves are
   separately limited to the artifact's owner by the database rule). Turning it off needs nothing. */
const DEV_PASS = '111';
const askDevPass = () => {
  if(document.getElementById('devdlg')) return;
  const back = document.activeElement;
  const d = document.createElement('div'); d.id = 'devdlg'; d.className = 'devdlg';
  d.innerHTML = `<form class="devbox" role="dialog" aria-modal="true" aria-labelledby="devh" novalidate>
    <h2 id="devh">Turn on dev mode</h2>
    <p>Dev mode unlocks the ratings editor and shows Level 100 with every badge.</p>
    <label>Password<input id="devpw" type="password" inputmode="numeric" autocomplete="off" required></label>
    <p class="devmsg" id="devmsg" aria-live="assertive"></p>
    <div class="devbtns"><button type="submit" class="btn">Unlock</button><button type="button" class="btn ghost" id="devcancel">Cancel</button></div></form>`;
  document.body.appendChild(d);
  const close = () => { d.remove(); if(back && back.focus) back.focus(); };
  const f = d.querySelector('form'), pw = d.querySelector('#devpw');
  f.addEventListener('submit', e => { e.preventDefault();
    if(pw.value === DEV_PASS){ close(); setDev(true); }
    else { d.querySelector('#devmsg').textContent = 'Wrong password.'; pw.select(); } });
  d.querySelector('#devcancel').onclick = close;
  d.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  d.addEventListener('click', e => { if(e.target === d) close(); });
  pw.focus();
};
const toggleDev = () => DEV ? setDev(false) : askDevPass();
let taps = [];
document.querySelector('.logo').addEventListener('click', () => {
  const now = Date.now(); taps = taps.filter(t => now - t < 2000); taps.push(now);
  if(taps.length >= 5){ taps = []; toggleDev(); }
});
const devFromHash = () => { if(location.hash === '#dev'){ history.replaceState(null,'',location.pathname + location.search); toggleDev(); } };
window.addEventListener('hashchange', devFromHash);

/* Hook for games: call when the player wins. Dev-mode wins are not counted. */
window.StatBattle = {
  recordWin(modeId, sportId){
    if(DEV) return {counted:false};
    const p = loadP(), before = levelFromWins(p.wins||0);
    p.wins = (p.wins||0) + 1;
    p.byMode = p.byMode || {}; const k = modeId + (sportId ? ':' + sportId : ''); p.byMode[k] = (p.byMode[k]||0) + 1;
    saveP(p);
    const after = levelFromWins(p.wins), fresh = BADGES.filter(b => b.level > before && b.level <= after);
    renderChip(); if(scrim.classList.contains('open')) renderPanel();
    if(after > before) showToast(fresh[fresh.length-1] || equipped(), `<b>Level ${after}!</b>${fresh.length ? ` New badge: ${esc(fresh.map(b=>b.name).join(', '))}` : ''}`);
    return {counted:true, wins:p.wins, level:after, levelUp:after>before, newBadges:fresh.map(b=>b.name)};
  },
  level: () => levelInfo(shownWins()).L,
  badges: BADGES.map(b => ({name:b.name, level:b.level}))
};

devFromHash();
if(DEV) setDev(true); else renderChip();
}
