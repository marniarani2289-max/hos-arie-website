document.querySelectorAll('[data-video-start]').forEach(link => {
  link.addEventListener('click', event => {
    const player = document.getElementById('learning-video');
    const start = Number(link.dataset.videoStart);
    if (!player || !Number.isInteger(start) || start < 0) return;
    event.preventDefault();
    player.src = `https://www.youtube-nocookie.com/embed/9DTkJLGTvcY?rel=0&autoplay=1&start=${start}`;
    player.scrollIntoView({block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    player.focus({preventScroll: true});
  });
});
