import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage, Modal, Image, ImageBackground, Platform, Alert
} from 'react-native';

import KeyStore from '../../Store/LocalKeyStore';

import NetInfo from "@react-native-community/netinfo";
// import {
//   isDeveloperModeEnabled,
//   openDeveloperSettings,
// } from 'react-native-developer-options';

// const result = await isDeveloperModeEnabled();

let unsubscribe;

//import { Network } from "react-native";

class InitialScreen extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {

    // if (result === true) {
    //   Alert.alert("Hio")
    // }
    // else{
    //   Alert.alert("Yo")
    // }

    if (Platform.OS=='ios') {
      StatusBar.setHidden(true);
      
    }

    else{
      StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('#5755F4')
    }

    const { navigate } = this.props.navigation;

    // setTimeout(() =>


    //   KeyStore.getKey('loginKey', (err, value) => {

    //     if (value) {

    //       //  this.setState({token:value})
    //       navigate('TabBar', { name: '' })

    //     } else {
    //       KeyStore.getKey('previousLogin', (err, value) => {
    //         if (value) {
    //           navigate('RealmAuth', { name: '' })
    //           // navigate('Login', {name: ''})

    //         } else {
    //           navigate('RealmAuth', { name: '' })
    //         }
    //       })

    //     }
    //   }


    //   )

    //   , 2000)

    console.log('First Time')

    unsubscribe = this.props.navigation.addListener('focus', () => {


      console.log('Second Time')


      setTimeout(() =>


        KeyStore.getKey('loginKey', (err, value) => {

          if (value) {

            //  this.setState({token:value})
            navigate('TabBar', { name: '' })

          } else {
            KeyStore.getKey('previousLogin', (err, value) => {
              if (value) {
                navigate('RealmAuth', { name: '' })
                // navigate('Login', {name: ''})

              } else {
                navigate('RealmAuth', { name: '' })
              }
            })

          }
        }


        )

        , 2000)

        console.log(this.props.navigation.addListener);

    });


  }


  componentWillUnmount() {
    unsubscribe();
  }

  static navigationOptions = {
    //  title: '',
    header: null,
    gesturesEnabled: false,
    // drawerLockMode: 'locked-closed',
    disableGestures: true
  }

  render() {

    return (

      <ImageBackground source={require('../../images/splash.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image style={{ height: '25%', width: '65%', resizeMode: 'contain' }} source={require('../../images/splash1.png')}>

        </Image>
        <Image style={{ height: '25%', width: '70%', flex: 3, resizeMode: 'contain', marginTop: 40 }} source={require('../../images/splash2.png')}>

        </Image>
        <Image style={{ height: '25%', width: '65%', flex: 3, resizeMode: 'contain' }} source={require('../../images/splash3.png')}>

        </Image>
      </ImageBackground>


    )
  }
}

export default InitialScreen;