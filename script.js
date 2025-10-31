document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });

  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      navLinkItems.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.about-card, .program-card, .involvement-card, .story-card, .gallery-item');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateNumber = () => {
            current += increment;
            if (current < target) {
              stat.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateNumber);
            } else {
              stat.textContent = target.toLocaleString();
            }
          };

          updateNumber();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.story-stats');
  if (statsSection) {
    statObserver.observe(statsSection);
  }

  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('customAmount');

  amountButtons.forEach(button => {
    button.addEventListener('click', function() {
      amountButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const amount = this.getAttribute('data-amount');
      customAmountInput.value = '';
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
      if (this.value) {
        amountButtons.forEach(btn => btn.classList.remove('active'));
      }
    });
  }

  const donateForm = document.getElementById('donateForm');
  if (donateForm) {
    donateForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const selectedAmount = document.querySelector('.amount-btn.active');
      const customAmount = customAmountInput.value;
      const amount = customAmount || (selectedAmount ? selectedAmount.getAttribute('data-amount') : 0);

      if (!amount || amount < 5) {
        alert('Please select or enter a donation amount of at least $5.');
        return;
      }

      const donorName = document.getElementById('donorName').value;
      const donorEmail = document.getElementById('donorEmail').value;
      const frequency = document.querySelector('input[name="frequency"]:checked').value;

      console.log('Donation submitted:', {
        amount: amount,
        name: donorName,
        email: donorEmail,
        frequency: frequency
      });

      alert(`Thank you for your ${frequency === 'monthly' ? 'monthly' : 'one-time'} donation of $${amount}! Payment gateway integration will be added here.`);

      donateForm.reset();
      amountButtons.forEach(btn => btn.classList.remove('active'));
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      console.log('Contact form submitted:', {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message
      });

      alert('Thank you for reaching out! We will get back to you within 24-48 hours.');

      contactForm.reset();
    });
  }

  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(link => {
    if (!link.classList.contains('nav-link')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    }
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      console.log('Image failed to load:', this.src);
    });
  });

  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  const programCards = document.querySelectorAll('.program-card');
  programCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  const involvementCards = document.querySelectorAll('.involvement-card');
  involvementCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });
});
