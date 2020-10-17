/**
 * Дан массив точек с целочисленными координатами (x, y).
 * Определить, существует ли вертикальная прямая, 
 * делящая точки на 2 симметричных относительно этой прямой множества.
 * Note: Для удобства точку можно представлять не как массив [x, y], а как объект {x, y}
 */

isVertSym([[0, 0], [0, 0], [1, 1], [2, 2], [3, 1], [4, 0], [4, 0]]) // true
isVertSym([[0, 0], [0, 0], [1, 1], [2, 2], [3, 1], [4, 0]]) // false
isVertSym([]) // true
isVertSym([[0, 0]]) // true
isVertSym([[0, 0], [10, 0]]) // true
isVertSym([[0, 0], [11, 1]]) // false
isVertSym([[0, 0], [1, 0], [3, 0]]) // false

function isVertSym(list) {
    if (list.length <= 1) {
      return true;
    }
    if (list.length === 2) {
      return list[0][0] === list[1][0];
    }

    let result = true;
    const extraMidPoints = [];
    const horLinesPoints = {};
    const horLinesSumLastTwo = {};

    // Make a lines of uniq y points
    list.forEach(([x, y]) => {
      horLinesPoints[y] = horLinesPoints[y] ? [...horLinesPoints[y], [x, y]] : [[x, y]];
    });

    for (let key in horLinesPoints) {
      const line = horLinesPoints[key];
      // Sort each line by x point
      line.sort((a, b) => a[0] - b[0]); 

      let midPoint = null;
      const length = line.length;
      midPoint = Math.floor(length / 2);

      if (length % 2 !== 0) {
        extraMidPoints.push(line[midPoint]);
      }
    
      // Count boundary points sum
      for (let i = 0, j = length - 1; i < midPoint; i += 1, j -= 1) {
        const sum = line[i][0] + line[j][0];

        if (!horLinesSumLastTwo[key]) {
          horLinesSumLastTwo[key] = sum;
        } else if (horLinesSumLastTwo[key] !== sum) {
          return false; // Get out of the func
        }
      }
    }

    // Last checks
    const sumBase = horLinesSumLastTwo[0];
    result = Object.values(horLinesSumLastTwo).every(num => num === sumBase)
    const isExtraPoint = extraMidPoints.filter(([x]) => x !== sumBase / 2).length;

    return !!isExtraPoint || result;
}

isVertSym([[0, 0], [0, 0], [1, 1], [2, 2], [4, 0], [3, 1], [4, 0]]) 