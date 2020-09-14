console.log(true + false); // 1
// ture + false => 1 + 0 => 1

console.log(12 / "6"); // 2
// 12 / "6" => 12 / 6 => 2

console.log("number" + 15 + 3); // number153
// "number" + 15 + 3 => "number15" + 3 => "number153"

console.log(15 + 3 + "number"); // 18number
// 15 + 3 + "number" => 18 + "number" => "18number"

console.log("foo" + +"bar"); // fooNaN
// "foo" + +"bar" => "foo" + NaN => fooNaN

// When comparing values of different types, JavaScript convert each to a number.
console.log("true" == true); // false
// "true" == true => NaN == 1 => false

console.log(false == "false"); // false
// false == "false" => 0 == NaN => false

// There’s a special rule. These two are a they equal each other (in the sense of ==), but not any other value.
console.log(null == undefined); // ture
console.log(null === undefined); // false

console.log(null == 0); // false
console.log(null == ""); // false
console.log(null == false); // false
console.log(undefined == 0); // false
// because undefined is only null and nothing else.

// For maths and other comparisons < > <= >=
// null/undefined are converted to numbers: null becomes 0, while undefined becomes NaN

console.log(2 > null); // true
// 2 > null => 2 > 0 => true
console.log(undefined > 0); // false
// undefined > 0 => NaN > 0 => false
console.log(undefined < 0); // false
// undefined < 0 => NaN < 0 => false

// x == y
// If Type(x) is Object and Type(y) is either String, Number, BigInt, or Symbol, return the result of the comparison ToPrimitive(x) == y, .
console.log([12] == 12); // true
console.log([[12]] == 12); // true
console.log([["x"]] == "x"); // true

// If the operands are both objects, return true only if both operands reference the same object.
console.log([] == []); // false
const arr = [];
console.log(arr == arr); // true

console.log([1, 2, 3] == [1, 2, 3]); // false
console.log([1] == [1]); // false

console.log([1] + [1]); // 11
// [1] + [1] => "1" + "1" = 11
console.log([2] * 2); // 4
// [2] + 2 => "2" * 2 => 4

// String comparison 
// strings are compared character by character
console.log("string" == "string"); // true
// "string" == "string" => "s" == "s", "t" == "t", "r" == "r" ...
console.log("false" == "true"); // false


console.log(!!"false" == !!"true"); // true
// !!"false" == !!"true" => true == true => 1 == 1 => // true

console.log({} + [] + {} + [1]); // [object Object][object Object]1
console.log(!+[] + [] + ![]); // truefalse


console.log(Object.is(+0, -0)); // false
console.log(+0 == -0); // true
console.log(+0 === -0); // true

console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false


console.log(new Date(0) - 0); // 0
// new Date(0) - 0 => Number(new Date(0)) - 0 => 0 - 0 => 0
console.log(new Date(100) - 0); // 100

console.log(new Date(0) + 0); // Thu Jan 01 1970 03:00:00 GMT+0300 (GMT+02:00)0
// new Date(0) + 0 => new Date(0).toString() + 0 => Thu Jan 01 1970 03:00:00 GMT+0300 (GMT+02:00)0
