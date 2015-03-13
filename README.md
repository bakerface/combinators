[![Build Status](https://travis-ci.org/bakerface/combinators.svg?branch=master)](https://travis-ci.org/bakerface/combinators) [![Coverage Status](https://coveralls.io/repos/bakerface/combinators/badge.svg?branch=master)](https://coveralls.io/r/bakerface/combinators)

# combinators
**Functional programming in JavaScript**

### arg(n)
Returns a function that returns its nth argument when invoked.

- **n**: *number* - The argument index to return.

``` javascript
var arg = require('combinators/arg');

arg(0)('hello', 'world');
// => 'hello'

arg(1)('hello', 'world');
// => 'world'
```

### curry(fun, [arity])
Transforms a function `fun` into a series of variadic functions.
Each function invocation returns another function until `arity`
arguments have been supplied, in which case, `fun` is invoked with
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

### identity()
A function that returns its first argument when invoked.

``` javascript
var identity = require('combinators/identity');

identity('hello', 'world');
// => 'hello'
```

### map(fun, array)
Creates a new array by transforming each element in `array`
using the transformation function `fun`.

- **fun**: *Function* - The transformation function.
- **array**: *Array* - The values to transform.

``` javascript
var map = require('combinators/map');

function increment(value, index, array) {
  return value + 1;
}

map(increment, [ 1, 2, 3 ]);
// => [ 2, 3, 4 ]

function dot(key) {
  return function(value) {
    return value[key];
  };
}

var friends = [
  { first: 'John', last: 'Doe' },
  { first: 'Jane', last: 'Smith' }
];

var firstNameOf = dot('first');
var lastNameOf = dot('last');

map(firstNameOf, friends);
// => [ 'John', 'Jane' ]

map(lastNameOf, friends);
// => [ 'Doe', 'Smith' ]
```

### spread(fun)
Creates a function that invokes `fun` with an array of arguments.

- **fun**: *Function* - The function to invoke.

``` javascript
var spread = require('combinators/spread');

function plus(a, b) {
  return a + b;
}

var add = spread(plus);

add([1, 2]);
// => 3
```
