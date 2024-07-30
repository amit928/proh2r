import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator, SafeAreaView, Vibration } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';

import Loader from '../../components/Loader';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';
import CustomPicker from '../../components/CustomPicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';
import { settimeSheetLineResVOSglobal, settimeSheetTestResponse, setTotalHours } from '../../ReduxAction';

import PillsDropDownStateFull from '../../components/PillsDropDownStateFull';
import CustomDateDesign from '../../components/CustomDateDesign';
import CustomCommentInput from '../../components/CustomCommentInput';
import { COLORS } from '../../Constant/Index';
import SubmitBtnWide from '../../components/SubmitBtnWide';
import * as Utility from '../../Externel Constant/Utility';


const TimeSheetEditTask = (props) => {



    console.log(' Route Edit Timesheet ', props.route.params)

    const timeSheetTestResponse = useSelector(state => state.timeSheetTestResponse)

    //    const {timeSheetLineResVOS, dayCode} = props.route.params

    const timeSheetLineResVOSglobal = useSelector(state => state.timeSheetLineResVOSglobal)

    // const MainAPIPayload = useSelector(state => state.MainAPIPayload);

    const [dayCode, setdayCode] = useState(String(props.route.params.dayCode))

    const [DayName, setDay] = useState(String(props.route.params.timeSheetLineResVOS[dayCode].day))
    const [DayDate, setDayDate] = useState(String(props.route.params.timeSheetLineResVOS[dayCode].date))


    const DayCodeTemp = capitalizeFirstLetter(String(props.route.params.dayCode))

    const [totalDayHours, settotalDayHours] = useState("total" + DayCodeTemp + "Hours")

    console.log('totalDayHours', totalDayHours);

    //redux State
    const dispatch = useDispatch()
    const authDictGlobal = useSelector(state => state.authDictGlobal);
    const TemplateAssignment = useSelector(state => state.TemplateAssignment);
    const ProjecTaskList = useSelector(state => state.ProjecTaskList);
    const ProjectList = useSelector(state => state.ProjectList);
    const TimeSheetApprStatusFlag = useSelector(state => state.TimeSheetApprStatusFlag);

    const timeCaptureType = TemplateAssignment.timeCaptureType

    const isTotalTimeEditable = timeCaptureType == 'TIMEWISE' ? false : true

    const [navTitle, setnavTitle] = useState(`Edit Task For ${DayName} (${DayDate})`)

    const [authDict, setauthDict] = useState(authDictGlobal)

    const [isLoading, setisLoading] = useState(false)

    const [showProjectPicker, setshowProjectPicker] = useState(false)
    const [showTaskPicker, setshowTaskPicker] = useState(false)

    const [ProjectName, setProjectName] = useState(String(props.route.params.timeSheetLineResVOS.projectName))
    const [ProjectId, setProjectId] = useState(String(props.route.params.timeSheetLineResVOS.projectId))

    const [TaskName, setTaskName] = useState(String(props.route.params.timeSheetLineResVOS.taskName))
    const [TaskId, setTaskId] = useState(String(props.route.params.timeSheetLineResVOS.taskId))

    const [StartTimePicker, setStartTimePicker] = useState(false)
    const [EndTimePicker, setEndTimePicker] = useState(false)

    const [StartTime24Format, setStartTime24Format] = useState(String(props.route.params.timeSheetDayItemDescriptions.fromTime))
    const [EndTime24Format, setEndTime24Format] = useState(String(props.route.params.timeSheetDayItemDescriptions.toTime))

    const [StartTime, setStartTime] = useState(tConvert(StartTime24Format))

    const [EndTime, setEndTime] = useState(tConvert(EndTime24Format))

    const [TotalTime, setTotalTime] = useState(String(props.route.params.timeSheetDayItemDescriptions.hours))

    const [rawStartTime, setrawStartTime] = useState(setHourMinute(String(props.route.params.timeSheetDayItemDescriptions.fromTime)))
    const [rawEndTime, setrawEndTime] = useState(setHourMinute(String(props.route.params.timeSheetDayItemDescriptions.toTime)))

    const [TaskList, setTaskList] = useState([])
    const [TaskListObject, setTaskListObject] = useState([])

    const [Notes, setNotes] = useState(String(props.route.params.timeSheetDayItemDescriptions.notes))

    const TotalHoursGlobal = useSelector(state => state.TotalHours);


    console.log('ProjectList redux', ProjectList)


    const { goBack } = props.navigation;


    LocaleConfig.locales['fr'] = {
        monthNames: [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        monthNamesShort: ['Jan',
            'Feb',
            'Mar',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        today: "Today"
    };
    LocaleConfig.defaultLocale = 'fr';


    // To Do

    function setHourMinute(timeStr) {

        let tempD = new Date()

        const timeArr = timeStr.split(":")

        tempD.setHours(timeArr[0], timeArr[1])

        return String(tempD)



    }


    // convert 24 format to 12 format
    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }



    function AddHours(time, time2) {
        // let time = "08:31";
        let totalInMinutes = (parseInt(time.split(":")[0]) * 60) + parseInt(time.split(":")[1]);

        // let time2 = "02:50";
        let otherMinutes = (parseInt(time2.split(":")[0]) * 60) + parseInt(time2.split(":")[1]);

        let grandTotal = otherMinutes + totalInMinutes;



        let bookH = Math.floor(grandTotal / 60);
        let bookM = grandTotal % 60;
        let bookingDurationToHour = bookH + ':' + bookM;

        let TempHourArray = bookingDurationToHour.split(":")

        console.log("temp", TempHourArray);
        console.log("jhj", bookingDurationToHour);

        if (parseInt(TempHourArray[0]) < 10 && TempHourArray[0].length == 1) {



            TempHourArray[0] = `0${TempHourArray[0]}`

            console.log("Hour Block", TempHourArray[0])

            if (parseInt(TempHourArray[1]) < 10 && TempHourArray[1].length == 1) {



                TempHourArray[1] = `0${TempHourArray[1]}`

                console.log("Hour Minute Block", TempHourArray[1])

            }

            const FinalHHMM = `${TempHourArray[0]}:${TempHourArray[1]}`

            console.log('Hour Minute Block FinalHHMM ------------------------------', FinalHHMM);

            return FinalHHMM

        }

        else if (parseInt(TempHourArray[1]) < 10 && TempHourArray[1].length == 1) {

            TempHourArray[1] = `0${TempHourArray[1]}`
            console.log("Minute Block", TempHourArray[1])

            if (parseInt(TempHourArray[0]) < 10 && TempHourArray[0].length == 1) {

                TempHourArray[0] = `0${TempHourArray[0]}`
                console.log("Minute Hour Block", TempHourArray[0])

            }

            const FinalHHMM = `${TempHourArray[0]}:${TempHourArray[1]}`

            console.log('Minute Hour Block FinalHHMM ------------------------------', FinalHHMM);

            return FinalHHMM

        }






        else {
            console.log('FinalHHMM Normal Without Manipulation ------------------------------', bookingDurationToHour);
            return bookingDurationToHour;
        }



        // if (bookingDurationToHour.length == 5) {

        //     // console.log('totalInMinutes', totalInMinutes);
        //     
        // }

        // else {

        //     let output = [bookingDurationToHour.slice(0, 3), "0", bookingDurationToHour.slice(3)].join('');
        //     console.log(output);
        //     return output;
        // }



    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    useEffect(() => {


        console.log('authDictGlobal', authDictGlobal);
        console.log('TemplateAssignment', TemplateAssignment);

        getProjectNameEditInitial(ProjectName)

        console.log("-------------------------------------------------------------------------------------------------------------------------------");


    }, []);



    function getProjectNameEditInitial(val) {

        // setTaskName("Choose Task")

        console.log('getProjectName', val)

        let TempProjectId

        const tempTaskListArr = ProjecTaskList.find((v, i) => {

            console.log('value', v)
            console.log('index', i)
            if (v.projectName == String(val)) {

                TempProjectId = v.projectId
                return v

            }

        })

        console.log('tempTaskListArr getProjectNameEditInitial', tempTaskListArr)

        getTaskList(tempTaskListArr.Tasks)



    }



    function getProjectName(val, index) {


        setStartTime('')
        setEndTime('')
        setTotalTime('')
        setNotes('')

        setTaskName("Choose Task")

        console.log('getProjectName', val)

        let TempProjectId

        const tempTaskListArr = ProjecTaskList.find((v, i) => {

            console.log('value', v)
            console.log('index', i)
            if (v.projectName == String(val)) {

                TempProjectId = v.projectId
                return v

            }

        })

        console.log('tempTaskListArr', tempTaskListArr)

        getTaskList(tempTaskListArr.Tasks)

        setProjectName(String(val))
        setProjectId(TempProjectId)


    }

    function getTaskList(tempArr = []) {
        console.log('getTaskList', tempArr)

        setTaskListObject(tempArr)

        let TempTaskList = []

        tempArr.forEach((item, index) => {

            TempTaskList.push(item.taskName)

        })

        setTaskList(TempTaskList)




    }

    function getTaskName(val, index) {


        setStartTime('')
        setEndTime('')
        setTotalTime('')
        setNotes('')

        console.log('getTaskName', val)

        for (let ind = 0; ind < TaskListObject.length; ind++) {

            const element = TaskListObject[ind]
            console.log(element.taskId)
            if (element.taskName == val) {

                console.log('found', element.taskId)
                setTaskId(String(element.taskId))
                setTaskName(String(val))
                break
            }
        }
        // setTaskName(val)
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function convertMsToHM(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        // 👇️ if seconds are greater than 30, round minutes up (optional)
        minutes = seconds >= 30 ? minutes + 1 : minutes;

        minutes = minutes % 60;

        // 👇️ If you don't want to roll hours over, e.g. 24 to 00
        // 👇️ comment (or remove) the line below
        // commenting next line gets you `24:00:00` instead of `00:00:00`
        // or `36:15:31` instead of `12:15:31`, etc.
        hours = hours % 24;

        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
    }


    function calculateTotalTime(DateLabel, rawDate) {

        // console.log('calculateTotalTime');
        // console.log('calculateTotalTime rawStartTime: ', rawStartTime,' -- rawEndTime: ', rawEndTime);

        if (DateLabel == 'rawStartTime') {
            if (rawEndTime == '') {
                console.log('calculateTotalTime rawEndTime', rawEndTime);
                return;
            }

            else {
                var date1 = new Date(rawDate);
                var date2 = new Date(rawEndTime);

                // checking with date is more recent to get the other out of it and store the result in dateDifference variable
                var dateDifference;
                if (date1 < date2) {
                    dateDifference = date2 - date1;
                }
                else {
                    // dateDifference = date1 - date2;
                    Alert.alert("Start Time cannot be greater than End Time")
                    Vibration.vibrate()
                    return
                }

                console.log('dateDifference Milisecond', dateDifference); // the result will be in milliseconds

                console.log(date1);

                console.log('convertMsToHM', convertMsToHM(dateDifference));

                setTotalTime(String(convertMsToHM(dateDifference)));
            }


        }

        else if (DateLabel == 'rawEndTime') {

            if (rawStartTime == '') {
                console.log('calculateTotalTime rawStartTime', rawStartTime);
                return;
            }

            else {
                var date1 = new Date(rawStartTime);
                var date2 = new Date(rawDate);

                // checking with date is more recent to get the other out of it and store the result in dateDifference variable
                var dateDifference;
                if (date1 < date2) {
                    dateDifference = date2 - date1;
                }
                else {
                    // dateDifference = date1 - date2;
                    Alert.alert("Start Time cannot be greater than End Time")
                    Vibration.vibrate()
                    return
                }

                console.log('dateDifference Milisecond', dateDifference); // the result will be in milliseconds

                console.log(date1);

                console.log('convertMsToHM', convertMsToHM(dateDifference));

                setTotalTime(String(convertMsToHM(dateDifference)));
            }
        }



    }

    function SubtractHours(time, time2) {

        console.log("SubtractHours", "ddddd")

        // let time = "08:31";
        let totalInMinutes = (parseInt(time.split(":")[0]) * 60) + parseInt(time.split(":")[1]);

        // let time2 = "02:50";
        let otherMinutes = (parseInt(time2.split(":")[0]) * 60) + parseInt(time2.split(":")[1]);

        let grandTotal = totalInMinutes - otherMinutes;



        let bookH = Math.floor(grandTotal / 60);
        let bookM = grandTotal % 60;
        let bookingDurationToHour = bookH + ':' + bookM;

        let TempHourArray = bookingDurationToHour.split(":")

        console.log("temp", TempHourArray);
        console.log("jhj", bookingDurationToHour);

        if (parseInt(TempHourArray[0]) < 10 && TempHourArray[0].length == 1) {



            TempHourArray[0] = `0${TempHourArray[0]}`

            console.log("Hour Block", TempHourArray[0])

            if (parseInt(TempHourArray[1]) < 10 && TempHourArray[1].length == 1) {



                TempHourArray[1] = `0${TempHourArray[1]}`

                console.log("Hour Minute Block", TempHourArray[1])

            }

            const FinalHHMM = `${TempHourArray[0]}:${TempHourArray[1]}`

            console.log('Hour Minute Block FinalHHMM ------------------------------', FinalHHMM);

            return FinalHHMM

        }

        else if (parseInt(TempHourArray[1]) < 10 && TempHourArray[1].length == 1) {

            TempHourArray[1] = `0${TempHourArray[1]}`
            console.log("Minute Block", TempHourArray[1])

            if (parseInt(TempHourArray[0]) < 10 && TempHourArray[0].length == 1) {

                TempHourArray[0] = `0${TempHourArray[0]}`
                console.log("Minute Hour Block", TempHourArray[0])

            }

            const FinalHHMM = `${TempHourArray[0]}:${TempHourArray[1]}`

            console.log('Minute Hour Block FinalHHMM ------------------------------', FinalHHMM);

            return FinalHHMM

        }






        else {
            console.log('FinalHHMM Normal Without Manipulation ------------------------------', bookingDurationToHour);
            return bookingDurationToHour;
        }



        // if (bookingDurationToHour.length == 5) {

        //     // console.log('totalInMinutes', totalInMinutes);
        //     
        // }

        // else {

        //     let output = [bookingDurationToHour.slice(0, 3), "0", bookingDurationToHour.slice(3)].join('');
        //     console.log(output);
        //     return output;
        // }



    }

    function OnEditDone() {

        if (ProjectName == 'Choose Project') {
            Alert.alert("Choose Project !")
            Vibration.vibrate()
            return
        }

        if (TaskName == 'Choose Task') {
            Alert.alert("Choose Task !")
            Vibration.vibrate()
            return
        }

        if (TotalTime == '') {
            Alert.alert("Enter Total Time !")
            Vibration.vibrate()
            return
        }

        if (!Moment(TotalTime, "HH:mm", true).isValid()) {
            Alert.alert("Total Time is Invalid !", "Please Enter Time in HH:mm Format.")
            Vibration.vibrate()
            return
        }




        let timeSheetDayItemDescriptionsCopy = JSON.parse(JSON.stringify(props.route.params.timeSheetDayItemDescriptions))

        const Subtract_Hours = JSON.parse(JSON.stringify(timeSheetDayItemDescriptionsCopy.hours))

        // timeSheetDayItemDescriptionsCopy.fromTime = StartTime24Format
        // timeSheetDayItemDescriptionsCopy.toTime = EndTime24Format
        // timeSheetDayItemDescriptionsCopy.hours = TotalTime
        // timeSheetDayItemDescriptionsCopy.notes = Notes







        // console.log('timeSheetDayItemDescriptionsCopy', timeSheetDayItemDescriptionsCopy)

        // console.log('timeSheetLineResVOSglobal', timeSheetLineResVOSglobal)

        // console.log('------ MainAPIPayload -----', MainAPIPayload);

        let TempTimeSheetLineResVOS = JSON.parse(JSON.stringify(timeSheetLineResVOSglobal))

        //indexes
        const timeSheetLineResVOSindex = props.route.params.timeSheetLineResVOSindex

        const timeSheetDayItemDescriptionsIndex = props.route.params.timeSheetDayItemDescriptionsIndex

        // TempTimeSheetLineResVOS[parseInt(timeSheetLineResVOSindex)][dayCode].timeSheetDayItemDescriptions[timeSheetDayItemDescriptionsIndex] = timeSheetDayItemDescriptionsCopy



        // delete list from desc array
        TempTimeSheetLineResVOS[timeSheetLineResVOSindex][dayCode].timeSheetDayItemDescriptions.splice(timeSheetDayItemDescriptionsIndex, 1)


        let FinalTime = SubtractHours(TempTimeSheetLineResVOS[parseInt(timeSheetLineResVOSindex)][dayCode].totalDayHours, Subtract_Hours)

        // FinalTime = AddHours(FinalTime, TotalTime)

        //subtract totalDayHours
        if (FinalTime == "00:00") {
            TempTimeSheetLineResVOS[timeSheetLineResVOSindex][dayCode] = null
        }

        else {
            TempTimeSheetLineResVOS[parseInt(timeSheetLineResVOSindex)][dayCode].totalDayHours = FinalTime
        }




        let FinalTime2 = SubtractHours(TempTimeSheetLineResVOS[parseInt(timeSheetLineResVOSindex)].totalHours, Subtract_Hours)

        // FinalTime2 = AddHours(FinalTime2, TotalTime)


        //subtract totalHours
        TempTimeSheetLineResVOS[parseInt(timeSheetLineResVOSindex)].totalHours = FinalTime2



        // dispatch(settimeSheetLineResVOSglobal(TempTimeSheetLineResVOS))


        // For Display Total Hour
        const copyOfTotalHoursGlobal = TotalHoursGlobal

        let FinalTotalHoursGlobal = SubtractHours(copyOfTotalHoursGlobal, Subtract_Hours)

        // FinalTotalHoursGlobal = AddHours(FinalTotalHoursGlobal, TotalTime)

        // dispatch(setTotalHours(FinalTotalHoursGlobal))

        let timeSheetDayItemDescriptions = {
            "fromTime": StartTime24Format,
            "toTime": EndTime24Format,
            "hours": TotalTime,
            "notes": Notes,
            "timeSheetDayItemDescriptionId": ""
        }


        FinalTotalHoursGlobal = AddHours(FinalTotalHoursGlobal, TotalTime)

        dispatch(setTotalHours(FinalTotalHoursGlobal))

        console.log('timeSheetDayItemDescriptions', timeSheetDayItemDescriptions)

        console.log('After Deleting List and Subtracting Hours TempTimeSheetLineResVOS', TempTimeSheetLineResVOS)

        // console.log('------ MainAPIPayload -----', MainAPIPayload);

        // let TempTimeSheetLineResVOS = timeSheetLineResVOSglobal




        for (let index = 0; index < TempTimeSheetLineResVOS.length; index++) {

            let item = TempTimeSheetLineResVOS[index]


            if (item.projectName == ProjectName && item.taskName == TaskName) {

                console.log('Found it', item)

                if (item[dayCode] == null) {
                    let dayWiseTemplate = {
                        "date": DayDate,
                        "day": DayName,
                        "totalDayHours": TotalTime,
                        "timeSheetDayItemId": "",
                        "timeSheetDayItemDescriptions": [timeSheetDayItemDescriptions]
                    }

                    console.log('dayWiseTemplate------ ', dayWiseTemplate)

                    let TempTimeSheetLineResVOS2 = TempTimeSheetLineResVOS

                    TempTimeSheetLineResVOS2[index][dayCode] = dayWiseTemplate

                    const tempTotalHours = AddHours(String(TempTimeSheetLineResVOS2[index].totalHours), TotalTime)

                    console.log("if Part --------------------------- Edit Task");

                    TempTimeSheetLineResVOS2[index]["totalHours"] = tempTotalHours

                    // let currentTimeSheetLineResVOSCopy = item

                    // currentTimeSheetLineResVOSCopy[dayCode] = dayWiseTemplate
                    // console.log('currentTimeSheetLineResVOSCopy', currentTimeSheetLineResVOSCopy);

                    // let tempCopyMainAPIPayload = MainAPIPayload


                    // tempCopyMainAPIPayload.timeSheetLineResVOS.push(currentTimeSheetLineResVOSCopy)




                    // dispatch(setMainAPIPayload(tempCopyMainAPIPayload))

                    dispatch(settimeSheetLineResVOSglobal(TempTimeSheetLineResVOS2))

                    // goBack()

                    // let timeSheetTestResponseTemp = timeSheetTestResponse

                    // const addDataTest = {
                    //     "timeSheetLineItemId": 197,
                    //     "projectId": "1",
                    //     "projectName": "ProH2R Development",
                    //     "taskId": "1",
                    //     "taskName": "Testing",
                    //     "totalHours": "09:10",
                    //     "day0": null,
                    //     "day1": {
                    //         "timeSheetDayItemId": 371,
                    //         "date": "2022-06-20",
                    //         "day": "MONDAY",
                    //         "totalDayHours": "08:10",
                    //         "timeSheetDayItemDescriptions": [
                    //             {
                    //                 "timeSheetDayItemDescriptionId": 420,
                    //                 "fromTime": "09:00",
                    //                 "toTime": "18:12",
                    //                 "hours": "09:12",
                    //                 "notes": "Test"
                    //             }
                    //         ]
                    //     },
                    //     "day2": null,
                    //     "day3": null,
                    //     "day4": null,
                    //     "day5": null,
                    //     "day6": null
                    // }

                    // timeSheetTestResponseTemp.timeSheetLineResVOS.push(addDataTest)

                    // dispatch(settimeSheetTestResponse(timeSheetTestResponseTemp))

                    break

                }
                else {
                    console.log("Not Null ------------------------- Edit Task")

                    let TempTimeSheetLineResVOS2 = JSON.parse(JSON.stringify(TempTimeSheetLineResVOS))

                    TempTimeSheetLineResVOS2[index][dayCode].timeSheetDayItemDescriptions.push(timeSheetDayItemDescriptions)

                    const totalDayHours2 = AddHours(String(TempTimeSheetLineResVOS2[index][dayCode].totalDayHours), TotalTime)

                    TempTimeSheetLineResVOS2[index][dayCode].totalDayHours = totalDayHours2

                    const tempTotalHours2 = AddHours(String(TempTimeSheetLineResVOS2[index].totalHours), TotalTime)

                    console.log("Not Null ------------------------- TempTimeSheetLineResVOS2[index].totalHours Edit Task", TempTimeSheetLineResVOS2[index].totalHours)

                    console.log("tempTotalHours2 ---------------", tempTotalHours2)



                    TempTimeSheetLineResVOS2[index].totalHours = tempTotalHours2

                    console.log(TempTimeSheetLineResVOS2);

                    console.log("else Part ---------------------------");

                    dispatch(settimeSheetLineResVOSglobal(TempTimeSheetLineResVOS2))

                    break

                }

            }


        }



        goBack()

    }

    // UI
    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: '#F0F0F0' }}>


            <Loader isLoader={isLoading}> </Loader>
            <Nav
                backHidden={false}
                title={navTitle}
                backAction={() => goBack()}>
                {' '}
            </Nav>



            <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: COLORS.FormBGColor }}>


                <ScrollView contentContainerStyle={{
                    // alignItems: 'center',
                    justifyContent: 'center',

                    padding: 15,
                    backgroundColor: COLORS.FormBGColor
                }}>


                    <PillsDropDownStateFull dataArray={ProjectList} onSelect={(val, index) => getProjectName(val, index)} selectedData={ProjectName} Title='Project' disabled={TimeSheetApprStatusFlag}  isSideTitle={true} sideTitle={`(${Utility.convertToDDMMYYYY(DayDate)})`}/>


                    {ProjectName == 'Choose Project' || ProjectName == ''

                        ?
                        <></>

                        :

                        <>



                            <PillsDropDownStateFull Title='Task' dataArray={TaskList} onSelect={(val, index) => getTaskName(val, index)} selectedData={TaskName} disabled={TimeSheetApprStatusFlag} />

                            {TaskName == 'Choose Task' || TaskName == '' ?

                                <></>

                                :

                                <>



                                    {isTotalTimeEditable == false ?
                                        <>
                                            {/* Start Time */}
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                < DateTimePicker
                                                    titleIOS=""
                                                    isVisible={StartTimePicker}
                                                    onConfirm={(date) => {

                                                        const momentDate = Moment(date.toISOString());
                                                        let pickedTime = Moment(momentDate).format('LT');

                                                        let pickedTime24 = Moment(momentDate).format('HH:mm');
                                                        console.log("24 hour format-------", pickedTime24);
                                                        setStartTime24Format(String(pickedTime24));

                                                        console.log("string date, ", String(date));
                                                        setrawStartTime(String(date));
                                                        console.log('rawStartTime', rawStartTime);
                                                        console.log('dateTest, ', new Date(String(date)));
                                                        console.log(pickedTime);
                                                        calculateTotalTime('rawStartTime', String(date));
                                                        setStartTime(String(pickedTime))
                                                        setStartTimePicker(false);

                                                    }}
                                                    onCancel={() => {
                                                        setStartTimePicker(false);
                                                    }}
                                                    mode='time'
                                                />




                                                <CustomDateDesign width='45%' iconImgPath={require('../../images/clockIcon.png')} iconImgSize={{ width: 20, height: 20 }} Lable={'Start Time'} dateTitle={StartTime} onPress={() => {
                                                    console.log('Start Time');
                                                    setStartTimePicker(true);
                                                    console.log(' TaskId---------- ', TaskId, ' ProjectId----------- ', ProjectId);
                                                }} disabled={TimeSheetApprStatusFlag} />


                                                {/* End Time */}

                                                <DateTimePicker
                                                    titleIOS=""
                                                    isVisible={EndTimePicker}
                                                    onConfirm={(date) => {

                                                        const momentDate = Moment(date.toISOString());
                                                        let pickedTime = Moment(momentDate).format('LT');

                                                        let pickedTime24 = Moment(momentDate).format('HH:mm');
                                                        console.log("24 hour format 2-------", pickedTime24);
                                                        setEndTime24Format(String(pickedTime24));


                                                        console.log(pickedTime);
                                                        setrawEndTime(String(date));
                                                        console.log('rawEndTime', rawEndTime);
                                                        setEndTime(String(pickedTime));
                                                        setEndTimePicker(false);
                                                        calculateTotalTime('rawEndTime', String(date));

                                                    }}
                                                    onCancel={() => {
                                                        setEndTimePicker(false);
                                                    }}
                                                    mode='time'
                                                />



                                                <CustomDateDesign disabled={TimeSheetApprStatusFlag} width='45%' iconImgPath={require('../../images/clockIcon.png')} iconImgSize={{ width: 20, height: 20 }} Lable={'End Time'} dateTitle={EndTime} onPress={() => {
                                                    console.log('End Time');
                                                    setEndTimePicker(true);
                                                }} />
                                            </View>
                                        </>
                                        :
                                        <></>
                                    }






                                    {/* New Total Time */}
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>


                                        <Text  allowFontScaling={false}  style={{
                                            fontFamily: Constant.MontserratMedium,
                                            fontSize: 15,
                                        }}>Total Time (HH:MM)</Text>

                                    </View>


                                    <View style={{ width: 95, justifyContent: 'space-evenly', alignItems: 'center', marginRight: 13, height: 40, marginBottom: 15, borderRadius: 10, flexDirection: 'row', backgroundColor: 'white', }}>
                                        <TextInput  allowFontScaling={false} Input style={{ flex: 1, width: '100%', backgroundColor: 'white', color: 'black', borderRadius: 10, alignItems: 'center', padding: 0, paddingLeft: 8, }}
                                            keyboardType='ascii-capable'
                                           
                                            value={TotalTime}
                                            onChangeText={(text) => {
                                                setTotalTime(text)
                                            }}
                                            editable={isTotalTimeEditable}
                                            returnKeyType='done'
                                        />

                                        <Image
                                            source={require('../../images/clockIcon.png')}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                resizeMode: 'contain',
                                                alignSelf: 'center',
                                                right: 10,
                                            }}
                                        />
                                    </View>


                                    <CustomCommentInput editable={!TimeSheetApprStatusFlag} label='Notes' value={Notes} onChangeText={(text) => { setNotes(text) }} />

                                </>
                            }

                        </>
                    }
                </ScrollView>


            </View>

            {/* <TouchableOpacity style={{ borderBottomWidth: 0.5, borderBottomColor: '#BBBBBB', width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}
                onPress={() => {
                    OnEditDone()
                }}
                disabled={TimeSheetApprStatusFlag}
            >

                <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin' }}>Done </Text>

            </TouchableOpacity> */}

            <View style={{
                // borderBottomWidth: 0.5, borderBotztomColor: '#BBBBBB',  height: '10%', paddingTop: 10, flexDirection: 'row',
                width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 14
                //  paddingBottom: 10 
            }}
            >
                {/* <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        OnDone()
                    }}
                >

                    <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin', fontFamily: Constant.MontserratRegular }}>Done </Text>

                </TouchableOpacity> */}

                {TimeSheetApprStatusFlag ? <></> :
                    <SubmitBtnWide onPress={() => OnEditDone()} />
                }


            </View>



            {/* showProjectPicker */}
            <CustomPicker
                showPicker={showProjectPicker}
                arr={ProjectList}
                title='Select Project'
                handleClose={() => {
                    setshowProjectPicker(false)
                }}
                handleSubmit={(val, index) => {

                    getProjectName(val, index)
                    setshowProjectPicker(false)
                }}
            >

            </CustomPicker>

            {/* showTaskPicker */}
            <CustomPicker
                showPicker={showTaskPicker}
                arr={TaskList}
                title='Select Task'
                handleClose={() => {
                    setshowTaskPicker(false)
                }}
                handleSubmit={(val, index) => {

                    getTaskName(val, index)
                    setshowTaskPicker(false)
                }}
            >

            </CustomPicker>

        </View>
    );
}

export default TimeSheetEditTask;