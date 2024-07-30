import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Dimensions,TextInput,Alert, Vibration
} from 'react-native';


//import {Actions} from 'react-native-router-flux';
//import {Router, Stack, Scene} from 'react-native-router-flux';
import CustomNav from '../../components/CustomNav';
import Logo from '../../components/Logo';
import { StackActions } from 'react-navigation';


const styles = StyleSheet.create({
    container : {
      backgroundColor:'#ffffff',
    
      height:'100%',
      width:'100%',
      alignItems:'center',
      //justifyContent :'center'
    },

    signupTextCont : {
        flexGrow: 1,
      alignItems:'flex-end',
      justifyContent :'center',
      paddingVertical:16,
      flexDirection:'row'
    },

    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    },
  
    gotoLoginButton:{
      width:Dimensions.get('window').width-120,
      backgroundColor:'#ffffff',
    },
  
    button: {
      width:Dimensions.get('window').width-120,
      backgroundColor:'#1c313a',
      borderRadius: 5,
      marginVertical: 20,
      paddingVertical: 13,
  },

    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },

    gotoLoginTextButton: {
      fontSize:16,
      fontWeight:'500',
      color:'#000000',
      textAlign:'center'
    },

    inputBox: {
        width:Dimensions.get('window').width-80,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 5,
        height:40,
        paddingHorizontal:16,
        fontSize:16,
        color:'#1F1412',
        marginVertical: 10,
        borderColor:'#D3D3D3',
        borderWidth:1,

    },

});

class ForgotPassword extends Component {

  
    constructor (props) {
        super(props)
        this.state = {
          email: '',
        }
      }
          
      static navigationOptions = {
        
        gesturesEnabled: false
         
      }

      successback = () => {
        
        
        Actions.pop();

      }

    goToLogin(){

      this.props.navigation.dispatch(popAction);

        //Actions.pop();

    }

    onSubmit(){

            if(this.state.email == "") {
                Alert.alert('Please enter email address.')
                Vibration.vibrate()
            }else{
                Alert.alert(
                    "Success",
                    "Reset Link Successfully sent on your E-Mail",
                    [
                      {
                        text: "Ok",
                        onPress: () => this.successback,
                        style: "cancel"
                      },
                    ],
                    { cancelable: false }
                  );
            }
    }

    render() {
      
      const { navigation } = this.props;
      const name = navigation.getParam('name');
      
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;

          return(
            <View style={styles.container}>
             <CustomNav value="Forgot Password">            
             </CustomNav>
             <Logo value="2"/>


                

                <TextInput allowFontScaling={false} 
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder='Email Address'
                    placeholderTextColor="#A9A9A9"
                    //selectionColor="#999999"
                   // keyboardType={keyboardType}
                   // maxLength={maxLength}
                   value={this.state.email}
                   onChangeText={(value) => this.setState({email: value})}
                    returnKeyType="done" />
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit.bind(this)}>
                    <Text  allowFontScaling={false} style={styles.buttonText}>Submit</Text>
                     </TouchableOpacity>
                        <TouchableOpacity style={styles.gotoLoginButton} onPress={()=>goBack()}>
                      <Text allowFontScaling={false}  style={styles.gotoLoginTextButton}>Go to Login</Text>
                    </TouchableOpacity>
                  <Text allowFontScaling={false} >{name}</Text>
            </View>
              )
      }
  }

export default ForgotPassword;