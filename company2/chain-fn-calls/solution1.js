
// 1) recursion

const add = (outer) => {
	if (!outer) return 0;
	return (inner) => (typeof inner === 'number') ? add(outer + inner) : outer;
}

console.log('add() should be: 0', add());
console.log('add() should be: 0', add(0)());
console.log('add() should be: 0', add(0)(0)());
console.log('add(7)() should be: 7', add(7)());
console.log('add(7)(10)() should be: 17', add(7)(10)());
console.log('add(7)(10)() should be: 22', add(7)(10)(5)());


