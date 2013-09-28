var fs = require('fs')
var UA = require("./API_Client.js")

var credentials = JSON.parse(fs.readFileSync('./keys.json', 'utf-8'))

var UA = require("./API_Client.js")

var DeviceType = UA.DeviceType
var Push = UA.Push
var Notification = UA.Notification
var Selector = UA.Selector
var Message = UA.Message
var Segment = UA.Segment
var Location = UA.Location
var Schedule = UA.Schedule


var client = new UA.API_Client(credentials.appKey, credentials.appSecret);
// var client = new UA.API_Client('LXpz7sNxTtSJkZDIutJmZw', 'jLfd3TjKSzejKNvon7aBiA')
// var client = new UA.API_Client('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg') // standard push example

/// Staging

////////////////////////////////
/// Handled

// Device Listing
    // client.getApids(displayResults)
    // client.getApid("c3800096-29ba-4453-8609-208a178c7ba1", displayResults)
    // client.getDeviceTokens(displayResults)
    // client.getDeviceToken('FFCADA8910C23390FA9220C462F12B23D446F236D0D3871277B63871CFBD279A', displayResults)

// Tags
    // client.getTags(displayResults)
    // client.createTag("library", displayResults)
    // client.deleteTag("library", displayResults)

// Segments
    // client.getSegments(displayResults);
    // client.getSegment('0180abda-db50-4eda-860a-aa74cfe4c90d', displayResults)
    // client.deleteSegment('682d62a6-ef11-4000-9a8e-b32d9aa9376c', displayResults)
    // client.changeSegment('287867ca-b603-46ae-b6fd-eac52ba1675b', seg, displayResults)
    // client.createSegment(seg, displayResults);

// Push
    var n = new Notification(); n.setAlert("from API updated"); n.setDeviceType("all")
    var p = new Push(); p.addNotification(n) 
    // client.sendPush(p, displayResults)

// Schedule

    var s = new Schedule();
        s.setName('scheduled_by_api');
        s.setDate(new Date(2014,0,1));
        s.setPush(p)

    //client.schedulePush(s, displayResults)
    // client.listSchedules(displayResults)
    // client.listSchedule('a1b8a9cc-7155-402f-ac98-de0ae06f7361', displayResults)
    // client.updateSchedule('a1b8a9cc-7155-402f-ac98-de0ae06f7361', s, displayResults)  
    client.deleteSchedule('a1b8a9cc-7155-402f-ac98-de0ae06f7361', displayResults)
    
      
                          
// Reports                 
    // client.getPushReport(new Date(2013,1,1), new Date(2013,6,5), 'MONTHLY', displayResults)
    // client.getPushReport(new Date(2012,0,1), new Date(2013,8,30), 'DAILY', displayResults)
    // client.getAppOpensReport(new Date(2012,0,1), new Date(2013,8,30), 'DAILY', displayResults)
    // client.getTimeInAppReport(new Date(2012,0,1), new Date(2013,8,30), 'DAILY', displayResults)
    // client.getOptInReport(new Date(2013,0,1), new Date(2013,8,30), 'DAILY', displayResults)
    // client.getOptOutReport(new Date(2013,0,1), new Date(2013,8,30), 'DAILY', displayResults)
    // client.getActiveUserCount(new Date(2013,0,1), displayResults)

    // client.getResponseListing(new Date(2013,0,1), new Date(2013,1,30), 100, displayResults)
    // client.getResponseReport(new Date(2013,0,1), new Date(2013,8,30), 'DAILY', displayResults)
    // client.getIndividualResponseStatistics('9012ad1a-59fd-11e2-8074-d4bed9a88504', displayResults)

    // client.getStatistics(new Date(2013,1,1), new Date(2013,1,2), displayResults)

    // client.getPerPush('9012ad1a-59fd-11e2-8074-d4bed9a88504', displayResults)
    // client.getPerPushSeries('9012ad1a-59fd-11e2-8074-d4bed9a88504', displayResults)
    // client.getPerPushSeriesWithPrecision('9012ad1a-59fd-11e2-8074-d4bed9a88504', 'DAILY', displayResults)
    // client.getPerPushSeriesWithPrecisionAndRange('9012ad1a-59fd-11e2-8074-d4bed9a88504', new Date(Date.UTC(2013,0,9)), new Date(Date.UTC(2013,0,10)), 'DAILY', displayResults)

// Location
    // client.getLocationFromString('Memphis,TN','city',displayResults);
    // client.getLocationFromString('Memphis,TN',null,displayResults);
    // client.getLocationFromString('92705', 'postalcode', displayResults);
    // client.getLocationFromLatLong(37.7749295, -122.4194155, 'city', displayResults)
    // client.getLocationFromLatLongBounds(32.528832,-124.482003,42.009517,-114.131211,'postalcode',displayResults)
    
    // client.getLocationFromAlias("CA", "us_state", displayResults)    


//////////////////////////////////////////////////
/// Not Handled

// build audience

var s2 = new Selector('or')
    s2.addTag('notSnarf', true)

var s = new Selector('and')
    s.addTag('snarf')
        
    var l = new Location()
    l.setId("00xb78Jw3Zz1TyrjqRykN9")
    // l.setTimeAbsolute(new Date(2013,09,01), new Date(2013,12,01), "months")
    l.setTimeRelative(4, "months")
        
    // s.addLocation(l, true)

    s.addSelector(s2, true)

var seg = new Segment("API_test_with_Segments");
    seg.setCriteria(s);

// console.log(JSON.stringify(seg,null,4))




function displayResults(error, data) {
    
    console.log('///////////////////////////////////////////')
    console.log('Made it to the final callback')
    console.log('Error : ' + error)
    console.log('Status Code : ' + data.status_code)
    console.log('Data  : ' + data )
    console.log('Data String : ')
    console.log('--------------')
    console.log(JSON.stringify(data,null,2))
    
}

