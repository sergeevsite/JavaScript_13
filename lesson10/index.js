'use strict';

const books = document.querySelectorAll('.book');

//Восстановление порядка книг
books[0].before(books[1]);
books[0].after(books[4]);
books[4].after(books[3]);
books[5].after(books[2]);

//Замена картинки заднего фона
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправление заголовка в книге 3
books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

//Удаление рекламы
const adv = document.querySelector('.adv');
adv.remove();

//Восстановление порядка глав во второй книге с помощью after и before
const chaptersBookTwo = books[0].querySelectorAll('li');
chaptersBookTwo[9].after(chaptersBookTwo[2]);
chaptersBookTwo[4].before(chaptersBookTwo[8]);
chaptersBookTwo[3].after(chaptersBookTwo[6]);

//Восстановление порядка глав в пятой книге с помощью insertAdjacentElement
const chaptersBookFive = books[5].querySelectorAll('li');
chaptersBookFive[2].insertAdjacentElement('beforebegin', chaptersBookFive[9]);
chaptersBookFive[9].insertAdjacentElement('afterend', chaptersBookFive[3]);
chaptersBookFive[2].insertAdjacentElement('beforebegin', chaptersBookFive[4]);
chaptersBookFive[8].insertAdjacentElement('beforebegin', chaptersBookFive[5]);

//Добавление главы в шестую книгу и ее перемещение
// const listBookSix = .querySelector('ul');
const chapterSeven = books[2].querySelectorAll('li')[8];
const chapterEight = document.createElement('li');
chapterEight.textContent = 'Глава 8: За пределами ES6';
chapterSeven.insertAdjacentElement('afterend', chapterEight)

