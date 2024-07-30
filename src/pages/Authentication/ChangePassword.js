import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Dimensions,TextInput,Alert
} from 'react-native';


//import {Actions} from 'react-native-router-flux';
//import {Router, Stack, Scene} from 'react-native-router-flux';
import CustomNav from '../../components/CustomNav';
import Logo from '../../components/Logo';

const styles = StyleSheet.create({
    container : {
      backgroundColor:'#ffffff',
    
      height:'100%',
      width:'100%',
      alignItems:'center',
      //justifyContent :'center'
    },
});

class ChangePassword extends Component {

    constructor (props) {
        super(props)
       
      }

    render() {

      //  const { handleSubmit, loginUser} = this.props;
    
        //console.log(loginUser);
    
          return(
            <View style={styles.container}>

            </View>
              )
      }
  }

export default ChangePassword;