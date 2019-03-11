# Paystack
A NodeJS Wrapper for Paystack API - https://www.paystack.com

## Overview
This project provides an easy-to-use object-oriented API to access endpoints delineated at https://developers.paystack.co/reference

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save paystack-node

```

# Usage

```js

var PayStack = require('paystack-node')

var APIKEY = 'sk_test_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7'
var environment = process.env.NODE_ENV

var instance = new PayStack(APIKEY, environment)

/* 
  NOTE: All fields/params that require dates should be set to
  instances of the `Date()` constructor as they will
  eventually be turned into the ISO 8601 format (String)
  using `toJSON()` method for date instances/objects
*/

var promise = instance.fetchSettlements({
  from:new Date("2017-02-09"), 
  to:new Date()
})

promise.then(function(response){
  var data = response.body
  
})

```

# License

MIT

# Credits

- [Ifeora Okechukwu <Head Of Technology - Oparand>](https://twitter.com/isocroft)
- [Ahmad Abdul-Aziz <Software Engineer>](https://instagram.com/dev_amaz)

# Contributing

See the [CONTRIBUTING.md](https://github.com/stitchng/paystack/blob/master/CONTRIBUTING.md) file for info
