import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View, Alert, ScrollView, Linking, processColor, Button
} from 'react-native';
import * as Constant from '../../Constant/Constants';
import { Shadow } from 'react-native-shadow-2';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { COLORS } from '../../Constant/Index';
import Moment from 'moment';
import Nav from '../../components/NavBar';
import KeyStore from '../../Store/LocalKeyStore';
import Loader from '../../components/Loader';
import PillsDropDown from '../../components/PillsDropDown';
import CustomDateDesign from '../../components/CustomDateDesign';
import PillsDropDownStateFull from '../../components/PillsDropDownStateFull';
import PillsDropDownObject from '../../components/PillsDropDownObject';
import { FormBGColor } from '../../Constant/Colors';
import { getCheckedData, PillsCheckBoxObj } from '../../components/PillsCheckBoxObj';
import * as Utility from '../../Externel Constant/Utility';




export default function MyReports(props) {

  const { goBack } = props.navigation;

  const [authDict, setauthDict] = useState({})

  const [isLoading, setisLoading] = useState(false)

  const [departmentList, setdepartmentList] = useState([])

  const [bandList, setbandList] = useState([])

  const [reportCategories, setreportCategories] = useState([])

  const [reports, setreports] = useState([])

  const [filteredReports, setfilteredReports] = useState([])

  const [employeeList, setemployeeList] = useState([])

  const [hideFilters, sethideFilters] = useState(false)

  const [showDateFilters, setshowDateFilters] = useState(false)

  const [showPayrollFilters, setshowPayrollFilters] = useState(false)

  const [showEmpListFilter, setshowEmpListFilter] = useState(false)

  const [showExpenseFilter, setshowExpenseFilter] = useState(false)

  const [showYearFilter, setshowYearFilter] = useState(false)

  const [onFromDate, setonFromDate] = useState(false)

  const [fromDate, setfromDate] = useState('From Date')

  const [onToDate, setonToDate] = useState(false)

  const [toDate, settoDate] = useState('To Date')

  const [yearList, setyearList] = useState([])

  const [selectedReportCat, setselectedReportCat] = useState({})

  const [selectedReport, setselectedReport] = useState({})

  const [selectedDept, setselectedDept] = useState({})

  const [selectedBand, setselectedBand] = useState({})

  const [selectedEmp, setselectedEmp] = useState({})

  const [selectedYear, setselectedYear] = useState('')

  const [selectedMonth, setselectedMonth] = useState({})

  const selectedEmpList = useRef({})


  const monthList =
    [
      { value: '1', viewValue: 'January' },
      { value: '2', viewValue: 'February' },
      { value: '3', viewValue: 'March' },
      { value: '4', viewValue: 'April' },
      { value: '5', viewValue: 'May' },
      { value: '6', viewValue: 'June' },
      { value: '7', viewValue: 'July' },
      { value: '8', viewValue: 'August' },
      { value: '9', viewValue: 'September' },
      { value: '10', viewValue: 'October' },
      { value: '11', viewValue: 'November' },
      { value: '12', viewValue: 'December' },
    ];


  useEffect(() => {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        setauthDict(value)

        getAllDepartments(value)
        getAllBands(value)
        getAllReports(value)
        getAllEmployees(value)
      }
    });

    populateYearList()


  }, []);


  function openFileLink(url) {
    Linking.openURL(Constant.storageServiceBaseUrl + url).catch(err => console.error("Couldn't load page", err));
    console.log(url);
  };

  async function getAPI(URL, initialAuthDict, callback) {

    const url = Constant.BASE_URL + URL



    console.log('getAPI URl', url)

    console.log("initialAuthDict", initialAuthDict);



    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(initialAuthDict)
      }
      )

      let code = await response.status

      if (code >= 200 && code <= 226) {

        let responseJson = await response.json();

        callback(responseJson, null)

      } else {

        // let msg = await response.statusText

        let responseJson = await response.json();

        callback(null, { code: code, res: responseJson })

        // Alert.alert('Something went wrong! ' + code)

      }
    } catch (error) {
      callback(null, error)

      console.error(error);
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
    }

  }

  async function postAPI(URL, body, initialAuthDict, callback) {

    const url = Constant.BASE_URL + URL


    console.log('postAPI URl', url)

    console.log('postAPI body', body);

    console.log("initialAuthDict", initialAuthDict);



    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(initialAuthDict),
        body: JSON.stringify(body)
      }
      )

      let code = await response.status

      if (code >= 200 && code <= 226) {

        let responseJson = await response.json();

        callback(responseJson, null)

      } else {

        let msg = await response.statusText

        callback(null, { code: code, msg: msg })

        Alert.alert('Something went wrong! ' + code)

      }
    } catch (error) {
      callback(null, error)

      console.error(error);
      Alert.alert(
        '',
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
    }

  }



  function viewReport(value) {

    // if (value != 'Attendance Register') {
    //   return
    // }

    let data = {
      "bandId": Utility.checkUndefined(selectedBand.bandId),
      "deptId": Utility.checkUndefined(selectedDept.deptId),
      "fromDate": Utility.convertToPayloadDate(fromDate),
      "toDate": Utility.convertToPayloadDate(toDate),
      "year": selectedYear,
      "month": Utility.checkUndefined(selectedMonth.viewValue),
      "empCode": Utility.checkUndefined(selectedEmp.empCode)
    }
    // this.filterDataService.clearData();
    // this.filterDataService.sendFilterData(this.data);
    switch (value) {
      case "Employee Master Report":

        delete data.empCode

        setisLoading(true)

        postAPI('reports/generate/report/1', data, authDict, (res, err) => {
          if (res) {
            console.log('postAPI', res)


            // openFileLink(res.url)

            setisLoading(false)
            props.navigation.navigate('EmpMasterReport', { "MAINDATA": res, "pieTitle": 'Total Departments', "barTitle": 'Total Bands', "title": "Employee Master Report" })
          }
          else {
            console.log('postAPI', err);
            setisLoading(false)
          }
        })
        // this.router.navigate(['reports/my-reports/employee-master-report']);
        break;
      case "New Joinee Report":
        setisLoading(true)
        delete data.empCode

        postAPI('reports/generate/report/2', data, authDict, (res, err) => {
          if (res) {
            console.log('New Joinee Report', res)


            // openFileLink(res.url)

            setisLoading(false)
            props.navigation.navigate('EmpMasterReport', { "MAINDATA": res, "pieTitle": 'Total New Joinee', "barTitle": 'Total New Joinee', "title": "Employee Master Report" })
          }
          else {
            console.log('New Joinee Report', err);
            setisLoading(false)
          }
        })

        break;
      case "Separation Report":

        delete data.empCode

        setisLoading(true)

        postAPI('reports/generate/report/3', data, authDict, (res, err) => {
          if (res) {
            console.log('postAPI', res)


            // openFileLink(res.url)

            setisLoading(false)
            props.navigation.navigate('SeperationReport', { "MAINDATA": res })
          }
          else {
            console.log('postAPI', err);
            setisLoading(false)
          }
        })
        // this.router.navigate(['reports/my-reports/separation-report']);
        break;
      case "Happiness Report":
        delete data.empCode

        setisLoading(true)

        postAPI('reports/generate/report/4', data, authDict, (res, err) => {
          if (res) {
            console.log('Happiness Report', res)


            setisLoading(false)
            props.navigation.navigate('HappinessReport', { "MAINDATA": res })
          }
          else {
            console.log('Happiness Report', err);
            setisLoading(false)
          }
        })
        // this.router.navigate(['reports/my-reports/separation-report']);
        break;

      case "Department Report":

        delete data.empCode

        setisLoading(true)

        postAPI('reports/generate/report/5', data, authDict, (res, err) => {
          if (res) {
            console.log('Department Report', res)


            // openFileLink(res.url)

            setisLoading(false)
            props.navigation.navigate('DepartmentReport', { "MAINDATA": res })
          }
          else {
            console.log('postAPI', err);
            setisLoading(false)
          }
        })

        // this.router.navigate(['reports/my-reports/department-report']);
        break;
      case "Employee Band Report":

        delete data.empCode

        setisLoading(true)

        postAPI('reports/generate/report/6', data, authDict, (res, err) => {
          if (res) {
            console.log('Employee Band Report', res)


            // openFileLink(res.url)

            setisLoading(false)
            props.navigation.navigate('EmpBandReport', { 'MAINDATA': res })
          }
          else {
            console.log('postAPI', err);
            setisLoading(false)
          }
        })
        // this.router.navigate(['reports/my-reports/employee-band-report']);
        break;
      case "Expense Report":

        Alert.alert('Contact Developer !')
        // this.router.navigate(['reports/my-reports/expense-report']);
        break;
      case "Payroll Report":
        Alert.alert('Contact Developer !')
        // this.router.navigate(['reports/my-reports/payroll-report']);
        break;
      case "Loans & Advances Report":
        Alert.alert('Contact Developer !')
        // this.router.navigate(['reports/my-reports/loans-advances-report']);
        break;
      case "Attendance Register":
        // this.getAttendanceRegister(this.getMonth() + '-' + this.selectedYear);

        if (Object.keys(selectedMonth).length == 0) {
          Alert.alert('Select Month !')
          return

        }

        if (selectedYear == '') {
          Alert.alert('Select Year !')
          return
        }

        console.log(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        getAttendanceRegister(selectedMonth.viewValue.toUpperCase() + '-' + selectedYear)
        break;

      case "Attendance Report":

        if (fromDate == 'From Date' || toDate == 'To Date') {

          Alert.alert('', 'Select Dates !')
          return
        }
        getAttendanceReport(Utility.convertToPayloadDate(fromDate), Utility.convertToPayloadDate(toDate));
        break;

      case "Muster Roll":
        if (Object.keys(selectedMonth).length == 0) {

          Alert.alert('Select Month !')

          return

        }

        if (selectedYear == '') {
          Alert.alert('Select Year !')
          return
        }
        getMusterRoll(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        break;
      case "Late Coming Register":
        getLateComingRegister(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        break;
      case "Early Out Register":
        getEarlyOutRegister(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        break;
      case "PF Report":
        getPF(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        break;
      case "ESIC Report":
        getESIC(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        break;
      case "Salary sheet":
        getSalarySheet(selectedMonth?.viewValue?.toUpperCase() + '-' + selectedYear);
        break;
      case "Expense Report-A":
        getExpenseReportTypeA();
        break;
      case "Expense Report-B":
        this.getExpenseReportTypeB();
        break;
      case "Expense Report-C":
        this.getExpenseReportTypeC();
        break;
      case "Individual Timesheet Report":
        this.getIndividualTimesheetReport();
        break;
      case "Consolidated Timesheet Report":
        this.getConsolidatedTimesheetReport();
        break;
      case "Utilized Leave Report": // utilized leave
        this.generateUtilizedLeaveDetailsReport();
        break;
      case "Consolidated Leave Balance Report": // consolidated leave 
        this.generateConsolidatedLeaveBalanceReport();
        break;
      case "CompOff Monthly Balance Report":
        this.generateCompOffMonthlyBalanceReport();
        break;
      default:
        // this.router.navigate(['reports/my-reports'])
        break;
    }
  }

  function populateYearList() {
    let yearListTemp = []

    let date = new Date,
      year = date.getFullYear();
    yearListTemp.push((year - 5).toString());
    yearListTemp.push((year - 4).toString());
    yearListTemp.push((year - 3).toString());
    yearListTemp.push((year - 2).toString());
    yearListTemp.push((year - 1).toString());
    for (let i = year; i < year + 5; i++) {
      yearListTemp.push(i.toString());
    }

    setyearList(yearListTemp)

    console.log('populateYearList', yearListTemp);
  }

  function getAllDepartments(initialAuthDict) {

    setisLoading(true)

    getAPI("organization/departments/getAll", initialAuthDict, (res, err) => {

      if (res) {

        console.log('getAPIRes', res)
        setdepartmentList(res)
        setisLoading(false)
      }

      else {

        console.log('getAPIerr', err);

        setisLoading(false)
      }

    })

  }



  async function getAllBands(initialAuthDict) {


    setisLoading(true)

    getAPI("organization/getAll/bands", initialAuthDict, (res, err) => {

      if (res) {

        console.log('getAPIRes', res)
        setbandList(res)
        setisLoading(false)
      }

      else {

        console.log('getAPIerr', err);

        setisLoading(false)
      }

    })





  }

  async function getAllReports(initialAuthDict) {


    setisLoading(true)

    getAPI("employee/reports", initialAuthDict, (res, err) => {

      if (res) {

        console.log('getAPIRes', res)
        setreportCategories(res.categories)

        setreports(res.reports)
        setisLoading(false)
      }

      else {

        console.log('getAPIerr', err);

        setisLoading(false)
      }

    })



  }

  async function getAllEmployees(initialAuthDict) {


    setisLoading(true)

    getAPI("employee/user", initialAuthDict, (res, err) => {

      if (res) {

        console.log('getAPIRes', res)

        setemployeeList(res)

        setisLoading(false)
      }

      else {

        console.log('getAPIerr', err);

        setisLoading(false)
      }

    })

  }

  // Report Download Functions End -------------------

  function getAttendanceRegister(monthYear) {
    // this.serviceApi.get('/v1/payroll-reports/attendance-register/' + monthYear).subscribe(res => {
    //   window.open(Constant.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/attendance-register/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('getAPIRes', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.log('getAPIerr', err);
        setisLoading(false)
      }
    })

  }

  function getAttendanceReport(from, to) {
    setisLoading(true)
    const body = {
      "fromDate": from,
      "toDate": to
    }
    // this.serviceApi.post('/v1/payroll-reports/attendance-report', body).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    postAPI('payroll-reports/attendance-report', body, authDict, (res, err) => {
      if (res) {
        console.log('getAPIRes', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.log('getAPIerr', err);
        setisLoading(false)
      }
    })
  }

  function getMusterRoll(monthYear) {
    // this.serviceApi.get('/v1/payroll-reports/muster-roll/' + monthYear).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/muster-roll/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('getMusterRoll', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.log('getAPIerr', err);
        setisLoading(false)
      }
    })

  }

  function getLateComingRegister(monthYear) {

    // this.serviceApi.get('/v1/payroll-reports/late-in-register/' + monthYear).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/late-in-register/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('late-in-register', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.log('getAPIerr', err);
        setisLoading(false)
      }
    })

  }

  function getEarlyOutRegister(monthYear) {
    // this.serviceApi.get('/v1/payroll-reports/early-out-register/' + monthYear).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/early-out-register/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('getMusterRoll', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.log('getAPIerr', err);
        setisLoading(false)
      }
    })

  }

  function getPF(monthYear) {
    // this.serviceApi.get('/v1/payroll-reports/pf-report/' + monthYear).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/pf-report/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('getMusterRoll', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.error('getAPIerr', err.res);

        Alert.alert(err.res.message)



        setisLoading(false)
      }
    })

  }

  function getESIC(monthYear) {
    // this.serviceApi.get('/v1/payroll-reports/esic-report/' + monthYear).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/esic-report/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('esic-report', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.error('getAPIerr', err.res);

        Alert.alert(err.res.message)



        setisLoading(false)
      }
    })

  }

  function getSalarySheet(monthYear) {
    // this.serviceApi.get('/v1/payroll-reports/salary-sheet/' + monthYear).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })

    setisLoading(true)
    getAPI('payroll-reports/salary-sheet/' + monthYear, authDict, (res, err) => {
      if (res) {
        console.log('salary-sheet', res)

        openFileLink(res.url)

        setisLoading(false)
      }
      else {
        console.error('getAPIerr', err.res);

        Alert.alert(err.res.message)



        setisLoading(false)
      }
    })

  }

  function getExpenseReportTypeA() {


    let CheckedData = getCheckedData(selectedEmpList.current)
    if (CheckedData.length == 0) {

      Alert.alert('Check at least one Employee !')
      return

    }

    let EmpCodeArray = []
    let body = {}

    if (CheckedData[0] == 'Select All') {
      employeeList.forEach((item) => {

        EmpCodeArray.push(item.empCode)

      })

      console.log(EmpCodeArray)

      body = {
        "empCodes": EmpCodeArray,
        "from": Utility.convertToPayloadDate(fromDate),
        "generateForAllEmployees": true,
        "to": Utility.convertToPayloadDate(toDate)
      }
    }

    else {

      body = {
        "empCodes": CheckedData,
        "from": Utility.convertToPayloadDate(fromDate),
        "generateForAllEmployees": false,
        "to": Utility.convertToPayloadDate(toDate)
      }


    }

    console.log(body);


    // this.serviceApi.post('/v1/payroll-reports/generate/expense/report/typeA', body).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })
  }

  function getIndividualTimesheetReport() {
    const body = {
      "empCode": this.selectedEmployee,
      "endDate": this.toDate,
      "startDate": this.fromDate
    }
    this.serviceApi.post('/v1/reports/generate/timesheet/individual-report', body).subscribe(res => {
      window.open(environment.storageServiceBaseUrl + res.url);
    })
  }

  function getConsolidatedTimesheetReport() {
    const body = {
      "endDate": this.toDate,
      "startDate": this.fromDate
    }
    this.serviceApi.post("/v1/reports/generate/timesheet/cummulative-report", body).subscribe((res) => {
      window.open(environment.storageServiceBaseUrl + res.url);
    })
  }

  function getExpenseReportTypeB() {

    // let empCodes = [];
    // if (this.selectedEmpCode[0] === 'All Employees') {
    //   this.employeeList.forEach(employee => {
    //     if (employee.empCode != 'All Employees') empCodes.push(employee.empCode)
    //   })
    // }
    // else empCodes = this.selectedEmpCode;
    // const body = {
    //   "empCode": empCodes,
    //   "month": this.getMonth(),
    //   "year": this.data.year
    // }


    let CheckedData = getCheckedData(selectedEmpList.current)
    if (CheckedData.length == 0) {

      Alert.alert('Check at least one Employee !')
      return

    }

    let EmpCodeArray = []
    let body = {}

    if (CheckedData[0] == 'Select All') {
      employeeList.forEach((item) => {

        EmpCodeArray.push(item.empCode)

      })

      console.log(EmpCodeArray)

      body = {
        "empCodes": EmpCodeArray,
        "from": Utility.convertToPayloadDate(fromDate),
        "generateForAllEmployees": true,
        "to": Utility.convertToPayloadDate(toDate)
      }
    }

    else {

      body = {
        "empCodes": CheckedData,
        "from": Utility.convertToPayloadDate(fromDate),
        "generateForAllEmployees": false,
        "to": Utility.convertToPayloadDate(toDate)
      }


    }

    console.log(body);



    // this.serviceApi.post('/v1/payroll-reports/generate/expense/report', body).subscribe(res => {
    //   window.open(environment.storageServiceBaseUrl + res.url);
    // })


  }

  function getExpenseReportTypeC() {
    let empCodes = [];
    if (this.selectedEmpCode[0] === 'All Employees') {
      this.employeeList.forEach(employee => {
        if (employee.empCode != 'All Employees') empCodes.push(employee.empCode)
      })
    }
    else empCodes = this.selectedEmpCode;
    const body = {
      "empCode": empCodes,
      "month": this.getMonth(),
      "year": this.data.year
    }
    this.serviceApi.post('/v1/payroll-reports/generate/expense/report/typeC', body).subscribe(res => {
      window.open(environment.storageServiceBaseUrl + res.url);
    })
  }

  function generateConsolidatedLeaveBalanceReport() {
    let empCodes = [];
    if (this.selectedEmpCode[0] === 'All Employees') {
      this.employeeList.forEach(employee => {
        if (employee.empCode != 'All Employees') empCodes.push(employee.empCode)
      })
    }
    else empCodes = this.selectedEmpCode;
    const body = {
      "empCode": empCodes,
      "month": this.getMonth(),
      "year": this.data.year
    }
    this.serviceApi.post('/v1/payroll-reports/generate/ConsolidatedLeaveBalance/report', body).subscribe(res => {
      window.open(environment.storageServiceBaseUrl + res.url);
    })
  }

  function generateUtilizedLeaveDetailsReport() {
    let empCodes = [];
    if (this.selectedEmpCode[0] === 'All Employees') {
      this.employeeList.forEach(employee => {
        if (employee.empCode != 'All Employees') empCodes.push(employee.empCode)
      })
    }
    else empCodes = this.selectedEmpCode;
    const body = {
      "empCode": empCodes,
      "fromDate": this.fromDate,
      "toDate": this.toDate
    }
    this.serviceApi.post('/v1/payroll-reports/generate/UtilizedLeaveDetails/report', body).subscribe(res => {
      window.open(environment.storageServiceBaseUrl + res.url);
    })
  }

  function generateCompOffMonthlyBalanceReport() {
    let empCodes = [];
    if (this.selectedEmpCode[0] === 'All Employees') {
      this.employeeList.forEach(employee => {
        if (employee.empCode != 'All Employees') empCodes.push(employee.empCode)
      })
    }
    else empCodes = this.selectedEmpCode;
    const body = {
      "empCode": empCodes,
      "year": this.data.year
    }
    this.serviceApi.post('/v1/payroll-reports/generate/CompOffMonthly/report', body).subscribe(res => {
      window.open(environment.storageServiceBaseUrl + res.url);
    })
  }


  // ------------------------- Report Download Functions End



  function filterReport(selectedCategory) {

    let filteredReportsTemp = [];

    filteredReportsTemp = reports.filter(item => item.reportsCategory.reportCategoryName == selectedCategory);

    console.log('filteredReportsTemp', filteredReportsTemp);

    setfilteredReports(filteredReportsTemp)

    // sethideFilters(false);
    // setshowDateFilters(false);
    // setshowPayrollFilters(false);
    // setshowEmpListFilter(false);
    // setshowExpenseFilter(false);


  }


  function showHideReportFilter(value) {

    console.log('showHideReportFilter', value)
    switch (value) {
      case "Employee Master Report":
        sethideFilters(true)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "New Joinee Report":
        sethideFilters(true)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Separation Report":
        sethideFilters(true)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Happiness Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Department Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Employee Band Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Expense Report":
        sethideFilters(true)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Payroll Report":
        sethideFilters(true)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Loans & Advances Report":
        sethideFilters(true)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Attendance Register":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Attendance Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Muster Roll":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Late Coming Register":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
      case "Early Out Register":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "PF Report":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "ESIC Report":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Salary sheet":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
      case "Expense Report-A":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(true)
        setshowYearFilter(false)
        break;
      case "Expense Report-B":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(true)
        setshowYearFilter(true)
        break;

      case "Expense Report-C":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(true)
        setshowYearFilter(false)
        break;

      case "Individual Timesheet Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(true)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;

      case "Consolidated Timesheet Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;

      // utilized leave report
      case "Utilized Leave Report":
        sethideFilters(false)
        setshowDateFilters(true)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(true)
        setshowYearFilter(false)
        break;

      // consolidated leave report
      case "Consolidated Leave Balance Report":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(true)
        setshowEmpListFilter(false)
        setshowExpenseFilter(true)
        setshowYearFilter(false)
        break;

      case "CompOff Monthly Balance Report":
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(true)
        setshowYearFilter(true)
        break;

      default:
        sethideFilters(false)
        setshowDateFilters(false)
        setshowPayrollFilters(false)
        setshowEmpListFilter(false)
        setshowExpenseFilter(false)
        setshowYearFilter(false)
        break;
    }

  }


  return (
    <>



      <View style={{ flex: 1, backgroundColor: FormBGColor }}>



        <Nav
          backHidden={false}
          title={'My Reports'}
          backAction={() => goBack()}>
          {'  '}
        </Nav>

        <ScrollView style={{ flex: 1, padding: 15, }}>

          <PillsDropDownObject keyName={'reportCategoryName'} selectedData={selectedReportCat} Title='Select Report Category' showLableTitle={(item, index) => {

            return item?.reportCategoryName
          }} dataArray={reportCategories} onSelect={(item, index) => {
            setselectedReportCat(item)
            setselectedReport({})
            sethideFilters(false)
            setshowDateFilters(false)
            setshowPayrollFilters(false)
            setshowEmpListFilter(false)
            setshowExpenseFilter(false)
            setshowYearFilter(false)
            selectedEmpList.current = {}
            filterReport(item.reportCategoryName)

            console.log('item.reportCategoryName', item.reportCategoryName, item.reportCategoryName.length);
          }} />
          {JSON.stringify(selectedReportCat) === JSON.stringify({}) ? <>


          </> :
            <>
              <PillsDropDownObject selectedData={selectedReport} keyName={'reportName'} Title='Select Report' showLableTitle={(item, index) => {

                return item?.reportName
              }} dataArray={filteredReports} onSelect={(item, index) => {

                // console.log(selectedReportCat, selectedReportCat.length)

                setselectedReport(item)
                showHideReportFilter(item.reportName)
              }} />

              {hideFilters ?
                <>
                  <PillsDropDownObject selectedData={selectedDept} keyName='deptName' onSelect={(item, index) => {
                    setselectedDept(item)
                  }} Title='Select Department' showLableTitle={(item, index) => {

                    return item?.deptName
                  }} dataArray={departmentList} />


                  <PillsDropDownObject keyName='bandName' onSelect={(item, index) => {
                    setselectedBand(item)
                  }} selectedData={selectedBand} Title='Select Band' showLableTitle={(item, index) => {

                    return item?.bandName
                  }} dataArray={bandList} />
                </>
                : <></>}

              {showExpenseFilter ?
                <PillsCheckBoxObj Title='Select Employees' selectedData={selectedEmpList.current} dataArray={employeeList} keyName='empCode' showLableTitle={(item, index) => {

                  return item?.empFirstName + ' ' + item?.empLastName
                }} />

                :

                <></>}



              {showEmpListFilter ?
                <PillsDropDownObject Title='Select Employee' selectedData={selectedEmp} onSelect={(item, index) => {
                  setselectedEmp(item)
                }}
                  keyName='empCode' showLableTitle={(item, index) => {

                    return item?.empFirstName + ' ' + item?.empLastName
                  }} dataArray={employeeList} />

                :
                <></>
              }

              {showPayrollFilters ?



                <PillsDropDownObject keyName='viewValue' selectedData={selectedMonth} Title='Select Month' showLableTitle={(item, index) => {

                  return item.viewValue
                }} dataArray={monthList} onSelect={(item, index) => {
                  setselectedMonth(item)
                  // console.log('monthList', item);
                }} />
                : <></>}


              {showPayrollFilters || showYearFilter ?

                <PillsDropDownStateFull selectedData={selectedYear} Title='Select Year' showLableTitle={(item, index) => {

                  return item
                }} dataArray={yearList} onSelect={(item, index) => {
                  setselectedYear(item)
                }} />

                :
                <></>
              }


              {/* From Date To Date */}
              {showDateFilters ?
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <DateTimePicker
                    titleIOS=""
                    isVisible={onFromDate}
                    onConfirm={(date) => {

                      const momentDate = Moment(date.toISOString());
                      let pickedTime = Moment(momentDate).format('DD-MM-YYYY');

                      // let pickedTime24 = Moment(momentDate).format('HH:mm');
                      // console.log("24 hour format-------", pickedTime24);


                      // console.log("string date, ", String(date));


                      // console.log('dateTest, ', new Date(String(date)));
                      console.log(pickedTime);
                      setonFromDate(false)
                      setfromDate(pickedTime)


                    }}
                    onCancel={() => {
                      console.log('onFromDate');
                      setonFromDate(false)

                    }}
                    mode='date'
                  />


                  <DateTimePicker
                    titleIOS=""
                    isVisible={onToDate}
                    onConfirm={(date) => {

                      const momentDate = Moment(date.toISOString());
                      let pickedTime = Moment(momentDate).format('DD-MM-YYYY');

                      // let pickedTime24 = Moment(momentDate).format('HH:mm');
                      // console.log("24 hour format-------", pickedTime24);


                      // console.log("string date, ", String(date));


                      // console.log('dateTest, ', new Date(String(date)));
                      console.log(pickedTime);
                      setonToDate(false)
                      settoDate(pickedTime)

                    }}
                    onCancel={() => {
                      console.log('onToDate');
                      setonToDate(false)
                    }}
                    mode='date'
                  />
                  <CustomDateDesign Lable='From Date' dateTitle={fromDate} width='45%' onPress={() => {
                    setonFromDate(true)
                  }} />

                  <CustomDateDesign Lable='To Date' dateTitle={toDate} width='45%' onPress={() => {
                    setonToDate(true)
                  }} />
                </View>
                : <></>}

              {/* <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                <SubmitBtn onPress={() => {

                  props.navigation.navigate('ViewReport')

                }} />
              </View> */}


            </>
          }

          <Button
            onPress={() => {

              props.navigation.navigate('MobileCharts', { screen: "MaleFemale" })

            }}
            title="Male Female"
            color="#841584"
          />

          <Button
            onPress={() => {

              props.navigation.navigate('MobileCharts', { screen: "AgeGroup" })

            }}
            title="Regu"
            color="#841584"
          />

          {/* <Button
            onPress={() => { 

              props.navigation.navigate('MobileCharts', { screen: ""})

            }}
            title="Expense"
            color="#841584"
          /> */}
          {/* <Button
        onPress={()=>{}}
        title="Male Female"
        color="#841584"
      /> */}

          <View style={{ height: 20 }}>

          </View>

        </ScrollView>

        <View style={{ width: '100%', height: 50, }}>

          <View style={{
            alignSelf: 'center', height: '100%', alignItems: 'center',
            //  justifyContent: 'center'
          }}>
            <SubmitBtn onPress={() => {



              // props.navigation.navigate('EmpMasterReport')


              if (Object.keys(selectedReportCat).length == 0 || Object.keys(selectedReport).length == 0) {

                return

              }

              // console.log(selectedEmpList);
              viewReport(selectedReport.reportName)
              // console.log('ddd');

            }} />
          </View>

        </View>

      </View>

      <Loader isLoader={isLoading}> </Loader>
      {JSON.stringify(selectedReportCat) === JSON.stringify({}) ? <>

        <View style={{ flex: 1, top: '50%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, alignSelf: 'center' }}>
          <Text allowFontScaling={false} style={{ fontSize: 17, fontStyle: 'italic', fontWeight: '500', color: '#808080' }}>Please Select A Report Category </Text>
        </View>
      </> :
        JSON.stringify(selectedReport) === JSON.stringify({}) ? <>

          <View style={{ flex: 1, top: '50%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, alignSelf: 'center' }}>
            <Text allowFontScaling={false} style={{ fontSize: 17, fontStyle: 'italic', fontWeight: '500', color: '#808080' }}>Please Select A Report  </Text>
          </View>
        </> : <></>}
    </>

  );

}