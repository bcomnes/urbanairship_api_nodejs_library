exports.Message = function Message(){
    
    this.title
    this.body
    this.content_type = "text/html"
    this.content_encoding = "utf-8"
    this.expiry
    this.icons
    this.extras = []
    this.options = []
    
    this.setTitle = function(title){
        this.title = title
    }
    
    this.setBody = function(body){
        this.body = body
    }
    
    this.setContentType = function(content_type){
        this.content_type = content_type
    }
    
    this.setContentEncoding = function(content_encoding){
        this.content_encoding = content_encoding
    }
    
    this.setExpiry = function(expiry){
        this.expiry = expiry
    }
    
    this.setIcon = function(icon){
        this.icons = icon;
    }
    
    this.addExtra = function(k,v){
        extras.push({ key: k, value: v })
    }
    
    this.addOption = function(k,v){
        options.push({ key: k, value: v })
    }
    
    this.toJSON = function(){
        
        var payload = {}
        
        payload.title = this.title
        
        payload.body = this.body
        
        payload.content_type = this.content_type
        
        payload.content_encoding = this.content_encoding
        
        if (this.expiry !== undefined) {
            payload.expiry = this.expiry
        }
        
        if (this.icons !== undefined) {
            payload.icons.list_icon = this.icons
        }
        
        if (this.extras.length > 0) {
            this.extras.forEach(function(extra){
                payload.extra[extra.key] = extra.value    
            })
        }

        if (this.options.length > 0) {
            this.options.forEach(function(option){
                payload.options[option.key] = option.value    
            })
        }
        
        return payload

    }
    
    
    
}