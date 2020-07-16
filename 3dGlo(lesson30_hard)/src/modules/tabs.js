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

export default tabs;