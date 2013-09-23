exports.Push = function Push() {
    
    this.notifications = []
    this.audience = {}
    
    this.addNotification = function(notification){
        this.notifications.push(notification)
    }
    
    this.setAudience = function(selector){
        this.audience = selector
    }
    
    this.toJSON = function(){
        var payload = {}

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

                if (notification.extras.length > 0) {
                    payload.notification.android.extra = {}
                    notification.extras.forEach(function(extra){
                        payload.notification.android.extra[extra.key] = extra.value
                    })
                }
            }

        });
        
        
        if(this.audience.operator !== undefined){
            payload.audience = this.audience.toJSON()
        }
        else {
            payload.audience = 'all'
            
        }
        
        return payload
        
    }
}