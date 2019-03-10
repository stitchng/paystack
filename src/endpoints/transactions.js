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


	 /*
	 List Transaction
	 @params: perPage, page, customer, status, from, to, amount
	*/
	listTransaction:{
		method:'GET',
		path:'/transaction/',
		send_json: false,
		params: { perPage : Number, page : Number, customer : Number, status : String, from : Date, to : Date, amount :Number},
		param_defaults: {  perPage : 50, page : 1, customer : 0, amount : 0 },
		route_params: null
	},
	
	 /*
	 Fetch Transaction
	 @params: id
	*/
	fetchTransaction:{
		method:'GET',
		path:'/transaction/{:id}',
		send_json: false,
		route_params: { id: Number }
	},



}
