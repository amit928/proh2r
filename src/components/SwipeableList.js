import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator, SafeAreaView } from "react-native";
import * as Constant from '../Constant/Constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Shadow } from 'react-native-shadow-2';
import { calcPercentage } from '../Externel Constant/Utility';
import { COLORS } from '../Constant/Index';


const SwipeableList = ({ onPress = () => { }, title = 'Title', fromTo = 'From This to That', statusHeading = 'Status: ', statusMain = 'Unknown', statusMainColor = '#FF9821', LeftSwipeActions = (swipeRef) => { return <></> }, rightSwipeActions = (swipeRef) => { return <></> }, imgURI = null, hideRightActionBtn=false, onSwipeableWillOpen = (swipeRef) => { return <></> } }) => {

    const swipeRef = useRef()



    const [listWidth, setlistWidth] = useState(0)

    return (
        <Swipeable
            // friction={1}
            ref={swipeRef}
            // onSwipeableOpen={()=>{return onSwipeableOpen(swipeRef)}}
            overshootLeft={false}
            overshootRight={false}
            // overshootFriction={8}
            renderLeftActions={() => {
                return LeftSwipeActions(swipeRef)
            }}
            renderRightActions={() => {
                return rightSwipeActions(swipeRef)
            }}
            onSwipeableWillOpen={()=>{return onSwipeableWillOpen(swipeRef)}}
        >

            <TouchableOpacity
                style={{
                    height: 70, flexDirection: 'row', alignItems: 'center', padding: 7, paddingLeft: '3.8%', backgroundColor: 'white', width: '100%', paddingRight: 0,
                    // marginBottom: '0.7%'
                    borderBottomWidth: 2, borderColor: COLORS.FormBGColor
                }}
                activeOpacity={1}

                onPress={() => {
                    onPress()
                }}
            >
                {/* Image */}

                {/* <Shadow distance={5} containerViewStyle={{

               

              }} offset={[0.2, 2]}
                startColor='#e6e6e6'
              
              > */}
                <View style={{
                    // borderWidth: 0.7,
                    // borderColor: '#6831FF',
                    borderRadius: 45,
                    borderWidth: 0.5,
                    borderColor: 'gray',
                    marginRight: 2,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                }}>
                    <Image style={{
                        width: 45, height: 45,
                        // resizeMode: 'contain', 
                        borderRadius: 22.5,
                        // borderWidth: 2
                    }} source={imgURI == null ? require('../images/userListView.png') : {
                        uri: imgURI,
                    }}></Image>
                </View>
                {/* </Shadow> */}
                {/* Text Bar Container */}
                <View style={{
                    flex: 1, height: '100%',
                    // borderTopWidth: 0.4, 
                    // borderBottomWidth: 0.4, borderColor: '#B5B5B5', 
                    flexDirection: 'row',

                }}>
                    <View style={{
                        flexDirection: 'column', flex: 1, height: '100%', backgroundColor: 'white', padding: '2%', paddingVertical: 0,
                        // borderWidth: 1, borderColor: 'blue'
                    }}>

                        {/* All Text  */}
                        <View
                            onLayout={(event) => {
                                const { x, y, width, height } = event.nativeEvent.layout;
                                // console.log(width)
                                setlistWidth(width)

                            }} style={{
                                width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-between',
                                //  paddingLeft: '3%', 
                                backgroundColor: '', flexDirection: 'row'
                            }}>

                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor: 'green', 
                                }}>
                                <Text allowFontScaling={false} style={{ fontSize: (listWidth / 22.71), fontFamily: Constant.MontserratMedium }}>{title}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row', width: calcPercentage(listWidth, 40),
                                //  backgroundColor: 'blue', 
                            }}>
                                <Text allowFontScaling={false} style={{ fontSize: (listWidth / 29.5), color: 'black', fontFamily: Constant.MontserratRegular }}>{statusHeading}</Text>
                                <Text allowFontScaling={false} style={{ fontSize: (listWidth / 29.5), color: statusMainColor, fontFamily: Constant.MontserratRegular }}>{statusMain}</Text>
                            </View>

                        </View>

                        {/* <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Start Date</Text>
                    <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                  </View> */}

                        <View style={{
                            width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'
                            // marginRight: '2%' 
                        }}>

                            {/* <View style={{ height: '100%', alignItems: 'center', justifyContent: 'space-evenly', }}> */}

                            <Text allowFontScaling={false} style={{
                                fontSize: (listWidth / 26.5), fontFamily: Constant.MontserratRegular, alignSelf: 'center', color: '#686868',
                                // right: '6%'
                            }}>{fromTo}</Text>

                            {/* <View style={{ height: 9 }}></View> */}

                            {/* </View> */}



                        </View>

                    </View>

                    {/* Arrow Image */}

                   { hideRightActionBtn ? <></>

                   :
                    <View style={{ width: '15%', height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => {
                            onPress()
                        }} style={{ borderRadius: 6, padding: 7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7FF', borderColor: '#0800CA', borderWidth: 0.5, }} >

                            <Image
                                style={{
                                    height: 10, width: 10, resizeMode: 'contain',

                                    // transform: [{ rotate: '270deg' }],
                                    tintColor: '#0800CA'
                                }}
                                source={require('../images/arrowRight.png')}></Image>

                        </TouchableOpacity>
                    </View>
}






                </View>


            </TouchableOpacity>

        </Swipeable>
    );
};


export default SwipeableList