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

  if(log_info) {
    if(log_info.loglevel) {
      log_level = this.log_info.loglevel
    }

    if(log_info.filename) {
      filename = this.log_info.filename
    }

    if(log_info.append) {
      flag = 'a'
    }

    this.log = new Log(
        loglevel
      , fs.createWriteStream(filename, { flags: flag })
    )

  } else {
    this.log = new Log(
        'info'
      , fs.createWriteStream('urban_airship.log', { flags: 'a' })
    )
  }

  this.log.info('Creating client with app key : %s', app_key)
  this.appKey = app_key
  this.appSecret = app_secret
}

var cons = APIClient
  , proto = cons.prototype

proto.constructor = cons

proto.auth = function() {
  return { user: this.appKey, pass: this.appSecret, sendImmediately: true }
}

proto.get_headers = {
    Accept: 'application/vnd.urbanairship+json; version=3;charset=utf8;'
}

proto.post_headers = {
    Accept: 'application/vnd.urbanairship+json; version=3;charset=utf8;'
  , 'Content-Type': 'application/json'
}

proto.getKey = function() {
  return this.appKey
}

proto.getSecret = function() {
  return this.appSecret
}

proto.make_request = function(options, data, ready) {
  var self = this

  if(!options.headers) {
    if(options.method === 'GET' || options.method === 'DELETE') {
      options.headers = self.get_headers
    } else {
      options.headers = self.post_headers
    }
  }

  options.auth = self.auth()

  self.log.debug(
      'Making HTTP request with options %s'
    , JSON.stringify(options)
  )

  request(options, process_response)

  function process_response(error, response, body) {
    self.processApiResponse(error, response, body, data, ready)
  }
}

// Tags
proto.tagDevices = function(tag, ready) {
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
    , uri: 'https://go.urbanairship.com/api/tags/' + tag.name
    , body: body
  }

  this.make_request(options, {}, ready)
}

proto.getTags = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , uri: 'https://go.urbanairship.com/api/tags/'
  }

  this.log.info('getTags called')
  this.make_request(options, {}, ready)
}

proto.createTag = function(tag, ready) {
  var options = {
      method: 'PUT'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/tags/' + tag
  }

  this.log.info('createTag called \t tag name : %s', tag)
  this.make_request(options, {}, ready)
}

proto.deleteTag = function(tag, ready) {
  var options = {
      method: 'DELETE'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/tags/' + tag
  }

  this.log.info('deleteTag called \t tag name : %s', tag)
  this.make_request(options, {}, ready)
}

// Device lookup
proto.getDeviceTokens = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/device_tokens/'
  }

  this.log.info('getDeviceTokens called')
  this.make_request(options, {}, ready)
}

proto.getDeviceToken = function(deviceToken, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
  }

  this.log.info('getDeviceToken called \t device_token : %s', deviceToken)
  this.make_request(options, {}, ready)
}

proto.getApids = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/apids/'
  }

  this.log.info('getApids called')
  this.make_request(options, {}, ready)
}

proto.getApid = function(apid, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/apids/' + apid
  }

  this.log.info('getApid called \t apid : %s', apid)
  this.make_request(options, {}, ready)
}

// Push
proto.sendPush = function(push, ready) {
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
    , url: 'https://go.urbanairship.com/api/push/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

proto.validatePush = function(push, ready) {
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
    , url: 'https://go.urbanairship.com/api/push/validate/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

// Schedule
proto.schedulePush = function(schedule, ready) {
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
    , url: 'https://go.urbanairship.com/api/schedules/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

proto.listSchedules = function(ready) {
  var options = {
      method: 'GET'
    , url: 'https://go.urbanairship.com/api/schedules/'
  }

  this.log.info('listSchedules called')
  this.make_request(options, {}, ready)
}

proto.listSchedule = function(scheduleID, ready) {
  var options = {
      method: 'GET'
    , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
  }

  this.log.info('listSchedule called \t schedule id : %s', scheduleID)
  this.make_request(options, {}, ready)
}

proto.updateSchedule = function(scheduleID, schedule, ready) {
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
    , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
    , body: body
  }

  this.make_request(options, {}, ready)
}

proto.deleteSchedule = function(scheduleID, ready) {
  var options = {
      method: 'DELETE'
    , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
  }

  this.log.info('delete schedule called \t schedule id : %s', scheduleID)
  this.make_request(options, {}, ready)
}

// Segments
proto.getSegments = function(ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/segments/'
  }

  this.log.info('getSegments called')
  this.make_request(options, {}, ready)
}

proto.getSegment = function(segment_id, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/segments/' + segment_id
  }

  this.log.info('getSegment called \t segment id : %s', segment_id)
  this.make_request(options, {}, ready)
}

