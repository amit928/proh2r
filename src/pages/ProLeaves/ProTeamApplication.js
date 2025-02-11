import React, { createRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput, Vibration, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import { FlatList, Alert } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import DialogInput from 'react-native-dialog-input';
import Toast, { DURATION } from 'react-native-easy-toast'
import Moment from 'moment';
import Loader from '../../components/Loader';
import * as Utility from '../../Externel Constant/Utility';
import ViewItemDetail from '../../components/ViewItemDetail';
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from '../../Constant/Index';
import SwipeableList from '../../components/SwipeableList';
import DisplayCountBar from '../../components/DisplayCountBar';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { ListViewUtlis } from '../../ListViewUtlis';


const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.FormBGColor
    // justifyContent:'center'

  },

  approvedCardView: {
    height: 250,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 8,
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
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 8,
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
    marginBottom: 8,
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
        // marginTop: 5,
        alignItems: 'center',
        //  paddingVertical: 2
      }}
      onPress={() => {

        swipeRef?.close()
        console.log(swipeRef, ' ', index)
        hi.approvedAction(index)


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

const rightSwipeActions = (rejectApprfunc, index, hi, swipeRef) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
    <TouchableOpacity
      style={{
        width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
        // marginTop: 5,
        alignItems: 'center',
        //  paddingVertical: 2
      }}
      onPress={() => {

        hi.rejectAction(index)

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
  );
};

const cancelSwipeActions = (rejectApprfunc, leave, hi, swipeRef) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
    <TouchableOpacity
      style={{
        width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
        // marginTop: 5,
        alignItems: 'center',
        //  paddingVertical: 2
      }}
      onPress={() => {

        hi.cancelAction(leave)

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

export default class ProTeamApplication extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      authDict: {},
      teamApplicationArr: [],
      teamApplicationDummyArr: [],
      viewKeyArr: [],
      viewValueArr: [],
      MainAPIDataArray: [],
      isLoading: false,
      rejectCheck: false,
      applicationId: '',
      comments: '',
      approveCheck: false,
      cancelCheck: false,
      isView: false,
      totalPendingRequest: 0,
      searchValue: '',
      searchEnable: false,
      actionIndex: null,
      refreshing: false,
      menuVisible: false,
      MenuItemClicked: 0,
      teamApplicationArrPending: [],
      teamApplicationArrApproved: [],
      teamApplicationArrRejected: [],
      teamApplicationArrCancelled: [],
      paginationLoader: false,
      isListEmpty: false
    }

    this.totalRecords = createRef();
    this.totalPages = createRef();
    this.currentPageNumber = createRef();
    this.statusArray = createRef();
    this.empArray = createRef();
    // this.rejectAction = this.rejectAction.bind(this);

  }

  clickMenu() {

    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }

  componentDidMount() {

    console.log("componentDidMount", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

    this.currentPageNumber.current = 0

    this.statusArray.current = "PENDING"

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        // this.getTeamApplication()
        this.executeGetRecords([], true)

      }
    });

  }


  async executeGetRecords(statusArray, isInitial) {


    console.log("executeGetRecords", { statusArray, isInitial });
    if (isInitial) {
      this.setState({ isLoading: true })
      await this.getEmpArray() && await this.getTeamApplication(isInitial)
      this.setState({ isLoading: false })
    }
    else {
      this.setState({ paginationLoader: true })
      await this.getTeamApplication(isInitial)
      this.setState({ paginationLoader: false })
    }




  }


  async getEmpArray() {
    var url = "https://proh2r.com/api/proh2r/v1/leave/leaveapplication/employee/" + this.state.authDict.employeeCode
    this.setState({ isLoading: true })

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      })

      let code = await response.status


      if (code == 200) {
        let responseJson = await response.json();

        if (responseJson.length == 0) {
          this.setState({ isListEmpty: true });
          return false
        }
        this.setState({ isListEmpty: false });
        this.empArray.current = responseJson.map((item) => String(item?.empCode).toLowerCase())
        console.log("getEmpArray", this.empArray.current)
        return true

      } else {
        Alert.alert("Something went wrong!")
        return false
      }


    } catch (error) {
      console.error(error);
      return false
    }
  }

  //   WEB API
  async getTeamApplication(isInitial) {

    // !onRefreshCall && this.setState({ isLoading: true })
    // var url = Constant.BASE_URL + Constant.TEAM_APPLICATION + this.state.authDict.employeeCode
    // https://proh2r.com/api/proh2r/v1/leave/leaveapplication/teamLeaveApplicationByPagination

    var url = Constant.BASE_URL + "leave/leaveapplication/teamLeaveApplicationByPaginationForMobile"
    // var url = "https://proh2r.com/api/proh2r/v1/leave/leaveapplication/teamLeaveApplicationByPagination"
    console.log('getLeaveURL', url);
    try {

      if (isInitial)
        this.currentPageNumber.current = 0


      const bodyPayload = ListViewUtlis.getLeaveRecordPayloadForSupervisor(isInitial ? 0 : this.currentPageNumber.current, this.empArray.current, this.statusArray.current)

      console.log("bodyPayload", bodyPayload);


      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: JSON.stringify(bodyPayload)
      }
      )


      let code = await response.status
      // !onRefreshCall && this.setState({ isLoading: false })
      // onRefreshCall && this.setState({ refreshing: false })

      if (code == 200) {

        let responseJson = await response.json();
        console.log("getTeamApplication", responseJson)
        // let arr = responseJson.content

        let dataArr = []
        let dataArrPending = []
        let dataArrPendingLength = 0
        let dataArrApproved = []
        let dataArrRejected = []
        let dataArrCancelled = []

        if (responseJson.content.length == 0) {

          console.log("responseJson.content.length", responseJson.content.length);

          this.setState({ isListEmpty: true });
          // return
        } else {
          this.setState({ isListEmpty: false });
        }



        this.totalPages.current = responseJson?.totalPage
        this.totalRecords.current = responseJson?.totalRecords

        if (isInitial)
          this.currentPageNumber.current = 1
        else
          this.currentPageNumber.current++

        console.log("code==200", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

        let arr = []

        // arr = isInitial ? responseJson?.content : [...this.state.MainAPIDataArray, ...responseJson?.content]



        if (isInitial) {
          arr = responseJson?.content
          this.setState({ MainAPIDataArray: responseJson?.content })
        }
        else {
          const temp = [...this.state.MainAPIDataArray, ...responseJson?.content]
          this.setState({ MainAPIDataArray: temp })
          arr = temp
        }

        for (let i = 0; i < arr.length; i++) {
          let obj = arr[i]

          var dict = {
            name: obj.empName,
            status: obj.leaveStatus,
            orgStatus: Utility.splitStatus(obj.leaveStatus),
            startDate: obj.startDate,
            endDate: obj.endDate,
            totalLeaveTaken: obj.numberOfLeave,
            leaveCategory: obj.leaveName,
            reason: obj.reason,
            leaveId: obj.leaveId,
            comments: obj.comments,
            extraData: obj
          }
          dataArr.push(dict)

          // if (obj.leaveStatus == 'APPROVED') {

          //   dataArrApproved.push(dict)

          // }

          // if (obj.leaveStatus == 'REJECTED') {

          //   dataArrRejected.push(dict)

          // }

          // if (obj.leaveStatus == 'CANCELLED') {

          //   dataArrCancelled.push(dict)

          // }

          // if (obj.leaveStatus != 'APPROVED') {

          //   if (obj.leaveStatus == 'LEVEL1PENDING' || obj.leaveStatus == "LEVEL2PENDING") {

          //     dataArrPending.push(dict)
          //   } else {
          //     // dataArr.push(dict)

          //   }
          // }
        }

        this.setState({ teamApplicationArr: dataArr })



        return

        dataArrPendingLength = dataArrPending.length
        // dataArrPending.push(...dataArr)
        // dataArrRejected.push(dict)
        this.setState({ teamApplicationArr: dataArrPending, totalPendingRequest: dataArrPendingLength, teamApplicationDummyArr: dataArrPending, teamApplicationArrApproved: dataArrApproved, teamApplicationArrRejected: dataArrRejected, teamApplicationArrCancelled: dataArrCancelled, teamApplicationArrPending: dataArrPending, MenuItemClicked: 0 })

        console.log('dataArrPending', dataArrPending);
        console.log('dataArrApproved', dataArrApproved);
        console.log('dataArrRejected', dataArrRejected);
        console.log('dataArrCancelled', dataArrCancelled);

      } else if (code == 400) {
        console.log(code);
        let responseJson = await response.json();
        Alert.alert("Something went wrong!")
        // this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {
        console.log(code);

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        console.log(code);

        Alert.alert('Something went wrong!')

        // this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      // this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async onRefresh() {



    var url = Constant.BASE_URL + Constant.TEAM_APPLICATION + this.state.authDict.employeeCode
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
        let dataArrPendingLength = 0
        let dataArrApproved = []
        let dataArrRejected

        console.log(responseJson)

        for (let i = 0; i < arr.length; i++) {
          let obj = arr[i]

          var dict = {
            name: obj.empName,
            status: obj.leaveStatus,
            orgStatus: Utility.splitStatus(obj.leaveStatus),
            startDate: obj.startDate,
            endDate: obj.endDate,
            totalLeaveTaken: obj.numberOfLeave,
            leaveCategory: obj.leaveName,
            reason: obj.reason,
            leaveId: obj.leaveId,
          }
          if (obj.leaveStatus != 'APPROVED') {

            if (obj.leaveStatus == 'LEVEL1PENDING' || obj.leaveStatus == "LEVEL2PENDING") {

              dataArrPending.push(dict)
            } else {
              dataArr.push(dict)

            }
          }
        }

        dataArrPendingLength = dataArrPending.length
        dataArrPending.push(...dataArr)
        this.setState({ teamApplicationArr: dataArrPending, totalPendingRequest: dataArrPendingLength, teamApplicationDummyArr: dataArrPending })

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        // this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        // this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {

      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
    }

  }

  async actionOnleaveApi(value, action) {

    this.setState({ isLoading: true })
    let comment = action == 'REJECT' ? (value == '' ? 'Rejected' : value) : action == 'APPROVE' ? (value == '' ? 'Approved' : value) : (value == '' ? 'Cancelled' : value)

    // var url = Constant.BASE_URL + Constant.REJECT_TEAM_APPLICATION + this.state.leaveId + '/action' + '?action=' + action + '&&comments=' + comment

    var url = Constant.BASE_URL + Constant.REJECT_TEAM_APPLICATION + this.state.leaveId + "/" + action + "?comments=" + value

    // var params = { action: action, comments: comment }

    // console.log('actionOnleaveApi', params);
    console.log('actionOnleaveApi url', url);

    // return


    try {
      let response = await fetch(url, {
        method: 'PUT',
        // body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      this.setState({ isLoading: false })

      let code = await response.status

      if (code == 200) {

        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message, 5000)
        // this.getTeamApplication()
        this.executeGetRecords([], true)


        console.log(responseJson)
      } else if (code == 400 || code == 500) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        //   this.refs.toast.show('Something went wrong!');
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //  this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
    }
  }

  async deleteTeamLeave(value) {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.REJECT_TEAM_APPLICATION + value


    try {
      let response = await fetch(url, {
        method: 'DELETE',

        headers: Constant.getHeader(this.state.authDict)
      }
      )

      this.setState({ isLoading: false })

      let code = await response.status

      if (code == 200) {

        let responseJson = await response.json();
        console.log(responseJson)
        this.getTeamApplication()
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //    this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
    }
  }

  fetchMoreData() {
    // return
    console.log("fetchMoreData", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);
    if (this.currentPageNumber.current >= this.totalPages.current) {
      console.log("this.currentPageNumber.current >= this.totalPages.current");
      return
    }

    if (this.state.paginationLoader) {
      console.log("this.state.paginationLoader");
      return
    }

    if (this.state.teamApplicationArr.length >= this.totalRecords) {
      console.log("this.state.teamApplicationArr >= this.totalRecords");
      return
    }

    this.executeGetRecords()
    // this.setState({ paginationLoader: true })


  }

  onMenuClick(menuClickIndex, status) {
    this.setState({ MenuItemClicked: menuClickIndex, menuVisible: false })

    // this.statusArray.current = Utility.getStatusArrayForSorting()[status][0]
    this.statusArray.current = status
    this.executeGetRecords([], true)
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



                // this.setState({
                //   MenuItemClicked: 0, menuVisible: false, teamExpenseArr: this.state.teamApplicationArrPending,
                //   teamExpenseDummyArr: this.state.teamApplicationArrPending
                // })

                this.onMenuClick(0, "PENDING")

              }}>Pending</MenuItem>

            }



            {this.state.MenuItemClicked == 1 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({
                //   MenuItemClicked: 1, menuVisible: false, teamExpenseArr: this.state.teamApplicationArrApproved,
                //   teamExpenseDummyArr: this.state.teamApplicationArrApproved
                // })
                this.onMenuClick(1, "APPROVED")
              }}>Approved</MenuItem>
            }

            {this.state.MenuItemClicked == 2 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({
                //   MenuItemClicked: 2, menuVisible: false, teamExpenseArr: this.state.teamApplicationArrCancelled,
                //   teamExpenseDummyArr: this.state.teamApplicationArrCancelled
                // })
                this.onMenuClick(2, "CANCELLED")
              }}>Cancelled</MenuItem>
            }


            {this.state.MenuItemClicked == 3 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({
                //   MenuItemClicked: 3, menuVisible: false, teamExpenseArr: this.state.teamApplicationArrRejected,
                //   teamExpenseDummyArr: this.state.teamApplicationArrRejected
                // })
                this.onMenuClick(3, "REJECTED")
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
                    style={{ width: '82%', fontSize: 13, fontFamily: Constant.MontserratMedium, color: 'black', borderRadius: 24, paddingLeft: 16, }}
                    autoFocus={true}
                    value={this.state.searchValue}
                    autoCorrect={false}
                    onChangeText={(searchValue) => this.searchValue(searchValue)}
                    returnKeyType="go" underlineColorAndroid="transparent"></TextInput>

                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/searchGray.png')}></Image>

                  <TouchableOpacity style={{ marginRight: 8, marginLeft: 8 }} onPress={() => this.setState({ teamApplicationArr: this.state.teamApplicationArr.reverse() })}>
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/sort.png')}></Image>
                  </TouchableOpacity>
                </View>

              </View>


              : <></>
          }

          {/* <DisplayCountBar
            total={this.state.teamApplicationArr.length}
          /> */}

          {
            this.state.teamApplicationArr.length != 0 ?
              <FlatList
                // style={{ marginTop: 30 }}
                showsVerticalScrollIndicator={false}
                data={this.state.teamApplicationArr}
                // ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item, index }) => this.renderList(item, index)}
                keyExtractor={(item, index) => item.leaveId.toString()}
                // onRefresh={() => {
                //   this.setState({ refreshing: true })
                //   // this.onRefresh()
                //   this.getTeamApplication(true)
                // }}
                // refreshing={this.state.refreshing}

                onEndReachedThreshold={0.5}
                onEndReached={this.fetchMoreData.bind(this)}
                ListFooterComponent={this.state.paginationLoader ? <ActivityIndicator size={'large'} /> : <View style={{ height: 10 }} />}
              />
              :
              this.state.isListEmpty ?
                <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

                </Text>
                : <></>
          }

          <Toast ref="toast" />

          <Loader isLoader={this.state.isLoading}> </Loader>

          {
            this.state.isView ?
              <ViewItemDetail buttonDisable={false} viewDetail={this.state.isView} title='View Leave Application Details' keyArr={this.state.viewKeyArr} valueArr={this.state.viewValueArr}
                approvedApplication={() => this.approvedAction(this.state.actionIndex)}
                rejectApplication={() => this.rejectAction(this.state.actionIndex)}
                actionIndex={this.state.actionIndex}
                cancelAction={() => this.setState({ isView: false })}
                apprRejectBtn={this.state.MenuItemClicked == 0 ? true : false}
                approveBtnAction={() => {

                  if (this.state.apprRejectIndex == null) {

                    return

                  }

                  this.setState({ isView: false })
                  this.approvedAction(this.state.apprRejectIndex)
                }}

                rejectBtnAction={() => {
                  if (this.state.apprRejectIndex == null) {

                    return

                  }
                  this.setState({ isView: false })
                  this.rejectAction(this.state.apprRejectIndex)
                }}
              >
              </ViewItemDetail>
              : null
          }

          <DialogInput isDialogVisible={this.state.rejectCheck}
            title={"Confirmation"}
            message={"Are you sure you want to reject this leave?"}
            hintInput={"Leave a comment"}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            submitInput={(inputText) => {


              if (inputText == '' || inputText == undefined) {

                console.log('inputText', inputText);

                Alert.alert('Please Add Comment !')

                return

              }
              else {
                this.setState({ comments: inputText, rejectCheck: false })
                this.actionOnleaveApi(inputText, 'REJECT')
              }

              // if(inputText != ''){


              // }
            }}

            closeDialog={() => { this.setState({ rejectCheck: false }) }}
          >
          </DialogInput>


          <DialogInput isDialogVisible={this.state.approveCheck}

            title={'Confirmation'}
            message={"Are you sure you want to approve this leave?"}
            hintInput={"Leave a comment"}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            submitInput={(inputText) => {

              // if(inputText != ''){

              if (inputText == '' || inputText == undefined) {

                console.log(inputText);

                Alert.alert('Please Add Comment !')

                // return

              } else {
                this.setState({ comments: inputText, approveCheck: false })
                this.actionOnleaveApi(inputText, 'APPROVE')
              }


              // }

            }}

            closeDialog={() => { this.setState({ approveCheck: false }) }}>
          </DialogInput>

          <DialogInput isDialogVisible={this.state.cancelCheck}
            title={'Confirmation'}
            message={"Are you sure you want to cancel this leave application?"}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            hintInput={"Reason for cancellation"}

            submitInput={(inputText) => {

              if (inputText == '' || inputText == undefined) {

                console.log(inputText);

                Alert.alert('Please Add Comment !')

                // return

              } else {

                this.setState({ comments: inputText, cancelCheck: false })
                this.actionOnleaveApi(inputText, 'CANCEL')
              }
              // }

            }}

            closeDialog={() => { this.setState({ cancelCheck: false }) }}>
          </DialogInput>

        </View>

      </>
    );
  }


  renderList = (item, index) => {

    // const swipeRef = React.createRef();

    return (
      <>


        <SwipeableList onPress={() => this.viewAction(index, item)} title={item.name} statusMain={item.orgStatus} statusMainColor={Utility.statusColor(item.status)} fromTo={'From ' + Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY') + ' to ' + Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')} LeftSwipeActions={item.status == 'LEVEL1PENDING' || item.status == "LEVEL2PENDING" ? (swipeRef) => LeftSwipeActions(this.approvedAction, index, this, swipeRef?.current) : () => <></>} rightSwipeActions={item.status == 'LEVEL1PENDING' || item.status == "LEVEL2PENDING" ? (swipeRef) => rightSwipeActions(this.rejectAction, index, this, swipeRef.current) : item.status == "APPROVED" ? (swipeRef) => cancelSwipeActions(this.cancelAction, item, this, swipeRef.current) : () => <></>}

        />


      </>
    );
  }


  showSearchBar() {

    this.setState({ searchEnable: !this.state.searchEnable, searchValue: '', teamApplicationArr: this.state.teamApplicationDummyArr })

  }


  searchValue(value) {

    var arr = []

    this.setState({ searchValue: value })

    this.state.teamApplicationDummyArr.map((item, index) => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        arr.push(item)
      }
    }
    )
    this.setState({ teamApplicationArr: arr })
  }


  viewAction(index, item) {
    this.setState({ actionIndex: index })
    // let obj = this.state.teamApplicationArr[index]
    let obj = item

    console.log("itemextraData", item.extraData);



    const value = Object.values(obj);

    const key = Object.keys(obj);

    var valueArr = []

    var keyArr = ['Name', 'Status', 'Start Date', 'End Date', 'Total Leave Taken', 'Category', 'Reason', "Comments"]


    valueArr.push(obj.name, obj.orgStatus, Moment(String(obj.startDate) + ' 00:00:00').format('DD-MM-YYYY'), Moment(String(obj.endDate) + ' 00:00:00').format('DD-MM-YYYY'), obj.totalLeaveTaken, obj.leaveCategory, obj.reason, obj.comments)

    const extraData = item.extraData

    if (extraData?.appliedBy) {

      keyArr.push("Applied By")
      valueArr.push(extraData?.appliedBy)

    }

    if (extraData?.appliedOn) {

      keyArr.push("Applied On")
      valueArr.push(extraData?.appliedOn)

    }

    if (extraData?.applicationRemarks) {

      const applicationRemarks = extraData?.applicationRemarks

      const {
        l1ApprovedBy,
        l1ApprovedOn,
        l1ApprovalRemarks,
        l2ApprovedBy,
        l2ApprovedOn,
        l2ApprovalRemarks,
        l3ApprovedBy,
        l3ApprovedOn,
        l3ApprovalRemarks,
        adminApprovedBy,
        adminApprovedOn,
        adminApprovalRemarks,
        cancelledBy,
        cancelledOn,
        cancellationRemarks,
        cancelledByRole,
        rejectedBy,
        rejectedOn,
        rejectionRemarks,
        rejectedByRole, } = applicationRemarks

      if (l1ApprovedBy) {
        keyArr.push("Level 1 Action Taken By")
        valueArr.push(l1ApprovedBy)
      }

      if (l1ApprovedOn) {
        keyArr.push("Level 1 Action Taken On")
        valueArr.push(l1ApprovedOn)
      }

      if (l1ApprovalRemarks) {
        keyArr.push("Level 1 Comment")
        valueArr.push(l1ApprovalRemarks)
      }

      if (l1ApprovedBy) {
        keyArr.push("Level 1 Status")
        valueArr.push("Level 1 Approved")
      }


      if (l2ApprovedBy) {
        keyArr.push("Level 2 Action Taken By")
        valueArr.push(l2ApprovedBy)
      }

      if (l2ApprovedOn) {
        keyArr.push("Level 2 Action Taken On")
        valueArr.push(l2ApprovedOn)
      }

      if (l2ApprovalRemarks) {
        keyArr.push("Level 2 Comment")
        valueArr.push(l2ApprovalRemarks)
      }

      if (l2ApprovedBy) {
        keyArr.push("Level 2 Status")
        valueArr.push("Level 2 Approved")
      }


      if (l3ApprovedBy) {
        keyArr.push("Level 3 Action Taken By")
        valueArr.push(l3ApprovedBy)
      }

      if (l3ApprovedOn) {
        keyArr.push("Level 3 Action Taken On")
        valueArr.push(l3ApprovedOn)
      }

      if (l3ApprovalRemarks) {
        keyArr.push("Level 3 Comment")
        valueArr.push(l3ApprovalRemarks)
      }

      if (l3ApprovedBy) {
        keyArr.push("Level 3 Status")
        valueArr.push("Level 3 Approved")
      }



      if (adminApprovedBy) {
        keyArr.push("Level 3 Action Taken By")
        valueArr.push(adminApprovedBy)
      }

      if (adminApprovedOn) {
        keyArr.push("Level 3 Action Taken On")
        valueArr.push(adminApprovedOn)
      }

      if (adminApprovalRemarks) {
        keyArr.push("Level 3 Comment")
        valueArr.push(adminApprovalRemarks)
      }

      if (adminApprovedBy) {
        keyArr.push("Level 3 Status")
        valueArr.push("Level 3 Approved")
      }



      if (cancelledBy) {
        keyArr.push("Cancel Action Taken By")
        valueArr.push(adminApprovedBy)
      }

      if (cancelledOn) {
        keyArr.push("Cancel Action Taken On")
        valueArr.push(cancelledOn)
      }

      if (cancellationRemarks) {
        keyArr.push("Cancel Comment")
        valueArr.push(cancellationRemarks)
      }

      if (cancelledByRole) {
        keyArr.push("Status")
        valueArr.push(cancelledByRole)
      }



      if (rejectedBy) {
        keyArr.push("Reject Action Taken By")
        valueArr.push(adminApprovedBy)
      }

      if (rejectedOn) {
        keyArr.push("Reject Action Taken On")
        valueArr.push(rejectedOn)
      }

      if (rejectionRemarks) {
        keyArr.push("Reject Comment")
        valueArr.push(rejectionRemarks)
      }

      if (rejectedByRole) {
        keyArr.push("Status")
        valueArr.push(rejectedByRole)
      }




    }

    this.setState({ viewKeyArr: keyArr, viewValueArr: valueArr, isView: true, apprRejectIndex: index })
    console.log()
  }


  // cancelAction(index) {

  //   this.setState({ cancelCheck: true, leaveId: this.state.teamApplicationArr[index].leaveId })

  // }

  deleteAction(index) {

    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this leave.',
      [
        { text: 'Cancel' },
        {
          text: 'OK', onPress: () =>

            this.deleteTeamLeave(this.state.teamApplicationArr[index].leaveId)
        },

      ],
      { cancelable: false },
    );

  }

  approvedAction(index) {

    console.log(index);

    this.setState({ approveCheck: true, leaveId: this.state.teamApplicationArr[index].leaveId, apprRejectIndex: null })


  }

  rejectAction(index) {
    console.log(index)

    this.setState({ rejectCheck: true, leaveId: this.state.teamApplicationArr[index].leaveId, apprRejectIndex: null })

  }

  cancelAction(leave) {

    console.log('cancelAction', leave)

    // this.state.cancelCheck

    this.setState({ cancelCheck: true, leaveId: leave.leaveId, apprRejectIndex: null })

  }


}  