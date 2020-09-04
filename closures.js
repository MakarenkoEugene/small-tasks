// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

function init() {
  const name = "name";

  function func() {
    console.log(name);
  }

  func();
}

init();

function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12

// for (var i = 0; i < 3; i++) {
//   (function (i) {
//     setTimeout(() => console.log(i), 100);
//   })(i);
// }

function funcA() {
  let i = 0;

  return function funcB() {
    return i++;
  };
}

const counter = funcA();
const counter1 = funcA();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter1()); // 0
console.log(counter()); // 3
console.log(counter1()); // 1

// gotchas with loops

function funcC() {
  let i = 0;

  setTimeout(() => {
    console.log(`Call count: ${i++}`); // Call count: 0 every time
    funcC();
  }, 100);
}

// funcC();

function funcD() {
  let i = 0;

  return function funcE() {
    setTimeout(() => {
      console.log(`Call count: ${i++}`); // Call count: i++
      funcE();
    }, 100);
  };
}

const funcE = funcD();
// funcE();

function makeBuffer() {
  let savedText = "";

  function buffer(text) {
    if (arguments.length === 0) {
      return savedText;
    }

    savedText += text.toString();
    return savedText;
  }

  buffer.clear = function () {
    savedText = "";
    return savedText;
  };

  return buffer;
}

const buffer = makeBuffer();

console.log(buffer("Hello"));
console.log(buffer(" "));
console.log(buffer("Word!"));
console.log(buffer.clear());

// Recursion is a programming technique useful in situations where a task can naturally be divided into several similar but simpler tasks. Or when a task can be simplified to simple actions plus a simple version of the same task. Or, as we will see shortly, for working with specific data structures.

const pow = (x, n) => {
  let sum = x;
  
  while (--n) sum *= x;

  return sum;
};

const powRecursion = (x, n) => (n == 1 ? x : x * pow(x, n - 1));

console.log(pow(2, 3)); // 8
console.log(powRecursion(2, 3)); // 8
