import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Keyboard,
  Alert,
  Modal,
  TextInput,
  Picker,
  FlatList,
  Vibration,
} from 'react-native';
import { Icon } from 'native-base';
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import * as Utility from '../../Externel Constant/Utility';
import Loader from '../../components/Loader';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast, { DURATION } from 'react-native-easy-toast';
import CustomPicker from '../../components/CustomPicker';
import ViewItemDetail from '../../components/ViewItemDetail';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import { Shadow } from 'react-native-shadow-2';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS } from '../../Constant/Index';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import PillsDropDown from '../../components/PillsDropDown';
import CustomScreen from '../../components/CustomScreen';
import CustomDateDesign from '../../components/CustomDateDesign';
import CustomCommentInput from '../../components/CustomCommentInput';
import SubmitBtnWide from '../../components/SubmitBtnWide';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import SwipeableList from '../../components/SwipeableList';
import PillsDropDownStateFull from '../../components/PillsDropDownStateFull';
import CustomTextField from '../../components/CustomTextField';

const rightSwipeActions = (rejectFunc, index, swipeRef) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
    <TouchableOpacity
      style={{
        width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
        marginTop: 5, alignItems: 'center', paddingVertical: 2
      }}
      onPress={() => {

        rejectFunc()
        swipeRef.close()
        console.log(index);

      }}
    >

      <View
        style={{
          width: '100%', height: '100%', backgroundColor: '#e03737', justifyContent: 'center', flexDirection: 'row'

        }}
      >


        <View style={{ width: '100%', height: '100%', backgroundColor: "#e03737", justifyContent: 'center', alignItems: 'center' }}>

          <Image

            source={require('../../images/delete.png')}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: 'white'
              // alignSelf: 'center',
              // right: 10,

            }} />

        </View>

        {/* <Text
                    style={{
                        color: '#40394a',
                        paddingHorizontal: 10,
                        fontWeight: '600',
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                        textAlign: 'right'
                    }}
                >
                    Approve
                </Text> */}

      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: Constant.BACKGROUNDCOLOR
    backgroundColor: COLORS.FormBGColor
  },

  approvedCardView: {
    height: 180,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(70,169,64,1.0)',
  },

  rejectCardView: {
    height: 180,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(197,95,94,1.0)',
  },
  pendingCardView: {
    height: 180,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(243,219,131,1.0)',
  },
  approveStatus: {
    fontFamily: Constant.MontserratRegular,
    fontSize: 12,
    color: 'rgba(70,169,64,1.0)',
    paddingTop: 4,
    paddingLeft: 16,
  },
  rejectStatus: {
    fontFamily: Constant.MontserratRegular,
    fontSize: 12,
    color: 'rgba(197,95,94,1.0)',
    paddingTop: 4,
    paddingLeft: 16,
  },
  pendingStatus: {
    fontFamily: Constant.MontserratRegular,
    fontSize: 12,
    color: 'rgba(237,205,70,1.0)',
    paddingTop: 4,
    paddingLeft: 16,
  },
});

const checkNull = (value, passValue) => {
  if (value == null || value == 'null') {
    return passValue;
  } else {
    return value;
  }
};

