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
    additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
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
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Функция проверки на строку
const isString = (s) => {
  return !isNaN(s) || s.trim() === '' || s === null;
};

// Проверка: Только русские буквы с пробелами и знаками
const validateRus = (element) => {
  document.querySelectorAll(element).forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^а-яА-Я\s\W]/, '');
    });
  });
};

// Проверка: Только цифры
const validateNumber = (element) => {
  document.querySelectorAll(element).forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^0-9]/, '');
    });
  });
};

// Проверка на пустоту Месячного дохода
if(salaryAmount.value === '') {
  startButton.setAttribute('disabled', 'true');
}
const checkEmpty = () => {
  if(salaryAmount.value === '') {
    startButton.setAttribute('disabled', 'true');
  } else {
    startButton.removeAttribute('disabled');
  }
};

class AppData {
  constructor() {
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
  }

  start() {

    this.budget = +salaryAmount.value;
    // this.getExpenses();
    // this.getIncome();

    this.getExpInc();

    this.getExpensesMonth();
    this.getIncomeMonth();

    // this.getAddExpenses();
    // this.getAddIncome();
    this.getAddExpInc();

    this.getBudget();

    this.showResult();
  };

  // Метод вывода результатов
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSaveMoney();
    this.changePeriodValue();
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcSaveMoney();
    });
  };

  // Метод добавление полей по нажатию на плюс
  addExpIncBlock(event) {
    let itemsBlock = event.target.parentNode.children[1],
        cloneItem = itemsBlock.cloneNode(true),
        itemsButton = event.target;
    itemsBlock.parentNode.insertBefore(cloneItem, itemsButton);
    itemsBlock = document.querySelectorAll(`.${itemsBlock.parentNode.className}-items`);
    if(itemsBlock.length === 3) {
      itemsButton.style.display = 'none';
    }
    for(let i = 0; i < cloneItem.children.length; i++) {
      cloneItem.children[i].value = '';
    }
    validateRus('[placeholder="Наименование"]');
    validateNumber('[placeholder="Сумма"]');
  };
  // Запись всех расходов и доходов
  getExpInc() {
    const getItems = (item) => {
      const str = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${str}-title`).value;
      const itemAmount = item.querySelector(`.${str}-amount`).value;
      if(itemTitle !== '' && itemAmount !== '') {
        this[str][itemTitle] = itemAmount;
      }
    }
    document.querySelectorAll('.expenses-items').forEach(getItems);
    document.querySelectorAll('.income-items').forEach(getItems);
  }
  // Получение и запись возможных расходов и доходов
  getAddExpInc() {
    const getAddItems = (item, i, array) => {
      item.value.split(',');
      let itemValue = item.value.trim();
      if(itemValue !== '') {
        if(array.length > 1) {
          this.addExpenses.push(itemValue);
        } else {
          this.addIncome.push(itemValue);
        }
      }
    }
    additionalIncomeItem.forEach(getAddItems);
    additionalExpensesItem.forEach(getAddItems);
  }
  getExpensesMonth() {
    // Расчет суммы расходов
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  };
  getIncomeMonth() {
    // Расчет суммы дополнительного дохода
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };
  getBudget() {
    // Расчет чистого дохода за месяц
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    // Расчет чистого дохода за день
    this.budgetDay = this.budgetMonth / 30;
  };
  getTargetMonth() {
    // Расчет периода до цели
    return targetAmount.value / this.budgetMonth;
  };
  getStatusIncome() {
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
  getInfoDeposit() {
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
  changePeriodValue() {
    periodAmount.textContent = periodSelect.value;
  };
  calcSaveMoney() {
    return this.budgetMonth * periodSelect.value;
  };
  reset() {
    // Доступ редактирования полей
    data.querySelectorAll('input[type="text"]').forEach((item) => {
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

  eventListeners() {

    // Расчет параметров
    startButton.addEventListener('click', () => {
      // Привязка контекста к объекту appData
      this.start.apply(this);
      
      // Блокировка полей после рассчета
      data.querySelectorAll('input[type="text"').forEach((item) => {
        item.setAttribute('disabled', true);
      });
      
      // Смена кнопок
      startButton.style.display = 'none';
      cancelButton.style.display = 'block';
      
      // Сброс данных
      cancelButton.addEventListener('click', this.reset.bind(this));
    });

    salaryAmount.addEventListener('input', checkEmpty);

    // Добавление новых полей "Обязательные расходы"
    expensesItemsButton.addEventListener('click', this.addExpIncBlock);

    // Добавление новых полей "Дополнительный доход"
    incomeItemsButton.addEventListener('click', this.addExpIncBlock);

    // Смена значения "Период расчета" в зависимости от ползунка
    periodSelect.addEventListener('input', this.changePeriodValue);

    // Валидация
    validateRus('[placeholder="Наименование"]');
    validateNumber('[placeholder="Сумма"]');

  };
};
// Основные данные
const appData = new AppData();
appData.eventListeners();

