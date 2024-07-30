import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, ActivityIndicator } from "react-native";

import { Shadow } from 'react-native-shadow-2';
import { Constant } from '../Constant/Index';



export const PillsCheckBoxObj = ({ Title = "Title", dataArray = [{ value: 'Alpha' }, { value: 'Beta' }, { value: 'Gamma' }, { value: 'Delta' }, { value: 'Penta' }, { value: 'Lambda' }], selectedData = {}, keyName = 'value', onSelect = (item, index) => { console.log('click Button Name: ', item, 'index', index,) }, showLableTitle = (item, index) => { return item[keyName] }, disabled = false, selectAllFlag = true, selectAllLabel = 'Select All' }) => {

    console.log('ff');

    const [justUpdate, setjustUpdate] = useState(false)

    // const [scrollviewLayout, setscrollviewLayout] = useState({})

    const [isSelectAll, setisSelectAll] = useState(false)

    function addRemove(objVal) {

        let objStr = JSON.stringify(objVal)

        if (selectedData[objStr] == undefined) {
            selectedData[objStr] = 1
        }

        else {
            delete selectedData[objStr]
        }

    }

    function handleSelectAll(objVal) {

        // console.log('click Button Name: ', item, 'index', index)





        let objStr = JSON.stringify(selectAllLabel)

        if (selectedData[JSON.stringify(selectAllLabel)] != undefined) {
            // selectedData = {}

            Object.keys(selectedData).forEach((item, index) => {

                delete selectedData[item]

            })

        }

        else {
            // selectedData = {}

            Object.keys(selectedData).forEach((item, index) => {

                delete selectedData[item]

            })

            selectedData[objStr] = 1
        }

        // selectedData = {}
        // selectedData[objStr] = 1

        // onSelect(selectAllLabel, 0)

        // console.log('print test', selectedData);


        // console.log('PillsCheckBoxObj', selectedData[JSON.stringify(item)]);

        // setselectedPill(item)


    }

    function getTest() {

        let tempArr = []

        Object.keys(selectedData).forEach((item, index) => {

            tempArr.push(JSON.parse(item))



        })

        console.log('getTest', tempArr);


    }

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'column', height: 90, justifyContent: 'center', }}>
                <TouchableOpacity activeOpacity={1} onPress={() => {

                    console.log('selectedData', selectedData);
                    getTest()

                }}>
                    <Text allowFontScaling={false} style={{
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 15,
                    }}>{Title}</Text>
                </TouchableOpacity>


                <ScrollView
                    horizontal
                    nestedScrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    // style={{ backgroundColor: 'red', }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                >

                    {selectAllFlag ?

                        <TouchableOpacity disabled={disabled} style={{ alignSelf: 'center', padding: 12, backgroundColor: selectedData[JSON.stringify(selectAllLabel)] != undefined ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5, marginRight: 5 }} onPress={() => {

                            handleSelectAll()

                            setjustUpdate(!justUpdate)

                            // Object.keys(selectedData).forEach((key)=>{

                            //     console.log('sss', key);

                            //     delete selectedData[key]


                            // })

                            // let objStr = JSON.stringify(selectAllLabel)

                            // selectedData[objStr] = 1

                            // setjustUpdate(!justUpdate)

                        }} >

                            <Text allowFontScaling={false} style={{
                                color: selectedData[JSON.stringify(selectAllLabel)] != undefined ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                fontSize: 13,
                            }}> {selectAllLabel} </Text>

                        </TouchableOpacity>
                        : <></>
                    }

                    {dataArray?.map((item, index) => {

                        return (<TouchableOpacity disabled={disabled} key={String(index)} style={{ alignSelf: 'center', padding: 12, backgroundColor: selectedData[JSON.stringify(item)] != undefined ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5, marginRight: 5 }} onPress={() => {
                            // console.log('click Button Name: ', item, 'index', index)

                            if (selectAllFlag == true) {

                                if (selectedData[JSON.stringify(selectAllLabel)] != undefined) {

                                    return
                                }

                            }

                            onSelect(item, index)
                            addRemove(item)
                            setjustUpdate(!justUpdate)
                            // console.log('PillsCheckBoxObj', selectedData[JSON.stringify(item)]);

                            // setselectedPill(item)

                        }}>

                            <Text allowFontScaling={false} style={{
                                color: selectedData[JSON.stringify(item)] != undefined ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                                fontSize: 13,
                            }}> {showLableTitle(item, index)} </Text>

                        </TouchableOpacity>
                        );
                    })}

                </ScrollView>


            </View>




            <View style={{
                //  backgroundColor: '#e6e6e6',
                width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3.4, padding: 10, paddingTop: 0
            }}>

                {selectedData[JSON.stringify(selectAllLabel)] != undefined ?

                    <React.Fragment>

                        <View style={{ alignSelf: 'center', padding: 8, backgroundColor: '#36B0FE', borderRadius: 15, marginLeft: 5, marginRight: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: 'white', fontFamily: Constant.MontserratMedium, justifyContent: 'center', alignItems: 'center' }}> {selectAllLabel} </Text>

                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 20, height: 20, padding: 1, borderRadius: 10, marginLeft: 5 }} onPress={() => {
                                // addRemove(item)
                                Object.keys(selectedData).forEach((item, index) => {

                                    delete selectedData[item]

                                })
                                setjustUpdate(!justUpdate)
                                // console.log('scroll', scrollviewLayout);
                            }} >
                                {/* <Text style={{ fontSize: 15, color: '#bfbfbf', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontWeight: '900' }}>x</Text> */}

                                <Image
                                    source={require('../images/cancelSimple.png')}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        resizeMode: 'contain',
                                        alignSelf: 'center',
                                        tintColor: '#bfbfbf'

                                    }} />

                            </TouchableOpacity>
                        </View>


                    </React.Fragment>

                    :

                    Object.keys(selectedData).map((item, index) => {

                        return (

                            <React.Fragment key={String(index)}>

                                <View style={{ alignSelf: 'center', padding: 8, backgroundColor: '#36B0FE', borderRadius: 15, marginLeft: 5, marginRight: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Text allowFontScaling={false} style={{ fontSize: 12, color: 'white', fontFamily: Constant.MontserratMedium, justifyContent: 'center', alignItems: 'center' }}> {showLableTitle(JSON.parse(item), index)} </Text>

                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 20, height: 20, padding: 1, borderRadius: 10, marginLeft: 5 }} onPress={() => {
                                        addRemove(JSON.parse(item))
                                        setjustUpdate(!justUpdate)
                                        // console.log('scroll', scrollviewLayout);
                                    }} >
                                        {/* <Text style={{ fontSize: 15, color: '#bfbfbf', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontWeight: '900' }}>x</Text> */}

                                        <Image
                                            source={require('../images/cancelSimple.png')}
                                            style={{
                                                width: 10,
                                                height: 10,
                                                resizeMode: 'contain',
                                                alignSelf: 'center',
                                                tintColor: '#bfbfbf'

                                            }} />

                                    </TouchableOpacity>
                                </View>


                            </React.Fragment>

                        )

                    })


                    // dataArray?.map((item, index) => {

                    //     return (

                    //         <React.Fragment key={String(index)}>
                    //             {selectedData[JSON.stringify(item)] != undefined ?
                    //                 <View style={{ alignSelf: 'center', padding: 8, backgroundColor: '#36B0FE', borderRadius: 15, marginLeft: 5, marginRight: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    //                     <Text style={{ fontSize: 12, color: 'white', fontFamily: Constant.MontserratMedium, justifyContent: 'center', alignItems: 'center' }}> {showLableTitle(item, index)} </Text>

                    //                     <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 20, height: 20, padding: 1, borderRadius: 10, marginLeft: 5 }} onPress={() => {
                    //                         addRemove(item)
                    //                         setjustUpdate(!justUpdate)
                    //                         // console.log('scroll', scrollviewLayout);
                    //                     }} >
                    //                         {/* <Text style={{ fontSize: 15, color: '#bfbfbf', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontWeight: '900' }}>x</Text> */}

                    //                         <Image
                    //                             source={require('../images/cancelSimple.png')}
                    //                             style={{
                    //                                 width: 10,
                    //                                 height: 10,
                    //                                 resizeMode: 'contain',
                    //                                 alignSelf: 'center',
                    //                                 tintColor: '#bfbfbf'

                    //                             }} />

                    //                     </TouchableOpacity>
                    //                 </View>
                    //                 : <></>}

                    //         </React.Fragment>
                    //     );
                    // }
                    // )


                }







            </View>

        </>
    );

}

export function getCheckedData(rawData) {

    let tempArr = []

    console.log('rawData', rawData);

    Object.keys(rawData).forEach((item, index) => {

        tempArr.push(JSON.parse(item))



    })

    console.log('final Selected Data', tempArr);

    return tempArr

}