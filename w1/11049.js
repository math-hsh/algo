const fs = require("fs");

const [lines, ...matrixes] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((l) => l.split(" ").map(Number));

for (let index = 0; index < matrixes.length; index++) {
  const [n, m] = matrixes[index];
}
