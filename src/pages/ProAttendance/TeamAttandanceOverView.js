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

export default function TeamAttandanceOverView({ overViewData, afterProcessingOverViewData, selectedTab, setselectedTab, isModal = false, isDatePickerVisible, selectedDate, setSelectedDate, showDatePicker, hideDatePicker, handleConfirm, teamAll, teamPresent, teamAbsent, monthCalDate, teamLeaves, onAll,
    onPresent,
    onAbsent, onLeaves, currentAttandaceArray, setcurrentTab, currentTab }) {



    function isSelected(tabIndex, color, index) {

        // if (currentAttandaceArray?.length == count) {

        //     return [color, 'white']
        // }
        // else {
        //     return ['white', color]
        // }

        if (tabIndex == currentTab) {

            return [color, 'white']
        }
        else {
            return ['white', color]
        }

        // return [currentAttandaceArray?.length == count ? color : 'white']

    }

    // console.log('overViewData', overViewData);
    let { present, absent, leaveTaken,
        weaklyOff, holiday, hours } = overViewData

    // console.log('afterProcessingOverViewData', afterProcessingOverViewData);
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

    const [countContainerWidth, setcountContainerWidth] = useState(0)

    const styles = StyleSheet.create({

        countWithTitleBG: {
            width: `${100 / 4}%`,
            //    backgroundColor: '#e6fff2',
            alignItems: 'center',
            paddingVertical: 5
            // borderWidth: 1,

        },
        countWithTitleBGTeam: {
            width: `${100 / 4}%`,
            //    backgroundColor: '#e6fff2',
            alignItems: 'center',
            paddingVertical: 5
        },


        count: { fontFamily: Constant.MontserratRegular, color: '#0B9F01', fontSize: 16 },

        title: { fontFamily: Constant.MontserratRegular, color: '#0B9F01', fontSize: 14, marginTop: 5 },

        countRadius: { width: countContainerWidth / 6.2, height: countContainerWidth / 6.3, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 16 }

    });
    return (
        <>

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
                            {'My Team'}
                        </Text>

                    </View>

                    {/* Date */}
                    <TouchableOpacity style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', paddingRight: 15, bottom: 3.5, }}
                        onPress={() => {
                            showDatePicker()
                        }}
                    >

                        <Image
                            source={require('../../images/filterAtt.png')}
                            style={{
                                width: 19,
                                height: 19,
                                resizeMode: 'contain',
                                // alignSelf: 'center',
                                tintColor: '#3934ee',

                            }}
                        />

                        <Text allowFontScaling={false} style={{
                            fontFamily: Constant.MontserratMedium, color: '#3934ee', fontSize: 12, alignSelf: 'center',
                            left: 2,
                            //  bottom: 5,
                            //  right: 5 
                        }}>
                            {/* {'Mon, 5 Mar 2023'} */}
                            {Utility.convertToDayDDMMMYYYY(monthCalDate)}
                        </Text>


                    </TouchableOpacity>
                    {/* Date */}

                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={new Date(monthCalDate)}
                        // minimumDate={new Date("2023-02-01")}
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />

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

                    <View onLayout={(event) => {
                        const { x, y, width, height } = event.nativeEvent.layout;
                        console.log(width)
                        setcountContainerWidth(width)

                    }} style={{ width: '100%', flexDirection: 'row', }}>

                        <TouchableOpacity onPress={() => {
                            setcurrentTab(0)
                            onAll()
                        }
                        } style={[styles.countWithTitleBG, {}]}>



                            <View style={[styles.countRadius, { borderColor: 'black', backgroundColor: isSelected(0, 'black')[0] }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: isSelected(0, 'black')[1] }]}>
                                    {teamAll}
                                </Text>
                            </View>

                            <Text allowFontScaling={false} style={[styles.title, { color: 'black' }]}>
                                {'All'}
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setcurrentTab(1)
                            onPresent()
                        }} style={[styles.countWithTitleBGTeam]}>



                            <View style={[styles.countRadius, { borderColor: '#0B9F01', backgroundColor: isSelected(1, '#0B9F01')[0] }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: isSelected(1, '#0B9F01')[1] }]}>
                                    {teamPresent}
                                </Text>
                            </View>

                            <Text allowFontScaling={false} style={[styles.title, {}]}>
                                {'Present'}
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setcurrentTab(2)
                            onAbsent()
                        }} style={[styles.countWithTitleBGTeam,]}>

                            <View style={[styles.countRadius, { borderColor: '#ED1818', backgroundColor: isSelected(2, '#ED1818')[0] }]}>
                                <Text allowFontScaling={false} style={[styles.count, { color: isSelected(2, '#ED1818')[1] }]}>
                                    {teamAbsent}
                                </Text>
                            </View>

                            <Text allowFontScaling={false} style={[styles.title, { color: '#ED1818' }]}>
                                {'Absent'}
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setcurrentTab(3)
                            onLeaves()
                        }
                        } style={[styles.countWithTitleBGTeam,]}>

                            <View style={[styles.countRadius, { borderColor: '#19B696', backgroundColor: isSelected(3, '#19B696')[0] }]}>

                                <Text allowFontScaling={false} style={[styles.count, { color: isSelected(3, '#19B696')[1] }]}>
                                    {teamLeaves}
                                </Text>
                            </View>

                            <Text allowFontScaling={false} style={[styles.title, { color: '#19B696' }]}>
                                {'Leaves'}
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>

                        {/* <TouchableOpacity onPress={() => {
                            setcurrentTab(3)
                            onLeaves()
                        }
                        } style={[styles.countWithTitleBGTeam,]}>

                            <View style={[styles.countRadius, { borderColor: '#19B696', backgroundColor: isSelected(3, '#19B696')[0] }]}>

                                <Text allowFontScaling={false} style={[styles.count, { color: isSelected(3, '#19B696')[1] }]}>
                                    {teamLeaves}
                                </Text>
                            </View>

                            <Text allowFontScaling={false} style={[styles.title, { color: '#19B696' }]}>
                                {'Leaves'}
                            </Text>

                        </TouchableOpacity> */}

                        {/* <TouchableOpacity onPress={onAbsent} style={[styles.countWithTitleBGTeam,]}>

                <Text  allowFontScaling={false}  style={[styles.count, { color: '#9796f2' }]}>
                    {0}
                </Text>

                <Text  allowFontScaling={false}  style={styles.title}>
                    {'Holiday'}
                </Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={onPresent} style={[styles.countWithTitleBGTeam]}>

                <Text  allowFontScaling={false}  style={[styles.count, { color: '#4aa3df' }]}>
                    {0}
                </Text>

                <Text  allowFontScaling={false}  style={styles.title}>
                    {'Half Day'}
                </Text>

            </TouchableOpacity> */}


                    </View>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    countWithTitleBG: {
        width: `${100 / 3}%`,
        //    backgroundColor: '#e6fff2',
        alignItems: 'center'
    },
    countWithTitleBGTeam: {
        width: `${100 / 3}%`,
        //    backgroundColor: '#e6fff2',
        alignItems: 'center',
        paddingVertical: 5
    },


    count: { fontFamily: Constant.MontserratMedium, color: '#516b2d', fontSize: 20 },

    title: { fontFamily: Constant.MontserratMedium, color: '#c1bec1', fontSize: 14, marginTop: 5 }

});