import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, Linking, Dimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Loader from '../../components/Loader';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextField from '../../components/CustomTextField';
import CustomDateDesign from '../../components/CustomDateDesign';
import CustomCommentInput from '../../components/CustomCommentInput';
import { COLORS } from '../../Constant/Index';
import { convertToDDMMYYYY, splitStatus } from '../../Externel Constant/Utility';
import ImageView from "react-native-image-viewing";
import Pdf from 'react-native-pdf';


// import RNFetchBlob from 'rn-fetch-blob';

const Card = ({ expenseName, expenseIncurredDate, amount, isReimbursable, isBillable, ExpenseDetailes, func }) => {


    return (

        <View style={{
            width: '90%',
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: 16,
            shadowColor: 'rgba(185,185,185,1.0)',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            borderRadius: 12,
            // borderWidth:2,
            borderColor: 'rgba(243,219,131,1.0)',
            marginBottom: 10,
            paddingBottom: 10
        }}>

            <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

                <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/expenses.png')}></Image>

                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1, marginLeft: 1 }}>{expenseName}</Text>



                <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                    func(ExpenseDetailes)
                }} >

                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={require('../../images/viewGray.png')}
                    />
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                    editButton(index)
                }} >

                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={require('../../images/editGray.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                    deleteButton(index)
                }} >

                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={require('../../images/deleteGray.png')}
                    />
                </TouchableOpacity> */}

                {/* {
                                item.status == 'LEVEL1PENDING' ?

                                    <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.deleteAction(index)} >

                                        <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                                            source={require('../../images/deleteGray.png')} />
                                    </TouchableOpacity>

                                    :

                                    <></>

                            } */}

            </View>



            <View style={{ flexDirection: 'row', height: 50 }}>

                <View style={{ flex: 2, marginLeft: 5, }}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Incurred Date</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{convertToDDMMYYYY(String(expenseIncurredDate))}</Text>

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

            {/* <View style={{ flexDirection: 'row', height: 50 }}>
                            <View style={{ flex: 2, marginLeft: 16 }}>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Billable </Text>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Billable Yo</Text>

                            </View>

                            <View style={{ flex: 2 }}>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Actions</Text>
                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Status Yo</Text>

                            </View>
                        </View> */}



        </View>

    )
}

