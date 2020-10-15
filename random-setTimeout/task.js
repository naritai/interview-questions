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