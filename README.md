# combinators
[![npm package](https://badge.fury.io/js/combinators.svg)](http://badge.fury.io/js/combinators)
[![build](https://travis-ci.org/bakerface/combinators.svg?branch=master)](https://travis-ci.org/bakerface/combinators)
[![code climate](https://codeclimate.com/github/bakerface/combinators/badges/gpa.svg)](https://codeclimate.com/github/bakerface/combinators)
[![coverage](https://codeclimate.com/github/bakerface/combinators/badges/coverage.svg)](https://codeclimate.com/github/bakerface/combinators/coverage)
[![issues](https://img.shields.io/github/issues/bakerface/combinators.svg)](https://github.com/bakerface/combinators/issues)
[![dependencies](https://david-dm.org/bakerface/combinators.svg)](https://david-dm.org/bakerface/combinators)
[![devDependencies](https://david-dm.org/bakerface/combinators/dev-status.svg)](https://david-dm.org/bakerface/combinators#info=devDependencies)

### Table of Contents
-  [map](#mapfnarray)(*fn*)(*array*) - apply *fn* to each element of *array*

#### map(fn)(array)
Applies *fn* to each element of *array* and returns the result.

``` javascript
const map = require('combinators/map');

function double(x) {
  return x + x;
}

const twice = map(double);

twice([ 1, 2, 3, 'foo' ]);
// => [ 2, 4, 6, 'foofoo' ]
```
