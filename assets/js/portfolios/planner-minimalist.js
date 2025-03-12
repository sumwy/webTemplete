/**
 * 플래너 미니멀리스트 포트폴리오 JavaScript
 * 
 * 이 파일은 플래너 미니멀리스트 포트폴리오 웹사이트의 인터랙티브 기능을 구현합니다.
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
    
    // 플래너 항목 필터링 기능
    const filterButtons = document.querySelectorAll('.planner-filter button');
    const plannerItems = document.querySelectorAll('.planner-item');
    
    if (filterButtons.length > 0 && plannerItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 활성화된 버튼 클래스 변경
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // 플래너 항목 필터링
                plannerItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 달력 기능 (간단한 구현)
    const calendarContainer = document.querySelector('.calendar-container');
    
    if (calendarContainer) {
        renderCalendar();
    }
    
    function renderCalendar() {
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        
        let calendarHTML = `
            <div class="calendar-header">
                <h3>${currentYear}년 ${monthNames[currentMonth]}</h3>
            </div>
            <div class="calendar-body">
                <div class="calendar-weekdays">
                    <div>일</div>
                    <div>월</div>
                    <div>화</div>
                    <div>수</div>
                    <div>목</div>
                    <div>금</div>
                    <div>토</div>
                </div>
                <div class="calendar-days">
        `;
        
        // 이전 달의 날짜 채우기
        const firstDayIndex = firstDay.getDay();
        for (let i = 0; i < firstDayIndex; i++) {
            calendarHTML += `<div class="calendar-day prev-month"></div>`;
        }
        
        // 현재 달의 날짜 채우기
        for (let i = 1; i <= lastDay.getDate(); i++) {
            if (i === date.getDate()) {
                calendarHTML += `<div class="calendar-day today">${i}</div>`;
            } else {
                calendarHTML += `<div class="calendar-day">${i}</div>`;
            }
        }
        
        calendarHTML += `
                </div>
            </div>
        `;
        
        calendarContainer.innerHTML = calendarHTML;
        
        // 날짜 클릭 이벤트
        const calendarDays = document.querySelectorAll('.calendar-day:not(.prev-month)');
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                calendarDays.forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    // 할 일 목록 기능
    const todoForm = document.querySelector('.todo-form');
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    
    if (todoForm && todoInput && todoList) {
        todoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const todoText = todoInput.value.trim();
            if (todoText !== '') {
                addTodoItem(todoText);
                todoInput.value = '';
            }
        });
        
        // 로컬 스토리지에서 할 일 목록 불러오기
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        savedTodos.forEach(todo => {
            addTodoItem(todo.text, todo.completed);
        });
    }
    
    function addTodoItem(text, completed = false) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        if (completed) {
            todoItem.classList.add('completed');
        }
        
        todoItem.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span>${text}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        
        todoList.appendChild(todoItem);
        
        // 체크박스 이벤트
        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            todoItem.classList.toggle('completed');
            saveTodos();
        });
        
        // 삭제 버튼 이벤트
        const deleteBtn = todoItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            todoItem.remove();
            saveTodos();
        });
        
        saveTodos();
    }
    
    function saveTodos() {
        const todoItems = document.querySelectorAll('.todo-item');
        const todos = [];
        
        todoItems.forEach(item => {
            const text = item.querySelector('span').textContent;
            const completed = item.classList.contains('completed');
            todos.push({ text, completed });
        });
        
        localStorage.setItem('todos', JSON.stringify(todos));
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
}); 