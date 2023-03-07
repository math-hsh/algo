const fs = require("fs");

const [[_], numbers] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((s) => s.split(" ").map(Number));

const copied = Array.from(numbers).fill(0);

if (copied.length === 1) {
  console.log(numbers[0].toString());
} else {
  copied[0] = numbers[0];

  for (let index = 1; index < copied.length; index++) {
    copied[index] =
      numbers[index] +
      Math.max(
        ...copied.filter((_, _index) => {
          return numbers[_index] < numbers[index];
        }),
        0
      );
  }

  console.log(Math.max(...copied).toString());
}
