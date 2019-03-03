'use strict'

const got = require('got')
const querystring = require('querystring')
const _ = require('lodash')

const apiEndpoints = {
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
	Get Settlements
	@params: from, to, subaccount
	*/
	getSettlements:{
		method:'GET',
		path:'/settlement',
		send_json: true,
		params:{from: Date, to: Date, subaccount: String },
		params_defaults: { subaccount:'none' },
		route_params: null
	},

	/*
	White/Blacklist customer
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
	 Create an Invoice
	 @params: description, line_items, tax, customer, amount, due_date, draft, has_invoice, metadata
	*/
	createInvoice: {
		method: 'GET',
		path: '/paymentrequest',
		send_json: true,
		params: { description: String, line_items: Array, tax: Array, customer$: String, amount$: Number, due_date$: String, draft: Boolean, has_invoice: Boolean, metadata: Object, send_notification: Boolean },
		param_defaults: { draft: false, has_invoice: false, metadata: {} },
		route_params: null
	},
	/*
	 View an Invoice
	 @params: invoice_id_or_code
	*/
	viewInvoice: {
		method: 'GET',
		path: '/paymentrequest/{:invoice_id_or_code}',
		send_json: false,
		params: null,
		route_params: { invoice_id_or_code: String }
	},
	/*
	 Update an Invoice
	 @params: description, line_items, customer <customer_id>, due_date, metadata, send_notification
	*/
	updateInvoice: {
		method: 'PUT',
		path: '/paymentrequest/{:invoice_id_or_code}',
		send_json: true,
		params: { description: String, line_items: Array, tax: Array, customer: String, due_date: String, metadata: Object, send_notification: Boolean },
		route_params: { invoice_id_or_code: String }
	},
	
	/*
	 List All Invoices
	 @params: customer <customer_id>, status, currency, paid, include_archive
	*/
	listInvoices: {
		method: 'GET',
		path: '/paymentrequest',
		send_json: true,
		params: { customer: String, status: String, currency: String, paid: String, include_archive: String },
		route_params: null
	},
	
	/*
	 Verify Invoice
	 @params: invoice_code
	*/
	verifyInvoice: {
		method:'GET',
		path:'/paymentrequest/verify/{:invoice_code}',
		send_json: true,
		params: null,
		route_params: { invoice_code: String }
	},
	archiveInvoice: {
		method: 'POST',
		path: '/invoice/archive/{:invoice_id_or_code}',
		send_form: true,
		params: null,
		route_params: { invoice_id_or_code: String }
	},
	
	markAsPaid:{
		method:'POST',
		path: '/paymentrequest/mark_as_paid/{:id}',
		send_json: true,
		params: { amount_paid$: Number, paid_by$: String, payment_date$: String, payment_method$: String, note: String },
		param_defaults: { payment_method: "Cash"},
		route_params: { id: String }
	},

	createRefund: {
		method: 'POST',
		path: '/refund',
		send_json: true,
		params: { reference: String, amount: Number, currency: String, customer_note: String, merchant_note: String },
		route_params: null
	},

	listRefund: {
		method: 'GET',
		path: '/refund',
		send_json: false,
		params: { reference: String, currency: String },
		route_params: null
	},

	fetchRefund: {
		method: 'GET',
		path: '/refund/{:reference}',
		send_json: false,
		params: null,
		route_params: { reference: String }
	},

	chargeCard: {
		method: 'POST',
		path: '/charge',
		send_json: true,
		params: { card$: Object, metadata: Object, reference: String, amount: Number, email: String },
		route_params: null
	},

	chargeBank: {
		method: 'POST',
		path: '/charge',
		send_json: true,
		params: { bank$: Object, metadata: Object, reference: String, amount: Number, email: String },
		route_params: null
	}

};


/*
 * 
Provides a convenience extension to _.isEmpty which allows for
 * determining an object as being empty based on either the default
 * implementation or by evaluating each property to undefined, in
 * which case the object is considered empty.
 */
_.mixin(function () {
	// reference the original implementation
	var _isEmpty = _.isEmpty;
	return {
		// If defined is true, and value is an object, object is considered 
		// to be empty if all properties are undefined, otherwise the default 
		// implementation is invoked.
		isEmpty: function (value, defined) {
			if (defined && _.isObject(value)) {
				return !_.some(value, function (value, key) {
					return value !== undefined;
				});
			}
			return _isEmpty(value);
		}
	}
}());


const isTypeOf = (_value, type) => {
	let value = Object(_value)
	return (value instanceof type)
};

const setPathName = (config, values) => {
	return config.path.replace(/\{\:([\w]+)\}/g, function (
		match,
		string,
		offset) {
		let _value = values[string]
		return isTypeOf(
			_value,
			config.route_params[string]
		)
			? _value
			: null
	})
};

