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
} from 'react-native';
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SubTab from '../../components/SubTab';

const { height, width } = Dimensions.get('window');

export default function AttandanceTabs(props) {


    return (
        <>
            {/* Tab Buttons */}
            <SubTab {...props} firstTabName={"My Attendance"} secondTabName={"My Team"}/>
            {/* Tab Buttons */}
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        width: '95%',
        // height: 40, 
        backgroundColor: 'white', borderRadius: 10,
        // borderColor: '#b3b3b3',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 5,

        flexDirection: 'row',
        borderRadius: 30,
    },

    btn: {
        width: '50%', justifyContent: 'center', alignItems: 'center', borderWidth: 1,

        borderRadius: 30,
        padding: 6,
    }

});