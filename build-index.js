// Generates index.html for the review repo, grouped by feature. Run after copying pages in.
const fs = require('fs');
const dir = 'C:/tmp/amc-snooze-review';

const groups = [
  { feature: 'Snooze a session', badge: 'H', note: 'Manual snooze. Final set: 6 mains + 6 alternate heroes on the two developer pages.', pages: [
    { f:'manual-snooze--developer--attention-scheduled--emotional.html', l:'You choose', t:'Developer · emotional · MAIN (attention triage)' },
    { f:'manual-snooze--developer--attention-scheduled--emotional--alt-kinetic.html', l:'You choose — Kinetic type', t:'alt hero' },
    { f:'manual-snooze--developer--attention-scheduled--emotional--alt-overnight.html', l:'You choose — Overnight', t:'alt hero' },
    { f:'manual-snooze--developer--attention-scheduled--emotional--alt-lane.html', l:'You choose — Attention lane', t:'alt hero' },
    { f:'manual-snooze--developer--own-the-block--functional.html', l:'Own the block', t:'Developer · functional · MAIN (attention race)' },
    { f:'manual-snooze--developer--own-the-block--functional--alt-could-wait.html', l:'Own the block — Could wait (stats)', t:'alt hero' },
    { f:'manual-snooze--developer--own-the-block--functional--alt-scoreboard.html', l:'Own the block — Scoreboard', t:'alt hero' },
    { f:'manual-snooze--developer--own-the-block--functional--alt-pause-loop.html', l:'Own the block — Pause the loop', t:'alt hero' },
    { f:'manual-snooze--operator--go-to-bed--emotional.html', l:'Go to bed', t:'Operator · emotional · flagship (overnight)' },
    { f:'manual-snooze--operator--end-the-night--functional.html', l:'End the night', t:'Operator · functional (bulk)' },
    { f:'manual-snooze--operator--answer-after-work--functional.html', l:'Answer it after work', t:'Operator · functional (wrong-time)' },
    { f:'manual-snooze--developer--not-now-tomorrow-morning--functional.html', l:'Just tell it when', t:'Developer · functional · REBUILT (typed read-back mechanism)' },
  ]},
  { feature: 'Zap', badge: 'Alt+Z', note: 'One-keystroke "keep going" for a waiting agent.', pages: [
    { f:'zap--operator--leave-the-desk--emotional.html', l:'Leave the desk', t:'Operator · emotional' },
    { f:'zap--operator--never-wonder--emotional.html', l:'Never wonder', t:'Operator · emotional' },
    { f:'zap--operator--right-answer-button--functional.html', l:'The right-answer button', t:'Operator · functional' },
    { f:'zap--operator--keep-it-moving--functional.html', l:'Keep it moving', t:'Operator · functional' },
    { f:'zap--developer--not-a-babysitter--emotional.html', l:'Not a babysitter', t:'Developer · emotional' },
    { f:'zap--developer--one-keystroke-nod--functional.html', l:'One-keystroke nod', t:'Developer · functional' },
    { f:'zap--developer--stay-in-flow--emotional.html', l:'Stay in flow', t:'Developer · emotional' },
    { f:'zap--developer--the-continue-key--functional.html', l:'The continue key', t:'Developer · functional' },
  ]},
  { feature: 'Quick Replies', badge: 'Alt+S', note: 'Saved answers you fire in under a second.', pages: [
    { f:'quick-replies--operator--repetition--functional.html', l:'Repetition', t:'Operator · functional' },
    { f:'quick-replies--operator--away--emotional.html', l:'Away', t:'Operator · emotional' },
    { f:'quick-replies--operator--away--functional.html', l:'Away', t:'Operator · functional' },
    { f:'quick-replies--developer--continue-flow--functional.html', l:'Continue flow', t:'Developer · functional' },
    { f:'quick-replies--developer--guardrails--functional.html', l:'Guardrails', t:'Developer · functional' },
  ]},
  { feature: 'Waiting Detector', badge: 'Automatic', note: 'Automatic, on by default. Surfaces a waiting agent for you.', pages: [
    { f:'auto-waiting--operator--not-every-ping--functional.html', l:'Not every ping', t:'Operator · functional' },
    { f:'auto-waiting--operator--not-the-continue-button--functional.html', l:'Not the continue button', t:'Operator · functional' },
    { f:'auto-waiting--developer--waiting-triaged--functional.html', l:'Waiting, triaged', t:'Developer · functional' },
    { f:'auto-waiting--developer--notified-automatically--functional.html', l:'Notified automatically', t:'Developer · functional' },
  ]},
];

