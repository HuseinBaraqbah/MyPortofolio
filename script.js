document.addEventListener('DOMContentLoaded', function() {
  
  // --- Update Tahun Footer ---
  const yearSpan = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  // --- Slider Pendidikan ---
  const educationSlider = document.querySelector('.education-slider');
  const allEducationSlides = document.querySelectorAll('.education-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let educationCurrentIndex = 2; // Mulai dari slide Kuliah (index 2)
  const totalEducationSlides = allEducationSlides.length;

  function updateActiveEducationSlide() {
    allEducationSlides.forEach(slide => {
      slide.classList.remove('active-slide');
    });
    allEducationSlides[educationCurrentIndex].classList.add('active-slide');
    const newPosition = -educationCurrentIndex * 100;
    educationSlider.style.left = newPosition + '%';
  }

  nextBtn.addEventListener('click', () => {
    educationCurrentIndex = (educationCurrentIndex + 1) % totalEducationSlides;
    updateActiveEducationSlide();
  });

  prevBtn.addEventListener('click', () => {
    educationCurrentIndex = (educationCurrentIndex - 1 + totalEducationSlides) % totalEducationSlides;
    updateActiveEducationSlide();
  });
  updateActiveEducationSlide(); // Inisialisasi

  // --- Tampilkan Footer di Section Contact ---
  const footer = document.querySelector('footer');
  const contactSection = document.getElementById('contact');
  const observerOptions = { root: null, threshold: 0.5 };

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('footer-visible');
      } else {
        footer.classList.remove('footer-visible');
      }
    });
  }, observerOptions);
  footerObserver.observe(contactSection);

  // --- Slider Proyek ---
  const projectSlider = document.querySelector('.project-slider');
  const allProjectSlides = document.querySelectorAll('.project-slide');
  const projectPrevBtn = document.getElementById('projectPrevBtn');
  const projectNextBtn = document.getElementById('projectNextBtn');
  
  let projectCurrentIndex = 0;
  const totalProjectSlides = allProjectSlides.length; // Otomatis hitung jumlah slide

  function updateActiveSlide() {
    allProjectSlides.forEach(slide => {
      slide.classList.remove('active-slide');
    });
    allProjectSlides[projectCurrentIndex].classList.add('active-slide');
    const newPosition = -projectCurrentIndex * 100;
    projectSlider.style.left = newPosition + '%';
  }

  projectNextBtn.addEventListener('click', () => {
    projectCurrentIndex = (projectCurrentIndex + 1) % totalProjectSlides;
    updateActiveSlide();
  });

  projectPrevBtn.addEventListener('click', () => {
    projectCurrentIndex = (projectCurrentIndex - 1 + totalProjectSlides) % totalProjectSlides;
    updateActiveSlide();
  });
  updateActiveSlide(); // Inisialisasi

  // --- Navigasi Aktif Saat Scroll ---
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const navObserverOptions = { root: null, threshold: 0.6 };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active-link');
        });
        const correspondingLink = document.querySelector(`.nav-links li a[href="#${entry.target.id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active-link');
        }
      }
    });
  }, navObserverOptions);
  sections.forEach(section => navObserver.observe(section));

  // --- Animasi Elemen Saat Scroll ---
  const animatedElements = document.querySelectorAll('.fade-in-element');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  animatedElements.forEach(el => animationObserver.observe(el));

  // --- Efek 3D Foto di Home ---
  const photoFrame = document.querySelector('.photo-frame');
  photoFrame.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = photoFrame.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * -20;
    const rotateY = ((x / width) - 0.5) * 20;
    photoFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  photoFrame.addEventListener('mouseleave', () => {
    photoFrame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

  // --- Efek Partikel Canvas ---
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  const mouse = { x: null, y: null };

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 3; i++) {
      particlesArray.push(new Particle());
    }
  });

  class Particle {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      if (particlesArray[i].size <= 0.3) {
        particlesArray.splice(i, 1);
        i--;
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // --- LOGIKA HAMBURGER MENU (BARU DITAMBAHKAN) ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");

  // Toggle menu saat hamburger diklik
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Tutup menu saat link diklik
  document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }));

});