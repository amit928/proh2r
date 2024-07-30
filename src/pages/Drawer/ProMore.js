import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';

import Loader from '../../components/Loader';
import Toast, {DURATION} from 'react-native-easy-toast';
import Nav from '../../components/NavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class ProMore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moreArr: [
        {
          img: require('../../images/more-privacy_policy.png'),
          title: 'Privacy Policy',
        },
        {
          img: require('../../images/more-T&C.png'),
          title: 'Terms & Conditions',
        },
        {
          img: require('../../images/more-logout.png'),
          title: 'Logout',
        },
        {
          img: require('../../images/notification.png'),
          title: 'Notification',
        },
      ],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Nav title="More" backHidden={true}></Nav>
        {/* <View style={{width:'100%',height:40,backgroundColor:'rgba(78,96,238,1.0)'}}></View>   */}

        <TouchableOpacity
          style={{
            height: 100,
            width: '100%',
            backgroundColor: 'rgba(239,240,241,1.0),',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => this.props.btnActions(0)}>
          <Image
            style={{
              marginLeft: 16,
              height: 75,
              width: 75,
              borderRadius: 37.5,
              resizeMode: 'cover',
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
            source={
              this.props.profilePic == '' ||
              this.props.profilePic == 'null' ||
              this.props.profilePic == null
                ? require('../../images/user.jpeg')
                : {uri: this.props.profilePic}
            }></Image>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              marginLeft: 16,
              flex: 1,
            }}>
            {this.props.empName}
          </Text>
          <Image
            style={{
              width: 16,
              height: 16,
              resizeMode: 'contain',
              marginRight: 16,
            }}
            source={require('../../images/rightGray.png')}></Image>
        </TouchableOpacity>
        {this.state.moreArr.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => this.props.btnActions(index + 1)}>
              <Image
                style={{
                  marginLeft: 16,
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                }}
                source={item.img}></Image>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 15,
                  color: 'black',
                  marginLeft: 16,
                  flex: 1,
                }}>
                {item.title}
              </Text>
              <Image
                style={{
                  width: 16,
                  height: 16,
                  resizeMode: 'contain',
                  justifyContent: 'flex-end',
                  marginRight: 16,
                }}
                source={require('../../images/rightGray.png')}></Image>
            </TouchableOpacity>
            <View
              style={{
                alignSelf: 'center',
                height: 1,
                backgroundColor: 'rgba(241,242,243,1.0)',
                width: '80%',
              }}></View>
          </View>
        ))}
        <Text allowFontScaling={false} 
          style={{
            fontSize: 12,
            position: 'absolute',
            bottom: 16,
            fontFamily: Constant.MontserratRegular,
            color: 'black',
            alignSelf: 'center',
          }}>
          {Constant.getAppVersion(Platform.OS)}
        </Text>
      </View>
    );
  }
}
