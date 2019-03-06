'use strict'

module.exports = {
    /*
      Create Sub Account
      @param: business_name, settlement_bank, account_number, percentage_charge, primary_contact_email, primary_contact_name, primary_contact_phone, metadata, settlement_schedule
    */
    createSubaccount:{
       method:'POST',
       path:'/subaccount',
       send_json: true,
       params:{ business_name$: String, settlement_bank: String, account_number$: String, percentage_charge$: Number, primary_contact_email: String, primary_contact_name: String, primary_contact_phone: String, metadata: String, settlement_schedule: String },
       param_defaults:{ settlement_schedule: 'auto', percentage_charge: 0 },
       route_params: null
    }
}
