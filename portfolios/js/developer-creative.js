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

// 타임라인 아이템에 clearfix 클래스 적용 및 레이아웃 수정
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 모바일 화면 여부 확인
    const isMobile = window.innerWidth <= 768;
    
    timelineItems.forEach((item, index) => {
        // clearfix 클래스가 이미 있는지 확인
        if (!item.querySelector('.clearfix')) {
            const clearfix = document.createElement('div');
            clearfix.className = 'clearfix';
            item.appendChild(clearfix);
        }
        
        // 모바일 화면에서는 모든 아이템을 오른쪽으로 정렬
        if (isMobile) {
            const content = item.querySelector('.timeline-content');
            content.style.float = 'right';
            content.style.textAlign = 'left';
            
            const dot = item.querySelector('.timeline-dot');
            dot.style.left = '10px';
            dot.style.right = 'auto';
        } 
        // 데스크톱에서는 홀수/짝수에 따라 좌우 정렬
        else {
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');
            
            if (index % 2 === 0) { // 홀수 아이템 (0부터 시작하므로)
                content.style.float = 'left';
                content.style.textAlign = 'right';
                dot.style.right = '-50px';
                dot.style.left = 'auto';
            } else { // 짝수 아이템
                content.style.float = 'right';
                content.style.textAlign = 'left';
                dot.style.left = '-50px';
                dot.style.right = 'auto';
            }
        }
    });
});

// 화면 크기 변경 시 타임라인 레이아웃 업데이트
window.addEventListener('resize', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const isMobile = window.innerWidth <= 768;
    
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        if (isMobile) {
            content.style.float = 'right';
            content.style.textAlign = 'left';
            dot.style.left = '10px';
            dot.style.right = 'auto';
        } else {
            if (index % 2 === 0) {
                content.style.float = 'left';
                content.style.textAlign = 'right';
                dot.style.right = '-50px';
                dot.style.left = 'auto';
            } else {
                content.style.float = 'right';
                content.style.textAlign = 'left';
                dot.style.left = '-50px';
                dot.style.right = 'auto';
            }
        }
    });
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