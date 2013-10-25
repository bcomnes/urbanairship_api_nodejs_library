exports.tagDevices = function(tag, ready) {
  var body = JSON.stringify(tag.toJSON())
    , options

  this.log.info('tagDevices called')

  this.log.info(
      'tag name : %s \t %s device_tokens added \t %s device_tokens ' +
      'removed \t %s apids added \t %s apids removed'
    , tag.name
    , tag.removedDeviceTokens.length
    , tag.addedApids.length
    , tag.removedApids.length
  )

  this.log.debug('building payload')
  this.log.debug('done building payload')

  options = {
      method: 'POST'
    , url: '/tags/' + tag.name
    , body: body
  }

  this.make_request(options, {}, ready)
}

exports.getTags = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/tags/'
  }

  this.log.info('getTags called')
  this.make_request(options, {}, ready)
}

exports.createTag = function(tag, ready) {
  var options = {
      method: 'PUT'
    , headers: {}
    , url: '/tags/' + tag
  }

  this.log.info('createTag called \t tag name : %s', tag)
  this.make_request(options, {}, ready)
}

exports.deleteTag = function(tag, ready) {
  var options = {
      method: 'DELETE'
    , headers: {}
    , url: '/tags/' + tag
  }

  this.log.info('deleteTag called \t tag name : %s', tag)
  this.make_request(options, {}, ready)
}
