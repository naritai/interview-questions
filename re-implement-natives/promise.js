

class SimplePromise {
  constructor(executionFunction) {
    this.status = 'pending';
    this.result = null;
    this.error = null;
    this.errorHandlerSaved = false;
    this.handlers = [];

    executionFunction(this.resolve, this.reject);
  }

  resolve = (result) => {
    this.status = 'fulfilled';
    this.result = result;
    this.handlers
      .filter(cb => cb.type === 'fulfilled' || cb.type === 'finally')
      .forEach(cb => cb.fn(this.result));
  }

  reject = (error) => {
    this.status = 'rejected';
    this.error = error;
    this.handlers
      .filter(cb => cb.type === 'rejected' || cb.type === 'finally')
      .forEach(cb => cb.fn(this.error));
  }

  then = (resolveHandler, errorHandler) => {    
    if (this.status === 'pending') {
      this.handlers.push({ type: 'fulfilled', fn: resolveHandler });
      if (errorHandler) {
        this.handlers.push({ type: 'rejected', fn: resolveHandler });
      }
    } else if (this.status === 'fulfilled') {
      resolveHandler(this.result);
    } else if (this.status === 'rejected') {
      if (errorHandler) {
        errorHandler(this.error);
      }
    }
    return this;
  }

  catch = (errorHandler) => { 
    // there is only one error handler can run!
    if (this.status === 'pending' && !this.errorHandlerSaved) {
      this.handlers.push({ type: 'rejected', fn: errorHandler });
      this.errorHandlerSaved = true;
    } else if (this.status === 'rejected') {
      errorHandler(this.error);
    } else 
    return this;
  }

  finally = (fulfilledCallback) => {
    // finally callbacks run always: before and after .then and .catch plus, with order save behaviour.
    if (this.status === 'pending') {
      this.handlers.push({ type: 'finally', fn: fulfilledCallback }); 
    } else if (this.status === 'fulfilled') {
      fulfilledCallback();
    }
    return this;
  }
}

const request = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve('success')
    } else {
      reject(new Error('Some error happened'));
    }
  }, 1000);
});

// TEST
request.then(console.log)
  .then(data => console.log('First .then + data :', data))
  .finally(() => console.log('Finally before .catch'))
  .catch(console.log)
  .finally(() => console.log('This is a second finally!'))
  .then(data => console.log('New .then after second finally!', data))
  .finally(() => console.log('Third finally!'))
  .catch(error => console.log("Should NOT see me, I'm the second .catch! ", error))
  .finally(() => console.log("I'm the last finally after second .catch that you shouldn't see"))
  .then(data => console.log('Last .then woth data :', data));


// Real promises work
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (Math.random() < 0.5) {
//       reject(new Error('Some error'))
//     } else {
//       resolve('Happy result!');
//     }
//   }, 1000)
// })
// .then(console.log)
// .finally(data => console.log('FINALLY :', data))
// .then(data => {
//     console.log('Another then');
//     console.log('Data in new then :', data);
// })
// .catch(console.log)
// .catch(error => console.log('Second error handler :', error))
// .finally(() => console.log('Finally after last catch'))