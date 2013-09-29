exports.Notification = function Notification() {
    
    this.deviceType
    this.alert
        
    // ios specific
    this.badge
    this.sound
    this.content_available
    this.expiry
    this.priority
    
    // android specific
    this.collapse_key
    this.time_to_live
    this.delay_while_idle
    
    // ios and Android 
    this.extras = []
    
    this.setDeviceType = function(deviceType){
        this.deviceType = deviceType
    }

    this.setAlert = function(alert){
        this.alert = alert
    }
    
    // ios specific settings
    this.setBadge = function(badge){
        this.badge = badge      
    }

    this.setSound = function(sound){
        this.sound = sound
    }
    
    this.setContentAvailable = function(content_available){
        this.content_available = content_available
    }
    
    this.setExpiry = function(expiry){
        this.expiry = expiry
    }
    
    this.setPriority = function(priority){
        this.priority = priority
    }
    
    // android specific settings
    this.setCollapseKey = function(collapse_key){
        this.collapse_key = collapse_key
    }
    
    this.setTimeToLive = function(time_to_live){
        this.time_to_live = time_to_live
    }
    
    this.setDelayWhileIdle = function(delay_while_idle){
        this.delay_while_idle = delay_while_idle
    }
    
    // both ios and android specific
    this.addExtra = function(k,v){
        this.extras.push({ key: k, value: v})
    }
    
}