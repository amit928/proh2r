import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, Modal, ActivityIndicator, Vibration } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Loader from '../../components/Loader';
import Nav from '../../components/NavBar';
import TopScrollTab from '../../components/TopScrollTab';
import * as Utility from '../../Externel Constant/Utility';

import GeneralInfo from './ProGeneralInfo';
import LeaveApplication from './ProLeaveApplication';
import ProLeaveGrant from './ProMyleaveGrant';
import ProTeamLeaveGrant from './ProTeamLeaveGrant';
import ProTeamApplication from './ProTeamApplication';
import DashboardLeave from './DashboardLeave';
import ProShortLeave from './ProShortLeave';
import ProTeamShortLeave from './ProTeamShortLeave';


const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',

  },
}
)

const checkNull = (value, passValue) => {
  if (value == null || value == "null") {
    return passValue
  }
  else {
    return value
  }
}

export default class LeaveTab extends React.Component {

  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      topScrollTap: [],
      navTitle: this.props.route.params?.tabIndex == 4 ? 'Team Application' : 'General Information',
      selectedPage: this.props.route.params?.tabIndex == 4 ? 5 : this.props.route.params?.tabIndex,
      authDict: {},
      LoadingIndicator: false,

    }
  }

  executeTopBarListForRSPL() {
    KeyStore.getKey('authDict', (err, authDict) => {
      if (authDict) {

        let arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: null, isSelect: false }, { title: 'My Short Leave', isSelect: false }]

        KeyStore.getKey('leaveSupervisor', (err, value) => {
          if (value) {


            KeyStore.getKey('employeeProfileDetails', (err, value) => {

              if (value) {



                if (value?.employeeEligibleForSl) {

                  arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: null, isSelect: false }, { title: 'My Short Leave', isSelect: false },
                  { title: null, isSelect: false }, { title: 'Team Application', isSelect: false }, { title: 'Team Short Leave', isSelect: false }]
                  this.setState({ topScrollTap: arr })


                  // arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: 'My Leave Grant', isSelect: false }, { title: 'My Short Leave', isSelect: false },
                  //   { title: 'Team Leave Grant', isSelect: false }, { title: 'Team Application', isSelect: false }, { title: 'Team Short Leave', isSelect: false }]

                }

                else {

                  arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: null, isSelect: false }, { title: null, isSelect: false },
                  { title: null, isSelect: false }, { title: 'Team Application', isSelect: false }, { title: 'Team Short Leave', isSelect: false }]
                  this.setState({ topScrollTap: arr })

                  // arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: 'My Leave Grant', isSelect: false }, { title: null, isSelect: false },
                  // { title: 'Team Leave Grant', isSelect: false }, { title: 'Team Application', isSelect: false }, { title: 'Team Short Leave', isSelect: false }]
                  // this.setState({ topScrollTap: arr })

                }



              }

            })



          }
          else {
            this.setState({ topScrollTap: arr })

          }
        });

        // Alert.alert(String(authDict?.tanentId), String(Constant.RSPLTenantID))
        // if (String(authDict?.tanentId) == String(Constant.RSPLTenantID)) {

        //   arr = arr.map(item => {
        //     if (item.title === 'My Leave Grant' || item.title === 'Team Leave Grant') {
        //       return { title: null, isSelect: false };
        //     }
        //     return item;
        //   });

        // }

        // this.setState({ topScrollTap: arr })

      }
    });
  }

  componentDidMount() {

    KeyStore.getKey('authDict', (err, authDict) => {

      if (String(authDict?.tanentId) == String(Constant.RSPLTenantID)) {

        //for RSPL
        this.executeTopBarListForRSPL()

      }


      //original code
      else {

        if (authDict) {

          let arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: 'My Leave Grant', isSelect: false }, { title: 'My Short Leave', isSelect: false }]

          KeyStore.getKey('leaveSupervisor', (err, value) => {
            if (value) {


              KeyStore.getKey('employeeProfileDetails', (err, value) => {

                if (value) {



                  if (value?.employeeEligibleForSl) {

                    arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: 'My Leave Grant', isSelect: false }, { title: 'My Short Leave', isSelect: false },
                    { title: 'Team Leave Grant', isSelect: false }, { title: 'Team Application', isSelect: false }, { title: 'Team Short Leave', isSelect: false }]
                    this.setState({ topScrollTap: arr })

                  }

                  else {

                    arr = [{ title: 'General Information', isSelect: true }, { title: 'My Application', isSelect: false }, { title: 'My Leave Grant', isSelect: false }, { title: null, isSelect: false },
                    { title: 'Team Leave Grant', isSelect: false }, { title: 'Team Application', isSelect: false }, { title: 'Team Short Leave', isSelect: false }]
                    this.setState({ topScrollTap: arr })

                  }



                }

              })



            }
            else {
              this.setState({ topScrollTap: arr })

            }
          });

          // Alert.alert(String(authDict?.tanentId), String(Constant.RSPLTenantID))
          // if (String(authDict?.tanentId) == String(Constant.RSPLTenantID)) {

          //   arr = arr.map(item => {
          //     if (item.title === 'My Leave Grant' || item.title === 'Team Leave Grant') {
          //       return { title: null, isSelect: false };
          //     }
          //     return item;
          //   });

          // }

          // this.setState({ topScrollTap: arr })

        }

      }
    });

  }



  //WEB API 
  async getSupervisors() {
    var url = Constant.BASE_URL + Constant.LEAVE_ASSIGNMENT + this.state.authDict.employeeCode
    this.setState({ isLoading: true })
    console.log("getSupervisorsurl", url, Constant.getHeader(this.state.authDict));
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

        let primary = checkNull(responseJson.primaryApprover, '')
        let secondory = checkNull(responseJson.secondaryApprover, '')
        let dataArr = []

        if (primary != '') {
          let obj = {
            name: primary,
            level: '1'
          }
          dataArr.push(obj)
        }
        if (secondory != '') {
          let obj = {
            name: primary,
            level: '1'
          }
          dataArr.push(obj)
        }
        this.setState({ supervisorArr: dataArr })
      } else {
        Alert.alert('Something went wrong!')
        Vibration.vibrate()
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getleaveSummary() {

    var url = Constant.BASE_URL + Constant.LEAVE + this.state.authDict.employeeCode + '/leavescore'
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
        console.log(responseJson)
        var arr = responseJson
        var dataArr = []
        for (let i = 0; i < arr.length; i++) {
          var j = arr[i]
          var obj = {
            leaveName: j.name,
            remainLeave: j.total - j.count
          }
          dataArr.push(obj)
        }
        this.setState({ leaveArr: dataArr })
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {

        this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ loading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
    }
  }

  btnAction = (value) => {

    let arr = []

    this.state.topScrollTap.map((item, index) => {
      item.isSelect = false
      arr.push(item)
    }
    )

    arr[value].isSelect = true

    this.setState({ topScrollTap: arr, navTitle: arr[value].title, selectedPage: value })
  }

  ShowLoadingIndicator() {
    console.log('ShowLoadingIndicator');
    this.setState({ LoadingIndicator: true })
  }


  HideLoadingIndicator() {
    console.log('HideLoadingIndicator');
    this.setState({ LoadingIndicator: false })
  }

  //   async removeItemValue(key) {
  //     try {
  //         await AsyncStorage.removeItem(key);
  //         return true;
  //     }
  //     catch(exception) {
  //         return false;
  //     }
  // }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    console.log('ref', this.refs)

    return (

      <View style={styles.container}>

        {this.state.LoadingIndicator ?
          <View style={{ position: 'absolute', zIndex: 1, right: 8, top: 38 }}>
            <ActivityIndicator size="small" color="white" />
          </View>
          : <></>}

        <Nav rightAction={() => this.state.selectedPage == 1 ? this.refs.myLeaveApplication.clickMenu() : this.state.selectedPage == 2 ? this.refs.myLeaveGrantRef.clickMenu() : this.state.selectedPage == 4 ? this.refs.teamGrantRef.clickMenu() : this.state.selectedPage == 6 ? this.refs.teamShortLeaveRef.clickMenu() : this.refs.teamApplicationRef.clickMenu()}

          isRightBtn={this.state.selectedPage == 4 || this.state.selectedPage == 5 || this.state.selectedPage == 1 || this.state.selectedPage == 2 || this.state.selectedPage == 6 ? true : false}

          rightImg={this.state.selectedPage == 1 || this.state.selectedPage == 2 || this.state.selectedPage == 5 ? require('../../images/dots.png') : this.state.selectedPage == 6 ? require('../../images/dots.png') : require('../../images/dots.png')}

          title={this.state.navTitle}
          backHidden={false} backAction={() => goBack()}

          isSearchBtn={this.state.selectedPage == 4 || this.state.selectedPage == 5 ? true : false}

          isSearchBtnAction={() => this.state.selectedPage == 4 ? this.refs.teamGrantRef.showSearchBar() : this.refs.teamApplicationRef.showSearchBar()}></Nav>

        {/* <View style={{ 
          shadowOffset: { width: 0, height: 2, }, shadowColor: 'rgba(224,225,227,1.0)', shadowOpacity: 3.0, elevation: 3, 
        // marginTop: 8, 
        height: 45, width: '100%', backgroundColor: 'rgba(239,240,241,1.0)},', zIndex: 1 }}> */}

        {this.props.route.params?.tabIndex == 0 ?

          <TopScrollTab btnAction={this.btnAction} itemArr={this.state.topScrollTap}></TopScrollTab>
          :
          <></>
        }

        {/* </View> */}

        <View style={{ flex: 1, }}>
          {
            this.state.selectedPage == 0 ?
              // <GeneralInfo></GeneralInfo> 
              <DashboardLeave {...this.props} />
              : this.state.selectedPage == 1 ? <LeaveApplication ref='myLeaveApplication' ShowLoadingIndicator={() => this.ShowLoadingIndicator} HideLoadingIndicator={() => this.HideLoadingIndicator()} navigation={this.props.navigation} reloadLeaveSummary={this.props.route.params?.reloadLeaveSummary}></LeaveApplication> :
                this.state.selectedPage == 2 ? <ProLeaveGrant ref='myLeaveGrantRef' navigation={this.props.navigation}></ProLeaveGrant> : this.state.selectedPage == 3 ? <ProShortLeave ref='shortLeaveRef' {...this.props} /> : this.state.selectedPage == 4 ? <ProTeamLeaveGrant ref='teamGrantRef' {...this.props}></ProTeamLeaveGrant> :
                  this.state.selectedPage == 5 ? <ProTeamApplication ref='teamApplicationRef' {...this.props}></ProTeamApplication> : this.state.selectedPage == 6 ? <ProTeamShortLeave ref='teamShortLeaveRef' {...this.props} /> :
                    <></>
          }

        </View>
        <Loader isLoader={this.state.loading}> </Loader>
      </View>
    );
  }
}
