import React from 'react';
// Version Checks for upload APplication
import KeyStore from '../Store/LocalKeyStore';

// export const androidVersion = '3.2.1';
// export const androidPreviousVersion = '3.1.9';

// export const iosVersion = '3.2.1';

// export const iosPreviousVersion = '3.1.9';

export const RSPLTenantID = 43

//Always change before uploading build
export const isDebug = false
export const androidVersion = '3.2.7';
export const androidPreviousVersion = '3.2.6';

export const iosVersion = '3.2.7';

export const iosPreviousVersion = '3.2.6';

export function getAppVersion(os) {
  if (os == 'ios') {
    return 'Version ' + iosVersion;
  } else {
    return 'Version ' + androidVersion;
  }
}
// h
// https://proh2r.com/api/proh2r/v1/

// export const BASE_URL = "https://proh2r.com/api/proh2r/v1/"

//https://proh2r.com/api/proh2r/v1

// https://niletechnologies.proh2r.com/api/proh2r/v1/

export const BASE_URL = 'https://proh2r.com/api/proh2r/v1/';
// export const BASE_URL = 'http://3.88.80.26:8080/api/proh2r/v1/';

// http://3.88.80.26:8085/api/proh2r/v1/organization/holiday/2022/1023

//Nile TechInnovation
// export const REALM_KEY = "NileTechInnovationsRealm"
// export const SECRET_KEY = "ff1adc34-d989-466b-94f0-e3319ff5d8ff"
// export const TANENT_ID = "2"

// //Nile Technologies
// export const REALM_KEY = "NileRealm"
// export const SECRET_KEY = ""
// export const TANENT_ID = "1"//2

export const BACKGROUNDCOLOR = 'rgba(232,244,241,1.0)';

export const FEELINGS = 'employee/capture-mood';
export const FETCH_NOTIFICATION_COUNT = 'notifications/1173/unread';
export const FETCH_PROFILE_HEADER_DATA = 'employee/profile/';
export const ATTENDANCE_RECORD = 'attendance/attendanceRecords/';
export const ATTENDANCE_SCORE = 'dashboard/attendanceScore/';
export const GET_USERS_LOCATIONS =
  'attendance/attendanceRecords/getEmployeeAllocatedLocations/';
export const LEAVE = 'dashboard/';
export const FETCH_EMPLOYEE = 'employee/user';
export const GET_REALM_INFO = 'master/realm/';
var token = '';

export const EXPENSE_RECORD = 'expense/application/';

export const ATTENDANCE_MONTHS_LIST =
  'attendance/attendanceRecords/attendanceMonthYearList';
export const LEAVE_ASSIGNMENT = 'leave/settings/leaveAssignments/';
export const LEAVE_RECORD = 'leave/leaveapplication/';
export const NOTIFICATION_LIST = 'notifications/';
export const GRANT_LEAVE = 'leave/compoffEarnings/getAllCompOffByEmpCode/';
export const REGULARIZATION_REQ = 'attendance/regularization/';
export const ON_DUTY_RECORD = 'attendance/on-duty/request/';
export const APPLY_COMPOFF = 'leave/compoffEarnings/applyCompOffByUser';
export const CANCEL_GRANT_APPLICATION =
  'leave/compoffEarnings/compOffActionByUser/';
export const GET_REASON = 'attendance/settings/regularizationReason/';
export const SUBMIT_REGULARIZATION_REQUEST = 'attendance/regularization/';
export const GET_EVENTS = 'calendar/';
export const TIMESHEET = 'timesheets/';

// Supervisors
export const TEAM_APPLICATION = 'leave/leaveapplication/supervisor/';
export const REJECT_TEAM_APPLICATION = 'leave/leaveapplication/';

export const TEAM_EXPENSE = 'expense/application/supervisor/';
export const TEAM_LEAVE_GRANT =
  'leave/compoffEarnings/getAllCompOffBySupervisor/';
export const ACTION_COMPOFF =
  'leave/compoffEarnings/compOffActionBySupervisor/';
export const UPDATE_GRANT_LEAVE =
  'leave/compoffEarnings/updateCompOffBySupervisor/';
export const TEAM_REGULARIZATION_REQ = 'attendance/regularization/supervisor/';

export const PAYSLIP_RECORD = 'payroll/payslips/getEmployeeAllPayslips/';
export const PAYSLIP_DOWNLOAD_URL =
  'payroll/payslip/viewPayslip/detailed-payslip/';
export const SEPERATION_REQUEST = 'resignation/application/';
export const SEPERATION_REVOKED_REQUEST = 'resignation/application/revoked/';
export const SEPERATION_TYPES = 'seperationTypes/';
export const RESIGNATION_REQUEST = 'resignation/application/';
export const TEAM_SEPERATION_REQUEST = 'resignation/application/supervisor/';
export const TEAM_SEPERATION_APPROVE = 'resignation/application/approval/';
export const GET_REASON_ON_DUTY = 'attendance/on-duty/reasons/by/';

export const GET_TEMPLATE_SETTINGS = 'attendance/settings/onduty-assignments/';
export const GET_SHIFT_SETTINGS = 'attendance/settings/shift/by/';
export const DELETE_ON_DUTY_REQUEST = 'attendance/on-duty/request/cancel/';

//Team On Duty Reuest
export const GET_TEAM_ON_DUTY_REQUEST =
  'attendance/on-duty/request/all/supervisor';
export const ACTION_TEAM_ON_DUTY_REQUEST = 'attendance/on-duty/request/';

//Shift
export const FETCH_SHIFT = 'attendance/settings/shift/';
export const FETCH_SELECTED_SHIFT =
  'attendance/regularization/get-shift-employee/';

///Font Utility

// export const MontserratBold = 'Montserrat-Bold';
// export const MontserratRegular = 'Montserrat-Regular';
// export const MontserratMedium = 'Montserrat-Medium';
// export const MontserratSemiBold = 'Montserrat-SemiBold';


export const MontserratBold = 'Poppins-Bold';
export const MontserratRegular = 'Poppins-Regular';
export const MontserratMedium = 'Poppins-Medium';
export const MontserratSemiBold = 'Poppins-SemiBold';


// Storage Download URL

export const storageServiceBaseUrl = 'https://s3.ap-south-1.amazonaws.com/proh2r/';

//Common Shadow Code
export const shadowView = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

//Header for Web Api
export function getHeader(authDict) {
  // return {
  //     'Authorization': 'Bearer ' + value,
  //     "realm" : 'NileTechInnovationsRealm',
  //     "x-tenant-id" : '2',
  //     "Content-type" : "application/json"
  //   }

  return {
    Authorization: 'Bearer ' + authDict.accessToken,
    realm: authDict.realmKey, // 'NileRealm',
    'x-tenant-id': authDict.tanentId,
    'Content-type': 'application/json',
  };
}

export function formDatagetHeader(authDict) {
  // return {
  //     'Authorization': 'Bearer ' + value,
  //     "realm" : 'NileTechInnovationsRealm',
  //     "x-tenant-id" : '2',
  //     "Content-type" : "application/json"
  //   }

  return {
    Authorization: 'Bearer ' + authDict.accessToken,
    realm: authDict.realmKey, // 'NileRealm',
    'x-tenant-id': authDict.tanentId,
    Accept: 'application/json',
    'Content-type': 'multipart/form-data',
  };
}


// {
//   “accessToken”: “”,
//   “tanentId”: “",
//   “realmKey”: “”,
//   “companyLogoUrl”: null,
//   “previousLogin”: “1”,
//   “employeeCode”: “”,
//   “password”: “”
// }