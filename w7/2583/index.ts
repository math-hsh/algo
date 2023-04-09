import { readFileSync } from "fs";

interface Coord {
  x: number;
  y: number;
}

class Rectangle {
  constructor(
    public readonly leftTop: Coord,
    public readonly rightBottom: Coord
  ) {}
}

class InputHandler {
  constructor(
    public readonly m: number,
    public readonly n: number,
    public readonly k: number,
    public readonly rectangles: Rectangle[]
  ) {}

  static fromStdin() {
    const rawInput = readFileSync("/dev/stdin").toString().trim();
    const [firstLine, ...restLine] = rawInput.split("\n");
    const [m, n, k] = firstLine.split(" ").map((s) => Number(s.trim()));

    return new InputHandler(
      m,
      n,
      k,
      restLine
        .map((row) =>
          row
            .trim()
            .split(" ")
            .map((s) => Number(s.trim()))
        )
        .map(
          ([sx, sy, ex, ey]) =>
            new Rectangle({ x: sx, y: sy }, { x: ex, y: ey })
        )
    );
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  createMatrix() {
    return Array.from({ length: this.input.m }).map(() =>
      Array.from({ length: this.input.n }).map(() => false)
    );
  }

  solve() {
    const blocked = this.createMatrix();
    const checked = this.createMatrix();

    for (const rectangle of this.input.rectangles) {
      const sx = rectangle.leftTop.x;
      const ex = rectangle.rightBottom.x;
      const sy = rectangle.leftTop.y;
      const ey = rectangle.rightBottom.y;

      for (let x = sx; x < ex; x++) {
        for (let y = sy; y < ey; y++) {
          blocked[y][x] = true;
          checked[y][x] = true;
        }
      }
    }

    let count = 0;
    const spaces: number[] = [];

    const mark = (x: number, y: number, isFirst = false) => {
      const directions = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
      ];

      if (checked[x][y]) return;

      if (isFirst) {
        count++;
        spaces[count - 1] ??= 1;
      } else {
        spaces[count - 1]++;
      }

      checked[x][y] = true;

      for (const [dx, dy] of directions) {
        if (
          !checked[x + dx] ||
          checked[x + dx]?.[y + dy] == undefined ||
          checked[x + dx]?.[y + dy]
        ) {
          continue;
        }

        if (!blocked[x + dx]?.[y + dy]) {
          mark(x + dx, y + dy);
        }
      }
    };

    for (let x = 0; x < this.input.m; x++) {
      for (let y = 0; y < this.input.n; y++) {
        mark(x, y, true);
      }
    }

    return {
      count,
      spaces,
    };
  }
}

class OutputHandler {
  constructor(private readonly input: InputHandler) {}

  print() {
    const answer = new ProblemResolver(this.input).solve();

    console.log(
      `${answer.count}\n` + [...answer.spaces].sort((a, b) => a - b).join(" ")
    );
  }
}

new OutputHandler(InputHandler.fromStdin()).print();