const _jsonify = (data) => {
	return !data ? 'null' :
		(typeof data === 'object'
			? (data instanceof Date ? data.toDateString() : (('toJSON' in data) ? data.toJSON().replace(/T|Z/g, ' ') : JSON.stringify(data)))
			: String(data))
};

const setInputValues = (config, inputs) => {
	let httpReqOptions = {}
	let inputValues = {}
	let label = ""

	switch (config.method) {
		case "GET":
		case "HEAD":
			label = "query"
			break;

		case "POST":
		case "PUT":
		case "PATCH":
			label = "body"
			break;
	}
	
	httpReqOptions[label] = {}
	
	if(config.param_defaults){
		inputs = Object.assign({}, config.param_defaults, inputs)
	}

	for (let input in inputs) {

		if (inputs.hasOwnProperty(input)) {
    
			let _input = inputs[input];
      			let _type = null
      			let _required = false
      
		      	if(config.params[input+'$']){
			 	_required = true;
			 	_type = config.params[input+'$']
		      	}else{
			 	_type = config.params[input];
		      	}
      
      			if(_required && (_input == void 0)){
      				throw new Error(`param: ${input} is required but not provided; please provide as needed`)
      			}
          
			httpReqOptions[label][input] = isTypeOf(_input, _type)
            							? (label === "query"
              								? querystring.escape(_jsonify(_input))
              								: _jsonify(_input))
            							: null
			
			if(httpReqOptions[label][input] === null){
			   	throw new Error(`param: ${input} is not of type ${_type.name}; please provided as needed`)
		  	}
      
		}
	}

	inputValues[label] = (label === "body"
		? (config.send_form
			? httpReqOptions[label]
			: JSON.stringify(httpReqOptions[label])
		)
		: querystring.stringify(httpReqOptions[label]))
	
	return inputValues
};

const makeMethod = function (config) {

	let httpConfig = {
		headers: {
			'Accept': 'application/json'
		},
		json: true
	}


	if (config.send_json) {
		httpConfig.headers['Content-Type'] = httpConfig.headers['Accept'] // 'application/json'
	} else if (config.send_form) {
		httpConfig.headers['Content-Type'] = 'x-www-form-urlencoded'
	}

	return function (requestParams) {
		let pathname = false
		let payload = false

		if (!_.isEmpty(requestParams, true)) {
			if (config.params !== null) {
				pathname = config.path
				payload = setInputValues(config, requestParams)
			}

			if (config.route_params !== null) {
				pathname = setPathName(config, requestParams)
				if (payload === false) {
					payload = {}
				}
			}
		} else {
			if (config.params !== null
				|| config.route_params !== null) {
				throw new Error("Argument: [ requestParam(s) ] Not Meant To Be Empty!")
			}
		}
		for (let type in payload) {
			if (payload.hasOwnProperty(type)) {
				httpConfig[type] = JSON.parse(payload[type])
			}
		}

		let reqVerb = config.method.toLowerCase()

		return this.httpBaseClient[reqVerb](pathname, httpConfig)
	};
};

class PayStack {
	constructor(apiKey, appEnv = 'development') {
  
    		const environment = /^(?:development|local|dev)$/

		this.api_base = {
			sandbox: "https://api.paystack.co",
			live: "https://api.paystack.co"
		};

		this.httpClientBaseOptions = {
			baseUrl: environment.test(appEnv) ? this.api_base.sandbox : this.api_base.live,
			headers: {
				'Authorization': `Bearer ${apiKey}`
			},
			hooks: {
				beforeResponse: [
					async options => {
              					// console.log(options)
					}
				],/*
				onError: [	
				    error => {	
					const { response } = error;	
					if (response && response.body) {	
						error.name = 'PayStackError';	
						error.message = `${response.body.message} (${error.statusCode})`;	
					}

					return error;	
				    }	
				],*/
				afterResponse: [
					(response, retryWithMergedOptions) => {

						switch (response.statusCode) {
							case 401: // Unauthorized

								break;
							case 404: // Not Found

								break;
							case 403: // Forbidden

								break;
						}

						return response
					}
				],
			},
			mutableDefaults: false
		};

		this.httpBaseClient = got.extend(this.httpClientBaseOptions)
	}

	mergeNewOptions(newOptions) {

		this.httpBaseClient = this.httpBaseClient.extend(
			newOptions
		);
	}

}

for (let methodName in apiEndpoints) {
	if (apiEndpoints.hasOwnProperty(methodName)) {
		PayStackNgAPI.prototype[methodName] = makeMethod(apiEndpoints[methodName])
	}
}

module.exports = PayStack
