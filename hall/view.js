// ---------- Hall of Records view: Records · Champions · Leaders · All-league · Famous ----------
const HTABS = [['recs','Records'],['champs','Champions'],['leaders','Leaders'],['allLeague',''],['famous','']];
const hasTab = (h, id) => id === 'recs' || id === 'champs' || !!h[id];
const tabName = (h, id, l) => l || (h[id] && h[id].label) || '';
let hSport = ALL.includes(lastSport) ? lastSport : 'football', hTab = 'recs', hSub = 0, hLead = 0, hDec = '', hQ = '';
$('hpicks').innerHTML = ALL.map(id => `<button class="pick" data-id="${id}" aria-pressed="false">${SVGS[id]||''}<span>${byId(id).name}</span></button>`).join('');

const yearOf = r => { const m = String(r[0]).match(/\d{4}/); return m ? +m[0] : 0; };
const isGap = r => r[1] && r[1].startsWith('—') && r.slice(2).every(x => !x);
const champRow = (t, r) => isGap(r)
  ? `<tr><td>${esc(r[0])}</td><td class="na" colspan="${t.cols.length-1}">${esc(r[1].slice(1))}</td></tr>`
  : `<tr>${r.map((v,i) => v.startsWith('—') ? `<td class="na">${esc(v.slice(1))}</td>` : `<td${i===t.hi?' class="hi"':''}>${esc(v)}</td>`).join('')}</tr>`;
const champMatch = r => (!hDec || Math.floor(yearOf(r)/10)*10 === +hDec) && (!hQ || r.join(' ').toLowerCase().includes(hQ.toLowerCase()));
const champBody = t => {
  const rows = t.rows.filter(champMatch);
  return rows.length ? rows.map(r => champRow(t, r)).join('') : `<tr><td class="na" colspan="${t.cols.length}">No matches. Try another decade or name.</td></tr>`;
};
const champCount = t => { const n = t.rows.filter(r => !isGap(r) && champMatch(r)).length; return `${n} ${n === 1 ? 'season' : 'seasons'} shown`; };
const chipsHTML = (items, cur, attr, label) => items.length > 1
  ? `<div class="chips" role="group" aria-label="${label}">${items.map((c,i) => `<button ${attr}="${i}" aria-pressed="${i===cur}">${esc(c)}</button>`).join('')}</div>` : '';

