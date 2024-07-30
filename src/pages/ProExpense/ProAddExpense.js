import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator, Vibration, Dimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import MenuField from './MenuText';
import styles from './ProAddExpenseStyle';
//import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MyDropDown from './MyDropDown';
import MyCheckBox from './MyCheckBox';
import Loader from '../../components/Loader';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DocumentPicker from 'react-native-document-picker';

import ImageView from "react-native-image-viewing";

import Pdf from 'react-native-pdf';




// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import { Shadow } from 'react-native-shadow-2';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { COLORS } from '../../Constant/Index';
import SubmitBtnWide from '../../components/SubmitBtnWide';

const HPAdhesivestenantId = "26"
//DATERANGE Component

const DATERANGEComponent = ({ label, receiveFieldValueDATERANGE, index, fieldRef }) => {

    //const dateTemplateFieldValue = templateCategoriesField[0].fieldValue;


    const [label1, setlabel1] = useState(fieldRef.fieldValue != '' ? getFromDate() : null)
    const [label2, setlabel2] = useState(null)
    const [showFirstDatePicker, setshowFirstDatePicker] = useState(false)
    const [showSecondDatePicker, setshowSecondDatePicker] = useState(false)


    function getFromDate() {

        let str = String(fieldRef.fieldValue);

        let rawDate = str.split('to');

        return String(rawDate[0]);


    }


    function getToDate() {

        let str = String(fieldRef.fieldValue);

        let rawDate = str.split('to');

        return String(rawDate[1]);

    }


    return (
        <>
            {/* From Date Start */}



            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    top: 5,
                    height: 45,
                    borderRadius: 10,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 10,
                    alignSelf: 'center',
                    opacity: 1,
                }}
                onPress={() => {
                    setshowFirstDatePicker(true)

                }
                }>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: '#A4A4A4',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                    }}>
                    {label1 != null ? label1 : "From Date " + label}
                </Text>

                <Image
                    source={require('../../images/calendar_new_icon.png')}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 10,

                    }} />
            </TouchableOpacity>

            <DateTimePicker
                titleIOS=""
                isVisible={showFirstDatePicker}
                onConfirm={(date) => {

                    const momentDate = Moment(date.toISOString());
                    let pickedDt = Moment(momentDate).format('YYYY-MM-DD');


                    setlabel1(pickedDt);
                    setshowFirstDatePicker(false)

                }}
                onCancel={() => {
                    setshowFirstDatePicker(false);
                }}
                mode='date'
            />
            {/* From Date End */}

            {/* To Date Start  */}
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    top: 5,
                    height: 45,
                    borderRadius: 10,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 20,
                    alignSelf: 'center',
                    opacity: 1,
                }}
                onPress={() => {
                    setshowSecondDatePicker(true)

                }
                }>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: '#A4A4A4',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                    }}>
                    {fieldRef.fieldValue != '' ? getToDate() : "To Date " + label}
                </Text>

                <Image
                    source={require('../../images/calendar_new_icon.png')}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 10,

                    }} />
            </TouchableOpacity>

            <DateTimePicker
                titleIOS=""
                isVisible={showSecondDatePicker}
                onConfirm={(date) => {

                    const momentDate = Moment(date.toISOString());
                    let pickedDt = Moment(momentDate).format('YYYY-MM-DD');


                    receiveFieldValueDATERANGE(String(label1 + " to " + pickedDt), index)

                    setlabel2(pickedDt);
                    setshowSecondDatePicker(false)


                }}
                onCancel={() => {
                    setshowSecondDatePicker(false);
                }}
                mode='date'
            />

            {/* To Date End  */}





            {/* <Button
                title='test'
                onPress={() => {
                    //setDays('566')
                    console.log(Days);
                }} /> */}



        </>
    )


}

// TextInput Component

const TextFieldAmount = ({ receiveAmountTextField, fieldRef, fieldVal, placeholder }) => {




    const [TextValue, setTextValue] = useState(fieldRef[fieldVal] == null ? '' : fieldRef[fieldVal])

    const [LabelColor, setLabelColor] = useState('')

    // let color = '#F4A460'

    function OnFocus() {
        setLabelColor('#F4A460')
    }

    function OnBlur() {
        setLabelColor('black')
    }

    return (
        <>

            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 8,
                    color: LabelColor
                }}>
                {'Amount:'}
            </Text>
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,

                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={placeholder}
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    setTextValue(text)
                    receiveAmountTextField(text)
                }}
                returnKeyType="done"
                keyboardType='number-pad'
                onFocus={() => {
                    OnFocus()
                }}
                onBlur={() => {
                    OnBlur()
                }}
            />


        </>
    )
}

const TextFieldReason = ({ receiveReasonTextField, fieldRef, fieldVal }) => {




    const [TextValue, setTextValue] = useState(fieldRef[fieldVal] == '' ? '' : fieldRef[fieldVal])

    const [LabelColor, setLabelColor] = useState('black')



    function OnFocus() {
        setLabelColor('#F4A460')
    }

    function OnBlur() {
        setLabelColor('black')
    }

    return (
        <>

            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    // marginTop: 8,
                    color: LabelColor
                }}>
                {'Reason:'}
            </Text>
            <TextInput allowFontScaling={false}
                numberOfLines={5}
                maxLength={200}
                multiline={true}
                style={{
                    width: '90%',
                    height: 90,
                    marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                    textAlignVertical: 'top',

                    // width: '100%',
                    // fontFamily: Constant.MontserratMedium,
                    // fontSize: 12,
                    // color: 'white',
                    // paddingTop: 8,
                    // paddingLeft: 8,
                    // textAlignVertical: 'top',

                }}
                // underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={'Reason'}
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    setTextValue(text)
                    receiveReasonTextField(text)
                }}
                // returnKeyType="done"
                onFocus={() => {
                    OnFocus()
                }}

                onBlur={() => {
                    OnBlur()
                }}

            />


        </>
    )
}

const TextField = ({ data = [], placeholder, index, receiveValueTextField, fieldRef, fieldVal }) => {

    let FieldIndex = index
    let fieldName = data.fieldName


    const [TextValue, setTextValue] = useState('')

    const [LabelColor, setLabelColor] = useState('')



    function OnFocus() {
        setLabelColor('#F4A460')
    }

    function OnBlur() {
        setLabelColor('black')
    }

    return (
        <>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 8,
                    color: LabelColor
                }}>
                {String(fieldName)}
            </Text>
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={fieldRef[fieldVal] == '' ? placeholder : fieldRef[fieldVal]}
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    setTextValue(text)
                    receiveValueTextField(text, fieldName, FieldIndex)
                }}
                returnKeyType="done"
                onFocus={() => {
                    OnFocus()
                }}

                onBlur={() => {
                    OnBlur()
                }}
            />


        </>
    )
}

const TextFieldStatic = ({ TextValue = '', fieldName = '', editable = false }) => {





    // const [TextValue, setTextValue] = useState('')

    const [LabelColor, setLabelColor] = useState('')



    function OnFocus() {
        setLabelColor('#F4A460')
    }

    function OnBlur() {
        setLabelColor('black')
    }

    return (
        <>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 8,
                    color: LabelColor
                }}>
                {String(fieldName)}
            </Text>
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                editable={editable}

                // onChangeText={(text) => setTextValue(text)}

                returnKeyType="done"

            />


        </>
    )
}

//TextInput Number Component

const TextFieldNumber = ({ data = [], placeholder, index, receiveValueTextField, fieldRef, fieldVal }) => {

    let FieldIndex = index
    let fieldName = data.fieldName


    const [TextValue, setTextValue] = useState('')

    const [LabelColor, setLabelColor] = useState('')



    function OnFocus() {
        setLabelColor('#F4A460')
    }

    function OnBlur() {
        setLabelColor('black')
    }

    return (
        <>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 8,
                    color: LabelColor
                }}>
                {String(fieldName)}
            </Text>
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45, marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    top: 5,
                    backgroundColor: 'white',
                    marginBottom: 20,
                    opacity: 1

                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={fieldRef[fieldVal] == '' ? placeholder : fieldRef[fieldVal]}
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    setTextValue(text)
                    receiveValueTextField(text, fieldName, FieldIndex)
                }}
                returnKeyType="done"
                keyboardType='number-pad'
                onFocus={() => {
                    OnFocus()
                }}

                onBlur={() => {
                    OnBlur()
                }}
            />

            {/* <View style={{ backgroundColor: 'black', height: 1, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
        </>
    )
}


// DropDownComponent

const MyDropDownNormal = ({ data = [],
    index, receiveValueDropDown, fieldRef
}) => {

    //const [data, setdata] = useState()
    const [showDropdown, setshowDropdown] = useState(false)

    let fieldName = data.fieldName

    const [DropDownTitle, setDropDownTitle] = useState(null)


    const [LabelColor, setLabelColor] = useState('black')

    const [selectedExpenseNamePill, setselectedExpenseNamePill] = useState('')



    function OnFocusBlur() {
        if (!showDropdown) {
            setLabelColor('#F4A460')
        }
        else {
            setLabelColor('black')
        }

    }




    return (

        <View style={{ marginBottom: 16, }}>


            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 8,
                    marginBottom: 6,
                    color: LabelColor
                }}>
                {String(fieldName)}
            </Text>
            {/* <TouchableOpacity style={{
                display: 'flex',
                width: '90%',
                height: 40,
                alignSelf: 'center',
                flexDirection: 'row',
                backgroundColor: '#e2e6f8',
                padding: 8,
                // borderRadius: 22,
                //minHeight: 42,
                borderRadius: 25, borderBottomEndRadius: showDropdown ? 0 : 25, borderBottomStartRadius: showDropdown ? 0 : 25, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', borderBottomWidth: showDropdown ? 0 : 1
            }}
                activeOpacity={0.8}
                onPress={() => {
                    setshowDropdown(!showDropdown)
                    OnFocusBlur()
                }}>

                <Text style={{ width: '80%' }}> {fieldRef.fieldValue == '' ? fieldName : fieldRef.fieldValue}
                </Text>

                <Image style={{
                    transform: [{ rotate: showDropdown ? '180deg' : '0deg' }], marginRight: 5, width: 15,
                    height: 15,
                    resizeMode: 'contain',

                }} source={require('../../images/downArrow.png')} />

            </TouchableOpacity> */}

            <View style={{ borderWidth: showDropdown ? 1 : 0, borderColor: 'black', width: '100%' }}>
                <ScrollView nestedScrollEnabled={true} style={{ width: '90%', alignSelf: 'center' }} horizontal
                    showsHorizontalScrollIndicator={false}>

                    {



                        data.dropDownList.map((val, i) => {

                            return (

                                <TouchableOpacity style={{ alignSelf: 'center', padding: 12, backgroundColor: fieldRef.fieldValue == val ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 3, marginRight: 7 }} key={String(i)}
                                    onPress={() => {
                                        receiveValueDropDown(val, fieldName, index)
                                        setshowDropdown(false)
                                        setLabelColor('black')
                                        setDropDownTitle(val)
                                    }}
                                >
                                    <Text allowFontScaling={false} style={{
                                        color: fieldRef.fieldValue == val ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                        fontSize: 13,
                                    }}>
                                        {val}
                                    </Text>
                                </TouchableOpacity>

                            )


                        })




                    }

                </ScrollView>
            </View>

        </View>




    )

}





// Date Component

