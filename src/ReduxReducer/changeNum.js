const initialState = 0;

const incDecNum = (state = initialState, action) => {


    switch (action.type) {
        case 'increment': {

            console.log('increment')
            // state = state + action.payload
            console.log('payload', action.payload);
            state = state + parseInt(action.payload)
            return state
    }

        case 'decrement': {
            console.log('decrement')
            console.log('payload', action.payload);
            state = state - parseInt(action.payload)
            return state
        }


        default: return state
            
    }


}

export default incDecNum