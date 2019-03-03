var chai = require('chai');
var expect = chai.expect;
var should = chai.should();


describe('PayStack Instance Test(s)', function(){

    // Created Instance
    var PayStack = require('../src/PayStack.js')
    var instance = new PayStack('sk_test_2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7')
   
    it('should have a function [mergeNewOptions]', function(){
        var isFunction = typeof instance.mergeNewOptions === 'function'
      
        expect(isFunction).to.be.true;
    });
  
    it('should throw an error if method is called without arguments', function(){
        try{
          instance.createCustomer()
        } catch(err) {
          should.exist(err)
        }
    })
})

