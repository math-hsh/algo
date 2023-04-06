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
    const [m, n, k] = firstLine.split(" ").map(Number);

    return new InputHandler(
      m,
      n,
      k,
      restLine
        .map((row) => row.split(" ").map(Number))
        .map(
          ([sx, sy, ex, ey]) =>
            new Rectangle({ x: sx, y: sy }, { x: ex, y: ey })
        )
    );
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  solve() {
    const blocked = Array.from({ length: this.input.n }).map(() =>
      Array.from({ length: this.input.m }).map(() => false)
    );

    for (const rectangle of this.input.rectangles) {
      const sx = rectangle.leftTop.x;
      const ex = rectangle.rightBottom.x;
      const sy = rectangle.leftTop.y;
      const ey = rectangle.rightBottom.y;

      for (let x = sx; x <= ex; x++) {
        for (let y = sy; y <= ey; y++) {
          blocked[x][y] = true;
        }
      }
    }

    console.log({ blocked });
  }
}

console.log(new ProblemResolver(InputHandler.fromStdin()).solve());
