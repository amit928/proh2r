import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';

import Loader from '../../components/Loader';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { SetauthDictGlobal, SetTemplateAssignment, SetProjectList, settimeSheetLineResVOSglobal, setMainAPIPayload, setTimeCaptureType, setTimeSheetApprStatusFlag, SetGetprojecTaskList, setTotalHours } from '../../ReduxAction';
import { useIsFocused } from '@react-navigation/native';


const TimeSheetsMainCalenderView = ({ navigateTo }) => {


  const isFocused = useIsFocused();

  const [navTitle, setnavTitle] = useState('Time Sheets')

  const [authDict, setauthDict] = useState({})

  const [isLoading, setisLoading] = useState(false)

  const authDictGlobal = useSelector(state => state.authDictGlobal);

  const dispatch = useDispatch();




  // const { goBack } = props.navigation;


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





  useEffect(() => {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        console.log('AuthDict', value);
        setauthDict(value)
        dispatch(SetauthDictGlobal(value))

        dispatch(setMainAPIPayload({
          "empCode": "",
          "fromDate": "",
          "toDate": "",
          "timeSheetApprovalStatus": "",
          "timeSheetId": null,
          "totalDeviationHours": null,
          "totalHours": "00:00",
          "workWeekHours": "00:00",
          "totalDay0Hours": "00:00",
          "totalDay1Hours": "00:00",
          "totalDay2Hours": "00:00",
          "totalDay3Hours": "00:00",
          "totalDay4Hours": "00:00",
          "totalDay5Hours": "00:00",
          "totalDay6Hours": "00:00",
          "timeSheetLineResVOS": []
        }))
        dispatch(SetProjectList([]))
        dispatch(settimeSheetLineResVOSglobal([]))
        dispatch(SetTemplateAssignment({}))
        dispatch(setTimeSheetApprStatusFlag(false))
        dispatch(SetGetprojecTaskList([]))
        dispatch(setTotalHours(""))

        // console.log("authDict", authDict);

      }
    });


  }, [isFocused]);




  // UI
  return (

    <View style={{ width: '100%', height: '100%' }}>

      <Loader isLoader={isLoading}> </Loader>
      {/* <Nav
        backHidden={false}
        title={navTitle}
        backAction={() => goBack()}>
        {' '}
      </Nav> */}
      <ScrollView>

        <View style={{ padding: 7, }}>
          <Calendar style={{ borderRadius: 10, }}
            onDayPress={date => {

              // console.log('selected day', day);


              console.log('----------------------');

              console.log(date);

              const d = new Date(String(date.dateString));
              let day = d.getDay()

              // let previousDay = new Date(d)
              // previousDay.setDate(d.getDate() - 2)
              // console.log(previousDay) 


              console.log('datetest', d.getDate() - d.getDay());

              console.log('day', d.getDay())

              let previousDay = new Date(d)
              previousDay.setDate(d.getDate() - d.getDay())
              console.log('Previous Day', previousDay)

              let nextDay = new Date(previousDay)
              // console.log('nextDay', nextDay.getDate() + 5);
              nextDay.setDate(nextDay.getDate() + 6)
              console.log('nextDay', nextDay);

              console.log('----------------------');

              let TimeSheetData = {
                'previousDay': String(previousDay),
                'nextDay': String(nextDay)
              }

              navigateTo('TimeSheetsWeekView', { TimeSheetData })
            }}
          // dayComponent={({ date, state }) => {
          //   console.log(' Hi', date);
          //   return (

          //     <View style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
          //       {/* <View style={{ borderWidth: 0.3, borderColor: 'black', width: 70 }}/> */}
          //       <TouchableOpacity onPress={() => {
          //         console.log('----------------------');

          //         console.log(date);

          //         const d = new Date(String(date.dateString));
          //         let day = d.getDay()

          //         // let previousDay = new Date(d)
          //         // previousDay.setDate(d.getDate() - 2)
          //         // console.log(previousDay) 


          //         console.log('datetest', d.getDate() - d.getDay());

          //         console.log('day', d.getDay())

          //         let previousDay = new Date(d)
          //         previousDay.setDate(d.getDate() - d.getDay())
          //         console.log('Previous Day', previousDay)

          //         let nextDay = new Date(previousDay)
          //         // console.log('nextDay', nextDay.getDate() + 5);
          //         nextDay.setDate(nextDay.getDate() + 6)
          //         console.log('nextDay', nextDay);

          //         console.log('----------------------');

          //         let TimeSheetData = {
          //           'previousDay': String(previousDay),
          //           'nextDay': String(nextDay)
          //         }

          //         props.navigation.navigate('TimeSheetsWeekView', { TimeSheetData })
          //       }}

          //         style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
          //         <View style={{ backgroundColor: '#5683AF', width: 30, height: 32, borderRadius: 20 }} />
          //         <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : state === 'today' ? 'blue' : state === 'selected' ? 'green' : 'black', }}>{date.day}</Text>
          //       </TouchableOpacity>
          //     </View>
          //   );
          // }}
          />
        </View>

        <View style={{
          padding: 7
          // , alignItems: 'center', justifyContent: 'center'
        }}>
          <View style={styles.legendView}>

            <View style={{
              alignItems: 'center',
              // marginTop: 15, 
              flexDirection: 'row',
              marginLeft: 5, marginRight: 5,
              // transform: [{rotate: '270deg'}]
            }}>



              <Image style={{
                width: 30, height: 30,
                marginRight: 8,
              }} source={require('../../images/legendIcon.png')} />
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 0.5, height: 30, backgroundColor: 'grey', marginRight: 8 }}></View>
              <Text style={{ fontSize: 15.5, color: '#2d4150' }}>Legends</Text>

            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', width: 0.4, height: '100%', backgroundColor: 'grey', marginRight: 10 }}></View>
            {/* ---------------- */}

            <View style={{
              display: 'flex', flexDirection: 'column'
              // , padding: 10,  
            }}>

              <View style={styles.legends}>

                <Image style={styles.legendImg} source={require('../../images/timesheetDraft.png')} />

                <Text style={styles.legendLabel}>Draft</Text>

              </View>


              <View style={styles.legends}>

                <Image style={styles.legendImg} source={require('../../images/timesheetSubmitted.png')} />

                <Text style={styles.legendLabel}>Pending</Text>

              </View>

              <View style={styles.legends}>

                <Image style={styles.legendImg} source={require('../../images/timeSheetApproved.png')} />

                <Text style={styles.legendLabel}>Approved</Text>

              </View>

            </View>

            <View style={{
              display: 'flex', flexDirection: 'column'
              // , padding: 10, 

            }}>

              <View style={styles.legends}>

                <Image style={styles.legendImg} source={require('../../images/timesheetRejected.png')} />

                <Text style={styles.legendLabel}>Rejected</Text>

              </View>

              <View style={styles.legends}>

                <View style={{ backgroundColor: '#CBCBCB', width: 30, height: 30, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                  <View style={{ backgroundColor: '#808080', width: 20, height: 20, borderRadius: 14, }}></View>
                </View>

                <Text style={styles.legendLabel}>Not{"\n"}Applicable</Text>

              </View>

            </View>
            {/* 

          <View style={styles.legends}>

            <Image style={styles.legendImg} source={require('../../images/timesheetRejected.png')} />

            <Text style={styles.legendLabel}>Rejected</Text>

          </View>

          <View style={styles.legends}>

            <View style={{ backgroundColor: '#CBCBCB', width: 30, height: 30, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}>
              <View style={{ backgroundColor: '#808080', width: 20, height: 20, borderRadius: 14, }}></View>
            </View>

            <Text style={styles.legendLabel}>Not Applicable</Text>

          </View> */}


          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  legendView: {
    backgroundColor: 'white', width: '100%', marginTop: 20, display: 'flex', flexDirection: 'row', marginBottom: 160, borderRadius: 10
  },

  legends: {
    display: 'flex', flexDirection: 'row', alignItems: 'center',
    padding: 10,
  },

  legendImg: {
    width: 30, height: 30, resizeMode: 'contain',
    // marginLeft: 30,
    marginRight: 5
  },

  legendLabel: {
    // fontFamily: Constant.MontserratRegular
    textAlign: 'left',
    color: '#31404D'
    // marginRight: 30,

  }

})

export default TimeSheetsMainCalenderView;