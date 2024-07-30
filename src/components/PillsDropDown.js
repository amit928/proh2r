import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator } from "react-native";

import { Shadow } from 'react-native-shadow-2';
import { Constant } from '../Constant/Index';




const PillsDropDown = ({ Title = "Title", dataArray = ['Alpha', 'Beta', 'Gamma', 'Delta'], onSelect = (item, index) => { console.log('click Button Name: ', item, 'index', index) }, showLableTitle = (item, index) => { return item } }) => {

    console.log(dataArray);

    const [selectedPill, setselectedPill] = useState(-1)

    return (
        <View style={{display: 'flex', flexDirection: 'column',  height: 90, justifyContent: 'center' }}>
            <Text allowFontScaling={false}  style={{
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

                    return (<TouchableOpacity key={String(index)} style={{ alignSelf: 'center', padding: 12, backgroundColor: selectedPill == index ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5, marginRight: 5 }} onPress={() => {
                        // console.log('click Button Name: ', item, 'index', index)

                        onSelect(item, index)

                        setselectedPill(index)

                    }}>

                        <Text allowFontScaling={false}  style={{
                            color: selectedPill == index ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                            fontSize: 13,
                        }}> {showLableTitle(item, index)} </Text>

                    </TouchableOpacity>
                    );
                })}

            </ScrollView>
        </View>
    );

}

export default PillsDropDown