/* 
  Throttling and debouncing give us control over the rate at which a function is called

  Debouncing will bunch a series of sequential calls to a function into a single call to that function. 
  It ensures that one notification is made for an event that fires multiple times.

  IN OTHER WORDS: 
  The debounced function will ignore all calls to it until the calls have stopped for a specified time period.
  Only then will it call the original function.
*/



// LEADING DEBOUNCE WAY
function debounce(func, timeout) {
    let timeId = null;
    
    return (...args) => {
        if (timeId !== null) {
          return;
        }

        func.apply(this, args);
        timeId = setTimeout(() => {
            timeId = null;
        }, timeout);
    }
}


// STANDARD WAY
function debounce(func, timeout) {
    let timeId = null;
    return (...args) => {
        clearTimeout(timeId);
        timeId = setTimeout(() => func.apply(this, args), timeout);
    }
}


const f = debounce((arg) => console.log('Fired!', arg), 100);
f(1); // вызвана
f(2); // проигнорирована
setTimeout(() => f(3), 50);  // проигнорирована (слишком рано)
setTimeout(() => f(4), 500); // вызвана (100 мс истекли)
setTimeout(() => f(5), 550); // проигнорирована (менее 100 мс с последнего вызова)