const renderHall = () => {
  const s = byId(hSport), h = HALL[hSport];
  if (!hasTab(h, hTab)) hTab = 'recs';
  [...$('hpicks').children].forEach(b => b.setAttribute('aria-pressed', b.dataset.id === hSport));
  $('htabseg').innerHTML = HTABS.filter(([id]) => hasTab(h, id)).map(([id,l]) => `<button data-tab="${id}" aria-pressed="${id===hTab}">${esc(tabName(h,id,l))}</button>`).join('');
  $('hban').style.backgroundImage = `url(${BG[hSport]})`;
  $('hball').innerHTML = SVGS[hSport] || '';
  $('hname').textContent = s.name;
  $('hk').textContent = h.k;
  let html = '';
  if (hTab === 'recs') {
    html = `<div class="recs">${h.recs.map(r => `<div class="rec">${r.fresh ? '<span class="new">New</span>' : ''}<small>${esc(r.k)}</small><span class="v">${esc(r.v)}</span><span class="who">${esc(r.who)}</span><span class="d">${esc(r.d)}</span></div>`).join('')}</div>
      <p class="hnote">Checked ${HALL_UPDATED}. Records marked New were set in the last year.</p>`;
  } else if (hTab === 'champs') {
    if (hSub >= h.champs.length) hSub = 0;
    const t = h.champs[hSub], long = t.rows.length > 20;
    const decs = [...new Set(t.rows.map(r => Math.floor(yearOf(r)/10)*10).filter(Boolean))];
    if (hDec && !decs.includes(+hDec)) hDec = '';
    const filt = long ? `<div class="hfilt">
        <label>Decade <select id="hdec"><option value="">All</option>${decs.map(d => `<option value="${d}"${String(d)===hDec?' selected':''}>${d}s</option>`).join('')}</select></label>
        <label class="grow">Find a team or player <input id="hq" type="search" value="${esc(hQ)}" placeholder="e.g. ${esc(t.rows[0][t.hi>=0?t.hi:1])}"></label>
        <span class="cnt" id="hcnt" aria-live="polite">${champCount(t)}</span></div>` : '';
    html = `${chipsHTML(h.champs.map(c => c.name), hSub, 'data-sub', 'Competition')}${filt}
      <div class="tw"><table class="ct"><caption class="vh">${esc(s.name)}: ${esc(t.name)}</caption>
      <thead><tr>${t.cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
      <tbody id="hct">${champBody(t)}</tbody></table></div>
      <p class="hnote">${esc(t.note || '')} Newest first. Checked ${HALL_UPDATED}.</p>`;
  } else if (hTab === 'leaders') {
    const ls = h.leaders; if (hLead >= ls.length) hLead = 0;
    const t = ls[hLead]; let rank = 0, prev = null;
    const rows = t.rows.map((r, i) => {
      if (r[1] !== prev) rank = i + 1; prev = r[1];
      const act = r[0].endsWith('*'), nm = act ? r[0].slice(0, -1) : r[0];
      return `<tr><td class="rk">${rank}</td><td class="hi">${athLink(nm)}${act ? ' <span class="act">Active</span>' : ''}</td>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`;
    }).join('');
    const isMarks = t.cols[0] === 'Mark';
    html = `${chipsHTML(ls.map(c => c.name), hLead, 'data-lead', 'Category')}
      <div class="tw"><table class="ct"><caption class="vh">${esc(s.name)}: ${esc(t.name)}</caption>
      <thead><tr>${isMarks ? '' : '<th scope="col">#</th>'}${t.cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
      <tbody>${isMarks ? t.rows.map(r => `<tr>${r.map((v,i) => `<td${i===1?' class="hi"':''}>${esc(v)}</td>`).join('')}</tr>`).join('') : rows}</tbody></table></div>
      <p class="hnote">${esc(t.note || '')} Checked ${HALL_UPDATED}.</p>`;
  } else if (hTab === 'allLeague') {
    const t = h.allLeague;
    html = `<h3 class="hsub">${esc(t.title)}</h3>
      <div class="tw"><table class="ct"><caption class="vh">${esc(t.title)}</caption>
      <thead><tr>${t.cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
      <tbody>${t.rows.map(r => `<tr>${r.map((v,i) => v.startsWith('—') ? `<td class="na">${esc(v.slice(1))}</td>` : `<td${i===(t.cols.length===2?0:1)?' class="hi"':''}>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="hnote">${esc(t.note || '')} Checked ${HALL_UPDATED}.</p>`;
  } else if (hTab === 'famous') {
    const f = h.famous;
    html = `<div class="recs fam">${f.items.map(x => `<div class="rec"><small>${esc(x.y)}</small><span class="who">${esc(x.n)}</span><span class="v2">${esc(x.r)}</span><span class="d">${esc(x.d)}</span>${x.p ? `<span class="d ppl">${esc(x.p)}</span>` : ''}</div>`).join('')}</div>
      <p class="hnote">Checked ${HALL_UPDATED}.</p>`;
  }
  $('hbody').innerHTML = html;
};
$('hpicks').addEventListener('click', e => { const b = e.target.closest('.pick'); if (!b) return; hSport = b.dataset.id; hSub = 0; hLead = 0; hDec = ''; hQ = ''; renderHall(); });
$('htabseg').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (!b) return; hTab = b.dataset.tab; renderHall(); $('htabseg').querySelector(`[data-tab="${hTab}"]`).focus(); });
$('hbody').addEventListener('click', e => {
  const b = e.target.closest('[data-sub],[data-lead]'); if (!b) return;
  if (b.dataset.sub != null) { hSub = +b.dataset.sub; hDec = ''; hQ = ''; renderHall(); $('hbody').querySelector(`[data-sub="${hSub}"]`).focus(); }
  else { hLead = +b.dataset.lead; renderHall(); $('hbody').querySelector(`[data-lead="${hLead}"]`).focus(); }
});
const refilter = () => { const t = HALL[hSport].champs[hSub]; $('hct').innerHTML = champBody(t); $('hcnt').textContent = champCount(t); };
$('hbody').addEventListener('input', e => { if (e.target.id === 'hq') { hQ = e.target.value.trim(); refilter(); } });
$('hbody').addEventListener('change', e => { if (e.target.id === 'hdec') { hDec = e.target.value; refilter(); } });


