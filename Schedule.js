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
        
        payload.name = this.name
        
        payload.schedule = {}
        var dateString = this.date.toJSON()
        payload.schedule.scheduled_time = dateString.substring(0,dateString.length-5)   // to JSON() gives milliseconds, truncate them off, this is ugly, but effective
        
        payload.push = this.push.toJSON()
        
        return payload
        
    }
    
}