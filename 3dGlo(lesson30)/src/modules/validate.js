// Ввод только цифр
const validate = () => {
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
  
  fieldNumber('.calc-block');
}

export default validate;