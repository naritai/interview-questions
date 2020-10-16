/**
 * Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits.
 * 
 * @examples
 * 12 ==> 21
 * 513 ==> 531
 * 2017 ==> 2071
 * 2231 ==> 
 */

function nextBiggerInteger(num) {
  const strNum = String(num);
  let length = strNum.length;

  for (let i = length - 1; i >= 0; i -= 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      if (strNum[i] > strNum[j]) {
        const arrNum = strNum.split('');
        arrNum[i] = strNum[j];
        arrNum[j] = strNum[i];
        return +arrNum.join('');
      }
    }
  }

  return num;
}

nextBiggerInteger(12);
nextBiggerInteger(513);
nextBiggerInteger(2071);
nextBiggerInteger(2231);
