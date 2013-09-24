exports.Segment = function Segment(display_name){
    
    this.display_name = display_name
    this.criteria
    
    this.setCriteria = function(criteria){
        
        this.criteria = criteria
        
    }
    
    this.toJSON = function(){
        
        var payload = {}
        
        payload.display_name = display_name
        
        payload.criteria = this.criteria.toJSON()
        
        return payload
    
    }
    
}