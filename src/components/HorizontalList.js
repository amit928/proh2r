import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    ImageBackground,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import * as Constant from '../Constant/Constants';
import { Shadow } from 'react-native-shadow-2';

const enableWorkaround = true;
const ScrollViewComponent = enableWorkaround ? GestureHandlerScrollView : ScrollView;

const HorizontalList = ({ item, index, WINDOW_WIDTH }) => {

    const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2));

    console.log('cardSize', cardSize);

    const [isDisabledRight, setisDisabledRight] = useState(false)
    const [isDisabledLeft, setisDisabledLeft] = useState(true)
    const scrollRef = useRef();
    const scrollValue = useRef(0)
    const value = 300
    let currentScrollPosition = 0
    // let isDisabled = false
    function scrollRight() {

        console.log('scrollValue', scrollValue);
        setisDisabledLeft(false)
        scrollValue.current = scrollValue.current + value
        scrollRef.current?.scrollTo({ x: scrollValue.current, y: 0, animated: true })

    }

    function scrollLeft() {
        if (scrollValue.current <= 0) {
            console.log('scrollValue disable', scrollValue);
            if (isDisabledRight == true) {
                setisDisabledRight(false)
            }
            return
        }

        if (isDisabledRight == true) {
            setisDisabledRight(false)
        }
        console.log('scrollValue', scrollValue);
        scrollValue.current = scrollValue.current - value
        scrollRef.current?.scrollTo({ x: scrollValue.current, y: 0, animated: true })

        if (scrollValue.current <= 0) {
            console.log('scrollValue disable Fired', scrollValue);
            setisDisabledLeft(true)
            setisDisabledRight(false)
            return
        }

    }



    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 0;
        return layoutMeasurement.width + contentOffset.x >=
            contentSize.width - paddingToBottom;
    };


    const styles = StyleSheet.create({
        scrollViewCard: {
            // shadowOffset: { width: 0.5, height: 0.5 },
            // shadowColor: 'gray',
            // shadowOpacity: 3.0,
            backgroundColor: 'rgba(240,240,240,1.0)',
            // backgroundColor: 'blue'
            height: 200,
        },
        cardView: {
            height: 180,
            width: (cardSize) - (cardSize / 19),
            // backgroundColor: 'green',
            backgroundColor: 'white',
            marginLeft: 8,
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowColor: 'gray',
            shadowOpacity: 3.0,
            elevation: 3,
            margin: 8,
            borderRadius: 25,
            marginTop: 10,
            // borderWidth: 1,
            // borderColor: 'red'
            // overflow: 'hidden'
        },

        scrollClickButton: {
            borderWidth: 0.7,
            borderRadius: 6, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
        }
    });

    return (
        <View style={styles.cardView}>
            <View
                style={{ flexDirection: 'row', margin: 12, marginBottom: 5, alignItems: 'center', justifyContent: 'space-between', }}>
                {/* {item.arr.length != 0 ?
                    <Shadow distance={4} containerViewStyle={{

                        //  alignItems: 'center',

                        marginRight: 30

                    }} offset={[0.2, 2]}
                        startColor='#cccccc'
                    // finalColor='#9b9aed' 
                    // corners={'bottomRight'}
                    >
                        <TouchableOpacity disabled={isDisabledLeft} onPress={() => { scrollLeft() }} style={[styles.scrollClickButton
                            , { borderColor: isDisabledLeft ? '#d9d9d9' : '#0800CA' },
                            {borderWidth: 0.5}
                            // ,{backgroundColor: isDisabledLeft ? '#d6e2f5' : '#3C71D3',}
                        ]} >

                            <Image
                                style={{ height: 15, width: 15, resizeMode: 'contain', transform: [{ rotate: '90deg' }], tintColor: isDisabledLeft ? '#d9d9d9' : '#0800CA' }}
                                source={require('../images/downArrow.png')}></Image>

                        </TouchableOpacity>
                    </Shadow>
                    : <></>} */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ height: 25, width: 25, resizeMode: 'contain' }}
                        source={item.img}></Image>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 14,
                            padding: 8,
                        }}>
                        {item.name}
                    </Text>
                </View>

                
                {/* Count Indicator */}
                <View style={{ padding: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: item?.arr?.length !=0 ? '#5b4dff' : '#bfbfbf' , width: 48, borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{
                        fontSize: 14, alignItems: 'center', justifyContent: 'center',
                        //  fontWeight: 'bold', color: '#A9A9A9', 
                        color: 'white', fontFamily: Constant.MontserratRegular
                    }}>{item?.arr?.length}
                    </Text>

                </View>
                {/* {item.arr.length != 0 ?
                    <Shadow distance={4} containerViewStyle={{
                        marginLeft: 30
                        //  alignItems: 'center',

                    }} offset={[0.2, 2]}
                        startColor='#cccccc'
                    // finalColor='#9b9aed' 
                    // corners={'bottomRight'}
                    >
                        <TouchableOpacity disabled={isDisabledRight} onPress={() => { scrollRight() }} style={[styles.scrollClickButton
                            , { borderColor: isDisabledRight ? '#d9d9d9' : '#0800CA' },
                            {borderWidth: 0.5}
                            // , {backgroundColor: isDisabledRight ? '#d6e2f5' : '#3C71D3',}
                        ]}>

                            <Image
                                style={{ height: 15, width: 15, resizeMode: 'contain', transform: [{ rotate: '270deg' }], tintColor: isDisabledRight ? '#d9d9d9' : '#0800CA' }}
                                source={require('../images/downArrow.png')}></Image>

                        </TouchableOpacity>
                    </Shadow>

                    : <></>} */}

            </View>
            {/* <FlatList
         horizontal
         data={item.arr}
         renderItem={function (subItem, index) {
           return (
             <View
               style={{alignItems: 'center', width: 93.33, height: 60}}
               key={index}>
               <Image
                 style={{
                   height: 50,
                   width: 50,
                   borderRadius: 23,
                   borderWidth: 1,
                   borderColor: 'rgba(229,229,229,1.0)',
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}
                 source={
                   subItem.profileImg == '' ||
                   subItem.profileImg == 'null' ||
                   subItem.profileImg == null
                     ? require('../images/user.jpeg')
                     : {uri: subItem.profileImg}
                 }></Image>
               <Text
                 allowFontScaling={false}
                 style={{
                   color: 'black',
                   fontFamily: Constant.MontserratMedium,
                   fontSize: 12,
                   padding: 3,
                   marginTop: 6,
                 }}
                 numberOfLines={1}>
                 {subItem.firstName + subItem.lastName}
               </Text>
               <Text
                 allowFontScaling={false}
                 style={{
                   color: 'gray',
                   fontFamily: Constant.MontserratRegular,
                   fontSize: 11,
                   marginTop: 2,
                 }}
                 numberOfLines={1}>
                 {subItem.date}
               </Text>
               <Text
                 allowFontScaling={false}
                 style={{
                   color: 'gray',
                   fontFamily: Constant.MontserratRegular,
                   fontSize: 11,
                   padding: 3,
                 }}
                 numberOfLines={1}>
                 {subItem.daysLeft}
               </Text>
             </View>
           );
         }}
         keyExtractor={(item, index) => index.toString()}
       /> */}

            <View style={{
                width: '100%',
                // borderWidth: 1,
                //         borderColor: 'red',
                alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>

                <View style={{
                    width: cardSize / 1.17,
                    // borderWidth: 1,
                    // borderColor: 'green',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 12,
                    // marginLeft: 20
                    // justifyContent: 'center'
                }}>


                    <ScrollViewComponent
                        scrollEventThrottle={16}
                        nestedScrollEnabled={true}
                        ref={scrollRef}
                        // onScroll={({ nativeEvent }) => {
                        //     console.log(nativeEvent)
                        //     if (isCloseToBottom(nativeEvent)) {
                        //         // console.log('Fired');
                        //         setisDisabledRight(true)
                        //         if (isDisabledLeft) {
                        //             setisDisabledLeft(false)
                        //         }

                        //     }

                        //     else {
                        //         // console.log('not');
                        //     }
                        // }}
                        // contentContainerStyle={{
                        // flex: 1,
                        // justifyContent: 'center',
                        // backgroundColor: 'red',
                        scrollEnabled={item?.arr?.length <= 3 ? false : true
                            // item.arr.length != 0
                        }
                        // }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {item.arr.length != 0 ? (
                            item.arr.map((subItem, index) => (

                                <View
                                    style={{
                                        padding: 2,
                                        alignItems: 'center',
                                        // width: 93.33, height: 60, 
                                        backgroundColor: 'white',
                                        // alignSelf: 'center'
                                        // backgroundColor: 'red'
                                        // borderWidth: 1,
                                        // borderColor: 'red',
                                        // height: 115,
                                        // overflow: 'hidden',
                                        // width: 100,
                                        // borderWidth: 1,
                                        // borderColor: 'red'
                                    }}
                                    key={index}>
                                    <Image
                                        style={{
                                            height: cardSize / 8.599,
                                            width: cardSize / 8.599,
                                            borderRadius: 23,
                                            borderWidth: 1,
                                            borderColor: 'rgba(229,229,229,1.0)',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        source={
                                            subItem.profileImg == '' ||
                                                subItem.profileImg == 'null' ||
                                                subItem.profileImg == null
                                                ? require('../images/user.jpeg')
                                                : { uri: subItem.profileImg }
                                        }></Image>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: 'black',
                                            fontFamily: Constant.MontserratMedium,
                                            fontSize: 12,
                                            padding: 3,
                                            marginTop: 6,
                                        }}
                                        numberOfLines={1}>
                                        {subItem.firstName + " " + subItem.lastName}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: 'gray',
                                            fontFamily: Constant.MontserratRegular,
                                            fontSize: 11,
                                            marginTop: 2,
                                        }}
                                        numberOfLines={1}>
                                        {subItem.date}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: 'gray',
                                            fontFamily: Constant.MontserratRegular,
                                            fontSize: 11,
                                            padding: 3,
                                        }}
                                        numberOfLines={1}>
                                        {subItem.daysLeft}
                                    </Text>

                                </View>

                            ))
                        ) : (
                            <View
                                style={{
                                    alignItems: 'center',
                                    width: 280,
                                    height: 120,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                key={index}>
                                <Image
                                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                                    source={require('../images/noDataFound.png')}></Image>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: '#999999',
                                        fontFamily: Constant.MontserratRegular,
                                        fontSize: 12,
                                        padding: 16,
                                    }}
                                    numberOfLines={1}>
                                    {item.noDataMsg}
                                </Text>
                            </View>
                        )}
                    </ScrollViewComponent>


                    {/* <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity disabled={isDisabledRight} onPress={() => { scrollRight() }} style={{ width: 20, height: 20, backgroundColor: 'red', marginRight: 10 }}></TouchableOpacity>
                    <TouchableOpacity disabled={isDisabledLeft} onPress={() => { scrollLeft() }} style={{ width: 20, height: 20, backgroundColor: 'green' }} ></TouchableOpacity>
                </View> */}
                </View>
            </View>
        </View>);
}




export default HorizontalList


