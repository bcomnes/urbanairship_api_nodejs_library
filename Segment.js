exports.Segment = function Segment(){
    
    this.display_name
    this.criteria
    
    this.setName = function(name){
        
        this.display_name = name
        
    }
    
    this.setCriteria = function(criteria){

        this.criteria = criteria
        
    }
    
    this.toJSON = function(){
        
        var payload = {}
        
        payload.display_name = this.display_name
        
        payload.criteria = this.criteria.toJSON({ use_segments: false })
        
        console.log(JSON.stringify(payload.criteria,2,null))
        
        return payload
    
    }
    
}