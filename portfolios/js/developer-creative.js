// 모바일 메뉴 토글
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// 스크롤 이벤트로 헤더 스타일 변경
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 스킬 바 애니메이션
const skillSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.skill-progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.value;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`;
    });
}

function hideProgress() {
    progressBars.forEach(progressBar => {
        progressBar.style.opacity = 0;
        progressBar.style.width = 0;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress();
    }
});

// 프로젝트 필터링
const projectFilters = document.querySelectorAll('.project-filter');

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // 모든 필터에서 active 클래스 제거
        projectFilters.forEach(f => f.classList.remove('active'));
        // 클릭한 필터에 active 클래스 추가
        filter.classList.add('active');
        
        // 여기서 실제 필터링 로직을 추가할 수 있습니다.
        // 예: data-category 속성을 사용하여 프로젝트 카드 필터링
    });
});

// nav links 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-link, .contact-btn').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});