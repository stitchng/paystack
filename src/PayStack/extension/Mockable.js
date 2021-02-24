'use strict'

class Mockable {
    static engageMock(){ this.prototype._mock = {} }
    static disengageMock(){ this.prototype._mock = null }
}

Mockable.prototype._mock = null;
