'use strict'

const payStackMockFactory = require('./facade/MockFactory.js')

class Mockable {
  static engageMock () {
    this.prototype._mock = payStackMockFactory.make(
      this.prototype.httpClientBaseOptions.hooks,
      Object.keys(this.prototype)
    )
  }

  static disengageMock () {
    this.prototype._mock = null
  }

  static mockMacro (methodName, methodRoutine) {
    if (typeof this.prototype[methodName] !== 'function') {
      throw new Error('Cannot monkey-patch non-existing methods');
    }

    if (typeof methodRoutine !== 'function') {
      throw new Error('Second argument MUST be a function');
    }
    return (this.prototype._mock[methodName] = methodRoutine)
  }
}

Mockable.prototype._mock = null;
