import { readFileSync } from "fs";

// 이게 왜 골드..?

class InputHandler {
  constructor(
    public readonly rows: number[][],
    public readonly s: number,
    public readonly n: number,
    public readonly k: number,
    public readonly x: number,
    public readonly y: number
  ) {}

  static fromStdin() {
    const rawInput = readFileSync("/dev/stdin").toString().trim();
    const rawRows = rawInput.split("\n");
    const [n, k] = (rawRows.shift() || "").trim().split(" ").map(Number);
    const [s, x, y] = (rawRows.pop() || "").trim().split(" ").map(Number);

    const rows = rawRows.map((s) => s.split(" ").map(Number));

    return new InputHandler(rows, s, n, k, x, y);
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  solve() {
    const copiedRows = this.input.rows.map((row) => [...row]);

    return copiedRows[this.input.x][this.input.y];
  }
}

console.log(new ProblemResolver(InputHandler.fromStdin()).solve());
