var UA = require("./API_Client.js")

var DeviceType = UA.DeviceType
var Push = UA.Push
var Notification = UA.Notification
var Selector = UA.Selector
var Message = UA.Message

console.log(UA);

// var client = new UA.API_Client('YPDu34kcS6q42ioANsv8KA', 'IXGz8cn_TdmnSJ44N6ssAg')
var client = new UA.API_Client('LXpz7sNxTtSJkZDIutJmZw', 'jLfd3TjKSzejKNvon7aBiA')

// build audience
var s = new Selector('AND')
    s.addTag('snarf')
    
    var s2 = new Selector('OR')
    s2.addTag('bar')
    s2.addTag('baz')
    //s.addSelector(s2)

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
    m.setTitle("from nodejs API")
    m.setBody("<html><body><h1>blah blah</h1> etc...</html>")

// build push
var p = new Push()
    p.addNotification(n)
    p.addNotification(n2)

    p.setMessage(m)
    // p.setAudience(s)
    
    console.log(JSON.stringify(p.toJSON(),null,4))

client.sendPush(p, displayResults)

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
    
    console.log("Body : ");    
    console.log(JSON.stringify(JSON.parse(body),null,2));
    
}
