// CLOSURE Interview Question

// Question 1 : Lexical Scope
// Explanation: Lexical scope refers to how variable names are resolved in nested functions based on where the functions are defined. In the provided code, the function local has a local scope where it can access variables defined within itself as well as variables in the global scope, such as the username variable.

// global scope
function local() {
    // local scope
    var username = 'Roadsidecoder'
    console.log(username)
}
local()


// Question 2 : Closure
// Explanation: Closure is a JavaScript feature that allows a function to remember and access its lexical scope even when the function is executed outside that scope. In the code snippet, makeFunc creates a closure around the name variable, enabling displayName to access name even after makeFunc has finished running.

function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();


// Question 3 : Closure scope chain 
// Explanation: Closure scope chain refers to the hierarchy of nested functions and their respective scopes that closures have access to. The sum function creates nested closures, allowing access to variables like a, b, c, d, and e from different levels of scope within the chain.

const e = 10;
function sum(a) {
    return function (b) {
        return function (c) {
            // outer functions scope
            return function (d) {
                // local scope
                return a + b + c + d + e;
            };
        };
    };
}

console.log(sum(1)(2)(3)(4)); // log 20


// Question 4 : Output
// Explanation: The code snippet defines an immediately invoked function expression (IIFE) that declares a global variable count and a local variable count inside the printCount function. The output will be 1 followed by 0 because of variable shadowing and the conditional check inside printCount.

let count = 0;
(function printCount() {
    if (count === 0) {
        let count = 1;
        console.log(count); //1
    }
    console.log(count);// 0
})();


// Question 5 : Write function for this addSix()
// Explanation: The createBase function returns a closure that adds a base number (6 in this case) to an inner number provided as an argument. The addSix function created using createBase(6) adds 6 to its argument when invoked.

function createBase(num) {
    return function (innerNum) {
        console.log(innerNum + num);
    };
}
var addSix = createBase(6);
addSix(10);
addSix(21);


// Question 6 : Time Optimization
// Explanation: The find function precomputes an array of squares and returns a closure that can access this precomputed data. This approach optimizes time by avoiding redundant computations, as demonstrated by the timed execution of closure(6) and closure(50).

function find() {
    let a = [];
    for (let i = 0; i < 1000000; i++) {
        a[i] = i * i;
    }
    return function (index) {
        console.log(a[index]);
    }
}
const closure = find();
console.time("6");
closure(6);
console.timeEnd("6");
console.time("50");
closure(50);
console.timeEnd("50");


// Question 6 : Block scope and set Time out

// using let
function a() {
    for (let i = 0; i < 3; i++) {
        setTimeout(function (log) {
            console.log(i)  // 0,1,2
        }, i * 1000);
    }
}
a(); // using let will give you 0 , 1 ,2

// using var
for (var i = 0; i < 3; i++) {
    function inner(i) {
        setTimeout(function (log) {
            console.log(i)  // 3 times  3
        }, i * 1000);
    }
    inner(i);
    // If inner() func was not there then it'll print 3 three times but since inner() func is a closure it'll always send updated data so it'll print 0 1 2
}


// Question 7 : How would you use a closure to create a private counter? Same like getters and setters in java
//Explanation: The counter function utilizes closure to create a private variable _counter that can only be accessed and modified through the returned functions add and retrieve, ensuring data privacy and controlled access.

function counter() {
    var _counter = 0;

    function add(increment) {
        _counter += increment;
    }

    function retrive() {
        return "Counter = " + _counter;
    }

    return {
        add,
        retrive
    };
}
const c = counter();
c.add(5)
c.add(10)
console.log(c.retrive());//15


// Question 8 : Module Pattern : 
// Explanation: The Module Pattern uses an immediately invoked function expression (IIFE) to encapsulate private variables and functions, exposing only a public interface. In the given example, the module object has a public method publicMethod, while privateMethod remains hidden within the module.

var module = (function () {
    function privateMethod() {
        console.log("private");
    }
    return {
        publicMethod: function () {
            console.log("public");
        }
    };

})();
module.publicMethod();
module.privateMethod(); // TypeError: module.privateMethod is not a function



// Question 9 : Make this run only once
//Explanation: The Like function returns a closure that tracks the number of times it has been called, ensuring its action (like subscribing) is performed only once. Subsequent calls to the closure display a message indicating that the action has already been performed.

let view;
function Like() {
    let called = 0;

    return function () {
        if (called > 0) {
            console.log("Already")
        } else {
            view = "Roadsidecoder";
            console.log("Subscribe", view);
            called++
        }
    };
}
let isSub = Like();
isSub();
isSub();
isSub();
isSub();


// Question 10 : once Polyfill 
// Explanation: The once function creates a closure that allows a given function to be executed only once. Upon the first call, the original function runs, and subsequent calls return the result of the initial execution, demonstrating how closure can control function execution.

function once(func, context) {
    let ran;

    return function () {
        if (func) {
            ran = func.apply(context || this, arguments);
            func = null
        }
        return ran;
    };
}
const hello = once((a, b) => {
    console.log("Hi", a, b)
})
hello(1, 2);
hello(1, 2);
hello(1, 2);
hello(1, 2);


// Question 11 : Memoize Polyfill  
// Explanation: The myMemoize function is a memoization polyfill that caches function results based on arguments, using closure to store and retrieve cached values efficiently. This improves performance by avoiding redundant computations for repeated function calls with the same arguments.

function myMemoize(fn, context) {
    const res = {};
    return function (...args) {
        var argsCache = JSON.stringify(args);
        if (!res[argsCache]) {
            res[argsCache] = fn.call(context || this, ...args);
        }
        return res[argsCache];
    };
}

const clumsyProduct = (num1, num2) => {
    for (let i = 1; i <= 100000000; i++) {
        return num1 * num2;
    }
}

const MemoizeClumsyProduct = myMemoize(clumsyProduct);

console.time("First call");
console.log(MemoizeClumsyProduct(9467, 7649));
console.timeEnd("First call")

console.time("Second call");
console.log(MemoizeClumsyProduct(9467, 7649));
console.timeEnd("Second call");


// Question 12: closure VS scope
// Explanation: Closure refers to a function's ability to retain access to variables from its lexical scope even after that scope has closed, while scope refers to the visibility and accessibility of variables within a specific context, such as global scope, function scope, or block scope.

