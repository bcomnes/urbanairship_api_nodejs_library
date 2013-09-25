exports.Location = function(){
    
    this.alias
    this.id
    
    this.lastSeen
    
    this.resolution
    
    this.recent
    this.recentRange
    
    this.start
    this.end
    
    this.setAlias = function(alias){
        this.alias = alias
    }
    
    this.setId = function(id){
        this.id = id
    }
    
    this.setLastSeen = function(lastSeen){
        this.lastSeen = lastSeen
    }
    
    this.setTimeRelative = function(recentRange, resolution, lastSeen){
        if (lastSeen !== undefined) {
            this.lastSeen = lastSeen
        }
        this.recent = true
        this.recentRange = recentRange
        this.resolution = resolution
    }
    
    this.setTimeAbsolute = function(start, end, resolution){
        this.recent = false
        this.lastSeen = false
        
        this.resolution = resolution

        this.start = start
        this.end = end
    }
    
    this.toJSON = function(){
        
        var payload = {}
        
        // id or alias
        if (this.id === undefined) {
            payload.alias = this.alias
        }
        else {
            payload.id = this.id
        }
        
        payload.date = {}
        
        if (this.recent === true) {
        
            payload.date.recent = {}
            payload.date.recent[this.resolution] = this.recentRange
        
        } else {
        
            if (this.resolution === "minutes") {
                
                payload.date.minutes = {}
                
                var splitStart = this.start.toJSON().split("T")
                var splitEnd = this.end.toJSON().split("T")
                
                payload.date.minutes.start = splitStart[0] + " " + splitStart[1].substring(0,5)
                payload.date.minutes.end = splitEnd[0] + " " + splitEnd[1].substring(0,5)
                
            } else if (this.resolution === "hours") {
                
                payload.date.hours = {}
                
                var splitStart = this.start.toJSON().split("T")
                var splitEnd = this.end.toJSON().split("T")
                
                payload.date.hours.start = splitStart[0] + " " + splitStart[1].substring(0,3)
                payload.date.hours.end = splitEnd[0] + " " + splitEnd[1].substring(0,3)
                
            } else if (this.resolution === "days") {
                
                payload.date.days = {}
                
                var splitStart = this.start.toJSON().split("T")
                var splitEnd = this.end.toJSON().split("T")
                
                payload.date.days.start = splitStart[0]
                payload.date.days.end = splitEnd[0]
                
            } else if (this.resolution === "weeks") {
                // TODO FIX THIS SHIT
                payload.date.weeks = {}
                
                var splitStart = this.start.toJSON().split("T")
                
                payload.date.weeks.start = splitStart[0].substring(0,5) + "-W" + this.start.getUTCWeek();
                payload.date.weeks.end = splitEnd[0]            
            
            } else if (this.resolution === "months") {
                
                payload.date.months = {}
                
                var splitStart = this.start.toJSON().split("T")
                var splitEnd = this.end.toJSON().split("T")
                
                payload.date.months.start = splitStart[0].substring(0,7)
                payload.date.months.end = splitEnd[0].substring(0,7)
                
            } else if (this.resolution === "years") {
            
                payload.date.years = {}
                
                var splitStart = this.start.toJSON().split("T")
                var splitEnd = this.end.toJSON().split("T")
                
                payload.date.years.start = splitStart[0].substring(0,4)
                payload.date.years.end = splitEnd[0].substring(0,4)
            
            }   
        }
        
        return payload
        
    }
    
    
}