proto.createSegment = function(segment, ready) {
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
    , url: 'https://go.urbanairship.com/api/segments/'
    , body: body
  }

  this.make_request(options, {}, ready)
}

proto.changeSegment = function(segment_id, segment, ready) {
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
    , url: 'https://go.urbanairship.com/api/segments/' + segment_id
    , body: body
  }

  this.make_request(options, {}, ready)
}

proto.deleteSegment = function(segment_id, ready) {
  var options = {
      method: 'DELETE'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/segments/' + segment_id
  }

  this.log.info('deleteSegment called \t segment id : %s ', segment_id)
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
    , headers: {}
    , url: 'https://go.urbanairship.com/api/location/' + params
  }

  this.log.info(
      'getLocationFromString called \t query : %s \t alias : %s'
    , query
    , alias
  )
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
    , headers: {}
    , url: 'https://go.urbanairship.com/api/location/' + params
  }

  this.log.info(
      'getLocationFromLatLon called \t lat : %s \t lon : %s \t alias : %s'
    , lat
    , lon
    , alias
  )

  this.make_request(options, {}, ready)
}

proto.getLocationFromLatLonBounds =
function(lat1, lon1, lat2, lon2, alias, ready) {
  var params = [lat1, lon1, lat2, lon2].join(',')
    , options

  if(alias) {
    params += '?type=' + alias
  }

  options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/location/' + params
  }

  this.log.info(
      'getLocationFromLatLonBounds called \t lat1 : %s \t lon1 : %s \t' +
      'lat2 : %s \t lon2 : %s \t alias : %s'
    , lat1
    , lon1
    , lat2
    , lon2
    , alias
  )

  this.make_request(options, {}, ready)
}

proto.getLocationFromAlias = function(query, alias, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/location/from-alias?' + alias +
        '=' + query
  }

  this.log.info(
      'getLocationFromAlias called \t query : %s \t alias : %s'
    , query
    , alias
  )

  this.make_request(options, {}, ready)
}

// reports
proto.getActiveUserCount = function(date, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/activeusers/?date=' +
        date.toJSON()
  }

  this.log.info('getActiveUserCount called \t date : %s', date.toJSON())
  this.make_request(options, {}, ready)
}

proto.getResponseReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/responses/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&precision=' + precision
  }

  this.log.info(
      'getResponseReport called \t start : %s \t end : %s \t precision : %s'
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getAppOpensReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/opens/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&precision=' + precision
  }

  this.log.info(
      'getAppOpensReportcalled \t start : %s \t end : %s \t ' +
      'precision : %s'
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getTimeInAppReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/timeinapp/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&precision=' + precision
  }

  this.log.info(
      'getTimeInAppReport called \t start : %s \t end : %s \t ' +
      'precision : %s'
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getOptInReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/optins/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&precision=' + precision
  }

  this.log.info(
      'getOptInReport called \t start : %s \t end : %s \t ' +
      'precision : %s'
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getOptOutReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/optouts/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&precision=' + precision
  }

  this.log.info(
      'getOptOutReport called \t start : %s \t end : %s \t ' +
      'precision : %s'
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getPushReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/sends/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&precision=' + precision
  }

  this.log.info(
      'getPushReport called \t start : %s \t end : %s \t precision' +
      ' : %s'
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getResponseListing = function(start, end, limit, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/responses/list/?start=' +
        start.toJSON() + '&end=' + end.toJSON() + '&limit=' + limit
  }

  this.log.info(
      'getReponseListing called \t start : %s \t end : %s \t limit' +
      ' : %s'
    , start.toJSON()
    , end.toJSON()
    , limit
  )

  this.make_request(options, {}, ready)
}

