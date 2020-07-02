window.addEventListener('DOMContentLoaded', () => {
  'use strict';

   const convertClock = number => number = (number < 10) ? '0' + number : number;

  // Таймер
  const countTimer = deadline => {
    let timerHours = document.getElementById('timer-hours'),
        timerMinutes = document.getElementById('timer-minutes'),
        timerSeconds = document.getElementById('timer-seconds');

    // Расчет времени
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          return  { timeRemaining, hours, minutes, seconds };
    }

    // Вывод времени на страницу
    const updateClock = () => {
      let timer = getTimeRemaining();
      timerHours.textContent = convertClock(timer.hours);
      timerMinutes.textContent = convertClock(timer.minutes);
      timerSeconds.textContent = convertClock(timer.seconds);

      if(timer.timeRemaining < 0) {
        clearInterval(timerInterval);
        // Обнуление времени
        timerHours.textContent = convertClock(0);
        timerMinutes.textContent = convertClock(0);
        timerSeconds.textContent = convertClock(0);
      }
    }
    let timerInterval = setInterval(updateClock, 1000);
    // Для мгновенной подстановки времени
    updateClock();
  };

  countTimer('02 jule 2020');

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    // Открытие и закрытие меню
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    // События
    document.body.addEventListener('click', (event) => {
      let target = event.target;
      
      // Плавный сколл по клику в меню и закрытие
      if(target.tagName === 'A') {
        handlerMenu();
        if(target.parentNode.tagName === 'LI') {
          event.preventDefault();
          const sectionId = target.getAttribute('href'),
          section = document.querySelector(sectionId);
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else if(target.closest('.menu')) {
        // Открытие меню по бургеру
        handlerMenu();
      } else {
        // Закрытие меню вне меню
        target = target.closest('.active-menu');
        if(!target) {
          menu.classList.remove('active-menu');
        }
      }
    });
  };

  toggleMenu();

  // Плавный скролл по кнопке
  const scrollBtn = document.querySelector('a[href="#service-block"]');
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const section = document.querySelector('#service-block');
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Попап-окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupContent = popup.querySelector('.popup-content');
          
    // Анимация попап-окна
    let pixel = -50;
    popupContent.style.top = pixel;
    const playAnimate = () =>  {
      pixel++;
      popupContent.style.top = `${pixel}%`;
      let reqId = requestAnimationFrame(playAnimate);
      if(pixel === 10) {
        pixel = -50;
        cancelAnimationFrame(reqId);
      }
    };

    // Открытие окна
    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if(window.innerWidth > 768) {
          playAnimate();
        }
      });
    });

    
    popup.addEventListener('click', (event) => {
      let target = event.target;

      // Закрытие окна
      if(target.classList.contains('popup-close')) {
        document.body.style.overflow = 'auto';
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if(!target) {
          document.body.style.overflow = 'auto';
          popup.style.display = 'none';
        }
      }
    });
  };

  togglePopup();

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabsContent = document.querySelectorAll('.service-tab');

    // Смена контета
    const toggleContent = (index) => {
      for(let i = 0; i < tabsContent.length; i++) {
        if(index === i) {
          tab[i].classList.add('active');
          tabsContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabsContent[i].classList.add('d-none');
        }
      }
    };

    // Клик по табу
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');

      if(target) {
        tab.forEach((item, i) => {
          if(item === target) {
            toggleContent(i);
          }
        });
      }
    });
  };

  tabs();
});
