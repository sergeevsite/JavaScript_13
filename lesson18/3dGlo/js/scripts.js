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

      if(timer.timeRemaining <= 1) {
        clearInterval(timerInterval);
      }
    }
    let timerInterval = setInterval(updateClock, 1000);
    // Для мгновенной подстановки времени
    updateClock();
  };

  countTimer('01 jule 2020');
});