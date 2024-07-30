import React, { createRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, Modal, TextInput, RefreshControl, Vibration, FlatList, ActivityIndicator } from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import * as Utility from '../../Externel Constant/Utility';
import DialogInput from 'react-native-dialog-input';
import Toast, { DURATION } from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../../components/Loader';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Shadow } from 'react-native-shadow-2';
import SwipeableList from '../../components/SwipeableList';
import { COLORS } from '../../Constant/Index';
import DisplayCountBar from '../../components/DisplayCountBar';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { ListViewUtlis } from '../../ListViewUtlis';


const styles = StyleSheet.create({

  container: {
    // height: '100%',
    // width: '100%',
    flex: 1,
    backgroundColor: COLORS.FormBGColor
    // justifyContent:'center'

  },

  approvedCardView: {
    height: 180,
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
    height: 180,
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

const rightSwipeActions = (rejectApprfunc, index, hi, swipeRef) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
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
  );
};


export default class ProTeamExpenseRecord extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      teamExpenseArr: [],
      teamExpenseDummyArr: [],

      MainAPIDataArray: [],

      EmpExpenseData: [],
      ExpenseList: [],

      teamViewKeyArr: [],
      teamViewvalueArr: [],
      isLoading: false,
      isView: false,
      deleteCheck: false,
      selectedEpenseId: '',
      approveCheck: false,
      isEdit: false,
      authDict: {},
      title: '',
      editServerDate: '',
      amount: '',
      advanceAmount: '',
      expenseTitle: '',
      description: '',
      editExpenseId: '',
      totalPendingRequest: 0,
      searchValue: '',
      searchEnable: false,
      refreshing: false,
      MenuItemClicked: 0,
      teamApplicationArrPending: [],
      teamApplicationArrApproved: [],
      teamApplicationArrRejected: [],
      teamApplicationArrCancelled: [],
      apprRejectIndex: null,
      paginationLoader: false
    }

    this.totalRecords = createRef();
    this.totalPages = createRef();
    this.currentPageNumber = createRef();
    this.statusArray = createRef();
    this.empArray = createRef();

    this.controller = new AbortController();
    this.signal = this.controller.signal;

  }

  componentDidMount() {

    console.log("componentDidMount", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

    this.currentPageNumber.current = 0

    this.statusArray.current = "PENDING"

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.executeGetExpenseRecord([], true)
      }
    });

  }


  async executeGetExpenseRecord(statusArray, isInitial) {


    console.log("executeGetExpenseRecord", { statusArray, isInitial });
    if (isInitial) {
      this.setState({ isLoading: true })
      await this.getEmpArray() && await this.getTeamExpense(statusArray, isInitial)
      this.setState({ isLoading: false })
    }
    else {
      this.setState({ paginationLoader: true })
      await this.getTeamExpense(statusArray, isInitial)
      this.setState({ paginationLoader: false })
    }




  }

  async getTeamExpense(statusArray, isInitial) {

    // var url = Constant.BASE_URL + Constant.TEAM_EXPENSE + this.state.authDict.employeeCode
    var url = "https://proh2r.com/api/proh2r/v1/expense/application/supervisorByPaginationForMobile"

    console.log('getTeamExpense', url);
    // this.setState({ isLoading: true })

    try {
      if (isInitial)
        this.currentPageNumber.current = 0


      const bodyPayload = ListViewUtlis.getExpenseRecordPayloadForSupervisor(isInitial ? 0 : this.currentPageNumber.current, this.empArray.current, this.statusArray.current)

      console.log("bodyPayload", bodyPayload);


      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: JSON.stringify(bodyPayload),
        signal: this.signal
      }
      )

      let code = await response.status
      console.log("response.status", code);
      // this.setState({ isLoading: false })

      if (code == 200) {

        let responseJson = await response.json();
        console.log('Response Json getTeamExpense', responseJson)

        this.totalPages.current = responseJson?.totalPage
        this.totalRecords.current = responseJson?.totalRecords

        if (isInitial)
          this.currentPageNumber.current = 1
        else
          this.currentPageNumber.current++

        console.log("code==200", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

        let copyData = []

        copyData = isInitial ? responseJson?.content : [...this.state.MainAPIDataArray, ...responseJson?.content]


        this.setState({ MainAPIDataArray: copyData })
        // this.setState({ MainAPIDataArray: responseJson })

        var arr = copyData

        var dataArr = []
        var dataArrPending = []
        let dataArrApproved = []
        let dataArrRejected = []
        let dataArrCancelled = []

        // return

        for (let i = 0; i < arr.length; i++) {
          var j = arr[i]

          var pickedDt = Moment(j.expenseIncurredDate).format('DD/MM/YYYY')
          var pickedServerDt = Moment(j.expenseIncurredDate).format('YYYY-MM-DD')

          var obj = {
            expenseName: Utility.checkNull(String(j.expenseName), ''),
            status: Utility.checkNull(String(j.expenseStatus), ''),
            reportTitle: Utility.checkNull(String(j.expenseReportName), ''),
            incurredDate: Utility.checkNull(String(pickedDt), ''),
            reimbursement: Utility.checkNull(String(j.reimburseAmount), ''),
            billable: Utility.checkNull(String(j.billableAmount), ''),
            advanceAmunt: String(Utility.checkNull(String(j.amount), '') - Utility.checkNull(String(j.reimburseAmount), '')),
            expenceReason: Utility.checkNull(String(j.expenseReason), ''),
            incurredServerDate: Utility.checkNull(String(pickedServerDt), ''),
            empName: Utility.checkNull(String(j.empName), ''),
            expenseId: Utility.checkNull(String(j.expenseId), ''),
            empCode: Utility.checkNull(String(j.empCode), ''),
          }

          dataArr.push(obj)

          /*
                    if (obj.status == 'APPROVED') {
          
                      dataArrApproved.push(obj)
          
                    }
          
                    if (obj.status == 'REJECTED') {
          
                      dataArrRejected.push(obj)
          
                    }
          
                    if (obj.status == 'CANCELLED') {
          
                      dataArrCancelled.push(obj)
          
                    }
          
                    if (obj.status == 'LEVEL1PENDING' || obj.status == "LEVEL2PENDING") {
          
                      dataArrPending.push(obj)
                    } else {
                      // dataArr.push(obj)
          
                    }
          
          
                    //  dataArr.push(obj)
          */
        }
        // dataArrPending.push(...dataArr)

        // this.setState({
        //   teamExpenseArr: dataArrPending, totalPendingRequest: dataArrPending.length, teamExpenseDummyArr: dataArrPending,
        //   teamApplicationArrApproved: dataArrApproved, teamApplicationArrRejected: dataArrRejected, teamApplicationArrCancelled: dataArrCancelled, teamApplicationArrPending: dataArrPending, MenuItemClicked: 0
        // })

        // this.setState({
        //   teamExpenseArr: dataArr, totalPendingRequest: dataArr.length, MenuItemClicked: 0, teamExpenseDummyArr: dataArr
        // })

        this.setState({
          teamExpenseArr: dataArr, totalPendingRequest: dataArr.length, teamExpenseDummyArr: dataArr
        })

        // console.log('dataArrPending', dataArrPending);
        // console.log('dataArrApproved', dataArrApproved);
        // console.log('dataArrRejected', dataArrRejected);
        // console.log('dataArrCancelled', dataArrCancelled);

      }
      else if (code == 400) {
        // this.setState({ isLoading: false })
        let responseJson = await response.json();
        console.log(responseJson)
        Alert.alert('Something went wrong!')
      }
      else {

        let msg = await response.statusText
        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.log(error);
      // Alert.alert("", JSON.stringify(error))
      console.log(error);
      error?.name != "AbortError" && Alert.alert("", "Something went wrong")
    }
  }

  async getEmpArray() {
    var url = "https://proh2r.com/api/proh2r/v1/expense/application/employee/" + this.state.authDict.employeeCode
    this.setState({ isLoading: true })

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
        signal: this.signal
      })

      let code = await response.status


      if (code == 200) {
        let responseJson = await response.json();
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

  async onRefresh() {

    var url = Constant.BASE_URL + Constant.TEAM_EXPENSE + this.state.authDict.employeeCode
    this.setState({ refreshing: true })

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
        signal: this.signal
      }
      )

      let code = await response.status
      this.setState({ refreshing: false })

      if (code == 200) {

        let responseJson = await response.json();
        console.log('Response Json getTeamExpense', responseJson)

        let copyData = []

        copyData = isInitial ? responseJson?.content : [...this.state.MainAPIDataArray, ...responseJson?.content]


        this.setState({ MainAPIDataArray: copyData })

        var arr = copyData
        var dataArr = []
        var dataArrPending = []

        for (let i = 0; i < arr.length; i++) {
          var j = arr[i]

          var pickedDt = Moment(j.expenseIncurredDate).format('DD/MM/YYYY')
          var pickedServerDt = Moment(j.expenseIncurredDate).format('YYYY-MM-DD')

          var obj = {
            expenseName: Utility.checkNull(String(j.expenseName), ''),
            status: Utility.checkNull(String(j.expenseStatus), ''),
            reportTitle: Utility.checkNull(String(j.expenseReportName), ''),
            incurredDate: Utility.checkNull(String(pickedDt), ''),
            reimbursement: Utility.checkNull(String(j.reimburseAmount), ''),
            billable: Utility.checkNull(String(j.billableAmount), ''),
            advanceAmunt: String(Utility.checkNull(String(j.amount), '') - Utility.checkNull(String(j.reimburseAmount), '')),
            expenceReason: Utility.checkNull(String(j.expenseReason), ''),
            incurredServerDate: Utility.checkNull(String(pickedServerDt), ''),
            empName: Utility.checkNull(String(j.empName), ''),
            expenseId: Utility.checkNull(String(j.expenseId), ''),
            empCode: Utility.checkNull(String(j.empCode), ''),
          }
          if (obj.status != 'APPROVED' && obj.status != 'REJECTED' && obj.status != 'CANCELLED') {

            if (obj.status == 'LEVEL1PENDING' || obj.status == "LEVEL2PENDING") {

              dataArrPending.push(obj)
            } else {
              dataArr.push(obj)

            }
          }

          //  dataArr.push(obj)

        }
        dataArrPending.push(...dataArr)

        this.setState({ teamExpenseArr: dataArrPending, totalPendingRequest: dataArrPending.length, teamExpenseDummyArr: dataArrPending })

      } else {

        let msg = await response.statusText
        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }


  }

  async actionOnRequest(action, comment) {
    let actionComment = action == 'REJECT' ? (comment == '' ? 'Rejected' : comment) : (comment == '' ? 'Approved' : comment)

    var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + this.state.selectedEpenseId + '/action?action=' + action + '&&comments=' + actionComment

    this.setState({ deleteCheck: false, isLoading: true, approveCheck: false })
    var params = { action: action, comments: actionComment }

    console.log(url)
    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict),
        signal: this.signal
      }
      )

      this.setState({ isLoading: false })
      let code = await response.status

      if (code == 200) {

        let responseJson = await response.json();
        console.log(responseJson)
        // this.refs.toast.show(responseJson.message);
        Alert.alert(responseJson.message)
        // this.getTeamExpense()
        this.executeGetExpenseRecord([], true)

      } else {
        this.setState({ isLoading: false })
        let msg = await response.statusText
        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateExpense() {

    var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + this.state.editExpenseId

    this.setState({ deleteCheck: false, isLoading: true, approveCheck: false, isView: false, isEdit: false })

    var params = {
      empCode: this.state.editEmpCode, expenseIncurredDate: this.state.editServerDate, expenseName: this.state.title,
      amount: this.state.amount, advanceAmount: this.state.advanceAmount, expenseReport: this.state.expenseTitle, expenseReason: this.state.description
    }

    console.log(params)
    console.log(url)

    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict),
        signal: this.signal
      }
      )

      this.setState({ isLoading: false })
      let code = await response.status

      if (code == 201) {

        let responseJson = await response.json();
        console.log(responseJson)
        this.refs.toast.show(responseJson.message);
        this.getTeamExpense()

      } else {

        let msg = await response.statusText
        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  printExpense(item) {

    console.log(item);

  }

  MatchEmpCodeAndPopulateData(expenseId) {

    console.log("i am executing", this.state.MainAPIDataArray);

    this.state.MainAPIDataArray.forEach((item, index) => {

      // console.log('Under Func',item);

      if (item.expenseId == expenseId) {

        console.log("Yo", item);

        if (item.expenseStatus == "LEVEL1PENDING") {

          this.props.navigation.navigate('ProViewTeamExpenseRecord', { item: item, teamFlag: true, updateAction: () => this.getTeamExpense(), authDict: this.state.authDict });

        }
        else if (item.expenseStatus == "LEVEL2PENDING") {
          this.props.navigation.navigate('ProViewTeamExpenseRecord', { item: item, teamFlag: true, updateAction: () => this.getTeamExpense(), authDict: this.state.authDict });
        }

        else {
          this.props.navigation.navigate('ProViewTeamExpenseRecord', { item: item, teamFlag: false, updateAction: () => { }, authDict: this.state.authDict });
        }





      }

    })

    //console.log("i am executing Again  ...")

  }

  handleCancelAPI = () => {
    this.controller.abort();
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    // this.setState({isLoading: false})
  };

  onMenuClick(menuClickIndex, status) {
    this.setState({ MenuItemClicked: menuClickIndex, menuVisible: false })

    // this.statusArray.current = Utility.getStatusArrayForSorting()[status][0]
    this.statusArray.current = status
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

    if (this.state.teamExpenseArr.length >= this.totalRecords) {
      console.log("this.state.expenseArr >= this.totalRecords");
      return
    }

    this.executeGetExpenseRecord()
    // this.setState({ paginationLoader: true })


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



          {
            this.state.searchEnable ?
              <View style={{ backgroundColor: 'rgba(239,240,241,1.0)', height: 70, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '90%', height: 40, backgroundColor: 'white', borderRadius: 24, alignItems: 'center', flexDirection: 'row' }}>

                  <TextInput allowFontScaling={false}
                    placeholder='Search'
                    placeholderTextColor="#A9A9A9"
                    style={{
                      width: '82%', fontSize: 13, fontFamily: Constant.MontserratMedium, color: 'black', borderRadius: 24,

                      paddingLeft: 16, paddingRight: 40,
                      //  paddingTop: 14, paddingBottom: 14
                    }}
                    autoFocus={true}
                    value={this.state.searchValue}
                    autoCorrect={false}
                    onChangeText={(searchValue) => this.searchValue(searchValue)}
                    returnKeyType="go" underlineColorAndroid="transparent"></TextInput>

                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/searchGray.png')}></Image>

                  <TouchableOpacity style={{ marginRight: 8, marginLeft: 8 }} onPress={() => this.setState({ teamExpenseArr: this.state.teamExpenseArr.reverse() })}>
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/sort.png')}></Image>
                  </TouchableOpacity>
                </View>

              </View>


              : <></>
          }

          {/* <DisplayCountBar title='Total Requests: '
            total={this.state.teamExpenseArr.length}
          />
          <View style={{ marginTop: 20 }} /> */}

          {/* <Text allowFontScaling={false} style={{ top: 14, left: 16, fontSize: 17, fontWeight: 'bold', color: '#A9A9A9' }}>Total Pending Requests: {this.state.totalPendingRequest}
        </Text> */}

          {
            this.state.teamExpenseArr.length != 0 ?
              <>
                {/* <ScrollView style={{ marginTop: 30 }}>
                  {
                    this.state.teamExpenseArr.map((item, index) =>
                      <>
                    
                        <this.renderList item={item} index={index} key={index} />
                      </>

                    )
                  }
                </ScrollView> */}

                <FlatList
                  data={this.state.teamExpenseArr}
                  showsVerticalScrollIndicator={false}
                  // ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={this.renderList}
                  keyExtractor={(item, index) => String(item?.expenseId)}
                  // initialNumToRender={5}
                  // maxToRenderPerBatch={10}
                  // windowSize={10}
                  onEndReachedThreshold={0.5}
                  onEndReached={this.fetchMoreData.bind(this)}
                  ListFooterComponent={this.state.paginationLoader ? <ActivityIndicator size={'large'} /> : <View style={{ height: 10 }} />}
                />

                {/* {this.state.paginationLoader && <ActivityIndicator size={'large'} />} */}

              </>
              :
              <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

              </Text>
          }

          <Loader enablePopUps onReqFailed={() => {

            this.handleCancelAPI()

          }} isLoader={this.state.isLoading}> </Loader>


          <Modal
            visible={this.state.isView}

            transparent={true}
            onRequestClose={() => { }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ width: Dimensions.get('window').width - 40, backgroundColor: 'white', borderRadius: 8 }}>
                <View style={{ marginBottom: 30 }}>
                  <View style={{ width: 100, height: 100, borderRadius: 50, marginTop: -50, alignSelf: 'center', justifyContent: 'center' }} >
                    <Image source={require('../../images/dialog-logo.png')} style={{ width: "100%", height: "100%", resizeMode: 'contain' }}>
                    </Image>
                  </View>

                  <TouchableOpacity style={{ width: 100, height: 50, alignSelf: 'flex-end', top: 8, marginTop: -40 }} onPress={() => this.setState({ isView: false, isEdit: false })}>
                    <Image
                      source={require('../../images/cross.png')}
                      style={{ height: '60%', width: '60%', resizeMode: 'contain', alignSelf: "flex-end" }} />

                  </TouchableOpacity>
                  <Text allowFontScaling={false} style={{ textAlign: 'center', justifyContent: 'center', textAlignVertical: "center", fontSize: 17, color: 'black', fontWeight: '500', marginTop: -10 }}>Show Expense Details</Text>
                </View>
                {
                  this.state.isEdit ?

                    <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}
                      scrollEnabled={true}>

                      {/* Select Category  */}
                      <TouchableOpacity style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', width: '90%', height: 45
                      }}>

                        <Text allowFontScaling={false} style={{ fontSize: 13, color: 'grey', fontWeight: '100', paddingLeft: 8 }}>{this.state.title}</Text>

                        <Image
                          source={require('../../images/downArrow.png')}
                          style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                        />

                      </TouchableOpacity>

                      <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                      </View>

                      {/* Select Date  */}

                      <TouchableOpacity style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', width: '90%', height: 45, marginTop: 8
                      }}>

                        <Text allowFontScaling={false} style={{ fontSize: 13, color: 'grey', fontWeight: '100', paddingLeft: 8 }}>{this.state.editDate}</Text>

                        <Image
                          source={require('../../images/downArrow.png')}
                          style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                        />

                      </TouchableOpacity>

                      <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                      </View>

                      {/* Enter Amount  */}
                      <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Amount'
                        placeholderTextColor="#A9A9A9"
                        value={this.state.amount}
                        keyboardType={'decimal-pad'}
                        onChangeText={(amount) => this.setState({ amount: amount })}
                        returnKeyType="done"
                        editable={false} />

                      <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                      </View>

                      {/* Enter Advance Amount  */}
                      <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Advance Amount Received'
                        placeholderTextColor="#A9A9A9"
                        value={this.state.advanceAmount}
                        keyboardType={'decimal-pad'}
                        onChangeText={(advanceAmount) => this.setState({ advanceAmount: advanceAmount })}
                        returnKeyType="done" />

                      <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                      </View>

                      {/* Expense Title  */}

                      <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Title'
                        placeholderTextColor="#A9A9A9"
                        value={this.state.expenseTitle}
                        onChangeText={(expenseTitle) => this.setState({ expenseTitle: expenseTitle })}
                        returnKeyType="done" />

                      <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                      </View>

                      {/* Description Title  */}

                      <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Description'
                        placeholderTextColor="#A9A9A9"
                        value={this.state.description}
                        onChangeText={(description) => this.setState({ description: description })}
                        returnKeyType="done" />

                      <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                      </View>

                      <View style={{
                        height: 60, flexDirection: 'row', justifyContent: 'space-between'
                        , alignItems: 'center', marginTop: 16, borderRadius: 8, width: '90%'
                      }}>

                        <TouchableOpacity style={{
                          height: 35, width: '48%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.5,
                          borderColor: 'rgba(42,76,136,1.0)'
                        }} onPress={() => this.setState({ isView: false, isEdit: false })}>
                          <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Cancel</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ height: 35, width: "48%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)' }}
                          onPress={() => this.state.expenseTitle == '' ? Alert.alert('Please enter expense title') : this.updateExpense()}>
                          <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Submit</Text>

                        </TouchableOpacity>

                      </View>


                    </KeyboardAwareScrollView>

                    :


                    this.state.teamViewKeyArr.map((m, i) => <View key={i} style={{ width: '100%', padding: 8, flexDirection: 'row' }}>
                      <View style={{ flex: 3, justifyContent: 'center', }}>
                        <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{m + ":"}</Text>
                      </View>
                      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{Utility.splitStatus(this.state.teamViewValueArr[i])}</Text>
                      </View>
                    </View>


                    )}

              </View>
            </View>
          </Modal>

          <DialogInput isDialogVisible={this.state.deleteCheck}
            title={"Confirmation"}
            message={'Are you sure you want to reject this request.'}
            hintInput={""}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}


            submitInput={(inputText) => {

              // if (String(inputText) != '') {

              //   console.log("executing.");

              //   this.actionOnRequest('REJECT', inputText)

              // }

              // console.log('inputType: ', typeof inputText, ",inputText: ", inputText);

              if (inputText == undefined) {
                // console.log('Undefined');
                Vibration.vibrate()
                return Alert.alert('Please Enter Comment !');
              }

              else if (inputText == '') {
                Vibration.vibrate()
                // console.log(typeof inputText, ": Empty");
                return Alert.alert('Please Enter Comment !');
              }

              else {
                // console.log(typeof inputText, ": Filled");
                this.actionOnRequest('REJECT', inputText);
              }

              // console.log('---------------inputType: ', typeof inputText, ",inputText: ", inputText);


            }}

            closeDialog={() => { this.setState({ deleteCheck: false }) }}>
          </DialogInput>

          <DialogInput isDialogVisible={this.state.approveCheck}
            title={"Confirmation"}
            message={'Are you sure you want to approve this request.'}
            hintInput={""}
            textInputProps={{ autoCorrect: false }}
            dialogStyle={{ marginTop: -150 }}
            submitInput={(inputText) => {



              // this.actionOnRequest('APPROVE', inputText)

              if (inputText == undefined) {
                // console.log('Undefined');
                Vibration.vibrate()
                return Alert.alert('Please Enter Comment !');
              }

              else if (inputText == '') {
                // console.log(typeof inputText, ": Empty");
                Vibration.vibrate()
                return Alert.alert('Please Enter Comment !');
              }

              else {
                // console.log(typeof inputText, ": Filled");
                this.actionOnRequest('APPROVE', inputText)
              }




            }}

            closeDialog={() => { this.setState({ approveCheck: false }) }}>
          </DialogInput>


          <Toast ref="toast" />


        </View>

      </>

    );
  }

  viewAction(index) {

    let obj = this.state.teamExpenseArr[index]

    const value = Object.values(obj);

    const key = Object.keys(obj);

    var keyArr = ['Category', 'Status', 'Expense Title', 'Incurred Date', 'Total Reimbursable', 'Total Billable', 'Advance Received', 'Expense Description']

    this.setState({ teamViewKeyArr: keyArr, teamViewValueArr: value, isView: true })

  }

  showSearchBar() {

    this.setState({ searchEnable: !this.state.searchEnable, searchValue: '', teamExpenseArr: this.state.teamExpenseDummyArr })

  }

  clickMenu() {

    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }


  searchValue(value) {

    var arr = []

    this.setState({ searchValue: value })

    this.state.teamExpenseDummyArr.map((item, index) => {
      if (item.empName.toLowerCase().includes(value.toLowerCase()) ||
        item.reportTitle.toLowerCase().includes(value.toLowerCase()) || item.incurredDate.toLowerCase().includes(value.toLowerCase()) || item.status.toLowerCase().includes(value.toLowerCase()) || item.reimbursement.toLowerCase().includes(value.toLowerCase())) {
        arr.push(item)
      }
    }
    )
    this.setState({ teamExpenseArr: arr })
  }


  rejectAction(index) {

    this.setState({ deleteCheck: true, selectedEpenseId: this.state.teamExpenseArr[index].expenseId })
  }

  approveAction(index) {

    this.setState({ approveCheck: true, selectedEpenseId: this.state.teamExpenseArr[index].expenseId })
  }

  editAction(index) {

    this.setState({
      isView: true, isEdit: true,
      title: String(this.state.teamExpenseArr[index].expenseName),
      editDate: String(this.state.teamExpenseArr[index].incurredDate),
      editServerDate: String(this.state.teamExpenseArr[index].incurredServerDate),
      amount: String(this.state.teamExpenseArr[index].billable),
      advanceAmount: String(this.state.teamExpenseArr[index].billable - this.state.teamExpenseArr[index].reimbursement),
      expenseTitle: String(this.state.teamExpenseArr[index].reportTitle),
      description: String(this.state.teamExpenseArr[index].expenceReason), editExpenseId: String(this.state.teamExpenseArr[index].expenseId),
      editEmpCode: String(this.state.teamExpenseArr[index].empCode)

    })
  }

  renderList = ({ item, index }) => {
    // const swipeRef = React.createRef();
    // console.log(item);
    return (
      <>

        <SwipeableList
          title={item?.empName}
          statusMain={Utility.splitStatus(item?.status)}
          statusMainColor={Utility.statusColor(item?.status)}
          onPress={() => {
            this.MatchEmpCodeAndPopulateData(item?.expenseId)

          }}
          LeftSwipeActions={(swipeRef) => Utility.isPendingStatus(item?.status) ? LeftSwipeActions(() => this.approveAction(index), index, this, swipeRef.current) : <></>
          }
          rightSwipeActions={(swipeRef) => Utility.isPendingStatus(item?.status) ? rightSwipeActions(() => this.rejectAction(index), index, this, swipeRef.current)
            :
            <></>
          }
          fromTo={'Report Title: ' + item?.reportTitle}
        />






      </>);
  }

}