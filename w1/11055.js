const fs = require("fs");

const [[_], numbers] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((s) => s.split(" ").map(Number));

/**
 *
 * @param {number[]} _numbers
 * @returns {number} - 수열의 합
 */
function sumOf(_numbers) {
  return _numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
}

/**
 *
 * @param {number[][]} _numbers
 * @returns {boolean} - 증가하는 수열인가?
 */
function isIncreaseNumbers(_numbers) {
  if (numbers.length == 0) {
    return false;
  }

  if (numbers.length == 1) {
    return true;
  }

  let previousValue = _numbers[0];
  for (let index = 1; index < _numbers.length; index++) {
    if (previousValue > _numbers[index]) {
      return false;
    }

    previousValue = _numbers[index];
  }

  return true;
}

/**
 *
 * @param {number[]} _numbers
 * @returns {number[][]} - 주어진 수열의 증가하는 부분 수열
 */
function splitIncreasedNumbers(_numbers) {
  /**
   * @type {number[][]} 결과값
   */
  const results = [];

  function getSubset(flags) {
    return _numbers.filter((_, index) => flags[index]);
  }

  const to = _numbers.length ** 2 - 1;

  for (let x = 0; x < to; x++) {
    const sub = getSubset(
      [...x.toString(2).padStart(_numbers.length - 1, "0")].map(Number)
    );

    if (sub.length && isIncreaseNumbers(sub)) {
      results.push(sub);
    }
  }

  return results;
}

console.log(Math.max(...splitIncreasedNumbers(numbers).map(sumOf)).toString());
// console.log(splitIncreasedNumbers(numbers));
