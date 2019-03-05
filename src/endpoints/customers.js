'use strict'

module.exports = {
      /*
   	 Create customer
   	 @params: first_name, last_name, email, phone
   	 */
	createCustomer: {
		method: 'POST',
		path: '/customer',
		send_json: true,
		params: { first_name: String, last_name: String, email$: String, phone: String },
		route_params: null
	},

	/*
	Get customer
 	 @params: customer_id
	*/
	getCustomer: {
		method: 'GET',
		path: '/customer/{:customer_id}',
		send_json: true,
		params: null,
		route_params: { customer_id: String }
	},

	/*
	List customers
	@params: perPage, page
	*/
	listCustomers: {
		method: 'GET',
		path: '/customer',
		send_json: true,
		params: { perPage: Number, page: Number },
		param_defaults: { perPage: 50, page: 1 },
		route_params: null
	},

	/*
	Update customer
	@params: first_name, last_name, email (required), phone
	*/
	updateCustomer: {
		method: 'PUT',
		path: '/customer/{:customer_id}',
		send_json: true,
		params: { first_name: String, last_name: String, email$: String, phone: String },
		route_params: { customer_id: String }
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
	@params: customer_id (required), risk_action 
	
	@info: [ 'allow' to whitelist or 'deny' to blacklist ]
	*/
	setRiskActionOnCustomer: {
		method: 'POST',
		path: '/customer/set_risk_action',
		send_json: true,
		params: { customer_id$: String, risk_action: String },
		param_defaults: { risk_action: "allow" },
		route_params: null
	}
	
}
