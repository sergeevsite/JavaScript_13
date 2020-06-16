'use strict';

const startButton = document.getElementById('start'),
      income = document.querySelector('.income'),
      incomeItemsButton = income.querySelector('button'),
      expenses = document.querySelector('.expenses'),
      expensesItemsButton = expenses.querySelector('button'),
      checkDeposit = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      resultTotal = document.querySelectorAll('.result-total'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = income.querySelector('.income-title'),
      incomeAmount = income.querySelector('.income-amount'),
      expensesTitle = expenses.querySelector('.expenses-title'),
      expensesAmount = expenses.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');