/**
 * Counter Tests
 *
 * Simple test suite for the Counter class.
 * Uses Node.js assert module (no test framework needed).
 */

import { Counter } from '../src/counter.js'
import assert from 'assert'

console.log('Running Counter Tests...\n')

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`✓ ${name}`)
    passed++
  } catch (error) {
    console.log(`✗ ${name}`)
    console.log(`  ${error.message}\n`)
    failed++
  }
}

// Test 1: Counter starts at 0
test('Counter should start at 0', () => {
  const counter = new Counter()
  assert.strictEqual(counter.getCount(), 0, 'Initial count should be 0')
})

// Test 2: Increment increases count
test('Increment should increase count by 1', () => {
  const counter = new Counter()
  counter.increment()
  assert.strictEqual(counter.getCount(), 1, 'Count should be 1 after increment')
})

// Test 3: Decrement decreases count
test('Decrement should decrease count by 1', () => {
  const counter = new Counter()
  counter.decrement()
  assert.strictEqual(counter.getCount(), -1, 'Count should be -1 after decrement')
})

// Test 4: Reset sets count to 0
test('Reset should set count to 0', () => {
  const counter = new Counter()
  counter.increment()
  counter.increment()
  counter.reset()
  assert.strictEqual(counter.getCount(), 0, 'Count should be 0 after reset')
})

// Test 5: Multiple operations work correctly
test('Multiple operations should work correctly', () => {
  const counter = new Counter()
  counter.increment() // 1
  counter.increment() // 2
  counter.decrement() // 1
  assert.strictEqual(counter.getCount(), 1, 'Count should be 1 after +2-1')
})

// Summary
console.log('\n' + '='.repeat(40))
console.log(`Tests: ${passed + failed}`)
console.log(`Passed: ${passed}`)
console.log(`Failed: ${failed}`)
console.log('='.repeat(40))

// Exit with appropriate code
process.exit(failed > 0 ? 1 : 0)
