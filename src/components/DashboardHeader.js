import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import * as Constant from '../Constant/Constants';

export default class ProDashBoard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { empName, designation, imgUrl, notification, navigation, showQuickLink } = this.props
        return (


            <View style={{ overflow: "hidden", borderBottomEndRadius: 20, borderBottomStartRadius: 20, }}>
                <ImageBackground style={{ height: 190, width: '100%', }} source={require('../images/dashHeader.jpg')}>

                    {/* <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 80 }}>
                        <Image style={{ height: 55, width: 55, marginLeft: 12.5 }} source={require('../images/proH2RDaahIcon.png')}>
                        </Image>
                        <View style={{ flexDirection: 'row' }}> */}

                    {/* <TouchableOpacity style={{shadowColor:'gray',height:80,width:50,justifyContent:'center',alignItems:'center',flexDirection:'row'}} 
               onPress={this.props.showQuickLink} >
                <Image style={{height:26,width:26}} source={require('../images/plane.png')}></Image>
            </TouchableOpacity> */}

                    {/* <TouchableOpacity style={{ shadowColor: 'gray', marginRight: 0, height: 80, width: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                onPress={() => this.props.logout()}>
                                <Image style={{ height: 26, width: 26 }} source={require('../images/logoutWhite.png')}></Image>

                            </TouchableOpacity> */}


                    {/* <TouchableOpacity style={{shadowColor:'gray',marginRight:0,height:80,width:50,justifyContent:'center',alignItems:'center',flexDirection:'row'}} 
            onPress={()=>navigation.navigate('NotificationScreen')}>
                <Image style={{height:26,width:26, tintColor: 'white'}} source={require('../images/notification.png')}></Image>
                {
                    notification != 0 && notification != "0" && notification != "" ?
                    <View style={{backgroundColor:'red',height:12,width:12,borderRadius:6,right:9,top:-8}}></View>
                    : <></>
                }
            </TouchableOpacity> */}

                    {/* </View>

                    </View> */}

                    <View style={{
                        width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30,
                        // backgroundColor: 'red', 
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 19 }}>
                            <TouchableOpacity onPress={() => this.props.btnActions(0)}>
                                <Image source={(imgUrl == "" || imgUrl == 'null'
                                    || imgUrl == null) ? require('../images/user.jpeg')
                                    : { uri: imgUrl }} style={{ width: 55, height: 55, borderRadius: 55, borderWidth: 1.0, borderColor: 'rgba(255,255,255,1)' }}
                                    
                                    >

                                </Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{}} 
                            // disabled={true}
                            
                            onPress={()=>{
                                this.props.navigation.navigate('TestPages')
                                // showQuickLink()
                            }}
                            
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Text allowFontScaling={false} style={{ color: 'white', fontFamily: Constant.MontserratRegular, padding: 4, fontSize: 18 }}> Hello,</Text>
                                    <Text allowFontScaling={false} style={{ color: 'white', fontFamily: Constant.MontserratSemiBold, padding: 4, fontSize: 18 }}>{String(empName).split(' ')[0]}</Text>
                                </View>
                                <Text allowFontScaling={false} style={{ color: 'white', fontFamily: Constant.MontserratRegular, fontSize: 12, left: 9.8 }}>{designation}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <TouchableOpacity style={{ shadowColor: 'gray', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 15 }}
                            onPress={() => navigation.navigate('NotificationScreen')}>
                            <Image style={{ height: 26, width: 26, tintColor: 'white' }} source={require('../images/notification.png')}></Image> */}

                            {/* Uncomment it */}

                            {/* {
                                notification != 0 && notification != "0" && notification != "" ?
                                    <View style={{ backgroundColor: 'red', height: 12, width: 12, borderRadius: 6, right: 9, top: -8 }}></View>
                                    : <></>
                            } */}
                        {/* </TouchableOpacity> */}

                    </View>





                </ImageBackground>
            </View>

        );
    }
}