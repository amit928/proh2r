import React, { Component, createRef } from 'react';
import {
  BackHandler,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  Modal, SafeAreaView, Vibration, StyleSheet,
  AppState
} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

import Dashboard from './ProDashBoard';
import * as Constant from '../../Constant/Constants';
import Loader from '../../components/Loader';
import KeyStore from '../../Store/LocalKeyStore';
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import ProCheckIn from './ProCheckIn';
import Organization from '../Organization/EmployeeDirectly';
import ProMore from './ProMore';
import { NavigationActions, StackActions } from 'react-navigation';
import EventBus from 'react-native-event-bus';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import { COLORS } from '../../Constant/Index';
import LoadingSplash from '../../components/LoadingSplash';
import { LinearTextGradient } from "react-native-text-gradient";
import LoaderWithBar from '../../components/LoaderWithBar';
import { notificationListener, requestUserPermission } from '../../firebaseUtils/notificationsServices';
import Clipboard from '@react-native-clipboard/clipboard';
import { NotificationManagerAndroid } from '../../firebaseUtils/NotificationManagerAndroid';

// import Geolocation from '@react-native-community/geolocation';

// const Geolocation = Platform.OS == 'ios' ? require('@react-native-community/geolocation') : require('react-native-geolocation-service')
let unsubscribe;
const checkNull = (value, passValue) => {
  if (value == null || value == 'null') {
    return passValue;
  } else {
    return value;
  }
};

// var subscription

