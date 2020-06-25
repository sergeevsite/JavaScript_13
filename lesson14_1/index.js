'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.createElement = function() {
  let element;
  if(this.selector[0] === '.') {
    element = document.createElement('div'); 
    element.classList.add(this.selector.slice(1));
  }
  if(this.selector[0] === '#') {
    element = document.createElement('p');
    element.id = this.selector.slice(1);
  }
  let text = prompt('Напишите текст');
  document.body.appendChild(element);
  element.textContent = text;
  element.style.cssText = 'height: ' + this.height + 'px' + 
                        '; width: ' + this.width + 'px' +
                        '; background: ' + this.bg +
                        '; font-size: ' + this.fontSize + 'px';
};

new DomElement('.selector', 200, 200, 'aqua', 24).createElement();