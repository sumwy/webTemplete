// 모바일 메뉴 토글
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links .nav-link');

// 모바일 메뉴 토글 기능
mobileToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // 아이콘 변경 (메뉴/닫기)
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 메뉴 항목 클릭 시 모바일 메뉴 닫기
navLinksItems.forEach(item => {
    item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(29, 29, 29, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--dark)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 포트폴리오 필터링 기능
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (filterBtns.length > 0 && portfolioCards.length > 0) {
        // 필터 버튼 클릭 이벤트
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 활성화된 버튼 클래스 제거
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // 클릭한 버튼 활성화
                this.classList.add('active');
                
                // 필터 값 가져오기
                const filterValue = this.getAttribute('data-filter');
                
                // 포트폴리오 카드 필터링
                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // 모든 카드 표시 또는 필터에 맞는 카드만 표시
                    if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                        card.style.display = 'block';
                        // 애니메이션 효과 추가
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }
                });
            });
        });
    }
}); 