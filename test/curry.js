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

var should = require('should');
var curry = require('../curry');
var bind = require('../bind');
var _ = bind();

var JOHN_HENRY_DOE = 'John Henry Doe';

function fullname(first, middle, last) {
  return first + ' ' + middle + ' ' + last;
}

describe('curry(fun, [length])', function() {
  var name = curry(fullname);

  it('should be able to call with all arguments', function() {
    should(JOHN_HENRY_DOE == name('John', 'Henry', 'Doe'));
  })

  it('should be able to call with partial arguments', function() {
    should(JOHN_HENRY_DOE == name('John')('Henry', 'Doe'));
  })

  it('should be able to call with placeholder arguments', function() {
    should(JOHN_HENRY_DOE == name(_, 'Henry')('John', 'Doe'));
  })

  it('should be able to call with bound arguments', function() {
    should(JOHN_HENRY_DOE == name(bind(1), 'Henry', bind(0))('Doe', 'John'));
  })
})
