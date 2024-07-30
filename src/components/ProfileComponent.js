import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ListView, Image } from 'react-native'

const ProfileComponent = ({ profileUrl, username, email }) =>
  <View style={{flexDirection:'row', padding:10}}>
		<Image source={require('../images/logo.png')}
		resizeMode="contain" style={{ width:'100%', height:150}} />
  
		{/* <View style ={{justifyContent:'center', margin:15}}>
    	<Text style={{fontWeight:'700', fontSize:25, color:'#444'}}>{username}</Text>
    	<Text style={{fontWeight:'200', color:'#999'}}>{email}</Text>
  	</View> */}
		
  </View>
export default ProfileComponent