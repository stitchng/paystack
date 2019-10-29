'use strict'

module.exports = {
  /*
      Create Subscription
      @param: customer, plan, authorization, start_date
    */
  createSubscription: {
    method: 'POST',
    path: '/subscription',
    send_json: true,
    params: { customer$: String, plan$: String, authorization$: String, start_date: Date },
    param_defaults: null,
    route_params: null
  },

  /*
      List Subscription
      @param: perPage, page, customer, plan
    */
  listSubscription: {
    method: 'GET',
    path: '/subscription',
    send_json: false,
    params: { perPage: Number, page: Number, customer: Number, plan: Number },
    param_defaults: { perPage: 50, page: 1, customer: 0, plan: 0 },
    route_params: null
  },

  /*
      Disable Subscription
      @param: code, token
    */
  disableSubscription: {
    method: 'POST',
    path: '/subscription/disable',
    send_json: true,
    params: { code: String, token: String },
    param_defaults: null,
    route_params: null
  },

  /*
      Enable Subscription
      @param: code, token
    */
  enableSubscription: {
    method: 'POST',
    path: '/subscription/enable',
    send_json: true,
    params: { code: String, token: String },
    param_defaults: null,
    route_params: null
  },

  /*
      Fetch Subscription
      @param: id_or_subscription_code
    */
  getSubscription: {
    method: 'GET',
    path: '/subscription/{:id_or_subscription_code}',
    params: null,
    param_defaults: null,
    route_params: { id_or_subscription_code: String }
  }

}
