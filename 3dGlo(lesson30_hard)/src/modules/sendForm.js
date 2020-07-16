const sendForm = () => {

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

  const forms = ['form1', 'form2', 'form3'];

  forms.forEach(idForm => {
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
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('Status network nor 200.');
            }
            statusMessages.textContent = successMessage;
            // Очистка полей
            form.querySelectorAll('input').forEach( item => {
              item.value = '';
            });
          })
          .catch((error) => {
            statusMessages.textContent = erorrMessage;
            console.log(error);
          })
      } else {
        statusMessages.textContent = validateMessage;
      }

    });
  });
  
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
  
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

 

};

export default sendForm;