export default class RegularizationRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authDict: {},
      attendanceArr: [],
      regularizationViewKeyArr: [],
      regularizationViewValueArr: [],
      shiftArr: [],
      shiftValue: 'Select Shift',
      shiftId: '',
      resonArr: [],
      isLoading: false,
      isModalVisible: false,
      isDateTimePickerVisible: false,
      shiftPicker: false,
      regularizationDate: 'Select Date',
      regularizationServerDate: '',
      isTimePickerVisible: false,
      isView: false,
      typeRequestArr: [
        { label: 'CHECK_IN', value: 'Check-in Request' },
        { label: 'CHECK_OUT', value: 'Check-out Request' },
        {
          label: 'CHECKIN_AND_CHECKOUT',
          value: 'Check-in and Check-Out Request',
        },
      ],
      requestType: 'Check-in Request',
      requestServerType: 'CHECK_IN',
      checkInTime: '',
      checkOutTime: '',
      checkInServerTime: null,
      checkOutServerTime: null,
      isCheckOutTimePickerVisible: false,
      isCheckInTimePickerVisible: false,
      showRequestPicker: false,
      showReasonPicker: false,
      reason: '',
      reasonId: '',
      comment: '',
      isEdit: false,
      addRegularizationTitle: 'New Regularization Request',
      id: '',
      typeRequestList: [],
      shiftList: [],
      reasonList: [],
      menuVisible: false,
      MenuItemClicked: 0,
      isHalfDay: 'No',
      dayHalfs: null
    };
  }

  componentDidMount() {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value });
        this.getRegularizationReq();
        this.getReasonArray();
      }
    });

    console.log('componentDidMountdd', this.props);

    // if (this.props.isFromMyAttandance == true) {

    //   console.log('isFromMyAttandance',this.props.isFromMyAttandance);

    //   this.setState({isModalVisible: true})

    //   this.setState({
    //     regularizationDate: String(this.props.regpickedDt),
    //     regularizationServerDate: this.props.regpickedServerDt,
    //   });

    //   // this.fetchSelectedShift(this.props.regpickedShiftDt);

    // }

    // else {
    //   console.log('isFromMyAttandance',this.props.isFromMyAttandance);
    // }

  }


  componentDidUpdate(prevProps, prevState) {
    // This code will run whenever the component updates
    // You can compare current state and props with prevState and prevProps
    // to determine if your action needs to be performed
    if (prevState.attendanceArr.length !== this.state.attendanceArr.length) {
      console.log(`State updated: `);
      this.setState({ isLoading: false });

    }
  }

  componentWillUnmount() {

    this.props.setIsFromMyAttandanceFalse()

  }

  applyRegu(resonArr) {
    console.log(this.state.typeRequestArr);

    let arr1 = [];

    this.state.typeRequestArr.map((m, index) => {
      arr1.push(m.value);
    });


    let arr2 = []

    this.state.shiftArr.map((item, index) => {
      arr2.push(
        item.shiftName +
        ' [' +
        item.shiftStartTime +
        ' - ' +
        item.shiftEndTime +
        ']',
      );
    });


    let arr3 = []

    resonArr.map((m, index) => {
      arr3.push(m.assignedReason);
    });


    this.setState({ typeRequestList: arr1, shiftList: arr2, reasonList: arr3 })
    this.toggleModal()
  }

  applyReguFromAtt(resonArr) {
    console.log(this.state.typeRequestArr);

    let arr1 = [];

    this.state.typeRequestArr.map((m, index) => {
      arr1.push(m.value);
    });


    let arr2 = []

    this.state.shiftArr.map((item, index) => {
      arr2.push(
        item.shiftName +
        ' [' +
        item.shiftStartTime +
        ' - ' +
        item.shiftEndTime +
        ']',
      );
    });


    let arr3 = []

    resonArr.map((m, index) => {
      arr3.push(m.assignedReason);
    });


    this.setState({ typeRequestList: arr1, shiftList: arr2, reasonList: arr3 })

    this.setState({ isModalVisible: !this.state.isModalVisible }, this.setState({
      regularizationDate: String(this.props.regpickedDt),
      regularizationServerDate: this.props.regpickedServerDt,
    }));

    // this.setState({
    //   regularizationDate: String(this.props.regpickedDt),
    //   regularizationServerDate: this.props.regpickedServerDt,
    // });

    this.fetchSelectedShift(this.props.regpickedShiftDt);


  }

  clickMenu() {

    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }


  async getRegularizationReq() {
    this.setState({ isLoading: true });
    var url =
      Constant.BASE_URL +
      Constant.REGULARIZATION_REQ +
      this.state.authDict.employeeCode;
    // console.log(url)
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      // this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();
        // console.log(responseJson)
        let arr = responseJson;
        let dataArr = [];
        this.setState({ attendanceArr: arr });

        // console.log(this.state.attendanceArr)
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        Vibration.vibrate()

        // this.refs.toast.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()

        //  this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getReasonArray() {
    this.setState({ isLoading: true });
    var url =
      Constant.BASE_URL +
      Constant.GET_REASON +
      this.state.authDict.employeeCode;
    // console.log(url)
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();
        // console.log(responseJson)
        let arr = responseJson;
        var reason = '';
        var reasonId = '';

        if (responseJson.length != 0) {
          reason = responseJson[0].assignedReason;
          reasonId = responseJson[0].reasonId;
        }

        if (this.props.openApplyReg) {
          this.setState({ resonArr: arr, reason: reason, reasonId: reasonId }, this.applyRegu(arr));
        }

        else if (this.props.isFromMyAttandance == true) {

          console.log('isFromMyAttandance', this.props.isFromMyAttandance);

          // this.setState({isModalVisible: true})

          // this.setState({
          //   regularizationDate: String(this.props.regpickedDt),
          //   regularizationServerDate: this.props.regpickedServerDt,
          // });

          this.setState({ resonArr: arr, reason: reason, reasonId: reasonId }, this.applyReguFromAtt(arr));

          // this.fetchSelectedShift(this.props.regpickedShiftDt);

        }

        else {
          this.setState({ resonArr: arr, reason: reason, reasonId: reasonId });
        }



      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        Vibration.vibrate()
        //  this.refs.toast.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()

        // this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async submitRegularizationRequest(method, id) {
    /// this.closeModel()
    this.setState({ isLoading: true });
    if (!this.state.isEdit) {
      id = '';
    }
    var url = Constant.BASE_URL + Constant.SUBMIT_REGULARIZATION_REQUEST + id;
    let regDt = [];
    regDt.push(this.state.regularizationServerDate);
    let params = {
      empCode: this.state.authDict.employeeCode,
      regularizationDate: regDt,
      requestType: this.state.requestServerType,
      checkInTime: this.state.checkInServerTime,
      checkOutTime: this.state.checkOutServerTime,
      regularizationReason: this.state.reasonId,
      regularizationComments: this.state.comment,
      shiftRecordId: this.state.shiftId,
      isHalfDay: this.state.isHalfDay == 'No' ? false : true,
      dayHalfs: this.state.isHalfDay == 'No' ? null : this.state.dayHalfs == 'First Half' ? 'First_Half' : 'Second_Half'
    };


    console.log('async submitRegularizationRequest', params)
    let body = JSON.stringify(params);

    // console.log(body)
    // console.log(url)

    try {
      let response = await fetch(url, {
        method: method,
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });



      if (code == 201 || code == 200) {

        let responseJson = await response.json()

        console.log('Apply Regu', responseJson);

        Alert.alert('', responseJson?.message);
        this.closeModel();
        this.getRegularizationReq();
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        Vibration.vibrate()

        //  this.refs.toast.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()

        // this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRegularization(value) {
    this.setState({ isLoading: true });
    var url = `${Constant.BASE_URL + Constant.SUBMIT_REGULARIZATION_REQUEST + value
      }/action?action=cancel&&comments=`;
    try {
      let response = await fetch(url, {
        method: 'PUT',
        headers: Constant.getHeader(this.state.authDict),
      });
      console.warn(response);
      let code = await response.status;
      this.setState({ isLoading: false });
      if (code == 200) {
        this.getRegularizationReq();
      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        Vibration.vibrate()
        //   this.refs.toasts.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()
        //  this.refs.toasts.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchSelectedShift(date) {
    this.setState({ isLoading: true });
    var url =
      Constant.BASE_URL +
      Constant.FETCH_SELECTED_SHIFT +
      this.state.authDict.employeeCode +
      '/' +
      date;

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });
      if (code == 200) {
        let responseJson = await response.json();
        console.log('fetchSelectedShift', responseJson)
        this.setState({
          shiftId: responseJson.shiftRecordId || '',
          shiftValue: responseJson.shiftName || 'Select Shift',
        });
        this.fetchShift(responseJson.shiftRecordId || '');
      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        Vibration.vibrate()
        //   this.refs.toasts.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()

        //  this.refs.toasts.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchShift(id) {
    this.setState({ isLoading: true });
    var url = Constant.BASE_URL + Constant.FETCH_SHIFT;

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });
      let code = await response.status;
      this.setState({ isLoading: false });
      if (code == 200) {
        let responseJson = await response.json();
        // console.log(responseJson)

        responseJson.map((item, index) => {
          if (item.shiftRecordId == id) {
            this.setState({
              shiftId: id,
              shiftValue:
                item.shiftName +
                ' [' +
                item.shiftStartTime +
                ' - ' +
                item.shiftEndTime +
                ']',
            });
          }
        });
        this.setState({ shiftArr: responseJson });
        let arr = []
        responseJson.map((item, index) => {
          arr.push(
            item.shiftName +
            ' [' +
            item.shiftStartTime +
            ' - ' +
            item.shiftEndTime +
            ']',
          );

          this.setState({ shiftList: arr })

        });
      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        Vibration.vibrate()
        //   this.refs.toasts.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()

        //  this.refs.toasts.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {

    const isHalfDayArr = ['Yes', 'No']

    const dayHalfsArr = ['First Half', 'Second Half']

    return (
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>


          <Menu
            onRequestClose={() => this.setState({ menuVisible: false })}
            // children={<TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }} onPress={() => setmenuVisible(false)}></TouchableOpacity>}

            visible={this.state.menuVisible}
          // anchor={<Text onPress={showMenu}>Show menu</Text>}
          // onRequestClose={hideMenu}
          >

            {this.state.MenuItemClicked == 0 ? <></> :

              <MenuItem onPress={() => {

                this.setState({ MenuItemClicked: 0, menuVisible: false })

              }}>Show All</MenuItem>

            }

            {this.state.MenuItemClicked == 1 ? <></> :
              <MenuItem onPress={() => {

                this.setState({ MenuItemClicked: 1, menuVisible: false })

              }}>Level 1 Pending</MenuItem>
            }

            {this.state.MenuItemClicked == 2 ? <></> :
              <MenuItem onPress={() => {

                this.setState({ MenuItemClicked: 2, menuVisible: false })

              }}>Approved</MenuItem>
            }

            {this.state.MenuItemClicked == 3 ? <></> :
              <MenuItem onPress={() => {

                this.setState({ MenuItemClicked: 3, menuVisible: false })

              }}>Cancelled</MenuItem>
            }


            {this.state.MenuItemClicked == 4 ? <></> :
              <MenuItem onPress={() => {

                this.setState({ MenuItemClicked: 4, menuVisible: false })

              }}>Rejected</MenuItem>

            }
            {/* <MenuItem onPress={() => {
              
              this.setState({menuVisible: false})
            }
            }>Cancel</MenuItem> */}

          </Menu>

        </View>

        <View style={styles.container}>
          {this.state.attendanceArr.length != 0 ? (
            <FlatList
              data={this.state.attendanceArr}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) => this.state.MenuItemClicked == 1 ? this.renderListOnlyForPending(item, index) : this.state.MenuItemClicked == 2 ? this.renderListOnlyForApproved(item, index) : this.state.MenuItemClicked == 3 ? this.renderListOnlyForCancelled(item, index) : this.state.MenuItemClicked == 4 ? this.renderListOnlyForRejected(item, index) : this.renderList(item, index)}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={10}
              // onEndReachedThreshold={0.2}
              // onEndReached={this.fetchMoreData.bind(this)}
            />
          ) : (
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#A9A9A9',
                alignSelf: 'center',
                marginVertical: Dimensions.get('window').height / 3,
              }}>
              {' '}
              No Data Found
            </Text>
          )}

          {/* <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              height: 60,
              width: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 60,
              shadowOffset: {width: 0, height: 5},
              shadowColor: 'gray',
              shadowOpacity: 3.0,
              elevation: 3,
              right: 20,
            }}
            onPress={() => this.toggleModal()}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              source={require('../../images/floatBtn.png')}></Image>
          </TouchableOpacity> */}
          <FloatBtnComp clickBtn={() => {
            console.log(this.state.typeRequestArr);

            let arr1 = [];

            this.state.typeRequestArr.map((m, index) => {
              arr1.push(m.value);
            });


            let arr2 = []

            this.state.shiftArr.map((item, index) => {
              arr2.push(
                item.shiftName +
                ' [' +
                item.shiftStartTime +
                ' - ' +
                item.shiftEndTime +
                ']',
              );
            });


            let arr3 = []

            this.state.resonArr.map((m, index) => {
              arr3.push(m.assignedReason);
            });


            this.setState({ typeRequestList: arr1, shiftList: arr2, reasonList: arr3 })
            this.toggleModal()
          }} />

          {/* //:- Modal Module With Pop Up */}


          <CustomScreen isScreenVisible={this.state.isModalVisible} backAction={() => {

            if (this.props.openApplyReg) {
              // console.log('yyyy');
              this.setState({ isModalVisible: false })
              this.props.goBack()
            }

            else if (this.props.isFromMyAttandance == true) {

              this.props.fromRegToMyAttd()

            }

            else {
              console.log('ddddd');
              this.setState({ isModalVisible: false })

            }



          }}

            Views={(
              <>
                {/* <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}></KeyboardAwareScrollView> */}
                <KeyboardAwareScrollView>
                  <DateTimePicker
                    titleIOS=""
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                  />

                  <DateTimePicker
                    date={this.state.regularizationServerDate == '' ? new Date() : new Date(this.state.regularizationServerDate)}
                    titleIOS=""
                    isVisible={
                      this.state.isCheckInTimePickerVisible ||
                      this.state.isCheckOutTimePickerVisible
                    }
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode="datetime"
                  />
                  <View
                    style={{
                      // borderRadius: 8,
                      width: '100%',
                      backgroundColor: COLORS.FormBGColor,
                      overflow: 'hidden',
                      flex: 1,
                      justifyContent: 'center',
                      padding: 15
                    }}>

                    {/* <View
                  style={{
                    paddingTop: 16,
                    paddingBottom: 16,
                    width: '100%',
                    height: 50,
                    backgroundColor: 'rgba(47,109,196,1.0)',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: 'white',
                      fontSize: 15,
                      paddingLeft: 8,
                      fontFamily: Constant.MontserratSemiBold,
                    }}>
                    {' '}
                    {this.state.addRegularizationTitle}
                  </Text>
  
                  <TouchableOpacity
                    style={{
                      width: 45,
                      height: 50,
                      right: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.closeModel()}>
                    <Image
                      source={require('../../images/cancel.png')}
                      style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                </View> */}

                    <View style={{ marginTop: 16, flex: 1 }}>
                      {/* <Text
                    allowFontScaling={false}
                    style={{
                      paddingLeft: 16,
                      fontSize: 12,
                      fontFamily: Constant.MontserratMedium,
                    }}>
                    Choose a date
                  </Text>
  
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '92%',
                      height: 40,
                      alignSelf: 'center',
                      borderRadius: 20,
                      borderWidth: 0.4,
                      borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'rgba(226,230,248,1.0)',
                    }}
                    onPress={() => {
                      console.log('click')
                      this.state.isEdit
                        ? console.log('cant edit')
                        : (Keyboard.dismiss(), this.showDateTimePicker())
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 12,
                        color: 'gray',
                        paddingLeft: 8,
                      }}>
                      {this.state.regularizationDate}
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


                      <CustomDateDesign Lable={'Choose a Date'} dateTitle={this.state.regularizationDate} onPress={() => {
                        console.log('click')
                        this.state.isEdit
                          ? console.log('cant edit')
                          : (Keyboard.dismiss(), this.showDateTimePicker())
                      }} />



                      {/* TYPE A REQUEST  */}

                      <PillsDropDown onSelect={(val, index) => {

                        this.setState({
                          requestType: val,
                          requestServerType: this.state.typeRequestArr[index].label,
                          checkInServerTime: null,
                          checkInTime: '',
                          checkOutTime: '',
                          checkOutServerTime: null,
                        });

                      }} dataArray={this.state.typeRequestList} Title={'Type of Request'} />

                      {/* <View
                    style={{
                      width: '92%',
                      alignSelf: 'center',
                      height: 60,
                      flexDirection: 'row',
                      marginTop: 8,
                    }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 12,
                        }}>
                        Type of request
                      </Text>
  
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '96%',
                          alignSelf: 'flex-start',
                          top: 5,
                          height: 40,
                          borderRadius: 20,
                          borderWidth: 0.4,
                          borderColor: 'rgba(205,203,251,1.0)',
                          backgroundColor: 'rgba(226,230,248,1.0)',
                        }}
                        onPress={() =>
                          this.setState({ showRequestPicker: true })
                        }>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: Constant.MontserratMedium,
                            fontSize: 12,
                            color: 'gray',
                            paddingLeft: 8,
                            paddingRight: 10,
                            flexWrap: 'wrap',
                            flex: 1,
                          }}>
                          {this.state.requestType}
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
                      </TouchableOpacity>
  
                    </View>
                    
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 12,
                        }}>
                        Reason
                      </Text>
  
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '96%',
                          alignSelf: 'flex-end',
                          height: 40,
                          top: 5,
                          borderRadius: 20,
                          borderWidth: 0.4,
                          borderColor: 'rgba(205,203,251,1.0)',
                          backgroundColor: 'rgba(226,230,248,1.0)',
                        }}
                        onPress={() => this.setState({ showReasonPicker: true })}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: Constant.MontserratMedium,
                            fontSize: 12,
                            color: 'gray',
                            paddingLeft: 8,
                            flexWrap: 'wrap',
                            flex: 1,
                          }}>
                          {this.state.reason}
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
                      </TouchableOpacity>
                    </View>
                  </View> */}

                      {/* CHECK IN CHECK OUT VIEW */}
                      <PillsDropDown Title='Reason' dataArray={this.state.reasonList} onSelect={(val, index) => {


                        this.setState({
                          reason: val,
                          reasonId: this.state.resonArr[index].reasonId,
                        });


                      }} />




                      {/* <PillsDropDown Title='Select Shift' dataArray={this.state.shiftList} onSelect={(val, index) => {

                        this.setState({
                          shiftValue: val,
                          shiftId: this.state.shiftArr[index].shiftRecordId,
                        });

                      }} /> */}

                      <CustomTextField placeholder='Please Select Date' editable={false} showPlaceHolder={true} value={this.state.shiftValue == "Select Shift" ? '' : this.state.shiftValue} label='Select Shift' />

                      <PillsDropDownStateFull dataArray={isHalfDayArr} Title='Is it Half Day Regularization ?'
                        selectedData={this.state.isHalfDay}
                        onSelect={(item, index) => {

                          this.setState({ isHalfDay: item })

                          if (item == 'No') {
                            this.setState({ dayHalfs: null })
                          }

                        }}
                      />

                      {this.state.isHalfDay == 'Yes' ?
                        <PillsDropDownStateFull dataArray={dayHalfsArr} Title='Select Half'
                          selectedData={this.state.dayHalfs}
                          onSelect={(item, index) => {

                            this.setState({ dayHalfs: item })

                          }}
                        />
                        : <></>
                      }


                      <View
                        style={{ width: '100%', alignSelf: 'center', marginTop: 8 }}>
                        {this.state.requestServerType == 'CHECK_IN' ||
                          this.state.requestServerType == 'CHECKIN_AND_CHECKOUT' ? (
                          <>
                            <CustomDateDesign Lable={'Check In Time'} dateTitle={this.state.checkInTime} onPress={() => {
                              this.setState({ isCheckInTimePickerVisible: true })
                            }} />
                            {/* <View style={{ justifyContent: 'center', marginTop: 8 }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: Constant.MontserratMedium,
                              fontSize: 12,
                            }}>
                            Check In Time
                          </Text>
  
                          <TouchableOpacity
                            style={{
                              marginTop: 8,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              height: 40,
                              alignSelf: 'center',
                              borderRadius: 20,
                              borderWidth: 0.4,
                              borderColor: 'rgba(205,203,251,1.0)',
                              backgroundColor: 'rgba(226,230,248,1.0)',
                            }}
                            onPress={() =>
                              this.setState({ isCheckInTimePickerVisible: true })
                            }>
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontFamily: Constant.MontserratMedium,
                                fontSize: 12,
                                color: 'gray',
                                paddingLeft: 8,
                              }}>
                              {this.state.checkInTime}
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
                          </TouchableOpacity>
                        </View> */}
                          </>
                        ) : (
                          <></>
                        )}

                        {this.state.requestServerType == 'CHECK_OUT' ||
                          this.state.requestServerType == 'CHECKIN_AND_CHECKOUT' ? (
                          <>
                            <CustomDateDesign Lable={'Check Out Time'} dateTitle={this.state.checkOutTime} onPress={() => {
                              this.setState({ isCheckOutTimePickerVisible: true })
                            }} />
                            {/* <View style={{ justifyContent: 'center', marginTop: 8 }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: Constant.MontserratMedium,
                              fontSize: 12,
                            }}>
                            Check Out Time
                          </Text>
  
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              alignSelf: 'flex-start',
                              top: 5,
                              height: 40,
                              borderRadius: 20,
                              borderWidth: 0.4,
                              borderColor: 'rgba(205,203,251,1.0)',
                              backgroundColor: 'rgba(226,230,248,1.0)',
                            }}
                            onPress={() =>
                              this.setState({ isCheckOutTimePickerVisible: true })
                            }>
                            <Text
                              allowFontScaling={false}
                              style={{
                                paddingLeft: 16,
                                fontSize: 12,
                                fontFamily: Constant.MontserratMedium,
                                color: 'gray',
                                paddingLeft: 8,
                              }}>
                              {this.state.checkOutTime}
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
                          </TouchableOpacity>
                        </View> */}
                          </>
                        ) : (
                          <></>
                        )}
                      </View>


                      <CustomCommentInput label='Comment' value={this.state.comment} onChangeText={(text) => { this.setState({ comment: text }) }} blurOnSubmit={true} />
                      {/* Select Shift View */}

                      {/* <Text
                    allowFontScaling={false}
                    style={{
                      marginTop: 8,
                      paddingLeft: 16,
                      fontSize: 12,
                      fontFamily: Constant.MontserratMedium,
                    }}>
                    Select Shift
                  </Text> */}

                      {/* <TouchableOpacity
                    style={{
                      marginTop: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '92%',
                      height: 40,
                      alignSelf: 'center',
                      borderRadius: 20,
                      borderWidth: 0.4,
                      borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'rgba(226,230,248,1.0)',
                    }}
                    onPress={() => this.setState({ shiftPicker: true })}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 12,
                        color: 'gray',
                        paddingLeft: 8,
                      }}>
                      {this.state.shiftValue}
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

                      {/* <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratMedium,
                      fontSize: 12,
                      paddingLeft: 16,
                      marginTop: 10,
                    }}>
                    Comment
                  </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '90%',
                      height: 80,
                      top: 5,
                      borderRadius: 10,
                      borderWidth: 0.4,
                      borderColor: 'rgba(205,203,251,1.0)',
                      backgroundColor: 'rgba(226,230,248,1.0)',
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      numberOfLines={10}
                      style={{
                        height: '100%',
                        width: '100%',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 12,
                        color: 'gray',
                        paddingTop: 8,
                        paddingLeft: 8,
                        textAlignVertical: 'top',
                      }}
                      placeholder="Write.."
                      placeholderTextColor="#A9A9A9"
                      value={this.state.comment}
                      multiline={true}
                      maxLength={200}
                      onChangeText={comment =>
                        this.setState({ comment: comment })
                      }
                    />
                  </View> */}


                    </View>

                  </View>


                  <CustomPicker
                    showPicker={
                      this.state.showRequestPicker ||
                      this.state.showReasonPicker ||
                      this.state.shiftPicker
                    }
                    arr={this.filterItem()}
                    title={
                      this.state.showRequestPicker
                        ? 'Select Request Type'
                        : this.state.showReasonPicker
                          ? 'Select Reason'
                          : 'Select Shift'
                    }
                    handleClose={() =>
                      this.setState({
                        showRequestPicker: false,
                        showReasonPicker: false,
                        shiftPicker: false,
                      })
                    }
                    handleSubmit={this.handleSubmit}></CustomPicker>

                  <Toast ref="toast" />

                  <Loader isLoader={this.state.isLoading}> </Loader>

                </KeyboardAwareScrollView>
                <View
                  style={{
                    height: 60,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop: 16,
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: COLORS.FormBGColor,
                    marginBottom: 14
                  }}>

                  {/* <TouchableOpacity
                    style={{
                      height: 35,
                      width: '48%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 20,
                      borderWidth: 0.5,
                      borderColor: 'rgba(42,76,136,1.0)',
                    }}
                    onPress={() => this.closeModel()}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'rgba(42,76,136,1.0)',
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        top: 8,
                        fontSize: 13,
                        fontFamily: Constant.MontserratBold,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity> */}

                  {/* <CancelBtn onPress={() => { this.closeModel() }} /> */}
                  <SubmitBtnWide
                    // TextOnPressIn='#6AC47E' defaultBgColor='#6AC47E' shadowColor='#d9d9d9' 
                    onPress={() => { this.onSubmit() }} />

                  {/* <TouchableOpacity
                    style={{
                      height: 35,
                      width: '48%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 20,
                      backgroundColor: 'rgba(42,76,136,1.0)',
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
                      Submit
                    </Text>
                  </TouchableOpacity> */}

                </View>
              </>

            )}

            ScreenTitle='New Regularizion Request' />

          <Modal
            visible={false}
            transparent={true}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>




            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 8,
                    width: '92%',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      paddingTop: 16,
                      paddingBottom: 16,
                      width: '100%',
                      height: 50,
                      backgroundColor: 'rgba(47,109,196,1.0)',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'white',
                        fontSize: 15,
                        paddingLeft: 8,
                        fontFamily: Constant.MontserratSemiBold,
                      }}>
                      {' '}
                      {this.state.addRegularizationTitle}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: 45,
                        height: 50,
                        right: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.closeModel()}>
                      <Image
                        source={require('../../images/cancel.png')}
                        style={{ height: 30, width: 30, resizeMode: 'contain' }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 16 }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        paddingLeft: 16,
                        fontSize: 12,
                        fontFamily: Constant.MontserratMedium,
                      }}>
                      Choose a date
                    </Text>

                    <TouchableOpacity
                      style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '92%',
                        height: 40,
                        alignSelf: 'center',
                        borderRadius: 20,
                        borderWidth: 0.4,
                        borderColor: 'rgba(205,203,251,1.0)',
                        backgroundColor: 'rgba(226,230,248,1.0)',
                      }}
                      onPress={() =>
                        this.state.isEdit
                          ? console.log('cant edit')
                          : (Keyboard.dismiss(), this.showDateTimePicker())
                      }>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 12,
                          color: 'gray',
                          paddingLeft: 8,
                        }}>
                        {this.state.regularizationDate}
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
                    </TouchableOpacity>

                    {/* TYPE A REQUEST  */}

                    <View
                      style={{
                        width: '92%',
                        alignSelf: 'center',
                        height: 60,
                        flexDirection: 'row',
                        marginTop: 8,
                      }}>
                      <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: Constant.MontserratMedium,
                            fontSize: 12,
                          }}>
                          Type of request
                        </Text>

                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '96%',
                            alignSelf: 'flex-start',
                            top: 5,
                            height: 40,
                            borderRadius: 20,
                            borderWidth: 0.4,
                            borderColor: 'rgba(205,203,251,1.0)',
                            backgroundColor: 'rgba(226,230,248,1.0)',
                          }}
                          onPress={() =>
                            this.setState({ showRequestPicker: true })
                          }>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: Constant.MontserratMedium,
                              fontSize: 12,
                              color: 'gray',
                              paddingLeft: 8,
                              paddingRight: 10,
                              flexWrap: 'wrap',
                              flex: 1,
                            }}>
                            {this.state.requestType}
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
                        </TouchableOpacity>

                      </View>
                      {/* <PillsDropDown dataArray={this.filterItem()}/> */}
                      <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: Constant.MontserratMedium,
                            fontSize: 12,
                          }}>
                          Reason
                        </Text>

                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '96%',
                            alignSelf: 'flex-end',
                            height: 40,
                            top: 5,
                            borderRadius: 20,
                            borderWidth: 0.4,
                            borderColor: 'rgba(205,203,251,1.0)',
                            backgroundColor: 'rgba(226,230,248,1.0)',
                          }}
                          onPress={() => this.setState({ showReasonPicker: true })}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: Constant.MontserratMedium,
                              fontSize: 12,
                              color: 'gray',
                              paddingLeft: 8,
                              flexWrap: 'wrap',
                              flex: 1,
                            }}>
                            {this.state.reason}
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
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* CHECK IN CHECK OUT VIEW */}

                    <View
                      style={{ width: '92%', alignSelf: 'center', marginTop: 8 }}>
                      {this.state.requestServerType == 'CHECK_IN' ||
                        this.state.requestServerType == 'CHECKIN_AND_CHECKOUT' ? (
                        <View style={{ justifyContent: 'center', marginTop: 8 }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: Constant.MontserratMedium,
                              fontSize: 12,
                            }}>
                            Check In Time
                          </Text>

                          <TouchableOpacity
                            style={{
                              marginTop: 8,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              height: 40,
                              alignSelf: 'center',
                              borderRadius: 20,
                              borderWidth: 0.4,
                              borderColor: 'rgba(205,203,251,1.0)',
                              backgroundColor: 'rgba(226,230,248,1.0)',
                            }}
                            onPress={() =>
                              this.setState({ isCheckInTimePickerVisible: true })
                            }>
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontFamily: Constant.MontserratMedium,
                                fontSize: 12,
                                color: 'gray',
                                paddingLeft: 8,
                              }}>
                              {this.state.checkInTime}
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
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}

                      {this.state.requestServerType == 'CHECK_OUT' ||
                        this.state.requestServerType == 'CHECKIN_AND_CHECKOUT' ? (
                        <View style={{ justifyContent: 'center', marginTop: 8 }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: Constant.MontserratMedium,
                              fontSize: 12,
                            }}>
                            Check Out Time
                          </Text>

                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              alignSelf: 'flex-start',
                              top: 5,
                              height: 40,
                              borderRadius: 20,
                              borderWidth: 0.4,
                              borderColor: 'rgba(205,203,251,1.0)',
                              backgroundColor: 'rgba(226,230,248,1.0)',
                            }}
                            onPress={() =>
                              this.setState({ isCheckOutTimePickerVisible: true })
                            }>
                            <Text
                              allowFontScaling={false}
                              style={{
                                paddingLeft: 16,
                                fontSize: 12,
                                fontFamily: Constant.MontserratMedium,
                                color: 'gray',
                                paddingLeft: 8,
                              }}>
                              {this.state.checkOutTime}
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
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>

                    {/* Select Shift View */}

                    <Text
                      allowFontScaling={false}
                      style={{
                        marginTop: 8,
                        paddingLeft: 16,
                        fontSize: 12,
                        fontFamily: Constant.MontserratMedium,
                      }}>
                      Select Shift
                    </Text>

                    <TouchableOpacity
                      style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '92%',
                        height: 40,
                        alignSelf: 'center',
                        borderRadius: 20,
                        borderWidth: 0.4,
                        borderColor: 'rgba(205,203,251,1.0)',
                        backgroundColor: 'rgba(226,230,248,1.0)',
                      }}
                      onPress={() => this.setState({ shiftPicker: true })}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 12,
                          color: 'gray',
                          paddingLeft: 8,
                        }}>
                        {this.state.shiftValue}
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
                    </TouchableOpacity>

                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 12,
                        paddingLeft: 16,
                        marginTop: 10,
                      }}>
                      Comment
                    </Text>
                    <View
                      style={{
                        alignSelf: 'center',
                        width: '90%',
                        height: 80,
                        top: 5,
                        borderRadius: 10,
                        borderWidth: 0.4,
                        borderColor: 'rgba(205,203,251,1.0)',
                        backgroundColor: 'rgba(226,230,248,1.0)',
                      }}>
                      <TextInput
                        allowFontScaling={false}
                        numberOfLines={10}
                        style={{
                          height: '100%',
                          width: '100%',
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 12,
                          color: 'gray',
                          paddingTop: 8,
                          paddingLeft: 8,
                          textAlignVertical: 'top',
                        }}
                        placeholder="Write.."
                        placeholderTextColor="#A9A9A9"
                        value={this.state.comment}
                        multiline={true}
                        maxLength={200}
                        onChangeText={comment =>
                          this.setState({ comment: comment })
                        }
                      />
                    </View>

                    <View
                      style={{
                        height: 60,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 16,
                        width: '90%',
                        alignSelf: 'center',
                      }}>

                      {/* <TouchableOpacity
                          style={{
                            height: 35,
                            width: '48%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderWidth: 0.5,
                            borderColor: 'rgba(42,76,136,1.0)',
                          }}
                          onPress={() => this.closeModel()}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'rgba(42,76,136,1.0)',
                              textAlign: 'center',
                              width: '100%',
                              height: '100%',
                              top: 8,
                              fontSize: 13,
                              fontFamily: Constant.MontserratBold,
                            }}>
                            Cancel
                          </Text>
                        </TouchableOpacity> */}

                      <CancelBtn onPress={() => { this.closeModel() }} />
                      <SubmitBtn onPress={() => { this.onSubmit() }} />

                      {/* <TouchableOpacity
                          style={{
                            height: 35,
                            width: '48%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            backgroundColor: 'rgba(42,76,136,1.0)',
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
                            Submit
                          </Text>
                        </TouchableOpacity> */}

                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>

            {/* {
  
              this.state.showRequestPicker || this.state.showReasonPicker ?
  
                <View style={{ backgroundColor: 'white' }}>
                  <View style={{ width: '100%', height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => (this.setState({ showRequestPicker: false,showReasonPicker:false  }) )}>
                      <Text style={{ marginLeft: 20, color: 'blue', fontSize: 18 }}>
                        Cancel
                          </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ showRequestPicker: false,showReasonPicker:false })}>
                      <Text style={{ marginRight: 20, color: 'blue', fontSize: 18 }}>
                        Done
                          </Text>
                    </TouchableOpacity>
                  </View>
  
                  <Picker 
  
                    selectedValue={ this.state.showRequestPicker ? this.state.requestType:this.state.reason}
                    onValueChange={(itemValue, j) =>   
                      (
                        this.state.showRequestPicker 
                        ? 
                        this.setState({requestType:itemValue,requestServerType:this.state.typeRequestArr[j].label,checkInServerTime:null,checkInTime:'',checkOutTime:'',checkOutServerTime:null })
                        :
                        this.setState({reason:itemValue,reasonId:this.state.resonArr[j].reasonId})
                    )
                    }>
                    {
  
                      this.state.showRequestPicker 
                      ?
                      this.state.typeRequestArr.map((m, j) =>
                        <Picker.Item label={m.value} value={m.value} key={j} />
                      )
                       : 
                       this.state.resonArr.map((m, j) =>
                       <Picker.Item label={m.assignedReason} value={m.assignedReason} key={j} />
                     )
                    }
                  </Picker>
                </View>
                :
                <></>
            } */}
            {/* <CustomPicker
              showPicker={
                this.state.showRequestPicker ||
                this.state.showReasonPicker ||
                this.state.shiftPicker
              }
              arr={this.filterItem()}
              title={
                this.state.showRequestPicker
                  ? 'Select Request Type'
                  : this.state.showReasonPicker
                    ? 'Select Reason'
                    : 'Select Shift'
              }
              handleClose={() =>
                this.setState({
                  showRequestPicker: false,
                  showReasonPicker: false,
                  shiftPicker: false,
                })
              }
              handleSubmit={this.handleSubmit}></CustomPicker> */}

            <Toast ref="toast" />

            <Loader isLoader={this.state.isLoading}> </Loader>
          </Modal>

          {this.state.isView ? (
            <ViewItemDetail
              buttonDisable={true}
              viewDetail={this.state.isView}
              title="View Regularization Request"
              keyArr={this.state.regularizationViewKeyArr}
              valueArr={this.state.regularizationViewValueArr}
              cancelAction={() =>
                this.setState({ isView: false })
              }></ViewItemDetail>
          ) : null}

          <Toast ref="toasts" />
          <Loader isLoader={this.state.isLoading}> </Loader>
        </View>
      </>
    );
  }

  renderList = (item, index) => {

    // console.log(item)

    return <>

      <SwipeableList
        onPress={() => {
          this.viewAction(index)

        }}
        title={Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}
        fromTo={'Request Type: ' + String(item.requestType).replace(/_/g, " ")}
        statusMain={Utility.splitStatus(item.regularizationStatus)}
        statusMainColor={Utility.statusColor(item.regularizationStatus)}
        rightSwipeActions={(swipeRef) => {

          if (item.regularizationStatus == 'PENDING') {
            return rightSwipeActions(() => this.deleteAction(index), index, swipeRef.current)
          }
          else return <></>

        }}
      />




      {/* <View
        style={
          item.regularizationStatus == 'APPROVED'
            ? styles.approvedCardView
            : item.regularizationStatus == 'REJECTED'
            ? styles.rejectCardView
            : styles.pendingCardView
        }
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 12,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'contain', marginLeft: 16}}
            source={
              item.regularizationStatus == 'APPROVED'
                ? require('../../images/grant_leaves-approved.png')
                : item.regularizationStatus == 'REJECTED'
                ? require('../../images/grant_leaves-reject.png')
                : require('../../images/grant_leaves-processing.png')
            }></Image>
  
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 13,
              padding: 8,
              color: 'black',
              marginTop: 10,
              flex: 1,
            }}>
            {Utility.splitStatus(item.regularizationStatus)}
          </Text>
  
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.viewAction(index)}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={require('../../images/viewGray.png')}
            />
          </TouchableOpacity>
  
          
  
          {item.regularizationStatus == 'PENDING' ? (
            <TouchableOpacity
              style={{
                marginRight: 10,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.deleteAction(index)}>
              <Image
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={require('../../images/deleteGray.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 2, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check In
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkInTime))}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check Out
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkOutTime))}
            </Text>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Regularization Date
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </View> */}
    </>
  }

  renderListOnlyForPending = (item, index) => (
    <>

      {item.regularizationStatus == 'PENDING' ?

        <SwipeableList
          onPress={() => {
            this.viewAction(index)

          }}
          title={Utility.convertToDDMMYYYY(String(item.appliedOnDate).split(' ')[0])}
          fromTo={'Request Type: ' + item.requestType}
          statusMain={Utility.splitStatus(item.regularizationStatus)}
          statusMainColor={Utility.statusColor(item.regularizationStatus)}
          rightSwipeActions={(swipeRef) => {

            if (item.regularizationStatus == 'PENDING') {
              return rightSwipeActions(() => this.deleteAction(index), index, swipeRef.current)
            }
            else return <></>

          }}
        />
        : <></>
      }

      {/* <View
        style={
          item.regularizationStatus == 'APPROVED'
            ? styles.approvedCardView
            : item.regularizationStatus == 'REJECTED'
            ? styles.rejectCardView
            : styles.pendingCardView
        }
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 12,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'contain', marginLeft: 16}}
            source={
              item.regularizationStatus == 'APPROVED'
                ? require('../../images/grant_leaves-approved.png')
                : item.regularizationStatus == 'REJECTED'
                ? require('../../images/grant_leaves-reject.png')
                : require('../../images/grant_leaves-processing.png')
            }></Image>
  
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 13,
              padding: 8,
              color: 'black',
              marginTop: 10,
              flex: 1,
            }}>
            {Utility.splitStatus(item.regularizationStatus)}
          </Text>
  
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.viewAction(index)}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={require('../../images/viewGray.png')}
            />
          </TouchableOpacity>
  
          
  
          {item.regularizationStatus == 'PENDING' ? (
            <TouchableOpacity
              style={{
                marginRight: 10,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.deleteAction(index)}>
              <Image
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={require('../../images/deleteGray.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 2, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check In
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkInTime))}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check Out
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkOutTime))}
            </Text>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Regularization Date
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </View> */}
    </>
  );

  renderListOnlyForApproved = (item, index) => (
    <>

      {item.regularizationStatus == 'APPROVED' ?

        <SwipeableList
          onPress={() => {
            this.viewAction(index)

          }}
          title={Utility.convertToDDMMYYYY(String(item.appliedOnDate).split(' ')[0])}
          fromTo={'Request Type: ' + item.requestType}
          statusMain={Utility.splitStatus(item.regularizationStatus)}
          statusMainColor={Utility.statusColor(item.regularizationStatus)}

        />

        : <></>}

      {/* <View
        style={
          item.regularizationStatus == 'APPROVED'
            ? styles.approvedCardView
            : item.regularizationStatus == 'REJECTED'
            ? styles.rejectCardView
            : styles.pendingCardView
        }
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 12,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'contain', marginLeft: 16}}
            source={
              item.regularizationStatus == 'APPROVED'
                ? require('../../images/grant_leaves-approved.png')
                : item.regularizationStatus == 'REJECTED'
                ? require('../../images/grant_leaves-reject.png')
                : require('../../images/grant_leaves-processing.png')
            }></Image>
  
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 13,
              padding: 8,
              color: 'black',
              marginTop: 10,
              flex: 1,
            }}>
            {Utility.splitStatus(item.regularizationStatus)}
          </Text>
  
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.viewAction(index)}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={require('../../images/viewGray.png')}
            />
          </TouchableOpacity>
  
          
  
          {item.regularizationStatus == 'PENDING' ? (
            <TouchableOpacity
              style={{
                marginRight: 10,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.deleteAction(index)}>
              <Image
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={require('../../images/deleteGray.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 2, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check In
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkInTime))}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check Out
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkOutTime))}
            </Text>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Regularization Date
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </View> */}
    </>
  );

  renderListOnlyForCancelled = (item, index) => (
    <>

      {item.regularizationStatus == 'CANCELLED' ?

        <TouchableOpacity style={{ height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '2%', marginTop: 5, backgroundColor: 'white', width: '100%' }}
          activeOpacity={0.5}

          onPress={() => {
            this.viewAction(index)

          }}
        >
          {/* Image */}

          <Shadow distance={5} containerViewStyle={{

            //  alignItems: 'center',

          }} offset={[0.2, 2]}
            startColor='#e6e6e6'
          // finalColor='#9b9aed' 
          // corners={'bottomRight'}
          >
            <View style={{
              // borderWidth: 0.7,
              borderRadius: 45,
              marginRight: 2,
              overflow: 'hidden',
              backgroundColor: 'white'
            }}>
              <Image style={{
                width: 45, height: 45,
                // resizeMode: 'contain', 
                borderRadius: 22.5,
                // borderWidth: 2
              }} source={require('../../images/userGroup.png')}></Image>
            </View>
          </Shadow>
          {/* Text Bar Container */}
          <View style={{
            flex: 1, width: '100%', height: '100%',
            // borderTopWidth: 0.4, 
            borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
          }}>
            <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

              {/* All Text  */}
              <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{Utility.splitStatus(item.regularizationStatus)}</Text>
                {/* <Text allowFontScaling={false} style={item.regularizationStatus  == "APPROVED" ? styles.approveStatus : item.regularizationStatus  == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text> */}
                <Text allowFontScaling={false} style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}</Text>

              </View>

              <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Check In</Text>
                <Text style={{ fontSize: 9.5, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Utility.checkNull(String(item.checkInTime))}</Text>

              </View>

              <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Check Out</Text>
                <Text allowFontScaling={false} style={{ fontSize: 9.5, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Utility.checkNull(String(item.checkOutTime))}</Text>

              </View>

            </View>

            {/* Arrow Image */}
            <Image style={{
              transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 7, width: 15,
              height: 15,
              resizeMode: 'contain',
            }} source={require('../../images/downArrow.png')} />





          </View>


        </TouchableOpacity>

        : <></>}

      {/* <View
        style={
          item.regularizationStatus == 'APPROVED'
            ? styles.approvedCardView
            : item.regularizationStatus == 'REJECTED'
            ? styles.rejectCardView
            : styles.pendingCardView
        }
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 12,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'contain', marginLeft: 16}}
            source={
              item.regularizationStatus == 'APPROVED'
                ? require('../../images/grant_leaves-approved.png')
                : item.regularizationStatus == 'REJECTED'
                ? require('../../images/grant_leaves-reject.png')
                : require('../../images/grant_leaves-processing.png')
            }></Image>
  
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 13,
              padding: 8,
              color: 'black',
              marginTop: 10,
              flex: 1,
            }}>
            {Utility.splitStatus(item.regularizationStatus)}
          </Text>
  
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.viewAction(index)}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={require('../../images/viewGray.png')}
            />
          </TouchableOpacity>
  
          
  
          {item.regularizationStatus == 'PENDING' ? (
            <TouchableOpacity
              style={{
                marginRight: 10,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.deleteAction(index)}>
              <Image
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={require('../../images/deleteGray.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 2, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check In
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkInTime))}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check Out
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkOutTime))}
            </Text>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Regularization Date
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </View> */}
    </>
  );

  renderListOnlyForRejected = (item, index) => (
    <>
      {item.regularizationStatus == 'REJECTED' ?
        <SwipeableList
          onPress={() => {
            this.viewAction(index)

          }}
          title={Utility.convertToDDMMYYYY(String(item.appliedOnDate).split(' ')[0])}
          fromTo={'Request Type: ' + item.requestType}
          statusMain={Utility.splitStatus(item.regularizationStatus)}
          statusMainColor={Utility.statusColor(item.regularizationStatus)}

        />

        : <></>
      }
      {/* <View
        style={
          item.regularizationStatus == 'APPROVED'
            ? styles.approvedCardView
            : item.regularizationStatus == 'REJECTED'
            ? styles.rejectCardView
            : styles.pendingCardView
        }
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 12,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'contain', marginLeft: 16}}
            source={
              item.regularizationStatus == 'APPROVED'
                ? require('../../images/grant_leaves-approved.png')
                : item.regularizationStatus == 'REJECTED'
                ? require('../../images/grant_leaves-reject.png')
                : require('../../images/grant_leaves-processing.png')
            }></Image>
  
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 13,
              padding: 8,
              color: 'black',
              marginTop: 10,
              flex: 1,
            }}>
            {Utility.splitStatus(item.regularizationStatus)}
          </Text>
  
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.viewAction(index)}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={require('../../images/viewGray.png')}
            />
          </TouchableOpacity>
  
          
  
          {item.regularizationStatus == 'PENDING' ? (
            <TouchableOpacity
              style={{
                marginRight: 10,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.deleteAction(index)}>
              <Image
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={require('../../images/deleteGray.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 2, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check In
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkInTime))}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Check Out
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Utility.checkNull(String(item.checkOutTime))}
            </Text>
          </View>
        </View>
  
        <View style={{flexDirection: 'row', height: 50}}>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'rgba(148,149,150,1.0)',
                paddingTop: 16,
                paddingLeft: 16,
              }}>
              Regularization Date
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
                paddingTop: 4,
                paddingLeft: 16,
              }}>
              {Moment(item.regularizationDate + ' 00:00:00').format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </View> */}
    </>
  );

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
      isCheckInTimePickerVisible: false,
      isCheckOutTimePickerVisible: false,
    });
  };

  handleDatePicked = date => {
    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('DD/MM/YYYY');
    var pickedShiftDt = Moment(momentDate).format('DD-MM-YYYY');

    var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD');
    var pickedChekInServerDt = Moment(momentDate).format('DD-MM-YYYY HH:mm');

    var pickedChekInDt = Moment(momentDate).format('h:mm a');

    if (this.state.isCheckInTimePickerVisible) {
      this.setState({
        checkInTime: pickedChekInDt,
        checkInServerTime: pickedChekInServerDt,
      });
    } else if (this.state.isCheckOutTimePickerVisible) {
      this.setState({
        checkOutTime: pickedChekInDt,
        checkOutServerTime: pickedChekInServerDt,
      });
    } else {
      this.setState({
        regularizationDate: String(pickedDt),
        regularizationServerDate: pickedServerDt,
      });

      this.fetchSelectedShift(pickedShiftDt);
    }
    this.hideDateTimePicker();
  };

  closeModel() {

    var reason = '';
    var reasonId = '';

    if (this.state.resonArr.length != 0) {
      reason = this.state.resonArr[0].assignedReason;
      reasonId = this.state.resonArr[0].reasonId;
    }

    this.setState({
      regularizationDate: 'Select Date',
      regularizationServerDate: '',
      isTimePickerVisible: false,
      requestType: 'Check-in Request',
      requestServerType: 'CHECK_IN',
      checkInTime: '',
      checkOutTime: '',
      checkInServerTime: null,
      checkOutServerTime: null,
      isCheckOutTimePickerVisible: false,
      isCheckInTimePickerVisible: false,
      showRequestPicker: false,
      showReasonPicker: false,
      reason: reason,
      reasonId: reasonId,
      comment: '',
      isEdit: false,
      addRegularizationTitle: 'New Regularization Request',
      id: '',
    });

    if (this.props.openApplyReg) {

      this.props.goBack()

    }

    if (this.props.isFromMyAttandance == true) {

      this.props.fromRegToMyAttd()

    }

    else {
      this.toggleModal();
    }

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onSubmit() {
    if (this.state.regularizationDate == 'Select Date') {
      Alert.alert('Please select date.');
      Vibration.vibrate()
    } else if (this.state.reason == '') {
      Alert.alert('Please select reason');
      Vibration.vibrate()
    } else if (this.state.requestServerType == 'CHECK_IN') {
      if (this.state.checkInTime == '') {
        Alert.alert('Please select check in time');
        Vibration.vibrate()
      } else if (
        this.state.shiftValue == '' ||
        this.state.shiftValue == 'Select Shift'
      ) {
        Alert.alert('Please select shift');
        Vibration.vibrate()
      } else {

        if (this.state.isHalfDay == 'Yes') {

          if (this.state.dayHalfs == null) {
            Alert.alert('Please Select Half');
            Vibration.vibrate()
            return
          }

        }

        if (this.state.isEdit) {
          this.submitRegularizationRequest('PUT', this.state.id);
        } else {
          this.submitRegularizationRequest('POST');
        }
      }
    } else if (this.state.requestServerType == 'CHECK_OUT') {
      if (this.state.checkOutTime == '') {
        Alert.alert('Please select check out time');
        Vibration.vibrate()
      } else if (
        this.state.shiftValue == '' ||
        this.state.shiftValue == 'Select Shift'
      ) {
        Alert.alert('Please select shift');
        Vibration.vibrate()
      } else {
        if (this.state.isHalfDay == 'Yes') {

          if (this.state.dayHalfs == null) {
            Alert.alert('Please Select Half');
            Vibration.vibrate()
            return
          }

        }

        if (this.state.isEdit) {
          this.submitRegularizationRequest('PUT', this.state.id);
        } else {
          this.submitRegularizationRequest('POST');
        }
      }
    } else if (this.state.requestServerType == 'CHECKIN_AND_CHECKOUT') {
      if (this.state.checkInTime == '') {
        Alert.alert('Please select check in time');
        Vibration.vibrate()
      } else if (this.state.checkOutTime == '') {
        Alert.alert('Please select check out time');
        Vibration.vibrate()
      } else if (this.state.shiftValue == '') {
        Alert.alert('Please select shift');
        Vibration.vibrate()
      } else {

        if (this.state.isHalfDay == 'Yes') {

          if (this.state.dayHalfs == null) {
            Alert.alert('Please Select Half');
            Vibration.vibrate()
            return
          }

        }

        if (this.state.isEdit) {
          this.submitRegularizationRequest('PUT', this.state.id);
        } else {
          this.submitRegularizationRequest('POST');
        }
      }
    }
  }

  deleteAction(i) {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete?',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () =>
            this.deleteRegularization(
              this.state.attendanceArr[i].regularizationRequestsId,
            ),
        },
      ],
      { cancelable: false },
    );
  }

  editAction(i) {
    let obj = this.state.attendanceArr[i];
    let id = obj.regularizationRequestsId;
    let date = obj.regularizationDate[0];

    let userDt = Moment(date, ['YYYY-MM-DD']).format('DD-MM-YYYY');
    let typeServerRequest = obj.requestType;

    let requestUserType = '';

    if (typeServerRequest == 'CHECK_IN') {
      requestUserType = 'Check-in Request';
    } else if (typeServerRequest == 'CHECK_OUT') {
      requestUserType = 'Check-out Request';
    } else if (typeServerRequest == 'CHECKIN_AND_CHECKOUT') {
      requestUserType = 'Check-in and Check-in Request';
    }
    let reasonId = obj.regularizationReason;
    let reason = '';

    this.state.resonArr.map((m, i) => {
      if (m.reasonId == reasonId) {
        reason = m.assignedReason;
      }
    });

    let checkInServer = obj.checkInTime;
    let checkOutServer = obj.checkOutTime;

    let checkIn = obj.checkInTime; //Utility.convertTime(checkInServer)
    let checkOut = obj.checkOutTime; //Utility.convertTime(checkOutServer)
    let comment = obj.regularizationComments;
    let shiftId = obj.shiftRecordId;
    this.fetchShift(shiftId);
    this.setState({
      regularizationDate: userDt,
      regularizationServerDate: date,
      isTimePickerVisible: false,
      requestType: requestUserType,
      requestServerType: typeServerRequest,
      checkInTime: checkIn,
      checkOutTime: checkOut,
      checkInServerTime: checkInServer,
      checkOutServerTime: checkOutServer,
      isCheckOutTimePickerVisible: false,
      isCheckInTimePickerVisible: false,
      showRequestPicker: false,
      showReasonPicker: false,
      reason: reason,
      reasonId: reasonId,
      comment: comment,
      isEdit: true,
      addRegularizationTitle: 'Edit Regularization Request',
      id: obj.regularizationRequestsId,
    });

    this.toggleModal();
  }

  viewAction(index) {
    let obj = this.state.attendanceArr[index];

    const value = Object.values(obj);

    const key = Object.keys(obj);

    var keyArr = [
      'Name',
      'Status',
      'Regularization Date',
      'Applied on',
      'Type of Request',
      'Requested Check In',
      'Requested Check Out',
      'Reason',
      'Comment',
    ];



    var arr = [];

    arr.push(String(obj.empName))
    arr.push(Utility.splitStatus(obj.regularizationStatus));
    arr.push(Moment(obj.regularizationDate + ' 00:00:00').format('DD-MM-YYYY'));
    arr.push(Moment(obj.appliedOnDate).format('DD-MM-YYYY'));
    arr.push(String(obj.requestType).replace(/_/g, " "));
    arr.push(Utility.checkNull(obj.checkInTime));
    arr.push(Utility.checkNull(obj.checkOutTime));

    if (obj?.dayHalfs != null || obj?.dayHalfs != undefined) {

      keyArr.splice(7, 0, 'HalfDay')

      arr.push(String(obj?.dayHalfs).replace(/_/g, " "))

    }

    this.state.resonArr.map((m, i) => {
      if (obj.regularizationReason == m.reasonId) {
        arr.push(m.assignedReason);
      }
    });

    arr.push(Utility.checkNull(obj.regularizationComments));



    this.setState({
      regularizationViewKeyArr: keyArr,
      regularizationViewValueArr: arr,
      isView: true,
    });


  }

  filterItem() {
    let arr = [];
    if (this.state.showRequestPicker) {
      this.state.typeRequestArr.map((m, index) => {
        arr.push(m.value);
      });
    } else if (this.state.shiftPicker) {
      this.state.shiftArr.map((item, index) => {
        arr.push(
          item.shiftName +
          ' [' +
          item.shiftStartTime +
          ' - ' +
          item.shiftEndTime +
          ']',
        );
      });
    } else {
      this.state.resonArr.map((m, index) => {
        arr.push(m.assignedReason);
      });
    }

    return arr;
  }

  //PICKER ACTION
  handleSubmit = (val, index) => {
    if (this.state.showRequestPicker) {
      this.setState({
        showRequestPicker: false,
        showReasonPicker: false,
        requestType: val,
        requestServerType: this.state.typeRequestArr[index].label,
        checkInServerTime: null,
        checkInTime: '',
        checkOutTime: '',
        checkOutServerTime: null,
      });
    } else if (this.state.shiftPicker) {
      this.setState({
        showRequestPicker: false,
        showReasonPicker: false,
        shiftPicker: false,
        shiftValue: val,
        shiftId: this.state.shiftArr[index].shiftRecordId,
      });
    } else {
      this.setState({
        showRequestPicker: false,
        showReasonPicker: false,
        reason: val,
        reasonId: this.state.resonArr[index].reasonId,
      });
    }
  };
}