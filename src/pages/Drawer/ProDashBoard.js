import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import * as Constant from '../../Constant/Constants';
import DashboardHeader from '../../components/DashboardHeader';
import KeyModule from '../../components/KeyModuleComponent';
import OrganizationAnnoncement from '../../components/OrganizationAnnoncementComponent';
import EmployeeConnect from '../../components/EmployeeConnectComponent';
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from '../../Constant/Index';
import CardSlider from './CardSlider';
import EmpConnectNew from '../../components/EmpConnectNew';
import QuickAccessView from '../../components/QuickAccessView';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const actions = [
  {
    text: 'Accessibility',
    icon: require('../../images/expenses.png'),
    name: 'bt_accessibility',
    position: 2,
  },
  {
    text: 'Language',
    icon: require('../../images/expenses.png'),
    name: 'bt_language',
    position: 1,
  },
  {
    text: 'Location',
    icon: require('../../images/expenses.png'),
    name: 'bt_room',
    position: 3,
  },
  {
    text: 'Video',
    icon: require('../../images/expenses.png'),
    name: 'bt_videocam',
    position: 4,
  },
];

const styles = StyleSheet.create({
  cardView: {
    height: 175,
    width: 295,
    backgroundColor: 'white',
    marginLeft: 8,

    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    margin: 8,
    borderRadius: 12,
    marginLeft: 16,
    paddingTop: 5,
    paddingBottom: 5,
    // borderWidth: 0.2,
    // borderColor: '#3C71D3'
  },
  cardViewAttendance: {
    height: 170,
    width: 290,
    backgroundColor: 'white',
    marginLeft: 8,

    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    margin: 8,
    borderRadius: 12,
    marginLeft: 16,
  },

  scrollViewCard: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: 'gray',
    shadowOpacity: 3.0,
    backgroundColor: 'rgba(240,240,240,1.0)',
    height: 100,
  },

  arrowBtnShadow: {
    marginRight: 10,
    marginBottom: 5
  },

  arrowBtn: { borderRadius: 5, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: '#3C71D3' },

  arrowBtnImg: {
    height: 15, width: 15, resizeMode: 'contain', transform: [{ rotate: '270deg' }], tintColor: '#808080'
  }

});

