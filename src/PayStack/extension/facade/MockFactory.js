'use strcit'

module.exports = {
  make: function (hooks = {}, methods = []) {
    const mockedMethods = methods.map(function (method) {
      let mock = {}
      mock[method] = function () {
        const that = this
        return new Promise(function resolver (resolve, reject) {
          const args = Array.prototype.slice.call(arguments)
          setTimeout(function timeoutCallback (data) {
            if (that._respondWithError) {
              const err = new Error('[Paystack] : something unexpected happened')
              err.response = {
                status: 401,
                body: {
                  status: false,
                  message: 'error on request to paystack'
                }
              }
              return reject(hooks.onError(
                err
              ))
            }
            return resolve({
              status: 200,
              statusText: 'OK',
              body: {
                status: true,
                message: 'successfull paystack request {' + method + '}',
                data: data || {
                  status: 'success'
                }
              }
            })
          }, 750, args[0])
        })
      }
      return mock
    })

    mockedMethods.unshift({})
    return Object.assign.apply(Object, mockedMethods)
  }
}
