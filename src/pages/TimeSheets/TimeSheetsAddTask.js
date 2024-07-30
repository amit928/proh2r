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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const TimeSheetsAddTask = (props) => {



    console.log(' Route DayDate ', props.route.params)

    const timeSheetTestResponse = useSelector(state => state.timeSheetTestResponse)


    const timeSheetLineResVOSglobal = useSelector(state => state.timeSheetLineResVOSglobal)

    const TotalHoursGlobal = useSelector(state => state.TotalHours);

    // const MainAPIPayload = useSelector(state => state.MainAPIPayload);



    const [DayName, setDay] = useState(String(props.route.params.dayData.day))
    const [DayDate, setDayDate] = useState(String(props.route.params.dayData.date))
    const [dayCode, setdayCode] = useState(String(props.route.params.dayCode))

    const DayCodeTemp = capitalizeFirstLetter(String(props.route.params.dayCode))

    const [totalDayHours, settotalDayHours] = useState("total" + DayCodeTemp + "Hours")

    console.log('totalDayHours', totalDayHours);

    //redux State
    const dispatch = useDispatch()
    const authDictGlobal = useSelector(state => state.authDictGlobal);
    const TemplateAssignment = useSelector(state => state.TemplateAssignment);
    const ProjecTaskList = useSelector(state => state.ProjecTaskList);
    const ProjectList = useSelector(state => state.ProjectList);

    const timeCaptureType = TemplateAssignment.timeCaptureType

    const isTotalTimeEditable = timeCaptureType == 'TIMEWISE' ? false : true

    // const [navTitle, setnavTitle] = useState(`Add Task For ${DayName} (${DayDate})`)

    const [navTitle, setnavTitle] = useState(`Add Task For ${DayName}`)

    const [authDict, setauthDict] = useState(authDictGlobal)

    const [isLoading, setisLoading] = useState(false)

    const [showProjectPicker, setshowProjectPicker] = useState(false)
    const [showTaskPicker, setshowTaskPicker] = useState(false)

    const [ProjectName, setProjectName] = useState('Choose Project')
    const [ProjectId, setProjectId] = useState('')

    const [TaskName, setTaskName] = useState('Choose Task')
    const [TaskId, setTaskId] = useState('')

    const [StartTimePicker, setStartTimePicker] = useState(false)
    const [EndTimePicker, setEndTimePicker] = useState(false)

    const [StartTime, setStartTime] = useState('')
    const [StartTime24Format, setStartTime24Format] = useState('')
    const [EndTime24Format, setEndTime24Format] = useState('')
    const [EndTime, setEndTime] = useState('')

    const [TotalTime, setTotalTime] = useState('')

    const [rawStartTime, setrawStartTime] = useState('')
    const [rawEndTime, setrawEndTime] = useState('')

    const [TaskList, setTaskList] = useState([])
    const [TaskListObject, setTaskListObject] = useState([])

    const [Notes, setNotes] = useState("")



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

        console.log("-------------------------------------------------------------------------------------------------------------------------------");


    }, []);







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

    function OnDone() {

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





        let timeSheetDayItemDescriptions = {
            "fromTime": StartTime24Format,
            "toTime": EndTime24Format,
            "hours": TotalTime,
            "notes": Notes,
            "timeSheetDayItemDescriptionId": ""
        }

        const copyOfTotalHoursGlobal = TotalHoursGlobal

        const FinalTotalHoursGlobal = AddHours(copyOfTotalHoursGlobal, TotalTime)

        dispatch(setTotalHours(FinalTotalHoursGlobal))

        console.log('timeSheetDayItemDescriptions', timeSheetDayItemDescriptions)

        console.log('timeSheetLineResVOSglobal', timeSheetLineResVOSglobal)

        // console.log('------ MainAPIPayload -----', MainAPIPayload);

        let TempTimeSheetLineResVOS = timeSheetLineResVOSglobal




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

                    console.log("if Part ---------------------------");

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
                    console.log("Not Null -------------------------")

                    let TempTimeSheetLineResVOS2 = JSON.parse(JSON.stringify(TempTimeSheetLineResVOS))

                    TempTimeSheetLineResVOS2[index][dayCode].timeSheetDayItemDescriptions.push(timeSheetDayItemDescriptions)

                    const totalDayHours2 = AddHours(String(TempTimeSheetLineResVOS2[index][dayCode].totalDayHours), TotalTime)

                    TempTimeSheetLineResVOS2[index][dayCode].totalDayHours = totalDayHours2

                    const tempTotalHours2 = AddHours(String(TempTimeSheetLineResVOS2[index].totalHours), TotalTime)

                    console.log("Not Null ------------------------- TempTimeSheetLineResVOS2[index].totalHours", TempTimeSheetLineResVOS2[index].totalHours)

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




   

                <KeyboardAwareScrollView contentContainerStyle={{
                    // alignItems: 'center',
                    justifyContent: 'center',

                    padding: 15,
                    backgroundColor: COLORS.FormBGColor
                }}>


                    <PillsDropDownStateFull dataArray={ProjectList} onSelect={(val, index) => getProjectName(val, index)} selectedData={ProjectName}  Title='Project' isSideTitle={true} sideTitle={`(${Utility.convertToDDMMYYYY(DayDate)})`}/>


                    {ProjectName == 'Choose Project' || ProjectName == ''

                        ?
                        <></>

                        :

                        <>
                            {/* Project Name */}
                            {/* <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        onPress={() => {
                            setshowProjectPicker(true)
                            console.log('OpenProjectPicker');
                        }}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Project</Text>

                        </View>

                        <View style={{ width: '60%', }}>
                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', fontFamily: Constant.MontserratRegular }}>{ProjectName}</Text>
                        </View>

                        <Image style={{
                            transform: [{ rotate: showProjectPicker ? '180deg' : '0deg' }], marginRight: 17, width: 15,
                            height: 15,
                            resizeMode: 'contain',

                        }} source={require('../../images/downArrow.png')} />

                    </TouchableOpacity> */}


                            <PillsDropDownStateFull Title='Task' dataArray={TaskList} onSelect={(val, index) => getTaskName(val, index)} selectedData={TaskName} />

                            {TaskName == 'Choose Task' || TaskName == '' ?

                                <></>

                                :

                                <>

                                    {/* Task Name */}
                                    {/* <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        onPress={() => {
                            if (ProjectName == 'Choose Project') {
                                Alert.alert("Choose Project !")
                                return
                            }
                            setshowTaskPicker(true)
                            console.log('OpenProjectPicker');
                        }}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Task</Text>

                        </View>

                        <View style={{ width: '60%', marginLeft: '3%' }}>
                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', fontFamily: Constant.MontserratRegular }}>{TaskName}</Text>
                        </View>

                        <Image style={{
                            transform: [{ rotate: showProjectPicker ? '180deg' : '0deg' }], marginRight: 17, width: 15,
                            height: 15,
                            resizeMode: 'contain',

                        }} source={require('../../images/downArrow.png')} />

                    </TouchableOpacity> */}


                                    {/* Condition Rendering for Time Capture Time */}

                                    {isTotalTimeEditable == false ?
                                        <>
                                            {/* Start Time */}
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <DateTimePicker
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

                                                {/* <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                onPress={() => {

                                    console.log('Start Time');
                                    setStartTimePicker(true);
                                    console.log(' TaskId---------- ', TaskId, ' ProjectId----------- ', ProjectId);
                                }}
                            >



                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                                    <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Start Time</Text>

                                </View>

                                <View style={{ width: '60%' }}>
                                    <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', fontFamily: Constant.MontserratRegular }}>{StartTime}</Text>
                                </View>

                                <Image style={{
                                    marginRight: 17, width: 15,
                                    height: 15,
                                    resizeMode: 'contain',

                                }} source={require('../../images/downArrow.png')} />

                            </TouchableOpacity> */}


                                                <CustomDateDesign width='45%' iconImgPath={require('../../images/clockIcon.png')} iconImgSize={{ width: 20, height: 20 }} Lable={'Start Time'} dateTitle={StartTime} onPress={() => {
                                                    console.log('Start Time');
                                                    setStartTimePicker(true);
                                                    console.log(' TaskId---------- ', TaskId, ' ProjectId----------- ', ProjectId);
                                                }} />


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

                                                {/* <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                onPress={() => {

                                    console.log('End Time');
                                    setEndTimePicker(true);
                                }}
                            >

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                                    <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>End Time</Text>

                                </View>

                                <View style={{ width: '60%' }}>
                                    <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', fontFamily: Constant.MontserratRegular }}>{EndTime}</Text>
                                </View>

                                <Image style={{
                                    marginRight: 17, width: 15,
                                    height: 15,
                                    resizeMode: 'contain',

                                }} source={require('../../images/downArrow.png')} />

                            </TouchableOpacity> */}

                                                <CustomDateDesign width='45%' iconImgPath={require('../../images/clockIcon.png')} iconImgSize={{ width: 20, height: 20 }} Lable={'End Time'} dateTitle={EndTime} onPress={() => {
                                                    console.log('End Time');
                                                    setEndTimePicker(true);
                                                }} />
                                            </View>
                                        </>
                                        :
                                        <></>
                                    }

                                    {/* Total Time */}

                                    {/* <View style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}

                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Total Time</Text>

                        </View>

                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', marginRight: 13, height: 30 }}>
                            <Text  allowFontScaling={false} Input style={{ flex: 1, width: '100%', borderWidth: 1, backgroundColor: 'white', borderColor: '#E5E5E5', borderRadius: 6, alignItems: 'center', padding: 0, paddingLeft: 8, color: '#8687A4' }}
                                keyboardType='ascii-capable'
                                allowFontScaling={false}
                                value={TotalTime}
                                onChangeText={(text) => {
                                    setTotalTime(text)
                                }}
                                editable={isTotalTimeEditable}
                                returnKeyType='done'
                            />
                        </View>

                        

                    </View> */}




                                    {/* New Total Time */}
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>


                                        <Text  allowFontScaling={false}  style={{
                                            fontFamily: Constant.MontserratMedium,
                                            fontSize: 15,
                                        }}>Total Time (HH:MM)</Text>

                                    </View>
                                    {/* <View style={{ display: 'flex', width: '100%', height: 740, backgroundColor: 'white', marginTop: 5, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, padding: 5 }}

                                    > */}


                                    <View style={{ width: 95, justifyContent: 'space-evenly', alignItems: 'center', marginRight: 13, height: 40, marginBottom: 15, borderRadius: 10, flexDirection: 'row', backgroundColor: 'white', }}>
                                        <TextInput  allowFontScaling={false} Input style={{ flex: 1, width: '100%', backgroundColor: 'white',  borderRadius: 10, alignItems: 'center', padding: 0, paddingLeft: 8, color: 'black' }}
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

                                    {/* <Image style={{
                            marginRight: 17, width: 15,
                            height: 15,
                            resizeMode: 'contain',

                        }} source={require('../../images/downArrow.png')} /> */}

                                    {/* </View> */}




                                    {/* Notes */}

                                    {/* <View style={{ display: 'flex', width: '100%', height: 100, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'column', padding: 6, paddingLeft: 0 }}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Notes</Text>

                        </View>


                        <Text  allowFontScaling={false} Input style={{ flex: 1, width: '87.5%', borderWidth: 1, backgroundColor: 'white', borderColor: '#E5E5E5', borderRadius: 6, padding: 0, paddingLeft: 8, marginTop: 5, marginLeft: 40, color: '#8687A4' }}
                            keyboardType='ascii-capable'
                            allowFontScaling={false}
                            multiline={true}
                            onChangeText={(text) => {
                                setNotes(text)
                            }}
                            value={Notes}
                            returnKeyType='done'

                        />


                       

                    </View> */}


                                    <CustomCommentInput label='Notes' value={Notes} onChangeText={(text) => { setNotes(text) }} />

                                </>
                            }

                        </>
                    }
                </KeyboardAwareScrollView>






            </View>

            <View style={{
                // borderBottomWidth: 0.5, borderBotztomColor: '#BBBBBB',  height: '10%', paddingTop: 10, flexDirection: 'row',
                width: '100%', alignItems: 'center', justifyContent: 'center', 
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


                <SubmitBtnWide onPress={() => OnDone()} />



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

export default TimeSheetsAddTask;