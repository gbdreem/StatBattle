// App: views and routing (#type-*, #hall, #players, #p-<slug>, #ratings), event wiring, and the mode panel. Loaded last.
// ---------- Views: home (game types) · #type-<id> (its modes) · #hall. Plain #names only: the artifact host drops #a/b ----------
const VIEWS = ['v-home','v-cat','v-hall','v-players','v-player','v-ratings'];
const show = (id, focusEl) => {
  VIEWS.forEach(v => $(v).hidden = v !== id);
  window.scrollTo(0, 0);
  if (focusEl) focusEl.focus();
};
const route = (focus) => {
  const h = location.hash.replace(/^#/, ''), b = h.startsWith('type-') ? h.slice(5) : '', a = b ? 'type' : h;
  if (a === 'type' && CATS.some(c => c.id === b)) {
    const c = CATS.find(x => x.id === b);
    $('catTitle').textContent = c.name;
    $('catDesc').textContent = c.g + ' Open a mode to choose your sport.';
    $('grid').innerHTML = c.modes.map(id => modeCard(modeById(id))).join('');
    $('grid').className = 'grid' + (c.modes.length === 4 ? ' two' : '');
    show('v-cat', focus && $('catTitle'));
  } else if (a === 'ratings') {
    renderRatings();
    show('v-ratings', focus && $('v-ratings').querySelector('h1'));
  } else if (a === 'players') {
    renderPlayers();
    show('v-players', focus && $('v-players').querySelector('h1'));
  } else if (a.startsWith('p-') && athBySlug[a.slice(2)]) {
    renderAthlete(athBySlug[a.slice(2)]);
    show('v-player', focus && $('ptitle'));
    return;
  } else if (a === 'hall') {
    renderHall();
    show('v-hall', focus && $('v-hall').querySelector('h1'));
  } else {
    show('v-home', focus && $('v-home').querySelector('h1'));
  }
};
const go = h => { if (location.hash.replace(/^#/, '') === h) route(true); else location.hash = h; };
$('cats').addEventListener('click', e => { const b = e.target.closest('.cat'); if (!b) return; if (b.dataset.mode) open(b.dataset.mode); else go('type-' + b.dataset.cat); });
$('hallCard').addEventListener('click', () => go('hall'));
$('playersCard').addEventListener('click', () => go('players'));
$('playersIc').innerHTML = SILHOUETTE;
$('alg').addEventListener('click', e => { const b = e.target.closest('[data-lg]'); if (!b) return; pLg = b.dataset.lg; renderPlayers(); $('alg').querySelector(`[data-lg="${pLg}"]`).focus(); });
$('aq').addEventListener('input', e => { pQ = e.target.value.trim(); renderPlayersGrid(); });
$('pbody').addEventListener('click', async e => {
  const b = e.target.closest('#rSave,#rReset'); if (!b) return;
  const a = athBySlug[b.dataset.slug], msg = $('rMsg');
  let v = null;
  if (b.id === 'rSave') { v = validOvr($('rOvr').value); if (v == null) { msg.textContent = 'Enter a whole number from 1 to 99.'; $('rOvr').focus(); return; } }
  b.disabled = true; msg.textContent = 'Saving…';
  try { await saveRating(a.slug, v, b.id === 'rSave' ? $('rNote').value.trim() : ''); RATINGS[a.slug] = v == null ? undefined : {ovr:v, note:$('rNote')?.value.trim() || '', at:new Date().toISOString()}; if (v == null) delete RATINGS[a.slug];
    rFlash = {slug:a.slug, text: v == null ? `Back to the formula (${a.formula}).` : `Saved. ${a.name} is now ${v}.`}; applyRatings(); renderAthlete(a); }
  catch (err) { msg.textContent = err.message; b.disabled = false; if (canRate === false) renderAthlete(a); }
});
$('rlg').addEventListener('click', e => { const b = e.target.closest('[data-rlg]'); if (!b) return; rLg = b.dataset.rlg; renderRatings(); $('rlg').querySelector(`[data-rlg="${rLg}"]`).focus(); });
$('rq').addEventListener('input', e => { rQ = e.target.value.trim(); renderRatingsTable(); });
$('ronly').addEventListener('change', e => { rOnlySet = e.target.checked; renderRatingsTable(); });
$('rtbody').addEventListener('change', e => { const i = e.target.closest('.rin'); if (!i) return; const a = athBySlug[i.dataset.slug]; if (i.value === String(a.ovr)) delete rPend[a.slug]; else rPend[a.slug] = i.value.trim(); renderRatingsTable(); });
$('rtbody').addEventListener('click', async e => { const b = e.target.closest('.rclear'); if (!b) return; b.disabled = true;
  try { await saveRating(b.dataset.slug, null); delete RATINGS[b.dataset.slug]; delete rPend[b.dataset.slug]; applyRatings(); $('rmsg2').textContent = `${athBySlug[b.dataset.slug].name} is back on the formula.`; } catch (err) { $('rmsg2').textContent = err.message; }
  renderRatingsTable(); });
$('rsave').addEventListener('click', saveAllRatings);
window.addEventListener('sb-devchange', () => {
  $('reditBtn').hidden = !devOn();
  const h = location.hash.replace(/^#/, '');
  if (h === 'ratings') renderRatings();
  else if (h.startsWith('p-') && athBySlug[h.slice(2)]) renderAthlete(athBySlug[h.slice(2)]);
});
$('rdiscard').addEventListener('click', () => { Object.keys(rPend).forEach(k => delete rPend[k]); $('rmsg2').textContent = 'Unsaved changes discarded.'; renderRatingsTable(); });
$('rexport').addEventListener('click', exportRatings);
$('rimport').addEventListener('click', () => { $('riowrap').hidden = false; $('rio').value = ''; $('rio').focus(); });
$('rload').addEventListener('click', importRatings);
$('pbody').addEventListener('click', e => { const l = e.target.closest('[data-hsport]'); if (!l) return; hSport = l.dataset.hsport; const k = l.querySelector('small').textContent; hTab = k === 'Leaders' ? 'leaders' : k === 'Champions' ? 'champs' : 'allLeague'; hSub = 0; hLead = 0; hDec = ''; hQ = ''; });
document.querySelectorAll('.back').forEach(b => b.addEventListener('click', () => go(b.dataset.go || '')));
window.addEventListener('hashchange', () => { if (location.hash !== '#dev') route(true); });
route(false);


const fillPanel = () => {
  const s = byId(sport);
  $('phd').style.backgroundImage = `url(${BG[sport]})`;
  $('pk').textContent = s.name + ' · Single player';
  $('pd').textContent = mode.d(s);
  $('pr').innerHTML = (typeof mode.r === 'function' ? mode.r(s) : mode.r).map(x => `<li>${esc(x)}</li>`).join('');
  const url = mode.live && mode.live[sport];
  $('play').hidden = !!url; $('playlink').hidden = !url; if (url) $('playlink').href = url + (mode.liveHash ? '#' + sport + '-expert' : '');  // those games still read a pool from the hash; -expert = every era, no filter
  [...$('picks').children].forEach(b => b.setAttribute('aria-pressed', b.dataset.id === sport));
  $('pst').textContent = url ? (mode.liveNote || 'Opens the Yardage Spinner prototype') : '';
};
const open = id => {
  mode = MODES.find(m => m.id === id); if (!mode) return;
  lastFocus = document.activeElement;
  sport = mode.sports.includes(lastSport) ? lastSport : mode.sports[0];
  $('pic').innerHTML = glyph(mode.ic, '#ffffff');
  $('pt').textContent = mode.name;
  $('ph4').textContent = mode.sports.length > 1 ? 'Choose a sport' : 'Sport';
  $('picks').innerHTML = mode.sports.map(id => `<button class="pick" data-id="${id}" aria-pressed="false">${SVGS[id]||''}<span>${byId(id).name}</span></button>`).join('');
  $('pm').innerHTML = [mode.time, mode.fmt].map(t => `<span class="tag">${esc(t)}</span>`).join('');
  fillPanel();
  $('scrim').classList.add('open');
  ($('playlink').hidden ? $('play') : $('playlink')).focus();
};
const close = () => { $('scrim').classList.remove('open'); mode = null; if (lastFocus) lastFocus.focus(); };

$('grid').addEventListener('click', e => { const b = e.target.closest('.mode'); if (b) open(b.dataset.id); });
$('picks').addEventListener('click', e => {
  const b = e.target.closest('.pick'); if (!b) return;
  sport = lastSport = b.dataset.id;
  try{ localStorage.setItem('sb-sport', sport) }catch(e){}
  fillPanel();
});
$('px').addEventListener('click', close);
$('scrim').addEventListener('click', e => { if (e.target === $('scrim')) close(); });
document.addEventListener('keydown', e => {
  if (!$('scrim').classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'Tab') {
    const f = [...$('scrim').querySelectorAll('button:not([hidden]),a.btn:not([hidden])')];
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length-1].focus(); }
    else if (!e.shiftKey && i === f.length-1) { e.preventDefault(); f[0].focus(); }
  }
});
// Hook for the real app: replace with your router call. Each game page uses BG[sport] as its background.
const startMode = (sp, md) => `/${sp}/${md}?bg=${encodeURIComponent(BG[sp])}`;
$('play').addEventListener('click', () => {
  $('pst').textContent = 'Placeholder route: ' + startMode(sport, mode.id);
});
