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
-  [compose](#composefunctionsvalue)(*...functions*)(*value*) - apply a series of functions to a value
-  [cond](#condpredicate-action-value)(*predicate*, *action*, ...)(*value*) - conditional function invocation
-  [constant](#constantvalue)(*value*)() - return a constant
-  [equal](#equalexpectedactual)(*expected*)(*actual*) - check for equality
-  [false](#false)() - returns false
-  [filter](#filterfnarray)(*fn*)(*array*) - filter elements of an array
-  [gt](#gtnvalue)(*n*)(*value*) - check if a value is greater than another
-  [gte](#gtenvalue)(*n*)(*value*) - check if a value is greater than or equal to another
-  [has](#haskeyobject)(*key*)(*object*) - check if a property exists
-  [identity](#identityvalue)(*value*) - return a value unmodified
-  [length](#lengthvalue)(*value*) - return the length of a value
-  [lt](#ltnvalue)(*n*)(*value*) - check if a value is less than another
-  [lte](#ltenvalue)(*n*)(*value*) - check if a value is less than or equal to another
-  [map](#mapfnarray)(*fn*)(*array*) - map elements of an array
-  [not](#notvalue)(*value*) - invert a value
-  [reduce](#reducefn-firstarray)(*fn*, *[first]*)(*array*) - reduce elements of an array
-  [tap](#tapfnvalue)(*fn*)(*value*) - apply a side-effect
-  [toss](#tosserror-propertyvalue)(*Error*, *[property]*)(*value*) - throw an error
-  [true](#true)() - returns true
-  [typeof](#typeofvalue)(*value*) - returns the type of a value

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

#### compose(...functions)(value)
Invokes a series of *functions*, in reverse order, on a *value*. The result of each function is passed as the input to the following function.

``` javascript
const compose = require('combinators/compose');

function add(n) {
  return function (m) {
    return m + n;
  };
}

function mul(n) {
  return function (m) {
    return m * n;
  };
}

const solve = compose(mul(3), add(1));

solve(1);
// => 6
```

#### cond(predicate, action, ...)(value)
Invokes the first *action* where the *predicate* is truthy for *value*. If none of the predicates are truthy then *value* is returned.

``` javascript
const cond = require('combinators/cond');
const c = require('combinators/constant');
const eq = require('combinators/equal');
const t = require('combinators/true');

const greet = cond(
  eq('english'), c('hello'),
  eq('french'), c('bonjour'),
  eq('spanish'), c('hola'),
  t, c('hey'));

greet('english');
// => 'hello'

greet('french');
// => 'bonjour'

greet('spanish');
// => 'hola'

greet('unknown');
// => 'hey'
```

#### constant(value)()
Returns a function that returns *value*.

``` javascript
const constant = require('combinators/constant');
const two = constant(2);

two();
// => 2

two('foo');
// => 2
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

#### false()
Returns *false*.

``` javascript
const f = require('combinators/false');

f();
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

#### gt(n)(value)
Returns *true* if *value* is considered greater than *n*; otherwise, returns *false*.

``` javascript
const gt = require('combinators/gt');
const greaterThan10 = gt(10);

greaterThan10(15);
// => true

greaterThan10(5);
// => false

greaterThan10(10);
// => false
```

#### gte(n)(value)
Returns *true* if *value* is considered greater than or equal to *n*; otherwise, returns *false*.

``` javascript
const gte = require('combinators/gte');
const greaterThanOrEqual10 = gte(10);

greaterThanOrEqual10(15);
// => true

greaterThanOrEqual10(5);
// => false

greaterThanOrEqual10(10);
// => true
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

#### identity(value)
Returns *value*.

``` javascript
const identity = require('combinators/identity');

identity(42);
// => 42

identity('foo');
// => 'foo'
```

#### length(value)
Returns the length of *value*.

``` javascript
const length = require('combinators/length');

length('foo');
// => 3

length([ 1, 2, 3, 4 ]);
// => 4
```

#### lt(n)(value)
Returns *true* if *value* is considered less than *n*; otherwise, returns *false*.

``` javascript
const lt = require('combinators/lt');
const lessThan10 = lt(10);

lessThan10(5);
// => true

lessThan10(15);
// => false

lessThan10(10);
// => false
```

#### lte(n)(value)
Returns *true* if *value* is considered less than or equal to *n*; otherwise, returns *false*.

``` javascript
const lte = require('combinators/lte');
const lessThanOrEqual10 = lte(10);

lessThanOrEqual10(5);
// => true

lessThanOrEqual10(15);
// => false

lessThanOrEqual10(10);
// => true
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

#### not(value)
Returns the inverse of *value*.

``` javascript
const not = require('combinators/not');

not(true)
// => false

not(false)
// => true
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

#### toss(Error, [property])(value)
Creates an instance of *Error* and assigns the *property* to the specified *value* before throwing the error. If the *property* is not defined, then it defaults to the message property. If the *Error* argument is a string or an object, then it is converted to a class that extends Error before throwing.

``` javascript
const toss = require('combinators/toss');

toss(Error)('message');
// => Error: message

toss('MyError')('message')
// => MyError: message

const error = {
  name: 'MyError',
  message: 'message',
  status: 500
};

toss(error, 'username')('john');
// => MyError: message
```

#### true()
Returns *true*.

``` javascript
const t = require('combinators/true');

t();
// => true
```

#### typeof(value)
Returns the type of the specified *value*.

``` javascript
const type = require('combinators/typeof');

type(42);
// => 'number'

type('foo');
// => 'string'
```
