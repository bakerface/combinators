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

var bind = require('./bind');
var placeholder = require('./placeholder');

/**
 * Adds `value` to the end of `array` while it has less than `length` elements.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {number} length The minimum length of the array.
 * @param {*} value The value to add to the array.
 * @returns {Array} The filled array.
 * @example
 *
 * fill([], 5, 'x');
 * // => ['x', 'x', 'x', 'x', 'x']
 *
 * fill([2, 2], 5, 'x');
 * // => [2, 2, 'x', 'x', 'x']
 *
 * fill([3, 3, 3, 3], 2, 'x');
 * // => [3, 3, 3, 3]
 *
 */
function fill(array, length, value) {
  for (var i = array.length; i < length; i++) {
    array[i] = value;
  }

  return array;
}

/**
 * Transforms a function `fun` into a series of variadic functions.
 * Each function invocation returns another function until `arity`
 * arguments have been supplied, in which case, `fun` is invoke with
 * the provided arguments.
 *
 * @static
 * @category Function
 * @param {Function} fun The function to transform.
 * @param {number} [arity=fun.length] The arity of `fun`.
 * @param- {Array} [provided] The arguments provided to `fun`.
 * @returns {Function} The curried function.
 * @example
 *
 * function name(f, m, l) {
 *   return f + ' ' + m + ' ' + l;
 * }
 *
 * var curried = curry(name);
 *
 * curried('John')('Henry')('Doe');
 * // => 'John Henry Doe'
 *
 * curried('John', 'Henry')('Doe');
 * // => 'John Henry Doe'
 *
 * curried('John', 'Henry', 'Doe');
 * // => 'John Henry Doe'
 *
 * curried(bind(), 'Henry')('John', 'Doe');
 * // => 'John Henry Doe'
 *
 * curried(bind(1), bind(2), bind(0))('Doe', 'John', 'Henry');
 * // => 'John Henry Doe'
 *
 */
var curry = module.exports = function(fun, arity, provided) {
  arity = arity || fun.length;
  provided = provided || fill([], arity, bind());

  return function() {
    var next = 0;
    var finished = true;
    var args = fill([].slice.call(arguments, 0), arity, bind());
    var bound = provided.slice(0);

    for (var i = 0; i < arity; i++) {
      if (bound[i] instanceof placeholder) {
        var index = bound[i].index;

        if (typeof(index) === 'undefined') {
          bound[i] = args[next++];
        }
        else {
          bound[i] = args[index];
          next = index + 1;
        }

        if (bound[i] instanceof placeholder) {
          finished = false;
        }
      }
    }

    if (finished) {
      return fun.apply(this, bound);
    }

    return curry(fun, arity, bound);
  };
};
