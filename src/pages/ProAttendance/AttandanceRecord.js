import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    Picker,
    Alert,
    ImageBackground,
    FlatList, Animated
} from 'react-native';
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
// import { punchLocationVO, punchLocationVO1 } from './fakeLocationData';
import { fakeAPIData } from './fakeAPIData';
import PunchTimeLineRecord from './PunchTimeLineRecord';



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

export default function AttandanceRecord({ defaultOpen = false, setdefaultOpen, indexOfRecord,
    date = '05 Apr 2023',
    attendanceRecordDayDateVO = {
        "day": 1,
        "date": "2023-03-01"
    },
    duration = '00:00',
    status = 'A',
    inTime = '00:00',
    outTime = '00:00',
    odHours = '00:00',
    slHours = '00:00',
    shiftTiming = '00:00-00:00',
    deviationHours = '00:00'

    , navigation, setIsFromMyAttandance, setRegData, monthYearData, isModal = false, punchLocationVO }) {

    const targetRef = useRef();
    // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const dimensions = useRef({ width: 0, height: 0 });

    const isShowLocationBtn = useRef(false);
    const [isShowLocationBtnState, setisShowLocationBtnState] = useState(false)

    const ValidCheckInData = useRef({
        "markAttendanceType": "",
        "isValidPunch": null,
        "punchTime": "",
        "latitudeLongitude": "",
        "punchLocationAddress": null,
        "deviceType": ""
    })

    const isValidCheckInFound = useRef(false)

    const punchDataAllFromMobile = useRef([])

    const isAnyPunchDataNotFromMobileFound = useRef(false)



    const [expanded, setExpanded] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const [openDetails, setopenDetails] = useState(defaultOpen)

    const [showPunchTimeLineModal, setshowPunchTimeLineModal] = useState(false)

    const { textColor, bgColor, textColorNew } = getColorAsPerStatus(status)

    function isPunchDetailsVOListForAllFromMobile(punchDetailsVOList = []) {



        for (let index = 0; index < punchDetailsVOList.length; index++) {
            const punchData = punchDetailsVOList[index];

            if (punchData.deviceType != "MOBILE") {

                return false

            }

        }

        return true

    }

    function getPunchDetailsAllFromMobile(punchDetailsVOList = []) {

        let tempPunchData = []

        for (let index = 0; index < punchDetailsVOList.length; index++) {
            const punchData = punchDetailsVOList[index];

            if (punchData.deviceType == "MOBILE") {

                tempPunchData.push(punchData)

            }

            else {
                isAnyPunchDataNotFromMobileFound.current = true
            }

        }

        if (tempPunchData.length == 0)
            return false
        else {
            punchDataAllFromMobile.current = tempPunchData
            return true
        }

    }

    function isShowLocationCheck() {

        if (isModal) {



            if (punchLocationVO == null) {

                return

            }

            if (punchLocationVO.punchDetailsVOList == null) {

                return

            }

            if (punchLocationVO.locationRestrictionsList == null) {

                return

            }

            // oldCode
            // isShowLocationBtn.current = isPunchDetailsVOListForAllFromMobile(punchLocationVO.punchDetailsVOList)

            // NewCode
            const showBtnTemp = getPunchDetailsAllFromMobile(punchLocationVO.punchDetailsVOList)
            isShowLocationBtn.current = showBtnTemp
            // setisShowLocationBtnState(showBtnTemp)


            console.log('isShowLocationBtn.current', isShowLocationBtn.current);

            // oldCode
            // fetchValidCheckInData(punchLocationVO.punchDetailsVOList) == true && isShowLocationBtn.current == true ? setisShowLocationBtnState(true) :
            //     setisShowLocationBtnState(false)

            // NewCode
            fetchValidCheckInData(punchLocationVO.punchDetailsVOList)
            setisShowLocationBtnState(showBtnTemp)

            // else if (indexOfRecord == 1) {

            //     if (punchLocationVO == null) {

            //         return

            //     }

            //     if (punchLocationVO.punchDetailsVOList == null) {

            //         return

            //     }

            //     if (punchLocationVO.locationRestrictionsList == null) {

            //         return

            //     }

            //     console.log('isShowLocationBtn.current', isShowLocationBtn.current);

            //     isShowLocationBtn.current = isPunchDetailsVOListForAllFromMobile(punchLocationVO1.punchDetailsVOList)

            //     fetchValidCheckInData(punchLocationVO.punchDetailsVOList) == true && isShowLocationBtn.current == true ? setisShowLocationBtnState(true) :
            //         setisShowLocationBtnState(false)
            // }


        }

        else return

    }

    const toggleExpand = () => {
        isShowLocationCheck()
        setExpanded(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        // }
    };

    function closeExpand() {

        console.log('Open', defaultOpen, indexOfRecord);

        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        setExpanded(false);

    }

    function fetchValidCheckInData(punchDetailsVOList) {


        for (let index = 0; index < punchDetailsVOList.length; index++) {
            const punchData = punchDetailsVOList[index];

            if (punchData.isValidPunch == true && punchData.markAttendanceType == 'CHECKIN' && punchData.deviceType == "MOBILE") {

                ValidCheckInData.current = punchData

                // !isShowLocationBtnState ?  setisShowLocationBtnState(true) : null
                isValidCheckInFound.current = true
                return true

            }

        }

        // isShowLocationBtn.current = false
        return false

        // isShowLocationBtnState ?  setisShowLocationBtnState(false) : null


    }

    function compileAndGoToEmpLocationScreen() {

        let isCheckOutNotFromMobileFound = false

        if (isValidCheckInFound.current == false && isAnyPunchDataNotFromMobileFound.current == true) {

            isCheckOutNotFromMobileFound = true

        }

        if (isValidCheckInFound.current == true) {
            navigation.navigate('EmpLocation', {
                initialRegionData: ValidCheckInData.current, locationRestrictionsList: punchLocationVO.locationRestrictionsList,
                punchDetailsVOList: punchDataAllFromMobile.current
            })
        }

        else
            navigation.navigate('EmpLocation', {
                initialRegionData: punchDataAllFromMobile.current[0], locationRestrictionsList: punchLocationVO.locationRestrictionsList,
                punchDetailsVOList: punchDataAllFromMobile.current
            })





    }

    function goToTimelineScreen() {

        // navigation.navigate('PunchTimeline', {
        //     punchDetailsVOList: punchLocationVO.punchDetailsVOList
        // })
        setshowPunchTimeLineModal(true)

    }



    // const height = animation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, isModal && (punchLocationVO != null || punchLocationVO?.punchDetailsVOList.length != 0) ? isShowLocationBtn.current ? 170 : 130 : 180],
    // });

    function checkPunchDetailsVOList() {
        if (punchLocationVO?.punchDetailsVOList?.length == undefined) {
            return false
        }

        else if (punchLocationVO?.punchDetailsVOList?.length == 0) {
            return false
        }

        else
            return true
    }

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, isModal ? checkPunchDetailsVOList() ? 170 : 130 : 170],
    });

    useEffect(() => {

        // console.log('useEffect calling',);

        if (dimensions.current.height != 0) {

            // console.log('useEffect', animation.interpolate);
            closeExpand()

        }

        // defaultOpen && console.log('useEffect');

        // defaultOpen && toggleExpand()

        // if (defaultOpen == indexOfRecord) {
        //     Open()

        //     // console.log();
        // }

    }, [defaultOpen])



    function isShowApplyLeave(status) {

        if (status == undefined) {
            return false
        }

        else if (status == 'P') {
            return false
        }

        else if (status == 'H') {
            return false
        }

        else if (status == 'WO') {
            return false
        }

        else {
            return true
        }

    }

    const renderItem = (item, index) => (
        <PunchTimeLineRecord first={item.markAttendanceType} second={String(item.punchTime).split('.')[0]} third={item.deviceType} />
    );


    return (

        <>
            <Modal
                visible={showPunchTimeLineModal}
                transparent={true}
                onRequestClose={() => { setshowPunchTimeLineModal(false) }}
                animationType={'slide'}>


                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center', alignItems: 'center'


                    }}>
                    <TouchableOpacity onPress={() => setshowPunchTimeLineModal(false)} activeOpacity={1} style={{ height: '60%', width: '100%', }}></TouchableOpacity>




                    <View style={{ height: '40%', width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: 'white' }}>

                        {/* <FloatBtnComp/> */}





                        <PunchTimeLineRecord first='Mark type' second='Time' third='Device' isHead={true} />

                        <FlatList style={{ backgroundColor: 'white', borderRadius: 10, alignSelf: 'center', marginBottom: 14 }}
                            data={punchLocationVO?.punchDetailsVOList}
                            horizontal={false}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            keyExtractor={(item, index) => String(item.markAttendanceId)}
                        />

                    </View>

                </View>




            </Modal>

            <View style={{ width: '100%', paddingHorizontal: 5, marginTop: 7 }}>
                <TouchableOpacity onPress={() => {

                    console.log('defaultOpen', defaultOpen);

                    console.log('punchLocationVO', punchLocationVO);

                    if (defaultOpen) {
                        closeExpand()
                        setdefaultOpen(-1)
                    }
                    else {
                        toggleExpand()
                        setdefaultOpen(indexOfRecord)
                    }

                    // setopenDetails(!openDetails)

                    //    console.log(Utility.convertToDDMMMYYYY(attendanceRecordDayDateVO.date)) 
                }} style={{
                    width: '100%',
                    // backgroundColor: 'red',
                    flexDirection: 'row', alignItems: 'center', padding: 5, paddingVertical: 10
                }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratMedium,
                                fontSize: 12,
                                color: 'black',
                                width: '35%',
                                // alignSelf: 'center',
                                // backgroundColor: 'red',
                                // textAlign: 'center',
                                paddingLeft: 16
                            }}>
                            {Utility.convertToDDMMMYYYY(attendanceRecordDayDateVO.date)}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratMedium,
                                fontSize: 12,
                                color: 'black',
                                width: '35%',
                                // textAlign: 'center'
                                paddingLeft: 16
                            }}>
                            {textColor == "rgba(122, 147, 137, 1)" ? "--:--" : duration}
                        </Text>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center', width: '30%',
                            // backgroundColor: 'red',
                            flexDirection: 'row'
                        }}>


                            <View style={{ backgroundColor: 'transparent', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 7, left: '20%', borderColor: textColorNew, borderWidth: 0.8 }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratMedium,
                                        fontSize: 12,
                                        color: textColorNew,
                                        // width: '30%',
                                        textAlign: 'center',
                                        // paddingRight: 16,
                                        alignSelf: 'center'
                                    }}>
                                    {status}
                                </Text>
                            </View>

                            {/* <View style={{ width: 20, height: 20 }}>
                        <Image
                            source={require('../../images/down-arrow.png')}
                            style={{
                                // position: 'absolute',
                                height: '100%',
                                width: '100%',
                                resizeMode: 'contain',
                                alignSelf: 'flex-end',
                                left: '30%',
                                // marginTop: 16,
                                transform: [{ rotate: openDetails ? '180deg' : '0deg' }],
                                tintColor: '#657BCB',

                            }}
                        />
                    </View> */}
                        </View>
                    </View>
                    <View style={{
                        // backgroundColor: 'green', 
                    }}>
                        <Image
                            source={defaultOpen ? require('../../images/collapse.png') : require('../../images/open.png')}
                            style={{
                                // position: 'absolute',
                                height: 14,
                                width: 14,
                                resizeMode: 'contain',
                                alignSelf: 'flex-end',
                                // left: '30%',
                                // marginTop: 16,
                                // transform: [{ rotate: defaultOpen ? '180deg' : '0deg' }],
                                // tintColor: '#657BCB',

                            }}
                        />
                    </View>
                </TouchableOpacity>


                {/*    {true ? */}
                <>

                    {/* status strip */}
                    {/* <View style={{
                        width: '100%',
                        backgroundColor: bgColor,
                        flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 5
                    }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratMedium,
                                fontSize: 12,
                                color: textColor,
                                width: '35%',
                                // alignSelf: 'center',
                                // backgroundColor: 'red',
                                textAlign: 'center',
                                // paddingRight: 16
                            }}>
                            {status}
                        </Text>
                    </View> */}

                    {/* <View style={{ width: '90%', alignSelf: 'center', marginVertical: 5, height: 1, backgroundColor: '#e6e6e6' }} /> */}
                    {expanded ?
                        <View style={{ width: '100%', height: 10 }} />
                        : <></>
                    }
                    <View style={

                        expanded ?
                            {
                                borderWidth: 0.9,
                                borderRadius: 20,
                                borderColor: '#e6e6e6',
                                backgroundColor: 'rgba(239, 239, 239,0.2)'


                            } : {}

                    }>
                        <Animated.View onLayout={(event) => {
                            // console.log('event', event.nativeEvent.layout);
                            // setDimensions({
                            //     width: event.nativeEvent.layout.width,
                            //     height: event.nativeEvent.layout.height
                            // });

                            dimensions.current.width = event.nativeEvent.layout.width

                            dimensions.current.height = event.nativeEvent.layout.height


                        }} style={[{
                            width: '100%',
                            overflow: 'hidden',

                            // backgroundColor: 'red',
                            // paddingLeft: '10%'
                        }, { height }]}>



                            <View style={{
                                marginTop: 15, width: '100%', flexDirection: 'row',
                                // backgroundColor: 'red'

                            }}>

                                <View style={styles.detailsContainer}>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsHeading}>
                                        {"Shift Timing"}
                                    </Text>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsText}>
                                        {shiftTiming}
                                    </Text>

                                </View>

                                <View style={styles.detailsContainer}>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsHeading}>
                                        {"Check-In"}
                                    </Text>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsText}>
                                        {inTime}
                                    </Text>

                                </View>

                                <View style={styles.detailsContainer}>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsHeading}>
                                        {"Check-Out"}
                                    </Text>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsText}>
                                        {outTime}
                                    </Text>

                                </View>

                            </View>

                            <View style={{ marginTop: 15, width: '100%', flexDirection: 'row' }}>

                                <View style={styles.detailsContainer}>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsHeading
                                        }>
                                        {"Deviation"}
                                    </Text>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsText}>
                                        {deviationHours}
                                    </Text>

                                </View>

                                <View style={styles.detailsContainer}>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsHeading}>
                                        {"OD Hours"}
                                    </Text>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsText}>
                                        {odHours}
                                    </Text>

                                </View>

                                <View style={styles.detailsContainer}>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsHeading}>
                                        {"SL Hours"}
                                    </Text>

                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailsText}>
                                        {slHours}
                                    </Text>

                                </View>

                            </View>

                            {isModal ?

                                <>



                                    <View style={{
                                        marginTop: 15, width: '100%', flexDirection: 'row',
                                        //  height: 25
                                    }}>

                                        {/* <TouchableOpacity onPress={()=>{
                                    navigation.navigate('EmpLocation')
                                }} style={{marginLeft: 19, alignSelf: 'center'}}>
                                <Image
                                    source={require('../../images/see_location.png')}
                                    style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: '#3934ee' }}
                                />
                                </TouchableOpacity> */}
                                        {isShowLocationBtnState ?
                                            <TouchableOpacity style={{ borderWidth: 0.8, justifyContent: 'center', alignItems: 'center', marginLeft: 19, padding: 5, borderColor: '#3934ee', borderRadius: 5, paddingHorizontal: 10 }} onPress={() => {

                                                compileAndGoToEmpLocationScreen()

                                            }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[styles.detailsText, { color: '#3934ee', paddingLeft: 0, alignSelf: 'center', marginTop: 0, }]}>
                                                    {'See Location'}
                                                </Text>
                                            </TouchableOpacity>

                                            :
                                            <></>
                                        }

                                        {punchLocationVO == null || punchLocationVO?.punchDetailsVOList.length == 0 ? <></> :

                                            <TouchableOpacity style={{ borderWidth: 0.8, justifyContent: 'center', alignItems: 'center', marginLeft: 19, padding: 5, borderColor: '#3934ee', borderRadius: 5, paddingHorizontal: 10 }} onPress={() => {

                                                goToTimelineScreen()

                                            }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[styles.detailsText, { color: '#3934ee', paddingLeft: 0, alignSelf: 'center', marginTop: 0, }]}>
                                                    {'See Timeline'}
                                                </Text>
                                            </TouchableOpacity>

                                        }


                                    </View>


                                </>
                                :

                                <View style={{
                                    marginTop: 15, width: '100%', flexDirection: 'row',
                                    //  height: 25
                                }}>

                                    {!isShowApplyLeave(status) ? <></> :
                                        <TouchableOpacity style={{ borderWidth: 0.8, justifyContent: 'center', alignItems: 'center', marginLeft: 19, padding: 5, borderColor: '#3934ee', borderRadius: 5, paddingHorizontal: 10 }} onPress={() => {

                                            navigation.navigate('ApplyLeave', {
                                                refreshList: () => {
                                                    monthYearData.reloadApi(monthYearData.monthYear)
                                                    setdefaultOpen(-1)
                                                }, isEdit: '0', fromMyAttandance: true, pickedServerDt: attendanceRecordDayDateVO.date, pickedDt: Moment(attendanceRecordDayDateVO.date).format('DD/MM/YYYY')
                                            })

                                        }}>
                                            <Text style={[styles.detailsText, { color: '#3934ee', paddingLeft: 0, alignSelf: 'center', marginTop: 0, }]}
                                                allowFontScaling={false}
                                            >
                                                {'Apply Leave'}
                                            </Text>
                                        </TouchableOpacity>

                                    }


                                    {status == 'N/A' || status == 'In' || status == 'Out' ? <></> :
                                        <TouchableOpacity style={{ borderWidth: 0.8, justifyContent: 'center', alignItems: 'center', marginLeft: 19, padding: 5, borderColor: '#3934ee', borderRadius: 5, paddingHorizontal: 10 }} onPress={() => {
                                            // navigation.navigate('AttendanceTab',{ "tabIndex": 1, "openApplyReg": true })
                                            setRegData(Moment(attendanceRecordDayDateVO.date).format('DD/MM/YYYY'), Moment(attendanceRecordDayDateVO.date).format('YYYY-MM-DD'), Moment(attendanceRecordDayDateVO.date).format('DD-MM-YYYY'))
                                            setIsFromMyAttandance()

                                        }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={[styles.detailsText, { color: '#3934ee', paddingLeft: 0, alignSelf: 'center', marginTop: 0, }]}>
                                                {'Apply Regularization'}
                                            </Text>
                                        </TouchableOpacity>

                                    }



                                </View>
                            }


                        </Animated.View>
                    </View>
                    {/* <View style={{ width: '90%', alignSelf: 'center', marginTop: 15, height: 0.3, backgroundColor: 'grey' }} /> */}

                    {/* <View style={{ height: 20 }}></View> */}

                </>
                {/*    :
               <></>
            } */}

                {!expanded ? <View style={{ width: '100%', alignSelf: 'center', height: 1, backgroundColor: '#e6e6e6', marginTop: 7 }} />
                    : <></>}



            </View>
        </>


    )
}


const styles = StyleSheet.create({


    detailsContainer: {
        width: `${100 / 3}%`
    },

    detailsHeading: {
        fontFamily: Constant.MontserratMedium,
        fontSize: 12,
        color: 'rgba(148,149,150,1.0)',
        // alignSelf: 'center',
        // backgroundColor: 'red',
        // textAlign: 'center',
        paddingLeft: 19
        // paddingRight: 16
    },
    detailsText: {
        fontFamily: Constant.MontserratMedium,
        fontSize: 12,
        color: 'black',
        marginTop: 5,
        // alignSelf: 'center',
        // backgroundColor: 'red',
        // textAlign: 'center',
        paddingLeft: 19
        // paddingRight: 16
    }



});