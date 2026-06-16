document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function startTimer() { timer = setInterval(() => goTo(current + 1), 4500); }
  function resetTimer() { clearInterval(timer); startTimer(); }

  const btnNext = document.querySelector('.slider-next');
  const btnPrev = document.querySelector('.slider-prev');
  if (btnNext) btnNext.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));

  slides[0].classList.add('active');
  if (dots[0]) dots[0].classList.add('active');
  startTimer();
});
