import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions
} from 'react-native';
import { calcPercentage } from '../Externel Constant/Utility';

import ProgressBar from './ProgressBar';



const LoadingSplash = ({ progressValue= 50 }) => {

    const windowWidth = Dimensions.get('window').width;
    // const windowHeight = Dimensions.get('window').height;

    // const valueToString = value > 100 ? '100%' : value < 0 ? '0%' : String(value) + '%' ;

    // console.log(valueToString);

    console.log('progressValue', progressValue);

    return (
        <ImageBackground source={require('../images/splash.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'stretch', justifyContent: 'space-between', alignItems: 'center', position: 'absolute' }}>
        <Image style={{ height: '25%', width: '65%', resizeMode: 'contain' }} source={require('../images/splash1.png')}>

        </Image>
        <Image style={{ height: '25%', width: '70%', flex: 3, resizeMode: 'contain', marginTop: 40 }} source={require('../images/splash2.png')}>

        </Image>
        <View style={{bottom: 25}}>
        <ProgressBar value={progressValue}/>
        </View>
        <Image style={{ height: '25%', width: '65%', flex: 3, resizeMode: 'contain' }} source={require('../images/splash3.png')}>

        </Image>
      </ImageBackground>
    );

}

export default LoadingSplash