import React, { useEffect, useState } from 'react';
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
import EmpAttandanceScreen from './EmpAttandanceScreen';
import { fakeAPIData } from './fakeAPIData';

// const EMPAttanData = {
//     "empName": "Pankaj  Rai",
//     "empCode": "1264",
//     "presentCount": 7,
//     "absentCount": 1,
//     "leaveTakenCount": 0,
//     "weeklyOffCount": 4,
//     "holidayCount": 1,
//     "invalidRecordCount": 0,
//     "totalDuration": "65:11",
//     "totalDeviation": "02:10",
//     "location": "Noida - 001",
//     "band": "Sales & Marketing",
//     "department": "Business Development Manager",
//     "designation": null,
//     "attendanceRecordsOnDayVOList": [
//         {
//             "attendanceRecordDayDateVO": {
//                 "day": 1,
//                 "date": "2023-03-01"
//             },
//             "status": "P",
//             "inTime": "09:07:29",
//             "outTime": "18:18:39",
//             "afterProcessingStatus": "N/A",
//             "shiftTiming": "09:00-18:00",
//             "duration": "09:11",
//             "regularizationRequestStatus": null,
//             "regularizationRequestsId": null,
//             "regularizationReason": null,
//             "regularizationComments": null,
//             "requestType": null,
//             "checkIn": null,
//             "checkOut": null,
//             "syncWithAttendanceProcess": false,
//             "checkinDate": "2023-03-01",
//             "checkOutDate": "2023-03-01",
//             "firstHalfAttendanceStatus": "HDP",
//             "secondHalfAttendanceStatus": "HDP",
//             "color": "#516b2d",
//             "remarks": "",
//             "odHours": "00:00",
//             "slHours": "00:00",
//             "earlyLateMarkStatus": "LATE/ONTIME",
//             "deviationHours": "+00:11"
//         }
//     ],
//     "afterPresentCount": 0,
//     "afterAbsentCount": 0,
//     "afterLeaveTakenCount": 0,
//     "afterWeeklyOffCount": 0,
//     "afterHolidayCount": 0,
//     "afterInvalidRecordCount": 0
// }

const colorAsPerStatus = {

    'P': 'rgba(60, 171, 122, ',
    'A': 'rgba(226, 73, 66, ',
    'WO': 'rgba(122, 147, 137, ',
    'H': 'rgba(133, 127, 239, ',
    'N/A': 'rgba(100, 100, 100, ',
    'In': 'rgba(154, 208, 89, ',
    'Out': 'rgba(154, 208, 89, '

}

const colorAsPerStatusNew = {

    'P': '#0B9F01',
    'A': '#ED1818',
    'L': '#19B696',
    'WO': '#FFCC00',
    'H': '#5C5BF7',
    'N/A': 'rgba(100, 100, 100, 1)',
    'In': 'rgba(154, 208, 89, 1)',
    'Out': 'rgba(154, 208, 89, 1)'

}

function getColorAsPerStatus(statusText) {

    // TODO Half Day

    if (colorAsPerStatus[statusText] == undefined) {

        return { textColor: 'rgba(240, 133, 157, 1)', bgColor: 'rgba(240, 133, 157, 0.3)', textColorNew: colorAsPerStatusNew.L }

    }

    else {

        return { textColor: colorAsPerStatus[statusText] + '1)', bgColor: colorAsPerStatus[statusText] + '0.3)', textColorNew: colorAsPerStatusNew[statusText] }

    }

}


const checkNull = (value, passValue) => {
    if (value == null || value == 'null') {
        return passValue;
    } else {
        return value;
    }
};

