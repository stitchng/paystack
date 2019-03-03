# Paystack
A NodeJS Wrapper for Paystack API - https://www.paystack.com

# Overview
This project provides an easy-to-use object-oriented API to access endpoints delineated at https://developers.paystack.co/reference

# Usage

```js

var PayStack = require('@stitchng/paystack')

var APIKEY = 'pk_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7'
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
