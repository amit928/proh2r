import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AppState,
  Alert
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import styles from './Application.container.styles';
import FingerprintPopup from './FingerprintPopup.component';

// var TouchID = require('react-native-touch-id');

import TouchID from "react-native-touch-id";

class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      biometric: undefined,
      popupShowed: false
    };
  }

  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true });
    console.log(this.state.popupShowed);
  };

  handleFingerprintDismissed = (error) => {
    this.setState({ popupShowed: false });
    console.log('handleFingerprintDismissed', error);
    Alert.alert('Fingerprint Authentication', error.message);
  };

  handleSuccess = () =>{
    console.log('handleSuccess')
    Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
    this.setState({ popupShowed: false });

  }



  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // Get initial fingerprint enrolled
    this.detectFingerprintAvailable();
    // this.isTouchIDSupported();
    // this.isFaceIDSupported();
  }

  isTouchIDSupported() {

    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'TouchID') {
          console.log('TouchID is supported.');

        } else {
          console.log('FaceID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        console.log('isTouchIDSupported', error.details);
      });

  }

  isFaceIDSupported() {

    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }

    const optionalConfigObject2 = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {

          console.log('FaceID is supported. ', biometryType);

          TouchID.authenticate('Authenticate with Face ID',optionalConfigObject2)
            .then(success => {

              Alert.alert('Authentication successful')
              // Authentication successful
            })
            .catch(error => {
              Alert.alert('Authentication failed')
              // Authentication failed
            });
        } else {
          Alert.alert('FaceID is not supported.')
          // console.log('TouchID is supported.');
          console.log('FaceID is not supported.');
        }
      })
      .catch(error => {
        // Failure code
        Alert.alert(error.name, error.message)
        console.log('isFaceIDSupported', error);
      });

  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  detectFingerprintAvailable = () => {
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => {
        this.setState({ errorMessage: error.message, biometric: error.biometric })
        console.log('isSensorAvailable', error);
      });
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      FingerprintScanner.release();
      this.detectFingerprintAvailable();
    }
    this.setState({ appState: nextAppState });
  }

  render() {
    const { errorMessage, biometric, popupShowed } = this.state;

    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.fingerprint}
          onPress={this.isFaceIDSupported}
        // disabled={!!errorMessage}
        >
          <Image source={require('../../images/closeEye.png')} />
        </TouchableOpacity>

        <Text  allowFontScaling={false} style={styles.heading}>
          React Native Fingerprint Scanner
        </Text>
        



        <TouchableOpacity
          style={styles.fingerprint}
          onPress={this.handleFingerprintShowed}
          disabled={!!errorMessage}
        >
          <Image source={require('./assets/finger_print.png')} />
        </TouchableOpacity>

        {errorMessage && (
          <Text allowFontScaling={false}  style={styles.errorMessage}>
            {errorMessage} {biometric}
          </Text>
        )}

        {popupShowed && (
          <FingerprintPopup
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
            handleSuccess={this.handleSuccess}
          />
        )}

      </View>
    );
  }
}

export default Application;
