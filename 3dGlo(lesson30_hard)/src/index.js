'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import getChangeImage from './modules/getChangeImage';
import validate from './modules/validate';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Таймер
countTimer();
// Меню
toggleMenu();
// Попап-окно
togglePopup();
// Табы
tabs();
// Слайдер
slider();
// Смена картинки по наведению
getChangeImage();
//Валидация
validate();
// Калькулятор
calc();
// send-ajax-form
sendForm();

