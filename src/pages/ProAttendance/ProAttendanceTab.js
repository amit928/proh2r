import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Modal,
  ImageBackground,
  Picker,
  Vibration,
} from 'react-native';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import Loader from '../../components/Loader';
import Nav from '../../components/NavBar';
import TopScrollTab from '../../components/TopScrollTab';
import * as Utility from '../../Externel Constant/Utility';

import ProMyAttendance from './ProMyAttendance';
import ProMyRegularization from './ProMyRegularization';
import ProTeamRegularization from './ProTeamRegularization';
import Moment from 'moment';
import CustomPicker from '../../components/CustomPicker';
import ProOnDutyRequest from './ProOnDutyRequet';
import ProTeamOnDutyRequest from './ProTeamOnDutyRequest';
import moment from 'moment';

const FirstTabName =
  // 'Summary'
  'Dashboard'
// 'My Attendance'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

const checkNull = (value, passValue) => {
  if (value == null || value == 'null') {
    return passValue;
  } else {
    return value;
  }
};

export default class AttendanceTab extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      authDict: {},
      loading: false,
      // topScrollTap:[{title:'FirstTabName',isSelect:true,index:0},{title:'My Regularization',isSelect:false,index:0},{title:'On Duty Request',isSelect:false,index:3}],
      topScrollTap: this.props.route.params.tabIndex == 1 ? [
        { title: FirstTabName, isSelect: false, index: 0 },
        { title: 'My Regularization', isSelect: true, index: 1 },
      ] : [
        { title: FirstTabName, isSelect: true, index: 0 },
        { title: 'My Regularization', isSelect: false, index: 1 },
      ],

      navTitle: this.props.route.params.tabIndex == 1 ? 'My Regularization' : this.props.route.params.tabIndex == 2 ? 'Team Regularization' : FirstTabName,
      selectedTitle: this.props.route.params.tabIndex == 1 ? 'My Regularization' : this.props.route.params.tabIndex == 2 ? 'Team Regularization' : FirstTabName,
      selectedIndex: this.props.route.params.tabIndex,
      isDateTimePickerVisible: false,
      isDateTimePickerPopUpVisible: false,
      totalAmount: '1000',
      employeeCode: '',
      token: '',
      date: 'Select Date',
      popUpSelectDate: 'Select Date',
      daysPresent: '',
      daysAbsent: '',
      leaveTaken: '',
      weaklyOff: '',
      holidays: '',
      totalHours: '',
      isModalVisible: false,
      monthArr: [],
      monthArrFormated: [],

      showPicker: false,
      month: '',
      attendanceArr: [],
      isLoading: false,
      date: '',
      afterProcessingOverViewData: {},
      attendanceRecordsOnDayVOList: [],
      isFromMyAttandance: false,
      regpickedDt: '',
      regpickedServerDt: '',
      regpickedShiftDt: '',

    };
  }



  setIsFromMyAttandance() {

    console.log('setIsFromMyAttandance()');
    this.setState({ isFromMyAttandance: true })
    this.btnAction(1)

  }

  fromRegToMyAttd() {

    this.btnAction(0)

  }

  setIsFromMyAttandanceFalse() {

    console.log('setIsFromMyAttandanceFalse()');
    this.setState({ isFromMyAttandance: false, regpickedDt: '', regpickedServerDt: '', regpickedShiftDt: '' })


  }

  setRegData(regpickedDt, regpickedServerDt, regpickedShiftDt) {

    this.setState({ regpickedDt: regpickedDt, regpickedServerDt: regpickedServerDt, regpickedShiftDt: regpickedShiftDt })

    console.log('regpickedDt: ', regpickedDt, ',  regpickedServerDt: ', regpickedServerDt, ',  regpickedShiftDt: ', regpickedShiftDt);

  }

  componentDidMount() {

    console.log('AttendanceTabssss', this.props.route.params);
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value });
        this.fetchAttandenceMonths();
      }
    });

    KeyStore.getKey('attdSupervisor', (err, value) => {
      if (value) {
        KeyStore.getKey('onDutySupervisor', (err, value) => {
          if (value) {
            // let arr = [{title:FirstTabName,isSelect:true,index:0},{title:'My Regularization',isSelect:false,index:1},{title:'Team Regularization',isSelect:false,index:2},{title:'On Duty Request',isSelect:false,index:3},{title:'Team On Duty Requests',isSelect:false,index:4}]

            let arr = []

            if (this.props.route.params.tabIndex == 1) {
              arr = [
                { title: FirstTabName, isSelect: false, index: 0 },
                { title: 'My Regularization', isSelect: true, index: 1 },
                { title: 'Team Regularization', isSelect: false, index: 2 },
                { title: 'Attendance Summary', isSelect: false, index: 3 },
                { title: 'OD', isSelect: false, index: 4 },
              ];
            }

            else {
              arr = [
                { title: FirstTabName, isSelect: true, index: 0 },
                { title: 'My Regularization', isSelect: false, index: 1 },
                { title: 'Team Regularization', isSelect: false, index: 2 },
                { title: 'Attendance Summary', isSelect: false, index: 3 },
                { title: 'OD', isSelect: false, index: 4 },
              ];
            }



            this.setState({ topScrollTap: arr });
          } else {
            // let arr = [{title:FirstTabName,isSelect:true,index:0},{title:'My Regularization',isSelect:false,index:1},{title:'Team Regularization',isSelect:false,index:2},{title:'On Duty Request',isSelect:false,index:3}]

            let arr = []

            if (this.props.route.params.tabIndex == 1) {
              arr = [
                { title: FirstTabName, isSelect: false, index: 0 },
                { title: 'My Regularization', isSelect: true, index: 1 },
                { title: 'Team Regularization', isSelect: false, index: 2 },
              ];
            }

            else {
              arr = [
                { title: FirstTabName, isSelect: true, index: 0 },
                { title: 'My Regularization', isSelect: false, index: 1 },
                { title: 'Team Regularization', isSelect: false, index: 2 },
              ];
            }




            this.setState({ topScrollTap: arr });
          }
        });
        // this.props.route.params.tabIndex
      } else {
        KeyStore.getKey('onDutySupervisor', (err, value) => {
          if (value) {
            // let arr = [{title:FirstTabName,isSelect:true,index:0},{title:'My Regularization',isSelect:false,index:1},
            // {title:'On Duty Request',isSelect:false,index:3},{title:'Team On Duty Requests',isSelect:false,index:4}]

            let arr = [
              { title: FirstTabName, isSelect: true, index: 0 },
              { title: 'My Regularization', isSelect: false, index: 1 },
            ];
            this.setState({ topScrollTap: arr });
          } else {
            // let arr = [{title:FirstTabName,isSelect:true,index:0},{title:'My Regularization',isSelect:false,index:1},{title:'On Duty Request',isSelect:false,index:3}]

            let arr = [
              { title: FirstTabName, isSelect: true, index: 0 },
              { title: 'My Regularization', isSelect: false, index: 1 },
            ];

            this.setState({ topScrollTap: arr });
          }
        });
        // this.props.route.params.tabIndex
      }
    });



  }

  //WEB API

  btnAction = value => {
    let arr = [];

    this.state.topScrollTap.map((item, index) => {
      item.isSelect = false;
      arr.push(item);
    });

    arr[value].isSelect = true;
    if (arr[value].index == 0) {
      this.fetchAttandenceRecord(this.state.month);
    }
    this.setState({
      selectedIndex: arr[value].index,
      navTitle: arr[value].title,
      topScrollTap: arr,
      selectedTitle: arr[value].title,
    });
  };

  // nacBtn()
  // {
  //   let tle = this.state.selectedTitle
  //   this.state.selectedIndex == 2 ? this.refs.teamOnRegRequest.showSearchBar() :
  //   this.refs.onDutyTeamRequest.showSearchBars()
  //   // this.state.selectedTitle == 'Team Regularization' ?
  //   // this.refs.teamOnRegRequest.showSearchBar() : this.refs.onDutyTeamRequest.showSearchBar()
  // }

  showMonthPicker() {

    this.setState({ showPicker: true })

  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    console.warn('this month--->', this.state.month);
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Nav
          rightAction={() =>
            this.state.selectedIndex == 1
              ? this.refs.myRegularizationRef.clickMenu()
              : this.state.selectedIndex == 2
                ? this.refs.teamOnRegRequest.clickMenu()
                : this.refs.onDutyTeamRequest.showSearchBars()
          }
          isRightBtn={
            this.state.navTitle == 'Team Regularization' ||
              this.state.navTitle == 'Team On Duty Requests' || this.state.selectedIndex == 1
              ? true
              : false
          }
          rightImg={this.state.selectedIndex == 1 ? require('../../images/dots.png') : this.state.selectedIndex == 2
            ? require('../../images/dots.png')
            : require('../../images/searchTab.png')}

          //***** */ DatePicker
          // showPicker={() => this.showMonthPicker()}
          // month={Utility.convertMonths(this.state.month)}
          // isMyAttenadanceRightBtn={this.state.navTitle}
          //****** */ DatePicker


          // month={moment(new Date()).format('MMM-yyyy')}
          title={this.state.navTitle}
          backHidden={false}
          backAction={() => goBack()}
          isSearchBtn={this.state.selectedIndex == 2 ? true : false}
          isSearchBtnAction={() => this.state.selectedIndex == 2 ? this.refs.teamOnRegRequest.showSearchBar() : () => { }}
        />

        {/* <View
          style={{
            shadowOffset: {width: 0, height: 2},
            shadowColor: 'rgba(224,225,227,1.0)',
            shadowOpacity: 3.0,
            elevation: 3,
            // marginTop: 8,
            height: 60,
            width: '100%',
            backgroundColor: 'rgba(239,240,241,1.0)},',
            zIndex: 1
          }}> */}

        {this.props.route.params.tabIndex != 0 ?
          <></>

          :

          <TopScrollTab
            btnAction={this.btnAction}
            itemArr={this.state.topScrollTap}></TopScrollTab>

        }
        {/* </View> */}

        <View style={{ flex: 1 }}>
          {this.state.selectedIndex == 0 ? (
            <ProMyAttendance
              navigation={this.props.navigation}
              present={this.state.daysPresent}
              absent={this.state.daysAbsent}
              leaveTaken={this.state.leaveTaken}
              weaklyOff={this.state.weaklyOff}
              holiday={this.state.holidays}
              hours={this.state.totalHours}
              arr={this.state.attendanceArr}
              updateMonth={this.updateMonth}
              afterProcessingOverViewData={this.state.afterProcessingOverViewData}
              attendanceRecordsOnDayVOList={this.state.attendanceRecordsOnDayVOList}
              setIsFromMyAttandance={this.setIsFromMyAttandance.bind(this)}
              setRegData={this.setRegData.bind(this)}
              monthYearData={{
                showMonthPicker: this.showMonthPicker.bind(this),
                monthYear: this.state.month,
                reloadApi: this.reloadApi.bind(this)
              }}
              isLoading={this.state.loading}
              setisLoading={this.setisLoading.bind(this)}

            ></ProMyAttendance>
          ) : this.state.selectedIndex == 1 ? (
            <ProMyRegularization openApplyReg={this.props.route.params.openApplyReg} goBack={goBack} ref={'myRegularizationRef'
            }
              setIsFromMyAttandanceFalse={this.setIsFromMyAttandanceFalse.bind(this)}
              isFromMyAttandance={this.state.isFromMyAttandance}
              regpickedDt={this.state.regpickedDt}
              regpickedServerDt={this.state.regpickedServerDt}
              regpickedShiftDt={this.state.regpickedShiftDt}
              fromRegToMyAttd={this.fromRegToMyAttd.bind(this)}
            ></ProMyRegularization>
          ) : this.state.selectedIndex == 2 ? (
            <ProTeamRegularization
              ref="teamOnRegRequest"
              {...this.props}></ProTeamRegularization>
          ) : this.state.selectedIndex == 3 ? (
            <ProOnDutyRequest></ProOnDutyRequest>
          ) : this.state.selectedIndex == 4 ? (
            <ProTeamOnDutyRequest
              ref="onDutyTeamRequest"
              {...this.props}></ProTeamOnDutyRequest>
          ) : (
            <></>
          )}
        </View>

        <CustomPicker
          showPicker={this.state.showPicker}
          arr={this.state.monthArrFormated}
          title="Select Month"
          handleClose={() => this.setState({ showPicker: false })}
          handleSubmit={this.handleSubmit}></CustomPicker>

        <Loader isLoader={this.state.loading}> </Loader>
      </View>
    );
  }

  //API Handler
  async fetchAttandenceMonths() {
    //const { navigate } = this.props.navigation;
    var token = this.state.token;
    var url = Constant.BASE_URL + Constant.ATTENDANCE_MONTHS_LIST;
    this.setState({ loading: true });

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: await Constant.getHeader(this.state.authDict),
      });
      this.setState({ loading: false });
      let code = await response.status;
      console.log('code', code);
      if (code == 200) {
        let responsejson = await response.json();
        console.log('fetchAttandenceMonths', responsejson);

        const splitArr = Utility.splitMonths(responsejson);
        this.setState({
          monthArrFormated: splitArr,
          monthArr: responsejson,
          month: `${moment().format('MMMM').toUpperCase()}-${moment().format(
            'YYYY',
          )}`,
        });
        this.fetchAttandenceRecord(
          moment(new Date()).format('MMMM-yyyy').toUpperCase(),
        );
        // this.fetchAttandenceRecord(responsejson[0]);
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message, 5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  //1173/SEPTEMBER-2019
  async fetchAttandenceRecord(month) {
    // const { navigate } = this.props.navigation;
    var token = this.state.token;
    var url =
      Constant.BASE_URL +
      Constant.ATTENDANCE_RECORD +
      this.state.authDict.employeeCode +
      '/' +
      month;
    console.log('fetchAttandenceRecord url', url);
    this.setState({ loading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      this.setState({ loading: false });

      let code = await response.status;

      if (code == 200) {
        let responsejson = await response.json();
        console.log('fetchAttandenceRecord_id', responsejson);
        var arr = [];


        if (
          responsejson.attendanceRecordMonthlyForAllEmployeeVOList.length != 0
        ) {
          let tempattendanceRecordsOnDayVOList = JSON.parse(JSON.stringify(responsejson.attendanceRecordMonthlyForAllEmployeeVOList[0]
            .attendanceRecordsOnDayVOList))
          arr =
            responsejson.attendanceRecordMonthlyForAllEmployeeVOList[0]
              .attendanceRecordsOnDayVOList;
          let dataArr = [];

          // console.log(arr);

          for (let i = 0; i < arr.length; i++) {
            var obj = {
              checkIn: checkNull(arr[i].inTime, '00:00:00'),
              checkOut: checkNull(arr[i].outTime, '00:00:00'),
              hours: checkNull(arr[i].duration, '0'),
              status: checkNull(arr[i].status, ''),
              shiftTiming: checkNull(arr[i].shiftTiming, '00:00 - 00:00'),
              date: Moment(
                checkNull(arr[i].attendanceRecordDayDateVO.date, '') +
                ' 00:00:00',
              ).format('DD-MM-YYYY'),
            };
            dataArr.push(obj);
          }

          let dict =
            responsejson.attendanceRecordMonthlyForAllEmployeeVOList[0];

          let present = checkNull(dict.presentCount, '0');
          let absent = checkNull(dict.absentCount, '0');
          let leave = checkNull(dict.leaveTakenCount, '0');
          let weekly = checkNull(dict.weeklyOffCount, '0');
          let totalHolidays = checkNull(dict.holidayCount, '0');
          let totalHours = checkNull(dict.totalDuration, '0');

          this.setState({
            daysPresent: present,
            daysAbsent: absent,
            leaveTaken: leave,
            weaklyOff: weekly,
            holidays: totalHolidays,
            totalHours: totalHours,
            attendanceArr: dataArr,
          });

          let { afterLeaveTakenCount,
            afterWeeklyOffCount,
            afterHolidayCount,
            afterPresentCount,
            afterAbsentCount, } = dict

          let tempafterProcessingOverViewData = {
            afterLeaveTakenCount,
            afterWeeklyOffCount,
            afterHolidayCount,
            afterPresentCount,
            afterAbsentCount
          }

          console.log('tempafterProcessingOverViewData', tempafterProcessingOverViewData);

          this.setState({ afterProcessingOverViewData: tempafterProcessingOverViewData, attendanceRecordsOnDayVOList: tempattendanceRecordsOnDayVOList })


        }
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert('', responseJson.message);
        // this.refs.toast.show(responseJson.message,5000);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        Alert.alert( 'Something went wrong!');
        Vibration.vibrate()

        // this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  reloadApi(val) {
    this.setState({ showPicker: false });
    this.fetchAttandenceRecord(val);
    console.log('reloadApi', val);
  }

  setisLoading(state) {

    this.setState({ loading: state })

  }

  //PICKER ACTION
  handleSubmit = (val, index) => {
    this.setState({ month: this.state.monthArr[index] });
    this.reloadApi(this.state.monthArr[index]);
  };
}
