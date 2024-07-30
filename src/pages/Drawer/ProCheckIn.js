//react components
import React, { Component } from 'react';
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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import EventBus from 'react-native-event-bus';
import TouchID from 'react-native-touch-id';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Geolocation from 'react-native-geolocation-service';



// import Geolocation from '@react-native-community/geolocation';

// const Geolocation = Platform.OS == 'ios' ? require('@react-native-community/geolocation') : require('react-native-geolocation-service')



const { height, width } = Dimensions.get('window');

const Triangle = ({ width, height, color }) => {
  return (
    <View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: width / 2,
        borderRightWidth: width / 2,
        borderBottomWidth: height,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
        transform: [{ rotate: '180deg' }],
        top: 20
      }}
    />
  );
};

// const NileTenentID = "19"
// const SirSyedTenentID = "39"



const optionalConfigObjects = {
  fallbackLabel: '',
  passcodeFallback: false,
  cancelText: 'Login with ProH2R Password',
};
export default class ProCheckIn extends React.Component {
  intervalID = 0;
  intervalIDCheckIn = 1;

  constructor(props) {
    super(props);
    this.state = {
      checkInTime: '00:00:00',
      checkOutTime: '00:00:00',
      workHours: '00:00:00',
      currentTime: '',
      authDict: {},
      ipAddress: '',
      loading: false,
      markers: [],
      region: {},
      identifierArr: [],
      forceRefresh: 500,
      biometryType: '',
      // swipeablePanelActive: this.props.OpenPanel,
      lats: '',
      long: '',
      showProH2RPasswordPopUp: false,
      proH2RPassword: '',
      password: '',
      backPress: false,
      checkInPress: '0',
      freezeBtnStatus: false,
      currAddress: '',
      appState: AppState.currentState,
      authDict: {},
      isNotPermissionToCheck: false,
      isFacialFingerPrintEnabled: false,
      isLocationCaptureEnabled: false,
      locationApiVendorId: null,
      locationApiVendorName: null,
      locationApiKey: null,
      coords: {}

    };
    this.watchId = null;
  }



  _handleAppStateChange = (nextAppState) => {

    console.log('_handleAppStateChange', nextAppState);
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.setState({ authDict: this.state.authDict, proH2RPassword: this.state.authDict.password });
      this.getFreezeStatus();
      this.getCheckInDetail();
      this.getUserLatLong();
    }
    this.setState({ appState: nextAppState });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    // console.warn('i am here in procheck in');
    this.props.openPanel();

    TouchID.isSupported(optionalConfigObjects).then(biometryType => {
      this.setState({ biometryType: biometryType });
    });

    NetInfo.fetch().then(netInfo => {
      this.setState({ ipAddress: netInfo.details.ipAddress });
    });
    this.intervalID = setInterval(() => {
      var formattedDateInFormet = Moment(new Date()).format(
        'MMM DD,YYYY HH:mm:ss',
      );
      var formattedDateInHoursFormet = Moment(new Date()).format('HH:mm:ss');
      if (this.state.checkInTime != '00:00:00') {
        let workHours = Moment.utc(
          Moment(formattedDateInHoursFormet, 'HH:mm:ss').diff(
            Moment(this.state.checkInTime, 'HH:mm:ss'),
          ),
        ).format('HH:mm:ss');
        this.setState({ workHours: workHours });
      }

      this.setState({ currentTime: String(formattedDateInFormet) });
    }, 1000);

