/**
 * Copyright (c) 2016 Chris Baker <mail.chris.baker@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
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

const assert = require('assert');
const compose = require('../../functions/compose');
const lt = require('../../predicates/lt');
const gt = require('../../predicates/gt');
const cond = require('.');

function lower(s) {
  return s.toLowerCase();
}

function upper(s) {
  return s.toUpperCase();
}

function len(s) {
  return s.length;
}

const short = compose(lt(5), len);
const long = compose(gt(7), len);
const change = cond(short, lower, long, upper);

describe('conditionals.cond(predicate, action, ...)(value)', function () {
  it('should take the first action matching the predicate', function () {
    assert.equal(change('Foo'), 'foo');
    assert.equal(change('FooBar'), 'FooBar');
    assert.equal(change('FooBarBaz'), 'FOOBARBAZ');
  });
});
