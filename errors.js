// Exceptions, ErrorEvent, handling errors with callbacks and promises

// throw new Error("My error"); code stope worked

try {
  throw new SyntaxError("My error");
} catch (err) {
  console.log(err.name); // SyntaxError
  console.log(err.message); // My error
  console.log(err.stack); // SyntaxError: My error at path
}
// with try catch continues code work after error

// try {
//   setTimeout(function () {
//     noSuchVariable; // ReferenceError: noSuchVariable
//   }, 1000);
// } catch (err) {
//   console.log(err); // not working
// } // code stoped

setTimeout(function () {
  try {
    noSuchVariable;
  } catch (err) {
    console.log(err); // ReferenceError: noSuchVariable is not defined
  }
}, 500);
