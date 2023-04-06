import { readFileSync } from "fs";

enum Colors {
  Red = "R",
  Green = "G",
  Blue = "B",
  Gray = "ㅠㅠ",
}

class Picture {
  constructor(public readonly rows: Colors[][]) {}

  static fromStdin() {
    const rawInput = readFileSync("/dev/stdin").toString().trim();
    const [_, ...pixels] = rawInput.split("\n").map((s) => s.trim());

    return new Picture(pixels.map((row) => Array.from(row) as Colors[]));
  }

  toRedGreenWeakness() {
    return new Picture(
      this.rows.map((row) =>
        row.map((pixel) =>
          [Colors.Red, Colors.Green].includes(pixel) ? Colors.Gray : pixel
        )
      )
    );
  }

  getSectionCount() {
    let count = 0;
    const checked = this.rows.map((row) => row.map(() => false));

    const mark = (n: number, m: number, isFirst = false) => {
      const directions = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
      ];

      if (checked[n][m]) return;
      if (isFirst && !checked[n][m]) count++;

      checked[n][m] = true;

      for (const [dx, dy] of directions) {
        if (
          !checked[n + dx] ||
          checked[n + dx]?.[m + dy] == undefined ||
          checked[n + dx]?.[m + dy]
        ) {
          continue;
        }

        if (this.rows[n + dx]?.[m + dy] === this.rows[n][m]) {
          mark(n + dx, m + dy);
        }
      }
    };

    for (let n = 0; n < this.rows.length; n++) {
      const row = this.rows[n];
      for (let m = 0; m < row.length; m++) {
        mark(n, m, true);
      }
    }

    return count;
  }
}

const inputPicture = Picture.fromStdin();
const pictureOfColorWeakness = inputPicture.toRedGreenWeakness();

console.log(
  `${inputPicture.getSectionCount()} ${pictureOfColorWeakness.getSectionCount()}`
);
