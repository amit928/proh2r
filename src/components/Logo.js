import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image,Dimensions
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(
			
			this.props.value == "1"  ? 
			
			<View style={styles.container}>

			<Image  style={{width:Dimensions.get('window').width-120, height: 250,resizeMode:'contain'}}
							source={require('../images/logo.png')}/>

			</View>
			: 
			
<View  style={styles.containerCondition}>
<Image  style={{width:Dimensions.get('window').width-120, height: 250,resizeMode:'contain'}}
				source={require('../images/logo.png')}/>
</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
		alignItems: 'center',
		marginTop:-150
	},

	containerCondition : {
		// flexGrow: 1,
		 //justifyContent:'flex-end',
		 alignItems: 'center',
		 marginTop:0
	 },
	
});