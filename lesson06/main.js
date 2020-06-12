'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let message = 'Угадай число от 1 до 100';

// замыкание
function guessSecretNumber() {
  let secretNumber = 30;
  
  return function() {

    // рекурсия
    function getUserNumber() {
      let userNumber = prompt(message);
      
      if (userNumber === null) {
        return false;
      } else {
        if (!isNumber(userNumber)) {
          message = 'Введи число от 1 до 100!';
          return getUserNumber();
        } else if (secretNumber < userNumber){
          message = 'Загаданное число меньше';
          return getUserNumber();
        } else if (secretNumber > userNumber){
          message = 'Загаданное число больше';
          return getUserNumber();
        } else {
          alert('Верно!');
        }
      }
    }
    getUserNumber();

  };
}

let start = guessSecretNumber();
start();

