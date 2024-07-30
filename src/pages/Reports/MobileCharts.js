import { StyleSheet, Text, View, Dimensions, processColor } from 'react-native'
import React, { useState, useReducer, useRef } from 'react'

import * as Constant from '../../Constant/Constants';
import { Shadow } from 'react-native-shadow-2';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { COLORS } from '../../Constant/Index';
import Moment from 'moment';
import Nav from '../../components/NavBar';
import KeyStore from '../../Store/LocalKeyStore';
import Loader from '../../components/Loader';
import PillsDropDown from '../../components/PillsDropDown';
import CustomDateDesign from '../../components/CustomDateDesign';
import PillsDropDownStateFull from '../../components/PillsDropDownStateFull';
import PillsDropDownObject from '../../components/PillsDropDownObject';
import { FormBGColor } from '../../Constant/Colors';
import { getCheckedData, PillsCheckBoxObj } from '../../components/PillsCheckBoxObj';
import * as Utility from '../../Externel Constant/Utility';
import StackedBarChartScreen from './MobileChartScreens/StackedBarChartScreen';
import MaleFemale from './MobileChartScreens/MaleFemale';
import AgeGroup from './MobileChartScreens/AgeGroup';

const WINDOW_HEIGHT = Dimensions.get('screen').height;
const WINDOW_WIDTH = Dimensions.get('screen').width;

function MobileCharts ({ navigation, route }) {

    console.log(route);

    const { screen } = route.params

    const [legendBarChart, setlegendBarChart] = useState({
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
    })

    const [dataBarChart, setdataBarChart] = useState({})

    const [xAxisBarChart, setxAxisBarChart] = useState({
        // valueFormatter: ['1990', '1991', '1992', '1993', '1994'],
        valueFormatter: [''],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true
    })

    const [highlightsBarChart, sethighlightsBarChart] = useState([{ x: 1, y: 40 }, { x: 2, y: 50 }])

    const [markerBarChart, setmarkerBarChart] = useState({
        enabled: true,
        markerColor: processColor('#235DCF'),
        textColor: processColor('white'),
        markerFontSize: 14,
    })

    const [selectedEntryBarChart, setselectedEntryBarChart] = useState('')

    function handleSelectBarChart(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            setselectedEntryBarChart('')
        } else {

            setselectedEntryBarChart(JSON.stringify(entry))
        }

        console.log(event.nativeEvent)
    }

    function whichScreen() {
        switch (screen) {
            case "MaleFemale":
                return <MaleFemale />

            case "AgeGroup":
                return <AgeGroup />

            default:
                return <StackedBarChartScreen/>
         
        }
    }

    function screenTitle() {
        switch (screen) {
            case "MaleFemale":
                return "Male Female Ratio"

            case "AgeGroup":
                return "Leave Report"

            default:
                return "Chart"
         
        }
    }

    return (
        <>
            <Nav
                backHidden={false}
                title={screenTitle()}
                backAction={() => navigation.goBack()}>
                {'  '}
            </Nav>

            {whichScreen()}

            {/* <View>
                <Text>MobileCharts</Text>
            </View> */}


        </>
    )

    const styles = StyleSheet.create({
        container: { flex: 1, height: WINDOW_HEIGHT - Utility.getSizeValueFromLayoutWidthORHeight(WINDOW_HEIGHT, 225) },
        chart: {
            flex: 1
        }
    })
}


export default MobileCharts

