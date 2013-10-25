exports.Segment = Segment

function Segment() {
  this.display_name = null
  this.criteria = null
}

var cons = Segment
  , proto = cons.prototype

proto.constructor = cons

proto.setName = function(name) {
  this.display_name = name
}

proto.setCriteria = function(criteria) {
  this.criteria = criteria
}

proto.toJSON = function() {
  var payload = {}

  payload.display_name = this.display_name
  payload.criteria = this.criteria.toJSON({ use_segments: false })

  return payload
}
