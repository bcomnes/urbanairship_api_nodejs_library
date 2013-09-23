exports.Notification = function Notification() {
    
    this.deviceType
    this.badge
    this.alert
    this.extras = []
    
    this.setDeviceType = function(deviceType){
        this.deviceType = deviceType
    }
    
    this.setBadge = function(badge){
        this.badge = badge      
    }
    
    this.setAlert = function(alert){
        this.alert = alert
    }
    
    this.addExtra = function(k,v){
        this.extras.push({ key: k, value: v})
    }
    
}