exports.getLocationFromString = function(query, alias, ready) {
  var params = '?q=' + query
    , options

  if(alias) {
    params += '&type=' + alias
  }

  options = {
      method: 'GET'
    , headers: {}
    , url: '/location/' + params
  }

  this.log.info(
      'getLocationFromString called \t query : %s \t alias : %s'
    , query
    , alias
  )
  this.make_request(options, {}, ready)
}

exports.getLocationFromLatLon = function(lat, lon, alias, ready) {
  var params = [lat, lon].join(',')
    , options

  if(alias) {
    params += '?type=' + alias
  }

  options = {
      method: 'GET'
    , headers: {}
    , url: '/location/' + params
  }

  this.log.info(
      'getLocationFromLatLon called \t lat : %s \t lon : %s \t alias : %s'
    , lat
    , lon
    , alias
  )

  this.make_request(options, {}, ready)
}

exports.getLocationFromLatLonBounds =
function(lat1, lon1, lat2, lon2, alias, ready) {
  var params = [lat1, lon1, lat2, lon2].join(',')
    , options

  if(alias) {
    params += '?type=' + alias
  }

  options = {
      method: 'GET'
    , headers: {}
    , url: '/location/' + params
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

exports.getLocationFromAlias = function(query, alias, ready) {
  var options = {
      method: 'GET'
    , headers: {}
    , url: '/location/from-alias?' + alias +
        '=' + query
  }

  this.log.info(
      'getLocationFromAlias called \t query : %s \t alias : %s'
    , query
    , alias
  )

  this.make_request(options, {}, ready)
}
