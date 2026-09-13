/**
 * Tests for string-utils.js
 * 13 tests total - 2 will FAIL due to the countWords bug.
 * Uses Node.js built-in assert (zero dependencies).
 */

const assert = require('assert');
const { capitalize, reverse, countWords, truncate, isPalindrome } = require('../src/string-utils');

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  PASS: ${name}`);
  } catch (err) {
    failed++;
    failures.push({ name, message: err.message });
    console.log(`  FAIL: ${name}`);
    console.log(`        ${err.message}`);
  }
}

console.log('\nstring-utils test suite\n');

// --- capitalize tests ---
console.log('capitalize:');

test('capitalizes first letter', () => {
  assert.strictEqual(capitalize('hello'), 'Hello');
});

test('handles empty string', () => {
  assert.strictEqual(capitalize(''), '');
});

test('handles already capitalized', () => {
  assert.strictEqual(capitalize('Hello'), 'Hello');
});

// --- reverse tests ---
console.log('\nreverse:');

test('reverses a string', () => {
  assert.strictEqual(reverse('hello'), 'olleh');
});

test('reverses single char', () => {
  assert.strictEqual(reverse('a'), 'a');
});

// --- countWords tests ---
console.log('\ncountWords:');

test('counts simple words', () => {
  assert.strictEqual(countWords('hello world'), 2);
});

test('counts single word', () => {
  assert.strictEqual(countWords('hello'), 1);
});

test('handles empty string', () => {
  assert.strictEqual(countWords(''), 0);
});

// THIS TEST FAILS - newlines between words
test('handles newlines between words', () => {
  assert.strictEqual(countWords('hello\nworld\nfoo'), 3);
});

// THIS TEST FAILS - tabs between words
test('handles tabs between words', () => {
  assert.strictEqual(countWords('hello\tworld\there'), 3);
});

// --- truncate tests ---
console.log('\ntruncate:');

test('truncates long string', () => {
  assert.strictEqual(truncate('hello world', 5), 'hello...');
});

test('does not truncate short string', () => {
  assert.strictEqual(truncate('hi', 10), 'hi');
});

// --- isPalindrome tests ---
console.log('\nisPalindrome:');

test('detects palindrome', () => {
  assert.strictEqual(isPalindrome('racecar'), true);
});

// --- Summary ---
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);

if (failures.length > 0) {
  console.log('\nFailed tests:');
  failures.forEach(f => console.log(`  - ${f.name}: ${f.message}`));
}

console.log('');

process.exit(failed > 0 ? 1 : 0);
