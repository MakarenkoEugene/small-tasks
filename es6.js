// modeles
// import defaultExport from "module-name";
// import * as name from "module-name";
// import { export } from "module-name";
// import { export as alias } from "module-name";
// import { export1 , export2 } from "module-name";
// import { export1 , export2 as alias2 , […] } from "module-name";
// import defaultExport, { export [ , […] ] } from "module-name";
// import defaultExport, * as name from "module-name";
// import "module-name";
// import("/module-name.js").then(module => {…})

// If you import variables, they behave like constants in this scope

// import {a, b} from '/modules/my-module.js';
// a = 5;
// b = 6;
// Uncaught TypeError: Assignment to constant variable.|

// For import, you can use the object that stores these variables.

// import {obj} from '/modules/my-module.js';

// obj.a = 1;
// obj.b = 4;

// spread
const sumAll = (...args) => [].reduce.call(args, (arg, sum) => (sum += arg));

console.log(sumAll(1)); // 1
console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3)); // 6

const obj = {
  a: 12,
  b: 12,
  c: 12,
};

console.log({ ...obj, d: 12 }); // {a: 12, b: 12, c: 12, d: 12}

console.log({ ...obj, a: 11 }); // {a: 11, b: 12, c: 12}

const { a, b: _b } = obj;

console.log(a, _b); // 12 12

const arr = [1, 2, 3, 4];

console.log([...arr, 5, 6]); // [ 1, 2, 3, 4, 5, 6 ]

console.log([1, 2, ...arr]); // [ 1, 2, 1, 2, 3, 4 ]

console.log([0, ...arr, 5]); // [ 0, 2, 1, 2, 3, 5 ]

const [z, x, ...rest] = arr;
console.log(z, x, rest); // 1 2 [ 3, 4 ]

// The destructuring assignment syntax in JavaScript expressions allows you to retrieve data from arrays or objects using syntax like declaring an array or literals in an object.

const t = 5;
const r = 10;
console.log(`Fifteen is ${t + r} and not ${2 * t + r}.`);

console.log(`header ${true ? "" : `icon-${false ? "expander" : "collapser"}`}`);

// class
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit extends Animal {
  constructor(props) {
    super(props);

    console.log(this); // Rabbit {name: undefined}
  }

  sayName() {
    return this.name;
  }
}

const peter = new Rabbit("Peter");

console.log(peter.sayName()); // Peter
