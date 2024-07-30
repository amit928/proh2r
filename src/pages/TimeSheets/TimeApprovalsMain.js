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
import { sub } from 'react-native-reanimated';
import TopScrollTab from '../../components/TopScrollTab';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Shadow } from 'react-native-shadow-2';
import SwipeableList from '../../components/SwipeableList';
import { COLORS } from '../../Constant/Index';
import { convertToDDMMYYYY } from '../../Externel Constant/Utility';

let bulkApprObj = {}

const LeftSwipeActions = (Width, rejectApprfunc, action, timeSheetId, swipeRef) => {

    const finalWidth = Width - 240

    const halfWidth = finalWidth / 2
    return (
        <TouchableOpacity
            style={{
                width: halfWidth, height: 70, backgroundColor: 'white', justifyContent: 'center',
                marginTop: 5, alignItems: 'center', paddingVertical: 2
            }}
            onPress={() => {

                rejectApprfunc(action, timeSheetId)

                swipeRef.close()
            }}
        >

            <View
                style={{
                    width: '100%', height: '100%', backgroundColor: '#ccffbd', justifyContent: 'center', flexDirection: 'row'

                }}
            >

                <View style={{ width: halfWidth, height: '100%', backgroundColor: "#008000", justifyContent: 'center', alignItems: 'center' }}>
                    <Image

                        source={require('../../images/approveTimesheet.png')}
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain',
                            // alignSelf: 'center',
                            // right: 10,

                        }} />

                </View>

                {/* <Text  allowFontScaling={false} 
                    style={{
                        color: '#40394a',
                        paddingHorizontal: 10,
                        fontWeight: '600',
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                        textAlign: 'right'
                    }}
                >
                    Approve
                </Text> */}

            </View>

        </TouchableOpacity>
    );
};

const rightSwipeActions = (Width, rejectApprfunc, action, timeSheetId, swipeRef) => {



    const finalWidth = Width - 240

    const halfWidth = finalWidth / 2
    return (
        <TouchableOpacity
            style={{
                width: halfWidth, height: 70, backgroundColor: 'white', justifyContent: 'center',
                marginTop: 5, alignItems: 'center', paddingVertical: 2
            }}
            onPress={() => {

                rejectApprfunc(action, timeSheetId)

                swipeRef.close()

            }}
        >

            <View
                style={{
                    width: '100%', height: '100%', backgroundColor: '#ccffbd', justifyContent: 'center', flexDirection: 'row'

                }}
            >


                <View style={{ width: halfWidth, height: '100%', backgroundColor: "#e03737", justifyContent: 'center', alignItems: 'center' }}>

                    <Image

                        source={require('../../images/rejectTimesheet.png')}
                        style={{
                            width: 35,
                            height: 35,
                            resizeMode: 'contain',
                            // alignSelf: 'center',
                            // right: 10,

                        }} />

                </View>

                {/* <Text  allowFontScaling={false} 
                    style={{
                        color: '#40394a',
                        paddingHorizontal: 10,
                        fontWeight: '600',
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                        textAlign: 'right'
                    }}
                >
                    Approve
                </Text> */}

            </View>

        </TouchableOpacity>
    );
};

