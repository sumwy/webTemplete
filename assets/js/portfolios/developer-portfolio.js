// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // 타이핑 효과
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = ['풀스택 개발자', '프론트엔드 개발자', '백엔드 개발자', 'JavaScript 전문가'];
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // 텍스트 삭제 중
                typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                // 텍스트 입력 중
                typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            // 문구 입력 완료
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // 삭제 전 일시 정지
            }
            
            // 문구 삭제 완료
            if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // 새 문구 입력 전 일시 정지
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // 타이핑 효과 시작
        setTimeout(typeText, 1000);
    }
    
    // 스킬 프로그레스 바 애니메이션
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage;
        });
    }
    
    // 스킬 섹션이 보이면 애니메이션 시작
    const skillsSection = document.getElementById('skills');
    
    function checkSkillsVisibility() {
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                animateSkillBars();
                // 한 번만 실행하도록 이벤트 리스너 제거
                window.removeEventListener('scroll', checkSkillsVisibility);
            }
        }
    }
    
    // 초기 로드 시 체크
    checkSkillsVisibility();
    
    // 스크롤 시 체크
    window.addEventListener('scroll', checkSkillsVisibility);
    
    // 프로젝트 필터
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 모든 버튼에서 active 클래스 제거
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // 클릭한 버튼에 active 클래스 추가
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // 폼 제출 처리
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('메시지가 성공적으로 전송되었습니다!');
            contactForm.reset();
        });
    }
    
    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 