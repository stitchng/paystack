'use strict'

module.exports = {
  /*
      Resolve Bank Verification Number
      @param: bvn
    */
  resolveBVN: {
    method: 'GET',
    path: '/bank/resolve_bvn/{:bvn}',
    params: null,
    param_defaults: null,
    route_params: { bvn: String }
  },
  /*
      Resolve Account Number
      @param: account_number(required), bank_code
    */
  resolveAccountNumber: {
    method: 'GET',
    path: '/bank/resolve',
    params: { account_number$: String, bank_code: String },
    param_defaults: null,
    route_params: null
  },

  /*
      Resolve Card Bin
      @param: bin
    */
  resolveCardBin: {
    method: 'GET',
    path: '/decision/bin/{:bin}',
    params: null,
    param_defaults: null,
    route_params: { bin: String }
  },

  /*
      Resolve Phone Number
      @param: verification_type, phone, callback_url
    */
  resolvePhoneNumber: {
    method: 'POST',
    path: '/verifications',
    send_json: true,
    params: { verification_type$: String, phone$: String, callback_url$: String },
    param_defaults: { verification_type: 'truecaller' },
    route_params: null
  }
}