const SubmittedView = ({ empName, empCode, totalHours, workHours, Width, navigateTo, obj, imgURI, color, flag, rejectApprfunc, fromDate, toDate }) => {

    const swipeRef = useRef()

    return (
        <>
            <SwipeableList
                title={empName}
                statusMainColor='black'
                statusHeading={''}
                fromTo={'From ' + convertToDDMMYYYY(fromDate) + ' To ' + convertToDDMMYYYY(toDate)}
                statusMain={'Work Week: ' + totalHours + '\nTotal: ' + workHours}
                LeftSwipeActions={(swipeRefer) => LeftSwipeActions(Width, rejectApprfunc, "approve", obj.timeSheetId, swipeRefer.current)}
                rightSwipeActions={(swipeRefer) => rightSwipeActions(Width, rejectApprfunc, "reject", obj.timeSheetId, swipeRefer.current)}
                imgURI={imgURI}
                onPress={() => {

                    navigateTo('TimeApprovalWeekView', { empDetail: obj, colorForTimeSheetApprStatus: color, TimeSheetApprStatusFlag: flag })
                }}
            />
            <View style={{ width: Width }} />

            {/* <Swipeable
                ref={swipeRef}
                renderLeftActions={() => {
                    return LeftSwipeActions(Width, rejectApprfunc, "approve", obj.timeSheetId, swipeRef.current)
                }}
                renderRightActions={() => {
                    return rightSwipeActions(Width, rejectApprfunc, "reject", obj.timeSheetId, swipeRef.current)
                }}
               
            >

                <TouchableOpacity style={{ width: Width - 20, height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '5%', marginTop: 5, backgroundColor: 'white' }}
                    activeOpacity={1}

                    onPress={() => {

                        navigateTo('TimeApprovalWeekView', { empDetail: obj, colorForTimeSheetApprStatus: color, TimeSheetApprStatusFlag: flag })
                    }}
                >
                   
                    <Shadow distance={5} containerViewStyle={{

                        //  alignItems: 'center',

                    }} offset={[0.2, 2]}
                        startColor='#e6e6e6'
                   
                    >
                        <View style={{ borderRadius: 45, marginRight: 3, overflow: 'hidden', backgroundColor: 'white' }}>
                            <Image style={{
                                width: 45, height: 45,
                                // resizeMode: 'contain', 
                                borderRadius: 22.5,
                                // borderWidth: 2
                            }} source={require('../../images/userGroup.png')}></Image>
                        </View>
                    </Shadow>
                   
                    <View style={{
                        flex: 1, width: '100%', height: '100%',
                        // borderTopWidth: 0.4, 
                        borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
                    }}>
                        <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                           
                            <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                                <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{empName}</Text>
                                <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{empCode}</Text>

                            </View>

                            <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                                <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Work Week</Text>
                                <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{totalHours}</Text>

                            </View>

                            <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                                <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Total</Text>
                                <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{workHours}</Text>

                            </View>

                        </View>

                      
                        <Image style={{
                            transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 2, width: 15,
                            height: 15,
                            resizeMode: 'contain',
                        }} source={require('../../images/downArrow.png')} />





                    </View>


                </TouchableOpacity>

            </Swipeable> */}
        </>
    );
};

const BulkSubmitView = ({ empName, empCode, totalHours, workHours, Width, navigateTo, obj, imgURI, color, flag, rejectApprfunc }) => {

    function setDataForBulk(timeSheetId, addDataFlag) {

        console.log(timeSheetId, addDataFlag)

        if (addDataFlag) {

            bulkApprObj[timeSheetId] = 0

            console.log("Add bulkApprObj", bulkApprObj)

        }

        else {

            delete bulkApprObj[timeSheetId]
            console.log("Remove bulkApprObj", bulkApprObj)
        }





    }

    const swipeRef = useRef()

    const [check, setcheck] = useState(false)

    let checBoxColor = '#207398'

    return (

        <View style={{ width: Width - 20, height: 70, flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: check ? checBoxColor : "white", width: 23, height: 23, borderRadius: 5, borderColor: checBoxColor, borderWidth: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 5 }}

                onPress={() => {
                    setcheck(!check)
                    setDataForBulk(obj.timeSheetId, !check)
                }}
            >

                <Text  allowFontScaling={false}  style={{ color: 'white', fontSize: 16 }} >✓</Text>




            </TouchableOpacity>


            <TouchableOpacity style={{ flex: 1, width: "100%", height: "100%", flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '3%', marginTop: 5, backgroundColor: 'white' }}
                // activeOpacity={1}

                onPress={() => {

                    navigateTo('TimeApprovalWeekView', { empDetail: obj, colorForTimeSheetApprStatus: color, TimeSheetApprStatusFlag: flag })
                }}
            >
                {/* Image */}
                <View style={{ borderWidth: 0.7, borderRadius: 45, marginRight: 3, overflow: 'hidden', borderColor: 'grey' }}>
                    <Image style={{ width: 45, height: 45, resizeMode: 'contain', borderRadius: 22.5, borderWidth: 1 }} source={{
                        uri: imgURI,
                    }}></Image>
                </View>
                {/* Text Bar Container */}
                <View style={{
                    flex: 1, width: '100%', height: '100%',
                    // borderTopWidth: 0.4, 
                    borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
                }}>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                        {/* All Text  */}
                        <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{empName}</Text>
                            <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{empCode}</Text>

                        </View>

                        <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Work Week</Text>
                            <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{totalHours}</Text>

                        </View>

                        <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Total</Text>
                            <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{workHours}</Text>

                        </View>

                    </View>

                    {/* Arrow Image */}
                    <Image style={{
                        transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 2, width: 15,
                        height: 15,
                        resizeMode: 'contain',
                    }} source={require('../../images/downArrow.png')} />





                </View>


            </TouchableOpacity>
        </View>


    );
};


