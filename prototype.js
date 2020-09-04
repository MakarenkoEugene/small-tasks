// F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object.

// If, after the creation, F.prototype property changes (F.prototype = <another object>), then new objects created by new F will have another object as [[Prototype]], but already existing objects keep the old one.

const Person = {
  constructor: function (name) {
    this.name = name;
    return this;
  },

  greet: function () {
    return `Hi, my name is ${this.name}`;
  },
};

const Developer = Object.create(Person);

Developer.constructor = function (name, skils) {
  Person.constructor.apply(this, arguments);

  this.skils = skils || [];
  return this;
};

Developer.whatСan = function () {
  return `I can: ${this.skils.join(", ")}.`;
};

const developer = Object.create(Developer).constructor("Eugene", ["html", "css", "js"]);

console.log(Developer.isPrototypeOf(developer)); // ture
console.log(Person.isPrototypeOf(developer)); // ture
console.log(developer.greet());
console.log(developer.whatСan());

let animal = {
  jumps: null,
};

let rabbit = {
  __proto__: animal,
  jumps: true,
};

console.log(rabbit.jumps); // true, from rabbit

delete rabbit.jumps;

console.log(rabbit.jumps); // null, from animal

delete animal.jumps;

console.log(rabbit.jumps); // undefined

// Links cannot go in a circle. JavaScript will throw an error if we try to assign __proto__ in a circle.
// The __proto__ value can be an object or null. Other types are ignored.

const hamster = {
  stomach: [],

  eat(food) {
    this.stomach = [...this.stomach, food];
  },
};

let speedy = {
  __proto__: hamster,
};

let lazy = {
  __proto__: hamster,
};

speedy.eat("apple");
console.log(speedy.stomach); // apple

console.log(lazy.stomach); // []

// Objects can have properties that don't show up when iterated through the particular object using Object.keys() or for...in loop.Those type of properties are called as non-enumerable properties.

const p = {
  name: "gopal",
};

p.age = "21";

p["country"] = "India";

Object.defineProperty(p, "salary", {
  value: "80,000$",
  enumerable: false,
});

console.log(Object.keys(p)); // ["name", "age", "country"]

console.log(p); //{name: "gopal", age: "21", country: "India", salary: "80,000$"}

Object.defineProperty( p, "CONSTANT", {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: true
});

console.log(p.CONSTANT += 2); // 3
console.log(p.CONSTANT = "value"); // value
console.log(p.CONSTANT); // 1

// Accessor properties are an exception because writing to them is handled by a setter function. That is, it is, in fact, a function call.

const user = {
  name: "Name",
  surname: "Surname",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // Name Surname

admin.fullName = "Alice Cooper";

console.log(admin.name); // Alice
console.log(admin.surname); // Cooper
