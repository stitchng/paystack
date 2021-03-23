'use strict'

module.exports = {
  /*
    Resolve Bank Verification Number (Standard)
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
    Resolve Bank Verification Number (Premium)
    @param: bvn
  */
  resolveBVNPremium: {
    method: 'GET',
    path: 'identity/bvn/resolve/{:bvn}',
    params: null,
    param_defaults: null,
    route_params: { bvn: String }
  },

  /*
    Match Bank Verification Number
    @param: bvn (required), account_number(required), bank_code (required), first_name, middle_name, last_name
  */
  matchBVN: {
    method: 'POST',
    path: '/bvn/match',
    send_json: true,
    params: { bvn$: String, bank_code$: String, account_number$: String, first_name: String, middle_name: String, last_name: String },
    param_defaults: null,
    route_params: null
  },

  /*
    Resolve Account Number
    @param: account_number(required), bank_code (required)
  */
  resolveAccountNumber: {
    method: 'GET',
    path: '/bank/resolve',
    params: { account_number$: String, bank_code$: String },
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
