module.exports = function getZerosCount(number, base) {
   // массив с простыми числами в интервале [2; 256];
    var simpleNumber = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79,
                      83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
                      179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251]; 

  // расскладываю base на простые множители;

  var multiplier = [];  //массив с простыми множителями, на которые расскладывается base;

  for (var i = 0; i < simpleNumber.length; i++){
    if (base % simpleNumber[i] !== 0) continue;
    multiplier.push(simpleNumber[i]);
    base = base / simpleNumber[i];
    i = i - 1;
    if (base == 1) break;
  };

// -------------------------

  var arr = [];   // если multiplier = [2,2,7], то arr = [2,1], т.к две "2" и одна "7";
  var counter = 1; // считает повторения
  for (var i = 0; i < multiplier.length; i++){
    if (multiplier[i] !== multiplier[i+1]){
      arr.push(counter);
      counter = 1;
    }else{
      counter++;      
    };  
  };

  //---------------------------

  var brr = [];  
  var res = 0; /* для number = 100 и multiplier[i] = 5  ==>  
                100/5 + 100/25 (5^3 < 100), res = 24;
              */
  for (var i = 0; i < multiplier.length; i++){
    if (multiplier[i] == multiplier[i-1]) continue;
    var copy = multiplier[i];
    for (copy; copy <= number; copy *= multiplier[i]){
      res = res + Math.floor(number/copy);
    };
    brr.push(res);
    res = 0;
  };

  //-----------------------------

  for (var i = 0; i < brr.length; i++){
    brr[i] = Math.floor(brr[i] / arr[i]);
  };

  // находим минимальное число в массиве brr;

  var min = brr[0];

  for (var i = 1; i < brr.length; i++){
    if (brr[i] < min){
      min = brr[i];
    };
  };

  return min;

/* n = 100; base = 28;
28 = 2*2*7 ;
100/2 + 100/4 + 100/8 +...+ 100/64 => 97; // складывать только целые части;  
100/7 + 100/49 => 16; // складывать только целые части;
97/2 => 48 (целая часть); // в знаменателе 2, т.к. две "2" при разложении 28;
16/1 = 16;
min (48,16) = 16; 
*/
};