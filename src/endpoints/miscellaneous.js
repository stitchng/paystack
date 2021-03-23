'use strict'

module.exports = {
  /*
   List Banks
   @param: perPage, page, use_cursor(required), next, previous, gateway, type, country(required)
  */
  listBanks: {
    method: 'GET',
    path: '/bank',
    send_json: false,
    params: { perPage$: Number, page: Number, use_cursor: Boolean, next: String, previous: String, type: String, currency: String, country$: String },
    param_defaults: { perPage: 50, page: 1, currency: 'NGN', country: 'Nigeria' },
    route_params: null
  },

  /*
   List Providers
   @param: pay_with_bank_transfer
  */
  listProviders: {
    method: 'GET',
    path: '/bank',
    send_json: false,
    params: { pay_with_bank_transfer$: Boolean },
    param_defaults: { pay_with_bank_transfer: true },
    route_params: null
  },

  /*
    List Countries
    @param: -
  */
  listCountries: {
    method: 'GET',
    path: '/country',
    send_json: false,
    params: null,
    route_params: null
  }
}
