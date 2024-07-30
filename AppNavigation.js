/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  YellowBox,
  Alert,
  AppState,
  Text,
  LogBox,
  Platform,
} from 'react-native';
import Login from './src/pages/Authentication/Login';
import RealmAuth from './src/pages/Authentication/RealmAuth';
import ForgotPassword from './src/pages/Authentication/ForgotPassword';
import ApplyLeave from './src/pages/Leave/ApplyLeave';
import EmployeeDirectory from './src/pages/Organization/EmployeeDirectly';
import PaySlipsScreen from './src/pages/PaySlips/Payslip';
import Calander from './src/pages/Calander/Calander';
import AddExpense from './src/pages/Expense/AddExpense';
import ProfileScreen from './src/pages/Profile/profile';
import RNLocation from 'react-native-location';
import NotificationScreen from './src/pages/Notification/Notification';
import InitialScreen from './src/pages/Authentication/InitialScreen';
import LeaveTab from './src/pages/ProLeaves/ProLeaveTab';
import AttendanceTab from './src/pages/ProAttendance/ProAttendanceTab';
import ProExpenseTab from './src/pages/ProExpense/ProExpenseTab';
import ProSeperationTab from './src/pages/ProSeperation/ProSeperationTab';
import ProfileDetail from './src/pages/Profile/ProfileDetail';
//  import {createStackNavigator, createAppContainer} from 'react-navigation';

import TabBar from './src/pages/Drawer/TabBar';
import KeyStore from './src/Store/LocalKeyStore';
import EventBus from 'react-native-event-bus';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProAddExpense from './src/pages/ProExpense/ProAddExpense';
import ProAddExpenseClass from './src/pages/ProExpense/ProAddExpenseClass';
import ProViewTeamExpenseRecord from './src/pages/ProExpense/ProViewTeamExpenseRecord';
import ProViewExpenseRecord from './src/pages/ProExpense/ProViewExpenseRecord';
import TimeSheetsMainCalenderView from './src/pages/TimeSheets/TimeSheetsMainCalenderView';
import TimeSheetsWeekView from './src/pages/TimeSheets/TimeSheetsWeekView';
import TimeSheetsAddTask from './src/pages/TimeSheets/TimeSheetsAddTask';
import TimeSheetEditTask from './src/pages/TimeSheets/TimeSheetEditTask';
import TimeSheetTab from './src/pages/TimeSheets/TimeSheetsTab';
import TimeApprovalsMainCalendarView from './src/pages/TimeSheets/TimeApprovalsMainCalendarView';
import TimeApprovalsMain from './src/pages/TimeSheets/TimeApprovalsMain';
import TimeApprovalWeekView from './src/pages/TimeSheets/TimeApprovalWeekView';
import TimeApprovalView from './src/pages/TimeSheets/TimeApprovalView';
import ProEditExpense from './src/pages/ProExpense/ProEditExpense';
import TestPages from './src/pages/Learning/TestPages';
import PaySlipView from './src/pages/PaySlips/PaySlipView';
import PaySlipViewPDF from './src/pages/PaySlips/PaySlipViewPDF';
import PaySlipViewTesting from './src/pages/PaySlips/PaySlipViewTesting';
import ViewSeperationRequest from './src/pages/ProSeperation/ViewSeperationRequest';
import ChartTesting from './src/pages/ProLeaves/ChartTesting';
import EmpAttandanceScreen from './src/pages/ProAttendance/EmpAttandanceScreen';
import EmpLocation from './src/pages/ProAttendance/EmpLocation';
import PunchTimeline from './src/pages/ProAttendance/PunchTimeline';
import MyReports from './src/pages/Reports/MyReports';
import EmpMasterReport from './src/pages/Reports/ReportScreens/EmpMasterReport';
import SeperationReport from './src/pages/Reports/ReportScreens/SeperationReport';
import HappinessReport from './src/pages/Reports/ReportScreens/HappinessReport';
import DepartmentReport from './src/pages/Reports/ReportScreens/DepartmentReport';
import EmpBandReport from './src/pages/Reports/ReportScreens/EmpBandReport';
import MobileCharts from './src/pages/Reports/MobileCharts';
import ApplyShortLeave from './src/pages/ProLeaves/ApplyShortLeave';
import { Easing } from 'react-native-reanimated';



