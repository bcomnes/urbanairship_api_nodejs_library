exports.sendPush = function(push, ready) {
  var payload
    , options
    , body

  this.log.info('sendPush called')
  this.log.debug('building payload')
  // build payload
  payload = push.toJSON()
  this.log.debug('done building payload')

  body = JSON.stringify(payload)

  this.log.debug('push payload : %s', body)

  options = {
      method: 'POST'
    , url: '/push/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

exports.validatePush = function(push, ready) {
  var options
    , payload
    , body

  this.log.info('validatePush called')
  this.log.debug('building payload')
  // build payload
  payload = push.toJSON()
  this.log.debug('done building payload')

  body = JSON.stringify(payload)

  this.log.debug('push payload : %s', body)

  options = {
      method: 'POST'
    , url: '/push/validate/'
    , body: body
  }

  this.make_request(options, {}, ready)
}
