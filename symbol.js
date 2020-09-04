const symbol = Symbol("symbol");

console.log(symbol === Symbol("symbol")); // false
console.log(symbol.description); // symbol

const objectWithSympolIdentifier = { [symbol]: "symbol" };

for (const key in objectWithSympolIdentifier) console.log(key); // there will be no call

console.log(objectWithSympolIdentifier[symbol]); // symbol
