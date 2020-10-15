/*
Даны 3 асинхронные функции со случайным setTimeout
Нужно написать код, который выведет в консоль:
A
B
C
*/

function foo(callback) {
  setTimeout(function() {
      callback('A');
  }, Math.random()*100); // 10ms
}

function bar(callback) {
  setTimeout(function() {
      callback('B');
  }, Math.random()*100); // 60ms
}

function baz(callback) {
  setTimeout(function() {
      callback('C');
  }, Math.random()*100); // 90ms
}

// 1)
foo((letter) => {
  console.log(letter);
  bar((letter) => {
    console.log(letter);
    baz((letter) => {
      console.log(letter);
    })
  })
});


// 2)
function run() {
  const results = [];

  foo((letter) => { results[0] = letter });
  bar((letter) => { results[1] = letter });
  baz((letter) => { results[2] = letter });

  setTimeout(() => {
    results.forEach(item => console.log(item));
  }, 100)
};

run();


// 3)
Promise.all([
  new Promise(foo),
  new Promise(bar),
  new Promise(baz),
]).then(results => {
  results.forEach(item => console.log(item));
})