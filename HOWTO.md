##Urban Airship Server Library (Alpha 1) Tutorial

npm requirements: request, log

Import the module.

```javascript
var UA = require('./APIClient.js')
```
Create a client using the app key and master secret.
```javascript
var client = new UA.APIClient( app_key , master_secret)
```
This defaults to log level : 'info', and appends to a file called urban_airship.log.  You can include your own log settings.
```javascript
var client = new UA.APIClient( app_key , master_secret, { loglevel: 'debug', filename: './logs/debug.log', append: 'false' });
```
Keep in mind, the debug log level will expose your master secret in the log file when it logs the HTTP payload.

####Sending a Push Notification
A Push Notification can be comprised of a number of notifications to different device types, each with their own extra payload information.  Or it could be a simple alert sent to every device type configured for the account.  A Push Notification is also be paired with an Audience Selector, which can be a complex decision tree of tags and locations, or 'all.'  The Push Notification can also send a Rich Message.

Create a ```Notification``` object:
```javascript
var n = new UA.Notification
```
Set the alert text for the notification:
```javascript
n.setAlert('this is an alert')
```
Set the device types ('all', 'ios', or 'android'):
```javascript
n.setDeviceType('all')
```
Create a ```Push``` object:
```javascript
var p = new UA.Push
```
Add the notification to the Push object:
```javascript
p.addNotification(n)
```
Send the Push Notification with the ```client``` singleton.
```javascript
client.sendPush(p, callback)
```
The payload for that Push Notification resolved to this JSON:
```javascript

{ device_types: 'all',
  notification: { alert: 'this is an alert' },
  audience: 'all' }
```
To add an Android specific alert you would create another Notification object and set the device type as 'android'
```javascript
var androidNotification = new UA.Notification;
    androidNotification.setAlert('android only payload')
    androidNotification.setDeviceType('android')

var iosNotification = new UA.Notification;
    iosNotification.setAlert('ios only notification')
    iosNotification.setDeviceType('ios')

var p = new UA.Push; 
    p.addNotification(androidNotification)
    p.addNotification(iosNotification)    
```
The payload for the Push Notification with Android and iOS specific alerts resolved to this JSON:
```javascript
{
  "device_types": [
    "android",
    "ios"
  ],
  "notification": {
    "android": {
      "alert": "android only payload"
    },
    "ios": {
      "alert": "ios only notification"
    }
  },
  "audience": "all"
}
```
The ```device_types``` array is built from parsing the ```Notification``` objects added to the ```Push``` object.  If any ```Notification``` objects ```device_types``` are set to 'all' the ```device_types``` for the entire push payload will be set to 'all'.

####Scheduling a Push Notification
Urban Airship provides the functionality to schedule a Push Notification. 

Create a ```Schedule``` object:
```javascript
var schedule = new UA.Schedule
  schedule.setName('future push notification') // this is optional
  schedule.setDate(new Date(2014,11,25)) // required
  schedule.setPush(p) // created above
  
  client.schedulePush(schedule, callback)
```

####Sending a Push Notification with an Audience Selector
Urban Airship provides audience segmentation using Tags and Location.  The audience selector can be a very simple boolean conditional or a complex decision tree.

