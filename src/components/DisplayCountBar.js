import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput } from 'react-native';
import * as Constant from '../Constant/Constants';


const DisplayCountBar = ({ title='Total Pending Requests:', total= 0, topMargin = true }) => {

    return (

        <View style={{ top: topMargin ?  14 : 0, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, justifyContent: 'space-between',  width: '100%' }}>
            <Text allowFontScaling={false} style={{
                fontSize: 17,
                //  fontWeight: 'bold', color: '#A9A9A9', 
                color: '#4d4d4d', fontFamily: Constant.MontserratRegular
            }}>{title} </Text>

            <View style={{ padding: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4231FF', width: 55, borderRadius: 5 }}>
                <Text allowFontScaling={false} style={{
                    fontSize: 17,
                    //  fontWeight: 'bold', color: '#A9A9A9', 
                    color: 'white', fontFamily: Constant.MontserratRegular
                }}>{total}
                </Text>

            </View>

        </View>
    );
}

export default DisplayCountBar