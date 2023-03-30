// Solve https://www.acmicpc.net/problem/14713

import { readFileSync } from "fs";

class Queue<T> {
  private list: T[];

  constructor(_list: T[]) {
    this.list = [..._list];
  }

  enqueue(item: T) {
    this.list.unshift(item);
  }

  dequeue(): T | undefined {
    return this.list.shift();
  }

  *forDequeueEach() {
    while (this.list.length > 0) {
      yield this.dequeue() as T;
    }
  }

  get firstElement(): T | undefined {
    return this.list[0];
  }

  get isEmpty(): boolean {
    return this.list.length === 0;
  }

  static fromStringWords(str: string) {
    return new Queue(str.split(" "));
  }
}

class InputHandler {
  constructor(
    private readonly result: string,
    private readonly messages: string[]
  ) {}

  static readStdin() {
    const [_, ...messages] = readFileSync("/dev/stdin")
      .toString()
      .trim()
      .split("\n");
    const target = (messages.pop() || "").trim();
    return new InputHandler(target, messages);
  }

  solve() {
    const messagesQueue = this.messages.map(Queue.fromStringWords);

    for (const word of Queue.fromStringWords(this.result).forDequeueEach()) {
      let satisfied = false;

      for (const queue of messagesQueue) {
        if (!queue.isEmpty && queue.firstElement === word) {
          queue.dequeue();
          satisfied = true;
          break;
        }
      }

      if (!satisfied) {
        return false;
      }
    }

    return messagesQueue.every((queue) => queue.isEmpty);
  }
}

class OutputHandler {
  constructor(private readonly input: InputHandler) {}

  print() {
    console.log(this.input.solve() ? "Possible" : "Impossible");
  }
}

new OutputHandler(InputHandler.readStdin()).print();
