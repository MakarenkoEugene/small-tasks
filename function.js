// A method can use the this keyword to access information within an object.
// The this value is the "before point" object that was used to call the method.

const user = {
  name: "Eugene",
  age: 23,

  sayHi() {
    return this.name;
  },
};

console.log(user.sayHi()); // Eugene

// The this value is calculated at run time and depends on the context.

const c = { name: "c" };
const d = { name: "d" };

function sayHi() {
  console.log(this.name);
}

c.f = sayHi;
d.f = sayHi;

c.f(); // c  (this == c)
d.f(); // d  (this == d)

function sayHiFrom(name, ...arg) {
  console.log(`I am ${this.name}, nice to meet you ${name} ${arg.length ? `and ${arg}` : ""}`);
}

sayHiFrom.call(c, "d", "o", "p");
sayHiFrom.apply(d, ["c", "o", "p"]);

// A decorator is a wrapper around a function that changes the behavior of the latter. The main work is still done by the function.

function hash1() {
  return arguments.join(); // TypeError: arguments.join is not a function
}
// console.log(hash1(1, 2));

function hash2() {
  // This trick is called method borrowing.
  return [].join.call(arguments); // 1,2
}

console.log(hash2(1, 2));

// Higher-order functions are functions that work with other functions, either taking them as parameters or returning them. Simply put, a higher-order function is a function that takes a function as an argument or returns a function as an output value.
// Decorator spy

function spy(func) {
  function decorator(...arg) {
    const res = func.apply(this, arg);

    decorator.calls.push(`Call with: ${arg}, returne: ${res}`);

    return res;
  }

  decorator.calls = [];

  return decorator;
}
function plus(b) {
  return this.a + b;
}

const work = spy(plus);
const work1 = spy(plus);

var a = 2;
console.log(work(1, 2));
console.log(work(2, 2));
console.log(work(3, 2));

console.dir(work.calls);
console.dir(work1.calls);

// console.dir(work);

// Arrow functions are special: they don't have their own this. If we use this inside an arrow function, then its value is taken from the outer "normal" function.

const ArrowFunctions = () => {};

function slow(x) {
  // there may be resource-intensive calculations
  return x;
}

// cachingDecorator is a decorator, a special function that takes a function.

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    // if the cache contains such x,
    if (cache.has(x)) {
      return cache.get(x); // read the result from it
    }

    let result = func(x); // otherwise, call the function

    cache.set(x, result); // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);

console.log(slow(1)); // slow(1) we cache
console.log("Again: " + slow(1)); // return from cache

console.log(slow(2)); // slow(2) we cache
console.log("Again: " + slow(2)); // return from cache
