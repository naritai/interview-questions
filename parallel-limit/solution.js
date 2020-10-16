
/**
  You have an array of urls: ['url1', 'url2', ...] and concurency limit
  Write a function that will request this urls and execute callback with results: ['url1_answer', 'url2_answer', ...]
  
  - order of answers should be the same as urls
  - not more than limit parallel requests
  - add a caching (not to requst same url twice)
*/

function executor(url) {
  return function(resolve, reject) {
    setTimeout(() => {
      resolve(url);
    }, Math.random() * 5000);
  }
};

async function parallelLimit(urls, limit, callback) {
  let results = [];
  let uniqURLs = Array.from(new Set(urls));

  while (uniqURLs.length) {
    const nextSlice = uniqURLs.slice(0, limit);
    uniqURLs = uniqURLs.slice(limit);
  
    await Promise.all(
      nextSlice.map(url => new Promise(executor(url)))
    ).then(resolved => {
      results = [...results, ...resolved];
      console.log('resolved', resolved); // shows timing
    })
  }

  callback(results);
}

parallelLimit(
  [
    'url1_answer', 'url2_answer', 'url3_answer', 
    'url2_answer', 'url4_answer', 'url5_answer', 'url1_answer'
  ], 
  2, 
  (results) => {
  console.log(results)
});