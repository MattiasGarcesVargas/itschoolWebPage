document.addEventListener('DOMContentLoaded', () => {
  // Año dinámico
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Toggle menú móvil (agregar botón si es responsive)
  const navToggle = document.createElement('button');
  navToggle.innerHTML = '☰';
  navToggle.classList.add('nav-toggle');
  navToggle.style.cssText = 'display: none; background: none; border: none; color: var(--text); font-size: 1.5rem; cursor: pointer; position: absolute; right: 1rem; top: 1rem;';
  document.querySelector('.header-inner').appendChild(navToggle);
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      navToggle.style.display = 'block';
    } else {
      navToggle.style.display = 'none';
      mainNav.classList.remove('open');
    }
  });

  // Modal cursos mejorado con animaciones
  const modal = document.getElementById('courseModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalAge = document.getElementById('modalAge');
  const modalDuration = document.getElementById('modalDuration');
  const modalClose = modal.querySelector('.modal-close');

  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.course-card');
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalAge.textContent = card.dataset.age;
      modalDuration.textContent = card.dataset.duration;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });

  // Animaciones de entrada para secciones al scroll
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Efecto de partículas futuristas en hero (simple canvas)
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;';
  document.querySelector('.hero').appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
  });

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)` // Azules/púrpuras
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});
  // Carrusel funcional
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const carouselInner = document.querySelector('.carousel-inner');
  let currentIndex = 0;

  function updateCarousel(index) {
    // Mover el carrusel
    carouselInner.style.transform = `translateX(-${index * 100}%)`;

    // Actualizar estados activos
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  // Evento en los dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      updateCarousel(i);
    });
  });

  // (Opcional) autoplay cada 5s
  setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    updateCarousel(nextIndex);
  }, 5000);
