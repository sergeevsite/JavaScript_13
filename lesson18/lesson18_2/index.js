'use strict';

const greeting = document.getElementById('greeting'),
      weekToday = document.getElementById('weekToday'),
      timeToday = document.getElementById('timeToday'),
      newYear = document.getElementById('newYear');

const getTimeInfo = () => {
  const date = new Date();

  // Привествие
  const getGreeting = () => {
    const timeDayWords = ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи'];
    if(date.getHours() <= 12 && date.getHours() > 6) {
      return timeDayWords[0];
    } else if(date.getHours() > 12 && date.getHours() < 18) {
      return timeDayWords[1];
    } else if(date.getHours() > 18 && date.getHours() < 24){
      return timeDayWords[2];
    } else {
      return timeDayWords[3];
    }
  };
  
  // День недели
  const weekDaysWords = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],      
  weekDays = (date.getDay());

  // Остаток дней до Нового года
  
  let dayNewYear = new Date('01 January 2021').getTime();
  
  // Вывод данных
  greeting.textContent = getGreeting();
  weekToday.textContent = weekDaysWords[weekDays];
  timeToday.textContent = date.toTimeString().substring(0, 9);
  newYear.textContent = Math.floor(((dayNewYear - date.getTime()) / 1000) / 60 / 60 / 24);
};

getTimeInfo();
setInterval(getTimeInfo, 1000);
