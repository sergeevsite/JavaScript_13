'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Разработка сайтов';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 4;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
};

start();

let showTypeOf = function(data) {
  return console.log(typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' +  mission + ' рублей');

let getExpensesMonth = function() {
  let sum;
    do {
      sum = prompt('Во сколько это обойдется?');
    }
    while(!isNumber(sum));
    
    do {
      sum = prompt('Во сколько это обойдется?');
    }
    while(!isNumber(sum));

    // do {
    //   sum = '';
    //   sum += prompt('Во сколько это обойдется?');
    // }
    // while(!isNumber(sum));
  //   prompt('Введите обязательную статью расходов?');
  //   sum += +prompt('Во сколько это обойдется?');
  return sum;
};


let expensesAmount = getExpensesMonth();

console.log('Общие расходы за месяц: ', expensesAmount);
    
console.log(addExpenses.toLocaleLowerCase().split(', '));

let getAccumulatedMonth = function() {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  
  return mission / accumulatedMonth;
};
let outputTargetMonth = (Math.ceil(!getTargetMonth()) < 0) ? 
'Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяцев' : 
'Цель не будет достигнута';

console.log(outputTargetMonth);

let budgetDay = accumulatedMonth / 30;
console.log('Дневной бюджет: ', Math.floor(budgetDay));

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода! :D');
  } else if(budgetDay > 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода.');
  } else if(budgetDay >= 0 && budgetDay <= 600) { 
    return ('К сожалению у вас уровень дохода ниже среднего :(');
  }else {
    return ('Что то пошло не так :(');
  }
};

console.log(getStatusIncome());
