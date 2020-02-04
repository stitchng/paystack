'use strict'

module.exports = {
  /*
  Get Balance History
  @params: from, to, type
  */
  getBalanceHistory: {
    method: 'GET',
    path: '/balance/ledger',
    send_json: false,
    params: { from: Date, to: Date, type: String },
    param_defaults: { type: 'Transaction' },
    route_params: null
  }
}
