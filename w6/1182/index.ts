// https://www.acmicpc.net/problem/1182

import { readFileSync } from "fs";

// N개의 정수로 이루어진 수열이 있을 때,
// 크기가 양수인 부분수열 중에서 그 수열의 원소를 다 더한 값이 S가 되는 경우의 수를 구하는 프로그램을 작성하시오.

// (1 ≤ N ≤ 20, |S| ≤ 1,000,000)

class InputHandler {
  constructor(
    public readonly n: number,
    public readonly s: number,
    public readonly numbers: number[]
  ) {}

  // 첫째 줄에 정수의 개수를 나타내는 N과 정수 S가 주어진다. (1 ≤ N ≤ 20, |S| ≤ 1,000,000)
  // 둘째 줄에 N개의 정수가 빈 칸을 사이에 두고 주어진다.
  // 주어지는 정수의 절댓값은 100,000을 넘지 않는다.
  static fromStdin() {
    const [firstLine, secondLine] = readFileSync("/dev/stdin")
      .toString()
      .split("\n");

    const [n, s] = firstLine.split(" ").map(Number);
    const numbers = secondLine.split(" ").map(Number);

    return new InputHandler(n, s, numbers);
  }
}

class ProblemResolver {
  constructor(private readonly inputHandler: InputHandler) {}

  getPartOfNumber() {
    const { numbers } = this.inputHandler;
    const { length } = numbers;

    const result: number[][] = [];

    for (let i = 0; i < 2 ** length; i++) {
      const part = numbers.filter(
        (_, index) => (i & (1 << index)) === 1 << index
      );

      if (part.length > 0) {
        result.push(part);
      }
    }

    return result;
  }

  solve(): number {
    const { s, numbers } = this.inputHandler;

    let count = 0;

    const parts = this.getPartOfNumber();

    for (const part of parts) {
      const sumOfPart = part.reduce((a, b) => a + b, 0);

      if (sumOfPart == s) {
        count++;
      }
    }

    return count;
  }
}

class OutputHandler {
  constructor(private readonly problemResolver: ProblemResolver) {}

  print() {
    console.log(this.problemResolver.solve());
  }
}

new OutputHandler(new ProblemResolver(InputHandler.fromStdin())).print();