const AppNavigation = () => {
  LogBox.ignoreAllLogs();
  const MainNavigator = createStackNavigator();

  const config = {
    animation: 'bounce',
    config: {
      stiffness: 200,
      damping: 20,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.linear,
      direction: 'vertical',
    },
  };

  return (
    <NavigationContainer>
      <MainNavigator.Navigator>
        <MainNavigator.Screen
          component={InitialScreen}
          name="InitialScreen"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={Login}
          name="Login"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={RealmAuth}
          name="RealmAuth"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={ForgotPassword}
          name="ForgotPassword"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={TabBar}
          name="TabBar"
          options={{
            headerShown: false,
            gestureEnabled: false,

          }}
        />



        <MainNavigator.Screen
          component={PaySlipViewPDF}
          name="PaySlipViewPDF"
          options={{
            headerShown: false,
            gestureEnabled: false,

          }}
        />
        <MainNavigator.Screen
          component={PaySlipViewTesting}
          name="PaySlipViewTesting"
          options={{
            headerShown: false,
            gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={ChartTesting}
          name="ChartTesting"
          options={{
            headerShown: false,
            gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={MyReports}
          name="MyReports"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={EmpMasterReport}
          name="EmpMasterReport"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={HappinessReport}
          name="HappinessReport"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />
        <MainNavigator.Screen
          component={DepartmentReport}
          name="DepartmentReport"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={SeperationReport}
          name="SeperationReport"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={EmpBandReport}
          name="EmpBandReport"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={MobileCharts}
          name="MobileCharts"
          options={{
            headerShown: false,
            // gestureEnabled: false,

          }}
        />

        <MainNavigator.Screen
          component={ApplyLeave}
          name="ApplyLeave"
          options={{
            headerShown: false,
            // transitionSpec: {
            //   open: config,
            //   close: closeConfig
            // },
            gestureEnabled: true,
            gestureDirection: 'vertical',
            // cardStyleInterpolator: ({ current, layouts }) => {
            //   return {
            //     cardStyle: {
            //       transform: [
            //         {
            //           translateY: current.progress.interpolate({
            //             inputRange: [0, 1],
            //             outputRange: [layouts.screen.height, 0],
            //           }),
            //         },
            //       ],
            //     },
            //   }
            // }
          }}

        />

        <MainNavigator.Screen
          component={ApplyShortLeave}
          name="ApplyShortLeave"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={EmployeeDirectory}
          name="EmployeeDirectory"
          options={{
            headerShown: false,
            // transitionSpec: {
            //   open: config,
            //   close: closeConfig
            // },
            // gestureEnabled: true,
            // gestureDirection: 'vertical',
            // cardStyleInterpolator: ({ current, layouts }) => {
            //   return {
            //     cardStyle: {
            //       transform: [
            //         {
            //           translateY: current.progress.interpolate({
            //             inputRange: [0, 1],
            //             outputRange: [layouts.screen.height, 0],
            //           }),
            //         },
            //       ],
            //     },
            //   }
            // }
          }}

          
          
        />
        <MainNavigator.Screen
          component={PaySlipsScreen}
          name="PaySlipsScreen"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={PaySlipView}
          name="PaySlipView"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={Calander}
          name="Calander"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={AddExpense}
          name="AddExpense"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProEditExpense}
          name="ProEditExpense"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProfileScreen}
          name="ProfileScreen"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={NotificationScreen}
          name="NotificationScreen"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={LeaveTab}
          name="LeaveTab"
          options={{
            headerShown: false,
            // safeAreaInsets: {top: 0}
          }}
        />
        <MainNavigator.Screen
          component={AttendanceTab}
          name="AttendanceTab"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={EmpAttandanceScreen}
          name="EmpAttandanceScreen"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={EmpLocation}
          name="EmpLocation"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={PunchTimeline}
          name="PunchTimeline"
          options={{
            headerShown: false,
          }}
        />
        <MainNavigator.Screen
          component={ProExpenseTab}
          name="ProExpenseTab"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeSheetTab}
          name="TimeSheetTab"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeSheetsMainCalenderView}
          name="TimeSheetsMainCalenderView"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeApprovalsMainCalendarView}
          name="TimeApprovalsMainCalendarView"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeApprovalsMain}
          name="TimeApprovalsMain"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeApprovalWeekView}
          name="TimeApprovalWeekView"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeApprovalView}
          name="TimeApprovalView"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeSheetsWeekView}
          name="TimeSheetsWeekView"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeSheetsAddTask}
          name="TimeSheetsAddTask"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TimeSheetEditTask}
          name="TimeSheetEditTask"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProAddExpense}
          name="ProAddExpense"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProViewTeamExpenseRecord}
          name="ProViewTeamExpenseRecord"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProViewExpenseRecord}
          name="ProViewExpenseRecord"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProAddExpenseClass}
          name="ProAddExpenseClass"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProSeperationTab}
          name="ProSeperationTab"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ViewSeperationRequest}
          name="ViewSeperationRequest"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={ProfileDetail}
          name="ProfileDetail"
          options={{
            headerShown: false,
          }}
        />

        <MainNavigator.Screen
          component={TestPages}
          name="TestPages"
          options={{
            headerShown: false,
          }}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

//  export default class App extends React.Component {

//    render() {
//     return <AppContainer />;
//    }

//  }
//  const MainNavigator = createStackNavigator({
//    InitialScreen:{screen:InitialScreen},
//    Login:{screen:Login},
//    RealmAuth:{screen:RealmAuth},
//    ForgotPassword:{screen:ForgotPassword},
//    TabBar:{screen:TabBar},
//    ApplyLeave:{screen:ApplyLeave},
//    EmployeeDirectory:{screen:EmployeeDirectory},
//    PaySlipsScreen:{screen:PaySlipsScreen},
//    Calander:{screen:Calander},
//    AddExpense:{screen:AddExpense},
//    ProfileScreen:{screen:ProfileScreen},
//    NotificationScreen:{screen:NotificationScreen},
//    LeaveTab:{screen:LeaveTab},
//    AttendanceTab:{screen:AttendanceTab},
//    ProExpenseTab:{screen:ProExpenseTab},
//    ProSeperationTab:{screen:ProSeperationTab},
//    ProfileDetail:{screen:ProfileDetail}
//  },
//  {
//    headerMode: 'none',
//     initialRouteName:  'InitialScreen',
//     navigationOptions: {
//      headerVisible: false,
//      gesturesEnabled:false
//    }
//   },
//  );
//  const AppContainer = createAppContainer(MainNavigator);

//  YellowBox.ignoreWarnings([
//      'Warning: componentWillMount is deprecated',
//      'Warning: componentWillUpdate is deprecated',
//      'Warning: componentWillReceiveProps is deprecated',
//  ]);

RNLocation.configure({
  distanceFilter: 2.0,
});

RNLocation.requestPermission({
  ios: 'whenInUse',
  android: {
    detail: 'fine',
  },
}).then(granted => {
  if (granted) {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        EventBus.getInstance().fireEvent('updateMap', {});
      },
    );
  }
});
