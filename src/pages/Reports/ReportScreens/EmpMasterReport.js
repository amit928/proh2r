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

// const MAINDATA = {
//     "graphDept": [
//         {
//             "empCount": "18",
//             "depName": "Implementation"
//         },
//         {
//             "empCount": "25",
//             "depName": "Development"
//         },
//         {
//             "empCount": "18",
//             "depName": "Sales"
//         },
//         {
//             "empCount": "1",
//             "depName": "Human Resource (HR) "
//         },
//         {
//             "empCount": "7",
//             "depName": "The Board of Control for Cricket in India"
//         },
//         {
//             "empCount": "15",
//             "depName": "pearl pet"
//         },
//         {
//             "empCount": "12",
//             "depName": "accounts"
//         },
//         {
//             "empCount": "10",
//             "depName": "Testing"
//         }
//     ],
//     "graphBand": [
//         {
//             "empCount": "5",
//             "bandName": "E 1.0"
//         },
//         {
//             "empCount": "12",
//             "bandName": "E 1.1"
//         },
//         {
//             "empCount": "14",
//             "bandName": "E 1.2"
//         },
//         {
//             "empCount": "20",
//             "bandName": "E 2.2"
//         },
//         {
//             "empCount": "12",
//             "bandName": "E 2.1"
//         }
//     ],
//     "filterData": [
//         {
//             "empFirstName": "Venugopal",
//             "empMiddleName": "",
//             "empLastName": "Iyer",
//             "empEmail": "venugopal_424@infinitysolution.com",
//             "empEmailPer": "venugopal_424@infinitysolution.com",
//             "empMobileNo": "9546167516",
//             "empEmargencyPerson": "Adi Manav",
//             "empEmargencyPersonContact": "7845845641",
//             "empGender": "Male",
//             "empDOB": "1990-02-10",
//             "empMaritalStatus": "Single",
//             "empMarriageAnniverssary": "2022-07-05",
//             "empPassportDetails": "dfhdfvj15sd",
//             "empPAN": "Ahgj4564G",
//             "empPFNo": null,
//             "empAadhar": "458948791948",
//             "empDisabilityStatus": "No Disability",
//             "empFatherHusbandName": "Raja appa cherian",
//             "empNoOfChildren": "0",
//             "empAddressLine1": "Plot No.C1, Madkaim Industrial Estate, Madkaim, ",
//             "empAddressLine2": "Post: Mardol",
//             "empCity": "Madkai",
//             "empState": "Goa",
//             "empCountry": "India",
//             "empPinCode": "403404",
//             "empBankName": "HDFC Bank",
//             "empBankAccNo": "32165160915952",
//             "empBankIFSCCode": "HDFC0000056",
//             "empBankAddress": "HDFC GOA",
//             "moodCaptured": null,
//             "moodCapturingPreference": null,
//             "empCode": "424",
//             "empSalaryPaymentType": "Bank Transfer",
//             "empJoiningDate": "2022-07-01",
//             "empConfirmationDate": "2022-07-04",
//             "empJobInfoEffFrom": "2022-07-01",
//             "empJobInfoLocation": "Gurgaon - 002",
//             "empJobInfoDesignation": "Project Co - Ordinator",
//             "empJobInfoEmploymentType": "Full Time",
//             "empJobInfoSupervisor": "Archit  gaba - 1162",
//             "empJobInfoDepartment": "Development",
//             "empJobInfoSubDepartment": "Product Development",
//             "empJobInfoOrganization": "Infinity Solution",
//             "empJobInfoBandName": "E 1.1",
//             "docId": null,
//             "empEmployementStatusEffFrom": "2022-07-05",
//             "empEmployementStatusStatus": "Probation",
//             "userEmploymentStatus": "ACTIVE",
//             "userEnrollmentStatus": "INCOMPLETE",
//             "emailVerified": null,
//             "emailAutoGenerated": true,
//             "payrollActive": null,
//             "id": 138
//         },
//         {
//             "empFirstName": "Vishal",
//             "empMiddleName": "Pratap",
//             "empLastName": "Singh",
//             "empEmail": "vishalsingh4897@gmail.com",
//             "empEmailPer": "vishal@gmail.com",
//             "empMobileNo": "",
//             "empEmargencyPerson": "Tom",
//             "empEmargencyPersonContact": "8811881188",
//             "empGender": "Male",
//             "empDOB": "1998-10-15",
//             "empMaritalStatus": "Single",
//             "empMarriageAnniverssary": null,
//             "empPassportDetails": "",
//             "empPAN": "",
//             "empPFNo": null,
//             "empAadhar": "",
//             "empDisabilityStatus": "No Disability",
//             "empFatherHusbandName": "Shailendra Singh",
//             "empNoOfChildren": null,
//             "empAddressLine1": "1-112",
//             "empAddressLine2": "Noida",
//             "empCity": "Noida",
//             "empState": "Uttar Pradesh",
//             "empCountry": "India",
//             "empPinCode": "201310",
//             "empBankName": "HDFC Bank",
//             "empBankAccNo": "1100110011",
//             "empBankIFSCCode": "HDF1921F",
//             "empBankAddress": "Noida",
//             "moodCaptured": null,
//             "moodCapturingPreference": null,
//             "empCode": "1274",
//             "empSalaryPaymentType": "Bank Transfer",
//             "empJoiningDate": "2022-01-17",
//             "empConfirmationDate": "2022-07-01",
//             "empJobInfoEffFrom": "2021-03-01",
//             "empJobInfoLocation": "Noida - 001",
//             "empJobInfoDesignation": "Consultant",
//             "empJobInfoEmploymentType": "Full Time",
//             "empJobInfoSupervisor": "Andrew Peter - 009",
//             "empJobInfoDepartment": "Development",
//             "empJobInfoSubDepartment": "Product Development",
//             "empJobInfoOrganization": "Digital Solutions",
//             "empJobInfoBandName": "E 1.1",
//             "docId": "InfinitySolution/1274/981.8587710957521_profile-picture.jpeg",
//             "empEmployementStatusEffFrom": "2022-02-25",
//             "empEmployementStatusStatus": " Confirmed",
//             "userEmploymentStatus": "ACTIVE",
//             "userEnrollmentStatus": "INCOMPLETE",
//             "emailVerified": null,
//             "emailAutoGenerated": false,
//             "payrollActive": true,
//             "id": 104
//         },
//         {
//             "empFirstName": "Raju",
//             "empMiddleName": "",
//             "empLastName": "Rastogi",
//             "empEmail": "raju_421@infinitysolution.com",
//             "empEmailPer": "raju_421@ymail.com",
//             "empMobileNo": "9512555415",
//             "empEmargencyPerson": "Chimanlal",
//             "empEmargencyPersonContact": "1451981891",
//             "empGender": "Male",
//             "empDOB": "1995-05-03",
//             "empMaritalStatus": "Single",
//             "empMarriageAnniverssary": null,
//             "empPassportDetails": "",
//             "empPAN": "",
//             "empPFNo": null,
//             "empAadhar": "",
//             "empDisabilityStatus": "Normal",
//             "empFatherHusbandName": "jadav bhai",
//             "empNoOfChildren": "",
//             "empAddressLine1": "Kholi no.4, Ram desai basti",
//             "empAddressLine2": "dharavi",
//             "empCity": "Mumbai",
//             "empState": "Maharashtra",
//             "empCountry": "India",
//             "empPinCode": "400017",
//             "empBankName": "Axis Bank",
//             "empBankAccNo": "910010080497981",
//             "empBankIFSCCode": "UTIB0000004",
//             "empBankAddress": "Axis Bank Mumbai Branch",
//             "moodCaptured": null,
//             "moodCapturingPreference": null,
//             "empCode": "421",
//             "empSalaryPaymentType": "Bank Transfer",
//             "empJoiningDate": "2022-07-01",
//             "empConfirmationDate": "2022-07-05",
//             "empJobInfoEffFrom": "2022-07-05",
//             "empJobInfoLocation": "Noida - 001",
//             "empJobInfoDesignation": "Web Site Designer",
//             "empJobInfoEmploymentType": "Full Time",
//             "empJobInfoSupervisor": "Archit  gaba - 1162",
//             "empJobInfoDepartment": "Development",
//             "empJobInfoSubDepartment": "Product Development",
//             "empJobInfoOrganization": "Infinity Solution",
//             "empJobInfoBandName": "E 1.1",
//             "docId": null,
//             "empEmployementStatusEffFrom": "2022-07-05",
//             "empEmployementStatusStatus": " Confirmed",
//             "userEmploymentStatus": "ACTIVE",
//             "userEnrollmentStatus": "INCOMPLETE",
//             "emailVerified": null,
//             "emailAutoGenerated": true,
//             "payrollActive": null,
//             "id": 135
//         }
//     ]
// }

