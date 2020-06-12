'use strict';

// 1.
let arr = [200, 112, 4682, 22457, 312, 43198, 129354];
arr.forEach(function(item) {
  if(item.toString()[0] === '2' || item.toString()[0] === '4') {
    console.log(item);
  }
});

// 2.
let i,n;

for ( i = 2; i <= 100; i++ ) {
  for ( n = 2; n <= i; n++ ) {
    if ( i % n === 0) {
      break;
    } 
  }
  if ( n === i ) {
    console.log('Делители этого числа: ' + i + ' и ' + n);
  } 
}