import { combineReducers } from "redux";
import authDictGlobal from "./authDictGlobal";
import incDecNum from "./changeNum";
import MainAPIPayload from "./MainAPIPayload";
import MyApplicationCache from "./MyApplicationCache";
import ProjecTaskList from "./ProjecTaskList";
import ProjectList from "./ProjectList";
import TemplateAssignment from "./TemplateAssignment";
import TimeSheetApprStatusFlag from "./TimeSheetApprStatusFlag";
import timeSheetLineResVOSglobal from "./timeSheetLineResVOSglobal";
import timeSheetTestResponse from "./timeSheetTestResponse";
import TotalHours from "./TotalHours";

const ReduxReducer = combineReducers(
    {
        incDecNum,
        authDictGlobal,
        TemplateAssignment,
        ProjecTaskList,
        ProjectList,
        MainAPIPayload,
        timeSheetLineResVOSglobal,
        timeSheetTestResponse,
        TimeSheetApprStatusFlag,
        TotalHours,
        MyApplicationCache
    }
);

export default ReduxReducer;