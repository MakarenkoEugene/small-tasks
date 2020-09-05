// The Proxy object "wraps" around another object and can intercept (and, if desired, independently process) various actions with it, for example, reading / writing properties and others. In what follows, we will refer to these objects as “proxies”.

// [[Get]]	                get	                       read
// [[Set]]	                set	                       write
// [[HasProperty]]	        has	                       operator in
// [[Delete]]	              deleteProperty	           operator delete
// [[Call]]	                apply	                     call function
// [[Construct]]	          construct	                 operator new
// [[GetPrototypeOf]]	      getPrototypeOf	           Object.getPrototypeOf
// [[SetPrototypeOf]]	      setPrototypeOf	           Object.setPrototypeOf
// [[IsExtensible]]	        isExtensible	             Object.isExtensible
// [[PreventExtensions]]	  preventExtensions	         Object.preventExtensions
// [[DefineOwnProperty]]	  defineProperty	           Object.defineProperty,
//                                                     Object.defineProperties

// [[GetOwnProperty]]	      getOwnPropertyDescriptor	 Object.getOwnPropertyDescriptor,
//                                                     for..in, Object.keys/values/entries

// [[OwnPropertyKeys]]	    ownKeys	                  Object.getOwnPropertyNames,
//                                                    Object.getOwnPropertySymbols,
//                                                    for..in, Object.keys/values/entries

let numbers = [];

numbers = new Proxy(numbers, {
  set(target, prop, val) {
    const isNumber = typeof val === "number";
    if (isNumber) target[prop] = val;
    return isNumber;
  },
});

console.log(numbers.push(1)); // 1
console.log(numbers.push(2)); // 2
console.log("length: " + numbers.length); // length: 2

try {
  console.log(numbers.push("text")); // TypeError
} catch (e) {
  console.log(e); // TypeError
}

let user = {
  name: "Вася",
  _password: "***",
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      let value = target[prop];
      return typeof value === "function" ? value.bind(target) : value; // (*)
    }
  },
  set(target, prop, val) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

try {
  console.log(user._password); // Error: Access denied
} catch (e) {
  console.log(e.message);
}

try {
  user._password = "test"; // Error: Access denied
} catch (e) {
  console.log(e.message);
}
try {
  delete user._password; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

console.log(Object.keys(user)); // ['name']
for (let key in user) console.log(key); // name

user.checkPassword = function (value) {
  return value === this._password;
};

console.log(user.checkPassword("***1")); // false
console.log(user.checkPassword("***")); // true

// The Reflect object makes this possible. Its methods are minimal wrappers around internal methods.

const user1 = {};

Reflect.set(user1, "name", "Eugene");

console.log(user1.name); // Eugene

// For every internal method intercepted by the Proxy, there is a corresponding method in Reflect that has the same name and the same arguments as the Proxy hook.

const userProxy = new Proxy(user1, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  },
});

console.log(userProxy.name); // выводит "GET name"
console.log((userProxy.name = "Piter")); // выводит "SET name=Piter"

// receiver, the third argument to the get hook. It stores a reference to the correct this context, which needs to be passed to the getter. In this case, it's admin.

let userGuest = {
  _name: "Guest",
  get name() {
    return this._name;
  },
};

let userGuestProxy = new Proxy(userGuest, {
  get(target, prop, receiver) {
    // target - userGuest { _name: "Guest" }
    // receiver - admin { _name: "Admin" }

    return target[prop];
    // return Reflect.get(target, prop, receiver);
  },
});

let admin = {
  __proto__: userGuestProxy,
  _name: "Admin",
};

console.log(admin.name); // return Guest / Admin (?!?)

// The revoke () call removes all internal references to the original object from the proxy, so there is no longer a link between them, the original object can now be garbage collected.

const object = {
  data: "Important data",
};

const { proxy, revoke } = Proxy.revocable(object, {});

console.log(proxy.data); // Important data

revoke();
// proxy doesn't work anymore (disabled)

try {
  proxy.data;
} catch (e) {
  console.log(e); // TypeError: Cannot perform 'get' on a proxy that has been revoked
}

// A proxy has no properties or methods of its own. It simply intercepts the operation if there is a matching hook, and redirects otherwise.
