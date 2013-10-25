var request = require('request')
  , Log = require('log')
  , fs = require('fs')

exports.Push = require('./Push.js').Push
exports.Notification = require('./Notification.js').Notification
exports.Selector = require('./Selector.js').Selector
exports.Message = require('./Message.js').Message
exports.Segment = require('./Segment.js').Segment
exports.Location = require('./Location.js').Location
exports.Schedule = require('./Schedule.js').Schedule
exports.Tag = require('./Tag.js').Tag
exports.APIClient = APIClient
exports.DeviceType = DeviceType

function DeviceType() {
  this.IOS = 'ios'
  this.ANDROID = 'android'
  this.ALL = 'all'
}

function APIClient(app_key, app_secret, log_info) {
  // set up logging
  var filename = app_key + '.log'
    , log_level = 'info'
    , flag = 'w'
    , log

  if(log_info) {
    if(log_info.loglevel) {
      log_level = log_info.loglevel
    }

    if(log_info.filename) {
      filename = log_info.filename
    }

    if(log_info.append) {
      flag = 'a'
    }

    log = new Log(loglevel, fs.createWriteStream(filename, { flags: flag }))

  } else {
    log = new Log(
        'info'
      , fs.createWriteStream('urban_airship.log', { flags: 'a' })
    )
  }

  log.info('Creating client with app key : %s', appKey)
  this.appKey = appKey
  this.appSecret = appSecret

}

var cons = APIClient
  , proto = cons.prototype

proto.constructor = cons

proto.getKey = function() {
  return this.appKey
}

proto.getSecret = function() {
  return this.appSecret
}

// Tags
proto.tagDevices = function(tag, ready) {
  var payload = tag.toJSON()
    , body = JSON.stringify(payload)
    , options

  log.info('tagDevices called')

  log.info(
      'tag name : %s \t %s device_tokens added \t %s device_tokens ' +
      'removed \t %s apids added \t %s apids removed'
    , tag.name
    , tag.removedDeviceTokens.length
    , tag.addedApids.length
    , tag.removedApids.length
  )

  log.debug('building payload')
  log.debug('done building payload')

  options = {
      method: 'POST'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , uri: 'https://go.urbanairship.com/api/tags/' + tag.name
    , body: body
    , headers: {
          'Accept': 'application/vnd.urbanairship+json; version=3;' +
             'charset=utf8;'
        , 'Content-Type': 'application/json' }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))
  this.make_request(options, {}, ready)
}

