# combinators
[![npm package](https://badge.fury.io/js/combinators.svg)](http://badge.fury.io/js/combinators)
[![build](https://travis-ci.org/bakerface/combinators.svg?branch=master)](https://travis-ci.org/bakerface/combinators)
[![code climate](https://codeclimate.com/github/bakerface/combinators/badges/gpa.svg)](https://codeclimate.com/github/bakerface/combinators)
[![coverage](https://codeclimate.com/github/bakerface/combinators/badges/coverage.svg)](https://codeclimate.com/github/bakerface/combinators/coverage)
[![issues](https://img.shields.io/github/issues/bakerface/combinators.svg)](https://github.com/bakerface/combinators/issues)
[![dependencies](https://david-dm.org/bakerface/combinators.svg)](https://david-dm.org/bakerface/combinators)
[![devDependencies](https://david-dm.org/bakerface/combinators/dev-status.svg)](https://david-dm.org/bakerface/combinators#info=devDependencies)

### Table of Contents
-  [filter](#filterfnarray)(*fn*)(*array*) - filter elements of an array
-  [map](#mapfnarray)(*fn*)(*array*) - map elements of an array

#### filter(fn)(array)
Removes all elements in *array* where the predicate *fn* returns falsy.

``` javascript
const filter = require('combinators/filter');

function odd(n) {
  return n & 1;
}

const odds = filter(odd);

odds([ 1, 2, 3 ]);
// => [ 1, 3 ]
```

#### map(fn)(array)
Maps each element of *array* to the result of the function *fn*.

``` javascript
const map = require('combinators/map');

function double(x) {
  return x + x;
}

const twice = map(double);

twice([ 1, 2, 3, 'foo' ]);
// => [ 2, 4, 6, 'foofoo' ]
```
