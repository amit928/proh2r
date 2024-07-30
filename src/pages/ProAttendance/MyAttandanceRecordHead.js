import React, { Component, createRef, useEffect, useState } from 'react';
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
import MyAttandanceOverView from './MyAttandanceOverView';
import AttandanceRecord from './AttandanceRecord';


import AttandanceTabs from './AttandanceTabs';

import { fakeAPIData } from './fakeAPIData';


export default function MyAttandanceRecordHead({ first = 'Date', second = 'Work Hours', third = 'Status', isContent = false, isLeaves = false }) {


    return (
        <View style={{ width: '100%', backgroundColor: isContent ? 'white' : '#3934ee', borderTopRightRadius: isContent ? 0 : 17, borderTopLeftRadius: isContent ? 0 : 17, alignItems: 'center', padding: 10, flexDirection: 'row', }}>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: isContent ? Constant.MontserratMedium : Constant.MontserratSemiBold,
                    fontSize: 15,
                    color: isContent ? 'black' : 'white',
                    width: isLeaves ? '40%' : '35%',
                    // alignSelf: 'center',
                    // backgroundColor: 'red',
                    // textAlign: 'center',
                    paddingLeft: 16
                }}>
                {first}
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: isContent ? Constant.MontserratMedium : Constant.MontserratSemiBold,
                    fontSize: 15,
                    color: isContent ? 'black' : 'white',
                    width: isLeaves ? '30%' : '35%',
                    // textAlign: 'center'
                    paddingLeft: 7
                }}>
                {second}
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: isContent ? Constant.MontserratMedium : Constant.MontserratSemiBold,
                    fontSize: 15,
                    color: isContent ? 'black' : 'white',
                    width: '30%',
                    textAlign: 'center'
                }}>
                {third}
            </Text>
        </View>
    )

}