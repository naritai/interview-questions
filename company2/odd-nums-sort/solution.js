function sortOddNumbers(input) {
  const oddNums = [];

  input.forEach((num, idx) => {
    if (num % 2 !== 0) {
      oddNums.push(num);
    }
  });

  oddNums.sort((a, b) => a - b);

  return input.map((num) => {
    if (num % 2 !== 0) {
      return oddNums.shift();
    } 
    return num;
  });
}
