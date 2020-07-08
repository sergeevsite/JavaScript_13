class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector); // id, class, tag
    this.pattern = pattern; // свои шаблоны для валидации
    this.method = method; // поля для валидации и методы для них
    // Получение полей
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    });
    this.error = new Set();
  }

  // Запуск валидатора
  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.elementsForm.forEach(elem => this.chekIt({target: elem}));
      if(this.error.size) {
        e.preventDefault();
      }
    });
  }

  // Статус валидации
  isValid(elem) {
    const validatorMethod = {
      // Метод на пустую строку
      notEmpty(elem) {
        if(elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      // Метод проверяет значение поля
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if(this.method) {
      const method = this.method[elem.id];
  
      if(method) {
        return method.every(item => {
          return validatorMethod[item[0]](elem, this.pattern[item[1]]);
        })
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки')
    }

    return true;
  }

  // Проверка на валидность полей
  chekIt(event) {
    const target = event.target;
    if(this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  // Получаем ошибку при валидации
  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    // создание ошибки
    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
    errorDiv.parentElement.style.position = 'relative';
  }
  
  // Получаем пройденую валидацию
  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    // удаление ошибки
    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  // Стили
  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green;
      }
      input.error {
        border: 2px solid red;
      }
      .validator-error {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        padding: 2px 5px;
        background: #E53935;
        color: #fff;
      }
    `;
    document.head.appendChild(style);
  }

  // Установка паттернов (регулярок)
  setPattern() {
    if(!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if(!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}