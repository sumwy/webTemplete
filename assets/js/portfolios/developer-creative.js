/**
 * 개발자 크리에이티브 포트폴리오 JavaScript
 * 
 * 이 파일은 개발자 크리에이티브 포트폴리오 웹사이트의 인터랙티브 기능을 구현합니다.
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
    
    // 타이핑 효과
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const phrases = [
            '프론트엔드 개발자',
            '크리에이티브 코더',
            'UI/UX 엔지니어',
            '웹 애니메이션 전문가'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // 텍스트 삭제 중
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // 텍스트 입력 중
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // 텍스트 입력 완료
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // 텍스트 완성 후 대기 시간
            }
            
            // 텍스트 삭제 완료
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // 타이핑 효과 시작
        typeText();
    }
    
    // 프로젝트 필터링 기능
    const filterButtons = document.querySelectorAll('.project-filter button');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 활성화된 버튼 클래스 변경
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // 프로젝트 항목 필터링
                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 스킬 프로그레스 바 애니메이션
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (skillsSection && progressBars.length > 0) {
        // 스킬 섹션이 화면에 보이는지 확인하는 함수
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // 스크롤 이벤트에서 스킬 섹션이 보이면 애니메이션 시작
        function animateSkills() {
            if (isInViewport(skillsSection)) {
                progressBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-progress');
                    bar.style.width = percentage + '%';
                });
                // 애니메이션이 한 번만 실행되도록 이벤트 리스너 제거
                window.removeEventListener('scroll', animateSkills);
            }
        }
        
        // 초기 로드 시 확인
        animateSkills();
        
        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', animateSkills);
    }
    
    // 포트폴리오 갤러리 (라이트박스 효과)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const title = this.querySelector('.gallery-title').textContent;
                const description = this.querySelector('.gallery-description').textContent;
                
                // 라이트박스 생성
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" alt="${title}">
                        <div class="lightbox-caption">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                
                body.appendChild(lightbox);
                body.style.overflow = 'hidden'; // 스크롤 방지
                
                // 닫기 버튼 이벤트
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', function() {
                    body.removeChild(lightbox);
                    body.style.overflow = 'auto'; // 스크롤 복원
                });
                
                // 라이트박스 외부 클릭 시 닫기
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        body.removeChild(lightbox);
                        body.style.overflow = 'auto'; // 스크롤 복원
                    }
                });
            });
        });
    }
    
    // 애니메이션 효과 (스크롤 시 요소 나타나기)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
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
                    element.classList.add('animated');
                }
            });
        }
        
        // 초기 로드 시 확인
        animateOnScroll();
        
        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', animateOnScroll);
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
    
    // 3D 효과 (마우스 움직임에 따른 요소 회전)
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            const heroContent = this.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });
        
        // 마우스가 영역을 벗어나면 원래 상태로 복원
        heroSection.addEventListener('mouseleave', function() {
            const heroContent = this.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });
    }
}); 