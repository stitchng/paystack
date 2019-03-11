'use strict'

module.exports = {
  /*
  Get Settlements
  @params: from, to, subaccount
  */
  getSettlements: {
    method: 'GET',
    path: '/settlement',
    send_json: false,
    params: { from: Date, to: Date, subaccount: String },
    param_defaults: { subaccount: 'none' },
    route_params: null
  }
}
