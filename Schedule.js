exports.Schedule = function Schedule(){

    this.name    
    this.date
    this.push

    this.setName = function(name){
        this.name = name
    }
    
    this.setDate = function(date){
        this.date = date
    }
    
    this.setPush = function(push){
        this.push = push
    }
    
    this.toJSON = function(){
        
        var payload = {}
        
        if (this.name !== undefined) {
            payload.name = this.name
        }
        
        payload.schedule = {}
        
        // to JSON() gives milliseconds, truncate them off, this is ugly, but effective and keeps in line with the other usages of the date
        payload.schedule.scheduled_time = this.date.toJSON().substring(0,this.date.toJSON().length-5)   
        
        payload.push = this.push.toJSON()
        
        return payload
        
    }
    
}