const ComponentForFilePIcker = ({ authDict, receiveAttachmentId, receiveAttachmentName, fieldRef }) => {

    const [SingleFile, setSingleFile] = useState(null)

    const [FileName, setFileName] = useState('')

    const [pickerModal, setpickerModal] = useState(false)

    const [UploaderIndicator, setUploaderIndicator] = useState(false)

    const [resCamera, setresCamera] = useState('')
    const [sendRes, setsendRes] = useState('')

    const images = useRef([])

    const [visible, setvisible] = useState(false)

    const [isImage, setisImage] = useState(false)

    const [fileType, setfileType] = useState('')

    const [pdfModal, setpdfModal] = useState(false)

    // const pdfSource = useRef({ uri: '', cache: true })

    const [pdfSource, setpdfSource] = useState({})



    //SelectOne File
    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            let res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file

            console.log('res : ' + JSON.stringify(res));
            console.log('file res', res);
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            //setSingleFile(res);
            //res.uri = res.uri.replace('content://', '')
            console.log('URI : ' + res.uri);

            // setresCamera(JSON.stringify(res))

            sendFile(res)
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                //alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };


    async function sendFile(file) {

        setFileName('Uploading ............')
        setUploaderIndicator(true)
        console.log('file URI : ' + file.uri);
        let fileName = file.name;
        // this.setState({isLoading: true});
        //starting function
        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + "upload/doc/" + authDict.employeeCode;
        console.log(url);


        var data = new FormData();
        data.append('file', {
            uri:
                Platform.OS === 'android'
                    ? file.uri
                    : file.uri.replace('file://', ''),
            type: file.type,
            name: fileName,
        }, fileName);
        console.log('Form file Data', data);

        try {
            var requestOptions = {
                method: 'POST',
                headers: Constant.formDatagetHeader(authDict),
                body: data,
            };

            console.log('requet option', requestOptions);

            // setsendRes(JSON.stringify(requestOptions))

            let response = await fetch(url, requestOptions);
            console.warn('data', response);
            let code = response.status;
            //this.setState({isLoading: false});

            if (code == 201 || code == 200) {
                let responseJson = await response.json();
                // console.log(responseJson)
                console.log(responseJson);



                receiveAttachmentId(responseJson.url);
                receiveAttachmentName(responseJson.name);
                console.log('fieldRef.expenseAttachment', fieldRef.expenseAttachment);
                setFileName('')
                setUploaderIndicator(false)
                // setpickerModal(false)
                setfileType(String(file.type))
                setisImage(false)

                if (String(file.type) == 'application/pdf') {

                    setpdfSource({ uri: encodeURI(Constant.storageServiceBaseUrl + responseJson.url), cache: true })
                    console.log(encodeURI(Constant.storageServiceBaseUrl + responseJson.url));

                }

                Alert.alert('File Uploaded !')





            } else if (code == 400) {
                let responseJson = await response.json();
                console.log(responseJson);
                console.warn('message', responseJson.message);

                setFileName('File Not Supported')
                setUploaderIndicator(false)
                setpickerModal(false)
                // this.refs.toast.show(responseJson.message);
            } else if (code == 401 || code == 503) {
                let responseJson = await response.json();
                console.warn('message', responseJson.message);
                setFileName('File Not Supported')
                setUploaderIndicator(false)
                setpickerModal(false)
                // Utility.logoutOnError(this.state.authDict, this.props.navigation);
            }

            else if (code == 413) {

                setFileName('File size is too large');
                console.log('Code 413');
                Alert.alert("",'File size is too large');
                Vibration.vibrate()
                setUploaderIndicator(false);
                setpickerModal(false);


            }

            else {
                // this.refs.toast.show('Something went wrong!');

                console.log('Something went wrong!');
                Alert.alert('Something Went Wrong....')

                Vibration.vibrate()
                setpickerModal(false)
            }
        } catch (error) {
            Alert.alert(
                '',
                'Internet connection appears to be offline. Please check your internet connection and try again.',
            );

            Vibration.vibrate()


            //   this.setState({isLoading: false});
            console.error(error);
        }
    }

    function cameraOn() {

        let ImagePickerOptions = {}

        if (Platform.OS === 'android') {

            ImagePickerOptions = {
                cropping: true,
                freeStyleCropEnabled: true,
                // compressImageQuality: 0.5
                // width: 1000, height: 800
                compressImageMaxWidth: 1052,
                compressImageMaxHeight: 1600,

            }

        }

        else {

            ImagePickerOptions = {
                cropping: true,
                freeStyleCropEnabled: true,
                width: 1000, height: 800

            }

        }

        function bytesToKB(bytes) {
            return bytes / 1024;
        }


        ImagePicker.openCamera(ImagePickerOptions).then(response => {
            console.log("openCamera",response);
            // Alert.alert(String(bytesToKB(response.size)))

            sendCameraImage(response)


        }).catch((err) => { console.log("openCamera catch" + err.toString()) });

        //   return

        // launchCamera({ cameraType: 'back', maxWidth: 1280, maxHeight: 720 }, (response) => {
        //     console.log('camera res', response);

        // Alert.alert(JSON.stringify(response)) 

        // setresCamera(JSON.stringify(response))

        //     if (response.assets) {

        //         if (response.assets.length > 1) {
        //             Alert.alert('Select Only One File');
        //             return;
        //         }

        //         else {

        //             sendCameraImage(response.assets[0])

        //         }


        //     }

        // });
    }

    function photogalleryOn() {

        let ImagePickerOptions = {}

        if (Platform.OS === 'android') {

            ImagePickerOptions = {
                cropping: true,
                freeStyleCropEnabled: true,
                // width: 1000, height: 800

            }

        }

        else {

            ImagePickerOptions = {
                cropping: true,
                freeStyleCropEnabled: true,
                width: 1000, height: 800

            }

        }


        ImagePicker.openPicker(ImagePickerOptions).then(response => {
            console.log(response);

            sendCameraImage(response)


        }).catch((err) => { console.log("openCamera catch" + err.toString()) });

        //   return


        // launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
        //     console.log('camera res', response);

        // Alert.alert(JSON.stringify(response)) 

        // setresCamera(JSON.stringify(response))

        //     if (response.assets) {

        //         if (response.assets.length > 1) {
        //             Alert.alert('Select Only One File');
        //             return;
        //         }

        //         else {

        //             sendCameraImage(response.assets[0])

        //         }


        //     }

        // });
    }


    async function sendCameraImage(file) {

        console.log('sendCameraImage ', file);

        setFileName('Uploading ............')
        setUploaderIndicator(true)
        console.log('file URI : ' + file.path);
        let fileName = file.path.match(/\/([^\/?#]+)[^\/]*$/)[1];
        // this.setState({isLoading: true});
        //starting function
        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + "upload/doc/" + authDict.employeeCode;
        console.log(url);


        var data = new FormData();
        data.append('file', {
            uri:
                Platform.OS === 'android'
                    ? file.path
                    : file.path,
            type: file.mime,
            name: fileName,
        }, fileName);
        console.log('Form file Data', data);

        try {
            var requestOptions = {
                method: 'POST',
                headers: Constant.formDatagetHeader(authDict),
                body: data,
            };

            console.log('requet option', requestOptions);

            // setsendRes(JSON.stringify(requestOptions))

            let response = await fetch(url, requestOptions);
            console.warn('data', response);
            let code = response.status;


            if (code == 201 || code == 200) {
                let responseJson = await response.json();
                // console.log(responseJson)
                console.log(responseJson);



                receiveAttachmentId(responseJson.url);
                receiveAttachmentName(responseJson.name);
                console.log('fieldRef.expenseAttachment', fieldRef);
                setFileName('')
                setUploaderIndicator(false)
                // setpickerModal(false)

                setisImage(true)
                setfileType('')
                Alert.alert('Photo Uploaded !')





            } else if (code == 400) {
                let responseJson = await response.json();
                console.log(responseJson);
                console.warn('message', responseJson.message);

                setFileName('File Not Supported')
                setUploaderIndicator(false)
                setpickerModal(false)
                // this.refs.toast.show(responseJson.message);
            } else if (code == 401 || code == 503) {
                let responseJson = await response.json();
                console.warn('message', responseJson.message);
                setFileName('File Not Supported')
                setUploaderIndicator(false)
                setpickerModal(false)
                // Utility.logoutOnError(this.state.authDict, this.props.navigation);
            }

            else if (code == 413) {

                setFileName('File size is too large');
                console.log('Code 413');
                Alert.alert('File size is too large');
                setUploaderIndicator(false);
                setpickerModal(false);

                Vibration.vibrate()


            }

            else {
                // this.refs.toast.show('Something went wrong!');
                setFileName('File Not Supported')
                console.warn('else block', code)
                // let responseJson = await response.json();
                // console.warn('message', responseJson.message);
                // setFileName(String(responseJson.message));
                // console.log(String(responseJson.message));
                // Alert.alert(String(responseJson.message));
                setUploaderIndicator(false);
                setpickerModal(false);

                Vibration.vibrate()
            }
        } catch (error) {
            Alert.alert(
                '',
                'Internet connection appears to be offline. Please check your internet connection and try again.',
            );
            Vibration.vibrate()
            //   this.setState({isLoading: false});
            console.error(error);
            //setFileName(String(code));
            setUploaderIndicator(false)
            setpickerModal(false);
            // console.log(JSON.stringify(error));
        }


    }


    return (
        <>

            <View style={{
                //backgroundColor: '#fff',
                //padding: 5,
                marginTop: 8
            }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '90%',
                            top: 5,
                            height: 45,
                            borderRadius: 10,
                            // borderWidth: 1,
                            // borderColor: 'black',
                            backgroundColor: 'white',
                            // marginBottom: 20,
                            alignSelf: 'center',
                            opacity: 1,
                            paddingLeft: 8,

                        }}
                        onPress={() => {
                            setpickerModal(true)
                        }}>
                        {/*Single file selection button*/}
                        <Text allowFontScaling={false} style={{ marginRight: 10, fontSize: 12, fontFamily: Constant.MontserratMedium }}>
                            {fieldRef.expenseAttachment == null ? 'Select File' : String(fieldRef.expenseAttachment)}
                        </Text>
                        <Image
                            source={{
                                uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                            }}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'stretch',
                                // marginRight: 8,
                                position: 'absolute',
                                right: 8
                            }}
                        />
                    </TouchableOpacity>
                    {/* <Text> {fieldRef.expenseAttachment == null ? '' : String(fieldRef.expenseAttachment)}  </Text> */}
                </View>
                <Text allowFontScaling={false} style={{ color: 'red', paddingLeft: 30, marginTop: 12, marginBottom: 5 }}>{FileName}</Text>

            </View>
            <Text allowFontScaling={false} style={{
                color: 'black',
                fontFamily: Constant.MontserratMedium,
                fontSize: 13,
                paddingLeft: 8,
                marginLeft: 16
            }}>Accepted Formats are .jpg .png .txt, .pdf, .xls,.xlsx, .doc.docx </Text>






            <Modal
                animationType={"slide"}
                transparent={true}
                visible={pickerModal}
                onRequestClose={() => setpickerModal(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)'


                    }}>
                    <TouchableOpacity
                        onPress={() => setpickerModal(false)}
                        style={{ flex: 1, }}
                    />
                    <View
                        style={{ width: '100%', height: '35%', justifyContent: 'flex-start', borderTopStartRadius: 20, borderTopEndRadius: 20, backgroundColor: 'white', flexDirection: 'column', padding: 30, alignItems: 'flex-start' }}>

                        {!isImage ? <></>

                            :

                            fieldRef.expenseAttachment != null ?

                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}
                                    onPress={() => {

                                        images.current.push({ uri: Constant.storageServiceBaseUrl + fieldRef.expenseAttachmentId })

                                        setvisible(true)

                                    }}
                                >

                                    <Image
                                        source={require('../../images/viewFile.png')}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            resizeMode: 'contain',
                                            // alignSelf: 'center',
                                            right: 10,
                                            tintColor: 'black'


                                        }} />

                                    <Text allowFontScaling={false} style={{ fontSize: 17 }}> View Photo </Text>

                                </TouchableOpacity>
                                : <></>
                        }


                        {fileType == 'application/pdf' ?


                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}
                                onPress={() => {

                                    // images.current.push({ uri: Constant.storageServiceBaseUrl + fieldRef.expenseAttachmentId })

                                    // pdfSource.current = { uri: Constant.storageServiceBaseUrl + fieldRef.expenseAttachmentId, cache: true }

                                    //    setpdfSource({ uri: encodeURIComponent(Constant.storageServiceBaseUrl + fieldRef.expenseAttachmentId), cache: true })
                                    //    console.log(encodeURIComponent(Constant.storageServiceBaseUrl + fieldRef.expenseAttachmentId));

                                    setpdfModal(true)

                                    console.log(pdfSource);

                                }}
                            >

                                <Image
                                    source={require('../../images/viewFile.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                        // alignSelf: 'center',
                                        right: 10,
                                        tintColor: 'black'


                                    }} />

                                <Text allowFontScaling={false} style={{ fontSize: 17 }}> View PDF </Text>

                            </TouchableOpacity>

                            : <></>
                        }

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                cameraOn();
                            }}
                        >

                            <Image
                                source={require('../../images/camera.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                    // alignSelf: 'center',
                                    right: 10,


                                }} />

                            <Text allowFontScaling={false} style={{ fontSize: 17 }}> Click a Photo and Upload </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                            onPress={() => { photogalleryOn() }}
                        >

                            <Image
                                source={require('../../images/gallery.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                    // alignSelf: 'center',
                                    right: 10,


                                }} />

                            <Text allowFontScaling={false} style={{ fontSize: 17 }}> Upload Photo </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                            onPress={() => { selectOneFile(); }}
                        >

                            <Image
                                source={require('../../images/upload.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                    // alignSelf: 'center',
                                    right: 10,


                                }} />

                            <Text allowFontScaling={false} style={{ fontSize: 17 }}>  Upload File </Text>

                        </TouchableOpacity>

                        {UploaderIndicator ?

                            <View style={{ alignSelf: 'center', marginTop: 10 }}>
                                <ActivityIndicator size="large" color="#00ff00" />
                            </View>


                            : <></>}


                        <TouchableOpacity
                            style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                borderWidth: 0.5,
                                borderColor: 'rgba(42,76,136,1.0)',
                                alignSelf: 'center',
                                marginTop: 25
                                // top: 175,
                                // position: 'absolute'
                            }}
                            onPress={() => {
                                setpickerModal(false)
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

                        {/* <ScrollView style={{marginBottom:50}}>
                            <Text> FilePicker Res: {resCamera} {'\n'} </Text>

                            <Text>Send Response: {sendRes}</Text>

                        </ScrollView> */}



                    </View>

                </View>


                <ImageView
                    images={images.current}
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => {

                        images.current.pop()


                        // console.log('higfyfsyuddguygjds');
                        setvisible(false)
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
        </>
    )
    //SelectOne File







}

const DatePickerComponent = ({ func, index, fieldName, fieldRef, fieldVal }) => {




    const [label, setlabel] = useState(null)
    const [showDatePicker, setshowDatePicker] = useState(false)


    return (
        <>

            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    color: 'black'
                    // marginTop: 16,
                }}>
                {String(fieldName)}
            </Text>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    top: 5,
                    height: 45,
                    borderRadius: 10,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 20,
                    alignSelf: 'center',
                    opacity: 1,
                }}
                onPress={() => {
                    setshowDatePicker(true)

                }
                }>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: '#A4A4A4',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 10,
                    }}>
                    {fieldRef[fieldVal] != null ? fieldRef[fieldVal] : fieldName}
                </Text>

                <Image
                    source={require('../../images/calendar_new_icon.png')}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 12,

                    }} />
            </TouchableOpacity>

            <DateTimePicker
                titleIOS=""
                isVisible={showDatePicker}
                onConfirm={(date) => {

                    const momentDate = Moment(date.toISOString());
                    let pickedDt = Moment(momentDate).format('YYYY-MM-DD');

                    func(pickedDt, index, fieldName);
                    setlabel(pickedDt);
                    setshowDatePicker(false)

                }}
                onCancel={() => {
                    setshowDatePicker(false);
                }}
                mode='date'
            />
        </>
    )
}

const ComponentForTime = ({ templateCategoriesFields, receiveAmountValue, fieldRefAmount, templateStoreRef, selectTypeFunc, valueFunc, userInputFunc, TemplateCatagoryFieldIdAndFieldNameFunc, TemplateCatagoryFieldValueFunc }) => {

    const [showDropdown, setshowDropdown] = useState(false)

    //let fieldName = data.fieldName

    const [DropDownTitle, setDropDownTitle] = useState(templateStoreRef.selectType != '' ? templateStoreRef.selectType : null)
    const [DropDownValue, setDropDownValue] = useState(templateStoreRef.value != '' ? templateStoreRef.value : '')
    const [TextValue, setTextValue] = useState(templateStoreRef.userInputVal != '' ? templateStoreRef.userInputVal : '')




    return (
        <>
            {/* // DropDown Start Here */}
            <View style={{ marginBottom: 16 }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 16,
                        fontSize: 13,
                        marginTop: 8,
                        marginBottom: 6,
                        color: 'black'
                    }}>
                    {String('Select Type')}
                </Text>

                {/* <TouchableOpacity style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#e2e6f8',
                    padding: 8,
                    width: '90%',
                    height: 40,
                    alignSelf: 'center',
                    // borderRadius: 22,
                    //minHeight: 42,
                    borderRadius: 25, borderBottomEndRadius: showDropdown ? 0 : 25, borderBottomStartRadius: showDropdown ? 0 : 25, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', borderBottomWidth: showDropdown ? 0 : 1
                }}
                    activeOpacity={0.8}
                    onPress={() => { setshowDropdown(!showDropdown) }}>

                    <Text> {DropDownTitle == null ? 'Select Type' : DropDownTitle}
                    </Text>

                    <Image style={{
                        transform: [{ rotate: showDropdown ? '180deg' : '0deg' }], marginRight: 5, width: 15,
                        height: 15,
                        resizeMode: 'contain',
                    }} source={require('../../images/downArrow.png')} />

                </TouchableOpacity> */}


                <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 100, width: '90%', alignSelf: 'center' }} horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {



                        templateCategoriesFields.map((val, i) => {

                            return (

                                <TouchableOpacity style={{ alignSelf: 'center', padding: 12, backgroundColor: DropDownTitle == val.fieldName ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 3, marginRight: 7 }} key={String(i)}
                                    onPress={() => {
                                        // receiveValueDropDown(val, fieldName, index)
                                        setshowDropdown(false)
                                        selectTypeFunc(val.fieldName)
                                        valueFunc(val.fieldValue)
                                        TemplateCatagoryFieldIdAndFieldNameFunc(val.templateFieldId, val.fieldName)
                                        setDropDownTitle(val.fieldName)
                                        setDropDownValue(val.fieldValue)
                                    }}
                                >
                                    <Text allowFontScaling={false} style={{
                                        color: DropDownTitle == val.fieldName ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                        fontSize: 13,
                                    }}>
                                        {val.fieldName}
                                    </Text>
                                </TouchableOpacity>

                            )


                        })




                    }

                </ScrollView>

            </View>
            {/* // DropDown End Here */}

            {/* //Distance Tab Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45, marginTop: 5,
                    paddingLeft: 8,
                    color: 'black',
                    alignSelf: 'center',

                    opacity: 1,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginBottom: 10

                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Hour'
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    if (DropDownTitle == null) {
                        Alert.alert('Please Select Type')
                        return;
                    }
                    userInputFunc(text)
                    TemplateCatagoryFieldValueFunc(text)
                    setTextValue(text)
                    receiveAmountValue(String(DropDownValue * text))
                }}
                returnKeyType="done"
                keyboardType='number-pad'
            />

            {/* <View style={{ backgroundColor: 'black', height: 0.5, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* //Distance Tab End */}

            {/* Rate Text Start */}
            <Text allowFontScaling={false} style={{
                color: 'black',
                fontFamily: Constant.MontserratMedium,
                fontSize: 13,
                paddingLeft: 20,
                marginBottom: 20
            }}>Rate Per Hour: {DropDownValue} </Text>
            {/* Rate Text End */}

            {/* Amount Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Amount'
                placeholderTextColor="#A9A9A9"
                value={fieldRefAmount.amount == null ? '' : fieldRefAmount.amount}
                editable={false}

                returnKeyType="done" />

            {/* <View style={{ backgroundColor: 'black', height: 1, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* Amount End */}

        </>
    )

}

