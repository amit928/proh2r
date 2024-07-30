import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert, Button
} from 'react-native';
import ImageView from "react-native-image-viewing";
import Application from '../biometrics/Application.container';
import ExpandAnim from './ExpandAnim';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
// const path = RNFS.DocumentDirectoryPath + '/myFile.txt';
const path = RNFS.ExternalStorageDirectoryPath + '/myFile.txt';



export default function FileIO() {


    function checkFileExist() {

        console.log(path);

        RNFS.exists(path)
            .then(exists => {
                if (exists) {
                    console.log('File exist');
                    Alert.alert('File exist !')
                    return true
                } else {
                    console.log('File does not exist');
                    Alert.alert('File does not exist !')
                    return false
                }
            })
            .catch((error) => {console.log(error)
                Alert.alert('Error')
                
            });


    }

    function writeFile() {


        RNFS.writeFile(path, 'Hello world!', 'utf8')
            .then(() => {
                console.log('File written')
                Alert.alert('File written !')
            })
            .catch((error) => {console.log(error)
                requestExternalStoragePermission()
            });
    }

    function readFile() {
        RNFS.readFile(path, 'utf8')
            .then((content) => {
                console.log(content)
                Alert.alert('File Read !', content)
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Error')
            });

    }

    async function requestExternalStoragePermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'External Storage Permission',
              message: 'This app needs access to your external storage to read files',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('External storage permission granted');
          } else {
            console.log('External storage permission denied');
          }
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {



    }, [])


    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title='Write'
                    onPress={() => writeFile()}
                />
                <Button
                    title='Check File'
                    onPress={() => checkFileExist()}
                />
                <Button
                    title='Read File'
                    onPress={() => readFile()}
                />
            </View>
        </>
    )
}