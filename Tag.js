exports.Tag = Tag

function Tag() {
  this.name
  this.addedDeviceTokens = []
  this.removedDeviceTokens = []
  this.addedApids = []
  this.removedApids = []
}

var cons = Tag
  , proto = cons.prototype

proto.constructor = cons

proto.setName = function(name) {
  this.name = name
}

proto.addDeviceToken = function(deviceToken) {
  this.addedDeviceTokens.push(deviceToken)
}

proto.removeDeviceToken = function(deviceToken) {
  this.removedDeviceTokens.push(deviceToken)
}

proto.addApid = function(apid) {
  this.addedApids.push(apid)
}

proto.removeApid = function(apid) {
  this.removedApids.push(apid)
}

proto.toJSON = function() {
  var payload = {}

  payload.device_tokens = {}
  payload.device_tokens.add = this.addedDeviceTokens
  payload.device_tokens.remove = this.removedDeviceTokens

  payload.apids = {}
  payload.apids.add = this.addedApids
  payload.apids.remove = this.removedApids

  return payload
}