proto.getTags = function(ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , uri: 'https://go.urbanairship.com/api/tags/'
    , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('getTags called')
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

prot.make_request = function(options, data, ready) {
  var self = this

  request(options, process_response)

  function process_response(error, response, body) {
    self.processApiResponse(error, response, body, data, ready)
  }
}

proto.createTag = function(tag, ready) {
  var options = {
        method: 'PUT'
      , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
      , url: 'https://go.urbanairship.com/api/tags/' + tag
      , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('createTag called \t tag name : %s', tag)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        

  this.make_request(options, {}, ready)
}

proto.deleteTag = function(tag, ready) {
  var options = {
      method: 'DELETE'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/tags/' + tag
    , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('deleteTag called \t tag name : %s', tag)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        

  this.make_request(options, {}, ready)
}

// Device lookup
proto.getDeviceTokens = function(ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/device_tokens/'
    , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('getDeviceTokens called')
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        

  this.make_request(options, {}, ready)
}

proto.getDeviceToken = function(deviceToken, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
    , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('getDeviceToken called \t device_token : %s', deviceToken)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        

  this.make_request(options, {}, ready)
}

proto.getApids = function(ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/apids/'
    , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('getApids called')
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getApid = function(apid, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/apids/' + apid
    , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
  }

  log.info('getApid called \t apid : %s', apid)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

// Push
proto.sendPush = function(push, ready) {
  var payload
    , options
    , body

  log.info('sendPush called')
  log.debug('building payload')
  // build payload
  payload = push.toJSON()
  log.debug('done building payload')

  body = JSON.stringify(payload)

  log.debug('push payload : %s', b)

  options = {
      method: 'POST'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/push/'
    , body: body
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
               , 'Content-Type' : 'application/json'
            }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.validatePush = function(push, ready) {
  var options
    , payload
    , body

  log.info('validatePush called')

  log.debug('building payload')
  // build payload
  payload = push.toJSON()
  log.debug('done building payload')

  body = JSON.stringify(payload)

  log.debug('push payload : %s', b)

  options = {
      method: 'POST'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/push/validate/'
    , body: body
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
               , 'Content-Type' : 'application/json'
            }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

// Schedule
proto.schedulePush = function(schedule, ready) {
  var payload
    , options
    , body

  log.info('schedulePush called')

  log.debug('building payload')
  // build payload
  payload = schedule.toJSON()
  log.debug('done building payload')

  body = JSON.stringify(payload)

  log.debug('schedule payload : %s', b)

  options = {
      method: 'POST'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/schedules/'
    , body: body
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
               , 'Content-Type' : 'application/json'
            }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.listSchedules = function(ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/schedules/'
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'}   
  }

  log.info('listSchedules called')
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.listSchedule = function(scheduleID, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'}   
  }

  log.info('listSchedule called \t schedule id : %s', scheduleID)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.updateSchedule = function(scheduleID, schedule, ready) {
  var payload
    , options
    , body

  log.info('updateSchedule called \t schedule id : %s', scheduleID)

  log.debug('building payload')
  // build payload
  payload = schedule.toJSON()
  log.debug('done building payload')

  body = JSON.stringify(payload)

  log.debug('schedule payload : %s', b)

  options = {
      method: 'PUT'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
    , body: body
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
               , 'Content-Type' : 'application/json'
            }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.deleteSchedule = function(scheduleID, ready) {
  var options = {
      method: 'DELETE'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'}   
  }

  log.info('delete schedule called \t schedule id : %s', scheduleID)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

// Segments
proto.getSegments = function(ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/segments/'
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getSegments called')
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getSegment = function(segment_id, ready) {
  var options = {
        method: 'GET'
      , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
      , url: 'https://go.urbanairship.com/api/segments/' + segment_id
      , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getSegment called \t segment id : %s', segment_id)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.createSegment = function(segment, ready) {
  var payload
    , options
    , body

  log.info('createSegment called')
  log.debug('building payload')
  payload = segment.toJSON()
  log.debug('done building payload')

  body = JSON.stringify(payload)

  log.debug('segment payload : %s', b)

  options = {
      method: 'POST'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/segments/'
    , body: b
    , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
               , 'Content-Type' : 'application/json'
            }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.changeSegment = function(segment_id, segment, ready) {
  var payload
    , options
    , body

  log.info('changeSegment called \t segment id : %s', segment_id)

  log.debug('building payload')
  payload = segment.toJSON()
  log.debug('done building payload')

  body = JSON.stringify(payload)

  log.debug('segment payload : %s', b)

  options = {
      method: 'PUT'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/segments/' + segment_id
    , body: body
    , headers: {
        'Accept': 'application/vnd.urbanairship+json; version=3; charset=utf8;'
               , 'Content-Type' : 'application/json'
            }
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.deleteSegment = function(segment_id, ready) {
  var options = {
      method: 'DELETE'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/segments/' + segment_id
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('deleteSegment called \t segment id : %s ', segment_id)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

// Location
proto.getLocationFromString = function(query, alias, ready) {
  var params = '?q=' + query
    , options

  if(alias) {
    params += '&type=' + alias
  }

  options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/location/' + params
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getLocationFromString called \t query : %s \t alias : %s', query, alias)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getLocationFromLatLon = function(lat, lon, alias, ready) {
  var params = [lat, lon].join(',')
    , options

  if(alias) {
    params += '?type=' + alias
  }

  options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/location/' + params
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getLocationFromLatLon called \t lat : %s \t lon : %s \t alias : %s', lat, lon, alias)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getLocationFromLatLonBounds = function(lat1, lon1, lat2, lon2, alias, ready) {
  var params = [lat1, lon1, lat2, lon2].join(',')
    , options

  if(alias) {
    params += '?type=' + alias
  }

  options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/location/' + params
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getLocationFromLatLonBounds called \t lat1 : %s \t lon1 : %s \t lat2 : %s \t lon2 : %s \t alias : %s', lat1, lon1, lat2, lon2, alias)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getLocationFromAlias = function(query, alias, ready) {
  var params = '?' + alias + '=' + query
    , options = {
        method: 'GET'
      , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
      , url: 'https://go.urbanairship.com/api/location/from-alias' + params
      , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
    }

  log.info('getLocationFromAlias called \t query : %s \t alias : %s', query, alias)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

// reports
proto.getActiveUserCount = function(date, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/activeusers/?date='+date.toJSON()
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getActiveUserCount called \t date : %s', date.toJSON())
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getResponseReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/responses/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getResponseReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getAppOpensReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/opens/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getAppOpensReportcalled \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getTimeInAppReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/timeinapp/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getTimeInAppReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getOptInReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/optins/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getOptInReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getOptOutReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/optouts/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getOptOutReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getPushReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/sends/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getPushReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getResponseListing = function(start, end, limit, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/responses/list/?start='+start.toJSON()+'&end='+end.toJSON()+'&limit='+limit
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getReponseListing called \t start : %s \t end : %s \t limit : %s', start.toJSON(), end.toJSON(), limit)    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getIndividualResponseStatistics = function(pushID, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/responses/'+pushID
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getIndividualResponseStatistics called \t push id : %s',pushID)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getStatistics = function(start, end, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/push/stats/?start='+start.toJSON()+'&end='+end.toJSON()
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getStatistics called \t start : %s \t end : %s', start.toJSON(), end.toJSON())    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

// per push
proto.getPerPush = function(pushID, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/perpush/detail/' + pushID
    , header: { 'Accept': 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getPerPush called \t push id : %s',pushID)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, data)
}

proto.getPerPushSeries = function(pushID, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/perpush/series/' + pushID
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getPerPushSeries called \t push id : %s',pushID)
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getPerPushSeriesWithPrecision = function(pushID, precision, ready) {
  var options = {
      method: 'GET'
    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
    , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+ pushID + '?precision=' + precision
    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.info('getPerPushSeriesWithPrecision called \t push id : %s \t precision : %s', pushID, precision)    
  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

proto.getPerPushSeriesWithPrecisionAndRange = function(pushID, start, end, precision, ready) {
  log.info('getPerPushSeriesWithPrecisionAndRange called \t push id : %s \t start : %s \t end : %s \t precision : %s',pushID, start.toJSON(), end.toJSON(), precision)        

  var options = {
        method: 'GET'
      , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
      , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+ pushID + '?precision=' + precision + '&start=' + start.toJSON() + '&end=' + end.toJSON()
      , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
  }

  log.debug('Making HTTP request with options %s', JSON.stringify(options))        
  this.make_request(options, {}, ready)
}

///////////////////////////////////////////////////////////////////////////////
proto.responseLUT = function name(path, method) {
  // there is no elegant solution to this problem
  // every endpoint has different behavior and pertinent data
  // handle them all by parsing the endpoint and using an awful if/else chain
  // this is where the sausage gets made
  var path_names = path.split('/')
    , primary_pathname = path_names[2]
    , secondary_pathname = path_names[3] || ''
    , third_pathname = path_names[4]

  log.debug('Calling responseLUT | path: %s | method: %s', path, method)

  if(primary_path_name === 'push') {
    // push & validate push
    if(method === 'POST') {
      return 'object'
    } else {
      // push/stats
      return 'object'
    }
  } else if(primary_path_name === 'schedules') {
    // schedules
    if(method === 'POST' || method === 'GET' || method === 'PUT') {
      return 'object'
    } else {
      return 'none'
    }
  } else if(primary_path_name === 'apids') {

    if(secondary_path_name.length === 0) {
      return 'apids'
    } else {
      return 'object'
    }

  } else if(primary_path_name === 'device_tokens') {
    if(secondary_path_name.length === 0) {
      return 'device_tokens'
    } else {
      return 'object'
    }
  } else if(primary_path_name === 'tags') {
    if(method === 'POST' || method === 'PUT' || method === 'DELETE') {
      return 'none'
    } else {
      return 'tags'
    }
  } else if(primary_path_name === 'segments') {
    if(method === 'GET') {
      if(secondary_path_name.length === 0) {
        return 'segments'
      } else {
        return 'object'
      }
    } else {
      return 'none'
    }
  } else if(primary_path_name === 'reports') {

    if(secondary_path_name === 'responses') {

      if(third_path_name === 'list') {
        return 'pushes'
      }

      if(!third_path_name.length) {
        return 'responses'
      }

      return 'object'
    }

    var map = {
        activeusers: 'object'
      , perpush: 'object'
      , sends: 'sends'
      , opens: 'opens'
      , timeinapp: 'timeinapp'
      , optouts: 'optouts'
      , optins: 'optins'
    }

    return map[secondary_path_name]

  } else if(primary_path_name === 'location' && method === 'GET') {
    return 'object'
  }
}

proto.processApiResponse = function(error, response, body, data, ready) {
  log.debug('processApiResponse called')
  log.debug('response status code %s', response.statusCode)

  log.debug('error %s', error)

  log.debug('body length %s', body.length)
  log.debug('body : %s', body)

  log.debug('Looking up API response type...')
  
  var apiResponseType = this.responseLUT(
      response.request.uri.pathname
    , response.req.method
  )

  log.debug('API reponse type : ' + apiResponseType)

  // possible options at this point
  /*
      ==
      if 'none' is pertinent data? {
          call ready(null, { "status_code" : response.statusCode })
      } else if 'object' is the pertinent data {
          call ready(null, JSON.parse(data))
      } else {
          if 'next_page' is undefined {
              this is the last of the results 
              append the pertinent information to 'data'
              call ready(null, data)
          } else {
              append the pertinent information to 'data'
              send another request with the updated URL
          }
      }
      
  */
  // 
  
  if(apiResponseType === 'none') {
    log.debug('API response type was \'none\'.')
    log.debug('Calling final callback function passing the status code and null data.')
    log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: null }))

    self.sendToFinalCallback( response.statusCode, body, ready )
    return
  } else if(apiResponseType === 'object') {
    log.debug('API response type was \'object\'')

    try {
      log.debug('Trying to parse body as JSON object')                
      var b = JSON.parse(body)
      log.debug('Succeeded parsing body as JSON object')
      
      log.debug('Calling final callback function passing the status code and returning a javascript object as the data.')
      log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: b }))
      
      self.sendToFinalCallback( response.statusCode, b, ready )
      return
    } catch(e) {
      log.debug('Failed trying to parse body as JSON object')
      log.debug('Calling final callback function passing the status code and returning simple text string as the data.')
      log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: body }))
      
      self.sendToFinalCallback( response.statusCode, body, ready )
      return
    }
  } else {
      
    log.debug('API response type \'%s\' possibly has a next page', apiResponseType)
    
    if(body.length === 0) {
      // there is a 504, all hell is breaking loose
      // sometimes the last page of a series of requests is empty and will time out
      
      log.debug("last page returned zero byte body with response code %s", response.statusCode)
      log.debug('Calling final callback function passing the status code and returning array of objects as the data.')
      log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: data }))
      
      self.sendToFinalCallback( response.statusCode, data, ready )
      return
    }
    
    var d = JSON.parse(body);
         
    if(data[apiResponseType] === undefined) {
      log.debug('Creating Array in data object')
      data[apiResponseType] = []
    }                 

    log.debug('Appending elements in the body to the data array')
    d[apiResponseType].forEach(function(item) {
      data[apiResponseType].push(item)
    })
                
    if(d.next_page === undefined) {
      log.debug('next_page was undefined')
      
      // run the callback
      log.debug('Calling final callback function passing the status code and returning array of objects as the data.')
      log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: data }))
      
      self.sendToFinalCallback( response.statusCode, data, ready )
      return
    } else {
      log.debug('getting next page: %s', d.next_page)

      // run the request again with the URI found in the next page
      var options = {
            method: response.req.method
          , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
          , url: d.next_page
          , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
      }

      log.debug('Making HTTP request with options %s', JSON.stringify(options))                        
      this.make_request(options, data, ready)
    }
  }
}

proto.sendToFinalCallback = function(status_code, data, ready) {
    var status_first = status_code.toString().charAt(0)

    log.debug('sendToFinalCallback caled')
    log.info('status code : %s', status_code)
    
    if(status_first === '4' || status_first === '5') {
      // error
      ready({ status_code: status_code, data: data }, null)
    } else {
      // all is well
      ready(null, { status_code: status_code, data: data })
    }
}
