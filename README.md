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

const promise = paystack.getSettlements({
  from:new Date("2017-02-09"), 
  to:new Date()
})

promise.then(function(response){
  var data = response.body
  
})

```

## API Resources

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
- [Ahmad Abdul-Aziz <Software Engineer>](https://instagram.com/dev_amaz)

# Contributing

See the [CONTRIBUTING.md](https://github.com/stitchng/paystack/blob/master/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/paystack-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/paystack-node

[travis-image]: https://img.shields.io/travis/stitchng/paystack/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/stitchng/paystack