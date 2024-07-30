import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput, FlatList, Alert, ImageBackground, Vibration } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Moment from 'moment';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as Utility from '../../Externel Constant/Utility';

import DateTimePicker from "react-native-modal-datetime-picker";
import DialogInput from 'react-native-dialog-input';

import Loader from '../../components/Loader';
import ViewItemDetail from '../../components/ViewItemDetail';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Shadow } from 'react-native-shadow-2';
// import AsyncStorage from '@react-native-community/async-storage';
// import { connect } from "react-redux";
import MainAPIPayload from '../../ReduxReducer/MainAPIPayload';
import { setMainAPIPayload } from '../../ReduxAction';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import SubmitBtnWide from '../../components/SubmitBtnWide';
import { COLORS } from '../../Constant/Index';
import CancelBtnWide from '../../components/CancelBtnWide';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomTextField from '../../components/CustomTextField';
import CustomCommentInput from '../../components/CustomCommentInput';
import SwipeableList from '../../components/SwipeableList';

const rightSwipeActions = (rejectFunc, editAction, index, swipeRef) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (

    <>

      <TouchableOpacity
        style={{
          width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
          marginTop: 5, alignItems: 'center', paddingVertical: 2
        }}
        onPress={() => {

          editAction()

          swipeRef?.close()

        }}
      >

        <View
          style={{
            width: '100%', height: '100%', backgroundColor: '#008000', justifyContent: 'center', flexDirection: 'row'

          }}
        >


          <View style={{ width: '100%', height: '100%', backgroundColor: "#008000", justifyContent: 'center', alignItems: 'center' }}>

            <Image

              source={require('../../images/editGray.png')}
              style={{
                width: 21,
                height: 21,
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
      <TouchableOpacity
        style={{
          width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
          marginTop: 5, alignItems: 'center', paddingVertical: 2
        }}
        onPress={() => {

          rejectFunc()
          swipeRef?.close()
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
                // alignSelf: 'center',
                // right: 10,
                tintColor: 'white'

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

    </>
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
    shadowRadius: 8.30,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(70,169,64,1.0)'
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
    shadowRadius: 8.30,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(197,95,94,1.0)'

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
    shadowRadius: 8.30,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(243,219,131,1.0)'
  },
  approveStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(70,169,64,1.0)' },
  rejectStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(197,95,94,1.0)', paddingTop: 4, paddingLeft: 16 },
  pendingStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(237,205,70,1.0)', paddingTop: 4, paddingLeft: 16 },

  firstView: {
    width: "100%",

    alignItems: 'center',
    justifyContent: 'center'

  },

  titleView: { fontFamily: Constant.MontserratRegular, fontSize: 13, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }

}
)

class MyGrantLeave extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      authDict: {},
      GrantLeaveArr: [],
      isLoading: false,
      detailsKeyArr: [],
      detailsValueArr: [],
      isView: false,
      isApplyView: false,
      openPopUp: false,
      grantDate: 'Select Date',
      grantServerDate: '',
      leaveComment: '',
      viewAppliedOn: '',
      viewStatus: '',
      isDateTimePickerVisible: false,
      deleteCheck: false,
      compOffDelId: '',
      compOffReason: '',
      isFromEdit: false,
      editLeaveId: '',
      viewPendingDetail: false,
      viewAppliedFor: '',
      editViewDetails: false,
      isEdit: false,
      menuVisible: false,
      MenuItemClicked: 0,
      isListEmpty: false

    }
  }


  //   async removeItemValue(key) {
  //     console.log(key);
  //     try {
  //         await AsyncStorage.removeItem(key);
  //         return true;
  //     }
  //     catch(exception) {
  //         return false;
  //     }
  // }


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


  showDateTimePicker = () => {

    this.setState({ isDateTimePickerVisible: true });

  };

  hideDateTimePicker = () => {

    this.setState({
      isDateTimePickerVisible: false,
    });

  };

  handleDatePicked = date => {

    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('DD/MM/YYYY')
    var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD')

    this.setState({ grantDate: String(pickedDt), grantServerDate: pickedServerDt });
    this.hideDateTimePicker();
  };


  componentDidMount() {

    console.log("Redux Class Test", this.props.MainAPIPayload);
    // console.log(this.removeItemValue('LeaveApplicationHistory'))

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.getGrantTypeHistory()
      }
    });


  }


  clickMenu() {

    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }



  //WEB API

  async getGrantTypeHistory() {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GRANT_LEAVE + this.state.authDict.employeeCode
    console.log(url)
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
        console.log(responseJson)

        if (responseJson?.length == 0) {

          this.setState({ isListEmpty: true });
          return
        }

        let arr = responseJson
        let dataArr = []
        for (let i = 0; i < arr.length; i++) {
          let obj = arr[i]
          var dict = {
            leaveStatus: obj.leaveStatus,
            orgLeaveStatus: Utility.splitStatus(obj.leaveStatus),
            appliedOn: Moment(obj.appliedOn).format('DD-MM-YYYY'),
            appliedFor: Moment(obj.appliedFor).format('DD-MM-YYYY'),
            comment: obj.comment,
            appliedForServerDt: obj.appliedFor,
            compOffId: obj.compOffId,
          }
          dataArr.push(dict)
        }

        this.setState({ GrantLeaveArr: dataArr })

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()
        //   this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //  this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ loading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
    }
  }

  async submitGrantTypeData() {

    var url = Constant.BASE_URL + Constant.APPLY_COMPOFF
    let arr = []
    arr.push(this.state.authDict.employeeCode)
    var params = {
      empCodeList: arr, comment: this.state.leaveComment, categoryName: 'Comp Offs',
      appliedFor: this.state.grantServerDate
    }
    this.setState({ openPopUp: false, grantDate: 'Select Date', leaveComment: '', isFromEdit: false, isLoading: true })

    console.log(params)
    try {
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 201) {
        let responseJson = await response.json();
        console.log(responseJson)

        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //  this.refs.toast.show(responseJson.message, 5000)
        this.getGrantTypeHistory()
      } else if (code == 400) {
        let responseJson = await response.json();
        console.log(responseJson)

        Alert.alert(responseJson.message)
        Vibration.vibrate()

        // this.refs.toasts.show('Something went wrong / grant dates should not of future date.');
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //  this.refs.toasts.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async deleteGrantLeave(leaveId, comment) {

    this.setState({ openPopUp: false, grantDate: 'Select Date', leaveComment: '', isLoading: true })
    var url = Constant.BASE_URL + Constant.CANCEL_GRANT_APPLICATION + leaveId + '/action?action=CANCEL&&comments='
    console.log(url)

    var params = { comment: comment }
    console.log(params)

    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )
      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 201) {
        let responseJson = await response.json();
        console.log(responseJson)
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //  this.refs.toast.show(responseJson.message, 5000)
        this.getGrantTypeHistory()
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //   this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
        Vibration.vibrate()

        //  this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async updateGrantLeave(leaveId) {

    var url = Constant.BASE_URL + Constant.CANCEL_GRANT_APPLICATION + leaveId + '/action?action=UPDATE'

    console.log(url)

    let arr = []
    arr.push(this.state.authDict.employeeCode)
    var params = {
      empCodeList: arr, comment: this.state.leaveComment, categoryName: 'Comp Offs',
      appliedFor: this.state.grantServerDate
    }

    this.setState({ openPopUp: false, grantDate: 'Select Date', leaveComment: '', isLoading: true, grantServerDate: '', editLeaveId: '' })

    console.log(params)

    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 200) {
        let responseJson = await response.json();
        console.log(responseJson)
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //   this.refs.toast.show(responseJson.message, 5000)
        this.getGrantTypeHistory()
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //  this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {

        // this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  render() {
    console.log('rendring')
    console.log('ref', this.refs)
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



          {
            this.state.GrantLeaveArr.length != 0 ?

              <FlatList
                data={this.state.GrantLeaveArr}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item, index }) => this.state.MenuItemClicked == 1 ? this.renderListOnlyForPending(item, index) : this.state.MenuItemClicked == 2 ? this.renderListOnlyForApproved(item, index) : this.state.MenuItemClicked == 3 ? this.renderListOnlyForCancelled(item, index) : this.state.MenuItemClicked == 4 ? this.renderListOnlyForRejected(item, index) : this.renderList(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
              :
              this.state.isListEmpty ?
              <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

              </Text>:
              <></>
          }

          {/* <TouchableOpacity style={{
          alignSelf: 'flex-end',
          height: 60,
          width: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 60,
          shadowOffset: {width: 0, height: 5},
          shadowColor: '#9b9aed',
          shadowOpacity: 3.0,
          elevation: 3,
          right: 20,
        }} onPress={() => this.setState({ openPopUp: true })}>
          <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
        </TouchableOpacity> */}

          <FloatBtnComp clickBtn={() => {
            this.setState({ openPopUp: true })
            // this.props.navigation.navigate('TestPages')
            // this.props.setMainAPIPayload({hi: 'hh'})

          }

          } />


          {
            this.state.isView ?
              <ViewItemDetail buttonDisable={true} viewDetail={this.state.isView} title='Leave Grant Details' keyArr={this.state.detailsKeyArr} valueArr={this.state.detailsValueArr} cancelAction={() => this.setState({ isView: false })}>
              </ViewItemDetail>
              : null
          }

          {/* Add Edit Grant Leave */}

          <Modal
            visible={this.state.openPopUp
              // this.state.openPopUp
            }
            animationType='slide'
            transparent={true}
            onRequestClose={() => { this.setState({ openPopUp: false }) }}
          >

            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>

              <TouchableOpacity onPress={() => this.setState({ openPopUp: false, isFromEdit: false, grantDate: 'Select Date', leaveComment: '' })} activeOpacity={1} style={{ flex: 1, width: '100%' }}></TouchableOpacity>

              <View style={{ width: Dimensions.get('window').width, height: '40%', backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius: 20, overflow: 'hidden', }}>


                <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#F6F4FB', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row', paddingHorizontal: 12 }}>
                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 17, color: 'black', fontWeight: '500', }}>{!this.state.isFromEdit ? 'Add Leave Grant' : 'Edit Leave Grant'}
                  </Text>
                </View>


                {/* SELECT DATE */}
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '90%', height: 45, marginTop: 8
                  }} onPress={() => this.showDateTimePicker()}>

                    <Text allowFontScaling={false} style={{ fontSize: 13, color: 'black', fontWeight: '100', paddingLeft: 8 }}>{this.state.grantDate}</Text>

                    <Image
                      source={require('../../images/downArrow.png')}
                      style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                    />

                  </TouchableOpacity>
                  <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                  </View>

                  {/* Leave Comment*/}

                  <TextInput allowFontScaling={false}
                    style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey' }}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder='Leave Comment'
                    placeholderTextColor="#A9A9A9"
                    value={this.state.leaveComment}
                    onChangeText={(leaveComment) => this.setState({ leaveComment: leaveComment })}
                    returnKeyType="done" />
                  <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                  </View>

                </View>

                {/* Submit Button*/}

                {/* <View style={{
                  height: 60, flexDirection: 'row', justifyContent: 'space-around'
                  , alignItems: 'center', marginTop: 16, borderRadius: 8, width: Dimensions.get('window').width - 40
                }}> */}


                {/* <TouchableOpacity style={{ height: 35, width: '42%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(42,76,136,1.0)', left: 18 }}
                  onPress={() => this.setState({ openPopUp: false, isFromEdit: false, grantDate: 'Select Date', leaveComment: '' })}>
                  <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Cancel</Text>

                </TouchableOpacity> */}
                {/* <View style={{ left: 18 }}> */}
                {/* <CancelBtn onPress={() => {
                    this.setState({ openPopUp: false, isFromEdit: false, grantDate: 'Select Date', leaveComment: '' })
                  }} /> */}
                {/* </View> */}

                {/* <View style={{ right: 18 }}> */}
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10%', }}>
                  <SubmitBtnWide onPress={() => {
                    this.submitGrantRequest()
                  }} />
                </View>
                {/* </View> */}
                {/* <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)', right: 18 }}
                  onPress={() => this.submitGrantRequest()}>
                  <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Submit</Text>

                </TouchableOpacity> */}

                {/* </View> */}


              </View>
              <DateTimePicker
                titleIOS=''
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                maximumDate={new Date()}
              />

            </View>
            <Toast ref="toasts" />

          </Modal>

          {/* Loader  Modal */}

          <Loader isLoader={this.state.isLoading}> </Loader>







          {/* Doalog Box */}


          <DialogInput isDialogVisible={this.state.deleteCheck}
            title={"Confirmation"}
            message={'Are you sure you want to cancel this leave application?'}
            hintInput={"Reason for cancellation"}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            submitInput={(inputText) => {

              if (inputText != '') {


                this.deleteGrantLeave(this.state.compOffDelId, inputText)
                this.setState({ deleteCheck: false })

              }

            }}
            closeDialog={() => { this.setState({ deleteCheck: false }) }}>
          </DialogInput>

          {/*    New View Edit Screen  */}
          <Modal
            visible={this.state.viewPendingDetail}
            transparent={false}
            onRequestClose={() => { this.setState({ viewPendingDetail: false }) }}>


            {/* <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}> */}
            <View style={{ flex: 1, backgroundColor: COLORS.FormBGColor }}>
              <ImageBackground style={{ height: 290, width: '100%' }} source={require('../../images/dashHeader.jpg')}>

                <View style={{ height: 80, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flex: 3, alignItems: 'flex-end' }}>


                    <TouchableOpacity style={{ height: 75, width: 75, justifyContent: 'center', alignItems: 'center' }}
                      onPress={() => this.setState({ viewPendingDetail: false, isEdit: false })}>
                      <Image source={require('../../images/downArrow.png')} style={{
                        height: 25,
                        width: 25,
                        resizeMode: 'contain',
                        marginTop: 16,
                        transform: [{ rotate: '90deg' }],
                        tintColor: 'white',
                        right: 10
                      }} />

                    </TouchableOpacity>


                  </View>

                  <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, fontSize: 17, textAlign: 'center', width: '100%', marginTop: 17, color: 'white' }}>{'Leave Grant Details'}</Text>
                  </View>
                  <View style={{ flex: 3, alignItems: 'flex-end' }}>

                  </View>

                </View>


                <View style={styles.firstView}>


                  <View style={{
                    width: 100, height: 100, marginTop: 10
                  }} onPress={() => { }}>

                    <Image source={require('../../images/user.jpeg')} style={{
                      width: '100%', height: '100%', resizeMode: 'cover',
                      alignItems: "center", borderRadius: 50, borderWidth: 1, borderColor: 'white'
                    }} >

                    </Image>

                  </View>

                  <Text style={{ color: 'white', fontFamily: Constant.MontserratSemiBold, padding: 4, fontSize: 14, marginTop: 5 }}>{String(this.state.viewStatus)}</Text>
                  {/* <Text style={{ color: 'white', fontFamily: Constant.MontserratRegular, fontSize: 13 }}>{'Nothing'}</Text> */}


                </View>

              </ImageBackground>

              <ScrollView style={{ height: "100%", width: "100%", marginTop: -50 }} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 16, shadowColor: "grey", shadowOpacity: 0.8, shadowRadius: 3, shadowOffset: { height: 1, width: 1 }, paddingBottom: 15 }}>



                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={styles.titleView}>{"Status:"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 12,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(Utility.splitStatus(this.state.viewStatus))}

                    >
                    </TextInput>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={styles.titleView}>{"Applied On:"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 12,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(this.state.viewAppliedOn)}

                    >
                    </TextInput>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={styles.titleView}>{"Applied For:"}</Text>

                    {!this.state.isEdit ?

                      <TextInput allowFontScaling={false} style={this.getTextStyle()}
                        autoCorrect={false} keyboardType="ascii-capable" editable={false}
                        value={String(this.state.viewAppliedFor)}

                      >
                      </TextInput>
                      :
                      <TouchableOpacity style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', width: '50%', height: 45, marginTop: '3%', borderBottomWidth: 0.5,
                        borderColor: 'gray',
                      }} onPress={() => this.showDateTimePicker()}>

                        <Text allowFontScaling={false} style={{
                          fontSize: 13, color: 'black', marginLeft: '9%',
                        }}>{this.state.grantDate}</Text>

                        <Image
                          source={require('../../images/downArrow.png')}
                          style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                        />

                      </TouchableOpacity>

                    }
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={styles.titleView}>{"Comment:"}</Text>

                    <TextInput allowFontScaling={false} style={this.getTextStyle()}
                      autoCorrect={false} keyboardType="ascii-capable" editable={this.state.isEdit}
                      onChangeText={(text) => this.setState({ leaveComment: text })}
                      value={String(this.state.leaveComment)}

                    >
                    </TextInput>
                  </View>

                  <DateTimePicker
                    titleIOS=''
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    maximumDate={new Date()}
                  />


                  <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

                    {this.state.isEdit ?
                      <SubmitBtnWide TextOnPressIn='#6AC47E' defaultBgColor='#6AC47E' onPress={() => {

                        this.updateGrantLeave(this.state.editLeaveId)

                      }} title="Save" />
                      :
                      <CancelBtnWide onPress={() => { this.setState({ isEdit: true }) }} imgPath={require('../../images/edit.png')} title="Edit Details" />
                    }
                  </View>


                </View>
              </ScrollView>
            </View>
          </Modal>


          <Toast ref="toast" />

        </View>
      </>
    );
  }

  renderList = (item, index) =>
    <>

      <SwipeableList rightSwipeActions={(swipeRef) => {

        if (item.leaveStatus == 'LEVEL1PENDING') {
          return rightSwipeActions(() => this.deleteAction(index), () => this.editAction(index), index, swipeRef.current)
        }
        else {
          return <></>
        }


      }
      }
        title={'ComppOff'} statusMain={item.orgLeaveStatus} statusMainColor={Utility.statusColor(item.leaveStatus)} fromTo={'Applied on: ' + item.appliedOn + ', Applied for: ' + item.appliedFor}
        onPress={() => this.viewAction(index)}
      >

      </SwipeableList>



    </>

  renderListOnlyForPending = (item, index) =>
    <>

      {item.leaveStatus == 'LEVEL1PENDING' ?

        <SwipeableList rightSwipeActions={(swipeRef) => {

          if (item.leaveStatus == 'LEVEL1PENDING') {
            return rightSwipeActions(() => this.deleteAction(index), () => this.editAction(index), index, swipeRef.current)
          }
          else {
            return <></>
          }


        }
        }
          title={'ComppOff'} statusMain={item.orgLeaveStatus} statusMainColor={Utility.statusColor(item.leaveStatus)} fromTo={'Applied on: ' + item.appliedOn + ', Applied for: ' + item.appliedFor}
          onPress={() => this.viewAction(index)}
        >

        </SwipeableList>

        : <></>
      }
    </>

  renderListOnlyForApproved = (item, index) =>
    <>

      {item.leaveStatus == 'APPROVED' ?


        <SwipeableList
          title={'ComppOff'} statusMain={item.orgLeaveStatus} statusMainColor={Utility.statusColor(item.leaveStatus)} fromTo={'Applied on: ' + item.appliedOn + ', Applied for: ' + item.appliedFor}
          onPress={() => this.viewAction(index)}
        >

        </SwipeableList>


        : <></>
      }
    </>

  renderListOnlyForCancelled = (item, index) =>
    <>
      {item.leaveStatus == 'CANCELLED' ?
        <SwipeableList
          title={'ComppOff'} statusMain={item.orgLeaveStatus} statusMainColor={Utility.statusColor(item.leaveStatus)} fromTo={'Applied on: ' + item.appliedOn + ', Applied for: ' + item.appliedFor}
          onPress={() => this.viewAction(index)}
        >

        </SwipeableList>
        : <></>
      }

    </>

  renderListOnlyForRejected = (item, index) =>
    <>
      {item.leaveStatus == 'REJECTED' ?
        <SwipeableList
          title={'ComppOff'} statusMain={item.orgLeaveStatus} statusMainColor={Utility.statusColor(item.leaveStatus)} fromTo={'Applied on: ' + item.appliedOn + ', Applied for: ' + item.appliedFor}
          onPress={() => this.viewAction(index)}
        >

        </SwipeableList>
        : <></>
      }


    </>



  viewAction(index) {

    let obj = this.state.GrantLeaveArr[index]

    this.setState({ isView: true })


    var arr = []

    var keyArr = ['Status', 'Applied On', 'Applied For', 'Comment']
    arr.push(obj.orgLeaveStatus)
    arr.push(obj.appliedOn)
    arr.push(obj.appliedFor)
    arr.push(obj.comment)

    this.setState({ detailsKeyArr: keyArr, detailsValueArr: arr })
    console.log()

  }

  editAction(index) {

    this.setState({
      openPopUp: true, grantDate: this.state.GrantLeaveArr[index].appliedFor, leaveComment: this.state.GrantLeaveArr[index].comment, isFromEdit: true,
      grantServerDate: this.state.GrantLeaveArr[index].appliedForServerDt, editLeaveId: this.state.GrantLeaveArr[index].compOffId
    })
  }

  deleteAction(i) {

    this.setState({ deleteCheck: true, compOffDelId: this.state.GrantLeaveArr[i].compOffId })
  }

  submitGrantRequest() {

    if (this.state.grantDate == 'Select Date') {
      Alert.alert('Please select date')
      Vibration.vibrate()
    } else {

      this.setState({ openPopUp: false })
      if (this.state.isFromEdit) {
        this.updateGrantLeave(this.state.editLeaveId)

      } else {
        this.submitGrantTypeData()

      }
    }
  }
}

// const mapStateToProps = (state) => {
//   return {
//     MainAPIPayload: state.MainAPIPayload
//   };
// };

// const mapDispatchToProps = {
//   setMainAPIPayload
// };

export default MyGrantLeave;