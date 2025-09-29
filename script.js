document.addEventListener('DOMContentLoaded', function() {
  
  // Kode untuk update tahun (TETAP SAMA)
  const yearSpan = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  // --- DIUBAH: Logika slider pendidikan diperbarui agar sama dengan slider proyek ---
  const educationSlider = document.querySelector('.education-slider');
  const allEducationSlides = document.querySelectorAll('.education-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Dimulai dari slide Kuliah (elemen ke-3, yang berarti index-nya adalah 2)
  let educationCurrentIndex = 2; 
  const totalEducationSlides = allEducationSlides.length;

  // Fungsi untuk mengupdate slide pendidikan mana yang aktif
  function updateActiveEducationSlide() {
    allEducationSlides.forEach(slide => {
      slide.classList.remove('active-slide');
    });
    allEducationSlides[educationCurrentIndex].classList.add('active-slide');

    const newPosition = -educationCurrentIndex * 100;
    educationSlider.style.left = newPosition + '%';
  }

  // Event listener untuk tombol berikutnya
  nextBtn.addEventListener('click', () => {
    educationCurrentIndex = (educationCurrentIndex + 1) % totalEducationSlides;
    updateActiveEducationSlide();
  });

  // Event listener untuk tombol sebelumnya
  prevBtn.addEventListener('click', () => {
    educationCurrentIndex = (educationCurrentIndex - 1 + totalEducationSlides) % totalEducationSlides;
    updateActiveEducationSlide();
  });

  // Inisialisasi slider pendidikan
  updateActiveEducationSlide();
  
  // Kode untuk footer (TETAP SAMA)
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

  // Kode untuk slider proyek (TETAP SAMA)
  const projectSlider = document.querySelector('.project-slider');
  const allProjectSlides = document.querySelectorAll('.project-slide');
  const projectPrevBtn = document.getElementById('projectPrevBtn');
  const projectNextBtn = document.getElementById('projectNextBtn');
  let projectCurrentIndex = 0;
  const totalProjectSlides = allProjectSlides.length;

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
  updateActiveSlide();

  // Kode untuk navigasi aktif (TETAP SAMA)
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
  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Kode untuk animasi saat scroll (TETAP SAMA)
  const animatedElements = document.querySelectorAll('.fade-in-element');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  animatedElements.forEach(el => animationObserver.observe(el));

  // Kode untuk efek 3D foto (TETAP SAMA)
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

});