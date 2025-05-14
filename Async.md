- SetTimeout

```
setTimeout(() => {
  console.log(`Hello!`);
}, 2000);
```

- SetInterval

```
let count = 0;
let interval = setInterval(() => {
  console.log(count);
  count++;
  if (count === 3) clearInterval(interval);
}, 1000);
```

![SetInterval](/Tutorial/adv-js1.png)

- Fetch

If you write code like this:

```
fetch(`https://randomuser.me/api/`);

console.log("Hello!"); // this line will execute even if data is yet to fetch from api
```

To avoid this you can write code like this:

```
fetch(`https://randomuser.me/api/`)
  .then((raw) => raw.json())
  .then((readable) => console.log(readable.results)) // then is used with fetch
  .then((readable) => console.log(readable.results[0]))
  .then((readable) => console.log(readable.results[0].gender));

  // OR

fetch(`https://randomuser.me/api/`)
  .then((raw) => raw.json())
  .then((readable) => {
    console.log(readable.results); // logs array of results
    console.log(readable.results[0]); // logs first user object
    console.log(readable.results[0].gender); // logs gender of first user
  });
```

![Fetch](/Tutorial/adv-js2.png)

- Axios

Similar to Fetch but it's more developer friendly you just have to use then once like this:

```
axios.get(`https://randomuser.me/api/`)
.then(res => console.log(res.data.results[0]));
```

![Axios](/Tutorial/adv-js3.png)

- Promises

![Promises](/Tutorial/adv-js4.png)
![Promises](/Tutorial/adv-js5.png)

```
new Promise((resolve, reject) => {
  fetch(`https://randomuser.me/api`)
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === "male") resolve();
      else reject();
    });
});
```

We discussed about that receipt(parchi) concept we can get that by doing :

```
let receipt = new Promise((resolve, reject) => {
  fetch(`https://randomuser.me/api`)
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === "male") resolve();
      else reject();
    });
});

console.log(receipt); // As this is synchronous code it will always execute before fetching the data and will show pending status (Avoid writing like this)

Below Whole Snippet will be right approach :

let receipt = new Promise((resolve, reject) => {
  fetch(`https://randomuser.me/api`)
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === "male") resolve();
      else reject();
    });
});

receipt
.then(()=>{
    console.log(`Green Button Clicked!`); // this will called when resolve will be called in Promise
})
.catch(()=>{
    console.log(`Red Button Clicked!`); // this will called when reject will be called in Promise
})
```

![Promises](/Tutorial/adv-js6.png)

---

- Callbacks

Callback is a function which is being pass to other function as an argument and when that other function will run then you use callback

```
function abcd(a, b) {
  b();
}
abcd(1, function () {
  console.log("Callback Function");
});
```

Usecase -

```
function doSomeAsyncTask(url, callback){
    fetch(`url`)
    .then(raw => raw.json)
    .then(result => {
        callback();
    })
}

doSomeAsyncTask("url", funtion(){
    console.log("Completed");
})
```

Task - (to get user data)

```
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

- Async/Await

Wrong Code -

```
let a = fetch(`https://randomuser.me/api/`);
console.log(a);
```

Right Code -

```
async function abcd() {
  let a = await fetch(`https://randomuser.me/api/`);
  a = await a.json();
  console.log(a);
}
abcd();
```

![Async/Await](/Tutorial/adv-js8.png)
![Async/Await](/Tutorial/adv-js9.png)

- Event Loop

What event loop does is to continously check whether the main stack is empty or not the moment main stack is empty will add all the tasks from callback queue one by one

![Event Loop](/Tutorial/adv-js10.png)

- Callbacks vs Promises vs Async/Await

Have to solve a Question by all of these 3

By Callback :

```
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

By Promise :

```
function dataFetcher(url) {
  let receipt = new Promise((res, rej) => {
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

By Async/Await :

```
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

- Generators

![Generators](/Tutorial/adv-js11.png)

```
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

Printing 1 to 10 with Generator

```
let count = 0;
function* Numbers(){
    for(let i = 1 ; i<=10 ; i++){
        yield i;
    }
}

let gen = Numbers();
console.log(gen.next().value);
console.log(gen.next().value);
```

Printing Prime Numbers using Generator

```
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

- Web Workers

![Web Workers](/Tutorial/adv-js12.png)
![Web Workers](/Tutorial/adv-js13.png)

Working :
Creating new file 'worker.js' & importing in 'script.js' like this :

`new Worker('worker.js');`

![Web Workers](/Tutorial/adv-js14.png)

`let nums = Array.from({ length: 1000 }, (_, b) => (b = 1));`

(In script.js)

```
let worker = new Worker("worker.js");
worker.postMessage(nums);

worker.onmessage = (function(data){
  console.log(data.data);
})
```

(In worker.js)

```
onmessage = function(data){
  let ans = data.data.reduce((acc, elem)=> elem+acc, 0);
  postMessage(ans);
}
```
