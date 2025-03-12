/**
 * 개발자 미니멀리스트 포트폴리오 JavaScript
 * 
 * 이 파일은 개발자 미니멀리스트 포트폴리오 웹사이트의 인터랙티브 기능을 구현합니다.
 */

document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 시 네비게이션 활성화
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
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
    
    // 다크 모드 토글
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // 로컬 스토리지에서 다크 모드 설정 불러오기
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // 초기 다크 모드 설정 적용
    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.classList.add('active');
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            this.classList.toggle('active');
            
            // 다크 모드 설정 저장
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
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
    
    // 프로젝트 모달 기능
    const projectLinks = document.querySelectorAll('.project-link');
    
    if (projectLinks.length > 0) {
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const projectId = this.getAttribute('data-project');
                const projectModal = document.querySelector(`.project-modal[data-project="${projectId}"]`);
                
                if (projectModal) {
                    // 모달 열기
                    projectModal.classList.add('active');
                    body.style.overflow = 'hidden'; // 스크롤 방지
                    
                    // 닫기 버튼 이벤트
                    const closeBtn = projectModal.querySelector('.modal-close');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            projectModal.classList.remove('active');
                            body.style.overflow = 'auto'; // 스크롤 복원
                        });
                    }
                    
                    // 모달 외부 클릭 시 닫기
                    projectModal.addEventListener('click', function(e) {
                        if (e.target === projectModal) {
                            projectModal.classList.remove('active');
                            body.style.overflow = 'auto'; // 스크롤 복원
                        }
                    });
                }
            });
        });
    }
    
    // 애니메이션 효과 (스크롤 시 요소 나타나기)
    const animatedElements = document.querySelectorAll('.fade-in');
    
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
    
    // 타이핑 효과
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const phrases = [
            '백엔드 개발자',
            '프론트엔드 개발자',
            '풀스택 개발자',
            '소프트웨어 엔지니어'
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
}); 