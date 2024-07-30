import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { FlatList, Alert } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast'
import CustomPicker from '../../components/CustomPicker';

import Loader from '../../components/Loader';
import NavBar from '../../components/NavBar';

const ViewSeperationRequest = (props) => {


    const { goBack } = props.navigation;

    console.log(props.route.params.seperationData);

    const seperationData = props.route.params.seperationData

    const [isLoader, setisLoader] = useState(false)

    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const WINDOW_WIDTH = Dimensions.get('window').width;
    const [scrollViewLayout, setscrollViewLayout] = useState({
        "y": 10,
        "width": 394,
        "height": 716,
        "x": 10
    })


    const styles = StyleSheet.create({


        desiDeptContainer: {
            width: '100%', padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
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
            <NavBar title={"View Separation Request"} backHidden={false} backAction={() => goBack()}> </NavBar>

            <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>

                <ScrollView showsVerticalScrollIndicator={false} onLayout={e => {
                    setscrollViewLayout(e.nativeEvent.layout)
                    console.log(e.nativeEvent.layout)
                }} style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white' }}>


                    <View style={{
                        width: scrollViewLayout.width, flexDirection: 'column',
                    }}>

                        <View style={{ width: '100%', padding: 5, flexDirection: 'row', justifyContent: 'center', marginTop: 5, borderBottomColor: 'grey', borderBottomWidth: 0.17}}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                <Text  allowFontScaling={false}  style={{
                                    fontFamily: Constant.MontserratSemiBold, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 22),
                                    color: '#595959'
                                    // color: '#0f00b3'
                                }}>
                                    {seperationData.seperationDetails.empName + ' - ' + seperationData.seperationDetails?.empCode}
                                </Text>
                                {/* <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratMedium, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 13), color: '#4d4d4d' }}>
                                    {'Emp Code: ' + payslipData.empCode}
                                </Text> */}
                            </View>
                         
                         
                            {/* <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 13), color: '#4d4d4d' }}>{'Process Status'}</Text>

                                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: Utility.getSizeValueFromLayoutWidthORHeight(scrollViewLayout.width, 17), color: '#4d4d4d' }}>{seperationData.seperationDetails.resignationStatus}</Text>
                            </View> */}
                        </View>


                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Process Status'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.resignationStatus}
                            </Text>


                        </View>




                        <View style={[styles.desiDeptContainer, {backgroundColor: '#e7f4fd'}]}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Separation Type'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.separationType}
                            </Text>


                        </View>

                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Raised On'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {Moment(String(seperationData.seperationDetails.raisedOn)).format('DD-MM-YYYY')}
                            </Text>


                        </View>

                        <View style={[styles.desiDeptContainer, {backgroundColor: '#e7f4fd'}]}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Relieving Date'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {Moment(String(seperationData.seperationDetails.relievingDate)).format('DD-MM-YYYY')}
                            </Text>


                        </View>

                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Notice Period'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.noticePeriod + ' Days'}
                            </Text>


                        </View>

                        <View style={[styles.desiDeptContainer, {backgroundColor: '#e7f4fd'}]}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'L1 Supervisor'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.l1Supervisor}
                            </Text>


                        </View>
                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Comments'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.l1SupervisorComments}
                            </Text>


                        </View>

                        <View style={[styles.desiDeptContainer, {backgroundColor: '#e7f4fd'}]}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'L2 Supervisor'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.l2Supervisor}
                            </Text>


                        </View>
                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Comments'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.l2SupervisorComments}
                            </Text>


                        </View>

                        <View style={[styles.desiDeptContainer, {backgroundColor: '#e7f4fd'}]}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'HR Supervisor'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.hrmanagerSupervisor}
                            </Text>


                        </View>
                        <View style={styles.desiDeptContainer}>


                            <Text  allowFontScaling={false}  style={styles.desiDeptRowHead}>
                                {'Comments'}
                            </Text>
                            <Text  allowFontScaling={false}  style={styles.desiDeptRowData}>
                                {seperationData.seperationDetails.hrmanagerSupervisorComments}
                            </Text>


                        </View>




                        <View style={{ flex: 1, backgroundColor: 'white', }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                                <Text    allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, color: '#4863EF', fontSize: 16, padding: 10, width: '100%', marginTop: 0, textAlign: 'center' }}>Process History</Text>

                                {

                                    seperationData.processHistory.map((item, index) =>

                                        <View style={{ width: '100%', flexDirection: 'row' }} key={index}>
                                            <View style={{ width: 55, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
                                                {
                                                    index != 0 ? <View style={{ height: 16, width: 2, backgroundColor: '#C1C1C1' }}></View> : <></>

                                                }
                                                <View style={item.status != "Pending" ? { height: 55, width: 55, borderRadius: 27.5, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }
                                                    : { height: 55, width: 55, borderRadius: 27.5, backgroundColor: 'rgba(238,163,69,1.0)', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={item.status == "Pending" ? require('../../images/warningWhite.png') : require('../../images/approveWhite.png')}></Image>

                                                </View>
                                                {
                                                    index != seperationData.processHistory.length - 1 ?

                                                        <View style={{ height: 16, width: 2, backgroundColor: '#C1C1C1' }}></View>
                                                        : <></>}
                                            </View>
                                            <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.0)', justifyContent: 'center' }} onPress={() => { }}>
                                                <Text  allowFontScaling={false}   style={{ fontFamily: item.status == "Pending" ? Constant.MontserratRegular : Constant.MontserratSemiBold , color: 'black', fontSize: 13, padding: 10 }}>{item.stepValue}</Text>
                                            </TouchableOpacity>
                                        </View>

                                    )
                                }
                            </ScrollView>
                        </View>




                    </View>


                </ScrollView>


            </View>

            <Loader isLoader={isLoader} />
        </>
    )

}





export default ViewSeperationRequest