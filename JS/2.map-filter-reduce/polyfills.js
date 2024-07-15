// Polyfills for map, reduce and filter.

// 1. Map Polyfill

Array.prototype.myMap = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }
    return temp;
}

// 2. Filter Polyfill

Array.prototype.myFilter = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            temp.push(this[i]);
        }
    }
    return temp;
}

// 3. Reduce Polyfill

Array.prototype.myReduce = function (cb, initialValue) {
    let accumulator = initialValue;
    let i = 0;
    if (accumulator === undefined) {
        accumulator = this[0];
        i = 1;
    }
    for (i; i < this.length; i++) {
        accumulator = cb(accumulator, this[i], i, this);
    }
    return accumulator;
}

let arr = [1, 2, 3, 4, 5];
console.log(arr);
let newArr = arr.myMap((item) => item * 2);
console.log("MyMap", newArr);
let newArr1 = arr.myFilter((item) => item % 2 === 0);
console.log("MyFilter", newArr1);
let sum = arr.myReduce((acc, item) => acc + item, 0);
console.log("MyReduce", sum);