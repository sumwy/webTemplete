// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 모바일 메뉴 토글
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

// 애니메이션 요소 관찰
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.animate-fadeUp').forEach(el => {
    el.style.opacity = 0;
    observer.observe(el);
  });
}); 