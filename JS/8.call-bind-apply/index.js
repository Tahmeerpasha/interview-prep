// CALL, APPLY & BIND Interview Question


// Question 1 : What is Call?
// The call method in JavaScript is used to invoke a function with a specified this context and arguments individually. It accepts the context object as the first argument followed by individual arguments.

function sayHello() {
  return "Hello " + this.name;
}

var obj = { name: "Piyush" };
sayHello.call(obj);


// Question 2 : What is Apply?
// Explanation:The apply method in JavaScript is similar to call but accepts arguments as an array. It is used to invoke a function with a specified this context and an array of arguments.

function sayHello(day) {
  return "Hello " + this.name + " today is " + day;
}

var obj = { name: "Piyush" };
sayHello.apply(obj, day);


// Question 3 : What is Bind?
// Explanation:The bind method in JavaScript is used to create a new function with a specified this context. It doesn't immediately execute the function but returns a new function that can be invoked later.

function sayHello() {
  return "Hello " + this.name;
}

var obj = { name: "Piyush" };
const helloFn = sayHello.bind(obj);
console.log(helloFn())


// Question 4 : Output
// Explanation:The first console.log outputs "Piyush is 24" because call immediately invokes the function with the specified context and arguments. The second console.log outputs the bound function because bind creates a new function but doesn't execute it.

const person = { name: 'Piyush' };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 24));
console.log(sayHi.bind(person, 24));


// Question 5 : Call with function inside object
// Explanation: The call method is used to invoke the getAge function of the person object with a different context (person2). It returns the age property of person2, which is 24.
const age = 10;
var person = {
  name: "Piyush",
  age: 20,
  getAge: function () {
    return this.age;
  }
}

var person2 = { age: 24 };
person.getAge.call(person2);


// Question 6 : Output
// Explanation:The first console.log outputs "🥑" because data.getStatus() returns the status property of the data object. The second console.log also outputs "🥑" because data.getStatus.call(this) uses call to explicitly set the context to the global object, accessing the same status property.
var status = '😎';

setTimeout(() => {
  const status = '😍';

  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));// Since setTimeout is a function, this is bound to the parent object which in this case is global (window) object.
}, 0);


// Question 7 : Call printAnimals such that it prints all animals in object
// Explanation:The printAnimals function is invoked using call within a loop to print each animal's species and name from the animals array with the correct index.
const animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Queen' }
];

function printAnimals(i) {
  this.print = function () {
    console.log('#' + i + ' ' + this.species
      + ': ' + this.name);
  }
  this.print();
}

for (let i = 0; i < animals.length; i++) {
  printAnimals.call(animals[i], i);
}


// Question 8 : apply to append an array to another
// Explanation:The apply method is used to push all elements of the elements array into the array using the spread operator (...elements).
const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array);


// Question 9 - Using apply to enhance built-in functions
// Explanation:The apply method is used to find the maximum number in the numbers array by passing the array as arguments to Math.max.
// Find min/max number in an array
const numbers = [5, 6, 2, 3, 7];

console.log(Math.max.apply(null, numbers));


// Question 10 : How will you Create a bound function
// Explanation:A bound function is created using the bind method. In this case, f is bound to null, and the resulting function is assigned to user.g.

function f() {
  alert(this); // Window object
}

let user = {
  g: f.bind(null)
};

user.g();


// Question 11 : Bind Chaining?
// Explanation:Bind chaining involves calling bind multiple times on a function. However, only the first bind call is effective in setting the this context. Subsequent bind calls have no effect.

function f() {
  alert(this.name);
}

f = f.bind({ name: "John" }).bind({ name: "Ann" });

f();


// Question 12 : Fix the code
// Explanation:The checkPassword function prompts for a password and calls either loginSuccessful or loginFailed based on the input. bind is used to ensure that this inside loginSuccessful and loginFailed refers to the user object.
function checkPassword(success, failed) {
  let password = prompt("Password?", '');
  if (password == "Roadside Coder") success();
  else failed();
}

let user = {
  name: 'Piyush Agarwal',

  loginSuccessful() {
    console.log(`${this.name} logged in`);
  },

  loginFailed() {
    console.log(`${this.name} failed to log in`);
  },

};

checkPassword(user.loginSuccessful.bind(user), user.loginFailed.bind(user));


// Question 13 : Partial application for login
// Explanation:The checkPassword function is modified to accept two callbacks, ok and fail. The login method in the user object is then passed as arguments to askPassword, but the specific partial application is not provided.
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "Roadside Coder") ok();
  else fail();
}

let user = {
  name: 'Piyush Agarwal',

  login(result) {
    console.log(this.name + (result ? ' login successful' : ' login failed'));
  }
};

askPassword(user.login.bind(user, true), user.login.bind(user, false));

// Question 14 :  Explicit Binding with Arrow Function
// Explanation:Arrow functions do not have their own this context and instead inherit it from the surrounding lexical scope. Therefore, using call or bind with arrow functions doesn't change the context.
const age = 10;

var person = {
  name: "Piyush",
  age: 20,
  getAgeArrow: () => console.log(this.age),
  getAge: function () {
    console.log(this.age);
  }
}

var person2 = { age: 24 };
person.getAge.call(person2);
person.getAgeArrow.call(person2);


// Question 15 : Call Method Polyfill
// Explanation:A polyfill for the call method is provided, allowing a function (purchaseCar in this case) to be invoked with a specific context (car3) and arguments ('₹' and '60,00,000').
let car1 = {
  color: 'Red',
  company: 'Ferrari',
};

let car2 = {
  color: 'Blue',
  company: 'BMW',
};

let car3 = {
  color: 'White',
  company: 'Mercedes',
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price} `
  );
};

Function.prototype.myCall = function (currentContext = {}, ...arg) {
  if (typeof this !== 'function') {
    throw new Error(this + "it's not callable");
  }
  currentContext.fn = this;
  currentContext.fn(...arg);
};
purchaseCar.myCall(car3, '₹', '60,00,000');


// Question 16 : Apply Method Polyfill
// Explanation:A polyfill for the apply method is provided, allowing a function (purchaseCar) to be invoked with a specific context (car2) and an array of arguments (['₹', '50,00,000']).

Function.prototype.myApply = function (currentContext = {}, arg = []) {
  if (typeof this !== 'function') {
    throw new Error(this + "it's not callable");
  }
  if (!Array.isArray(arg)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  currentContext.fn = this;
  currentContext.fn(...arg);

};
purchaseCar.myApply(car2, ['₹', '50,00,000']);


// Question 17 : Bind Method Polyfill
// Explanation:A polyfill for the bind method is provided, allowing a function (purchaseCar) to be bound to a specific context (car1) and arguments ('₹' and '1,00,00,000'). The bound function is then invoked to make a purchase.
Function.prototype.myBind = function (currentContext = {}, ...arg) {
  if (typeof this !== 'function') {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  currentContext.fn = this;
  return function () {
    return currentContext.fn(...arg);
  };
};

const initPurchaseBmw = purchaseCar.myBind(car1, '₹', '1,00,00,000');
initPurchaseBmw();

