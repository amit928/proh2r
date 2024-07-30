import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, Linking, Dimensions, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Loader from '../../components/Loader';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { convertToDDMMYYYY, IconOnStatus, splitStatus } from '../../Externel Constant/Utility';

import ImageView from "react-native-image-viewing";
import Pdf from 'react-native-pdf';
import { COLORS } from '../../Constant/Index';
import { Pages } from 'react-native-pages';
import ViewItemDetail from '../../components/ViewItemDetail';
import LinearGradient from 'react-native-linear-gradient';

// import RNFetchBlob from 'rn-fetch-blob';

const Card = ({ expenseName, expenseIncurredDate, amount, isReimbursable, isBillable, ExpenseDetailes, func, itemIndex }) => {

    const cardSize = (Dimensions.get('window').width - (((Dimensions.get('window').width / 2) / 2) / 2));


    return (

        <View style={{
            width: (cardSize) - (cardSize / 19),
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: 0,
            shadowColor: 'gray',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,
            elevation: 3,
            //   marginLeft: 8,

            borderRadius: 25,

            borderRadius: 25,
            // borderWidth:2,
            borderColor: 'rgba(243,219,131,1.0)',
            marginBottom: 10,
            paddingBottom: 10,
            marginLeft: itemIndex > 0 ? 16 : 0,

            height: 180
        }}>

            <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

                <Image style={{ height: 35, width: 35, resizeMode: 'contain' }} source={require('../../images/expNew.png')}></Image>

                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1, marginLeft: 1 }}>{expenseName}</Text>



                {/* <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                    func(ExpenseDetailes)
                }} >

                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={require('../../images/viewGray.png')}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => func(ExpenseDetailes)} style={{
                    borderRadius: 5, padding: 5, paddingVertical: 0, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent', borderColor: '#2b2b2b', borderWidth: 0, flexDirection: 'row', width: 70, height: 30,
                    // top: '12%', 
                    marginRight: 4
                }
                } >



                    <Text
                        allowFontScaling={false}
                        style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            textAlignVertical: 'center',
                            fontSize: 13,
                            color: '#0D0F1A',
                            // fontWeight: '500',
                            // marginTop: 8,
                            fontFamily: Constant.MontserratRegular,
                            // top: '5%',
                            // right: 15
                            marginRight: 5
                        }}>
                        View
                    </Text>



                    <View style={{ borderRadius: 6, padding: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7FF', borderColor: '#0800CA', borderWidth: 0.5 }} >

                        {/* <Image
                          style={{
                            height: 14, width: 14, resizeMode: 'contain',
                            tintColor: '#636363'
                          }}
                          source={require('../../images/arrowRight.png')}></Image> */}

                        <Image
                            style={{
                                height: 10, width: 10, resizeMode: 'contain',
                            }}
                            source={require('../../images/arrowRight.png')}></Image>

                    </View>

                </TouchableOpacity>



            </View>



            <View style={{ flexDirection: 'row', height: 40 }}>

                <View style={{ flex: 2, marginLeft: 5, }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Incurred Date</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{convertToDDMMYYYY(expenseIncurredDate)}</Text>

                </View>
                {/* <View style={{ flex: 2 }}>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Category</Text>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Reimbursable Yo</Text>

                            </View> */}
                <View style={{ flex: 2, marginLeft: 16 }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Amount </Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{amount}</Text>

                </View>

            </View>




            <View style={{ flexDirection: 'row', height: 50 }}>
                {/* <View style={{ flex: 2, marginLeft: 16 }}>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Amount </Text>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Billable Yo</Text>

                            </View> */}

                <View style={{ flex: 2, marginLeft: 5 }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Reimbursable</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}> {isReimbursable ? 'Yes' : 'No'}</Text>

                </View>

                <View style={{ flex: 2, marginLeft: 16 }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Billable </Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{isBillable ? 'Yes' : 'No'}</Text>

                </View>
            </View>





        </View>

    )
}

const ProViewTeamExpenseRecord = (props) => {

    // console.log(props.route.params.item);

    const updateAction = props.route.params.updateAction


    const [navTitle, setnavTitle] = useState('Expense Report'
        //  + props.route.params.item.empName
    )
    const [isLoading, setisLoading] = useState(false)

    const [EmpExpense, setEmpExpense] = useState(props.route.params.item)

    const [teamFlag, setteamFlag] = useState(props.route.params.teamFlag)

    const [expensesList, setexpensesList] = useState(props.route.params.item.expensesList)

    const [ExpenseDetailes, setExpenseDetailes] = useState({})

    const [ExpenseDetailesModal, setExpenseDetailesModal] = useState(false)

    const [download, setdownload] = useState(false)

    const [expensesFieldList, setexpensesFieldList] = useState([])

    const [pdfModal, setpdfModal] = useState(false)

    const [pdfSource, setpdfSource] = useState({})

    const [viewAttachmentOption, setviewAttachmentOption] = useState(false)

    const [fileType, setfileType] = useState('')

    const [imageViewVisible, setimageViewVisible] = useState(false)

    const [showViewExpense, setshowViewExpense] = useState(false)

    const [viewExpenseKeyArr, setviewExpenseKeyArr] = useState([])

    const [viewExpenseValueArr, setviewExpenseValueArr] = useState([])

    const [isAttachment, setisAttachment] = useState(false)

    const images = useRef([])

    console.log('expensesList.length', expensesList.length);

    const { goBack } = props.navigation;


    const openAttachment = (url) => {
        Linking.openURL(Constant.storageServiceBaseUrl + url).catch(err => console.error("Couldn't load page", err));

        console.log(url);
    };


    const styles = StyleSheet.create({
        container: {
            backgroundColor: COLORS.FormBGColor,
            // backgroundColor: 'white',
            height: '100%',
            width: '100%',
        },

        cardView: {
            // height: 210,
            width: '94%',
            backgroundColor: 'white',
            marginTop: 30,
            // shadowColor: 'rgba(185,185,185,1.0)',
            // shadowOffset: {
            //     width: 0,
            //     height: 6,
            // },
            // shadowOpacity: 0.39,
            // shadowRadius: 8.3,
            // elevation: 3,
            borderRadius: 12,
            alignSelf: 'center',
            paddingBottom: 16,
            paddingTop: 14,
            // borderWidth: 0.2,
            // borderColor: 'grey'
        },

        expReportDetailsTitleView: {
            flexDirection: 'row',
            // marginTop: 8,
            // marginLeft: 12,
            alignItems: 'center',
            overflow: 'hidden'
        },

        expReportDetailsIcon: {
            height: 20,
            width: 20,
            resizeMode: 'contain',

            // right: 5,
            // bottom: 2
            // marginLeft: 16,
        },

        expReportDetails: {
            fontFamily: Constant.MontserratSemiBold,
            fontSize: 14,
            padding: 8,
            color: '#666666',
            flex: 1,
            paddingLeft: 16
            // letterSpacing: 1.5
        },



        expReportDetailsContentTitleView: {

            flexDirection: 'row',
            // marginTop: 8,
            // marginLeft: 12,
            alignItems: 'center',
            overflow: 'hidden'

        },

        expReportDetailsContentFakeView: {

            height: 10,
            width: 50,
            resizeMode: 'contain',
            right: 5,
            bottom: 2
            // marginLeft: 16,

        },

        expReportDetailsContent: {
            fontFamily: Constant.MontserratRegular,
            fontSize: 14,
            paddingLeft: 8,
            paddingRight: 8,
            color: 'grey',
            flex: 1,
            // letterSpacing: 1.5
        },

        seperator: { borderWidth: 0.4, borderColor: '#D6D6D6', marginTop: 12, marginBottom: 12 }



    });



    useEffect(() => {

        console.log('EmpExpense', EmpExpense);
        console.log('expensesList', expensesList);
        console.log(typeof expensesList);

    }, []);

    function apprOnClick() {

        Alert.alert('', 'Want To Approve This Request !', [
            {
                text: 'Cancel',
                onPress: () =>{ console.log('Cancel Pressed')
                
            },
                style: 'cancel',
            },
            { text: 'OK', onPress: () =>{ console.log('OK Pressed') 
            actionOnRequest('APPROVE', '', EmpExpense.expenseId)
            
        }},
        ])

    }


    function RejectOnClick() {

        Alert.alert('', 'Want To Reject This Request !', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () =>{
                actionOnRequest('REJECT', '', EmpExpense.expenseId)
                console.log('OK Pressed') }},
        ])

    }


    async function actionOnRequest(action, comment, selectedExenseId) {
        let actionComment = action == 'REJECT' ? (comment == '' ? 'Rejected' : comment) : (comment == '' ? 'Approved' : comment)

        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + selectedExenseId + '/action?action=' + action + '&&comments=' + actionComment

        setisLoading(true)
        var params = { action: action, comments: actionComment }

        console.log(url)
        try {
            let response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: Constant.getHeader(props.route.params.authDict)
            }
            )

            setisLoading(false)
            let code = await response.status

            if (code == 200) {

                let responseJson = await response.json();
                console.log(responseJson)

                goBack()
                updateAction()


            } else {
                this.setState({ isLoading: false })
                let msg = await response.statusText
                Alert.alert('', 'Something went wrong !!')

            }
        } catch (error) {
            console.error(error);
            Alert.alert('', 'Internet went wrong !!')
            setisLoading(false)
        }
    }


    function viewAttachment(expenseAttachmentId) {

        console.log('images', images);
        console.log('pdfSource', pdfSource);


        if (fileType == 'image') {

            // images.current.push({ uri: Constant.storageServiceBaseUrl + expenseAttachmentId })



            setimageViewVisible(true)



        } else if (fileType == 'pdf') {

            setpdfModal(true)

            // setpdfSource({ uri: encodeURI(Constant.storageServiceBaseUrl + responseJson.url), cache: true })
            //                        console.log(encodeURI(Constant.storageServiceBaseUrl + responseJson.url));

        }

    }






    function ExpenseModelFunction(ExpenseDetail) {







        console.log(ExpenseDetail);
        setExpenseDetailes(ExpenseDetail);
        setExpenseDetailesModal(true);

        setexpensesFieldList(ExpenseDetail.expensesFieldList)
        let tempExpenseAttachmentArray = String(ExpenseDetail.expenseAttachment).split('.')

        if (tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'png' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'jpg' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'JPG' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'PNG' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'jpeg' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'JPEG') {


            console.log('image');
            images.current.push({ uri: Constant.storageServiceBaseUrl + ExpenseDetail.expenseAttachmentId })

            setfileType('image')
            setviewAttachmentOption(true)

        }

        else if (tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'pdf' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'PDF') {

            console.log('pdf');

            setfileType('pdf')

            console.log(encodeURI(Constant.storageServiceBaseUrl + ExpenseDetail.expenseAttachmentId));

            setpdfSource({ uri: encodeURI(Constant.storageServiceBaseUrl + ExpenseDetail.expenseAttachmentId), cache: true })

            setviewAttachmentOption(true)
        }

        else {
            setviewAttachmentOption(false)
        }

        // GetFile("https://s3.ap-south-1.amazonaws.com/proh2r/InfinitySolution/002/0001727.jpg")
    }

    function attachmentCheck(ExpenseDetail) {

        if (String(ExpenseDetail.expenseAttachment) == 'null') {

            setisAttachment(false)

            console.log('ddd');

            return;

        }

        else {
            setisAttachment(true)

            console.log('ccc');
        }



        setExpenseDetailes(ExpenseDetail);

        let tempExpenseAttachmentArray = String(ExpenseDetail.expenseAttachment).split('.')

        if (tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'png' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'jpg' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'JPG' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'PNG' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'jpeg' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'JPEG') {


            console.log('image');
            images.current.push({ uri: Constant.storageServiceBaseUrl + ExpenseDetail.expenseAttachmentId })

            setfileType('image')
            setviewAttachmentOption(true)

        }

        else if (tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'pdf' || tempExpenseAttachmentArray[tempExpenseAttachmentArray.length - 1] == 'PDF') {

            console.log('pdf');

            setfileType('pdf')

            console.log(encodeURI(Constant.storageServiceBaseUrl + ExpenseDetail.expenseAttachmentId));

            setpdfSource({ uri: encodeURI(Constant.storageServiceBaseUrl + ExpenseDetail.expenseAttachmentId), cache: true })

            setviewAttachmentOption(true)
        }

        else {
            setviewAttachmentOption(false)
        }



    }

    function openExpenseModal(ExpenseDetail) {

        console.log('openExpenseModal', imageViewVisible);
        console.log(',openExpenseModal', pdfModal);
        let keyArr = [
            'Expense Name',
            'Incurred Date',
            'Apply Date',
            'Reimbursable',
            'Billable',

        ]

        let valueArr = [
            String(ExpenseDetail.expenseName),
            String(ExpenseDetail.expenseIncurredDate),
            String(ExpenseDetail.applicationApplyDate),
            String(ExpenseDetail.isReImbursable ? 'Yes' : 'No'),
            String(ExpenseDetail.isBillable ? 'Yes' : 'No'),
        ]


        ExpenseDetail.expensesFieldList.map((item, index) => {


            keyArr.push(item.fieldName)
            valueArr.push(item.fieldValue)


        })


        keyArr.push('Attachment')
        valueArr.push(ExpenseDetail.expenseAttachment == null ? ' ' : ExpenseDetail.expenseAttachment)

        keyArr.push('Expense Reason')
        valueArr.push(ExpenseDetail.expenseReason)


        console.log(keyArr);
        console.log(valueArr);

        attachmentCheck(ExpenseDetail)


        setviewExpenseKeyArr(keyArr)
        setviewExpenseValueArr(valueArr)
        setshowViewExpense(true)

    }

    const pagesRef = useRef()


    function scrollTo() {

        pagesRef.current.scrollToPage(0, true)

    }

    function showPageRef() {
        console.log('OrganizationAnnoncement', pagesRef);
    }

    return (

        <>

            <Loader isLoader={isLoading}></Loader>

            <View style={styles.container}>
                <Nav
                    backHidden={false}
                    title={navTitle}
                    backAction={() => goBack()}>
                    {' '}
                </Nav>

                <ScrollView style={{
                    //  paddingTop: 20
                }}>

                    <View style={{
                        width: '94%',
                        backgroundColor: 'white',
                        marginTop: '3.5%',
                        // shadowColor: 'rgba(185,185,185,1.0)',
                        // shadowOffset: {
                        //     width: 0,
                        //     height: 6,
                        // },
                        // shadowOpacity: 0.39,
                        // shadowRadius: 8.3,
                        // elevation: 3,
                        borderRadius: 12,
                        alignSelf: 'center',
                        // paddingBottom: 15,
                        // borderWidth: 0.2,
                        // borderColor: 'grey',
                        overflow: 'hidden'
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                // marginTop: 8,
                                // marginLeft: 12,
                                alignItems: 'center',
                                overflow: 'hidden'
                            }}>
                            <Image
                                style={{
                                    height: 50,
                                    width: 50,
                                    resizeMode: 'contain',
                                    right: 6,
                                    bottom: 1
                                    // marginLeft: 16,
                                }}
                                source={require('../../images/expenseNewIcon.png')}></Image>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontFamily: Constant.MontserratSemiBold,
                                    fontSize: 18,
                                    padding: 8,
                                    color: 'black',
                                    flex: 1,
                                    letterSpacing: 1.5
                                }}>
                                {props.route.params.item.empName}
                            </Text>
                        </View>



                    </View>

                    <Text
                        allowFontScaling={false}
                        style={{
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 15,
                            color: 'black',
                            // marginBottom: 10,
                            // paddingTop: 10,
                            // paddingLeft: 16,
                            // paddingBottom: 10,
                            marginTop: 30,
                            backgroundColor: COLORS.FormBGColor,
                            marginLeft: '4%'
                        }}>Summary</Text>

                    <View style={[styles.cardView, { marginTop: 10 }]}>




                        <View
                            style={{
                                flexDirection: 'row',
                                // marginTop: 8,
                                // marginLeft: 12,
                                alignItems: 'center',
                                overflow: 'hidden'
                            }}>
                            <View style={{
                                height: 14,
                                width: 14,
                                marginLeft: 10
                            }}>
                                <Image
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        resizeMode: 'contain',
                                    }}
                                    source={require('../../images/expenseNew2.png')}></Image>
                            </View>

                            <Text
                                allowFontScaling={false}
                                style={styles.expReportDetails}>
                                {'Report Title'}
                            </Text>

                            <View style={{
                                height: 30,
                                width: 30,
                                resizeMode: 'contain',
                                right: 20,
                                bottom: 2
                                // marginLeft: 16,
                            }}>
                                {IconOnStatus(EmpExpense.expenseStatus)}
                            </View>
                        </View>


                        <View
                            style={{
                                flexDirection: 'row',
                                // marginTop: 8,
                                // marginLeft: 12,
                                alignItems: 'center',
                                overflow: 'hidden'
                            }}>
                            <View
                                style={{
                                    height: 20,
                                    width: 20,
                                    marginLeft: 10
                                    // right: 5,
                                    // bottom: 2
                                    // marginLeft: 16,
                                }}
                            // source={require('../../images/expenseNewIcon.png')}
                            >

                            </View>
                            <Text
                                allowFontScaling={false}
                                style={styles.expReportDetailsContent}>
                                {EmpExpense.expenseReportName}
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', marginTop: 16, width: '100%',
                            // justifyContent: 'center',
                            //  height: 50 
                        }}>

                            <Image
                                style={{
                                    height: 14,
                                    width: 14,
                                    resizeMode: 'contain',
                                    marginLeft: 10,
                                    top: 3
                                    // marginTop: 16
                                }}
                                source={require('../../images/cashback.png')}></Image>

                            <View style={{ flex: 2, marginLeft: 0, }}>

                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratSemiBold,
                                        fontSize: 14,
                                        color: '#666666',
                                        // paddingTop: 16,
                                        paddingLeft: 16,
                                    }}>
                                    Total Reimbursable
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratRegular,
                                        fontSize: 14,
                                        color: 'grey',
                                        paddingTop: 4,
                                        paddingLeft: 16,
                                    }}>
                                    {String(EmpExpense.reimburseAmount)}
                                </Text>
                            </View>

                            <Image
                                style={{
                                    height: 14,
                                    width: 14,
                                    resizeMode: 'contain',
                                    marginLeft: 10,
                                    top: 3, left: 15
                                    // marginTop: 16
                                }}
                                source={require('../../images/bill.png')}></Image>

                            <View style={{ flex: 2, left: 12 }}>

                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratSemiBold,
                                        fontSize: 14,
                                        color: '#666666',
                                        // paddingTop: 16,
                                        paddingLeft: 16,
                                    }}>
                                    Total Billable
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratRegular,
                                        fontSize: 14,
                                        color: 'grey',
                                        paddingTop: 4,
                                        paddingLeft: 16,
                                    }}>
                                    {String(EmpExpense.billableAmount)}
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', marginTop: 16, width: '100%',
                            // justifyContent: 'center',
                            //  height: 50 
                        }}>

                            <Image
                                style={{
                                    height: 14,
                                    width: 14,
                                    resizeMode: 'contain',
                                    marginLeft: 10,
                                    top: 3
                                    // marginTop: 16
                                }}
                                source={require('../../images/gross.png')}></Image>

                            <View style={{ flex: 2, marginLeft: 0, }}>

                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratSemiBold,
                                        fontSize: 14,
                                        color: '#666666',
                                        // paddingTop: 16,
                                        paddingLeft: 16,
                                    }}>
                                    Advance Received

                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratRegular,
                                        fontSize: 14,
                                        color: 'grey',
                                        paddingTop: 4,
                                        paddingLeft: 16,
                                    }}>
                                    {String(EmpExpense.advanceAmount)}
                                </Text>
                            </View>

                            <Image
                                style={{
                                    height: 14,
                                    width: 14,
                                    resizeMode: 'contain',
                                    marginLeft: 10,
                                    top: 3, left: 15
                                    // marginTop: 16
                                }}
                                source={require('../../images/dollar.png')}></Image>

                            <View style={{ flex: 2, left: 12 }}>

                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratSemiBold,
                                        fontSize: 14,
                                        color: '#666666',
                                        // paddingTop: 16,
                                        paddingLeft: 16,
                                    }}>
                                    Total Amount
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratRegular,
                                        fontSize: 14,
                                        color: 'grey',
                                        paddingTop: 4,
                                        paddingLeft: 16,
                                    }}>
                                    {String(EmpExpense.totalAmount)}
                                </Text>
                            </View>
                        </View>


                    </View>


                    <View style={{ marginBottom: 0, marginTop: 30, height: 225, marginLeft: '4%' }}>

                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 15,
                                color: 'black',
                                marginBottom: 10,
                                // paddingTop: 10,
                                // paddingLeft: 16,
                                // paddingBottom: 10,
                                backgroundColor: COLORS.FormBGColor,
                            }}>Detailed Expenses</Text>

                        {expensesList.length == 1 ? <>{expensesList.map((item, index) => {

                            return (
                                <>


                                    <Card key={String(index)}
                                        amount={String(item.amount)}
                                        expenseIncurredDate={String(item.expenseIncurredDate)}
                                        expenseName={item.expenseName}
                                        isBillable={item.isBillable}
                                        isReimbursable={item.isReImbursable}
                                        ExpenseDetailes={item}
                                        func={openExpenseModal}
                                        itemIndex={index}

                                    />

                                </>
                            )

                        })

                        }
                        </>
                            :

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                                {expensesList.map((item, index) => {

                                    return (
                                        <>


                                            <Card key={String(index)}
                                                amount={String(item.amount)}
                                                expenseIncurredDate={String(item.expenseIncurredDate)}
                                                expenseName={item.expenseName}
                                                isBillable={item.isBillable}
                                                isReimbursable={item.isReImbursable}
                                                ExpenseDetailes={item}
                                                func={openExpenseModal}
                                                itemIndex={index}

                                            />
                                        </>
                                    )

                                })

                                }

                            </ScrollView>

                        }

                    </View>



                    {/* <View style={{ marginBottom: 0, marginTop: 30, height: 225, }}>

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

                    <Pages onScrollEnd={() => {

                        showPageRef()
                    }} ref={pagesRef}>

                        {expensesList.map((item, index) => {

                            return (
                                <>
                                    

                                    <Card key={String(index)}
                                        amount={String(item.amount)}
                                        expenseIncurredDate={String(item.expenseIncurredDate)}
                                        expenseName={item.expenseName}
                                        isBillable={item.isBillable}
                                        isReimbursable={item.isReImbursable}
                                        ExpenseDetailes={item}
                                        func={ExpenseModelFunction}

                                    />

                                </>
                            )

                        })

                        }

                    </Pages>

                </View> */}


                </ScrollView>


                {showViewExpense ? (
                    <ViewItemDetail
                        buttonDisable={true}
                        viewDetail={showViewExpense}
                        title="View Expense"
                        keyArr={viewExpenseKeyArr}
                        valueArr={viewExpenseValueArr}
                        cancelAction={() => {
                            let copyImages = images.current.length

                            for (let index = 0; index < copyImages; index++) {

                                images.current.pop()

                            }
                            setshowViewExpense(false)
                        }

                        }
                        showExpAttachment={isAttachment}
                        viewAttachment={viewAttachmentOption ? () => {
                            console.log('viewAttachmentOption')
                            viewAttachment(String(ExpenseDetailes.expenseAttachmentId))
                        } : false}
                        openAttachment={() => openAttachment(String(ExpenseDetailes.expenseAttachmentId))}

                        images={images.current}
                        imageViewVisible={imageViewVisible}
                        setimageViewVisible={() => {
                            setimageViewVisible(false)
                        }}
                        setpdfModal={() => {
                            setpdfModal(false)
                        }}
                        pdfSource={pdfSource}
                        pdfModal={pdfModal}
                    ></ViewItemDetail>
                ) : null}

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={ExpenseDetailesModal}
                    onRequestClose={() => {

                        setExpenseDetailesModal(false)

                    }}>
                    {/*All views of Modal*/}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)'


                        }}>
                        <TouchableOpacity
                            onPress={() => setExpenseDetailesModal(false)}
                            style={{ flex: 1, }}
                        />

                        <View
                            style={{
                                width: '95%',
                                height: '90%', justifyContent: 'flex-start', borderTopStartRadius: 20, borderTopEndRadius: 20, backgroundColor: 'white', flexDirection: 'column', padding: 30, alignItems: 'flex-start', alignSelf: 'center',
                            }}>



                            <View style={{
                                width: '95%',
                                paddingTop: 20
                            }}>
                                <ScrollView showsVerticalScrollIndicator={false}>


                                    {/* <Text>

                                {JSON.stringify(ExpenseDetailes)}

                            </Text> */}


                                    <View style={{ padding: 12 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                fontWeight: 'bold'
                                            }}>

                                            Expense Name
                                        </Text>
                                        <TextInput allowFontScaling={false}
                                            style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                            underlineColorAndroid="rgba(0,0,0,0)"
                                            placeholder='Expense Report Title'
                                            placeholderTextColor="#A9A9A9"
                                            value={ExpenseDetailes.expenseName}
                                            editable={false}
                                            // onChangeText={(text) => {}}
                                            returnKeyType="done" />
                                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                        </View>

                                    </View>

                                    <View style={{ padding: 12 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                fontWeight: 'bold'
                                            }}>

                                            Incurred Date
                                        </Text>
                                        <TextInput allowFontScaling={false}
                                            style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                            underlineColorAndroid="rgba(0,0,0,0)"
                                            placeholder='Expense Report Title'
                                            placeholderTextColor="#A9A9A9"
                                            value={String(ExpenseDetailes.expenseIncurredDate)}
                                            editable={false}
                                            // onChangeText={(text) => {}}
                                            returnKeyType="done" />
                                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                        </View>

                                    </View>



                                    <View style={{ padding: 12 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                fontWeight: 'bold'
                                            }}>

                                            Reimbursable
                                        </Text>
                                        <TextInput allowFontScaling={false}
                                            style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                            underlineColorAndroid="rgba(0,0,0,0)"
                                            placeholder='Expense Report Title'
                                            placeholderTextColor="#A9A9A9"
                                            value={ExpenseDetailes.isReImbursable ? 'Yes' : 'No'}
                                            editable={false}
                                            // onChangeText={(text) => {}}
                                            returnKeyType="done" />
                                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                        </View>

                                    </View>

                                    <View style={{ padding: 12 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                fontWeight: 'bold'
                                            }}>

                                            Billable
                                        </Text>
                                        <TextInput allowFontScaling={false}
                                            style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                            underlineColorAndroid="rgba(0,0,0,0)"
                                            placeholder='Expense Report Title'
                                            placeholderTextColor="#A9A9A9"
                                            value={ExpenseDetailes.isBillable ? 'Yes' : 'No'}
                                            editable={false}
                                            // onChangeText={(text) => {}}
                                            returnKeyType="done" />
                                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                        </View>

                                    </View>
                                    {/* <Text>{JSON.stringify(expensesFieldList)}</Text> */}
                                    {expensesFieldList.map((item, index) => {

                                        return (

                                            <>
                                                <View style={{ padding: 12 }}>
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={{
                                                            fontFamily: Constant.MontserratMedium,
                                                            fontSize: 13,
                                                            paddingLeft: 20,
                                                            fontWeight: 'bold'
                                                        }}>

                                                        {item.fieldName}
                                                    </Text>
                                                    <TextInput allowFontScaling={false}
                                                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                                        underlineColorAndroid="rgba(0,0,0,0)"
                                                        placeholder='Expense Report Title'
                                                        placeholderTextColor="#A9A9A9"
                                                        value={item.fieldValue}
                                                        editable={false}
                                                        // onChangeText={(text) => {}}
                                                        returnKeyType="done" />
                                                    <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                                    </View>

                                                </View>
                                            </>
                                        )

                                    })}

                                    <View style={{ padding: 12 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                fontWeight: 'bold'
                                            }}>

                                            Attachment
                                        </Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>

                                            {String(ExpenseDetailes.expenseAttachment) != 'null' ?

                                                <>
                                                    <TextInput allowFontScaling={false}
                                                        style={{ width: '70%', height: 45, paddingLeft: 22, color: 'grey', alignSelf: 'center' }}
                                                        underlineColorAndroid="rgba(0,0,0,0)"


                                                        value={String(ExpenseDetailes.expenseAttachment)}
                                                        editable={false}
                                                        returnKeyType="done" />
                                                    <TouchableOpacity onPress={() => {
                                                        openAttachment(String(ExpenseDetailes.expenseAttachmentId))
                                                    }}>
                                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../images/download.png')}></Image>
                                                    </TouchableOpacity>
                                                    {viewAttachmentOption ?
                                                        <TouchableOpacity onPress={() => {
                                                            viewAttachment(String(ExpenseDetailes.expenseAttachmentId))
                                                        }}>
                                                            <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: 'black' }} source={require('../../images/eye.png')}></Image>
                                                        </TouchableOpacity>
                                                        :
                                                        <></>
                                                    }
                                                    {/* {download ? <TouchableOpacity onPress={GetFile(String(ExpenseDetailes.expenseAttachmentId), String(ExpenseDetailes.expenseAttachment))}><Text>Downloading....</Text></TouchableOpacity>: <></>} */}

                                                </>


                                                :
                                                <>
                                                    <TextInput allowFontScaling={false}
                                                        style={{ width: '90%', height: 45, paddingLeft: 22, color: 'grey', alignSelf: 'center' }}
                                                        underlineColorAndroid="rgba(0,0,0,0)"


                                                        value={''}
                                                        editable={false}
                                                        returnKeyType="done" />
                                                </>
                                            }

                                        </View>
                                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                        </View>

                                    </View>

                                    <View style={{ padding: 12 }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                fontWeight: 'bold'
                                            }}>

                                            Expense Reason
                                        </Text>
                                        <TextInput allowFontScaling={false}
                                            style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                            underlineColorAndroid="rgba(0,0,0,0)"

                                            placeholderTextColor="#A9A9A9"
                                            value={String(ExpenseDetailes.expenseReason)}
                                            editable={false}
                                            // onChangeText={(text) => {}}
                                            returnKeyType="done" />
                                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                                        </View>

                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            height: 35,
                                            width: '40%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            borderRadius: 20,
                                            borderWidth: 0.5,
                                            borderColor: 'rgba(42,76,136,1.0)',
                                            marginBottom: '10%'
                                        }}
                                        onPress={() => {
                                            setExpenseDetailesModal(false);
                                        }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: 'rgba(42,76,136,1.0)',
                                                textAlign: 'center',
                                                width: '100%',
                                                height: '100%',
                                                top: 8,
                                                fontSize: 13,
                                                fontFamily: Constant.MontserratBold,
                                            }}>
                                            Cancel
                                        </Text>




                                    </TouchableOpacity>


                                </ScrollView>

                            </View>




                        </View>
                    </View>

                    <ImageView
                        images={images.current}
                        imageIndex={0}
                        visible={imageViewVisible}
                        onRequestClose={() => {

                            images.current.pop()


                            // console.log('higfyfsyuddguygjds');
                            setimageViewVisible(false)
                        }}
                    />


                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={pdfModal}
                        onRequestClose={() => {


                            setpdfModal(false)

                        }}
                    >

                        <View style={{
                            flex: 1,
                            backgroundColor: 'black'
                        }}>

                            <View style={{ width: '100%', zIndex: 2, top: 0, backgroundColor: 'black', }}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: '3%', marginTop: '7%', borderRadius: 22, padding: 3, }} onPress={() => {
                                    setpdfModal(false)
                                }} >

                                    <Image
                                        source={require('../../images/close.png')}
                                        style={{
                                            width: 22,
                                            height: 22,
                                            resizeMode: 'contain',
                                            tintColor: 'white',


                                        }} />

                                </TouchableOpacity>
                            </View>


                            <Pdf
                                source={pdfSource}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    console.log(`Number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    console.log(`Current page: ${page}`);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link pressed: ${uri}`);
                                }}
                                style={{
                                    flex: 1,
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get('window').height - 80,
                                    backgroundColor: 'black'
                                }} />



                        </View>

                    </Modal>

                </Modal>

                {teamFlag ?

    // Approve REject buttons
                    // <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: 50, backgroundColor: 'transparent', marginBottom: 12 }}>

                    //     <TouchableOpacity onPress={() => {

                    //         apprOnClick()

                    //     }} style={{ width: '40%' }}>

                    //         <LinearGradient colors={['#40bf0d', '#38a70c', '#38a70c']} style={{
                    //             // flex: 1,
                    //             width: '100%',
                    //             height: 40,
                    //             paddingLeft: 15,
                    //             paddingRight: 15,
                    //             borderRadius: 5,
                    //             alignItems: 'center',
                    //             justifyContent: 'center'
                    //         }}>
                    //             <Text style={{
                    //                 fontSize: 15,
                    //                 fontFamily: Constant.MontserratMedium,
                    //                 textAlign: 'center',
                    //                 margin: 10,
                    //                 color: '#ffffff',
                    //                 backgroundColor: 'transparent',
                    //             }}>
                    //                 Approve
                    //             </Text>
                    //         </LinearGradient>

                    //     </TouchableOpacity>

                    //     <TouchableOpacity onPress={()=>{
                    //         RejectOnClick()
                    //     }} style={{ width: '40%' }}>

                    //         <LinearGradient colors={['#fb2904', '#e22503', '#c92103']} style={{
                    //             // flex: 1,
                    //             width: '100%',
                    //             height: 40,
                    //             paddingLeft: 15,
                    //             paddingRight: 15,
                    //             borderRadius: 5,
                    //             alignItems: 'center',
                    //             justifyContent: 'center'
                    //         }}>
                    //             <Text style={{
                    //                 fontSize: 15,
                    //                 fontFamily: Constant.MontserratMedium,
                    //                 textAlign: 'center',
                    //                 margin: 10,
                    //                 color: '#ffffff',
                    //                 backgroundColor: 'transparent',
                    //             }}>
                    //                 Reject
                    //             </Text>
                    //         </LinearGradient>

                    //     </TouchableOpacity>

                    // </View>
                    <></>
                    : <></>}
            </View>

        </>

    )

}

export default ProViewTeamExpenseRecord;
