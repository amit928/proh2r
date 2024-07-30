///*****************************************/////////
///*****************************************/////////
///////////// Created By Chandan Mishra
            // ----- Upgraded By Aditya Gupta ----- /////////////
///////////// Nile Technologies PVT Ltd./////////////
///*****************************************/////////
///*****************************************/////////


import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal,ScrollView,TouchableOpacity,Image} from 'react-native';
import * as Constant from '../Constant/Constants';

export default class CustomPicker extends Component {

    constructor(props){
        super(props)

        this.state = {
            selectedItem: ''
        }
    }

    render() {

        const{ showPicker,arr,handleClose,handleSubmit,title} = this.props
        return (
           

            <Modal
                visible={showPicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    handleClose()
                }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',flexDirection:'row' }}
                onPress={()=>{
                    handleClose()
                }}
                >
                    </TouchableOpacity>

                    <View style={{alignSelf:'flex-end',width:'100%',height:300, backgroundColor: 'white', borderRadius: 10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratMedium,fontSize:17,padding:16}}>{title}</Text>

                     <TouchableOpacity style={{height:53,width:100,alignItems:'center',justifyContent:'center'}} onPress={()=>(handleClose())}>
                        <Image style={{height:17,width:17,resizeMode:'contain',marginLeft:35}} source={require('../images/cancelSimple.png')}></Image>
                    </TouchableOpacity> 
                  
                    </View>
                    <View style={{backgroundColor:'gray',height:1,width:'100%'}}></View>
                  
                    <ScrollView style={{width:'100%'}}>
                    {
                        arr.map((item,index)=>
                       
                        <TouchableOpacity style={{justifyContent:'space-between',width:'100%', flexDirection: 'row', alignItems: 'center'}} onPress={()=>(handleSubmit(item,index),handleClose,this.setState({selectedItem: item}))} key={index}>
                        <Text allowFontScaling={false} style={{color:'rgba(128,128,128,1.0)',fontFamily:Constant.MontserratMedium,fontSize:14,paddingLeft:30,paddingRight:30,paddingTop:15,paddingBottom:15}}>{item}</Text>
                        {/* <View style={{height:0.4,backgroundColor:'rgba(128,125,125,0.4)',width:'100%'}}></View> */}

                        {this.state.selectedItem == '' ? 

                        <></>
                        
                            :

                            this.state.selectedItem == item ?
                            <View style={{width: 14,
                                height: 14, backgroundColor: '#5683AF', borderRadius: 10,marginRight:30}}/>
                                :<></>
                    }
                        
                        
                        
                       </TouchableOpacity>

                       
                       
                       
                       )
                    }
                    </ScrollView>
                    <View style={{height:30}}></View>
                  </View>
                  
                   {/* <View style={{ backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center',marginLeft:35.5}}>
                    <View  style={{height:30,width:200,backgroundColor:'rgba(86,105,233,1.0)',justifyContent: 'center', alignItems: 'center',borderTopRightRadius:10,borderTopLeftRadius:10}}>
                    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratBold,fontSize:13,color:'white'}}>{title}</Text>
                    </View>
                    <ScrollView style={{maxHeight:400,width:200,minHeight:20}}>
                    {
                        arr.map((item,index)=>
                       
                        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:'100%'}} onPress={()=>(handleSubmit(item,index),handleClose)} key={index}>
                        <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratSemiBold,fontSize:12,paddingLeft:30,paddingRight:30,paddingTop:10,paddingBottom:10}}>{item}</Text>
                        <View style={{height:0.5,backgroundColor:'gray',width:'100%'}}></View>
                       </TouchableOpacity>
                       
                       )
                    }
                    </ScrollView>
                        
                    </View>

                    <TouchableOpacity style={{height:400,width:35,borderRadius:17.5,marginTop:-74,alignItems:'center'}} onPress={()=>(handleClose())}>
                        <Image style={{height:30,width:30}} source={require('../images/cancel.png')}></Image>
                    </TouchableOpacity> */}



                    
                    
                    
            </Modal>
        );
    }
}