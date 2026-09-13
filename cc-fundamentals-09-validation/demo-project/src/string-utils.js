/**
 * String utility functions.
 * Note: countWords has an intentional bug for demo purposes.
 */

/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverse a string.
 * @param {string} str
 * @returns {string}
 */
function reverse(str) {
  return str.split('').reverse().join('');
}

/**
 * Count words in a string.
 * BUG: Splits on single space ' ' instead of /\s+/
 * This fails on multiple spaces, tabs, and leading/trailing whitespace.
 * @param {string} str
 * @returns {number}
 */
function countWords(str) {
  if (!str || !str.trim()) return 0;
  return str.split(' ').filter(w => w.length > 0).length;
}

/**
 * Truncate a string to a max length, adding "..." if truncated.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '...';
}

/**
 * Check if a string is a palindrome (case-insensitive).
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

module.exports = { capitalize, reverse, countWords, truncate, isPalindrome };
