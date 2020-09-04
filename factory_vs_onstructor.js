// Constructors force callers to use the new keyword. Factories don’t. That’s it, but that has some relevant side-effects.

// Instantiates a new instance object and binds this to it within the constructor.

// Binds instance.__proto__ to Constructor.prototype.

// As a side-effect of 2, binds instance.__proto__.constructor to Constructor.

// Implicitly returns this, which refers to instance.

// Constructor
function Person() {}

Person.prototype.constructor = function ({ name }) {
  this.name = name;
  return this;
};

Person.prototype.greet = function () {
  return `Hi, my name is ${this.name}`;
};

const person = new Person().constructor({ name: "Eugene" });
console.log(person.greet());

// Factory
const protoPerson = {
  constructor: function (name) {
    this.name = name;
    return this;
  },

  greet: function () {
    return `Hi, my name is ${this.name}`;
  },
};

const anotherPersen = Object.create(protoPerson).constructor("Alex");
console.log(anotherPersen.greet());

console.log(protoPerson.isPrototypeOf(anotherPersen)); // ture

// a class can't anticipate the class of objects it must create

// a class wants its subclasses to specify the objects it creates

// classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate
