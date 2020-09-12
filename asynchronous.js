(function () {
  console.log("this is the start");

  setTimeout(function cb() {
    console.log("this is a msg from callBack firs");
  });

  console.log("this is just a message");

  setTimeout(function cb1() {
    console.log("this is a msg from callBack second");
  }, 0);

  new Promise((resolve) => resolve())
    .then(() => console.log("this is firs then of promis"))
    .then(() => console.log("this is second then of promis"))
    .then(() => {
      setTimeout(() => {
        console.log("this is a msg from callBack third");
      }, 0);
      let sum = 0;
      for (let i = 0; i < 10000; i++) {
        sum += i;
      }
      console.log(`sum: ${sum}`);
      console.log("this is third then of promis");
    })
    .then(() => console.log("this is fourth then of promis"))
    .then(() => console.log("this is fifth then of promis"))
    .catch(() => console.log("this is catch of promis"));

  console.log("this is the end");
})();

// synchronous code
// "this is the start"
// "this is just a message"
// "this is the end"

// asynchronous code

// micro task
// "this is firs then of promis"
// "this is second then of promis"

// macro task
// "this is a msg from call back"
// "this is a msg from call back1"

// We can call the function not at the moment, but later, after a specified time interval. This is called call scheduling.

// function sayHi(name) {
//   console.log(`Hello ${name || ""}`);
// }

// setTimeout(sayHi, 100); // Hello after 100ms
// setTimeout(sayHi, 200, "Eugene"); // Hello Eugene after 200ms

// setTimeout("console.log('Hello String')", 300); // Hello after 300ms

// // The setTimeout call returns a "timer ID" timerId, which can be used to cancel further execution.
// const t = setTimeout(sayHi, 1000); // Hello after 1s, not showed
// setTimeout(() => clearTimeout(t), 500); // cencel timer on 49 line

// // recursive setTimeout
// let ti = setTimeout(function tick() {
//   console.log("tick setTimeout");
//   setTimeout(tick, 2000);
// }, 2000);

// const tim = setInterval(function () {
//   console.log("tick setInterval");
// }, 2000);

// setTimeout(() => {
//   clearTimeout(ti);
//   clearTimeout(tim);
// }, 10000);

// The actual delay between calls to func using setInterval is less than what the code says!

// When a function is passed to setInterval / setTimeout, an internal reference is created to it and stored in the scheduler. This prevents the function from ending up in the garbage collector, even if there are no other references to it.

// Worker is an object created by a constructor (for example, Worker ()) and launching a named JavaScript file - this file contains the code that will be executed in the Worker's thread; Workers objects are launched in a different global context, different from the current one - window. Therefore, using the window variable to get the current global context (instead of self) inside the Worker will return an error.

// Creating a new worker is easy. All you need to do is call the Worker () constructor, specifying the script URI for execution in the worker thread (main.js):

// const myWorker = new Worker("worker.js");
