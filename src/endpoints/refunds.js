'use strict'

module.exports = {
  /*
   Create Refund
   @param: transaction(reference), amount, currency, customer_note, merchant_note
  */
  createRefund: {
    method: 'POST',
    path: '/refund',
    send_json: true,
    params: { transaction$: String, amount: Number, currency: String, customer_note: String, merchant_note: String },
    param_defaults: { currency: 'NGN' },
    route_params: null
  },

  /*
   List Refund
   @param: reference(required), currency
  */
  listRefund: {
    method: 'GET',
    path: '/refund',
    send_json: false,
    params: { reference$: String, currency: String },
    param_defaults: { currency: 'NGN' },
    route_params: null
  },

  /*
   Fetch Refund
   @param: reference, currency
  */
  getRefund: {
    method: 'GET',
    path: '/refund/{:reference}',
    send_json: false,
    params: null,
    route_params: { reference: String }
  }
}