    this.props.refreshCheckIn;

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value, proH2RPassword: value.password });
        this.getFreezeStatus();
        this.getLocationBiometricDetails(value)
        this.getCheckInDetail();
        this.getUserLatLong();
        this.setState({ authDict: value })
        console.log('authDictsss', value);
      }
    });

    /*
        this.intervalIDCheckIn = setInterval(() => {
    
          console.log('geocalling');
    
          Geolocation.getCurrentPosition(
            position => {
              let lats = position.coords.latitude;
              let longs = position.coords.longitude;
              let dict = {
                coordinate: {
                  latitude: lats,
                  longitude: longs,
                },
                latitude: lats,
                longitude: longs,
                title: 'Your Location',
                description: '',
                pinColor: 'green',
                self: true,
                radius: 0,
                identifier: '80',
              };
    
              // let perArr = []
    
              this.state.markers.map((item, index) => {
                if (item.self) {
                  this.state.markers[index] = dict;
                }
              });
    
              // for(let i=0;i<this.state.markers.length;i++){
              //   let obj = this.state.markers[i]
              //   if(obj.self){
              //     obj = dict
              //   }
              //   perArr.push(obj)
              // }
              // this.setState({markers:perArr})
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { 
              // enableHighAccuracy: true,
               timeout: 15000, maximumAge: 10000, accuracy: Platform.OS == 'android' ? "high" : "bestForNavigation" },
          );
        }, 3000);
    
        */

    this.watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // this.setState({ location: { latitude, longitude } });
        console.log(position.coords);
        let lats = position.coords.latitude;
        let longs = position.coords.longitude;
        let dict = {
          coordinate: {
            latitude: lats,
            longitude: longs,
          },
          latitude: lats,
          longitude: longs,
          title: 'Your Location',
          description: '',
          pinColor: 'green',
          self: true,
          radius: 0,
          identifier: '80',
        };

        // let perArr = []

        this.state.markers.map((item, index) => {
          if (item.self) {
            this.state.markers[index] = dict;
            this.setState({ coords: position.coords })
          }
        });

        // for(let i=0;i<this.state.markers.length;i++){
        //   let obj = this.state.markers[i]
        //   if(obj.self){
        //     obj = dict
        //   }
        //   perArr.push(obj)
        // }
        // this.setState({markers:perArr})
      },
      error => {
        console.error(error);
        Alert.alert(JSON.stringify(error))
      },
      {
        // enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 5,
      }
    );

  }

  checkRSPLURL() {
    console.log("checkRSPLURL", this.state.authDict);
    if (this.state.authDict["tanentId"] == "43")
      return Constant.BASE_URL +
        Constant.ATTENDANCE_RECORD +
        'getMarkAttendanceForRspl/' +
        this.state.authDict.employeeCode

    else
      return Constant.BASE_URL +
        Constant.ATTENDANCE_RECORD +
        'getMarkAttendance/' +
        this.state.authDict.employeeCode



  }

  // openPanel = () => {
  //   this.setState({swipeablePanelActive: true});
  // };

  // closePanel = () => {
  //   this.setState({swipeablePanelActive: false});
  // };

  componentWillUnmount() {

    // Clear the watch position when the component unmounts
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
    }

    AppState.removeEventListener('change', this._handleAppStateChange);
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    clearInterval(this.intervalID);
    // clearInterval(this.intervalIDCheckIn);
    EventBus.getInstance().removeListener(this.listener);
  }


  // onBackButtonPressed() {
  //   return true;
  // }

  getRevGeoAddressAPI(lat, long) {

    if (this.state.locationApiVendorId == '100') {

      let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`

      this.getAddressFromCords(lat, long, url)

    }

    else if (this.state.locationApiVendorId == '200') {

      // let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCau1s9ivjPBTaX8ubFlWMJDAfqnc-PqzE`
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${this.state.locationApiKey}`

      this.getAddressFromCords(lat, long, url)

    }



  }

  setAddressBasedOnAPIVendor(responseJson, lat, long) {

    if (this.state.locationApiVendorId == '100') {

      // openstreetmap
      this.setState({ currAddress: responseJson.display_name })
      this.checkIn(
        lat,
        long,
        this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
        true, responseJson.display_name
      );
      // openstreetmap

    } else if (this.state.locationApiVendorId == '200') {

      //Google----

      if (responseJson?.results?.length == 0) {

        this.setState({ currAddress: 'Cannot Find Addres !' })
        this.checkIn(
          lat,
          long,
          this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
          true, 'Cannot Find Addres !'
        );

      }

      else if (responseJson?.results?.length == 1) {
        console.log('address', responseJson.results[0].formatted_address);
        this.setState({ currAddress: String(responseJson?.results[0]?.formatted_address) })

        this.checkIn(
          lat,
          long,
          this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
          true, String(responseJson?.results[0]?.formatted_address)
        );
      }

      else {
        console.log('address', responseJson.results[1].formatted_address);
        this.setState({ currAddress: String(responseJson?.results[0]?.formatted_address) })

        this.checkIn(
          lat,
          long,
          this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
          true, String(responseJson?.results[0]?.formatted_address)
        );
      }

      //----Google

    }

    else {
      this.checkIn(
        lat,
        long,
        this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT'
      );
    }


  }

  async getAddressFromCords(lat, long, url) {

    console.log('lat: ', lat, ', long: ', long);

    // var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`

    // var url = `http://api.positionstack.com/v1/reverse?access_key=e126efa16a9fc819461298d2bf8503e5&query=${lat},${long}`

    // var url = `https://apis.mapmyindia.com/advancedmaps/v1/1f58023e7f62ee99662a849fc9a0eebe/rev_geocode?&lng=${long}&lat=${lat}&region=ind`

    // let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCau1s9ivjPBTaX8ubFlWMJDAfqnc-PqzE`

    console.log(url)


    try {
      let response = await fetch(url, {
        method: 'GET',
      }
      )

      console.log("Response", response)

      let code = await response.status
      //setisLoading(false)

      if (code == 200) {

        let responseJson = await response.json();

        console.log('responseJson', responseJson);


        this.setAddressBasedOnAPIVendor(responseJson, lat, long)


        //Google----

        // if (responseJson?.results?.length == 0) {

        //   this.setState({ currAddress: '' })

        // }

        // else if (responseJson?.results?.length == 1) {
        //   console.log('address', responseJson.results[0].formatted_address);
        //   this.setState({ currAddress: String(responseJson?.results[0]?.formatted_address) })
        // }

        // else {
        //   console.log('address', responseJson.results[1].formatted_address);
        //   this.setState({ currAddress: String(responseJson?.results[1]?.formatted_address) })
        // }

        //----Google


        // openstreetmap
        // this.setState({ currAddress: responseJson.display_name })
        // openstreetmap

        // this.setState({ currAddress: responseJson.data[0].label })


        // this.setState({ currAddress: responseJson.results[0].formatted_address })
      }

      else if (code == 503) {

        Alert.alert('Location Vender Server Under Maintenance !')

        this.checkIn(
          lat,
          long,
          this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
          true, "Address not captured !"
        );

        Alert.alert('Server Under Maintenance !')
        Vibration.vibrate()

      }

      else {

        Alert.alert('Address not captured !')

        this.checkIn(
          lat,
          long,
          this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
          true, "Address not captured !"
        );

        Alert.alert(code)

        Alert.alert(code)

      }
    } catch (error) {
      console.error(error);
      Alert.alert('Something Went Wrong !')
    }


  }

  checkGpsConnectivity() {

    if (this.props.lat == 0.0000) {
      this.checkIn(
        0.0000,
        0.0000,
        this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
        true, "Can't Connect To GPS. Address not captured !"
      );

      return
    }


    this.setState({ loading: true });
    RNLocation.getCurrentPermission().then(currentPermission => {
      if (
        currentPermission != 'denied' &&
        currentPermission != 'restircted' &&
        currentPermission != 'notDetermined'
      ) {
        // const pos = Geolocation.getCurrentPosition(
        Geolocation.getCurrentPosition(
          position => {

            console.log('lat, long', position);

            if (Object.keys(position).length > 0) {
              let lats = position.coords.latitude;
              let longs = position.coords.longitude;
              // this.setState({ loading: false });

              if (this.state.isLocationCaptureEnabled) {
                this.getRevGeoAddressAPI(position.coords.latitude, position.coords.longitude)
              }

              else {
                this.checkIn(
                  lats,
                  longs,
                  this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
                );
              }

              // this.getAddressFromCords(position.coords.latitude, position.coords.longitude)

              // this.getRevGeoAddressAPI(position.coords.latitude, position.coords.longitude)

            } else {
              this.setState({ loading: false });
            }
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            // enableHighAccuracy: true, 
            timeout: 15000, maximumAge: 10000, accuracy: Platform.OS == 'android' ? "high" : "bestForNavigation"
          },
        );
        // Geolocation.getCurrentPosition(
        //   position => {
        //     console.log('loaction ---------->', position);
        //     let lats = position.coords.latitude;
        //     let longs = position.coords.longitude;

        //     this.setState({loading: false});
        //     this.checkIn(
        //       lats,
        //       longs,
        //       this.state.checkInPress == '0' ? 'CHECKIN' : 'CHECKOUT',
        //     );
        //   },
        //   error => {
        //     // See error code charts below.
        //     this.setState({loading: false});
        //     console.log('got the error', error);
        //     console.log(error.code, error.message);
        //   },
        //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
        // );
      } else {
        this.setState({ loading: false });

        Alert.alert(
          'Failed',
          'Please enable your location from settings for Check In / Check Out feature.',
          [
            {
              text: 'OK',
              onPress: () => {
                Platform.OS === 'android'
                  ? AndroidOpenSettings.locationSourceSettings()
                  : Linking.openURL('app-settings:');
              },
            },
          ],
          { cancelable: false },
        );
      }
    });
  }

  toRadian(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  //API Handler
  async checkIn(lat, long, type, isLocationEnabled = false, locAddress = '') {
    var url = Constant.BASE_URL + Constant.ATTENDANCE_RECORD;
    this.setState({ loading: true });
    let params;

    if (isLocationEnabled) {
      params = {
        deviceType: 'MOBILE',
        duration: '00:00',
        empCode: this.state.authDict.employeeCode,
        ipAddress: this.state.ipAddress,
        logId: 0,
        latitude: String(lat),
        longitude: String(long),
        markAttendanceType: type,
        accuracy: '',
        locationApiVendorId: this.state.locationApiVendorId,
        punchVendorName: this.state.locationApiVendorName,
        punchAddress: locAddress
      };
    }
    else {
      params = {
        deviceType: 'MOBILE',
        duration: '00:00',
        empCode: this.state.authDict.employeeCode,
        ipAddress: this.state.ipAddress,
        logId: 0,
        latitude: String(lat),
        longitude: String(long),
        markAttendanceType: type,
        accuracy: '',
        locationApiVendorId: null,
        punchVendorName: null,
        punchAddress: ""
      };
    }


    console.warn('params', params);
    // {
    //   "duration": "00:00",
    //   "accuracy": "",
    //   "deviceType": "WEBCHECKIN",
    //   "empCode": "1149",
    //   "ipAddress": "",
    //   "latitude": "",
    //   "logId": 0,
    //   "markAttendanceType": "CHECKOUT/CHECKIN",
    //   "longitude": ""
    // }

    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: JSON.stringify(params),
      });
      let code = await response.status;
      console.warn('response', response);
      this.setState({ loading: false });

      console.log('checkIn code', code);

      if (code == 201 || code == 200) {
        let responseJson = await response.json();
        // console.log(responseJson)
        Alert.alert('Success', responseJson.message);
        this.getCheckInDetail();
        this.getFreezeStatus();
      } else if (code == 400) {
        let responseJson = await response.json();
        console.log("responseJson 400", responseJson);
        Alert.alert(responseJson.message);
        // this.refs.toast.show(responseJson.message);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else if (code == 500) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        //  this.refs.toast.show(responseJson.message);
      } else {
        Alert.alert('', 'Something went wrong!');
        Vibration.vibrate()
        // this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  render() {
    const { navigation, title } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Nav title={title} backHidden={true} />

          {this.state.currAddress == '' ?
            <></>
            :

            // <View style={{backgroundColor: 'red', width: '100%', padding: 20}}>
            <View
              style={{
                // borderRadius: 21,
                backgroundColor: 'white',
                justifyContent: 'center',
                width: width - 20,
                // height: 120,
                alignItems: 'center',
                marginTop: 10,
                // bottom: 17
                position: 'absolute',
                zIndex: 2,
                top: 80,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: '#d9d9d9',

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,

                // marginLeft: 20
              }}>

              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 12,
                  fontFamily: Constant.MontserratMedium,
                  // marginTop: 16,
                  // marginLeft: 15,
                  // marginRight: 15
                  padding: 15,



                }}>
                {this.state.currAddress}

              </Text>

            </View>
            // </View>

          }

          {this.props.lats == 0.0000 ?
            <View
              style={{
                // borderRadius: 21,
                backgroundColor: 'white',
                justifyContent: 'center',
                width: width - 20,
                // height: 120,
                alignItems: 'center',
                marginTop: 10,
                // bottom: 17
                position: 'absolute',
                zIndex: 2,
                top: 80,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: '#d9d9d9',

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,

                // marginLeft: 20
              }}>

              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 12,
                  fontFamily: Constant.MontserratMedium,

                  padding: 15,



                }}>
                {"Can't Connect To GPS !"}

              </Text>

            </View>
            :


            <></>


          }

          <View
            style={{ height: '100%', width: '100%' }}>


            <MapView
              // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{ height: '100%', width: '100%' }}
              initialRegion={{
                latitude: this.props.lat,
                longitude: this.props.long,
                latitudeDelta: 0.00000002,
                longitudeDelta: 0.0021,
              }}>
              {this.state.markers.map((marker, index) => {
                return (
                  <>
                    <MapView.Marker
                      key={String(index)}
                      coordinate={marker.coordinate}
                      pinColor={marker.pinColor}
                      title={marker.title}
                      identifier={marker.identifier}>
                      {

                        // this.state.currAddress == '' ?

                        <>

                          {marker.self ? (
                            <>
                              <ImageBackground
                                source={require('../../images/currentMarker.png')}
                                imageStyle={{ resizeMode: 'contain' }}
                                style={{ width: 70, height: 70, alignItems: 'center' }}>
                                <View
                                  style={{
                                    borderRadius: 21,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    width: 42,
                                    height: 42,
                                    alignItems: 'center',
                                    marginTop: 5,
                                  }}>
                                  <Image
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                    source={{ uri: this.props.profilePic }}></Image>
                                </View>
                              </ImageBackground>
                              {/* <View
                                style={{
                                  // borderRadius: 21,
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  width: 200,
                                  // height: 120,
                                  alignItems: 'center',
                                  marginTop: 10,
                                  // bottom: 17
                                  position: 'absolute',
                                  zIndex: 2,
                                  top: 80,
                                  alignSelf: 'center',
                                  borderRadius: 10,
                                  borderWidth: 0.5,
                                  borderColor: '#d9d9d9',

                                  shadowColor: "#000",
                                  shadowOffset: {
                                    width: 0,
                                    height: 7,
                                  },
                                  shadowOpacity: 0.41,
                                  shadowRadius: 9.11,

                                  elevation: 14,

                                  // marginLeft: 20
                                }}>

                                <Text
                                  allowFontScaling={false}
                                  style={{
                                    fontSize: 12,
                                    fontFamily: Constant.MontserratMedium,
                                    // marginTop: 16,
                                    // marginLeft: 15,
                                    // marginRight: 15
                                    padding: 15,



                                  }}>
                                  {this.state.currAddress}

                                  {'Hello My Name is Engineer, Software Engineer'}

                                </Text>
                                <Triangle width={30} height={30} color={'white'} />
                              </View> */}



                            </>
                          ) : (
                            <Image
                              source={require('../../images/organizationMarker.png')}
                              style={{ width: 70, height: 70, resizeMode: 'contain' }}
                            />
                          )}
                        </>
                        // : <ImageBackground
                        //   source={require('../../images/mapBubble.png')}
                        //   imageStyle={{ resizeMode: 'contain' }}
                        //   style={Platform.OS === 'android' ? {
                        //     width: 260, height: 260, alignItems: 'center', justifyContent: 'center',
                        //     top: 20
                        //   } : {
                        //     width: 260, height: 260, alignItems: 'center', justifyContent: 'center',
                        //     bottom: 54,
                        //   }}>
                        //   <View
                        //     style={{
                        //       // borderRadius: 21,
                        //       backgroundColor: 'transparent',
                        //       justifyContent: 'center',
                        //       width: 248,
                        //       height: 144,
                        //       alignItems: 'center',
                        //       // marginTop: 5,
                        //       bottom: 17
                        //     }}>

                        //     <Text
                        //       allowFontScaling={false}
                        //       style={{
                        //         fontSize: 12,
                        //         fontFamily: Constant.MontserratMedium,
                        //         // marginTop: 16,
                        //         // marginLeft: 15,
                        //         // marginRight: 15
                        //         padding: 7,


                        //       }}>
                        //       {this.state.currAddress}

                        //     </Text>

                        //   </View>
                        // </ImageBackground>
                      }
                    </MapView.Marker>
                  </>
                );
              })}
              {this.state.markers.length != 0 ? (
                this.state.markers.map((markers, index) => {
                  return (
                    <MapView.Circle
                      key={String(index)}
                      center={{
                        latitude: markers.latitude,
                        longitude: markers.longitude,
                      }}
                      radius={markers.radius}
                      strokeColor="rgba(20,60,100,0.4)"
                      fillColor="rgba(20,60,100,0.4)"
                    />
                  );
                })
              ) : (
                <></>
              )}
            </MapView>
          </View>
          <View>
            <SwipeablePanel
              fullWidth={false}
              openLarge={false}
              isActive={this.props.swipeablePanelActive}
              noBackgroundOpacity={true}
              onClose={this.props.closePanel}
              onPressCloseButton={this.props.closePanel}
            // onlySmall={true}
            // smallPanelHeight={450}

            >
              <View style={{
                alignItems: 'center', justifyContent: 'center',
                // padding: 10 he
              }}>
                {/* <Image
                style={{
                  height: 80,
                  width: 80,
                  resizeMode: 'contain',
                  marginTop: 30,
                }}
                source={require('../../images/movingClock.png')}></Image> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 75,
                  }}>
                  <TouchableOpacity
                    style={
                      !this.state.freezeBtnStatus
                        ? {
                          height: 80,
                          width: '42%',
                          backgroundColor: 'rgba(34,199,159,1.0)',
                          marginLeft: 20,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: '#f1f1f1',
                          shadowColor: 'gray',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 3,
                          // shadowOffset: { width: 0, height: 3 },
                          // elevation:13,shadowColor: 'gray',
                          // shadowOpacity: 3.0,

                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                        : {
                          height: 80,
                          width: '42%',
                          backgroundColor: 'white',
                          marginLeft: 20,
                          borderRadius: 12,

                          borderWidth: 1,
                          borderColor: '#f1f1f1',
                          shadowColor: 'gray',
                          shadowOffset: {
                            width: 2,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 3,

                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                    }
                    onPress={() => {

                      if (this.state.isNotPermissionToCheck) {
                        Alert.alert('Location is Not Assigned In Attendance Template !');
                        return
                      }

                      !this.state.freezeBtnStatus
                        ? (this.setState({ checkInPress: '0' }),
                          this.state.isFacialFingerPrintEnabled ? this.authenticateTouchId() : this.checkGpsConnectivity()
                          //  this.checkGpsConnectivity()
                          // this.authenticateTouchId()
                        )
                        : Alert.alert('You already checked in.')

                    }
                    }>
                    <Text
                      allowFontScaling={false}
                      style={
                        !this.state.freezeBtnStatus
                          ? {
                            fontSize: 17,
                            fontFamily: Constant.MontserratMedium,
                            color: 'white',
                            padding: 3,
                          }
                          : {
                            fontSize: 17,
                            fontFamily: Constant.MontserratMedium,
                            color: 'gray',
                            padding: 3,
                          }
                      }>
                      CHECK IN
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={
                        this.state.checkInTime == '00:00:00'
                          ? {
                            fontSize: 14,
                            fontFamily: Constant.MontserratSemiBold,
                            color: 'white',
                            padding: 3,
                          }
                          : {
                            fontSize: 14,
                            fontFamily: Constant.MontserratSemiBold,
                            color: 'gray',
                            padding: 3,
                          }
                      }>
                      {this.state.checkInTime}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      !this.state.freezeBtnStatus
                        ? {
                          height: 80,
                          width: '42%',
                          backgroundColor: 'white',
                          marginRight: 20,
                          borderRadius: 12,
                          elevation: 3,
                          shadowOffset: { width: 0, height: 3 },
                          shadowColor: 'gray',
                          shadowOpacity: 3.0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                        : {
                          height: 80,
                          width: '42%',
                          backgroundColor: '#e7564b',
                          marginRight: 20,
                          borderRadius: 12,
                          elevation: 3,
                          shadowOffset: { width: 0, height: 3 },
                          shadowColor: 'gray',
                          shadowOpacity: 3.0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                    }
                    onPress={() => {
                      if (this.state.isNotPermissionToCheck) {
                        Alert.alert('Location Is Not Assign In Attendance Template !');
                        return
                      }
                      this.state.freezeBtnStatus
                        ? ((this.setState({ checkInPress: '1' }),
                          this.state.isFacialFingerPrintEnabled ? this.authenticateTouchId() : this.checkGpsConnectivity()
                          //  this.checkGpsConnectivity()
                          // this.authenticateTouchId()
                        )
                        )
                        : Alert.alert('Please check in first.')
                    }
                    }>
                    <Text
                      allowFontScaling={false}
                      style={
                        !this.state.freezeBtnStatus
                          ? {
                            fontSize: 17,
                            fontFamily: Constant.MontserratMedium,
                            color: 'gray',
                            padding: 3,
                          }
                          : {
                            fontSize: 17,
                            fontFamily: Constant.MontserratMedium,
                            color: 'white',
                            padding: 3,
                          }
                      }>
                      CHECK OUT
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={
                        !this.state.freezeBtnStatus
                          ? {
                            fontSize: 14,
                            fontFamily: Constant.MontserratSemiBold,
                            color: 'gray',
                            padding: 3,
                          }
                          : {
                            fontSize: 14,
                            fontFamily: Constant.MontserratSemiBold,
                            color: 'white',
                            padding: 3,
                          }
                      }>
                      {this.state.checkOutTime}
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.state.currAddress == '' ? <></> :
                  <>
                    {/* <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 12,
                      fontFamily: Constant.MontserratMedium,
                      marginTop: 16,
                      marginLeft: 15,
                      marginRight: 15
                      // padding: 5
                    }}>
                    {this.state.currAddress}
                  </Text> */}
                  </>
                }
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 15,
                    fontFamily: Constant.MontserratMedium,
                    marginTop: 15,
                  }}>
                  {this.state.currentTime}
                </Text>
                <Text onPress={() => {
                  console.log(this.state.checkInTime);
                }}
                  allowFontScaling={false}
                  style={{
                    fontSize: 24,
                    fontFamily: Constant.MontserratSemiBold,
                    marginTop: 12,
                  }}>
                  {this.state.workHours + ' Hrs'}
                </Text>
              </View>


            </SwipeablePanel>
          </View>
          <Loader isLoader={this.state.loading}> </Loader>

          <Modal
            visible={this.state.showProH2RPasswordPopUp}
            transparent={true}
            onRequestClose={() => { }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,1.0)',
                  borderRadius: 10,
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 15,
                    fontFamily: Constant.MontserratBold,
                    marginTop: 16,
                    padding: 10,
                  }}>
                  Please Enter Your ProH2R Account Password
                </Text>

                <TextInput
                  allowFontScaling={false}
                  style={{
                    padding: 16,
                    fontSize: 13,
                    fontFamily: Constant.MontserratRegular,
                    width: '85%',
                    height: 50,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: 'gray',
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                  placeholder="ProH2R Account Password"
                  onChangeText={password => this.setState({ password: password })}
                  value={this.state.password}
                  secureTextEntry={true}
                  autoCorrect={false}
                  returnKeyType="done"
                  maxLength={60}></TextInput>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                    marginTop: 8,
                  }}>
                  <TouchableOpacity
                    style={{
                      margin: 10,
                      height: 40,
                      width: '43%',
                      backgroundColor: 'white',
                      borderColor: 'gray',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                      elevation: 3,
                    }}
                    onPress={() =>
                      this.setState({
                        showProH2RPasswordPopUp: false,
                        password: '',
                      })
                    }>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 14,
                        fontFamily: Constant.MontserratMedium,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      margin: 10,
                      height: 40,
                      width: '43%',
                      backgroundColor: 'rgba(57,83,144,1.0)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                      elevation: 3,
                    }}
                    onPress={() => this.authenticateWithPassword()}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 14,
                        fontFamily: Constant.MontserratMedium,
                        color: 'white',
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Toast ref="toast" />
        </View>
      </View>
    );
  }

  regionChange = region => {
    this.setState({ region: region });
  };

  async getCheckInDetail() {
    var restUrl = this.state.authDict.employeeCode + '/header';

    // var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA + restUrl
    var url = this.checkRSPLURL()
    // Constant.BASE_URL +
    // Constant.ATTENDANCE_RECORD +
    // 'getMarkAttendance/' +
    // this.state.authDict.employeeCode;
    this.setState({ loading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',

        headers: Constant.getHeader(this.state.authDict),
      });

      this.setState({ loading: false });

      let code = await response.status;
      console.log("getCheckInDetail url", url, code);
      if (code == 200) {
        let responseJson = await response.json();
        console.log("getCheckInDetail url", url);
        console.log('getCheckInDetail', responseJson)

        let checkIn = '00:00:00';
        let checkOut = '00:00:00';

        //New code by Aditya for checkInout integration

        let checkInArr = responseJson.filter(json => json.markAttendanceType == 'CHECKIN');
        let checkOutArr = responseJson.filter(json => json.markAttendanceType == 'CHECKOUT');

        if (checkInArr.length > 0) {
          checkIn = Moment(checkInArr[0].localTimeLog).format('HH:mm:ss');
        }

        if (checkOutArr.length > 0) {
          checkOut = Moment(checkOut[1].localTimeLog).format('HH:mm:ss');
        }

        this.setState({ checkInTime: checkIn, checkOutTime: checkOut });

        //old Legacy code for checkInout integration
        // if (responseJson.length == 0) {
        //   this.setState({ checkInTime: checkIn, checkOutTime: checkOut });
        // } else if (responseJson.length == 1) {
        //   checkIn = Moment(responseJson[0].localTimeLog).format('HH:mm:ss');

        //   this.setState({ checkInTime: checkIn, checkOutTime: checkOut });
        // } else if (responseJson.length == 2) {
        //   checkIn = Moment(responseJson[0].localTimeLog).format('HH:mm:ss');
        //   checkOut = Moment(responseJson[1].localTimeLog).format('HH:mm:ss');

        //   this.setState({ checkInTime: checkIn, checkOutTime: checkOut });
        // }





        this.props.refreshCheckIn();
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {

        console.log('getCheckInDetail Else', response);
        // console.log('response.json()',await response.text());



        // Alert.alert("Server Problem ! ", String(code))
        //  this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  async getFreezeStatus() {
    var restUrl = this.state.authDict.employeeCode + '/header';
    var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA + restUrl;

    this.setState({ loading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',

        headers: Constant.getHeader(this.state.authDict),
      });

      this.setState({ loading: false });

      let code = await response.status;
      if (code == 200) {
        let responseJson = await response.json();
        console.log("getFreezeStatus url", url);
        console.log('getFreezeStatus', responseJson)
        this.setState({ freezeBtnStatus: responseJson.freezeButtonStatus });
        this.props.refreshCheckIn();
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message, code);
        console.log('code', responseJson.message);
      } else if ('code == 400', code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.refs.toast.show('Something went wrongs!', code);
      }
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  async getUserLatLong() {
    var url =
      Constant.BASE_URL +
      Constant.GET_USERS_LOCATIONS +
      this.state.authDict.employeeCode;
    // console.log(url)
    this.setState({ loading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;

      if (code == 200) {
        // console.log(response)

        console.log(Constant.getHeader(this.state.authDict));

        console.warn(url);
        console.warn('getUserLatLong', response);

        // let responseText = await response.text();
        // console.log('responseText',responseText);

        let responseJson = await response.json();


        console.log('getEmployeeAllocatedLocations', responseJson);
        var arr = [];
        var identifierArr = [];

        Geolocation.getCurrentPosition(
          position => {
            let lats = position.coords.latitude;
            let longs = position.coords.longitude;
            let dict = {
              coordinate: {
                latitude: lats,
                longitude: longs,
              },
              latitude: lats,
              longitude: longs,
              title: 'Your Location',
              description: '',
              pinColor: 'green',
              self: true,
              radius: 0,
              identifier: '80',
            };
            this.setState({ loading: false });
            identifierArr.push(String(0));
            arr.push(dict);
          },
          error => {
            // See error code charts below.
            this.setState({ loading: false });

            // console.log(error.code, error.message);
          },
          {
            // enableHighAccuracy: true,
            timeout: 15000, maximumAge: 0, accuracy: Platform.OS == 'android' ? "high" : "bestForNavigation"
          },
        );

        for (let i = 0; i < responseJson.length; i++) {
          let dict = {
            latitude: parseFloat(responseJson[i].latitude),
            longitude: parseFloat(responseJson[i].longitude),
            coordinate: {
              latitude: parseFloat(responseJson[i].latitude),
              longitude: parseFloat(responseJson[i].longitude),
            },
            title: 'Your Work Location',
            description: '',
            pinColor: 'red',
            self: false,
            radius: responseJson[i].radius,
            identifier: String(i + 1),
          };
          identifierArr.push(String(i + 1));
          arr.push(dict);
        }
        this.setState({ markers: arr, identifierArr: identifierArr });
      } else if (code == 400) {
        this.setState({ loading: false });

        let responseJson = await response.json();
        Alert.alert(responseJson.message);

        //  this.refs.toast.show(responseJson.message);
      } else if (code == 401 || code == 503) {
        this.setState({ loading: false });

        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.setState({ loading: false });
        this.setState({ isNotPermissionToCheck: true })
        console.warn(url);
        console.warn("Location Is Not Assigned", response);
        Alert.alert("", 'Location Is Not Assigned In Attendance Template ! ' + String(code));
        Vibration.vibrate()
        //  this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      this.setState({ loading: false });
      console.log("getEmployeeAllocatedLocations");
      Alert.alert(
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  async getLocationBiometricDetails(authDict) {
    // var restUrl = authDict.employeeCode + '/header';
    let url = Constant.BASE_URL + "attendance/attendanceRecords/getLocationApiDetails";

    console.log('getLocationBiometricDetails_URL', url);

    this.setState({ loading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(authDict),
      });

      this.setState({ loading: false });

      let code = await response.status;
      if (code == 200) {
        let responseJson = await response.json();
        console.log('getLocationBiometricDetails', responseJson)

        let { locationApiVendorId,
          locationApiVendorName,
          locationApiKey } = responseJson

        let isFacialFingerPrintEnabled = false
        let isLocationCaptureEnabled = false

        if (responseJson.isFacialFingerPrintEnabled == null || responseJson.isFacialFingerPrintEnabled == false) {

          isFacialFingerPrintEnabled = false

        }

        else isFacialFingerPrintEnabled = responseJson.isFacialFingerPrintEnabled

        if (responseJson.isLocationCaptureEnabled == null || responseJson.isLocationCaptureEnabled == false) {

          isLocationCaptureEnabled = false

        }

        else isLocationCaptureEnabled = responseJson.isLocationCaptureEnabled

        console.log('getLocationBiometricDetails responseJson', {
          locationApiVendorId,
          locationApiVendorName,
          locationApiKey,
          isFacialFingerPrintEnabled,
          isLocationCaptureEnabled
        });

        this.setState({
          locationApiVendorId,
          locationApiVendorName,
          locationApiKey,
          isFacialFingerPrintEnabled,
          isLocationCaptureEnabled
        })

      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message, code);
        console.log('code', responseJson.message);
      } else if ('code == 400', code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.refs.toast.show('Something went wrongs!', code);
      }
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  //Touch Id Concept
  authenticateTouchId(optionalConfigObject) {
    TouchID.isSupported()
      .then(this.authenticate())
      .catch(error => {
        this.setState({ showProH2RPasswordPopUp: true });
        Alert.alert('ProH2R', "Fingerprint Not Supported !")
        // console.log(error);
      });
  }

  authenticate() {
    return TouchID.authenticate(
      'Authenticate with Touch ID',
      optionalConfigObject,
    )
      .then(success => {
        this.checkGpsConnectivity();
        console.log(success);
      })
      .catch(error => {
        this.setState({ showProH2RPasswordPopUp: true });

        // this.checkGpsConnectivity();

        // Alert.alert('ProH2R', 'Check Out', [])

        console.log('showProH2RPasswordPopUp', error);
        // console.log(error)
      });
  }

  authenticateWithPassword() {
    if (this.state.password == '') {
      Alert.alert(
        'Please enter ProH2R Account password for Check In/Check Out.',
      );
    } else if (this.state.password == this.state.proH2RPassword) {
      this.setState({ showProH2RPasswordPopUp: false, password: '' });
      this.checkGpsConnectivity();
    } else {
      Alert.alert('You have entered wrong password, Please Try Again!');
    }
  }
}

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#4306e0',
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed to Authenticate your fingerprint', // Android
  // cancelText: 'Try With ProH2R Account Password', 
  //Android
  fallbackLabel: '', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
});
