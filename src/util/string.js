// eslint-disable-next-line no-unused-vars
const { Message, UserFlags, BitField } = require('discord.js');
const languageSchema = require('../models/languageSchema');
/**@type {import('../../types').Intl.ListFormat} */

// All functions returned from this module will now be in string format

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
 * @param {string} sep The searator of the numbers
 * @example separateNumbers(123456) will return `123'456`; separateNumbers(1234.567) will return `1'234.567`;
 * @returns {string} The numbers with quotation marks
 */
function separateNumbers(number, sep = "'") {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
/**
 * Converts a number to a stringified compact version
 * @param {number|string} number the Number to convert
 * @param {number} maximumFractionDigits the number of decimal places to include in result
 * @example compactNum(11235) will return `11.24K`; commatize(1234.567, 0) will return `1K`
 * @returns {string} compact version of the number
 * @note Maximum number for optimal usage is 10e13
 */
function compactNum(number, maximumFractionDigits = 2) {
  return Number(number || '').toLocaleString('en-US', {
    notation: 'compact',
    maximumFractionDigits,
  });
}

/**
 * Joins array via oxford comma and append 'and' on last 2 items
 * @param {*[]} array the array to join
 * @returns {string} the joined array
 */
function joinArray(array = [], lang = 'en') {
  let list = new Intl.ListFormat(lang);
  return list.format(array.map((x) => String(x)));
}
/**
 * Join array and add a limiter.
 * @param {*[]} array the array to join
 * @param {number} limit the maximum length of the string output
 * @param {string} connector similar to param of `array.join()`
 * @example joinArrayAndLimit([1,2,3,4,5,6,7,8,9,10,11])
 * will return  text: '1, 2, 3, 4', excess: 6
 * @returns {{text: string, excess: number}} The joined array
 * @note Will throw a typeerror array.reduce is not a function if param1 is not of type array.
 */
function joinArrayAndLimit(array = [], limit = 1000, connector = '\n') {
  return array.reduce(
    (a, c, i) =>
      a.text.length + String(c).length > limit
        ? { text: a.text, excess: a.excess + 1 }
        : { text: a.text + (i ? connector : '') + String(c), excess: a.excess },
    { text: '', excess: 0 }
  );
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
 * @returns {String[]} The array of the user flags
 */
function convertUFB(bitfield) {
  if (!bitfield) throw 'Missing Bitfield';
  if (isNaN(bitfield)) throw `${bitfield} is not a number`;
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
 * Trim an array
 * @param {*[]} array The array to pass in.
 * @param {number} maxLength The max length of the array.
 * @returns {*[]} The trimmed array.
 */
function trimArray(array, maxLength = 10) {
  if (array.length > maxLength) {
    const length = array.length - maxLength;
    array = array.splice(0, maxLength);
    array.push(`And ${length} more...`);
  }
  return array;
}
module.exports = {
  textTruncate,
  ordinalize,
  separateNumbers,
  compactNum,
  joinArray,
  joinArrayAndLimit,
  clean,
  convertUFB,
  trimArray,
};
