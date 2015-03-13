/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Creates a new array by transforming each element in `array`
 * using the transformation function `fun`.
 *
 * @static
 * @category Function
 * @param {Function} fun The transformation function.
 * @param {Array} array The values to transform.
 * @returns {Array} The transformed values.
 * @example
 *
 * function increment(value, index, array) {
 *   return value + 1;
 * }
 *
 * map(increment, [1, 2, 3]);
 * // => [2, 3, 4]
 *
 * function dot(key) {
 *   return function(value) {
 *     return value[key];
 *   };
 * }
 *
 * var friends = [
 *   { first: 'John', last: 'Doe' },
 *   { first: 'Jane', last: 'Smith' }
 * ];
 *
 * var firstNameOf = dot('first');
 * var lastNameOf =  dot('last');
 *
 * map(firstNameOf, friends);
 * // => [ 'John', 'Jane' ]
 *
 * map(lastNameOf, friends);
 * // => [ 'Doe', 'Smith' ]
 *
 */
var map = module.exports = function(fun, array) {
  var length = array.length;
  var result = Array(length);

  for (var i = 0; i < length; i++) {
    result[i] = fun(array[i], i, array);
  }

  return result;
};
