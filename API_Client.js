var fs = require('fs')
 , Log = require('log')
 , request = require('request')
 
exports.Push = require('./Push.js').Push
exports.Notification = require('./Notification.js').Notification
exports.Selector = require('./Selector.js').Selector
exports.Message = require('./Message.js').Message
exports.Segment = require('./Segment.js').Segment
exports.Location = require('./Location.js').Location
exports.Schedule = require('./Schedule.js').Schedule
exports.Tag = require('./Tag.js').Tag

exports.DeviceType = function DeviceType() {
    this.IOS = 'ios'
    this.ANDROID = 'android'
    this.ALL = 'all'
}

exports.API_Client = function APIClient(appKey, appSecret, loginfo) {

    // set up logging
    var log

    if (loginfo !== undefined) {
    
        var loglevel = 'info'
        if (loginfo.loglevel !== undefined) {
            loglevel = loginfo.loglevel
        }
        
        var filename = appKey+'.log'
        if (loginfo.filename !== undefined) {
            filename = loginfo.filename
        }
        
        var flags = { 'flags': 'w' }
        if (loginfo.append === 'true') {
            flags = { 'flags': 'a' }
        }
        
        log = new Log(loglevel, fs.createWriteStream(filename, flags))
        
    } else {
        
        log = new Log('info', fs.createWriteStream('urban_airship.log', {'flags': 'a'}))
        
    }

    log.info('Creating client with app key : %s', appKey)
    
    // paginated results requires recursion with anonymous functions, thus self
    var self = this
    
    this.appKey = appKey
    this.appSecret = appSecret
    
    // this.auth = new Buffer(this.appKey + ":" + this.appSecret).toString('base64')
    
    this.getKey = function(){
        return this.appKey
    }
    
    this.getSecret = function(){
        return this.appSecret
    }
    
    // Tags
    this.tagAddRemoveDevices = function(tag, ready){

        log.info('tagAddRemoveDevices called')
        
        var payload = tag.toJSON()
        
        log.info('tag name : %s', tag.name)        
        log.info('For tag named: \'%s\' \t %s device_tokens added', tag.name, tag.addedDeviceTokens.length)
        log.info('For tag named: \'%s\' \t %s device_tokens removed', tag.name, tag.removedDeviceTokens.length)
        log.info('For tag named: \'%s\' \t %s apids added', tag.name, tag.addedApids.length)
        log.info('For tag named: \'%s\' \t %s apids removed', tag.name, tag.removedApids.length)
        
        log.debug('building payload')
        
        var b = JSON.stringify(payload)
        
        log.debug('done building payload')
        
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , uri: 'https://go.urbanairship.com/api/tags/' + tag.name
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getTags = function(ready){
        
        log.info('getTags called')
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , uri: 'https://go.urbanairship.com/api/tags/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.createTag = function(tag, ready){
        
        log.info('createTag called')
        log.info('tag name : %s', tag)
        
        var options = {
              method: 'PUT'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.deleteTag = function(tag, ready){
        
        log.info('deleteTag called')
        log.info('tag name : %s', tag)
        
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/tags/' + tag
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    // Device lookup
    this.getDeviceTokens = function(ready){
        
        log.info('getDeviceTokens called')
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }

    this.getDeviceToken = function(deviceToken, ready){
        
        log.info('getDeviceToken called')
        log.info('device_token : %s', deviceToken)
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/device_tokens/' + deviceToken
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }

    this.getApids = function(ready){
        
        log.info('getApids called')
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/'
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getApid = function(apid, ready){
        
        log.info('getApid called')
        log.info('apid : %s', apid)
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/apids/' + apid
            , header: 'Content-type: application/vnd.urbanairship+json; version=3; charset=utf8;' 
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    // Push
    this.sendPush = function(push, ready){

        log.info('sendPush called')
    
        log.debug('building payload')
        // build payload
        payload = push.toJSON()
        log.debug('done building payload')
        
        var b = JSON.stringify(payload)
        
        log.debug('push payload : %s', b)
                
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })        
        
    }

    this.validatePush = function(push, ready){

        log.info('validatePush called')
    
        log.debug('building payload')
        // build payload
        payload = push.toJSON()
        log.debug('done building payload')

        var b = JSON.stringify(payload)
                
        log.debug('push payload : %s', b)
                
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/validate/'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })        
        
    }
    
    // Schedule
    this.schedulePush = function(schedule, ready){

        log.info('schedulePush called')
    
        log.debug('building payload')
        // build payload
        payload = schedule.toJSON()
        log.debug('done building payload')

        var b = JSON.stringify(payload)
                
        log.debug('schedule payload : %s', b)
                
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/schedules/'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })        
        
    }
    
    this.listSchedules = function(ready){
    
        log.info('listSchedules called')
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/schedules/'
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'}   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })      
    
    }

    this.listSchedule = function(scheduleID, ready){

        log.info('listSchedule called')
        log.info('schedule id : %s', scheduleID)
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'}   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })      
    
    }

    this.updateSchedule = function(scheduleID, schedule, ready){
    
        log.info('updateSchedule called')
        log.info('schedule id : %s', scheduleID)
    
        log.debug('building payload')
        // build payload
        payload = schedule.toJSON()
        log.debug('done building payload')

        var b = JSON.stringify(payload)
        
        log.debug('schedule payload : %s', b)
                
        var options = {
              method: 'PUT'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })  
    
    }

    this.deleteSchedule = function(scheduleID, ready){
    
        log.info('delete schedule called')
        log.infl('schedule id : %s', scheduleID)
    
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/schedules/' + scheduleID
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'}   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })      
    
    }    
    
    // Segments
    this.getSegments = function(ready){
        
        log.info('getSegments called')
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/'
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })          
        
    }
    
    this.getSegment = function(segment_id, ready){
        
        log.info('getSegment called')
        log.info('segment id : %s', segment_id)
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id + '?with_count=1'
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })           
        
    }
    
    this.createSegment = function(segment, ready){
        
        log.info('createSegment called')
        
        log.debug('building payload')
        payload = segment.toJSON()
        log.debug('done building payload')
        
        var b = JSON.stringify(payload)
       
        log.debug('segment payload : %s', b)
       
        var options = {
              method: 'POST'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/'
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }        

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })        
        
    }
    
    this.changeSegment = function(segment_id, segment, ready){
        
        log.info('changeSegment called')
        log.info('segment id : %s', segment_id)
        
        log.debug('building payload')
        payload = segment.toJSON()
        log.debug('done building payload')
                
        var b = JSON.stringify(payload)
        
        log.debug('segment payload : %s', b)
       
        var options = {
              method: 'PUT'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id
            , body: b
            , headers: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;'
                       , 'Content-Type' : 'application/json'
                    }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })        
        
    }
    
    this.deleteSegment = function(segment_id, ready){
        
        log.info('deleteSegment called')
        log.info('segment id : %s ', segment_id)
        
        var options = {
              method: 'DELETE'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/segments/' + segment_id
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })       
        
    }    
    
    // Location
    this.getLocationFromString = function(query, alias, ready){
        
        log.info('getLocationFromString called')
        log.info('query : %s \t alias : %s', query, alias)
        
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
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getLocationFromLatLon = function(lat, lon, alias, ready){
        
        log.info('getLocationFromLatLon called')
        log.info('lat : %s \t lon : %s \t alias : %s', lat, lon, alias)
        
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
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getLocationFromLatLonBounds = function(lat1, lon1, lat2, lon2, alias, ready){

        log.info('getLocationFromLatLonBounds called')
        log.info('lat1 : %s \t lon1 : %s \t lat2 : %s \t lon2 : %s \t alias : %s', lat1, lon1, lat2, lon2, alias)
        
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
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    
    
    this.getLocationFromAlias = function(query, alias, ready){
        
        log.info('getLocationFromAlias called')
        log.info('query : %s \t alias : %s', query, alias)
        
        var params = '?' + alias + '=' + query
        
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/location/from-alias' + params
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }      
    
    // reports
    this.getActiveUserCount = function(date, ready){

        log.info('getActiveUserCount called \t date : %s', date.toJSON())
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/activeusers/?date='+date.toJSON()
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
        
    this.getResponseReport = function(start, end, precision, ready){

        log.info('getResponseReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)

        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getAppOpensReport = function(start, end, precision, ready){

        log.info('getAppOpensReportcalled \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/opens/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }

    this.getTimeInAppReport = function(start, end, precision, ready){

        log.info('getTimeInAppReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/timeinapp/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getOptInReport = function(start, end, precision, ready){

        log.info('getOptInReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/optins/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getOptOutReport = function(start, end, precision, ready){

        log.info('getOptOutReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/optouts/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }
    
    this.getPushReport = function(start, end, precision, ready){

        log.info('getPushReport called \t start : %s \t end : %s \t precision : %s', start.toJSON(), end.toJSON(), precision)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/sends/?start='+start.toJSON()+'&end='+end.toJSON()+'&precision='+precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    
    
    this.getResponseListing = function(start, end, limit, ready){

        log.info('getReponseListing called \t start : %s \t end : %s \t limit : %s', start.toJSON(), end.toJSON(), limit)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/list/?start='+start.toJSON()+'&end='+end.toJSON()+'&limit='+limit
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    
    
    this.getIndividualResponseStatistics = function(pushID, ready){

        log.info('getIndividualResponseStatistics called \t push id : %s',pushID)
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/responses/'+pushID
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }       
    
    this.getStatistics = function(start, end, ready){

        log.info('getStatistics called \t start : %s \t end : %s', start.toJSON(), end.toJSON())    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/push/stats/?start='+start.toJSON()+'&end='+end.toJSON()
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    
    
    // per push
    this.getPerPush = function(pushID, ready){

        log.info('getPerPush called \t push id : %s',pushID)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/detail/'+pushID
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }     

    this.getPerPushSeries = function(pushID, ready){

        log.info('getPerPushSeries called \t push id : %s',pushID)
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+pushID
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    

    this.getPerPushSeriesWithPrecision = function(pushID, precision, ready){

        log.info('getPerPushSeriesWithPrecision called \t push id : %s \t precision : %s',pushID, precision)    
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+ pushID + '?precision=' + precision
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }
        
        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    

    this.getPerPushSeriesWithPrecisionAndRange = function(pushID, start, end, precision, ready){

        log.info('getPerPushSeriesWithPrecisionAndRange called \t push id : %s \t start : %s \t end : %s \t precision : %s',pushID, start.toJSON(), end.toJSON(), precision)        
    
        var options = {
              method: 'GET'
            , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
            , url: 'https://go.urbanairship.com/api/reports/perpush/series/'+ pushID + '?precision=' + precision + '&start=' + start.toJSON() + '&end=' + end.toJSON()
            , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
        }

        log.debug('Making HTTP request with options %s', JSON.stringify(options))        
        
        request(options, function(error, response, body){
                var data = {}
                self.processApiResponse(error, response, body, data, ready)
        })
        
    }    
    
    ///////////////////////////////////////////////////////////////////////////////
    this.responseLUT = function name(path, method) {
        
        // there is no elegant solution to this problem
        // every endpoint has different behavior and pertinent data        
        // handle them all by parsing the endpoint and using an awful if/else chain
        // this is where the sausage gets made
         
        var primaryPathName = path.split('/')[2]
        var secondaryPathName = path.split('/')[3]
        var thirdPathName = path.split('/')[4]
        
        if (secondaryPathName === undefined) {
            secondaryPathName = ""
        }
        
        log.debug('Calling responseLUT | path: %s | method: %s', path, method)
        
        // Push
        if (primaryPathName === 'push' && method === 'POST') {
            return 'object'
        }
        
        // Schedules
        if (primaryPathName === 'schedules' && method === 'POST') {
            return 'object'
        }

        if (primaryPathName === 'schedules' && method === 'GET') {
            return 'object'
        }

        if (primaryPathName === 'schedules' && method === 'PUT') {
            return 'object'
        }

        if (primaryPathName === 'schedules' && method === 'DELETE') {
            return 'none'
        }

        // Device Listing
        // get apids
        if (primaryPathName === 'apids' && secondaryPathName.length === 0 && method === 'GET') {
            return 'apids'
        }        
        
        // get single apid
        if (primaryPathName === 'apids' && secondaryPathName.length !== 0 && method === 'GET') {
            return 'object'
        }        
        
        // get device tokens
        if (primaryPathName === 'device_tokens' && secondaryPathName.length === 0 && method === 'GET') {
            return 'device_tokens'
        }        
        
        // get single device token
        if (primaryPathName === 'device_tokens' && secondaryPathName.length !== 0 && method === 'GET') {
            return 'object'
        }        
        
        // Tags
        if (primaryPathName === 'tags' && method === 'POST') {
            return 'none'
        }             

        if (primaryPathName === 'tags' && method === 'GET') {
            return 'tags'
        }             
        
        if (primaryPathName === 'tags' && method === 'PUT') {
            return 'none'
        }        

        if (primaryPathName === 'tags' && method === 'DELETE') {
            return 'none'
        }        

        // Segments        
        // single segment
        if (primaryPathName === 'segments' && secondaryPathName.length > 0 && method === 'GET') {
            return 'object'
        }
        
        // multiple segments
        if (primaryPathName === 'segments' && secondaryPathName.length === 0 && method === 'GET') {
            return 'segments'
        }
        
        // create a segment
        if (primaryPathName === 'segments' && method === 'POST') {
            return 'none'
        }

        // change segment
        if (primaryPathName === 'segments' && method === 'PUT') {
            return 'none'
        }        
        
        // delete segment
        if (primaryPathName === 'segments' && method === 'DELETE') {
            return 'none'
        }        
        
        // Reports
        if (primaryPathName === 'reports' && secondaryPathName === 'activeusers' && method === 'GET') {
            return 'object'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'perpush' && method === 'GET') {
            return 'object'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'sends' && method === 'GET') {
            return 'sends'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'opens' && method === 'GET') {
            return 'opens'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'responses' && thirdPathName === "list" && method === 'GET') {
            // getResponseListing()
            return 'pushes'
        
        }
        
        if (primaryPathName === 'reports' && secondaryPathName === 'responses' && thirdPathName.length === 0 && method === 'GET') {
            // getResponseReport()
            return 'responses'
        
        }
        
        if (primaryPathName === 'reports' && secondaryPathName === 'responses' && thirdPathName.length > 6 && method === 'GET') {
            // getIndividualResponseStatistics()
            return 'object'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'timeinapp' && method === 'GET') {
            return 'timeinapp'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'optins' && method === 'GET') {
            return 'optins'
        }

        if (primaryPathName === 'reports' && secondaryPathName === 'optouts' && method === 'GET') {
            return 'optouts'
        }

        if (primaryPathName === 'push' && secondaryPathName === 'stats' && method === 'GET') {
            return 'object'
        }
        
        if (primaryPathName === 'location' && method === 'GET') {
            return 'object'
        }
        
    }
    
    this.processApiResponse = function(error, response, body, data, ready){
    
        log.debug('processApiResponse called')
        log.debug('response status code %s', response.statusCode)        

        log.debug('error %s', error)
        
        log.debug('body length %s', body.length)
        log.debug('body : %s', body)

        log.debug('Looking up API response type...')
        
        var apiResponseType = this.responseLUT(response.request.uri.pathname, response.req.method);
        log.debug('API reponse type : ' + apiResponseType)

        // possible options at this point
        /*
            ==
            if 'none' is pertinent data? {
                call ready(null, { "status_code" : response.statusCode })
            } else if 'object' is the pertinent data {
                call ready(null, JSON.parse(data))
            } else {
                if 'next_page' is undefined {
                    this is the last of the results 
                    append the pertinent information to 'data'
                    call ready(null, data)
                } else {
                    append the pertinent information to 'data'
                    send another request with the updated URL
                }
            }
            
        */
        // 
        
        if (apiResponseType === 'none') {

            log.debug('API response type was \'none\'.')
            log.debug('Calling final callback function passing the status code and null data.')
            log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: null }))

            ready(null, { status_code: response.statusCode, data:null })
            return
        
        } else if (apiResponseType === 'object') {
            
            log.debug('API response type was \'object\'')
            
            try {
                
                log.debug('Trying to parse body as JSON object')                
                var b = JSON.parse(body)
                log.debug('Succeeded parsing body as JSON object')
                
                log.debug('Calling final callback function passing the status code and returning a javascript object as the data.')
                log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: b }))
                
                ready( null, { status_code: response.statusCode, data: b } )
                
            } catch(e) {
                
                log.debug('Failed trying to parse body as JSON object')
                log.debug('Calling final callback function passing the status code and returning simple text string as the data.')
                log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: body }))
                
                ready( null, { status_code: response.statusCode, data: body } )
                
            }
            return
            
        } else {
            
            log.debug('API response type \'%s\' possibly has a next page', apiResponseType)
            
            if (body.length === 0) {
                // there is a 504, all hell is breaking loose
                // sometimes the last page of a series of requests is empty and will time out
                
                log.debug("last page returned zero byte body with response code %s", response.statusCode)
                log.debug('Calling final callback function passing the status code and returning array of objects as the data.')
                log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: data }))
                
                ready( null, { status_code: response.statusCode, data: data } )
                return
            }
            
            var d = JSON.parse(body);
                 
            if (data[apiResponseType] === undefined) {
                console.log('Creating Array in data object')
                data[apiResponseType] = []
            }                 

            log.debug('Appending %s elements in the body to the data array', d[apiResponseType].length)
            d[apiResponseType].forEach(function(item){
            
                data[apiResponseType].push(item)
                
            })
                        
            if (d.next_page === undefined) {
            
                log.debug('next_page was undefined')
                
                // run the callback
                log.debug('Calling final callback function passing the status code and returning array of objects as the data.')
                log.debug('returned data : %s', JSON.stringify({ status_code: response.statusCode, data: data }))
                
                ready( null, { status_code: response.statusCode, data: data } )
                return
            
            } else {
                
                log.debug('getting next page: %s', d.next_page)

                // run the request again with the URI found in the next page
                var options = {
                      method: response.req.method
                    , auth: { user: this.appKey, pass: this.appSecret, sendImmediately: true }
                    , url: d.next_page
                    , header: { 'Accept' : 'application/vnd.urbanairship+json; version=3; charset=utf8;' }   
                }
                
                log.debug('Making HTTP request with options %s', JSON.stringify(options))                        
                
                request(options, function(error, response, body){
                        self.processApiResponse(error, response, body, data, ready)
                })                  
                
            }
            
        }
        
    }
    
    
}