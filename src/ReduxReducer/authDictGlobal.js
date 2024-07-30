const initialState = {};

const authDictGlobal = (state = initialState, action) => {

    switch (action.type) {

        case 'authDictGlobal': {
            console.log('authDictGlobal payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default authDictGlobal