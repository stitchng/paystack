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

/**
 * check if a variable literal (or not) is falsy or not
 */
const isLiteralFalsey = (variable) => {
  return variable === '' || variable === false || variable === 0
}

/**
 * check if a variable is a reference type (not a literal) or not
 */

const isPrimitive = (arg) => {
   return typeof arg === 'object' || (Boolean(arg) && typeof arg === 'function')
}

/**
 * retrieve the type name either from a reference variables' constructor name or up its' prototype chain
*/
const getNameByChain = (_type, depth) => {
  let $depth = depth;

  if(typeof $depth !== 'number'){
    $depth = 1;
  }

  let name = _type.name || _type.displayName
  const chainList = [(_type.__proto__ && _type.__proto__.prototype)];

  while(Boolean(chainList[0]) && $depth !== 0){
    const variable = chainList[0].constructor;
    if(typeof variable !== 'function'){
      break;
    }
    name = variable.name || variable.displayName
    --depth
    chainList.unshift((variable.__proto__ && variable.__proto__.prototype));
  }
  chainList.length = 0

  return name
}

/**
 * provide the name of primitive and/or reference types
 */
const checkTypeName = (target, type) => {
  let typeName = ''
  let match = false
  let depth = 0
  const MAX_DEPTH = 3

  if(typeof type === 'function'){
    type = (getNameByChain(type, depth)).toLowerCase()
  }

  if (isLiteralFalsey(target) || !isPrimitive(target)) {
    typeName = typeof target
  } else {
    typeName = (Object.prototype.toString.call(target)).replace(/^\[object (.+)\]$/, '$1') 
  }

  match = Boolean(typeName.toLowerCase().indexOf(type) + 1)

  while(!match){
    ++depth;
    if(depth === MAX_DEPTH){
      break;
    }

    typeName = '' + (target && getNameByChain(target.constructor, depth))
    match = Boolean(typeName.toLowerCase().indexOf(type) + 1)
  }

  return match;
}

/**
 * get the actual type of a variable
 */

/*!
 * @EXAMPLES:
 * 
 * strictTypeOf([], 'Array'); // true
 * strictTypeOf({}, 'object'); // true
 * strictTypeOf(null, 'null'); // true
 * strictTypeOf(window.localStorage, Storage); // true
 * strictTypeOf('hello!', 'Boolean'); // false
 * strictTypeOf(new URL('/', window.location.origin), 'url'); // true
 * strictTypeOf(0x35, ['number', 'string']); // true
 * strictTypeOf("200,000", ['number', 'string']); // true
 */
const strictTypeOf = (value, type) => {
  let result = false

  type = type || []

  if (typeof type === 'object') {
    if (typeof type.length !== 'number') {
      return result
    }

    let bitPiece = 0

    type = [].slice.call(type)

    type.forEach(_type => {
      var localResult = false;
      if (typeof _type === 'function') {
          localResult = value instanceof _type
      }
      bitPiece |= Number(localResult || checkTypeName(value, _type.toLowerCase()))
    })
    result = Boolean(bitPiece)
  } else {
    if (typeof type === 'function') {
      result = value instanceof type
    }
    result = result || checkTypeName(value, type.toLowerCase())
  }
  return result
}

const matcherValid = (value, matcher = () => true) => {
  return matcher(value);
}

const isNullOrUndefined = (value) => {
  return strictTypeOf(value, ['undefined', 'null'])
}

const isNumeric = (value) => {
  if (strictTypeOf(value, ['string', 'number'])) {
    return strictTypeOf(Math.abs(-value), 'number')
  }
  return false
}

const objectToJSONString = (value) => {
  const isValidObject = value instanceof Object;
  if (!value || !isValidObject) {
    throw new TypeError(
      "objectToJSONString(...): argument 1 is not a valid object"
    )
  }

  const isDateObject = value instanceof Date;

  if (!isDateObject && ('toJSON' in value)) {
    return value.toJSON();
  }
    
  return isDateObject 
    ? value.toISOString().replace(/Z$/, '')
    : JSON.stringify(value);
};


const setPathName = (config, values) => {
  return config.path.replace(/\{:([\w]+)\}/g, function (
    match,
    string,
    offset) {
    let _value = values[string] || (
      strictTypeOf(config.alternate_route_params_keymap, 'object')
        ? values[config.alternate_route_params_keymap[string]]
        : false
    );

    if (config.route_params_numeric === true) {
      if (!isNumeric(_value)) {
        return null
      }
    }
    return strictTypeOf(
      _value,
      (config.route_params[string] || String)
    )
      ? _value
      : null
  })
}

const _jsonify = (data) => {
  if (isNullOrUndefined(data)) {
    return 'null';
  }

  return typeof data === 'object'
    ? objectToJSONString(data)
    : String(data)
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
        if (!strictTypeOf(_input, _type)) {
          throw new Error(
            `param: "${param}" is not of the correct type "${_type.toLowerCase()}"; please provide as needed`
          );
        }

        httpReqOptions[label][param] = matcherValid(
          _input,
          'param_matchers' in config ? config.param_matchers[param] : (() => true)
        )
          ? (label === 'query'
            ? querystring.escape(_jsonify(_input))
            : _jsonify(_input))
          : null

        if (httpReqOptions[label][param] === null) {
          throw new TypeError(`param: "${param}" value: '${_input}' did not pass matcher; please provide as needed`)
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
    httpConfig.headers['Content-Type'] = 'application/json'
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
          'Argument: [ requestParam(s) ] Should Not Be Empty!'
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
