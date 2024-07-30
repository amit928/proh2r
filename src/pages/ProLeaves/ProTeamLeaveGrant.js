import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput, ImageBackground, Vibration } from 'react-native';
import { Icon } from 'native-base';
import { FlatList, Alert } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import DialogInput from 'react-native-dialog-input';
import Toast, { DURATION } from 'react-native-easy-toast'
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Shadow } from 'react-native-shadow-2';
import Loader from '../../components/Loader';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import SubmitBtnWide from '../../components/SubmitBtnWide';
import CancelBtnWide from '../../components/CancelBtnWide';
import { COLORS } from '../../Constant/Index';
import ViewItemDetail from '../../components/ViewItemDetail';
import SwipeableList from '../../components/SwipeableList';
import DisplayCountBar from '../../components/DisplayCountBar';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.FormBGColor
    //  justifyContent:'center'

  },

  approvedCardView: {
    height: 250,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 16,
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
    height: 250,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 16,
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
    height: 250,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 16,
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
  approveStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(70,169,64,1.0)', paddingTop: 4, paddingLeft: 16 },
  rejectStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(197,95,94,1.0)', paddingTop: 4, paddingLeft: 16 },
  pendingStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(237,205,70,1.0)', paddingTop: 4, paddingLeft: 16 }

}
)


