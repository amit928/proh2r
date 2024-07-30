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
import LinearGradient from 'react-native-linear-gradient';


const TimesheetStatusIndicator = ({ colorForTimeSheetApprStatus }) => (


    <>
        {colorForTimeSheetApprStatus == '#66bb6a' ? <Image style={{ width: 35, height: 35, resizeMode: 'contain' }} source={require('../../images/timeSheetApproved.png')}></Image>
            : colorForTimeSheetApprStatus == '#ef5350' ? <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={require('../../images/timesheetRejected.png')}></Image> : colorForTimeSheetApprStatus == '#ffc107' ? <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={require('../../images/timesheetSubmitted.png')}></Image> : colorForTimeSheetApprStatus == '#5683AF' ? <Image style={{ width: 32, height: 32, resizeMode: 'contain' }} source={require('../../images/timesheetDraft.png')}></Image> :
                <View style={{ backgroundColor: '#CBCBCB', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: colorForTimeSheetApprStatus, width: 20, height: 20, borderRadius: 14, }}></View>
                </View>}


    </>


)


const ProjectTaskEntryBar = ({ viewFunc, timeSheetDayItemDescriptions }) => {







    {/* Project Task */ }

    return (

        // {timeSheetLineResVOS == null || timeSheetLineResVOS == '' ? null : null }
        <>
            {timeSheetDayItemDescriptions == null || timeSheetDayItemDescriptions == '' || timeSheetDayItemDescriptions == [] ? null :

                timeSheetDayItemDescriptions.map((item2, index2) => {
                    const ProjectName = item2.projectName
                    const TaskName = item2.taskName


                    // console.log("ProjectTaskMan", ProjectName, TaskName, item2.hours);

                    return <View
                        key={String(index2)}
                        style={{ width: "95%", height: 60, backgroundColor: '#5683AF', flexDirection: 'row', marginBottom: 2 }}

                    >

                        <View style={{ height: '100%', width: '50%', flexDirection: 'column', justifyContent: 'center', paddingLeft: 10 }}>
                            <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16, fontFamily: Constant.MontserratRegular }}> {ProjectName + "\n " + TaskName} </Text>



                        </View>


                        <View style={{ height: '100%', width: '30%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 14, }}

                        >
                            <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16, fontFamily: Constant.MontserratRegular }}

                            > {item2.hours} </Text>
                        </View>


                        <View style={{ height: '100%', width: '20%', display: 'flex', flexDirection: 'row', padding: 4, alignItems: 'center', justifyContent: 'center' }}

                        >




                            <TouchableOpacity onPress={() => {

                                viewFunc(item2, index2)

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



                        </View>

                    </View>

                }
                )

            }


        </>
    );


}



