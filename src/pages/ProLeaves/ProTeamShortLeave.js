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

let globalSwipeRef = null


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

const rightSwipeActions = (rejectApprfunc, index, hi, swipeRef, isCancelBtn = false) => {



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

                swipeRef?.close()

                hi.rejectAction(index)



            }}
        >

            <View
                style={{
                    width: '100%', height: '100%', backgroundColor: '#e03737', justifyContent: 'center', flexDirection: 'row'

                }}
            >


                <View style={{ width: '100%', height: '100%', backgroundColor: "#e03737", justifyContent: 'center', alignItems: 'center' }}>

                    <Image

                        source={isCancelBtn ? require('../../images/delete.png') : require('../../images/rejectTimesheet.png')}
                        style={isCancelBtn ?
                            {
                                width: 25,
                                height: 25,
                                resizeMode: 'contain',
                                tintColor: 'white'
                                // alignSelf: 'center',
                                // right: 10,

                            }
                            :
                            {
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

export default class ProTeamShortLeave extends React.Component {

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
            apprRejectIndex: null,
            leaveId: null,
            isListEmpty: false,
            paginationLoader: false,
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
            await this.getEmpArray() && await this.getTeamApplication(statusArray, isInitial)
            this.setState({ isLoading: false })
        }
        else {
            this.setState({ paginationLoader: true })
            await this.getTeamApplication(statusArray, isInitial)
            this.setState({ paginationLoader: false })
        }




    }

    async getEmpArray() {

        return true
        // var url = "https://proh2r.com/api/proh2r/v1/leave/leaveapplication/employee/" + this.state.authDict.employeeCode
        var url = "https://proh2r.com/api/proh2r/v1/leave/settings/general/return/supervisor/short/leave/employees"

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

                console.log("getEmpArray responseJson", responseJson);

                const empArray = responseJson?.empList

                this.empArray.current = empArray.map((item) => String(item?.empCode).toLowerCase())
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

    componentWillUnmount() {
        globalSwipeRef = null
    }

    //   WEB API
    async getTeamApplication(isInitial) {

        this.setState({ isLoading: true })
        // var url = Constant.BASE_URL + "short/leave/return/supervisor/short-leaves";
        var url = "https://proh2r.com/api/proh2r/v1/short/leave/return/supervisor/short-leaves/supervisorByPagination";
        console.log('getLeaveURL', url);

        try {

            if (isInitial)
                this.currentPageNumber.current = 0


            const bodyPayload = ListViewUtlis.getShortLeaveRecordPayloadForSupervisor(isInitial ? 0 : this.currentPageNumber.current, this.empArray.current, this.statusArray.current)

            console.log("bodyPayload", bodyPayload);

            let response = await fetch(url, {
                method: 'POST',
                headers: Constant.getHeader(this.state.authDict),
                body: JSON.stringify(bodyPayload)
            }
            )


            let code = await response.status
            console.log("getTeamApplication", code);
            this.setState({ isLoading: false })


            if (code == 200) {



                let responseJson = await response.json();
                console.log(responseJson);

                // return
                // let arr = responseJson
                let dataArr = []
                let dataArrPending = []
                let dataArrPendingLength = 0
                let dataArrApproved = []
                let dataArrRejected = []
                let dataArrCancelled = []

                console.log(responseJson)

                if (responseJson?.content?.length == 0) {

                    this.setState({ isListEmpty: true });
                    console.log("responseJson.content.length", responseJson.content.length);

                    this.setState({ isListEmpty: true });
                    // return
                } else {
                    this.setState({ isListEmpty: false });
                }


                this.totalPages.current = responseJson?.totalPage
                this.totalRecords.current = responseJson?.totalRecords

                console.log("code==200", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

                if (isInitial)
                    this.currentPageNumber.current = 1
                else
                    this.currentPageNumber.current++


                console.log("code==200", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);


                let arr = []

                if (isInitial) {
                    arr = responseJson?.content
                    this.setState({ teamApplicationArr: responseJson?.content })
                }
                else {
                    const temp = [...this.state.teamApplicationArr, ...responseJson?.content]
                    this.setState({ teamApplicationArr: temp })
                    arr = temp
                }

                return


                for (let i = 0; i < arr.length; i++) {
                    let obj = arr[i]

                    //   {
                    //     "shortLeaveId": 1,
                    //     "startTime": "09-05-2023 10:54",
                    //     "endTime": "09-05-2023 11:54",
                    //     "slDate": "09-05-2023",
                    //     "durationInMinutes": "60",
                    //     "status": "Rejected",
                    //     "empCode": "ins001",
                    //     "reason": "test",
                    //     "employeeName": "Ramesh Chandra-INS001",
                    //     "primary": true,
                    //     "secondary": false
                    // }
                    //   var dict = {
                    //     name: obj.employeeName,
                    //     status: obj.status,
                    //     orgStatus: Utility.splitStatus(obj.status),
                    //     startDate: obj.startDate,
                    //     endDate: obj.endDate,
                    //     totalLeaveTaken: obj.numberOfLeave,
                    //     leaveCategory: obj.leaveName,
                    //     reason: obj.reason,
                    //     leaveId: obj.leaveId,
                    //   }

                    if (obj.status == 'Approved') {

                        dataArrApproved.push(JSON.parse(JSON.stringify(obj)))

                    }

                    if (obj.status == 'Rejected') {

                        dataArrRejected.push(JSON.parse(JSON.stringify(obj)))

                    }

                    if (obj.status == 'Cancelled') {

                        dataArrCancelled.push(JSON.parse(JSON.stringify(obj)))

                    }

                    if (obj.status != 'Approved') {

                        if (obj.status == 'Level 1 Pending' || obj.status == "Level 2 Pending") {

                            dataArrPending.push(JSON.parse(JSON.stringify(obj)))
                        } else {
                            // dataArr.push(JSON.parse(JSON.stringify(obj)))

                        }
                    }
                }

                dataArrPendingLength = dataArrPending.length

                this.setState({ teamApplicationArr: dataArrPending, totalPendingRequest: dataArrPendingLength, teamApplicationDummyArr: dataArrPending, teamApplicationArrApproved: dataArrApproved, teamApplicationArrRejected: dataArrRejected, teamApplicationArrCancelled: dataArrCancelled, teamApplicationArrPending: dataArrPending, MenuItemClicked: 0 })

                console.log('dataArrPending', dataArrPending);
                console.log('dataArrApproved', dataArrApproved);
                console.log('dataArrRejected', dataArrRejected);
                console.log('dataArrCancelled', dataArrCancelled);

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
            this.setState({ isLoading: false })
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
                        status: obj.status,
                        orgStatus: Utility.splitStatus(obj.status),
                        startDate: obj.startDate,
                        endDate: obj.endDate,
                        totalLeaveTaken: obj.numberOfLeave,
                        leaveCategory: obj.leaveName,
                        reason: obj.reason,
                        leaveId: obj.leaveId,
                        extraData: obj
                    }
                    if (obj.status != 'APPROVED') {

                        if (obj.status == 'LEVEL1PENDING' || obj.status == "LEVEL2PENDING") {

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

        // let comment = action == 'REJECT' ? (value == '' ? 'Rejected' : value) : action == 'APPROVE' ? (value == '' ? 'Approved' : value) : (value == '' ? 'Cancelled' : value)

        var url = Constant.BASE_URL + "short/leave/supervisor";



        // var params = {
        //     "action": action,
        //     "shortLeaveId": this.state.leaveId
        // }

        var params = {
            "action": action,
            "shortLeaveId": this.state.leaveId,
            "comments": value
        }

        console.log('actionOnleaveApi', params);

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
                Alert.alert(responseJson.message)
                console.log(code, responseJson.message)

                // this.refs.toast.show(responseJson.message, 5000)
                // this.getTeamApplication()
                this.executeGetRecords([], true)



                console.log(responseJson)
            } else if (code == 400 || code == 500) {
                let responseJson = await response.json();
                Alert.alert(responseJson.message)
                console.log(code, responseJson.message)

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

    onMenuClick(menuClickIndex, status) {
        this.setState({ MenuItemClicked: menuClickIndex, menuVisible: false })

        // this.statusArray.current = Utility.getStatusArrayForSorting()[status][0]
        this.statusArray.current = status
        this.executeGetRecords([], true)
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


    render() {

        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: COLORS.FormBGColor }}>


                    {/* <Menu
                        onRequestClose={() => this.setState({ menuVisible: false })}
                       

                        visible={this.state.menuVisible}
                
                    >

                        {this.state.MenuItemClicked == 0 ? <></> :

                            <MenuItem onPress={() => {



                                this.setState({
                                    MenuItemClicked: 0, menuVisible: false, teamApplicationArr: this.state.teamApplicationArrPending,
                                    teamApplicationDummyArr: this.state.teamApplicationArrPending
                                })

                            }}>Pending</MenuItem>

                        }



                        {this.state.MenuItemClicked == 1 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({
                                    MenuItemClicked: 1, menuVisible: false, teamApplicationArr: this.state.teamApplicationArrApproved,
                                    teamApplicationDummyArr: this.state.teamApplicationArrApproved
                                })

                            }}>Approved</MenuItem>
                        }

                        {this.state.MenuItemClicked == 2 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({
                                    MenuItemClicked: 2, menuVisible: false, teamApplicationArr: this.state.teamApplicationArrCancelled,
                                    teamApplicationDummyArr: this.state.teamApplicationArrCancelled
                                })

                            }}>Cancelled</MenuItem>
                        }


                        {this.state.MenuItemClicked == 3 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({
                                    MenuItemClicked: 3, menuVisible: false, teamApplicationArr: this.state.teamApplicationArrRejected,
                                    teamApplicationDummyArr: this.state.teamApplicationArrRejected
                                })

                            }}>Rejected</MenuItem>

                        }
                      

                    </Menu> */}

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
                                keyExtractor={(item, index) => String(item.shortLeaveId)}
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
                                :
                                <></>
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

                            // if(inputText != ''){

                            if (inputText == '' || inputText == undefined) {
                                Alert.alert('Please Add Comment !')
                                return
                            }

                            this.actionOnleaveApi(inputText, 'Rejected')
                            this.setState({ comments: inputText, rejectCheck: false })

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

                            if (inputText == '' || inputText == undefined) {
                                Alert.alert('Please Add Comment !')
                                return
                            }

                            this.actionOnleaveApi(inputText, 'Approved')

                            this.setState({ comments: inputText, approveCheck: false })



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

                                Alert.alert('Please Add Comment !')
                                return
                            }

                            //    if(inputText != ''){
                            this.actionOnleaveApi(inputText, 'CANCELLED')
                            this.setState({ comments: inputText, cancelCheck: false })

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


                <SwipeableList onPress={() => this.viewAction(index, item)} title={item.employeeName.split('-')[0]} statusMain={item.status} statusMainColor={Utility.statusColor(item.status)} fromTo={'Date: ' + item.slDate}

                    // LeftSwipeActions={item.status == 'Level 1 Pending' || item.status == "Level 2 Pending" ? (swipeRef) => LeftSwipeActions(this.approvedAction, index, this, swipeRef?.current) : () => <></>} 
                    cancelAction

                    LeftSwipeActions={Utility.isShowPendingBtnByLevels(item) ? (swipeRef) => LeftSwipeActions(this.approvedAction, index, this, swipeRef?.current) : () => <></>}

                    // rightSwipeActions={item.status == 'Level 1 Pending' || item.status == "Level 2 Pending" ? (swipeRef) => rightSwipeActions(this.rejectAction, index, this, swipeRef.current) : () => <></>}

                    rightSwipeActions={Utility.isShowPendingBtnByLevels(item) ? (swipeRef) => rightSwipeActions(this.rejectAction, index, this, swipeRef.current) : item.status == "Approved" ? (swipeRef) => rightSwipeActions(this.cancelAction.bind(this), item, { rejectAction: this.cancelAction.bind(this) }, swipeRef.current, true) : () => <></>}
                    onSwipeableWillOpen={(swipeRef) => {

                        console.log('onSwipeableOpen', globalSwipeRef, " , ", swipeRef, item?.shortLeaveId);

                        if (globalSwipeRef) {

                            if (globalSwipeRef?.id == item?.shortLeaveId) {

                            }
                            else {
                                globalSwipeRef?.swipeRef?.current?.close()
                                globalSwipeRef = { swipeRef: swipeRef, id: item?.shortLeaveId }
                            }


                        } else {
                            globalSwipeRef = { swipeRef: swipeRef, id: item?.shortLeaveId }
                        }
                    }}

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

        const value = Object.values(obj);

        const key = Object.keys(obj);

        var valueArr = []

        var keyArr = ['Status', 'Start Time', 'End Time', 'Total Duration (In Minutes)', 'Reason']


        valueArr.push(obj.status, obj.startTime, obj.endTime, obj.durationInMinutes, obj.reason)

        this.setState({ viewKeyArr: keyArr, viewValueArr: valueArr, isView: true, apprRejectIndex: index })
        console.log()
    }


    cancelAction(leave) {
        console.log("cancelAction", leave);

        // return

        this.setState({ cancelCheck: true, leaveId: leave.shortLeaveId })

    }

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

        this.setState({ approveCheck: true, leaveId: this.state.teamApplicationArr[index]?.shortLeaveId, apprRejectIndex: null })

        // Alert.alert(
        //     'Confirmation',
        //     'Are you sure you want to reject this Leave ?',
        //     [
        //         {
        //             text: 'OK',
        //             onPress: () => {
        //                 // return
        //                 this.actionOnleaveApi('', 'Approved')
        //             },
        //         }, ,
        //         {
        //             text: 'Cancel',
        //         }
        //     ],

        //     { cancelable: true },
        // );





    }

    rejectAction(index) {

        console.log(index)

        this.setState({ rejectCheck: true, leaveId: this.state.teamApplicationArr[index]?.shortLeaveId, apprRejectIndex: null })

        // Alert.alert(
        //     'Confirmation',
        //     'Are you sure you want to reject this Leave ?',
        //     [
        //         {
        //             text: 'OK',
        //             onPress: () => {
        //                 // return
        //                 this.actionOnleaveApi('', 'Rejected')
        //             },
        //         }, ,
        //         {
        //             text: 'Cancel',
        //         }
        //     ],

        //     { cancelable: false },
        // );



    }
}  