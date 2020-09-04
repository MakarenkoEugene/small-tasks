// for - increase
for (let i = 0; i < 5; i++) console.log(i); // 0, 1, 2, 3, 4

// for - decrease
for (let i = 4; i >= 0; i--) console.log(i); // 4, 3, 2, 1, 0

for (let i = 4; i--; ) console.log(i); // 3, 2, 1, 0

for (let i = 4; i--; console.log(i)); // 3, 2, 1, 0

let i = 0;
while (i < 3) console.log(i++); // 0, 1, 2

i = 0;
while (i < 3) console.log(++i); // 1, 2, 3

i = 3;
while (i < 3) console.log(++i); // Not called

do console.log(i++);
while (i < 3); // 3

i = 5;
while (i > 0) {
  i--;

  if (i % 2) continue; // 3, 1
  console.log(i); // 4, 2, 0
}

i = 10;
while (i > 0) {
  if (i < 5) break;

  console.log(i); // 10, 9, 8, 7, 6, 5

  i--;
}

const arr = [1, 2, 3, 4, 5];
const obj = { a: 1, b: 2, c: 3, d: 4 };

for (const key in obj) console.log(`${key}: ${obj[key]}`); // a: 1, b: 2, c: 3, d: 4

for (const iterator of arr) console.log(iterator); // 1, 2, 3, 4, 5

// These methods modify the array:
arr.sort((a, b) => console.log(a, b) || b - a); // 1, 2, 3, 4, 5
console.log(arr); // [5, 4, 3, 2, 1]

console.log(arr.reverse()); // [1, 2, 3, 4, 5]

// These methods do not modify the array, but simply return it in a different representation.
console.log(arr.forEach((item) => console.log(item))); // 1, 2, 3, 4, 5 // undefined

console.log(arr.map((item) => console.log(item) || item - 1)); // 1, 2, 3, 4, 5 // [0, 1, 2, 3, 4]

console.log(arr.filter((a) => console.log(a) || a < 3)); // 1, 2, 3, 4, 5 // [0, 1]

function* asyncGenerator() {
  let i = 0;
  while (i < 3) yield i++;
}

(async function () {
  for await (const iterator of asyncGenerator()) console.log(iterator); // 0, 1, 2
})();
