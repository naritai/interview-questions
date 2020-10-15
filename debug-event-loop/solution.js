function debugEventLoop() {
  setTimeout(() => console.log('14'), 1000); // macrotask, запланирован раньше, чем в Promise ниже

  (new Promise((resolve) => {
    console.log('1'); // первый синхронный код внутри executor function
    setTimeout(resolve, 1000) // внутри микротаска планиурется macrotask!
  })).then(() => {
    console.log('15'); // последний macrotask, что был добавлен в очередь macrotasks
  }); 

  (new Promise((resolve) => resolve())).then(() => {
    console.log('5') // microtask 1
  });
  
  console.log('2'); // синхронный код

  setTimeout(() => console.log('11')); // macrotask без timeout первый среди macrotasks

  Promise.resolve().then(() => console.log('6')); // microtask 2
  Promise.reject().catch(() => console.log('7')); // microtask 3
  
  console.log('3'); // синхронный код

  requestAnimationFrame(() => {
    console.log('10'); // точно прошло 16ms, надо вызвать animation tasks перед Rendering pipe

    requestAnimationFrame(() => console.log('13')); // запланировать новый animation task на след. тик event loop
  });

  queueMicrotask(() => console.log('8')); // microtask 4
  queueMicrotask(() => console.log('9')); // microtask 5
  
  console.log('4'); // синхронный код
}

debugEventLoop();

/* 
  1) Выполнить все синхронные операции и запланировать выполнение 
  microtasks, macrotasks, animation frame tasks 
*/

/*
  2) Выполнить все microtasks, которые есть в очереди.
  Если в ходе выполнения добавляются новые microtasks - выполнить их тоже.
*/

/*
  3.1) Если прошло 16ms, то надо вызвать Rendering pipeline, значит надо прежде 
  выполнить animation frame tasks (накопившиеся в очереди). Если в ходе выполнения 
  добавляются новые animation tasks - их не выполнять (они на след. Rendering pipe).

  3.2) Если не прошло 16ms, выполнить следующий macrotask (В приоритете MouseEvents).
  После каждого macrotask проверяем, есть ли microtasks ? Если есть, то выполнить шаг 2.
  Если прошло 16ms, то выполнить шаг 3.1 (animation frame tasks), иначе повторить 3.2 (след. macrotask)
*/