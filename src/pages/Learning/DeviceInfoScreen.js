import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert, Button, Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
import NavBar from '../../components/NavBar';
import { Constant } from '../../Constant/Index';
import Clipboard from '@react-native-clipboard/clipboard';

function copyToClipboard(text) {
    Clipboard.setString(text);

}

function DataComp({
    // func = async () => { console.log('No Function') },
    title = 'Nothing', value = 'Loading...', index = '' }) {




    return (<View style={{ marginBottom: 20, alignItems: 'center' }}>

        <View style={{ flexDirection: 'row' }}>
            <Text>{index + '. '}</Text>
            <Text style={{ color: title == 'getUniqueId(): ' ? 'red' : 'black' }}>{title}</Text>

            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { copyToClipboard(title + " \n" + JSON.stringify(value)) }}>
                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/copy.png')}></Image>
            </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 2 }}>{JSON.stringify(value)}</Text>
    </View>)
}

export function DeviceInfoScreen(props) {

    const dataArrAndroid = useRef([])
    const dataArriOS = useRef([])
    const dataArrAndroidiOS = useRef([])

    const [showAndroidData, setshowAndroidData] = useState(false)

    const [NavTitle, setNavTitle] = useState('Loading...')


    function pushToDataArrAndroid(title, val) {

        dataArrAndroid.current.push({ title, val })

    }

    function pushToDataArriOS(title, val) {

        dataArriOS.current.push({ title, val })

    }

    function pushToDataArrAndroidiOS(title, val) {

        dataArrAndroidiOS.current.push({ title, val })

    }

    function emptyDataArray() {
        dataArrAndroid.current.length = 0
        dataArriOS.current.length = 0
        dataArrAndroidiOS.current.length = 0
    }

    function showDataArr() {

        console.log('dataArrAndroid.current', dataArrAndroid.current);
        console.log('dataArriOS.current', dataArriOS.current);
        console.log('dataArrAndroidiOS.current', dataArrAndroidiOS.current);
        setshowAndroidData(true)
        setNavTitle('Device Info')

    }


    useEffect(() => {

        emptyDataArray()
        showData()



    }, [])

    async function showData() {

        await forAndroid()
        await foriOS()
        await forAndroidAndiOS()

        showDataArr()
    }



    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'whiyte' }}>
            <NavBar backHidden={false}
                backAction={() => props.navigation.goBack()} title={NavTitle} />

            <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
                <ScrollView style={{ width: '100%', }} contentContainerStyle={{ alignItems: 'center' }}>


                    {/* <DataComp /> */}

                    {showAndroidData ?

                        <>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: Constant.MontserratSemiBold, marginBottom: 5 }}>For Android and iOS</Text>
                                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { copyToClipboard(JSON.stringify(dataArrAndroidiOS.current)) }}>
                                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/copy.png')}></Image>
                                </TouchableOpacity>
                            </View>


                            {
                                dataArrAndroidiOS.current.map((item, index) => {

                                    return (<>

                                        <DataComp index={String(index + 1)} key={String(index)} title={item.title} value={item.val} />
                                    </>
                                    )
                                })

                            }

                            {Platform.OS == 'android' ? <>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>

                                    <Text style={{ fontFamily: Constant.MontserratSemiBold, marginBottom: 5, }}>Only For Android</Text>
                                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { copyToClipboard(JSON.stringify(dataArrAndroid.current)) }}>
                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/copy.png')}></Image>
                                    </TouchableOpacity></View>

                                {
                                    dataArrAndroid.current.map((item, index) => {

                                        return (<>

                                            <DataComp index={String(index + 1)} key={String(index)} title={item.title} value={item.val} />
                                        </>
                                        )
                                    })

                                }

                            </>

                                :

                                <>

                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>

                                        <Text style={{ fontFamily: Constant.MontserratSemiBold, marginBottom: 5 }}>Only For iOS</Text>
                                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { copyToClipboard(JSON.stringify(dataArriOS.current)) }}>
                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/copy.png')}></Image>
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        dataArriOS.current.map((item, index) => {

                                            return (<>

                                                <DataComp index={String(index + 1)} key={String(index)} title={item.title} value={item.val} />
                                            </>
                                            )
                                        })

                                    }

                                </>}





                        </>

                        :

                        <></>

                    }

                </ScrollView>
            </View>
        </View>
    )


    async function forAndroid() {


        // Android: 38c26a0bebda7fc2
        pushToDataArrAndroid("getAndroidId(): ", await DeviceInfo.getAndroidId())

        // Android: 29
        pushToDataArrAndroid("getApiLevel(): ", await DeviceInfo.getApiLevel())

        // Android: *Empty string...
        pushToDataArrAndroid("getBaseOs(): ", await DeviceInfo.getBaseOs())

        // Android: b4s4-0.2-6355063
        pushToDataArrAndroid("getBootloader(): ", await DeviceInfo.getBootloader())

        // Android: true
        pushToDataArrAndroid("isCameraPresent(): ", await DeviceInfo.isCameraPresent())

        // Android: REL
        pushToDataArrAndroid("getCodename(): ", await DeviceInfo.getCodename())

        // Android: sargo
        pushToDataArrAndroid("getDevice(): ", await DeviceInfo.getDevice())

        // Android: QQ3A.200605.002
        pushToDataArrAndroid("getDisplay(): ", await DeviceInfo.getDisplay())

        // Android: 1594950417038
        pushToDataArrAndroid("getFirstInstallTime(): ", await DeviceInfo.getFirstInstallTime())

        // Android: google/sargo/sargo:10/QQ3A.200605.002/6416773:user/release-keys
        pushToDataArrAndroid("getFingerprint(): ", await DeviceInfo.getFingerprint())

        // Android: sargo
        pushToDataArrAndroid("getHardware(): ", await DeviceInfo.getHardware())

        // Android: abfarm-00906
        pushToDataArrAndroid("getHost(): ", await DeviceInfo.getHost())

        // Android: 6416773
        pushToDataArrAndroid("getIncremental(): ", await DeviceInfo.getIncremental())

        // Android: unknown
        pushToDataArrAndroid("getInstallerPackageName(): ", await DeviceInfo.getInstallerPackageName())

        // Android: utm_source=google-play&utm_medium=organic
        pushToDataArrAndroid("getInstallReferrer(): ", await DeviceInfo.getInstallReferrer())

        // Android: dBkzW2cCRMirU1oSLf6iym
        pushToDataArrAndroid("getInstanceId(): ", await DeviceInfo.getInstanceId())

        // Android: 1594953973652
        pushToDataArrAndroid("getLastUpdateTime(): ", await DeviceInfo.getLastUpdateTime())

        // Android: 201326592
        pushToDataArrAndroid("getMaxMemory(): ", await DeviceInfo.getMaxMemory())

        // Android: unknown *(Since no SIM card)
        pushToDataArrAndroid("getPhoneNumber(): ", await DeviceInfo.getPhoneNumber())

        // Android: sargo
        pushToDataArrAndroid("getProduct(): ", await DeviceInfo.getProduct())

        // Android: 0
        pushToDataArrAndroid("getPreviewSdkInt(): ", await DeviceInfo.getPreviewSdkInt())

        // Android: unknown
        pushToDataArrAndroid("getSerialNumber(): ", await DeviceInfo.getSerialNumber())

        // Android: 2020-06-05
        pushToDataArrAndroid("getSecurityPatch(): ", await DeviceInfo.getSecurityPatch())


        pushToDataArrAndroid("getSystemAvailableFeatures(): ", await DeviceInfo.getSystemAvailableFeatures())

        // Android: release-keys
        pushToDataArrAndroid("getTags(): ", await DeviceInfo.getTags())

        // Android: user
        pushToDataArrAndroid("getType(): ", await DeviceInfo.getType())

        // Android: false
        pushToDataArrAndroid("hasSystemFeature(): ", await DeviceInfo.hasSystemFeature())

        // Android: false
        pushToDataArrAndroid("isAirplaneMode(): ", await DeviceInfo.isAirplaneMode())

        // Android: (2) ["armeabi-v7a", "armeabi"]
        pushToDataArrAndroid("supported32BitAbis(): ", await DeviceInfo.supported32BitAbis())

        // Android: ["arm64-v8a"]
        pushToDataArrAndroid("supported64BitAbis(): ", await DeviceInfo.supported64BitAbis())

    }

    async function foriOS() {
        // iOS: AgAAACIGFMN4MeDfCjHM0n9...
        pushToDataArriOS("getDeviceToken(): ", await DeviceInfo.getDeviceToken())

        // iOS: 27E91FEC-XXXX-XXXX-XXXX-XXXXXXXXXXXX
        pushToDataArriOS("syncUniqueId(): ", await DeviceInfo.syncUniqueId())
    }

    async function forAndroidAndiOS() {

        // Android: c26a0bebda7fc2
        // iOS: 27E91FEC-A27D-4138-B584-55195270446D
        pushToDataArrAndroidiOS("getUniqueId(): ", await DeviceInfo.getUniqueId())


        // Android: 192.168.1.101
        // iOS: 192.168.1.101
        pushToDataArrAndroidiOS("getIpAddress(): ", await DeviceInfo.getIpAddress())

        // Android: CE:31:93:AA:AA:1B
        // iOS: 02:00:00:00:00:00
        pushToDataArrAndroidiOS("getMacAddress(): ", await DeviceInfo.getMacAddress())

        // Android: Google
        // iOS: Apple
        pushToDataArrAndroidiOS("getManufacturer(): ", await DeviceInfo.getManufacturer())

        // Android: Pixel 3a
        // iOS: iPhone XS
        pushToDataArrAndroidiOS("getModel(): ", await DeviceInfo.getModel())

        // Android: Example app
        // iOS: Example app
        pushToDataArrAndroidiOS("getApplicationName(): ", await DeviceInfo.getApplicationName())

        // Android: {}
        /*
        iOS: {
           significantLocationChangeMonitoringAvailable: true, 
           isRangingAvailable: true, 
           locationServicesEnabled: true, 
           headingAvailable: true
        }
        */
        pushToDataArrAndroidiOS("getAvailableLocationProviders(): ", await DeviceInfo.getAvailableLocationProviders())

        // Android: QQ3A.200605.002
        // iOS: 17F80
        pushToDataArrAndroidiOS("getBuildId(): ", await DeviceInfo.getBuildId())

        // Android: 1
        // iOS: 1
        pushToDataArrAndroidiOS("getBatteryLevel(): ", await DeviceInfo.getBatteryLevel())

        // Android: google
        // iOS: Apple
        pushToDataArrAndroidiOS("getBrand(): ", await DeviceInfo.getBrand())

        // Android: 1
        // iOS: 1
        pushToDataArrAndroidiOS("getBuildNumber(): ", await DeviceInfo.getBuildNumber())

        // Android: com.example.app
        // iOS: com.example.app
        pushToDataArrAndroidiOS("getBundleId(): ", await DeviceInfo.getBundleId())

        // Android: *Empty string when no SIM card
        // iOS: 1O1O / csl
        pushToDataArrAndroidiOS("getCarrier(): ", await DeviceInfo.getCarrier())

        // Android: sargo
        // iOS: iPhone11,2
        pushToDataArrAndroidiOS("getDeviceId(): ", await DeviceInfo.getDeviceId())

        // Android: Handset
        // iOS: Handset
        pushToDataArrAndroidiOS("getDeviceType(): ", await DeviceInfo.getDeviceType())

        // Android: Pixel 3a
        // iOS: Testing Device
        pushToDataArrAndroidiOS("getDeviceName(): ", await DeviceInfo.getDeviceName())

        // Android: 1
        // iOS: 1.1200000047683716
        pushToDataArrAndroidiOS("getFontScale(): ", await DeviceInfo.getFontScale())

        // Android: 42753028096
        // iOS: 413816471552
        pushToDataArrAndroidiOS("getFreeDiskStorage(): ", await DeviceInfo.getFreeDiskStorage())


        /*
        Android: {
          lowPowerMode: false, 
          batteryLevel: 1, 
          batteryState: "full"
        }
        */
        /*
        iOS: {
          batteryState: "charging", 
          batteryLevel: 1, 
          lowPowerMode: false
        }
        */
        pushToDataArrAndroidiOS("getPowerState(): ", await DeviceInfo.getPowerState())

        // Android: 1.0.1
        // iOS: 1.0.1
        pushToDataArrAndroidiOS("getReadableVersion(): ", await DeviceInfo.getReadableVersion())

        // Android: Android
        // iOS: iOS
        pushToDataArrAndroidiOS("getSystemName(): ", await DeviceInfo.getSystemName())

        // Android: 10
        // iOS: 13.5.1
        pushToDataArrAndroidiOS("getSystemVersion(): ", await DeviceInfo.getSystemVersion())

        // Android: 816848896
        // iOS: 511937040384
        pushToDataArrAndroidiOS("getTotalDiskCapacity(): ", await DeviceInfo.getTotalDiskCapacity())

        // Android: 3768160256
        // iOS: 3953475584
        pushToDataArrAndroidiOS("getTotalMemory(): ", await DeviceInfo.getTotalMemory())



        // Android: 10127336
        // iOS: 80871424
        pushToDataArrAndroidiOS("getUsedMemory(): ", await DeviceInfo.getUsedMemory())

        // Android: Mozilla/5.0 (Linux; Android 10; Pixel 3a Build/QQ3A.200605.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36
        // iOS: Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148
        pushToDataArrAndroidiOS("getUserAgent(): ", await DeviceInfo.getUserAgent())

        // Android: 1.0
        // iOS: 1.0
        pushToDataArrAndroidiOS("getVersion(): ", await DeviceInfo.getVersion())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("hasNotch(): ", await DeviceInfo.hasNotch())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isBatteryCharging(): ", await DeviceInfo.isBatteryCharging())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isEmulator(): ", await DeviceInfo.isEmulator())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isLandscape(): ", await DeviceInfo.isLandscape())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isLocationEnabled(): ", await DeviceInfo.isLocationEnabled())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isHeadphonesConnected(): ", await DeviceInfo.isHeadphonesConnected())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isPinOrFingerprintSet(): ", await DeviceInfo.isPinOrFingerprintSet())

        // Android: false
        // iOS: true
        pushToDataArrAndroidiOS("isTablet(): ", await DeviceInfo.isTablet())

        // Android: (3) ["arm64-v8a", "armeabi-v7a", "armeabi"]
        // iOS: ["ARM64E"]
        pushToDataArrAndroidiOS("supportedAbis(): ", await DeviceInfo.supportedAbis())
    }

}