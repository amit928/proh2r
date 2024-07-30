import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Constant from '../Constant/Constants';

export default class NavBar extends Component {
  render() {
    const {
      title,
      backHidden,
      backAction,
      isRightBtn,
      rightAction,
      rightImg,
      isMyAttenadanceRightBtn,
      month,
      showPicker,
      isSearchBtn,
      isSearchBtnAction
    } = this.props;
    return (
      <ImageBackground
        style={{
          height: 80,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          
        }}
        source={require('../images/navBarImg.jpg')}>
        <View style={{flex: 3, alignItems: 'flex-end'}}>
          {backHidden ? (
            <></>
          ) : (
            
            <TouchableOpacity
              style={{
                height: 64,
                width: 75,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={backAction}>
              <Image
                source={require('../images/arrowLeftThick.png')}
                style={{
                  height: 17,
                  width: 17,
                  resizeMode: 'contain',
                  marginTop: 16,
                  // transform: [{ rotate: '90deg' }],
                  tintColor: 'white',
                  right: 10
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{flex: 10, alignItems: 'center',}}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratMedium,
              fontSize: 16,
              textAlign: 'center',
              width: '100%',
              marginTop: 17,
              color: 'white',
              // right: 70
            }}>
            {String(title).toUpperCase()}
          </Text>
        </View>
        <View style={{flex: 3, alignItems: 'flex-end', }}>
          {isRightBtn ? (
            <View style={{flexDirection: 'row'}}>

              {isSearchBtn ?
            <TouchableOpacity
              style={{
                // height: 75,
                // width: 75,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={()=>isSearchBtnAction()}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  marginTop: 16,
                }}
                source={require('../images/searchTab.png')}
              />
            </TouchableOpacity>

            :

             <></> }

            <TouchableOpacity
              style={{
                height: 55,
                width: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={rightAction}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  marginTop: 16,
                }}
                source={rightImg}
              />
            </TouchableOpacity>
            </View>
            
          ) : (
            <></>
          )}

          {isMyAttenadanceRightBtn == 'My Attendance' ? (
            <View
              style={{
                height: 75,
                width: 75,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 4,
                  marginRight: 6,
                }}
                onPress={showPicker}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratBold,
                    color: 'white',
                    fontSize: 11,
                    marginTop: 30,
                    textAlign: 'center',
                  }}>
                  {month}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'rgba(155,186,229,1.0)',
                  height: 1,
                  width: '90%',
                  marginRight: 6,
                }}></View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ImageBackground>
    );
  }
}
