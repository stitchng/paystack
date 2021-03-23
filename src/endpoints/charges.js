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
    params: { card$: Object, metadata: Object, reference: String, pin: String, authorization_code: String, device_id: String, amount$: String, email$: String },
    param_defaults: null,
    route_params: null
  },

  /*
   Charge USSD
   @param: ussd, metadata, reference, amount, email
  */
  chargeUssd: {
    method: 'POST',
    path: '/charge',
    send_json: true,
    params: { ussd$: Object, metadata: Object, reference: String, pin: String, authorization_code: String, device_id: String, amount$: String, email$: String },
    param_defaults: { ussd: { type: '737' } },
    route_params: null
  },

  /*
   Charge Mobile Money
   @param: mobile_money, currency, metadata, reference, amount, email
  */
  chargeMobileMoney: {
    method: 'POST',
    path: '/charge',
    send_json: true,
    params: { mobile_money$: Object, currency: String, metadata: Object, reference: String, pin: String, authorization_code: String, device_id: String, amount$: String, email$: String },
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
    params: { bank$: Object, metadata: Object, reference: String, pin: String, authorization_code: String, mobile_money: Object, device_id: String, amount$: String, email$: String },
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
   Submit Address
   @param: address, reference, city, state, zipcode
  */
  submitAddress: {
    method: 'POST',
    path: '/charge/submit_address',
    send_json: true,
    params: { address$: String, reference$: String, city$: String, state$: String, zipcode: String },
    route_params: null
  },

  /*
    Check Pending Charge
    @param: reference
  */
  checkPendingCharge: {
    method: 'GET',
    path: '/charge/{:reference}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { reference: String }
  }
}
