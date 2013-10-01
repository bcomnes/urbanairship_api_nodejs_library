exports.Push = function Push() {
    
    this.notifications = []
    this.message
    this.audience = {}
    
    this.addNotification = function(notification){
        this.notifications.push(notification)
    }

    this.setMessage = function(message){
        this.message = message
    }
    
    this.setAudience = function(selector){
        this.audience = selector
    }
    
    this.toJSON = function(){
        var payload = {}

        // determine the device types
        // parse the device types in the list of notifications, do any of them have all?
        var anyNotificationSetToAll = false
        this.notifications.forEach(function(notification){
            if (notification.deviceType === 'all') {
                anyNotificationSetToAll = true
            }
        })
        
        if (!anyNotificationSetToAll) {
            // build an array of notificatons from the device types
            payload.device_types = []
            this.notifications.forEach(function(notification){
                payload.device_types.push(notification.deviceType)                
            })
        }
        else {
            payload.device_types = 'all'
        }

        
        // add the notifications to the push payload
        payload.notification = {}
        
        this.notifications.forEach(function(notification){
            if (notification.deviceType === 'all') {
                
                payload.notification.alert = notification.alert
                
            } else if (notification.deviceType === 'ios'){
                
                payload.notification.ios = {}
                
                if (notification.alert !== undefined) {
                    payload.notification.ios.alert = notification.alert
                }
                
                if (notification.badge !== undefined) {
                    payload.notification.ios.badge = notification.badge
                }
                
                if (notification.sound !== undefined) {
                    payload.notification.ios.sound == notification.sound
                }
                
                if (notification.content_available !== undefined) {
                    payload.notification.ios.content_available = notification.content_available
                }
                
                if (notification.expiry !== undefined) {
                    payload.notification.ios.expiry = notification.expiry
                }
                
                if (notification.priority !== undefined) {
                    payload.notification.ios.priority = notification.priority
                }
                
                if (notification.extras.length > 0) {
                    payload.notification.ios.extra = {}
                    notification.extras.forEach(function(extra){
                        payload.notification.ios.extra[extra.key] = extra.value
                    })
                }
                
            } else if (notification.deviceType === 'android') {
                
                payload.notification.android = {}
                
                if (notification.alert !== undefined) {
                    payload.notification.android.alert = notification.alert
                }

                if (notification.collapse_key !== undefined) {
                    payload.notification.android.collapse_key = notification.collapse_key
                }
                
                if (notification.time_to_live !== undefined) {
                    payload.notification.android.time_to_live = notification.time_to_live
                }
                
                if (notification.delay_while_idle !== undefined) {
                    payload.notification.android.delay_while_idle = notification.delay_while_idle
                }
                
                if (notification.extras.length > 0) {
                    
                    payload.notification.android.extra = {}
                    notification.extras.forEach(function(extra){
                        payload.notification.android.extra[extra.key] = extra.value
                    })
                    
                }
            }

        });
        
        // determine if there is an ad-hoc audience selector
        if(this.audience.operator !== undefined){
            
            payload.audience = this.audience.toJSON()
            
        }
        else {
            
            payload.audience = 'all'
            
        }
        
        if (this.message !== undefined) {
            
            payload.message = this.message.toJSON()
            
        }
        
        return payload
        
    }
}