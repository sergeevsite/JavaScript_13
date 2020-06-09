'use strict';

let money = 100000;
let income = 'Разработка сайтов';
let addExpenses = 'ЖКХ, кредит, интернет, продукты';
let deposit = true;
let mission = 1000000;
let period = 4;

let showTypeOf = function(data) {
  return console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' +  mission + ' рублей');

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = prompt('Во сколько это обойдется?');

    
let getExpensesMonth = function() {
  return +amount1 + +amount2;
}
console.log('Общие расходы за месяц: ', getExpensesMonth());
    
console.log(addExpenses.toLocaleLowerCase().split(', '));

let getAccumulatedMonth = function() {
  return money - getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  return mission / accumulatedMonth;
}
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяцев');

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
}

console.log(getStatusIncome());
