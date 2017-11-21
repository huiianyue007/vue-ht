import axios from 'axios'

axios.defaults.errorHandler = {}
axios.defaults.midwares = []
axios.defaults.preMidwares = []
axios.defaults.expect = ''
function runMidware (response, midware) {
  let _midware = []
  for (let i of axios.defaults.midwares) {
    _midware.push(i)
  }
  if (midware) {
    _midware.push(midware)
  }
  if (_midware.length === 0 || midware === false) {
    return responseHandler(response)
  }
  return midwareHandler(response, _midware, 0).then(function (response) {
    return responseHandler(response)
  })
}
function midwareHandler (response, midwareArr, index) {
  let midware = midwareArr[index]
  return new Promise(function (resolve, reject) {
    midware(response, resolve)
  }).then(function (response) {
    if (index === midwareArr.length - 1) {
      return Promise.resolve(response)
    } else {
      index++
      return midwareHandler(response, midwareArr, index)
    }
  })
}
function responseHandler (response) {
  let arr = response.config.expect.split('.')
  let expect = response
  arr.forEach(item => {
    expect = expect[item]
  })
  if ((response.status >= 200 && response.status < 400) || expect) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}
function errFormat (err) {
  let response = {
    message: err.message,
    status: 0,
    data: null,
    config: err.config,
    request: err.request
  }
  if (err.response) {
    return Object.assign(response, err.response)
  } else {
    return response
  }
}

function runErrHandler (err, errorHandler, resolve, reject) {
  let status = err.status
  if (typeof errorHandler !== 'object') {
    errorHandler = {}
  }
  let handler = errorHandler[status] || axios.defaults.errorHandler[status] || errorHandler['all'] || axios.defaults.errorHandler['all']
  if (handler) {
    handler(err, htAjax).then(function (response) {
      resolve(response)
    }).catch(function (err) {
      reject(err)
    })
  } else {
    reject(err)
  }
}

function ajaxHandler (response, config, resolve, reject) {
  runMidware(response, config.midware).then(function (response) {
    resolve(response)
  }).catch(function (response) {
    if (config.errorHandler === false) {
      reject(response)
    } else {
      let errorHandler = config.errorHandler
      runErrHandler(response, errorHandler, resolve, reject)
    }
  })
}

function runPreMidware (config) {
  let _preMidware = []
  for (let i of axios.defaults.preMidwares) {
    _preMidware.push(i)
  }
  if (config.preMidware) {
    _preMidware.push(config.preMidware)
  }
  if (_preMidware.length === 0 || config.preMidware === false) {
    return Promise.resolve(config)
  }
  return midwareHandler(config, _preMidware, 0).then(function (config) {
    return config
  })
}

function TkAjax (config = {}) {
  this.config = config
  this.create = function (config = {}) {
    return new TkAjax(config)
  }
  this.request = function (config) {
    config = Object.assign(config, this.config)
    return new Promise(function (resolve, reject) {
      runPreMidware(config)
        .then(function (config) {
          axios.request(config).then(function (response) {
            ajaxHandler(response, config, resolve, reject)
          }).catch(function (err) {
            let response = errFormat(err)
            ajaxHandler(response, config, resolve, reject)
          })
        })
    })
  }
  this.get = function (url, config = {}) {
    config.url = url
    config.method = 'get'
    return this.request(config)
  }
  this.post = function (url, data, config = {}) {
    config.url = url
    config.method = 'post'
    config.data = data
    return this.request(config)
  }
  this.put = function (url, data, config = {}) {
    config.url = url
    config.method = 'put'
    config.data = data
    return this.request(config)
  }
  this.delete = function (url, config = {}) {
    config.url = url
    config.method = 'delete'
    return this.request(config)
  }
}
const htAjaxGlobal = axios.defaults
let htAjax = new TkAjax()
export {htAjax, htAjaxGlobal}
