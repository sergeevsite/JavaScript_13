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
  document.body.appendChild(element);
  element.style.cssText = 'height: ' + this.height + 'px' + 
                        '; width: ' + this.width + 'px' +
                        '; background: ' + this.bg +
                        '; font-size: ' + this.fontSize + 'px' + 
                        '; position: absolute;';
};

DomElement.prototype.movePosition = function() {
  console.log(this.style);
};

window.addEventListener('DOMContentLoaded', function() {
  new DomElement('.selector', 100, 100, 'aqua').createElement();
  
  window.addEventListener('keydown', function(){
    new DomElement().movePosition();
  });
});