proto.getIndividualResponseStatistics = function(pushID, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/responses/' + pushID
  }

  this.log.info(
      'getIndividualResponseStatistics called \t push id : %s'
    , pushID
  )

  this.make_request(options, {}, ready)
}

proto.getStatistics = function(start, end, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/push/stats/?start=' +
        start.toJSON() + '&end=' + end.toJSON()
  }

  this.log.info(
      'getStatistics called \t start : %s \t end : %s'
    , start.toJSON()
    , end.toJSON()
  )

  this.make_request(options, {}, ready)
}

// per push
proto.getPerPush = function(pushID, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/perpush/detail/' + pushID
  }

  this.log.info('getPerPush called \t push id : %s', pushID)
  this.make_request(options, {}, ready)
}

proto.getPerPushSeries = function(pushID, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/perpush/series/' + pushID
  }

  this.log.info('getPerPushSeries called \t push id : %s',pushID)
  this.make_request(options, {}, ready)
}

proto.getPerPushSeriesWithPrecision = function(pushID, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/perpush/series/' + pushID +
        '?precision=' + precision
  }

  this.log.info(
      'getPerPushSeriesWithPrecision called \t push id : %s \t precision : %s'
    , pushID
    , precision
  )

  this.make_request(options, {}, ready)
}

proto.getPerPushSeriesWithPrecisionAndRange =
function(pushID, start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: 'https://go.urbanairship.com/api/reports/perpush/series/' +
        pushID + '?precision=' + precision + '&start=' + start.toJSON() +
        '&end=' + end.toJSON()
  }

  this.log.info(
      'getPerPushSeriesWithPrecisionAndRange called \t push id :' +
      '%s \t start : %s \t end : %s \t precision : %s'
    , pushID
    , start.toJSON()
    , end.toJSON()
    , precision
  )

  this.make_request(options, {}, ready)
}

