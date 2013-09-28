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

##List of API Endpoints, Methods, and Response Formats

| Name | Method | Endpoint  | Reponse Format   |
| ---- | ------ | --------- | ---------------  |
| Push | POST | /api/push/ | { "ok":boolean, "operation_id" : UUID, "push_ids" : [] }  |
| Validate | POST | /api/push/validate | not documented |
| Create Schedule | POST | /api/schedules/ | { "ok":boolean, "operation_id" : UUID, "schedule_urls" : [] } |
| List Schedules | GET | /api/schedules/ | { "ok":boolean, "count" : integer, "schedules" : [] } |
| List Specific Schedule | GET | /api/schedules/(id) | { "name" : String, "schedule" : {}, "push" : {} |
| Update Schedule | PUT | /api/schedules/(id) | { "ok": boolean, "operation_id" : UUID } |
| Delete Schedule | DELETE | /api/schedules/(id) | No content. (e_e) |
| Tag Listing | GET | /api/tags/ | { "tags": [] } |
| Tag Creation | PUT | /api/tags/(tag) | Not documented. Rely on Status Code. |
| Adding / Removing Devices From a Tag | POST | /api/tags/(tag) | Rely on Status Code. |
| Delete a Tag | DELETE | /apit/tags/(tag) | Rely on Status Code. |
| Active User Count | GET | /api/reports/activeusers/?date=(date) | { "android" : integer, "ios" : integer } |
| Individual Response Statistics | GET | /api/reports/responses/(push_id) | { "push_uuid": UUID , "direct_responses": integer , "sends": integer , "push_type": "UNICAST_PUSH", "push_time": Date() } |