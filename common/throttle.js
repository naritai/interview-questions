// I find a better analogy to be either the lottery, only one ball is drawn every five seconds
// With throttling, you may want one last invocation to happen after the throttle is over. 
// This will be one of the denied invocations. Imagine you order a drink in the 15th minute and get denied. 
// In the 45th minute, you don’t order but the barman sends a waiter over with the drink from that 15th minute order.


// ORIGINAL FN (WORK WITH DATES)
// save lastRan time
// for a new call set timeout like: limit - (Date.now() - lastRan)
const throttleOriginal = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    console.log('LAST RUN', lastRan);

    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now();
    } else {
      // after the very first call we'll always clear lastFunc and recalculate deltaLimit
      clearTimeout(lastFunc);

      // recalculate deltaLimit
      const deltaLimit = limit - (Date.now() - lastRan);

      // plan to run the last call
      lastFunc = setTimeout(function() {
      	  // why this if ? 
      	  // below we set MS like (limit - (Date.now() - lastRan)), 
      	  // so we definitely WAIT enough time untill we run next fn
          // if ((Date.now() - lastRan) >= limit) {
          //   func.apply(context, args);
          //   lastRan = Date.now();
          // }

          // we can do just
          func.apply(context, args);
          lastRan = Date.now();
       }, deltaLimit);
    }
  }
}


// CUSTOM
function throttle(fn, timeout) {
	let lastArgs, lastThis, timeId;

	const callFnWithArgs = (lastThis, lastArgs) => {
		timeId = setTimeout(() => {
			// clear timeId afler last call;
			timeId = null;
		}, timeout);
		return fn.apply(lastThis, lastArgs);
	}

	return (...args) => {
		lastArgs = args;
		lastThis = this;

		if (!timeId) {
			timeId = setTimeout(() => {
				timeId = null;

				// make last call
				if (lastArgs || lastThis) {
					return callFnWithArgs(lastThis, lastArgs);
				}
			}, timeout);

			// make first call
			const res = callFnWithArgs(lastThis, lastArgs);
			lastArgs = lastThis = null;
			return res;
		}

	}
}


function throttleLearnJS(fn, timeout) {
	let lastArgs, lastThis;
	let isThrottled = false;

	function wrapper (...args) {
		if (isThrottled) {
			lastArgs = args;
			lastThis = this;
			return;
		}

		fn.apply(lastThis, lastArgs);
		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;

			// если были вызовы, то вызвать последний раз
			if (lastArgs) {
			  wrapper.apply(lastThis, lastArgs);
				lastThis = lastArgs = null;
			}
		}, timeout);
	}

	return wrapper;
}



const f = throttleLearnJS((arg) => console.log(arg), 300);


f(1);
f(2); // ignored
setTimeout(() => f(3), 250); // ignored
setTimeout(() => f(4), 290); // invoked
setTimeout(() => f(5), 602); // invoked
setTimeout(() => f(6), 700); // ignored
setTimeout(() => f(7), 710); // invoked
setTimeout(() => f(8), 4000); // invoked

// output is:
// 1, 4, 5, 7, 8


// const f = throttleLearnJS((arg) => console.log(arg), 1000);

// f(1);
// f(2);






