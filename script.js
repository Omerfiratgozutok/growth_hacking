/* ─── CHART DEFAULTS ───────────────────────────────── */
Chart.defaults.color = '#8892aa';
Chart.defaults.borderColor = '#1f2330';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";

/* ─── SIDEBAR SCROLL SPY ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item[data-section]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(i => i.classList.remove('active'));
      const a = document.querySelector(`.nav-item[data-section="${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ─── HAMBURGER ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target))
    sidebar.classList.remove('open');
});
sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));

/* ─── SMOOTH SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ─── COLOR PALETTE ────────────────────────────────── */
const C = {
  acq:    'rgba(79,142,247,1)',    acqBg: 'rgba(79,142,247,0.15)',
  act:    'rgba(167,139,250,1)',   actBg: 'rgba(167,139,250,0.15)',
  rev:    'rgba(34,197,94,1)',     revBg: 'rgba(34,197,94,0.15)',
  ret:    'rgba(245,158,11,1)',    retBg: 'rgba(245,158,11,0.15)',
  ref:    'rgba(244,114,182,1)',   refBg: 'rgba(244,114,182,0.15)',
  cyan:   'rgba(6,182,212,1)',     cyanBg:'rgba(6,182,212,0.15)',
  red:    'rgba(239,68,68,1)',     redBg: 'rgba(239,68,68,0.15)',
  orange: 'rgba(249,115,22,1)',    orBg:  'rgba(249,115,22,0.15)',
};

