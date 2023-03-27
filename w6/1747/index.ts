// https://www.acmicpc.net/problem/1747

// 어떤 수와 그 수의 숫자 순서를 뒤집은 수가 일치하는 수를 팰린드롬이라 부른다.
// 예를 들어 79,197과 324,423 등이 팰린드롬 수이다.

// 어떤 수 N (1 ≤ N ≤ 1,000,000)이 주어졌을 때, N보다 크거나 같고,
// 소수이면서 팰린드롬인 수 중에서, 가장 작은 수를 구하는 프로그램을 작성하시오.

import { readFileSync } from "fs";

class MathLogic {
  static isPrime(n: number) {
    // TODO: 에라토스테네스의 체를 이용해서 소수를 구하는 방법으로 개선

    if (n === 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
      if (n % i === 0) return false;
    }

    return true;
  }

  static isPalindrome(n: number) {
    // 성능을 개선할 수 있을까?

    const str = n.toString();
    const { length } = str;

    for (let i = 0; i < length / 2; i++) {
      if (str[i] !== str[length - i - 1]) return false;
    }

    return true;
  }
}

class InputHandler {
  constructor(public readonly n: number) {}

  static readFromStdin() {
    const n = Number(readFileSync("/dev/stdin").toString().trim());
    return new InputHandler(n);
  }

  solve() {
    let { n } = this;

    while (true) {
      if (MathLogic.isPrime(n) && MathLogic.isPalindrome(n)) {
        return n;
      }

      n++;
    }
  }
}

class OutputHandler {
  constructor(private readonly input: InputHandler) {}

  print() {
    console.log(this.input.solve().toString());
  }
}

const input = InputHandler.readFromStdin();
new OutputHandler(input).print();
