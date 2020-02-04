'use strict'

module.exports = {
  /*
      Create Plan
      @param: name, interval, currency, amount, send_invoices, send_sms, invoice_limit, description
    */
  createPlan: {
    method: 'POST',
    path: '/plan',
    send_json: true,
    params: { name$: String, interval$: String, currency: String, amount$: Number, send_invoices: Boolean, send_sms: Boolean, invoice_limit: Number, description: String },
    param_defaults: { interval: 'monthly', currency: 'NGN', send_invoices: false, send_sms: false, invoice_limit: 0 },
    route_params: null
  },

  /*
      List Plans
      @param: perPage, page
    */
  listPlans: {
    method: 'GET',
    path: '/plan',
    params: { perPage: Number, page: Number },
    send_json: false,
    param_defaults: { perPage: 0, page: 0 },
    route_params: null
  },

  /*
      Fetch Plan
      @param: id_or_plan_code
    */
  getPlan: {
    method: 'GET',
    path: '/plan/{:id_or_plan_code}',
    params: null,
    send_json: false,
    route_params: { id_or_plan_code: String }
  },

  /*
      Update Plan
      @param: name, interval, currency, amount, send_invoices, send_sms, invoice_limit, description
    */
  updatePlan: {
    method: 'PUT',
    path: '/plan/{:id_or_plan_code}',
    send_json: true,
    params: { name$: String, interval$: String, currency: String, amount$: Number, send_invoices: Boolean, send_sms: Boolean, invoice_limit: Number, description: String },
    param_defaults: { interval: 'monthly', currency: 'NGN', send_invoices: false, send_sms: false, invoice_limit: 0 },
    route_params: { id_or_plan_code: String }
  }
}
