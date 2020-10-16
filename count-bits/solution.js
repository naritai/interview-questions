/**
 * Create a function that takes an positive integer as input, and returns the number of bits that are equal to one in the binary representation of that number.
 * 
 * @example
 * 1234 ==> 5 (as 1234 = 0b10011010010)
 * 
 */

// 1)
// function countBits(num) {
//   return [...num.toString(2)].filter(i => i === '1').length;
// }

// 2)
// function countBits(num) {
//   return num.toString(2).match(/1/g).length // при g возвращает массив всех совпадений
// }

// 3)
// function countBits(num) {
//   let counter = 0;
//   while (num > 0) {
//     // логическое И сравнит попарно бит с битом числа (заранее представив их в 32-битном двоичном виде)
//     // 00000000000000000010011010010 & 000000000000000000000000000001
//     // последнее сравнение вернет 1 только когда оба бита будут 1 (и это будет приведено к логическому типу для if)
//     if (num & 1) { 
//       counter += 1;
//     }

//     // Cдвигаеv 1 бит вправо, отбрасывая его. 
//     // При этом слева добавляется копия крайнего-левого бита. (сохраняем знак)
//     num = num >> 1;
//   }
//   return counter;
// }