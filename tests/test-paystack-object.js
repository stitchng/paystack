var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('PayStack Instance Test(s)', function () {
  // Created Instance
  var PayStack = require('../index.js')
  var instance = new PayStack('sk_test_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7')

  it('should have a function [mergeNewOptions]', function () {
    var method1 = () => typeof instance.mergeNewOptions === 'function'
    var method2 = () => typeof instance.createCustomer === 'function'
    var method3 = () => typeof instance.createInvoice === 'function'
    var method4 = () => typeof PayStack.Fees === 'function'

    expect(method1()).to.be.true
    expect(method2()).to.be.true
    expect(method3()).to.be.true
    expect(method4()).to.be.true
  })

  it('should throw an error if method is called without required arguments', function () {
    try {
      instance.createCustomer()
    } catch (err) {
      should.exist(err)
    }
  })
})
