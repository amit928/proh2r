import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Logo extends Component {

	render(){
		return(
			<View style={styles.container}>
          <TextInput allowFontScaling={false} style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Email/Employee ID"
              placeholderTextColor = '#A9A9A9'
             // selectionColor="#fff"
              keyboardType="email-address"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput  allowFontScaling={false} style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = '#A9A9A9'
              ref={(input) => this.password = input}
              />
           <TouchableOpacity style={styles.button} onPress={this.props.onAuthButtonPress}>
             <Text allowFontScaling={false} style={styles.buttonText}>{this.props.type}</Text>
           </TouchableOpacity>
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

});
