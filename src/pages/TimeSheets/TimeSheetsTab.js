import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';

import Loader from '../../components/Loader';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { SetTemplateAssignment, SetGetprojecTaskList, SetProjectList, settimeSheetLineResVOSglobal, settimeSheetTestResponse, setTimeSheetApprStatusFlag, setTotalHours } from '../../ReduxAction';
import { useIsFocused } from '@react-navigation/native';
import * as Fonts from '../../components/Fonts';
import TopScrollTab from '../../components/TopScrollTab';
import TimeSheetsMainCalenderView from './TimeSheetsMainCalenderView';
import TimeApprovalsMainCalendarView from './TimeApprovalsMainCalendarView';


const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',

    },
    selectedView: {
        marginLeft: 4, marginRight: 5, borderWidth: 0.5, borderColor: 'gray'
        , backgroundColor: 'rgba(52,74,235,1.0)', borderRadius: 15
        , paddingLeft: 15, paddingRight: 15, height: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
    },
    unSelectedView: {
        marginLeft: 4, marginRight: 5, borderWidth: 0.5, borderColor: 'gray'
        , backgroundColor: 'white', borderRadius: 15
        , paddingLeft: 15, paddingRight: 15, height: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
    },
    selectedText: {
        fontFamily: Constant.MontserratSemiBold, color: 'white', fontSize: 10
    },
    unSelectedText: {
        fontFamily: Constant.MontserratSemiBold, color: 'gray', fontSize: 10
    },

}
)


const TimeSheetTab = (props) => {

    const [navTitle, setnavTitle] = useState('TimeSheet')
    const [topScrollTap, settopScrollTap] = useState([{ title: 'TimeSheet', isSelect: true }, { title: 'Time Approvals', isSelect: false }])

    const [selectedPage, setselectedPage] = useState(0)

    const { goBack } = props.navigation;

    const { navigate } = props.navigation;

    function btnAction(value) {
        console.log('btnAction', value);

        let arr = []

        topScrollTap.forEach((item, index) => {
            item.isSelect = false
            arr.push(item)
        }
        )

        arr[value].isSelect = true

        setnavTitle(arr[value].title)
        setselectedPage(value)

    }

    return (

        <View style={styles.container}>
            <Nav
                backHidden={false}
                title={navTitle}
                backAction={() => goBack()}>
                {' '}
            </Nav>

            {/* <View style={{
                shadowOffset: { width: 0, height: 2, }, shadowColor: 'rgba(224,225,227,1.0)', shadowOpacity: 3.0,
                elevation: 3, marginTop: 8, height: 60, width: '100%', backgroundColor: 'rgba(239,240,241,1.0)'
            }}> */}

                <TopScrollTab itemArr={topScrollTap} btnAction={btnAction}></TopScrollTab>


            {/* </View> */}

            {selectedPage == 0 ? < TimeSheetsMainCalenderView navigateTo={navigate} />


                :



                <TimeApprovalsMainCalendarView navigateTo={navigate} />

            }

        </View>

    );

}

export default TimeSheetTab;