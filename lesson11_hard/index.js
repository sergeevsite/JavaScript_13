'use strict';

// Основные переменные
let startButton = document.getElementById('start'),
    income = document.querySelector('.income'),
    incomeItemsButton = income.querySelector('button'),
    expenses = document.querySelector('.expenses'),
    expensesItemsButton = expenses.querySelector('button'),
    checkDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = income.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = expenses.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value');

// Функция проверки на число
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Функция проверки на строку
let isString = function(s) {
  return !isNaN(s) || s.trim() === '' || s === null;
};

// Проверка: Только русские буквы с пробелами и знаками
const validateRus = function(element) {
  document.querySelectorAll(element).forEach((item) => {
    item.addEventListener('input', function() {
      item.value = item.value.replace(/[^а-яА-Я\s\W]/, '');
    });
  });
};

// Проверка: Только цифры
const validateNumber = function(element) {
  document.querySelectorAll(element).forEach((item) => {
    item.addEventListener('input', function() {
      item.value = item.value.replace(/[^0-9]/, '');
    });
  });
};

// Проверка на пустоту Месячного дохода
if(salaryAmount.value === '') {
  startButton.setAttribute('disabled', 'disabled');
}
const checkEmpty = function() {
  if(salaryAmount.value === '') {
    startButton.setAttribute('disabled', 'disabled');
  } else {
    startButton.removeAttribute('disabled');
  }
};

// Основные данные
let appData = {
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {

      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();

      appData.getExpensesMonth();
      appData.getIncomeMonth();
      
      appData.getAddExpenses();
      appData.getAddIncome();

      appData.getBudget();

      appData.showResult();
    },
    // Метод вывода результатов
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = Math.ceil(appData.budgetDay);
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcSaveMoney();
      appData.changePeriodValue();
    },
    // Метод добавление полей по нажатию на expensesItemsButton
    addExpensesBlock: function() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesItemsButton);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3) {
        expensesItemsButton.style.display = 'none';
      }
      for(let i = 0; i < cloneExpensesItem.children.length; i++) {
        cloneExpensesItem.children[i].value = '';
      }
      validateRus('[placeholder="Наименование"]');
      validateNumber('[placeholder="Сумма"]');
    },
    // Метод добавление полей по нажатию на incomeItemsButton
    addIncomeBlock: function() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeItemsButton);
      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3) {
        incomeItemsButton.style.display = 'none';
      }
      for(let i = 0; i < cloneIncomeItem.children.length; i++) {
        cloneIncomeItem.children[i].value = '';
      }
      validateRus('[placeholder="Наименование"]');
      validateNumber('[placeholder="Сумма"]');
    },
    // Запись всех расходов в объект expenses
    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    // Запись всех дополнительных доходов в объект income
    getIncome: function() {
      incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });
    },
    // Получение и запись возможных расходов
    getAddExpenses: function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if(item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    // Получение и запись возможных доходов
    getAddIncome: function() {
      additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    getExpensesMonth: function() {
      // Расчет суммы расходов
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    },
    getIncomeMonth: function() {
      // Расчет суммы дополнительного дохода
      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    },
    getBudget: function() {
      // Расчет чистого дохода за месяц
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      // Расчет чистого дохода за день
      appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function() {
      // Расчет периода до цели

      return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function() {
      // Вывод статуса
      if (appData.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода! :D');
      } else if(appData.budgetDay > 600 && appData.budgetDay < 1200) {
        return ('У вас средний уровень дохода.');
      } else if(appData.budgetDay >= 0 && appData.budgetDay <= 600) { 
        return ('К сожалению у вас уровень дохода ниже среднего :(');
      }else {
        return ('Что то пошло не так :(');
      }
    },
    // Метод получения информации о депозите
    getInfoDeposit: function() {
      if(appData.deposit) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while(!isNumber(appData.percentDeposit));
        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while(!isNumber(appData.moneyDeposit));
      }
    },
    changePeriodValue: function() {
      periodAmount.textContent = periodSelect.value;
    },
    calcSaveMoney: function() {
      return appData.budgetMonth * periodSelect.value;
    }
  };

  
// Расчет параметров
startButton.addEventListener('click', appData.start);
salaryAmount.addEventListener('input', checkEmpty);

// Добавление новых полей "Обязательные расходы"
expensesItemsButton.addEventListener('click', appData.addExpensesBlock);

// Добавление новых полей "Дополнительный доход"
incomeItemsButton.addEventListener('click', appData.addIncomeBlock);

// Смена значения "Период расчета" в зависимости от ползунка
periodSelect.addEventListener('input', appData.showResult);

// Валидация
validateRus('[placeholder="Наименование"]');
validateNumber('[placeholder="Сумма"]');
