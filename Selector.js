exports.Selector = function Selector(booleanOperator) {
    
    this.operator = booleanOperator
    this.tags = []
    this.aliases = []
    this.deviceTokens = []
    this.apids = []
    this.selectors = []
    
    this.addTag = function(tag){
        this.tags.push(tag)
    }
    
    this.addAlias = function(alias){
        this.aliases.push(alias)
    }
    
    this.addDeviceToken = function(deviceToken){
        this.deviceTokens.push(deviceToken)
    }
    
    this.addApid = function(apid){
        this.apids.push(apid)
    }
    
    this.addSelector = function(selector){
        this.selectors.push(selector)
    }
    
    this.toJSON = function(){
        
        var payload = {}
        payload[this.operator] = []
        var nested = payload[this.operator]
        
        this.tags.forEach(function(tag){            
            nested.push({ 'tag':tag })
        })

        this.aliases.forEach(function(alias){
            nested.push({ 'alias': alias })    
        })
        
        this.deviceTokens.forEach(function(deviceToken){
            nested.push({ 'device_token' : deviceToken })
        })
        
        this.apids.forEach(function(apid){
            nested.push({ 'apid' : apid })
        })
        
        this.selectors.forEach(function(selector){
           nested.push(selector.toJSON())
        })
        
        // sometimes the selector is nothing, so the audience would be all
        if (nested.length === 0) {
            payload = 'all'
        }
        
        return payload        
    }
    
}