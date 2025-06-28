# Async-JavaScript---Deep-Dive  

## - `setTimeout`

```js
setTimeout(() => {
  console.log(`Hello!`);
}, 2000);
```

## - `setInterval`

```js
let count = 0;
let interval = setInterval(() => {
  console.log(count);
  count++;
  if (count === 3) clearInterval(interval);
}, 1000);
```

![SetInterval](/Tutorial/adv-js1.png)

## - `fetch`

If you write code like this:

```js
fetch(`https://randomuser.me/api/`);
console.log("Hello!");
```

This line will execute even if data is yet to be fetched from the API.

To avoid this, you can write code like this:

```js
fetch(`https://randomuser.me/api/`)
  .then((raw) => raw.json())
  .then((readable) => console.log(readable.results))
  .then((readable) => console.log(readable.results[0]))
  .then((readable) => console.log(readable.results[0].gender));

// OR
fetch(`https://randomuser.me/api/`)
  .then((raw) => raw.json())
  .then((readable) => {
    console.log(readable.results);
    console.log(readable.results[0]);
    console.log(readable.results[0].gender);
  });
```

![Fetch](/Tutorial/adv-js2.png)

## - `axios`

Similar to fetch but more developer friendly:

```js
axios
  .get(`https://randomuser.me/api/`)
  .then((res) => console.log(res.data.results[0]));
```

![Axios](/Tutorial/adv-js3.png)

## - Promises

```js
new Promise((resolve, reject) => {
  fetch(`https://randomuser.me/api`)
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === "male") resolve();
      else reject();
    });
});
```

We discussed the "receipt (parchi)" concept:

```js
let receipt = new Promise((resolve, reject) => {
  fetch(`https://randomuser.me/api`)
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === "male") resolve();
      else reject();
    });
});

console.log(receipt); // Will show pending because it’s async

receipt
  .then(() => {
    console.log(`Green Button Clicked!`);
  })
  .catch(() => {
    console.log(`Red Button Clicked!`);
  });
```

![Promises](/Tutorial/adv-js4.png)
![Promises](/Tutorial/adv-js5.png)
![Promises](/Tutorial/adv-js6.png)

## - Callbacks

A callback is a function passed to another function to be called later.

```js
function abcd(a, b) {
  b();
}
abcd(1, function () {
  console.log("Callback Function");
});
```

### Use Case:

```js
function doSomeAsyncTask(url, callback) {
  fetch(url)
    .then((raw) => raw.json())
    .then((result) => {
      callback();
    });
}

doSomeAsyncTask("url", function () {
  console.log("Completed");
});
```

### Task - Get user data

```js
function getData(url, callback) {
  fetch(url)
    .then((raw) => raw.json())
    .then((result) => callback(result));
}

getData("https://randomuser.me/api/", (result) => {
  console.log(result.results[0].name);
  console.log(result.results[0].gender);
  console.log(result.results[0].email);
});
```

![Callback](/Tutorial/adv-js7.png)

## - Async / Await

### ❌ Wrong Code:

```js
let a = fetch(`https://randomuser.me/api/`);
console.log(a);
```

### ✅ Right Code:

```js
async function abcd() {
  let a = await fetch(`https://randomuser.me/api/`);
  a = await a.json();
  console.log(a);
}
abcd();
```

![Async/Await](/Tutorial/adv-js8.png)
![Async/Await](/Tutorial/adv-js9.png)

## - Event Loop

What it does: continuously checks whether the main stack is empty, and moves tasks from callback queue to main stack when ready.

![Event Loop](/Tutorial/adv-js10.png)

## - Callbacks vs Promises vs Async/Await

### By Callback:

```js
function dataFetcher(url, cb) {
  fetch(url)
    .then((raw) => raw.json())
    .then((result) => cb(result));
}

dataFetcher(`https://randomuser.me/api/`, (result) => {
  console.log(result.results[0].name);
  console.log(result.results[0].gender);
  console.log(result.results[0].email);
});
```

### By Promise:

```js
function dataFetcher(url) {
  let receipt = new Promise((resolve, reject) => {
    fetch(url)
      .then((raw) => raw.json())
      .then((result) => {
        resolve(result);
      });
  });
  return receipt;
}

dataFetcher(`https://randomuser.me/api/`).then((result) => {
  console.log(result);
});
```

### By Async/Await:

```js
async function dataFetcher(url) {
  let data = await fetch(url);
  let result = await data.json();
  return result;
}

async function getData() {
  const data = await dataFetcher(`https://randomuser.me/api/`);
  console.log(data);
}
getData();
```

## - Generators

```js
function* printNums() {
  console.log("Hello!");
  console.log("Function Started");
  console.log("Yield 1 Time");
  yield 1;
  console.log("Let's Go Yield 2");
  yield 2;
  console.log("Let's Go Yield 3");
  yield 3;
}

let ans = printNums();
console.log(ans.next().value);
ans.next();
ans.next();
ans.next();
```

### Print 1 to 10 using Generator:

```js
let count = 0;
function* Numbers() {
  for (let i = 1; i <= 10; i++) {
    yield i;
  }
}

let gen = Numbers();
console.log(gen.next().value);
console.log(gen.next().value);
```

### Print Prime Numbers using Generator:

```js
function* PrimeNums(n) {
  for (let i = 2; i <= n; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) yield i;
  }
}

let gen = PrimeNums(40);
console.log(gen.next().value);
console.log(gen.next().value);
```

## - Web Workers

![Web Workers](/Tutorial/adv-js12.png)
![Web Workers](/Tutorial/adv-js13.png)

### Working:

Create new file `worker.js` and import in `script.js` like:

```js
new Worker("worker.js");
```

### Example:

```js
let nums = Array.from({ length: 1000 }, (_, b) => (b = 1));

let worker = new Worker("worker.js");
worker.postMessage(nums);

worker.onmessage = function (data) {
  console.log(data.data);
};
```

**In `worker.js`**

```js
onmessage = function (data) {
  let ans = data.data.reduce((acc, elem) => elem + acc, 0);
  postMessage(ans);
};
```

![Web Workers](/Tutorial/adv-js14.png)