// Per Day Component
const ComponentForPer_Day = ({ templateCategoriesFields, receiveAmountValue, fieldRefAmount, templateStoreRef, selectTypeFunc, valueFunc, userInputFunc, TemplateCatagoryFieldIdAndFieldNameFunc, TemplateCatagoryFieldValueFunc }) => {

    const [showDropdown, setshowDropdown] = useState(false)

    //let fieldName = data.fieldName

    const [DropDownTitle, setDropDownTitle] = useState(templateStoreRef.selectType != '' ? templateStoreRef.selectType : null)
    const [DropDownValue, setDropDownValue] = useState(templateStoreRef.value != '' ? templateStoreRef.value : '')
    const [TextValue, setTextValue] = useState(templateStoreRef.userInputVal != '' ? templateStoreRef.userInputVal : '')




    return (
        <>
            {/* // DropDown Start Here */}
            <View style={{ marginBottom: 16 }}>

                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 16,
                        fontSize: 13,
                        marginTop: 8,
                        marginBottom: 6,
                        color: 'black'
                    }}>
                    {String('Select Type')}
                </Text>

                {/* <TouchableOpacity style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#e2e6f8',
                    padding: 8,
                    width: '90%',
                    height: 40,
                    alignSelf: 'center',
                    // borderRadius: 22,
                    //minHeight: 42,
                    borderRadius: 25, borderBottomEndRadius: showDropdown ? 0 : 25, borderBottomStartRadius: showDropdown ? 0 : 25, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', borderBottomWidth: showDropdown ? 0 : 1
                }}
                    activeOpacity={0.8}
                    onPress={() => { setshowDropdown(!showDropdown) }}>

                    <Text> {DropDownTitle == null ? 'Select Type' : DropDownTitle}
                    </Text>

                    <Image style={{ transform: [{ rotate: showDropdown ? '180deg' : '0deg' }], marginRight: 5, width: 15, height: 15, resizeMode: 'contain' }} source={require('../../images/downArrow.png')} />

                </TouchableOpacity> */}


                <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 100, width: '90%', alignSelf: 'center' }} horizontal
                    showsHorizontalScrollIndicator={false} >

                    {



                        templateCategoriesFields.map((val, i) => {

                            return (

                                <TouchableOpacity style={{ alignSelf: 'center', padding: 12, backgroundColor: DropDownTitle == val.fieldName ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 3, marginRight: 7 }} key={String(i)}
                                    onPress={() => {
                                        // receiveValueDropDown(val, fieldName, index)
                                        setshowDropdown(false)
                                        selectTypeFunc(val.fieldName)
                                        valueFunc(val.fieldValue)
                                        TemplateCatagoryFieldIdAndFieldNameFunc(val.templateFieldId, val.fieldName)
                                        setDropDownTitle(val.fieldName)
                                        setDropDownValue(val.fieldValue)

                                    }}
                                >
                                    <Text allowFontScaling={false} style={{
                                        color: DropDownTitle == val.fieldName ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                        fontSize: 13,
                                    }}>
                                        {val.fieldName}
                                    </Text>
                                </TouchableOpacity>

                            )


                        })




                    }

                </ScrollView>

            </View>
            {/* // DropDown End Here */}

            {/* //Distance Tab Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45, marginTop: 8,
                    paddingLeft: 8,
                    color: 'black',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: 1,
                    marginBottom: 10
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Quantity'
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    if (DropDownTitle == null) {
                        Alert.alert('Please Select Type')
                        return;
                    }
                    userInputFunc(text)
                    TemplateCatagoryFieldValueFunc(text)
                    setTextValue(text)
                    receiveAmountValue(String(DropDownValue * text))
                }}
                returnKeyType="done"
                keyboardType='number-pad'
            />

            {/* <View style={{ backgroundColor: 'black', height: 0.5, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* //Distance Tab End */}

            {/* Rate Text Start */}
            <Text allowFontScaling={false} style={{
                color: 'black',
                fontFamily: Constant.MontserratMedium,
                fontSize: 13,
                paddingLeft: 20,
                marginBottom: 20
            }}>Rate Per Day: {DropDownValue} </Text>
            {/* Rate Text End */}

            {/* Amount Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Amount'
                placeholderTextColor="#A9A9A9"
                value={fieldRefAmount.amount == null ? '' : fieldRefAmount.amount}
                editable={false}

                returnKeyType="done" />

            {/* <View style={{ backgroundColor: 'black', height: 1, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* Amount End */}

        </>
    )

}

//Distance Component
const ComponentForDistance = ({ templateCategoriesFields, receiveAmountValue, fieldRefAmount, templateStoreRef, selectTypeFunc, valueFunc, userInputFunc, TemplateCatagoryFieldIdAndFieldNameFunc, TemplateCatagoryFieldValueFunc, authDict = {} }) => {

    const [showDropdown, setshowDropdown] = useState(false)

    //let fieldName = data.fieldName

    const [DropDownTitle, setDropDownTitle] = useState(templateStoreRef.selectType != '' ? templateStoreRef.selectType : null)
    const [DropDownValue, setDropDownValue] = useState(templateStoreRef.value != '' ? templateStoreRef.value : '')
    const [TextValue, setTextValue] = useState(templateStoreRef.userInputVal != '' ? templateStoreRef.userInputVal : '')




    return (
        <>
            {/* // DropDown Start Here */}
            <View style={{ marginBottom: 16 }}>

                {/* <TouchableOpacity style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#e2e6f8',
                    padding: 8,
                    width: '90%',
                    height: 40,
                    alignSelf: 'center',
                    // borderRadius: 22,
                    //minHeight: 42,
                    borderRadius: 25, borderBottomEndRadius: showDropdown ? 0 : 25, borderBottomStartRadius: showDropdown ? 0 : 25, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', borderBottomWidth: showDropdown ? 0 : 1
                }}
                    activeOpacity={0.8}
                    onPress={() => { setshowDropdown(!showDropdown) }}>

                    <Text> {DropDownTitle == null ? 'Select Type' : DropDownTitle}
                    </Text>

                    <Image style={{ transform: [{ rotate: showDropdown ? '180deg' : '0deg' }], marginRight: 5, width: 15, height: 15, resizeMode: 'contain' }} source={require('../../images/downArrow.png')} />

                </TouchableOpacity> */}
                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 16,
                        fontSize: 13,
                        marginTop: 8,
                        marginBottom: 6,
                        color: 'black'
                    }}>
                    {String('Select Type')}
                </Text>

                <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 100, width: '90%', alignSelf: 'center' }} horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {



                        templateCategoriesFields.map((val, i) => {

                            return (

                                <TouchableOpacity style={{ alignSelf: 'center', padding: 12, backgroundColor: DropDownTitle == val.fieldName ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 3, marginRight: 7 }} key={String(i)}
                                    onPress={() => {
                                        // receiveValueDropDown(val, fieldName, index)
                                        setshowDropdown(false)
                                        selectTypeFunc(val.fieldName)
                                        valueFunc(val.fieldValue)
                                        TemplateCatagoryFieldIdAndFieldNameFunc(val.templateFieldId, val.fieldName)
                                        setDropDownTitle(val.fieldName)
                                        setDropDownValue(val.fieldValue)
                                    }}
                                >
                                    <Text allowFontScaling={false} style={{
                                        color: DropDownTitle == val.fieldName ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                        fontSize: 13,
                                    }}>
                                        {val.fieldName}
                                    </Text>
                                </TouchableOpacity>

                            )


                        })




                    }

                </ScrollView>

            </View>
            {/* // DropDown End Here */}

            {/* //Distance Tab Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45, marginTop: 5,
                    paddingLeft: 8,

                    alignSelf: 'center',
                    backgroundColor: 'white',
                    opacity: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    color: 'black'
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Distance'
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    if (DropDownTitle == null) {
                        Alert.alert('Please Select Type')
                        return;
                    }

                    console.log(authDict, HPAdhesivestenantId);
                    // console.log(typeof text);

                    if (authDict?.tanentId == HPAdhesivestenantId) {

                        if (parseInt(text) > 240) {
                            Alert.alert("",'Distance cannot be greater than 240')
                            userInputFunc('240')
                            TemplateCatagoryFieldValueFunc('240')
                            setTextValue('240')
                            receiveAmountValue(String(DropDownValue * '240'))
                            return;
                        }
                    }




                    userInputFunc(text)
                    TemplateCatagoryFieldValueFunc(text)
                    setTextValue(text)
                    receiveAmountValue(String(DropDownValue * text))
                }}
                returnKeyType="done"
                keyboardType='number-pad'
            />

            {/* <View style={{ backgroundColor: 'black', height: 0.5, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* //Distance Tab End */}

            {/* Rate Text Start */}
            <Text allowFontScaling={false} style={{
                color: 'black',
                fontFamily: Constant.MontserratMedium,
                fontSize: 13,
                paddingLeft: 20,
                marginBottom: 20
            }}>Rate per Km: {DropDownValue} </Text>
            {/* Rate Text End */}

            {/* Amount Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Amount'
                placeholderTextColor="#A9A9A9"
                value={fieldRefAmount.amount == null ? '' : fieldRefAmount.amount}
                editable={false}

                returnKeyType="done" />
            {/* <View style={{ backgroundColor: 'black', height: 1, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* Amount End */}

        </>
    )

}

const ComponentForDistanceForToll = ({ templateCategoriesFields, receiveAmountValue, fieldRefAmount, templateStoreRef, selectTypeFunc, valueFunc, userInputFunc, TemplateCatagoryFieldIdAndFieldNameFunc, TemplateCatagoryFieldValueFunc, authDict = {} }) => {



    const [showDropdown, setshowDropdown] = useState(false)

    //let fieldName = data.fieldName

    const [DropDownTitle, setDropDownTitle] = useState(templateStoreRef.selectType != '' ? templateStoreRef.selectType : null)
    const [DropDownValue, setDropDownValue] = useState(templateStoreRef.value != '' ? templateStoreRef.value : '')
    const [TextValue, setTextValue] = useState(templateStoreRef.userInputVal != '' ? templateStoreRef.userInputVal : '')

    const [tollValue, settollValue] = useState(fieldRefAmount.amount - (TextValue * DropDownValue))

    const [amountValue, setamountValue] = useState()

    const [isCar, setisCar] = useState(templateStoreRef?.selectType == "Car")

    console.log('ComponentForDistanceForToll', templateStoreRef);

    // useEffect(() => {

    //     setamountValue(DropDownValue * TextValue)

    // }, [TextValue, DropDownValue])

    function handleNaN(val) {

        if(String(val) == 'NaN'){
            return '0'
        }
        else{
            return val
        }
        
    }




    return (
        <>
            {/* // DropDown Start Here */}
            <View style={{ marginBottom: 16 }}>

                {/* <TouchableOpacity style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#e2e6f8',
                    padding: 8,
                    width: '90%',
                    height: 40,
                    alignSelf: 'center',
                    // borderRadius: 22,
                    //minHeight: 42,
                    borderRadius: 25, borderBottomEndRadius: showDropdown ? 0 : 25, borderBottomStartRadius: showDropdown ? 0 : 25, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', borderBottomWidth: showDropdown ? 0 : 1
                }}
                    activeOpacity={0.8}
                    onPress={() => { setshowDropdown(!showDropdown) }}>

                    <Text> {DropDownTitle == null ? 'Select Type' : DropDownTitle}
                    </Text>

                    <Image style={{ transform: [{ rotate: showDropdown ? '180deg' : '0deg' }], marginRight: 5, width: 15, height: 15, resizeMode: 'contain' }} source={require('../../images/downArrow.png')} />

                </TouchableOpacity> */}
                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 16,
                        fontSize: 13,
                        marginTop: 8,
                        marginBottom: 6,
                        color: 'black'
                    }}>
                    {String('Select Type')}
                </Text>

                <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 100, width: '90%', alignSelf: 'center' }} horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {



                        templateCategoriesFields.map((val, i) => {

                            return (

                                <TouchableOpacity style={{ alignSelf: 'center', padding: 12, backgroundColor: DropDownTitle == val.fieldName ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 3, marginRight: 7 }} key={String(i)}
                                    onPress={() => {
                                        // receiveValueDropDown(val, fieldName, index)
                                        setshowDropdown(false)
                                        selectTypeFunc(val.fieldName)
                                        valueFunc(val.fieldValue)
                                        TemplateCatagoryFieldIdAndFieldNameFunc(val.templateFieldId, val.fieldName)
                                        setDropDownTitle(val.fieldName)
                                        setDropDownValue(val.fieldValue)
                                        console.log('props', { templateCategoriesFields, receiveAmountValue, fieldRefAmount, templateStoreRef, selectTypeFunc, valueFunc, userInputFunc, TemplateCatagoryFieldIdAndFieldNameFunc, TemplateCatagoryFieldValueFunc, authDict });

                                        setisCar(val.fieldName == "Car")

                                        // Updated
                                        settollValue(0)
                                        userInputFunc('')
                                        TemplateCatagoryFieldValueFunc('')

                                        receiveAmountValue(0)
                                        setTextValue('')
                                    }}
                                >
                                    <Text allowFontScaling={false} style={{
                                        color: DropDownTitle == val.fieldName ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                        fontSize: 13,
                                    }}>
                                        {val.fieldName}
                                    </Text>
                                </TouchableOpacity>

                            )


                        })




                    }

                </ScrollView>

            </View>
            {/* // DropDown End Here */}

            {/* //Distance Tab Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45, marginTop: 5,
                    paddingLeft: 8,

                    alignSelf: 'center',
                    backgroundColor: 'white',
                    opacity: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    color: 'black'
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Distance'
                placeholderTextColor="#A9A9A9"
                value={TextValue}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    if (DropDownTitle == null) {
                        Alert.alert('Please Select Type')
                        return;
                    }

                    console.log(authDict, HPAdhesivestenantId);
                    // console.log(typeof text);

                    if (authDict?.tanentId == HPAdhesivestenantId) {

                        if (parseInt(text) > 240) {
                            Alert.alert("",'Distance cannot be greater than 240')
                            userInputFunc('240')
                            TemplateCatagoryFieldValueFunc('240')
                            setTextValue('240')
                            receiveAmountValue(String(parseInt(DropDownValue * '240') + parseInt(handleNaN(tollValue))))
                            return;
                        }
                    }




                    userInputFunc(text)
                    TemplateCatagoryFieldValueFunc(text)

                    receiveAmountValue(String(parseInt(DropDownValue * text) + parseInt(handleNaN(tollValue))))
                    setTextValue(text)
                }}
                returnKeyType="done"
                keyboardType='number-pad'
            />

            {/* <View style={{ backgroundColor: 'black', height: 0.5, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* //Distance Tab End */}

            {/* Rate Text Start */}
            <Text allowFontScaling={false} style={{
                color: 'black',
                fontFamily: Constant.MontserratMedium,
                fontSize: 13,
                paddingLeft: 20,
                marginBottom: 20
            }}>Rate per Km: {DropDownValue} </Text>
            {/* Rate Text End */}

            {/* Amount Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Amount'
                placeholderTextColor="#A9A9A9"
                // value={DropDownTitle != "Car" ? (fieldRefAmount.amount == null ? '' : fieldRefAmount.amount) : amountValue}
                value={String(TextValue * DropDownValue)}
                editable={false}

                returnKeyType="done" />

            {/* Toll Amount Start */}

            {isCar && <>
                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratMedium,
                        paddingLeft: 16,
                        fontSize: 13,
                        marginTop: 8,
                        marginBottom: 1,
                        color: 'black'
                    }}>
                    {String('Toll Amount:')}
                </Text>
                <TextInput allowFontScaling={false}

                    onChangeText={(text) => {

                        if (fieldRefAmount.amount == null && fieldRefAmount.amount == '') {
                            Alert.alert("","First Enter Distance !")
                            return
                        }

                        receiveAmountValue(String(parseInt(fieldRefAmount.amount) + (templateStoreRef.value * templateStoreRef.userInputVal)))
                        receiveAmountValue(String(parseInt(DropDownValue * TextValue) + parseInt(handleNaN(text))))
                        settollValue(text)

                    }}
                    style={{
                        width: '90%', height: 45,
                        // marginTop: 8,
                        paddingLeft: 8, color: 'black', alignSelf: 'center',
                        backgroundColor: 'white', borderRadius: 10,
                        opacity: 1,
                        top: 5,
                        marginBottom: 20,
                    }}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder='Toll Amount'
                    placeholderTextColor="#A9A9A9"
                    value={String(tollValue)}
                    // editable={false}

                    returnKeyType="done" />
            </>
            }
            {/* Toll Amount End */}
            {/* <View style={{ backgroundColor: 'black', height: 1, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* Amount End */}

        </>
    )

}


// Date Component For Date Range

