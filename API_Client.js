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

exports.API_Client = function APIClient(_appKey, _appSecret) {
    
    this.appKey = _appKey
    this.appSecret = _appSecret
    
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
        request(options, ready)
    }
    
    this.createTag = function(tag, ready){
        var options = {
              method: 'PUT'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready)
    }
    
    this.deleteTag = function(tag, ready){
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready)
    }
    
    // Device lookup
    this.getDeviceTokens = function(ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready)
    }

    this.getDeviceToken = function(deviceToken, ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready)
    }

    this.getApids = function(ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready)
    }
    
    this.getApid = function(apid, ready){
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/' + apid
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready)
    }
    
    // Push
    this.sendPush = function(push, ready){
                
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
        request(options, ready)
    }
    
    // Segments
    this.getSegments = function(ready){
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments'
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        
        request(options, ready)           
        
    }
    
    this.getSegment = function(segment_id, ready){
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        
        request(options, ready)           
        
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
        request(options, ready)        
        
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
        request(options, ready)        
        
    }
    
    this.deleteSegment = function(segment_id, ready){
        
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        
        request(options, ready)           
        
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
        
        request(options, ready)           
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
        
        request(options, ready)           
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
        
        request(options, ready)           
    }      
    
    // reports
    this.getPushReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/sends/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, ready)
    }

    this.getResponseReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, ready)
    }
    
    this.getAppOpensReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/opens/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, ready)
    }

    this.getTimeInAppReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/timeinapp/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, ready)
    }
    
    this.getOptInReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/optins/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, ready)
    }
    
    this.getOptOutReport = function(start,end,precision,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/optouts/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, ready)
    }
    
    
}