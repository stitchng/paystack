'use strict'

module.exports = {
  /*
    Create Transfer Recipient
    @params: type, name, account_number, bank_code, currency, description, authorization_code
  */
  createTransferRecipient: {
    method: 'POST',
    path: '/transferrecipient',
    send_json: true,
    params: { type$: String, name$: String, account_number$: String, bank_code$: String, currency: String, description: String, authorization_code: String },
    param_defaults: { type: 'nuban', currency: 'NGN' },
    route_params: null
  },
  /*
    List Transfer Recipients
    @params: perPage, page
  */
  listTransferRecipients: {
    method: 'GET',
    path: '/transferrecipient',
    send_json: false,
    params: { perPage: Number, page: Number },
    param_defaults: { perPage: 0, page: 0 },
    route_params: null
  },

  /*
    Update a transfer recipient
    @params: name, email, recipient_code_or_id
  */
  updateTransferRecipient: {
    method: 'PUT',
    path: '/transferrecipient/{:recipient_code_or_id}',
    send_json: true,
    params: { name: String, email: String },
    param_defaults: null,
    route_params: { recipient_code_or_id: String }
  },
  /*
    Delete Transfer Recipient
    @params: recipient_code_or_id
  */
  deleteTransferRecipient: {
    method: 'DELETE',
    path: '/transferrecipient/{:recipient_code_or_id}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { recipient_code_or_id: String }
  }
}
