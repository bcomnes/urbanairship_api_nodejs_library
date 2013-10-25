exports.getDeviceTokens = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/device_tokens/'
  }

  this.log.info('getDeviceTokens called')
  this.make_request(options, {}, ready)
}

exports.getDeviceToken = function(deviceToken, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/device_tokens/' + deviceToken
  }

  this.log.info('getDeviceToken called \t device_token : %s', deviceToken)
  this.make_request(options, {}, ready)
}

exports.getApids = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/apids/'
  }

  this.log.info('getApids called')
  this.make_request(options, {}, ready)
}

exports.getApid = function(apid, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/apids/' + apid
  }

  this.log.info('getApid called \t apid : %s', apid)
  this.make_request(options, {}, ready)
}
