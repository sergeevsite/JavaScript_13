'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let date = new Date().getDay();

for (let i = 0; i < week.length; i++) {
  if ((date - 1) === i) {
    console.log('%c' + week[i], 'font-weight: bold');
  } else if(i === 5 || i === 6){
    console.log('%c' + week[i], 'font-style: italic');
  } else {
    console.log(week[i]);
  }
}