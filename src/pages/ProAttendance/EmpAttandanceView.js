import React, { Component, createRef, useState } from 'react';
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

import MyAttandanceRecordHead from './MyAttandanceRecordHead';
const { height, width } = Dimensions.get('screen');

export default function EmpAttandanceView({ present, absent, leaveTaken,
    weaklyOff, holiday, hours, afterProcessingOverViewData, attendanceRecordsOnDayVOList, isModal = false, navigation }) {

    console.log('EmpAttandanceView', present, absent, leaveTaken,
        weaklyOff, holiday, hours);

    const [selectedTab, setselectedTab] = useState(0)

    const [defaultOpen, setdefaultOpen] = useState(-1)


    return (
        <>
            <View style={{ marginTop: 25 }} />

            <MyAttandanceOverView overViewData={{
                present, absent, leaveTaken,
                weaklyOff, holiday, hours
            }} afterProcessingOverViewData={afterProcessingOverViewData} selectedTab={selectedTab} setselectedTab={setselectedTab}
                isModal={isModal} />



            <View style={{ marginTop: 25, }} />


            <>

                <View style={{
                    width: '95%', backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, borderRadius: 17, paddingBottom: 5,
                    // height: height - 250
                }}>




                    {/* Attandance Records Heading */}
                    <MyAttandanceRecordHead />
                    {/* Attandance Records Heading */}



                    {attendanceRecordsOnDayVOList.map((item, index) => {

                        return <AttandanceRecord key={String(index)} {...item} defaultOpen={defaultOpen == index ? true : false} indexOfRecord={index} setdefaultOpen={setdefaultOpen} isModal={true} navigation={navigation} />
                    })}

                    {/* <FlatList nestedScrollEnabled={true}
                        data={attendanceRecordsOnDayVOList}
                        renderItem={({ item, index }) => <AttandanceRecord key={String(index)} {...item} defaultOpen={defaultOpen == index ? true : false} indexOfRecord={index} setdefaultOpen={setdefaultOpen} isModal={true} navigation={navigation}/>}
                        keyExtractor={(item, index) => String(index)}
                    /> */}


                </View>
            </>
        </>
    )

}