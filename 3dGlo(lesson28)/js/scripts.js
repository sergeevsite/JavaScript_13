window.addEventListener('DOMContentLoaded', () => {
  'use strict';

   const convertClock = number => number = (number < 10) ? '0' + number : number;

  // Таймер
  const countTimer = deadline => {
    let timerHours = document.getElementById('timer-hours'),
        timerMinutes = document.getElementById('timer-minutes'),
        timerSeconds = document.getElementById('timer-seconds');

    // Расчет времени
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          return  { timeRemaining, hours, minutes, seconds };
    }

    // Вывод времени на страницу
    const updateClock = () => {
      let timer = getTimeRemaining();
      timerHours.textContent = convertClock(timer.hours);
      timerMinutes.textContent = convertClock(timer.minutes);
      timerSeconds.textContent = convertClock(timer.seconds);

      if(timer.timeRemaining < 0) {
        clearInterval(timerInterval);
        // Обнуление времени
        timerHours.textContent = convertClock(0);
        timerMinutes.textContent = convertClock(0);
        timerSeconds.textContent = convertClock(0);
      }
    }
    let timerInterval = setInterval(updateClock, 1000);
    // Для мгновенной подстановки времени
    updateClock();
  };

  countTimer('02 jule 2020');

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    // Открытие и закрытие меню
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    // События
    document.body.addEventListener('click', (event) => {
      let target = event.target;
      
      // Плавный сколл по клику в меню и закрытие
      if(target.classList.contains('close-btn')) {
        handlerMenu();
      }
      if(target.tagName === 'A' && target.parentNode.tagName === 'LI') {
        handlerMenu();
        event.preventDefault();
        const sectionId = target.getAttribute('href'),
        section = document.querySelector(sectionId);
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else if(target.closest('.menu')) {
        // Открытие меню по бургеру
        handlerMenu();
      } else {
        // Закрытие меню вне меню
        target = target.closest('.active-menu');
        if(!target) {
          menu.classList.remove('active-menu');
          target = event.target;
        }
      }
    });
  };

  toggleMenu();

  // Плавный скролл по кнопке
  const scrollBtn = document.querySelector('a[href="#service-block"]');
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const section = document.querySelector('#service-block');
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Попап-окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupContent = popup.querySelector('.popup-content');
          
    // Анимация попап-окна
    let pixel = -50;
    popupContent.style.top = pixel;
    const playAnimate = () =>  {
      pixel++;
      popupContent.style.top = `${pixel}%`;
      let reqId = requestAnimationFrame(playAnimate);
      if(pixel === 10) {
        pixel = -50;
        cancelAnimationFrame(reqId);
      }
    };

    // Открытие окна
    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if(window.innerWidth > 768) {
          playAnimate();
        }
      });
    });

    
    popup.addEventListener('click', (event) => {
      let target = event.target;

      // Закрытие окна
      if(target.classList.contains('popup-close')) {
        document.body.style.overflow = 'auto';
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if(!target) {
          document.body.style.overflow = 'auto';
          popup.style.display = 'none';
        }
      }
    });
  };

  togglePopup();

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabsContent = document.querySelectorAll('.service-tab');

    // Смена контета
    const toggleContent = (index) => {
      for(let i = 0; i < tabsContent.length; i++) {
        if(index === i) {
          tab[i].classList.add('active');
          tabsContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabsContent[i].classList.add('d-none');
        }
      }
    };

    // Клик по табу
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');

      if(target) {
        tab.forEach((item, i) => {
          if(item === target) {
            toggleContent(i);
          }
        });
      }
    });
  };

  tabs();

  // Слайдер
  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
          slide = document.querySelectorAll('.portfolio-item'),
          dotsList = document.querySelector('.portfolio-dots');

    let currentSlide = 0,
        interval;

    //Добавление точек
    const addDots = () => {
      let li = document.createElement('li');
      li.classList.add('dot');
      dotsList.appendChild(li);
    };
    
    for(let i = 0; i < slide.length; i++) {
      addDots();
    }

    let dot = document.querySelectorAll('.dot');
    dot[currentSlide].classList.add('dot-active');

    // Удаление активного класса
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    // Добавление активного класса
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    // Автозапуск слайдера
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    };

    // Запуск слайдера
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    // Остановка слайдера
    const stopSlide = () => {
      clearInterval(interval);
    };

    // Переключение слайдов с помощью кнопок
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if(!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')) {
        currentSlide++;
      }else if(target.matches('#arrow-left')) {
        currentSlide--;
      }else if(target.matches('.dot')){
        dot.forEach((item, index) => {
          if(item === target) {
            currentSlide = index;
          }
        });
      }

      if(currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if(currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      let target = event.target;
      if(target.matches('.portfolio-btn') || target.matches('.dot')) {
        stopSlide();
      }
      
    });
    slider.addEventListener('mouseout', (event) => {
      let target = event.target;
      if(target.matches('.portfolio-btn') || target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(50000);

  };

  slider();

  // Смена картинки по наведению
  const getChangeImage = () => {
    const imgCommand = document.querySelectorAll('.command__photo');

    imgCommand.forEach((image, index) => {
      image.addEventListener('mouseover', (e) => {
        let target = e.target;
        target.src = target.dataset.img;
      });
      image.addEventListener('mouseout', (e) => {
        let target = e.target;
        target.src = target.dataset.img.replace(/[0-9]a/, index + 1)
      });
    });

  };

  getChangeImage();

  // Валидация полей

    // Ввод только цифр
    const fieldNumber = (wrapper, selector) => {

      if(selector !== undefined) {
        selector = `input[name="${selector}"]`;
      } else {
        selector = 'input'
      }

      const form = document.querySelector(wrapper),
            fields = form.querySelectorAll(selector);

      fields.forEach( field => {
        field.addEventListener('input', () => {
          field.value = field.value.replace(/\D/, '');
        });
      });
    };

    // Валидация при отправке
    const fieldValidate = (idForm, attrName, type) => {

      const form = document.getElementById(idForm),
            field = form.querySelector( `input[name="${attrName}"]`);

      // Подстановка паттерна в зависимости от типа поля
      let pattern;
      if(type === 'phone') {
        pattern = /^\+?[78]([-()]*\d){10}$/ig;
      } else if(type === 'email') {
        pattern = /^\w+@\w+\.\w{2,}$/ig;
      }

      if(field.value.match(pattern) === null) {
        field.style.cssText = 'background-color: #ffcccc;';
        return field.value.match(pattern);
      } else {
        field.style.cssText = 'background-color: #fff;';
        return field.value.match(pattern);
      }
      
    };

   // Валидация при вводе
    const fieldValidateChange = (idForm, attrName, type) => {

      const form = document.getElementById(idForm),
            field = form.querySelector( `input[name="${attrName}"]`);

      // Подстановка паттерна в зависимости от типа поля
      let patternChange;
      if(type === 'phone') {
        patternChange = /[^\+\d]/;
      } else if(type === 'text_ru') {
        patternChange = /^\s?[^А-ЯЁа-яё]/ig;
      }

      field.addEventListener('input', () => {
        field.value = field.value.replace(patternChange, '');
      });

    };

  // Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcCount = document.querySelector('.calc-count'),
          calcDay = document.querySelector('.calc-day'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if(calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10
      }

      if(calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if(calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      
      
      if(typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      
      let start = +totalValue.textContent;
      let end = total;

      const animateCount = setInterval(() => {
            if(start > end) {
              total = start--;
              if(start < end) {
                clearInterval(animateCount);
              }
            } else {
              total = start++;
              if (start > end) {
              clearInterval(animateCount);
              }
            }
            totalValue.textContent = total;

          }, 5);
    };
    
    calcBlock.addEventListener('change', (event) => {
      let target = event.target;

      if(target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };
  
  fieldNumber('.calc-block');
  calc(100);

  // send-ajax-form
  const sendForm = (idForm) => {
    const erorrMessage = 'Что то пошло не так ...',
          successMessage = 'Спасибо! Мы скоро свяжемся с вами!',
          validateMessage = 'Данные введены не верно';

    const form = document.getElementById(idForm);

    fieldValidateChange(idForm, 'user_phone', 'phone');
    fieldValidateChange(idForm, 'user_email', 'email');
    fieldValidateChange(idForm, 'user_name', 'text_ru');
    fieldValidateChange('form2', 'user_message', 'text_ru');

    // Создаем элемент с текстом статуса
    const statusMessages = document.createElement('span');
    statusMessages.classList.add('messages');
    statusMessages.style.cssText = 'display: block; font-size: 14px;margin: 8px 0; color: white;';
    
    // Вешаем событие отправки
    form.addEventListener('submit', (event) => {

      event.preventDefault();
      form.appendChild(statusMessages);
      createPreloader(statusMessages.className);

      // Формируем данные к отправке
      const formData = new FormData(form);
      let body = {};

      formData.forEach((value, index) => {
        body[index] = value;
      });

      // Валидация
      const validPhone = fieldValidate(idForm, 'user_phone', 'phone'),
            validEmail = fieldValidate(idForm, 'user_email', 'email'),
            validName = fieldValidate(idForm, 'user_name', 'text_ru'),
            validMessage = fieldValidate('form2', 'user_message', 'text_ru');

      if(validPhone !== null && validEmail !== null && validName !== null && validMessage !== null) {
        // Вызываем отправку данных
        postData(body)
          .then(() => {
            statusMessages.textContent = successMessage;
            // Очистка полей
            form.querySelectorAll('input').forEach( item => {
              item.value = '';
            });
          })
          .catch(() => {
            statusMessages.textContent = erorrMessage;
          })
      } else {
        statusMessages.textContent = validateMessage;
      }

      
    });
  };

  const postData = (body) => {
    
    return new Promise((resolve, reject) => {
      // Создание запроса
      const request = new XMLHttpRequest();

      // Событие для отслеживания статуса
      request.addEventListener('readystatechange', () => {

        if(request.readyState !== 4) {
          return;
        }

        if(request.status === 200) {
          resolve();
        } else {
          reject(request.status);
        }

      });

      // Отправка данных через сервер
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      // Преобразование в JSON
      request.send(JSON.stringify(body));
    });
    
  }

  sendForm('form1');
  sendForm('form2');
  sendForm('form3');

  // Прелоадер
  const createPreloader = (classElement) => {
    const parent = document.querySelector(`.${classElement}`),
          wrapper = document.createElement('div');
    wrapper.classList.add('sk-three-bounce');
    parent.appendChild(wrapper);
    for(let i = 1; i < 4; i++) {
      const point = document.createElement('div');
      point.classList.add(`sk-bounce-${i}`, 'sk-child');
      wrapper.appendChild(point);
    }
  };

});
