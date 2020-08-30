// ________ Data Types, primitive ________

console.log(typeof undefined);    // undefined
// The Undefined type has exactly one value, called undefined. Any variable that has not been assigned a value has the value undefined.

console.log(typeof true);         // boolean
// The Boolean type represents a logical entity having two values, called true and false.

console.log(typeof "string");     // string
// The String type is generally used to represent textual data in a ECMAScript program.

// ECMAScript has two built-in numeric types:
console.log(typeof 1);            // number
// number data type in ECMAScript corresponds to 64-bit floating point format
console.log(typeof 2n);           // bigint
// In JavaScript, BigInt is a numeric data type that can represent data in long arithmetic format.

console.log(typeof Symbol());     // symbol
// The Symbol type is the set of all non-String values that may be used as the key of an Object property

// ________ special primitive _________

console.log(typeof null); // object
// The Null type has exactly one value, called null.
// having additional usage: if object is not inherited, then null is shown

// ________ Object, Structural Types _________
// used not only for storing data, but also for creating other structures

// all types in javascript look like object except null and undefined
console.log(typeof "primitive".__proto__) // object

console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof new Map()); // object
console.log(typeof new Date()); // object
console.log(typeof new Set()); // object

function func() {}
console.log(typeof func); // function
console.dir(typeof func.__proto__); // function
console.dir(typeof func.__proto__.__proto__); // object
// although all functions constructively inherit from Object.
// Functions are ordinary objects, with the additional ability to be called for execution
