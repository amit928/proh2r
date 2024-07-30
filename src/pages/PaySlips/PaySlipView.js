import React, { useState, useEffect, useRef } from 'react';
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
    Vibration,
} from 'react-native';

import { Icon } from 'native-base';
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import Nav from '../../components/NavBar';
import Loader from '../../components/Loader';
import * as Utility from '../../Externel Constant/Utility';
import { Pages } from 'react-native-pages';
import { Shadow } from 'react-native-shadow-2';
import SubmitBtn from '../../components/SubmitBtn';
import CancelBtn from '../../components/CancelBtn';




const PaySlipView = (props) => {




    const [isLoading, setisLoading] = useState(false)
    const [scrollViewLayout, setscrollViewLayout] = useState({
        "y": 10,
        "width": 394,
        "height": 716,
        "x": 10
    })
    const [payslipData, setpayslipData] = useState({
        "empCode": "",
        "empName": "",
        "empJoiningDate": "",
        "empUanNumber": "",
        "payrollDate": "",
        "empPaymentMode": "",
        "dateOfResignation": null,
        "city": "",
        "pfNumber": "",
        "state": null,
        "department": "",
        "esicNumber": "",
        "arrearDays": 0,
        "manualArrearAmount": 0,
        "lopReversalDays": 0,
        "ctcAmount": 0,
        "emailId": "",
        "designation": "",
        "panNo": "",
        "bankName": null,
        "ifscCode": "",
        "accountNumber": "",
        "totalLeaveDay": 0,
        "totalWeekOffDays": 0,
        "totalHolidays": 0,
        "totalLopDays": 0,
        "totalPayableDays": 0,
        "employeeStatus": "",
        "templateName": "",
        "totalWorkDaysInMonth": 0,
        "runPayrollFixedAllowances": [],
        "totalFixedAllowanceAmount": 0,
        "runPayrollFixedDeductions": [],
        "totalFixedDeductionAmount": 0,
        "runPayrollVariableAllowances": [],
        "totalVariableAllowanceAmount": 0,
        "runPayrollVariableDeductions": [],
        "totalVariableDeductionAmount": 0,
        "runPayrollEmployeeDeductions": [],
        "totalEmployeeDeductionAmount": 0,
        "runPayrollEmployerContribution": [],
        "totalEmployerContributionAmount": 0,
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
        "totalGrossSalary": 0,
        "totalNetPaymentAmount": 0,
        "payslipLeavesVOS": [],
        "compName": "",
        "compAdds": "",
        "orgLogoUrl": null,
        "payslipDoc": ""
    })

    const [grossDeductions, setgrossDeductions] = useState(0)

    const [pageCurrentIndex, setpageCurrentIndex] = useState(0)

    const pagesRef = useRef()
    function showPageRef() {
        console.log('PaySlipView', pagesRef);
        setpageCurrentIndex(pagesRef.current.activeIndex)
    }

    const { goBack } = props.navigation;
    const { authDict } = props.route.params;
    const { paySlipDate } = props.route.params;

    // console.log(props.route.params);


    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const WINDOW_WIDTH = Dimensions.get('window').width;

    useEffect(() => {

        getPayslipDetalil()

    }, [])

    function toRupeeFormat(value) {

        // console.log();

        if (Number.isInteger(value)) {
            // console.log(value.toLocaleString('en-IN') + '.00');
            return value.toLocaleString('en-IN') + '.00'
        }
        else {
            // console.log(value.toLocaleString('en-IN'));
            return value.toLocaleString('en-IN')
        }

    }

    async function getPayslipDetalil() {
        setisLoading(true)

        const url =
            Constant.BASE_URL + 'payroll/payslips/getEmployeePayslip/' + paySlipDate + '/' +
            authDict.employeeCode;

        console.log('url', url);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDict),
            });

            let code = await response.status;
            // console.log('paySlipArr', code);
            setisLoading(false)

            if (code == 200) {
                let responsejson = await response.json();

                console.log('getPayslipDetalil', responsejson);

                setpayslipData(responsejson)

                let TempGrossDeductions = 0

                responsejson.runPayrollFixedDeductions.forEach(element => {
                    TempGrossDeductions += element.fieldValue
                });
                responsejson.runPayrollEmployeeDeductions.forEach(element => {
                    TempGrossDeductions += element.totalAmount
                });
                responsejson.runPayrollVariableDeductions.forEach(element => {
                    TempGrossDeductions += element.fieldValue
                });
                TempGrossDeductions += responsejson.totalTDS;


                setgrossDeductions(TempGrossDeductions)

                // console.log(responsejson)
            } else if (code == 401) {
                Alert.alert('Alert !', 'Something Went Wrong')
                Vibration.vibrate()
            } else {
                console.log('code', code);
                Alert.alert('Alert !', 'Something Went Wrong');
                Vibration.vibrate()
            }
        } catch (error) {

            Alert.alert('Alert !', 'Something Went Wrong')
            Vibration.vibrate()
            setisLoading(false)
            console.error(error)
        }
    }


    const styles = StyleSheet.create({


        desiDeptContainer: {
            width: '100%', padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        },

        desiDeptRow: {




        },

        desiDeptRowHead:
            { fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16), color: '#4d4d4d' },

        desiDeptRowData: { fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16), color: '#4d4d4d' },

        tableHeadRowContainer: {
            width: '100%', flexDirection: 'row', marginBottom: 8, backgroundColor: 'rgba(238, 239, 241, 0.6)', paddingTop: 12, paddingHorizontal: 7, paddingLeft: 10, padding: 10,
            borderTopStartRadius: 20, borderTopEndRadius: 20,
            borderBottomColor: '#E8E8E8', borderBottomWidth: 1
        },

        tableRowContainer: { width: '100%', flexDirection: 'row', marginBottom: 8, paddingLeft: 10 },

        subHeadingContainer: { width: '100%', flexDirection: 'row', marginBottom: 10, paddingLeft: 10, marginTop: 5 },


        firstHeadColumn: { width: '40%', paddingRight: 5, },

        subHeadColumn: { width: '100%', paddingRight: 5, },

        headText: {
            fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16),
            // color: '#0d0099'
        },

        subHeadText: {
            fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16),
            // color: '#0d0099'
        },


        secondThirdHeadColumn: { width: '30%', paddingRight: 5 },

        firstColumnContent: { width: '40%', paddingRight: 8 },

        secondThirdColumnContent: { width: '30%', paddingRight: 7, },

        contentText: { fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16), color: '#4d4d4d' },

        grossHeadText: { fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16), fontWeight: '500', color: '#0b0080' },

        grossContainer: { width: '100%', flexDirection: 'row', marginBottom: 5, paddingLeft: 10, },

        grossAmountContainer: { width: '60%', paddingRight: 5, },

        grossAmountText: { fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16), fontWeight: '400', color: '#0d0099' },

        cardOuterContainer: {
            width: scrollViewLayout.width - 30, height: 340,
            // backgroundColor: 'red',
            alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
        },

        cardInnerContainer: {
            width: scrollViewLayout.width - 30, height: 320, backgroundColor: 'white',
            borderRadius: 20,
            // paddingTop: 10, paddingHorizontal: 7, paddingLeft: 10, 
            alignSelf: 'center',
        }


    })

    return (
        <>

            <View style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT, backgroundColor: '#ffffff', padding: 5, justifyContent: 'center', alignItems: 'center' }}>

                <ScrollView onLayout={e => {
                    setscrollViewLayout(e.nativeEvent.layout)
                    console.log(e.nativeEvent.layout)
                }} style={{ flex: 1, width: '100%', height: '100%', }}>

                    <View style={{
                        width: scrollViewLayout.width, height: 100, flexDirection: 'row',
                        backgroundColor: 'rgba(232, 230, 255, 0.3)',
                        borderBottomColor: '#E8E8E8', borderBottomWidth: 1
                    }}>

                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                            <Image style={{ height: '90%', width: '90%', resizeMode: 'contain' }} source={require('../../images/splash1.png')} />
                        </View>

                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                            <Text  allowFontScaling={false}    style={{ fontFamily: Constant.MontserratSemiBold, fontSize: (Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 16)) }}>
                                {'Payslip'}
                            </Text>
                            <Text  allowFontScaling={false}   style={{ fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 15) }}>
                                {paySlipDate}
                            </Text>
                        </View>

                        <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Image style={{ height: '90%', width: '90%', resizeMode: 'contain', }} source={{ uri: payslipData.orgLogoUrl }} />
                        </View>

                    </View>

                    <View style={{
                        width: scrollViewLayout.width, flexDirection: 'column',

                    }}>

                        <View style={{ width: '100%', padding: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center',  width: '70%' }}>
                                <Text  allowFontScaling={false}  style={{
                                    fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 22),
                                    color: '#595959'
                                    // color: '#0f00b3'
                                }}>
                                    {payslipData.empName + ' - ' + payslipData.empCode}

                                    {/* {"Kadambini Shrivastava - 0099"} */}
                                </Text>
                                {/* <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 13), color: '#4d4d4d' }}>
                                    {'Emp Code: ' + payslipData.empCode}
                                </Text> */}
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text  allowFontScaling={false}    style={{ fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 13), color: '#4d4d4d' }}>{'Net Pay'}</Text>

                                <Text  allowFontScaling={false}   style={{ fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 17), color: '#4d4d4d' }}>
                                    
                                    {'₹ ' + toRupeeFormat(payslipData.totalNetPaymentAmount)}

                                    {/* {'₹ ' + toRupeeFormat(2000000)} */}
                                    
                                    
                                    </Text>
                            </View>
                        </View>

                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}   style={styles.desiDeptRowHead}>
                                {'Designation :'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {payslipData.designation}
                            </Text>


                        </View>

                        {/* <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Departmant:'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {payslipData.department}
                            </Text>


                        </View> */}


                        <View style={styles.desiDeptContainer}>

                            <View style={{ flexDirection: 'row', }}>
                                <Text  allowFontScaling={false}    style={styles.desiDeptRowHead}>
                                    {'Days Paid : '}
                                </Text>
                                <Text  allowFontScaling={false}    style={styles.desiDeptRowData}>
                                    {payslipData.totalPayableDays}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <Text  allowFontScaling={false}    style={styles.desiDeptRowHead}>
                                    {'Total Days: '}
                                </Text>
                                <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                    {payslipData.totalWorkDaysInMonth}
                                </Text>
                            </View>


                        </View>

                    </View>


                    <View style={{ width: scrollViewLayout.width, height: '100%', flexDirection: 'column', marginTop: 20, }}>

                        <View style={{ width: '100%', padding: 5, marginBottom: 0 }}>

                            <Text  allowFontScaling={false}    style={{ fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 17), }}>
                                {pageCurrentIndex == 0 ? 'Earnings ' : pageCurrentIndex == 1 ? 'Employee Deductions' : 'Employer Contributions'}
                            </Text>
                        </View>

                        <View style={{ width: scrollViewLayout.width, height: 360, }}>


                            <Pages indicatorColor={'rgba(84, 89, 123, 1)'} onScrollEnd={() => {

                                showPageRef()
                            }} ref={pagesRef}>

                                <View style={styles.cardOuterContainer}>
                                    <Shadow distance={15} containerViewStyle={{


                                    }} offset={[0.2, 2]}
                                        startColor='#d9d9d9'
                                    // finalColor='#9b9aed' 
                                    // corners={'bottomRight'}
                                    >
                                        <View style={styles.cardInnerContainer}>


                                            {/* Earning Head */}

                                            <View style={styles.tableHeadRowContainer}>
                                                <View style={styles.firstHeadColumn}>
                                                    <Text     allowFontScaling={false} style={styles.headText}>
                                                        {'Earning'}
                                                    </Text>

                                                </View>

                                                <View style={styles.secondThirdHeadColumn}>
                                                    <Text    allowFontScaling={false}  style={styles.headText}>
                                                        {'Amount'}
                                                    </Text>

                                                </View>

                                                <View style={styles.secondThirdHeadColumn}>
                                                    <Text    allowFontScaling={false}  style={styles.headText}>
                                                        {'Total'}
                                                    </Text>

                                                </View>

                                            </View>

                                            <ScrollView nestedScrollEnabled={true}>

                                                <View style={styles.subHeadingContainer}>
                                                    <View style={styles.subHeadColumn}>
                                                        <Text  allowFontScaling={false}    style={styles.subHeadText}>
                                                            {'Fixed Allowances'}
                                                        </Text>

                                                    </View>



                                                </View>

                                                {payslipData.runPayrollFixedAllowances?.map((fixedAllowances, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}    style={styles.contentText}>
                                                                    {fixedAllowances.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}    style={styles.contentText}>
                                                                    {toRupeeFormat(fixedAllowances.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(fixedAllowances.totalAmount)}
                                                                    {/* {'1000000'} */}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}

                                                {payslipData.runPayrollOtherBenefits.length == 0 ? <></> :

                                                    <View style={styles.subHeadingContainer}>
                                                        <View style={styles.subHeadColumn}>
                                                            <Text  allowFontScaling={false}  style={styles.subHeadText}>
                                                                {'Other Benefits'}
                                                            </Text>

                                                        </View>



                                                    </View>

                                                }

                                                {payslipData.runPayrollOtherBenefits?.map((fixedAllowances, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {fixedAllowances.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(fixedAllowances.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(fixedAllowances.fieldValue)}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}


                                                {payslipData.runPayrollVariableAllowances.length == 0 ? <></> :
                                                    <View style={styles.subHeadingContainer}>
                                                        <View style={styles.subHeadColumn}>
                                                            <Text  allowFontScaling={false}  style={styles.subHeadText}>
                                                                {'Variable Allowances'}
                                                            </Text>

                                                        </View>



                                                    </View>
                                                }

                                                {payslipData.runPayrollVariableAllowances?.map((fixedAllowances, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {fixedAllowances.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(fixedAllowances.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(fixedAllowances.fieldValue)}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}

                                            </ScrollView>


                                            {payslipData.manualArrearAmount >= 0 ? <View style={styles.grossContainer}>
                                                <View style={styles.firstHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.grossHeadText}>
                                                        {'Manual Arrear'}
                                                    </Text>

                                                </View>

                                                <View style={styles.grossAmountContainer}>
                                                    <Text  allowFontScaling={false}  style={styles.grossAmountText}>
                                                        {'₹ ' + toRupeeFormat(payslipData.manualArrearAmount)}
                                                    </Text>

                                                </View>



                                            </View> : <></>}

                                            <View style={styles.grossContainer}>
                                                <View style={styles.firstHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.grossHeadText}>
                                                        {'Gross Earnings'}
                                                    </Text>

                                                </View>

                                                <View style={styles.grossAmountContainer}>
                                                    <Text  allowFontScaling={false}  style={styles.grossAmountText}>
                                                        {'₹ ' + toRupeeFormat(payslipData.totalGrossSalary)}
                                                    </Text>

                                                </View>



                                            </View>







                                        </View>
                                    </Shadow>
                                </View>

                                <View style={styles.cardOuterContainer}>
                                    <Shadow distance={15} containerViewStyle={{


                                    }} offset={[0.2, 2]}
                                        startColor='#d9d9d9'
                                    // finalColor='#9b9aed' 
                                    // corners={'bottomRight'}
                                    >
                                        <View style={styles.cardInnerContainer}>


                                            {/* Deduction Head */}

                                            <View style={styles.tableHeadRowContainer}>
                                                <View style={styles.firstHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.headText}>
                                                        {'Deduction'}
                                                    </Text>

                                                </View>

                                                <View style={styles.secondThirdHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.headText}>
                                                        {'Amount'}
                                                    </Text>

                                                </View>

                                                <View style={styles.secondThirdHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.headText}>
                                                        {'Total'}
                                                    </Text>

                                                </View>

                                            </View>

                                            <ScrollView nestedScrollEnabled={true}>

                                                {payslipData.runPayrollEmployeeDeductions?.map((Deductions, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {Deductions.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions.totalAmount)}
                                                                    {/* {'1000000'} */}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}

                                                <View style={styles.tableRowContainer}>
                                                    <View style={styles.firstColumnContent}>
                                                        <Text  allowFontScaling={false}  style={styles.contentText}>
                                                            {'TDS'}
                                                        </Text>

                                                    </View>

                                                    <View style={styles.secondThirdColumnContent}>
                                                        <Text  allowFontScaling={false}  style={styles.contentText}>
                                                            {toRupeeFormat(payslipData.totalTDS)}
                                                        </Text>

                                                    </View>

                                                    <View style={styles.secondThirdColumnContent}>
                                                        <Text  allowFontScaling={false}  style={styles.contentText}>
                                                            {toRupeeFormat(payslipData.totalTDS)}
                                                            {/* {'1000000'} */}
                                                        </Text>

                                                    </View>

                                                </View>

                                                {payslipData.runPayrollVariableDeductions.length == 0 ? <></> :
                                                    <View style={styles.subHeadingContainer}>
                                                        <View style={styles.subHeadColumn}>
                                                            <Text  allowFontScaling={false}  style={styles.subHeadText}>
                                                                {'Variable Deduction'}
                                                            </Text>

                                                        </View>

                                                    </View>

                                                }

                                                {payslipData.runPayrollVariableDeductions?.map((Deductions, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {Deductions.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions.fieldFixedValue)}
                                                                    {/* {'1000000'} */}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}

                                                {payslipData.runPayrollFixedDeductions?.length == 0 ? <></> :
                                                    <View style={styles.subHeadingContainer}>
                                                        <View style={styles.subHeadColumn}>
                                                            <Text  allowFontScaling={false}  style={styles.subHeadText}>
                                                                {'Fixed Deduction'}
                                                            </Text>

                                                        </View>

                                                    </View>

                                                }

                                                {payslipData.runPayrollFixedDeductions?.map((Deductions, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {Deductions?.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions?.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions?.fieldValue)}
                                                                    {/* {'1000000'} */}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}



                                            </ScrollView>

                                            <View style={styles.grossContainer}>
                                                <View style={[styles.firstHeadColumn, { paddingRight: 0, width: '45%' }]}>
                                                    <Text  allowFontScaling={false}  style={styles.grossHeadText}>
                                                        {'Gross Deductions'}
                                                    </Text>

                                                </View>

                                                <View style={styles.grossAmountContainer}>
                                                    <Text  allowFontScaling={false}  style={styles.grossAmountText}>
                                                        {'₹ ' + toRupeeFormat(grossDeductions)}
                                                    </Text>

                                                </View>



                                            </View>







                                        </View>
                                    </Shadow>
                                </View>

                                <View style={styles.cardOuterContainer}>
                                    <Shadow distance={15} containerViewStyle={{


                                    }} offset={[0.2, 2]}
                                        startColor='#d9d9d9'
                                    // finalColor='#9b9aed' 
                                    // corners={'bottomRight'}
                                    >
                                        <View style={styles.cardInnerContainer}>


                                            {/* Contribution Head */}

                                            <View style={styles.tableHeadRowContainer}>
                                                <View style={styles.firstHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.headText}>
                                                        {'Contribution'}
                                                    </Text>

                                                </View>

                                                <View style={styles.secondThirdHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.headText}>
                                                        {'Amount'}
                                                    </Text>

                                                </View>

                                                <View style={styles.secondThirdHeadColumn}>
                                                    <Text  allowFontScaling={false}  style={styles.headText}>
                                                        {'Total'}
                                                    </Text>

                                                </View>

                                            </View>

                                            <ScrollView nestedScrollEnabled={true}>

                                                {payslipData.runPayrollEmployerContribution?.map((Deductions, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {Deductions.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions.fieldValue)}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {toRupeeFormat(Deductions.totalAmount)}
                                                                    {/* {'1000000'} */}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })}

                                                {/* {payslipData.runPayrollOtherBenefits?.map((fixedAllowances, index) => {

                                                    return (
                                                        <View key={String(index)} style={styles.tableRowContainer}>
                                                            <View style={styles.firstColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {fixedAllowances.fieldName}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {'0'}
                                                                </Text>

                                                            </View>

                                                            <View style={styles.secondThirdColumnContent}>
                                                                <Text  allowFontScaling={false}  style={styles.contentText}>
                                                                    {fixedAllowances.fieldValue}
                                                                </Text>

                                                            </View>

                                                        </View>);

                                                })} */}

                                            </ScrollView>

                                            <View style={styles.grossContainer}>
                                                <View style={[styles.firstHeadColumn, { paddingRight: 0, width: '45%' }]}>
                                                    <Text  allowFontScaling={false}  style={styles.grossHeadText}>
                                                        {'Gross Contribution'}
                                                    </Text>

                                                </View>

                                                <View style={styles.grossAmountContainer}>
                                                    <Text  allowFontScaling={false}  style={styles.grossAmountText}>
                                                        {'₹ ' + toRupeeFormat(payslipData.totalEmployerContributionAmount)}
                                                    </Text>

                                                </View>



                                            </View>







                                        </View>
                                    </Shadow>
                                </View>


                            </Pages>



                        </View>



                    </View>

                </ScrollView>

                <View style={{ width: '100%', padding: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <CancelBtn onPress={() => goBack()} />
                    <SubmitBtn
                        imgPath={require('../../images/download.png')}
                        title={'Download'} onPress={() => {
                            Linking.openURL(payslipData.payslipDoc);
                        }}
                    />
                </View>

            </View>

            <Loader isLoader={isLoading} />
        </>
    )



}

export default PaySlipView