const UnSubmittedRejectedView = ({ empName, empCode, totalHours, workHours, Width, navigateTo, obj, imgURI, color, flag, fromDate, toDate }) => {



    return (<>

        <SwipeableList
            title={empName}
            statusMainColor='black'
            statusHeading={''}
            fromTo={'From ' + convertToDDMMYYYY(fromDate) + ' To ' + convertToDDMMYYYY(toDate)}
            statusMain={'Work Week: ' + totalHours + '\nTotal: ' + workHours}
            imgURI={imgURI}

            onPress={() => {

                navigateTo('TimeApprovalWeekView', { empDetail: obj, colorForTimeSheetApprStatus: color, TimeSheetApprStatusFlag: flag })
            }}
        />

        <View style={{ width: Width }} />


        {/* <TouchableOpacity style={{ width: Width - 20, height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '5%', marginTop: 5, backgroundColor: 'white' }}


            onPress={() => {

                navigateTo('TimeApprovalWeekView', { empDetail: obj, colorForTimeSheetApprStatus: color, TimeSheetApprStatusFlag: flag })
            }}
        >
            
            <View style={{ borderWidth: 0.7, borderRadius: 45, marginRight: 3, overflow: 'hidden', borderColor: 'grey' }}>
                <Image style={{ width: 45, height: 45, resizeMode: 'contain', borderRadius: 22.5, borderWidth: 1 }} source={{
                    uri: imgURI,
                }}></Image>
            </View>
            
            <View style={{
                flex: 1, width: '100%', height: '100%',
                // borderTopWidth: 0.4,
                borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
            }}>
                <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                    
                    <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{empName}</Text>
                        <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{empCode}</Text>

                    </View>

                    <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Work Week</Text>
                        <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{totalHours}</Text>

                    </View>

                    <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <Text  allowFontScaling={false}  style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Total</Text>
                        <Text  allowFontScaling={false}  style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{workHours}</Text>

                    </View>

                </View>

                <Image style={{
                    transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 2, width: 15,
                    height: 15,
                    resizeMode: 'contain',
                }} source={require('../../images/downArrow.png')} />





            </View>


        </TouchableOpacity> */}

    </>
    );
};



