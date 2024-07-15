

// Polyfills for map, filter and reduce

// Question 4 : Map Polyfill
// Explanation: This code snippet adds a custom implementation of the map() method to the Array prototype. It mimics the functionality of the native map() method by iterating through the array and applying a callback function to each element to create a new array with the modified values.

Array.prototype.myMap = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }

    return temp;
};



// Ques 5 : Filter Polyfill
// Explanation: Similar to the Map Polyfill, this code adds a custom implementation of the filter() method to the Array prototype. It iterates through the array and applies a callback function to each element, returning a new array containing only the elements that meet the specified condition in the callback.

Array.prototype.myFilter = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) temp.push(this[i]);
    }

    return temp;
};



// Question 6 : Reduce Polyfill
// Explanation: This snippet introduces a custom implementation of the reduce() method for arrays. It iterates through the array, applying a callback function that performs reduction or aggregation operations, similar to the native reduce() method, and returns the final accumulated result.

Array.prototype.myReduce = function (cb, initialValue) {
    var accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }

    return accumulator;
};

// Polyfills for call, bind and apply
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