/* ═══════════════════════════════════════════════════
   1. EXPERIMENT VELOCITY — Growth hacking deney sayısı
════════════════════════════════════════════════════ */
new Chart(document.getElementById('experimentVelocityChart'), {
  type: 'line',
  data: {
    labels: ['Ay 1','Ay 2','Ay 3','Ay 4','Ay 5','Ay 6','Ay 7','Ay 8','Ay 9','Ay 10','Ay 11','Ay 12'],
    datasets: [
      {
        label: '5 Deney/Hafta',
        data: [100,112,126,143,162,183,205,230,258,290,325,365],
        borderColor: C.rev, backgroundColor: 'transparent', tension: 0.4, borderWidth: 2,
        pointBackgroundColor: C.rev, pointRadius: 3,
      },
      {
        label: '2 Deney/Hafta',
        data: [100,107,115,123,132,141,151,162,174,186,200,214],
        borderColor: C.acq, backgroundColor: 'transparent', tension: 0.4, borderWidth: 2,
        pointBackgroundColor: C.acq, pointRadius: 3,
      },
      {
        label: '0.5 Deney/Hafta',
        data: [100,102,104,107,109,112,115,118,121,124,127,130],
        borderColor: C.red, backgroundColor: 'transparent', tension: 0.4, borderWidth: 2,
        pointBackgroundColor: C.red, pointRadius: 3, borderDash: [4,3],
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { ticks: { callback: v => v + ' indeks' }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   2. DMMP HİYERARŞİ — İş hedefinden KPI'ya
════════════════════════════════════════════════════ */
new Chart(document.getElementById('dmmpHierarchyChart'), {
  type: 'bar',
  data: {
    labels: ['İş Hedefi\n(Objective)', 'Strateji\n(How)', 'Metrik\n(Signal)', 'KPI\n(Performance)', 'Hedef\n(Target)', 'Segment\n(Audience)'],
    datasets: [{
      label: 'Spesifiklik Seviyesi',
      data: [20, 38, 54, 74, 88, 100],
      backgroundColor: [C.acqBg, C.actBg, C.retBg, C.revBg, C.cyanBg, C.refBg],
      borderColor:     [C.acq,   C.act,   C.ret,   C.rev,   C.cyan,  C.ref],
      borderWidth: 2, borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false },
      tooltip: { callbacks: { label: ctx => ` Spesifiklik: ${ctx.parsed.x}/100` } }
    },
    scales: {
      x: { max: 100, ticks: { callback: v => v }, grid: { color: 'rgba(31,35,48,0.8)' } },
      y: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   3. FUNNEL CHART — AARRR dönüşüm oranları
════════════════════════════════════════════════════ */
new Chart(document.getElementById('funnelChart'), {
  type: 'bar',
  data: {
    labels: ['Acquisition\n(Visit→Lead)', 'Activation\n(Lead→Active)', 'Retention\n(Ay 2)', 'Referral\n(NPS→Davet)', 'Revenue\n(Active→Paid)'],
    datasets: [{
      label: 'Dönüşüm Oranı (%)',
      data: [22, 45, 65, 30, 15],
      backgroundColor: [C.acqBg, C.actBg, C.retBg, C.refBg, C.revBg],
      borderColor:     [C.acq,   C.act,   C.ret,   C.ref,   C.rev],
      borderWidth: 2, borderRadius: 6,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}% dönüşüm` } } },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { callback: v => v+'%' }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   4. CAC BY CHANNEL
════════════════════════════════════════════════════ */
new Chart(document.getElementById('cacChannelChart'), {
  type: 'bar',
  data: {
    labels: ['Paid Search (SEM)', 'Paid Social', 'Outbound Email', 'Content / SEO', 'Referral Program', 'PLG / Viral'],
    datasets: [{
      label: 'Ort. CAC (USD)',
      data: [420, 375, 310, 205, 85, 40],
      backgroundColor: [C.redBg, C.orBg, C.retBg, C.actBg, C.acqBg, C.revBg],
      borderColor:     [C.red,   C.orange, C.ret, C.act,   C.acq,   C.rev],
      borderWidth: 2, borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.x} CAC` } } },
    scales: {
      x: { ticks: { callback: v => '$'+v }, grid: { color: 'rgba(31,35,48,0.8)' } },
      y: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   5. ACTIVATION — Onboarding adım sayısı vs. oran
════════════════════════════════════════════════════ */
new Chart(document.getElementById('activationChart'), {
  type: 'line',
  data: {
    labels: ['1 Adım','2 Adım','3 Adım','4 Adım','5 Adım','6 Adım','7+ Adım'],
    datasets: [{
      label: 'Aktivasyon Oranı (%)',
      data: [74, 69, 62, 52, 39, 26, 14],
      borderColor: C.act, backgroundColor: C.actBg, fill: true,
      tension: 0.4, pointBackgroundColor: C.act, pointRadius: 5, borderWidth: 2,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { callback: v => v+'%' }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   6. CHURN IMPACT — 36 aylık gelir kaybı
════════════════════════════════════════════════════ */
function simRevenue(mChurn, months) {
  let c = 1000; const d = [c * 100];
  for (let i = 1; i < months; i++) { c *= (1 - mChurn); d.push(Math.round(c * 100)); }
  return d;
}
const months36 = Array.from({length:36}, (_,i) => `Ay ${i+1}`);

new Chart(document.getElementById('churnImpactChart'), {
  type: 'line',
  data: {
    labels: months36,
    datasets: [
      { label: 'Churn %1/ay',  data: simRevenue(0.01,36), borderColor: C.rev,  backgroundColor:'transparent', tension:0.3, borderWidth:2 },
      { label: 'Churn %3/ay',  data: simRevenue(0.03,36), borderColor: C.acq,  backgroundColor:'transparent', tension:0.3, borderWidth:2, borderDash:[6,3] },
      { label: 'Churn %5/ay',  data: simRevenue(0.05,36), borderColor: C.ret,  backgroundColor:'transparent', tension:0.3, borderWidth:2, borderDash:[4,3] },
      { label: 'Churn %8/ay',  data: simRevenue(0.08,36), borderColor: C.red,  backgroundColor:'transparent', tension:0.3, borderWidth:2, borderDash:[2,3] },
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` } } },
    scales: {
      y: { ticks: { callback: v => '$'+(v/1000).toFixed(0)+'k' }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { ticks: { maxTicksLimit: 12 }, grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   7. COHORT RETENTION CURVES
════════════════════════════════════════════════════ */
new Chart(document.getElementById('cohortRetentionChart'), {
  type: 'line',
  data: {
    labels: ['Ay 0','Ay 1','Ay 2','Ay 3','Ay 4','Ay 5','Ay 6'],
    datasets: [
      { label: 'Oca 2024', data:[100,55,42,35,30,27,25], borderColor:C.red,  backgroundColor:'transparent', tension:0.4, borderWidth:2, pointRadius:4 },
      { label: 'Şub 2024', data:[100,58,45,38,33,30,null],borderColor:C.ret, backgroundColor:'transparent', tension:0.4, borderWidth:2, pointRadius:4 },
      { label: 'Mar 2024', data:[100,62,49,42,37,null,null],borderColor:C.acq,backgroundColor:'transparent', tension:0.4, borderWidth:2, pointRadius:4 },
      { label: 'Nis 2024', data:[100,65,52,45,null,null,null],borderColor:C.act,backgroundColor:'transparent', tension:0.4, borderWidth:2, pointRadius:4 },
      { label: 'May 2024', data:[100,68,55,null,null,null,null],borderColor:C.rev,backgroundColor:'transparent', tension:0.4, borderWidth:2, pointRadius:4 },
      { label: 'Haz 2024', data:[100,71,null,null,null,null,null],borderColor:C.cyan,backgroundColor:'transparent', tension:0.4, borderWidth:2, pointRadius:4 },
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: ctx => ctx.parsed.y !== null ? ` ${ctx.dataset.label}: %${ctx.parsed.y}` : null } } },
    scales: {
      y: { min:0, max:100, ticks: { callback: v => '%'+v }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   8. CHURN BENCHMARK BY SEGMENT
════════════════════════════════════════════════════ */
new Chart(document.getElementById('churnBenchmarkChart'), {
  type: 'bar',
  data: {
    labels: ['Enterprise\n(>$50K ACV)', 'Mid-Market', 'SMB\n(<$10K ACV)', 'B2C\nSubscription', 'E-comm\nAbonelik'],
    datasets: [{
      label: 'Kabul Edilebilir Yıllık Churn (%)',
      data: [5, 8, 15, 30, 25],
      backgroundColor: [C.revBg, C.acqBg, C.retBg, C.redBg, C.orBg],
      borderColor:     [C.rev,   C.acq,   C.ret,   C.red,   C.orange],
      borderWidth: 2, borderRadius: 6,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` %${ctx.parsed.y} yıllık churn` } } },
    scales: {
      y: { beginAtZero: true, ticks: { callback: v => '%'+v }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   9. LTV:CAC SCENARIOS
════════════════════════════════════════════════════ */
new Chart(document.getElementById('ltvCacChart'), {
  type: 'bar',
  data: {
    labels: ['LTV:CAC 1:1\n(Tehlikeli)', 'LTV:CAC 2:1\n(Sınırda)', 'LTV:CAC 3:1\n(Standart)', 'LTV:CAC 5:1\n(İyi)', 'LTV:CAC 8:1\n(Mükemmel)'],
    datasets: [
      {
        label: 'LTV ($)',
        data: [100, 200, 300, 500, 800],
        backgroundColor: [C.redBg, C.orBg, C.retBg, C.acqBg, C.revBg],
        borderColor:     [C.red,   C.orange, C.ret, C.acq,   C.rev],
        borderWidth: 2, borderRadius: 6, stack: 'a',
      },
      {
        label: 'CAC ($)',
        data: [-100, -100, -100, -100, -100],
        backgroundColor: Array(5).fill('rgba(239,68,68,0.08)'),
        borderColor: Array(5).fill(C.red),
        borderWidth: 1, borderRadius: 4, stack: 'a',
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { ticks: { callback: v => '$'+Math.abs(v) }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});

/* ═══════════════════════════════════════════════════
   10. MRR BREAKDOWN
════════════════════════════════════════════════════ */
new Chart(document.getElementById('mrrBreakdownChart'), {
  type: 'bar',
  data: {
    labels: ['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8'],
    datasets: [
      { label: 'Yeni MRR',       data:[12,18,24,31,38,46,55,66], backgroundColor:C.acqBg, borderColor:C.acq, borderWidth:2, borderRadius:4, stack:'a' },
      { label: 'Expansion MRR',  data:[2,4,7,10,14,18,23,29],  backgroundColor:C.revBg, borderColor:C.rev, borderWidth:2, borderRadius:4, stack:'a' },
      { label: 'Churn MRR (-)',  data:[-3,-4,-5,-6,-7,-8,-9,-10], backgroundColor:C.redBg, borderColor:C.red, borderWidth:2, borderRadius:4, stack:'a' },
      { label: 'Contraction (-)',data:[-1,-2,-2,-3,-3,-4,-4,-5], backgroundColor:C.orBg,  borderColor:C.orange, borderWidth:2, borderRadius:4, stack:'a' },
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' }, tooltip: { mode: 'index' } },
    scales: {
      y: { ticks: { callback: v => '$'+v+'k' }, grid: { color: 'rgba(31,35,48,0.8)' } },
      x: { grid: { display: false } }
    }
  }
});
