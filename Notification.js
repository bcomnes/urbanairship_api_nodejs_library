exports.Notification = Notification

function Notification() {
  this.deviceType = null
  this.alert = null
  // ios specific
  this.badge = null
  this.sound = null
  this.content_available = null
  this.expiry = null
  this.priority = null
  // android specific
  this.collapse_key = null
  this.time_to_live = null
  this.delay_while_idle = null
  // ios and Android
  this.extras = []
}

var cons = Notification
  , proto = cons.prototype

proto.constructor = cons

proto.setDeviceType = function(device_type) {
  this.deviceType = device_type
}

proto.setAlert = function(alert) {
  this.alert = alert
}

// ios specific settings
proto.setBadge = function(badge) {
  this.badge = badge
}

proto.setSound = function(sound) {
  this.sound = sound
}

proto.setContentAvailable = function(content_available) {
  this.content_available = content_available
}

proto.setExpiry = function(expiry) {
  this.expiry = expiry
}

proto.setPriority = function(priority) {
  this.priority = priority
}

// android specific settings
proto.setCollapseKey = function(collapse_key) {
  this.collapse_key = collapse_key
}

proto.setTimeToLive = function(time_to_live) {
  this.time_to_live = time_to_live
}

proto.setDelayWhileIdle = function(delay_while_idle) {
  this.delay_while_idle = delay_while_idle
}

// both ios and android specific
proto.addExtra = function(k, v) {
  this.extras.push({ key: k, value: v})
}
