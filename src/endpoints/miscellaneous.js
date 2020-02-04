'use strict'

module.exports = {
  /*
   List Banks
   @param: perPage, page
  */
  listBanks: {
    method: 'GET',
    path: '/bank',
    send_json: false,
    params: { perPage: Number, page: Number, type: String, currency: String, country: String },
    param_defaults: { perPage: 50, page: 1, currency: 'NGN', country: 'Nigeria' },
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
