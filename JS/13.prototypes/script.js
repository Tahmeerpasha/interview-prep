// Everything in Javascript is an Object

let obj = {
  name: "Piyush Agarwal",
  age: 25,
};
// console.log(obj.__proto__); // Object.prototype

let num = 10.3;
// console.log(num.__proto__); // Number.prototype
// console.log(num.__proto__.__proto__); // Object.prototype

let name = "RoadsideCoder";
let bool = true;

function add(a, b) {
  return a + b;
}

// console.log(add(1, 2));
// console.log(add.__proto__); // Function.prototype
// console.log(add.__proto__.__proto__); // Object.prototype

// Prototype Chaining

let person = {
  name: "Piyush Agarwal",
  age: 25,
  //   toString: () => {
  //     console.log("converts to string");
  //   },
};

// let additional = {
//   name: "Piyush",
//   username: "RoadsideCoder",
//   alias: function () {
//     console.log(`${this.name} is also known as ${this.username}`);
//   },
// };

// person.__proto__ = additional;
// console.log(person.alias());

// Prototype Inheritance

// Defined a Constructor Function
function Animal(name) {
  this.name = name;
}

// Add a method to the prototype
Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

var animal1 = new Animal("Tiger");

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("Woof!");
};

var dog1 = new Dog("Max", "Labrador");

Array.prototype.myArr = function () {
  console.log("This is my array " + this);
};

const arr = [1, 2, 3];
console.log(arr.myArr());

// ----------- Interview Questions on Prototypes -----------

// Ques 1: What will be the output of the following code?
/*
 Explanation: The output will be:
Driving a vehicle
Driving a car

This is because vehicle.drive() invokes the drive() method from the Vehicle prototype, while car.drive() invokes the overridden drive() method in the Car prototype.

 */
// function Vehicle() {}
// Vehicle.prototype.drive = function () {
//   console.log("Driving a vehicle");
// };

// function Car() {}
// Car.prototype = Object.create(Vehicle.prototype);
// Car.prototype.constructor = Car;
// Car.prototype.drive = function () {
//   console.log("Driving a car");
// };

// var vehicle = new Vehicle();
// var car = new Car();

// vehicle.drive(); // Driving a Vehicle
// car.drive(); // Driving a Car

// Ques 2: Explain the difference between __proto__ and prototype in JavaScript.
/*
 Explanation:
    __proto__: It points to the prototype of an object and is used for inheritance and accessing the prototype chain.
    prototype: It exists on constructor functions to set up inheritance for objects created by that function, defining shared properties and methods for instances.
 */
// - **`__proto__`**: It is an object property that points to the prototype of the object.
//                    It is used for inheritance and allows accessing the prototype chain.
// - **`prototype`**: It is a property that exists on constructor functions and is used to
//                   set up inheritance for objects created by that constructor function.
//   It defines properties and methods shared by all instances created by that constructor function.

// Ques 3: What is setPrototypeOf?
// Explanation: setPrototypeOf is a method used to set the prototype (the object's internal [[Prototype]]) of a specified object to another object or null. It allows changing the prototype dynamically after an object has been created.

// Define a prototype object
var animalPrototype = {
  sound: function () {
    console.log("Making a sound...");
  },
};

// Create an object with animalPrototype as its prototype
var dog = Object.create(animalPrototype);

// Create another object with a different prototype
var cat = {
  purr: function () {
    console.log("Purring...");
  },
};

Object.setPrototypeOf(dog, cat);
dog.purr(); // Output: Purring...

// Ques 4: What is instanceof?
// Explanation: instanceof is an operator that checks if an object is an instance of a specific constructor or its prototype chain. It returns true if the object is an instance of the constructor or a constructor's prototype chain.

function Animal(name) {
  this.name = name;
}
Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

var animal1 = new Animal("Tiger");

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("Woof!");
};

var dog1 = new Dog("Max", "Labrador");

Array.prototype.myArr = function () {
  console.log("This is my array " + this);
};

const arr = [1, 2, 3];

// console.log(dog1 instanceof Animal);

// Ques 5: How can you create an object without a prototype in JavaScript?
// Explanation: You can create an object without a prototype by using Object.create(null). This creates an object with no prototype chain, making it free from any inherited properties or methods.

var obj1 = Object.create(null);
// console.log(obj1.toString());

// Ques 6: What will be the output of the following code?
/*
Explanation: The output will be:
10
20
30

This is because obj1 is an instance of A with foo as 10, obj2 is an instance of B with foo as 20 (overridden from A), and obj3 is an instance of C with foo as 30 (overridden from both A and B).

*/
function A() { }
A.prototype.foo = 10;

function B() { }
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20;

function C() { }
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
C.prototype.foo = 30;

var obj1 = new A();
var obj2 = new B();
var obj3 = new C();

console.log(obj1.foo);
console.log(obj2.foo);
console.log(obj3.foo);

// Ques 7: Deep Clone an object in JS
// Explanation: The deepClone function recursively creates a deep copy of an object, including nested objects and arrays, ensuring that the cloned object is completely independent of the original object.


function deepClone(obj) {
  // Handle null and non-object types
  if (obj === null || typeof obj != "object") {
    return obj;
  }

  // Create a new object or array based on the type of the input object
  var clone = Array.isArray(obj) ? [] : {};

  // Iterate through each key in the input object
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

var obj2 = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

var clonedObj = deepClone(obj2);
clonedObj.b.c = 3;