export default function EmpMasterReport(props) {

    // const MAINDATA = props.route.params.MAINDATA

    const { MAINDATA, pieTitle, barTitle, title } = props.route.params

    console.log('MAINDATA', MAINDATA);

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

    function populateBarChart() {


        let dataSetsTempArray = []

        MAINDATA.graphDept.forEach((item, index) => {

            let tempData = {
                values: [parseInt(item?.empCount), parseInt(item?.empCount)],
                label: item?.depName,
                config: {
                    drawValues: false,
                    colors: [processColor(returnUniqueColorCode()), processColor("#2a4bc8")],
                }
            }

            dataSetsTempArray.push(tempData)

        })

        console.log('MAINDATAApi, setdataBarChart', {
            dataSets: dataSetsTempArray, config: {
                barWidth: 0.8,
                group: {
                    fromX: 0,
                    groupSpace: 0.1,
                    barSpace: 0.1,
                },
            }
        });



        setdataBarChart({
            dataSets: dataSetsTempArray, config: {
                barWidth: 0.4,
                group: {
                    fromX: 0,
                    groupSpace: 0.1,
                    barSpace: 0.1,
                },
            }
        })

    }

    function populatePieChart() {

        let dataSetsValuesArray = []

        let configColorsArray = []

        MAINDATA.graphBand.forEach((item, index) => {



            let tempData = { value: parseInt(item.empCount), label: item.bandName, name: item.bandName }

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

        populateBarChart()
        populatePieChart()


    }, [])


    function onRefresh() {
        
        populateBarChart()
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
                        <Text> selected entry</Text>
                        <Text> {selectedEntryBarChart}</Text>
                    </View> */}

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            <Text> {pieTitle} </Text>

                        </View>


                        <View style={styles.container}>

                            <BarChart
                                style={styles.chart}
                                xAxis={xAxisBarChart}
                                data={dataBarChart}
                                legend={legendBarChart}
                                drawValueAboveBar={false}
                                onSelect={handleSelectBarChart}
                                onChange={(event) => console.log(event.nativeEvent)}
                                highlights={highlightsBarChart}
                                marker={markerBarChart}
                                chartDescription={description}
                            />

                        </View>

                        <View style={{ height: 80 }} />

                        {/* <Text> {Object.keys(selectedEntry).length >= 1 ? selectedEntry?.name + ": " + selectedEntry?.value : <></>}</Text> */}

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            <Text> {barTitle} </Text>

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

                    {
                        MAINDATA?.filterData?.length == 0 ? <></> :

                        <TitleComponent  title='Employee Master Report'/>
                    }
                        
                        


                        <View style={{ height: 20 }} />

                        {MAINDATA.filterData.map((item, index) => {



                            return (<SwipeableList  key={String(index)} onPress={() => {

                                setselectedEmployeeDetail(item)
                                setviewEmployeeDetail(true)
                            }} title={item.empFirstName + ' ' + item.empLastName} statusMain={item.empCode} statusHeading={'Emp Code: '}
                                fromTo={'Joining Date: ' + item.empJoiningDate}
                            />
                            )
                        })



                        }




                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>

                <Modal
                    visible={viewEmployeeDetail}
                    transparent={true}
                    onRequestClose={() => { setviewEmployeeDetail(false) }}
                    // style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    animationType='slide'
                >


                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'center', alignItems: 'center'


                        }}>
                        <TouchableOpacity onPress={() => setviewEmployeeDetail(false)} activeOpacity={1} style={{ height: '40%', width: '100%', }}></TouchableOpacity>




                        <View style={{ flex: 1, width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>

                            <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.7, borderColor: '#d7d0e1' }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'black', fontWeight: '500', }}>{'View Application'}</Text>
                            </View>

                            <ScrollView style={{
                                backgroundColor: '#ffff', width: '100%', height: '100%',
                                // borderTopStartRadius: 20, borderTopEndRadius: 20,
                                padding: 20, paddingHorizontal: 12
                            }} showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>


                                {/* <View style={{ width: '100%', height: 0.5, backgroundColor: 'grey', marginTop: '1.5%' }}>
                  </View> */}


                  {  Object.keys(selectedEmployeeDetail).length != 0 ?
                  
                  <>
                  
                   
                        <CustomTextField editable={false} label='Emp Code' value={String(selectedEmployeeDetail?.empCode)} />
                        
                        <CustomTextField editable={false} label='Name' value={String(selectedEmployeeDetail?.empFirstName + ' ' + selectedEmployeeDetail?.empLastName)} />
                   
                        <CustomTextField editable={false} label='Email' value={String(selectedEmployeeDetail?.empEmail)} />
                   
                        <CustomTextField editable={false} label='Contact No' value={String(selectedEmployeeDetail?.empEmargencyPersonContact)} />
                   
                        <CustomTextField editable={false} label='Designation' value={String(selectedEmployeeDetail?.empJobInfoDesignation)} />
                   
                        <CustomTextField editable={false} label='Joining Date' value={String(selectedEmployeeDetail?.empJoiningDate)} />
                   
                        <CustomTextField editable={false} label='Location' value={String(selectedEmployeeDetail?.empJobInfoLocation)} />
                   
                        <CustomTextField editable={false} label='Supervisor' value={String(selectedEmployeeDetail?.empJobInfoSupervisor)} />
                   
                        <CustomTextField editable={false} label='Date of Birth' value={String(selectedEmployeeDetail?.empDOB)} />
                        
                    


                  </> 
                
                  :

                    <></>

                }

                                

                                {/* <CustomTextField editable={false} label='Start Date' value={String(this.state.viewData?.startDate)} />

                                <CustomTextField editable={false} label='End Date' value={String(this.state.viewData?.endDate)} />

                                <CustomTextField editable={false} label='Total Leave Days' value={String(this.state.viewData?.totalLeaves)} />

                                <CustomCommentInput viewOnly={true} editable={false} label='Reason' value={String(this.state.viewData?.leaveReason)} /> */}

                                <View style={{ marginBottom: 30 }}></View>


                            </ScrollView>
                        </View>

                    </View>

                </Modal>

            </View>

        </>



    );



}




