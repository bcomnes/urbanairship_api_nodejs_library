exports.Tag = function(){
    
    this.name
    this.addedDeviceTokens = []
    this.removedDeviceTokens = []
    this.addedApids = []
    this.removedApids = []
    
    this.setName = function(name){
        
        this.name = name
        
    }
    
    this.addDeviceToken = function(deviceToken){
        
        this.addedDeviceTokens.push(deviceToken)
        
    }

    this.removeDeviceToken = function(deviceToken){
        
        this.removedDeviceTokens.push(deviceToken)
        
    }
    
    this.addApid = function(apid){
        
        this.addedApids.push(apid)
        
    }
    
    this.removeApid = function(apid){
        
        this.removedApids.push(apid)
        
    }

    this.toJSON = function(){
        
        var payload = {}
        
        payload.device_tokens = {}
        payload.device_tokens.add = this.addedDeviceTokens
        payload.device_tokens.remove = this.removedDeviceTokens
        
        payload.apids = {}
        payload.apids.add = this.addedApids
        payload.apids.remove = this.removedApids
        
        // the payload arrays can be empty
                
        return payload
        
    }
    
}