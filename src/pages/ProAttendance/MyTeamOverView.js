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

export default function MyTeamOverView() {



    return (
        <>

            {/* Date */}
            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                onPress={() => {
                    showDatePicker()
                }}
            >

                <Image
                    source={require('../../images/calendar_plain.png')}
                    style={{
                        // position: 'absolute',
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        alignSelf: 'flex-end',

                        // marginTop: 16,
                        // transform: [{ rotate: openDetails ? '180deg' : '0deg' }],
                        tintColor: '#657BCB',

                    }}
                />

                <Text  allowFontScaling={false}  style={[styles.title, { color: 'rgba(88, 108, 190, 1)', marginLeft: '1%', marginTop: 0 }]}>
                    {'Mon, 5 Mar 2023'}
                </Text>


            </TouchableOpacity>
            {/* Date */}

            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                maximumDate={new Date("2023-03-20")}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}

            />



            <View style={{ width: '100%', flexDirection: 'row' }}>

                <TouchableOpacity style={[styles.countWithTitleBG, {
                    backgroundColor: 'white', borderRadius: 10,
                    borderColor: '#b3b3b3',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    paddingVertical: 5
                }]}>

                    <Text  allowFontScaling={false}  style={[styles.count, { color: 'black' }]}>
                        {valuesArr[tabValue].present}
                    </Text>

                    <Text  allowFontScaling={false}  style={styles.title}>
                        {'All'}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.countWithTitleBG, { paddingVertical: 5 }]}>

                    <Text  allowFontScaling={false}  style={[styles.count]}>
                        {valuesArr[tabValue].leaveTaken}
                    </Text>

                    <Text  allowFontScaling={false}  style={styles.title}>
                        {'Present'}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.countWithTitleBG, { paddingVertical: 5 }]}>

                    <Text  allowFontScaling={false}  style={[styles.count, { color: '#ea6153' }]}>
                        {valuesArr[tabValue].absent}
                    </Text>

                    <Text  allowFontScaling={false}  style={styles.title}>
                        {'Absent'}
                    </Text>

                </TouchableOpacity>



            </View>
        </>)
}


const styles = StyleSheet.create({
    countWithTitleBG: {
        width: `${100 / 3}%`,
        //    backgroundColor: '#e6fff2',
        alignItems: 'center'
    },


    count: { fontFamily: Constant.MontserratMedium, color: '#516b2d', fontSize: 20 },

    title: { fontFamily: Constant.MontserratMedium, color: '#c1bec1', fontSize: 14, marginTop: 5 }

});