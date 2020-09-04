// Basic operators

// delete
// const Human = class {
//   constructor(props) {
//     this.name = props.name;

//     this.age = new Date().getFullYear() - props.yearOfBirth;
//   }

//   onSayName() {
//     return `My name is ${this.name}`;
//   }
// };

function Human(){}
Human.prototype.lifeArea = { galaxy: "Milky Way", star: "Sol", planet: [ "Earth" ] };

const obj = new Human({ name: "Eugene", yearOfBirth: 1997 });

console.log(obj); // { name: 'Eugene', age: 23 }
console.dir(obj.prototype); // { name: 'Eugene', age: 23 }

console.log(delete obj.age); // true
console.log(obj); // { name: 'Eugene' }


console.log(obj.onSayName()); // My name is Eugene
console.log(delete obj.onSpeak); // true

console.log(obj.onSayName()); // My name is Eugene
// If an object inherits a property from the prototype and does not have its own property with the same name, the property cannot be deleted when accessed through that object. However, you can remove this property directly in the prototype.

console.log(delete obj.__proto__.onSayName); // true

console.log(obj.onSayName); // undefined

// const arr = [1, 2, 3];

// delete arr[1];

// console.log(obj.name); // undefined
// console.log(arr[1]); // undefined
// console.log(arr.length); // 3

// const log_ = "log-asdf";

// console.log(log_);

// delete this.log_;

// console.log(log_);
