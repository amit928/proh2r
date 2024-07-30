import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class CustomNav extends Component {
	render(){
		return(
			//<View style={styles.container}>
            <View style={styles.navView}>
            <Text allowFontScaling={false}  style={styles.navTitle}>
            {this.props.value}        
            </Text>
            </View>
  		  //  </View>
			)
	}
}

const styles = StyleSheet.create({
    container: {

        height:"100%",
        width:"100%",
    },
    navView: {
        height:80,
        width:"100%",
        backgroundColor:'#1c313a',
        alignItems:'center',
        justifyContent:'center'
    },

    navTitle: {

        height:20,
       // backgroundColor:'#1c313a',
        textAlign:'center',
        color:'#ffffff',
        top:10,
        fontSize:16,
        fontWeight:'500',
    },
});