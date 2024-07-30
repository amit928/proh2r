import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View, Alert, ScrollView, processColor, Dimensions, Modal, TouchableOpacity, RefreshControl
} from 'react-native';
import * as Constant from '../../../Constant/Constants';
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from '../../../Constant/Index';
import Moment from 'moment';
import Nav from '../../../components/NavBar';
import KeyStore from '../../../Store/LocalKeyStore';
import Loader from '../../../components/Loader';
import PillsDropDown from '../../../components/PillsDropDown';
import CustomDateDesign from '../../../components/CustomDateDesign';
import { BarChart, PieChart } from 'react-native-charts-wrapper';
import { PillsCheckBoxObj } from '../../../components/PillsCheckBoxObj';
import { useRef } from 'react';
import * as Utility from '../../../Externel Constant/Utility';
import SwipeableList from '../../../components/SwipeableList';
import DisplayCountBar from '../../../components/DisplayCountBar';
import CustomTextField from '../../../components/CustomTextField';
import TitleComponent from './TitleComponent';

//  const MAINDATA = [
//     {
//         "id": 1,
//         "name": "E 1.0",
//         "empCount": 5
//     },
//     {
//         "id": 2,
//         "name": "E 1.1",
//         "empCount": 12
//     },
//     {
//         "id": 3,
//         "name": "E 1.2",
//         "empCount": 14
//     },
//     {
//         "id": 5,
//         "name": "E 2.2",
//         "empCount": 20
//     },
//     {
//         "id": 4,
//         "name": "E 2.1",
//         "empCount": 12
//     }
// ]

