var request = require('request')

exports.make_request = function(options, data, ready) {
  var self = this

  if(!options.headers) {
    if(options.method === 'GET' || options.method === 'DELETE') {
      options.headers = self.get_headers
    } else {
      options.headers = self.post_headers
    }
  }

  options.auth = self.auth()
  options.url = 'https://go.urbanairship.com/api' + options.url

  self.log.debug(
      'Making HTTP request with options %s'
    , JSON.stringify(options)
  )

  request(options, process_response)

  function process_response(error, response, body) {
    self.processApiResponse(error, response, body, data, ready)
  }
}

exports.sendToFinalCallback = function(status_code, data, ready) {
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

exports.responseLUT = function name(path, method) {
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
