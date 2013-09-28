var request = require("request")

exports.Push = require("./Push.js").Push
exports.Notification = require("./Notification.js").Notification
exports.Selector = require("./Selector.js").Selector
exports.Message = require("./Message.js").Message
exports.Segment = require("./Segment.js").Segment
exports.Location = require("./Location.js").Location

exports.DeviceType = function DeviceType() {
    this.IOS = 'ios'
    this.ANDROID = 'android'
    this.ALL = 'all'
}

exports.API_Client = function APIClient(appKey, appSecret) {

    // pagination requires recursion with anonymous functions, thus self
    var self = this
    
    this.appKey = appKey
    this.appSecret = appSecret
    
    this.auth = new Buffer(this.appKey + ":" + this.appSecret).toString('base64')
    
    this.getKey = function(){
        return this.appKey
    }
    
    this.getSecret = function(){
        return this.appSecret
    }
    
    // Tags
    this.getTags = function(ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , uri: 'https://go.urbanairship.com/api/tags'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.createTag = function(tag, ready){
        var options = {
              method: 'PUT'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.deleteTag = function(tag, ready){
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    // Device lookup
    this.getDeviceTokens = function(ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }

    this.getDeviceToken = function(deviceToken, ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }

    this.getApids = function(ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.getApid = function(apid, ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/' + apid
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    // Push
    this.sendPushDDEEERRRP = function(push, ready){
                
        // build payload
        payload = push.toJSON()

        var b = JSON.stringify(payload)
                
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })        
        
    }
    
    // Segments
    this.getSegments = function(ready){
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments'
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        

        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })          
        
    }
    
    this.getSegment = function(segment_id, ready){
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id + '?with_count=1'
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        

        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })           
        
    }
    
    this.createSegment = function(segment, ready){
        
        payload = segment.toJSON()
        
        var b = JSON.stringify(payload)
       
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })        
        
    }
    
    this.changeSegment = function(segment_id, segment, ready){
        
        payload = segment.toJSON()
        
        var b = JSON.stringify(payload)
       
        var options = {
              method: 'PUT'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })        
        
    }
    
    this.deleteSegment = function(segment_id, ready){
        
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })       
        
    }    
    
    // Location
    this.getLocationFromString = function(query, alias, ready){
        
        var params = '?q=' + query
        
        if (alias !== null) {
            params += '&type=' + alias
        }
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/location/' + params
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        console.log(options)
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })          
    }
    
    this.getLocationFromLatLong = function(lat, lon, alias, ready){
        
        var params = '?q=' + lat + ',' + lon
        
        if (alias !== null) {
            params += '&type=' + alias
        }
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/location/' + params
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        console.log(options);
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })           
    }
    
    this.getLocationFromAlias = function(query, alias, ready){
        
        var params = '?' + alias + '=' + query
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/location/from-alias' + params
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        console.log(options);
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })          
    }      
    
    // reports
    this.getResponseReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.getAppOpensReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/opens/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }

    this.getTimeInAppReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/timeinapp/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.getOptInReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/optins/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.getOptOutReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/optouts/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
    
    this.getPushReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/sends/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }    
    
    this.recursiveReady = function(error, response, body, data, ready){
    
        
        console.log(body)
        
        
/*    
        if (error !== null) {
            
            console.log("BIG ERROR" + error)
            ready(error, null)
            return
        }         
        
        try { // is the body JSON(?)
            
            var b = JSON.parse(body);
            
            // check if the body contains an error
            if (b.error !== undefined) {
                
                console.log("Verbose Error")
                // return it as an error
                ready(JSON.stringify(b), null)
                
            } else {
                
                console.log("Success!")
                var b = JSON.parse(body)
                
                var keys_array = Object.keys(b)
                
                keys_array.forEach(function(key){
                
                    if(key !== "next_page" && key != "prev_page" ){
                        // this packet has data, append it to the dump
                        
                        if (data[key] === undefined) {
                            data[key] = []
                        }
                        
                        b[key].forEach(function(element){
                            data[key].push(element)    
                        })                     
                    }
                    
                })
                
                if (b.next_page !== undefined) {
                    // there is a next_page element, run the recursive call
                    // console.log("Data.length : " + data.length)
                    
                    var options = {
                          method: 'GET'
                        , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
                        , url: b.next_page
                        , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
                    }
                    
                    request(options, function(error, response, body){ self.recursiveReady(error, response, body, data, ready) })
                    
                }
                else {
                    // you have it all call the original callback
                    console.log("Got all the data calling final callback:")
                    ready(null, data)
                }            

            }            

        } catch(e) {
            //
            
            console.log("First try catch error " + e)
            
            // console.log("Object is not an array.")
            try {
                console.log(JSON.parse(body))
                ready(null, JSON.parse(body))
                return 
            } catch(e) {
                console.log("Body is not JSON")
                ready(null, body)
            }
        }
    
*/

    }
    
    
}