export default class ProDashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseArr: [
        {
          amount: '1000',
          status: '0',
          title: 'Swiggy',
          imgNme: require('../../images/verified.png'),
        },
        {
          amount: '2000',
          status: '1',
          title: 'Zomato',
          imgNme: require('../../images/remove.png'),
        },
        {
          amount: '3000',
          status: '2',
          title: 'Paytm',
          imgNme: require('../../images/verified.png'),
        },
      ],

      keyModuleArr: [
        {
          name: 'Organization',
          img: require('../../images/organization.png'),
          action: '',
        },
        {
          name: 'Calendar',
          img: require('../../images/calender.png'),
          action: '',
        },
        { name: 'Leaves', img: require('../../images/leave.png'), action: '' },
        {
          name: 'Attendance',
          img: require('../../images/attendance.png'),
          action: '',
        },
        {
          name: 'Expense',
          img: require('../../images/expenses.png'),
          action: '',
        },
        {
          name: 'Pay Slips',
          img: require('../../images/paybills.png'),
          action: '',
        },
        {
          name: 'Time Sheet',
          img: require('../../images/timesheet.png'),
          action: '',
        },
        {
          name: 'Separation',
          img: require('../../images/seperation.png'),
          action: '',
        },
        // {
        //   name: 'Reports',
        //   img: require('../../images/reports.png'),
        //   action: '',
        // },
      ],

      // keyModuleArr:[{name:'Organization',img:require('../../images/organization.png'),action:''},{name:'Leaves',img:require('../../images/leave.png'),action:''},
      // {name:'Attendance',img:require('../../images/attendance.png'),action:''},{name:'Expense',
      // img:require('../../images/expenses.png'),action:''},{name:'Pay Slips',img:require('../../images/paybills.png'),action:''},{name:'Seperation',img:require('../../images/seperation.png'),action:''}],

      organizationAnnoncement: [
        { img: require('../../images/announcementBanner1.png') },
        { img: require('../../images/announcementBanner2.png') },
      ],

      employeeConnectArr: [
        {
          name: 'Birthday',
          img: require('../../images/birthday.png'),
          arr: [
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcddfsdfsfdsfdsfsfsfsfafsfsfsdfsdf',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
          ],
        },
        {
          name: 'Anniversary',
          img: require('../../images/anniversary.png'),
          arr: [
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
          ],
        },
        {
          name: 'New Joinee',
          img: require('../../images/newJoinee.png'),
          arr: [
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
            {
              empImg: require('../../images/user.jpeg'),
              empName: 'Abcd',
              empDueDate: '2 days ago',
            },
          ],
        },
      ],

      showQuickLink: false,
    };
  }

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    disableGestures: true,
  };

  // Key Module Action
  keyModuleActions = value => {
    if (value == 0) {
    }

    // this.props.keyModuleActions(value)
  };

  showQuickLink() {
    this.setState({ showQuickLink: true });
  }

  render() {
    const {
      empName,
      profilePic,
      designation,
      leaveArr,
      expenseArr,
      attendanceArr,
      eventRecord,
      notification,
      navigation,
      keyModuleActions,
    } = this.props;

    const arrowShadowColor = '#cccccc';

    console.log('LeaveArr', leaveArr);
    return (
      <View style={{
        flex: 1, backgroundColor: COLORS.FormBGColor,
      }}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <DashboardHeader
            btnActions={this.props.btnActions}
            logout={this.props.logout.bind(this)}
            // logOutFromAnywhere={this.logOutFromAnywhere.bind(this)}
            showQuickLink={() => this.showQuickLink()}
            navigation={navigation}
            notification={notification}
            empName={empName}
            designation={designation}
            imgUrl={profilePic}></DashboardHeader>





          <CardSlider reloadLeaveSummary={this.props.reloadLeaveSummary.bind(this)} leaveArr={leaveArr} expenseArr={expenseArr} attendanceArr={attendanceArr} WINDOW_WIDTH={WINDOW_WIDTH} navigation={this.props.navigation} />



          {/* KEY MODULES */}

          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratSemiBold,
                fontSize: 15,
                color: 'black',
                // paddingTop: 10,
                paddingLeft: 16,
                paddingBottom: 10,
                backgroundColor: COLORS.FormBGColor,
              }}>Quick Access</Text>

            <TouchableOpacity onPress={() => {
              console.log('Yo');
            }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 12,
                  color: '#445FB6',
                  // paddingTop: 10,
                  paddingLeft: 16,
                  paddingBottom: 10,
                  backgroundColor: COLORS.FormBGColor,
                  paddingRight: 16,
                  textDecorationLine: 'underline'
                }}>Add</Text>
            </TouchableOpacity>
          </View> */}



          <QuickAccessView
            navigation={navigation}
            logOutFromAnywhere={this.props.logOutFromAnywhere.bind(this)}
            />

          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              // paddingTop: 10,
              paddingLeft: 16,
              paddingBottom: 10,
              backgroundColor: COLORS.FormBGColor,
            }}>Key Modules</Text>

          <KeyModule
            keyModuleAction={keyModuleActions}
            navigation={navigation}
            arr={this.state.keyModuleArr}></KeyModule>

          {/* <OrganizationAnnoncement
            arr={this.state.organizationAnnoncement} WINDOW_WIDTH={WINDOW_WIDTH}></OrganizationAnnoncement> */}

          {/* Organization Announcement */}

          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              // paddingTop: 10,
              paddingLeft: 16,
              paddingBottom: 10,
              backgroundColor: COLORS.FormBGColor,
            }}>Announcements</Text>

          <OrganizationAnnoncement
            arr={this.state.organizationAnnoncement} WINDOW_WIDTH={WINDOW_WIDTH}></OrganizationAnnoncement>

          {/* Employee Contact  */}

          {/* <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              paddingLeft: 16,
              paddingBottom: 5,
              backgroundColor: COLORS.FormBGColor,
            }}>
            Employee Connect
          </Text> */}

          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              // paddingTop: 10,
              paddingLeft: 16,
              // paddingBottom: 5,
              backgroundColor: COLORS.FormBGColor,
            }}>Employee Connect</Text>



          <EmpConnectNew arr={eventRecord} WINDOW_WIDTH={WINDOW_WIDTH}></EmpConnectNew>

          {/* <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              // paddingTop: 10,
              paddingLeft: 16,
              // paddingBottom: 5,
              backgroundColor: COLORS.FormBGColor,
            }}>Employee Connect</Text> */}

          {/* <EmployeeConnect arr={eventRecord} WINDOW_WIDTH={WINDOW_WIDTH}></EmployeeConnect> */}

          {/* <FloatingAction
                  actions={actions}
                  position={"top"}
                  onPressItem={name => {
                    console.log(`selected button: ${name}`);
                  }}
                /> */}
        </ScrollView>

        <Modal
          visible={this.state.showQuickLink}
          transparent={true}
          onRequestClose={() => { }}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}
            onPress={() => this.setState({ showQuickLink: false })}>
            <TouchableOpacity
              style={{ position: 'absolute', left: WINDOW_WIDTH - 250, top: 50 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: 'rgba(94,184,45,1.0)',
                    marginRight: 30,
                  }}></Image>

                <Text
                  allowFontScaling={false}
                  style={{
                    height: 30,
                    fontSize: 15,
                    paddingRight: 25,
                    paddingLeft: 25,
                    paddingTop: 4,
                    paddingBottom: 4,
                    color: 'black',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    textAlign: 'center',
                  }}>
                  Apply Leave
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                left: WINDOW_WIDTH - 280,
                top: 110,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: 'rgba(240,193,45,1.0)',
                    marginRight: 30,
                  }}></Image>

                <Text
                  allowFontScaling={false}
                  style={{
                    height: 30,
                    fontSize: 15,
                    paddingRight: 25,
                    paddingLeft: 25,
                    paddingTop: 4,
                    paddingBottom: 4,
                    color: 'black',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    textAlign: 'center',
                  }}>
                  Check In/Out
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                left: WINDOW_WIDTH - 250,
                top: 170,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: 'rgba(250,52,53,1.0)',
                    marginRight: 30,
                  }}></Image>

                <Text
                  allowFontScaling={false}
                  style={{
                    height: 30,
                    fontSize: 15,
                    paddingRight: 25,
                    paddingLeft: 25,
                    paddingTop: 4,
                    paddingBottom: 4,
                    color: 'black',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    textAlign: 'center',
                  }}>
                  Expenses
                </Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
