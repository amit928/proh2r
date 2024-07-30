//react components
import React, { createRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TextInput,
  Picker,
  FlatList,
  Alert,
  Vibration,
  ActivityIndicator,
} from 'react-native';
//custom components
import Loader from '../../components/Loader';
import CustomPicker from '../../components/CustomPicker';
//third parties
import Moment from 'moment';
import Toast, { DURATION } from 'react-native-easy-toast';
import DialogInput from 'react-native-dialog-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
//keystore
import KeyStore from '../../Store/LocalKeyStore';
//utility
import * as Utility from '../../Externel Constant/Utility';
//constants
import { COLORS, Constant } from '../../Constant/Index';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Shadow } from 'react-native-shadow-2';
import SwipeableList from '../../components/SwipeableList';
import ViewItemDetail from '../../components/ViewItemDetail';
import DisplayCountBar from '../../components/DisplayCountBar';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { ListViewUtlis } from '../../ListViewUtlis';


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

export default class TeamReqularizationReq extends React.Component {
  //variables
  constructor(props) {
    super(props);
    this.state = {
      authDict: {},
      teamRegularizationReqArr: [],
      teamRegularizationDummyReqArr: [],
      isLoading: false,
      approveCheck: false,
      rejectCheck: false,
      isCheckAll: false,
      attendanceArr: [],
      regularizationViewArr: [],
      resonArr: [],
      isModalVisible: false,
      isDateTimePickerVisible: false,
      regularizationDate: 'Select Date',
      regularizationServerDate: '',
      isTimePickerVisible: false,
      isView: false,
      totalPendingRequest: 0,
      typeRequestArr: [
        { label: 'CHECK_IN', value: 'Check-in Request' },
        { label: 'CHECK_OUT', value: 'Check-out Request' },
        { label: 'CHECKIN_AND_CHECKOUT', value: 'Check-in and Check-in Request' },
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
      searchEnable: false,
      searchValue: '',
      viewRequest: {},
      refreshing: false,
      menuVisible: false,
      MenuItemClicked: 0,
      teamApplicationArrPending: [],
      teamApplicationArrApproved: [],
      teamApplicationArrRejected: [],
      teamApplicationArrCancelled: [],
      apprRejectIndex: null,
      paginationLoader: false
    };

    this.totalRecords = createRef();
    this.totalPages = createRef();
    this.currentPageNumber = createRef();
    this.statusArray = createRef();
    this.empArray = createRef();

  }
  //function : service function
  async getReasonArray() {
    this.setState({ isLoading: true });
    var url =
      Constant.BASE_URL +
      Constant.GET_REASON +
      this.state.authDict.employeeCode;
    console.log(url);
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      // this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();
        console.log(responseJson);
        let arr = responseJson;
        var reason = '';
        var reasonId = '';

        if (responseJson.length != 0) {
          reason = responseJson[0].assignedReason;
          reasonId = responseJson[0].reasonId;
        }

        this.setState({ resonArr: arr, reason: reason, reasonId: reasonId });
      } else if (code == 400) {
        let responseJson = await response.json();
        // this.refs.toast.show(responseJson.message, 5000);
        Alert.alert(responseJson.message)
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        // this.refs.toast.show('Something went wrong!');
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }


  async getEmpArray() {

    if (this.empArray.current) {
      console.log(this.state.authDict); 
      return true
    }

    var url = "https://proh2r.com/api/proh2r/v1/supervisor/dashboard/attendance"
    // this.setState({ isLoading: true })

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      })

      let code = await response.status


