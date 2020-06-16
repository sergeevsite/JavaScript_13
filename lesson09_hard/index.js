'use strict';

const outputTime = document.querySelectorAll('.time');

let date = new Date(),
    weekDaysWord = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    monthDaysWord = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'],
    weekDays = date.getDay(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

let timeFormat1 = 'Сегодня ' + weekDaysWord[weekDays] + ', ' + day + ' ' + monthDaysWord[month] + ' ' + year + ' года, ' + hours + ' час ' + minutes + ' минут ' + seconds + ' секунды';
let timeFormat2 = 1;

function changeDeclensionWords() {

}

outputTime[0].textContent = timeFormat1;
outputTime[1].textContent = date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();