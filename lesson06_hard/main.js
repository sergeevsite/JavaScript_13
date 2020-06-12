'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let message = 'Угадай число от 1 до 100';

// замыкание
function guessSecretNumber() {
  let secretNumber = 30,
      attempts = 10;
      
  return function() {

    // рекурсия
    function getUserNumber() {
      let userNumber = prompt(message);

      if (attempts === 1){
        let loser = confirm('Попытки закончились, хотите сыграть еще?');
        if (loser) {
          attempts = 10;
          message = 'Угадай число от 1 до 100';
          return getUserNumber();
        } else {
          alert('Спасибо за игру!')
          return false;
        }
      }

      if (userNumber === null) {
        alert('Спасибо за игру!')
        return false;
      } else {
        if (!isNumber(userNumber)) {
          message = 'Введи число от 1 до 100!';
          return getUserNumber();
        } else if (secretNumber < userNumber){
          attempts--;
          message = 'Загаданное число меньше, осталось ' + attempts + ' попыток';
          return getUserNumber();
        } else if (secretNumber > userNumber){
          attempts--;
          message = 'Загаданное число больше, осталось ' + attempts + ' попыток';
          return getUserNumber();
        } else {
          let winner = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
          if (winner) {
            attempts = 10;
            message = 'Угадай число от 1 до 100';
            getUserNumber();
          } else {
            alert('Спасибо за игру!')
            return false;
          }
        }
      }
    }
    getUserNumber();

  };
}

let start = guessSecretNumber();
start();

