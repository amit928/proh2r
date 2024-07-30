

export const punchLocationVO =
{
    "locationRestrictionsList": [
        {
            "locationRestrictionsId": 1,
            "locationName": "Test",
            "latitude": "23.6230162",
            "longitude": "85.5250296",
            "radius": 50
        },
        {
            "locationRestrictionsId": 2,
            "locationName": "Test2",
            "latitude": "20.593684",
            "longitude": "78.96288",
            "radius": 50
        }
    ],
    "punchDetailsVOList": [
        {
            "markAttendanceType": "CHECKIN",
            "isValidPunch": true,
            "punchTime": "09:08:47.438",
            "latitudeLongitude": "23.622911,85.524855",
            "punchLocationAddress": "Ramgarh Cantonment, Jharkhand 829122",
            "deviceType": "MOBILE"
        },
        {
            "markAttendanceType": "CHECKOUT",
            "isValidPunch": null,
            "punchTime": "17:35:54.311",
            "latitudeLongitude": "23.623018,85.525386",
            "punchLocationAddress": "",
            "deviceType": "MOBILE"
        },
        {
            "markAttendanceType": "CHECKOUT",
            "isValidPunch": null,
            "punchTime": "20:02:19.474",
            "latitudeLongitude": "25.3264908,82.9895545",
            "punchLocationAddress": "ddd",
            "deviceType": "MOBILE"
        }
    ]
}


export const punchLocationVO1 =
{
    "locationRestrictionsList": [
        {
            "locationRestrictionsId": 1,
            "locationName": "Test",
            "latitude": "20.593684",
            "longitude": "78.96288",
            "radius": 50
        }
    ],
    "punchDetailsVOList":  [
    
    {
        "markAttendanceType": "CHECKIN",
        "isValidPunch": null,
        "punchTime": "09:08:47.438",
        "latitudeLongitude": "23.6230162,85.5250296",
        "punchLocationAddress": null,
        "deviceType": "WEBCHECKIN"
    },
    {
        "markAttendanceType": "CHECKOUT",
        "isValidPunch": null,
        "punchTime": "17:35:54.311",
        "latitudeLongitude": "",
        "punchLocationAddress": null,
        "deviceType": "WEBCHECKIN"
    },
    {
        "markAttendanceType": "CHECKOUT",
        "isValidPunch": null,
        "punchTime": "20:02:19.474",
        "latitudeLongitude": "25.3264908,82.9895545",
        "punchLocationAddress": null,
        "deviceType": "MOBILE"
    }
]
}