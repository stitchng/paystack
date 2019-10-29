'use strict'

/* Charging banks & cards are split into two separate method APIs */

module.exports = {
  /*
   Charge Card
   @param: card, metadata, reference, amount, email
  */
  chargeCard: {
    method: 'POST',
    path: '/charge',
    send_json: true,
    params: { card$: Object, metadata: Object, reference: String, amount: Number, email: String },
    param_defaults: null,
    route_params: null
  },

  /*
   Charge Bank
   @param: bank, metadata, reference, amount, email
  */
  chargeBank: {
    method: 'POST',
    path: '/charge',
    send_json: true,
    params: { bank$: Object, metadata: Object, reference: String, amount: Number, email: String },
    route_params: null
  },

  /*
   Submit PIN
   @param: pin, reference
  */
  submitPIN: {
    method: 'POST',
    path: '/charge/submit_pin',
    send_json: true,
    params: { pin$: String, reference$: String },
    route_params: null
  },

  /*
   Submit OTP
   @param: otp, reference
  */
  submitOTP: {
    method: 'POST',
    path: '/charge/submit_otp',
    send_json: true,
    params: { otp$: String, reference$: String },
    route_params: null
  },

  /*
   Submit Phone
   @param: phone, reference
  */
  submitPhone: {
    method: 'POST',
    path: '/charge/submit_phone',
    send_json: true,
    params: { phone$: String, reference$: String },
    route_params: null
  },

  /*
   Submit Birthday
   @param: birthday, reference
  */
  submitBirthday: {
    method: 'POST',
    path: '/charge/submit_birthday',
    send_json: true,
    params: { birthday$: Date, reference$: String },
    route_params: null
  },

  /*
    Check Pending Charge
    @param: reference
  */
  checkPendingCharge: {
    method: 'GET',
    path: '/charge/{:reference}',
    params: null,
    param_defaults: null,
    route_params: { reference: String }
  }
}
