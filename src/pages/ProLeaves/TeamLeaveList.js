import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as Constant from '../../Constant/Constants';

const TeamLeaveList = ({ name='', bottomContent='', statusText='', statusColor='', dataObj={}, onPress=()=>{}, showStatus=true}) => {
    return (
        <>
            <TouchableOpacity onPress={() => {

onPress()
            }} style={{
                width: '100%',
                // backgroundColor: 'red',
                flexDirection: 'row', alignItems: 'center', padding: 10,
                paddingHorizontal: 15
            }}>

                <View style={{
                    width: '70%', flexDirection: 'column',
                    //alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 15,
                            color: 'black',
                            // width: '35%',
                            // alignSelf: 'center',
                            // backgroundColor: 'red',
                            // textAlign: 'center',
                            // paddingRight: 16,
                            // alignSelf: 'center'
                        }}>{name} </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 12,
                                color: 'rgba(148, 149, 150, 1)',
                                marginLeft: 1
                                // width: '35%',
                                // alignSelf: 'center',
                                // backgroundColor: 'red',
                                // textAlign: 'center',
                                // paddingRight: 16,
                                // alignSelf: 'center'
                            }}>{bottomContent} </Text>


                    </View>

                </View>

                <View style={{
                    justifyContent: 'flex-end',
                    width: '30%',
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>


{showStatus ?<View style={{
                        // backgroundColor: bgColor, 
                        borderColor: statusColor,
                        borderWidth: statusText == null ? 0 : 1,

                        paddingHorizontal: 7, paddingVertical: 2, borderRadius: 3,
                        right: '50%'
                    }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 12,
                                color: statusColor,
                                // width: '30%',
                                textAlign: 'center',
                                // paddingRight: 16,
                                // alignSelf: 'center'
                            }}>
                            {statusText == null ? '' : statusText}
                        </Text>
                    </View>  : <></>}

                    


                    <Image
                        source={require('../../images/down-arrow.png')}
                        style={{
                            // position: 'absolute',
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            // alignSelf: 'flex-end',
                            // left: '30%',
                            // marginTop: 16,
                            transform: [{ rotate: '270deg' }],
                            // tintColor: '#657BCB',

                        }}
                    />



                </View>

                {/* <View style={{
        // backgroundColor: 'green', 
    }}>
        <Image
            source={require('../../images/down-arrow.png')}
            style={{
                // position: 'absolute',
                height: 20,
                width: 20,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
                // left: '30%',
                // marginTop: 16,
                transform: [{ rotate: openDetails ? '180deg' : '0deg' }],
                tintColor: '#657BCB',

            }}
        />
    </View> */}

            </TouchableOpacity>

            <View style={{
                width: '95%', alignSelf: 'center', height: 1, backgroundColor: '#e6e6e6',
                marginVertical: 5
            }} />
        </>
    )
}

export default TeamLeaveList

const styles = StyleSheet.create({})