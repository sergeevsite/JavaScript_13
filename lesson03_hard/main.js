'use strict';

let lang = 'ru';
let ru = ['Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'],
    en = ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'];

// a. Через if
if (lang === 'ru') {
  console.log(ru);
} else {
  console.log(en);
}

// b. Через switch-case 
switch (lang) {
  case 'ru':
    console.log(ru);
    break;
  case 'en':
    console.log(en);
    break;
}

// c. Через многомерный массив
let langs = [ru, en];
lang === 'ru' ? console.log(langs[0]) : console.log(langs[1]);


// Тернарный оператор
let namePerson = 'Артем';
    namePerson === 'Артем' ? console.log('Директор') : namePerson === 'Максим' ? console.log('Преподаватель') : console.log('Студент');