'use strict';

const fieldDate = document.querySelectorAll('.time');

// Функция добавляет 0 перед значениями, которые состоят из одной цифры
function convertClock(number) {
  return number = (number < 10) ? '0' + number : number;
}
// Функция преобразует слова в зависимости от числа
function changeDeclensionWords(number, word) {
  let n1 = number % 10;
  if (number === 11 || n1 === 0 || n1 >= 5 || number >= 12 && number <= 19) return word[2];
  if (n1 === 1) return word[0];
  if (n1 > 1 && n1 < 5) return word[1];
}

function outputDate() {
  // Переменные даты
  let date = new Date(),
      weekDaysWord = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      monthDaysWord = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Ноября', 'Декабря'],
      weekDays = date.getDay(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

// Вывод первого формата
fieldDate[0].textContent = 'Сегодня ' + weekDaysWord[weekDays] + ', ' + day + ' ' + monthDaysWord[month] + ' ' + year + ' года, ' + hours + changeDeclensionWords(hours, [' час', ' часа', ' часов']) + ' ' + minutes + changeDeclensionWords(minutes, [' минута', ' минуты', ' минут']) + ' ' + seconds + changeDeclensionWords(seconds, [' секунда', ' секунды', ' секунд']);

// Вывод второго формата
fieldDate[1].textContent = convertClock(day) + '.' + convertClock(month) + '.' + year + ' - ' + convertClock(hours) + ':' + convertClock(minutes) + ':' + convertClock(seconds);

}

outputDate();
setInterval(outputDate, 1000);