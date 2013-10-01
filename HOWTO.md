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

Create a ```Notification``` object.
```
var n = new Notification
```
Set the alert text for the notification
```
n.setAlert('this is an alert')
```
Set the device types ('all', 'ios', or 'android')
```
n.setDeviceType('all')
```
