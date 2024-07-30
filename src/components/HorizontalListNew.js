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

const HorizontalListNew = ({ item, index, WINDOW_WIDTH, tabChangeIndex }) => {

    const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2));

    console.log('cardSize', cardSize);

    const { tabValue, settabValue } = tabChangeIndex

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

    function scrollToStartPosition() {
        
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true })

    }


    useEffect(() => {
      

        scrollToStartPosition()

        console.log('scrollToStartPosition');
    
      
    }, [tabChangeIndex])
    

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
            // height: 250,
            width: (cardSize) - (cardSize / 19),
            // backgroundColor: 'green',
            // backgroundColor: 'white',
            marginLeft: 8,
            // shadowOffset: { width: 0.5, height: 0.5 },
            // shadowColor: 'gray',
            // shadowOpacity: 3.0,
            // elevation: 3,
            margin: 8,
            borderRadius: 25,
            marginTop: 10,
            marginBottom: 13
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
            {/* <View
                style={{ flexDirection: 'row', margin: 12, marginBottom: 5, alignItems: 'center', justifyContent: 'space-between', }}>

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
                </View> */}


            {/* Count Indicator */}
            {/* <View style={{ padding: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: item?.arr?.length != 0 ? '#5b4dff' : '#bfbfbf', width: 48, borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{
                        fontSize: 14, alignItems: 'center', justifyContent: 'center',
                        //  fontWeight: 'bold', color: '#A9A9A9', 
                        color: 'white', fontFamily: Constant.MontserratRegular
                    }}>{item?.arr?.length}
                    </Text>

                </View> */}


            {/* </View> */}

            <View style={{
                width: WINDOW_WIDTH,
                // borderWidth: 1,
                //         borderColor: 'red',
                // alignItems: 'center', justifyContent: 'center', 
                overflow: 'hidden'
            }}>

                <View style={{
                    width: WINDOW_WIDTH,
                    // borderWidth: 1,
                    // borderColor: 'green',
                    // alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 12,
                    height: 205
                    // marginLeft: 20
                    // justifyContent: 'center'
                }}>


                    <ScrollViewComponent
                        scrollEventThrottle={16}
                        nestedScrollEnabled={true}
                        ref={scrollRef}

                        scrollEnabled={true
                            // item?.arr?.length <= 3 ? false : true
                            // item.arr.length != 0
                        }
                        // }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >

                        {item?.arr?.length != 0 ? (
                            item?.arr?.map((subItem, index) => (

                                <>
                                    <View
                                        style={{
                                            padding: 10,
                                            alignItems: 'center',
                                            width: 110, height: 197,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            marginLeft: index == 0 ? 6 : 12,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            marginRight: (item?.arr?.length-1) == index ? 20 : 0,

                                            elevation: 5,
                                        }}
                                        key={String(index)}>
                                        <Image
                                            style={{
                                                height: cardSize / 7,
                                                width: cardSize / 7,
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
                                            {subItem.firstName}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: 'black',
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 12,
                                                // padding: 3,
                                                // marginTop: 6,
                                            }}
                                            numberOfLines={1}>
                                            {subItem.lastName}
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

                                        {tabValue == 1 ?

                                            <Image
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    // borderRadius: 23,
                                                    // borderWidth: 1,
                                                    // borderColor: 'rgba(229,229,229,1.0)',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    tintColor: '#E07C24',
                                                    marginTop: 5,
                                                }}
                                                source={
                                                    require('../images/birthdayNew2.png')
                                                } />

                                            :

                                            tabValue == 2 ? <Image
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    // borderRadius: 23,
                                                    // borderWidth: 1,
                                                    // borderColor: 'rgba(229,229,229,1.0)',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    tintColor: '#E07C24',
                                                    marginTop: 5,
                                                }}
                                                source={
                                                    require('../images/anniversaryNew.png')
                                                } />

                                                :

                                                <Image
                                                    style={{
                                                        height: 30,
                                                        width: 30,
                                                        // borderRadius: 23,
                                                        // borderWidth: 1,
                                                        // borderColor: 'rgba(229,229,229,1.0)',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        tintColor: '#E07C24',
                                                        marginTop: 5,
                                                    }}
                                                    source={
                                                        require('../images/newJoineeNew.png')
                                                    } />



                                        }

                                    </View>


                                </>


                            ))
                        ) : (


                            <View
                                style={{
                                    alignItems: 'center',
                                    width: WINDOW_WIDTH,
                                    height: 190,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // backgroundColor: 'grey',
                                    alignSelf: 'center',

                                }}
                                key={index}>
                                {/* <Image
                                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                                    source={require('../images/noDataFound.png')}></Image> */}

                                <View style={{
                                    width: WINDOW_WIDTH / 1.2, height: 180, alignItems: 'center',
                                    justifyContent: 'center', backgroundColor: 'white', borderRadius: 25,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,
                                }}>
                                    <Image
                                        style={{ height: 170, width: 100, resizeMode: 'contain', top: 10 }}
                                        source={require('../images/NoDataNew.png')}></Image>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: '#999999',
                                            fontFamily: Constant.MontserratRegular,
                                            fontSize: 13,
                                            padding: 16,
                                            bottom: 30
                                        }}
                                        numberOfLines={1}>
                                        {item.noDataMsg}
                                    </Text>
                                </View>
                            </View>
                        )}


                        {/* {item?.arr?.length != 0 ? (
                            item?.arr?.map((subItem, index) => (

                                <>
                                    <View
                                        style={{
                                            padding: 10,
                                            alignItems: 'center',
                                            width: 110, height: 190,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            marginLeft: index == 0 ? 6 : 12
                                        }}
                                        key={index}>
                                        <Image
                                            style={{
                                                height: cardSize / 7,
                                                width: cardSize / 7,
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
                                            {subItem.firstName}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: 'black',
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 12,
                                                // padding: 3,
                                                // marginTop: 6,
                                            }}
                                            numberOfLines={1}>
                                            {subItem.lastName}
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

                                        {tabValue == 1 ?

                                            <Image
                                                style={{
                                                    height: 35,
                                                    width: 35,
                                                    // borderRadius: 23,
                                                    // borderWidth: 1,
                                                    // borderColor: 'rgba(229,229,229,1.0)',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    tintColor: '#ca6f68',
                                                    marginTop: 2,
                                                }}
                                                source={
                                                    require('../images/birthdayNew2.png')
                                                } />

                                            :

                                            tabValue == 2 ? <Image
                                                style={{
                                                    height: 35,
                                                    width: 35,
                                                    // borderRadius: 23,
                                                    // borderWidth: 1,
                                                    // borderColor: 'rgba(229,229,229,1.0)',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    tintColor: '#ca6f68',
                                                    marginTop: 2,
                                                }}
                                                source={
                                                    require('../images/anniversaryNew.png')
                                                } />

                                                :

                                                <Image
                                                    style={{
                                                        height: 35,
                                                        width: 35,
                                                        // borderRadius: 23,
                                                        // borderWidth: 1,
                                                        // borderColor: 'rgba(229,229,229,1.0)',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        tintColor: '#ca6f68',
                                                        marginTop: 2,
                                                    }}
                                                    source={
                                                        require('../images/newJoineeNew.png')
                                                    } />



                                        }

                                    </View>


                                </>


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
                        )} */}





                    </ScrollViewComponent>

                </View>
            </View>
        </View>);
}




export default HorizontalListNew


