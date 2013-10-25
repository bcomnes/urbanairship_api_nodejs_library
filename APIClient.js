var request = require('request')
  , Log = require('log')
  , fs = require('fs')

var lookup = require('./lib/device_lookup')
  , segments = require('./lib/segments')
  , location = require('./lib/location')
  , schedule = require('./lib/schedule')
  , reports = require('./lib/reports')
  , push = require('./lib/push')
  , util = require('./lib/util')
  , tags = require('./lib/tags')

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

proto.make_request = util.make_request
proto.sendToFinalCallback = util.sendToFinalCallback
proto.responseLUT = util.responseLUT

// Tags
proto.tagDevices = tags.tagDevices
proto.getTags = tags.getTags
proto.createTag = tags.createTag
proto.deleteTag = tags.deleteTag

// Device lookup
proto.getDeviceTokens = lookup.getDeviceTokens
proto.getDeviceToken = lookup.getDeviceToken
proto.getApids = lookup.getApids
proto.getApid = lookup.getApid

// Push
proto.sendPush = push.sendPush
proto.validatePush = push.validatePush

// Schedule
proto.schedulePush = schedule.schedulePush
proto.listSchedules = schedule.listSchedules
proto.listSchedule = schedule.listSchedule
proto.updateSchedule = schedule.updateSchedule
proto.deleteSchedule = schedule.deleteSchedule

// Segments
proto.getSegments = segments.getSegments
proto.getSegment = segments.getSegment
proto.createSegment = segments.createSegment
proto.changeSegment = segments.changeSegment
proto.deleteSegment = segments.deleteSegment

// Location
proto.getLocationFromString = location.getLocationFromString
proto.getLocationFromLatLon = location.getLocationFromLatLon
proto.getLocationFromLatLonBounds = location.getLocationFromLatLonBounds
proto.getLocationFromAlias = location.getLocationFromAlias

// reports
proto.getActiveUserCount = reports.getActiveUserCount
proto.getResponseReport = reports.getResponseReport
proto.getAppOpensReport = reports.getAppOpensReport
proto.getTimeInAppReport = reports.getTimeInAppReport
proto.getOptInReport = reports.getOptInReport
proto.getOptOutReport = reports.getOptOutReport
proto.getPushReport = reports.getPushReport
proto.getResponseListing = reports.getResponseListing
proto.getIndividualResponseStatistics = reports.getIndividualResponseStatistics
proto.getStatistics = reports.getStatistics
proto.getPerPush = reports.getPerPush
proto.getPerPushSeries = reports.getPerPushSeries
proto.getPerPushSeriesWithPrecision = reports.getPerPushSeriesWithPrecision
proto.getPerPushSeriesWithPrecisionAndRange =
reports.getPerPushSeriesWithPrecisionAndRange

///////////////////////////////////////////////////////////////////////////////

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

