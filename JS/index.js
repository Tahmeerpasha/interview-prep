const addFive = (num) => {
    return num + 5;
}

const subtractTwo = (num) => {
    return num - 2;
}

const multiplyFour = (num) => {
    return num * 4;
}

function compose(...args) {
    return (num) => {
        return args.reduceRight((acc, curr) => curr(acc), num);
    }
}

function pipe(...args) {
    return (num) => {
        return args.reduce((acc, curr) => curr(acc), num);
    }
}

const evaluateCompose = compose(addFive, subtractTwo, multiplyFour);
console.log(evaluateCompose(6));

const evaluatePipe = pipe(addFive, subtractTwo, multiplyFour);
console.log(evaluatePipe(6))