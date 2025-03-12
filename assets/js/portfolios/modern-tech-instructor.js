/**
 * 현대적인 기술 교육자 포트폴리오 JavaScript
 * 
 * 이 파일은 현대적인 기술 교육자 포트폴리오 웹사이트의 인터랙티브 기능을 구현합니다.
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
    
    // 강의 탭 전환 기능
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseContents = document.querySelectorAll('.course-content');
    
    if (courseTabs.length > 0 && courseContents.length > 0) {
        courseTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // 모든 탭과 콘텐츠에서 active 클래스 제거
                courseTabs.forEach(t => t.classList.remove('active'));
                courseContents.forEach(c => c.classList.remove('active'));
                
                // 클릭한 탭과 해당 콘텐츠에 active 클래스 추가
                this.classList.add('active');
                courseContents[index].classList.add('active');
            });
        });
    }
    
    // 비디오 갤러리 기능
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoPlayer = document.querySelector('.video-player');
    const videoIframe = videoPlayer ? videoPlayer.querySelector('iframe') : null;
    
    if (videoThumbnails.length > 0 && videoPlayer && videoIframe) {
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // 모든 썸네일에서 active 클래스 제거
                videoThumbnails.forEach(t => t.classList.remove('active'));
                
                // 클릭한 썸네일에 active 클래스 추가
                this.classList.add('active');
                
                // 비디오 URL 가져오기
                const videoUrl = this.getAttribute('data-video');
                
                // 비디오 플레이어 업데이트
                videoIframe.src = videoUrl;
                
                // 비디오 제목 업데이트
                const videoTitle = this.querySelector('.video-title').textContent;
                const videoPlayerTitle = videoPlayer.querySelector('.video-player-title');
                
                if (videoPlayerTitle) {
                    videoPlayerTitle.textContent = videoTitle;
                }
                
                // 비디오 플레이어로 스크롤
                videoPlayer.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    // 학생 후기 슬라이더
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialSlider && testimonials.length > 1) {
        let currentSlide = 0;
        const slideCount = testimonials.length;
        
        // 슬라이더 컨트롤 추가
        const sliderControls = document.createElement('div');
        sliderControls.classList.add('slider-controls');
        
        sliderControls.innerHTML = `
            <button class="prev-slide"><i class="fas fa-chevron-left"></i></button>
            <div class="slider-dots"></div>
            <button class="next-slide"><i class="fas fa-chevron-right"></i></button>
        `;
        
        testimonialSlider.appendChild(sliderControls);
        
        // 슬라이더 도트 추가
        const sliderDots = sliderControls.querySelector('.slider-dots');
        
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            
            sliderDots.appendChild(dot);
        }
        
        // 이전/다음 버튼 이벤트
        const prevButton = sliderControls.querySelector('.prev-slide');
        const nextButton = sliderControls.querySelector('.next-slide');
        
        prevButton.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
        
        nextButton.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
        
        // 슬라이드 전환 함수
        function goToSlide(slideIndex) {
            // 슬라이드 인덱스 범위 조정
            if (slideIndex < 0) {
                slideIndex = slideCount - 1;
            } else if (slideIndex >= slideCount) {
                slideIndex = 0;
            }
            
            // 현재 슬라이드 업데이트
            currentSlide = slideIndex;
            
            // 슬라이드 위치 업데이트
            testimonialSlider.querySelector('.testimonials').style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // 도트 활성화 상태 업데이트
            const dots = sliderDots.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // 자동 슬라이드 (선택 사항)
        let slideInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // 마우스 호버 시 자동 슬라이드 일시 중지
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // 자주 묻는 질문 아코디언
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // 현재 항목의 활성화 상태 토글
                item.classList.toggle('active');
                
                // 다른 항목들은 닫기 (선택 사항)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
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
}); 