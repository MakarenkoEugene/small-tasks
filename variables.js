// var declarations are globally scoped or function scoped while let and const are block scoped.

// var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared.

// They are all hoisted to the top of their scope. But while var variables are initialized with undefined, let and const variables are not initialized.

// While var and let can be declared without being initialized, const must be initialized during declaration.

let a = "let";
const b = "const";

var c = "var";
function d() {}

class E {}

console.log(a, b, c, d, E); // let, const, var, ƒ d() {}, class E {}

console.log(window.a === a, window.b === b, window.c === c, window.d === d, window.E === E); // false, false, true, true, false

// Global vs Local

// The scope of a variable is the region of your program in which it is defined. JavaScript variables have only two scopes.

// Global Variables − A global variable has a global scope which means it can be defined anywhere in your JavaScript code.

// Local Variables − A local variable will be visible only within a function where it is defined. Function parameters are always local to that function.

// Within the body of a function, a local variable takes precedence over a global variable with the same name. If you declare a local variable or function parameter with the same name as a global variable, you effectively hide the global variable.

var aa = "global"; // Declare a global variable
console.log(window.aa === aa); // true

const bb = "local"; // Declare a local variable
console.log(window.bb === bb); // false window.b = undefined, b = "local"

let cc = "local"; // Declare a local variable
console.log(window.cc === cc); // false window.c = undefined, c = "local"

// Declare a global variable
function func() {
  var aa = "local"; // Declare a local variable
  console.log(window.aa === aa); // false window.a = "global", a = "local"
}
func();

console.log(window.func === func); // true
console.log(window.aa === aa); // true

// hosting

// hoisting - teaches that the declaration of a variable or function is physically moved to the beginning of your code, when in reality it doesn't. In fact, the declarations of variables and functions go into memory during the compilation phase, but remain in the code at the place where you declared them.

console.log(f + "_"); // undefined_
var f = "f";

console.log(g()); // function g

function g() {
  return "function g";
}

// variables are not hoisting:

// console.log(h); // ReferenceError
let h = "h";

// console.log(j); // ReferenceError
const j = "j";

// console.log(K); // ReferenceError
class K {}
