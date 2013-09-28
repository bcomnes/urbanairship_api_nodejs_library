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

###List of API Endpoints, Methods, and Response Formats

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
| Push Report | GET | /api/reports/sends/?start=(date)&end=(date)&precision=(precision) | { "sends" : [], "next_page" : String, "prev_page" : String }
| Push Reponse Report | GET | /api/reports/responses/?start=(date)&end=(date)&precision=(precision) | { "responses" : [], "next_page" : String, "prev_page" : String }
| Response Listing | GET | /api/reports/responses/list?start=(date)&end=(date)&limit=(int) | { "pushes" : [], "next_page" : String, "prev_page" : String }
| App Opens Report | GET | /api/reports/opens/?start=(date)&end=(date)&precision=(precision) | { "opens" : [] , "next_page" : String, "prev_page" : String }
| Time in App Report | GET | /api/reports/timeinapp/?start=(date)&end=(date)&precision=(precision) | "timeinapp" : [], "next_page" : String, "prev_page" : String }
| Opt-in Report | GET | /api/reports/optins/?start=(date)&end=(date)&precision=(precision) | { "optins" : [], "next_page" : String, "prev_page" : String }
| Opt-out Report | GET | /api/reports/optouts/?start=(date)&end=(date)&precision=(precision) | { "optouts" : [] , "next_page" : String, "prev_page" : String }
| Statistics | GET | /api/push/stats/?start=(start_time)&end=(end_time) | Not documented. |
| Per Push Reporting | GET | /api/reports/perpush/detail/(push_id) | {} |
| Per Push Reporting Series | GET | /api/reports/perpush/series/(push_id) | {} |
| Per Push Reporting Series with Precision | GET | /api/reports/perpush/series/(push_id)?precision=(precision) | {} |
| Per Push Reporting Series with Precision & Range | GET | /api/reports/perpush/series/(push_id)?precision=(precision)&start=(start_time)&end=(end_time) | {} |
| Individual Device Lookup, Device Token | GET | /api/device_tokens/(device_token) | {} |
| Individual Device Lookup, APID | GET | /api/apids/(APID) | {} |
| Device Listing, Device Tokens | GET | /api/device_tokens/ | { "device_tokens" : [], "next_page" : String, "device_tokens_count" : integer }
| Device Listing, APIDs | GET | /api/apids/ | { "apids" : [], "next_page" : String, "device_tokens_count" : integer }
| Segments Listing | GET | /api/segments/ | { "segments" : [], "next_page" : String, "prev_page" : String }
| Individual Segment Lookup | GET | /api/segments/(segment_id) | {} |
| Create Segment | POST | /api/segments/ | Rely on Status Codes |
| Change Segment | PUT | /api/segments/(segment_id) | Rely on Status Codes. |
| Delete Segment | DELETE | /api/segments/(segment_id) | Rely on Status Codes. |
| Location Lookup By String | GET | /api/location/?q=(String)&type=(String) | { "features" : [] } |
| Location Lookup by Lat/Lon | GET | /api/location/(latitude),(longitude)?type=(boundary_type) | { "features" : [] } |
| Location Lookup by Lat/Lon Box | GET | /api/location/(latitude_1),(longitude_1),(latitude_2),(longitude_2)&type=(boundary_type) | { "features" : [] } |
| Location Lookup by Alias | GET | /api/location/from-alias?(String)=(String) | {} |

