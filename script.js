/* ===================================================================
   FOR PURVA — SCRIPT
   Handles: typing animation, floating petals, scroll reveals,
   parallax, smooth scroll, and the music player.
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------
     1. TYPING ANIMATION (hero subtitle)
     ----------------------------------------------------------------- */
  const typingEl = document.getElementById('typingText');
  const typingMessage =
    "Sunflowers always turn toward the light. I hope, with time, we can find ours again.";

  function typeWriter(el, text, speed = 38) {
    let i = 0;
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);

    function step() {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text.charAt(i));
        i++;
        setTimeout(step, speed);
      }
    }
    // slight delay so it begins after the title fades in
    setTimeout(step, 900);
  }

  if (typingEl) {
    typeWriter(typingEl, typingMessage);
  }

  /* -----------------------------------------------------------------
     2. FLOATING SUNFLOWER PETALS
     ----------------------------------------------------------------- */
  const petalField = document.getElementById('petalField');
  const PETAL_COUNT = 16;

  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const startLeft = Math.random() * 100; // vw
    const size = 10 + Math.random() * 14; // px
    const fallDuration = 9 + Math.random() * 10; // seconds
    const spinDuration = 3 + Math.random() * 4;
    const delay = Math.random() * 10;
    const opacity = 0.4 + Math.random() * 0.5;

    petal.style.left = `${startLeft}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.opacity = opacity;
    petal.style.animationDuration = `${fallDuration}s, ${spinDuration}s`;
    petal.style.animationDelay = `${delay}s, ${delay}s`;

    petalField.appendChild(petal);
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal();
  }

  /* -----------------------------------------------------------------
     3. SCROLL-TRIGGERED FADE-UP REVEALS
     ----------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------------------
     4. SUBTLE PARALLAX ON HERO & ENDING BACKGROUNDS
     ----------------------------------------------------------------- */
  const heroBg = document.querySelector('.hero__bg');
  const endingBg = document.querySelector('.ending__bg');

  function handleParallax() {
    const scrollY = window.scrollY;

    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.05)`;
    }

    if (endingBg) {
      const endingSection = document.getElementById('ending');
      const rect = endingSection.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // only apply while the section is near/within view, for performance
      if (rect.top < viewportH && rect.bottom > 0) {
        const offset = (viewportH - rect.top) * 0.15;
        endingBg.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    }
  }

  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        handleParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  });
  handleParallax();

  /* -----------------------------------------------------------------
     5. SMOOTH SCROLL FOR "READ MY HEART" + SCROLL INDICATOR
     ----------------------------------------------------------------- */
  const readHeartBtn = document.getElementById('readHeartBtn');
  const scrollIndicator = document.getElementById('scrollIndicator');

  function smoothScrollTo(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (readHeartBtn) {
    readHeartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#apology');
    });
  }

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      smoothScrollTo('#apology');
    });
  }

  /* -----------------------------------------------------------------
     6. MUSIC PLAYER — Play / Pause / Volume (no autoplay)
     ----------------------------------------------------------------- */
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const volumeSlider = document.getElementById('volumeSlider');
  const musicPlayer = document.getElementById('musicPlayer');

  if (audio && playPauseBtn) {
    audio.volume = parseFloat(volumeSlider.value);

    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Autoplay/playback restrictions or missing file — fail silently.
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play', () => {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
      playPauseBtn.setAttribute('aria-label', 'Pause music');
      musicPlayer.classList.add('is-active');
    });

    audio.addEventListener('pause', () => {
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      playPauseBtn.setAttribute('aria-label', 'Play music');
    });

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        audio.volume = parseFloat(e.target.value);
      });
    }
  }

});
