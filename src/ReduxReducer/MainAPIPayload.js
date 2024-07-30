const initialState = {
    "empCode": "",
    "fromDate": "",
    "toDate": "",
    "timeSheetApprovalStatus": "",
    "timeSheetId": null,
    "totalDeviationHours": null,
    "totalHours": "00:00",
    "workWeekHours": "00:00",
    "totalDay0Hours": "00:00",
    "totalDay1Hours": "00:00",
    "totalDay2Hours": "00:00",
    "totalDay3Hours": "00:00",
    "totalDay4Hours": "00:00",
    "totalDay5Hours": "00:00",
    "totalDay6Hours": "00:00",
    "timeSheetLineResVOS": []
};

const MainAPIPayload = (state = initialState, action) => {

    switch (action.type) {

        case 'MainAPIPayload': {
            console.log('MainAPIPayload Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default MainAPIPayload