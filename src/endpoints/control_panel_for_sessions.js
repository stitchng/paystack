'use strict'

module.exports = {
  /*
    Get Payment session timeout
    @params:
  */
  getPaymentSessionTimeout: {
    method: 'GET',
    path: '/integration/payment_session_timeout',
    send_json: false,
    params: null,
    route_params: null
  },

  /*
    Update Payment session timeout
    @params: timeout
  */
  updatePaymentSessionTimeout: {
    method: 'PUT',
    path: '/integration/payment_session_timeout',
    send_json: true,
    params: { timeout: Number },
    param_defaults: { timeout: 0 },
    route_params: null
  }
}
