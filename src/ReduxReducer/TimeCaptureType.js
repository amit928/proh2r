const initialState = "";

const TimeCaptureType = (state = initialState, action) => {

    switch (action.type) {

        case 'TimeCaptureType': {
            console.log('TimeCaptureType payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default TimeCaptureType