///////////////////////////////////////////////////////////////////////////////
proto.responseLUT = function name(path, method) {
  // there is no elegant solution to this problem
  // every endpoint has different behavior and pertinent data
  // handle them all by parsing the endpoint and using an awful if/else chain
  // this is where the sausage gets made
  var path_names = path.split('/')

  var secondary_pathname = path_names[3] || ''
    , primary_pathname = path_names[2]
    , third_pathname = path_names[4]

  this.log.debug('Calling responseLUT | path: %s | method: %s', path, method)

  if(primary_pathname === 'push') {
    // push & validate push
    if(method === 'POST') {
      return 'object'
    }

    // push/stats
    return 'object'
  }

  if(primary_pathname === 'schedules') {
    // schedules
    if(method === 'POST' || method === 'GET' || method === 'PUT') {
      return 'object'
    }

    return 'none'
  }

  if(primary_pathname === 'apids') {

    if(!secondary_pathname.length) {
      return 'apids'
    }

    return 'object'
  }

  if(primary_pathname === 'device_tokens') {
    if(!secondary_pathname.length) {
      return 'device_tokens'
    }

    return 'object'
  }

  if(primary_pathname === 'tags') {
    if(method === 'POST' || method === 'PUT' || method === 'DELETE') {
      return 'none'
    }

    return 'tags'
  }

  if(primary_pathname === 'segments') {
    if(method === 'GET') {
      if(!secondary_pathname.length) {
        return 'segments'
      }

      return 'object'
    }

    return 'none'
  }

  if(primary_pathname === 'reports') {

    if(secondary_pathname === 'responses') {

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

    return map[secondary_pathname]

  }

  if(primary_pathname === 'location' && method === 'GET') {
    return 'object'
  }
}

proto.processApiResponse = function(error, response, body, data, ready) {
  this.log.debug('processApiResponse called')
  this.log.debug('response status code %s', response.statusCode)

  this.log.debug('error %s', error)

  this.log.debug('body length %s', body.length)
  this.log.debug('body : %s', body)

  this.log.debug('Looking up API response type...')

  var apiResponseType = this.responseLUT(
      response.request.uri.pathname
    , response.req.method
  )

  this.log.debug('API reponse type : ' + apiResponseType)

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
    this.log.debug('API response type was \'none\'.')
    this.log.debug(
        'Calling final callback function passing the status code and null ' +
        'data.'
    )
    this.log.debug(
        'returned data : %s'
      , JSON.stringify({ status_code: response.statusCode, data: null })
    )

    return this.sendToFinalCallback(response.statusCode, body, ready)
  }

  if(apiResponseType === 'object') {
    this.log.debug('API response type was \'object\'')

    try {
      this.log.debug('Trying to parse body as JSON object')

      var b = JSON.parse(body)

      this.log.debug('Succeeded parsing body as JSON object')
      this.log.debug(
          'Calling final callback function passing the status code and ' +
          'returning a javascript object as the data.'
      )
      this.log.debug(
          'returned data : %s'
        , JSON.stringify({ status_code: response.statusCode, data: b })
      )

      this.sendToFinalCallback(response.statusCode, b, ready)
    } catch(e) {
      this.log.debug('Failed trying to parse body as JSON object')
      this.log.debug(
          'Calling final callback function passing the status code and ' +
          'returning simple text string as the data.'
      )
      this.log.debug(
          'returned data : %s'
        , JSON.stringify({ status_code: response.statusCode, data: body })
      )

      this.sendToFinalCallback(response.statusCode, body, ready)
    }

    return
  }

  this.log.debug(
      'API response type \'%s\' possibly has a next page'
    , apiResponseType
  )

  if(!body.length) {
    // there is a 504, all hell is breaking loose
    // sometimes the last page of a series of requests is empty and will
    // time out

    this.log.debug('last page returned zero byte body with response code %s'
      , response.statusCode)
    this.log.debug(
        'Calling final callback function passing the status code and ' +
        'returning array of objects as the data.'
    )
    this.log.debug(
        'returned data : %s'
      , JSON.stringify({ status_code: response.statusCode, data: data })
    )

    return this.sendToFinalCallback(response.statusCode, data, ready)
  }

  var d = JSON.parse(body)

  if(!data[apiResponseType]) {
    this.log.debug('Creating Array in data object')
    data[apiResponseType] = []
  }

  this.log.debug('Appending elements in the body to the data array')
  d[apiResponseType].forEach(function(item) {
    data[apiResponseType].push(item)
  })

  if(!d.next_page) {
    this.log.debug('next_page was undefined')

    // run the callback
    this.log.debug(
        'Calling final callback function passing the status code and ' +
        'returning array of objects as the data.'
    )
    this.log.debug(
        'returned data : %s'
      , JSON.stringify({ status_code: response.statusCode, data: data })
    )

    return this.sendToFinalCallback( response.statusCode, data, ready )
  }

  this.log.debug('getting next page: %s', d.next_page)

  // run the request again with the URI found in the next page
  var options = {
      method: response.req.method
    , url: d.next_page
  }

  this.make_request(options, data, ready)
}

proto.sendToFinalCallback = function(status_code, data, ready) {
  var status_first = status_code.toString().charAt(0)

  this.log.debug('sendToFinalCallback caled')
  this.log.info('status code : %s', status_code)

  if(status_first === '4' || status_first === '5') {
    // error
    ready({ status_code: status_code, data: data }, null)
  } else {
    // all is well
    ready(null, { status_code: status_code, data: data })
  }
}
