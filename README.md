###TODO

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
* Testing this is a bitch.
  * [X] Some API endpoints return JSON object
  * [X] Some API endpoints return JSON object that is an array
  * [X] Some API endpoints *NOTHING*
  * [X] Some API endpoints return non JSON text
  * [X] Sort this out.
  
###List of API Endpoints, Methods, and Response Formats

| ? | Name | Method | Endpoint  | Reponse Format   |
| ------------ | ---- | ------ | --------- | ---------------  |
| X | Push | POST | /api/push/ | { "ok" : boolean, "operation_id" : UUID, "push_ids" : [] }  |
| O | Validate | POST | /api/push/validate | Rely on Status Codes. |
| O | Create Schedule | POST | /api/schedules/ | { "ok":boolean, "operation_id" : UUID, "schedule_urls" : [] } |
| O | List Schedules | GET | /api/schedules/ | { "ok":boolean, "count" : integer, "schedules" : [] } |
| O | List Specific Schedule | GET | /api/schedules/(id) | { "name" : String, "schedule" : {}, "push" : {} } |
| O | Update Schedule | PUT | /api/schedules/(id) | { "ok": boolean, "operation_id" : UUID } |
| O | Delete Schedule | DELETE | /api/schedules/(id) | Rely on Status Codes |
| X | Tag Listing | GET | /api/tags/ | { "tags": [] } |
| X | Tag Creation | PUT | /api/tags/(tag) | Rely on Status Code. |
| O | Adding / Removing Devices From a Tag | POST | /api/tags/(tag) | Rely on Status Code. |
| X | Delete a Tag | DELETE | /apit/tags/(tag) | Rely on Status Code. |
| O | Active User Count | GET | /api/reports/activeusers/?date=(date) | { "android" : integer, "ios" : integer } |
| O | Individual Response Statistics | GET | /api/reports/responses/(push_id) | { "push_uuid": UUID , "direct_responses": integer , "sends": integer , "push_type": "UNICAST_PUSH", "push_time": Date() } |
| O | Push Report | GET | /api/reports/sends/?start=(date)&end=(date)&precision=(precision) | { "sends" : [], "next_page" : String, "prev_page" : String }
| O | Push Reponse Report | GET | /api/reports/responses/?start=(date)&end=(date)&precision=(precision) | { "responses" : [], "next_page" : String, "prev_page" : String }
| O | Response Listing | GET | /api/reports/responses/list?start=(date)&end=(date)&limit=(int) | { "pushes" : [], "next_page" : String, "prev_page" : String }
| O | App Opens Report | GET | /api/reports/opens/?start=(date)&end=(date)&precision=(precision) | { "opens" : [] , "next_page" : String, "prev_page" : String }
| O | Time in App Report | GET | /api/reports/timeinapp/?start=(date)&end=(date)&precision=(precision) | "timeinapp" : [], "next_page" : String, "prev_page" : String }
| O | Opt-in Report | GET | /api/reports/optins/?start=(date)&end=(date)&precision=(precision) | { "optins" : [], "next_page" : String, "prev_page" : String }
| O | Opt-out Report | GET | /api/reports/optouts/?start=(date)&end=(date)&precision=(precision) | { "optouts" : [] , "next_page" : String, "prev_page" : String }
| O | Statistics | GET | /api/push/stats/?start=(start_time)&end=(end_time) | Not documented. |
| O | Per Push Reporting | GET | /api/reports/perpush/detail/(push_id) | {} |
| O | Per Push Reporting Series | GET | /api/reports/perpush/series/(push_id) | {} |
| O | Per Push Reporting Series with Precision | GET | /api/reports/perpush/series/(push_id)?precision=(precision) | {} |
| O | Per Push Reporting Series with Precision & Range | GET | /api/reports/perpush/series/(push_id)?precision=(precision)&start=(start_time)&end=(end_time) | {} |
| X | Individual Device Lookup, Device Token | GET | /api/device_tokens/(device_token) | {} |
| X | Individual Device Lookup, APID | GET | /api/apids/(APID) | {} |
| X | Device Listing, Device Tokens | GET | /api/device_tokens/ | { "device_tokens" : [], "next_page" : String, "device_tokens_count" : integer }
| X | Device Listing, APIDs | GET | /api/apids/ | { "apids" : [], "next_page" : String, "device_tokens_count" : integer }
| O | Segments Listing | GET | /api/segments/ | { "segments" : [], "next_page" : String, "prev_page" : String }
| O | Individual Segment Lookup | GET | /api/segments/(segment_id) | {} |
| O | Create Segment | POST | /api/segments/ | Rely on Status Codes |
| O | Change Segment | PUT | /api/segments/(segment_id) | Rely on Status Codes. |
| O | Delete Segment | DELETE | /api/segments/(segment_id) | Rely on Status Codes. |
| O | Location Lookup By String | GET | /api/location/?q=(String)&type=(String) | { "features" : [] } |
| O | Location Lookup by Lat/Lon | GET | /api/location/(latitude),(longitude)?type=(boundary_type) | { "features" : [] } |
| O | Location Lookup by Lat/Lon Box | GET | /api/location/(latitude_1),(longitude_1),(latitude_2),(longitude_2)&type=(boundary_type) | { "features" : [] } |
| O | Location Lookup by Alias | GET | /api/location/from-alias?(String)=(String) | {} |

