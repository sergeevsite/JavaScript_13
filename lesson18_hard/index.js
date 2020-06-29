'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const circle = document.getElementById('circle'),
        start = document.getElementById('start'),
        reset = document.getElementById('reset');

  let getRequest,
      frame = 0;
  let toggle = true;

  let animate = () => {
    getRequest = requestAnimationFrame(animate);
    frame++;
    circle.style.width = frame + 'px';
    circle.style.height = frame + 'px';
    circle.style.borderRadius = frame / 2 + '%';
    if(frame > 300) {
      cancelAnimationFrame(getRequest);
    }
  };

  start.addEventListener('click', () => {
    if(toggle) {
      getRequest = requestAnimationFrame(animate);
      toggle = false;
    } else {
      cancelAnimationFrame(getRequest);
      toggle = true;
    }
  });

  reset.addEventListener('click', () => {
    toggle = true;
    frame = 0;
    circle.style.width = 0;
    circle.style.height = 0;
    circle.style.borderRadius = 0;
    cancelAnimationFrame(getRequest);
  });

});
  

