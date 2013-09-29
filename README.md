###TODO

* Add Logging
* [X] Completely implement spec
  
###List of API Endpoints, Methods, and Response Formats

| ? | Name | Method | Endpoint  | Reponse Format   |
| ------------ | ---- | ------ | --------- | ---------------  |
| X | Push | POST | /api/push/ | { "ok" : boolean, "operation_id" : UUID, "push_ids" : [] }  |
| X | Validate | POST | /api/push/validate | Rely on Status Codes. |
| X | Create Schedule | POST | /api/schedules/ | { "ok":boolean, "operation_id" : UUID, "schedule_urls" : [] } |
| X | List Schedules | GET | /api/schedules/ | { "ok":boolean, "count" : integer, "schedules" : [] } |
| X | List Specific Schedule | GET | /api/schedules/(id) | { "name" : String, "schedule" : {}, "push" : {} } |
| X | Update Schedule | PUT | /api/schedules/(id) | { "ok": boolean, "operation_id" : UUID } |
| X | Delete Schedule | DELETE | /api/schedules/(id) | Rely on Status Codes |
| X | Tag Listing | GET | /api/tags/ | { "tags": [] } |
| X | Tag Creation | PUT | /api/tags/(tag) | Rely on Status Code. |
| X | Adding / Removing Devices From a Tag | POST | /api/tags/(tag) | Rely on Status Code. |
| X | Delete a Tag | DELETE | /apit/tags/(tag) | Rely on Status Code. |
| X | Active User Count | GET | /api/reports/activeusers/?date=(date) | { "android" : integer, "ios" : integer } |
| X | Push Report | GET | /api/reports/sends/?start=(date)&end=(date)&precision=(precision) | { "sends" : [], "next_page" : String, "prev_page" : String }
| X | Individual Response Statistics | GET | /api/reports/responses/(push_id) | { "push_uuid": UUID , "direct_responses": integer , "sends": integer , "push_type": "UNICAST_PUSH", "push_time": Date() } |
| X | Push Reponse Report | GET | /api/reports/responses/?start=(date)&end=(date)&precision=(precision) | { "responses" : [], "next_page" : String, "prev_page" : String }
| X | Response Listing | GET | /api/reports/responses/list?start=(date)&end=(date)&limit=(int) | { "pushes" : [], "next_page" : String, "prev_page" : String }
| X | App Opens Report | GET | /api/reports/opens/?start=(date)&end=(date)&precision=(precision) | { "opens" : [] , "next_page" : String, "prev_page" : String }
| X | Time in App Report | GET | /api/reports/timeinapp/?start=(date)&end=(date)&precision=(precision) | "timeinapp" : [], "next_page" : String, "prev_page" : String }
| X | Opt-in Report | GET | /api/reports/optins/?start=(date)&end=(date)&precision=(precision) | { "optins" : [], "next_page" : String, "prev_page" : String }
| X | Opt-out Report | GET | /api/reports/optouts/?start=(date)&end=(date)&precision=(precision) | { "optouts" : [] , "next_page" : String, "prev_page" : String }
| X | Statistics | GET | /api/push/stats/?start=(start_time)&end=(end_time) | Not documented. |
| X | Per Push Reporting | GET | /api/reports/perpush/detail/(push_id) | {} |
| X | Per Push Reporting Series | GET | /api/reports/perpush/series/(push_id) | {} |
| X | Per Push Reporting Series with Precision | GET | /api/reports/perpush/series/(push_id)?precision=(precision) | {} |
| X | Per Push Reporting Series with Precision & Range | GET | /api/reports/perpush/series/(push_id)?precision=(precision)&start=(start_time)&end=(end_time) | {} |
| X | Individual Device Lookup, Device Token | GET | /api/device_tokens/(device_token) | {} |
| X | Individual Device Lookup, APID | GET | /api/apids/(APID) | {} |
| X | Device Listing, Device Tokens | GET | /api/device_tokens/ | { "device_tokens" : [], "next_page" : String, "device_tokens_count" : integer }
| X | Device Listing, APIDs | GET | /api/apids/ | { "apids" : [], "next_page" : String, "device_tokens_count" : integer }
| X | Segments Listing | GET | /api/segments/ | { "segments" : [], "next_page" : String, "prev_page" : String }
| X | Individual Segment Lookup | GET | /api/segments/(segment_id) | {} |
| X | Create Segment | POST | /api/segments/ | Rely on Status Codes |
| X | Change Segment | PUT | /api/segments/(segment_id) | Rely on Status Codes. |
| X | Delete Segment | DELETE | /api/segments/(segment_id) | Rely on Status Codes. |
| X | Location Lookup By String | GET | /api/location/?q=(String)&type=(String) | { "features" : [] } |
| x | Location Lookup by Lat/Lon | GET | /api/location/(latitude),(longitude)?type=(boundary_type) | { "features" : [] } |
| x | Location Lookup by Lat/Lon Box | GET | /api/location/(latitude_1),(longitude_1),(latitude_2),(longitude_2)&type=(boundary_type) | { "features" : [] } |
| X | Location Lookup by Alias | GET | /api/location/from-alias?(String)=(String) | {} |

