export const incNum = (num) => {

    return {
        type: 'increment',
        payload: num
    }

}

export const decNum = (num) => {

    return {
        type: 'decrement',
        payload: num
    }

}

export const SetauthDictGlobal = (val) => {

    return {
        type: 'authDictGlobal',
        payload: val
    }
    

}

export function SetTemplateAssignment(val) {

    return {
        type: 'template_assignment',
        payload: val
    }

}

export function SetGetprojecTaskList(val) {

    return {
        type: 'projecTaskList',
        payload: val
    }

}

export function SetProjectList(val) {

    return {
        type: 'projectList',
        payload: val
    }

}

export function setMainAPIPayload(val) {

    return {
        type: 'MainAPIPayload',
        payload: val
    }

}

export function settimeSheetLineResVOSglobal(val) {

    return {
        type: 'timeSheetLineResVOSglobal',
        payload: val
    }

}

export function settimeSheetTestResponse(val) {

    return {
        type: 'timeSheetTestResponse',
        payload: val
    }

}


export function setTimeCaptureType(val) {

    return {
        type: 'TimeCaptureType',
        payload: val
    }

}


export function setTimeSheetApprStatusFlag(val) {

    return {
        type: 'TimeSheetApprStatusFlag',
        payload: val
    }

}


export function setTotalHours(val) {

    return {
        type: 'TotalHours',
        payload: val
    }

}


export function setMyApplicationCache(val) {

    return {
        type: 'setMyApplicationCache',
        payload: val
    }

}