const TimeApprovalWeekView = (props) => {

    console.log('TimeApproval Data Navigation', props.route.params)

    const dispatch = useDispatch()

    const [empDetail, setempDetail] = useState(props.route.params.empDetail)

    const [navTitle, setnavTitle] = useState(empDetail.empName)

    const authDictGlobal = useSelector(state => state.authDictGlobal);

    const [authDict, setauthDict] = useState(authDictGlobal)

    const [isLoading, setisLoading] = useState(false)

    const [SundayOpen, setSundayOpen] = useState(false)
    const [MondayOpen, setMondayOpen] = useState(false)
    const [TueOpen, setTueOpen] = useState(false)
    const [WedOpen, setWedOpen] = useState(false)
    const [ThuOpen, setThuOpen] = useState(false)
    const [FriOpen, setFriOpen] = useState(false)
    const [SatOpen, setSatOpen] = useState(false)

    const WeekStartDateTemp = Moment(new Date(empDetail.day0.date).toISOString())
    const WeekEndDateTemp = Moment(new Date(empDetail.day6.date).toISOString())


    const [WeekStartDate, setWeekStartDate] = useState(empDetail.day0.date)
    const [WeekEndDate, setWeekEndDate] = useState(empDetail.day6.date)



    const [WeekStartDateShow, setWeekStartDateShow] = useState(Moment(WeekStartDateTemp).format('LL'))
    const [WeekEndDateShow, setWeekEndDateShow] = useState(Moment(WeekEndDateTemp).format('LL'))


    const [SundayDate, setSundayDate] = useState(empDetail.day0.date)
    const [MondayDate, setMondayDate] = useState(empDetail.day1.date)
    const [TueDate, setTueDate] = useState(empDetail.day2.date)
    const [WedDate, setWedDate] = useState(empDetail.day3.date)
    const [ThuDate, setThuDate] = useState(empDetail.day4.date)
    const [FriDate, setFriDate] = useState(empDetail.day5.date)
    const [SatDate, setSatDate] = useState(empDetail.day6.date)


    const [colorForTimeSheetApprStatus, setcolorForTimeSheetApprStatus] = useState(props.route.params.colorForTimeSheetApprStatus)

    const [TimeSheetApprStatusFlag, setTimeSheetApprStatusFlag] = useState(props.route.params.TimeSheetApprStatusFlag)


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


    function viewFunc(item, index) {

        console.log("viewFunc", item);

        const projectDetail = item

        props.navigation.navigate("TimeApprovalView", { projectDetail })

    }




    function approveAndRejectTimeSheet(action) {

        Alert.alert(
            'Alert !',
            'Do You Really want to ' + action + " this timesheet ?",
            [
                {
                    text: 'OK',
                    onPress: async () => {

                        setisLoading(true)

                        console.log("sendTimeSheetAPI payload: ", action);

                        var url = Constant.BASE_URL + "timesheets/" + action + "/" + empDetail.timeSheetId

                        console.log('approveAndRejectTimeSheet URL', url);



                        try {
                            var requestOptions = {
                                method: 'POST',
                                headers: Constant.getHeader(authDict),

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

                    },
                }, ,
                {
                    text: 'Cancel',
                }
            ],

            { cancelable: false },
        );





    }









    // UI
    return (

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



                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular }}> {String(WeekStartDateShow) + ' - ' + String(WeekEndDateShow)} </Text>

                        <Text  allowFontScaling={false}  style={{ marginTop: 8, borderWidth: 0.23, padding: 3, backgroundColor: 'white', fontFamily: Constant.MontserratRegular, color: 'black' }}> {empDetail.totalHours} </Text>
                    </View>



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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Sunday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {SundayDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>

                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />

                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {SundayOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>



                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day0.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Monday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {MondayDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>
                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {MondayOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>




                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day1.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Tuesday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {TueDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>
                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {TueOpen ? <View style={{
                                flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                            }}>



                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day2.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Wednesday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {WedDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>
                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {WedOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>



                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day3.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Thursday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {ThuDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>
                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {ThuOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>



                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day4.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Friday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {FriDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>
                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {FriOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>



                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day5.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Day}> Saturday </Text>

                                    <Text  allowFontScaling={false}  style={styles.DayTextBlock_Date}> {SatDate} </Text>

                                </View>

                                <View style={styles.DaySecondBlock}>
                                    <TimesheetStatusIndicator colorForTimeSheetApprStatus={colorForTimeSheetApprStatus} />
                                </View>

                            </TouchableOpacity>

                            {/* Day Inner Content */}
                            {SatOpen ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>



                                {/* Project Task */}

                                <ProjectTaskEntryBar
                                    timeSheetDayItemDescriptions={empDetail.day6.timeSheetDayItemDescriptions}
                                    viewFunc={viewFunc}
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: 50, backgroundColor: 'transparent', bottom: 10 }}>

                    {/* <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: '#4D4D4D', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {

                            approveAndRejectTimeSheet("approve")

                        }}
                        disabled={TimeSheetApprStatusFlag}
                    >

                        <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin', fontFamily: Constant.MontserratRegular, }}>  Approve  </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '50%', height: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                        disabled={TimeSheetApprStatusFlag}
                        onPress={() => {

                            approveAndRejectTimeSheet("reject")

                        }}
                    >

                        <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin', fontFamily: Constant.MontserratRegular }}>  Reject  </Text>

                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => {

                        approveAndRejectTimeSheet("approve")

                    }}
                        disabled={TimeSheetApprStatusFlag} style={{ width: '40%' }}>

                        <LinearGradient colors={['#40bf0d', '#38a70c', '#38a70c']} style={{
                            // flex: 1,
                            width: '100%',
                            height: 40,
                            paddingLeft: 15,
                            paddingRight: 15,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text  allowFontScaling={false}  style={{
                                fontSize: 15,
                                fontFamily: Constant.MontserratMedium,
                                textAlign: 'center',
                                margin: 10,
                                color: '#ffffff',
                                backgroundColor: 'transparent',
                            }}>
                                Approve
                            </Text>
                        </LinearGradient>

                    </TouchableOpacity>

                    <TouchableOpacity disabled={TimeSheetApprStatusFlag}
                        onPress={() => {

                            approveAndRejectTimeSheet("reject")

                        }} style={{ width: '40%' }}>

                        <LinearGradient colors={['#fb2904', '#e22503', '#c92103']} style={{
                            // flex: 1,
                            width: '100%',
                            height: 40,
                            paddingLeft: 15,
                            paddingRight: 15,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text  allowFontScaling={false}  style={{
                                fontSize: 15,
                                fontFamily: Constant.MontserratMedium,
                                textAlign: 'center',
                                margin: 10,
                                color: '#ffffff',
                                backgroundColor: 'transparent',
                            }}>
                                Reject
                            </Text>
                        </LinearGradient>

                    </TouchableOpacity>

                </View>

            }



            <Loader isLoader={isLoading}> </Loader>

        </View>
    );
}

export default TimeApprovalWeekView;