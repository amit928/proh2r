import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert, Button, Settings, NativeModules, Platform 
} from 'react-native';
import ImageView from "react-native-image-viewing";
import Application from '../biometrics/Application.container';
import ExpandAnim from './ExpandAnim';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';



export default function Android_Apple_ID(props) {

    const [id, setid] = useState('Not Set')



    useEffect(() => {

        if (Platform.OS === 'ios') {

            const iosVendorId = NativeModules.SettingsManager.settings.AppleIDFA;
            console.log('iosVendorId', iosVendorId);
            Alert.alert('iosVendorId', iosVendorId)
            setid(iosVendorId)
        }
        else {

            const androidId = Settings.get('android_id');
            console.log('Android_ID', androidId);
            setid(androidId)
            Alert.alert('Android_ID', androidId)

        }




    }, [])



    return (
        <>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        {'id: ' + JSON.stringify(id)}
                    </Text>
            </View>
        </>
    )

}