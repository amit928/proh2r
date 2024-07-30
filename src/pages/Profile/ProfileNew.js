import React from 'react';
import { Keyboard, Text, View, TouchableOpacity, StyleSheet, Image, Modal, ImageBackground, Platform, ScrollView, Linking, Vibration } from 'react-native';
import { AppRegistry, FlatList, Alert, Dimensions } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';

import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Nav from '../../components/NavBar';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Utility from '../../Externel Constant/Utility';
import ImageView from "react-native-image-viewing";
import { COLORS } from '../../Constant/Index';

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
    height: 270,

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
    console.log('Details', this.props.route.params.obj);
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

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

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
              <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratBold, fontSize: 17, textAlign: 'center', width: '100%', marginTop: 17, color: 'white' }}>Profile Detail</Text>
            </View>
            <View style={{ flex: 3, alignItems: 'flex-end' }}>

            </View>

          </View>

          <View style={styles.firstView}>


            {/* <TouchableOpacity
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

            <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratBold, color: 'white', fontSize: 16, paddingTop: 20, textAlign: 'center', width: '100%', paddingBottom: 8 }}>{this.state.itemObj.empFirstName}{this.state.itemObj.empMiddleName} {this.state.itemObj.empLastName}</Text>
            <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'white', fontSize: 15, textAlign: 'center', paddingBottom: 20, width: '100%' }}>{this.state.itemObj.position}</Text> */}

          </View>

        </ImageBackground>


        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
          style={[{ width: windowWidth, marginTop: -250, }]}>

          <View style={[styles.basicInfo, { backgroundColor: 'white', marginTop: 30, borderRadius: 10, width: windowWidth - 22, }]}>





            <View style={{ backgroundColor: '#F4BE2C', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
              <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 15, width: '100%', paddingLeft: 16, color: 'white' }}>Basic Information</Text>
            </View>

            <View style={{
              width: windowWidth - 22, paddingLeft: 16, marginTop: 10
              // backgroundColor: 'red' 
            }}>

              <View style={{
                flexDirection: 'row', width: windowWidth - 38,
                //  backgroundColor: 'green'
              }}>


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
                      width: 90, height: 90, resizeMode: 'cover',
                      alignItems: "center", borderRadius: 55, borderWidth: 1, borderColor: 'white'
                    }} >


                  </Image>
                </TouchableOpacity>

                <View style={{
                  flexDirection: 'column', marginLeft: 10,
                  //  backgroundColor: 'blue', 
                  width: windowWidth - 138
                }}>

                  <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratBold, color: 'black', fontSize: 16, paddingTop: 10, textAlign: 'left', paddingBottom: 0 }}>{this.state.itemObj.empFirstName}{this.state.itemObj.empMiddleName} {this.state.itemObj.empLastName} </Text>
                  <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'black', fontSize: 15, textAlign: 'left', paddingBottom: 0, width: '100%' }}>{this.state.itemObj.empCode}</Text>
                  <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'black', fontSize: 15, textAlign: 'left', paddingBottom: 0, width: '100%' }}>{this.state.itemObj.position}</Text>
                </View>


              </View>

              <View style={{ backgroundColor: '#d9d9d9', width: windowWidth - 50, height: 0.7, alignSelf: 'center', marginVertical: 15, right: 10 }}>

              </View>

              <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>EMAIL:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: '#4d4dff', fontSize: 13, paddingBottom: 15 }}>{this.state.itemObj.empEmail}</Text>
              </View>

              {/* <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, paddingBottom: 2, paddingTop: 5 }}>Designation:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 5 }}>{this.state.itemObj.position}</Text>
              </View> */}

              <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>MANAGER:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.itemObj.empJobInfoSupervisor}</Text>
              </View>

              <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>DEPRATMENT:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.itemObj.empJobInfoDepartment}</Text>
              </View>

              <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>JOB LOCATION</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.itemObj.empJobInfoLocation}</Text>
              </View>

              <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>CONTACT:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.itemObj.empMobileNumber}</Text>
              </View>

              <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>DATE OF BIRTH:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.itemObj.empDOB}</Text>
              </View>

              <View style={{ height: 10 }}>

              </View>

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

        <View style={{
          justifyContent: 'center', alignItems: 'center', 
          // backgroundColor: 'white',
           height: 50, borderRadius: 27,
          //  marginLeft: 30, marginRight: 30,
          bottom: 20
        }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            // backgroundColor: COLORS.FormBGColor, 
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            margin: 2,
            elevation: 2,
            borderRadius: 25

          }}>
            <TouchableOpacity style={styles.btn} onPress={() => this.callAction()}>
              <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('../../images/callNew.png')}></Image>
            </TouchableOpacity>
            <View style={{ width: 0.5, height: 25, backgroundColor: 'white' }}></View>
            <TouchableOpacity style={styles.btn} onPress={() => this.emailAction()}>
              <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('../../images/mailNew.png')}></Image>

            </TouchableOpacity>
            <View style={{ width: 0.5, height: 25, backgroundColor: 'white' }}></View>
            <TouchableOpacity style={styles.btn} onPress={() => this.whatsAppAction()}>
              <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('../../images/whatsappNew.png')}></Image>

            </TouchableOpacity>
          </View>
        </View>
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



  smsAction() {

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
                phoneNumber = `sms:+91${this.state.itemObj.empMobileNumber}`;
              }
              else {
                phoneNumber = `sms:+91${this.state.itemObj.empMobileNumber}`;
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


}