      if (code == 200) {
        let responseJson = await response.json();
        console.log("getEmpArray", responseJson);
        // this.empArray.current = responseJson.map((item) => String(item?.empCode).toLowerCase())
        // console.log("getEmpArray", this.empArray.current)

        const empCodeArray = responseJson.attdSupervisorReportees.map((empDetails, index) => {

          return String(empDetails.split("-")[1].trim()).toLowerCase()

        })

        this.empArray.current = empCodeArray

        console.log({ empCodeArray: this.empArray.current });

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


  async getTeamRegularizationReq(isInitial) {
    // this.setState({ isLoading: true });
    // var url =
    //   Constant.BASE_URL +
    //   Constant.TEAM_REGULARIZATION_REQ +
    //   this.state.authDict.employeeCode;
    var url =
      Constant.BASE_URL + "attendance/regularization/getAllRegularizationRequest/forMobile"
    console.log('getTeamRegularizationReq', url);
    try {

      if (isInitial)
        this.currentPageNumber.current = 0

      const bodyPayload = ListViewUtlis.getRegularizationRecordPayloadForSupervisor(isInitial ? 0 : this.currentPageNumber.current, this.empArray.current, this.statusArray.current)
      console.log("bodyPayload", bodyPayload);


      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: JSON.stringify(bodyPayload)
      });
      let code = await response.status;
      // this.setState({ isLoading: false });

      if (code == 200) {
        this.setState({ isLoading: false });
        let responseJson = await response.json();

        console.log("getTeamRegularizationReq", responseJson);

        this.totalPages.current = responseJson?.totalPage
        this.totalRecords.current = responseJson?.totalRecords

        if (isInitial)
          this.currentPageNumber.current = 1
        else
          this.currentPageNumber.current++

        console.log("code==200", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

        let copyData = []

        copyData = isInitial ? responseJson?.content : [...this.state.teamRegularizationReqArr, ...responseJson?.content]


        for (let i = 0; i < copyData.length; i++) {
          for (let j = 0; j < this.state.resonArr.length; j++) {
            if (
              this.state.resonArr[j].reasonId ==
              copyData[i].regularizationReason
            ) {
              copyData[i].reasonVal = this.state.resonArr[j].assignedReason;
            }
          }
        }

        this.setState({
          teamRegularizationReqArr: copyData,
          teamRegularizationDummyReqArr: copyData, 
        });

        return

        let dataArr = [];
        let dataArrPending = [];
        let dataArrApproved = []
        let dataArrRejected = []
        let dataArrCancelled = []



        // for (let i = 0; i < responseJson.length; i++) {
        //   let obj = responseJson[i];

        //   if (obj.regularizationStatus != 'APPROVED') {
        //     if (obj.regularizationStatus == 'PENDING') {
        //       dataArrPending.push(obj);
        //     } else {
        //       dataArr.push(obj);
        //     }
        //   }

        //   //  dataArr.push(dict)
        // }

        const sortedArr = Utility.getDataSortedOnStatus(responseJson, 'regularizationStatus')

        console.log('objjjj', sortedArr)

        dataArrPending = sortedArr.PENDING
        dataArrApproved = sortedArr.APPROVED
        dataArrRejected = sortedArr.REJECTED
        dataArrCancelled = sortedArr.CANCELLED


        // this.setState({ totalPendingRequest: dataArrPending.length });

        // dataArrPending.push(...dataArr);

        this.setState({
          teamRegularizationReqArr: dataArrPending,
          teamRegularizationDummyReqArr: dataArrPending, teamApplicationArrApproved: dataArrApproved, teamApplicationArrRejected: dataArrRejected, teamApplicationArrCancelled: dataArrCancelled, teamApplicationArrPending: dataArrPending, MenuItemClicked: 0
        });
        console.log('teamRegularizationReqArr', this.state.teamRegularizationReqArr);
      } else if (code == 400) {
        let responseJson = await response.json();
        // this.refs.toast.show(responseJson.message, 5000);
        Alert.alert(responseJson.message)
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        // this.refs.toast.show('Something went wrong!');
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }

  async actionOnleaveApi(value, action) {
    this.setState({ isLoading: true });
    let comment =
      action == 'approve'
        ? value == ''
          ? 'Approved'
          : value
        : value == ''
          ? 'Rejected'
          : value;

    var url =
      Constant.BASE_URL +
      Constant.REGULARIZATION_REQ +
      this.state.leaveId +
      '/action' +
      '?action=' +
      action +
      '&&comments=' +
      comment;
    var params = { action: action, comments: comment };

    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict),
      });

      this.setState({ isLoading: false });

      let code = await response.status;
      console.log(code);
      if (code == 200) {
        let responseJson = await response.json();
        // this.refs.toast.show(responseJson.message, 5000);
        Alert.alert(responseJson.message)
        // this.getTeamRegularizationReq();
        this.executeGetExpenseRecord([], true)
        console.log(responseJson);
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        // this.refs.toast.show(responseJson.message, 5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        // this.refs.toast.show('Something went wrong!');
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }

