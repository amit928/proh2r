const initialState = [];

const ProjectList = (state = initialState, action) => {

    switch (action.type) {

        case 'projectList': {
            console.log('projecList Payload', action.payload)
            state = action.payload
            return state
        }

        default: return state
            
    }

}

export default ProjectList