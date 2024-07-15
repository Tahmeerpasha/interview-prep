# Hoisting in JS

Hoisting in JavaScript is a behavior in which variable and function declarations are moved to the top of their containing scope during the compilation phase before the code is executed. This means that you can use variables and functions before you declare them in your code, although the actual behavior varies depending on whether you're using `var`, `let`, `const`, or function declarations.

## Variable Hoisting

### `var` Hoisting

When you declare a variable using `var`, the declaration is hoisted to the top of the function or global scope, but the initialization remains in place. This means the variable is undefined until the line where it is initialized is executed.

Example:

```javascript
console.log(x); // undefined
var x = 5;
console.log(x); // 5
```

The above code is interpreted by the JavaScript engine as:

```javascript
var x;
console.log(x); // undefined
x = 5;
console.log(x); // 5
```

##

### `let` and `const` Hoisting

Variables declared with `let` and `const` are also hoisted, but unlike `var`, they are not initialized until the code execution reaches the declaration. This results in a "temporal dead zone" (TDZ) from the start of the block until the declaration is encountered.

### Temporal Dead Zone (TDZ):

TDZ is a specific behavior related to variables declared using let and const. It refers to the period between the start of the block scope and the actual declaration of the variable.
During the TDZ, accessing the variable will result in a ReferenceError.

Example:

```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
console.log(y); // 10
```

For `const`, it is similar, but the variable must also be initialized at the time of declaration:

```javascript
console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 15;
console.log(z); // 15
```

##

### Function Hoisting

Function declarations are hoisted entirely, meaning both the function name and its implementation are hoisted. You can call the function before its declaration in the code.

Example:

```javascript
greet(); // "Hello, world!"
function greet() {
  console.log("Hello, world!");
}
```

The above code is interpreted as:

```javascript
function greet() {
  console.log("Hello, world!");
}
greet(); // "Hello, world!"
```

##

### Function Expressions and Arrow Functions

Function expressions and arrow functions, assigned to variables declared with `var`, `let`, or `const`, behave differently. Only the variable declaration is hoisted, not the assignment.

Example with `var`:

```javascript
console.log(f); // undefined
var f = function () {
  console.log("Hello from function expression!");
};
f(); // "Hello from function expression!"
```

Example with `let` or `const`:

```javascript
console.log(g); // ReferenceError: Cannot access 'g' before initialization
let g = () => {
  console.log("Hello from arrow function!");
};
g(); // "Hello from arrow function!"
```

##

### Summary

- **`var` Hoisting**: The declaration is hoisted, but the initialization remains in place, leading to `undefined` until initialization.

- **`let` and `const` Hoisting**: The declarations are hoisted, but not initialized, leading to a temporal dead zone (TDZ) where accessing the variable throws a `ReferenceError`.

- **Function Declarations**: Entirely hoisted, including the function body, allowing function calls before the declaration.

- **Function Expressions and Arrow Functions**: The variable declaration is hoisted, but the assignment is not, leading to `undefined` for `var` and a `ReferenceError` for `let` and `const` if accessed before initialization.

Understanding hoisting helps in writing more predictable and bug-free JavaScript code.
