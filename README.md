[![Build Status](https://travis-ci.org/bakerface/combinators.svg?branch=master)](https://travis-ci.org/bakerface/combinators) [![Coverage Status](https://coveralls.io/repos/bakerface/combinators/badge.svg?branch=master)](https://coveralls.io/r/bakerface/combinators)

# combinators
**Functional programming in JavaScript**

### Table of Contents
1. Function
  - [curry(fun, [arity])](#curryfunarity)

### curry(fun, [arity])
Transforms a function `fun` into a series of variadic functions.
Each function invocation returns another function until `arity`
arguments have been supplied, in which case, `fun` is invoke with
the provided arguments.

- **fun**: *Function* - The function to transform.
- **arity**: *number* - The arity of `fun` (default: ``fun.length``).

``` javascript
var curry = require('combinators/curry');
var bind = require('combinators/bind');
var _ = bind();

function name(f, m, l) {
  return f + ' ' + m + ' ' + l;
}

var curried = curry(name);

curried('John')('Henry')('Doe');
// => 'John Henry Doe'

curried('John', 'Henry')('Doe');
// => 'John Henry Doe'

curried('John', 'Henry', 'Doe');
// => 'John Henry Doe'

curried(_, 'Henry')('John', 'Doe');
// => 'John Henry Doe'

curried(bind(1), bind(2), bind(0))('Doe', 'John', 'Henry');
// => 'John Henry Doe'
```
