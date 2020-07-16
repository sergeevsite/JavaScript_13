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

export default slider;