###HOWTO Urban Airship Server Library (Alpha 1)

npm requirements: request, log

Import the module.

```
var UA = require('./APIClient.js')
```
Create a client using the app key and master secret.
```
var client = new UA.APIClient( app_key , master_secret)
```
This defaults to log level : 'info', and appends to a file called urban_airship.log.  You can include your own log settings.
```
var client = new UA.APIClient( app_key , master_secret, { loglevel: 'debug', filename: './logs/debug.log', append: 'false' });
```
Keep in mind, the debug log level will expose your master_secret in the log file when it logs the HTTP payload.

####Sending a Push Notification
A Push Notification can be comprised of a number of notifications to different device types, each with their own extra payload information.  Or it could be a simple alert sent to every device type configured for the account.  A Push Notification is also be paired with an Audience Selector, which can be a complex decision tree of tags and locations, or 'all.'  The Push Notification can also send a Rich Message.

Create a ```Notification``` object:
```
var n = new Notification
```
Set the alert text for the notification:
```
n.setAlert('this is an alert')
```
Set the device types ('all', 'ios', or 'android'):
```
n.setDeviceType('all')
```
Create a ```Push``` object:
```
var p = new Push
```
Add the notification to the Push object:
```
p.addNotification(n)
```
Send the Push Notification with the ```client``` singleton.
```
client.sendPush(p, displayResults)
```
The payload for that Push notification resolved to this JSON:
```
{ device_types: 'all',
  notification: { alert: 'this is an alert' },
  audience: 'all' }
```
To add an Android specific alert you would create another Notification object and set the device type as 'android'
```
var androidNotification = new Notification;
    androidNotification.setAlert('android only payload')
    androidNotification.setDeviceType('android')

var iosNotification = new Notification;
    iosNotification.setAlert('ios only notification')
    iosNotification.setDeviceType('ios')

var p = new Push; 
    p.addNotification(androidNotification)
    p.addNotification(iosNotification)    
```
The payload for the Push Notification with Android and iOS specific alerts resolved to this JSON:
```
{ device_types: [ 'android', 'ios' ],
  notification: 
   { android: { alert: 'android only payload' },
     ios: { alert: 'ios only notification' } },
  audience: 'all' }
```
The ```device_types``` array is built from parsing the ```Notification``` objects added to the ```Push``` object.

####Sending a Push Notification with an Audience Selector
Urban Airship provides audience segmentation using tags and location.  The audience selector can be a very simple boolean conditional or a complex decision tree.

Create a ```Selector``` object.