exports.schedulePush = function(schedule, ready) {
  var payload
    , options
    , body

  this.log.info('schedulePush called')

  this.log.debug('building payload')
  // build payload
  payload = schedule.toJSON()
  this.log.debug('done building payload')

  body = JSON.stringify(payload)

  this.log.debug('schedule payload : %s', body)

  options = {
      method: 'POST'
    , url: '/schedules/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

exports.listSchedules = function(ready) {
  var options = {
      method: 'GET'
    , url: '/schedules/'
  }

  this.log.info('listSchedules called')
  this.make_request(options, {}, ready)
}

exports.listSchedule = function(scheduleID, ready) {
  var options = {
      method: 'GET'
    , url: '/schedules/' + scheduleID
  }

  this.log.info('listSchedule called \t schedule id : %s', scheduleID)
  this.make_request(options, {}, ready)
}

exports.updateSchedule = function(scheduleID, schedule, ready) {
  var payload
    , options
    , body

  this.log.info('updateSchedule called \t schedule id : %s', scheduleID)

  this.log.debug('building payload')
  // build payload
  payload = schedule.toJSON()
  this.log.debug('done building payload')

  body = JSON.stringify(payload)

  this.log.debug('schedule payload : %s', body)

  options = {
      method: 'PUT'
    , url: '/schedules/' + scheduleID
    , body: body
  }

  this.make_request(options, {}, ready)
}

exports.deleteSchedule = function(scheduleID, ready) {
  var options = {
      method: 'DELETE'
    , url: '/schedules/' + scheduleID
  }

  this.log.info('delete schedule called \t schedule id : %s', scheduleID)
  this.make_request(options, {}, ready)
}
