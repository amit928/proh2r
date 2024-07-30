const initialState = {
    "timeSheetId": 55,
    "empCode": "002",
    "empName": "Rohit Shridhar - 002",
    "empDocId": "InfinitySolution/002/500.7685511332536_profile-picture.jpeg",
    "fromDate": "2022-06-19",
    "toDate": "2022-06-25",
    "totalDay0Hours": "",
    "totalDay1Hours": "08:10",
    "totalDay2Hours": "",
    "totalDay3Hours": "",
    "totalDay4Hours": "",
    "totalDay5Hours": "",
    "totalDay6Hours": "",
    "totalHours": "08:10",
    "workWeekHours": "40:00",
    "totalDeviationHours": null,
    "timeSheetApprovalStatus": "DRAFT",
    "timeSheetLineResVOS": [
        {
            "timeSheetLineItemId": 147,
            "projectId": "1",
            "projectName": "ProH2R Development",
            "taskId": "1",
            "taskName": "Development",
            "totalHours": "08:10",
            "day0": null,
            "day1": {
                "timeSheetDayItemId": 361,
                "date": "2022-06-20",
                "day": "MONDAY",
                "totalDayHours": "08:10",
                "timeSheetDayItemDescriptions": [
                    {
                        "timeSheetDayItemDescriptionId": 410,
                        "fromTime": "09:00",
                        "toTime": "17:10",
                        "hours": "08:10",
                        "notes": "Test"
                    }
                ]
            },
            "day2": null,
            "day3": null,
            "day4": null,
            "day5": null,
            "day6": null
        }
    ]
};

const timeSheetTestResponse = (state = initialState, action) => {

    switch (action.type) {

        case 'timeSheetTestResponse': {
            console.log('timeSheetLineResVOSglobal Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default timeSheetTestResponse