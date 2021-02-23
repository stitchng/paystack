'use strict'

module.exports = {
  /*
    Initialize Transaction
    @params: reference, callback_url, amount, email, plan, subaccount, transaction_charge, bearer, channels, invoice_limit, metadata
  */
  initializeTransaction: {
    method: 'POST',
    path: '/transaction/initialize',
    send_json: true,
    params: { reference: String, callback_url: String, amount$: Number, email$: String, plan: String, subaccount: String, transaction_charge: Number, bearer: String, channels: Array, invoice_limit: Number, metadata: String },
    param_defaults: { invoice_limit: 0, bearer: 'account' },
    route_params: null
  },

  /*
    Verify Transaction
    @params: reference
  */
  verifyTransaction: {
    method: 'GET',
    path: '/transaction/verify/{:reference}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { reference: String }
  },

  /*
    List Transaction
    @params: perPage, page, customer, status, from, to, amount
  */
  listTransaction: {
    method: 'GET',
    path: '/transaction',
    send_json: false,
    params: { perPage: Number, page: Number, customer: Number, status: String, from: Date, to: Date, amount: Number },
    param_defaults: { perPage: 50, page: 1 },
    route_params: null
  },

  /*
    Fetch Transaction
    @params: id
  */
  getTransaction: {
    method: 'GET',
    path: '/transaction/{:id}',
    send_json: false,
    param_defaults: null,
    params: null,
    route_params: { id: String }
  },

  /*
    Charge Authorization
    @params: reference, authorization_code, amount,  plan, currency, email, metadata, subaccount, transaction_charge, bearer, invoice_limit
  */
  chargeAuthorization: {
    method: 'POST',
    path: '/transaction/charge_authorization',
    send_json: true,
    params: { reference: String, authorization_code$: String, amount$: Number, plan: String, currency: String, email$: String, metadata: Object, subaccount: String, transaction_charge: Number, bearer: String, invoice_limit: Number },
    param_defaults: { amount: 0, currency: 'NGN', bearer: 'account', invoice_limit: 0 },
    route_params: null
  },

  /*
    View Transaction Timeline
    @params: id
  */
  viewTransactionTimeline: {
    method: 'GET',
    path: '/transaction/timeline/{:id}',
    send_json: false,
    param_defaults: null,
    params: null,
    route_params: { id: String }
  },

  /*
    Transaction Totals
    @params: from, to
  */
  transactionTotals: {
    method: 'GET',
    path: '/transaction/totals',
    send_json: false,
    params: { from: Date, to: Date },
    param_defaults: null,
    route_params: null
  },

  /*
    Export Transaction
    @params: from, to, settled, payment_page, customer, currency, settlement, amount,  status
  */
  exportTransaction: {
    method: 'GET',
    path: '/transaction/export',
    send_json: false,
    params: { from: Date, to: Date, settled: Boolean, payment_page: Number, customer: Number, currency: String, settlement: Number, amount: Number, status: String },
    param_defaults: { status: 'success' },
    route_params: null
  },

  /*
    Request Reauthorization
    @params: reference, authorization_code, amount, currency, email, metadata
  */
  requestReauthorization: {
    method: 'POST',
    path: '/transaction/request_reauthorization',
    send_json: true,
    params: { reference: String, authorization_code$: String, amount$: Number, currency: String, email$: String, metadata: Object },
    param_defaults: { amount: 0, currency: 'NGN' },
    route_params: null
  },

  /*
    Check Authorization
    @params: authorization_code, currency, email, amount
  */
  checkAuthorization: {
    method: 'POST',
    path: '/transaction/check_authorization',
    send_json: true,
    params: { authorization_code$: String, amount$: Number, email$: String, currency: String },
    param_defaults: { currency: 'NGN' },
    route_params: null
  },

  /*
    Partial Debit
    @params: authorization_code, currency, email, amount, at_least, reference
  */
  partialDebit: {
    method: 'POST',
    path: '/transaction/partial_debit',
    send_json: true,
    params: { authorization_code$: String, amount$: Number, email$: String, currency$: String, at_least: Number, reference: String },
    param_defaults: { currency: 'NGN' },
    route_params: null
  }

}
