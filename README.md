# Paystack
A NodeJS Wrapper for Paystack API - https://www.paystack.com

## Overview
This project provides an easy-to-use object-oriented API to access endpoints delineated at https://developers.paystack.co/reference

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save paystack

```

# Usage

```js

var PayStack = require('paystack')

var APIKEY = 'sk_test_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7'
var environment = process.env.NODE_ENV

var instance = new PayStack(APIKEY, environment)

var promise = instance.getSettlements({
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
- [Ahmad Abdul-Azziz <Head - NodeJS Foundation>](https://instagram.com/dev_amaz)

# Contributing
