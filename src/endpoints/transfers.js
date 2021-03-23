'use strict'

module.exports = {
  /*
      Initiate Transfer
      @param: source(required), reason, amount(required), recipient(required), currency, reference
    */
  initiateTransfer: {
    method: 'POST',
    path: '/transfer',
    params: { source$: String, reason: String, amount$: Number, recipient$: String, currency: String, reference: String },
    send_json: true,
    param_defaults: { source: 'balance', currency: 'NGN' },
    route_params: null
  },

  /*
      List Transfers
      @param: perPage, page
    */
  listTransfers: {
    method: 'GET',
    path: '/transfer',
    send_json: false,
    params: { perPage: Number, page: Number },
    param_defaults: { perPage: 0, page: 0 },
    route_params: null
  },

  /*
      Fetch transfer
      @param: id_or_code
    */
  fetchTransfer: {
    method: 'GET',
    path: '/transfer/{:id_or_code}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { id_or_code: String }
  },

  /*
      Finalize Transfer
      @param: transfer_code, otp
    */
  finalizeTransfer: {
    method: 'POST',
    path: '/transfer/finalize_transfer',
    send_json: true,
    params: { transfer_code$: String, otp$: String },
    param_defaults: null,
    route_params: null
  },

  /*
      Initiate Bulk Transfer
      @param: source, currency, transfers
    */
  initiateBulkTransfer: {
    method: 'POST',
    path: '/transfer/bulk',
    send_json: true,
    params: { source$: String, transfers$: String, currency: String },
    param_defaults: { source: 'balance', currency: 'NGN', transfers: [] },
    route_params: null
  }
}
