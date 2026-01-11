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

  // Animaciones de entrada para secciones al scroll con efectos variados
  const observerOptions = { 
    threshold: 0.15, 
    rootMargin: '0px 0px -100px 0px' 
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Una vez mostrado, dejar de observar para mejor rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animar sección "Quiénes Somos" - título y lead desde arriba
  const quienesSection = document.querySelector('.quienes-section');
  if (quienesSection) {
    const title = quienesSection.querySelector('h2');
    const lead = quienesSection.querySelector('.lead');
    if (title) {
      title.classList.add('animate-up');
      observer.observe(title);
    }
    if (lead) {
      lead.classList.add('animate-up', 'delay-200');
      observer.observe(lead);
    }
  }

  // Animar value cards - alternando izquierda y derecha
  document.querySelectorAll('.value-card').forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add('animate-left', `delay-${(index % 3) * 100 + 100}`);
    } else {
      card.classList.add('animate-right', `delay-${(index % 3) * 100 + 100}`);
    }
    observer.observe(card);
  });

  // Animar galería - carrusel desde izquierda, texto desde derecha
  const carouselSection = document.querySelector('.carousel-section');
  const workshopText = document.querySelector('.workshop-text');
  if (carouselSection) {
    carouselSection.classList.add('animate-left');
    observer.observe(carouselSection);
  }
  if (workshopText) {
    workshopText.classList.add('animate-right', 'delay-200');
    observer.observe(workshopText);
  }

  // Animar sección de cursos
  const cursosSection = document.querySelector('.cursos-section');
  if (cursosSection) {
    const title = cursosSection.querySelector('h2');
    const lead = cursosSection.querySelector('.lead');
    if (title) {
      title.classList.add('animate-zoom');
      observer.observe(title);
    }
    if (lead) {
      lead.classList.add('animate-fade', 'delay-200');
      observer.observe(lead);
    }
  }

  // Animar course cards - efecto zoom escalonado
  document.querySelectorAll('.course-card').forEach((card, index) => {
    card.classList.add('animate-zoom', `delay-${index * 100 + 100}`);
    observer.observe(card);
  });

  // Animar sección de instructores
  const instructoresSection = document.querySelector('.instructores-section');
  if (instructoresSection) {
    const title = instructoresSection.querySelector('h2');
    const lead = instructoresSection.querySelector('.lead');
    if (title) {
      title.classList.add('animate-up');
      observer.observe(title);
    }
    if (lead) {
      lead.classList.add('animate-fade', 'delay-200');
      observer.observe(lead);
    }
  }

  // Animar instructor cards - alternando desde los lados
  document.querySelectorAll('.instructor-card').forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add('animate-left', `delay-${index * 150}`);
    } else {
      card.classList.add('animate-right', `delay-${index * 150}`);
    }
    observer.observe(card);
  });

  // Animar sección de convenios
  const partnersSection = document.querySelector('.partners-section');
  if (partnersSection) {
    const title = partnersSection.querySelector('h2');
    const lead = partnersSection.querySelector('.lead');
    if (title) {
      title.classList.add('animate-up');
      observer.observe(title);
    }
    if (lead) {
      lead.classList.add('animate-fade', 'delay-100');
      observer.observe(lead);
    }
  }

  // Animar logos de convenios - efecto zoom escalonado
  document.querySelectorAll('.partner-logo').forEach((logo, index) => {
    logo.classList.add('animate-zoom', `delay-${index * 100}`);
    observer.observe(logo);
  });

  // Efecto de partículas futuristas en hero (simple canvas) - Mantenido para innovación
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
// Carrusel funcional - Mantenido igual
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const carouselInner = document.querySelector('.carousel-inner');
const prevArrow = document.querySelector('.carousel-arrow.prev');
const nextArrow = document.querySelector('.carousel-arrow.next');
let currentIndex = 0;
let autoplayInterval;

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

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  updateCarousel(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel(prevIndex);
}

// Los dots ahora solo son indicadores visuales, no clickeables
// Se actualizan automáticamente pero no tienen eventos de click

// Eventos para las flechas
if (prevArrow) {
  prevArrow.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
}

if (nextArrow) {
  nextArrow.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
}

// Función para reiniciar el autoplay
function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// Iniciar autoplay con 7 segundos
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 7000); // 7 segundos
}

startAutoplay();