const initialState = [];

const timeSheetLineResVOSglobal = (state = initialState, action) => {

    switch (action.type) {

        case 'timeSheetLineResVOSglobal': {
            console.log('timeSheetLineResVOSglobal Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default timeSheetLineResVOSglobal