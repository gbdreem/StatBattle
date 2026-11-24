// ---------- Rating overrides: the owner's number always wins over the formula ----------
// Stored in the page's db at ratings/<athlete slug> = {ovr, note, at}. Rule: everyone reads, only the artifact's owner writes.
// Two layers, both above the formula: players/ratings.json (owner-approved ratings kept in the repo) and, on claude.ai,
// the page's database (the owner's live edits). Live edits win over the file; the file wins over the formula.
const RATINGS = {};               // slug -> {ovr, note, at}   (live, database)
const FILE_RATINGS = {};          // slug -> ovr               (players/ratings.json)
let ratingsDb = null, canRate = null, ratingsState = 'loading';   // canRate: true / false / null (not known yet)
const ratingOf = a => (RATINGS[a.slug] && Number.isInteger(RATINGS[a.slug].ovr)) ? RATINGS[a.slug].ovr : Number.isInteger(FILE_RATINGS[a.slug]) ? FILE_RATINGS[a.slug] : a.formula;
const applyRatings = () => ATHLETES.forEach(a => { a.ovr = ratingOf(a); a.set = !!(RATINGS[a.slug] && Number.isInteger(RATINGS[a.slug].ovr)) || Number.isInteger(FILE_RATINGS[a.slug]); });
const validOvr = v => { const n = Number(v); return Number.isInteger(n) && n >= 1 && n <= 99 ? n : null; };
const fmtWhen = t => { try { return new Date(t).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}); } catch (e) { return ''; } };
const rerenderRatings = () => {
  const h = location.hash.replace(/^#/, '');
  if (h === 'players') renderPlayersGrid();
  else if (h.startsWith('p-') && athBySlug[h.slice(2)] && !document.activeElement?.closest('#reditor')) renderAthlete(athBySlug[h.slice(2)]);
  else if (h === 'ratings') renderRatingsTable();
};
const saveRating = async (slug, ovr, note) => {
  if (!ratingsDb) throw new Error('Ratings can’t be saved in this view.');
  const ref = ratingsDb.collection('ratings').doc(slug);
  try {
    if (ovr == null) await ref.delete(); else await ref.set({ovr, note: note || '', at: new Date().toISOString()});
    canRate = true;
  } catch (e) {
    if (e && e.code === 'invalid_argument') { canRate = false; throw new Error('Only the owner of StatBattle can change ratings.'); }
    if (e && e.code === 'unavailable') { await new Promise(r => setTimeout(r, 400 + Math.random() * 600)); return saveRating(slug, ovr, note); }
    throw new Error('Couldn’t save right now. Try again in a moment.');
  }
};
(async () => {
  try {
    const db = await window.claude?.use?.('db');
    if (!db) { ratingsState = 'off'; rerenderRatings(); return; }
    ratingsDb = db;
    try { const u = await window.claude.use('user'); const own = u ? await u.isOwner() : null; if (own === true) canRate = true; else if (own === false) canRate = false; } catch (e) {}
    const timer = setTimeout(() => { if (ratingsState === 'loading') { ratingsState = 'slow'; rerenderRatings(); } }, 10000);
    db.collection('ratings').onSnapshot(snap => {
      Object.keys(RATINGS).forEach(k => delete RATINGS[k]);
      snap.docs.forEach(d => { const v = d.data() || {}; const o = validOvr(v.ovr); if (o != null && athBySlug[d.id]) RATINGS[d.id] = {ovr:o, note: typeof v.note === 'string' ? v.note.slice(0, 200) : '', at: v.at || ''}; });
      if (!snap.metadata.fromCache) { clearTimeout(timer); ratingsState = 'ready'; }
      applyRatings(); rerenderRatings();
    }, () => { clearTimeout(timer); ratingsState = 'off'; rerenderRatings(); });
  } catch (e) { ratingsState = 'off'; rerenderRatings(); }
})();
applyRatings();
fetch('players/ratings.json').then(r => r.ok ? r.json() : {}).then(obj => {
  Object.entries(obj || {}).forEach(([k, v]) => { if (k.startsWith('_')) return; const s = athBySlug[k] ? k : (athByName[String(k).toLowerCase()] || {}).slug; const o = validOvr(v); if (s && o != null) FILE_RATINGS[s] = o; });
  applyRatings(); rerenderRatings();
}).catch(() => {});

// Per-athlete editor (on the athlete page, for the owner)
let rFlash = {slug:'', text:''};
const devOn = () => !!window.SB_DEV;
const ratingEditor = a => {
  if (!devOn() || canRate === false) return '';
  const r = RATINGS[a.slug];
  const off = !ratingsDb;
  return `<div class="redit" id="reditor">
    <h3>Your rating</h3>
    <p class="asm">Formula says <b>${a.formula}</b>. ${r ? `You set <b>${r.ovr}</b>${r.at ? ' on ' + esc(fmtWhen(r.at)) : ''}.` : 'No rating set: the formula is used.'}</p>
    <div class="redit-row">
      <label>Rating (1–99)<input id="rOvr" type="number" inputmode="numeric" min="1" max="99" step="1" value="${a.ovr}"${off ? ' disabled' : ''}></label>
      <label class="grow">Note (optional, shown only in this editor)<input id="rNote" type="text" maxlength="200" value="${esc(r ? r.note : '')}"${off ? ' disabled' : ''}></label>
    </div>
    <div class="redit-row">
      <button class="btn" id="rSave" data-slug="${a.slug}"${off ? ' disabled' : ''}>Save rating</button>
      ${r ? `<button class="btn ghost" id="rReset" data-slug="${a.slug}">Use formula (${a.formula})</button>` : ''}
      <a class="rlink" href="#ratings">Edit all ratings &rarr;</a>
    </div>
    <p class="rmsg" id="rMsg" aria-live="polite">${off ? 'Live editing works on the claude.ai version. In this copy, ratings come from players/ratings.json: change a number there (by pull request) to change a rating.' : rFlash.slug === a.slug ? esc(rFlash.text) : ''}</p>
  </div>`;
};

// Bulk editor: #ratings
const rPend = {};   // slug -> pending value string
let rLg = '', rQ = '', rOnlySet = false;
const renderRatingsTable = () => {
  if (!$('rtbody') || !devOn()) return;
  const note = $('rstate');
  note.textContent = !ratingsDb ? (ratingsState === 'loading' ? 'Connecting…' : 'Live editing works on the claude.ai version. In this copy, ratings come from players/ratings.json: change a number there (by pull request) to change a rating.')
    : canRate === false ? 'Only the owner of StatBattle can change ratings. You can still see them here.'
    : ratingsState === 'slow' ? 'Saved ratings are taking a while to load; what you see may be out of date.' : '';
  const list = ATHLETES.filter(a => (!rLg || a.lg === rLg) && (!rOnlySet || a.set) && (!rQ || a.name.toLowerCase().includes(rQ.toLowerCase())))
    .sort((x, y) => x.lg.localeCompare(y.lg) || y.ovr - x.ovr || x.name.localeCompare(y.name));
  const ro = !ratingsDb || canRate === false;
  $('rtbody').innerHTML = list.map(a => {
    const pv = rPend[a.slug], shown = pv != null ? pv : String(a.ovr), bad = pv != null && validOvr(pv) == null;
    const changed = pv != null && !bad && validOvr(pv) !== a.ovr;
    return `<tr class="${changed ? 'chg' : ''}${bad ? ' bad' : ''}">
      <td class="hi"><a class="alink" href="#p-${a.slug}">${esc(a.name)}</a></td><td>${LG[a.lg].name}</td><td>${esc(a.pos)}</td>
      <td class="num">${a.formula}</td>
      <td class="num"><input class="rin" data-slug="${a.slug}" type="number" inputmode="numeric" min="1" max="99" step="1" value="${esc(shown)}" aria-label="Rating for ${esc(a.name)}"${ro ? ' disabled' : ''}></td>
      <td>${a.set ? `<span class="rset">Your rating</span>` : `<span class="rform">Formula</span>`}${a.set && !ro ? ` <button class="rclear" data-slug="${a.slug}" aria-label="Use formula for ${esc(a.name)}">Use formula</button>` : ''}</td></tr>`;
  }).join('');
  const n = Object.keys(rPend).filter(s => { const v = validOvr(rPend[s]); return v != null && v !== athBySlug[s].ovr; }).length;
  const badN = Object.values(rPend).filter(v => validOvr(v) == null).length;
  $('rsave').disabled = ro || !n;
  $('rsave').textContent = n ? `Save ${n} change${n === 1 ? '' : 's'}` : 'Save changes';
  $('rdiscard').hidden = !Object.keys(rPend).length;
  $('rcount').textContent = `${Object.values(RATINGS).length} of ${ATHLETES.length} players have your rating` + (badN ? ` · ${badN} entr${badN === 1 ? 'y needs' : 'ies need'} a whole number from 1 to 99` : '');
};
const renderRatings = () => {
  $('rlocked').hidden = devOn(); $('rpanel').hidden = !devOn();
  if (!devOn()) return;
  $('rlg').innerHTML = [['','All'], ...Object.entries(LG).map(([k, v]) => [k, v.name])].map(([k, n]) => `<button data-rlg="${k}" aria-pressed="${k === rLg}">${n}</button>`).join('');
  $('ronly').checked = rOnlySet; $('rq').value = rQ;
  renderRatingsTable();
};
const saveAllRatings = async () => {
  const todo = Object.entries(rPend).map(([s, v]) => [s, validOvr(v)]).filter(([s, v]) => v != null && v !== athBySlug[s].ovr);
  $('rsave').disabled = true; $('rmsg2').textContent = `Saving ${todo.length}…`;
  let ok = 0;
  for (const [s, v] of todo) {
    try { await saveRating(s, v, RATINGS[s] ? RATINGS[s].note : ''); delete rPend[s]; ok++; }
    catch (e) { $('rmsg2').textContent = e.message; renderRatingsTable(); return; }
  }
  Object.keys(rPend).forEach(s => { if (validOvr(rPend[s]) === athBySlug[s].ovr) delete rPend[s]; });
  $('rmsg2').textContent = `Saved ${ok} rating${ok === 1 ? '' : 's'}.`;
  renderRatingsTable();
};
const exportRatings = async () => {
  const out = JSON.stringify(Object.fromEntries(Object.entries(RATINGS).map(([k, v]) => [k, v.ovr])), null, 1);
  $('rio').value = out;
  try { await navigator.clipboard.writeText(out); $('rmsg2').textContent = 'Your ratings were copied as JSON (also shown below).'; }
  catch (e) { $('rmsg2').textContent = 'Copy the JSON below to keep a backup.'; }
  $('riowrap').hidden = false;
};
const importRatings = () => {
  let obj; try { obj = JSON.parse($('rio').value); } catch (e) { $('rmsg2').textContent = 'That isn’t valid JSON. Paste a list like {"tom-brady": 99}.'; return; }
  let n = 0, skip = 0;
  Object.entries(obj || {}).forEach(([k, v]) => { const s = athBySlug[k] ? k : (athByName[String(k).toLowerCase()] || {}).slug; const o = validOvr(v); if (s && o != null) { rPend[s] = String(o); n++; } else skip++; });
  $('rmsg2').textContent = `Loaded ${n} rating${n === 1 ? '' : 's'} as unsaved changes${skip ? ` (${skip} skipped: unknown player or not 1–99)` : ''}. Review, then save.`;
  renderRatingsTable();
};

