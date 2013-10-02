exports.Selector = function Selector(booleanOperator) {
    
    this.operator = booleanOperator

    this.tags = []
    this.aliases = []
    this.deviceTokens = []
    this.apids = []
    this.locations = []
    
    this.segments = []
    
    this.selectors = []
    
    // though it is a boolean trap (http://ariya.ofilabs.com/2011/08/hall-of-api-shame-boolean-trap.html) it is the most elegant solution for the not conditionals
    // I wrote it many other ways, and this was the least complicated way, trust me.
    // ...it is just in one place and the argument is entirely optional... (v_v)
    
    this.addSegment = function(segment, bIsNot){
        
        if (bIsNot === undefined || bIsNot === false) {
            this.segments.push(segment)    
        } else {
            this.segments.push({ 'segment': segment, not: true})    
        }
        
    }
    
    this.addTag = function(tag, bIsNot){
        
        if (bIsNot === undefined || bIsNot === false) {
            this.tags.push(tag)    
        } else {
            this.tags.push({ tag: tag, not: true})    
        }
        
    }
    
    this.addAlias = function(alias, bIsNot){
        
        if (bIsNot === undefined || bIsNot === false) {
            this.aliases.push(alias)
        } else {
            this.aliases.push({ alias: alias, not:true })
        }
        
    }
    
    this.addDeviceToken = function(deviceToken, bIsNot){
        
        if (bIsNot === undefined || bIsNot === false) {
            this.deviceTokens.push(deviceToken)
        } else {
            this.deviceTokens.push({ deviceToken: deviceToken, not:true })
        }
        
    }
    
    this.addApid = function(apid, bIsNot){
        
        if (bIsNot === undefined || bIsNot === false) {
            this.apids.push(apid)
        } else {
            this.apids.push({ apid: apid, not: true })
        }
        
    }
    
    this.addSelector = function(selector, bIsNot){
        
        if (bIsNot === undefined || bIsNot === false) {        
            this.selectors.push(selector)
        } else {
            this.selectors.push( { selector: selector, not: true })
        }
    }
        
    this.addLocation = function(location, bIsNot){

        if (bIsNot === undefined || bIsNot === false) {
            this.locations.push(location)
        } else {
            this.locations.push( { location: location, not: true })
        }
    }
    
    this.toJSON = function(segment_conditional){
        
        var payload = {}
        payload[this.operator] = []
        var nested = payload[this.operator]
        
        this.tags.forEach(function(tag){
            
            if (tag.not === undefined || tag.not === false) {
                nested.push({ 'tag' : tag })    
            } else {
                nested.push({ 'not' : { 'tag': tag.tag }})
            }
        })
        
        this.locations.forEach(function(location){
            
            if (location.not === undefined || location.not === false) {
                nested.push({ 'location' : location.toJSON() })
            } else {
                nested.push({ 'not' : { 'location' : location.location.toJSON() }})
            }
        })
        
        this.selectors.forEach(function(selector){
            
            if(selector.not === undefined || selector.not === false){    
                nested.push(selector.toJSON())            
            } else {
                nested.push({ 'not': selector.selector.toJSON() })
            }
        })
        
        // when a Selector is used to create a segment, you can't include segments, device_tokens, or apids
        // when a Selector is used as the audience field in a push, it can include segments
        if (segment_conditional.use_segments === true) {
            
            this.segments.forEach(function(segment){
                if (segment.not === undefined || segment.not === false) {
                    nested.push({ 'segment': segment })    
                } else {
                    nested.push({ 'not' : { 'segment': segment.segment }})    
                }            
            })
            
            this.aliases.forEach(function(alias){
                
                if (alias.not === undefined || alias.not === false) {
                    nested.push({ 'alias': alias })    
                } else {
                    nested.push({ 'not' : { 'alias': alias.alias }})    
                }            
                
            })
            
            this.deviceTokens.forEach(function(deviceToken){
                
                if (deviceToken.not === undefined || deviceToken.not === false) {
                    nested.push({ 'device_token' : deviceToken })
                    
                } else {
                    nested.push({ 'not' : { 'device_token' : deviceToken.deviceToken }})    
                }
                
            })
            
            this.apids.forEach(function(apid){
                
                if (apid.not === undefined || apid.not === false) {
                    nested.push({ 'apid' : apid })    
                } else {
                    nested.push({ 'not' : { 'apid' : apid.apid }})
                }
                
            })            
            
            
        }
        
        // sometimes the selector is nothing, so the audience would be all
        if (nested.length === 0) {
            
            payload = 'all'
            
        }
        
        return payload        
    }
    
}