export default class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTab: true,
      secondTab: false,
      thirdTab: false,
      fourthTab: false,
      navTitle: 'Dashboard',
      loading: false,
      token: '',
      authDict: {},
      employeeCode: '',
      employeeName: '',
      profilePicUrl: '',
      employeePosition: '',
      checkInTime: '',
      checkOutTime: '',
      leaveArr: [],
      expenseArr: [],
      attendanceArr: [],
      eventRecord: [],
      directoryArr: [],
      unreadNotification: '',
      title: 'Check-In',
      staticUrlArr: [
        'https://proh2r.com/privacy-policy',
        'https://proh2r.com/terms-service',
      ],
      lat: '',
      long: '',
      swipeablePanelActive: false,
      feelingView: false,
      dateArr: [],
      shouldRefresh: false,
      isSplashShowing: true,
      progressBarValue: 0,
      progressBarValue2: 0,
      fcmTokenView: false,
      fcmTokenStr: ''
    };

    this.subscription = createRef();
    this.appState = createRef();
    this.appState.current = AppState.currentState
    
  }

  async getFCMToken(token) {

    const isFcmTrue = await requestUserPermission();
    token(isFcmTrue);

  }

  copyToClipboard(text) {
    Clipboard.setString(text);
    this.setState({ fcmTokenStr: text })
  };

  async fetchCopiedText() {
    const text = await Clipboard.getString();
  };

  reloadLeaveSummary() {

    console.log("reloadLeaveSummary");

    this.getleaveSummary();

  }

  componentDidMount() {

    // return

    KeyStore.getKey('quickAccessMasterList', (err, value) => {

      if (value) {


        // this.setState({ loading: true });
        this.setState({ progressBarValue2: 50 })
        KeyStore.setKey('previousLogin', '1');
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        setTimeout(
          () =>
            KeyStore.getKey('authDict', (err, value) => {
              if (value) {
                console.log("authDict", value);
                this.setState({ authDict: value });
                this.fetchProfileHeaderDetails();
                this.getleaveSummary();
                this.getExpenseRecord();
                this.getAttandenceRecord();
                this.getEventRecord();
                this.fetchNotificationCount();
                this.setState({ authDict: value });
                this.getEvents();

                // uncomment It
                // NotificationManagerAndroid.createChannel();
                // NotificationManagerAndroid.configure();
                // this.getFCMToken((token) => {

                //   if (token != 'false') {

                //     this.setState({ fcmTokenView: true, fcmTokenStr: token })

                //   }

                // })

                // // uncomment It
                // notificationListener(this.props.navigation);

                // old, Don't touch
                // requestUserPermission();
                // this.getRelamInfo(value.realmKey)
                ///this.fetchEmployeeUser()
              }
            }),
          2000,
        );


         this.subscription.current = AppState.addEventListener('change', nextAppState => {
          if (
            this.appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            console.log('App has come to the foreground!');
            
            
    
            KeyStore.getKey('authDict', (err, value) => {
              if (value) {
        
                if (value.accessToken != '') {
                  this.getRelamInfo(value.realmKey)
                  
                }
        
        
        
              }
            });
    
          }
    
          this.appState.current = nextAppState;
          // setAppStateVisible(appState.current);
          console.log('AppState', this.appState.current);
        });


      }

      else {

        Vibration.vibrate()
        Alert.alert(
          'From ProH2R',
          'Please Login Once To Enable Quick Access Feature !',
          [

            {
              text: 'OK',
              onPress: () => {
                this.logOutFromAnywhere()
              },
            },
          ],
          { cancelable: false },
        );

      }
    }
    );


    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);


    // unsubscribe = this.props.navigation.addListener('focus', () => {

    //   if (this.state.shouldRefresh) {


    //     this.setState({ loading: true });
    //     KeyStore.setKey('previousLogin', '1');
    //     var date = new Date().getDate(); //Current Date
    //     var month = new Date().getMonth() + 1; //Current Month
    //     var year = new Date().getFullYear(); //Current Year

    //     setTimeout(
    //       () =>
    //         KeyStore.getKey('authDict', (err, value) => {
    //           if (value) {
    //             this.setState({ authDict: value });
    //             this.fetchProfileHeaderDetails();
    //             this.getleaveSummary();
    //             this.getExpenseRecord();
    //             this.getAttandenceRecord();
    //             this.getEventRecord();
    //             this.fetchNotificationCount();
    //             this.setState({ authDict: value });
    //             this.getEvents();

    //             // this.getRelamInfo(value.realmKey)
    //             ///this.fetchEmployeeUser()
    //           }
    //         }),
    //       2000,
    //     );
    //     BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    //   }
    //   this.setState({shouldRefresh: false})
    // });

  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed,
    );

    this.subscription.current.remove();
    // unsubscribe();
  }
  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };
  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };
  onBackButtonPressed = () => {
    //this.props.navigation.isFocused() helps to exit the app in one screen not in the whole
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Confirm exit',
        'Do you want to quit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false },
      );
      return true;
    }
  };
  // More Button Actions

  btnActions = value => {
    value == 0
      ? (this.setState({ shouldRefresh: true }), this.props.navigation.navigate('ProfileScreen', {
        profilePicUrl: this.state.profilePicUrl,
        updateData: this._onRefresh,
        isFromMenu: '0',
      })
      )
      : value == 3
        ? this.logout()
        : value == 4
          ? this.props.navigation.navigate('NotificationScreen')
          : this.openStaticScreen(this.state.staticUrlArr[value - 1]);
  };

  // Key Module  Button Actions

  keyModuleActions = value => {
    value == 0
      ? this.props.navigation.navigate('EmployeeDirectory')
      : //  this.setState({
      //     firstTab: false,
      //     secondTab: false,
      //     thirdTab: true,
      //     fourthTab: false,
      //   })
      value == 2
        ? this.props.navigation.navigate('LeaveTab', { "tabIndex": 0, "openApplyReg": false })
        : value == 3
          ?
          this.props.navigation.navigate('AttendanceTab', { "tabIndex": 0, "openApplyReg": false })
          // this.props.navigation.navigate('AttendanceTab')
          : value == 4
            ? this.props.navigation.navigate('ProExpenseTab', { "tabIndex": 0, "openApplyReg": false })
            : value == 6
              ? this.props.navigation.navigate('TimeSheetTab')
              : value == 5
                ? this.props.navigation.navigate('PaySlipsScreen')
                : value == 1
                  ? this.props.navigation.navigate('Calander', {
                    dateArr: this.state.dateArr,
                  })
                  : value == 7
                    ?
                    // this.props.navigation.navigate('ProSeperationTab', {
                    //   dateArr: this.state.dateArr,
                    // })
                    this.props.navigation.navigate('ProSeperationTab', { "tabIndex": 0, "openApplyReg": false })

                    : this.props.navigation.navigate('MyReports');

    //  value==0 ? (this.setState({firstTab :false,secondTab :false,thirdTab :true,fourthTab:false,}))  : value == 1 ? this.props.navigation.navigate('LeaveTab') :
    // value == 2 ? this.props.navigation.navigate('AttendanceTab') : value == 3 ? this.props.navigation.navigate('ProExpenseTab') :
    //  value == 4 ? this.props.navigation.navigate('PaySlipsScreen') : this.props.navigation.navigate('ProSeperationTab')
  };

  openStaticScreen(value) {

    Linking.openURL(value);

  }

  _onRefresh = () => {
    this.fetchProfileHeaderDetails();
  };

  logout() {
    const { navigation } = this.props;
    Alert.alert(
      'Confirmation',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => {
            KeyStore.setKey('loginKey', null);

            let authDict = this.state.authDict;
            authDict.accessToken = '';
            authDict.employeeCode = '';
            KeyStore.setKey('authDict', authDict);
            KeyStore.setKey('fcmToken', null)

            // this.props.navigation.dispatch(NavigationActions.reset({
            //     index: 0, key: null, actions: [

            //     //  navigation.navigate('Login')
            //       NavigationActions.navigate({ routeName: 'Login' })

            //     ]
            // }))
            this.resetStack();
            // navigation.navigate('Login')
            // navigation.popToTop()
          },
        },
      ],
      { cancelable: false },
    );
  }

  logOutFromAnywhere() {
    const { navigation } = this.props;

    KeyStore.setKey('loginKey', null);

    let authDict = this.state.authDict;
    authDict.accessToken = '';
    authDict.employeeCode = '';
    KeyStore.setKey('authDict', authDict);
    KeyStore.setKey('fcmToken', null)

    // this.props.navigation.dispatch(NavigationActions.reset({
    //     index: 0, key: null, actions: [

    //     //  navigation.navigate('Login')
    //       NavigationActions.navigate({ routeName: 'Login' })

    //     ]
    // }))
    // this.resetStack();
    this.props.navigation.reset({ index: 0, routes: [{ name: 'RealmAuth' }] });

    // navigation.navigate('Login')
    // navigation.popToTop()

  }

  resetStack = () => {
    this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    // .navigate('Login')
    // .dispatch(StackActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({
    //       routeName: 'Login',
    //     }),
    //   ],
    // }))
  };

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    disableGestures: true,
  };

  onChangeGetBtnBGColor(flag) {

    return flag ? '#3934EE' : COLORS.FormBGColor

  }

  onChangeGetBtnImgColor(flag) {

    return flag ? 'white' : 'black'

  }

  render() {
    const { goBack } = this.props.navigation;

    const cardSize = (Dimensions.get('window').width - (((Dimensions.get('window').width / 2) / 2) / 2));
    // console.warn('what is inside ', this.state.dateArr);
    return (
      <>
        {/* {this.state.isSplashShowing ? <LoadingSplash progressValue={this.state.progressBarValue} /> : */}

        <View style={{ backgroundColor: COLORS.FormBGColor, width: '100%', height: '100%' }}>
          <View
            style={{
              flex: 1,
              // height: Dimensions.get('window').height - 60, width: '100%', 
              backgroundColor: COLORS.FormBGColor
            }}>
            {this.state.firstTab ? (
              <Dashboard
                btnActions={this.btnActions}
                logout={this.logout.bind(this)}
                logOutFromAnywhere={this.logOutFromAnywhere.bind(this)}
                keyModuleActions={this.keyModuleActions}
                navigation={this.props.navigation}
                notification={this.state.unreadNotification}
                eventRecord={this.state.eventRecord}
                attendanceArr={this.state.attendanceArr}
                expenseArr={this.state.expenseArr}
                leaveArr={this.state.leaveArr}
                empName={this.state.employeeName}
                designation={this.state.employeePosition}
                profilePic={this.state.profilePicUrl}
                reloadLeaveSummary={this.reloadLeaveSummary.bind(this)}
                ></Dashboard>
            ) : this.state.secondTab ? (
              <ProCheckIn
                // authDictCopy= {this.state.authDict}
                profilePic={this.state.profilePicUrl}
                lat={this.state.lat}
                long={this.state.long}
                refreshCheckIn={() => this.fetchProfileHeaderDetails()}
                swipeablePanelActive={this.state.swipeablePanelActive}
                openPanel={() => this.openPanel()}
                closePanel={() => this.closePanel()}
                title={this.state.title}
                navigation={this.props.navigation}></ProCheckIn>
            ) : this.state.thirdTab ? (
              <Organization navigation={this.props.navigation} isBackhidden={true}></Organization>
            ) : this.state.fourthTab ? (
              <ProMore
                btnActions={this.btnActions}
                empName={this.state.employeeName}
                profilePic={this.state.profilePicUrl}></ProMore>
            ) : (
              <></>
            )}
          </View>

          <View
            style={{
              backgroundColor: COLORS.FormBGColor,
              // height: 60,
              padding: 5,
              width: '100%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center'
              // shadowOffset: { width: 0.5, height: 0.5 },
              // shadowColor: 'grey',
              // shadowOpacity: 5.0,
            }}
          // source={require('../../images/footer-bg.jpg')}
          >
            <View
              style={
                {
                  flex: 4,
                  // borderBottomWidth: 2, borderBottomColor: 'white'
                  // borderRadius: 35, 
                  // backgroundColor: '#4900FE'
                  alignItems: 'center', justifyContent: 'center',
                  // borderWidth: 1, borderColor: 'red',

                }
              }
            >
              <TouchableOpacity
                style={{
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.onChangeGetBtnBGColor(this.state.firstTab),
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
                onPress={() =>
                  this.setState({
                    firstTab: true,
                    secondTab: false,
                    thirdTab: false,
                    fourthTab: false,
                  })
                }>
                <Image
                  style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: this.onChangeGetBtnImgColor(this.state.firstTab) }}
                  source={require('../../images/home.png')}></Image>
                {/* <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'white',
                  padding: 4,
                }}>
                Home
              </Text> */}
              </TouchableOpacity>
            </View>

            <View
              style={
                { flex: 4, alignItems: 'center', justifyContent: 'center' }
              }>
              <TouchableOpacity
                style={{
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.onChangeGetBtnBGColor(this.state.secondTab),
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
                onPress={() => this.locationDetail()}>
                <Image
                  style={{ width: 22, height: 22, resizeMode: 'contain', tintColor: this.onChangeGetBtnImgColor(this.state.secondTab) }}
                  source={require('../../images/checkin.png')}></Image>
                {/* <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'white',
                  padding: 4,
                }}>
                {this.state.title}
              </Text> */}
              </TouchableOpacity>
            </View>

            <View
              style={
                { flex: 4, alignItems: 'center', justifyContent: 'center' }
              }>
              <TouchableOpacity
                style={{
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.onChangeGetBtnBGColor(this.state.thirdTab),
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
                onPress={() =>
                  this.setState({
                    firstTab: false,
                    secondTab: false,
                    thirdTab: true,
                    fourthTab: false,
                  })
                }>
                <Image
                  style={{ width: 22, height: 22, resizeMode: 'contain', tintColor: this.onChangeGetBtnImgColor(this.state.thirdTab) }}
                  source={require('../../images/searchTab.png')}></Image>
                {/* <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'white',
                  padding: 4,
                }}>
                Search
              </Text> */}
              </TouchableOpacity>
            </View>

            <View
              style={
                { flex: 4, alignItems: 'center', justifyContent: 'center' }
              }>
              <TouchableOpacity
                style={{
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.onChangeGetBtnBGColor(this.state.fourthTab),
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
                onPress={() =>
                  this.setState({
                    firstTab: false,
                    secondTab: false,
                    thirdTab: false,
                    fourthTab: true,
                  })
                }>
                <Image
                  style={{ width: 22, height: 22, resizeMode: 'contain', tintColor: this.onChangeGetBtnImgColor(this.state.fourthTab) }}
                  source={require('../../images/menu.png')}></Image>
                {/* <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'white',
                  padding: 4,
                }}>
                More
              </Text> */}
              </TouchableOpacity>
            </View>


          </View>
          <Modal
            visible={this.state.feelingView}
            // visible={true}
            transparent={true}
            onRequestClose={() => { }}>
            <View
              style={{
                flex: 1,
                // backgroundColor: 'transparent',
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: (cardSize),
                  backgroundColor: 'white',
                  borderRadius: 25,
                  height: 200,
                  overflow: 'hidden'
                }}>
                <View style={{ marginBottom: 30, overflow: 'hidden' }}>
                  {/* <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginTop: -50,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../images/dialog-logo.png')}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}></Image>
                    </View> */}

                  {/* <TouchableOpacity style={{ width: 100, height: 50, alignSelf: 'flex-end', top: 8, marginTop: -40 }} onPress={() => this.setState({ feelingView: false })}>
                      <Image
                        source={require('../../images/cross.png')}
                        style={{ height: '60%', width: '60%', resizeMode: 'contain', alignSelf: "flex-end" }} />

                    </TouchableOpacity> */}

                  <View style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between', 
                    alignItems: 'center', overflow: 'hidden'
                  }}>

                    <Image
                      style={{ height: 55, width: 55, }}
                      source={require('../../images/feelingIcon.png')}></Image>
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        textAlignVertical: 'center',
                        fontSize: 13,
                        color: 'black',
                        // fontWeight: '500',
                        // marginTop: 8,
                        fontFamily: Constant.MontserratSemiBold,
                        // top: '5%',
                        // right: 5,
                        left: 10
                      }}>
                      How are you feeling today?
                    </Text>

                    {/* <TouchableOpacity onPress={() => this.setState({ feelingView: false })} style={{
                      borderRadius: 5, padding: 5, paddingVertical: 0, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent', borderColor: '#2b2b2b', borderWidth: 0, flexDirection: 'row', width: 70, height: 30,
                      // top: '12%', 
                      marginRight: 4
                    }
                    } >



                      <Text
                        allowFontScaling={false}
                        style={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          textAlignVertical: 'center',
                          fontSize: 13,
                          color: '#0D0F1A',
                          // fontWeight: '500',
                          // marginTop: 8,
                          fontFamily: Constant.MontserratRegular,
                          // top: '5%',
                          // right: 15
                          marginRight: 5
                        }}>
                        Skip
                      </Text>



                      <View style={{ borderRadius: 6, padding: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7FF', borderColor: '#0800CA', borderWidth: 0.5 }} >

                       
                        <Image
                          style={{
                            height: 10, width: 10, resizeMode: 'contain',
                          }}
                          source={require('../../images/arrowRight.png')}></Image>

                      </View>

                    </TouchableOpacity> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 12,
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 100,
                        width: '24%',
                        // margin: 13,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginRight: 20,

                      }}
                      onPress={() => this.submitFeelings('1')}>
                      <Image
                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                        source={require('../../images/delightedEmoji.png')}></Image>
                      <Text
                        allowFontScaling={false}
                        style={styles.emojiBtnText}>
                        Delighted
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        height: 100,
                        width: '24%',
                        // margin: 13,
                        justifyContent: 'center',
                        alignItems: 'center',

                        // marginLeft: 20,
                      }}
                      onPress={() => this.submitFeelings('2')}>
                      <Image
                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                        source={require('../../images/happyEmoji.png')}></Image>
                      <Text
                        allowFontScaling={false}
                        style={styles.emojiBtnText}>
                        Happy
                      </Text>
                    </TouchableOpacity>
                    {/* </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}> */}
                    <TouchableOpacity
                      style={{
                        height: 100,
                        width: '24%',
                        // margin: 13,
                        justifyContent: 'center',
                        alignItems: 'center',

                        // marginRight: 20,
                      }}
                      onPress={() => this.submitFeelings('3')}>
                      <Image
                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                        source={require('../../images/sadEmoji.png')}></Image>
                      <Text
                        allowFontScaling={false}
                        style={styles.emojiBtnText}>
                        Sad
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        height: 100,
                        width: '24%',
                        // margin: 13,
                        justifyContent: 'center',
                        alignItems: 'center',


                        // marginLeft: 20,
                      }}
                      onPress={() => this.submitFeelings('4')}>
                      <Image
                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                        source={require('../../images/angryEmoji.png')}></Image>
                      <Text
                        allowFontScaling={false}
                        style={styles.emojiBtnText}>
                        Angry
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>


          {/* FCM Token Modal */}
          <Modal
            visible={this.state.fcmTokenView}
            transparent={true}
            onRequestClose={() => { }}>
            <View
              style={{
                flex: 1,
                // backgroundColor: 'transparent',
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: (cardSize),
                  backgroundColor: 'white',
                  borderRadius: 25,
                  height: 200,
                  overflow: 'hidden'
                }}>
                <View style={{ marginBottom: 30, overflow: 'hidden' }}>


                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }}>

                    <Image
                      style={{ height: 55, width: 55, }}
                      source={require('../../images/feelingIcon.png')}></Image>
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        textAlignVertical: 'center',
                        fontSize: 13,
                        color: 'black',
                        // fontWeight: '500',
                        // marginTop: 8,
                        fontFamily: Constant.MontserratSemiBold,
                        // top: '5%',
                        right: 5
                      }}>
                      Your FCM Token
                    </Text>

                    <TouchableOpacity onPress={() => {
                      this.setState({ fcmTokenView: false, })
                      this.copyToClipboard(this.state.fcmTokenStr)
                    }} style={{
                      borderRadius: 5, padding: 5, paddingVertical: 0, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent', borderColor: '#2b2b2b', borderWidth: 0, flexDirection: 'row', width: 70, height: 30,
                      // top: '12%', 
                      marginRight: 4
                    }
                    } >



                      <Text
                        allowFontScaling={false}
                        style={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          textAlignVertical: 'center',
                          fontSize: 13,
                          color: '#0D0F1A',
                          // fontWeight: '500',
                          // marginTop: 8,
                          fontFamily: Constant.MontserratRegular,
                          // top: '5%',
                          // right: 15
                          marginRight: 5
                        }}>
                        Copy
                      </Text>



                      <View style={{ borderRadius: 6, padding: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7FF', borderColor: '#0800CA', borderWidth: 0.5 }} >

                        {/* <Image
                          style={{
                            height: 14, width: 14, resizeMode: 'contain',
                            tintColor: '#636363'
                          }}
                          source={require('../../images/arrowRight.png')}></Image> */}

                        <Image
                          style={{
                            height: 10, width: 10, resizeMode: 'contain',
                          }}
                          source={require('../../images/arrowRight.png')}></Image>

                      </View>

                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 12,
                      padding: 10
                    }}>

                    <Text allowFontScaling={false} > {this.state.fcmTokenStr}  </Text>

                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* <Loader isLoader={this.state.loading}> </Loader> */}

          <LoaderWithBar isLoader={this.state.isSplashShowing} progressValue={this.state.progressBarValue2}> </LoaderWithBar>



          <Toast ref="toast" />
        </View>

      </>
    );
  }

  locationDetail() {
    RNLocation.getCurrentPermission().then(currentPermission => {
      console.warn('currentPermission', currentPermission);
      if (
        currentPermission != 'denied' &&
        currentPermission != 'restircted' &&
        currentPermission != 'notDetermined'
      ) {
        this.openPanel();
        if (Platform.OS == 'android') {
          this.setState({ loading: true });
          this.checkGpsForAndroid();
        } else {
          Geolocation.getCurrentPosition(
            position => {
              console.log('the quired is', position);
              let lats = position.coords.latitude;
              let longs = position.coords.longitude;
              //  this.setState({lat:lats,long:longs})

              this.setState({
                lat: lats,
                long: longs,
                firstTab: false,
                secondTab: true,
                thirdTab: false,
                fourthTab: false,
              });
            },
            error => {
              // See error code charts below.
              console.log('got the error');
              console.log(error.code, error.message);
            },
            {
              // enableHighAccuracy: true, //See if location work 
              timeout: 15000, maximumAge: 0, accuracy: Platform.OS == 'android' ? "high" : "bestForNavigation"
            },
          );

          //this.setState({firstTab:false,secondTab:true,thirdTab:false,fourthTab:false})
        }
      } else {
        Alert.alert(
          'Failed',
          'Please enable your location permission from settings for Check In / Check Out feature.',
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

  checkGpsForAndroid() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        console.log('checkGpsForAndroid data', data);

        this.setState({ loading: true });
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
        //  Alert.alert(data)
        Geolocation.getCurrentPosition(
          position => {
            console.log('checkGpsForAndroid position---->', position);
            let lats = position.coords.latitude;
            let longs = position.coords.longitude;
            this.setState({ lat: lats, long: longs, loading: false });
            this.setState({
              firstTab: false,
              secondTab: true,
              thirdTab: false,
              fourthTab: false,
              OpenPanel: true,
            });
          },
          error => {
            this.setState({ loading: false });

            // See error code charts below.
            console.log('got the error checkGpsForAndroid', error);
            Alert.alert('Cannot Connect To GPS !')

            let lats = 0.0000;
            let longs = 0.0000;
            this.setState({ lat: lats, long: longs, loading: false });
            this.setState({
              firstTab: false,
              secondTab: true,
              thirdTab: false,
              fourthTab: false,
              OpenPanel: true,
            });

            console.log("checkGpsForAndroid", error.code, error.message);
          },
          {
            // enableHighAccuracy: true,  //See if location work  
            timeout: 15000, maximumAge: 0, accuracy: Platform.OS == 'android' ? "high" : "bestForNavigation"
          },
        );
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('got the error');
      });
  }

  // WEB API
  async fetchProfileHeaderDetails() {
    // this.setState({ loading: true });
    // this.setState({ progressBarValue2: 50 })

    console.warn('refreshing.....');
    var restUrl = this.state.authDict.employeeCode + '/header';
    var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA + restUrl;

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;

      // this.setState({ progressBarValue: (this.state.progressBarValue + 14.28) })
      // this.setState({ progressBarValue2: 50 })
      // this.setState({ loading: false });

      if (code == 200) {
        let responseJson = await response.json();
        // this.setState({ progressBarValue2: 100, isSplashShowing: false })
        console.log('fetchProfileHeaderDetails', responseJson);
        console.log('authDict', this.state.authDict);
        if (!responseJson.moodCaptured) {
          this.setState({ feelingView: true });
        }
        let title = '';
        if (responseJson.freezeButtonStatus) {
          title = 'Check-Out';
        } else {
          title = 'Check-In';
        }

        this.setState({
          employeeName: responseJson.empName,
          profilePicUrl: responseJson.docId,
          employeePosition: responseJson.positionedAs,
          title: title,
        });

        var leaveSupervisor = responseJson.leaveSupervisor;
        var expenseSupervisor = responseJson.expenseSupervisor;
        var attdSupervisor = responseJson.attdSupervisor;
        var separationSupervisor = responseJson.separationSupervisor;
        var onDutySupervisor = responseJson.onDutySupervisor;
        var timesheetSupervisor = responseJson.timesheetSupervisor;

        KeyStore.setKey('onDutySupervisor', onDutySupervisor);
        KeyStore.setKey('leaveSupervisor', leaveSupervisor);
        KeyStore.setKey('expenseSupervisor', expenseSupervisor);
        KeyStore.setKey('attdSupervisor', attdSupervisor);
        KeyStore.setKey('separationSupervisor', separationSupervisor);
        KeyStore.setKey('timesheetSupervisor', timesheetSupervisor);
        KeyStore.setKey('employeeProfileDetails', responseJson);
        this.setState({ progressBarValue2: 100, isSplashShowing: false })
        // KeyStore.setKey('profilePicUrl', responseJson.docId);
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("fetchProfileHeaderDetails logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async getleaveSummary() {
    var url =
      Constant.BASE_URL +
      Constant.LEAVE +
      this.state.authDict.employeeCode +
      '/leavescore'
    // + "/September-2023";
    this.setState({ loading: true });

    console.log("getleaveSummary url", url);

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ loading: false, progressBarValue: (this.state.progressBarValue + 14.28) });


      if (code == 200) {
        let responseJson = await response.json();

        var arr = responseJson;
        var dataArr = [];
        for (let i = 0; i < arr.LeaveScore.length; i++) {
          var j = arr.LeaveScore[i];
          var obj = {
            leaveName: j?.name,
            remainLeave: j?.count * 1,
            totalLeave: j?.total * 1,
          };
          dataArr.push(obj);
        }
        console.log('dataArr', dataArr);
        this.setState({ leaveArr: dataArr });
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("getleaveSummary logoutOnError", code);
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async getExpenseRecord() {
    var url =
      Constant.BASE_URL +
      Constant.EXPENSE_RECORD +
      this.state.authDict.employeeCode;
    this.setState({ isLoading: true });

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false, progressBarValue: (this.state.progressBarValue + 14.28) });


      if (code == 200) {
        let responseJson = await response.json();

        // this.setState({progressBarValue: 14.28})

        var arr = responseJson;
        var dataArr = [];

        for (let i = 0; i < arr.length; i++) {
          var j = arr[i];

          let advanceAmount = j.amount - j.reimburseAmount;

          var obj = {
            reportTitle: checkNull(String(j.expenseReportName), ''),
            incurredDate: Moment(
              checkNull(String(j.expenseIncurredDate), '') + ' 00:00:00',
            ).format('DD-MM-YYYY'),
            reimbursement: checkNull(String(j.reimburseAmount), ''),
            billable: checkNull(String(j.amount), ''),
            status: checkNull(String(j.expenseStatus), ''),
            expenseName: checkNull(String(j.expenseName), ''),
            advanceAmount: checkNull(String(advanceAmount), ''),
            expenseReason: checkNull(String(j.expenseReason), ''),
            expenseId: checkNull(String(j.expenseId)),
          };
          dataArr.push(obj);
        }
        this.setState({ expenseArr: dataArr });
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("getExpenseRecord logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async getAttandenceRecord() {
    var url =
      Constant.BASE_URL +
      'dashboard/attendanceScore/' +
      this.state.authDict.employeeCode;
    this.setState({ loading: true });

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ loading: false });

      if (code == 200) {
        let responseJson = await response.json();
        console.log('getAttandenceRecord', responseJson);

        let arr = [];
        for (let i = 0; i < 3; i++) {
          arr.push(responseJson[i]);
        }

        console.log('getAttandenceRecord arr', arr);

        this.setState({ attendanceArr: arr });
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("getAttandenceRecord logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async getEventRecord() {
    var url = Constant.BASE_URL + 'dashboard/employeeconnectevents';
    this.setState({ loading: true });

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ loading: false, progressBarValue: (this.state.progressBarValue + 14.28) });


      if (code == 200) {
        let responseJson = await response.json();
        console.log('getEventRecord', responseJson);
        let birthDay = {
          img: require('../../images/birthday.png'),
          name: 'Birthday',
          arr: Utility.checkBlankAndReturnBlankArr(responseJson.birthdays),
          noDataMsg: 'No Birthday buddies found.',
        };
        let anniversary = {
          img: require('../../images/anniversary.png'),
          name: 'Anniversary',
          arr: Utility.checkBlankAndReturnBlankArr(
            responseJson.workAnniversaries,
          ),
          noDataMsg: 'No Anniversary buddies found.',
        };
        let newJoines = {
          img: require('../../images/newJoinee.png'),
          name: 'New Joinee',
          arr: Utility.checkBlankAndReturnBlankArr(responseJson.newJoinies),
          noDataMsg: 'No New Joinee buddies found.',
        };
        let arr = [];
        arr.push(birthDay);
        arr.push(anniversary);
        arr.push(newJoines);
        console.warn('eventRecord', arr);
        this.setState({ eventRecord: arr });
        this.getRelamInfo(this.state.authDict.realmKey);
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("getEventRecord logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async fetchNotificationCount() {
    const { navigate } = this.props.navigation;
    var url = Constant.BASE_URL + Constant.FETCH_NOTIFICATION_COUNT;

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });
      let code = await response.status;

      this.setState({ progressBarValue: (this.state.progressBarValue + 14.28) })
      if (code == 200) {
        let responsejson = await response.json();
        var unreadNoti = responsejson.unread;
        this.setState({ unreadNotification: unreadNoti });
        // console.log(unreadNoti);
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("fetchNotificationCount logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async fetchEmployeeUser() {
    var url = Constant.BASE_URL + Constant.FETCH_EMPLOYEE;
    try {
      let response = await fetch(url, {
        method: 'GET',

        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;

      if (code == 200) {
        let responsejson = await response.json();
        // console.log(responsejson);
        var arr = [];

        for (let i = 0; i < responsejson.length; i++) {
          //let obj = responsejson[i]

          var fNm = responsejson[i].empFirstName;
          var mNm = responsejson[i].empMiddleName;
          var lNm = responsejson[i].empLastName;
          var name = '';

          if (fNm == null || fNm == 'null') {
            fNm = '';
          }
          if (mNm == null || mNm == 'null') {
            mNm = '';
          }
          if (lNm == null || lNm == 'null') {
            lNm = '';
          }

          var obj = {
            empName: fNm + ' ' + mNm + ' ' + lNm,
            empId: responsejson[i].empCode,
            empLocation: responsejson[i].empJobInfoLocation,
            empDepartment: responsejson[i].empJobInfoDepartment,
            empEmail: responsejson[i].empEmail,
            empMobileNumber: Utility.checkNull(responsejson[i].empMobileNo),
            empProfilePhoto:
              'https://s3.ap-south-1.amazonaws.com/proh2r/' +
              responsejson[i].docId,
            position: Utility.checkNull(responsejson[i].empJobInfoDesignation),
            docId: responsejson[i].docId,
          };
          arr.push(obj);
        }
        this.setState({ directoryArr: arr });
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("fetchEmployeeUser logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  // Login Api
  async getRelamInfo(realmName) {
    var url = Constant.BASE_URL + Constant.GET_REALM_INFO + realmName;

    try {
      let response = await fetch(url, {
        method: 'GET',
      });

      let code = await response.status;
      if (code == 200) {
        let responseJson = await response.json();
        console.log('----------------------------TabBar-------------------------------', responseJson);
        let androidVersion = responseJson.android;
        let iosVersion = responseJson.ios;

        if (Platform.OS === 'android') {
          if (Constant.androidVersion != androidVersion) {



            this.updateVersionOfApplication(
              'https://play.google.com/store/apps/details?id=com.proh2r',
            );

            if (Constant.androidPreviousVersion != androidVersion) {

              this.updateVersionOfApplication(
                'https://play.google.com/store/apps/details?id=com.proh2r',
              );

            }

          }
        } else {
          if (Constant.iosVersion != iosVersion) {



            this.updateVersionOfApplication(
              'https://apps.apple.com/in/app/proh2r/id1494439507',
            );

            if (Constant.iosPreviousVersion != iosVersion) {

              this.updateVersionOfApplication(
                'https://apps.apple.com/in/app/proh2r/id1494439507',
              );

            }

          }
        }
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  async submitFeelings(value) {
    var url = Constant.BASE_URL + Constant.FEELINGS;
    this.setState({ loading: true, feelingView: false });
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: value,
      });
      let code = await response.status;
      this.setState({ loading: false });

      if (code == 201) {
        let responsejson = await response.json();
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else {
        console.log("submitFeelings logoutOnError");
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      }
    } catch (error) {
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      this.setState({ isLoading: false });
      console.error(error);
    }
  }

  updateVersionOfApplication(openUrl) {
    const { navigation } = this.props;
    Alert.alert(
      'Update Available',
      'Please update ProH2R application for better experience.',
      [
        {
          text: 'OK',
          onPress: () => {
            KeyStore.setKey('loginKey', null);

            let authDict = this.state.authDict;
            authDict.accessToken = '';
            authDict.employeeCode = '';
            KeyStore.setKey('authDict', authDict);
            this.openStaticScreen(openUrl);

            this.resetStack();
          },
        }, ,
        // {
        //   text: 'Cancel',
        // }
      ],

      { cancelable: false },
    );
  }

  async getEvents() {
    var url = Constant.BASE_URL + 'calendar/2018-01-01/2023-12-30';
    console.log("getEvents", url);
    console.log("getEvents", Constant.getHeader(this.state.authDict));
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;

      this.setState({
        progressBarValue: 100,
        isSplashShowing: false
      })

      if (code == 200) {
        let responseJson = await response.json();
        this.setState({ dateArr: responseJson });
      } else {
        Alert.alert('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const styles = StyleSheet.create({

  emojiBtn: {


  },

  emojiBtnText: {
    fontSize: 11,
    color: 'black',
    fontFamily: Constant.MontserratMedium,
    marginTop: 4,
  }

})
