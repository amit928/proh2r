import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator } from "react-native";

import { Shadow } from 'react-native-shadow-2';
import { Constant } from '../Constant/Index';




const PillsDropDownObject = ({ Title = "Title", dataArray = [{value: 'Alpha'}, {value: 'Beta'}, {value: 'Gamma'}, {value: 'Delta'}], keyName= 'value', onSelect = (item, index) => { console.log('click Button Name: ', item, 'index', index) },  showLableTitle = (item, index) => { return item[keyName] }, selectedData={}, disabled=false  }) => {

    console.log(dataArray);

    return (
        <View style={{display: 'flex', flexDirection: 'column',  height: 90, justifyContent: 'center' }}>
            <Text  allowFontScaling={false} style={{
                fontFamily: Constant.MontserratMedium,
                fontSize: 15, 
            }}>{Title}</Text>


            <ScrollView
                horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
            // style={{ backgroundColor: 'red', }}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            >

                {dataArray?.map((item, index) => {

                    return (<TouchableOpacity disabled={disabled} key={String(index)} style={{ alignSelf: 'center', padding: 12, backgroundColor: selectedData[keyName] == item[keyName] ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5, marginRight: 5 }} onPress={() => {
                        // console.log('click Button Name: ', item, 'index', index)

                        onSelect(item, index)

                        // setselectedPill(item)

                    }}>

                        <Text allowFontScaling={false}  style={{
                            color: selectedData[keyName] == item[keyName] ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                            fontSize: 13,
                        }}> {showLableTitle(item, index)} </Text>

                    </TouchableOpacity>
                    );
                })}

            </ScrollView>
        </View>
    );

}

export default PillsDropDownObject