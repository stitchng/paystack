'use strict'

module.exports = {
  /*
    Create an Invoice
    @params: description, line_items, tax, customer, amount, due_date, draft, has_invoice, metadata
  */
  createInvoice: {
    method: 'POST',
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
    param_defaults: { send_notification: false },
    route_params: { invoice_id_or_code: String }
  },

  /*
    List All Invoices
    @params: customer <customer_id>, status, currency, paid, include_archive
  */
  listInvoices: {
    method: 'GET',
    path: '/paymentrequest',
    send_json: false,
    params: { customer: String, status: String, currency: String, paid: String, include_archive: String },
    param_defaults: { currency: 'NGN' },
    route_params: null
  },

  /*
    Verify Invoice
    @params: invoice_code
  */
  verifyInvoice: {
    method: 'GET',
    path: '/paymentrequest/verify/{:invoice_code}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { invoice_code: String }
  },

  /*
    Finalize [ Invoice ] Draft
    @params: id_or_code, send_notification
  */
  finalizeInvoiceDraft: {
    method: 'POST',
    path: '/paymentrequest/finalize/{:id_or_code}',
    send_json: true,
    params: { send_notification: Boolean },
    param_defaults: { send_notification: true },
    route_params: { id_or_code: String }
  },

  /*
    Get [ Invoice ] Metrics
    @params:
  */

  getMetricsForInvoices: {
    method: 'GET',
    path: '/paymentrequest/totals',
    send_form: true,
    params: null,
    param_defaults: null,
    route_params: null
  },

  /*
    Send [ Invoice ] Notification
    @params: id_or_code
  */
  sendInvoiceNotification: {
    method: 'POST',
    path: '/paymentrequest/notify/{:id_or_code}',
    send_json: true,
    params: null,
    route_params: { id_or_code: String }
  },

  /*
    Archive Invoice
    @params: invoice_id_or_code
  */
  archiveInvoice: {
    method: 'POST',
    path: '/invoice/archive/{:invoice_id_or_code}',
    send_form: true,
    params: null,
    route_params: { invoice_id_or_code: String }
  },

  /*
    Mark [ Invoice ] As Piad
    @params: id, amount_paid, paid_by, payment_date, payment_method, note
  */
  markInvoiceAsPaid: {
    method: 'POST',
    path: '/paymentrequest/mark_as_paid/{:id}',
    send_json: true,
    params: { amount_paid$: Number, paid_by$: String, payment_date$: String, payment_method$: String, note: String },
    param_defaults: { payment_method: 'Cash' },
    route_params: { id: String }
  }
}
