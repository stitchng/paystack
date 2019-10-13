'use strict'

module.exports = {
  /*
      Create Sub Account
      @param: business_name, settlement_bank, account_number, percentage_charge, primary_contact_email, primary_contact_name, primary_contact_phone, metadata, settlement_schedule
    */
  createSubaccount: {
    method: 'POST',
    path: '/subaccount',
    send_json: true,
    params: { business_name$: String, settlement_bank: String, account_number$: String, percentage_charge$: Number, primary_contact_email: String, primary_contact_name: String, primary_contact_phone: String, metadata: String, settlement_schedule: String },
    param_defaults: { settlement_schedule: 'auto', percentage_charge: 0 },
    route_params: null
  },

  /*
      List Sub Accounts
      @param: perPage(50 per page), page
    */
  listSubaccount: {
    method: 'GET',
    path: '/subaccount',
    send_json: false,
    params: { perPage: Number, page: Number },
    param_defaults: { perPage: 50, page: 1 },
    route_params: null
  },

  /*
      Fetch Sub Account
      @param: id_or_slug
    */
  getSubaccount: {
    method: 'GET',
    path: '/subaccount/{:id_or_slug}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { id_or_slug: String }
  },

  /*
      Update Sub Account
      @param: id_or_slug, business_name, settlement_bank, account_number, percentage_charge, primary_contact_email, primary_contact_name, primary_contact_phone, metadata, settlement_schedule
    */
  updateSubaccount: {
    method: 'PUT',
    path: '/subaccount/{:id_or_slug}',
    send_json: true,
    params: { business_name: String, settlement_bank: String, account_number: String, percentage_charge: Number, primary_contact_email: String, primary_contact_phone: String, metadata: String, settlement_schedule: String },
    param_defaults: { settlement_schedule: 'auto', percentage_charge: 0 },
    route_params: { id_or_slug: String }
  }

}
