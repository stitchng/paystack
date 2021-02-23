'use strict'

module.exports = {
  /*
    Create customer
    @params: first_name, last_name, email(required), phone
  */
  createCustomer: {
    method: 'POST',
    path: '/customer',
    send_json: true,
    params: { first_name: String, last_name: String, email$: String, phone: String, metadata: Object },
    route_params: null
  },

  /*
  Get customer
  @params: customer_id
  */
  getCustomer: {
    method: 'GET',
    alternate_route_params_keymap: { email_or_id_or_customer_code: 'customer_id' },
    path: '/customer/{:email_or_id_or_customer_code}',
    send_json: false,
    params: null,
    route_params: { email_or_id_or_customer_code: String }
  },

  /*
  List customers
  @params: perPage, page
  */
  listCustomers: {
    method: 'GET',
    path: '/customer',
    params: { perPage: Number, page: Number },
    param_defaults: { perPage: 50, page: 1 },
    route_params: null
  },

  /*
  Update customer
  @params: id_or_customer_code, first_name, last_name, email (required), phone
  */
  updateCustomer: {
    method: 'PUT',
    alternate_route_params_keymap: { id_or_customer_code: 'customer_id' },
    path: '/customer/{:id_or_customer_code}',
    send_json: true,
    params: { first_name: String, last_name: String, email$: String, phone: String, metadata: Object },
    route_params: { id_or_customer_code: String }
  },

  /*
    Deactivate Customer Authoorization
    @params: authorization_code
  */
  deactivateAuthOnCustomer: {
    method: 'POST',
    path: '/customer/deactivate_authorization',
    send_json: true,
    params: { authorization_code: String },
    route_params: null
  },

  /*
    White/Blacklist Customer
    @params: customer (required), risk_action

    @info: [ 'allow' to whitelist or 'deny' to blacklist ]
  */
  setRiskActionOnCustomer: {
    method: 'POST',
    path: '/customer/set_risk_action',
    send_json: true,
    params: { customer$: String, risk_action: String },
    param_defaults: { risk_action: 'allow' },
    route_params: null
  }

}