export default function TeamMemberList({ navigation, dayNo, empAttandaceDetails, monthCalDate, setisLoading }) {

    const dateForAPI = Utility.convertToMMMMYYYY(monthCalDate).toUpperCase()

    const { textColor, bgColor, textColorNew } = getColorAsPerStatus(empAttandaceDetails.attendanceStatus)
    

    const [overViewData, setoverViewData] = useState({})
    const [afterProcessingOverViewData, setafterProcessingOverViewData] = useState({})
    const [attendanceRecordsOnDayVOList, setattendanceRecordsOnDayVOList] = useState([])

    const [isOpenEmpAttandanceModal, setisOpenEmpAttandanceModal] = useState(false)

    const [authDict, setauthDict] = useState({})

    function handleCloseEmpAttandanceModal() {
        // setisOpenEmpAttandanceModal(false)
        navigation.goBack()
    }

    function compileData(EMPAttanData) {

        // console.log(navigation);

        let present = checkNull(EMPAttanData.presentCount, '0');
        let absent = checkNull(EMPAttanData.absentCount, '0');
        let leaveTaken = checkNull(EMPAttanData.leaveTakenCount, '0');
        let weaklyOff = checkNull(EMPAttanData.weeklyOffCount, '0');
        let holiday = checkNull(EMPAttanData.holidayCount, '0');
        let hours = checkNull(EMPAttanData.totalDuration, '0');

        const tempoverViewData = JSON.parse(JSON.stringify({
            present,
            absent,
            leaveTaken,
            weaklyOff,
            holiday,
            hours
        }))

        const { afterLeaveTakenCount,
            afterWeeklyOffCount,
            afterHolidayCount,
            afterPresentCount,
            afterAbsentCount, } = EMPAttanData

        const tempafterProcessingOverViewData = JSON.parse(JSON.stringify({
            afterLeaveTakenCount,
            afterWeeklyOffCount,
            afterHolidayCount,
            afterPresentCount,
            afterAbsentCount
        }))

        // const tempattendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(EMPAttanData
        //     .attendanceRecordsOnDayVOList))

        // const tempattendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(fakeAPIData.content[0].attendanceRecordsOnDayVOList
        // ))
        const tempattendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(EMPAttanData.attendanceRecordsOnDayVOList
        ))

        console.log('overViewData', tempoverViewData);
        console.log('tempafterProcessingOverViewData', tempafterProcessingOverViewData);
        console.log('tempattendanceRecordsOnDayVOList', tempattendanceRecordsOnDayVOList);

        navigation.navigate('EmpAttandanceScreen', {
            payload: {
                overViewData: tempoverViewData,
                afterProcessingOverViewData: tempafterProcessingOverViewData,
                attendanceRecordsOnDayVOList: tempattendanceRecordsOnDayVOList,
                isOpenEmpAttandanceModal,
                handleCloseEmpAttandanceModal,
                empName: empAttandaceDetails.empName
            }
        })


        // navigation.navigate('EmpLocation')

        // setoverViewData(JSON.parse(JSON.stringify(tempoverViewData)))
        // setafterProcessingOverViewData(JSON.parse(JSON.stringify(tempafterProcessingOverViewData)))
        // setattendanceRecordsOnDayVOList(JSON.parse(JSON.stringify(tempattendanceRecordsOnDayVOList)))
        // setisOpenEmpAttandanceModal(true)

    }

    async function getEmployeesMonthlyAttendanceRecordBySupervisor(empCode) {

        let url = Constant.BASE_URL + "attendance/attendanceRecords/getEmployeesMonthlyAttendanceRecordBySupervisor/" + empCode + "/" + dateForAPI

        console.log('getEmployeesMonthlyAttendanceRecordBySupervisor', url);
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
                console.log('getEmployeesMonthlyAttendanceRecordBySupervisor', responsejson);

                setisLoading(false)

                compileData(responsejson.attendanceRecordMonthlyForAllEmployeeVOList[0])

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

    useEffect(() => {
      
        KeyStore.getKey('authDict', (err, value) => {
            if (value) {



                setauthDict(value)


            }
        });


    }, [])
    

    


    return (
        <>

            <TouchableOpacity onPress={() => {
                // compileData(empAttandaceDetails)

                console.log("monthCalDateReal", monthCalDate);
                console.log("monthCalDateReal converted", Utility.convertToMMMMYYYY(monthCalDate));

                getEmployeesMonthlyAttendanceRecordBySupervisor(empAttandaceDetails.empCode)

            }} style={{
                width: '100%',
                // backgroundColor: 'red',
                flexDirection: 'row', alignItems: 'center', padding: 10,
                paddingHorizontal: 15
            }}>

                <View style={{
                    width: '70%', flexDirection: 'column',
                    //alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 15,
                            color: 'black',
                            // width: '35%',
                            // alignSelf: 'center',
                            // backgroundColor: 'red',
                            // textAlign: 'center',
                            // paddingRight: 16,
                            // alignSelf: 'center'
                        }}>{empAttandaceDetails.empName} </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 12,
                                color: 'rgba(148, 149, 150, 1)',
                                marginLeft: 1
                                // width: '35%',
                                // alignSelf: 'center',
                                // backgroundColor: 'red',
                                // textAlign: 'center',
                                // paddingRight: 16,
                                // alignSelf: 'center'
                            }}>{empAttandaceDetails.empCode} </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 12,
                                color: 'rgba(148, 149, 150, 1)',
                                // width: '35%',
                                // alignSelf: 'center',
                                // backgroundColor: 'red',
                                // textAlign: 'center',
                                // paddingRight: 16,
                                // alignSelf: 'center'
                            }}>{' | '} </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 12,
                                color: 'rgba(148, 149, 150, 1)',
                                // width: '35%',
                                // alignSelf: 'center',
                                // backgroundColor: 'red',
                                // textAlign: 'center',
                                // paddingRight: 16,
                                // alignSelf: 'center'
                            }}>{empAttandaceDetails.designation} </Text>
                    </View>

                </View>

                <View style={{
                    justifyContent: 'flex-end',
                    width: '30%',
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>


                    <View style={{
                        // backgroundColor: bgColor, 
                        borderColor: textColorNew,
                        borderWidth: empAttandaceDetails.attendanceStatus == null ? 0 :1,

                        paddingHorizontal: 7, paddingVertical: 2, borderRadius: 3,
                         right: '50%' 
                    }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 12,
                                color: textColorNew,
                                // width: '30%',
                                textAlign: 'center',
                                // paddingRight: 16,
                                // alignSelf: 'center'
                            }}>
                            {empAttandaceDetails.attendanceStatus == null ? '' : empAttandaceDetails.attendanceStatus}
                        </Text>
                    </View>

                    
                        <Image
                            source={require('../../images/down-arrow.png')}
                            style={{
                                // position: 'absolute',
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                // alignSelf: 'flex-end',
                                // left: '30%',
                                // marginTop: 16,
                                transform: [{ rotate: '270deg'}],
                                // tintColor: '#657BCB',

                            }}
                        />
                    


                </View>

                {/* <View style={{
        // backgroundColor: 'green', 
    }}>
        <Image
            source={require('../../images/down-arrow.png')}
            style={{
                // position: 'absolute',
                height: 20,
                width: 20,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
                // left: '30%',
                // marginTop: 16,
                transform: [{ rotate: openDetails ? '180deg' : '0deg' }],
                tintColor: '#657BCB',

            }}
        />
    </View> */}

            </TouchableOpacity>

            <View style={{
                width: '95%', alignSelf: 'center', height: 1, backgroundColor: '#e6e6e6',
                marginVertical: 5
            }} />

            {/* <EmpAttandanceModal 
            isOpenEmpAttandanceModal={isOpenEmpAttandanceModal}
            handleCloseEmpAttandanceModal={handleCloseEmpAttandanceModal}
            afterProcessingOverViewData={afterProcessingOverViewData}
            attendanceRecordsOnDayVOList={attendanceRecordsOnDayVOList}
            overViewData={overViewData}

            /> */}

        </>
    )
}