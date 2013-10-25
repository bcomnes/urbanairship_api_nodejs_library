var fs = require('fs')
var UA = require("./APIClient.js")

//var credentials = JSON.parse(fs.readFileSync('./keys.json', 'utf-8'))

var DeviceType = UA.DeviceType
var Push = UA.Push
var Notification = UA.Notification
var Selector = UA.Selector
var Message = UA.Message
var Segment = UA.Segment
var Location = UA.Location
var Schedule = UA.Schedule
var Tag = UA.Tag

//var client = new UA.APIClient(credentials.appKey, credentials.appSecret, { loglevel: 'debug', filename: './logs/debug.log', append: true });
// var client = new UA.APIClient('LXpz7sNxTtSJkZDIutJmZw', 'jLfd3TjKSzejKNvon7aBiA')
var client = new UA.APIClient('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg') // standard push example

// Device Listing
    client.getApids(displayResults)
     client.getApid("c3800096-29ba-4453-8609-208a178c7ba1", displayResults)
     client.getDeviceTokens(displayResults)
     client.getDeviceToken('FFCADA8910C23390FA9220C462F12B23D446F236D0D3871277B63871CFBD279A', displayResults)

// Tags
    client.getTags(displayResults)
     client.createTag("library", displayResults)
     client.deleteTag("library", displayResults)

     var t = new Tag
         t.setName("nodejs_lib_tag")
         t.addDeviceToken('FFCADA8910C23390FA9220C462F12B23D44E6F236D0D3871277B63871CFBD27D')
         t.addDeviceToken('FFCADA8910C23390FA9220C462F12B23D446F236D0D3871277B63871CFBD2793')
         t.removeDeviceToken('EFCADA8910C23390FA9220C462F12B23D446F236D0D3871277B63871CFBD279A')
         client.tagDevices(t, displayResults)

                   
                   
                   
                   
// Push

    
/*    
    var androidNotification = new Notification;
    androidNotification.setAlert('android only payload')
    androidNotification.setDeviceType('android')
    
    var iosNotification = new Notification;
    iosNotification.setAlert('ios only notification')
    iosNotification.setDeviceType('ios')
*/

var selector = new Selector('or')
    selector.addSegment('dc3b24c6-fdd4-499a-809f-4c61b2df11c9', true)
    selector.addSegment('e6659cab-5309-40a9-b95c-428c6a9a3c80')
    
    selector.addTag('derp')
    selector.addDeviceToken('FFCADA8910C23390FA9220C462F12B23D44E6F236D0D3871277B63871CFBD27D')
    
var seg = new Segment();
    seg.setName('API_test_with_segments_of_segments')
    seg.setCriteria(selector);

    // console.log("segment payload")
    // console.log(JSON.stringify(seg,null,2))
    // client.createSegment(seg, displayResults)
// Segments
     client.getSegments(displayResults);
     client.getSegment('ee8b1970-ccc5-4f83-98b8-7a2bc473cbcf', displayResults)
     client.deleteSegment('682d62a6-ef11-4000-9a8e-b32d9aa9376c', displayResults)
     //client.changeSegment('287867ca-b603-46ae-b6fd-eac52ba1675b', seg, displayResults)
     //client.createSegment(seg, displayResults);

var n = new Notification
    n.setAlert('deeerrppp')
    n.setDeviceType('ios')
    
var n2 = new Notification
    n2.setAlert('all derps')
    n.setDeviceType('all')

var p = new Push
    p.addNotification(n)

    p.setAudience(selector)

    console.log(JSON.stringify(p.toJSON(),null,2))

     client.validatePush(p, displayResults)


var loc0 = new Location
    loc0.setId('00xb78Jw3Zz1TyrjqRykN9')  // the location id for New York City, NY, USA
    
