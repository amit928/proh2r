import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TextInput,
  Alert,
  Keyboard,
  Picker,
  Modal,
  Vibration
} from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import Nav from '../../components/NavBar';
import Loader from '../../components/Loader';
import CustomPicker from '../../components/CustomPicker';

import ImagePicker from 'react-native-image-crop-picker';
import { Shadow } from 'react-native-shadow-2';
// import * as ImagePicker from 'react-native-image-picker';
//server
import axios from 'axios';
import { COLORS } from '../../Constant/Index';
import SubmitBtn from '../../components/SubmitBtn';
import PillsDropDown from '../../components/PillsDropDown';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtnWide from '../../components/SubmitBtnWide';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.FormBGColor,
    height: '100%',
    width: '100%',
  },

  navView: {
    height: 80,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
  },

  backBtn: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
    top: 20,
  },

  viewShadow: {
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});

export default class ApplyLeave extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      reason: '',
      isStartDateTimePickerVisible: false,
      navTitle: 'Apply Leave',
      isEndDateTimePickerVisible: false,
      isHalfDayDateTimePickerVisible: false,
      leaveCategory: 'Select',
      startDate: 'Start Date',
      endDate: 'End Date',
      authDict: {},
      leaveArr: [],
      resonForLeave: '',
      halfDayCheck: true,
      yesCheck: false,
      halfDayDate: 'Select Half Day',
      showPicker: false,
      startFormatedDate: '',
      endFormatedDate: '',
      halfDayFormatedDate: '',
      isLoading: false,
      isFromNew: true,
      leaveId: '',
      commentMandatory: false,
      fileMandatory: false,
      fileMandatoryUpload: false,
      imageFilePath: '',
      fileName: '',

      halfs: ['First Half', 'Second Half'],
      halfDayArr: [],
      showHalfDayPicker: false,
      halfIndex: 0,
      selectedLeavePill: '',
      halfDayArrayData: ['First Half', 'Second Half'],
      selectedHalfDayPill: ''

    };
  }

  componentDidMount() {
    // const {params} = this.props.navigation.state
    // var isEdit = params.isEdit
    console.log('props', this.props);
    // if(isEdit == '1'){
    //     let obj = params.data

    //     var userStartDate = Moment(obj.startDate).format('DD/MM/YYYY')
    //     var userEndDate = Moment(obj.endDate).format('DD/MM/YYYY')

    //     this.setState({navTitle:'Edit Leaves',isFromNew:false,leaveCategory:obj.leaveType,
    //     startFormatedDate:obj.startDate,endFormatedDate:obj.endDate,yesCheck:obj.isHalfDay,halfDayCheck:false,reason:obj.leaveReson,leaveId:obj.leaveId,startDate:userStartDate,endDate:userEndDate})

    //   }else{

    //       }

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value });
        this.getLeaveList();
      }
    });

    if (this.props.route.params.fromMyAttandance == true) {
      console.log('fromMyAttandance');

      // console.log(this.props.route.params.pickedServerDt
      //   );

      this.setState({
        startFormatedDate: String(this.props.route.params.pickedServerDt),
        startDate: String(this.props.route.params.pickedDt),
        endDate: 'End Date',
        halfDayDate: 'Select Half Day',
        yesCheck: false,
        halfDayArr: [],
      });

      this.setState({
        endFormatedDate: String(this.props.route.params.pickedServerDt),
        endDate: String(this.props.route.params.pickedDt),
        halfDayDate: 'Select Half Day',
        halfDayArr: [],
      });

    }

    else {
      console.log('fromMyAttandance not');
    }

  }

  componentWillUnmount() {
    // this.props.route.params.refreshList(false);
    // this.props.navigation.state.params.refreshList();
    if (typeof this.props.route.params.refreshList == 'function') {

      console.log(typeof this.props.route.params.refreshList, this.props.route.params.refreshList.isEdit);

      this.props.route.params.refreshList(false);

    }

    else {
      console.log(typeof this.props.route.params.refreshList, this.props.route.params.isEdit);
    }
  }

  showDateTimePicker = value => {
    if (value == 'startDate') {
      this.setState({ isStartDateTimePickerVisible: true });
    } else if (value == 'halfDayDate') {
      if (this.state.startDate == 'Start Date') {
        Alert.alert('Please select start date.');
        Vibration.vibrate()
      }
      if (this.state.endDate == 'End Date') {
        Alert.alert('Please select end date.');
        Vibration.vibrate()
      } else {
        this.setState({ isHalfDayDateTimePickerVisible: true });
      }
    } else {
      if (this.state.startDate == 'Start Date') {
        Alert.alert('Please select start date.');
        Vibration.vibrate()
      } else {
        this.setState({ isEndDateTimePickerVisible: true });
      }
    }
  };

  hideDateTimePicker = () => {
    this.setState({
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      isHalfDayDateTimePickerVisible: false,
    });
  };

  handleDatePicked = date => {
    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('DD/MM/YYYY');
    var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD');

    if (this.state.isStartDateTimePickerVisible) {
      this.setState({
        startFormatedDate: String(pickedServerDt),
        startDate: String(pickedDt),
        endDate: 'End Date',
        halfDayDate: 'Select Half Day',
        yesCheck: false,
        halfDayArr: [],
      });
    } else if (this.state.isEndDateTimePickerVisible) {
      var a = Moment(pickedDt, 'DD/MM/YYYY');
      var b = Moment(this.state.startDate, 'DD/MM/YYYY');
      var diff = a.diff(b, 'days');

      if (diff < 0) {
        this.refs.toast.show(
          'Please select valid end date, end date should not below start date.',
          5000,
        );
      } else {
        this.setState({
          endFormatedDate: String(pickedServerDt),
          endDate: String(pickedDt),
          halfDayDate: 'Select Half Day',
          halfDayArr: [],
        });
      }
    } else if (this.state.isHalfDayDateTimePickerVisible) {
      var a = Moment(pickedDt, 'DD/MM/YYYY');
      var b = Moment(this.state.startDate, 'DD/MM/YYYY');
      var c = Moment(this.state.endDate, 'DD/MM/YYYY');

      var diffStrDt = a.diff(b, 'days');
      var diffEndDt = c.diff(a, 'days');
      if (diffStrDt < 0 || diffEndDt < 0) {
        this.refs.toast.show(
          'Please select valid half day date, half day date should between start date and end date.',
          5000,
        );
      } else {
        let dict = { date: pickedServerDt, shift: 'Select Shift' };
        let arr = this.state.halfDayArr;
        arr.push(dict);

        this.setState({
          halfDayFormatedDate: String(pickedServerDt),
          halfDayDate: String(pickedDt),
          halfDayArr: arr,
        });
      }
    }
    this.hideDateTimePicker();
  };

  onSubmit = () => {
    Keyboard.dismiss();
    let emptyShift = this.state.halfDayArr.filter(function (item) {
      return item.shift == 'Select Shift';
    });
    if (this.state.leaveCategory == 'Select') {
      Alert.alert('Please select leave category.');
      Vibration.vibrate()
    } else if (this.state.startDate == 'Start Date') {
      Alert.alert('Please select start date.');
      Vibration.vibrate()
    } else if (this.state.endDate == 'End Date') {
      Alert.alert('Please select end date.');
      Vibration.vibrate()
    } else if (this.state.fileMandatoryUpload && this.state.imageFilePath == '') {
      Alert.alert('Please upload document.');
      Vibration.vibrate()
    } else if (
      (this.state.yesCheck && this.state.halfDayDate == 'Select Half Day') ||
      this.state.halfDayDate == ''
    ) {
      Alert.alert('Please select half day date.');
      Vibration.vibrate()
    } else if (emptyShift.length != 0) {
      Alert.alert('Please select shift.');
      Vibration.vibrate()
    } else if (this.state.commentMandatory && this.state.reason == '') {
      Alert.alert('Please enter reason for leave.');
      Vibration.vibrate()
    } else {
      if (this.state.isFromNew) {
        // this.applyLeave('', 'POST');
        this.checkApplyLeaveConfirmation('', 'POST');

      } else {
        // this.applyLeave(this.state.leaveId, 'PUT');
        this.checkApplyLeaveConfirmation(this.state.leaveId, 'PUT');
      }
    }
  };

  async getLeaveList() {
    var url =
      Constant.BASE_URL +
      Constant.LEAVE_RECORD +
      'template/' +
      this.state.authDict.employeeCode;
    this.setState({ isLoading: true });

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();

        // var arr = responseJson.activeLeaveCategories
        var arr = responseJson.leaveCategories;

        console.log('responseJson', responseJson);
        console.log('responseJson.leaveCategories', arr);

        this.setState({
          leaveArr: arr,
          commentMandatory: responseJson.isCommentMadatory,
        });
        // console.log(this.state.leaveArr)
      } else {
        let msg = await response.statusText;
        this.refs.toast.show('Something went wrong!', code);

        // Alert.alert('Something went wrong!')
      }
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );

      Vibration.vibrate()
      console.error(error);
    }
  }

  async applyLeave(leaveId, methodName) {
    this.setState({ isLoading: true });
    //starting function
    var url = Constant.BASE_URL + Constant.LEAVE_RECORD + leaveId;
    const { goBack } = this.props.navigation;
    //2021-03-16#First_Half
    let halfDay = [];
    this.state.halfDayArr.map((item, index) => {
      let str = '';
      str =
        item.shift == 'First Half'
          ? item.date + '#' + 'First_Half'
          : item.date + '#' + 'Second_Half';
      halfDay.push(str);
    });
    var data = new FormData();
    data.append('empCode', this.state.authDict.employeeCode);
    data.append('startDate', this.state.startFormatedDate);
    data.append('endDate', this.state.endFormatedDate);
    data.append('isHalfDay', this.state.yesCheck.toString());
    data.append('leaveHalfDaysList', JSON.stringify(halfDay));
    data.append('leaveName', this.state.leaveCategory);
    data.append('reason', this.state.reason);
    data.append('employeeRelations', 'None');
    data.append('expirationDate', '');
    data.append('childDeliveryDate', '');
    var fileName = Math.floor(Math.random() * 100) + 1;
    if (this.state.imageFilePath != '') {
      data.append('file', {
        uri:
          Platform.OS === 'android'
            ? this.state.imageFilePath.path
            : this.state.imageFilePath.path.replace('file://', ''),
        type: this.state.imageFilePath.mime,
        name: this.state.fileName,
      });
    }
    try {
      var requestOptions = {
        method: methodName,
        headers: Constant?.formDatagetHeader(this?.state?.authDict),
        body: data,
        redirect: 'follow',
      };
      let response = await fetch(url, requestOptions);
      console.warn('data', response);
      let code = response?.status;
      this.setState({ isLoading: false });

      if (code == 201 || code == 200) {
        let responseJson = await response?.json();
        // console.log(responseJson)
        Alert.alert(
          'Success',
          'Leave applied successfully.',
          [{
            text: 'OK', onPress: () => {
              goBack()
              if (typeof this.props.route.params.refreshList == 'function') {

                console.log(typeof this.props.route.params.refreshList, this.props.route.params.refreshList.isEdit);

                this.props.route.params.refreshList(false);

              }

              else {
                console.log(typeof this.props.route.params.refreshList, this.props.route.params.isEdit);
              }
            }
          }],
          { cancelable: false },
        );
        Vibration.vibrate()
      } else if (code == 400) {
        let responseJson = await response.json();
        console.warn('message', responseJson.message);
        this.refs.toast.show(responseJson.message);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.refs.toast.show('Something went wrong!', code);
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


  async checkApplyLeaveConfirmation(leaveId, methodName) {
    this.setState({ isLoading: true });
    //starting function
    var url = Constant.BASE_URL + Constant.LEAVE_RECORD + "check";
    const { goBack } = this.props.navigation;
    //2021-03-16#First_Half
    let halfDay = [];
    this.state.halfDayArr.map((item, index) => {
      let str = '';
      str =
        item.shift == 'First Half'
          ? item.date + '#' + 'First_Half'
          : item.date + '#' + 'Second_Half';
      halfDay.push(str);
    });
    var data = new FormData();
    data.append('empCode', this.state.authDict.employeeCode);
    data.append('startDate', this.state.startFormatedDate);
    data.append('endDate', this.state.endFormatedDate);
    data.append('isHalfDay', this.state.yesCheck.toString());
    data.append('leaveHalfDaysList', JSON.stringify(halfDay));
    data.append('leaveName', this.state.leaveCategory);
    data.append('reason', this.state.reason);
    data.append('employeeRelations', 'None');
    data.append('expirationDate', '');
    data.append('childDeliveryDate', '');
    var fileName = Math.floor(Math.random() * 100) + 1;
    if (this.state.imageFilePath != '') {
      data.append('file', {
        uri:
          Platform.OS === 'android'
            ? this.state.imageFilePath.path
            : this.state.imageFilePath.path.replace('file://', ''),
        type: this.state.imageFilePath.mime,
        name: this.state.fileName,
      });
    }
    try {
      var requestOptions = {
        method: methodName,
        headers: Constant?.formDatagetHeader(this?.state?.authDict),
        body: data,
        redirect: 'follow',
      };
      let response = await fetch(url, requestOptions);
      console.warn('data', response);
      let code = response?.status;
      this.setState({ isLoading: false });

      if (code == 201 || code == 200) {
        let responseJson = await response?.text();
        console.log(responseJson)


        const alertMsg = `Your are applying for ${String(responseJson).split(".")[1] == '0' ? String(responseJson).split(".")[0] : String(responseJson)} days of Leave. Do you want to proceed?`

        Alert.alert(
          '',
          alertMsg,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              // style: 'cancel'
            },
            {
              text: 'OK', onPress: () => {

                this.applyLeave(leaveId, methodName);

              }
            }],
          { cancelable: true },
        );
        Vibration.vibrate()
      } else if (code == 400) {
        let responseJson = await response.json();
        console.warn('message', responseJson.message);
        this.refs.toast.show(responseJson.message);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.refs.toast.show('Something went wrong!', code);
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


  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        scrollEnabled={false}>
        <View style={styles.container}>
          <Nav
            backHidden={false}
            title={this.state.navTitle}
            backAction={() => {
              goBack()

              if (typeof this.props.route.params.refreshList == 'function') {

                console.log(typeof this.props.route.params.refreshList, this.props.route.params.refreshList.isEdit);

                this.props.route.params.refreshList(false);

              }

              else {
                console.log(typeof this.props.route.params.refreshList, this.props.route.params.isEdit);
              }


            }}>
            {' '}
          </Nav>

          {/* <TouchableOpacity style={{ alignSelf: 'center', padding: 12, backgroundColor: 'rgba(52,74,235,1.0)', borderRadius: 10, marginTop: 2}} >

            <Text style={{color: 'white', fontWeight: '600', }}> Absent Leave </Text>

          </TouchableOpacity> */}


          <View style={{ flex: 1 }}>
            <ScrollView style={{ padding: 15, paddingLeft: 20, paddingRight: 20 }}>


              <Text allowFontScaling={false} style={{
                marginBottom: 15, marginTop: 20, fontFamily: Constant.MontserratMedium,
                fontSize: 15,
              }}>Leave Category</Text>


              <ScrollView horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
              >

                {this.state.leaveArr.map((item, index) => {

                  return (<TouchableOpacity key={String(index)} style={{ alignSelf: 'center', padding: 12, backgroundColor: this.state.selectedLeavePill == item.leaveName ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5, marginRight: 5 }} onPress={() => {
                    console.log('click Button Name: ', item.leaveName, 'index', index)

                    this.handleLeaveCategoryTileClick(item.leaveName, index)

                    this.setState({ selectedLeavePill: item.leaveName })

                  }}>

                    <Text allowFontScaling={false} style={{
                      color: this.state.selectedLeavePill == item.leaveName ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                      fontSize: 13,
                    }}> {item.leaveName} </Text>

                  </TouchableOpacity>
                  );
                })}

              </ScrollView>





              {/* <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratMedium,
                  paddingLeft: 16,
                  fontSize: 13,
                  marginTop: 16,
                }}>
                Select Leave Category
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '92%',
                  height: 40,
                  left: 16,
                  borderRadius: 22.5,
                  borderWidth: 0.4,
                  borderColor: 'rgba(205,203,251,1.0)',
                  backgroundColor: 'rgba(226,230,248,1.0)',
                }}
                onPress={() =>
                  this.state.isFromNew
                    ? (Keyboard.dismiss(), this.setState({ showPicker: true }))
                    : console.log('')
                }>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 13,
                    color: 'gray',
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 8,
                  }}>
                  {this.state.leaveCategory}
                </Text>

                <Image
                  source={require('../../images/downArrow.png')}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    right: 10,
                  }}
                />
              </TouchableOpacity> */}

              <DateTimePicker
                titleIOS=""
                isVisible={
                  this.state.isStartDateTimePickerVisible ||
                  this.state.isEndDateTimePickerVisible ||
                  this.state.isHalfDayDateTimePickerVisible
                }
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />

              <View
                style={{
                  width: '92%',
                  // left: 16,
                  height: 80,
                  flexDirection: 'row',
                  marginTop: 18
                }}>
                <View style={{ flex: 2, justifyContent: 'center', }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratMedium,
                      fontSize: 15,
                      marginBottom: 15
                    }}>Start Date</Text>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '90%',
                      // top: 5,
                      height: 40,
                      borderRadius: 10,
                      // borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'white',
                      // marginTop: 10,
                      marginLeft: 5
                    }}
                    onPress={() => (
                      Keyboard.dismiss(), this.showDateTimePicker('startDate')
                    )}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'black',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                      }}>
                      {this.state.startDate}
                    </Text>

                    <Image
                      source={require('../../images/calendar_new_icon.png')}
                      style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 2, justifyContent: 'center' }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratMedium,
                      fontSize: 15,
                      marginBottom: 15
                    }}>
                    End Date
                  </Text>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '90%',
                      // top: 5,
                      height: 40,
                      borderRadius: 10,
                      // borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'white',
                      // marginTop: 14
                      marginLeft: 5
                    }}
                    onPress={() => (
                      Keyboard.dismiss(), this.showDateTimePicker('endDate')
                    )}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'black',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                      }}>
                      {this.state.endDate}
                    </Text>

                    <Image
                      source={require('../../images/calendar_new_icon.png')}
                      style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* UPLOAD DOCUMENT SECTION */}

              {this.state.fileMandatory ? (
                <>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratMedium,
                      // paddingLeft: 16,
                      fontSize: 15,
                      marginTop: 18,
                      // marginLeft: 5
                    }}>
                    Upload the Document
                  </Text>

                  <TouchableOpacity
                    style={{
                      marginTop: 14,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '92%',
                      height: 40,
                      // left: 16,
                      borderRadius: 10,
                      // borderWidth: 0.4,
                      // borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'white',
                      marginLeft: 5
                    }}
                    onPress={() => this.chooseFile()}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 13,
                        color: 'gray',
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 8,
                      }}>
                      {this.state.fileName || ''}
                    </Text>
                    <Image
                      source={require('../../images/upload.png')}
                      style={{
                        width: 16,
                        height: 16,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 11,
                      }}
                    />
                  </TouchableOpacity>
                </>
              ) : null}
              {/* HALF DAY LEAVE SECTION */}
              {this.state.leaveCategory != 'CompOff' ? (
                <View style={{ marginTop: 18, }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratMedium,
                      fontSize: 15,

                      // marginBottom: 15,

                    }}>
                    Are There Any Half Days?
                  </Text>
                  <View
                    style={{ flexDirection: 'row', backgroundColor: 'clear', marginTop: 15 }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: this.state.yesCheck ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginTop: 2, marginLeft: 5, marginRight: 5
                      }}
                      onPress={() => this.yesNoToggleButton()}>

                      <Text
                        allowFontScaling={false}
                        style={{
                          color: this.state.yesCheck ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                          fontSize: 13,
                        }}>
                        Yes
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: !this.state.yesCheck ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginTop: 2, marginLeft: 5
                      }}
                      onPress={() => this.yesNoToggleButton()}>

                      <Text
                        allowFontScaling={false}
                        style={{
                          color: !this.state.yesCheck ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                          fontSize: 13,
                        }}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.yesCheck ? (
                    <View style={{ marginTop: 18 }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 15,

                        }}>
                        Half Day Date
                      </Text>

                      <TouchableOpacity
                        style={{
                          marginTop: 15,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '92%',
                          height: 45,
                          borderRadius: 10,
                          // borderWidth: 0.4,
                          // borderColor: 'rgba(205,203,251,1.0)',
                          backgroundColor: 'white',
                          marginLeft: 5
                        }}
                        onPress={() => (
                          Keyboard.dismiss(),
                          this.showDateTimePicker('halfDayDate')
                        )}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'gray',
                            fontFamily: Constant.MontserratMedium,
                            fontSize: 13,
                            paddingLeft: 8,
                          }}>
                          {this.fetchHalfdaydate()}
                        </Text>

                        <Image
                          source={require('../../images/calendar_new_icon.png')}
                          style={{
                            width: 15,
                            height: 15,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            right: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              ) : (
                <></>
              )}
              {/* HALF DAYS LISTS */}
              {this.state.halfDayArr.map((item, index) => (
                <View style={{ marginLeft: 5 }} key={index}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratMedium,
                      // paddingLeft: 16,
                      fontSize: 15,
                      marginTop: 18,

                    }}>
                    {item.date}
                  </Text>

                  <View
                    style={{ flexDirection: 'row', backgroundColor: 'clear', marginLeft: 5, marginTop: 15 }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center', padding: 12, backgroundColor: item.shift == 'First Half' ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginTop: 2, marginLeft: 5, marginRight: 5
                      }}
                      onPress={() => this.handleHalfDayTile('First Half', index)}>

                      <Text
                        allowFontScaling={false}
                        style={{
                          color: item.shift == 'First Half' ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                          fontSize: 13,
                        }}>First Half</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: (item.shift == 'Second Half') ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5,
                      }}
                      onPress={() => this.handleHalfDayTile('Second Half', index)}>

                      <Text
                        allowFontScaling={false}
                        style={{
                          color: (item.shift == 'Second Half') ? "white" : 'black',
                        }}>Second Half</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        // marginTop: 8,
                        alignItems: 'center',
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                        alignSelf: 'center'
                      }}
                      onPress={() => this.deleteHalfDays(index)}>
                      <Image
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        source={require('../../images/cancelSimple.png')}></Image>
                    </TouchableOpacity>
                  </View>

                  {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '80%',
                      height: 40,
                      left: 16,
                      borderRadius: 22.5,
                      borderWidth: 0.4,
                      borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'rgba(226,230,248,1.0)',
                    }}
                    onPress={() => this.selectHalfAction(index)}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 13,
                        color: 'gray',
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 8,
                      }}>
                      {item.shift}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}
                    onPress={() => this.deleteHalfDays(index)}>
                    <Image
                      style={{ height: 20, width: 20, resizeMode: 'contain' }}
                      source={require('../../images/cancelSimple.png')}></Image>
                  </TouchableOpacity>
                </View> */}

                </View>
              ))}

              <Text
                allowFontScaling={false}
                style={{
                  // marginLeft: 13,
                  fontFamily: Constant.MontserratMedium,
                  fontSize: 15,
                  marginTop: 19

                }}>
                Reason For Leave
              </Text>
              <View
                style={{
                  // left: 16,
                  width: '90%',
                  height: 80,
                  // top: 5,
                  borderRadius: 10,
                  // borderWidth: 0.4,
                  // borderColor: 'rgba(205,203,251,1.0)',
                  backgroundColor: 'white',
                  marginBottom: 18,
                  marginTop: 15,
                  marginLeft: 5
                }}>
                <TextInput
                  allowFontScaling={false}
                  numberOfLines={10}
                  style={{
                    height: '100%',
                    width: '100%',
                    fontFamily: Constant.MontserratMedium,
                    fontSize: 13,
                    paddingTop: 8,
                    paddingLeft: 8,
                    textAlignVertical: 'top',
                    color: 'black'
                  }}
                  placeholder="Write.."
                  placeholderTextColor="#A9A9A9"
                  value={this.state.reason}
                  multiline={true}
                  maxLength={200}
                  onChangeText={reason => this.setState({ reason: reason })}
                  returnKeyType="done"
                />
              </View>


              {/* <TouchableOpacity
              style={{
                height: 35,
                width: '48%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'rgba(52,74,235,1.0)',
                alignSelf: 'center',
                marginTop: 5,
                marginBottom: 25
              }}
              onPress={() => this.onSubmit()}>
              <Text
                allowFontScaling={false}
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: '100%',
                  height: '100%',
                  top: 8,
                  fontSize: 13,
                  fontFamily: Constant.MontserratBold,
                }}>
                Apply Leave
              </Text>
            </TouchableOpacity> */}

              {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} />
              
            </View> */}
            </ScrollView>
          </View>



          <View style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 14,
            alignItems: 'center'
          }}>
            <SubmitBtnWide title='Apply Leave' onPress={() => this.onSubmit()} />
            {/* <PillsDropDown dataArray={['ayyyyyyyyyy','bayyyyyyyyyy','cayyyyyyyyyy']}/> */}
          </View>

          {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} 
              defaultBgColor='#207398' TextOnPressIn='#207398' shadowColor='#d9d9d9'
              />
              
            </View> */}

          {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} 
              defaultBgColor='#02B290' TextOnPressIn='#02B290' shadowColor='#d9d9d9'
              />
              
            </View> */}

          {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} 
              defaultBgColor='#1C8D73' TextOnPressIn='#1C8D73' shadowColor='#d9d9d9'
              />
             
            </View> */}

          {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <CancelBtn/>
            </View> */}


          <Toast ref="toast" />
          <CustomPicker
            showPicker={this.state.showPicker || this.state.showHalfDayPicker}
            arr={this.getCustomPickerArr()}
            title={this.state.showPicker ? 'Select Leave Type' : 'Select Half'}
            handleClose={() =>
              this.setState({ showPicker: false, showHalfDayPicker: false })
            }
            handleSubmit={this.handleSubmit}></CustomPicker>
        </View>

        {/* <PillsDropDown dataArray={['a','b','c']}/> */}

        <Loader isLoader={this.state.isLoading}> </Loader>
      </KeyboardAwareScrollView>
    );
  }

  //PICKER ACTION
  handleSubmit = (val, index) => {
    if (this.state.showHalfDayPicker) {
      let dict = {
        date: this.state.halfDayArr[this.state.halfIndex].date,
        shift: val,
      };
      let arr = this.state.halfDayArr;
      arr[this.state.halfIndex] = dict;
      this.setState({
        showPicker: false,
        showHalfDayPicker: false,
        halfDayArr: arr,
      });
    } else {
      let uploadDocumentStatus = this.state.leaveArr[index].uploadDocument;
      let uploadingDocMandatory = this.state.leaveArr[index].uploadingDocMandatory && uploadDocumentStatus;
      if (val == 'CompOff') {
        this.setState({
          showPicker: false,
          yesCheck: false,
          leaveCategory: val,
          halfDayCheck: false,
          halfDayDate: 'Select Half Day',
          fileMandatory: uploadDocumentStatus,
          fileMandatoryUpload: uploadingDocMandatory,
          imageFilePath: '',
          fileName: '',
        });
      } else {
        this.setState({
          showPicker: false,
          yesCheck: false,
          leaveCategory: val,
          halfDayCheck: true,
          halfDayDate: 'Select Half Day',
          fileMandatory: uploadDocumentStatus,
          fileMandatoryUpload: uploadingDocMandatory,
          imageFilePath: '',
          fileName: '',
        });
      }
    }
  };

  handleLeaveCategoryTileClick = (val, index) => {

    console.log('this.state.leaveArr[index]', this.state.leaveArr[index]);

    let uploadDocumentStatus = this.state.leaveArr[index].uploadDocument;
    let uploadingDocMandatory = this.state.leaveArr[index].uploadingDocMandatory && uploadDocumentStatus;
    if (val == 'CompOff') {
      this.setState({
        showPicker: false,
        yesCheck: false,
        leaveCategory: val,
        halfDayCheck: false,
        halfDayDate: 'Select Half Day',
        fileMandatory: uploadDocumentStatus,
        fileMandatoryUpload: uploadingDocMandatory,
        imageFilePath: '',
        fileName: '',
      });
    } else {
      this.setState({
        showPicker: false,
        yesCheck: false,
        leaveCategory: val,
        halfDayCheck: true,
        halfDayDate: 'Select Half Day',
        fileMandatory: uploadDocumentStatus,
        fileMandatoryUpload: uploadingDocMandatory,
        imageFilePath: '',
        fileName: '',
      });
    }

  };

  handleHalfDayTile = (val, halfIndex) => {

    this.setState({ halfIndex: halfIndex })

    let dict = {
      date: this.state.halfDayArr[halfIndex].date,
      shift: val,
    };
    let arr = this.state.halfDayArr;
    arr[halfIndex] = dict;
    this.setState({
      showPicker: false,
      showHalfDayPicker: false,
      halfDayArr: arr,
    });

  }

  getCustomPickerArr = () => {
    if (this.state.showHalfDayPicker) {
      return ['First Half', 'Second Half'];
    } else {
      let arr = [];
      this.state.leaveArr.map((item, index) => {
        arr.push(item.leaveName);
      });
      return arr;
    }
  };

  yesNoToggleButton() {
    if (this.state.yesCheck) {
      this.setState({ halfDayDate: 'Select Half Day' });
    }

    this.setState({ yesCheck: !this.state.yesCheck, halfDayArr: [] });
  }

  chooseFile = () => {


    ImagePicker.openPicker({
      cropping: true,
    }).then(response => {
      console.log(response);

      let fileName = this.fileNameFromUrl(response.path);
      console.log('fileName', fileName);
      this.setState({
        imageFilePath: response,
        fileName: fileName,
      });


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

    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     console.log(response);
    //     let fileName = this.fileNameFromUrl(response.assets[0].uri);
    //     this.setState({
    //       imageFilePath: response.assets[0],
    //       fileName: fileName,
    //     });
    //   }
    // });

  };

  fileNameFromUrl(url) {
    var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches.length > 1) {
      return matches[1];
    }
    return null;
  }

  selectHalfAction(index) {
    this.setState({ halfIndex: index, showHalfDayPicker: true });
  }
  deleteHalfDays(index) {
    let arr = this.state.halfDayArr;
    arr.splice(index, 1);
    this.setState({ halfDayArr: arr });
  }

  fetchHalfdaydate() {
    let str = [];
    this.state.halfDayArr.map((item, index) => {
      str.push(item.date);
    });
    return str.join(',');
  }
}
