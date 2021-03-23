'use strict'

const got = require('got')
const querystring = require('querystring')
const _ = require('lodash')

const customers = require('../endpoints/customers.js')
const disputes = require('../endpoints/disputes.js')
const transactions = require('../endpoints/transactions.js')
const subaccounts = require('../endpoints/subaccounts.js')
const plans = require('../endpoints/plans.js')
const pages = require('../endpoints/pages.js')
const products = require('../endpoints/products.js')
const balanceHistory = require('../endpoints/balance_history.js')
const transferRecipients = require('../endpoints/transfers_recipients.js')
const refunds = require('../endpoints/refunds.js')
const charges = require('../endpoints/charges.js')
const invoices = require('../endpoints/invoices.js')
const transfers = require('../endpoints/transfers.js')
const verifications = require('../endpoints/verifications.js')
const dedicatedNuban = require('../endpoints/dedicated_nuban.js')
const miscellaneous = require('../endpoints/miscellaneous.js')
const settlements = require('../endpoints/settlements.js')
const subscriptions = require('../endpoints/subscriptions.js')
const controlPanelForSessions = require('../endpoints/control_panel_for_sessions.js')

const Mockable = require('./extension/Mockable.js')

/* Any param with '$' at the end is a REQUIRED param both for request body param(s) and request route params */
const apiEndpoints = Object.assign(
  {},
  customers,
  disputes,
  transactions,
  subaccounts,
  plans,
  pages,
  products,
  balanceHistory,
  refunds,
  charges,
  invoices,
  transfers,
  verifications,
  miscellaneous,
  dedicatedNuban,
  settlements,
  subscriptions,
  transferRecipients,
  controlPanelForSessions
)

/*!
 *
 * Provides a convenience extension to _.isEmpty which allows for
 * determining an object as being empty based on either the default
 * implementation or by evaluating each property to undefined, in
 * which case the object is considered empty.
 */
_.mixin(function () {
  // reference the original implementation
  var _isEmpty = _.isEmpty
  return {
    // If defined is true, and value is an object, object is considered
    // to be empty if all properties are undefined, otherwise the default
    // implementation is invoked.
    isEmpty: function (value, defined) {
      if (defined && _.isObject(value)) {
        return !_.some(value, function (value, key) {
          return value !== undefined
        })
      }
      return _isEmpty(value)
    }
  }
}())

const isLiteralFalsey = (variable) => {
  return (variable === '' || variable === false || variable === 0)
}

const checkTypeName = (target, type) => {
  let typeName = ''
  if (isLiteralFalsey(target)) {
    typeName = (typeof target)
  } else {
    typeName = ('' + (target && target.constructor.name))
  }
  return !!(typeName.toLowerCase().indexOf(type) + 1)
}

const isTypeOf = (value, type) => {
  let result = false

  type = type || []

  if (typeof type === 'object') {
    if (typeof type.length !== 'number') {
      return result
    }

    let bitPiece = 0
    type = [].slice.call(type)

    type.forEach(_type => {
      if (typeof _type === 'function') {
        _type = (_type.name || _type.displayName).toLowerCase()
      }
      bitPiece |= (1 * (checkTypeName(value, _type)))
    })

    result = !!(bitPiece)
  } else {
    if (typeof type === 'function') {
      type = (type.name || type.displayName).toLowerCase()
    }

    result = checkTypeName(value, type)
  }

  return result
}

const isNullOrUndefined = (value) => {
  return isTypeOf(value, ['undefined', 'null'])
}

const isNumeric = (value) => {
  if (isTypeOf(value, ['string', 'number'])) {
    return isTypeOf(Math.abs(-value), 'number')
  }
  return false
}

const setPathName = (config, values) => {
  return config.path.replace(/\{:([\w]+)\}/g, function (
    match,
    string,
    offset) {
    let _value = values[string] || (isTypeOf(config.alternate_route_params_keymap, 'object') ? values[config.alternate_route_params_keymap[string]] : false)
    if (config.route_params_numeric === true) {
      if (!isNumeric(_value)) {
        return null
      }
    }
    return isTypeOf(
      _value,
      (config.route_params[string] || String)
    )
      ? _value
      : null
  })
}

const _jsonify = (data) => {
  return isNullOrUndefined(data) ? 'null'
    : (typeof data === 'object'
      ? (data instanceof Date ? data.toISOString().replace(/Z$/, '') : (('toJSON' in data) ? data.toJSON().replace(/Z$/, '') : JSON.stringify(data)))
      : String(data))
}

const setInputValues = (config, inputs) => {
  let httpReqOptions = {}
  let inputValues = {}
  let label = ''

  switch (config.method) {
    case 'GET':
    case 'HEAD':
    case 'DELETE':
      label = 'query'
      break

    case 'POST':
    case 'PUT':
    case 'PATCH':
      label = 'body'
      break
  }

  httpReqOptions[label] = {}

  if (config.param_defaults) {
    inputs = Object.assign({}, config.param_defaults, inputs)
  }

  for (var input in config.params) {
    if (config.params.hasOwnProperty(input)) {
      let param = input.replace('$', '')
      let _input = inputs[param]
      let _type = config.params[input]
      let _required = false

      if ((input.indexOf('$') + 1) === (input.length)) {
        _required = true
      }

      if (isNullOrUndefined(_input) || _input === '') {
        if (_required) { throw new Error(`param: "${param}" is required but not provided; please provide as needed`) }
      } else {
        httpReqOptions[label][param] = isTypeOf(_input, _type)
          ? (label === 'query'
            ? querystring.escape(_jsonify(_input))
            : _jsonify(_input))
          : null

        if (httpReqOptions[label][param] === null) {
          throw new TypeError(`param: "${param}" is not of type ${_type.name || _type}; please provided as needed`)
        }
      }
    }
  }

  inputValues[label] = (label === 'body'
    ? (config.send_form
      ? httpReqOptions[label]
      : JSON.stringify(httpReqOptions[label])
    )
    : querystring.stringify(httpReqOptions[label]))

  return inputValues
}

