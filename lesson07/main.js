'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', 50000);
  }
  while(!isNumber(money));
};

start();

let appData = {
    budget: money,
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 3,
    asking: function() {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'жкх, кредит, бензин');
      appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      // Запись введенных данных в объект expenses
      let sum = 0;
      for(let i = 0; i < 2; i++) {
        let article = prompt('Введите обязательную статью расходов?', 'Статья' + i);
        do {
          sum = prompt('Во сколько это обойдется?', 2000);
          appData.expenses[article] = +sum;
        }
        while(!isNumber(sum));
      }
      appData.getExpensesMonth();
      appData.getBudget();
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
      // Расчет суммы расходов
      for (let key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
      }
    },
    getBudget: function() {
      // Расчет чистого дохода за месяц
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      // Расчет чистого дохода за день
      appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function() {
      // Расчет периода до цели
      let targetMonth = appData.mission / appData.budgetMonth;
      if(targetMonth < 0) {
        return 'Цель не будет достигнута';
      } else {
        return 'Цель будет достигнута за ' + Math.ceil(targetMonth) + ' месяцев';
      }
    },
    getStatusIncome: function() {
      // Расчет статуса
      if (appData.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода! :D');
      } else if(appData.budgetDay > 600 && appData.budgetDay < 1200) {
        return ('У вас средний уровень дохода.');
      } else if(appData.budgetDay >= 0 && appData.budgetDay <= 600) { 
        return ('К сожалению у вас уровень дохода ниже среднего :(');
      }else {
        return ('Что то пошло не так :(');
      }
    }
};

appData.asking();

console.log('Общие расходы за месяц: ', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for ( let key in appData) {
  console.log(key + ': ' + appData[key]);
}