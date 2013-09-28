###TODO
* Testing this is a bitch.
  * Some API endpoints return JSON object
  * Some API endpoints return JSON object that is an array
  * Some API endpoints *NOTHING*
  * Some API endpoints return non JSON text
  * [] Sort this out.
* Add Logging
* Add Schedule Push
* Feedback
* Tags
  * [] Adding & Removing Devices from a tag
* Add Pagination Recursion
  * [X] check the parse the HTTP response for the API endpoint and continue the query
  * [X] use the possibly recursive intermediate callback function on all API requests
  * [X] the last function should have accept (error, data) as arguments
* Reports
  * [] active users
  * [] individual push response
  * [X] push report
  * [X] response report
  * [] response listing
  * [X] app opens
  * [X] time in app
  * [X] opt-in
  * [X] opt-out
  * [] statistics
  * [] per push detail
  * [] per push series
  * [] per push series with precision
  * [] per push series with precision and range
* Add Location Lookup
  * [] it's complicated
* [x] Add Location to Selector
  * [] fix weeks resolution for absolute time
* [X] Create elegant "not" behavior in audience selector
* [X] Add Rich Message
* [X] Add Segment to Selector
* [X] Implement Full Payload Spec
  * [X] iOS
  * [X] Android
* [x] Segments
  * [x] create
  * [x] get single
  * [x] get all
  * [x] delete
  * [x] change

##List of API Endpoints

| Method | Endpoint  | reponse format   |
| ------ | --------- | ---------------  |
| POST | /api/push | { "ok":boolean, "operation_id" : UUID, "push_ids" : [] }  |
| POST | /api/push/validate | |
| POST | /api/schedules | |
| GET | /api/schedules | |
| GET | /api/schedules/(id) | |
| PUT | /api/schedules/(id) | |
| DELETE | /api/schedules/(id) | |

