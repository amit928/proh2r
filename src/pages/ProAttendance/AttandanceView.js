import React, { Component, createRef, useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    ImageBackground,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
import MyAttandanceOverView from './MyAttandanceOverView';
import AttandanceRecord from './AttandanceRecord';
import TeamMemberList from './TeamMemberList';
import MyTeam from './MyTeam';
import AttandanceTabs from './AttandanceTabs';

import { fakeAPIData } from './fakeAPIData';
import TeamAttandanceOverView from './TeamAttandanceOverView';
import MyAttandanceRecordHead from './MyAttandanceRecordHead';

const { height, width } = Dimensions.get('screen');

const AttandanceStatusDict = {
    "P": "#516b2d",
    "A": "#ea6153",
    'WO': '#19b696',
    'H': '#9796f2',
    'N/A': '#777',
    'In': '#a9d56c',
    'Out': '#a9d56c',
    'L': '#f59bad',
    'HD': '#4aa3df'
}


export default function AttandanceView({ present, absent, leaveTaken, isLoading = false,
    setisLoading = () => { },
    weaklyOff, holiday, hours, afterProcessingOverViewData, attendanceRecordsOnDayVOList, isModal = false, navigation, setIsFromMyAttandance = () => { }, setRegData = () => { }, monthYearData = {} }) {


    console.log('AttandanceView', present, absent, leaveTaken,
        weaklyOff, holiday, hours);

    const [selectedTab, setselectedTab] = useState(0)

    const [defaultOpen, setdefaultOpen] = useState(-1)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [selectedDate, setSelectedDate] = useState("");

    const [monthCalDate, setmonthCalDate] = useState(getCurrentDateYYYY_MM_DD())

    const [authDict, setauthDict] = useState({})

    const [dayNo, setdayNo] = useState()

    // const [myTeamSelected, setmyTeamSelected] = useState('all')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date.toISOString());
        const momentDate = Moment(date.toISOString());
        var pickedDt = Moment(momentDate).format('YYYY-MM-DD')
        console.log(pickedDt);
        teamRecordsByDate(authDict, pickedDt)
        setmonthCalDate(pickedDt)
        hideDatePicker();
    };




    function calculateLastDayOfAMonth(YYYY_MM_DD) {

        let monthDict = {
            "JANUARY": 0,
            "FEBRUARY": 1,
            "MARCH": 2,
            "APRIL": 3,
            "MAY": 4,
            "JUNE": 5,
            "JULY": 6,
            "AUGUST": 7,
            "SEPTEMBER": 8,
            "OCTOBER": 9,
            "NOVEMBER": 10,
            "DECEMBER": 11,

        }

        let dateArr = String(YYYY_MM_DD).split('-')


        let month = dateArr[1] - 1;
        let year = dateArr[0]
        let d = new Date(year, month + 1, 0);
        console.log('calculateLastDayOfAMonth', d.toString());
    }

    const [allAttandaceArray, setallAttandaceArray] = useState([])
    const [currentAttandaceArray, setcurrentAttandaceArray] = useState([])
    const [presentAttandaceArray, setpresentAttandaceArray] = useState([])
    const [absentAttandaceArray, setabsentAttandaceArray] = useState([])
    const [leavesAttandaceArray, setleavesAttandaceArray] = useState([])
    const [halfDayAttandaceArray, sethalfDayAttandaceArray] = useState([])
    const [holidayAttandaceArray, setholidayAttandaceArray] = useState([])

    const [currentTab, setcurrentTab] = useState(0)

    function onAll() {
        setcurrentAttandaceArray(JSON.parse(JSON.stringify(allAttandaceArray)))
    }

    function onPresent() {
        setcurrentAttandaceArray(JSON.parse(JSON.stringify(presentAttandaceArray)))
    }

    function onAbsent() {
        setcurrentAttandaceArray(JSON.parse(JSON.stringify(absentAttandaceArray)))
    }

    function onLeaves() {
        setcurrentAttandaceArray(JSON.parse(JSON.stringify(leavesAttandaceArray)))
    }


    async function teamRecordsByDate(authDict, date) {

        let url = Constant.BASE_URL + "attendance/attendanceRecords/teamRecordsByDate/" + authDict.employeeCode + "/" + date;

        console.log('teamRecordsByDate', url);
        setisLoading(true)

        console.log("teamRecordsByDategetHeader", Constant.getHeader(authDict));

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDict),
            });
            setisLoading(false)
            let code = await response.status;
            console.log('code', code);
            if (code == 200) {
                let responsejson = await response.json();
                console.log('teamRecordsByDate', responsejson);

                setallAttandaceArray(responsejson)
                setcurrentAttandaceArray(responsejson)

                sordData(responsejson)
                setcurrentTab(0)

                setisLoading(false)

            } else if (code == 400) {
                let responseJson = await response.json();
                Alert.alert(responseJson.message)

            } else if (code == 401 || code == 503) {
                Utility.logoutOnError(authDict, navigation);
            } else {

                Alert.alert(String(code), 'Something went wrong!')
            }
        } catch (error) {
            console.error(error);
        }
    }

    function getCurrentDateYYYY_MM_DD() {

        const momentDate = Moment(new Date().toISOString());
        
        return Moment(momentDate).format('YYYY-MM-DD')

    }

    function sordData(resData) {

        // setdayNo(day)


        // const day = 13

        // let all = fakeAPIData.content.length
        let allArray = []

        let presentArray = []

        let absentArray = []

        let leavesArray = []

        let halfDayArray = []

        let holidayArray = []





        resData.forEach((item, index) => {

            // let tempEmpAll = JSON.parse(JSON.stringify(item))

            // tempEmpAll.attendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(item.attendanceRecordsOnDayVOList[day - 1]))

            // allArray.push(tempEmpAll)


            let tempEmp = JSON.parse(JSON.stringify(item))

            //Present
            if (item.color == AttandanceStatusDict.P) {

                // tempEmp.attendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(item.attendanceRecordsOnDayVOList[day - 1]))

                presentArray.push(tempEmp)

            }

            if (item.color == AttandanceStatusDict.In) {

                // tempEmp.attendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(item.attendanceRecordsOnDayVOList[day - 1]))

                presentArray.push(tempEmp)

            }

            //Absent
            if (item.color == AttandanceStatusDict.A) {

                // tempEmp.attendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(item.attendanceRecordsOnDayVOList[day - 1]))

                absentArray.push(tempEmp)

            }

            //Leaves
            if (item.color == AttandanceStatusDict.L) {


                leavesArray.push(tempEmp)

            }



        })

        // console.log('allArray', allArray);
        console.log('presentArray', presentArray);
        console.log('absentArray', absentArray);
        console.log('leavesArray', leavesArray);
        // console.log('halfDayArray', halfDayArray);
        // console.log('holidayArray', holidayArray);


        // setallAttandaceArray(allArray)
        // setcurrentAttandaceArray(allArray)
        setpresentAttandaceArray(presentArray)
        setabsentAttandaceArray(absentArray)
        setleavesAttandaceArray(leavesArray)
        // sethalfDayAttandaceArray(halfDayArray)
        // setholidayAttandaceArray(holidayArray)



    }

    useEffect(() => {
        console.log('Tab Changed');

        if (selectedTab == 1) {

            KeyStore.getKey('authDict', (err, value) => {
                if (value) {



                    // setisLoading(true)

                    console.log('value', value);
                    setauthDict(value)
                    
                    const currentDate = getCurrentDateYYYY_MM_DD()
                    teamRecordsByDate(value, currentDate)
                    setmonthCalDate(currentDate)


                }
            });

        }


    }, [selectedTab])


    const [showAttTabs, setshowAttTabs] = useState(false)

    useEffect(() => {

        KeyStore.getKey('attdSupervisor', (err, value) => {

            if (value) {

                setshowAttTabs(true)

            }

            else {
                setshowAttTabs(false)
            }

        });

    }, [])



    return (
        <>
            <View style={{ marginTop: 15 }} />

            {/* <AttandanceTabs selectedTab={selectedTab} setselectedTab={setselectedTab}  /> */}

            {/* Tab Buttons */}

            {showAttTabs ?

                <AttandanceTabs selectedTab={selectedTab} setselectedTab={setselectedTab} />
                : <></>
            }

            <View style={{ marginTop: 15 }} />

            {/* Tab Buttons */}

            {selectedTab == 0 ?

                <MyAttandanceOverView overViewData={{
                    present, absent, leaveTaken,
                    weaklyOff, holiday, hours
                }} afterProcessingOverViewData={afterProcessingOverViewData} selectedTab={selectedTab} setselectedTab={setselectedTab}
                    isModal={isModal} isDatePickerVisible={isDatePickerVisible} selectedDate={selectedDate} setSelectedDate={setSelectedDate} showDatePicker={showDatePicker} hideDatePicker={hideDatePicker} handleConfirm={handleConfirm} teamAll={allAttandaceArray.length}
                    teamPresent={presentAttandaceArray.length}
                    teamAbsent={absentAttandaceArray.length}
                    teamLeaves={leavesAttandaceArray.length}
                    monthCalDate={monthCalDate}
                    onAll={onAll}
                    onPresent={onPresent}
                    onAbsent={onAbsent}
                    onLeaves={onLeaves}
                    monthYearData={monthYearData}
                />

                :
                <TeamAttandanceOverView overViewData={{
                    present, absent, leaveTaken,
                    weaklyOff, holiday, hours
                }} afterProcessingOverViewData={afterProcessingOverViewData} selectedTab={selectedTab} setselectedTab={setselectedTab}
                    isModal={isModal} isDatePickerVisible={isDatePickerVisible} selectedDate={selectedDate} setSelectedDate={setSelectedDate} showDatePicker={showDatePicker} hideDatePicker={hideDatePicker} handleConfirm={handleConfirm} teamAll={allAttandaceArray.length}
                    teamPresent={presentAttandaceArray.length}
                    teamAbsent={absentAttandaceArray.length}
                    teamLeaves={leavesAttandaceArray.length}
                    monthCalDate={monthCalDate}
                    onAll={onAll}
                    onPresent={onPresent}
                    onAbsent={onAbsent}
                    onLeaves={onLeaves}
                    currentAttandaceArray={currentAttandaceArray}
                    currentTab={currentTab}
                    setcurrentTab={setcurrentTab}
                />
            }





            <View style={{ marginTop: 15, }} />
            {
                selectedTab == 0 ?

                    <>

                        <View style={{
                            width: '95%', backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, borderRadius: 17, paddingBottom: 5,
                            // height: height-250 
                        }}>




                            {/* Attandance Records Heading */}
                            <MyAttandanceRecordHead />
                            {/* Attandance Records Heading */}

                            {attendanceRecordsOnDayVOList.map((item, index) => {

                                return <AttandanceRecord key={String(index)} {...item} defaultOpen={defaultOpen == index ? true : false} indexOfRecord={index} setdefaultOpen={setdefaultOpen} navigation={navigation} setIsFromMyAttandance={setIsFromMyAttandance} setRegData={setRegData} monthYearData={monthYearData} />
                            })}

                            {/* <FlatList nestedScrollEnabled={true}
                                data={attendanceRecordsOnDayVOList}
                                renderItem={({ item, index }) =>  <AttandanceRecord key={String(index)} {...item} defaultOpen={defaultOpen == index ? true : false} indexOfRecord={index} setdefaultOpen={setdefaultOpen} navigation={navigation} setIsFromMyAttandance={setIsFromMyAttandance} setRegData={setRegData} monthYearData={monthYearData} />}
                                keyExtractor={(item, index) => String(index)}
                            /> */}


                        </View>
                    </> :
                    <>

                        <View style={{ width: '95%', backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, borderRadius: 17, paddingBottom: 5,  }}>

                            <MyTeam navigation={navigation} currentAttandaceArray={currentAttandaceArray} dayNo={dayNo} monthCalDate={monthCalDate} setisLoading={setisLoading} />

                        </View>
                    </>
            }

            {/* <TouchableOpacity style={{ width: 5, height: 5, backgroundColor: 'red' }} onPress={() => {
                console.log('hello');
                compileDayOverViewData(1)
                calculateLastDayOfAMonth('2023-2-13')
            }}>

            </TouchableOpacity> */}
        </>

    )

}