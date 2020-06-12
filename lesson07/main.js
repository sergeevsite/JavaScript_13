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
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function() {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'жкх, кредит, бензин');
      appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    accumulatedMonth: 0,
    getExpensesMonth: function() {
      let sum = 0;
      let test = function() {
        prompt('Введите обязательную статью расходов?', 'Статья');
        do {
          sum = prompt('Во сколько это обойдется?', 2000);
        }
        while(!isNumber(sum));
        return +sum;
      };
      for(let i = 0; i < 2; i++) {
        sum += test();
      }
      return sum;
    },
    getAccumulatedMonth: function() {
      return appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function() {
      return appData.mission / appData.accumulatedMonth;
    },
    getStatusIncome: function() {
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

console.log('Период равен ' +  appData.period + ' месяцев');
console.log('Цель заработать ' +  appData.mission + ' рублей');

appData.expensesMonth = appData.getExpensesMonth();

console.log('Общие расходы за месяц: ', appData.expensesMonth);
    
appData.accumulatedMonth = appData.getAccumulatedMonth();

if(appData.getTargetMonth() < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
}

appData.budgetDay = appData.accumulatedMonth / 30;
console.log('Дневной бюджет: ', Math.floor(appData.budgetDay));

console.log(appData.getStatusIncome());
