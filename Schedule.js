exports.Schedule = Schedule

function Schedule() {
  this.name = null
  this.date = null
  this.push = null
}

var cons = Schedule
  , proto = cons.prototype

proto.constructor = cons

proto.setName = function(name) {
  this.name = name
}

proto.setDate = function(date) {
  this.date = date
}

proto.setPush = function(push) {
  this.push = push
}

proto.toJSON = function() {
  var payload = {}

  if(this.name) {
    payload.name = this.name
  }

  payload.schedule = {}

  // to JSON() gives milliseconds, truncate them off, this is ugly,
  // but effective and keeps in line with the other usages of the date
  payload.schedule.scheduled_time = this.date.toJSON()
      .substring(0, this.date.toJSON().length - 5)

  payload.push = this.push.toJSON()

  return payload
}
