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

const scrollBtn = document.querySelector('a[href="#service-block"]');
scrollBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const section = document.querySelector('#service-block');
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

export default toggleMenu;