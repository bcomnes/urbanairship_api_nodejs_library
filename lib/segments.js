exports.getSegments = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/segments/'
  }

  this.log.info('getSegments called')
  this.make_request(options, {}, ready)
}

exports.getSegment = function(segment_id, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/segments/' + segment_id
  }

  this.log.info('getSegment called \t segment id : %s', segment_id)
  this.make_request(options, {}, ready)
}

exports.createSegment = function(segment, ready) {
  var payload
    , options
    , body

  this.log.info('createSegment called')
  this.log.debug('building payload')
  payload = segment.toJSON()
  this.log.debug('done building payload')

  body = JSON.stringify(payload)

  this.log.debug('segment payload : %s', body)

  options = {
      method: 'POST'
    , url: '/segments/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

exports.changeSegment = function(segment_id, segment, ready) {
  var payload
    , options
    , body

  this.log.info('changeSegment called \t segment id : %s', segment_id)

  this.log.debug('building payload')
  payload = segment.toJSON()
  this.log.debug('done building payload')

  body = JSON.stringify(payload)

  this.log.debug('segment payload : %s', body)

  options = {
      method: 'PUT'
    , url: '/segments/' + segment_id
    , body: body
  }

  this.make_request(options, {}, ready)
}

exports.deleteSegment = function(segment_id, ready) {
  var options = {
      method: 'DELETE'
    , headers: {}
    , url: '/segments/' + segment_id
  }

  this.log.info('deleteSegment called \t segment id : %s ', segment_id)
  this.make_request(options, {}, ready)
}
