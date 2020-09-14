// Copying objects

const obj = {
  a: "a",
  b: "b",
  c() {
    console.log("c");
  },
  d: {
    a: "a",
    b() {
      console.log("c");
    },
  },
};

const objCopeWithAssign = Object.assign({}, obj);
// Это метод используется для копирования значений всех собственных перечисляемых свойств из одного или нескольких исходных объектов в один целевой объект.

// Поверхностная копия скопирует только top-level свойства, но вложенные объекты будут использоваться между оригиналом, так и копией.

objCopeWithAssign.a = "aa";
console.log(objCopeWithAssign.a); // aa
console.log(obj.a); // a

objCopeWithAssign.d.a = "aa";
console.log(objCopeWithAssign.d.a); // aa
console.log(obj.d.a); // aa

obj.c = () => console.log("cc");
objCopeWithAssign.c(); // c
obj.c(); // cc

obj.d.b = () => console.log("cc");
objCopeWithAssign.d.b(); // cc
obj.d.b(); // cc

// Глубокая копия продублирует каждый объект на пути копирования.

const objCopeWithJson = JSON.parse(JSON.stringify(obj));

console.log(objCopeWithJson.c); // undefined
console.log(objCopeWithJson.d.b); // undefined

objCopeWithJson.d.a = "a";
console.log(objCopeWithJson.d.a); // a
console.log(obj.d.a); // aa



const objCopeWithSpread = { ...obj };

objCopeWithSpread.a = "aaa";
console.log(objCopeWithSpread.a); // aa
console.log(obj.a); // aaa

objCopeWithSpread.d.a = "aaa";
console.log(objCopeWithSpread.d.a); // aaa
console.log(obj.d.a); // aaa

obj.c = () => console.log("ccc");
objCopeWithSpread.c(); // cc
obj.c(); // ccc


obj.d.b = () => console.log("ccc");
objCopeWithSpread.d.b(); // ccc
obj.d.b(); // ccc