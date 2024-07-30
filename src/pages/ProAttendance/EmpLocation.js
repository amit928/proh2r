import React, { Component, useEffect, useRef } from 'react';
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity,
    Alert,
    Modal,
    Animated,
    RefreshControl,
    Platform,
    Linking,
    Map,
    TextInput,
    ImageBackground,
    BackHandler,
    Vibration, AppState
} from 'react-native';
//custom components
import Nav from '../../components/NavBar';
import Loader from '../../components/Loader';

//global
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';

//third parties
import Moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import AndroidOpenSettings from 'react-native-android-open-settings';
import RNLocation from 'react-native-location';
import Toast, { DURATION } from 'react-native-easy-toast';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import EventBus from 'react-native-event-bus';
import TouchID from 'react-native-touch-id';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';

// const Geolocation = Platform.OS == 'ios' ? require('@react-native-community/geolocation') : require('react-native-geolocation-service')

const { height, width } = Dimensions.get('window');

export default function EmpLocation(props) {


    const usedColors = useRef([])



    function goBack() {
        props.navigation.goBack()
    }

    console.log('EmpLocation', props.route.params);

    const { initialRegionData, locationRestrictionsList, punchDetailsVOList } = props.route.params


    const first = {
        latitude: 28.6020976,
        longitude: 77.354116,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const second = {
        latitude: 28.6037056,
        longitude: 77.3536654,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const third = {
        latitude: 28.6030705,
        longitude: 77.3539297,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        if (usedColors.current.includes(color)) {
            // Color already used, generate a new one
            return getRandomColor();
        } else {
            // Color is unique, add it to usedColors.current array and return it
            usedColors.current.push(color);
            return color;
        }
    }


    useEffect(() => {




    }, [])


    return (
        <>
            <Nav title={'Location'} backAction={goBack} />
            <View style={{ flex: 1 }}>

                {/* <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ height: '100%', width: '100%' }}
                    initialRegion={{
                        latitude: 28.602914,
                        longitude: 77.354093,
                        latitudeDelta: 0.00000002,
                        longitudeDelta: 0.0021,
                    }}> */}



                <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ height: '100%', width: '100%' }}
                    initialRegion={{
                        latitude: parseFloat(String(initialRegionData.latitudeLongitude).split(',')[0]),
                        
                        longitude: parseFloat(String(initialRegionData.latitudeLongitude).split(',')[1]),
                        latitudeDelta: 0.00000002,
                        longitudeDelta: 0.0021,
                    }}>


                    
                    {locationRestrictionsList.map((location, index) => {

                        return <React.Fragment key={String(location.locationRestrictionsId)}>
                            <Circle center={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }} radius={location.radius} fillColor={'rgba(20,60,100,0.4)'} strokeColor={'rgba(20,60,100,0.4)'} strokeWidth={2} />


                            <Marker key={String(location.locationRestrictionsId)} coordinate={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }} title={location.locationName} description=""

                            >
                                <Image
                                    source={require('../../images/organizationMarker.png')}
                                    style={{ width: 70, height: 70, resizeMode: 'contain' }}
                                />
                            </Marker>


                        </React.Fragment>
                    })}

                    {
                        punchDetailsVOList.map((punchData, index) => {

                            const { latitudeLongitude, punchTime, markAttendanceType, punchLocationAddress } = punchData

                            return <Marker key={String(punchData.markAttendanceId)} coordinate={{ latitude: parseFloat(String(latitudeLongitude).split(',')[0]), longitude: parseFloat(String(latitudeLongitude).split(',')[1]) }} title={`${markAttendanceType} - ${String(punchTime).split('.')[0]}`} description={punchLocationAddress == null ? "" : String(punchLocationAddress)}><Image
                                source={require('../../images/currentMarker.png')}
                                style={{
                                    width: 70, height: 70, resizeMode: 'contain',
                                    tintColor: getRandomColor()
                                }}
                            /></Marker>

                        })
                    }

                </MapView>
            </View>
        </>
    )
}