Create a ```Selector``` object.
```javascript
var s = new UA.Selector('and')
```
```Selector``` objects require a base boolean conditional, and you pass it in the constructor.
Add two tags to the ```Selector``` object:
```javascript
s.addTag('foo')
s.addTag('bar')
```
This ```Selector``` resolves to this JSON:
```javascript
{ and: [ { tag: 'foo' }, { tag: 'bar' } ] }
```
Now add this selector to the previously constructed Push Notification.
```javascript
p.setAudience(s)
```
Which changes the audience field in the payload, and results in a payload that looks like this:
```javascript
{
  "device_types": [
    "android",
    "ios"
  ],
  "notification": {
    "android": {
      "alert": "android only payload"
    },
    "ios": {
      "alert": "ios only notification"
    }
  },
  "audience": {
    "and": [
      {
        "tag": "foo"
      },
      {
        "tag": "bar"
      }
    ]
  }
}
```
This would result in a Push Notification being sent with iOS and Android specific alerts to your audience who are tagged with 'foo' AND 'bar'.
A ```Selector``` object created with an 'or' operator would result in a payload that looks like this:
```javascript
{
  "device_types": [
    "android",
    "ios"
  ],
  "notification": {
    "android": {
      "alert": "android only payload"
    },
    "ios": {
      "alert": "ios only notification"
    }
  },
  "audience": {
    "or": [
      {
        "tag": "foo"
      },
      {
        "tag": "bar"
      }
    ]
  }
}
```
This would result in a Push Notification being sent with iOS and Android specific alerts to your audience who are tagged with 'foo' OR 'bar'.
####Advanced Audience Selector Functionality
You can nest ```Selector``` objects within another ```Selector``` object.
```javascript
var s = new Selector('and')
    s.addTag('foo')
    
var nestedSelector = new Selector('or')
    nestedSelector.addTag('bar')
    nestedSelector.addTag('baz')
    
    s.addSelector(nestedSelector)     
```
This results in a Push Notification payload that looks like this:
```javascript
{
  "device_types": "all",
  "notification": {
    "alert": "this is an alert"
  },
  "audience": {
    "and": [
      {
        "tag": "foo"
      },
      {
        "or": [
          {
            "tag": "bar"
          },
          {
            "tag": "baz"
          }
        ]
      }
    ]
  }
}
```
Which will send the alert to any device in your audience that has the tag 'foo' AND ( tag : 'bar' OR tag: 'baz' )

####Audience Selector using Location
You can add a Location to a selector just like you would a tag or even another selector.
Create a ```Location``` object
```javascript
var loc0 = new Location
    loc0.setId('00xb78Jw3Zz1TyrjqRykN9')  // the location id for New York City, NY, USA
```
The ```Location``` object requires a time range to be specified.  You can set it by a relative time range (ex. "within the last 4 months") or an absolute time range (ex. "Between January 1, 1970 and December 31, 1999").
```javascript
var loc0 = new Location
    loc0.setId('00xb78Jw3Zz1TyrjqRykN9')  // the location id for New York City, NY, USA
    
var loc1 = new Location
    loc1.setId('61QOVAcS2s1nYquCWg7drw')  // the location id for Memphis, TN, USA
            
    // sets the conditions of time of 'location has been in the last 4 days'
    loc0.setTimeRelative(4, 'days')
    
    // sets the conditions of time of 'location has been between August and December 2013'    
    loc1.setTimeAbsolute(new Date(2013,7,01), new Date(2013,11,01), 'months') 
```
The ```setTimeRelative``` method accepts an integer ranage and resolution.

The ```setTimeAbsolute``` method accepts two javascript ```Date``` objects and a resolution.

Valid time resolutions and their corresponding ranges are:
* 'minutes' 1-120
* 'hours' 1-48
* 'days' 1-60 
* 'weeks' 1-10
* 'months' 1-48
* 'years' 1-20

**Note:** The javascript ```Date``` object constructor for month starts at zero. (e_e)

```javascript
var s = new Selector('and')
    s.addLocation(loc0)
    s.addLocation(loc1)
```
This audience selector would resolve to this JSON
```javascript
{
  "and": [
    {
      "location": {
        "id": "00xb78Jw3Zz1TyrjqRykN9",
        "date": {
          "recent": {
            "days": 4
          }
        }
      }
    },
    {
      "location": {
        "id": "61QOVAcS2s1nYquCWg7drw",
        "date": {
          "months": {
            "start": "2013-08",
            "end": "2013-12"
          }
        }
      }
    }
  ]
}
```
Which would match anyone that had been in NYC in the last 4 days, and in Memphis between August and December 2013.
####Create a Segment with a ```Selector```