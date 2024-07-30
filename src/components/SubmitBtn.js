import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator } from "react-native";

import { Shadow } from 'react-native-shadow-2';
import { Constant } from '../Constant/Index';


const SubmitBtn = ({ onPress = () => { console.log("SubmitBtn onPress not defined") }, title = 'Submit', imgPath = require('../images/floppy-disk.png'), defaultBgColor= '#4231FF', defaultTextColor= 'white', BGOnPressIn= 'white', TextOnPressIn = '#3238e7', shadowColor='#bcbff6'} ) => {

    const [color, setcolor] = useState('#3238e7')
    const [bgColor, setbgColor] = useState('#3238e7')
    const [textColor, settextColor] = useState('white')
    const [isPressedIn, setisPressedIn] = useState(false)

    // Previous Color
        // rgba(68,102,179,1.0)

        const bgOnPressIn = BGOnPressIn
        const textOnPressIn = TextOnPressIn

        const bgOnPressOut = defaultBgColor
        const textOnPressOut = defaultTextColor

        // console.log('btnRnder');

    return (
        <Shadow distance={4} containerViewStyle={{

            //  alignItems: 'center',

        }} offset={[2, 2]}
            startColor={shadowColor}
        // finalColor='#9b9aed' 
        // corners={'bottomRight'}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    backgroundColor: isPressedIn ? bgOnPressIn : bgOnPressOut
                    // 'rgba(242,242,242,1.0)'
                    , height: 40, width: 130, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, display: 'flex', flexDirection: 'row',
                    borderColor: defaultBgColor, borderWidth: 1,
                }} onPress={() => {

                    onPress()


                }}
                onPressIn={() => {
                    setisPressedIn(true)
                }}
                onPressOut={() => {
                    setisPressedIn(false)
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>


                    <Image style={{
                        width: 16, height: 16, resizeMode: 'contain', tintColor: isPressedIn ? textOnPressIn : textOnPressOut
                        //  '#0d0d0d'
                    }} source={imgPath} />

                    <Text allowFontScaling={false} style={{ color: isPressedIn ? textOnPressIn : textOnPressOut , textAlign: 'center', fontSize: 14, fontFamily: Constant.MontserratMedium, marginLeft: 12 }}
                    >{title}</Text>
                </View>
            </TouchableOpacity>


        </Shadow>
    );

}

export default SubmitBtn