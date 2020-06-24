'use strict';

const colorText = document.querySelector('.color-text'),
      colorButton = document.querySelector('.color-button');

const randomColor = function() {
  let color = '#' + Math.floor((Math.random() * 256)).toString(16) + Math.floor((Math.random() * 256)).toString(16) + Math.floor((Math.random() * 256)).toString(16);
  colorText.textContent = color;
  document.body.style.background = color;
};
randomColor();
colorButton.addEventListener('click', randomColor);
// function cc(){
// 	var r=Math.floor(Math.random() * (256));
// 	var g=Math.floor(Math.random() * (256));
// 	var b=Math.floor(Math.random() * (256));
// 	var c='#' + r.toString(16) + g.toString(16) + b.toString(16);
// 	return c;
	
// }

// console.log(cc());