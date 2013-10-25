exports.Selector = Selector

function Selector(booleanOperator) {
  this.operator = booleanOperator
  this.tags = []
  this.aliases = []
  this.deviceTokens = []
  this.apids = []
  this.locations = []
  this.segments = []
  this.selectors = []
}

var cons = Selector
  , proto = cons.prototype

proto.constructor = cons

  // though it is a boolean trap
  // (http://ariya.ofilabs.com/2011/08/hall-of-api-shame-boolean-trap.html)
  // it is the most elegant solution for the not conditionals
  // I wrote it many other ways, and this was the least complicated way,
  // trust me.
  // ...it is just in one place and the argument is entirely optional... (v_v)

proto.addSegment = function(segment, b_is_not) {
  if(!b_is_not) {
    this.segments.push(segment)
  }

  this.segments.push({ 'segment': segment, not: true})
}

proto.addTag = function(tag, b_is_not) {
  if(!b_is_not) {
    return this.tags.push(tag)
  }

  this.tags.push({ tag: tag, not: true})
}

proto.addAlias = function(alias, b_is_not) {
  if(!b_is_not) {
    return this.aliases.push(alias)
  }

  this.aliases.push({ alias: alias, not: true })
}

proto.addDeviceToken = function(deviceToken, b_is_not) {
  if(!b_is_not) {
    return this.deviceTokens.push(deviceToken)
  }

  this.deviceTokens.push({ deviceToken: deviceToken, not: true })
}

proto.addApid = function(apid, b_is_not) {
  if(!b_is_not) {
    return this.apids.push(apid)
  }

  this.apids.push({ apid: apid, not: true })
}

proto.addSelector = function(selector, b_is_not) {
  if(!b_is_not) {
    return this.selectors.push(selector)
  }

  this.selectors.push({ selector: selector, not: true })
}

proto.addLocation = function(location, b_is_not) {
  if(!b_is_not) {
    return this.locations.push(location)
  }

  this.locations.push({ location: location, not: true })
}

proto.toJSON = function(segment_conditional) {
  var payload = {}
    , nested

  payload[this.operator] = []
  nested = payload[this.operator]

  this.tags.forEach(function(tag) {
    if(!tag.not) {
      return nested.push({ tag: tag })
    }

    nested.push({ not: { tag: tag.tag }})
  })

  this.locations.forEach(function(location) {
    if(!location.not) {
      return nested.push({ location: location.toJSON() })
    }

    nested.push({ not: { location: location.location.toJSON() }})
  })

  this.selectors.forEach(function(selector) {
    if(!selector.not) {
      return nested.push(selector.toJSON())
    }

    nested.push({ 'not': selector.selector.toJSON() })
  })

  // when a Selector is used to create a segment, you can't include segments,
  // device_tokens, or apids
  // when a Selector is used as the audience field in a push,
  // it can include segments
  if(segment_conditional.use_segments === true) {
    this.segments.forEach(function(segment) {
      if(!segment.not) {
        return nested.push({ segment: segment })
      }

      nested.push({ not: { segment: segment.segment }})
    })

    this.aliases.forEach(function(alias) {
      if(!alias.not) {
        return nested.push({ alias: alias })
      }

      nested.push({ not: { alias: alias.alias }})
    })

    this.deviceTokens.forEach(function(device_token) {
      if(!device_token.not) {
        return nested.push({ device_token: device_token })
      }

      nested.push({ not: { device_token: device_token.deviceToken }})    
    })

    this.apids.forEach(function(apid) {
      if(!apid.not) {
        return nested.push({ apid: apid })
      }

      nested.push({ not: { apid: apid.apid }})
    })
  }

  // sometimes the selector is nothing, so the audience would be all
  if(!nested.length) {
    payload = 'all'
  }

  return payload
}
