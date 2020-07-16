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

export default togglePopup;