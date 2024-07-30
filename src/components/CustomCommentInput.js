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


const CustomCommentInput = ({ label = 'Label', onChangeText=(text)=>{}, placeholder='Write..', value, editable=true, viewOnly=false, blurOnSubmit=false }) => {


    if (!value) {
        return <></> 
     }

    // const [TextValue, setTextValue] = useState('')

    

    return (
        <>

            <Text
                allowFontScaling={false}
                style={ !viewOnly ? {
                    fontFamily: Constant.MontserratMedium,
                    fontSize: 15,
                } : {
                    fontFamily: Constant.MontserratMedium,
                    fontSize: 15,
                    marginBottom: 10
                }}>
                {label}
            </Text>
            <TextInput allowFontScaling={false}
                numberOfLines={5}
                maxLength={200}
                multiline={true}
                style={!viewOnly ? {
                    width: '100%',
                    height: 90,
                    marginTop: 8,
                     color: 'black', alignSelf: 'center',
                    backgroundColor: 'white', borderRadius: 10,
                    opacity: 1,
                    top: 5,
                    marginBottom: 16,
                    textAlignVertical: 'top',
                    padding: 5,
                } : {
                    width: '100%',
                    height: 90,
                     color: 'black', alignSelf: 'center',
                     borderRadius: 10,
                    opacity: 1,
                    marginBottom: 16,
                    textAlignVertical: 'top',
                    paddingLeft: 8,
                    padding: 0,  
                    backgroundColor: '#f8f6fc',
                    borderWidth: 1,
                    borderColor: COLORS.FormBGColor
                } }
                // underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={placeholder}
                placeholderTextColor="#A9A9A9"
                value={value}
                // onChangeText={(text) => setTextValue(text)}
                onChangeText={(text) => {
                    onChangeText(text)
                }}
                returnKeyType="done"
                editable={editable}
                blurOnSubmit={blurOnSubmit}
               

            />


        </>
    )
}

export default CustomCommentInput