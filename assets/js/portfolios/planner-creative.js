/**
 * 플래너 크리에이티브 포트폴리오 JavaScript
 * 
 * 이 파일은 플래너 크리에이티브 포트폴리오 웹사이트의 인터랙티브 기능을 구현합니다.
 */

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 아이콘 변경 (햄버거 <-> X)
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // 스크롤 이벤트 - 헤더 스타일 변경
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // 창의적 애니메이션 효과
    const creativeElements = document.querySelectorAll('.creative-element');
    
    if (creativeElements.length > 0) {
        creativeElements.forEach(element => {
            // 랜덤 애니메이션 지연 시간 설정
            const delay = Math.random() * 0.5;
            element.style.animationDelay = `${delay}s`;
        });
    }
    
    // 프로젝트 갤러리 필터링
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 활성화된 버튼 클래스 변경
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // 갤러리 항목 필터링
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 이미지 라이트박스
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const body = document.body;
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                
                const lightboxContent = document.createElement('div');
                lightboxContent.classList.add('lightbox-content');
                
                const fullImage = document.createElement('img');
                fullImage.src = this.src;
                
                const closeButton = document.createElement('span');
                closeButton.classList.add('lightbox-close');
                closeButton.innerHTML = '&times;';
                
                lightboxContent.appendChild(fullImage);
                lightboxContent.appendChild(closeButton);
                lightbox.appendChild(lightboxContent);
                body.appendChild(lightbox);
                
                // 스크롤 방지
                body.style.overflow = 'hidden';
                
                // 닫기 버튼 이벤트
                closeButton.addEventListener('click', function() {
                    body.removeChild(lightbox);
                    body.style.overflow = 'auto';
                });
                
                // 라이트박스 외부 클릭 시 닫기
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        body.removeChild(lightbox);
                        body.style.overflow = 'auto';
                    }
                });
            });
        });
    }
    
    // 타임라인 애니메이션
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // 요소가 화면에 보이는지 확인하는 함수
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // 스크롤 시 애니메이션 적용
        function animateTimeline() {
            timelineItems.forEach(item => {
                if (isElementInViewport(item)) {
                    item.classList.add('visible');
                }
            });
        }
        
        // 초기 로드 시 확인
        animateTimeline();
        
        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', animateTimeline);
    }
    
    // 컬러 테마 전환
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // 로컬 스토리지에서 테마 설정 불러오기
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeToggle.classList.add('active');
        }
        
        themeToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // 현재 테마 확인 및 전환
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            // 새 테마 적용 및 저장
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // 스킬 차트 애니메이션
    const skillCharts = document.querySelectorAll('.skill-chart');
    
    if (skillCharts.length > 0) {
        // 요소가 화면에 보이는지 확인하는 함수
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // 스크롤 시 애니메이션 적용
        function animateSkillCharts() {
            skillCharts.forEach(chart => {
                if (isElementInViewport(chart)) {
                    const percentage = chart.getAttribute('data-percentage');
                    const circle = chart.querySelector('circle:last-child');
                    
                    if (circle) {
                        // 원 둘레 계산
                        const radius = circle.getAttribute('r');
                        const circumference = 2 * Math.PI * radius;
                        
                        // 퍼센트에 따른 stroke-dashoffset 계산
                        const offset = circumference - (percentage / 100) * circumference;
                        
                        // 애니메이션 적용
                        circle.style.strokeDasharray = `${circumference} ${circumference}`;
                        circle.style.strokeDashoffset = offset;
                        
                        // 퍼센트 텍스트 업데이트
                        const percentText = chart.querySelector('.percentage');
                        if (percentText) {
                            percentText.textContent = `${percentage}%`;
                        }
                    }
                }
            });
        }
        
        // 초기 로드 시 확인
        animateSkillCharts();
        
        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', animateSkillCharts);
    }
    
    // 폼 제출 처리
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 실제 구현에서는 여기에 서버로 데이터를 전송하는 코드가 들어갑니다.
            // 예시 목적으로 성공 메시지만 표시합니다.
            alert('메시지가 성공적으로 전송되었습니다!');
            this.reset();
        });
    }
    
    // 부드러운 스크롤 기능
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴가 열려있으면 닫기
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
    
    // 애니메이션 효과 (스크롤 시 요소 나타나기)
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    
    if (animatedElements.length > 0) {
        // 요소가 화면에 보이는지 확인하는 함수
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // 스크롤 시 애니메이션 적용
        function animateOnScroll() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('visible');
                }
            });
        }
        
        // 초기 로드 시 확인
        animateOnScroll();
        
        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', animateOnScroll);
    }
}); 