  async submitRegularizationRequest(method, id) {
    this.setState({ isLoading: true });
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
    };

    //this.closeModel()

    console.log(params);
    console.log(url);

    try {
      let response = await fetch(url, {
        method: method,
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 201 || code == 200) {
        this.closeModel();

        this.getTeamRegularizationReq();
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        // this.refs.toast.show(responseJson.message, 5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        // this.refs.toast.show('Something went wrong!');
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }


  viewAction(item, index) {

    console.log(index);


    var keyArr = [
      'Name',
      'Check IN',
      'Check Out',
      'Date',
      'Type',
      'Reason',

    ];


    let arr = []

    arr.push(Utility.checkNull(item.empName))
    arr.push(Utility.checkNull(item.checkInTime))
    arr.push(Utility.checkNull(item.checkOutTime))
    arr.push(Moment(
      Utility.checkNull(item.regularizationDate) + ' 00:00:00',
    ).format('DD/MM/YYYY'))
    arr.push(Utility.checkNull(item.requestType))
    arr.push(Utility.checkNull(item.reasonVal))


    this.setState({ viewRequest: { regularizationViewKeyArr: keyArr, regularizationViewValueArr: arr }, isView: true, apprRejectIndex: index })




    // this.setState({ viewRequest: item, isView: true })


  }


  //componentDidMount
  componentDidMount() {

    console.log("componentDidMount", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

    this.currentPageNumber.current = 0

    this.statusArray.current = [0, 5, 6]

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value });
        // this.getReasonArray();
        // this.getTeamRegularizationReq();
        // this.getEmpArray()
        this.executeGetExpenseRecord([], true)
      }
    });
  }

  async executeGetExpenseRecord(statusArray, isInitial) {


    console.log("executeGetExpenseRecord", { statusArray, isInitial });
    if (isInitial) {
      this.setState({ isLoading: true })
      await this.getEmpArray() && await this.getTeamRegularizationReq(statusArray, isInitial)
      this.setState({ isLoading: false })
    }
    else {
      this.setState({ paginationLoader: true })
      await this.getTeamRegularizationReq(statusArray, isInitial)
      this.setState({ paginationLoader: false })
    }




  }


  componentDidUpdate(prevProps, prevState) {
    // This code will run whenever the component updates
    // You can compare current state and props with prevState and prevProps
    // to determine if your action needs to be performed
    if (prevState.teamRegularizationReqArr.length !== this.state.teamRegularizationReqArr.length) {
      console.log(`State updated: `);
      this.setState({ isLoading: false });

    }
  }

  async onRefresh() {

    this.setState({ refreshing: true });
    var url =
      Constant.BASE_URL +
      Constant.TEAM_REGULARIZATION_REQ +
      this.state.authDict.employeeCode;
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });
      let code = await response.status;
      this.setState({ refreshing: false });

      if (code == 200) {
        let responseJson = await response.json();

        for (let i = 0; i < responseJson.length; i++) {
          for (let j = 0; j < this.state.resonArr.length; j++) {
            if (
              this.state.resonArr[j].reasonId ==
              responseJson[i].regularizationReason
            ) {
              responseJson[i].reasonVal = this.state.resonArr[j].assignedReason;
            }
          }
        }

        let dataArr = [];
        let dataArrPending = [];

        console.log(responseJson);

        for (let i = 0; i < responseJson.length; i++) {
          let obj = responseJson[i];

          if (obj.regularizationStatus != 'APPROVED') {
            if (obj.regularizationStatus == 'PENDING') {
              dataArrPending.push(obj);
            } else {
              dataArr.push(obj);
            }
          }

          //  dataArr.push(dict)
        }
        this.setState({ totalPendingRequest: dataArrPending.length });

        dataArrPending.push(...dataArr);

        this.setState({
          teamRegularizationReqArr: dataArrPending,
          teamRegularizationDummyReqArr: dataArrPending,
        });
        console.log('teamRegularizationReqArr', this.state.teamRegularizationReqArr);
      } else if (code == 400) {
        let responseJson = await response.json();
        // this.refs.toast.show(responseJson.message, 5000);
        Alert.alert(responseJson.message)
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        // this.refs.toast.show('Something went wrong!');
        Alert.alert('Something went wrong!')

      }
    } catch (error) {
      console.error(error);
    }


  }

  clickMenu() {

    console.log(this.state.MenuItemClicked);
    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }

  RegularizationStatusEnum() {
    const referenceArr = ["PENDING", "APPROVED",
      "CANCELLED",
      "REJECTED",
      "DELETED",
      "LEVEL1PENDING",
      "LEVEL2PENDING"]


  }



  onMenuClick(menuClickIndex, status) {
    this.setState({ MenuItemClicked: menuClickIndex, menuVisible: false })

    // return

    const RegularizationStatusEnumObj = {

      "PENDING": [0, 5, 6],
      "APPROVED": [1],
      "CANCELLED": [2],
      "REJECTED": [3],
      "DELETED": [4],
      "LEVEL1PENDING": [5],
      "LEVEL2PENDING": [6]

    }
    this.statusArray.current = RegularizationStatusEnumObj[status]
    this.executeGetExpenseRecord([], true)
  }

  fetchMoreData() {

    console.log("fetchMoreData", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);
    if (this.currentPageNumber.current >= this.totalPages.current) {
      console.log("this.currentPageNumber.current >= this.totalPages.current");
      return
    }

    if (this.state.paginationLoader) {
      console.log("this.state.paginationLoader");
      return
    }

    if (this.state.teamRegularizationReqArr.length >= this.totalRecords) {
      console.log("this.state.teamRegularizationReqArr >= this.totalRecords");
      return
    }

    this.executeGetExpenseRecord()
    // this.setState({ paginationLoader: true })


  }

  //UI : Render
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
                //   MenuItemClicked: 0, menuVisible: false, teamRegularizationReqArr: this.state.teamApplicationArrPending,
                //   teamRegularizationDummyReqArr: this.state.teamApplicationArrPending
                // })

                this.onMenuClick(0, "PENDING")

              }}>Pending</MenuItem>

            }



            {this.state.MenuItemClicked == 1 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({
                //   MenuItemClicked: 1, menuVisible: false, teamRegularizationReqArr: this.state.teamApplicationArrApproved,
                //   teamRegularizationDummyReqArr: this.state.teamApplicationArrApproved
                // })

                this.onMenuClick(1, "APPROVED")

              }}>Approved</MenuItem>
            }

            {this.state.MenuItemClicked == 2 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({
                //   MenuItemClicked: 2, menuVisible: false, teamRegularizationReqArr: this.state.teamApplicationArrCancelled,
                //   teamRegularizationDummyReqArr: this.state.teamApplicationArrCancelled
                // })

                this.onMenuClick(2, "CANCELLED")

              }}>Cancelled</MenuItem>
            }


            {this.state.MenuItemClicked == 3 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({
                //   MenuItemClicked: 3, menuVisible: false, teamRegularizationReqArr: this.state.teamApplicationArrRejected,
                //   teamRegularizationDummyReqArr: this.state.teamApplicationArrRejected
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
          {this.state.searchEnable ? (
            <View
              style={{
                backgroundColor: 'rgba(239,240,241,1.0)',
                height: 60,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  height: 40,
                  backgroundColor: 'white',
                  borderRadius: 24,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextInput
                  allowFontScaling={false}
                  placeholder="Search"
                  placeholderTextColor="#A9A9A9"
                  style={{
                    width: '82%',
                    fontSize: 13,
                    fontFamily: Constant.MontserratMedium,
                    color: 'black',
                    borderRadius: 24,
                    paddingLeft: 16,
                    paddingRight: 40,
                    paddingTop: 14,
                    paddingBottom: 14,
                  }}
                  autoFocus={true}
                  value={this.state.searchValue}
                  autoCorrect={false}
                  onChangeText={searchValue => this.searchValue(searchValue)}
                  returnKeyType="go"
                  underlineColorAndroid="transparent"></TextInput>

                <Image
                  style={{ height: 20, width: 20, resizeMode: 'contain' }}
                  source={require('../../images/searchGray.png')}></Image>

                <TouchableOpacity
                  style={{ marginRight: 10, marginLeft: 8 }}
                  onPress={() =>
                    this.setState({
                      teamRegularizationReqArr:
                        this.state.teamRegularizationReqArr.reverse(),
                    })
                  }>
                  <Image
                    style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    source={require('../../images/sort.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}

          {/* <DisplayCountBar title='Total Requests: ' total={this.state.teamRegularizationReqArr.length} /> */}

          {/* <View style={{ padding: 20, }}> */}
          {/* <Text
            allowFontScaling={false}
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#A9A9A9',
            }}>
            Total Pending Requests: {this.state.totalPendingRequest}
          </Text> */}
          {/* <View
            style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() =>
                this.setState({ isCheckAll: !this.state.isCheckAll })
              }>
              <Image
                source={{
                  uri: this.state.isCheckAll
                    ? 'https://w7.pngwing.com/pngs/128/851/png-transparent-check-mark-font-awesome-computer-icons-approve-symbol-miscellaneous-angle-text.png'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5fDcv9Rv8PdUaK0h_eX9W-H6w0O6J0XkEg&usqp=CAU',
                }}
                style={{ height: 40, width: 40, resizeMode: 'center' }}
              />
              <Text allowFontScaling={false}
                style={{ fontSize: 16, color: '#555555', }}
              >Select All</Text>
            </TouchableOpacity>
            {
              this.state.isCheckAll ?
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    source={require('../../images/approved.png')}></Image>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: 'rgba(42,76,136,1.0)',
                      textAlign: 'center',
                      fontSize: 13,
                      marginLeft: 8,
                    }}>
                    Approve All
                  </Text>
                </TouchableOpacity>
                :
                <View style={{ width: "20%" }} />
            }
          </View> */}
          {/* </View> */}
          {this.state.teamRegularizationReqArr.length != 0 ? (
            <FlatList 
            // style={{ marginTop: 30 }}
              data={this.state.teamRegularizationReqArr}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) => this.renderList(item, index)}
              keyExtractor={(item, index) => String(item?.regularizationRequestsId)}
              onEndReachedThreshold={0.5}
              onEndReached={this.fetchMoreData.bind(this)}
              ListFooterComponent={this.state.paginationLoader ? <ActivityIndicator size={'large'} /> : <View style={{ height: 10 }} />}
            // onRefresh={() => {
            //   this.setState({ refreshing: true })
            //   this.onRefresh()
            // }}
            // refreshing={this.state.refreshing}
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

          {/* Loader  Modal */}
          <Loader bgColor={"red"} isLoader={this.state.isLoading}> </Loader>

          <Modal
            visible={false}
            transparent={true}
            onRequestClose={() => { }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ width: Dimensions.get('window').width - 40, backgroundColor: 'white', borderRadius: 8 }}>
                <View style={{ width: 100, height: 100, borderRadius: 50, top: -50, alignSelf: 'center', justifyContent: 'center' }} >
                  <Image source={require('../../images/dialog-logo.png')} style={{ width: "100%", height: "100%", resizeMode: 'contain', }}>
                  </Image>
                </View>

                <TouchableOpacity style={{ width: 50, height: 50, alignSelf: 'flex-end', bottom: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ isView: false })}>
                  <Image
                    source={require('../../images/cross.png')}
                    style={{ height: '60%', width: '60%', resizeMode: 'contain' }} />
                </TouchableOpacity>

                <Text allowFontScaling={false} style={{ textAlign: 'center', justifyContent: 'center', textAlignVertical: "center", fontSize: 17, color: 'black', fontWeight: '500', top: -90 }}>Regularization Details</Text>

                {/* Views */}

                <View style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                  <View style={{ flex: 3, justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{"Name :"}</Text>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{this.state.viewRequest.empName}</Text>
                  </View>
                </View>


                <View style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                  <View style={{ flex: 3, justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{"Check IN :"}</Text>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{Utility.checkNull(this.state.viewRequest.checkInTime)}</Text>
                  </View>
                </View>


                <View style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                  <View style={{ flex: 3, justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{"Check Out :"}</Text>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{Utility.checkNull(this.state.viewRequest.checkOutTime)}</Text>
                  </View>
                </View>


                <View style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                  <View style={{ flex: 3, justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{"Date :"}</Text>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{Moment(
                      Utility.checkNull(this.state.viewRequest.regularizationDate) + ' 00:00:00',
                    ).format('DD/MM/YYYY')}</Text>
                  </View>
                </View>


                <View style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                  <View style={{ flex: 3, justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{"Type :"}</Text>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{Utility.checkNull(this.state.viewRequest.requestType)}</Text>
                  </View>
                </View>


                <View style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                  <View style={{ flex: 3, justifyContent: 'center', }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{"Reason :"}</Text>
                  </View>
                  <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{this.state.viewRequest.reasonVal}</Text>
                  </View>
                </View>





                {/* <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 20 }}
                  onPress={() => this.viewExpenseDetails(this.state.SelectedAPIData)}>
                  <Text style={{ color: 'blue' }}>View Details</Text>
                </TouchableOpacity> */}

              </View>
            </View>
          </Modal>

          {this.state.isView ? (
            <ViewItemDetail
              buttonDisable={true}
              viewDetail={this.state.isView}
              title="View Regularization Request"
              keyArr={this.state.viewRequest.regularizationViewKeyArr}
              valueArr={this.state.viewRequest.regularizationViewValueArr}
              cancelAction={() =>
                this.setState({ isView: false })
              }
              apprRejectBtn={this.state.MenuItemClicked == 0 ? true : false}
              approveBtnAction={() => {

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
                this.deleteAction(this.state.apprRejectIndex)
              }}></ViewItemDetail>
          ) : null}

          <DialogInput
            isDialogVisible={this.state.approveCheck}
            title={'Confirmation'}
            message={'Are you sure you want to approve this request?'}
            hintInput={'Leave a comment'}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}
            submitInput={inputText => {
              //   if(inputText != ''){

              this.setState({ comments: inputText, approveCheck: false });

              this.actionOnleaveApi(inputText, 'approve');
              //    }
            }}
            closeDialog={() => {
              this.setState({ approveCheck: false });
            }}></DialogInput>

          <DialogInput
            isDialogVisible={this.state.rejectCheck}
            title={'Confirmation'}
            message={'Are you sure you want to reject this request?'}
            hintInput={'Leave a comment'}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}
            submitInput={inputText => {
              //  if(inputText != ''){

              this.setState({ comments: inputText, rejectCheck: false });

              this.actionOnleaveApi(inputText, 'reject');
              //     }
            }}
            closeDialog={() => {
              this.setState({ rejectCheck: false });
            }}></DialogInput>

          {/* //:- Modal Module With Pop Up */}

          <Modal
            visible={this.state.isModalVisible}
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
                      <TouchableOpacity
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
                      </TouchableOpacity>

                      <TouchableOpacity
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
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>

            <DateTimePicker
              titleIOS=""
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />

            <DateTimePicker
              titleIOS=""
              isVisible={
                this.state.isCheckInTimePickerVisible ||
                this.state.isCheckOutTimePickerVisible
              }
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode="time"
            />

            <CustomPicker
              showPicker={
                this.state.showRequestPicker || this.state.showReasonPicker
              }
              arr={this.filterItem()}
              handleClose={() =>
                this.setState({ showRequestPicker: false, showReasonPicker: false })
              }
              title={
                this.state.showRequestPicker
                  ? 'Select Request Type'
                  : 'Select Reason'
              }
              handleSubmit={this.handleSubmit}></CustomPicker>

            {/* <Toast ref="toast" /> */}

            <Loader isLoader={this.state.isLoading}> </Loader>
          </Modal>

          {/* <Toast ref="toast" /> */}
        </View>
      </>
    );
  }

  renderList = (item, index) => {
    // const swipeRef = React.createRef();
    return (
      <React.Fragment key={String(index)}>
        {/* {item.regularizationStatus == 'APPROVED' || item.regularizationStatus == 'REJECTED' || item.regularizationStatus == "CANCELLED" ? <></> : */}



        <SwipeableList onPress={() => this.viewAction(item, index)}
        

          // LeftSwipeActions={(swipeRef) => Utility.isPendingStatus(item.regularizationStatus) ? LeftSwipeActions(() => this.approveAction(index), index, this, swipeRef.current) : <></>

          LeftSwipeActions={(swipeRef) => Utility.isShowPendingBtnByLevelsForReg(this.state.authDict?.employeeCode, item) ? LeftSwipeActions(() => this.approveAction(index), index, this, swipeRef.current) : <></>

          }

          title={String(item.empName).split('-')[0]}
          // statusHeading={'Date: '} 
          statusMain={Utility.splitStatus(item.regularizationStatus)} statusMainColor={Utility.statusColor(item.regularizationStatus)} fromTo={
            // 'Request Type: ' + Utility.checkNull(item.requestType) + ', ' + 
            'Date: ' + Moment(
              Utility.checkNull(item.regularizationDate) + ' 00:00:00',
            ).format('DD-MM-YYYY')}

          // rightSwipeActions={(swipeRef) => Utility.isPendingStatus(item.regularizationStatus) ? rightSwipeActions(() => this.deleteAction(index), index, this, swipeRef.current, () => { }) : <></>

          rightSwipeActions={(swipeRef) => Utility.isShowPendingBtnByLevelsForReg(this.state.authDict?.employeeCode, item) ? rightSwipeActions(() => this.deleteAction(index), index, this, swipeRef.current, () => { }) : <></>

          }
        />






        {/* } */}
      </React.Fragment>
    );
  }

  approveAction(index) {
    this.setState({
      approveCheck: true,
      leaveId:
        this.state.teamRegularizationReqArr[index].regularizationRequestsId,
    });
  }

  showSearchBar() {
    this.setState({
      searchEnable: !this.state.searchEnable,
      searchValue: '',
      teamRegularizationReqArr: this.state.teamRegularizationDummyReqArr,
    });
  }

  searchValue(value) {
    var arr = [];

    this.setState({ searchValue: value });

    this.state.teamRegularizationDummyReqArr.map((item, index) => {
      if (item.empName.toLowerCase().includes(value.toLowerCase())) {
        arr.push(item);
      }
    });
    this.setState({ teamRegularizationReqArr: arr });
  }

  editAction(i) {
    let obj = this.state.teamRegularizationReqArr[i];
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

    let checkIn = Utility.convertTime(checkInServer);
    let checkOut = Utility.convertTime(checkOutServer);
    let comment = obj.regularizationComments;

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

  deleteAction(index) {
    this.setState({
      rejectCheck: true,
      leaveId:
        this.state.teamRegularizationReqArr[index].regularizationRequestsId,
    });
  }

  // Edit Regularization Request

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
    var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD');
    var pickedChekInServerDt = Moment(momentDate).format('HH:mm');

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
    }
    this.hideDateTimePicker();
  };

  closeModel() {
    this.toggleModal();
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
      id: '',
    });
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
      } else {
        this.submitRegularizationRequest('PUT', this.state.id);
      }
    } else if (this.state.requestServerType == 'CHECK_OUT') {
      if (this.state.checkOutTime == '') {
        Alert.alert('Please select check out time');

        Vibration.vibrate()
      } else {
        this.submitRegularizationRequest('PUT', this.state.id);
      }
    } else if (this.state.requestServerType == 'CHECKIN_AND_CHECKOUT') {
      if (this.state.checkInTime == '') {
        Alert.alert('Please select check in time');
        Vibration.vibrate()
      } else if (this.state.checkOutTime == '') {
        Alert.alert('Please select check out time');
        Vibration.vibrate()
      } else {
        this.submitRegularizationRequest('PUT', this.state.id);
      }
    }
  }

  reasonMapped(index) {
    this.state.resonArr.map((item, i) => {
      if (
        item.reasonId ==
        this.state.teamRegularizationReqArr[index].regularizationReason
      ) {
        var reson = item.assignedReason;
        return reson;
      }
    });
  }

  filterItem() {
    let arr = [];
    if (this.state.showRequestPicker) {
      this.state.typeRequestArr.map((m, index) => {
        arr.push(m.value);
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

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.FormBGColor
    // justifyContent:'center'
  },

  approvedCardView: {
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
    shadowRadius: 8.3,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(70,169,64,1.0)',
  },

  rejectCardView: {
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
    shadowRadius: 8.3,

    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(197,95,94,1.0)',
  },
  pendingCardView: {
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
