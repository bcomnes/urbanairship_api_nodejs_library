var request = require('request')

exports.Push = require('./Push.js').Push
exports.Notification = require('./Notification.js').Notification
exports.Selector = require('./Selector.js').Selector
exports.Message = require('./Message.js').Message
exports.Segment = require('./Segment.js').Segment
exports.Location = require('./Location.js').Location

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
            , url: 'https://go.urbanairship.com/api/segments/'
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
            , url: 'https://go.urbanairship.com/api/segments/'
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
    
    this.getLocationFromLatLongBounds = function(lat1, lon1, lat2, lon2, alias, ready){
        
        var params = '?q=' + lat1 + ',' + lon1 + ',' + lat2 + ',' + lon2
        
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
    this.getActiveUserCount = function(date,ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/activeusers/?date='+date.toJSON()
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }
        
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
    
    this.getResponseListing = function(start,end, limit, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/list/?start='+start.toJSON()+'&end='+end.toJSON()+'&limit='+limit
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }    
    
    this.getIndividualResponseStatistics = function(pushID, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/'+pushID
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }       
    
    this.getStatistics = function(start, end, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/stats/?start='+start.toJSON()+'&end='+end.toJSON()
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }    
    
    // per push
    this.getPerPush = function(pushID, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/detail/'+pushID
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }     

    this.getPerPushSeries = function(pushID, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+pushID
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }    

    this.getPerPushSeriesWithPrecision = function(pushID, precision, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+ pushID + '?precision=' + precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }    

    this.getPerPushSeriesWithPrecisionAndRange = function(pushID, start, end, precision, ready){

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+ pushID + '?precision=' + precision + '&start=' + start.toJSON() + '&end=' + end.toJSON()
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        request(options, function(error, response, body){
                var data = {}
                self.recursiveReady(error, response, body, data, ready)
        })
    }    

    
    ///////////////////////////////////////////////////////////////////////////////
    this.responseLUT = function name(path, method) {
        
        // there is no elegant solution to this problem
        // every endpoint has different behavior and pertinent data
        // handle them all
        // this is where the sausage gets made
         
        var primaryPathName = path.split('/')[2]
        var secondaryPathName = path.split('/')[3]
        var thirdPathName = path.split('/')[4]
        
        if (secondaryPathName === undefined) {
            secondaryPathName = ""
        }
        
        console.log('Primary Path Name   : ' + primaryPathName)
        console.log('Secondary Path Name : ' + secondaryPathName)
        console.log('Secondary Path Name Length : ' + secondaryPathName.length)
        console.log('Third Path Name     : ' + thirdPathName)
        
        // Push
        if (primaryPathName === 'push' && method === 'POST') {
            return [ 'object' ]
        }
        
        // Device Listing
        // get apids
        if (primaryPathName === 'apids' && secondaryPathName.length === 0 && method === 'GET') {
            return [ 'apids' ]
        }        
        
        // get single apid
        if (primaryPathName === 'apids' && secondaryPathName.length !== 0 && method === 'GET') {
            return [ 'object' ]
        }        
        
        // get device tokens
        if (primaryPathName === 'device_tokens' && secondaryPathName.length === 0 && method === 'GET') {
            return [ 'device_tokens' ]
        }        
        
        // get single device token
        if (primaryPathName === 'device_tokens' && secondaryPathName.length !== 0 && method === 'GET') {
            return [ 'object' ]
        }        
        
        // Tags
        if (primaryPathName === 'tags' && method === 'GET') {
            return [ 'tags' ]
        }             
        
        if (primaryPathName === 'tags' && method === 'PUT') {
            return [ 'none' ]
        }        

        if (primaryPathName === 'tags' && method === 'DELETE') {
            return [ 'none' ]
        }        

        // Segments        
        // single segment
        if (primaryPathName === 'segments' && secondaryPathName.length > 0 && method === 'GET') {
            return [ 'object' ]
        }
        
        // multiple segments
        if (primaryPathName === 'segments' && secondaryPathName.length === 0 && method === 'GET') {
            return [ 'segments' ]
        }
        
        // create a segment
        if (primaryPathName === 'segments' && method === 'POST') {
            return [ 'none' ]
        }

        // change segment
        if (primaryPathName === 'segments' && method === 'PUT') {
            return [ 'none' ]
        }        
        
        // delete segment
        if (primaryPathName === 'segments' && method === 'DELETE') {
            return [ 'none' ]
        }        
        
        // Reports
        if (primaryPathName === 'reports' && secondaryPathName === 'activeusers' && method === 'GET') {
            return [ 'object' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'perpush' && method === 'GET') {
            return [ 'object' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'sends' && method === 'GET') {
            return [ 'sends' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'opens' && method === 'GET') {
            return [ 'opens' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'responses' && thirdPathName === "list" && method === 'GET') {
            // getResponseListing()
            return [ 'pushes' ]
        
        } else if (primaryPathName === 'reports' && secondaryPathName === 'responses' && thirdPathName.length === 0 && method === 'GET') {
            // getResponseReport()
            return [ 'responses' ]
        
        } else if (primaryPathName === 'reports' && secondaryPathName === 'responses' && thirdPathName.length > 6 && method === 'GET') {
            // getIndividualResponseStatistics()
            return [ 'object' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'timeinapp' && method === 'GET') {
            return [ 'timeinapp' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'optins' && method === 'GET') {
            return [ 'optins' ]
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'optouts' && method === 'GET') {
            return [ 'optouts' ]
        }

        if (primaryPathName === 'push' && secondaryPathName === 'stats' && method === 'GET') {
            return [ 'object' ]
        }
        
        if (primaryPathName === 'location' && method === 'GET') {
            return [ 'object' ]
        }
        
        
        // return(LUT[path][method])
    }
    
    this.recursiveReady = function(error, response, body, data, ready){
    
        console.log('//////////////////////////////////////////////////////////////////////////////')
        
        console.log('Error : ')
        console.log(error)
        
        console.log()
    
        console.log('PathName    : ' + response.request.uri.pathname)
        console.log('Params      : ' + response.request.uri.query)
        // console.log("Path        : " + response.req.path)
        console.log('Method      : ' + response.req.method)    
        console.log('Status Code : ' + response.statusCode)
        
        console.log()
        
        console.log('Body length : ' + body.length)
        console.log('-----')
        console.log(body)

        console.log()
        
        console.log('Data : ')
        // console.log(data)

        console.log()
        var pertinentData = this.responseLUT(response.request.uri.pathname, response.req.method);
        console.log('Pertinent Data : ' + pertinentData)

        // possible options at this point
        /*
            ==
            if 'none' in the pertinent data? {
                call ready(null, { "status_code" : response.statusCode })
            } else if 'object' is in the pertinent data {
                call ready(null, JSON.parse(data))
            } else if 'next_page' is in the pertinent data {
                if 'next_page' is undefined {
                    this is the last of the results 
                    append the pertinent information to 'data' call ready(null, data)
                } else {
                    append the pertinent information to 'data' and send another request with the updated URL
                }
            }
            
        */
        // 
        
        if (pertinentData.indexOf('none') !== -1) {

            console.log('Got none.  Running callback with status code.')
            ready(null, { status_code: response.statusCode, data:null })
            return
        
        } else if (pertinentData.indexOf('object') !== -1) {
            
            console.log('Returned an Object.  Running callback with status code and object')
            
            try {
                var b = JSON.parse(body)
                ready( null, { status_code: response.statusCode, data: b } )
                
            } catch(e) {
                ready( null, { status_code: response.statusCode, data: body } )
            }
            
            
            return
            
        } else {
            
            console.log('Possibly a next page... do complicated shit.')
            
            if (body.length === 0) {
                // there is a 504, all hell is breaking loose
                ready( null, { status_code: response.statusCode, data: data } )
                return
            }
            
            var d = JSON.parse(body);
                 
            if (data[pertinentData[0]] === undefined) {
                console.log('Creating Array in data object')
                data[pertinentData[0]] = []
            }                 

            console.log('Appending each element in the body to the data array...')
            d[pertinentData[0]].forEach(function(item){
            
                data[pertinentData[0]].push(item)
                
            })
                        
            if (d.next_page === undefined) {
            
                console.log('There is NOT a next_page')
                // run the callback
                console.log('Running ready() with all the data.')
                ready( null, { status_code: response.statusCode, data: data } )
                return
            
            } else {
                
                console.log('There is a next_page')

                // run the request again with the URI found in the next page
                var options = {
                      method: response.req.method
                    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
                    , url: d.next_page
                    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
                }
                
                request(options, function(error, response, body){
                        self.recursiveReady(error, response, body, data, ready)
                })                  
                
            }
            
        }
        
    }
    
    
}