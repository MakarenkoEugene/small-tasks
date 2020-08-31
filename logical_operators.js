// Logical operators

// || - OR

console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false

const hour = 23;
const isWeekend = false;

console.log(hour < 9 || hour > 18); // false;

const TheOfficeIsClosed = hour < 9 || hour > 18 || isWeekend; // true.

let b, a;

false || (b = 3);
true || (a = 3);

console.log(b); // 3
console.log(b); // undefined

console.log(undefined || null || 0); // 0 , all falsy, returns the last value

// && - AND

console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false

console.log(1 && 2 && null && 3); // null , return first false value
console.log(1 && 2 && 3); // 3 , all true, returns the last value

let c, d;

false && (c = 3);
true && (d = 3);

console.log(c); // undefined
console.log(d); // 3

// Precedence of AND && is higher than OR ||
// a && b || c && d => (a && b) || (c && d)

console.log((1 && 2) || (0 && 3)); // 2
