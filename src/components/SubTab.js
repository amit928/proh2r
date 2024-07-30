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
import * as Constant from '../Constant/Constants';


const { height, width } = Dimensions.get('window');

export default function SubTab({ selectedTab="", setselectedTab=()=>{}, firstTabName='firstTabName', secondTabName='secondTabName' }) {


    return (
        <>
            {/* Tab Buttons */}
            <View style={styles.container}>

                <TouchableOpacity onPress={() => {
                    setselectedTab(0)
                }} style={[styles.btn, { borderColor: selectedTab == 0 ? '#3934ee' : '#b3b3b3', borderTopRightRadius: 0, borderBottomRightRadius: 0, }]}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: selectedTab == 0 ? '#3934ee' : '#808080', fontSize: 13 }}>
                        {firstTabName}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setselectedTab(1)
                }} style={[styles.btn, { borderColor: selectedTab == 1 ? '#3934ee' : '#b3b3b3', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, color: selectedTab == 1 ? '#3934ee' : '#808080', fontSize: 13 }}>
                        {secondTabName}
                    </Text>
                </TouchableOpacity>

            </View>
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