import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert
} from 'react-native';
import ImageView from "react-native-image-viewing";
import Application from '../biometrics/Application.container';
import ExpandAnim from './ExpandAnim';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';

export default function NewTeamAttAPI() {

    useEffect(() => {
      
        KeyStore.getKey('authDict', (err, value) => {
            if (value) {
                getleaveSummary(value)
            }
          });
      
    }, [])

    async function getleaveSummary(authDict) {

        console.log('api started');

        let url = Constant.BASE_URL + `attendance/attendanceRecords/teamRecords/${authDict.employeeCode}/MARCH-2023`

        console.log(url);

        
    
        try {
          let response = await fetch(url, {
            method: 'GET',
            headers: Constant.getHeader(authDict)
          }
          )
    
          let code = await response.status
          
    
          if (code == 200) {
            let responseJson = await response.json();
            console.log(responseJson)
            
            
          } else if (code == 400) {
            let responseJson = await response.json();
            console.log(responseJson.message);
    
          }
        //   else if (code == 401 || code == 503) {
    
        //     Utility.logoutOnError(this.state.authDict, this.props.navigation)
        //   }
           else {
            let responseJson = await response.json();
            console.log(responseJson.message);
            // this.refs.toast.show('Something went wrong!');
    
          }
        } catch (error) {
          
          Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
    
        //   Vibration.vibrate()
          console.error(error);
        }
      }


    return <></>
    
}