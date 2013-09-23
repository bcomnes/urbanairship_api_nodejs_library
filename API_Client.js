var request = require("request")

exports.Push = require("./Push.js").Push
exports.Notification = require("./Notification.js").Notification
exports.Selector = require("./Selector.js").Selector

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
    
}