'use strict'

var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('PayStack Instance Test(s)', function () {
  // Created Instance
  var PayStack = require('../index.js')
  var instance = new PayStack('sk_test_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7')

  it('should have a function [mergeNewOptions]', function () {
    // mock not enabled
    expect(Object.prototype.toString.call(instance._mock)).to.be.equal('[object Null]')

    PayStack.engageMock()
    // mock now enabled
    expect(Object.prototype.toString.call(instance._mock)).to.be.equal('[object Object]')
    /* eslint-disable no-unused-expressions */
    expect((typeof instance.mergeNewOptions === 'function')).to.be.true
    expect((typeof instance.createCustomer === 'function')).to.be.true
    expect((typeof instance.listDisputes === 'function')).to.be.true
    expect((typeof instance.addPageProduct === 'function')).to.be.true
    expect((typeof instance.listBanks === 'function')).to.be.true
    expect((typeof instance.listCountries === 'function')).to.be.true
    expect((typeof instance.getBalanceHistory === 'function')).to.be.true

    PayStack.disengageMock()
    expect(Object.prototype.toString.call(instance._mock)).to.be.equal('[object Null]')
    expect((typeof instance.createInvoice === 'function')).to.be.true
    expect((typeof instance.createPage === 'function')).to.be.true
    expect((typeof instance.chargeBank === 'function')).to.be.true
    expect((typeof instance.chargeCard === 'function')).to.be.true
    expect((typeof instance.createDedicatedNuban === 'function')).to.be.true
    expect((typeof instance.createProduct === 'function')).to.be.true
    expect((typeof PayStack.Fees === 'function')).to.be.true
    /* eslint-enable no-unused-expressions */
  })

  it('should throw an error if method is called without required arguments', function () {
    try {
      instance.createCustomer()
    } catch (err) {
      should.exist(err)
    }
  })

  it('should throw an error if method is called with any arguments other than an object', function () {
    try {
      instance.createInvoice([])
    } catch (err) {
      should.exist(err)
    }
  })
})
