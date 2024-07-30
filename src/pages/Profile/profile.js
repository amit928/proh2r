import React from 'react';
import { Keyboard, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Button, Picker, Modal, ImageBackground, Platform, ScrollView, TextInput, Vibration } from 'react-native';
import { AppRegistry, FlatList, Alert } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';

import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';
import CustomPicker from '../../components/CustomPicker';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Utility from '../../Externel Constant/Utility';
import { Shadow } from 'react-native-shadow-2';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { COLORS } from '../../Constant/Index';
import SubmitBtnWide from '../../components/SubmitBtnWide';
import CancelBtnWide from '../../components/CancelBtnWide';
import CustomTextField from '../../components/CustomTextField';
import CustomDateDesign from '../../components/CustomDateDesign';
import CustomStaticTextField from '../../components/CustomStaticTextField';
import Clipboard from '@react-native-clipboard/clipboard';

const styles = StyleSheet.create({

  container: {

    backgroundColor: 'rgba(223,234,245,0.3)',
    height: "100%",
    alignItems: 'center',
    width: '100%'
  },

  firstView: {
    width: "100%",

    alignItems: 'center',
    justifyContent: 'center'

  },

  titleView: { fontFamily: Constant.MontserratRegular, fontSize: 13, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 },


  editBtn: {
    // backgroundColor: 'white'
    // // 'rgba(242,242,242,1.0)'
    // , height: 40, width: "40%", justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row', borderColor: 'rgba(68,102,179,1.0)', borderWidth: 0.8
    backgroundColor: 'white'
    // 'rgba(242,242,242,1.0)'
    , height: 40, width: 130, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row', borderColor: 'rgba(68,102,179,1.0)', borderWidth: 1
  },

  saveBtn:
  {
    backgroundColor: 'white'
    // 'rgba(242,242,242,1.0)'
    , height: 40, width: 130, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row', borderColor: 'rgba(68,102,179,1.0)', borderWidth: 1
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
  // { backgroundColor: 'rgba(86,105,233,1.0)', height: 40, width: "50%", justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
}
)

const checkNull = (value) => {

  if (value == null || value == "null") {
    return ""
  }
  else {
    return value
  }
}

const createFormData = (photo) => {
  // const data = new FormData();
  var fileName = Math.floor(Math.random() * 100) + 1;
  const formdata = new FormData();
  formdata.append("file", {
    uri: Platform.OS === "android" ? photo.path : photo.path.replace("file://", ""),
    type: 'image/png',
    name: fileName + '.png',
  }
  );
  // data.append("file", {

  //   name: fileName + '.jpg',//photo.fileName,
  //   type: photo.type,
  //   uri:Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  // });
  return formdata;
};

export default class Profile extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      isDateTimePickerVisible: false,
      isclick: true,
      isEdit: false,
      editButtonTitle: 'Edit',
      filePath: {},
      isPicked: false,
      showGenderPIcker: false,
      employeeCode: '',
      token: '',
      isLoading: false,
      imageFilePath: {},
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      gender: '',
      gender: 'Select Gender',
      dob: 'Select DOB',
      fieldArr: [],
      checkPass: '',
      authDict: {},
      pickerArr: ['Male', 'Female'],
      employeePosition: '',
      employeeName: '',
      openEditModal: false

    }
  }

  componentDidMount() {

    //const profilePicUrl = this.props.navigation.getParam('profilePicUrl') 
    const profilePicUrl = this.props.route.params.profilePicUrl

    this.setState({ profilePicUrl: profilePicUrl })

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.fetchProfileHeaderDetails()
        this.fetchProfileDetails()
      }
    });
  }

  componentWillUnmount() {

    // this.props.navigation.state.params.updateData();

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 12,
          width: "100%",
        }}
      />
    );
  };

  getTextStyle() {

    if (this.state.isEdit) {
      return {
        color: 'black',
        fontSize: 12,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, marginRight: 8,
        width: '50%',
        textAlign: 'left',
        fontFamily: Constant.MontserratRegular,
      }
    }
    else {
      return {
        color: 'black',
        fontSize: 12,
        marginRight: 8,
        paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
        textAlign: 'left',
        fontFamily: Constant.MontserratRegular,
      }
    }
  }

  editToggleAction = (value) => {


    this.setState({ isEdit: !this.state.isEdit });
    console.log(value)

    const { navigate } = this.props.navigation;

    if (value == 'genderClick' && this.state.isEdit == true) {
      this.setState({ showGenderPIcker: true });

    } else if (value == 'editButton') {

      if (this.state.isEdit) {


        this.uploadUserData()

      }

      else {

      }
      this.setState({ isEdit: !this.state.isEdit });

    } else {

    }
  }

  getListViewItem = (item) => {

    Alert.alert(item.key);
  }

  // Date Picker Function

  showDateTimePicker() {

    console.log("showDateTimePicker");
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false

    });
  };

  handleDatePicked = date => {

    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('YYYY-MM-DD')

    this.setState({ dob: String(pickedDt) });

    this.hideDateTimePicker();
  };

  getSelectedPickerValue = () => {

    Alert.alert("Selected country is : " + this.state.gender);
  }


  chooseFile = () => {


    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(response => {
      console.log(response);
      let source = response;
      this.setState({
        filePath: source,
        isPicked: true, imageFilePath: response
      });
      this.uploadprofilePhoto()
    }).catch((err) => { console.log("openCamera catch" + err.toString()) });

    // return


    // var options = {
    //   title: 'Select Image',
    //   mediaType: 'photo',
    //   maxHeight: 200,
    //   maxWidth: 200,
    //   quality: 0.5,
    //   allowsEditing: true,
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };

    // ImagePicker.launchImageLibrary(options, (response) => {

    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     console.log(response);
    //     let source = response.assets[0];
    //     this.setState({
    //       filePath: source,
    //       isPicked: true, imageFilePath: response.assets[0]
    //     });
    //     this.uploadprofilePhoto()
    //   }
    // });



  };

  //WEB API CALL

  async fetchProfileDetails() {
    const { navigate } = this.props.navigation;

    var restUrl = this.state.authDict.employeeCode + '/PersonalDetails'
    var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA + restUrl
    this.setState({ isLoading: true })

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 200) {

        let responseJson = await response.json();
        console.log('FETCH_PROFILE_HEADER_DATA', responseJson);
        // this.setState({ profilePicUrl: responseJson.docId })
        let fieldArr = responseJson.sections[0].fields
        this.setState({ fieldArr: fieldArr })
        console.log(responseJson)
        for (let i = 0; i < fieldArr.length; i++) {
          let obj = fieldArr[i]
          if (obj.fieldName == 'empFirstName') {
            this.setState({ firstName: checkNull(obj.fieldValue) })
          } else if (obj.fieldName == 'empLastName') {
            this.setState({ lastName: checkNull(obj.fieldValue) })
          } else if (obj.fieldName == 'empEmail') {
            this.setState({ email: checkNull(obj.fieldValue) })
          } else if (obj.fieldName == 'empMobileNo') {
            this.setState({ mobile: checkNull(obj.fieldValue) })
          } else if (obj.fieldName == 'empDOB') {
            this.setState({ dob: checkNull(obj.fieldValue) })
          } else if (obj.fieldName == 'empGender') {
            this.setState({ gender: checkNull(obj.fieldValue) })
          }
        }

      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message, 5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {

        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {

      console.error(error);
    }
  }

  async fetchProfileHeaderDetails() {

    console.log('fetchProfileHeaderDetails calling');
    var restUrl = this.state.authDict.employeeCode + '/header'
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
        console.log('fetchProfileHeaderDetails', responseJson)
        // this.setState({ profilePicUrl: responseJson.docId })
        this.setState({
          employeeName: responseJson.empName,
          employeePosition: responseJson.positionedAs
        })

        this.setState({ profilePicUrl: responseJson.docId })

      }
      else if (code == 400) {
        let responseJson = await response.json();

      }
      else {
        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      }
    } catch (error) {
      Alert.alert('', "Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }


  async uploadprofilePhoto() {

    var restUrl = this.state.authDict.employeeCode + '/uploadFile'
    var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA + restUrl

    this.setState({ isLoading: true })
    let headers = {
      'Authorization': 'Bearer ' + this.state.authDict.accessToken,
      "realm": this.state.authDict.realmKey,// 'NileRealm',
      "x-tenant-id": this.state.authDict.tanentId,

    }
    try {
      let response = await fetch(url, {
        method: 'POST',
        body: createFormData(this.state.imageFilePath),
        headers: headers
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      console.log(response)
      let responseJSON = await response.json()
      console.log(responseJSON)

      console.log('this is code' + code)
      this.fetchProfileHeaderDetails()
    }

    catch (error) {
      console.log('this is response')

      console.error(error);
    }
  };

  async uploadUserData() {

    var arr = this.state.fieldArr
    const { navigate, goBack } = this.props.navigation;

    for (let i = 0; i < arr.length; i++) {

      let obj = arr[i]

      if (obj.fieldName == 'empFirstName') {
        arr[i].fieldValue = this.state.firstName

      } else if (obj.fieldName == 'empLastName') {
        arr[i].fieldValue = this.state.lastName

      } else if (obj.fieldName == 'empEmail') {
        arr[i].fieldValue = this.state.email

      } else if (obj.fieldName == 'empMobileNo') {
        arr[i].fieldValue = this.state.mobile

      } else if (obj.fieldName == 'empDOB') {
        arr[i].fieldValue = this.state.dob

      } else if (obj.fieldName == 'empGender') {
        arr[i].fieldValue = this.state.gender
      }

      else if (obj.fieldDescription == "Father\'s / Husband\'s Name") {

        arr[i].fieldDescription = "Father's / Husband's Name"

      }

      arr[i]['fieldPlaceholderValue'] = arr[i]['fieldPlaceholder'] // Assign new key 

      delete arr[i]['fieldPlaceholder'];


    }

    var dict = { "sectionId": '1', "sectionName": "Basic Information", "sectionLocation": "PersonalDetails", "accessLevel": "View", "editable": "View", "fields": arr }

    var params = {

      employeeCode: this.state.authDict.employeeCode,
      sections: [dict],

    };
    console.log(params)
    this.setState({ isLoading: true })

    var url = Constant.BASE_URL + Constant.FETCH_PROFILE_HEADER_DATA
    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(
          params
        ),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })
      if (code == 200) {
        Alert.alert('', 'Profile Updated Successfully')
        // this.refs.toast.show('Profile Updated Successfully',5000);
        this.fetchProfileHeaderDetails()
      } else if (code == 400) {
        let responseJson = await response.json();

        this.refs.toast.show(responseJson.message, 5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {

        this.refs.toast.show('Something went wrong!');

      }

    }
    catch (error) {
      console.error(error);
    }
  };

  copyToClipboard(text) {
    Clipboard.setString(text);
    this.setState({ fcmTokenStr: text })
  };

  render() {

    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <>

        <View style={styles.container}>

          <Loader isLoader={this.state.isLoading}/>

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


            </View>

          </ImageBackground>


          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
            style={[{ width: windowWidth, marginTop: -250, }]}>

            <View style={[styles.basicInfo, { backgroundColor: 'white', marginTop: 30, borderRadius: 10, width: windowWidth - 22, }]}>





              <View style={{ backgroundColor: '#F4BE2C', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0,  }}>
                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 15, width: '100%', paddingLeft: 16, color: 'white' }}>Basic Information</Text>

                <TouchableOpacity style={{position: 'absolute', right: 17}} onPress={()=>{this.setState({ openEditModal: true })}}>
                <Image style={{
                    width: 16, height: 16, resizeMode: 'contain', tintColor: 'white'
                    //  '#0d0d0d'
                }} source={require('../../images/edit.png')} />
                </TouchableOpacity>
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
                    // activeOpacity={this.isImageNotPresent() ? 1 : 0}
                    onPress={() => this.chooseFile()}
                  >
                    <Image source={this.state.isPicked ? { uri: this.state.profilePicUrl } : (this.state.profilePicUrl == null || this.state.profilePicUrl == '' || this.state.profilePicUrl == 'null') ? require('../../images/user.jpeg') : { uri: this.state.profilePicUrl }} style={{
                      width: 90, height: 90, resizeMode: 'cover',
                      alignItems: "center", borderRadius: 55, borderWidth: 1, borderColor: 'white'
                    }} >


                    </Image>

                    <Image source={require('../../images/profileCamera.png')} style={{
                      width: 30, height: 30, resizeMode: 'cover', alignSelf: "center", top: -30, left: 35
                    }} />

                  </TouchableOpacity>

                  <View style={{
                    flexDirection: 'column', marginLeft: 10,
                    //  backgroundColor: 'blue', 
                    width: windowWidth - 138
                  }}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, color: 'black', fontSize: 16, paddingTop: 10, textAlign: 'left', paddingBottom: 0 }}>{this.state.employeeName}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: 'black', fontSize: 15, textAlign: 'left', paddingBottom: 0, width: '100%' }}>{this.state.authDict.employeeCode}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: 'black', fontSize: 15, textAlign: 'left', paddingBottom: 0, width: '100%' }}>{this.state.employeePosition}</Text>
                  </View>


                </View>

                <View style={{ backgroundColor: '#d9d9d9', width: windowWidth - 50, height: 0.7, alignSelf: 'center', marginVertical: 15, right: 10 }}>

                </View>

                <View style={{ flexDirection: 'column', width: '100%', }}>
                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>EMAIL:</Text>

                  <View style={{ flexDirection: 'row' }}>
                    <Text allowFontScaling={false} style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: '#4d4dff', fontSize: 13, paddingBottom: 15 }}>{this.state.email}</Text>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { this.copyToClipboard(this.state.email) }}>
                      <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/copy.png')}></Image>
                    </TouchableOpacity>

                  </View>
                </View>

                {/* <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 13, paddingBottom: 2, paddingTop: 5 }}>Designation:</Text>
                <Text  allowFontScaling={false}  style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 5 }}>{this.state.itemObj.position}</Text>
              </View> */}



                <View style={{ flexDirection: 'column', width: '100%', }}>
                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>Mobile Number:</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text allowFontScaling={false} style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.mobile}</Text>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { this.copyToClipboard(this.state.mobile) }}>
                      <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/copy.png')}></Image>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flexDirection: 'column', width: '100%', }}>
                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>Date of Birth:</Text>
                  <Text allowFontScaling={false} style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.dob}</Text>
                </View>

                <View style={{ flexDirection: 'column', width: '100%', }}>
                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: 'gray', fontSize: 10, paddingBottom: 2, paddingTop: 5 }}>Gender</Text>
                  <Text allowFontScaling={false} style={{ flex: 1, fontFamily: Constant.MontserratRegular, color: 'black', fontSize: 13, paddingBottom: 15 }}>{this.state.gender}</Text>
                </View>







              </View>


            </View>

            <View style={{ height: 10, }}>

            </View>

          </ScrollView>



          {/* <View style={{
            justifyContent: 'center', alignItems: 'center',
            // backgroundColor: '#3933ED',
            height: 60, borderRadius: 30,
            //  marginLeft: 30, marginRight: 30,
            // bottom: 30,
            marginBottom: 15,
            width: '90%',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}>
            <CancelBtnWide onPress={() => this.setState({ openEditModal: true })} imgPath={require('../../images/edit.png')} title="Edit Details" />
          </View> */}

          




        </View>

        <Modal
          visible={this.state.openEditModal}
          transparent={true}
          onRequestClose={() => { this.setState({ openEditModal: false }) }}
          // style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          animationType='slide'
        >
          <>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center', alignItems: 'center'


              }}>
              <TouchableOpacity onPress={() => this.setState({ openEditModal: false })} activeOpacity={1} style={{ height: '40%', width: '100%', }}></TouchableOpacity>




              <View style={{ flex: 1, width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>

                <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#F6F4FB', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row', paddingHorizontal: 12 }}>



                  <TouchableOpacity onPress={() => {
                    this.uploadUserData()
                    this.setState({ openEditModal: false })
                  }} style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>

                    <Image style={{
                      width: 20, height: 20, resizeMode: 'contain', tintColor: "#1e9603"
                      // marginLeft: 30,

                    }} source={require('../../images/approvePopup.png')} />

                    <Text allowFontScaling={false} style={{
                      alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#1e9603', fontFamily: Constant.MontserratRegular, marginLeft: 5
                      // fontWeight: 'bold'
                    }}>{'Save'}</Text>

                  </TouchableOpacity>



                  <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'black', fontWeight: '500', fontFamily: Constant.MontserratRegular }}>{'View Application'}</Text>


                  <TouchableOpacity onPress={() => { this.setState({ openEditModal: false }) }} style={{ width: 70, height: 30, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                    <Image style={{
                      width: 19, height: 19, resizeMode: 'contain', tintColor: '#c10b0b'
                      // marginLeft: 30,

                    }} source={require('../../images/rejectPopup.png')} />

                    <Text allowFontScaling={false} style={{
                      alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#c10b0b', fontFamily: Constant.MontserratRegular, marginLeft: 5
                      // fontWeight: 'bold'
                    }}>{'Cancel'}</Text>

                  </TouchableOpacity>


                </View>

                <ScrollView style={{
                  backgroundColor: '#ffff', width: '100%', height: '100%',
                  // borderTopStartRadius: 20, borderTopEndRadius: 20,
                  padding: 20, paddingHorizontal: 12
                }} showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>


                  {/* <View style={{ width: '100%', height: 0.5, backgroundColor: 'grey', marginTop: '1.5%' }}>
                  </View> */}

                  <CustomTextField onChangeText={(firstName) => this.setState({ firstName: Utility.removeEmojis(firstName) })} editable={true} label='First Name' value={String(this.state.firstName)} />

                  <CustomTextField editable={true} label='Last Name' value={String(this.state.lastName)} onChangeText={(lastName) => this.setState({ lastName: Utility.removeEmojis(lastName) })} />

                  {/* <CustomTextField editable={true} label='Email Address' value={String(this.state.email)} onChangeText={(email) => this.setState({ email: Utility.removeEmojis(email) })}/> */}

                  <CustomTextField editable={true} label='Mobile Number' value={String(this.state.mobile)} onChangeText={(mobile) => this.setState({ mobile: Utility.removeEmojis(mobile) })} />

                  <CustomDateDesign onPress={() => {
                    this.showDateTimePicker('startDate')
                  }} Lable='Date of Birth' dateTitle={String(this.state.dob)} />

                  <DateTimePicker
                    titleIOS=''
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker} />


                  <TouchableOpacity onPress={() => {
                    this.setState({ showGenderPIcker: true });
                  }}>
                    <CustomStaticTextField label='Gender' value={String(this.state.gender)}
                    />
                  </TouchableOpacity>



                  {/* <CustomCommentInput viewOnly={true} editable={false} label='Reason' value={String(this.state.viewData?.leaveReason)} /> */}

                  <View style={{ marginBottom: 30 }}></View>




                </ScrollView>
              </View>

            </View>

            <CustomPicker
              showPicker={this.state.showGenderPIcker}
              arr={this.state.pickerArr}
              title="Select Gender"
              handleClose={() => this.setState({ showGenderPIcker: false })}
              handleSubmit={this.handleSubmit}>
            </CustomPicker>
          </>
        </Modal>

      </>
    );
  }

  //PICKER ACTION 
  handleSubmit = (val, index) => {

    this.setState({ gender: val })
    this.setState({ showGenderPIcker: false })
  }
}