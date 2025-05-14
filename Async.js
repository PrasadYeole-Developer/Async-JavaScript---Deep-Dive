// setTimeout(() => {
//   console.log(`Hello!`);
// }, 2000);

// let count = 0;
// let interval = setInterval(() => {
//   console.log(count);
//   count++;
//   if (count === 3) clearInterval(interval);
// }, 1000);

// fetch(`https://randomuser.me/api/`)
//   .then((raw) => raw.json())
//   .then((readable) => console.log(readable.results)) // then is used with fetch
//   .then((readable) => console.log(readable.results[0]))
//   .then((readable) => console.log(readable.results[0].gender));

//   // OR

// fetch(`https://randomuser.me/api/`)
//   .then((raw) => raw.json())
//   .then((readable) => {
//     console.log(readable.results); // logs array of results
//     console.log(readable.results[0]); // logs first user object
//     console.log(readable.results[0].gender); // logs gender of first user
//   });

// axios
//   .get(`https://randomuser.me/api/`)
//   .then((res) => console.log(res.data.results[0]));

// promises
// new Promise((resolve, reject) => {
//   fetch(`https://randomuser.me/api/`)
//     .then((raw) => raw.json())
//     .then((result) => {
//       if (result.results[0].gender === "male") resolve();
//       else reject();
//     });
// });

// callback
// function abcd(a, b) {
//   b();
// }
// abcd(1, function () {
//   console.log("Callback Function");
// });

// function getData(url, callback) {
//   fetch(url)
//     .then((raw) => raw.json())
//     .then((result) => callback(result));
// }
// getData("https://randomuser.me/api/", (result) => {
//   console.log(result.results[0].name);
//   console.log(result.results[0].gender);
//   console.log(result.results[0].email);
// });

// Async/Await
// let a = fetch(`https://randomuser.me/api/`);
// console.log(a);

// async function abcd() {
//   let a = await fetch(`https://randomuser.me/api/`);
//   a = await a.json();
//   console.log(a);
// }
// abcd();

// Event Loop

// Callback vs Promises vs Async/Await
// function dataFetcher(url, cb) {
//   fetch(url)
//     .then((raw) => raw.json())
//     .then((result) => cb(result));
// }
// dataFetcher(`https://randomuser.me/api/`, (result) => {
//   console.log(result.results[0].name);
//   console.log(result.results[0].gender);
//   console.log(result.results[0].email);
// });

// function dataFetcher(url) {
//   let receipt = new Promise((res, rej) => {
//     fetch(url)
//       .then((raw) => raw.json())
//       .then((result) => {
//         resolve(result);
//       });
//   });
//   return receipt;
// }
// dataFetcher(`https://randomuser.me/api/`).then((result) => {
//   console.log(result);
// });

// async function dataFetcher(url) {
//   let data = await fetch(url);
//   let result = await data.json();
//   return result;
// }

// async function getData() {
//   const data = await dataFetcher(`https://randomuser.me/api/`);
//   console.log(data);
// }
// getData();

// generators
// function* printNums() {
//   console.log("Hello!");
//   console.log("Function Started");
//   console.log("Yield 1 Time");
//   yield 1;
//   console.log("Let's Go Yield 2");
//   yield 2;
//   console.log("Let's Go Yield 3");
//   yield 3;
// }

// let ans = printNums();
// console.log(ans.next().value);
// ans.next();
// ans.next();
// ans.next();

// let count = 0;
// function* Numbers(){
//     for(let i = 1 ; i<=10 ; i++){
//         yield i;
//     }
// }

// let gen = Numbers();
// console.log(gen.next().value);
// console.log(gen.next().value);

// function* PrimeNums(n) {
//   for (let i = 2; i <= n; i++) {
//     let isPrime = true;
//     for (let j = 2; j <= Math.sqrt(i); j++) {
//       if (i % j === 0) {
//         isPrime = false;
//         break;
//       }
//     }
//     if (isPrime) yield i;
//   }
// }

// let gen = PrimeNums(40);
// console.log(gen.next().value);
// console.log(gen.next().value);

// let nums = Array.from({ length: 1000 }, (_, b) => (b = 1));