let missing = [];
let cards = '';
for (const g of groups) {
  const badgeHtml = g.badge === 'Automatic'
    ? '<span class="fauto">● Automatic</span>'
    : g.badge.split('+').map(k=>`<span class="cap">${k}</span>`).join('<span class="plus">+</span>');
  cards += `<section class="grp"><div class="ghead"><div class="gbadge">${badgeHtml}</div><div><h2>${g.feature}</h2><p class="gnote">${g.note}</p></div></div><div class="cards">`;
  for (const p of g.pages) {
    if (!fs.existsSync(dir + '/' + p.f)) missing.push(p.f);
    const alt = /alt hero/.test(p.t) ? ' alt' : '';
    cards += `<a class="card${alt}" href="${p.f}"><span class="cl">${p.l}</span><span class="ct">${p.t}</span></a>`;
  }
  cards += `</div></section>`;
}

const total = groups.reduce((n,g)=>n+g.pages.length,0);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AMC Feature Landing Pages — Review</title><style>
:root{--bg:#030712;--line:rgba(255,255,255,.08);--text:#fff;--body:#9ca3af;--accent:#4ade80;--info:#60a5fa}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;padding:48px 24px 80px}
.wrap{max-width:1000px;margin:0 auto}
h1{font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-.02em}
.sub{color:var(--body);margin:12px 0 8px;max-width:680px}
.meta{color:rgba(255,255,255,.45);font-size:13px;margin-bottom:36px}
.grp{margin:34px 0;border-top:1px solid var(--line);padding-top:26px}
.ghead{display:flex;align-items:center;gap:16px;margin-bottom:18px}
.gbadge{display:inline-flex;align-items:center;gap:6px;flex-shrink:0}
.cap{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;padding:0 8px;border-radius:6px;background:linear-gradient(180deg,#1c1f2e,#12141f);border:1px solid rgba(255,255,255,.2);border-bottom-width:3px;color:#eef;font:800 .85rem/1 ui-monospace,Consolas,monospace}
.plus{color:rgba(255,255,255,.45);font-weight:700;margin:0 2px}
.fauto{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--accent)}
h2{font-size:1.3rem}
.gnote{color:var(--body);font-size:13.5px}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.card{display:flex;flex-direction:column;gap:3px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.02);text-decoration:none;transition:border-color .15s,transform .15s,background .15s}
.card:hover{border-color:rgba(74,222,128,.5);transform:translateY(-2px);background:rgba(74,222,128,.04)}
.card.alt{background:rgba(96,165,250,.03)}
.card.alt:hover{border-color:rgba(96,165,250,.5)}
.cl{color:var(--text);font-weight:700;font-size:15px}
.ct{color:var(--body);font-size:12px}
footer{margin-top:48px;color:rgba(255,255,255,.35);font-size:12px;border-top:1px solid var(--line);padding-top:20px}
</style></head><body><div class="wrap">
<h1>AMC feature landing pages</h1>
<p class="sub">Animated, self-contained sales-and-education pages, one per feature. Every page now carries a <b style="color:#fff">persistent hotkey badge</b> top-left (keycap + feature name) that stays visible as you scroll.</p>
<p class="meta">${total} pages · updated 2026-07-10 · click any card to open. Best viewed on desktop; scroll each page through its segments.</p>
${cards}
<footer>Internal review build. Snooze pages "be at dinner" and "two hours of quiet" are proposed for retirement (near-duplicates) and are not listed here.</footer>
</div></body></html>`;

fs.writeFileSync(dir + '/index.html', html);
console.log('index.html written. Total pages listed: ' + total);
if (missing.length) console.log('WARNING missing files:\n  ' + missing.join('\n  '));
else console.log('All listed pages exist in the repo dir.');
