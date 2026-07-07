/* ============================================
   PORTFOLIO JS — Lê Anh Tuấn | Data Analyst
   Interactions, Animations & Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page loaded scrolled down

  // ---------- Mobile Navigation Menu ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when clicking a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---------- Typing Animation ----------
  const typingTextElement = document.getElementById('typingText');
  const phrases = [
    'SQL • Python • Power BI • BigQuery • ETL',
    'Building Data Pipelines & Dashboards',
    'Turning Raw Data into Actionable Insights'
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 40; // delete faster
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      // Move to next phrase
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // brief pause before starting next word
    }

    setTimeout(type, typingSpeed);
  };

  // Start typing
  if (typingTextElement) {
    type();
  }

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initial check on load

  // ---------- Navigation Active States on Scroll ----------
  const sections = document.querySelectorAll('section');
  const navActiveOnScroll = () => {
    let scrollPos = window.scrollY + 120; // offset for nav height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', navActiveOnScroll);

  // ---------- Stats Number Counter Animation ----------
  const statCards = document.querySelectorAll('.stat-card');
  let animatedStats = false;

  const animateStats = () => {
    if (animatedStats) return;

    const statsSection = document.getElementById('about');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      animatedStats = true;
      const numbers = document.querySelectorAll('.stat-number');

      numbers.forEach(num => {
        const text = num.textContent;
        // Parse float or int
        const target = parseFloat(text);
        if (isNaN(target)) return;

        let start = 0;
        const duration = 1500; // ms
        const startTime = performance.now();

        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentVal = progress * target;

          if (text.includes('.')) {
            num.textContent = currentVal.toFixed(2);
          } else {
            num.textContent = Math.floor(currentVal);
          }

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            num.textContent = text; // ensures exact target is set
          }
        };

        requestAnimationFrame(step);
      });
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run once on load
});
