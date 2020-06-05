let num = 266219,
    mul = 1;

num = num.toString().split('');
for( i = 0; i < num.length; i++ ) {
  mul *= num[i];
}

let sqrt = mul ** 3;
alert(sqrt.toString().slice(0, 2));