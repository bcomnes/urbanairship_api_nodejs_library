exports.Push = Push

function Push() {
  this.message = null
  this.notifications = []
  this.audience = {}
}

var cons = Push
  , proto = cons.prototype

proto.constructor = cons

proto.addNotification = function(notification) {
  this.notifications.push(notification)
}

proto.setMessage = function(message) {
  this.message = message
}

proto.setAudience = function(selector) {
  this.audience = selector
}

proto.toJSON = function() {
  var payload = {}
    , any_notification_set_to_all

  // determine the device types
  // parse the device types in the list of notifications,
  // do any of them have all?
  any_notification_set_to_all = !!this.notifications.filter(set_to_all).length

  if(!any_notification_set_to_all) {
    // build an array of notificatons from the device types
    payload.device_types = []
    this.notifications.forEach(function(notification) {
      payload.device_types.push(notification.deviceType)
    })
  } else {
    payload.device_types = 'all'
  }

  // add the notifications to the push payload
  payload.notification = {}

  this.notifications.forEach(function(notification) {
    var device_type = notification.deviceType
      , payload_notification

    if(device_type === 'all') {
      return payload.notification.alert = notification.alert
    }

    if(!payload.notification[device_type]) {
      payload.notification[device_type] = {}
    }

    payload_notification = payload.notification[device_type]

    if(notification.alert) {
      payload_notification.alert = notification.alert
    }

    if(notification.extras.length) {
      if(!payload_notification.extra) {
        payload_notification.extra = {}
      }

      notification.extras.forEach(function(extra) {
        payload_notification.extra[extra.key] = extra.value
      })
    }

    if(device_type === 'ios') {
      if(notification.badge) {
        payload_notification.badge = notification.badge
      }

      if(notification.sound) {
        payload_notification.sound = notification.sound
      }

      if(notification.content_available) {
        payload_notification.content_available = notification.content_available
      }

      if(notification.expiry) {
        payload_notification.expiry = notification.expiry
      }

      if(notification.priority) {
        payload_notification.priority = notification.priority
      }
    } else if(device_type === 'android') {
      if(notification.collapse_key) {
        payload_notification.collapse_key = notification.collapse_key
      }

      if(notification.time_to_live) {
        payload_notification.time_to_live = notification.time_to_live
      }

      if(notification.delay_while_idle) {
        payload_notification.delay_while_idle = notification.delay_while_idle
      }
    }
  })

  // determine if there is an ad-hoc audience selector,
  // if not set the audience to 'all'
  if(this.audience.operator) {
    payload.audience = this.audience.toJSON({ use_segments: true })
  } else {
    payload.audience = 'all'
  }

  if(this.message) {
    payload.message = this.message.toJSON()
  }

  return payload

  function set_to_all(notification) {
    return notification.deviceType === 'all'
  }
}