const ProViewExpenseRecord = (props) => {

    console.log(props.route.params.item2);


    const [navTitle, setnavTitle] = useState('Expense Report of ' + props.route.params.item2.expenseReportName)
    const [isLoading, setisLoading] = useState(false)

    const [EmpExpense, setEmpExpense] = useState(props.route.params.item2)

    const [expensesList, setexpensesList] = useState(props.route.params.item2.expensesList)

    const [ExpenseDetailes, setExpenseDetailes] = useState({})

    const [ExpenseDetailesModal, setExpenseDetailesModal] = useState(false)

    const [download, setdownload] = useState(false)

    const [expensesFieldList, setexpensesFieldList] = useState([])

    const [pdfModal, setpdfModal] = useState(false)

    const [pdfSource, setpdfSource] = useState({})

    const [viewAttachmentOption, setviewAttachmentOption] = useState(false)

    const [fileType, setfileType] = useState('')

    const [imageViewVisible, setimageViewVisible] = useState(false)

    const images = useRef([])



    const { goBack } = props.navigation;

    //  function  GetFile(AttachmentID,File_Name) {
    //     const { config, fs } = RNFetchBlob;

    //     let DownloadDir = Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir ;


    //     let URL = Constant.storageServiceBaseUrl + AttachmentID

    //     let options = {
    //         fileCache: true,
    //         addAndroidDownloads: {
    //             useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
    //             notification: true,
    //             path: DownloadDir + '/' + File_Name,
    //             description: 'Downloading image.'
    //         }
    //     }

    //     config(options).fetch('GET', URL).then((res) => {
    //         console.log('file download', res);

    //         setdownload(false)
    //     })

    // }

    // function downloadFunc() {
    //     setdownload(true)

    //     console.log('Yo');
    // }


    const openAttachment = (url) => {
        Linking.openURL(Constant.storageServiceBaseUrl + url).catch(err => console.error("Couldn't load page", err));

        console.log(url);
    };







    useEffect(() => {

        console.log('EmpExpense', EmpExpense);
        console.log('expensesList', expensesList);
        console.log(typeof expensesList);

    }, []);


    function viewAttachment(expenseAttachmentId) {

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
        console.log('ExpenseDetail ', ExpenseDetail);
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

    return (

        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.FormBGColor
        }}>
            <Nav
                backHidden={false}
                title={navTitle}
                backAction={() => goBack()}>
                {' '}
            </Nav>

            <ScrollView style={{
                paddingTop: 20, paddingHorizontal: 12,
                backgroundColor: COLORS.FormBGColor
            }}>

                <CustomTextField editable={false} label='Expense Report Title' value={EmpExpense.expenseReportName} />

                <CustomTextField editable={false} label='Status' value={
                    splitStatus(EmpExpense.expenseStatus)

                } />

                <CustomTextField editable={false} label='Total Reimbursable' value={String(EmpExpense.reimburseAmount)} />

                <CustomTextField editable={false} label='Total Billable' value={String(EmpExpense.billableAmount)} />

                <CustomTextField editable={false} label='Advance Received' value={String(EmpExpense.advanceAmount)} />

                <CustomTextField editable={false} label='Total Amount' value={String(EmpExpense.totalAmount)} />

                {/* <CustomDateDesign/> */}

                {/* <View style={{ padding: 12 }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontFamily: Constant.MontserratMedium,
                            fontSize: 13,
                            paddingLeft: 20,
                            fontWeight: 'bold'
                        }}>
                        Expense Report Title
                    </Text>
                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={EmpExpense.expenseReportName}
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
                        Status
                    </Text>
                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={EmpExpense.expenseStatus == 'LEVEL1PENDING' ? 'Level 1 Approval Pending' : 'Level 2 Approval Pending'}
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
                        Total Reimbursable
                    </Text>
                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={String(EmpExpense.reimburseAmount)}
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
                        Total Billable
                    </Text>
                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        //placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={String(EmpExpense.billableAmount)}
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
                        Advance Received
                    </Text>
                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={String(EmpExpense.advanceAmount)}
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
                        Total Amount
                    </Text>
                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={String(EmpExpense.totalAmount)}
                        editable={false}
                        // onChangeText={(text) => {}}
                        returnKeyType="done" />
                    <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                    </View>

                </View> */}





                {EmpExpense.level1RejectComment == null ? <></> :

                    <>

                        <CustomCommentInput editable={false} label='Level 1 Rejection Comment' value={String(EmpExpense.level1RejectComment)} />

                        <View style={{ padding: 12 }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontFamily: Constant.MontserratMedium,
                                    fontSize: 13,
                                    paddingLeft: 20,
                                    fontWeight: 'bold'
                                }}>
                                Level 1 Rejection Comment
                            </Text>
                            <TextInput allowFontScaling={false}
                                style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                placeholder='Expense Report Title'
                                placeholderTextColor="#A9A9A9"
                                value={String(EmpExpense.level1RejectComment)}
                                editable={false}
                                // onChangeText={(text) => {}}
                                returnKeyType="done" />
                            <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                            </View>

                        </View>

                    </>

                }

                {EmpExpense.level2RejectComment == null ? <></> :

                    <>
                        <CustomCommentInput editable={false} label='Level 2 Rejection Comment' value={String(EmpExpense.level2RejectComment)} />

                        <View style={{ padding: 12 }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontFamily: Constant.MontserratMedium,
                                    fontSize: 13,
                                    paddingLeft: 20,
                                    fontWeight: 'bold'
                                }}>
                                Level 2 Rejection Comment
                            </Text>
                            <TextInput allowFontScaling={false}
                                style={{ width: '90%', height: 45, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                placeholder='Expense Report Title'
                                placeholderTextColor="#A9A9A9"
                                value={String(EmpExpense.level2RejectComment)}
                                editable={false}
                                // onChangeText={(text) => {}}
                                returnKeyType="done" />
                            <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                            </View>

                        </View>

                    </>
                }

                {/* <View style={{ backgroundColor: 'grey', height: 1, width: '96%', alignSelf: 'center' }}>
                </View> */}

                <View style={{ marginBottom: '15%' }}>

                    {expensesList.map((item, index) => {

                        return (
                            <>
                                {/* <Text> {JSON.stringify(item)} </Text> */}

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

                </View>






            </ScrollView>


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

                                        <View key={String(index)}>
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
                                        </View>
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
                                        Close
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
                    onRequestClose={() => setpdfModal(false)}
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
        </View>

    )

}

export default ProViewExpenseRecord;
