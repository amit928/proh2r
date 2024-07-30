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
import styles from './TimeSheetsWeekViewStyle';
import { useSelector, useDispatch } from 'react-redux';
import { SetTemplateAssignment, SetGetprojecTaskList, SetProjectList, settimeSheetLineResVOSglobal, settimeSheetTestResponse, setTimeSheetApprStatusFlag, setTotalHours } from '../../ReduxAction';
import { useIsFocused } from '@react-navigation/native';
import * as Fonts from '../../components/Fonts';
import { Shadow } from 'react-native-shadow-2';
import { convertToDDMMYYYY } from '../../Externel Constant/Utility';

const TimesheetStatusIndicator = ({ colorForTimeSheetApprStatus }) => (


    <>
        {colorForTimeSheetApprStatus == '#66bb6a' ? <Image style={{ width: 35, height: 35, resizeMode: 'contain' }} source={require('../../images/timeSheetApproved.png')}></Image>
            : colorForTimeSheetApprStatus == '#ef5350' ? <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={require('../../images/timesheetRejected.png')}></Image> : colorForTimeSheetApprStatus == '#ffc107' ? <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={require('../../images/timesheetSubmitted.png')}></Image> : colorForTimeSheetApprStatus == '#5683AF' ? <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={require('../../images/timesheetDraft.png')}></Image> :
                <View style={{ backgroundColor: '#CBCBCB', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: colorForTimeSheetApprStatus, width: 20, height: 20, borderRadius: 14, }}></View>
                </View>}


    </>


)


const ProjectTaskEntryBar = ({ timeSheetLineResVOS, dayCode, editFunc, deleteFunc, viewOnly }) => {


    const isFocused = useIsFocused();

    //Update State on GoBack
    const [UpdateState, setUpdateState] = useState(true)

    useEffect(() => {


        setUpdateState(UpdateState)




    }, [isFocused]);

    {/* Project Task */ }

    return (

        // {timeSheetLineResVOS == null || timeSheetLineResVOS == '' ? null : null }
        <>
            {timeSheetLineResVOS == null || timeSheetLineResVOS == '' ? null || timeSheetLineResVOS == [] :

                timeSheetLineResVOS.map((item, index) => {
                    const ProjectName = item.projectName
                    const TaskName = item.taskName

                    return <>
                        {
                            item[dayCode] == null || item[dayCode] == '' ? null :

                                item[dayCode].timeSheetDayItemDescriptions.map((item2, index2) => {

                                    console.log("ProjectTaskMan", ProjectName, TaskName, item2.hours);

                                    return <View
                                        key={index2}
                                        style={{ width: "95%", height: 60, backgroundColor: '#5683AF', flexDirection: 'row', marginBottom: 2 }}

                                    >

                                        <View style={{ height: '100%', width: '50%', flexDirection: 'column', justifyContent: 'center', paddingLeft: 10 }}>
                                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: 5 }} contentContainerStyle={{ justifyContent: 'center', }}>
                                                <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16, fontFamily: Constant.MontserratRegular, }}> {ProjectName} </Text>
                                                <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16, fontFamily: Constant.MontserratRegular, }}> {TaskName} </Text>

                                            </ScrollView>



                                        </View>


                                        {/* Temporary Edit  */}
                                        <View style={{ height: '100%', width: '30%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 14, }}
                                        // onPress={() => {

                                        //     editFunc(index, dayCode, index2, item, item2)

                                        // }}
                                        >
                                            <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16, fontFamily: Constant.MontserratRegular }}

                                            > {item2.hours} </Text>
                                        </View>

                                        {/* Temporary Delete  */}
                                        <View style={{ height: '100%', width: '20%', display: 'flex', flexDirection: 'row', padding: 4, alignItems: 'center', justifyContent: 'center' }}
                                        // onPress={() => {

                                        //     deleteFunc(index, dayCode, index2, item, item2)


                                        // }}
                                        >

                                            {viewOnly ?


                                                <TouchableOpacity onPress={() => {

                                                    editFunc(index, dayCode, index2, item, item2)

                                                }}>
                                                    <Image

                                                        source={require('../../images/view_timesheet.png')}
                                                        style={{
                                                            width: 24.5,
                                                            height: 24.5,
                                                            resizeMode: 'contain',
                                                            // alignSelf: 'center',
                                                            // right: 10,

                                                        }} />
                                                </TouchableOpacity>

                                                : <>
                                                    <TouchableOpacity onPress={() => {

                                                        editFunc(index, dayCode, index2, item, item2)

                                                    }}>
                                                        <Image

                                                            source={require('../../images/editing_timesheet.png')}
                                                            style={{
                                                                width: 24.5,
                                                                height: 24.5,
                                                                resizeMode: 'contain',
                                                                // alignSelf: 'center',
                                                                // right: 10,

                                                            }} />
                                                    </TouchableOpacity>


                                                    <TouchableOpacity onPress={() => {

                                                        deleteFunc(index, dayCode, index2, item, item2)


                                                    }}>
                                                        <Image
                                                            source={require('../../images/delete_timesheet.png')}
                                                            style={{
                                                                width: 24.5,
                                                                height: 24.5,
                                                                resizeMode: 'contain',
                                                                marginLeft: 5
                                                                // alignSelf: 'center',
                                                                // right: 10,



                                                            }} />
                                                    </TouchableOpacity>

                                                </>
                                            }
                                            {/* <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16, }}> Delete </Text> */}

                                        </View>

                                    </View>

                                }
                                )
                        }
                    </>
                })

            }
        </>
    );


}



