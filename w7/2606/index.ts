import { readFileSync } from "fs";

const initialBadComputer = 1;

class InputHandler {
  constructor(
    public readonly computerAmount: number,
    public readonly connectedAmount: number,
    public readonly connections: [number, number][]
  ) {}

  static fromStdin() {
    const rawInput = readFileSync("/dev/stdin").toString().trim();

    const [computerAmount, connectedAmount, ...rawConnections] = rawInput
      .split("\n")
      .map((s) => s.trim());

    const connections = rawConnections.map(
      (s) => s.split(" ").map((s) => Number(s.trim())) as [number, number]
    );

    return new InputHandler(+computerAmount, +connectedAmount, connections);
  }
}

class ProblemResolver {
  constructor(private readonly input: InputHandler) {}

  solve() {
    const badComputers = new Set<number>();

    badComputers.add(initialBadComputer);

    for (let _ = 0; _ < this.input.computerAmount; _++) {
      for (const [n, m] of this.input.connections) {
        if (badComputers.has(n) || badComputers.has(m)) {
          badComputers.add(n);
          badComputers.add(m);
        }
      }
    }

    return badComputers.size - 1;
  }
}

console.log(new ProblemResolver(InputHandler.fromStdin()).solve());
