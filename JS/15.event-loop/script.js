// Synchronous Code
// Call Stack
console.log("1");
console.log("2");
console.log("3");

// Asynchronous Code
// Task Queue
console.log("1");
setTimeout(function () {
  console.log("2");
}, 0);
console.log("3");

// 1
// 2
// 3

// Asynchronous Promises Code
// Micro-task Queue
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then(function a(response) {
    console.log("Fetch completed:", response[0]);
  })
  .catch(function c(error) {
    console.error("Fetch error:", error);
  });

Promise.resolve().then(function b() {
  console.log("Promise resolved");
});

Promise.reject().catch(function c() {
  console.log("Promise rejected");
});

// Task Queue vs Micro-task Queue
console.log("Start");

setTimeout(() => {
  console.log("Inside Settimeout (task)");
}, 0); // Task queue

Promise.resolve().then(() => {
  console.log("Inside Promise (micro-task)");
}); // Micro Task Queue

console.log("End");

// Start
// End
// Inside Promise (micro-task)
// Inside Settimeout (task)

// ----------- Interview Questions on Event Loop -----------

// Ques 1 - What is Event Loop?
/*
  Javascript is single threaded and The event loop is responsible for how its
  asynchronous behavior happens.
  The event loop is like a traffic controller in JavaScript that manages the execution of code.
  It ensures tasks are processed in an orderly manner, handling asynchronous operations
  by continuously checking if there are pending tasks in queues(microtasks and macrotasks). 
*/
// Explanation: The Event Loop in JavaScript is a mechanism responsible for managing asynchronous behavior in a single-threaded environment. It acts like a traffic controller, ensuring tasks are executed in an orderly manner by processing pending tasks in queues (microtasks and macrotasks).

// Ques 2 - Why we need event loop to manage these task queue and microtask queue?
// Explanation: The event loop is necessary to handle asynchronous operations in JavaScript effectively. It manages task queues and microtask queues to ensure that tasks are executed efficiently without blocking the main thread.

// Ques 3 - What is the output?
/*
Explanation: The output will be:

Start
running..
End

This is because the blockMainThread() function blocks the main thread for approximately 3 seconds before logging "running.." and then "End" sequentially.

*/
blockMainThread();

console.log("Start");

function blockMainThread() {
  const start = Date.now();
  while (Date.now() - start < 3000) { }
  console.log("running..");
}

console.log("End");

// Ques 4 - What is the output?
/*
Explanation: The output will be:

d Runs
c
b
a

This is because the function d() is executed synchronously, while the setTimeout functions are added to the task queue and executed in the order of their specified timeouts.
*/
setTimeout(function a() {
  console.log("a");
}, 1000);

setTimeout(function b() {
  console.log("b");
}, 500);

setTimeout(function c() {
  console.log("c");
}, 0);

function d() {
  console.log("d Runs");
}

d();

// Task queue - a b c
// call stack -

// d Runs
// c
// b
// a

// Ques 5 - Whats the output?
/*
Explanation: The output will be:

2
2
2

This happens because in both versions of the a() function, the setTimeout functions capture the final value of i (which is 3 after the loop completes) due to closure, resulting in all three console.log(i) statements logging 2 after waiting for their respective timeouts.
*/
function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // What is logged?
    }, i * 1000);
  }
}

function a() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // What is logged?
    }, i * 1000);
  }
}

// a();

// Task Queue - log() log() log()
//                0     1     2

// Ques 6 - What's the Output?
/*
Explanation: The output will be:

e Runs
b Runs
c Runs
d Runs

This occurs because promises and their respective then handlers are executed as microtasks, following the microtask queue's order, and then the setTimeout callback runs as a macrotask after the microtasks are completed.
*/
// Promise.resolve()
//   .then(function a() {
//     Promise.resolve().then(
//       setTimeout(function d() {
//         console.log("d Runs");
//       }, 0)
//     );
//     Promise.resolve().then(function e() {
//       console.log("e Runs");
//     });
//     throw new Error("Error Occured!");
//     Promise.resolve().then(function f() {
//       console.log("f Runs");
//     });
//   })
//   .catch(function b() {
//     console.log("b Runs");
//   })
//   .then(function c() {
//     console.log("c Runs");
//   });

// Task Queue -
// Micro task queue -
// Call Stack -

// e runs
// b runs
// c runs
// d runs

// Ques 7 - What's the Output?
/*
Explanation: The output will be:

Start
resolved: 1.3

This happens because the pause function returns a promise that resolves after 1000 milliseconds, and the then handler calculates the time difference between the start and end times, logging "resolved: 1.3" after approximately 1.3 seconds.
*/
function pause(millis) {
  return new Promise(function p(resolve) {
    setTimeout(function s() {
      resolve("resolved");
    }, millis);
  });
}

const start = Date.now();
console.log("Start");

pause(1000).then((res) => {
  const end = Date.now();
  const secs = (end - start) / 1000;
  console.log(res, ":", secs);
});

// Start
// Call Stack - pause(1000) p(resolve)
// Task - s()
// MicroTask -

// resolved: 1.3
