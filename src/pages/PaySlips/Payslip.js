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
  Linking,
  Platform,
  Vibration
} from 'react-native';

import { Icon } from 'native-base';
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import Nav from '../../components/NavBar';
import Loader from '../../components/Loader';
import { COLORS } from '../../Constant/Index';
import { Shadow } from 'react-native-shadow-2';
import RNFetchBlob from 'rn-fetch-blob';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(232,244,241,1.0)',
    backgroundColor: COLORS.FormBGColor,
    height: '100%',
    width: '100%',

  },

  navView: {
    height: 80,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    height: 30,
    width: 30,
    left: 20,
    resizeMode: 'contain',
    top: 30,
  },

  viewShadow: {
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});

export default class PaySlip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paySlipArr: [],
      isLoading: false,
      authDict: {},
      isListEmpty: false
    };
  }

  componentDidMount() {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value });
        this.getPayslipsRecords();
      }
    });
  }

  //API Handler
  async getPayslipsRecords() {
    this.setState({ isLoading: true });

    var url =
      Constant.BASE_URL +
      Constant.PAYSLIP_RECORD +
      this.state.authDict.employeeCode;

    try {
      let response = await fetch(url, {
        method: 'GET',

        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responsejson = await response.json();

        let copyPaySlipArray = JSON.parse(JSON.stringify(responsejson))

        if (copyPaySlipArray?.length == 0) {

          this.setState({ isListEmpty: true });
          return
        }

        const months = {
          "JANUARY": 0,
          "FEBRUARY": 1,
          "MARCH": 2,
          "APRIL": 3,
          "MAY": 4,
          "JUNE": 5,
          "JULY": 6,
          "AUGUST": 7,
          "SEPTEMBER": 8,
          "OCTOBER": 9,
          "NOVEMBER": 10,
          "DECEMBER": 11
        };

        // new Date(year, month);

        let strD = "MARCH-2024"

        console.log(new Date(parseInt(strD.split('-')[1]), months[strD.split('-')[0]]));


        copyPaySlipArray?.sort((a, b) => {

          // const aPeriod = new Date(a.payslipPeriod);
          // const bPeriod = new Date(b.payslipPeriod);

          const aPeriod = new Date(parseInt(a.payslipPeriod.split('-')[1]), months[a.payslipPeriod.split('-')[0]]);
          const bPeriod = new Date(parseInt(b.payslipPeriod.split('-')[1]), months[b.payslipPeriod.split('-')[0]]);

          return bPeriod - aPeriod;
        });

        // console.log("sorted paySlipArr",copyPaySlipArray);

        // console.log('paySlipArr', responsejson);

        this.setState({ paySlipArr: copyPaySlipArray });

        // console.log(responsejson)
      } else if (code == 401) {
        Alert.alert('Alert !', 'Something Went Wrong')
        Vibration.vibrate()
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchPdf(url) {
    console.log(url);
    // Linking.canOpenURL(url).then(supported => {
    // if (supported) {
    Linking.openURL(url);
    // }
    // else {
    //   console.log("Don't know how to open URI: " + url);
    // }
    // }  );
  }


  async downloadFile(url) {
    let pdfUrl = url;
    let DownloadDir =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DownloadDir;
    const { dirs } = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Cosmologo',
      path: `${dirToSave}.pdf`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });
    Platform.OS == 'android'
      ? RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/.pdf`,
          description: 'Cosmologo',
          title: `invoice.pdf`,
          mime: 'application/pdf',
          mediaScannable: true,
        },
      })
        .fetch('GET', `${pdfUrl}`)
        .catch(error => {
          console.warn(error.message);
        })
      : RNFetchBlob.config(configOptions)
        .fetch('GET', `${pdfUrl}`, {})
        .then(res => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
            RNFetchBlob.ios.previewDocument(configfb.path);
          }
          console.log('The file saved to ', res);
        })
        .catch(e => {
          console.log('The file saved to ERROR', e.message);
        });
  };


  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const WINDOW_WIDTH = Dimensions.get('window').width;
    const dummyPaySlipData = {
      "empCode": "IOD022",
      "empName": "Sonali Kanojia",
      "empJoiningDate": "08-04-2015",
      "empUanNumber": null,
      "payrollDate": "2022-07-07",
      "empPaymentMode": "Bank Transfer",
      "dateOfResignation": null,
      "city": "New Delhi - 005",
      "pfNumber": null,
      "state": null,
      "department": "Administration",
      "esicNumber": null,
      "arrearDays": 0,
      "manualArrearAmount": 0,
      "lopReversalDays": 0,
      "ctcAmount": 43500,
      "emailId": "ps@iodglobal.com",
      "designation": "Manager-Secretary to MD",
      "panNo": "FMYPS8185K",
      "bankName": "BANK OF MAHARASHTRA",
      "ifscCode": "MAHB0000974",
      "accountNumber": "60210541863",
      "totalLeaveDay": 0,
      "totalWeekOffDays": 8,
      "totalHolidays": 0,
      "totalLopDays": 0,
      "totalPayableDays": 30,
      "employeeStatus": "ACTIVE",
      "templateName": "Manually",
      "totalWorkDaysInMonth": 30,
      "runPayrollFixedAllowances": [
        {
          "fieldId": 1,
          "fieldName": "Basic",
          "fieldValue": 20850,
          "arrearAmount": 0,
          "lopReversalAmount": 0,
          "fieldFixedValue": 20850,
          "totalAmount": 20850
        },
        {
          "fieldId": 3,
          "fieldName": "HRA",
          "fieldValue": 10425,
          "arrearAmount": 0,
          "lopReversalAmount": 0,
          "fieldFixedValue": 10425,
          "totalAmount": 10425
        },
        {
          "fieldId": 2,
          "fieldName": "DA",
          "fieldValue": 8340,
          "arrearAmount": 0,
          "lopReversalAmount": 0,
          "fieldFixedValue": 8340,
          "totalAmount": 8340
        },
        {
          "fieldId": 5,
          "fieldName": "Special Allowances",
          "fieldValue": 2085,
          "arrearAmount": 0,
          "lopReversalAmount": 0,
          "fieldFixedValue": 2085,
          "totalAmount": 2085
        }
      ],
      "totalFixedAllowanceAmount": 41700,
      "runPayrollFixedDeductions": [],
      "totalFixedDeductionAmount": 0,
      "runPayrollVariableAllowances": [],
      "totalVariableAllowanceAmount": 0,
      "runPayrollVariableDeductions": [
        {
          "fieldId": 1,
          "fieldName": "Loan Deductions",
          "fieldValue": 5000,
          "fieldFixedValue": 5000
        },
        {
          "fieldId": 2,
          "fieldName": "Voluntary PF",
          "fieldValue": 3200,
          "fieldFixedValue": 3200
        }
      ],
      "totalVariableDeductionAmount": 8200,
      "runPayrollEmployeeDeductions": [
        {
          "fieldId": 527,
          "fieldName": "LWF",
          "fieldValue": 0,
          "fieldFixedValue": 0,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 0,
          "earnedAmnt": 0
        },
        {
          "fieldId": 525,
          "fieldName": "PF",
          "fieldValue": 1800,
          "fieldFixedValue": 1800,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 1800,
          "earnedAmnt": 0
        },
        {
          "fieldId": 526,
          "fieldName": "ESIC",
          "fieldValue": 0,
          "fieldFixedValue": 0,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 0,
          "earnedAmnt": 0
        },
        {
          "fieldId": 528,
          "fieldName": "PT",
          "fieldValue": 0,
          "fieldFixedValue": 0,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 0,
          "earnedAmnt": 0
        }
      ],
      "totalEmployeeDeductionAmount": 1800,
      "runPayrollEmployerContribution": [
        {
          "fieldId": 526,
          "fieldName": "PF",
          "fieldValue": 1800,
          "fieldFixedValue": 1800,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 1800,
          "earnedAmnt": 0
        },
        {
          "fieldId": 527,
          "fieldName": "ESIC",
          "fieldValue": 0,
          "fieldFixedValue": 0,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 0,
          "earnedAmnt": 0
        },
        {
          "fieldId": 528,
          "fieldName": "LWF",
          "fieldValue": 0,
          "fieldFixedValue": 0,
          "lopReversal": 0,
          "arrearAmount": 0,
          "totalAmount": 0,
          "earnedAmnt": 0
        }
      ],
      "totalEmployerContributionAmount": 1800,
      "runPayrollOtherBenefits": [],
      "totalOtherBenefitsAmount": 0,
      "runPayrollFlexiBenefits": [],
      "totalFlexiBenefitsAmount": 0,
      "runPayrollLoans": [],
      "totalLoanAmount": 0,
      "runPayrollAdvances": [],
      "totalAdvanceAmount": 0,
      "totalTDS": 0,
      "arrears": 0,
      "totalGrossSalary": 41700,
      "totalNetPaymentAmount": 31700,
      "payslipLeavesVOS": [
        {
          "leaveName": "On Duty",
          "usedLeaveCount": 0,
          "categoryId": null,
          "leaveAbbrv": null
        },
        {
          "leaveName": "All Purpose Leave",
          "usedLeaveCount": 0,
          "categoryId": null,
          "leaveAbbrv": null
        },
        {
          "leaveName": "Leave Without Pay",
          "usedLeaveCount": 0,
          "categoryId": null,
          "leaveAbbrv": null
        }
      ],
      "compName": "Institute Of Director",
      "compAdds": "M-56 A, Greater Kailash, Part-II, M Block, Market, New Delhi",
      "orgLogoUrl": "https://s3.ap-south-1.amazonaws.com/proh2r/InstituteOfDirector/CompanyLogo/123809.jpeg",
      "payslipDoc": "https://proh2rconfidential.s3.ap-south-1.amazonaws.com/InstituteOfDirector/payslips/JUNE/Salary%20Slip%20-%20IOD022%20-%20JUNE%202022160.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221012T122016Z&X-Amz-SignedHeaders=host&X-Amz-Expires=599&X-Amz-Credential=AKIA3OWV7CBKU5JUZCYT%2F20221012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d373f3294a17cbb16e274be38bcac1a02fab14a76c65080144ac26103501a98c"
    }
    return (
      <View style={styles.container}>
        <Nav
          title="Pay Slips"
          backAction={() => goBack()}
          backHidden={false}></Nav>
        <View style={{ flex: 1, backgroundColor: COLORS.FormBGColor, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Shadow distance={15} containerViewStyle={{


          }} offset={[0.2, 2]}
            startColor='#d9d9d9'
          // finalColor='#9b9aed' 
          // corners={'bottomRight'}
          >
            <View style={{ width: WINDOW_WIDTH - 30, height: WINDOW_HEIGHT - 110, backgroundColor: '#FFFFFF', borderRadius: 30, borderBottomEndRadius: 0, borderBottomStartRadius: 0, }}>
              {this.state.paySlipArr.length != 0 ? (
                <ScrollView
                  style={{ width: '100%' }}
                  showsVerticalScrollIndicator={false}>


                  <View
                    style={{
                      width: '100%',
                      // height: 40,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // backgroundColor: 'grey',
                      justifyContent: 'center',
                      marginVertical: 15
                    }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 20, color: '#5f64ec' }}>My Pay Slips</Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: '#FFFFF',
                      height: 50,
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderBottomWidth: 0.5,
                      borderTopWidth: 0.5,
                      borderColor: '#e6e6e6',
                      padding: 10,



                    }}>

                    <View
                      style={{
                        width: '50%',
                        height: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center'
                      }}>


                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#D53305',
                          fontSize: 13.5,
                          // fontWeight: '500',
                          // top: 2,
                          left: 5,
                          fontFamily: Constant.MontserratSemiBold
                        }}>
                        {'Month'}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 60,
                        height: 30,
                        alignSelf: 'center',
                        right: 15,
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#D53305',
                          fontSize: 13.5,
                          // fontWeight: '400',
                          // top: 2,
                          fontFamily: Constant.MontserratSemiBold
                        }}>
                        Action
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      // width: Dimensions.get('window').width - 20,
                      width: '100%',
                      padding: 10,
                      // left: 10,
                      top: 8,
                      paddingTop: 0
                    }}>

                    {this.state.paySlipArr.map((m, i) => (
                      <React.Fragment key={i}>

                        <View
                          style={{
                            backgroundColor: 'white',
                            height: 50,
                            width: '100%',
                            // borderTopLeftRadius: 8,
                            // borderTopRightRadius: 8,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderBottomWidth: 0.5,
                            borderColor: '#D4D4D4'
                          }}>
                          <View
                            style={{
                              width: '60%',
                              height: '100%',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {/* <TouchableOpacity
                        style={{height: '100%', width: 40, left: 15, top: 9}}>
                        <Image
                          source={require('../../images/calender.png')}
                          style={{
                            width: '50%',
                            height: '50%',
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity> */}

                            <Text
                              allowFontScaling={false}
                              style={{
                                color: 'black',
                                fontSize: 13,
                                fontWeight: '500',
                                top: 2,
                                left: 5,
                              }}>
                              {m.payslipPeriod}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: '30%',
                              height: '100%',
                              // alignSelf: 'center',
                              right: 15,
                              // backgroundColor: 'red',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignSelf: 'flex-end'
                              // backgroundColor: 'red'
                              // marginLeft: 20
                            }}
                            onPress={() => this.fetchPdf(m.payslipDoc)}>

                            <TouchableOpacity style={{
                              width: '33.3%',
                              height: '33.3%',
                              // marginLeft: 10,
                            }}
                              onPress={() => {
                                // navigate('PaySlipViewTesting', { authDict: this.state.authDict, paySlipDate: m.payslipPeriod, payslipData: dummyPaySlipData })
                                navigate('PaySlipView', { authDict: this.state.authDict, paySlipDate: m.payslipPeriod, })

                                // navigate('PaySlipViewPDF', { pdfURL: m.payslipDoc, paySlipDate: m.payslipPeriod })
                              }}
                            >
                              <Image
                                source={require('../../images/view_timesheet.png')}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                  tintColor: '#5f64ec'
                                }}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                              width: '33.3%',
                              height: '33.3%',
                              // marginLeft: 10,
                            }}
                              onPress={() => {
                                // navigate('PaySlipView', { authDict: this.state.authDict, paySlipDate: m.payslipPeriod })

                                navigate('PaySlipViewPDF', { pdfURL: m.payslipDoc, paySlipDate: m.payslipPeriod })
                              }}
                            >
                              <Image
                                source={require('../../images/viewFile.png')}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                  tintColor: '#5f64ec'
                                }}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.fetchPdf(m.payslipDoc)} style={{
                              width: '33.3%',
                              height: '33.3%',
                            }}>
                              <Image
                                source={require('../../images/download.png')}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                  tintColor: '#5f64ec'

                                }}
                              />
                            </TouchableOpacity>


                          </View>


                        </View>

                        {/* <View
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    height: 50,
                    marginVertical: 8,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >
                  <View
                    style={{
                      backgroundColor: 'rgba(72,118,198,0.9)',
                      height: 50,
                      width: '100%',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '50%',
                        height: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{height: '100%', width: 40, left: 15, top: 9}}>
                        <Image
                          source={require('../../images/calender.png')}
                          style={{
                            width: '50%',
                            height: '50%',
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>

                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'white',
                          fontSize: 13,
                          fontWeight: '500',
                          top: 2,
                          left: 5,
                        }}>
                        {m.payslipPeriod}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        width: 60,
                        height: 30,
                        alignSelf: 'center',
                        right: 15,
                      }}
                      onPress={() => this.fetchPdf(m.payslipDoc)}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: '400',
                          top: 8,
                        }}>
                        Download
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}
                      </React.Fragment>

                    ))}
                  </View>
                </ScrollView>
              ) : this.state.isListEmpty ? (
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
              ) : <></>}
            </View>
          </Shadow>
        </View>
        <Loader isLoader={this.state.isLoading}> </Loader>
      </View>
    );
  }
}
