import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    Dimensions,
    TextInput,
    Alert,
    Keyboard,
    Modal,
} from 'react-native';

import { COLORS, Constant } from '../Constant/Index';



const CustomStaticTextField = ({ label = 'Label', onChangeText = (text) => { }, placeholder = 'Write..', value = '', borderWidth = 0, borderColor = '', }) => {



    return (
        <>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    // paddingLeft: 16,
                    fontSize: 15,
                    marginBottom: 10
                    // marginTop: 8,
                }}>
                {String(label)}
            </Text>

            <View style={{
                width: '100%', height: 44,
                paddingLeft: 8, color: 'black', alignSelf: 'center',
                backgroundColor: '#f8f6fc',
                borderRadius: 10,
                opacity: 1,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: COLORS.FormBGColor,
                justifyContent: 'center'
            }}>

                <Text style={{color: 'black'}}
                    allowFontScaling={false}
                    >
                    {String(value)}
                </Text>

            </View>

            {/* <TextInput allowFontScaling={false}
                style={{
                    width: '100%', height: 44,
                    paddingLeft: 8, color: 'black', alignSelf: 'center',
                    backgroundColor: '#f8f6fc',
                    borderRadius: 10,
                    opacity: 1,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: COLORS.FormBGColor,
                    
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={   editable ?  placeholder : showPlaceHolder ? placeholder : ''}
                placeholderTextColor="#A9A9A9"
                value={value}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    onChangeText(text)
                }}
                returnKeyType="done"
                editable={editable}

                
            /> */}


        </>
    )
}

export default CustomStaticTextField