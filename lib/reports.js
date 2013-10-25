exports.getActiveUserCount = function(date, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/activeusers/?date=' +
        date.toJSON()
  }

  this.log.info('getActiveUserCount called \t date : %s', date.toJSON())
  this.make_request(options, {}, ready)
}

exports.getResponseReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/responses/?start=' +
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

exports.getAppOpensReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/opens/?start=' +
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

exports.getTimeInAppReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/timeinapp/?start=' +
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

exports.getOptInReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/optins/?start=' +
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

exports.getOptOutReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/optouts/?start=' +
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

exports.getPushReport = function(start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/sends/?start=' +
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

exports.getResponseListing = function(start, end, limit, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/responses/list/?start=' +
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

exports.getIndividualResponseStatistics = function(pushID, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/responses/' + pushID
  }

  this.log.info(
      'getIndividualResponseStatistics called \t push id : %s'
    , pushID
  )

  this.make_request(options, {}, ready)
}

exports.getStatistics = function(start, end, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/push/stats/?start=' +
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
exports.getPerPush = function(pushID, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/perpush/detail/' + pushID
  }

  this.log.info('getPerPush called \t push id : %s', pushID)
  this.make_request(options, {}, ready)
}

exports.getPerPushSeries = function(pushID, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/perpush/series/' + pushID
  }

  this.log.info('getPerPushSeries called \t push id : %s',pushID)
  this.make_request(options, {}, ready)
}

exports.getPerPushSeriesWithPrecision = function(pushID, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/perpush/series/' + pushID +
        '?precision=' + precision
  }

  this.log.info(
      'getPerPushSeriesWithPrecision called \t push id : %s \t precision : %s'
    , pushID
    , precision
  )

  this.make_request(options, {}, ready)
}

exports.getPerPushSeriesWithPrecisionAndRange =
function(pushID, start, end, precision, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/reports/perpush/series/' +
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
