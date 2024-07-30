const initialState = {};

const TemplateAssignment = (state = initialState, action) => {

    switch (action.type) {

        case 'template_assignment': {
            console.log('template_assignment Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default TemplateAssignment