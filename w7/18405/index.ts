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
    const alreadyMoved = this.input.rows.map((row) => row.map(() => false));

    for (const _ of Array.from({ length: this.input.s })) {
      for (let index = 1; index <= this.input.k; index++) {
        for (let p = 0; p < this.input.rows.length; p++) {
          const row = this.input.rows[p];
          for (let q = 0; q < row.length; q++) {
            if (row[q] != index || alreadyMoved[p][q]) continue;

            const directions = [
              [-1, 0],
              [0, -1],
              [1, 0],
              [0, 1],
            ];

            alreadyMoved[p][q] = true;
            for (const [dx, dy] of directions) {
              if ((!dx && !dy) || !this.input.rows[p + dx]?.[q + dy]) {
                continue;
              }

              this.input.rows[p + dx][q + dy] = row[q];
            }
          }
        }
      }
    }

    return copiedRows[this.input.x][this.input.y];
  }
}

console.log(new ProblemResolver(InputHandler.fromStdin()).solve());
