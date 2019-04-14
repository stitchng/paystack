# Paystack

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

A NodeJS Wrapper for [Paystack](https://www.paystack.com)

## Overview
This project provides an easy-to-use object-oriented API to access endpoints delineated at https://developers.paystack.co/reference

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save paystack-node

```

# Usage

```js

let PayStack = require('paystack-node')

let APIKEY = 'sk_test_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7'
const environment = process.env.NODE_ENV

const paystack = new PayStack(APIKEY, environment)

/* 
  NOTE: All fields/params that require dates should be set to
  instances of the `Date()` constructor as they will
  eventually be turned into the ISO 8601 format (String)
  using `toJSON()` method for date instances/objects
*/

const promise1 = paystack.getSettlements({
  from:new Date("2017-02-09"), 
  to:new Date()
})

promise1.then(function(response){
  var data = response.body
  
})

// getCustomer

const promise2 = paystack.getCustomer({
  customer_id:'CUS_e24m6SqA6g3Jk889o21'
})

promise2.then(function(response){
  var data = response.body
  
}).catch(function(error){
  // deal with error
})

// createCustomer

const promise3 = paystack.createCustomer({
  email:'malik.onyemah@gmail.com',
  first_name:'Malik',
  last_name:'Onyemah',
  phone:'+2347135548369'
})

promise3.then(function(response){
  return response.body
  
}).then( body => {
    return res.status(200).json({id:body.data.id})
})

// setRiskActionOnCustomer

const promise4 = paystack.setRiskActionOnCustomer({
  risk_action:'deny',
  customer_id:'CUS_e24m6SqA6g3Jk889o21'
}).then(function(response){
   const result = response.body
})

// createPage

const promise5 = paystack.createPage({
  name:'DoorPost Pay',
  description:'This is payment for every ',
  amount:30000,
  slug:'5nApBwZkvR',
  redirect_url:'https://www.localhost.com/pay/callback',
  custom_fields: ['phone', 'age']
})


app.use(async function verifications(req, res, next){
    let responseBVN = await paystack.resolveBVN({
      bvn:req.body.bvn //'22283643840404'
    })

    let responseAcctNum = await paystack.resolveAccountNumber({
      account_number:req.body.acc_num, // '0004644649'
      bank_code:req.body.bank_code // '075'
    })

    await next()
})

```

## API Resources

>Each method expects an object literal with both **route parameters** and **request parameters (query / body)**. Please, go through the _src/endpoints_ folder to see the specific items that should make up the object literal for each method

- customers
  - paystack.createCustomer()
  - paystack.getCustomer()
  - paystack.listCustomer()
  - paystack.updateCustomer()
  - paystack.deactivateAuthOnCustomer()
  - paystack.setRiskActionOnCustomer()
- invoices
  - paystack.createInvoice()
  - paystack.getMetricsForInvoices()
  - paystack.sendInvoiceNotification()
  - paystack.listInvoice()
  - paystack.updateInvoice()
  - paystack.verifyInvoice()
  - paystack.finalizeInvoiceDraft()
  - paystack.archiveInvoice()
  - paystack.markInvoiceAsPaid()
- settlements
  - paystack.getSettlements()
- payment sessions {control panel}
  - paystack.getPaymentSessionTimeout()
  - paystack.updatePaymentSessionTimeout()
- pages
  - paystack.createPage()
  - paystack.listPages()
  - paystack.getPage()
  - paystack.updatePage()
  - paystack.checkSlugAvailability()
- transactions
  - paystack.initializeTransaction()
  - paystack.chargeAuthorization()
  - paystack.getTransaction()
  - paystack.listTransaction()
  - paystack.viewTransactionTimeline()
  - paystack.transactionTotals()
  - paystack.exportTransaction()
  - paystack.requestReauthorization()
  - paystack.checkAuthorization()
  - paystack.verifyTransaction()
- plans
  - paystack.createPlan()
  - paystack.getPlan()
  - paystack.listPlan()
  - paystack.updatePlan()
- refunds
  - paystack.createRefund()
  - paystack.getRefund()
  - paystack.listRefund()
- subscriptions
  - paystack.createSubscription()
  - paystack.disableSubscription()
  - paystack.enableSubscription()
  - paystack.getSubscription()
  - paystack.listSubscription()
- subaccounts
  - paystack.createSubaccount()
  - paystack.getSubaccount()
  - paystack.listSubaccount()
  - paystack.updateSubaccount()
- miscellanous
  - paystack.listBanks()

# License

MIT

# Credits

- [Ifeora Okechukwu <Head Of Technology - Oparand>](https://twitter.com/isocroft)
- [Ahmad Abdul-Aziz <Software Engineer>](https://twitter.com/dev_amaz)

# Contributing

See the [CONTRIBUTING.md](https://github.com/stitchng/paystack/blob/master/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/paystack-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/paystack-node

[travis-image]: https://img.shields.io/travis/stitchng/paystack/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/stitchng/paystack