export default function EmpBandReport(props) {

    // const MAINDATA = props.route.params.MAINDATA

    const { MAINDATA} = props.route.params

    // console.log('MAINDATA', MAINDATA);

    

    const { goBack } = props.navigation;

    const colorObj = useRef({})

    function checkFunc(value) {

        let val = JSON.stringify(value)

        if (colorObj.current[val] != undefined) {


            return true
        }

        else {
            return false
        }

    }

    function returnUniqueColorCode() {

        let i = 1

        let flag = true

        while (flag) {

            let temp = '#' + Math.floor(Math.random() * 16777215).toString(16)

            console.log(checkFunc(temp))

            console.log(i)

            if (processColor(temp) != undefined) {



                if (checkFunc(temp)) {



                } else {

                    colorObj.current[JSON.stringify(temp)] = 1

                    return temp
                }

            }

            if (i > 100) {
                break
            }

            i++

        }
    }

    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const WINDOW_WIDTH = Dimensions.get('window').width;

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



    const [legend, setlegend] = useState({
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
    })
    const [data, setdata] = useState({
        dataSets: [{
            values: [{ value: 5, label: 'Rent Information', name: 'Rent Information' },
            { value: 12, label: 'Exemption', name: 'Exemption' },

            { value: 14, label: 'Deduction', name: 'Deduction' },
            { value: 20, label: 'Deduction Under Chaptor VI', name: 'Deduction Under Chaptor VI' },
            { value: 21, label: 'Deduction Under Chaptor VI', name: 'Deduction Under Chaptor VI' },

                // {value: 15, label: 'Desserts'}
            ],
            label: 'Pie dataset',
            config: {
                colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                valueTextSize: 20,
                valueTextColor: 'green',
                sliceSpace: 5,
                selectionShift: 7,
                // xValuePosition: "OUTSIDE_SLICE",
                // yValuePosition: "OUTSIDE_SLICE",
                valueFormatter: "#.#'%'",
                valueLineColor: processColor('green'),
                valueLinePart1Length: 0.5
            }
        }],
    })

    // const [data, setdata] = useState({})

    const [highlights, sethighlights] = useState([{ x: 2 }])
    const [description, setdescription] = useState({
        text: '',
        textSize: 15,
        textColor: processColor('darkgray'),

    })
    const [selectedEntry, setselectedEntry] = useState({})

    const [selectedEmployeeDetail, setselectedEmployeeDetail] = useState({})

    const [viewEmployeeDetail, setviewEmployeeDetail] = useState(false)

    const [refreshing, setrefreshing] = useState(false)


    function handleSelectBarChart(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            setselectedEntryBarChart('')
        } else {

            setselectedEntryBarChart(JSON.stringify(entry))
        }

        console.log(event.nativeEvent)
    }

    function handleSelect(event) {
        let entry = event.nativeEvent

        if (Object.keys(event.nativeEvent).length <= 1) {

            return

        }


        if (entry == null) {
            setselectedEntry({})
        } else {
            setselectedEntry(entry.data)
        }

        console.log(event.nativeEvent)
    }

    console.log('colorObj', colorObj);

   

    function populatePieChart() {

        let dataSetsValuesArray = []

        let configColorsArray = []

        MAINDATA.forEach((item, index) => {



            let tempData = { value: parseInt(item.empCount), label: item.name, name: item.name }

            configColorsArray.push(processColor(returnUniqueColorCode()))

            dataSetsValuesArray.push(tempData)

        })

        let mainPieData = {
            dataSets: [{
                values: dataSetsValuesArray,
                label: '',
                config: {
                    colors: configColorsArray,
                    valueTextSize: 20,
                    valueTextColor: processColor('green'),
                    sliceSpace: 5,
                    selectionShift: 7,
                    // xValuePosition: "OUTSIDE_SLICE",
                    // yValuePosition: "OUTSIDE_SLICE",
                    valueFormatter: "#.#'%'",
                    valueLineColor: processColor('green'),
                    valueLinePart1Length: 0.5
                }
            }],
        }

        console.log('MAINDATAApi populatePieChart',

            mainPieData

        );

        setdata(mainPieData)


    }

    useEffect(() => {

        
        populatePieChart()


    }, [])


    function onRefresh() {
        
  
        populatePieChart()
        setrefreshing(false)

    }


    const styles = StyleSheet.create({
        container: { flex: 1, height: WINDOW_HEIGHT - Utility.getSizeValueFromLayoutWidthORHeight(WINDOW_HEIGHT, 225) },
        chart: {
            flex: 1
        }
    });

    return (

        <>
            <Nav
                backHidden={false}
                title={'My Reports'}
                backAction={() => goBack()}>
                {'  '}
            </Nav>

            <View style={{ flex: 1 }}>

                <ScrollView refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                     setrefreshing(true)
                      onRefresh()
                    }}
                    
                    />
                } style={{ flex: 1, padding: 15, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>


                    <View style={{ flex: 1 }}>

                        {/* <View style={{ height: 80 }}>
                        <Text  allowFontScaling={false} > selected entry</Text>
                        <Text  allowFontScaling={false} > {selectedEntryBarChart}</Text>
                    </View> */}

                        <View style={{ height: 80 }} />

                        {/* <Text  allowFontScaling={false} > {Object.keys(selectedEntry).length >= 1 ? selectedEntry?.name + ": " + selectedEntry?.value : <></>}</Text> */}

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            <Text  allowFontScaling={false} > {'Total Employee'} </Text>

                        </View>

                        <View style={{ flex: 1, height: WINDOW_HEIGHT - Utility.getSizeValueFromLayoutWidthORHeight(WINDOW_HEIGHT, 225) }}>
                            <PieChart
                                style={styles.chart}
                                logEnabled={true}
                                chartBackgroundColor={processColor('white')}
                                chartDescription={description}
                                data={data}
                                legend={legend}
                                highlights={highlights}

                                extraOffsets={{ left: 0, top: 0, right: 0, bottom: 0 }}

                                entryLabelColor={processColor('green')}
                                entryLabelTextSize={20}
                                entryLabelFontFamily={'HelveticaNeue-Medium'}
                                drawEntryLabels={false}

                                rotationEnabled={true}
                                rotationAngle={45}
                                usePercentValues={true}
                                styledCenterText={{ text: '', color: processColor('red'), fontFamily: 'HelveticaNeue-Medium', size: 12 }}
                                centerTextRadiusPercent={100}
                                holeRadius={40}
                                holeColor={processColor('#f0f0f0')}
                                transparentCircleRadius={20}
                                transparentCircleColor={processColor('#f0f0f088')}
                                maxAngle={360}
                                onSelect={handleSelect}
                                onChange={(event) => console.log('event.nativeEvent', event.nativeEvent)}
                            />
                        </View>

                        
                        <TitleComponent  title='Employee Band Report'/>


                        <View style={{ height: 20 }} />

                        {MAINDATA.map((item, index) => {



                            return (<SwipeableList  key={String(index)} onPress={() => {

                                // setselectedEmployeeDetail(item)
                                // setviewEmployeeDetail(true)
                            }} title={'Band Name: ' + item.name} statusMain={item.id} statusHeading={'Band ID: ' }
                               statusMainColor='black' fromTo={'Employee Count: ' + item.empCount}
                            />
                            )
                        })



                        }




                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>

           

            </View>

        </>



    );



}
