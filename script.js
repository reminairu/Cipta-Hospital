// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .doctor-card, .stat, .contact-item"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Form submission handling
const appointmentForm = document.getElementById("appointmentForm");
appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(appointmentForm);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.phone || !data.service) {
    alert("Mohon lengkapi semua field yang wajib diisi.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Mohon masukkan email yang valid.");
    return;
  }

  // Phone validation (Indonesian format)
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  if (!phoneRegex.test(data.phone.replace(/\s+/g, ""))) {
    alert("Mohon masukkan nomor telepon yang valid.");
    return;
  }

  // Simulate form submission
  const submitButton = appointmentForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.textContent = "Mengirim...";
  submitButton.disabled = true;

  setTimeout(() => {
    alert(
      "Terima kasih! Pesan Anda telah dikirim. Tim kami akan menghubungi Anda segera."
    );
    appointmentForm.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
});

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.type !== "submit") {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Counter animation for statistics
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat h3");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const suffix = counter.textContent.replace(/[0-9]/g, "");
    let current = 0;
    const increment = target / 100;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    // Start animation when element is visible
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counterObserver.observe(counter);
  });
};

// Initialize counter animation
document.addEventListener("DOMContentLoaded", animateCounters);

// Add hover effects to service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click-to-call functionality for phone numbers
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    if (!confirm("Apakah Anda ingin menelepon nomor ini?")) {
      e.preventDefault();
    }
  });
});

// Add click-to-email functionality
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    if (!confirm("Apakah Anda ingin membuka aplikasi email?")) {
      e.preventDefault();
    }
  });
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Add focus management for accessibility
document.querySelectorAll(".nav-link, .btn").forEach((element) => {
  element.addEventListener("focus", function () {
    this.style.outline = "2px solid #2c5aa0";
    this.style.outlineOffset = "2px";
  });

  element.addEventListener("blur", function () {
    this.style.outline = "none";
  });
});

// Print functionality (optional)
const addPrintStyles = () => {
  const printStyles = `
        @media print {
            .header, .footer, .nav-toggle { display: none !important; }
            .hero { padding: 20px 0 !important; }
            .section { page-break-inside: avoid; }
            body { font-size: 12pt; }
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = printStyles;
  document.head.appendChild(styleSheet);
};

// Initialize print styles
document.addEventListener("DOMContentLoaded", addPrintStyles);
