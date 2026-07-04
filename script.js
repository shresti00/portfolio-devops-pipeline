// Pipeline stages mirror the actual deployment pipeline this site runs through.
const stages = [
  { glyph: '</>', name: 'Website' },
  { glyph: '⎇',   name: 'GitHub' },
  { glyph: '⚙',   name: 'Jenkins' },
  { glyph: '▣',   name: 'Docker' },
  { glyph: '☸',   name: 'Kubernetes' },
  { glyph: '▶',   name: 'App Live' },
  { glyph: '✓',   name: 'Nagios' },
  { glyph: '▤',   name: 'Graphite' },
  { glyph: '◔',   name: 'Grafana' },
];

const rail = document.getElementById('pipelineRail');

stages.forEach((s) => {
  const el = document.createElement('div');
  el.className = 'pipeline-stage';
  el.innerHTML = `<span class="stage-glyph">${s.glyph}</span><span class="stage-name">${s.name}</span>`;
  rail.appendChild(el);
});

const stageEls = Array.from(document.querySelectorAll('.pipeline-stage'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function runPipelineAnimation() {
  stageEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 90);
  });

  if (prefersReducedMotion) return;

  // After the reveal, sweep an "active" highlight across the stages once
  // to suggest a live deploy, then settle.
  const sweepStart = stageEls.length * 90 + 300;
  stageEls.forEach((el, i) => {
    setTimeout(() => {
      stageEls.forEach((s) => s.classList.remove('active'));
      el.classList.add('active');
    }, sweepStart + i * 220);
  });
  setTimeout(() => {
    stageEls.forEach((s) => s.classList.remove('active'));
  }, sweepStart + stageEls.length * 220);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runPipelineAnimation();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(rail);
} else {
  runPipelineAnimation();
}