const ComponentForDateRange = ({ templateCategoriesField, receiveFromDate, indexFromDate, receiveToDate, indexToDate, amountReceive, fieldRefFromDate, fieldRefToDate, fieldRefAmount, canEmpInsertTotalExpenseAmount }) => {


    // var firstDate;
    // var secondDate;

    const dateTemplateFieldValue = templateCategoriesField[0].fieldValue;

    const [firstDate, setfirstDate] = useState(fieldRefFromDate.fieldValue == '' ? null : editFirstDate())
    const [secondDate, setsecondDate] = useState(fieldRefToDate.fieldValue == '' ? null : editSecondDate())
    const [label1, setlabel1] = useState(null)
    const [label2, setlabel2] = useState(null)
    const [showFirstDatePicker, setshowFirstDatePicker] = useState(false)
    const [showSecondDatePicker, setshowSecondDatePicker] = useState(false)
    const [Days, setDays] = useState(printDays())

    const [update, setupdate] = useState(false)

    function editFirstDate() {

        let date1 = String(fieldRefFromDate.fieldValue);
        let date1Array = date1.split('-');
        let Date1Compile = new Date(date1Array[0], date1Array[1] - 1, date1Array[2]);
        return Date1Compile;
    }

    function editSecondDate() {

        let date2 = String(fieldRefToDate.fieldValue);
        let date2Array = date2.split('-');
        let Date2Compile = new Date(date2Array[0], date2Array[1] - 1, date2Array[2]);
        return Date2Compile;
    }

    function calculateAmountDate(DateLabel, DateArray) {
        const oneDay = 24 * 60 * 60 * 1000;
        //const str = 'undefined';

        if (DateLabel == "From Date") {
            let fDate = new Date(DateArray[0], DateArray[1] - 1, DateArray[2]);
            setfirstDate(fDate);
            // console.log('firstdate ', fDate);
            // console.log('secondDate ', typeof secondDate , ' ', secondDate);

            if (secondDate == null) { }

            else {
                const diffDays = Math.round(Math.abs((fDate - secondDate) / oneDay)) + 1;


                // console.log('FirstD: ',typeof fDate, fDate, 'secondD: ', secondDate);
                console.log(diffDays, '  ', DateLabel);
                setDays(String(diffDays));
                // receiveValueTextField(diffDays * dateTemplateFieldValue, 'amount', amountIndex)
                // console.log('From Date', amountReceive = String(diffDays * dateTemplateFieldValue)); 
                if (canEmpInsertTotalExpenseAmount) {
                    amountReceive('')
                }

                else {
                    amountReceive(String(diffDays * dateTemplateFieldValue))
                }
            }
        }

        else if (DateLabel == "To Date") {
            let sDate = new Date(DateArray[0], DateArray[1] - 1, DateArray[2]);
            setsecondDate(sDate);
            // console.log('secondDate ', sDate);
            // console.log('firstdate ', firstDate);

            if (firstDate == null) { }

            else {
                const diffDays = Math.round(Math.abs((firstDate - sDate) / oneDay) + 1);
                // console.log(typeof secondDate, secondDate);
                console.log(diffDays, '  ', DateLabel);
                setDays(String(diffDays));
                // receiveValueTextField(diffDays * dateTemplateFieldValue, 'amound', amountIndex)
                // console.log('To Date', amountReceive = String(diffDays * dateTemplateFieldValue)); 
                if (canEmpInsertTotalExpenseAmount) {
                    amountReceive('')
                }

                else {
                    amountReceive(String(diffDays * dateTemplateFieldValue))
                }
            }
        }

        // hours*minutes*seconds*milliseconds


    }

    function printDays() {


        if (fieldRefFromDate.fieldValue == '') {
            return '';
        }

        else if (fieldRefToDate.fieldValue == '') {
            return '';
        }

        else {
            const oneDay = 24 * 60 * 60 * 1000;

            let date1 = String(fieldRefFromDate.fieldValue);
            let date2 = String(fieldRefToDate.fieldValue);

            let date1Array = date1.split('-');
            let dateA2rray = date2.split('-');

            let Date1Compile = new Date(date1Array[0], date1Array[1] - 1, date1Array[2]);
            let Date2Compile = new Date(dateA2rray[0], dateA2rray[1] - 1, dateA2rray[2]);

            const diffDays = Math.round(Math.abs((Date1Compile - Date2Compile) / oneDay)) + 1;

            return String(diffDays)



        }

    }



    return (
        <>
            {/* From Date Start */}
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 8,
                }}>
                {'From Date:'}
            </Text>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    top: 5,
                    height: 45,
                    borderRadius: 10,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 20,
                    alignSelf: 'center',
                    opacity: 1,
                }}
                onPress={() => {
                    setshowFirstDatePicker(true)

                }
                }>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: '#A4A4A4',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                    }}>
                    {fieldRefFromDate.fieldValue != '' ? fieldRefFromDate.fieldValue : "From Date"}
                </Text>

                <Image
                    source={require('../../images/calendar_new_icon.png')}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 12,

                    }} />
            </TouchableOpacity>

            <DateTimePicker
                titleIOS=""
                isVisible={showFirstDatePicker}
                onConfirm={(date) => {

                    const momentDate = Moment(date.toISOString());
                    let pickedDt = Moment(momentDate).format('YYYY-MM-DD');
                    const dateArray = pickedDt.split('-')

                    calculateAmountDate('From Date', dateArray)

                    receiveFromDate(pickedDt, indexFromDate, 'From Date');
                    setlabel1(pickedDt);
                    setshowFirstDatePicker(false)

                }}
                onCancel={() => {
                    setshowFirstDatePicker(false);
                }}
                mode='date'
            />
            {/* From Date End */}

            {/* To Date Start  */}

            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    paddingLeft: 16,
                    fontSize: 13,
                    marginTop: 15,
                }}>
                {'To Date:'}
            </Text>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    top: 5,
                    height: 45,
                    borderRadius: 10,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 20,
                    alignSelf: 'center',
                    opacity: 1,

                    // marginTop: 10
                }}
                onPress={() => {
                    setshowSecondDatePicker(true)

                }
                }>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: '#A4A4A4',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                    }}>
                    {fieldRefToDate.fieldValue != '' ? fieldRefToDate.fieldValue : "To Date"}
                </Text>

                <Image
                    source={require('../../images/calendar_new_icon.png')}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 12,

                    }} />
            </TouchableOpacity>

            <DateTimePicker
                titleIOS=""
                isVisible={showSecondDatePicker}
                onConfirm={(date) => {

                    const momentDate = Moment(date.toISOString());
                    let pickedDt = Moment(momentDate).format('YYYY-MM-DD');
                    const dateArray = pickedDt.split('-')

                    calculateAmountDate('To Date', dateArray)

                    receiveToDate(pickedDt, indexToDate, 'To Date');
                    setlabel2(pickedDt);
                    setshowSecondDatePicker(false)


                }}
                onCancel={() => {
                    setshowSecondDatePicker(false);
                }}
                mode='date'
            />

            {/* To Date End  */}



            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45, marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: 1,
                    marginBottom: 10
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                //placeholder={'j'}
                // placeholderTextColor="black"
                editable={false}
                value={Days}
                placeholder={'Days'}
                // onChangeText={(text) => setTextValue(text)}
                // onChangeText={(text) => {
                //     setDays(text)
                //     receiveValueTextField(text, fieldName, FieldIndex)
                // }}
                returnKeyType="done"
                keyboardType='number-pad'
            />
            {/* <Button
                title='test'
                onPress={() => {
                    //setDays('566')
                    console.log(Days);
                }} /> */}

            {/* <View style={{ backgroundColor: 'black', height: 0.5, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}

            <Text allowFontScaling={false} style={{
                color: 'black',
                fontFamily: Constant.MontserratMedium,
                fontSize: 13,
                paddingLeft: 20,
                marginBottom: 20
            }}>Rate per day: {dateTemplateFieldValue} </Text>

            {/* Amound Start */}
            <TextInput allowFontScaling={false}
                style={{
                    width: '90%', height: 45,
                    // marginTop: 8,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 20,
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder='Amount'
                placeholderTextColor="#A9A9A9"
                value={fieldRefAmount.amount}
                editable={canEmpInsertTotalExpenseAmount}
                onChangeText={(text) => {

                    if (text > (Days * dateTemplateFieldValue)) {

                        Alert.alert("","Warning", "Amount should not exceed the daily limit " + String(dateTemplateFieldValue))

                        amountReceive("")
                        setupdate(!update)


                    } else {

                        amountReceive(text)
                        setupdate(!update)
                    }
                }}

                returnKeyType="done"
                keyboardType='number-pad'
            />

            {/* <View style={{ backgroundColor: 'black', height: 1, width: '90%', alignSelf: 'center', opacity: 1, marginBottom: 10 }}>
            </View> */}
            {/* Amound End */}
        </>
    )
}

// FlatList Card
const Card = ({ expenseName, expenseIncurredDate, amount, isReImbursable, isBillable, index, editButton, deleteButton, }) => {


    return (

        <View style={styles.pendingCardView2}>

            <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

                {/* <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/expenses.png')}></Image> */}

                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1, marginLeft: 1 }}>{expenseName}</Text>


                <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

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
                </TouchableOpacity>

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
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{expenseIncurredDate}</Text>

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
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}> {isReImbursable ? 'Yes' : 'No'}</Text>

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





