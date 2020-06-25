'use strict';

// Основные переменные
let startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
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
    targetMonthValue = document.querySelector('.target_month-value'),
    data = document.querySelector('.data');

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
  startButton.setAttribute('disabled', 'true');
}
const checkEmpty = function() {
  if(salaryAmount.value === '') {
    startButton.setAttribute('disabled', 'true');
  } else {
    startButton.removeAttribute('disabled');
  }
};

const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.start = function() {

  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();

  this.getExpensesMonth();
  this.getIncomeMonth();

  this.getAddExpenses();
  this.getAddIncome();

  this.getBudget();

  this.showResult();
};

 // Метод вывода результатов
AppData.prototype.showResult = function() {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSaveMoney();
  this.changePeriodValue();
  periodSelect.addEventListener('input', function() {
    incomePeriodValue.value = _this.calcSaveMoney();
  });
};
// Метод добавление полей по нажатию на expensesItemsButton
AppData.prototype.addExpensesBlock = function() {
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
};
// Метод добавление полей по нажатию на incomeItemsButton
AppData.prototype.addIncomeBlock = function() {
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
};
// Запись всех расходов в объект expenses
AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
// Запись всех дополнительных доходов в объект income
AppData.prototype.getIncome = function() {
  const _this = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
};
// Получение и запись возможных расходов
AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function(item) {
    item = item.trim();
    if(item !== '') {
      _this.addExpenses.push(item);
    }
  });
};
// Получение и запись возможных доходов
AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    if(itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function() {
  // Расчет суммы расходов
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getIncomeMonth = function() {
  // Расчет суммы дополнительного дохода
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getBudget = function() {
  // Расчет чистого дохода за месяц
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  // Расчет чистого дохода за день
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function() {
  // Расчет периода до цели
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {
  // Вывод статуса
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода! :D');
  } else if(this.budgetDay > 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода.');
  } else if(this.budgetDay >= 0 && this.budgetDay <= 600) { 
    return ('К сожалению у вас уровень дохода ниже среднего :(');
  }else {
    return ('Что то пошло не так :(');
  }
};
// Метод получения информации о депозите
AppData.prototype.getInfoDeposit = function() {
  if(this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
    }
    while(!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
    while(!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.changePeriodValue = function() {
  periodAmount.textContent = periodSelect.value;
};
AppData.prototype.calcSaveMoney = function() {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function() {
  // Доступ редактирования полей
  data.querySelectorAll('input[type="text"]').forEach(function(item) {
    item.removeAttribute('disabled');
    item.value = '';
  });

  // Смена кнопок
  startButton.style.display = 'block';
  cancelButton.style.display = 'none';

  // Сброс данных
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  for(let key in this.income) {
    delete this.income[key];
  }
  this.incomeMonth = 0;
  this.addIncome = [];
  for(let key in this.expenses) {
    delete this.expenses[key];
  }
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  periodSelect.value = 1;

  // Удаление добавленных блоков "Обязательные расходы"
  for(let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].remove();
  }
  if(expensesItems.length === 3) {
    expensesItemsButton.style.display = 'block';
  }
  
  // Удаление добавленных блоков "Дополнительного дохода"
  for(let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].remove();
  }
  if(incomeItems.length === 3) {
    incomeItemsButton.style.display = 'block';
  }

  // Сброс результатов
  this.showResult();
  checkEmpty();
};

AppData.prototype.eventListeners = function() {

// Расчет параметров
startButton.addEventListener('click', function() {
  // Привязка контекста к объекту appData
  appData.start.apply(appData);
  
  // Блокировка полей после рассчета
  data.querySelectorAll('input[type="text"').forEach(function(item) {
    item.setAttribute('disabled', true);
  });
  
  // Смена кнопок
  startButton.style.display = 'none';
  cancelButton.style.display = 'block';
  
  // Сброс данных
  cancelButton.addEventListener('click', appData.reset.bind(appData));
});

salaryAmount.addEventListener('input', checkEmpty);

// Добавление новых полей "Обязательные расходы"
expensesItemsButton.addEventListener('click', appData.addExpensesBlock);

// Добавление новых полей "Дополнительный доход"
incomeItemsButton.addEventListener('click', appData.addIncomeBlock);

// Смена значения "Период расчета" в зависимости от ползунка
periodSelect.addEventListener('input', appData.changePeriodValue);

// Валидация
validateRus('[placeholder="Наименование"]');
validateNumber('[placeholder="Сумма"]');

};

// Основные данные
const appData = new AppData();
appData.eventListeners();

