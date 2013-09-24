var UA = require("./API_Client.js")

var DeviceType = UA.DeviceType
var Push = UA.Push
var Notification = UA.Notification
var Selector = UA.Selector
var Message = UA.Message
var Segment = UA.Segment

// var client = new UA.API_Client('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg')
// var client = new UA.API_Client('LXpz7sNxTtSJkZDIutJmZw', 'jLfd3TjKSzejKNvon7aBiA')

// build audience
var s = new Selector('and')
    s.addTag('snarf')
    
    var s2 = new Selector('or')
    s2.addTag('bar')
    s2.addTag('bazzzzzzz')
    s.addSelector(s2)

var seg = new Segment("API_test");
    seg.setCriteria(s);
    
    // console.log(JSON.stringify(seg.toJSON(),null,4))

//client.getLocationFromString('Memphis,TN','city',displayResults);

client.getLocationFromString('92705', 'postalcode', displayResults);
// client.getLocationFromLatLong(37.7749295, -122.4194155, 'postalcode', displayResults)
    
// client.getLocationFromAlias("CA", "us_state", displayResults)    
    
// client.createSegment(seg, displayResults);
// client.getSegments(displayResults);
// client.deleteSegment('682d62a6-ef11-4000-9a8e-b32d9aa9376c', displayResults)
// client.getSegment('287867ca-b603-46ae-b6fd-eac52ba1675b', displayResults)
// client.changeSegment('287867ca-b603-46ae-b6fd-eac52ba1675b', seg, displayResults)
// client.sendPush(p, displayResults)
// client.getApids(displayResults)
// client.getApid("b7962a6b-4c54-456d-91d1-de1466788db2", displayResults)
// client.getDeviceTokens(displayResults)
// client.getDeviceToken('068A81174355005612A4BA390B99E6F7BC7567F754C54D1B079EABAC8340A1E1', displayResults)
// client.getTags(displayResults)
// client.createTag("library", displayResults)
// client.deleteTag("library", displayResults)

/*
// build notification
var n = new Notification()
    n.setDeviceType(new DeviceType().ALL)
    n.setAlert('YAY. BASIC ALERT.')

var n2 = new Notification()
    n2.setDeviceType(new DeviceType().IOS)
    n2.setAlert('YAY IOS.')
    n2.setBadge(33)
    n2.addExtra('url', 'http://apple.com')

var n3 = new Notification()
    n3.setDeviceType(new DeviceType().ANDROID)
    n3.setAlert('YAY Android. New Push Sample.')
    n3.addExtra('url', 'http://google.com')

var m = new Message()
    m.setTitle('from nodejs API')
    m.setBody('<html><body><h1>blah blah</h1> etc...</html>')

// build push
var p = new Push()
    p.addNotification(n)
    p.addNotification(n2)

    p.setMessage(m)
    // p.setAudience(s)
    
    //console.log(JSON.stringify(p.toJSON(),null,4))
*/

function displayResults(error, response, body) {

    console.log();

    if (error !== null) {
        console.log("Error");
        console.log(error);
    }

    console.log("Response Status Code : " + response.statusCode);
    
    console.log("Body : ");
    
    try {
        console.log(JSON.stringify(JSON.parse(body),null,2));
    } catch(e) {
        console.log(body)
    }
    
}
