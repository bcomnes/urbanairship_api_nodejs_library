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
    
    this.getTags = function getTags(callback){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , uri: 'https://go.urbanairship.com/api/tags'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);        
    }
    
    this.createTag = function createTag(tag, callback){
        var options = {
              method: 'PUT'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);                
    }
    
    this.deleteTag = function deleteTag(tag, callback){
        var options = {
              method: 'DELETE'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);                
    }
    
    this.getDeviceTokens = function getDeviceTokens(callback){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);                        
    }

    this.getDeviceToken = function getDeviceTokens(deviceToken, callback){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);                        
    }

    this.getApids = function getApids(callback){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);                        
    }
    
    this.getApid = function getApid(apid, callback){
        var options = {
              method: 'GET'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/' + apid
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }        
        request(options, callback);        
    }
    
    this.sendPush = function sendPush(push, callback){
        
        console.log("Building Payload");
        console.log(push);
        
        console.log("Notifications in Push Object : " + push.notifications.length);
        
        // build payload
        payload = {};
        payload.notification = {};
        
        payload.device_types = 'all';
        
        payload.audience = push.notifications[0].deviceType;
        payload.notification.alert = push.notifications[0].alert;
        
        if (push.notifications[0].badge !== undefined) {
            if (payload.notification.ios === undefined) {
                payload.notification.ios = {};                
            }
            payload.notification.ios.badge = push.notifications[0].badge;
        }
        
        if (push.notifications[0].extras.length > 0) {
            if (payload.notification.ios === undefined) {
                payload.notification.ios = {};                
            }
            payload.notification.ios.extra = {};
            
            for (var i = 0; i < push.notifications[0].extras.length; i++) {
                payload.notification.ios.extra[push.notifications[0].extras[0].key] = push.notifications[0].extras[0].value;
            }            
        }
        
        if (payload.notification.ios === undefined) {
            payload.notification.ios = {};                
        }
        // payload.notification.ios.alert = push.notifications[0].alert;
        
        console.log(JSON.stringify(payload, null, 2));
        
        var b = JSON.stringify(payload);
                
        var options = {
              method: 'POST'
            , auth: { user: client.appKey, pass: client.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/'
            // , header: 'Accept: application/vnd.urbanairship+json; version=3; charset=utf8; Content-Type: application/json'        
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        
        request(options, callback);           
    }
    
}

function DeviceType() {
    this.IOS = "ios";
    this.ANDROID = "android";
    this.ALL = "all";
}

function Push() {
    
    this.notifications = [];
    
    this.addNotification = function addNotification(notification){
        this.notifications.push(notification)
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
        tags.push(tag)
    }
    
    this.addAlias = function(alias){
        aliases.push(alias)
    }
    
    this.addDeviceToken = function(deviceToken){
        deviceTokens.push(deviceToken)
    }
    
    this.addApid = function(apid){
        apids.push(apid)
    }
    
    this.addSelector = function(selector){
        selectors.push(selector)
    }
    
    this.toJSON = function(){
        
        
        
    }
    
}



var client = new APIClient('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg');

var n = new Notification();
n.setDeviceType(new DeviceType().ALL);
n.setAlert("Test.");

// ios specific stuff
n.setBadge(88);
n.addExtra('url', 'http://google.com');

console.log(n);

var p = new Push();
p.addNotification(n);

client.sendPush(p, displayResults);

// client.getApids(displayResults)
// client.getApid("b7962a6b-4c54-456d-91d1-de1466788db2", displayResults)
// client.getDeviceTokens(displayResults)
// client.getDeviceToken('068A81174355005612A4BA390B99E6F7BC7567F754C54D1B079EABAC8340A1E1', displayResults)
// client.getTags(displayResults)
// client.createTag("library", displayResults)
// client.deleteTag("library", displayResults)

function displayResults(error, response, body) {

    console.log("Error");
    console.log(error);

    console.log("Response Status Code : " + response.statusCode);
    
    console.log("Body");    
    console.log(JSON.stringify(JSON.parse(body),null,2));

    // process.exit(0);
    
}

//435334



