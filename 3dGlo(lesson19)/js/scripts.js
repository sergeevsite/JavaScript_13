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
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul > li');

    // Открытие и закрытие меню
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    // События
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(item => item.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // Попап-окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close'),
          popupContent = popup.querySelector('.popup-content');
          
    // Анимация попап-окна
    let pixel = -50;
    popupContent.style.top = pixel;
    const openAnimate = () =>  {
      pixel++;
      popupContent.style.top = `${pixel}%`;
      let reqId = requestAnimationFrame(openAnimate);
      if(pixel === 10) {
        pixel = -50;
        cancelAnimationFrame(reqId);
      }
    };

    // Открытие окна
    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        openAnimate();
      });
    });

    // Закрытие окна
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

  };

  togglePopup();
});

