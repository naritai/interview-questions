// 2) counter
const add = (outer) => {
	let counter = 0;

	const iter = (inner) => {
		if (typeof inner === 'number') {
			counter += inner;
			return iter;
		} else {
			return counter;
		}
	}

	return outer === undefined ? counter : iter(outer);
}



console.log('add() should be: 0', add());
console.log('add() should be: 0', add(0)());
console.log('add() should be: 0', add(0)(0)());
console.log('add(7)() should be: 7', add(7)());
console.log('add(7)(10)() should be: 17', add(7)(10)());
console.log('add(7)(10)() should be: 22', add(7)(10)(5)());


