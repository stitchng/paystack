'use strict'

const got = require('got')
const querystring = require('querystring')
const _ = require('lodash')
const apiEndpoints = {
	/*
    Create customer
    @param: first_name, last_name, email, phone
    */
	createCustomer: {
		method: 'POST',
		path: '/customer',
		send_json: true,
		params: { first_name: String, last_name: String, email: String, phone: String },
		route_params: null
	},

	/*
	Get customer
  @param: cust_id
	*/
	getCustomer: {
		method: 'GET',
		path: '/customer/{:cust_id}',
		send_json: true,
		params: null,
		route_params: { cust_id: String }
	},

	/*
	List customers
	*/
	listCustomers: {
		method: 'GET',
		path: '/customer',
		send_json: true,
		params: {},
		route_params: {}
	},

	/*
	Update customer
	@param: first_name, last_name, email, phone
	*/
	updateCustomer: {
		method: 'PUT',
		path: '/customer/{:cust_id}',
		send_json: true,
		params: { first_name: String, last_name: String, email$: String, phone: String },
		route_params: { cust_id: String }
	},

	/*
	White/Blacklist customer
	@param: customer, risk_action ('allow' to whitelist or 'deny' to blacklist)
	*/
	setRiskActionOnCustomer: {
		method: 'POST',
		path: '/customer/set_risk_action',
		send_json: true,
		params: { cust_id$: String, risk_action: String },
		param_defaults: { risk_action: "allow" },
		route_params: null
	},

	deactivateAuthOnCustomer: {
		method: 'POST',
		path: '/customer/deactivate_authorization',
		send_json: true,
		params: { authorization_code: String },
		route_params: null
	},

	createInvoice: {
		method: 'GET',
		path: '/paymentrequest',
		send_json: true,
		params: { description: String, line_items: Array, tax: Array, customer$: String, amount$: Number, due_date$: String, draft: Boolean, has_invoice: Boolean, metadata: Object, send_notification: Boolean },
		param_defaults: { draft: false, has_invoice: false, metadata: {} },
		route_params: null
	},

	viewInvoice: {
		method: 'GET',
		path: '/paymentrequest/{:invoice_id_or_code}',
		send_json: false,
		params: null,
		route_params: { invoice_id_or_code: String }
	},

	updateInvoice: {
		method: 'POST',
		path: '/paymentrequest/{:invoice_id_or_code}',
		send_json: true,
		params: { description: String, line_items: Array, tax: Array, cust_id: String, due_date: String, metadata: Object, send_notification: Boolean },
		route_params: { invoice_id_or_code: String }
	},

	listInvoices: {
		method: 'GET',
		path: '/paymentrequest',
		send_json: true,
		params: { cust_id: String, status: String, currency: String, paid: String, include_archive: String },
		route_params: null
	},

	archiveInvoice: {
		method: 'POST',
		path: '/invoice/archive/{:invoice_id_or_code}',
		send_form: true,
		params: null,
		route_params: { invoice_id_or_code: String }
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
      
      if(_required && !!_input){
          httpReqOptions[label][input] = isTypeOf(_input, _type)
            ? (label === "query"
              ? querystring.escape(_jsonify(_input))
              : _jsonify(_input))
            : null
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
		httpConfig.headers['Content-Type'] = httpConfig.headers['Accept']
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
				],
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
