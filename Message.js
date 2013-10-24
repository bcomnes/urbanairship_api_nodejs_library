exports.Message = Message

function Message() {
  this.title = null
  this.body = null
  this.content_type = 'text/html'
  this.content_encoding = 'utf-8'
  this.expiry = null
  this.icons = null
  this.extras = []
  this.options = []
}

var cons = Message
  , proto = cons.prototype

proto.constructor = cons

proto.setTitle = function(title) {
  this.title = title
}

proto.setBody = function(body) {
  this.body = body
}

proto.setContentType = function(content_type) {
  this.content_type = content_type
}

proto.setContentEncoding = function(content_encoding) {
  this.content_encoding = content_encoding
}

proto.setExpiry = function(expiry) {
  this.expiry = expiry
}

proto.setIcon = function(icon) {
  this.icons = icon
}

proto.addExtra = function(k, v) {
  extras.push({ key: k, value: v })
}

proto.addOption = function(k, v) {
  options.push({ key: k, value: v })
}

proto.toJSON = function() {
  var payload = {}

  payload.title = this.title
  payload.body = this.body
  payload.content_type = this.content_type
  payload.content_encoding = this.content_encoding

  if(this.expiry !== undefined) {
    payload.expiry = this.expiry
  }

  if(this.icons !== undefined) {
    payload.icons.list_icon = this.icons
  }

  this.extras.forEach(function(extra) {
    payload.extra[extra.key] = extra.value
  })

  this.options.forEach(function(option) {
    payload.options[option.key] = option.value
  })

  return payload
}
