'use strict';

let money = 100000;
let income = 'Разработка сайтов';
let addExpenses = 'ЖКХ, кредит, интернет, продукты';
let deposit = true;
let mission = 1000000;
let period = 4;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' +  mission + ' рублей');

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = prompt('Во сколько это обойдется?');

console.log(addExpenses.toLocaleLowerCase().split(', '));

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

let budgetDay = budgetMonth / 30;
console.log('Дневной бюджет: ', Math.floor(budgetDay));

let term = mission / budgetMonth;
console.log('Цель будет достигнута за ' + Math.ceil(term) + ' месяцев');

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода! :D');
} else if(budgetDay > 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода.');
} else if(budgetDay >= 0 && budgetDay <= 600) { 
  console.log('К сожалению у вас уровень дохода ниже среднего :(');
}else {
  console.log('Что то пошло не так :(');
}