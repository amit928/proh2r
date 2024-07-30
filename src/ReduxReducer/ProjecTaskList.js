const initialState = [];

const ProjecTaskList = (state = initialState, action) => {

    switch (action.type) {

        case 'projecTaskList': {
            console.log('projecTaskList Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default ProjecTaskList