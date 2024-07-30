import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator } from "react-native";

import { Shadow } from 'react-native-shadow-2';
import { COLORS, Constant } from '../Constant/Index';
import Nav from '../components/NavBar';


const CustomScreen = ({ScreenTitle = 'CustomScreen', isScreenVisible=false, backAction=()=>{console.log('backAction not defined')}, Views = (<View
    style={{
        width: '100%', height: '100%',
        // borderTopStartRadius: 20, borderTopEndRadius: 20, 
        backgroundColor: 'red',
        flexDirection: 'column',
        // padding: 30,
        alignItems: 'center', alignSelf: 'center',
        justifyContent: 'center'
    }}>

   
<Text allowFontScaling={false} >Hi this is default View</Text>


</View>)}) => {

    return (

        <Modal
            animationType={"fade"}
            transparent={false}
            visible={isScreenVisible}
            onRequestClose={() => {

                console.log("CustomScreen has been closed.")
            }}>

            <Nav
                backHidden={false}
                title={ScreenTitle}
                backAction={() => {

                    backAction()

                }}>
                {' '}
            </Nav>

            <View style={{ flex: 1, backgroundColor: COLORS.FormBGColor }}>
                

                {Views}

            </View>







        </Modal>
    );

}

export default CustomScreen