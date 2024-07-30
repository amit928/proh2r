import React from 'react';
import {
    
    StyleSheet,
    Text,
    View, processColor, Dimensions
} from 'react-native';
import { calcPercentage } from '../Externel Constant/Utility';

const ProgressBar = ({ value = 50, Width = 200, Height = 10, backgroundColor='#3B41CE' }) => {

    // const windowWidth = Dimensions.get('window').width;
    // const windowHeight = Dimensions.get('window').height;

    const valueToString = value > 100 ? '100%' : value < 0 ? '0%' : String(value) + '%';

    // console.log(valueToString);

    return (


        <View style={{ width: Width, height: Height, backgroundColor: backgroundColor, flexDirection: 'row', borderRadius: 10 }}>

            <View style={{ height: '100%', width: valueToString, backgroundColor: 'white', borderRadius: 10 }}>

            </View>

            <View style={{ height: '100%', flex: 1, borderRadius: 10 }}>

            </View>

        </View>


    );

}

export default ProgressBar

