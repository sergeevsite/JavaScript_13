'use strict';

let optimizationText = function(text) {
  if(typeof text !== 'string') {
    return ('Вы ввели число. Введите строку!');
  }
  text = text.trim();
  if(text.length > 30) {
    return text.slice(0, 30) + '...';
  }else {
    return text;
  }
};

console.log(optimizationText(1));
console.log(optimizationText('       Здесь есть пробелы        '));
console.log(optimizationText('Тут больше 30 символов, поэтому нужны точки'));
