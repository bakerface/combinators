# combinators
[![npm package](https://badge.fury.io/js/combinators.svg)](http://badge.fury.io/js/combinators)
[![build](https://travis-ci.org/bakerface/combinators.svg?branch=master)](https://travis-ci.org/bakerface/combinators)
[![code climate](https://codeclimate.com/github/bakerface/combinators/badges/gpa.svg)](https://codeclimate.com/github/bakerface/combinators)
[![coverage](https://codeclimate.com/github/bakerface/combinators/badges/coverage.svg)](https://codeclimate.com/github/bakerface/combinators/coverage)
[![issues](https://img.shields.io/github/issues/bakerface/combinators.svg)](https://github.com/bakerface/combinators/issues)
[![dependencies](https://david-dm.org/bakerface/combinators.svg)](https://david-dm.org/bakerface/combinators)
[![devDependencies](https://david-dm.org/bakerface/combinators/dev-status.svg)](https://david-dm.org/bakerface/combinators#info=devDependencies)

### Table of Contents
-  [apply](#applyfnargsinstance)(*fn*)(*args*)(*instance*) - apply a function to  an instance
-  [call](#callfnargsinstance)(*fn*)(*...args*)(*instance*) - call a function on an instance
-  [equal](#equalexpectedactual)(*expected*)(*actual*) - check for equality
-  [filter](#filterfnarray)(*fn*)(*array*) - filter elements of an array
-  [has](#haskeyobject)(*key*)(*object*) - check if a property exists
-  [map](#mapfnarray)(*fn*)(*array*) - map elements of an array
-  [reduce](#reducefn-firstarray)(*fn*, *[first]*)(*array*) - reduce elements of an array
-  [tap](#tapfnvalue)(*fn*)(*value*) - apply a side-effect

#### apply(fn)(args)(instance)
Invokes *fn* on the *instance* with the specified *args*.

``` javascript
const apply = require('combinators/apply');
const concat = apply(Array.prototype.concat);
const end = concat([ 4, 5, 6 ]);

end([ 1, 2, 3 ]);
// => [ 1, 2, 3, 4, 5, 6 ]
```

#### call(fn)(...args)(instance)
Invokes *fn* on the *instance* with the specified *args*.

``` javascript
const call = require('combinators/call');
const concat = call(Array.prototype.concat);
const end = concat(4, 5, 6);

end([ 1, 2, 3 ]);
// => [ 1, 2, 3, 4, 5, 6 ]
```

#### equal(expected)(actual)
Returns *true* if the *expected* and *actual* are considered strictly equal; otherwise returns *false*.

``` javascript
const equal = require('combinators/equal');
const two = equal(2);

two(2);
// => true

two('2');
// => false

two(3);
// => false
```

#### filter(fn)(array)
Returns the subset of *array* where the predicate *fn* is truthy.

``` javascript
const filter = require('combinators/filter');

function odd(n) {
  return n & 1;
}

const odds = filter(odd);

odds([ 1, 2, 3 ]);
// => [ 1, 3 ]
```

#### has(key)(object)
Returns *true* if the *object* has a property named *key*; otherwise, returns *false*.

``` javascript
const has = require('combinators/has');
const named = has('name');

named({ id: 1, name: 'foo' });
// => true

named({ id: 1, username: 'foo' });
// => false
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

#### reduce(fn, [first])(array)
Reduces the elements in *array* by invoking *fn*. If specified, use *first* as
the initial value.

``` javascript
const reduce = require('combinators/reduce');

function add(a, b) {
  return a + b;
}

const sum = reduce(add);
sum([ 1, 2, 3 ]);
// => 6

const sum10 = reduce(add, 10);
sum10([ 1, 2, 3 ]);
// => 16
```

#### tap(fn)(value)
Invokes *fn* with the *value* and then returns *value*.

``` javascript
const tap = require('combinators/tap');

function remove(key) {
  return function (object) {
    delete object[key];
  };
}

const sanitize = tap(remove('password'));

const user = {
  id: 1,
  username: 'foo',
  password: 'secret'
};

sanitize(user);
// => { id: 1, username: 'foo' } 
```
