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
import { useSelector, useDispatch } from 'react-redux';
import { SetauthDictGlobal, SetTemplateAssignment, SetProjectList, settimeSheetLineResVOSglobal, setMainAPIPayload, setTimeCaptureType, setTimeSheetApprStatusFlag, SetGetprojecTaskList, setTotalHours } from '../../ReduxAction';
import { useIsFocused } from '@react-navigation/native';


const TimeApprovalsMainCalendarView = ({ navigateTo }) => {


  const isFocused = useIsFocused();

  //   const [navTitle, setnavTitle] = useState('Time Sheets')

  //   const [authDict, setauthDict] = useState({})

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
    console.log('executing block');
    KeyStore.getKey('authfffDict', (err, value) => {
      if (value) {
        console.log('AuthDict', value);
      }
      else{
        console.log(err);

        if (err == null) {
          console.log('executing else');
        }

        
      }
    })


  }, []);




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

              // navigateTo('TimeSheetsWeekView', { TimeSheetData })

              navigateTo('TimeApprovalsMain', { TimeSheetData })

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
      </ScrollView>
    </View>
  );
}

export default TimeApprovalsMainCalendarView;