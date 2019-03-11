'use strict'

const PayStack = require('./src/PayStack')

PayStack.prototype.version = '0.1.0';

const Fees = function(cap, additional_charge, percentage, threshold){
    this.additional_charge = additional_charge || Fees.INIT_ADDITIONAL_CHARGE
    this.percentage = percentage || Fees.INIT_PERCENT
    this.threshold = threshold || Fees.INIT_THRESHOLD
    this.cap = cap || Fees.INIT_CAP
    
    this.compute()
};
    
Fees.INIT_THRESHOLD = 250000
Fees.INIT_CAP = 200000
Fees.INIT_PERCENT = 0.015
Fees.INIT_ADDITIONAL_CHARGE = 10000

Fees.prototype.resetDefaults = function(){

}

Fees.prototype.withAdditionalCharge = function(additional_charge){
        this.additional_charge = additional_charge;
        return this
}

Fees.prototype.withThreshold = function(threshold){
        this.threshold = threshold;
        return this
}

Fees.prototype.withCap = function(cap){
        this.cap = cap;
        return this
}

Fees.prototype.compute = function(){
        this.chargeDivider = this.__chargeDivider();
        this.crossover = this.__crossover();
        this.flatlinePlusCharge = this.__flatlinePlusCharge();
        this.flatline = this.__flatline();
}

Fees.prototype.__chargeDivider = function(){
        return 1 - this.percentage;
}

Fees.prototype.__crossover = function(){
    return (this.threshold * this.chargeDivider) - this.additional_charge;
}

Fees.prototype.__flatlinePlusCharge = function(){
    return (this.cap - this.additional_charge) / this.percentage;
}

Fees.prototype.__flatline = function(){
    return this.flatlinePlusCharge - this.cap;
}

Fees.prototype.addFor = function(amountinkobo){
    
        this.compute()
        
        if (amountinkobo > this.flatline) {
            return parseInt(Math.ceil(amountinkobo + this.cap));
        } else if (amountinkobo > this.crossover) {
            return parseInt(Math.ceil((amountinkobo + this.additional_charge) / this.chargeDivider));
        } else {
            return parseInt(Math.ceil(amountinkobo / this.chargeDivider));
        }
}

Fees.prototype.calculateFor = function(amountinkobo){
    
        this.compute()
        
        let fee = this.percentage * amountinkobo;
        if (amountinkobo >= this.threshold) {
            fee += this.additional_charge;
        }
        
        if (fee > this.cap) {
            fee = this.cap;
        }
        
        return parseInt(Math.ceil(fee));
}

PayStack.Fees = Fees;

module.exports = PayStack
