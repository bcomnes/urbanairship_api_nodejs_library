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

// var client = new UA.API_Client('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg')
// var client = new UA.API_Client('LXpz7sNxTtSJkZDIutJmZw', 'jLfd3TjKSzejKNvon7aBiA')

// var client = new UA.API_Client(credentials.appKey, credentials.appSecret);

var client = new UA.API_Client('p5q0bOSXQcCRmqRbiv88Hg', 'XBdMRIFYRau9FFHEbIOBTQ') // redbox

// client.getSegments(displayResults);
// client.getSegment('65e4bde8-5135-4898-871a-54b035e9741d', displayResults)

// client.getPushReport(new Date(2013,1,1), new Date(2013,6,5), 'MONTHLY', recurisveResults)
client.getPushReport(new Date(2013,8,23), new Date(2013,8,30), 'DAILY', displayResults)

// build audience
/*
var s2 = new Selector('or')
    s2.addTag('notSnarf', true)

var s = new Selector('and')
    s.addTag('snarf')
        
    var l = new Location()
    l.setId("00xb78Jw3Zz1TyrjqRykN9")
    // l.setTimeAbsolute(new Date(2013,09,01), new Date(2013,12,01), "months")
    l.setTimeRelative(4, "months")
        
    s.addLocation(l, true)

    s.addSelector(s2, true)

var seg = new Segment("API_test_with_Segment");
    seg.setCriteria(s);

console.log(JSON.stringify(seg,null,4))

client.createSegment(seg, displayResults);
*/
// client.getLocationFromString('Memphis,TN','city',displayResults);
// client.getLocationFromString('Memphis,TN',null,displayResults);
// client.getLocationFromString('92705', 'postalcode', displayResults);
// client.getLocationFromLatLong(37.7749295, -122.4194155, 'hasc', displayResults)
    
// client.getLocationFromAlias("CA", "us_state", displayResults)    


// client.deleteSegment('682d62a6-ef11-4000-9a8e-b32d9aa9376c', displayResults)

// client.changeSegment('287867ca-b603-46ae-b6fd-eac52ba1675b', seg, displayResults)
// client.sendPush(p, displayResults)
// client.getApids(displayResults)
// client.getApid("b7962a6b-4c54-456d-91d1-de1466788db2", displayResults)

// client.getDeviceTokens(displayResults)

// client.getDeviceToken('068A81174355005612A4BA390B99E6F7BC7567F754C54D1B079EABAC8340A1E1', displayResults)
// client.getTags(displayResults)
// client.createTag("library", displayResults)
// client.deleteTag("library", displayResults)


    // p.setMessage(m)
    // p.setAudience(s)
    
    //console.log(JSON.stringify(p.toJSON(),null,4))


function displayResults(error, data) {
    
    console.log("Made it to the final callback")
    console.log("Error : " + error)
    console.log("Data  : " + data )
    
    if (error !== null || data === null) {
        console.log("ERROR " + error)
    } else {
        
        try {
            var keys_array = Object.keys(data)
            // console.log(keys_array)
            console.log(JSON.stringify(data,null,4))

        } catch(e) {
            // console.log("no keys in return object")
            
        }

    }
}

