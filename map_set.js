// Map – это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.

// map.set(key, value) – записывает по ключу key значение value.
// map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
// map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
// map.delete(key) – удаляет элемент по ключу key.
// map.clear() – очищает коллекцию от всех элементов.
// map.size – возвращает текущее количество элементов.

let map = new Map(); //  создаёт коллекцию
console.log(map.get("a")); // возвращает значение по ключу или undefined, если ключ key отсутствует
console.log(map.set("a", { a: "a" })); //записывает по ключу key значение value
console.log(map.has("a")); //  возвращает true, если ключ key присутствует в коллекции, иначе false
console.log(map.delete("a")); // удаляет элемент по ключу key. возвращает true/false

console.log(map.set({ a: 1 }, ["a"]));

console.log(map.get({ a: 1 })); // undefined
// Чтобы сравнивать ключи, объект Map использует алгоритм SameValueZero. Это почти такое же сравнение, что и ===, с той лишь разницей, что NaN считается равным NaN. Так что NaN также может использоваться в качестве ключа.

let obj = { a: 1 };
console.log(map.set(obj, "obj"));

console.log(map.get(obj, "obj")); // obj

console.log(map.size); // 2 – возвращает текущее количество элементов.

// map.keys() – возвращает итерируемый объект по ключам,
// map.values() – возвращает итерируемый объект по значениям,

// // map.keys() – возвращает итерируемый объект по ключам.
for (let a of map.keys()) {
  console.log(a); // { a: 1 }, { a: 1 }
}

// map.values() – возвращает итерируемый объект по значениям
for (let a of map.values()) {
  console.log(a); // ["a"], obj
}

// map.entries() – возвращает итерируемый объект по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of
for (let a of map) {
  // то же самое, что и recipeMap.entries()
  console.log(a);
}

// В отличие от обычных объектов Object, в Map перебор происходит в том же порядке, в каком происходило добавление элементов.

// Кроме этого, Map имеет встроенный метод forEach, схожий со встроенным методом массивов Array

map.forEach((value, key, map) => {
  console.log(`${key}: ${value}`); // огурец: 500 и так далее
});

map.clear(); // – очищает коллекцию от всех элементов.
console.log(map.size); // 0

// При создании Map мы можем указать массив (или другой итерируемый объект) с парами ключ-значение для инициализации

map = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

console.log(map.get("1")); // str1

// Если у нас уже есть обычный объект, и мы хотели бы создать Map из него
obj = {
  name: "John",
  age: 30,
};

map = new Map(Object.entries(obj));

console.log(map.get("name")); // John

// Object.fromEntries, делает противоположное: получив массив пар вида [ключ, значение], он создаёт из них объект:

console.log(Object.fromEntries(map.entries())); // {name: "John", age: 30}

// Это то же самое, так как Object.fromEntries ожидает перебираемый объект в качестве аргумента
console.log(Object.fromEntries(map)); // {name: "John", age: 30}

// Объект Set – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.

let set = new Set([...Object.values(obj), "123", 321, 30]); // – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set

console.log(set); // {"John", 30, "123", 321} // 30 одно

console.log(set.add("3ws")); // {"John", 30, "123", 321, "3ws"}

console.log(set.delete("3ws")); // true

console.log(set.has("3ws")); // false

console.log(set.size); // 4

// Функция в forEach у Set имеет 3 аргумента: значение value, потом снова то же самое значение valueAgain, и только потом целевой объект.

set.forEach((value, valueAgain, obj) => {
  console.log(value === valueAgain); // true x4

  console.log(obj);
});

// Перебор Map и Set всегда осуществляется в порядке добавления элементов, так что нельзя сказать, что это – неупорядоченные коллекции, но поменять порядок элементов или получить элемент напрямую по его номеру нельзя.

console.log(set[0]); // undefined
console.log(map[0]); // undefined

set.clear();

console.log(set); // {}

// задачка

function unique(arr) {
  return Array.from(new Set(arr.values()));
}

let values = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Krishna", "Hare", "Hare", ":-O"];

console.log(unique(values)); // Hare, Krishna, :-O
