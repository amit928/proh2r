
import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import GlobalStore from './ReduxStore';
import { Alert, BackHandler, AppState, Platform, Vibration, NativeModules, Linking } from 'react-native';
import { isDeveloperOptionOn } from './src/pages/Learning/DeveloperOption';
import LocalKeyStore from './src/Store/LocalKeyStore';
import { isDeveloperOptionsEnabled } from '@adityaindiadev/react-native-developer-options-android';
import * as Constant from './src/Constant/Constants';



const App = () => {


  const appState = useRef(AppState.currentState);

  const [authDict, setauthDict] = useState({})



  const handleResult = (isEnabled) => {
    console.log('Developer Options Enabled', isEnabled);

    const DEVTEXT = 'Turn off Developer Options to securely access the App and enhanced user experience !'

    isEnabled && Alert.alert(
      'Warning !',
      DEVTEXT,
      [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel'
        // },
        {
          text: 'OK',
          onPress: () => {
            if (__DEV__) {
              console.log('I am in debug');

            } else {
              BackHandler.exitApp();
            }
          }
        }
      ],
      { cancelable: false },
    );





  };


  async function checkLoginStatus(authDict) {

    console.log("checkLoginStatus start", authDict);

    const url = Constant.BASE_URL + "employee/profile/checkLoginStatus";
    // this.setState({ loading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',

        headers: Constant.getHeader(authDict),
      });

      // this.setState({ loading: false });

      let code = await response.status;
      console.log("checkLoginStatus url", url, code);
      if (code == 200) {
        let responseJson = await response.json();
        console.log('checkLoginStatus', responseJson)

        if (responseJson?.isLoginAllow == false) {

          logOutFromAnywhere(authDict)

        }

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message);
      } else if (code == 401 || code == 503) {
        // Utility.logoutOnError(authDict, this.props.navigation);
        Alert.alert("Something Went Wrong !");
      } else {

        console.log('checkLoginStatus Else', response);
        // console.log('response.json()',await response.text());



        // Alert.alert("Server Problem ! ", String(code))
        //  this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      // this.setState({ loading: false });
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  function logOutFromAnywhere(authDict) {
    // const { navigation } = this.props;

    LocalKeyStore.setKey('loginKey', null);

    authDict.accessToken = '';
    authDict.employeeCode = '';
    LocalKeyStore.setKey('authDict', authDict);
    LocalKeyStore.setKey('fcmToken', null)

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

  async function EmulatorRootDetection() {
    return await NativeModules.EmulatorRootDetection.isEmulatedAndRooted()
  }

  function checkDeveloperOption() {
    if (Platform.OS == 'android') {
      isDeveloperOptionsEnabled(handleResult)
    }
  }

  function updateVersionOfApplication(openUrl) {

    Alert.alert(
      'Update Available',
      'Please update ProH2R application for better experience.',
      [
        {
          text: 'OK',
          onPress: () => {
            LocalKeyStore.setKey('loginKey', null);

            // let authDict = authDict;
            // authDict.accessToken = '';
            // authDict.employeeCode = '';
            // LocalKeyStore.setKey('authDict', authDict);
            LocalKeyStore.setKey('authDict', {});
            Linking.openURL(openUrl);

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

  async function getRelamInfo(realmName) {
    var url = Constant.BASE_URL + Constant.GET_REALM_INFO + realmName;

    console.log("getRelamInfo", realmName);

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



            updateVersionOfApplication(
              'https://play.google.com/store/apps/details?id=com.proh2r',
            );

            if (Constant.androidPreviousVersion != androidVersion) {

              updateVersionOfApplication(
                'https://play.google.com/store/apps/details?id=com.proh2r',
              );

            }

          }
        } else {
          if (Constant.iosVersion != iosVersion) {



            updateVersionOfApplication(
              'https://apps.apple.com/in/app/proh2r/id1494439507',
            );

            if (Constant.iosPreviousVersion != iosVersion) {

              updateVersionOfApplication(
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
      // this.setState({ isLoading: false });
      console.error(error);
    }
  }


  useEffect(() => {

    // console.log("App.js Executed !", NativeModules);
    // EmulatorRootDetection().then((val)=>{
    //   console.log("EmulatorRootDetection", val);
    //   Alert.alert(JSON.stringify(val))
    //  })

    LocalKeyStore.getKey('authDict', (err, value) => {
      if (value) {

        if (value.accessToken != '') {
          setauthDict(value)
          checkLoginStatus(value)
          // getRelamInfo(value.realmKey)
          
        }



      }
    });

    // if (Platform.OS == 'android') {

    // isDeveloperOptionOn(handleResult)
    // isDeveloperOptionsEnabled(handleResult)
    checkDeveloperOption()

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        // isDeveloperOptionOn(handleResult)
        // isDeveloperOptionsEnabled(handleResult)
        checkDeveloperOption()
        

        LocalKeyStore.getKey('authDict', (err, value) => {
          if (value) {
    
            if (value.accessToken != '') {
              // getRelamInfo(value.realmKey)
              
            }
    
    
    
          }
        });

      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    // }

    return () => {
      // if (Platform.OS == 'android') {
      subscription.remove();
      // }
    };





  }, [])

  return (
    <>


      <Provider store={GlobalStore}>
        <AppNavigation />
      </Provider>
    </>


  );
}
export default App;