const TimeApprovalsMain = (props) => {

    const [menuVisible, setmenuVisible] = useState(false);

    const isFocused = useIsFocused();

    const [justUpdate, setjustUpdate] = useState(false)

    const authDictGlobal = useSelector(state => state.authDictGlobal);
    const [authDict, setauthDict] = useState(authDictGlobal)

    let WeekStartDateTemp = Moment(new Date(props.route.params.TimeSheetData.previousDay).toISOString())

    let WeekEndDateTemp = Moment(new Date(props.route.params.TimeSheetData.nextDay).toISOString())


    const [topScrollTap, settopScrollTap] = useState([{ title: 'Submitted', isSelect: true }, { title: 'Unsubmitted', isSelect: false }, { title: 'Rejected', isSelect: false }])

    const [WeekStartDate, setWeekStartDate] = useState(Moment(WeekStartDateTemp).format('YYYY-MM-DD'))
    const [WeekEndDate, setWeekEndDate] = useState(Moment(WeekEndDateTemp).format('YYYY-MM-DD'))

    const [navTitle, setnavTitle] = useState('Time Approvals')

    const [isLoading, setisLoading] = useState(false)

    const { goBack } = props.navigation;

    const [Rejected, setRejected] = useState([])

    const [Submitted, setSubmitted] = useState([])

    const [Drafts, setDrafts] = useState([])

    const [layout, setLayout] = useState({
        width: 0,
        height: 0,
    });

    const [selectedPage, setselectedPage] = useState(0)

    const { navigate } = props.navigation;

    const [bulkAppr, setbulkAppr] = useState(false)


    function btnAction(value) {
        console.log('btnAction', value);

        let arr = []

        topScrollTap.forEach((item, index) => {
            item.isSelect = false
            arr.push(item)
        }
        )

        arr[value].isSelect = true

        // setnavTitle(arr[value].title)
        setselectedPage(value)

    }






    useEffect(() => {

        //API Call
        // console.log('authDictGlobal', authDictGlobal)

        isFocused && getAllTimeSheetDataToApprovals(authDictGlobal.employeeCode)




    }, [isFocused, justUpdate]);



    async function getAllTimeSheetDataToApprovals(empCode) {

        setisLoading(true)

        var url = Constant.BASE_URL + Constant.TIMESHEET + "getall/supervisor/" + WeekStartDate + "/" + WeekEndDate

        console.log("getAllTimeSheetDataToApprovals", url)



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
                console.log("Response Json getAllTimeSheetDataToApprovals", responseJson)

                setDrafts(responseJson.drafts)
                setRejected(responseJson.rejected)
                setSubmitted(responseJson.submitted)

                setisLoading(false)





            }

            else if (code == 503) {

                Alert.alert('Server Under Maintenance !')
                Vibration.vibrate()
                setisLoading(false)
            }

            else {

                let msg = await response.statusText
                setisLoading(false)
                // this.refs.toast.show('Something went wrong!');
                Alert.alert('Something Went Wrong')

                Alert.alert('Something went wrong!')

            }
        } catch (error) {
            console.error(error);

            Alert.alert("Warning !", "Check your Internet Connection!")
            setisLoading(false)
        }


    }

    function approveAndRejectTimeSheet(action, timesheetId) {


        Alert.alert(
            'Alert !',
            'Do You Really want to ' + action + " ?",
            [
                {
                    text: 'OK',
                    onPress: async () => {

                        setisLoading(true)

                        console.log("sendTimeSheetAPI payload: ", action);

                        var url = Constant.BASE_URL + "timesheets/" + action + "/" + timesheetId

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


                                setjustUpdate(!justUpdate)

                            } else if (code == 400) {
                                setisLoading(false)
                                let responseJson = await response.json();
                                console.log(responseJson);
                                console.warn('message', responseJson.message);
                                Alert.alert(String(responseJson.message))
                                Vibration.vibrate()
                                // this.refs.toast.show(responseJson.message);

                                setjustUpdate(!justUpdate)

                            } else if (code == 401 || code == 503) {
                                setisLoading(false)
                                let responseJson = await response.json();
                                console.warn('message', responseJson.message);
                                Alert.alert(String(responseJson.message))
                                Vibration.vibrate()
                                // Utility.logoutOnError(this.state.authDict, this.props.navigation);

                                setjustUpdate(!justUpdate)
                            } else {
                                // this.refs.toast.show('Something went wrong!');

                                console.log('Something went wrong! ' + code)
                                Alert.alert('Something Went Wrong - ' + String(code))
                                goBack()
                                setjustUpdate(!justUpdate)
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

    function bulkApprAction() {



        const timeSheetIdArray = Object.keys(bulkApprObj)

        if (timeSheetIdArray.length == 0) {

            Alert.alert("Alert !", "At least select one timesheet.")
            Vibration.vibrate()
            return

        }


        else {

            Alert.alert(
                'Alert !',
                'Are you sure you want to approve timesheets?',
                [
                    {
                        text: 'OK',
                        onPress: () => {

                            console.log("bulkApprAction func", bulkApprObj);

                            const payload = {
                                "timessheetIds": timeSheetIdArray
                            }

                            sendBulkApproval(payload)

                        },
                    }, ,
                    {
                        text: 'Cancel',
                    }
                ],

                { cancelable: false },
            );


        }



    }


    async function sendBulkApproval(payload) {



        console.log("sendBulkApproval payload: ", payload);

        var url = Constant.BASE_URL + "timesheets/" + "bulk/approve"

        console.log('sendBulkApproval URL', url);

        setisLoading(true)

        // return



        try {
            var requestOptions = {
                method: 'POST',
                headers: Constant.getHeader(authDict),
                body: JSON.stringify(payload),
            };

            console.log('request option', requestOptions);

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


                setjustUpdate(!justUpdate)

            } else if (code == 400) {
                setisLoading(false)
                let responseJson = await response.json();
                console.log(responseJson);
                console.warn('message', responseJson.message);
                Alert.alert(String(responseJson.message))
                Vibration.vibrate()
                // this.refs.toast.show(responseJson.message);

                setjustUpdate(!justUpdate)

            } else if (code == 401 || code == 503) {
                setisLoading(false)
                let responseJson = await response.json();
                console.warn('message', responseJson.message);
                Alert.alert(String(responseJson.message))
                Vibration.vibrate()
                // Utility.logoutOnError(this.state.authDict, this.props.navigation);

                setjustUpdate(!justUpdate)
            } else {
                // this.refs.toast.show('Something went wrong!');

                console.log('Something went wrong! ' + code)
                Alert.alert('Something Went Wrong - ' + String(code))
                Vibration.vibrate()
                goBack()
                setjustUpdate(!justUpdate)
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


    const renderSubmitted = ({ item }) => {

        // const [first, setfirst] = useState("")

        // console.log(item);

        const str = String(item.empName)

        let imgURI = "https://proh2r.com/infinitysolutions/emp/assets/images/user.png"

        const empName = str.split("-")[0]

        console.log(layout);

        if (item.empDocId == '' || item.empDocId == null) {

        }

        else {
            imgURI = Constant.storageServiceBaseUrl + item.empDocId
        }


        return (
            <SubmittedView
                empName={empName}
                empCode={item.empCode}
                totalHours={item.workWeekHours}
                workHours={item.totalHours}
                Width={layout.width}
                navigateTo={navigate}
                obj={item}
                imgURI={imgURI}
                color={"#ffc107"}
                flag={false}
                rejectApprfunc={approveAndRejectTimeSheet}
                fromDate={item.fromDate}
                toDate={item.toDate}
            />
        );
    };

    const renderBulkSubmitted = ({ item }) => {

        // const [first, setfirst] = useState("")

        const str = String(item.empName)

        let imgURI = "https://proh2r.com/infinitysolutions/emp/assets/images/user.png"

        const empName = str.split("-")[0]

        console.log(layout);

        if (item.empDocId == '' || item.empDocId == null) {

        }

        else {
            imgURI = Constant.storageServiceBaseUrl + item.empDocId
        }


        return (
            <BulkSubmitView
                empName={empName}
                empCode={item.empCode}
                totalHours={item.workWeekHours}
                workHours={item.totalHours}
                Width={layout.width}
                navigateTo={navigate}
                obj={item}
                imgURI={imgURI}
                color={"#ffc107"}
                flag={false}
                rejectApprfunc={approveAndRejectTimeSheet}
            />
        );
    };

    const renderUnSubmitted = ({ item }) => {

        // const [first, setfirst] = useState("")

        const str = String(item.empName)

        let imgURI = "https://proh2r.com/infinitysolutions/emp/assets/images/user.png"

        const empName = str.split("-")[0]

        console.log(layout);

        if (item.empDocId == '' || item.empDocId == null) {

        }

        else {
            imgURI = Constant.storageServiceBaseUrl + item.empDocId
        }


        return (
            <UnSubmittedRejectedView
                empName={empName}
                empCode={item.empCode}
                totalHours={item.workWeekHours}
                workHours={item.totalHours}
                Width={layout.width}
                navigateTo={navigate}
                obj={item}
                imgURI={imgURI}
                color={"#5683AF"}
                flag={true}
                fromDate={item.fromDate}
                toDate={item.toDate}
            />
        );
    };

    const renderRejected = ({ item }) => {

        // const [first, setfirst] = useState("")

        const str = String(item.empName)

        let imgURI = "https://proh2r.com/infinitysolutions/emp/assets/images/user.png"

        const empName = str.split("-")[0]

        console.log(layout);

        if (item.empDocId == '' || item.empDocId == null) {

        }

        else {
            imgURI = Constant.storageServiceBaseUrl + item.empDocId
        }


        return (
            <UnSubmittedRejectedView
                empName={empName}
                empCode={item.empCode}
                totalHours={item.workWeekHours}
                workHours={item.totalHours}
                Width={layout.width}
                navigateTo={navigate}
                obj={item}
                imgURI={imgURI}
                color={"#ef5350"}
                flag={true}
                fromDate={item.fromDate}
                toDate={item.toDate}
            />
        );
    };



    return (
        <>
            <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.FormBGColor }}>


                <Nav
                    backHidden={false}
                    title={navTitle}
                    backAction={() => goBack()}
                    isRightBtn={Submitted.length == 0 ? false : selectedPage == 0 ? true : false}
                    rightImg={require('../../images/dots.png')}
                    rightAction={() => {
                        setmenuVisible(!menuVisible)
                    }}
                >
                    {' '}

                </Nav>


                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>


                    <Menu onRequestClose={() => setmenuVisible(false)}
                        // children={<TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }} onPress={() => setmenuVisible(false)}></TouchableOpacity>}

                        visible={menuVisible}
                    // anchor={<Text  allowFontScaling={false}  onPress={showMenu}>Show menu</Text>}
                    // onRequestClose={hideMenu}
                    >


                        <MenuItem onPress={() => {
                            bulkApprObj = {}
                            setbulkAppr(!bulkAppr)
                            setmenuVisible(false)
                        }}>Bulk Approval</MenuItem>
                        <MenuItem onPress={() => {
                            setmenuVisible(false)
                            //  setbulkAppr(false)
                        }
                        }>Cancel</MenuItem>

                    </Menu>
                </View>

                {/* <View style={{
                    shadowOffset: { width: 0, height: 2, }, shadowColor: 'rgba(224,225,227,1.0)', shadowOpacity: 3.0,
                    elevation: 3, marginTop: 8, height: 40, width: '100%',
                    backgroundColor: 'white'
                }}> */}

                <TopScrollTab itemArr={topScrollTap} btnAction={btnAction}></TopScrollTab>
                {/* </View> */}


                {/* Main Screen */}
                <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: COLORS.FormBGColor, alignItems: 'center', paddingVertical: 7 }}
                    onLayout={(event) => setLayout(event.nativeEvent.layout)}>

                    {selectedPage == 0 ?

                        bulkAppr ?

                            <FlatList
                                data={Submitted}
                                renderItem={renderBulkSubmitted}
                                keyExtractor={(item, index) => String(index)}
                                horizontal={false}
                            />

                            :

                            <FlatList
                                data={Submitted}
                                renderItem={renderSubmitted}
                                keyExtractor={(item, index) => String(index)}
                                horizontal={false}
                            />

                        : selectedPage == 1 ?
                            <FlatList
                                data={Drafts}
                                renderItem={renderUnSubmitted}
                                keyExtractor={(item, index) => String(index)}
                                horizontal={false}
                            />

                            :

                            <FlatList
                                data={Rejected}
                                renderItem={renderRejected}
                                keyExtractor={(item, index) => String(index)}
                                horizontal={false}
                            />
                    }












                </View>

                {/* Bulk Approve Button */}
                {bulkAppr ?
                    <TouchableOpacity style={{ width: "100%", height: 50, backgroundColor: '#4D4D4D', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {

                            bulkApprAction()

                        }}

                    >

                        <Text  allowFontScaling={false}  style={{ color: 'white', fontFamily: 'Cochin', fontFamily: Constant.MontserratRegular }}> Bulk Approve  </Text>

                    </TouchableOpacity>

                    : <></>}


            </View>
            <Loader isLoader={isLoading}> </Loader>
        </>
    );




}

export default TimeApprovalsMain