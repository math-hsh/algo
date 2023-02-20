const fs = require("fs");

const [lines, ...numbers] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map(Number);

const fiboCache = {};

function fibo(n) {
  if (fiboCache[n]) {
    return fiboCache[n];
  }

  if (n == 0 || n == 1) {
    return n;
  }

  const value = fibo(n - 1) + fibo(n - 2);
  fiboCache[n] = value;
  return value;
}

const minimumInputCache = {};

function getMinimumInput(m) {
  if (m == 0 || m == 1) {
    return m;
  }

  if (m < 2) {
    return 1;
  }

  if (minimumInputCache[m]) return minimumInputCache[m];

  for (let i = 0; i < m + 2; i++) {
    if (fibo(i) > m) {
      const result = i - 1;
      minimumInputCache[m] = result;
      return result;
    }

    if (fibo(i) == m) {
      minimumInputCache[m] = i;
      return i;
    }
  }
}

function getResult(inp) {
  if (inp == 1 || inp == 0) {
    return console.log(inp.toString());
  }

  let rest = inp;
  let list = [];

  while (rest) {
    const x = getMinimumInput(rest);
    list.push(x);
    rest -= fibo(x);
  }

  console.log(
    list
      .map(fibo)
      .sort((a, b) => a - b)
      .join(" ")
  );
}

numbers.slice(0, lines).forEach(getResult);
