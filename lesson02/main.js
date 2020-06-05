let money = 100000;
let income = 'Разработка сайтов';
let addExpenses = 'ЖКХ, кредит, интернет, продукты';
let deposit = true;
let mission = 1000000;
let period = 4;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' +  mission + ' рублей');
console.log(addExpenses.toLocaleLowerCase().split(', '));
let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);