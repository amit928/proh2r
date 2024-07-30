import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert, Dimensions, TextInput, AsyncStorage, Modal, Image, ImageBackground, BackHandler, Linking, Vibration, Platform, ScrollView, TouchableNativeFeedback
} from 'react-native';

import Logo from '../../components/Logo';
import Form from '../../components/Form';
import Loader from "../../components/Loader";
import KeyStore from '../../Store/LocalKeyStore';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Constant from '../../Constant/Constants';

import NetInfo from "@react-native-community/netinfo";
import ForgotPassword from './ForgotPassword';
import { Container } from 'native-base';
//import { Network } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    //  flex: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },

  forgotPasswordButton: {
    width: Dimensions.get('window').width - 120,
    backgroundColor: '#ffffff',
  },

  button: {
    width: Dimensions.get('window').width - 120,
    backgroundColor: '#1c313a',
    borderRadius: 5,
    marginVertical: 20,
    paddingVertical: 13,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  buttonTextForgot: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center'
  },
  inputBox: {
    width: Dimensions.get('window').width - 80,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1F1412',
    marginVertical: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
});

function CheckBox({ name = 'Apply Leave', check = false, onPress = () => { } }) {

  // const [testCheck, settestCheck] = useState(false)

  const color = '#207398'

  return (<TouchableOpacity onPress={() => {
    onPress(check)
  }} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ backgroundColor: "white", width: 25, height: 25, borderRadius: 5, margin: 8, marginRight: 10, marginBottom: 10, borderColor: color, borderWidth: 1, alignContent: 'center', alignItems: 'center', alignContent: 'center' }}
    // onPress={() => {
    //     onPress(check)
    // }}
    >

      <Text allowFontScaling={false} style={{ color: check ? color : "white", fontSize: 22, bottom: Platform.OS == "android" ? 3 : 0, fontFamily: Constant.MontserratRegular }} >✓</Text>

    </View>

    <Text allowFontScaling={false} style={{ color: 'black', fontSize: 13, fontFamily: Constant.MontserratRegular }}


    >

      {name}

    </Text>
  </TouchableOpacity>)
}

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {

      email: '',
      password: '',
      secretKey: '',
      realmKey: '',
      token: '',
      isLoading: false,
      authDict: {},
      logoUrl: null,
      secureTextEntry: true,
      // serverSettingPOC: false,
      // isRegisterReq: true,
      // serverKey: false,
      // anotherKey: false,
      // deviceRegisterd: 

    }
  }

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);

    // Network.isConnected.fetch(),
    // Network.getConnectionInfo()
    // .
    // then(([isConnected, connectionInfo]) => {

    //   console.log(isConnected)
    //   console.log(connectionInfo)
    // });

    // NetInfo.getIPAddress(ip => {
    //   console.log('this is ip address'  + ip);
    // });

    if (Platform.OS == 'ios') {
      StatusBar.setHidden(true);

    }

    else {
      StatusBar.setHidden(false);
      StatusBar.setBackgroundColor('#5755F4')
    }


    // KeyStore.getKey('uniqueKeyPOC', (err, value) => {


    //   if (value) {
    //     console.log('value', value);
    //     this.setState({ isRegisterReq: false })
    //     this.setState({ serverKey: true })
    //   }

    //   else {
    //     console.log('err', err);
    //     this.setState({ isRegisterReq: true })
    //     this.setState({ serverKey: false })
    //   }

    // })

    // NetInfo.getConnectionInfo().then((connectionInfo) => {

    //   console.log('this is ip details' + connectionInfo.details)
    //   console.log(
    //     'Initial, type: ' +
    //       connectionInfo.type +
    //       ', effectiveType: ' +
    //       connectionInfo.effectiveType,
    //   );
    //   if(connectionInfo.type != 'none'){
    //     console.log('net is connected')

    //   }else{
    //     console.log('Pleaes check internet connectivity')

    //   }
    // });

    // Network.getConnectionInfo().then((connectionInfo) => {
    //   console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: '    + connectionInfo.effectiveType);
    // )};

    const { navigate } = this.props.navigation;

    // this.setState({
    //   realmKey:    Constant.REALM_KEY,//Constant.REALM_KEY,
    //   secretKey:  Constant.SECRET_KEY,

    // })

    KeyStore.getKey('loginKey', (err, value) => {

      if (value) {
        this.setState({ token: value })
        navigate('TabBar', { name: 'TabBar' })
      }
    });

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value, logoUrl: value.companyLogoUrl })
      }
    });

    // KeyStore.getKey('realmKey', (err, value) => {
    //   if(value) {
    //     this.setState({realmKey:value})
    //   }
    // });

  }

  static navigationOptions = {

    header: null,
    gesturesEnabled: false,
    disableGestures: true
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);

  }

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
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          }
        ],
        { cancelable: false },
      );
      return true;
    }
  }


  onSubmit = () => {

    // if (this.state.anotherKey) {

    //   Alert.alert('This Device is Registered For Another ID !')
    //   return

    // }

    // if (this.state.isRegisterReq && this.state.serverKey) {

    //   Alert.alert('you are already Registered with a device on server !')
    //   return

    // }





    const { navigate } = this.props.navigation;

    if (this.state.email == "") {

      this.showAlert('Please enter Email Id/Employee Id')
    }
    else if (this.state.password.length == 0) {

      this.showAlert('Please enter password')

    }

    else {
      // if (!this.state.serverKey) {

      //   Alert.alert('Device is Not Registered', 'Device Registering !')

      // }

      this.webApiLogin()
      // navigate('Base', {name: ''})
    }
  }

  onForgetPassword() {

    const ForgotPasswordURL = "https://proh2r.com/auth/realms/" + this.state.authDict.realmKey + "/login-actions/reset-credentials?client_id=loginclient"

    console.log(ForgotPasswordURL);


    Linking.openURL(ForgotPasswordURL).catch(err => console.error("Couldn't load page", err));

  }

  showAlert = (msg) => {

    Alert.alert(msg)

  }

  // Login Api
  async webApiLogin() {

    var params = {

      realm: this.state.authDict.realmKey,
      client_id: 'loginclient',
      grant_type: 'password',
      username: this.state.email,
      password: this.state.password,
    };

    let formBody = [];

    for (let value in params) {
      let encodedKey = encodeURIComponent(value);
      let encodedValue = encodeURIComponent(params[value]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const finalRealmName = this.state.authDict.realmKey.trim()

    var url = 'https://proh2r.com/auth/realms/' + finalRealmName + '/protocol/openid-connect/token'
    this.setState({ isLoading: true })

    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      }
      )
      this.setState({ isLoading: false })

      console.log('url', url);

      // Alert.alert('Request Response', formBody + "\n" + url)

      let code = await response.status

      if (code == 200) {
        let responseJson = await response.json();
        console.log('webApiLogin',responseJson)
        var accessToken = responseJson.access_token
        var authDict = this.state.authDict
        authDict.accessToken = accessToken
        authDict.password = this.state.password
        this.setState({ authDict: authDict })
        console.log("authdict", authDict);
        KeyStore.setKey('authDict', authDict)
        KeyStore.setKey('authDictNewVar', authDict)

        this.setState({ token: accessToken });
        KeyStore.setKey('loginKey', accessToken)

        this.fetchUserDetailsApi();

        // Alert.alert('responseJson', JSON.stringify(responseJson))

        // Alert.alert('Request Response', formBody + "\n" + url + "\n \n" + JSON.stringify(responseJson))


      } else

        if (code == 400) {
          let responseJson = await response.json();
          this.refs.toast.show(responseJson.message, 5000);

        }
        else if (code == 401) {
          let responseJson = await response.json();

          this.refs.toast.show('Invalid username or password.');
        } else {

          let responseJson = await response.json();

          Alert.alert('Request Response', formBody + "\n" + url + "\n \n" + JSON.stringify(responseJson))

          this.refs.toast.show('Something went wrong!' + code);

        }

    } catch (error) {

      Alert.alert('', "Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      this.setState({ isLoading: false })
      console.error(error);
    }
  }

  async fetchUserDetailsApi() {

    console.log("fetchUserDetailsApi initiated");

    var url = 'https://proh2r.com/auth/realms/' + this.state.authDict.realmKey + '/protocol/openid-connect/userinfo'

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
        },
      }
      )
      let code = await response.status

      console.log("fetchUserDetailsApi", code);

      if (code == 200) {

        let responseJson = await response.json();
        var employeeId = responseJson.preferred_username
        var authDict = this.state.authDict
        authDict.employeeCode = employeeId
        this.setState({ authDict: authDict })
        KeyStore.setKey('authDict', authDict)
        KeyStore.setKey('employeeCode', employeeId)

        this.fetchProfileHeaderDetails(employeeId)

      } else {
        this.refs.toast.show('Something Went Wrong!', 5000)
      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert('', "Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }

  }

  async fetchProfileHeaderDetails(empId) {
    const { navigate } = this.props.navigation;

    var restUrl = empId + '/header'
    var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA + restUrl

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)

      }
      )

      let code = await response.status
      if (code == 200) {

        let responseJson = await response.json();
        console.log('fetchProfileHeaderDetailsResponseJson', responseJson)

        var leaveSupervisor = responseJson.leaveSupervisor
        var expenseSupervisor = responseJson.expenseSupervisor
        var attdSupervisor = responseJson.attdSupervisor
        var separationSupervisor = responseJson.separationSupervisor
        var onDutySupervisor = responseJson.onDutySupervisor
        var timesheetSupervisor = responseJson.timesheetSupervisor;

        KeyStore.setKey('onDutySupervisor', onDutySupervisor)
        KeyStore.setKey('leaveSupervisor', leaveSupervisor)
        KeyStore.setKey('expenseSupervisor', expenseSupervisor)
        KeyStore.setKey('attdSupervisor', attdSupervisor)
        KeyStore.setKey('separationSupervisor', separationSupervisor)
        KeyStore.setKey('timesheetSupervisor', timesheetSupervisor);
        KeyStore.setKey('employeeProfileDetails', responseJson);

        let quickAccessMasterListTemp = [
          {
            name: "Apply Leave",
            screenKey: "ApplyLeave",
            bgcolor: '#FFBF00',
            image: "ApplyLeave",
            isPayload: true,
            payload: { refreshList: () => { }, isEdit: '0' }
          },
          {
            name: "Add Expense",
            screenKey: "ProAddExpense",
            bgcolor: '#54CEDE',
            image: "AddExpense",
            isPayload: false,
            payload: {}
          },
          {
            name: "Apply\nRegularization",
            screenKey: "AttendanceTab",
            bgcolor: '#89D175',
            image: "ApplyRegularization",
            isPayload: true,
            payload: { "tabIndex": 1, "openApplyReg": true }
          },
          {
            name: "Apply\nSeperation",
            screenKey: "ProSeperationTab",
            bgcolor: '#427BF2',
            image: "ApplySeperation",
            isPayload: true,
            payload: { "tabIndex": 0, "openApplyReg": true }
          }
        ]

        let quickAccessArrTemp = JSON.parse(JSON.stringify(quickAccessMasterListTemp))

        if (leaveSupervisor) {
          quickAccessMasterListTemp.push({
            name: "Team Leaves",
            screenKey: "LeaveTab",
            bgcolor: '#955AED',
            image: "TeamLeaves",
            isPayload: true,
            payload: { "tabIndex": 4, "openApplyReg": false }
          })
        }

        if (expenseSupervisor) {
          quickAccessMasterListTemp.push({
            name: "Team Expense",
            screenKey: "ProExpenseTab",
            bgcolor: '#ff9999',
            image: "TeamExpense",
            isPayload: true,
            payload: { "tabIndex": 1, "openApplyReg": false }
          })
        }

        if (attdSupervisor) {
          quickAccessMasterListTemp.push({
            name: "Team\nRegularization",
            screenKey: "AttendanceTab",
            bgcolor: '#40CB6B',
            image: "TeamRegularization",
            isPayload: true,
            payload: { "tabIndex": 2, "openApplyReg": false }
          })
        }



        KeyStore.setKey('quickAccessMasterList', quickAccessMasterListTemp)

        KeyStore.setKey('quickAccessArr', quickAccessArrTemp)

        // KeyStore.setKey('uniqueKeyPOC', '009&IPhone_14')

        // EventBus.getInstance().fireEvent("reloadDashboard", {

        // })

        navigate('TabBar', { name: '' })

      } else if (code == 401) {

        this.props.navigation.popToTop()

      } else {
        // Alert.alert('fetchProfileHeaderDetails ' + code,'Something went wrong!')
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert('', "Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);

    }
  }

  render() {

    const { navigate } = this.props.navigation;
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <>
        <ImageBackground resizeMode='stretch' style={{ height: '100%', width: '100%', }} source={require('../../images/loginBg.jpg')}>
          <View style={{ height: '25%', width: '65%', alignItems: 'center', marginTop: '10%', position: 'absolute', alignSelf: 'center' }}>
            {/* <Image style={{ height: '70%', width: '90%', resizeMode: 'contain' }} source={{ uri: this.state.logoUrl }}>
            </Image> */}
            <Image
              style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              source={require('../../images/splash1.png')}></Image>
          </View>
          <KeyboardAwareScrollView scrollEnabled={false} contentContainerStyle={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>


            <View style={{ height: '60%', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '60%' }}>
              <View style={{
                width: '85%', height: 55, backgroundColor: 'rgba(84, 100, 207, 1)'
                // 'rgba(255,255,255,0.2)'
                , borderRadius: 27.5,
                // marginTop: '30%',
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
              }}>
                <View style={{ height: 48, width: 48, marginLeft: 4, backgroundColor: 'white', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={{ height: 22, width: 22, resizeMode: 'contain' }} source={require('../../images/emailIcon.png')}></Image>
                </View>
                <TextInput allowFontScaling={false} style={{ padding: 16, flex: 1, color: 'white', fontSize: 15, fontFamily: Constant.MontserratRegular }}
                  placeholder="Email ID/Employee ID"
                  placeholderTextColor='white'
                  onChangeText={(value) => this.setState({ email: value })}
                  value={removeEmojis(this.state.email)}
                  keyboardType="email-address" autoCorrect={false} returnKeyType='done' maxLength={60}>
                </TextInput>
              </View>


              <View style={{
                width: '85%', height: 55, backgroundColor: 'rgba(84, 100, 207,1)',
                //  'rgba(255,255,255,0.2)', 
                borderRadius: 27.5, marginTop: 25, flexDirection: 'row', alignItems: 'center',
              }}>
                <View style={{ height: 48, width: 48, marginLeft: 4, backgroundColor: 'white', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={{ height: 22, width: 22, resizeMode: 'contain' }} source={require('../../images/passwordIcon.png')}></Image>
                </View>

                <TextInput allowFontScaling={false} style={{ padding: 16, flex: 1, color: 'white', fontSize: 15, fontFamily: Constant.MontserratRegular }}
                  placeholder="Password"
                  placeholderTextColor='white'
                  onChangeText={(value) => this.setState({ password: value })}
                  value={this.state.password}
                  keyboardType="ascii-capable" autoCorrect={false} returnKeyType='done' maxLength={25} secureTextEntry={this.state.secureTextEntry}>
                </TextInput>


                <TouchableOpacity style={{ height: 48, width: 48, marginRight: 4, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                  this.setState({ secureTextEntry: !this.state.secureTextEntry })
                }}>

                  {this.state.secureTextEntry ? <Image style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: '#3C47C5' }} source={require('../../images/closeEye.png')}></Image> : <Image style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: '#3C47C5' }} source={require('../../images/openEye.png')}></Image>}





                </TouchableOpacity>


              </View>



              <TouchableOpacity style={{
                height: 48, width: '85%', backgroundColor: 'white',
                alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginTop: 25, elevation: 3
              }} onPress={() => this.onSubmit()}>
                <Text allowFontScaling={false} style={{ color: 'rgba(63,59,192,1.0)', fontSize: 16, fontFamily: Constant.MontserratSemiBold }}>SUBMIT</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {

                this.onForgetPassword();

              }}>
                <Text allowFontScaling={false} style={{ color: 'white', opacity: 0.9 }}> Forgot Password ? </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: '20%', width: '100%' }}>
            </View>
          </KeyboardAwareScrollView>
          <TouchableOpacity onPress={() => {
            this.setState({
              serverSettingPOC: true
            })
          }} style={{ top: 20, position: 'absolute', left: 20 }}>
            <Image style={{ height: 50, width: 50, }} source={require('../../images/logoOutLogin.png')}
            >
            </Image>
          </TouchableOpacity>
          <Loader isLoader={this.state.isLoading}> </Loader>
          <Toast ref="toast" />
        </ImageBackground>



        {/* <Modal
          visible={this.state.serverSettingPOC}
          transparent={true}
          onRequestClose={() => {

            this.setState({ serverSettingPOC: false })

          }}
          animationType='slide'
        >


          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center', alignItems: 'center'


            }}>
            <TouchableOpacity onPress={() => {

              this.setState({ serverSettingPOC: false })

            }} activeOpacity={1} style={{ height: '60%', width: '100%', }}></TouchableOpacity>


            <View style={{ flex: 1, width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>

              <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => {

                  this.setState({ serverSettingPOC: false })

                }}>
                  <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#445FB6', fontWeight: '500', fontFamily: Constant.MontserratBold }}>{''}</Text>
                </TouchableOpacity>
                <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'black', fontWeight: '500', fontFamily: Constant.MontserratRegular }}>{'Server Setting'}</Text>
                <TouchableOpacity onPress={() => {

                  this.setState({ serverSettingPOC: false })

                }
                }>
                  <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#445FB6', fontWeight: '500', fontFamily: Constant.MontserratBold }}>{'Done'}</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{
                backgroundColor: '#ffff', width: '100%', height: '100%',
                // borderTopStartRadius: 20, borderTopEndRadius: 20,
                padding: 20, paddingHorizontal: 12
              }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <CheckBox check={this.state.isRegisterReq}
                  name={'is Register Required'}
                  onPress={(check) => {
                    // this.setState({ isRegisterReq: !check })
                  }}
                />
                <CheckBox check={this.state.serverKey}
                  name={'is Key Set On Server !'}
                  onPress={(check) => {
                    this.setState({ serverKey: !check })
                  }}
                />
                <CheckBox check={this.state.anotherKey}
                  name={'Login From Another ID !'}
                  onPress={(check) => {
                    this.setState({ anotherKey: !check })
                  }}
                />

               



                <View style={{ marginBottom: 30 }}></View>

              </ScrollView>
            </View>

          </View>

        </Modal> */}
      </>

    )
  }
}

const removeEmojis = (string) => {
  // emoji regex from the emoji-regex library
  const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

  return string.replace(regex, '')
}


export default Login;

//  
//      