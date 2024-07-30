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



export default function PunchTimeLineRecord({ first = 'Date', second = 'Work Hours', third = 'Status', isHead = false }) {

    const radius = isHead ? 17 : 0

    const styles = StyleSheet.create({
        text: {
            fontFamily: isHead ? Constant.MontserratSemiBold : Constant.MontserratMedium,
            fontSize: isHead ? 15 : 13,
            color: isHead ? 'white' : 'black',
            width: '35%',
            // alignSelf: 'center',
            // backgroundColor: 'red',
            // textAlign: 'center',
            paddingLeft: 16
        }
    })

    return (
        <View style={{ width: '100%', backgroundColor: isHead ? '#3934ee' : 'white', borderTopRightRadius: radius, borderTopLeftRadius: radius, alignItems: 'center', padding: 10, flexDirection: 'row', }}>
            <Text
                allowFontScaling={false}
                style={styles.text}>
                {first}
            </Text>
            <Text
                allowFontScaling={false}
                style={styles.text}>
                {second}
            </Text>
            <Text
                allowFontScaling={false}
                style={[styles.text, {paddingLeft: 0, right: isHead ? 0 : 10}]}>
                {third}
            </Text>
        </View>
    )

}