const makeMethod = function (config, methodName) {
  let httpConfig = {
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json'
    },
    json: true
  }

  if (config.send_json) {
    httpConfig.headers['Content-Type'] = httpConfig.headers['Accept'] // 'application/json'
    httpConfig.form = false
  } else if (config.send_form) {
    httpConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    httpConfig.form = true
  }

  return function (requestParams = {}) {
    let pathname = config.path
    let payload = false

    if (!(requestParams instanceof Object)) {
      throw new TypeError(
        'Argument: [ requestParam(s) ] Should Be An Object Literal'
      )
    }

    if (!_.isEmpty(requestParams, true)) {
      if (config.params !== null) {
        payload = setInputValues(config, requestParams)
      }

      if (config.route_params !== null) {
        pathname = setPathName(config, requestParams)
      }
    } else {
      if (config.params !== null || config.route_params !== null) {
        throw new TypeError(
          'Argument: [ requestParam(s) ] Not Meant To Be Empty!'
        )
      }
    }

    if (payload === false) {
      payload = {}
    }

    let reqBody = {}

    for (let type in payload) {
      if (payload.hasOwnProperty(type)) {
        reqBody = httpConfig[type] = (type === 'query')
          ? payload[type]
          : JSON.parse(payload[type])
        break
      }
    }

    const reqVerb = config.method.toLowerCase()

    const canInvokeTestingMock = (
      this._mock !== null &&
      typeof this._mock[methodName] === 'function'
    )

    if (canInvokeTestingMock) {
      if (methodName !== 'chargeBank' &&
          methodName !== 'chargeCard') {
        return this._mock[methodName](
          Object.assign(
            httpConfig,
            { 'method': config.method }
          ))
      } else if (isTypeOf(reqBody.card, Object) ||
                 isTypeOf(reqBody.bank, Object)) {
        /* eslint-disable camelcase */
        const { cvv, expiry_month, expiry_year } = reqBody.card
        const { code, account_number } = reqBody.bank
        /* eslint-enable camelcase */

        // Visa OR Verve
        const isTestCardPan = /^408408(4084084081|0000000409|0000005408)$/.test(reqBody.card.number)
        const isTestCardCVV = String(cvv) === '408'
        const isTestCardExpiry = String(expiry_month) === '02' && String(expiry_year) === '22'
        const isTestCard = (isTestCardPan && isTestCardCVV && isTestCardExpiry)

        // Zenith Bank OR First Bank
        const isTestBankCode = /^(?:057|011)$/.test(String(code))
        /* eslint-disable-next-line camelcase */
        const isTestBankAccount = account_number === '0000000000'
        const isTestBank = (isTestBankCode && isTestBankAccount)

        if (!isTestCard || !isTestBank) {
          return this._mock[methodName](
            Object.assign(
              httpConfig,
              { 'method': config.method }
            )
          )
        }
      }
    }
    return this.httpBaseClient[reqVerb](pathname, httpConfig)
  }
}

class PayStack extends Mockable {
  get httpClientBaseOptions () {
    return {
      headers: { },
      hooks: {
        beforeResponse: [
          async options => {
            // console.log(options)
          }
        ],
        onError: [
          error => {
            const { response } = error
            if (response && response.body) {
              error.name = 'PayStackError'
              error.message = `${response.body.message} (${error.statusCode})`
            }

            return error
          }
        ],
        afterResponse: [
          (response) => {
            let errorMessage = ''
            switch (response.statusCode) {
              case 400: // Bad Request
                errorMessage = 'Request was badly formed | Bad Request (400)'
                break
              case 401: // Unauthorized
                errorMessage = 'Bearer Authorization header may not have been set | Unauthorized (401)'
                break
              case 404: // Not Found
                errorMessage = 'Request endpoint does not exist | Not Found (404)'
                break
              case 403: // Forbidden
                errorMessage = 'Request endpoint requires further priviledges to be accessed | Forbidden (403)'
                break
            }

            if (response.body && response.body.status === false) {
              errorMessage += '; {' + response.body.message + '}'
            }

            if (errorMessage !== '') {
              const error = new Error(errorMessage)
              if (response._isMocked) {
                error.response = response
              }
              error.name = 'PayStackAPIError'
              throw error
            }

            return response
          }
        ]
      },
      mutableDefaults: false
    }
  }

  constructor (apiKey, appEnv = 'development') {
    super()
    const environment = /^(?:development|local|dev)$/

    const apiBase = {
      sandbox: 'https://api.paystack.co',
      live: 'https://api.paystack.co'
    }

    const clientOptions = this.httpClientBaseOptions

    clientOptions.baseUrl = environment.test(appEnv) ? apiBase.sandbox : apiBase.live
    clientOptions.headers['Authorization'] = `Bearer ${apiKey}`

    this.httpBaseClient = got.extend(clientOptions)
  }

  mergeNewOptions (newOptions) {
    this.httpBaseClient = this.httpBaseClient.extend(
      newOptions
    )
  }
}

for (let methodName in apiEndpoints) {
  if (apiEndpoints.hasOwnProperty(methodName)) {
    PayStack.prototype[methodName] = makeMethod(apiEndpoints[methodName], methodName)
  }
}

PayStack.excludeOnMock = [
  'httpClientBaseOptions',
  'version'
]

module.exports = PayStack