var loc1 = new Location
    loc1.setId('61QOVAcS2s1nYquCWg7drw')  // the location id for Memphis, TN, USA
    
    // sets the conditions of time of 'location has been in the last 4 months'
    loc0.setTimeRelative(4, 'days')
    
    // sets the conditions of time of 'location has been between August and December 2013'    
    loc1.setTimeAbsolute(new Date(2013,7,1), new Date(2013,11,1), 'months') 

var s = new Selector('and')
    s.addLocation(loc0)
    s.addLocation(loc1)

    // console.log(JSON.stringify(s.toJSON(),null,2))
    
     p.setAudience(s)
    
    // console.log(JSON.stringify(p.toJSON(),null,2))
    
     client.sendPush(p, displayResults)
    // 

// Schedule
    var s = new Schedule;
        s.setName('scheduled_by_api');
        s.setDate(new Date(2014,0,1));
        s.setPush(p)

     client.schedulePush(s, displayResults)
     client.listSchedules(displayResults)
     client.listSchedule('bc048b8f-027f-440a-ac11-ac5f57ff9d58', displayResults)
     client.updateSchedule('a1b8a9cc-7155-402f-ac98-de0ae06f7361', s, displayResults)  
     client.deleteSchedule('a1b8a9cc-7155-402f-ac98-de0ae06f7361', displayResults)

// Reports                 
     client.getPushReport(new Date(2013,1,1), new Date(2013,6,5), 'MONTHLY', displayResults)
     client.getPushReport(new Date(2012,0,1), new Date(2013,8,30), 'DAILY', displayResults)
     client.getAppOpensReport(new Date(2012,0,1), new Date(2013,8,30), 'DAILY', displayResults)
     client.getTimeInAppReport(new Date(2012,0,1), new Date(2013,8,30), 'DAILY', displayResults)
     client.getOptInReport(new Date(2013,0,1), new Date(2013,8,30), 'DAILY', displayResults)
     client.getOptOutReport(new Date(2013,0,1), new Date(2013,8,30), 'DAILY', displayResults)
     client.getActiveUserCount(new Date(2013,0,1), displayResults)

     client.getResponseListing(new Date(2013,0,1), new Date(2013,1,30), 100, displayResults)
     client.getResponseReport(new Date(2013,0,1), new Date(2013,8,30), 'DAILY', displayResults)
     client.getIndividualResponseStatistics('9012ad1a-59fd-11e2-8074-d4bed9a88504', displayResults)

     client.getStatistics(new Date(2013,1,1), new Date(2013,1,2), displayResults)

     client.getPerPush('9012ad1a-59fd-11e2-8074-d4bed9a88504', displayResults)
     client.getPerPushSeries('9012ad1a-59fd-11e2-8074-d4bed9a88504', displayResults)
     client.getPerPushSeriesWithPrecision('9012ad1a-59fd-11e2-8074-d4bed9a88504', 'DAILY', displayResults)
     client.getPerPushSeriesWithPrecisionAndRange('9012ad1a-59fd-11e2-8074-d4bed9a88504', new Date(Date.UTC(2013,0,9)), new Date(Date.UTC(2013,0,10)), 'DAILY', displayResults)

// Location
     client.getLocationFromString('Memphis,TN','city',displayResults);
     client.getLocationFromString('Street', null, displayResults);
     client.getLocationFromString('92705', 'postalcode', displayResults);
     client.getLocationFromLatLon(37.805172690644405,-122.44863510131836, 'postalcode', displayResults)
     client.getLocationFromLatLonBounds(32.528832,-124.482003,32.709517,-114.131211,'postalcode',displayResults)    
     client.getLocationFromAlias("CA", "us_state", displayResults)    

// build audience


function displayResults(err, data) {
    
    console.log('///////////////////////////////////////////')
    if (err !== null) {
        console.log("Error")
        console.log(JSON.stringify(err,null,2))
    } else {
        console.log('Status Code : ' + data.status_code)
        console.log('Data  : ' + data )
        console.log('Data String : ')
        console.log('--------------')
        console.log(JSON.stringify(data,null,2))
    }
    
}
