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

// 경력 탭 전환 기능
document.addEventListener('DOMContentLoaded', () => {
    const experienceTabs = document.querySelectorAll('.experience-tab');
    const experienceContent = document.querySelector('.experience-content');
    
    // 경력 데이터
    const experienceData = [
        {
            company: 'PayEasy',
            role: '시니어 제품 기획자',
            date: '2022.03 - 현재',
            companyFull: '핀테크 스타트업 \'PayEasy\'',
            description: `
                <ul>
                    <li>간편결제 서비스의 사용자 경험 재설계 및 전환율 32% 증가 달성</li>
                    <li>데이터 분석 기반의 A/B 테스트를 통해 핵심 기능 최적화</li>
                    <li>신규 금융 상품 기획 및 론칭 과정 주도</li>
                    <li>애자일 환경에서 3개 개발팀과 협업하며 분기별 로드맵 관리</li>
                </ul>
            `,
            skills: ['서비스 기획', 'UX 설계', '데이터 분석', '애자일 방법론', '핀테크']
        },
        {
            company: 'ShopNow',
            role: 'UX/UI 기획자',
            date: '2019.06 - 2022.02',
            companyFull: '이커머스 플랫폼 \'ShopNow\'',
            description: `
                <ul>
                    <li>모바일 앱 리디자인 프로젝트 주도 및 사용자 만족도 25% 향상</li>
                    <li>사용자 리서치 및 퍼소나 기반 UX 설계 프로세스 도입</li>
                    <li>프로토타이핑 및 사용성 테스트를 통한 UI 개선</li>
                    <li>개발팀과의 협업을 통한 효율적인 기능 구현 지원</li>
                </ul>
            `,
            skills: ['UX 리서치', 'UI 디자인', '프로토타이핑', '사용성 테스트', '이커머스']
        },
        {
            company: 'EduPlus',
            role: '서비스 기획자',
            date: '2017.02 - 2019.05',
            companyFull: '교육 테크 기업 \'EduPlus\'',
            description: `
                <ul>
                    <li>온라인 학습 플랫폼의 기능 기획 및 개선</li>
                    <li>사용자 피드백 기반 서비스 개선 사항 도출</li>
                    <li>콘텐츠 제작자를 위한 관리 도구 기획</li>
                    <li>서비스 KPI 설정 및 모니터링 시스템 구축</li>
                </ul>
            `,
            skills: ['서비스 기획', '콘텐츠 전략', '사용자 피드백', 'KPI 관리', '에듀테크']
        }
    ];
    
    // 탭 클릭 이벤트 처리
    experienceTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // 모든 탭에서 active 클래스 제거
            experienceTabs.forEach(t => t.classList.remove('active'));
            // 클릭한 탭에 active 클래스 추가
            tab.classList.add('active');
            
            // 경력 내용 업데이트
            updateExperienceContent(index);
        });
    });
    
    // 경력 내용 업데이트 함수
    function updateExperienceContent(index) {
        const data = experienceData[index];
        
        // 내용 업데이트 애니메이션
        experienceContent.style.opacity = '0';
        
        setTimeout(() => {
            experienceContent.innerHTML = `
                <span class="experience-date">${data.date}</span>
                <h3 class="experience-role">${data.role}</h3>
                <p class="experience-company">${data.companyFull}</p>
                <div class="experience-description">
                    ${data.description}
                </div>
                <div class="experience-skills">
                    ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            `;
            
            experienceContent.style.opacity = '1';
        }, 300);
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
checkFade();

// Check fade elements on scroll
window.addEventListener('scroll', checkFade);

// Project filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
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

// Form submission (prevent default for demo)
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('메시지가 성공적으로 전송되었습니다!');
    contactForm.reset();
});