const TimeSheetsWeekView = (props) => {

    const dispatch = useDispatch()
    const timeSheetLineResVOSglobal = useSelector(state => state.timeSheetLineResVOSglobal)
    const TemplateAssignment = useSelector(state => state.TemplateAssignment)
    let WeekStartDateTemp = Moment(new Date(props.route.params.TimeSheetData.previousDay).toISOString())
    let WeekEndDateTemp = Moment(new Date(props.route.params.TimeSheetData.nextDay).toISOString())


    let Monday = new Date(WeekStartDateTemp);
    Monday.setDate(Monday.getDate() + 1);

    let Tuesday = new Date(WeekStartDateTemp);
    Tuesday.setDate(Tuesday.getDate() + 2);

    let Wednesday = new Date(WeekStartDateTemp);
    Wednesday.setDate(Wednesday.getDate() + 3);

    let Thursday = new Date(WeekStartDateTemp);
    Thursday.setDate(Thursday.getDate() + 4);

    let Friday = new Date(WeekStartDateTemp);
    Friday.setDate(Friday.getDate() + 5);




    const timeSheetTestResponse = useSelector(state => state.timeSheetTestResponse);

    const authDictGlobal = useSelector(state => state.authDictGlobal);

    const TimeSheetApprStatusFlag = useSelector(state => state.TimeSheetApprStatusFlag);

    const TotalHoursGlobal = useSelector(state => state.TotalHours);


    const [navTitle, setnavTitle] = useState('Time View')

    const [authDict, setauthDict] = useState(authDictGlobal)

    const [isLoading, setisLoading] = useState(false)


    const [SundayOpen, setSundayOpen] = useState(false)
    const [MondayOpen, setMondayOpen] = useState(false)
    const [TueOpen, setTueOpen] = useState(false)
    const [WedOpen, setWedOpen] = useState(false)
    const [ThuOpen, setThuOpen] = useState(false)
    const [FriOpen, setFriOpen] = useState(false)
    const [SatOpen, setSatOpen] = useState(false)

    const [WeekStartDate, setWeekStartDate] = useState(Moment(WeekStartDateTemp).format('YYYY-MM-DD'))
    const [WeekEndDate, setWeekEndDate] = useState(Moment(WeekEndDateTemp).format('YYYY-MM-DD'))

    // Date To Show on Screen
    const [WeekStartDateShow, setWeekStartDateShow] = useState(Moment(WeekStartDateTemp).format('ll'))
    const [WeekEndDateShow, setWeekEndDateShow] = useState(Moment(WeekEndDateTemp).format('ll'))



    const [SundayDate, setSundayDate] = useState(WeekStartDate)
    const [MondayDate, setMondayDate] = useState(Moment(Monday).format('YYYY-MM-DD'))
    const [TueDate, setTueDate] = useState(Moment(Tuesday).format('YYYY-MM-DD'))
    const [WedDate, setWedDate] = useState(Moment(Wednesday).format('YYYY-MM-DD'))
    const [ThuDate, setThuDate] = useState(Moment(Thursday).format('YYYY-MM-DD'))
    const [FriDate, setFriDate] = useState(Moment(Friday).format('YYYY-MM-DD'))
    const [SatDate, setSatDate] = useState(WeekEndDate)


    const [colorForTimeSheetApprStatus, setcolorForTimeSheetApprStatus] = useState("#5683AF")

    const [MainAPIPayload, setMainAPIPayload] = useState({
        "empCode": "",
        "fromDate": "",
        "toDate": "",
        "timeSheetApprovalStatus": "",
        "timeSheetId": null,
        "totalDeviationHours": null,
        "totalHours": "00:00",
        "workWeekHours": "00:00",
        "totalDay0Hours": "00:00",
        "totalDay1Hours": "00:00",
        "totalDay2Hours": "00:00",
        "totalDay3Hours": "00:00",
        "totalDay4Hours": "00:00",
        "totalDay5Hours": "00:00",
        "totalDay6Hours": "00:00",
        "timeSheetLineResVOS": []
    })

    // const MainAPIPayload = useSelector(state => state.MainAPIPayload);

    const [timeSheetApprovalStatus, settimeSheetApprovalStatus] = useState("")


    const [TestTimeSheetArray, setTestTimeSheetArray] = useState(timeSheetTestResponse.timeSheetLineResVOS)

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



    function TestTimeSheet() {
        // let arr = []
        // arr = timeSheetTestResponse.timeSheetLineResVOS
        console.log("timeSheetTestResponse.timeSheetLineResVOS-------------------", TestTimeSheetArray)

        // setTestTimeSheetArray(arr)

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



    function editProjTask(timeSheetLineResVOSindex, DayCode, timeSheetDayItemDescriptionsIndex, timeSheetLineResVOS, timeSheetDayItemDescriptions) {

        console.log("timeSheetLineResVOSindex: ", timeSheetLineResVOSindex, "DayCode: ", DayCode, "timeSheetDayItemDescriptionsIndex: ", timeSheetDayItemDescriptionsIndex, " |timeSheetLineResVOS| ", timeSheetLineResVOS, " |timeSheetDayItemDescriptions|| ", timeSheetDayItemDescriptions);

        props.navigation.navigate('TimeSheetEditTask', { dayCode: DayCode, timeSheetLineResVOS, timeSheetDayItemDescriptions, timeSheetLineResVOSindex: timeSheetLineResVOSindex, timeSheetDayItemDescriptionsIndex: timeSheetDayItemDescriptionsIndex })

    }

    function DeleteProjTask(timeSheetLineResVOSindex, DayCode, timeSheetDayItemDescriptionsIndex, timeSheetLineResVOS, timeSheetDayItemDescriptions) {

        if (TimeSheetApprStatusFlag) {
            Alert.alert("Level 1 Pending", "Timesheet Already Submitted, You Cannot Make any Changes.")
            return
        }


        Alert.alert(
            'Warning !',
            'Do You Want To Delete This ?',
            [
                {
                    text: 'OK',
                    onPress: () => {

                        console.log("timeSheetLineResVOSindex: ", timeSheetLineResVOSindex, "DayCode: ", DayCode, "timeSheetDayItemDescriptionsIndex: ", timeSheetDayItemDescriptionsIndex, " |timeSheetLineResVOS| ", timeSheetLineResVOS, " |timeSheetDayItemDescriptions|| ", timeSheetDayItemDescriptions);

                        const timeSheetLineResVOSindexCopy = parseInt(timeSheetLineResVOSindex)
                        const timeSheetDayItemDescriptionsIndexCopy = parseInt(timeSheetDayItemDescriptionsIndex)

                        let TempCopytimeSheetLineResVOSglobal = JSON.parse(JSON.stringify(timeSheetLineResVOSglobal))

                        const Subtract_Hours = JSON.parse(JSON.stringify(timeSheetDayItemDescriptions.hours))

                        const copyOfTotalHoursGlobal = TotalHoursGlobal

                        const FinalTotalHoursGlobal = SubtractHours(copyOfTotalHoursGlobal, Subtract_Hours)

                        dispatch(setTotalHours(FinalTotalHoursGlobal))

                        TempCopytimeSheetLineResVOSglobal[timeSheetLineResVOSindexCopy][DayCode].timeSheetDayItemDescriptions.splice(timeSheetDayItemDescriptionsIndexCopy, 1)

                        let FinalTime = SubtractHours(TempCopytimeSheetLineResVOSglobal[timeSheetLineResVOSindexCopy][DayCode].totalDayHours, Subtract_Hours)

                        if (FinalTime == "00:00") {
                            TempCopytimeSheetLineResVOSglobal[timeSheetLineResVOSindexCopy][DayCode] = null
                        }

                        else {
                            TempCopytimeSheetLineResVOSglobal[timeSheetLineResVOSindexCopy][DayCode].totalDayHours = FinalTime
                        }



                        let FinalTime2 = SubtractHours(TempCopytimeSheetLineResVOSglobal[timeSheetLineResVOSindexCopy].totalHours, Subtract_Hours)

                        TempCopytimeSheetLineResVOSglobal[timeSheetLineResVOSindexCopy].totalHours = FinalTime2

                        dispatch(settimeSheetLineResVOSglobal(TempCopytimeSheetLineResVOSglobal))





                    },
                }, ,
                {
                    text: 'Cancel',
                }
            ],

            { cancelable: false },
        );





    }


    function getPreviousWeek(start_Date, end_Date) {
        setMainAPIPayload({
            "empCode": "",
            "fromDate": "",
            "toDate": "",
            "timeSheetApprovalStatus": "",
            "timeSheetId": null,
            "totalDeviationHours": null,
            "totalHours": "00:00",
            "workWeekHours": "00:00",
            "totalDay0Hours": "00:00",
            "totalDay1Hours": "00:00",
            "totalDay2Hours": "00:00",
            "totalDay3Hours": "00:00",
            "totalDay4Hours": "00:00",
            "totalDay5Hours": "00:00",
            "totalDay6Hours": "00:00",
            "timeSheetLineResVOS": []
        })
        dispatch(SetProjectList([]))
        dispatch(settimeSheetLineResVOSglobal([]))
        dispatch(SetTemplateAssignment({}))
        dispatch(setTimeSheetApprStatusFlag(false))
        dispatch(SetGetprojecTaskList([]))


        let startWeekDate = new Date(start_Date)
        startWeekDate.setDate(startWeekDate.getDate() - 7);
        const momentDate = Moment(startWeekDate.toISOString());
        let firstDate = Moment(momentDate).format('YYYY-MM-DD');

        setSundayDate(firstDate)

        // Change Every Day Date.
        let Monday2 = new Date(momentDate);
        Monday2.setDate(Monday2.getDate() + 1);
        setMondayDate(Moment(Monday2).format('YYYY-MM-DD'))

        let Tuesday2 = new Date(momentDate);
        Tuesday2.setDate(Tuesday2.getDate() + 2);
        setTueDate(Moment(Tuesday2).format('YYYY-MM-DD'))

        let Wednesday2 = new Date(momentDate);
        Wednesday2.setDate(Wednesday2.getDate() + 3);
        setWedDate(Moment(Wednesday2).format('YYYY-MM-DD'))

        let Thursday2 = new Date(momentDate);
        Thursday2.setDate(Thursday2.getDate() + 4);
        setThuDate(Moment(Thursday2).format('YYYY-MM-DD'))

        let Friday2 = new Date(momentDate);
        Friday2.setDate(Friday2.getDate() + 5);
        setFriDate(Moment(Friday2).format('YYYY-MM-DD'))


        let endWeekDate = new Date(end_Date)
        endWeekDate.setDate(endWeekDate.getDate() - 7);
        const momentDate2 = Moment(endWeekDate.toISOString());
        let lastDate = Moment(momentDate2).format('YYYY-MM-DD');

        console.log("------------- firstDate ", firstDate, "------------- lastDate ", lastDate);

        setWeekStartDateShow(String(Moment(momentDate).format('ll')))
        setWeekEndDateShow(String(Moment(momentDate2).format('ll')))

        setSatDate(lastDate)


        setSundayOpen(false)
        setMondayOpen(false)
        setTueOpen(false)
        setWedOpen(false)
        setThuOpen(false)
        setFriOpen(false)
        setSatOpen(false)


        setWeekStartDate(String(firstDate))

        setWeekEndDate(String(lastDate))
    }

    function getNextWeek(start_Date, end_Date) {
        setMainAPIPayload({
            "empCode": "",
            "fromDate": "",
            "toDate": "",
            "timeSheetApprovalStatus": "",
            "timeSheetId": null,
            "totalDeviationHours": null,
            "totalHours": "00:00",
            "workWeekHours": "00:00",
            "totalDay0Hours": "00:00",
            "totalDay1Hours": "00:00",
            "totalDay2Hours": "00:00",
            "totalDay3Hours": "00:00",
            "totalDay4Hours": "00:00",
            "totalDay5Hours": "00:00",
            "totalDay6Hours": "00:00",
            "timeSheetLineResVOS": []
        })
        dispatch(SetProjectList([]))
        dispatch(settimeSheetLineResVOSglobal([]))
        dispatch(SetTemplateAssignment({}))
        dispatch(setTimeSheetApprStatusFlag(false))
        dispatch(SetGetprojecTaskList([]))


        let startWeekDate = new Date(start_Date)
        startWeekDate.setDate(startWeekDate.getDate() + 7);
        const momentDate = Moment(startWeekDate.toISOString());
        let firstDate = Moment(momentDate).format('YYYY-MM-DD');



        setSundayDate(firstDate)

        // Change Every Day Date.
        let Monday2 = new Date(momentDate);
        Monday2.setDate(Monday2.getDate() + 1);
        setMondayDate(Moment(Monday2).format('YYYY-MM-DD'))

        let Tuesday2 = new Date(momentDate);
        Tuesday2.setDate(Tuesday2.getDate() + 2);
        setTueDate(Moment(Tuesday2).format('YYYY-MM-DD'))

        let Wednesday2 = new Date(momentDate);
        Wednesday2.setDate(Wednesday2.getDate() + 3);
        setWedDate(Moment(Wednesday2).format('YYYY-MM-DD'))

        let Thursday2 = new Date(momentDate);
        Thursday2.setDate(Thursday2.getDate() + 4);
        setThuDate(Moment(Thursday2).format('YYYY-MM-DD'))

        let Friday2 = new Date(momentDate);
        Friday2.setDate(Friday2.getDate() + 5);
        setFriDate(Moment(Friday2).format('YYYY-MM-DD'))



        let endWeekDate = new Date(end_Date)
        endWeekDate.setDate(endWeekDate.getDate() + 7);
        const momentDate2 = Moment(endWeekDate.toISOString());
        let lastDate = Moment(momentDate2).format('YYYY-MM-DD');

        console.log("------------- firstDate ", firstDate, "------------- lastDate ", lastDate);
        setWeekStartDateShow(String(Moment(momentDate).format('ll')))
        setWeekEndDateShow(String(Moment(momentDate2).format('ll')))

        setSatDate(lastDate)

        setSundayOpen(false)
        setMondayOpen(false)
        setTueOpen(false)
        setWedOpen(false)
        setThuOpen(false)
        setFriOpen(false)
        setSatOpen(false)

        setWeekStartDate(String(firstDate))
        setWeekEndDate(String(lastDate))
    }



    useEffect(() => {


        console.log('authDictGlobal', authDictGlobal)

        getTemplateAssignment(authDictGlobal.employeeCode)

        // TestTimeSheet()


    }, [WeekEndDate]);




    async function getTemplateAssignment(empCode) {

        var url = Constant.BASE_URL + Constant.TIMESHEET + "template-assignment/" + empCode

        console.log(url)

        setisLoading(true)

        // console.warn(url)

        // console.warn("authDict", authDict);



        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDictGlobal)
            }
            )

            console.log("yoyoyoyouyoyohy", response)

            let code = await response.status
            //setisLoading(false)

            if (code == 200) {

                let responseJson = await response.json();
                console.log("Response Json getTemplateAssignment", responseJson)
                dispatch(SetTemplateAssignment(responseJson))
                getTemplateDetails(empCode, responseJson.templateId)
                // setisLoading(false)





            }

            else if (code == 503) {

                Alert.alert('Server Under Maintenance !')
                Vibration.vibrate()

            }

            else {

                let msg = await response.statusText
                setisLoading(false)
                // this.refs.toast.show('Something went wrong!');
                Alert.alert('Something Went Wrong')
                Vibration.vibrate()

                // Alert.alert('Something went wrong!')

            }
        } catch (error) {
            console.error(error);
            setisLoading(false)
        }


    }



    async function getTemplateDetails(empCode, templateId) {

        var url = Constant.BASE_URL + Constant.TIMESHEET + "template/" + templateId

        console.log('url', url)
        console.log('templateId', templateId);

        // setisLoading(true)

        // console.warn(url)

        // console.warn("authDict", authDict);



        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDictGlobal)
            }
            )

            console.log("yoyoyoyouyoyohy", response)

            let code = await response.status
            //setisLoading(false)

            if (code == 200) {

                let responseJson = await response.json();
                console.log("Response Json getTemplateDetails", responseJson)
                getAllTimeSheetData(empCode, templateId, responseJson.hoursForWorkWeek, WeekStartDate, WeekEndDate)
                // dispatch(SetTemplateAssignment(responseJson))
                // setisLoading(false)





            } else {

                let msg = await response.statusText
                setisLoading(false)
                // this.refs.toast.show('Something went wrong!');
                Alert.alert('Something Went Wrong')
                Vibration.vibrate()

                // Alert.alert('Something went wrong!')

            }
        } catch (error) {
            console.error(error);
            setisLoading(false)
        }


    }

    async function getAllTimeSheetData(empCode, templateId, totalHours, weekStartD, weekEndD) {

        var url = Constant.BASE_URL + Constant.TIMESHEET + "getall/" + empCode + "/" + weekStartD + "/" + weekEndD

        console.log('url', url)
        console.log('templateId', templateId);

        // setisLoading(true)

        // console.warn(url)

        // console.warn("authDict", authDict);



        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDictGlobal)
            }
            )

            console.log("yoyoyoyouyoyohy", response)

            let code = await response.status
            //setisLoading(false)

            if (code == 200) {

                let responseJson = await response.json();
                console.log("Response Json getAllTimeSheetData", responseJson);
                // dispatch(SetTemplateAssignment(responseJson))

                if (responseJson.timeSheetLineResVOS == null || responseJson.timeSheetLineResVOS == '') {

                    let tempCopyMainAPIPayload = MainAPIPayload;



                    tempCopyMainAPIPayload.empCode = empCode;
                    tempCopyMainAPIPayload.fromDate = WeekStartDate;
                    tempCopyMainAPIPayload.toDate = WeekEndDate;
                    tempCopyMainAPIPayload.workWeekHours = totalHours;

                    setMainAPIPayload(tempCopyMainAPIPayload)

                    // setisLoading(false)
                    dispatch(setTotalHours("00:00"))

                    setcolorForTimeSheetApprStatus("#808080")

                    dispatch(setTimeSheetApprStatusFlag(false))

                }

                else {


                    let tempCopyMainAPIPayload2 = responseJson;

                    delete tempCopyMainAPIPayload2.empName
                    delete tempCopyMainAPIPayload2.empDocId

                    dispatch(setTotalHours(responseJson.totalHours))

                    tempCopyMainAPIPayload2.empCode = empCode;
                    tempCopyMainAPIPayload2.fromDate = WeekStartDate;
                    tempCopyMainAPIPayload2.toDate = WeekEndDate;
                    tempCopyMainAPIPayload2.workWeekHours = totalHours;

                    setMainAPIPayload(tempCopyMainAPIPayload2)

                    let timeSheetLineResVOSCopy = timeSheetLineResVOSglobal

                    // timeSheetLineResVOSglobal

                    tempCopyMainAPIPayload2.timeSheetLineResVOS.forEach((item4, i) => {

                        timeSheetLineResVOSCopy.push(item4)

                    })

                    dispatch(settimeSheetLineResVOSglobal(timeSheetLineResVOSCopy))

                    // settimeSheetApprovalStatus(responseJson.timeSheetApprovalStatus)

                    if (responseJson.timeSheetApprovalStatus == "LEVEL_1_PENDING" || responseJson.timeSheetApprovalStatus == "APPROVED") {

                        dispatch(setTimeSheetApprStatusFlag(true))


                    }
                    else {
                        dispatch(setTimeSheetApprStatusFlag(false))
                    }

                    console.log("responseJson.timeSheetApprovalStatus", responseJson.timeSheetApprovalStatus);
                    if (responseJson.timeSheetApprovalStatus == "LEVEL_1_PENDING") {
                        setcolorForTimeSheetApprStatus("#ffc107")
                    }

                    else if (responseJson.timeSheetApprovalStatus == "APPROVED") {
                        setcolorForTimeSheetApprStatus("#66bb6a")
                    }

                    else if (responseJson.timeSheetApprovalStatus == "LEVEL_1_REJECTED") {
                        setcolorForTimeSheetApprStatus("#ef5350")
                    }

                    else if (responseJson.timeSheetApprovalStatus == "DRAFT") {
                        setcolorForTimeSheetApprStatus("#5683AF")
                        // console.log("DRAFT is Executing");
                    }



                    // setisLoading(false)

                }

                getprojecTaskList(empCode, templateId)

            } else {

                let msg = await response.statusText
                setisLoading(false)
                // this.refs.toast.show('Something went wrong!');
                Alert.alert('Something Went Wrong')
                Vibration.vibrate()

                // Alert.alert('Something went wrong!')

            }
        } catch (error) {
            console.error(error);
            setisLoading(false)
        }


    }

    async function getprojecTaskList(empCode, templateId) {

        var url = Constant.BASE_URL + Constant.TIMESHEET + "projecTaskList/" + empCode + "/" + WeekStartDate + "/" + WeekEndDate

        console.log('url', url)
        console.log('templateId', templateId);

        // setisLoading(true)

        // console.warn(url)

        // console.warn("authDict", authDict);



        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDictGlobal)
            }
            )

            console.log("yoyoyoyouyoyohy", response)

            let code = await response.status


            if (code == 200) {

                let responseJson = await response.json();
                console.log("Response Json getprojecTaskList", responseJson)
                dispatch(SetGetprojecTaskList(responseJson))

                let projectList = []

                responseJson.forEach((item, index) => {

                    projectList.push(item.projectName)

                })


                let timeSheetLineResVOS = timeSheetLineResVOSglobal

                let TemplatetimeSheetLineResVOS = {
                    "projectName": "",
                    "projectId": "",
                    "taskId": "",
                    "taskName": "",
                    "totalHours": "00:00",
                    "timeSheetLineItemId": "",
                    "day0": null,
                    "day1": null,
                    "day2": null,
                    "day3": null,
                    "day4": null,
                    "day5": null,
                    "day6": null
                }

                responseJson.forEach((item, index) => {

                    let tempD = {
                        "projectName": "",
                        "projectId": "",
                        "taskId": "",
                        "taskName": "",
                        "totalHours": "00:00",
                        "timeSheetLineItemId": "",
                        "day0": null,
                        "day1": null,
                        "day2": null,
                        "day3": null,
                        "day4": null,
                        "day5": null,
                        "day6": null
                    }

                    let tempProjectName = item.projectName
                    let tempProjectId = item.projectId

                    item.Tasks.forEach((item2, index2) => {

                        let tempD2 = {
                            "projectName": "",
                            "projectId": "",
                            "taskId": "",
                            "taskName": "",
                            "totalHours": "00:00",
                            "timeSheetLineItemId": "",
                            "day0": null,
                            "day1": null,
                            "day2": null,
                            "day3": null,
                            "day4": null,
                            "day5": null,
                            "day6": null
                        }



                        let tempTaskName = item2.taskName
                        let tempTaskId = item2.taskId


                        tempD2["projectName"] = tempProjectName
                        tempD2["projectId"] = tempProjectId
                        tempD2["taskName"] = tempTaskName
                        tempD2["taskId"] = tempTaskId



                        // console.log("tempD", tempD)

                        timeSheetLineResVOS.push(tempD2)



                    })

                })

                console.log(timeSheetLineResVOS)

                dispatch(settimeSheetLineResVOSglobal(timeSheetLineResVOS))

                console.log('projectList', projectList);

                dispatch(SetProjectList(projectList))


                // getTemplateDetails(empCode, templateId)

                setisLoading(false)



            } else {

                let msg = await response.statusText
                setisLoading(false)
                // this.refs.toast.show('Something went wrong!');
                Alert.alert('Something Went Wrong')
                Vibration.vibrate()

                // Alert.alert('Something went wrong!')

            }
        } catch (error) {
            console.error(error);
            setisLoading(false)
        }


    }

    async function sendTimeSheetAPI(payload) {

        setisLoading(true)

        console.log("sendTimeSheetAPI payload: ", payload);

        var url = Constant.BASE_URL + "timesheets/"

        console.log('sendTimeSheetAPI URL', url);



        try {
            var requestOptions = {
                method: 'POST',
                headers: Constant.getHeader(authDict),
                body: JSON.stringify(payload),
            };

            console.log('requet option', requestOptions);

            let response = await fetch(url, requestOptions);
            // console.warn('data', response);
            let code = response.status;
            //this.setState({isLoading: false});

            if (code == 201 || code == 200) {
                setisLoading(false)
                let responseJson = await response.json();
                // console.log(responseJson)
                console.log(responseJson);






                Alert.alert(responseJson.message);
                Vibration.vibrate()


                goBack()

            } else if (code == 400) {
                setisLoading(false)
                let responseJson = await response.json();
                console.log(responseJson);
                console.warn('message', responseJson.message);
                Alert.alert(String(responseJson.message))
                Vibration.vibrate()
                // this.refs.toast.show(responseJson.message);

                goBack()

            } else if (code == 401 || code == 503) {
                setisLoading(false)
                let responseJson = await response.json();
                console.warn('message', responseJson.message);
                Alert.alert(String(responseJson.message))
                Vibration.vibrate()
                // Utility.logoutOnError(this.state.authDict, this.props.navigation);

                goBack()
            } else {
                // this.refs.toast.show('Something went wrong!');

                console.log('Something went wrong! ' + code)
                Alert.alert('Something Went Wrong - ' + String(code))
                Vibration.vibrate()
                goBack()
                setisLoading(false)
            }
        } catch (error) {
            setisLoading(false)
            Alert.alert(
                '',
                'Internet connection appears to be offline. Please check your internet connection and try again.',
            );

            Vibration.vibrate()
            //   this.setState({isLoading: false});

            console.error(error);
            throw error


        }

    }

    function OnSave(TimeSheetAppStatus) {

        if (TotalHoursGlobal == "00:00") {
            Alert.alert("Cannot Proceed", "Please fill atleast one timesheet line !")

            Vibration.vibrate()
            return
        }

        if (TotalHoursGlobal == "NaN:NaN") {
            Alert.alert("Cannot Proceed", "Something went Wrong !")

            Vibration.vibrate()
            goBack()
            return
        }

        const tempLate = {
            "empCode": "",
            "fromDate": "",
            "toDate": "",
            "timeSheetApprovalStatus": "",
            "timeSheetId": null,
            "totalDeviationHours": null,
            "totalHours": "00:00",
            "workWeekHours": "00:00",
            "totalDay0Hours": "00:00",
            "totalDay1Hours": "00:00",
            "totalDay2Hours": "00:00",
            "totalDay3Hours": "00:00",
            "totalDay4Hours": "00:00",
            "totalDay5Hours": "00:00",
            "totalDay6Hours": "00:00",
            "timeSheetLineResVOS": []
        };



        let CopyofMainAPIPayload = JSON.parse(JSON.stringify(MainAPIPayload))

        console.log("OnSave CopyofMainAPIPayload==============------------", CopyofMainAPIPayload);

        let TotalHours = '00:00'

        let totalDayHoursCopy = {
            totalDay0Hours: '',
            totalDay1Hours: '',
            totalDay2Hours: '',
            totalDay3Hours: '',
            totalDay4Hours: '',
            totalDay5Hours: '',
            totalDay6Hours: ''
        }

        // const SubtracttotalDayHoursCopy = JSON.parse(JSON.stringify(totalDayHoursCopy))




        // let totalDay0Hours = CopyofMainAPIPayload.totalDay0Hours
        // let totalDay1Hours = CopyofMainAPIPayload.totalDay1Hours
        // let totalDay2Hours = CopyofMainAPIPayload.totalDay2Hours
        // let totalDay3Hours = CopyofMainAPIPayload.totalDay3Hours
        // let totalDay4Hours = CopyofMainAPIPayload.totalDay4Hours
        // let totalDay5Hours = CopyofMainAPIPayload.totalDay5Hours
        // let totalDay6Hours = CopyofMainAPIPayload.totalDay6Hours

        let TemptimeSheetLineResVOSglobal = JSON.parse(JSON.stringify(timeSheetLineResVOSglobal))

        console.log("TemptimeSheetLineResVOSglobal Before Sorting ", TemptimeSheetLineResVOSglobal);

        let timeSheetLineResVOSglobalPayload = []

        TemptimeSheetLineResVOSglobal.forEach((item, index) => {


            if (item.totalHours == "00:00" || item.totalHours == '' || item.totalHours == null) {

            }

            else {

                let itemCopy = item

                for (let i = 0; i < 7; i++) {


                    const dayCode2 = `day${[i]}`

                    if (itemCopy[dayCode2] == null) {



                    }

                    else if (itemCopy[dayCode2] == '') {



                    }

                    else {

                        const totalDayHoursObj = `totalDay${i}Hours`

                        if (totalDayHoursCopy[totalDayHoursObj] == '') {

                            totalDayHoursCopy[totalDayHoursObj] = itemCopy[dayCode2].totalDayHours

                        }

                        // else if ((totalDayHoursCopy[totalDayHoursObj] == '00:00')){
                        //     totalDayHoursCopy[totalDayHoursObj] = itemCopy[dayCode2].totalDayHours
                        // }

                        else {

                            totalDayHoursCopy[totalDayHoursObj] = AddHours(itemCopy[dayCode2].totalDayHours, totalDayHoursCopy[totalDayHoursObj])
                        }
                    }

                }

                timeSheetLineResVOSglobalPayload.push(item)

                console.log(`Before Main  ${TotalHours} , ${item.totalHours}`)

                const TempMainTotalHours = AddHours(TotalHours, item.totalHours)

                TotalHours = TempMainTotalHours

                console.log(`After Main ${TotalHours} , ${item.totalHours}`)

                console.log("---------------- HIT ------------------", TotalHours);
            }


        })


        CopyofMainAPIPayload.totalDay0Hours = totalDayHoursCopy.totalDay0Hours
        CopyofMainAPIPayload.totalDay1Hours = totalDayHoursCopy.totalDay1Hours
        CopyofMainAPIPayload.totalDay2Hours = totalDayHoursCopy.totalDay2Hours
        CopyofMainAPIPayload.totalDay3Hours = totalDayHoursCopy.totalDay3Hours
        CopyofMainAPIPayload.totalDay4Hours = totalDayHoursCopy.totalDay4Hours
        CopyofMainAPIPayload.totalDay5Hours = totalDayHoursCopy.totalDay5Hours
        CopyofMainAPIPayload.totalDay6Hours = totalDayHoursCopy.totalDay6Hours

        // for (let ind = 0; ind < 7; ind++) {

        //     if (SubtracttotalDayHoursCopy[`totalDay${ind}Hours`] == '' || SubtracttotalDayHoursCopy[`totalDay${ind}Hours`] == null) {

        //     }

        //     else{
        //         const FinalValue = SubtractHours(CopyofMainAPIPayload[`totalDay${ind}Hours`] , SubtracttotalDayHoursCopy[`totalDay${ind}Hours`])

        //        CopyofMainAPIPayload[`totalDay${ind}Hours`] = FinalValue
        //     }

        // }

        CopyofMainAPIPayload.totalHours = TotalHours
        CopyofMainAPIPayload.timeSheetApprovalStatus = TimeSheetAppStatus
        CopyofMainAPIPayload.timeSheetLineResVOS = timeSheetLineResVOSglobalPayload

        console.log('------ On Save Send API Payload-----------', CopyofMainAPIPayload);

        sendTimeSheetAPI(CopyofMainAPIPayload)

    }


    console.log('TimeSheetData Navigation', props.route.params.TimeSheetData)

    // let WeekStartDateTemp = Moment(new Date(props.route.params.TimeSheetData.previousDay).toISOString())
    // setWeekStartDate(Moment(WeekStartDateTemp).format('DD-MM-YYYY'))
    console.log('WeekStartDate', WeekStartDate);

    // let WeekEndDateTemp = Moment(new Date(props.route.params.TimeSheetData.nextDay).toISOString())
    // setWeekEndDate(Moment(WeekEndDateTemp).format('DD-MM-YYYY'))
    console.log('WeekEndDate', WeekEndDate)




    console.log('-------------------------- timeSheetTestResponse --------------------------------------', timeSheetTestResponse);


    // UI
    return (
        <>
            <View style={{ width: '100%', height: '100%', backgroundColor: '' }}>

                {/* <Loader isLoader={isLoading}> </Loader> */}
                <Nav
                    backHidden={false}
                    title={navTitle}
                    backAction={() => goBack()}>
                    {' '}
                </Nav>

                <View style={styles.MainBody}>



                    <View style={styles.CalenderBar}>

                        <TouchableOpacity style={{
                            height: 35,
                            width: '18%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderColor: '#5B5B5B',
                            borderWidth: 1
                        }}
                            onPress={() => {
                                getPreviousWeek(String(WeekStartDate), String(WeekEndDate))
                            }}
                        >

                            <Image style={styles.CalenderUpDownButton} source={require('../../images/hamburArrowUp.png')}></Image>

                        </TouchableOpacity>

                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular }}> {String(WeekStartDateShow) + ' - ' + String(WeekEndDateShow)} </Text>

                            <Text  allowFontScaling={false}  style={{ marginTop: 8, borderWidth: 0.23, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: 'white', color: 'black', fontFamily: Constant.MontserratRegular, borderRadius: 10 }}> {TotalHoursGlobal} </Text>
                        </View>

                        <TouchableOpacity style={{
                            height: 35,
                            width: '18%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderColor: '#5B5B5B',
                            borderWidth: 1
                        }}
                            onPress={() => {
                                getNextWeek(String(WeekStartDate), String(WeekEndDate))
                            }}
                        >
                            <Image style={styles.CalenderUpDownButton} source={require('../../images/hamburArrowDown.png')}></Image>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.WeekBody}>
                        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                        >

                            {/* Sunday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setSundayOpen(!SundayOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>
                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>
                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Sunday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {convertToDDMMYYYY(SundayDate)} </Text>
                                        </View>

                                    </View>

                                    <View style={styles.DaySecondBlock}>
                                        {/* <View style={{ backgroundColor: colorForTimeSheetApprStatus, width: 32, height: 32, borderRadius: 16, }} /> */}
                                        {/* <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} /> */}

                                        {TimeSheetApprStatusFlag ? <></> :


                                            // <Shadow distance={5} containerViewStyle={{

                                            // }} offset={[0.2, 1]}
                                            //     startColor='#e6e6e6'

                                            // >
                                            <TouchableOpacity style={styles.PlusButton}
                                                onPress={() => {

                                                    setSundayOpen(true)

                                                    let dayData = {
                                                        'date': SundayDate,
                                                        'day': 'Sunday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }



                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day0' })

                                                    // setMondayOpen(false)

                                                }}
                                                disabled={TimeSheetApprStatusFlag}
                                            >
                                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')} ></Image>
                                            </TouchableOpacity>
                                            // </Shadow>

                                        }

                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {SundayOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :
                                        <TouchableOpacity style={styles.PlusButton}
                                            onPress={() => {

                                                let dayData = {
                                                    'date': SundayDate,
                                                    'day': 'Sunday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }



                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day0' })

                                                // setMondayOpen(false)

                                            }}
                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>

                                    } */}


                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day0'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />

                                </View>
                                    : <></>
                                }

                            </View>

                            {/* Monday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setMondayOpen(!MondayOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>

                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Monday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> { convertToDDMMYYYY(MondayDate) } </Text>

                                        </View>

                                    </View>

                                    <View style={styles.DaySecondBlock}>
                                        {/* <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} /> */}

                                        {TimeSheetApprStatusFlag ? <></> :

                                            <TouchableOpacity style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', }}
                                                onPress={() => {

                                                    setMondayOpen(true)

                                                    let dayData = {
                                                        'date': MondayDate,
                                                        'day': 'Monday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }

                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day1' })
                                                }}
                                                disabled={TimeSheetApprStatusFlag}
                                            ><Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')} ></Image></TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {MondayOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :
                                        <TouchableOpacity style={styles.PlusButton}
                                            onPress={() => {

                                                let dayData = {
                                                    'date': MondayDate,
                                                    'day': 'Monday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }

                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day1' })
                                            }}
                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>
                                    } */}


                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day1'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />




                                </View>
                                    : <></>
                                }

                            </View>

                            {/* Tuesday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setTueOpen(!TueOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>
                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>
                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Tuesday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {convertToDDMMYYYY(TueDate)} </Text>
                                        </View>

                                    </View>

                                    <View style={styles.DaySecondBlock}>

                                        {TimeSheetApprStatusFlag ? <></> :
                                            <TouchableOpacity style={styles.PlusButton}
                                                onPress={() => {

                                                    setTueOpen(true)

                                                    let dayData = {
                                                        'date': TueDate,
                                                        'day': 'Tuesday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }

                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day2' })
                                                }}
                                                disabled={TimeSheetApprStatusFlag}
                                            >
                                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {TueOpen ? <View style={{
                                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :

                                        <TouchableOpacity style={styles.PlusButton}
                                            onPress={() => {

                                                let dayData = {
                                                    'date': TueDate,
                                                    'day': 'Tuesday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }

                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day2' })
                                            }}
                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>

                                    } */}

                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day2'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />
                                </View>
                                    : <></>
                                }

                            </View>

                            {/* Wednesday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setWedOpen(!WedOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>

                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>
                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Wednesday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {convertToDDMMYYYY(WedDate)} </Text>
                                        </View>
                                    </View>

                                    <View style={styles.DaySecondBlock}>
                                        {TimeSheetApprStatusFlag ? <></> :
                                            <TouchableOpacity style={styles.PlusButton}



                                                onPress={() => {

                                                    setWedOpen(true)

                                                    let dayData = {
                                                        'date': WedDate,
                                                        'day': 'Wednesday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }

                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day3' })
                                                }}
                                                disabled={TimeSheetApprStatusFlag}
                                            >
                                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {WedOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :
                                        <TouchableOpacity style={styles.PlusButton}

                                            onPress={() => {

                                                let dayData = {
                                                    'date': WedDate,
                                                    'day': 'Wednesday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }

                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day3' })
                                            }}
                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>

                                    } */}

                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day3'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />
                                </View>
                                    : <></>
                                }

                            </View>

                            {/* Thursday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setThuOpen(!ThuOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>
                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>
                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Thursday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {convertToDDMMYYYY(ThuDate)} </Text>
                                        </View>
                                    </View>

                                    <View style={styles.DaySecondBlock}>
                                        {TimeSheetApprStatusFlag ? <></> :
                                            <TouchableOpacity style={styles.PlusButton}
                                                onPress={() => {

                                                    setThuOpen(true)

                                                    let dayData = {
                                                        'date': ThuDate,
                                                        'day': 'Thursday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }

                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day4' })
                                                }}
                                                disabled={TimeSheetApprStatusFlag}
                                            >
                                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {ThuOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :

                                        <TouchableOpacity style={styles.PlusButton}
                                            onPress={() => {

                                                let dayData = {
                                                    'date': ThuDate,
                                                    'day': 'Thursday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }

                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day4' })
                                            }}
                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>

                                    } */}

                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day4'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />
                                </View>
                                    : <></>
                                }

                            </View>

                            {/* Friday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setFriOpen(!FriOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>
                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Friday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {convertToDDMMYYYY(FriDate)} </Text>
                                        </View>
                                    </View>

                                    <View style={styles.DaySecondBlock}>
                                        {TimeSheetApprStatusFlag ? <></> :
                                            <TouchableOpacity style={styles.PlusButton}
                                                onPress={() => {

                                                    setFriOpen(true)

                                                    let dayData = {
                                                        'date': FriDate,
                                                        'day': 'Friday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }

                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day5' })
                                                }}

                                                disabled={TimeSheetApprStatusFlag}
                                            >
                                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {FriOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :

                                        <TouchableOpacity style={styles.PlusButton}
                                            onPress={() => {

                                                let dayData = {
                                                    'date': FriDate,
                                                    'day': 'Friday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }

                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day5' })
                                            }}

                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>

                                    } */}

                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day5'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />
                                </View>
                                    : <></>
                                }

                            </View>

                            {/* Saturday Week View */}
                            <View style={styles.DayMainView}>

                                {/* Day Title Bar Button */}
                                <TouchableOpacity style={styles.DayTitleBarButton}
                                    onPress={() => {
                                        setSatOpen(!SatOpen)
                                    }}
                                >

                                    <View style={styles.DayTextBlock}>
                                        <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                        <View style={styles.TimeStatusIndicatorAndDayTextBlockSpace}>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Saturday </Text>

                                            <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {convertToDDMMYYYY(SatDate)} </Text>
                                        </View>
                                    </View>

                                    <View style={styles.DaySecondBlock}>
                                        {TimeSheetApprStatusFlag ? <></> :
                                            <TouchableOpacity style={styles.PlusButton}
                                                onPress={() => {

                                                    setSatOpen(true)

                                                    let dayData = {
                                                        'date': SatDate,
                                                        'day': 'Saturday',
                                                        "totalDayHours": "00:00",
                                                        "timeSheetDayItemId": "",
                                                        "timeSheetDayItemDescriptions": []
                                                    }

                                                    props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day6' })
                                                }}
                                                disabled={TimeSheetApprStatusFlag}
                                            >
                                                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </TouchableOpacity>

                                {/* Day Inner Content */}
                                {SatOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    {/* {TimeSheetApprStatusFlag ? <></> :

                                        <TouchableOpacity style={styles.PlusButton}
                                            onPress={() => {

                                                let dayData = {
                                                    'date': SatDate,
                                                    'day': 'Saturday',
                                                    "totalDayHours": "00:00",
                                                    "timeSheetDayItemId": "",
                                                    "timeSheetDayItemDescriptions": []
                                                }

                                                props.navigation.navigate('TimeSheetsAddTask', { dayData, dayCode: 'day6' })
                                            }}
                                            disabled={TimeSheetApprStatusFlag}
                                        >
                                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/AddPlus.png')}></Image>
                                        </TouchableOpacity>

                                    } */}

                                    {/* Project Task */}

                                    <ProjectTaskEntryBar
                                        dayCode={'day6'}
                                        timeSheetLineResVOS={timeSheetLineResVOSglobal}
                                        editFunc={editProjTask}
                                        deleteFunc={DeleteProjTask}
                                        viewOnly={TimeSheetApprStatusFlag}
                                    />
                                </View>
                                    : <></>
                                }

                            </View>
                        </ScrollView>
                    </View>

                </View>

                {TimeSheetApprStatusFlag ? <></>

                    :
                    <View style={styles.BottomButtons}>

                        <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: '#4D4D4D', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                OnSave("DRAFT")
                            }}
                            disabled={TimeSheetApprStatusFlag}
                        >

                            <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin', fontFamily: Constant.MontserratRegular }}>  Save  </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                            disabled={TimeSheetApprStatusFlag}
                            onPress={() => {
                                OnSave("LEVEL_1_PENDING")
                            }}
                        >

                            <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin', fontFamily: Constant.MontserratRegular }}>  Submit  </Text>

                        </TouchableOpacity>

                    </View>

                }



                {/* <Loader isLoader={isLoading}> </Loader> */}

            </View>
            <Loader isLoader={isLoading}> </Loader>
        </>
    );
}

export default TimeSheetsWeekView;