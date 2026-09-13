/**
 * Counter Module
 *
 * Simple counter with increment, decrement, and reset functionality.
 * Contains an intentional bug for teaching purposes.
 */

export class Counter {
  constructor() {
    // BUG #2: Counter should start at 0, not 10
    this.count = 10;  // ← INTENTIONAL BUG: Change to 0 to fix
  }

  increment() {
    this.count++;
    return this.count;
  }

  decrement() {
    this.count--;
    return this.count;
  }

  reset() {
    this.count = 0;
    return this.count;
  }

  getCount() {
    return this.count;
  }
}

export function createCounter() {
  return new Counter();
}
