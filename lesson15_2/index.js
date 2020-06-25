'use strict';

class First {
  hello() {
    console.log('Привет я метод родителя!');
  }
};
class Second extends First {
  hello() {
    new First().hello();
    console.log('А я наследуемый метод!');
  }
};

new Second().hello();