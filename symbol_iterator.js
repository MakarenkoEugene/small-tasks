let rangeObj = {
  from: 1,
  to: 5,
  name: "Eugene",
  age: 23,
  age2: 213,
};

const rangeArr = [1, 2, 3, 4, 5];

rangeObj[Symbol.iterator] = function () {
  return {
    current: 0,
    values: Object.entries(this).map((item) => item[1]),

    next() {
      if (this.values.length > this.current) {
        const value = this.values[this.current];
        this.current++;

        return { done: false, value };
      }
      return { done: true };
    },
  };
};

for (let value of rangeObj) {
  console.log(value); // 1, затем 2, 3, 4, 5
}
