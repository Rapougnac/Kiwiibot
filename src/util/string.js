// eslint-disable-next-line no-unused-vars
const { Message, UserFlags, BitField } = require('discord.js');

/**
 * TextTruncate -> Shortens the string to desired length
 * @param {string} str the string to test with
 * @param {number} length the length the string should have
 * @param {string} end the end of the string indicating it's truncated
 * @returns {string} Truncated string
 */
function textTruncate(str = '', length = 100, end = '...') {
  return (
    String(str).substring(0, length - end.length) +
    (str.length > length ? end : '')
  );
}

/**
 * Appends ordinal suffixes to input numbers. Max input before failing is 10e307
 * @param {number|string} n the Number to append ordinal suffix to
 * @example ordinalize(10) -> returns `10th`; ordinalize(22) -> returns `22nd`
 * @returns {string} Ordinalized number
 * @note Does not support negative numbers!
 */
function ordinalize(n = 0) {
  return (
    Number(n) + ['st', 'nd', 'rd'][(n / 10) % 10 ^ 1 && n % 10] ||
    Number(n) + 'th'
  );
}

/**
 *
 * @param {number|string} number The number to separte
 * @param {string} [sep] The searator of the numbers
 * @example separateNumbers(123456); // will return `123'456`;
 * separateNumbers(1234.567); // will return `1'234.567`;
 * @returns {string} The numbers with quotation marks
 */
function separateNumbers(number, sep = "'") {
  return Number(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/**
 * Joins array via oxford comma and append 'and' on last 2 items
 * @param {*[]} array the array to join
 * @returns {string} the joined array
 */
function joinArray(array = [], lang = 'en-US') {
  let list = new Intl.ListFormat(lang);
  return list.format(array.map((x) => String(x)));
}
/**
 * Join array and add a limiter.
 * @param {*[]} array the array to join
 * @param {number|string} limit the maximum length of the string output
 * @param {string} connector similar to param of `array.join()`
 * @example joinArrayAndLimit([1,2,3,4,5,6,7,8,9,10,11], 5);
 * //will return  text: '1, 2, 3, 4, 5', excess: 6
 * @returns {{text: string, excess: number}} The joined array
 */
function joinArrayAndLimit(array = [], limit = 1000, connector = ', ') {
  if (!Array.isArray(array))
    throw new TypeError(`An array was exepcted, recevied "${typeof array}"`);
  limit = Number(limit);
  if (isNaN(limit)) throw new Error(`${limit} is not a number.`);
  if (array.length > limit) {
    const excess = array.length - limit;
    array = array.splice(0, limit);
    const text = array.join(connector);
    array = { text: text, excess: excess };
  } else {
    array = { text: array.join(connector), excess: 0 };
  }
  return array;
}

/**
 * cleans text from unnecessary character
 * @param {string} text The string to clean
 * @returns {string} the cleaned string
 */
function clean(text) {
  return String(text)
    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
    .replace(/@/g, `@${String.fromCharCode(8203)}`);
}
/**
 * Convert flags bitfield to string in array
 * @param {BitField} bitfield The bitfield to pass in
 * @returns {string[]} The array of the user flags
 */
function convertUFB(bitfield) {
  if (!bitfield) throw 'Missing Bitfield';
  if (isNaN(bitfield)) throw new TypeError(`${bitfield} is not a number`);
  let processConvert = bitfield;
  let UFConvertResult = [];
  const ACFlags = Object.entries(UserFlags.FLAGS).sort(function (a, b) {
    return Number(b[1]) - Number(a[1]);
  });
  ACFlags.forEach((flag) => {
    if (processConvert - flag[1] >= 0) {
      UFConvertResult.push(flag[0]);
      processConvert = processConvert - flag[1];
    }
  });
  return UFConvertResult;
}
/**
 * @typedef {{maxLength?: number; end?: string;}} TrimArrayOptions
 * @param maxLength The length of the array
 * @param end The end of the array
 */

/**
 * Trim an array
 * @param {*[]} array The array to pass in.
 * @param {TrimArrayOptions} options
 * @returns {*[]} The trimmed array.
 */
function trimArray(array, { maxLength = 10, end = 'And {length} more...' }) {
  if (!Array.isArray(array))
    throw new TypeError(`An array was expected, received "${typeof array}"`);
  if (array.length > maxLength) {
    const length = array.length - maxLength;
    array = array.splice(0, maxLength);
    array.push(end.match(/{length}/g) ? end.replace(/{length}/g, length) : end);
  }
  return array;
}
module.exports = {
  textTruncate,
  ordinalize,
  separateNumbers,
  joinArray,
  joinArrayAndLimit,
  clean,
  convertUFB,
  trimArray,
};
