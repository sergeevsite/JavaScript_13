const convertClock = number => number = (number < 10) ? '0' + number : number;

// Таймер
const countTimer = () => {
  const deadline = ('2020-07-17T00:00:00.000+09:00');
  console.log(deadline)
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

export default countTimer;