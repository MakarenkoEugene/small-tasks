"use strict";
// Array Finde Max Number
Math.max(...[1, 2, 3]);

Math.max.apply(null, [1, 2, 3]);

[1, 2, 3].reduce(function (prev, item) {
  return Math.max(prev, item);
});

class Preson {
  constructor() {
    this.name = "a";
  }
}

Preson = class Preson1 {
  constructor() {
    this.name = "d";
  }
};

let obj = {
  alert: (i) => {
    return setInterval(() => console.log(`alert${i}`), 100);
  },
};

// const timer = obj.alert(1);

obj = null;

// console.log(obj);
// obj.alert(2);
// clearInterval(timer)
let l = "l";

function getL() {
  console.log(l + "2");
  let l = "L";
  console.log(l);
}

getL();

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

for (var i = 0; i < 3; ++i) {
  (function (i) {
    setTimeout(() => console.log(i), 100);
  })(i);
}

// setTimeout(() => , 5000);

// const status = 2;

// setTimeout(() => console.log(window.status), 100);

// setTimeout(() => {
//   const status = "b";

//   const data = {
//     status: "c",
//     getStatus() {
//       return this.status;
//     },
//   };

//   console.log(data.getStatus());
//   console.log(data.getStatus.call(this));
// }, 0);
