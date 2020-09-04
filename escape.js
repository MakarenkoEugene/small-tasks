// The deprecated escape () method returns a new string in which certain characters have been replaced with a hexadecimal escape sequence.
console.log(escape("JavaScript")); // JavaScript
console.log(escape("ДжаваСкрип")); //%u0414%u0436%u0430%u0432%u0430%u0421%u043A%u0440%u0438%u043F

// Replace with encodeURI or encodeURIComponent methods instead.

console.log(encodeURI("JavaScript")); //JavaScript
console.log(encodeURI("ДжаваСкрип")); //%D0%94%D0%B6%D0%B0%D0%B2%D0%B0%D0%A1%D0%BA%D1%80%D0%B8%D0%BF
