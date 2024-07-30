const initialState = false;

const TimeSheetApprStatusFlag = (state = initialState, action) => {

    switch (action.type) {

        case 'TimeSheetApprStatusFlag': {
            console.log('TimeSheetApprStatusFlag', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default TimeSheetApprStatusFlag