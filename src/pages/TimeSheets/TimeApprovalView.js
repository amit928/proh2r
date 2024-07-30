import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator, SafeAreaView } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';

import Loader from '../../components/Loader';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';
import CustomPicker from '../../components/CustomPicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';
import { settimeSheetLineResVOSglobal, settimeSheetTestResponse, setTotalHours } from '../../ReduxAction';


const TimeApprovalView = (props) => {



    console.log(' Route Edit Timesheet ', props.route.params.projectDetail)




    //redux State
    const dispatch = useDispatch()


    const [navTitle, setnavTitle] = useState(`View TimeSheet Data`)

    const [ProjectName, setProjectName] = useState(props.route.params.projectDetail.projectName)


    const [TaskName, setTaskName] = useState(props.route.params.projectDetail.taskName)





    const [StartTime, setStartTime] = useState(props.route.params.projectDetail.fromTime)

    const [EndTime, setEndTime] = useState(props.route.params.projectDetail.toTime)

    const [TotalTime, setTotalTime] = useState(props.route.params.projectDetail.hours)





    const [Notes, setNotes] = useState(props.route.params.projectDetail.notes)




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




    // UI
    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: '#F0F0F0' }}>



            <Nav
                backHidden={false}
                title={navTitle}
                backAction={() => goBack()}>
                {' '}
            </Nav>



            <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: '#F0F0F0' }}>





                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>


                    {/* Project Name */}
                    <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        disabled={true}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Project</Text>

                        </View>

                        <View style={{ width: '60%', marginRight: 17 }}>
                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', fontFamily: Constant.MontserratRegular }}>{ProjectName}</Text>
                        </View>



                    </TouchableOpacity>

                    {/* Task Name */}
                    <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}

                        disabled={true}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Task</Text>

                        </View>

                        <View style={{ width: '60%', marginLeft: '3%' }}>
                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', marginRight: 17, fontFamily: Constant.MontserratRegular }}>{TaskName}</Text>
                        </View>



                    </TouchableOpacity>

                    {/* Start Time */}


                    {/* Condition Rendering for Time Capture Time */}


                    <>


                        <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            onPress={() => {

                                console.log('Start Time');
                                setStartTimePicker(true);
                                console.log(' TaskId---------- ', TaskId, ' ProjectId----------- ', ProjectId);
                            }}
                            disabled={true}
                        >



                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                                <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Start Time</Text>

                            </View>

                            <View style={{ width: '60%' }}>
                                <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', marginRight: 17 , fontFamily: Constant.MontserratRegular}}>{StartTime}</Text>
                            </View>



                        </TouchableOpacity>



                        {/* End Time */}


                        <TouchableOpacity style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}

                            disabled={true}
                        >

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                                <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>End Time</Text>

                            </View>

                            <View style={{ width: '60%' }}>
                                <Text  allowFontScaling={false}  style={{ color: '#8687A4', textAlign: 'right', marginRight: 17, fontFamily: Constant.MontserratRegular }}>{EndTime}</Text>
                            </View>



                        </TouchableOpacity>
                    </>


                    {/* Total Time */}

                    <View style={{ display: 'flex', width: '100%', height: 40, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        onPress={() => {

                            console.log('Start Time');
                        }}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Total Time</Text>

                        </View>

                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', marginRight: 13, height: 30 }}>
                            <Text  allowFontScaling={false} Input style={{ flex: 1, width: '100%', borderWidth: 1, backgroundColor: 'white', borderColor: '#E5E5E5', borderRadius: 6, alignItems: 'center', padding: 0, paddingLeft: 8, color: '#8687A4' }}
                                keyboardType='ascii-capable'
                                
                                value={TotalTime}
                                editable={false}

                                returnKeyType='done'
                            />
                        </View>

                        {/* <Image style={{
                            marginRight: 17, width: 15,
                            height: 15,
                            resizeMode: 'contain',

                        }} source={require('../../images/downArrow.png')} /> */}

                    </View>

                    {/* Notes */}

                    <View style={{ display: 'flex', width: '100%', height: 100, backgroundColor: 'white', marginTop: 5, marginBottom: 5, flexDirection: 'column', padding: 6, paddingLeft: 0 }}
                    >

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 10, borderWidth: 2, borderColor: '#AA7479', marginLeft: 17, marginRight: 13 }}></View>

                            <Text  allowFontScaling={false}  style={{ color: '#8687A4', fontFamily: Constant.MontserratRegular }}>Notes</Text>

                        </View>


                        <Text  allowFontScaling={false} Input style={{ flex: 1, width: '87.5%', borderWidth: 1, backgroundColor: 'white', borderColor: '#E5E5E5', borderRadius: 6, padding: 0, paddingLeft: 8, marginTop: 5, marginLeft: 40, color: '#8687A4' }}
                            keyboardType='ascii-capable'
                            
                            multiline={true}

                            value={Notes}
                            returnKeyType='done'
                            editable={false}

                        />


                        {/* <Image style={{
                            marginRight: 17, width: 15,
                            height: 15,
                            resizeMode: 'contain',

                        }} source={require('../../images/downArrow.png')} /> */}

                    </View>

                </ScrollView>



            </View>


        </View>
    );
}

export default TimeApprovalView;