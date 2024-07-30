import React, { useState } from 'react';
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import AttandanceTabs from './AttandanceTabs';


const { height, width } = Dimensions.get('window');


export default function MyAttandanceOverView({ overViewData, afterProcessingOverViewData, selectedTab, setselectedTab, isModal = false, isDatePickerVisible, selectedDate, setSelectedDate, showDatePicker, hideDatePicker, handleConfirm, teamAll, teamPresent, teamAbsent, monthCalDate, teamLeaves, onAll,
    onPresent,
    onAbsent, onLeaves, monthYearData }) {




    const SuperContainer = isModal ? { padding: 15 } : {}

    const container = isModal ? { marginTop: 0 } : {}

    const [weeklyoff, setweeklyoff] = useState(15)

    const [tabValue, settabValue] = useState(0)

    const [countContainerWidth, setcountContainerWidth] = useState(0)



    // const [selectedTab, setselectedTab] = useState(0)

    console.log('overViewData', overViewData);
    let { present, absent, leaveTaken,
        weaklyOff, holiday, hours } = overViewData

    console.log('afterProcessingOverViewData', afterProcessingOverViewData);
    let { afterLeaveTakenCount,
        afterWeeklyOffCount,
        afterHolidayCount,
        afterPresentCount,
        afterAbsentCount, } = afterProcessingOverViewData

    let valuesArr = [{
        present, absent, leaveTaken,
        weaklyOff, holiday, hours
    }, {
        present: afterPresentCount, absent: afterAbsentCount, leaveTaken: afterLeaveTakenCount,
        weaklyOff: afterWeeklyOffCount, holiday: afterHolidayCount, hours
    }]


    const styles = StyleSheet.create({

        countWithTitleBG: {
            width: `${100 / 3}%`,
            //    backgroundColor: '#e6fff2',
            alignItems: 'center',
            // borderWidth: 1,

        },
        countWithTitleBGTeam: {
            width: `${100 / 3}%`,
            //    backgroundColor: '#e6fff2',
            alignItems: 'center',
            paddingVertical: 5
        },


        count: { fontFamily: Constant.MontserratRegular, color: '#0B9F01', fontSize: 16 },

        title: { fontFamily: Constant.MontserratRegular, color: '#0B9F01', fontSize: 14, marginTop: 5 },

        countRadius: { width: countContainerWidth / 6.2, height: countContainerWidth / 6.3, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 16 }

    });

    return (
        <View style={[{
            width: '95%',
            //  height: 200, 
            backgroundColor: 'white', alignSelf: 'center', borderRadius: 20,
            overflow: 'hidden'
        },]}>


            <View style={{ flexDirection: 'row', overflow: 'hidden', width: '100%', justifyContent: 'space-between' }}>

                <View style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>

                    <Image

                        source={require('../../images/MyAttandance.png')}
                        style={{
                            width: 65,
                            height: 65,
                            resizeMode: 'contain',
                            // alignSelf: 'center',
                            right: 10,
                            bottom: 6

                        }} />

                    <Text allowFontScaling={false} style={{
                        fontFamily: Constant.MontserratMedium, color: 'black', fontSize: 14,
                        bottom: 5, right: 5
                    }}>
                        {'My Attendance'}
                    </Text>

                </View>

                {isModal ? <></> :

                    <TouchableOpacity onPress={() => {
                        monthYearData.showMonthPicker()
                    }} style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', paddingRight: 15, bottom: 3.5, }}>

                        <Image

                            source={require('../../images/filterAtt.png')}
                            style={{
                                width: 19,
                                height: 19,
                                resizeMode: 'contain',
                                // alignSelf: 'center',
                                

                            }} />


                        <Text allowFontScaling={false} style={{
                            fontFamily: Constant.MontserratMedium, color: '#3934ee', fontSize: 12, alignSelf: 'center',
                            left: 2,
                            //  bottom: 5,
                            //  right: 5 
                        }}>
                            {Utility.convertMonths(monthYearData.monthYear)}
                        </Text>

                    </TouchableOpacity>

                }

            </View>


            <View style={[{
                width: '100%',
                // backgroundColor: '#e6ffff',
                // marginTop: 25, 
                flexDirection: 'column',
                // padding: 20,
                paddingHorizontal: 0,
                paddingBottom: 20
            },]}>

                {/* {selectedTab == 0 ? */}

                <>



                    {/* Counts */}
                    <View onLayout={(event) => {
                        const { x, y, width, height } = event.nativeEvent.layout;
                        console.log(width)
                        setcountContainerWidth(width)

                    }} style={{ width: '100%', flexDirection: 'row', }}>

                        <View onPress={() => {
                            console.log(present, absent, leaveTaken,
                                weaklyOff, holiday, hours);
                        }} style={[styles.countWithTitleBG, {}]}>

                            <View style={[styles.countRadius, { borderColor: '#0B9F01' }]}>
                                <Text allowFontScaling={false} style={styles.count}>
                                    {valuesArr[tabValue].present}
                                </Text>
                            </View>



                            <Text allowFontScaling={false} style={styles.title}>
                                {'Present'}
                            </Text>

                        </View>

                        <View style={styles.countWithTitleBG}>

                            <View style={[styles.countRadius, { borderColor: '#ED1818' }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: '#ED1818' }]}>
                                    {valuesArr[tabValue].absent}
                                </Text>
                            </View>

                            <Text allowFontScaling={false} style={[styles.title, { color: '#ED1818' }]}>
                                {'Absent'}
                            </Text>

                        </View>

                        <View style={styles.countWithTitleBG}>
                            <View style={[styles.countRadius, { borderColor: '#19B696' }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: '#19B696' }]}>
                                    {valuesArr[tabValue].leaveTaken}
                                </Text>
                            </View>
                            <Text allowFontScaling={false} style={[styles.title, { color: '#19B696' }]}>
                                {'Leaves'}
                            </Text>

                        </View>

                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>

                        <View style={styles.countWithTitleBG}>
                            <View style={[styles.countRadius, { borderColor: '#FFCC00' }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: '#FFCC00' }]}>
                                    {valuesArr[tabValue].weaklyOff}
                                </Text>
                            </View>
                            <Text allowFontScaling={false} style={[styles.title, { color: '#FFCC00' }]}>
                                {'Weekly Off'}
                            </Text>

                        </View>

                        <View style={styles.countWithTitleBG}>
                            <View style={[styles.countRadius, { borderColor: '#5C5BF7' }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: '#5C5BF7' }]}>
                                    {valuesArr[tabValue].holiday}
                                </Text>
                            </View>
                            <Text allowFontScaling={false} style={[styles.title, { color: '#5C5BF7' }]}>
                                {'Holidays'}
                            </Text>

                        </View>

                        <View style={styles.countWithTitleBG}>
                            <View style={[styles.countRadius, { borderColor: 'black' }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: 'black' }]}>
                                    {/* {"128.30"} */}
                                    {valuesArr[tabValue].hours}
                                </Text>
                            </View>
                            <Text allowFontScaling={false} style={[styles.title, { color: 'black' }]}>
                                {'Total Hours'}
                            </Text>

                        </View>

                    </View>
                    {/* Counts */}
                </>







            </View>

        </View>
    )



}

