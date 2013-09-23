var request = require('request');

function APIClient(_appKey, _appSecret) {
    
    this.appKey = _appKey;
    this.appSecret = _appSecret;
    
    this.auth = new Buffer(this.appKey + ":" + this.appSecret).toString('base64');
    
    this.getKey = function getKey(){
        return this.appKey;
    }
    
    this.getSecret = function getSecret(){
        return this.appSecret;
    }
    
    this.getTags = function getTags(ready){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , uri: 'https://go.urbanairship.com/api/tags'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);        
    }
    
    this.createTag = function createTag(tag, ready){
        var options = {
              method: 'PUT'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);                
    }
    
    this.deleteTag = function deleteTag(tag, ready){
        var options = {
              method: 'DELETE'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);                
    }
    
    this.getDeviceTokens = function getDeviceTokens(ready){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);                        
    }

    this.getDeviceToken = function getDeviceTokens(deviceToken, ready){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);                        
    }

    this.getApids = function getApids(ready){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);                        
    }
    
    this.getApid = function getApid(apid, ready){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/' + apid
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, ready);        
    }
    
    this.sendPush = function sendPush(push, ready){
                
        // build payload
        payload = push.toJSON();

        var b = JSON.stringify(payload);
                
        var options = {
              method: 'POST'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        
        request(options, ready);           
    }
    
}

function DeviceType() {
    this.IOS = "ios";
    this.ANDROID = "android";
    this.ALL = "all";
}

function Push() {
    
    this.notifications = [];
    this.audience = {};
    
    this.addNotification = function addNotification(notification){
        this.notifications.push(notification);
    }
    
    this.setAudience = function(selector){
        this.audience = selector;
    }
    
    this.toJSON = function(){
        var payload = {};

        // parse the device types in the list of notifications, do any of them have all?
        var anyNotificationSetToAll = false;
        this.notifications.forEach(function(notification){
            if (notification.deviceType === 'all') {
                anyNotificationSetToAll = true;
            }
        })
        
        if (!anyNotificationSetToAll) {
            // build an array of notificatons from the device types
            payload.device_types = [];
            this.notifications.forEach(function(notification){
                payload.device_types.push(notification.deviceType)                
            })
        }
        else {
            payload.device_types = 'all';    
        }

        payload.notification = {}
        
        this.notifications.forEach(function(notification){
            if (notification.deviceType === 'all') {
                
                payload.notification.alert = notification.alert;
                
            } else if (notification.deviceType === 'ios'){
                
                payload.notification.ios = {}
                
                if (notification.alert !== undefined) {
                    payload.notification.ios.alert = notification.alert
                }
                
                if (notification.badge !== undefined) {
                    payload.notification.ios.badge = notification.badge
                }
                
                if (notification.extras.length > 0) {
                    payload.notification.ios.extra = {}
                    notification.extras.forEach(function(extra){
                        payload.notification.ios.extra[extra.key] = extra.value
                    })
                }
                
            } else if (notification.deviceType === 'android') {
                
                payload.notification.android = {}
                
                if (notification.alert !== undefined) {
                    payload.notification.android.alert = notification.alert
                }

                if (notification.extras.length > 0) {
                    payload.notification.android.extra = {}
                    notification.extras.forEach(function(extra){
                        payload.notification.android.extra[extra.key] = extra.value
                    })
                }
            }

        });
        
        
        if(this.audience.operator !== undefined){
            payload.audience = this.audience.toJSON();
        }
        else {
            payload.audience = "all";
        }
        
        return payload;
        
    }
}

function Notification() {
    
    this.deviceType;
    this.badge;
    this.alert;
    this.extras = [];
    
    this.setDeviceType = function setDeviceType(deviceType){
        this.deviceType = deviceType;
    }
    
    this.setBadge = function setBadge(badge){
        this.badge = badge;        
    }
    
    this.setAlert = function setAlert(alert){
        this.alert = alert;
    }
    
    this.addExtra = function addExtra(k,v){
        this.extras.push({ key: k, value: v});
    }
    
}

function Selector(booleanOperator) {
    
    this.operator = booleanOperator
    this.tags = []
    this.aliases = []
    this.deviceTokens = []
    this.apids = []
    this.selectors = []
    
    this.addTag = function(tag){
        this.tags.push(tag)
    }
    
    this.addAlias = function(alias){
        this.aliases.push(alias)
    }
    
    this.addDeviceToken = function(deviceToken){
        this.deviceTokens.push(deviceToken)
    }
    
    this.addApid = function(apid){
        this.apids.push(apid)
    }
    
    this.addSelector = function(selector){
        this.selectors.push(selector)
    }
    
    this.toJSON = function(){
        
        var payload = {}
        payload[this.operator] = []
        var nested = payload[this.operator]
        
        this.tags.forEach(function(tag){            
            nested.push({ "tag":tag })
        })

        this.aliases.forEach(function(alias){
            nested.push({ "alias": alias })    
        })
        
        this.deviceTokens.forEach(function(deviceToken){
            nested.push({ "device_token" : deviceToken })
        })
        
        this.apids.forEach(function(apid){
            nested.push({ "apid" : apid })
        })
        
        this.selectors.forEach(function(selector){
           nested.push(selector.toJSON())
        })
        
        // sometimes the selector is nothing
        if (nested.length === 0) {
            payload = "all";
        }
        
        return payload;        
    }
    
}

var client = new APIClient('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg');

// build audience
var s = new Selector("AND");
    s.addTag("foo");
    
    var s2 = new Selector("OR");
    s2.addTag("bar");
    s2.addTag("baz");
    s.addSelector(s2);

// build notification
var n = new Notification();
    n.setDeviceType(new DeviceType().ALL);
    n.setAlert("YAY. BASIC ALERT.");

var n2 = new Notification();
    n2.setDeviceType(new DeviceType().IOS);
    n2.setAlert("YAY IOS.");
    n2.setBadge(0);
    n2.addExtra('url', 'http://apple.com');

var n3 = new Notification();
    n3.setDeviceType(new DeviceType().ANDROID);
    n3.setAlert("YAY Android.");    
    n3.addExtra('url', 'http://google.com');

// build push
var p = new Push();
    p.addNotification(n)
    p.addNotification(n2)
    p.addNotification(n3);
    // p.setAudience(s)
    
    console.log(JSON.stringify(p.toJSON(),null,4));

client.sendPush(p, displayResults);

// client.getApids(displayResults)
// client.getApid("b7962a6b-4c54-456d-91d1-de1466788db2", displayResults)
// client.getDeviceTokens(displayResults)
// client.getDeviceToken('068A81174355005612A4BA390B99E6F7BC7567F754C54D1B079EABAC8340A1E1', displayResults)
// client.getTags(displayResults)
// client.createTag("library", displayResults)
// client.deleteTag("library", displayResults)

function displayResults(error, response, body) {

    console.log("");

    if (error !== null) {
        console.log("Error");
        console.log(error);
    }

    console.log("Response Status Code : " + response.statusCode);
    
    console.log("Body");    
    console.log(JSON.stringify(JSON.parse(body),null,2));
    
}
