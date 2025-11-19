// Carrossel de imagens FISPA
(function () {
  const track = document.getElementById('promoTrack');
  const slides = track ? Array.from(track.children) : [];
  const prev = document.getElementById('promoPrev');
  const next = document.getElementById('promoNext');

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoTimer = null;
  const INTERVAL = 6000; // 6 segundos

  function goTo(index) {
    const total = slides.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;

    const offset = -index * 100;
    track.style.transform = 'translateX(' + offset + '%)';
  }

  function startAuto() {
    if (autoTimer) return;
    autoTimer = setInterval(() => {
      goTo(current + 1);
    }, INTERVAL);
  }

  function stopAuto() {
    if (!autoTimer) return;
    clearInterval(autoTimer);
    autoTimer = null;
  }

  // Navegação manual
  prev && prev.addEventListener('click', () => {
    stopAuto();
    goTo(current - 1);
    startAuto();
  });

  next && next.addEventListener('click', () => {
    stopAuto();
    goTo(current + 1);
    startAuto();
  });

  // Pausar autoplay quando o mouse estiver sobre o carrossel
  const viewport = document.querySelector('.promo-viewport');
  if (viewport) {
    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);
    viewport.addEventListener('touchstart', stopAuto, { passive: true });
    viewport.addEventListener('touchend', startAuto, { passive: true });
  }

  // Inicia no primeiro slide e começa o auto-play
  goTo(0);
  startAuto();
})();
