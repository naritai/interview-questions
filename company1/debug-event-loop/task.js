/**
 * Replace N from console.log('N') to numbers so that they are displayed at browser console in a correct order.
 */

function debugEventLoop() {
  setTimeout(() => console.log('N'), 1000);

  (new Promise((resolve) => {
    console.log('N');
    setTimeout(resolve, 1000)
  })).then(() => {
    console.log('N');
  }); 

  (new Promise((resolve) => resolve())).then(() => {
    console.log('N')
  });
  
  console.log('N');

  setTimeout(() => console.log('N'));

  Promise.resolve().then(() => console.log('N'));
  Promise.reject().catch(() => console.log('N'));
  
  console.log('N');

  requestAnimationFrame(() => {
    console.log('N');

    requestAnimationFrame(() => console.log('N'));
  });

  queueMicrotask(() => console.log('N'));
  queueMicrotask(() => console.log('N'), 1000);
  
  console.log('N');
}