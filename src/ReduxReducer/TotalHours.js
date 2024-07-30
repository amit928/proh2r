const initialState = "00:00";

const TotalHours = (state = initialState, action) => {

    switch (action.type) {

        case 'TotalHours': {
            console.log('projecTaskList Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default TotalHours