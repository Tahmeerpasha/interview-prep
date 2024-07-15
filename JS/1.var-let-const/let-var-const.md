# Scopes and Let, Var, Const in Javascript

## Scopes in JS

There are 3 scopes in JS

- Global scope

  - Variables declared outside any function or block are in the global scope and can be accessed from anywhere in the code.

- Function scope

  - Variables declared within a function are in the function scope and can only be accessed within that function.

- Block scope

  - Variables declared within a block (a pair of curly braces {}) are in the block scope and can only be accessed within that block. Block scope is specific to let and const.

## Var, Let and Const

`Var`

- var is function-scoped. If you declare a variable using var inside a function, it is not accessible outside that function.

- If var is declared inside a block (like inside an if statement or a loop), it is still scoped to the nearest function, not the block.

- Variables declared with var are hoisted to the top of their scope and initialized with undefined.

Example:

```js
function exampleVar() {
  if (true) {
    var x = 10;
    console.log(x); // 10 (accessible because it's in same block)
  }
  console.log(x); // 10 (accessible due to function scope)
}
console.log(x); // 10 (not accessible)
exampleVar();
```

`Let`

- `let` is block-scoped. A variable declared with `let` inside a block is only accessible within that block.

- `let` is not hoisted in the same way as var. It is hoisted to the top of its block, but not initialized, leading to a "temporal dead zone" until the declaration is encountered.

Example:

```js
function exampleLet() {
  if (true) {
    let y = 20;
    console.log(y); // 20
  }
  console.log(y); // ReferenceError: y is not defined (block-scoped)
}
exampleLet();
```

`const`

- `const` is also block-scoped, similar to let.
- A variable declared with `const` must be initialized at the time of declaration and cannot be reassigned.
- The value it holds is not immutable, but the variable identifier cannot be reassigned.

Example:

```js
function exampleConst() {
  if (true) {
    const z = 30;
    console.log(z); // 30
  }
  console.log(z); // ReferenceError: z is not defined (block-scoped)
}
exampleConst();

// const requires initialization and cannot be reassigned
const a = 40;
a = 50; // TypeError: Assignment to constant variable
```

## Summary

- `Global Scope`: Variables declared outside any block or function.

- `Function Scope`: var is scoped to the nearest function.

- `Block Scope`: let and const are scoped to the nearest block.

- `Hoisting`: var variables are hoisted and initialized with undefined; let and const variables are hoisted but not initialized until their declaration is encountered, leading to a temporal dead zone.
