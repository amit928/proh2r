import React from 'react';
import { Keyboard, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, ImageBackground, Platform, ScrollView, Linking, Vibration } from 'react-native';
import { AppRegistry, FlatList, Alert } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';

import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Nav from '../../components/NavBar';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Utility from '../../Externel Constant/Utility';
import ImageView from "react-native-image-viewing";

const styles = StyleSheet.create({

  container: {

    backgroundColor: 'rgba(223,234,245,0.3)',
    height: "100%",
    alignItems: 'center',
    width: '100%'
  },

  btn: {
    height: 42, flex: 3, justifyContent: 'center', alignItems: 'center'

  },

  basicInfo: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },

  socialInfo: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(68,82,231,1.0)', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    margin: 2,
    elevation: 2,
    borderRadius: 25

  },

  firstView: {
    width: "100%",
    height: 230,

    alignItems: 'center',

  },

})


export default class ProfileDetail extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      title: '',
      itemObj: {},
      visible: false,


    }
    this.images = []
  }

  componentDidMount() {

    //this.setState({itemObj:this.props.navigation.getParam('obj')})
    this.setState({ itemObj: this.props.route.params.obj })
  }

  isImageNotPresent() {

    if (this.state.itemObj.empProfilePhoto == "" || this.state.itemObj.empProfilePhoto == 'null'
      || this.state.itemObj.empProfilePhoto == null || this.state.itemObj.empProfilePhoto == 'https://s3.ap-south-1.amazonaws.com/proh2r/' || this.state.itemObj.docId == null) {

      return true

    }

    else {
      return false
    }



  }

  render() {

    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (

      <View style={styles.container}>
        {/* <Nav title="Profile Detail" backAction={()=>goBack()}></Nav> */}

        {/* <ImageBackground style={{height:200,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'white'}} source={require('../../images/dottedBackgroud.png')}>
                 <View style={{width: 120, height: 120,
                  alignItems: "center", borderRadius: 60,backgroundColor:'white',justifyContent:'center'}}>  
                <Image source={ require('../../images/user.jpeg')} style={{
                  width: 100, height: 100, 
                  alignItems: "center", borderRadius: 50,borderWidth:1,borderColor:'white'
                }} source={(this.state.itemObj.empProfilePhoto == "" || this.state.itemObj.empProfilePhoto == 'null'
                 || this.state.itemObj.empProfilePhoto == null || this.state.itemObj.empProfilePhoto == 'https://s3.ap-south-1.amazonaws.com/proh2r/' || this.state.itemObj.docId == null)  ? require('../../images/user.jpeg')  
                :  {uri:this.state.itemObj.empProfilePhoto}}>
                </Image>
                </View> 
        </ImageBackground> */}
        <ImageBackground style={{ width: '100%' }} source={require('../../images/dashHeader.jpg')}>

          <View style={{ height: 80, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <View style={{ flex: 3, alignItems: 'flex-end' }}>


              <TouchableOpacity style={{ height: 75, width: 75, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => goBack()}>
                <Image source={require('../../images/back.png')} style={{ height: 30, width: 30, resizeMode: 'contain', marginTop: 16 }} />

              </TouchableOpacity>

            </View>

            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, fontSize: 17, textAlign: 'center', width: '100%', marginTop: 17, color: 'white' }}>Profile Detail</Text>
            </View>
            <View style={{ flex: 3, alignItems: 'flex-end' }}>

            </View>

          </View>

          <View style={styles.firstView}>


            <TouchableOpacity
              activeOpacity={this.isImageNotPresent() ? 1 : 0}
              onPress={() => {

                if (this.isImageNotPresent()) {

                  console.log('Image Not Found !');



                }

                else {

                  console.log('Showing Image !');

                  this.images.push({ uri: this.state.itemObj.empProfilePhoto })

                  this.setState({ visible: true })

                }



              }}
            >
              <Image source={this.isImageNotPresent() ? require('../../images/user.jpeg')
                : { uri: this.state.itemObj.empProfilePhoto }} style={{
                  width: 110, height: 110, resizeMode: 'cover',
                  alignItems: "center", borderRadius: 55, borderWidth: 1, borderColor: 'white'
                }} >


              </Image>
            </TouchableOpacity>

            <Text style={{ fontFamily: Constant.MontserratBold, color: 'white', fontSize: 16, paddingTop: 20, textAlign: 'center', width: '100%', paddingBottom: 8 }}>{this.state.itemObj.empFirstName}{this.state.itemObj.empMiddleName} {this.state.itemObj.empLastName}</Text>
            <Text style={{ fontFamily: Constant.MontserratMedium, color: 'white', fontSize: 15, textAlign: 'center', paddingBottom: 20, width: '100%' }}>{this.state.itemObj.position}</Text>

          </View>

        </ImageBackground>


        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
          style={[{ width: '90%', marginTop: -50 }]}>

          <View style={[styles.basicInfo, { backgroundColor: 'white', marginTop: 30, borderRadius: 10 }]}>


            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 45, borderRadius: 27, marginLeft: 30, marginRight: 30, bottom: 20 }}>
              <View style={styles.socialInfo}>
                <TouchableOpacity style={styles.btn} onPress={() => this.callAction()}>
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/phone.png')}></Image>
                </TouchableOpacity>
                <View style={{ width: 0.5, height: 25, backgroundColor: 'white' }}></View>
                <TouchableOpacity style={styles.btn} onPress={() => this.emailAction()}>
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/mailRed.png')}></Image>

                </TouchableOpacity>
                <View style={{ width: 0.5, height: 25, backgroundColor: 'white' }}></View>
                <TouchableOpacity style={styles.btn} onPress={() => this.whatsAppAction()}>
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/whatsapp.png')}></Image>

                </TouchableOpacity>
              </View>
            </View>


            <Text style={{ fontFamily: Constant.MontserratRegular, fontSize: 17, width: '100%', paddingLeft: 16, paddingBottom: 16 }}>Basic Information</Text>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, padding: 10, paddingLeft: 16 }}>Email:</Text>
              <Text style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, padding: 10, textAlign: 'right' }}>{this.state.itemObj.empEmail}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, padding: 10, paddingLeft: 16 }}>Designation:</Text>
              <Text style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, padding: 10, textAlign: 'right' }}>{this.state.itemObj.position}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, padding: 10, paddingLeft: 16 }}>Department:</Text>
              <Text style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, padding: 10, textAlign: 'right' }}>{this.state.itemObj.empJobInfoDepartment}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, padding: 10, paddingLeft: 16 }}>Job Location:</Text>
              <Text style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, padding: 10, textAlign: 'right' }}>{this.state.itemObj.empJobInfoLocation}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, padding: 10, paddingLeft: 16 }}>Contact:</Text>
              <Text style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, padding: 10, textAlign: 'right' }}>{this.state.itemObj.empMobileNumber}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, padding: 10, paddingLeft: 16 }}>DOB:</Text>
              <Text style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, padding: 10, textAlign: 'right', paddingBottom: 20 }}>{this.state.itemObj.empDOB}</Text>
            </View>

          </View>


        </ScrollView>
        <ImageView
          images={this.images}
          imageIndex={0}
          visible={this.state.visible}
          onRequestClose={() => {

            this.images.pop()


            // console.log('higfyfsyuddguygjds');
            this.setState({ visible: false })
          }}
        />
      </View>

    );
  }


  callAction() {

    if (this.state.itemObj.empMobileNumber == '') {
      Alert.alert('', 'Phone number not found.')

      Vibration.vibrate()
    } else {

      Alert.alert(
        'Contact to ' + this.state.itemObj.empName,
        'Do you want to make phone call to ' + this.state.itemObj.empName,
        [
          {
            text: 'Cancel'
          },

          {
            text: 'OK', onPress: () => {

              if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${this.state.itemObj.empMobileNumber}`;
              }
              else {
                phoneNumber = `tel:${this.state.itemObj.empMobileNumber}`;
              }
              Linking.canOpenURL(phoneNumber)
                .then(supported => {
                  if (!supported) {
                    Alert.alert('Phone number is not available');
                  } else {
                    return Linking.openURL(phoneNumber);
                  }

                })
                .catch(err => console.log(err));
            }
          },
        ],
        { cancelable: false },
      );
    }
  }

  emailAction() {
    if (this.state.itemObj.empEmail == '') {
      Alert.alert('', 'Email ID not found.')

      Vibration.vibrate()
    } else {

      Utility.sendEmailViaEmailApp(this.state.itemObj.empEmail)
    }
  }

  whatsAppAction() {
    if (this.state.itemObj.empMobileNumber == '') {
      Alert.alert('', 'Phone number not found.')

      Vibration.vibrate()
    } else {
      let link = 'whatsapp://send?text=&phone=91' + this.state.itemObj.empMobileNumber
      Utility.sendWhatsAppMessage(link)

    }
  }
}