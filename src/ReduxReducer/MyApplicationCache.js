const initialState = [];

const MyApplicationCache = (state = initialState, action) => {

    switch (action.type) {

        case 'setMyApplicationCache': {
            console.log('setMyApplicationCache Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default MyApplicationCache