'use strict'

module.exports = {
  /*
	 Initialize Transaction
	 @params: reference, callback_url, amount, email, plan, invoice_limit
	*/
	initializeTransaction:{
		method:'POST',
		path:'/transaction/initialize',
		send_json: true,
		params: { reference: String, callback_url: String, amount$: Number, email$: String, plan: String, invoice_limit: Number, metadata: String },
		param_defaults: { invoice_limit: 0 },
		route_params: null
	},

	 /*
	 Verify Transaction
	 @params: reference
	*/
	verifyTransaction:{
		method:'GET',
		path:'/transaction/verify/{:reference}',
		send_json: false,
		route_params: { reference: String }
	},

}
