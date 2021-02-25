module.exports = {
  make: function (hooks = {}, methods = []) {
    const mockedMethods = methods.map( method => { method: function () { 
      const that = this;
      return new Promise(function resolver (rs, rj) {
        const args = Array.prototype.slice.call(arguments)
        setTimeout(function timeoutCallback (data) {
          if (that._respondWithError) {
            const err = new Error('Paystack Erro: ');
            err.response = { body: { status: false, message: 'error on request to paystack' } }
            return rj(hooks.onError(
              err
            ))
          }
          return rs({ status: true, message: 'successfull paystack request', data: data })
        }, 750, args[0])
      })
    })
    return Object.assign.apply(Object, mockedMethods)
  }
}
