// https://www.acmicpc.net/problem/10819

import { readFileSync } from "fs";

class InputHandler {
  constructor(public readonly numbers: number[]) {}

  static fromStdin() {
    const numbers = readFileSync("/dev/stdin")
      .toString()
      .trim()
      .split("\n")
      .pop()
      ?.split(" ")
      .map((n) => +n.trim());

    return new InputHandler(numbers || []);
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  calcWeirdSum(): number {
    let result = 0;

    for (let index = 0; index < this.input.numbers.length - 1; index++) {
      const element = this.input.numbers[index];
      result += Math.abs(element - this.input.numbers[index + 1]);
    }

    return result;
  }

  getAllPermutations(): number[][] {
    const result: number[][] = [];

    if (this.input.numbers.length == 0) {
      return [];
    }

    if (this.input.numbers.length == 1) {
      return [[this.input.numbers[0]]];
    }

    for (let index = 0; index < this.input.numbers.length; index++) {
      const currentNumber = this.input.numbers[index];

      const numbersWithoutCurrentNumber = this.input.numbers.filter(
        (_, innerIndex) => innerIndex != index
      );

      result.push(
        ...new ProblemResolver(new InputHandler(numbersWithoutCurrentNumber))
          .getAllPermutations()
          .map((numbers) => [currentNumber, ...numbers])
      );
    }

    return result;
  }

  solve(): number {
    const permutations = this.getAllPermutations();

    // console.log({ permutations });

    const sums = permutations.map((numbers) =>
      new ProblemResolver(new InputHandler(numbers)).calcWeirdSum()
    );

    return Math.max(...sums);
  }
}

class OutputHandler {
  constructor(private readonly problemResolver: ProblemResolver) {}

  print() {
    console.log(this.problemResolver.solve().toString());
  }
}

new OutputHandler(new ProblemResolver(InputHandler.fromStdin())).print();