const LeftSwipeActions = (rejectApprfunc, index, hi, swipeRef) => {

  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
    <TouchableOpacity
      style={{
        width: '15%', height: 70, backgroundColor: 'white', justifyContent: 'center',
        marginTop: 5, alignItems: 'center', paddingVertical: 2
      }}
      onPress={() => {

        swipeRef?.close()
        console.log(swipeRef, ' ', index)
        rejectApprfunc()


      }}
    >

      <View
        style={{
          width: '100%', height: '100%', backgroundColor: '#008000', justifyContent: 'center', flexDirection: 'row'

        }}
      >

        <View style={{ width: '100%', height: '100%', backgroundColor: "#008000", justifyContent: 'center', alignItems: 'center' }}>
          <Image

            source={require('../../images/approveTimesheet.png')}
            style={{
              width: 35,
              height: 35,
              resizeMode: 'contain',
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

const rightSwipeActions = (rejectApprfunc, index, hi, swipeRef, editAction) => {



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

          rejectApprfunc()

          swipeRef?.close()

        }}
      >

        <View
          style={{
            width: '100%', height: '100%', backgroundColor: '#e03737', justifyContent: 'center', flexDirection: 'row'

          }}
        >


          <View style={{ width: '100%', height: '100%', backgroundColor: "#e03737", justifyContent: 'center', alignItems: 'center' }}>

            <Image

              source={require('../../images/rejectTimesheet.png')}
              style={{
                width: 35,
                height: 35,
                resizeMode: 'contain',
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
    </>

  );
};


export default class ProTeamGrantLeave extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      authDict: {},
      teamLeaveGrantArr: [],
      teamLeaveGrantViewArr: [],
      teamLeaveGrantDummyArr: [],
      isLoading: false,
      approveCheck: false,
      rejectCheck: false,
      leaveId: '',
      isEdit: false,
      isDateTimePickerVisible: false,
      grantDate: '',
      grantServerDate: '',
      isView: false,
      totalPendingRequest: 0,
      searchValue: '',
      searchEnable: false,
      actionIndex: null,
      btnContainerWidth: 0,
      detailsKeyArr: [],
      refreshing: false,
      menuVisible: false,
      MenuItemClicked: 0,
      teamApplicationArrPending: [],
      teamApplicationArrApproved: [],
      teamApplicationArrRejected: [],
      teamApplicationArrCancelled: [],
      apprRejectIndex: null,
      isListEmpty: false

    }
  }

  clickMenu() {

    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }

  componentDidMount() {

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.getTeamLeaveGrant()

      }
    });
  }

  showDateTimePicker = () => {

    this.setState({ isDateTimePickerVisible: true });

  };

  hideDateTimePicker = () => {

    this.setState({
      isDateTimePickerVisible: false,
    });

  };

  async onRefresh() {


    var url = Constant.BASE_URL + Constant.TEAM_LEAVE_GRANT + this.state.authDict.employeeCode
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ refreshing: false })

      if (code == 200) {

        let responseJson = await response.json();
        let arr = responseJson
        let dataArr = []
        let dataArrPending = []

        console.log(responseJson)

        for (let i = 0; i < arr.length; i++) {

          let obj = arr[i]

          var applyOn = Moment(obj.appliedOn).format('DD/MM/YYYY')
          var applyFor = Moment(obj.appliedFor).format('DD/MM/YYYY')

          //  var pickedServerDt = Moment(obj.appliedFor).format('YYYY-MM-DD')

          var dict = {
            status: obj.leaveStatus,
            orgStatus: Utility.splitStatus(obj.leaveStatus),
            appliedOn: applyOn,
            appliedFor: applyFor,
            comment: obj.comment,
            compOffId: obj.compOffId,
            empName: obj.empName,
            appliedOnServer: obj.appliedOn,
            appliedForServer: obj.appliedFor,
          }


          if (obj.leaveStatus != 'APPROVED') {

            if (obj.leaveStatus == 'LEVEL1PENDING' || obj.leaveStatus == "LEVEL2PENDING") {

              dataArrPending.push(dict)
            } else {
              dataArr.push(dict)

            }
          }


          //  dataArr.push(dict)
        }
        dataArrPending.push(...dataArr)

        this.setState({ teamLeaveGrantArr: dataArrPending, totalPendingRequest: dataArrPending.length, teamLeaveGrantDummyArr: dataArrPending })
        console.log(this.state.teamLeaveGrantArr)



      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //   this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ refreshing: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
    }

  }

  handleDatePicked = date => {

    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('DD/MM/YYYY')
    var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD')

    this.setState({ grantDate: String(pickedDt), grantServerDate: pickedServerDt });
    this.hideDateTimePicker();
  };

  //WEB API
  async getTeamLeaveGrant(onRefreshCall) {

    !onRefreshCall && this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.TEAM_LEAVE_GRANT + this.state.authDict.employeeCode
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      !onRefreshCall && this.setState({ isLoading: false })
      onRefreshCall && this.setState({ refreshing: false })

      if (code == 200) {

        let responseJson = await response.json();
        let arr = responseJson
        let dataArr = []
        let dataArrPending = []
        let dataArrApproved = []
        let dataArrRejected = []
        let dataArrCancelled = []

        if (responseJson?.length == 0) {

          this.setState({ isListEmpty: true });
          return
        }

        console.log('getTeamLeaveGrant', responseJson)

        for (let i = 0; i < arr.length; i++) {

          let obj = arr[i]

          var applyOn = Moment(obj.appliedOn).format('DD/MM/YYYY')
          var applyFor = Moment(obj.appliedFor).format('DD/MM/YYYY')

          //  var pickedServerDt = Moment(obj.appliedFor).format('YYYY-MM-DD')

          var dict = {
            status: obj.leaveStatus,
            orgStatus: Utility.splitStatus(obj.leaveStatus),
            appliedOn: applyOn,
            appliedFor: applyFor,
            comment: obj.comment,
            compOffId: obj.compOffId,
            empName: obj.empName,
            appliedOnServer: obj.appliedOn,
            appliedForServer: obj.appliedFor,
          }

          if (obj.leaveStatus == 'APPROVED') {

            dataArrApproved.push(dict)

          }

          if (obj.leaveStatus == 'REJECTED') {

            dataArrRejected.push(dict)

          }

          if (obj.leaveStatus == 'CANCELLED') {

            dataArrCancelled.push(dict)

          }


          if (obj.leaveStatus != 'APPROVED') {

            if (obj.leaveStatus == 'LEVEL1PENDING' || obj.leaveStatus == "LEVEL2PENDING") {

              dataArrPending.push(dict)
            } else {
              // dataArr.push(dict)

            }
          }


          //  dataArr.push(dict)
        }
        // dataArrPending.push(...dataArr)

        this.setState({ teamLeaveGrantArr: dataArrPending, totalPendingRequest: dataArrPending.length, teamLeaveGrantDummyArr: dataArrPending, teamApplicationArrApproved: dataArrApproved, teamApplicationArrRejected: dataArrRejected, teamApplicationArrCancelled: dataArrCancelled, teamApplicationArrPending: dataArrPending, MenuItemClicked: 0 })
        console.log(this.state.teamLeaveGrantArr)

        console.log('dataArrPending', dataArrPending);
        console.log('dataArrApproved', dataArrApproved);
        console.log('dataArrRejected', dataArrRejected);
        console.log('dataArrCancelled', dataArrCancelled);

        // console.log('objjjj', Utility.getDataSortedOnStatus(responseJson, 'leaveStatus'));



      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //   this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async actionOnleaveApi(value, action) {

    this.setState({ isLoading: true })
    let comment = action == 'REJECT' ? (value == '' ? 'Rejected' : value) : (value == '' ? 'Approved' : value)


    var url = Constant.BASE_URL + Constant.ACTION_COMPOFF + this.state.leaveId + '/action' + '?action=' + action + '&&comments=' + comment
    var params = { action: action, comments: comment }
    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      this.setState({ isLoading: false })

      let code = await response.status

      if (code == 200) {

        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message, 5000)
        this.getTeamLeaveGrant()

        console.log(responseJson)
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        //   this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        // this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async updateGrantLeave(value) {

    this.setState({ isLoading: true, isEdit: false })
    var url = Constant.BASE_URL + Constant.UPDATE_GRANT_LEAVE + this.state.leaveId

    let arr = []
    arr.push(this.state.authDict.employeeCode)

    var params = {
      empCodeList: arr, comment: this.state.comment, categoryName: 'Comp Offs',
      appliedFor: this.state.grantServerDate
    }

    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      this.setState({ isLoading: false })

      let code = await response.status

      if (code == 200) {

        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message, 5000)
        this.getTeamLeaveGrant()
        console.log(responseJson)

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        //  this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }


  render() {

    return (

      <>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: COLORS.FormBGColor }}>


          <Menu
            onRequestClose={() => this.setState({ menuVisible: false })}
            // children={<TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }} onPress={() => setmenuVisible(false)}></TouchableOpacity>}

            visible={this.state.menuVisible}
          // anchor={<Text onPress={showMenu}>Show menu</Text>}
          // onRequestClose={hideMenu}
          >

            {this.state.MenuItemClicked == 0 ? <></> :

              <MenuItem onPress={() => {



                this.setState({
                  MenuItemClicked: 0, menuVisible: false, teamLeaveGrantArr: this.state.teamApplicationArrPending,
                  teamLeaveGrantDummyArr: this.state.teamApplicationArrPending
                })

              }}>Pending</MenuItem>

            }



            {this.state.MenuItemClicked == 1 ? <></> :
              <MenuItem onPress={() => {

                this.setState({
                  MenuItemClicked: 1, menuVisible: false, teamLeaveGrantArr: this.state.teamApplicationArrApproved,
                  teamLeaveGrantDummyArr: this.state.teamApplicationArrApproved
                })

              }}>Approved</MenuItem>
            }

            {this.state.MenuItemClicked == 2 ? <></> :
              <MenuItem onPress={() => {

                this.setState({
                  MenuItemClicked: 2, menuVisible: false, teamLeaveGrantArr: this.state.teamApplicationArrCancelled,
                  teamLeaveGrantDummyArr: this.state.teamApplicationArrCancelled
                })

              }}>Cancelled</MenuItem>
            }


            {this.state.MenuItemClicked == 3 ? <></> :
              <MenuItem onPress={() => {

                this.setState({
                  MenuItemClicked: 3, menuVisible: false, teamLeaveGrantArr: this.state.teamApplicationArrRejected,
                  teamLeaveGrantDummyArr: this.state.teamApplicationArrRejected
                })

              }}>Rejected</MenuItem>

            }
            {/* <MenuItem onPress={() => {

this.setState({menuVisible: false})
}
}>Cancel</MenuItem> */}

          </Menu>

        </View>

        <View style={styles.container}>
          {/* <FloatBtnComp iconImg={require('../../images/search_icon.png')} clickBtn={() => {

            this.showSearchBar()

          }} /> */}
          {
            this.state.searchEnable ?
              <View style={{ backgroundColor: COLORS.FormBGColor, height: 60, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '90%', height: 40, backgroundColor: 'white', borderRadius: 24, alignItems: 'center', flexDirection: 'row' }}>

                  <TextInput allowFontScaling={false}
                    placeholder='Search'
                    placeholderTextColor="#A9A9A9"
                    style={{ width: '82%', fontSize: 13, fontFamily: Constant.MontserratMedium, color: 'black', borderRadius: 24, paddingLeft: 16 }}
                    autoFocus={true}
                    value={this.state.searchValue}
                    autoCorrect={false}
                    onChangeText={(searchValue) => this.searchValue(searchValue)}
                    returnKeyType="go" underlineColorAndroid="transparent"></TextInput>

                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/searchGray.png')}></Image>

                  <TouchableOpacity style={{ marginRight: 8, marginLeft: 8 }} onPress={() => this.setState({ teamLeaveGrantArr: this.state.teamLeaveGrantArr.reverse() })}>
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/sort.png')}></Image>
                  </TouchableOpacity>
                </View>

              </View>


              : <></>
          }

          <DisplayCountBar
            total={this.state.teamLeaveGrantArr.length}
          />

          {
            this.state.teamLeaveGrantArr.length != 0 ?

              <FlatList style={{ marginTop: 30 }}
                data={this.state.teamLeaveGrantArr}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item, index }) => this.renderList(item, index)}
                keyExtractor={(item, index) => index.toString()}
                // onRefresh={() => {
                //   this.setState({ refreshing: true })
                //   this.getTeamLeaveGrant(true)
                // }}
                refreshing={this.state.refreshing}

              />

              :
              this.state.isListEmpty ?
              <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

              </Text>
              :
              <></>
          }



          {/* Loader  Modal */}

          <Loader isLoader={this.state.isLoading}> </Loader>


          {/* OPEN EDIT GRANT LEAVE */}

          {/*  */}
          <Modal
            visible={this.state.isEdit}
            transparent={true}
            onRequestClose={() => { }}
            animationType='slide'
          >

            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>

              <TouchableOpacity onPress={() => this.setState({ isEdit: false })} activeOpacity={1} style={{ flex: 1, width: '100%' }}></TouchableOpacity>

              <View style={{ width: Dimensions.get('window').width, height: '40%', backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius: 20, overflow: 'hidden', }}>

                {/* <View style={{ height: 50, width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>

                <View style={{ flex: 3 }}></View>
                <View style={{ flex: 3, marginTop: -50, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../../images/dialog-logo.png')} style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 50 }}>
                  </Image>
                </View>
                <View style={{ flex: 3 }}>
                  <TouchableOpacity style={{ width: 100, height: 50, alignSelf: "flex-end" }} onPress={() => this.setState({ isEdit: false })}>
                    <Image
                      source={require('../../images/cross.png')}
                      style={{ height: '60%', width: '60%', resizeMode: 'contain', alignSelf: 'flex-end', marginTop: 10 }} />
                  </TouchableOpacity>
                </View>
              </View> */}
                <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#F6F4FB', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row', paddingHorizontal: 12 }}>

                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 17, color: 'black', fontWeight: '500', }}>{'Edit Grant leave'}
                  </Text>
                </View>

                {/* SELECT DATE */}
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '90%', height: 45, marginTop: 8
                  }} onPress={() => this.showDateTimePicker()}>

                    <Text allowFontScaling={false} style={{ fontSize: 13, color: 'grey', paddingLeft: 8 }}>{this.state.grantDate}</Text>

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
                    value={this.state.comment}
                    onChangeText={(comment) => this.setState({ comment: comment })}
                    returnKeyType="done" />
                  <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                  </View>

                </View>

                {/* Submit Button*/}

                <View style={{
                  alignSelf: 'center', justifyContent: 'center'
                  , alignItems: 'center', marginTop: '10%'
                }}>
                  <SubmitBtnWide onPress={() => this.updateGrantLeave()} />
                </View>

                {/* <View style={{
                // height: 60,
                 flexDirection: 'row', justifyContent: 'center'
                , alignItems: 'center', marginTop: 16, borderRadius: 8, width: Dimensions.get('window').width, borderColor: 'red', borderWidth: 1
              }}> */}


                {/* <TouchableOpacity style={{ height: 35, width: '42%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(42,76,136,1.0)', left: 18 }}
                  onPress={() => this.setState({ isEdit: false })}>
                  <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Cancel</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)', right: 18 }}
                  onPress={() => this.updateGrantLeave()}>
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
          </Modal>

          <Modal
            visible={false // this.state.isView
            }
            transparent={true}
            onRequestClose={() => { }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ width: Dimensions.get('window').width - 40, backgroundColor: 'white', borderRadius: 8 }}>
                <View style={{ width: 100, height: 100, borderRadius: 50, top: -50, alignSelf: 'center', justifyContent: 'center' }} >
                  <Image source={require('../../images/dialog-logo.png')} style={{ width: "100%", height: "100%", resizeMode: 'contain', }}>
                  </Image>
                </View>
                <TouchableOpacity style={{ width: 100, height: 50, alignSelf: 'flex-end', bottom: 100 }} onPress={() => this.setState({ isView: false })}>
                  <Image
                    source={require('../../images/cross.png')}
                    style={{ height: '60%', width: '60%', resizeMode: 'contain', alignSelf: "flex-end", top: 8 }} />
                </TouchableOpacity>
                <Text allowFontScaling={false} style={{ textAlign: 'center', justifyContent: 'center', textAlignVertical: "center", fontSize: 17, color: 'black', fontWeight: '500', top: -90 }}>View Leave Grant Details</Text>
                {
                  this.state.teamLeaveGrantViewArr.map((m, i) =>

                    <View key={i} style={{ width: '100%', padding: 15, flexDirection: 'row', top: -70 }}>
                      <View style={{ flex: 1.7, justifyContent: 'center', }}>
                        <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{m.key + ":"}</Text>
                      </View>
                      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{m.value}</Text>
                      </View>
                    </View>

                  )}
              </View>
            </View>
          </Modal>


          {
            this.state.isView ?
              <ViewItemDetail buttonDisable={true} viewDetail={this.state.isView} title='Leave Grant Details' keyArr={this.state.detailsKeyArr} valueArr={this.state.teamLeaveGrantViewArr} cancelAction={() => this.setState({ isView: false })} apprRejectBtn={this.state.MenuItemClicked == 0 ? true : false} approveBtnAction={() => {

                if (this.state.apprRejectIndex == null) {

                  return
                  
                }

                this.setState({ isView: false })
                this.approveAction(this.state.apprRejectIndex)
              }} 
              
              rejectBtnAction={() => {
                if (this.state.apprRejectIndex == null) {

                  return
                  
                }
                this.setState({ isView: false })
                this.rejectAction(this.state.apprRejectIndex)
              }}>



              </ViewItemDetail>
              : null
          }


          {/* New View Screen */}
          <Modal
            visible={
              false
              // this.state.isView
            }
            transparent={false}
            onRequestClose={() => { this.setState({ isView: false }) }}
            style={{ backgroundColor: COLORS.FormBGColor }}
          >


            {/* <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}> */}

            <ImageBackground style={{ height: 290, width: '100%' }} source={require('../../images/dashHeader.jpg')}>

              <View style={{ height: 80, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 3, alignItems: 'flex-end' }}>


                  <TouchableOpacity style={{ height: 75, width: 75, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => this.setState({ isView: false })}>
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
                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, fontSize: 17, textAlign: 'center', width: '100%', marginTop: 17, color: 'white' }}>Leave Application Details</Text>
                </View>
                <View style={{ flex: 3, alignItems: 'flex-end' }}>

                </View>

              </View>


              <View style={{
                width: "100%",

                alignItems: 'center',
                justifyContent: 'center'
              }}>


                <TouchableOpacity style={{
                  width: 100, height: 100, marginTop: 10
                }} onPress={() => { }}>

                  <Image source={require('../../images/user.jpeg')} style={{
                    width: '100%', height: '100%', resizeMode: 'cover',
                    alignItems: "center", borderRadius: 50, borderWidth: 1, borderColor: 'white'
                  }} >

                  </Image>

                </TouchableOpacity>

                <Text style={{ color: 'white', fontFamily: Constant.MontserratSemiBold, padding: 4, fontSize: 14, marginTop: 5 }}>{String(this.state.teamLeaveGrantViewArr[0]?.value)}</Text>
                {/* <Text style={{ color: 'white', fontFamily: Constant.MontserratRegular, fontSize: 13 }}>{'Nothing'}</Text> */}


              </View>

            </ImageBackground>


            <View style={{ backgroundColor: COLORS.FormBGColor }}>

              <ScrollView style={{ height: "100%", width: "100%", marginTop: -50, }} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 16, shadowColor: "grey", shadowOpacity: 0.8, shadowRadius: 3, shadowOffset: { height: 1, width: 1 } }}>


                  {this.state.teamLeaveGrantViewArr.map((m, i) =>
                    m != '' ?
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 13, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }}>{m.key + ":"}</Text>

                        <TextInput allowFontScaling={false} style={{
                          color: 'black',
                          fontSize: 12,
                          marginRight: 8,
                          paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                          textAlign: 'left',
                          fontFamily: Constant.MontserratRegular,
                        }}
                          autoCorrect={false} keyboardType="ascii-capable" editable={false}
                          value={String(m.value)}

                        >
                        </TextInput>
                      </View>
                      : <></>
                  )}

                  {/* <View style={{ width: '100%', overflow: 'hidden', height: 100, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

               

                <CancelBtn title='Reject' onPress={() => {
                  this.setState({ isView: false })
                  this.rejectAction(this.state.actionIndex)

                  console.log(this.state.actionIndex)
                }} />

               

                <SubmitBtn title='Approve' onPress={() => {
                  this.setState({ isView: false })
                  this.approveAction(this.state.actionIndex)

                  console.log(this.state.actionIndex)
                }} />

              </View> */}


                  <View style={{ width: '100%', overflow: 'hidden', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 10 }}
                    onLayout={(event) => {
                      const { x, y, width, height } = event.nativeEvent.layout;
                      this.setState({ btnContainerWidth: width });
                    }}
                  >




                    <CancelBtnWide width={(this.state.btnContainerWidth * 40) / 100} title='Reject' BGOnPressIn='white' defaultBgColor='#e03737' TextOnPressIn='#e03737' onPress={() => {
                      this.setState({ isView: false })
                      this.rejectAction(this.state.actionIndex)

                      console.log(this.state.actionIndex)
                    }} />

                    <SubmitBtnWide width={(this.state.btnContainerWidth * 40) / 100} title='Approve' defaultBgColor='#6AC47E' TextOnPressIn='#6AC47E' BGOnPressIn='white' onPress={() => {
                      this.setState({ isView: false })
                      this.approveAction(this.state.actionIndex)

                      console.log(this.state.actionIndex)
                    }} defaultTextColor='white' />

                  </View>

                </View>
              </ScrollView>

            </View>
          </Modal>


          <DialogInput isDialogVisible={this.state.rejectCheck}
            title={'Confirmation'}
            message={"Are you sure you want to reject this leave?"}
            hintInput={"Leave a comment"}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            submitInput={(inputText) => {

              //     if(inputText != ''){

              this.setState({ comments: inputText, rejectCheck: false })
              this.actionOnleaveApi(inputText, 'REJECT')
              //    }
            }}

            closeDialog={() => { this.setState({ rejectCheck: false }) }}>
          </DialogInput>


          <DialogInput isDialogVisible={this.state.approveCheck}
            title={'Confirmation'}
            message={"Are you sure you want to approve this leave?"}
            hintInput={"Leave a comment"}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            submitInput={(inputText) => {

              //  if(inputText != ''){

              this.setState({ comments: inputText, approveCheck: false })
              this.actionOnleaveApi(inputText, 'APPROVE')
              //   }
            }}

            closeDialog={() => { this.setState({ approveCheck: false }) }}>
          </DialogInput>
          <Toast ref="toast" />


        </View>
      </>
    );
  }

  renderList = (item, index) => {
    // const swipeRef = React.createRef();
    console.log(item);
    return (
      <>


        <SwipeableList
          statusMainColor={Utility.statusColor(item.status)}
          onPress={() => this.viewAction(index)}
          title={String(item.empName)}
          fromTo={'Applied For: ' + item.appliedFor.replace(/\//g, "-") + ', Applied On: ' + item.appliedOn.replace(/\//g, "-")}
          LeftSwipeActions={(swipeRef) => Utility.isPendingStatus(item.status) ? LeftSwipeActions(() => this.approveAction(index), index, this, swipeRef.current) : <></>}
          rightSwipeActions={(swipeRef) => 

            Utility.isPendingStatus(item.status) ?
            rightSwipeActions(() => this.rejectAction(index), index, this, swipeRef.current, () => { this.editAction(index) })
            :
            <></>
          }
          statusMain={item.orgStatus}

        />



        {/* <View style={item.status == "APPROVED" ? styles.approvedCardView : item.status == "REJECTED" ? styles.rejectCardView : styles.pendingCardView} key={index}>

          <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/userGroup.png')}></Image>

            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1 }}>{item.empName}</Text>

            <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.viewAction(index)}>

              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                source={require('../../images/viewGray.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.editAction(index)} >

              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                source={require('../../images/editGray.png')}
              />
            </TouchableOpacity>


          </View> */}

        {/* <View style={{ flexDirection: 'row', height: 50 }}>
            <View style={{ flex: 2, marginLeft: 16 }}>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Applied On</Text>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{String(item.appliedOn)}</Text>

            </View>
            <View style={{ flex: 2 }}>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Applied For</Text>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{String(item.appliedFor)}</Text>

            </View>
          </View> */}

        {/* <View style={{ flexDirection: 'row', height: 50 }}>
            <View style={{ flex: 2, marginLeft: 16 }}>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Status</Text>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.orgStatus}</Text>

            </View>
            <View style={{ flex: 2, marginLeft: 16 }}>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Comment</Text>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.comment}</Text>

            </View>
          </View> */}
        {/* Submit Button*/}

        {/* <View style={{
            height: 60, flexDirection: 'row', justifyContent: 'space-between'
            , alignItems: 'center', marginTop: 16, borderRadius: 8, width: Dimensions.get('window').width - 40
          }}>


            <TouchableOpacity style={{ height: 35, width: '42%', justifyContent: 'center', alignItems: 'center', left: 18, flexDirection: 'row', borderWidth: 1, borderColor: 'rgba(240,240,240,1.0)', borderRadius: 17.5 }}
              onPress={() => this.rejectAction(index)} >

              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../images/reject.png')}></Image>

              <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', fontSize: 13, marginLeft: 8 }}>Reject</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 17.5, backgroundColor: 'rgba(240,240,240,1.0)', right: 18, flexDirection: 'row' }}
              onPress={() => this.approveAction(index)} >

              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../images/approved.png')}></Image>
              <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', fontSize: 13, marginLeft: 8 }}>Approve</Text>

            </TouchableOpacity>

          </View> */}

        {/* </View> */}



      </>);
  }
  showSearchBar() {

    if (this.state.teamLeaveGrantArr.length == 0) {

      Alert.alert('No Data Found !')
      return

    }

    this.setState({ searchEnable: !this.state.searchEnable, searchValue: '', teamLeaveGrantArr: this.state.teamLeaveGrantDummyArr })


  }


  searchValue(value) {

    var arr = []

    this.setState({ searchValue: value })

    this.state.teamLeaveGrantDummyArr.map((item, index) => {
      if (item.empName.toLowerCase().includes(value.toLowerCase())) {
        arr.push(item)
      }
    }
    )
    this.setState({ teamLeaveGrantArr: arr })
  }

  viewAction(index) {

    let objCopy = this.state.teamLeaveGrantArr[index]
    console.log('before obj', objCopy);
    //     const value = Object.values(obj);
    // console.log('value', value);
    // const key = Object.keys(obj);

    var arr = []
    var getValueArr = ['empName', 'orgStatus', 'appliedOn', 'appliedFor', 'comment']
    var keyArr = ['Name', 'Status', 'Applied on', 'Applied For', 'Comment']

    //   for (let i = 0; i < keyArr.length; i++) {

    //     let obj = {
    //       key: keyArr[i],
    //       value: objCopy[getValueArr[i]]

    //     }
    //     arr.push(obj)

    //   }
    //   console.log('teamLeaveGrantViewArr', arr);
    //   this.setState({ teamLeaveGrantViewArr: arr, isView: true, actionIndex: index, detailsKeyArr: keyArr })

    // }

    for (let i = 0; i < keyArr.length; i++) {


      arr.push(objCopy[getValueArr[i]])

    }
    console.log('teamLeaveGrantViewArr', arr);
    this.setState({ teamLeaveGrantViewArr: arr, isView: true, actionIndex: index, detailsKeyArr: keyArr, apprRejectIndex: index })

  }


  editAction(index) {

    this.setState({
      isEdit: true, grantDate: this.state.teamLeaveGrantArr[index].appliedFor,
      grantServerDate: this.state.teamLeaveGrantArr[index].appliedForServer, comment: this.state.teamLeaveGrantArr[index].comment, leaveId: this.state.teamLeaveGrantArr[index].compOffId
    })
  }

  rejectAction(index) {

    console.log(index);


    this.setState({ rejectCheck: true, leaveId: this.state.teamLeaveGrantArr[index].compOffId, apprRejectIndex: null })

  }

  approveAction(index) {
    console.log(index)

    this.setState({ approveCheck: true, leaveId: this.state.teamLeaveGrantArr[index].compOffId, apprRejectIndex: null })
  }
}  