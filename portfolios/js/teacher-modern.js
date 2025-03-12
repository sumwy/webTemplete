// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    if (mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Check fade elements on initial load
document.addEventListener('DOMContentLoaded', checkFade);

// Check fade elements on scroll
window.addEventListener('scroll', checkFade);

// Course filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Testimonial slider
const testimonials = [
    {
        content: "박지원 강사님은 복잡한 프로그래밍 개념을 정말 쉽게 설명해주십니다. 처음에는 코딩이 어렵게만 느껴졌는데, 강사님의 실습 위주 수업 덕분에 자신감을 얻었고 지금은 프리랜서 웹 개발자로 일하고 있습니다!",
        name: "이미나",
        role: "웹 개발 과정 수료생",
        image: "/api/placeholder/80/80"
    },
    {
        content: "비전공자로서 프로그래밍을 시작하기가 두려웠는데, 강사님의 체계적인 커리큘럼과 친절한 지도 덕분에 기초부터 탄탄하게 배울 수 있었습니다. 특히 실무에서 사용되는 팁들이 정말 유용했습니다.",
        name: "김준호",
        role: "파이썬 데이터 분석 과정 수료생",
        image: "/api/placeholder/80/80"
    },
    {
        content: "팀 프로젝트 과정에서 강사님의 코드 리뷰와 피드백이 정말 큰 도움이 되었습니다. 단순히 강의만 하는 것이 아니라 현업에서의 경험을 바탕으로 실질적인 조언을 해주셔서 많이 성장할 수 있었습니다.",
        name: "박소영",
        role: "React 과정 수료생",
        image: "/api/placeholder/80/80"
    }
];

let currentTestimonial = 0;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const testimonialItem = document.querySelector('.testimonial-item');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    
    testimonialItem.style.opacity = 0;
    
    setTimeout(() => {
        testimonialItem.innerHTML = `
            <div class="testimonial-content">
                ${testimonial.content}
            </div>
            <div class="testimonial-author">
                <div class="author-img">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
        `;
        
        testimonialItem.style.opacity = 1;
    }, 300);
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    alert('메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!');
    contactForm.reset();
});