'use strict';

const registartion = document.getElementById('reg'),
      login = document.getElementById('login'),
      usersList = document.getElementById('usersList');

const dataUsers = [
  {
    userName: '',
    userSurname: '',
    userLogin: '',
    userPassword: '',
    userDate: ''
  }
];

let isString = function(s) {
  return !isNaN(s) || s.trim() === '' || s === null;
};

const regUser = () => {
  let dataName;
  do {
    if(dataName === null) {
      return;
    }
    dataName = prompt('Введите через пробел Имя и Фамилия');
  }
  while(isString(dataName) || (/\s+/g.test(dataName)));
  let dataLogin = prompt('Введите логин');

};

registartion.addEventListener('click', regUser)