// A, B (1 ≤ A < B ≤ 109)

import { readFileSync } from "fs";

class InputHandler {
  constructor(public readonly a: number, public readonly b: number) {}

  static fromStdin() {
    const rawInput = readFileSync("/dev/stdin").toString().trim();
    const [a, b] = rawInput.split(" ").map(Number);
    return new InputHandler(a, b);
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  solve() {
    const isEndWith1 = (n: number) => n % 10 == 1;
    const cut1InLast = (n: number) => (n - 1) / 10;
    const isEven = (n: number) => n % 2 == 0;
    const half = (n: number) => n / 2;

    let counts = new Set<number>();
    const moveToA = (b: number, depth = 1) => {
      let newNumber: number | undefined = undefined;

      if (isEndWith1(b)) {
        newNumber = cut1InLast(b);
      } else if (isEven(b)) {
        newNumber = half(b);
      }

      if (newNumber) {
        if (newNumber == this.input.a) {
          counts.add(depth);
        } else {
          moveToA(newNumber, depth + 1);
        }
      }
    };

    moveToA(this.input.b);
    return counts.size ? Math.min(...counts) + 1 : -1;
  }
}

console.log(new ProblemResolver(InputHandler.fromStdin()).solve());
