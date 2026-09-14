/**
 * KaisaJu.github.io —— 微动效脚本
 * - 页面元素进入视口时渐显上浮
 * - 导航栏滚动时增加阴影
 */

(function () {
  'use strict';

  // Intersection Observer for scroll reveal
  const revealElements = document.querySelectorAll('.section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // Navbar shadow on scroll
  const masthead = document.querySelector('.masthead');
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 10) {
      masthead.style.boxShadow = '0 4px 20px rgba(31, 31, 36, 0.08)';
    } else {
      masthead.style.boxShadow = 'none';
    }
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Smooth reveal for author card on load
  const authorCard = document.querySelector('.author-card');
  if (authorCard) {
    authorCard.style.opacity = '0';
    authorCard.style.transform = 'translateY(20px)';
    authorCard.style.transition = 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';

    requestAnimationFrame(() => {
      setTimeout(() => {
        authorCard.style.opacity = '1';
        authorCard.style.transform = 'translateY(0)';
      }, 120);
    });
  }
})();
