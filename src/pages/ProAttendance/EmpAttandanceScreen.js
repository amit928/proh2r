import React, { Component, createRef, useState } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    ImageBackground,
    StyleSheet,
    ScrollView,
    Modal
} from 'react-native';
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';

import NavBar from '../../components/NavBar';
import EmpAttandanceView from './EmpAttandanceView';
// const { height, width } = Dimensions.get('window');

export default function EmpAttandanceScreen(props) {

    // { isOpenEmpAttandanceModal = false, handleCloseEmpAttandanceModal = () => { }, overViewData, afterProcessingOverViewData, attendanceRecordsOnDayVOList }

     const { isOpenEmpAttandanceModal, handleCloseEmpAttandanceModal, overViewData, afterProcessingOverViewData, attendanceRecordsOnDayVOList, empName } = props.route.params.payload



    return (
        <>

            {/* <Modal
                visible={isOpenEmpAttandanceModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    handleCloseEmpAttandanceModal()
                }}> */}
                <View style={styles.container}>

                    <NavBar
                        backHidden={false}
                        title={empName}
                        backAction={() => {

                            handleCloseEmpAttandanceModal()

                        }} />

                    <View style={{ flex: 1 }}>


                        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>


                       
                            <EmpAttandanceView
                                {...overViewData}
                                afterProcessingOverViewData={afterProcessingOverViewData}
                                attendanceRecordsOnDayVOList={attendanceRecordsOnDayVOList} isModal={true} navigation={props.navigation}  />

                            <View style={{ marginTop: 20, }} />
                        </ScrollView>
                    </View>
                </View>
            {/* </Modal> */}


        </>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.FormBGColor,
        height: '100%',
        width: '100%',
    },

    cardView: {
        height: 160,
        width: '90%',
        backgroundColor: 'white',
        marginTop: 16,
        shadowColor: 'rgba(185,185,185,1.0)',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 3,
        borderRadius: 12,
        alignSelf: 'center',
    },
});