const ProAddExpense = (props) => {

    let increment = 0



    const [demoModal, setdemoModal] = useState(false)



    // const [tenantId, settenantId] = useState("")

    //const InintialTextValue = useRef(null)

    const [navTitle, setnavTitle] = useState('Add New Expense Report')

    const [authDict, setauthDict] = useState({})

    const [isLoading, setisLoading] = useState(false)

    let [ExpTitle, setExpTitle] = useState(null)

    let [empcode, setempcode] = useState(null)

    const [advanceAmount, setadvanceAmount] = useState('0')

    const [showadvanceAmount, setshowadvanceAmount] = useState(false)

    const [expenseArr, setexpenseArr] = useState([])
    const [isView, setisView] = useState(false)
    const [detailsKeyArr, setdetailsKeyArr] = useState([])
    const [detailsValueArr, setdetailsValueArr] = useState([])

    // const [empCode, setemployeeCode] = useState(second)

    const [isModelVisible, setisModelVisible] = useState(false)

    const [isDeleteModelVisible, setisDeleteModelVisible] = useState(false)

    const [isEditModelVisible, setisEditModelVisible] = useState(false)
    // const [selectedValue, setSelectedValue] = useState("java");

    const [isErrorinExpense, setisErrorinExpense] = useState(false)

    const [ErrorinExpense, setErrorinExpense] = useState([])

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //     { label: 'Accomodation', value: 'Accomodation' },
    //     { label: 'Convienience', value: 'Convienience' },
    //     { label: 'Distance', value: 'Distance' },
    //     { label: 'Hotel Claim', value: 'Hotel Claim' },
    //     { label: 'Per Day', value: 'Per Day' }
    // ]);



    const [isEndDateTimePickerVisible, setisEndDateTimePickerVisible] = useState(false);
    const [isHalfDayDateTimePickerVisible, setisHalfDayDateTimePickerVisible] = useState(false);





    const [intime, setintime] = useState('')
    const [outtime, setouttime] = useState('')
    const [siname, setsiname] = useState('')
    const [endCustName, setendCustName] = useState('')
    const [fromLocation, setfromLocation] = useState('')
    const [toLocation, settoLocation] = useState('')

    const [dropHeight, setdropHeight] = useState(100)
    // const [fromLocation, setfromLocation] = useState('')


    // To Run API
    const [apirun, setapirun] = useState(false)


    // --------------------- For MyDropDwon ---------------------
    const [showDropdown, setshowDropdown] = useState(false)
    // --------------------- For MyDropDwon ---------------------


    // For Expenses Data --------------------------------


    const [expensecategories, setexpensecategories] = useState([])
    const [selectedExpenseCategory, setselectedExpenseCategory] = useState(null)

    let [expenseTemplateCategoryId, setexpenseTemplateCategoryId] = useState(0)
    let [isIncurredDatePickerVisible, setisIncurredDatePickerVisible] = useState(false);
    let [incurredDate, setincurredDate] = useState('')

    const [editIndexStore, seteditIndexStore] = useState({
        index: null
    })





    let [amount, setamount] = useState('')
    let [amountDate_Range, setamountDate_Range] = useState('')
    let [amountDistance, setamountDistance] = useState('')
    let [amountPer_Day, setamountPer_Day] = useState('')
    let [amountTime, setamountTime] = useState('')
    let [Reimbursable, setReimbursable] = useState(false)
    let [Billable, setBillable] = useState(false)
    let [reason, setreason] = useState('')
    let [reasonDate_Range, setreasonDate_Range] = useState('')
    let [reasonDistance, setreasonDistance] = useState('')
    let [reasonPer_Day, setreasonPer_Day] = useState('')
    let [reasonTime, setreasonTime] = useState('')

    let [expenseAttachment, setexpenseAttachment] = useState(null)
    let [expenseAttachmentId, setexpenseAttachmentId] = useState(null)
    const [expenseComments, setexpenseComments] = useState(null)
    const [quantity, setquantity] = useState(null)
    const [distance, setistance] = useState(null)
    const [hour, sethour] = useState(null)
    const [expensesCategoryFieldList, setexpensesCategoryFieldList] = useState([])
    let [tempDropDown, settempDropDown] = useState([])
    const [categoryId, setcategoryId] = useState(null)
    const [rate, setrate] = useState(null)
    const [days, setdays] = useState(null)


    // Dynamic Fields --------------

    const [isDatePickerComponent, setisDatePickerComponent] = useState(false)
    const [DateComponentIndex, setDateComponentIndex] = useState(null)

    const [expenseFieldTemplate, setexpenseFieldTemplate] = useState(

        {
            "expensesFieldId": 0,
            "fieldName": "",
            "fieldValue": ""
        }

    )

    // let [expenseMainPayload, setexpenseMainPayload] = useState(
    //     {
    //         'advanceAmount': 0,
    //         'empCode': empcode,
    //         'expenseReportName': ExpTitle,
    //         'expenseList' : null

    //     }
    // )


    let [expensesFieldList, setexpensesFieldList] = useState([

        // {
        //     "expensesFieldId": 0,
        //      "fieldId": 0
        //     "fieldName": "Service",
        //     "fieldValue": "Ola"
        // }

    ])

    let [expensesFieldListValidation, setexpensesFieldListValidation] = useState([

        // {
        //     isMandatoryForSubmission : true
        // }

    ])

    let [expenseList, setexpenseList] = useState([

        // {
        //     'amount': amount,
        //     'expenseAttachment': null,
        //     'expenseAttachmentId': null,
        //     'expenseName': '',
        //     'expensesFieldList': [],
        //     'isBillable': false,
        //     'isReImbursable': false,
        //     'templateCategoryId': 0,
        //     'expensesId': 0

        // }
    ])


    let [expenseListTemp, setexpenseListTemp] = useState({

        'amount': null,
        'expenseAttachment': null,
        'expenseAttachmentId': null,
        'expenseIncurredDate': null,
        'expenseName': '',
        'expenseReason': '',
        'isBillable': false,
        'isReImbursable': false,
        'templateCategoryId': null,
        'expensesId': 0

    })


    let [FieldListArray, setFieldListArray] = useState([])

    // -------------- Dynamic Fields 



    // ------------------------------For Expenses Data


    //------------ For Expense Card

    const [expensesId, setexpensesId] = useState(1)

    let [ExpenseData, setExpenseData] = useState([

        // {

        //     id: 1,
        //     expenseName: 'Test',
        //     expenseIncurredDate: '12-04-2022',
        //     amount: 0,
        //     isReImbursable: false,
        //     isBillable: false,

        // },

    ])

    let [templateCatStore, settemplateCatStore] = useState({

        'selectType': '',
        'value': '',
        'userInputVal': ''

    })


    let [ExpenseDataEdit, setExpenseDataEdit] = useState([])
    //------------ For Expense Card-----------------

    const [updateFlatList, setupdateFlatList] = useState(1)


    let [expensesFieldListEdit, setexpensesFieldListEdit] = useState([])

    let [FieldListArrayEdit, setFieldListArrayEdit] = useState([])

    // let [expensesFieldListAndFieldListArray, setexpensesFieldListAndFieldListArray] = useState({
    //             ExpenseFieldArrays: [],
    //             FieldListArrays: []
    // })

    let [ExpenseFieldArrays, setExpenseFieldArrays] = useState([])
    let [FieldListArrays, setFieldListArrays] = useState([])

    let [expenseListTempArray, setexpenseListTempArray] = useState([])

    let [expensesFieldListValidationArray, setexpensesFieldListValidationArray] = useState([])

    let [templateCatStoreArray, settemplateCatStoreArray] = useState([])

    let [expenseTemplateCategoryFieldValueList, setexpenseTemplateCategoryFieldValueList] = useState([

        // {
        //     "templateCatagoryFieldId": templateFieldId,
        //     "catagoryId": expenseTemplateCategoryId,
        //     "expenseTemplateCatagoryFieldValueId": 0,
        //     "fieldName": "",
        //     "fieldValue": 0
        // }

    ])




    // date: '',
    //   authDict:{},
    //   isLoading: false,
    //   expenseArr: [],
    //   isView: false,
    //   detailsKeyArr:[],
    //   detailsValueArr:[],

    // const hideMenu = () => setVisible(false);
    // const showMenu = () => {
    //     console.log("show1")
    //     setVisible(true);
    // }


    function showIncurredDatePicker() {

        isIncurredDatePickerVisible = true

    }

    function hideIncurredDatePicker() {


        isIncurredDatePickerVisible = !isIncurredDatePickerVisible
        console.log("hide");
    }


    function CancelIncurredDatePicker() {

        console.log("Cancel Button Pressed");
        isIncurredDatePickerVisible = false
    }






    //------------------------------------




    const [visible, setVisible] = useState(false);



    //Card FlatList Render

    const renderItem = ({ item }) => {

        if (typeof item != 'undefined') {

            console.log('jjjjjjjjj');
            return (

                <Card expenseName={item.expenseName}
                    expenseIncurredDate={item.expenseIncurredDate}
                    amount={item.amount}
                    isBillable={item.isBillable}
                    isReImbursable={item.isReImbursable}
                    editButton={item.editButton}
                    deleteButton={item.deleteButton}
                    index={item.index}
                />
            )
        }
        else {
            console.log('jjjjjjjjj');
            return (<></>)
        }


    }


    const renderFieldList = ({ item }) => {

        return item;

    };

    const renderFieldListEdit = ({ item }) => {

        return item;

    };


    const editButtonClick = (index) => {

        setexpenseListTemp(expenseListTempArray[index])
        setexpensesFieldList(ExpenseFieldArrays[index])
        setFieldListArrayEdit(FieldListArrays[index])
        setExpenseDataEdit(ExpenseData[index])
        setexpensesFieldListValidation(expensesFieldListValidationArray[index])

        setexpenseTemplateCategoryFieldValueList(expenseList[index].expenseTemplateCategoryFieldValueList)

        settemplateCatStore(templateCatStoreArray[index])

        console.log(templateCatStore)

        setisEditModelVisible(true)
        console.log('ExpenseFieldArrays', ExpenseFieldArrays);
        console.log('editButtonClick', index);
        editIndexStore.index = index
        console.log('expenselist', expenseList);
        console.warn(editIndexStore.index);




    }


    const deleteButtonClick = (index) => {

        delete ExpenseFieldArrays[index]
        delete FieldListArrays[index]
        delete ExpenseData[index]
        delete expenseList[index]
        delete expensesFieldListValidationArray[index]

        console.log('deleteButtonClick', index);
        setisDeleteModelVisible(true)
        console.log('expenselist', expenseList);

    }




    // Testing Functions--------------


    // function cameraOn(params) {
    //     launchCamera({ cameraType: 'back' }, (response) => {
    //         console.log('camera res', response);
    //     });
    // }


    //----------------Testing Functions



    //Card FlatList

    const ExpenseModelSubmit = () => {

        let check = selectedExpenseCategory

        if (check == null) {
            return;
        }

        if (expenseListTemp.amount == null) {
            Alert.alert("","Please fill Expense Amount");
            Vibration.vibrate()
            return;
        }

        if (expenseListTemp.amount == '') {
            Alert.alert("","Please fill Expense Amount");
            Vibration.vibrate()
            return;
        }

        if (expenseListTemp.expenseIncurredDate == null) {
            Alert.alert("","Please fill Incurred Date");
            Vibration.vibrate()
            return;
        }

        if (!expenseListTemp.isBillable && !expenseListTemp.isReImbursable) {

            Alert.alert("","Please select atleast one Reimbursable or Billable");
            return;

        }

        console.log(expensesFieldListValidation);

        for (let ind = 0; ind < expensesFieldListValidation.length; ind++) {
            const element = expensesFieldListValidation[ind];
            if (element.isMandatoryForSubmission) {

                if (expensesFieldList[ind].fieldValue == '') {

                    Alert.alert("","Please fill " + expensesFieldList[ind].fieldName);
                    Vibration.vibrate()
                    return;
                }

            }

        }

        //console.log('after submitting', reason, 'data', expensesFieldList, '');
        let ExpenseType = selectedExpenseCategory.expenseType

        // if (ExpenseType == 'Date_Range') {

        //     let submitData = {

        //         'amount': amountDate_Range,
        //         'expenseAttachment': expenseAttachment,
        //         'expenseAttachmentId': expenseAttachmentId,
        //         'expenseIncurredDate': incurredDate,
        //         'expenseName': selectedExpenseCategory.expenseName,
        //         'expenseReason': reasonDate_Range,
        //         'expensesFieldList': expensesFieldList,
        //         'isBillable': Billable,
        //         'isReImbursable': Reimbursable,
        //         'templateCategoryId': expenseTemplateCategoryId,
        //         'expensesId': 0

        //     }

        //     console.log(submitData);

        //     expenseList.push(submitData);

        //     console.log(expenseList);

        //     ExpenseData.push({

        //         id: expensesId,
        //         expenseName: selectedExpenseCategory.expenseName,
        //         expenseIncurredDate: incurredDate,
        //         amount: amountDate_Range,
        //         isReImbursable: Reimbursable,
        //         isBillable: Billable,

        //     })

        // }

        // else if (ExpenseType == 'Distance') {

        //     let submitData = {

        //         'amount': amountDistance,
        //         'expenseAttachment': expenseAttachment,
        //         'expenseAttachmentId': expenseAttachmentId,
        //         'expenseIncurredDate': incurredDate,
        //         'expenseName': selectedExpenseCategory.expenseName,
        //         'expenseReason': reasonDistance,
        //         'expensesFieldList': expensesFieldList,
        //         'isBillable': Billable,
        //         'isReImbursable': Reimbursable,
        //         'templateCategoryId': expenseTemplateCategoryId,
        //         'expensesId': 0

        //     }



        //     console.log(submitData);

        //     expenseList.push(submitData);

        //     console.log(expenseList);

        //     ExpenseData.push({

        //         id: expensesId,
        //         expenseName: selectedExpenseCategory.expenseName,
        //         expenseIncurredDate: incurredDate,
        //         amount: amountDistance,
        //         isReImbursable: Reimbursable,
        //         isBillable: Billable,

        //     })

        // }

        // else if (ExpenseType == 'Per_Day') {

        //     let submitData = {

        //         'amount': amountPer_Day,
        //         'expenseAttachment': expenseAttachment,
        //         'expenseAttachmentId': expenseAttachmentId,
        //         'expenseIncurredDate': incurredDate,
        //         'expenseName': selectedExpenseCategory.expenseName,
        //         'expenseReason': reasonPer_Day,
        //         'expensesFieldList': expensesFieldList,
        //         'isBillable': Billable,
        //         'isReImbursable': Reimbursable,
        //         'templateCategoryId': expenseTemplateCategoryId,
        //         'expensesId': 0

        //     }



        //     console.log(submitData);

        //     expenseList.push(submitData);

        //     console.log(expenseList);

        //     ExpenseData.push({

        //         id: expensesId,
        //         expenseName: selectedExpenseCategory.expenseName,
        //         expenseIncurredDate: incurredDate,
        //         amount: amountPer_Day,
        //         isReImbursable: Reimbursable,
        //         isBillable: Billable,

        //     })

        // }

        // else if (ExpenseType == 'Time') {

        //     let submitData = {

        //         'amount': amountTime,
        //         'expenseAttachment': expenseAttachment,
        //         'expenseAttachmentId': expenseAttachmentId,
        //         'expenseIncurredDate': incurredDate,
        //         'expenseName': selectedExpenseCategory.expenseName,
        //         'expenseReason': reasonTime,
        //         'expensesFieldList': expensesFieldList,
        //         'isBillable': Billable,
        //         'isReImbursable': Reimbursable,
        //         'templateCategoryId': expenseTemplateCategoryId,
        //         'expensesId': 0

        //     }



        //     console.log(submitData);

        //     expenseList.push(submitData);

        //     console.log(expenseList);

        //     ExpenseData.push({

        //         id: expensesId,
        //         expenseName: selectedExpenseCategory.expenseName,
        //         expenseIncurredDate: incurredDate,
        //         amount: amountTime,
        //         isReImbursable: Reimbursable,
        //         isBillable: Billable,

        //     })

        // }

        // else {

        let submitData = {

            'amount': expenseListTemp.amount,
            'expenseAttachment': expenseListTemp.expenseAttachment,
            'expenseAttachmentId': expenseListTemp.expenseAttachmentId,
            'expenseIncurredDate': expenseListTemp.expenseIncurredDate,
            'expenseName': selectedExpenseCategory.expenseName,
            'expenseReason': expenseListTemp.expenseReason,
            'expenseTemplateCategoryFieldValueList': expenseTemplateCategoryFieldValueList,
            'expensesFieldList': expensesFieldList,
            'isBillable': expenseListTemp.isBillable,
            'isReImbursable': expenseListTemp.isReImbursable,
            'templateCategoryId': expenseTemplateCategoryId,
            'expensesId': 0

        }

        console.log(submitData);





        let AllDataArrayLength = ExpenseData.length;
        console.log(AllDataArrayLength);

        console.log(expenseList);
        expenseList.push(submitData);

        expenseListTempArray.push(expenseListTemp)

        ExpenseFieldArrays.push(expensesFieldList)

        FieldListArrays.push(FieldListArray)

        expensesFieldListValidationArray.push(expensesFieldListValidation)

        templateCatStoreArray.push(templateCatStore)



        ExpenseData.push({

            //id: expensesId,
            expenseName: selectedExpenseCategory.expenseName,
            expenseIncurredDate: expenseListTemp.expenseIncurredDate,
            amount: expenseListTemp.amount,
            isReImbursable: expenseListTemp.isReImbursable,
            isBillable: expenseListTemp.isBillable,
            index: AllDataArrayLength,
            editButton: editButtonClick,
            deleteButton: deleteButtonClick

        })

        // setFieldListArrayEdit(FieldListArray)
        // setexpensesFieldList(expensesFieldList)


        // ExpenseData.push({

        //     id: expensesId,
        //     expenseName: 'selectedExpenseCategory',
        //     expenseIncurredDate: '12-04-2022',
        //     amount: amount,
        //     isReImbursable: Reimbursable,
        //     isBillable: Billable,

        // })

        setisModelVisible(false);

        setexpensesId(expensesId + 1);
        setselectedExpenseCategory(null)

        setexpenseListTemp({

            'amount': null,
            'expenseAttachment': null,
            'expenseAttachmentId': null,
            'expenseIncurredDate': null,
            'expenseName': '',
            'expenseReason': '',
            'isBillable': false,
            'isReImbursable': false,
            'templateCategoryId': null,
            'expensesId': 0

        })

        settemplateCatStore({

            'selectType': '',
            'value': ''

        })
        // FieldListArray = []
        //expensesFieldList = []
        // expensesFieldListValidation = []
        //setselectedExpenseCategory(null)

    }




    const OnMainExpenseSubmit = () => {

        if (ExpTitle == null) {
            Alert.alert("",'Please Write Expense Report Title');
            return;
        }

        if (expenseList.length == 0) {
            Alert.alert("",'Please Add At least One expense');
            return;
        }

        let expenseListFinal = []

        console.log(expenseList);

        expenseList.forEach((item, index) => {

            if (typeof item != 'undefined') {

                expenseListFinal.push(item)

            }



        })

        if (expenseListFinal.length == 0) {
            Alert.alert("",'Please Add At least One expense');
            return;
        }

        console.log('expenseListFinal', expenseListFinal);

        let ExpensePayload = {
            'advanceAmount': parseInt(advanceAmount),
            'empCode': authDict.employeeCode,
            'expenseReportName': ExpTitle,
            'expensesList': expenseListFinal

        }
        console.log('ExpensePayload', ExpensePayload);

        sendExpenseAPI(ExpensePayload)




    }


    const { goBack } = props.navigation;


    useEffect(() => {
      
    
        return () => {

            console.log("addExpense_return", props?.route?.params);
            props?.route?.params?.refreshList()

        };
    }, [])
    


    useEffect(() => {
        KeyStore.getKey('authDict', (err, value) => {
            if (value) {
                setauthDict(value)
                console.log('authDict1', value);
                // settenantId(value.tanentId)
                console.log("authDict", authDict);
                //setempcode(authDict.employeeCode)
                //console.log('empcode', empcode);
                getAddExpenseData()
            }
        });

        // return () => {

        //     console.log("addExpense_return", props?.route?.params);
        //     // props?.route?.params?.refreshList()

        // };


    }, [apirun]);


  
    



    //API Call

    async function getAddExpenseData() {

        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + "expensecategories/" + authDict.employeeCode

        setisLoading(true)

        // console.warn(url)

        // console.warn("authDict", authDict);

        setisLoading(true)

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(authDict)
            }
            )

            console.log("yoyoyoyouyoyohy", response)

            let code = await response.status
            //setisLoading(false)

            if (code == 200) {

                let responseJson = await response.json();
                console.log("Response Json ", responseJson)
                //setisLoading(false)
                //setexpensecategories([])
                responseJson.forEach((item, index) => {

                    expensecategories.push(item)
                    //console.log(item.expenseName);
                })

                console.log("ExpenseCategoriesDropDownData ", expensecategories);

                (async function () {
                    console.log('Immediately invoked function execution');
                    var url2 = Constant.BASE_URL + 'advance/application/get/advance/expense/data?empCode=' + authDict.employeeCode

                    console.log(url2);

                    try {

                        let response2 = await fetch(url2, {
                            method: 'GET',
                            headers: Constant.getHeader(authDict)
                        }
                        )



                        console.log("yoyoyoyouyoyohy", response2)

                        let code2 = await response2.status

                        if (code2 == 200) {

                            let responseJson2 = await response2.json();
                            console.log("Response Json2 ", responseJson2);

                            setshowadvanceAmount(responseJson2.shouldAdvanceAmountFlowToExpense)

                            setisLoading(false)

                        } else {
                            setisLoading(false)
                        }

                    } catch (error) {
                        console.error(error);
                    }

                })();





            } else {

                let msg = await response.statusText
                // this.refs.toast.show('Something went wrong!');
                // Alert.alert('Something Went Wrong')

                // Alert.alert('Something went wrong!')
                setapirun(!apirun)
            }
        } catch (error) {
            console.error(error);
        }


    }

    function Error_in_Expense(res) {

        setErrorinExpense(res.expensesErrors)

        setisErrorinExpense(true);



    }


    async function sendExpenseAPI(payload) {

        setisLoading(true)



        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD;

        console.log(url);

        // console.table(authDict);

        try {
            var requestOptions = {
                method: 'POST',
                headers: Constant.getHeader(authDict),
                body: JSON.stringify(payload),
            };

            console.log('requet option', requestOptions);

            let response = await fetch(url, requestOptions);
            // console.warn('data', response);
            let code = response.status;
            //this.setState({isLoading: false});

            if (code == 201 || code == 200) {
                setisLoading(false)
                let responseJson = await response.json();
                // console.log(responseJson)
                console.log(responseJson);

                if (responseJson.error != undefined) {

                    Error_in_Expense(responseJson)

                }

                else {
                    // Alert.alert('Expense Submitted Successfully');

                    Alert.alert(
                        'Success',
                        'Expense Submitted Successfully.',
                        [{ text: 'OK', onPress: () => goBack() }],
                        { cancelable: false },
                    );
                }



            } else if (code == 400) {
                setisLoading(false)
                let responseJson = await response.json();
                console.log(responseJson);
                console.warn('message', responseJson.message);
                Alert.alert("",String(responseJson.message))
                // this.refs.toast.show(responseJson.message);
            } else if (code == 401 || code == 503) {
                setisLoading(false)
                let responseJson = await response.json();
                console.warn('message', responseJson.message);
                Alert.alert("",String(responseJson.message))
                // Utility.logoutOnError(this.state.authDict, this.props.navigation);
            } else {
                // this.refs.toast.show('Something went wrong!');

                console.log('Something went wrong!');
                Alert.alert("",'Something Went Wrong')
            }
        } catch (error) {
            setisLoading(false)
            Alert.alert(
                '',
                'Internet connection appears to be offline. Please check your internet connection and try again.',
            );
            Vibration.vibrate()
            //   this.setState({isLoading: false});

            console.error(error);
            throw error


        }

    }


    //Receive E

    //ReceiveDate
    function handleIncurredDatePicked(date, index, fieldName) {

        expenseListTemp.expenseIncurredDate = date
        console.log('handleIncurredDatePicked', date);

    }

    function showDatePickerComponent(index) {

        setDateComponentIndex(index)
        console.log('index from DateComponent', index);
        setisDatePickerComponent(true)

    }


    function handleDatePickerComponent(date) {

        if (DateComponentIndex != null) {
            //  console.log("Date from DateComponent",date)
            const momentDate = Moment(date.toISOString());
            let pickedDt = Moment(momentDate).format('DD-MM-YYYY');
            console.log(expensesFieldList[DateComponentIndex].fieldValue = pickedDt);
            console.log('ExpenseField List From Date Component', expensesFieldList);
            setisDatePickerComponent(false)

        }

        else null
    }

    function CancelDatePickerComponent() {

        setisDatePickerComponent(false)
        //setDateComponentIndex(null)
        console.log('Cancel Date Picker Called');
    }

    //--------------------------------------------


    function receiveValueDropDown(val, fieldName, index) {

        console.log("Catching It Bro", val, fieldName, index);

        // console.log('ExpenseField List 1', expensesFieldList);

        //console.log(expensesFieldList[index].fieldName = fieldName);
        console.log(expensesFieldList[index].fieldValue = val);

        console.log('ExpenseField List Again', expensesFieldList);
    }

    function receiveValueTextField(val, fieldName, index) {

        //console.log('ExpenseField List 1', expensesFieldList);

        console.log("Catching It Bro", val, fieldName, index);

        //console.log(expensesFieldList[index].fieldName = fieldName);
        console.log(expensesFieldList[index].fieldValue = val);
        console.log('ExpenseField List 1', expensesFieldList);


    }



    function receiveValueDateComponent(date, index, fieldName) {

        //console.log('ExpenseField List 1', expensesFieldList);

        console.log("Catching It Date..", date, fieldName, index);

        //console.log(expensesFieldList[index].fieldName = fieldName);
        console.log(expensesFieldList[index].fieldValue = date);
        console.log('ExpenseField List 1', expensesFieldList);


    }

    const receiveFieldValueDATERANGE = (value, index) => {

        console.log("Catching It DateRangeField", value, index);
        console.log(expensesFieldList[index].fieldValue = value);
        console.log('receiveFieldValueDATERANGE', expensesFieldList);

    }

    const putExpenseFieldTemplate = (fieldNameLabel, fieldId) => {
        increment = increment + 1

        return {
            "expensesFieldId": 0,
            "fieldId": fieldId,
            "fieldName": fieldNameLabel,
            "fieldValue": ""
        }


    }

    const putExpenseFieldTemplateForTADA_HPAdhesives = (fieldNameLabel, fieldId, fieldValue) => {
        increment = increment + 1

        return {
            "expensesFieldId": 0,
            "fieldId": fieldId,
            "fieldName": fieldNameLabel,
            "fieldValue": fieldValue
        }


    }


    const expenseTemplateCategoryFieldValueListTemplate = (catagoryId) => {


        return {
            "templateCatagoryFieldId": '',
            "catagoryId": catagoryId,
            "expenseTemplateCatagoryFieldValueId": 0,
            "fieldName": "",
            "fieldValue": '',
        }


    }

    const receiveTemplateCatagoryFieldIdAndFieldName = (templateCatagoryFieldId, fieldName) => {

        console.log('receiveTemplateCatagoryFieldIdAndFieldName', templateCatagoryFieldId, fieldName);

        expenseTemplateCategoryFieldValueList[0].templateCatagoryFieldId = templateCatagoryFieldId
        expenseTemplateCategoryFieldValueList[0].fieldName = fieldName


    }


    const receiveTemplateCatagoryFieldValue = (fieldValue) => {

        console.log('receiveTemplateCatagoryFieldValue', fieldValue);

        expenseTemplateCategoryFieldValueList[0].fieldValue = fieldValue


    }


    const putValidationTemplate = (val) => {


        return {
            "isMandatoryForSubmission": val
        }


    }

    const calculateAmountDate = (DateLabel, DateArray) => {


        const oneDay = 24 * 60 * 60 * 1000;
        let firstDate = '';
        let secondDate = '';
        if (DateLabel == "From Date") {
            firstDate = new Date(DateArray[2], DateArray[1] - 1, DateArray[0]);
        }

        if (DateLabel == "To Date") {
            secondDate = new Date(DateArray[2], DateArray[1] - 1, DateArray[0]);
        }

        // hours*minutes*seconds*milliseconds

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        amount = diffDays;
        console.log(amount);

    }

    const receiveAmountTextField = (val) => {
        // amount = val;
        expenseListTemp.amount = val;
        console.log('receiveAmountTextField', val);
    }

    const receiveReasonTextField = (val) => {
        // reason = val;
        expenseListTemp.expenseReason = val;
        console.log('receiveReasonTextField', val);
    }

    const amountReceive = (val) => {
        // amountDate_RangeReceive
        // amountDate_Range = val
        expenseListTemp.amount = val;
        console.log('amountDate_Range', val);
    }

    const amountDistanceReceive = (val) => {

        // amountDistance = val
        expenseListTemp.amount = val;
        console.log('amountDistanceReceive', val);
    }

    const amountPer_DayReceive = (val) => {

        // amountPer_Day = val
        expenseListTemp.amount = val;
        console.log('amountPer_DayReceive', val);
    }
    const amountTimeReceive = (val) => {

        // amountTime = val
        expenseListTemp.amount = val;
        console.log('amountPer_DayReceive', val);
    }
    const receiveAttachmentId = (val) => {

        // expenseAttachmentId = val
        expenseListTemp.expenseAttachmentId = val;
        console.log('receiveAttachmentId', String(val));
    }
    const receiveAttachmentName = (val) => {

        // expenseAttachment = val
        expenseListTemp.expenseAttachment = val;
        console.log('receiveAttachmentName', String(val));
    }

    const reasonDate_RangeReceive = (val) => {

        // reasonDate_Range = val
        expenseListTemp.expenseReason = val;
        console.log('amountDate_Range', val);
    }

    const reasonPer_DayReceive = (val) => {

        // reasonPer_Day = val
        expenseListTemp.expenseReason = val;
        console.log('reasonPer_DayReceive', val);
    }

    const reasonDistanceReceive = (val) => {

        // reasonDistance = val
        expenseListTemp.expenseReason = val;
        console.log('amountDate_Range', val);
    }

    const reasonTimeReceive = (val) => {

        // reasonTime = val
        expenseListTemp.expenseReason = val;
        console.log('amountDate_Range', val);
    }

    const ReimbursableCheckBox = (val) => {
        // Reimbursable = val
        expenseListTemp.isReImbursable = val;
        console.log('checkbox', val);
        //console.log('expenseListTemp', expenseListTemp);
    }





    const EditModalSubmit = () => {

        console.log(expensesFieldListValidation);

        for (let ind = 0; ind < expensesFieldListValidation.length; ind++) {
            const element = expensesFieldListValidation[ind];
            if (element.isMandatoryForSubmission) {

                if (expensesFieldList[ind].fieldValue == '') {

                    Alert.alert("","Please Fill " + expensesFieldList[ind].fieldName);
                    return;
                }

            }

        }

        console.log('EditModalSubmit expenseListTemp', expenseListTemp);

        let indexAdd = editIndexStore.index
        ExpenseFieldArrays[indexAdd] = expensesFieldList
        FieldListArrays[indexAdd] = FieldListArrayEdit

        templateCatStoreArray[indexAdd] = templateCatStore

        let expenseNameTemp = expenseList[indexAdd].expenseName
        let templateCategoryIdTemp = expenseList[indexAdd].templateCategoryId



        let submitData = {

            'amount': expenseListTemp.amount,
            'expenseAttachment': expenseListTemp.expenseAttachment,
            'expenseAttachmentId': expenseListTemp.expenseAttachmentId,
            'expenseIncurredDate': expenseListTemp.expenseIncurredDate,
            'expenseName': expenseNameTemp,
            'expenseReason': expenseListTemp.expenseReason,
            'expenseTemplateCategoryFieldValueList': expenseTemplateCategoryFieldValueList,
            'expensesFieldList': expensesFieldList,
            'isBillable': expenseListTemp.isBillable,
            'isReImbursable': expenseListTemp.isReImbursable,
            'templateCategoryId': templateCategoryIdTemp,
            'expensesId': 0

        }

        expenseList[indexAdd] = submitData

        let createEditExpenseData = {
            // id: expensesId,
            expenseName: expenseNameTemp,
            expenseIncurredDate: expenseListTemp.expenseIncurredDate,
            amount: expenseListTemp.amount,
            isReImbursable: expenseListTemp.isReImbursable,
            isBillable: expenseListTemp.isBillable,
            index: indexAdd,
            editButton: editButtonClick,
            deleteButton: deleteButtonClick
        }

        ExpenseData[indexAdd] = createEditExpenseData

        console.log('fromeditmodalfunction', expenseList);

        setisEditModelVisible(false)

        setexpenseListTemp({

            'amount': null,
            'expenseAttachment': null,
            'expenseAttachmentId': null,
            'expenseIncurredDate': null,
            'expenseName': '',
            'expenseReason': '',
            'isBillable': false,
            'isReImbursable': false,
            'templateCategoryId': null,
            'expensesId': 0

        })

        settemplateCatStore({

            'selectType': '',
            'value': ''

        })
    }

    const BillableCheckBox = (val) => {
        // Reimbursable = val
        expenseListTemp.isBillable = val;
        console.log('checkbox', val);
        //console.log('expenseListTemp', expenseListTemp);


    }

    function receiveTempCat_SelectType(val) {

        templateCatStore.selectType = val;
        console.log('catchTempCat_SelectType', val);

    }

    function receiveTempCat_value(val) {

        templateCatStore.value = val;
        console.log('catchTempCat_value', val);

    }

    function receiveTempCat_UserInput(val) {

        templateCatStore.userInputVal = val;
        console.log('receiveTempCat_UserInput', val);

    }








    if (selectedExpenseCategory != null) {
        FieldListArray = [];
        expensesFieldList = [];
        expensesFieldListValidation = []
        expenseTemplateCategoryFieldValueList = []

        expenseTemplateCategoryId = selectedExpenseCategory.expenseTemplateCategoryId;

        console.log('Hello this is if else', selectedExpenseCategory)
        //console.warn(selectedExpenseCategory);


        if (selectedExpenseCategory.expenseType == 'Other') {

            FieldListArray.push(
                <>
                    <DatePickerComponent
                        fieldName={"Incurred Date: "}
                        func={handleIncurredDatePicked}
                        index={0}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseIncurredDate'}

                    />

                    <TextFieldAmount
                        receiveAmountTextField={receiveAmountTextField}
                        fieldRef={expenseListTemp}
                        fieldVal={'amount'}
                        placeholder={'Amount'}
                    />


                </>


            )

            if (authDict?.tanentId == HPAdhesivestenantId) {

                if (selectedExpenseCategory.expenseName == 'Local Allowance TA/DA') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplateForTADA_HPAdhesives(selectedExpenseCategory.expenseCategoryFields[0].fieldName, selectedExpenseCategory.expenseCategoryFields[0].fieldId, String(selectedExpenseCategory.empJobInfoLocation).split('-')[0]))

                    console.log('Local Allowance TA/DA HPAdhesivestenantId', expensesFieldList[index])

                    FieldListArray.push(

                        // <TextField
                        //     data={item}
                        //     placeholder={item.fieldName}
                        //     receiveValueTextField={receiveValueTextField}
                        //     index={index}
                        //     fieldRef={expensesFieldList[index]}
                        //     fieldVal='fieldValue'



                        // />



                        <TextFieldStatic
                            TextValue={expensesFieldList[index].fieldValue}
                            fieldName={expensesFieldList[index].fieldName}
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(selectedExpenseCategory.expenseCategoryFields[0].isMandatoryForSubmission))

                    console.log('HPAdhesivestenantId Level 2 TextField Data', selectedExpenseCategory.expenseCategoryFields[0]);

                }

                else {
                    selectedExpenseCategory.expenseCategoryFields.forEach((item, i) => {

                        if (item.fieldType == 'DROPDOWN') {
                            //tempDropDown = []
                            //
                            //tempDropDown.push(item.dropDownList)

                            let index = expensesFieldList.length
                            expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                            FieldListArray.push(<MyDropDownNormal data={item}
                                receiveValueDropDown={receiveValueDropDown}
                                index={index}
                                fieldRef={expensesFieldList[index]}
                            />)

                            expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))




                            console.log('Level 2 Drop Down Data', item);
                        }



                        else if (item.fieldType == 'TEXTFIELD') {

                            let index = expensesFieldList.length
                            expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                            FieldListArray.push(

                                <TextField
                                    data={item}
                                    placeholder={item.fieldName}
                                    receiveValueTextField={receiveValueTextField}
                                    index={index}
                                    fieldRef={expensesFieldList[index]}
                                    fieldVal='fieldValue'



                                />
                            )

                            expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                            console.log('Level 2 TextField Data', item);

                        }

                        else if (item.fieldType == 'NUMBER') {

                            let index = expensesFieldList.length
                            expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                            FieldListArray.push(

                                <TextFieldNumber
                                    data={item}
                                    placeholder={item.fieldName}
                                    receiveValueTextField={receiveValueTextField}
                                    index={index}
                                    fieldRef={expensesFieldList[index]}
                                    fieldVal='fieldValue'


                                />
                            )

                            expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                            console.log('Level 2 Number Data', item);
                        }

                        else if (item.fieldType == 'DATE') {

                            let index = expensesFieldList.length
                            expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                            FieldListArray.push(

                                <DatePickerComponent
                                    fieldName={item.fieldName}
                                    func={receiveValueDateComponent}
                                    index={index}
                                    fieldRef={expensesFieldList[index]}
                                    fieldVal='fieldValue'
                                />
                            )

                            expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                            console.log('Level 2 DATE Data', item);
                        }

                        else if (item.fieldType == 'DATERANGE') {
                            let index = expensesFieldList.length
                            expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                            FieldListArray.push(
                                <DATERANGEComponent
                                    index={index}
                                    label={item.fieldName}
                                    receiveFieldValueDATERANGE={receiveFieldValueDATERANGE}
                                    fieldRef={expensesFieldList[index]}
                                />
                            )

                            expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        }

                        //fields.push(item)
                    })
                }

            }

            // if not hp adhesives
            else {
                selectedExpenseCategory.expenseCategoryFields.forEach((item, i) => {

                    if (item.fieldType == 'DROPDOWN') {
                        //tempDropDown = []
                        //
                        //tempDropDown.push(item.dropDownList)

                        let index = expensesFieldList.length
                        expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                        FieldListArray.push(<MyDropDownNormal data={item}
                            receiveValueDropDown={receiveValueDropDown}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                        />)

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))




                        console.log('Level 2 Drop Down Data', item);
                    }



                    else if (item.fieldType == 'TEXTFIELD') {

                        let index = expensesFieldList.length
                        expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                        FieldListArray.push(

                            <TextField
                                data={item}
                                placeholder={item.fieldName}
                                receiveValueTextField={receiveValueTextField}
                                index={index}
                                fieldRef={expensesFieldList[index]}
                                fieldVal='fieldValue'



                            />
                        )

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        console.log('Level 2 TextField Data', item);

                    }

                    else if (item.fieldType == 'NUMBER') {

                        let index = expensesFieldList.length
                        expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                        FieldListArray.push(

                            <TextFieldNumber
                                data={item}
                                placeholder={item.fieldName}
                                receiveValueTextField={receiveValueTextField}
                                index={index}
                                fieldRef={expensesFieldList[index]}
                                fieldVal='fieldValue'


                            />
                        )

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        console.log('Level 2 Number Data', item);
                    }

                    else if (item.fieldType == 'DATE') {

                        let index = expensesFieldList.length
                        expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                        FieldListArray.push(

                            <DatePickerComponent
                                fieldName={item.fieldName}
                                func={receiveValueDateComponent}
                                index={index}
                                fieldRef={expensesFieldList[index]}
                                fieldVal='fieldValue'
                            />
                        )

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        console.log('Level 2 DATE Data', item);
                    }

                    else if (item.fieldType == 'DATERANGE') {
                        let index = expensesFieldList.length
                        expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                        FieldListArray.push(
                            <DATERANGEComponent
                                index={index}
                                label={item.fieldName}
                                receiveFieldValueDATERANGE={receiveFieldValueDATERANGE}
                                fieldRef={expensesFieldList[index]}
                            />
                        )

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    }

                    //fields.push(item)
                })
            }




            FieldListArray.push(

                <>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', paddingLeft: 13, marginBottom: 16 }}>


                        <MyCheckBox
                            label={'Reimbursable'}
                            //onPress={()=>value()}
                            val={false}
                            func={ReimbursableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isReImbursable'}

                        />
                        <MyCheckBox
                            label={'Billable'}
                            //onPress={()=>value()}
                            val={false}
                            func={BillableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isBillable'}

                        />

                    </View>

                    <TextFieldReason
                        receiveReasonTextField={receiveReasonTextField}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseReason'}

                    />

                    <ComponentForFilePIcker
                        authDict={authDict}
                        receiveAttachmentId={receiveAttachmentId}
                        receiveAttachmentName={receiveAttachmentName}
                        fieldRef={expenseListTemp}

                    />
                </>
            )

        }


        else if (selectedExpenseCategory.expenseType == 'Date_Range') {

            FieldListArray.push(


                <DatePickerComponent
                    fieldName={"Incurred Date: "}
                    func={handleIncurredDatePicked}
                    index={0}
                    fieldRef={expenseListTemp}
                    fieldVal={'expenseIncurredDate'}

                />

            )

            let index1 = expensesFieldList.length
            expensesFieldList.push(putExpenseFieldTemplate('From date', 0))

            let index2 = expensesFieldList.length
            expensesFieldList.push(putExpenseFieldTemplate('To date', 0))


            FieldListArray.push(
                <>
                    <ComponentForDateRange
                        receiveFromDate={receiveValueDateComponent}
                        indexFromDate={index1}
                        receiveToDate={receiveValueDateComponent}
                        indexToDate={index2}
                        amountReceive={amountReceive}
                        templateCategoriesField={selectedExpenseCategory.templateCategoriesFields}
                        fieldRefFromDate={expensesFieldList[index1]}
                        fieldRefToDate={expensesFieldList[index2]}
                        fieldRefAmount={expenseListTemp}
                        canEmpInsertTotalExpenseAmount={selectedExpenseCategory.canEmpInsertTotalExpenseAmount}
                    />


                </>


            )




            selectedExpenseCategory.expenseCategoryFields.forEach((item, i) => {

                if (item.fieldType == 'DROPDOWN') {
                    //tempDropDown = []
                    //
                    //tempDropDown.push(item.dropDownList)

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(<MyDropDownNormal data={item}
                        receiveValueDropDown={receiveValueDropDown}
                        index={index}
                        fieldRef={expensesFieldList[index]}
                    />)

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))




                    console.log('Level 2 Drop Down Data', item);
                }



                else if (item.fieldType == 'TEXTFIELD') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextField
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'



                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 TextField Data', item);

                }

                else if (item.fieldType == 'NUMBER') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextFieldNumber
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'


                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 Number Data', item);
                }

                else if (item.fieldType == 'DATE') {

                    if (item.fieldName == "From Date") {

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        expensesFieldList[index1].fieldId = item.fieldId



                    }

                    else if (item.fieldName == "To Date") {

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        expensesFieldList[index2].fieldId = item.fieldId

                    }

                    else {


                        let index = expensesFieldList.length
                        expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                        FieldListArray.push(

                            <DatePickerComponent
                                fieldName={item.fieldName}
                                func={receiveValueDateComponent}
                                index={index}
                                fieldRef={expensesFieldList[index]}
                                fieldVal='fieldValue'
                            />
                        )

                        expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                        console.log('Level 2 DATE Data', item);
                    }
                }

                else if (item.fieldType == 'DATERANGE') {
                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(
                        <DATERANGEComponent
                            index={index}
                            label={item.fieldName}
                            receiveFieldValueDATERANGE={receiveFieldValueDATERANGE}
                            fieldRef={expensesFieldList[index]}
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))
                }

                //fields.push(item)
            })

            FieldListArray.push(

                <>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', paddingLeft: 13, marginBottom: 16 }}>


                        <MyCheckBox
                            label={'Reimbursable'}
                            //onPress={()=>value()}
                            val={false}
                            func={ReimbursableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isReImbursable'}

                        />
                        <MyCheckBox
                            label={'Billable'}
                            //onPress={()=>value()}
                            val={false}
                            func={BillableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isBillable'}

                        />

                    </View>

                    <TextFieldReason
                        receiveReasonTextField={receiveReasonTextField}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseReason'}

                    />

                    <ComponentForFilePIcker
                        authDict={authDict}
                        receiveAttachmentId={receiveAttachmentId}
                        receiveAttachmentName={receiveAttachmentName}
                        fieldRef={expenseListTemp}

                    />
                </>
            )


        }

        else if (selectedExpenseCategory.expenseType == 'Distance') {


            const catagoryId = selectedExpenseCategory.expenseTemplateCategoryId

            expenseTemplateCategoryFieldValueList.push(expenseTemplateCategoryFieldValueListTemplate(catagoryId))


            if (selectedExpenseCategory.expenseName == 'Intercity Travel-Bike/Car') {

                FieldListArray.push(

                    <>

                        <DatePickerComponent
                            fieldName={"Incurred Date: "}
                            func={handleIncurredDatePicked}
                            index={0}
                            fieldRef={expenseListTemp}
                            fieldVal={'expenseIncurredDate'}

                        />




                        <ComponentForDistanceForToll
                            templateCategoriesFields={selectedExpenseCategory.templateCategoriesFields}
                            receiveAmountValue={amountDistanceReceive}
                            fieldRefAmount={expenseListTemp}
                            templateStoreRef={templateCatStore}
                            selectTypeFunc={receiveTempCat_SelectType}
                            valueFunc={receiveTempCat_value}
                            userInputFunc={receiveTempCat_UserInput}
                            TemplateCatagoryFieldIdAndFieldNameFunc={receiveTemplateCatagoryFieldIdAndFieldName}
                            TemplateCatagoryFieldValueFunc={receiveTemplateCatagoryFieldValue}
                            authDict={authDict}
                        />

                    </>
                )

            }

            else {

                FieldListArray.push(

                    <>

                        <DatePickerComponent
                            fieldName={"Incurred Date: "}
                            func={handleIncurredDatePicked}
                            index={0}
                            fieldRef={expenseListTemp}
                            fieldVal={'expenseIncurredDate'}

                        />




                        <ComponentForDistance
                            templateCategoriesFields={selectedExpenseCategory.templateCategoriesFields}
                            receiveAmountValue={amountDistanceReceive}
                            fieldRefAmount={expenseListTemp}
                            templateStoreRef={templateCatStore}
                            selectTypeFunc={receiveTempCat_SelectType}
                            valueFunc={receiveTempCat_value}
                            userInputFunc={receiveTempCat_UserInput}
                            TemplateCatagoryFieldIdAndFieldNameFunc={receiveTemplateCatagoryFieldIdAndFieldName}
                            TemplateCatagoryFieldValueFunc={receiveTemplateCatagoryFieldValue}
                            authDict={authDict}
                        />

                    </>
                )
            }




            selectedExpenseCategory.expenseCategoryFields.forEach((item, i) => {

                if (item.fieldType == 'DROPDOWN') {
                    //tempDropDown = []
                    //
                    //tempDropDown.push(item.dropDownList)

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(<MyDropDownNormal data={item}
                        receiveValueDropDown={receiveValueDropDown}
                        index={index}
                        fieldRef={expensesFieldList[index]}
                    />)

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))




                    console.log('Level 2 Drop Down Data', item);
                }



                else if (item.fieldType == 'TEXTFIELD') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextField
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'



                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 TextField Data', item);

                }

                else if (item.fieldType == 'NUMBER') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextFieldNumber
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'


                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 Number Data', item);
                }

                else if (item.fieldType == 'DATE') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <DatePickerComponent
                            fieldName={item.fieldName}
                            func={receiveValueDateComponent}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'
                        />


                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 DATE Data', item);
                }

                else if (item.fieldType == 'DATERANGE') {
                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(
                        <DATERANGEComponent
                            index={index}
                            label={item.fieldName}
                            receiveFieldValueDATERANGE={receiveFieldValueDATERANGE}
                            fieldRef={expensesFieldList[index]}
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                }

                //fields.push(item)
            })




            FieldListArray.push(

                <>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', paddingLeft: 13, marginBottom: 16 }}>


                        <MyCheckBox
                            label={'Reimbursable'}
                            //onPress={()=>value()}
                            val={false}
                            func={ReimbursableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isReImbursable'}

                        />
                        <MyCheckBox
                            label={'Billable'}
                            //onPress={()=>value()}
                            val={false}
                            func={BillableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isBillable'}

                        />

                    </View>

                    <TextFieldReason
                        receiveReasonTextField={receiveReasonTextField}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseReason'}

                    />
                    <ComponentForFilePIcker
                        authDict={authDict}
                        receiveAttachmentId={receiveAttachmentId}
                        receiveAttachmentName={receiveAttachmentName}
                        fieldRef={expenseListTemp}

                    />
                </>
            )
        }

        else if (selectedExpenseCategory.expenseType == 'Per_Day') {

            const catagoryId = selectedExpenseCategory.expenseTemplateCategoryId

            expenseTemplateCategoryFieldValueList.push(expenseTemplateCategoryFieldValueListTemplate(catagoryId))


            FieldListArray.push(

                <>

                    <DatePickerComponent
                        fieldName={"Incurred Date: "}
                        func={handleIncurredDatePicked}
                        index={0}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseIncurredDate'}

                    />

                    <ComponentForPer_Day
                        templateCategoriesFields={selectedExpenseCategory.templateCategoriesFields}
                        receiveAmountValue={amountPer_DayReceive}
                        fieldRefAmount={expenseListTemp}
                        templateStoreRef={templateCatStore}
                        selectTypeFunc={receiveTempCat_SelectType}
                        valueFunc={receiveTempCat_value}
                        userInputFunc={receiveTempCat_UserInput}
                        TemplateCatagoryFieldIdAndFieldNameFunc={receiveTemplateCatagoryFieldIdAndFieldName}
                        TemplateCatagoryFieldValueFunc={receiveTemplateCatagoryFieldValue}
                    />

                </>
            )


            selectedExpenseCategory.expenseCategoryFields.forEach((item, i) => {

                if (item.fieldType == 'DROPDOWN') {
                    //tempDropDown = []
                    //
                    //tempDropDown.push(item.dropDownList)

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(<MyDropDownNormal data={item}
                        receiveValueDropDown={receiveValueDropDown}
                        index={index}
                        fieldRef={expensesFieldList[index]}
                    />)

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))




                    console.log('Level 2 Drop Down Data', item);
                }



                else if (item.fieldType == 'TEXTFIELD') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextField
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'



                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 TextField Data', item);

                }

                else if (item.fieldType == 'NUMBER') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextFieldNumber
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'


                        />
                    )


                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))


                    console.log('Level 2 Number Data', item);
                }

                else if (item.fieldType == 'DATE') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <DatePickerComponent
                            fieldName={item.fieldName}
                            func={receiveValueDateComponent}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 DATE Data', item);
                }

                else if (item.fieldType == 'DATERANGE') {
                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(
                        <DATERANGEComponent
                            index={index}
                            label={item.fieldName}
                            receiveFieldValueDATERANGE={receiveFieldValueDATERANGE}
                            fieldRef={expensesFieldList[index]}
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                }

                //fields.push(item)
            })




            FieldListArray.push(

                <>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', paddingLeft: 13, marginBottom: 16 }}>


                        <MyCheckBox
                            label={'Reimbursable'}
                            //onPress={()=>value()}
                            val={false}
                            func={ReimbursableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isReImbursable'}

                        />


                        <MyCheckBox
                            label={'Billable'}
                            //onPress={()=>value()}
                            val={false}
                            func={BillableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isBillable'}

                        />

                    </View>

                    <TextFieldReason
                        receiveReasonTextField={receiveReasonTextField}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseReason'}

                    />

                    <ComponentForFilePIcker
                        authDict={authDict}
                        receiveAttachmentId={receiveAttachmentId}
                        receiveAttachmentName={receiveAttachmentName}
                        fieldRef={expenseListTemp}

                    />
                </>
            )
        }

        else if (selectedExpenseCategory.expenseType == 'Time') {

            const catagoryId = selectedExpenseCategory.expenseTemplateCategoryId

            expenseTemplateCategoryFieldValueList.push(expenseTemplateCategoryFieldValueListTemplate(catagoryId))

            FieldListArray.push(

                <>

                    <DatePickerComponent
                        fieldName={"Incurred Date: "}
                        func={handleIncurredDatePicked}
                        index={0}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseIncurredDate'}

                    />

                    <ComponentForTime
                        templateCategoriesFields={selectedExpenseCategory.templateCategoriesFields}
                        receiveAmountValue={amountTimeReceive}
                        fieldRefAmount={expenseListTemp}
                        templateStoreRef={templateCatStore}
                        selectTypeFunc={receiveTempCat_SelectType}
                        valueFunc={receiveTempCat_value}
                        userInputFunc={receiveTempCat_UserInput}
                        TemplateCatagoryFieldIdAndFieldNameFunc={receiveTemplateCatagoryFieldIdAndFieldName}
                        TemplateCatagoryFieldValueFunc={receiveTemplateCatagoryFieldValue}
                    />

                </>
            )


            selectedExpenseCategory.expenseCategoryFields.forEach((item, i) => {

                if (item.fieldType == 'DROPDOWN') {
                    //tempDropDown = []
                    //
                    //tempDropDown.push(item.dropDownList)

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(<MyDropDownNormal data={item}
                        receiveValueDropDown={receiveValueDropDown}
                        index={index}
                        fieldRef={expensesFieldList[index]}
                    />)

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))




                    console.log('Level 2 Drop Down Data', item);
                }



                else if (item.fieldType == 'TEXTFIELD') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextField
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'



                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 TextField Data', item);

                }

                else if (item.fieldType == 'NUMBER') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <TextFieldNumber
                            data={item}
                            placeholder={item.fieldName}
                            receiveValueTextField={receiveValueTextField}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'


                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 Number Data', item);
                }

                else if (item.fieldType == 'DATE') {

                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(

                        <DatePickerComponent
                            fieldName={item.fieldName}
                            func={receiveValueDateComponent}
                            index={index}
                            fieldRef={expensesFieldList[index]}
                            fieldVal='fieldValue'
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                    console.log('Level 2 DATE Data', item);
                }

                else if (item.fieldType == 'DATERANGE') {
                    let index = expensesFieldList.length
                    expensesFieldList.push(putExpenseFieldTemplate(item.fieldName, item.fieldId))

                    FieldListArray.push(
                        <DATERANGEComponent
                            index={index}
                            label={item.fieldName}
                            receiveFieldValueDATERANGE={receiveFieldValueDATERANGE}
                            fieldRef={expensesFieldList[index]}
                        />
                    )

                    expensesFieldListValidation.push(putValidationTemplate(item.isMandatoryForSubmission))

                }

                //fields.push(item)
            })




            FieldListArray.push(

                <>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', paddingLeft: 13, marginBottom: 16 }}>


                        <MyCheckBox
                            label={'Reimbursable'}
                            //onPress={()=>value()}
                            val={false}
                            func={ReimbursableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isReImbursable'}

                        />
                        <MyCheckBox
                            label={'Billable'}
                            //onPress={()=>value()}
                            val={false}
                            func={BillableCheckBox}
                            fieldRef={expenseListTemp}
                            fieldVal={'isBillable'}

                        />

                    </View>

                    <TextFieldReason
                        receiveReasonTextField={receiveReasonTextField}
                        fieldRef={expenseListTemp}
                        fieldVal={'expenseReason'}

                    />

                    <ComponentForFilePIcker
                        authDict={authDict}
                        receiveAttachmentId={receiveAttachmentId}
                        receiveAttachmentName={receiveAttachmentName}
                        fieldRef={expenseListTemp}

                    />
                </>
            )
        }

        //console.log(tempDropDown);



    } else {
        FieldListArray = []
    }



    // UI
    return (
        <>
            <View style={styles.container}>


                <Nav
                    backHidden={false}
                    title={navTitle}
                    backAction={() => goBack()}>
                    {' '}
                </Nav>

                <View style={styles.MainView}>



                    <TextInput allowFontScaling={false}
                        style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'black', alignSelf: 'center', backgroundColor: 'white', borderRadius: 10 }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder='Expense Report Title'
                        placeholderTextColor="#A9A9A9"
                        value={ExpTitle}
                        onChangeText={(text) => setExpTitle(text)}
                        returnKeyType="done" />


                    {showadvanceAmount ?
                        <>
                            <TextInput allowFontScaling={false}
                                style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'black', alignSelf: 'center', backgroundColor: 'white', borderRadius: 10 }}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                placeholder='Advance Amount Received: 0'
                                placeholderTextColor="#A9A9A9"
                                value={advanceAmount == 0 ? '' : advanceAmount}
                                onChangeText={(text) => setadvanceAmount(text)}
                                keyboardType='number-pad'
                                returnKeyType="done" />

                            {/* <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                        </View> */}
                        </>
                        :
                        null
                    }


                    {/* ------------ Expense Card --------- */}


                    {/* ------------ Expense Card --------- */}


                    {/* <FlatList /> */}

                    <View style={{ flex: 1 }}>

                        <FlatList style={{ marginTop: 10, maxHeight: '100%' }}
                            data={ExpenseData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        // extraData = {updateFlatList}
                        />
                    </View>





                    {/* <TouchableOpacity style={{
                    height: 50, width: 60, borderRadius: 30,
                    justifyContent: 'center', alignItems: 'center', marginRight: 20, marginTop: 10, alignSelf: 'flex-end',  shadowOffset: { width: 0, height: 5, },
                    shadowColor: 'gray',
                    shadowOpacity: 3.0,
                    //elevation:3, right: 20
                }} onPress={() => { setisModelVisible(true) }
                } >
                    <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
                </TouchableOpacity> */}

                    {/* Tetsing button */}

                    {/* <Button
                    title='Image Picker'
                    onPress={() => { cameraOn() }}
                /> */}




                    {/* <MyDropDown data={expensecategories}
                    value={selectedExpenseCategory}
                    myFunc={setselectedExpenseCategory}
                />

                <Text>  {selectedExpenseCategory == '' ? '' : selectedExpenseCategory}   </Text> */}



                    {/* ExpenseData Show */}







                    {/* Delete Modal */}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={isDeleteModelVisible}
                        onRequestClose={() => { console.log("Edit Modal has been closed.") }}>
                        <View style={{ width: '70%', height: '30%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#f2f6fa', marginTop: '60%', borderRadius: 10 }}>
                            <Text allowFontScaling={false} >Expense Has Been Deleted</Text>
                            <TouchableOpacity style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                borderWidth: 0.5,
                                borderColor: 'rgba(42,76,136,1.0)', marginTop: 10
                            }}
                                onPress={() => {
                                    setisDeleteModelVisible(false)
                                }}
                            >
                                <Text allowFontScaling={false} > OK </Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>


                    {/* Error in Send Expense Modal */}
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={isErrorinExpense}
                        onRequestClose={() => { console.log("Error in Send Expense Modal has been closed.") }}>
                        <View style={{ height: '68%', width: '85%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#f2f6fa', marginTop: '60%', borderRadius: 10, borderColor: '#fc4236', borderWidth: 1 }}>
                            <Text allowFontScaling={false} >Expense Submission Failed</Text>

                            <ScrollView style={{ maxHeight: "75%" }}>

                                {ErrorinExpense.map((item, index) => {

                                    return (

                                        <View key={item.expenseNo} style={styles.ErrorCardView}>

                                            <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

                                                {/* <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/expenses.png')}></Image> */}

                                                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1, marginLeft: 1 }}>{item.expenseNo}</Text>



                                            </View>

                                            <View style={{ flexDirection: 'row', }}>

                                                <Text allowFontScaling={false} style={{ padding: 12 }}>{item.message}</Text>

                                            </View>



                                        </View>

                                    )


                                })}

                            </ScrollView>

                            <TouchableOpacity style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                borderWidth: 0.5,
                                borderColor: 'rgba(42,76,136,1.0)', marginTop: 10
                            }}
                                onPress={() => {
                                    setisErrorinExpense(false)
                                }}
                            >
                                <Text> OK </Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>




                </View>


                {/* <TextInput/>
                    <FlatList
                
                    />
                    <TouchableOpacity/> */}

                <View style={{
                    width: '100%', borderRadius: 30,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: COLORS.FormBGColor,

                    flexDirection: 'column',
                    marginBottom: 14
                }}>

                    {/* <TouchableOpacity
                            style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                borderWidth: 0.5,
                                borderColor: 'rgba(42,76,136,1.0)',
                            }}
                            onPress={() => goBack()}>
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




                        </TouchableOpacity> */}

                    {/* <TouchableOpacity
                            style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                backgroundColor: 'rgba(42,76,136,1.0)',


                            }}
                            onPress={() => {

                                OnMainExpenseSubmit();

                            }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '100%',
                                    top: 8,
                                    fontSize: 13,
                                    fontFamily: Constant.MontserratBold,
                                }}>
                                Submit
                            </Text>
                        </TouchableOpacity> */}

                    {/* <Shadow distance={5} containerViewStyle={{

                            //  alignItems: 'center',

                        }} offset={[2, 2]}
                            startColor='#d9d9d9'
                        // finalColor='#9b9aed' 
                        // corners={'bottomRight'}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: 'white'
                                // 'rgba(242,242,242,1.0)'
                                , height: 40, width: 130, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row', borderColor: '#ff1a1a', borderWidth: 1
                            }} onPress={() => goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

                                    <Image style={{
                                        width: 16, height: 16, resizeMode: 'contain', tintColor: '#ff1a1a'
                                        //  '#0d0d0d'
                                    }} source={require('../../images/edit.png')} />

                                    <Text allowFontScaling={false} style={{ color: '#ff1a1a', textAlign: 'center', fontSize: 14, fontFamily: Constant.MontserratMedium, marginLeft: 12 }}
                                    >


                                        Cancel

                                    </Text>
                                </View>
                            </TouchableOpacity>


                        </Shadow> */}

                    {/* <CancelBtn onPress={() => goBack()} /> */}

                    {/* <Shadow distance={5} containerViewStyle={{

                            //  alignItems: 'center',

                        }} offset={[2, 2]}
                            startColor='#d9d9d9'
                        // finalColor='#9b9aed' 
                        // corners={'bottomRight'}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: 'white'
                                // 'rgba(242,242,242,1.0)'
                                , height: 40, width: 130, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row', borderColor: 'rgba(68,102,179,1.0)', borderWidth: 1
                            }} onPress={() => {

                                OnMainExpenseSubmit();

                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

                                    <Image style={{
                                        width: 16, height: 16, resizeMode: 'contain', tintColor: 'rgba(68,102,179,1.0)'
                                        //  '#0d0d0d'
                                    }} source={require('../../images/floppy-disk.png')} />

                                    <Text allowFontScaling={false} style={{ color: 'rgba(68,102,179,1.0)', textAlign: 'center', fontSize: 14, fontFamily: Constant.MontserratMedium, marginLeft: 12 }}
                                    >


                                        Submit

                                    </Text>
                                </View>
                            </TouchableOpacity>


                        </Shadow> */}
                    <SubmitBtnWide onPress={() => OnMainExpenseSubmit()} />


                </View>



                {/* <TouchableOpacity
                style={{
                    height: 35,
                    width: '48%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    borderWidth: 0.5,
                    borderColor: 'rgba(42,76,136,1.0)',
                }}
                onPress={() => goBack()}>
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
                </Text> */}




                {/* </TouchableOpacity> */}
                {/* <TouchableOpacity style={{
                    alignSelf: 'flex-end', height: 60, width: 60, borderRadius: 30,
                    justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 120, shadowOffset: { width: 0, height: 5, },
                    shadowColor: 'gray',
                    shadowOpacity: 3.0,
                    elevation: 3, right: 20
                }} onPress={() => setisModelVisible(true)
                } >
                    <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
                </TouchableOpacity> */}
                <View style={{ bottom: 20 }}>
                    <FloatBtnComp clickBtn={() => setisModelVisible(true)} />
                </View>


                {/* Add Modal */}
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={isModelVisible}
                    onRequestClose={() => {
                        setisModelVisible(false)
                        setselectedExpenseCategory(null)
                        FieldListArray = []
                        expensesFieldList = []
                        setexpenseListTemp({

                            'amount': null,
                            'expenseAttachment': null,
                            'expenseAttachmentId': null,
                            'expenseIncurredDate': null,
                            'expenseName': '',
                            'expenseReason': '',
                            'isBillable': false,
                            'isReImbursable': false,
                            'templateCategoryId': null,
                            'expensesId': 0

                        })
                        console.log("Modal has been closed.")
                    }}>
                    {/*All views of Modal*/}

                    {/* <TouchableOpacity
                    onPress={() => {

                        setisModelVisible(false)
                        setselectedExpenseCategory(null)
                        FieldListArray = []
                        expensesFieldList = []
                        setexpenseListTemp({

                            'amount': null,
                            'expenseAttachment': null,
                            'expenseAttachmentId': null,
                            'expenseIncurredDate': null,
                            'expenseName': '',
                            'expenseReason': '',
                            'isBillable': false,
                            'isReImbursable': false,
                            'templateCategoryId': null,
                            'expensesId': 0

                        })
                    }}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                /> */}

                    <Nav
                        backHidden={false}
                        title={"Add New Expense"}
                        backAction={() => {

                            setisModelVisible(false)
                            setselectedExpenseCategory(null)
                            FieldListArray = []
                            expensesFieldList = []
                            setexpenseListTemp({

                                'amount': null,
                                'expenseAttachment': null,
                                'expenseAttachmentId': null,
                                'expenseIncurredDate': null,
                                'expenseName': '',
                                'expenseReason': '',
                                'isBillable': false,
                                'isReImbursable': false,
                                'templateCategoryId': null,
                                'expensesId': 0

                            })

                        }}>
                        {' '}
                    </Nav>


                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>

                        <View style={{ flex: 1, }}>
                            {/* <KeyboardAwareScrollView> */}
                            <View
                                style={{
                                    width: '100%', height: '100%',
                                    // borderTopStartRadius: 20, borderTopEndRadius: 20, 
                                    backgroundColor: COLORS.FormBGColor,
                                    flexDirection: 'column',
                                    // padding: 30,
                                    alignItems: 'center', alignSelf: 'center'
                                }}>

                                <View style={{
                                    width: '100%',
                                    //padding: 10
                                    paddingLeft: 10,
                                    marginBottom: 7
                                }}>

                                    <Text allowFontScaling={false} style={{
                                        marginBottom: 7, marginTop: 20, fontFamily: Constant.MontserratMedium,
                                        fontSize: 15,
                                    }}>Expense Category</Text>

                                    <MyDropDown data={expensecategories}
                                        value={selectedExpenseCategory}
                                        myFunc={setselectedExpenseCategory}
                                        showDropdown={showDropdown}
                                        setshowDropdown={setshowDropdown}
                                        valueKeyName='expenseName'

                                    />

                                </View>

                                <View style={{
                                    flex: 1, backgroundColor: COLORS.FormBGColor,
                                    justifyContent: 'center', borderRadius: 8,
                                    paddingBottom: 10, paddingTop: 8,
                                }}>

                                    <FlatList style={{ marginTop: 10, maxHeight: '100%', }}
                                        contentContainerStyle={{ justifyContent: 'space-evenly' }}
                                        data={FieldListArray}
                                        renderItem={renderFieldList}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>



                                <View style={styles.bottomBtns}>
                                    {/* <TouchableOpacity
                                style={{
                                    height: 35,
                                    width: '40%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: 'rgba(42,76,136,1.0)',
                                }}
                                onPress={() => {
                                    setisModelVisible(false)
                                    setselectedExpenseCategory(null)
                                    FieldListArray = []
                                    expensesFieldList = []
                                    expenseTemplateCategoryFieldValueList = []
                                    setexpenseListTemp({

                                        'amount': null,
                                        'expenseAttachment': null,
                                        'expenseAttachmentId': null,
                                        'expenseIncurredDate': null,
                                        'expenseName': '',
                                        'expenseReason': '',
                                        'isBillable': false,
                                        'isReImbursable': false,
                                        'templateCategoryId': null,
                                        'expensesId': 0

                                    })
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




                            </TouchableOpacity> */}

                                    {/* <TouchableOpacity
                                    style={{
                                        height: 35,
                                        width: '40%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 25,
                                        backgroundColor: 'rgba(42,76,136,1.0)',


                                    }}
                                    onPress={() => {



                                        ExpenseModelSubmit();


                                    }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            width: '100%',
                                            height: '100%',
                                            top: 8,
                                            fontSize: 13,
                                            fontFamily: Constant.MontserratBold,
                                        }}>
                                        Submit
                                    </Text>
                                </TouchableOpacity> */}

                                    <SubmitBtnWide onPress={() => ExpenseModelSubmit()} />

                                    {/* <Shadow distance={5} containerViewStyle={{

                                    //  alignItems: 'center',

                                }} offset={[2, 2]}
                                    startColor='#dce2ef'
                                // finalColor='#9b9aed' 
                                // corners={'bottomRight'}
                                >
                                    <TouchableOpacity style={{
                                        backgroundColor: 'white'
                                        // 'rgba(242,242,242,1.0)'
                                        , height: 40, width: 130, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row', borderColor: 'rgba(68,102,179,1.0)', borderWidth: 1
                                    }} onPress={() => {

                                        ExpenseModelSubmit();

                                    }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

                                            <Image style={{
                                                width: 16, height: 16, resizeMode: 'contain', tintColor: 'rgba(68,102,179,1.0)'
                                                //  '#0d0d0d'
                                            }} source={require('../../images/floppy-disk.png')} />

                                            <Text allowFontScaling={false} style={{ color: 'rgba(68,102,179,1.0)', textAlign: 'center', fontSize: 14, fontFamily: Constant.MontserratMedium, marginLeft: 12 }}
                                            >


                                                Submit

                                            </Text>
                                        </View>
                                    </TouchableOpacity>


                                </Shadow> */}




                                </View>



                            </View>
                            {/* </KeyboardAwareScrollView> */}
                        </View>
                    </KeyboardAwareScrollView>







                </Modal>


                {/* Edit Modal */}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={isEditModelVisible}
                    onRequestClose={() => {
                        setisEditModelVisible(false)

                        setexpenseListTemp({

                            'amount': null,
                            'expenseAttachment': null,
                            'expenseAttachmentId': null,
                            'expenseIncurredDate': null,
                            'expenseName': '',
                            'expenseReason': '',
                            'isBillable': false,
                            'isReImbursable': false,
                            'templateCategoryId': null,
                            'expensesId': 0

                        })

                        settemplateCatStore({

                            'selectType': '',
                            'value': ''

                        })
                    }}>

                    <Nav
                        backHidden={false}
                        title={"Edit " + ExpenseDataEdit.expenseName}
                        backAction={() => {
                            setisEditModelVisible(false)

                            setexpenseListTemp({

                                'amount': null,
                                'expenseAttachment': null,
                                'expenseAttachmentId': null,
                                'expenseIncurredDate': null,
                                'expenseName': '',
                                'expenseReason': '',
                                'isBillable': false,
                                'isReImbursable': false,
                                'templateCategoryId': null,
                                'expensesId': 0

                            })

                            settemplateCatStore({

                                'selectType': '',
                                'value': ''

                            })
                        }}>
                        {' '}
                    </Nav>
                    {/*All views of Modal*/}

                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>

                        <View
                            style={{
                                flex: 1,



                            }}>

                            <View
                                style={{
                                    width: '100%', height: '100%',
                                    // borderTopStartRadius: 20, borderTopEndRadius: 20, 
                                    backgroundColor: COLORS.FormBGColor,
                                    flexDirection: 'column',
                                    // padding: 30,
                                    alignItems: 'center', alignSelf: 'center'
                                }}>



                                <View style={{
                                    flex: 1, backgroundColor: COLORS.FormBGColor,
                                    justifyContent: 'center', borderRadius: 8,
                                    paddingBottom: 10, paddingTop: 8,
                                }}>


                                    <FlatList style={{ marginTop: 10, maxHeight: '100%', }}
                                        contentContainerStyle={{ justifyContent: 'space-evenly' }}
                                        data={FieldListArrayEdit}
                                        renderItem={renderFieldListEdit}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                    />

                                </View>



                                <View style={styles.bottomBtns}>


                                    {/* <TouchableOpacity
                                    style={{
                                        height: 35,
                                        width: '40%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        borderWidth: 0.5,
                                        borderColor: 'rgba(42,76,136,1.0)',
                                    }}
                                    // onPress={() => {
                                    //     setisModelVisible(false)
                                    //     setselectedExpenseCategory(null)
                                    //     FieldListArray = []
                                    //     expensesFieldList = []
                                    // }}

                                    onPress={() => {
                                        setisEditModelVisible(false)

                                        setexpenseListTemp({

                                            'amount': null,
                                            'expenseAttachment': null,
                                            'expenseAttachmentId': null,
                                            'expenseIncurredDate': null,
                                            'expenseName': '',
                                            'expenseReason': '',
                                            'isBillable': false,
                                            'isReImbursable': false,
                                            'templateCategoryId': null,
                                            'expensesId': 0

                                        })

                                        settemplateCatStore({

                                            'selectType': '',
                                            'value': ''

                                        })

                                    }}

                                >
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

                                <TouchableOpacity
                                    style={{
                                        height: 35,
                                        width: '40%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        backgroundColor: 'rgba(42,76,136,1.0)',


                                    }}
                                    // onPress={() => {



                                    //     ExpenseModelSubmit();


                                    // }}
                                    onPress={() => {
                                        EditModalSubmit();
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            width: '100%',
                                            height: '100%',
                                            top: 8,
                                            fontSize: 13,
                                            fontFamily: Constant.MontserratBold,
                                        }}>
                                        Submit
                                    </Text>
                                </TouchableOpacity> */}

                                    {/* <SubmitBtn onPress={() => EditModalSubmit()} /> */}

                                    <SubmitBtnWide onPress={() => EditModalSubmit()} />



                                </View>



                            </View>

                        </View>

                    </KeyboardAwareScrollView>



                </Modal>



            </View>
            <Loader isLoader={isLoading}> </Loader>
        </>
    );
}

export default ProAddExpense;