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

####Sending a push