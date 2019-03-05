'use strict'

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
	}
}
