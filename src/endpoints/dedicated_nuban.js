'use strict'

module.exports = {
  /*
  Create Dedicated Nuban
  @params: customer, prefered_bank
  */
  createDedicatedNuban: {
    method: 'POST',
    path: '/dedicated_account',
    send_json: true,
    params: { $customer: String, preferred_bank: String },
    param_defaults: { preferred_bank: 'wema-bank' },
    route_params: null
  },

  /*
  List Dedicated Nubans
  @params: customer, provider_slug, active, currency, bank_id
  */
  listDedicatedNubans: {
    method: 'GET',
    path: '/dedicated_account',
    send_json: false,
    params: { customer: String, provider_slug: String, $active: Boolean, $currency: String, bank_id: String },
    param_defaults: { provider_slug: 'wema-bank' },
    route_params: null
  },

  /*
  Fetch Dedicated Nuban
  @params: dedicated_account_id
  */
  fetchDedicatedNuban: {
    method: 'GET',
    path: '/dedicated_account/{:dedicated_account_id}',
    send_json: false,
    params: null,
    route_params: { dedicated_account_id: String }
  },

  /*
  Deactivate Dedicated Nuban
  @params: dedicated_account_id
  */
  deactivateDedicatedNuban: {
    method: 'DELETE',
    path: '/dedicated_account/{:dedicated_account_id}',
    send_json: false,
    params: null,
    route_params: { dedicated_account_id: String }
  }
}
