function createCounter() {
  let counter = 0;
  return {
    increment: function () {
      counter++;
      console.log(`counter incremented to ${counter}`);
    },
    decrement: function () {
      counter--;
      console.log(`counter decremented to ${counter}`);
    },
    getCount: function () {
      return counter;
    },
    reset: function () {
      counter = 0;
      console.log(`counter value reset to ${counter}`);
    },
  };
}

let count = createCounter();
count.increment();
count.increment();
count.decrement();
count.increment();
count.reset();
count.increment();
count.increment();
count.increment();
count.increment();
console.log(`Counter value at: ${count.getCount()}`);

function memoize(fn) {
  let map = new Map();
  return (...args) => {
    let key = args.join(",");
    if (!map.has(key)) {
      let value = fn(key);
      map.set(key, value);
      return value;
    } else {
      return map.get(key);
    }
  };
}
function fib(...args) {
  let num = Number(args.join(","));
  if (num == 0 || num == 1) {
    return num;
  } else {
    let val1 = fib(num - 1);
    let val2 = fib(num - 2);
    return val1 + val2;
  }
}
const obj1 = memoize(fib);
console.time("firstcall");
console.log(`10th term of fibonacci is ${obj1(10)}`);
console.timeEnd("firstcall");
const obj2 = memoize(fib);
console.time("secondcall");
console.log(`10th term of fibonacci is ${obj1(10)}`);
console.timeEnd("secondcall");

function once(fn) {
  let count = 0;
  let value;
  return (...args) => {
    if (count == 0) {
      count++;
      value = fn(args);
      return value;
    }
    return value;
  };
}
function add(nums) {
  let [num1, num2] = nums;
  return num1 + num2;
}
const obj3 = once(add);
console.log(`${obj3(100, 60)}`);
console.log(`${obj3(200, 60)}`); //output 160

function createRateLimiter(fn, maxCalls, windowMs) {
  let calls = [];
  return (...args) => {
    const now = new Date();
    calls = calls.filter((call) => now - call < windowMs);
    if (calls.length < maxCalls) {
      calls.push(now);
      return fn(args);
    } else {
      console.log("Cant proceed your request\n");
    }
  };
}
const multiply = function (args) {
  let [arg1, arg2] = args;
  console.log(arg1 * arg2);
};

const ratelimiter = createRateLimiter(multiply, 2, 1000);
ratelimiter(5, 4);
ratelimiter(3, 4);
ratelimiter(5, 9);
