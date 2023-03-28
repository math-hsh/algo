// https://www.acmicpc.net/problem/15654

import { readFileSync } from "fs";

class InputHandler {
  constructor(
    public readonly n: number,
    public readonly m: number,
    public readonly numbers: number[]
  ) {}

  static fromStdin() {
    const [firstLine, secondLine] = readFileSync("/dev/stdin")
      .toString()
      .split("\n");

    const [n, m] = firstLine.split(" ").map(Number);
    const numbers = secondLine.split(" ").map(Number);

    return new InputHandler(n, m, numbers);
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  resolve(): number[][] {
    const { n, m, numbers } = this.input;

    const sortedNumbers = numbers.sort((a, b) => {
      return a - b;
    });

    if (m == 1) {
      return sortedNumbers.map((number) => [number]);
    }

    const result: number[][] = [];

    for (const wtf of sortedNumbers) {
      const subInput = new InputHandler(
        n - 1,
        m - 1,
        sortedNumbers.filter((number) => number !== wtf)
      );

      const subResult = new ProblemResolver(subInput).resolve();

      for (const subResultLine of subResult) {
        result.push([wtf, ...subResultLine]);
      }
    }

    return result;
  }
}

class OutputHandler {
  constructor(private readonly input: InputHandler) {}

  print() {
    const lines = new ProblemResolver(this.input).resolve();
    for (const line of lines) {
      console.log(line.join(" "));
    }
  }
}

new OutputHandler(InputHandler.fromStdin()).print();
