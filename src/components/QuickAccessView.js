import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    ImageBackground,
    StyleSheet,
    ScrollView, Modal, Platform, Vibration
} from 'react-native';
import * as Constant from '../Constant/Constants';
import { COLORS } from '../Constant/Index';
import { Pages } from 'react-native-pages';
import { createArrayChunk } from '../Externel Constant/Utility';
import KeyStore from '../Store/LocalKeyStore';
import { quickAccessImagesArr, quickAccessMasterListDict } from './QuickAccessDict';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;



const styles = StyleSheet.create({

    quickAccessViewContainer: {
        flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        height: 190,
        // backgroundColor: 'red',
        paddingHorizontal: 8,
        width: WINDOW_WIDTH
    },

    quickAccessViewRowContainer: {
        flexDirection: 'row', width: '100%',
        // justifyContent: 'center'
    }

});

// function FavCard({ name = 'Apply Leave', bgcolor = '#FFDCDE', image = require(`../images/leaveFav.png`), style = {}, onPress = () => { }, borderColor = '#FFC5C9', textColor = '#F12332' }) {


//     return (
//         <TouchableOpacity
//             onPress={() => {
//                 onPress()
//             }}
//             style={[{



//                 // shadowColor: 'rgba(185,185,185,1.0)',
//                 //             shadowOffset: {
//                 //                 width: 0,
//                 //                 height: 6,
//                 //             },
//                 //             shadowOpacity: 0.39,
//                 //             shadowRadius: 8.3,
//                 //             elevation: 3,

//                 // shadowColor: "rgba(185,185,185,1.0)",
//                 // shadowOffset: {
//                 //     width: 0,
//                 //     height: 9,
//                 // },
//                 // shadowOpacity: 0.50,
//                 // shadowRadius: 12.35,

//                 // elevation: 19,

//                 // shadowColor: "#000",
//                 // shadowOffset: {
//                 //     width: 0,
//                 //     height: 2,
//                 // },
//                 // shadowOpacity: 0.25,
//                 // shadowRadius: 3.84,

//                 // elevation: 5,

//                 // marginLeft: 12,
//                 backgroundColor: bgcolor,
//                 height: 80,
//                 width: '48%',
//                 alignSelf: 'center',
//                 borderRadius: 12,
//                 justifyContent: 'center',
//                 // alignItems: 'center',
//                 marginBottom: 15, borderColor: borderColor,
//                 borderWidth: 1
//             }, style]}

//         >

//             <Text
//                 allowFontScaling={false}
//                 style={{
//                     fontFamily: Constant.MontserratMedium,
//                     color: textColor,
//                     fontSize: 14,
//                     // padding: 2,
//                     marginLeft: 10,
//                     // bottom: 7
//                     // marginTop: 6,,
//                     top: 5
//                 }}>
//                 {name}
//             </Text>

//             <Image
//                 style={{
//                     width: 35, height: 35, resizeMode: 'contain', tintColor: 'white',
//                     // marginLeft: 10, 
//                     alignSelf: 'flex-end', marginRight: 10,
//                     bottom: 10
//                 }}
//                 source={image}></Image>

//         </TouchableOpacity>
//     )

// }


function FavCard({ name = 'Apply Leave', bgcolor = '#FFDCDE', image = require(`../images/leaveFav.png`), style = {}, onPress = () => { }, borderColor = '#FFC5C9', textColor = '#F12332' }) {


    return (
        <TouchableOpacity
        activeOpacity={0.5}
            onPress={() => {
                onPress()
            }}
            style={{
                width: '48%', 
                
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                // elevation: 5,
            }}>
            <View

                style={[{

                    shadowColor: "#000",
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 1,
                    // },
                    // shadowOpacity: 0.20,
                    // shadowRadius: 1.41,

                    elevation: 5,








                    backgroundColor: bgcolor,
                    height: 80,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 12,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    marginBottom: 15, borderColor: borderColor,
                    borderWidth: 1,
                    overflow: 'hidden'
                }, style]}

            >

                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratMedium,
                        color: textColor,
                        fontSize: 12,
                        paddingTop: 12,
                        marginLeft: 10,
                        // bottom: 7
                        // marginTop: 6,,
                        top: 5
                    }}>
                    {/* {String(name).length >= 12 ? name : name  + '\n' } */}
                    {String(name).split(' ').length > 1 ? String(name).split(' ')[0] + '\n' + String(name).split(' ')[1] : name}
                </Text>


                <Image
                    style={{
                        width: 50, height: 50, resizeMode: 'contain',

                        // tintColor: 'white',
                        // marginLeft: 10, 
                        alignSelf: 'flex-end', marginRight: 10,
                        bottom: 10,
                        left: 14.5,

                        // top: 1
                    }}
                    source={image}></Image>

            </View>
        </TouchableOpacity>
    )

}

function EmptyFavCard({ name = '', bgcolor = '', image = '', style = {} }) {


    return (
        <View
            style={[{

                // shadowColor: 'rgba(185,185,185,1.0)',
                //             shadowOffset: {
                //                 width: 0,
                //                 height: 6,
                //             },
                //             shadowOpacity: 0.39,
                //             shadowRadius: 8.3,
                //             elevation: 3,

                // shadowColor: "rgba(185,185,185,1.0)",
                // shadowOffset: {
                //     width: 0,
                //     height: 9,
                // },
                // shadowOpacity: 0.50,
                // shadowRadius: 12.35,

                // elevation: 19,

                // marginLeft: 12,
                backgroundColor: 'transparent',
                height: 80,
                width: '48%',
                alignSelf: 'center',
                borderRadius: 12,
                justifyContent: 'center',
                // alignItems: 'center',
                marginBottom: 15
            }, style]}

        >

            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    color: 'white',
                    fontSize: 14,
                    // padding: 2,
                    marginLeft: 10,
                    // bottom: 7
                    // marginTop: 6,,
                    top: 5
                }}>
                {''}
            </Text>

            <View
                style={{
                    width: 35, height: 35, resizeMode: 'contain',
                    // marginLeft: 10, 
                    alignSelf: 'flex-end', marginRight: 10,
                    bottom: 10
                }}
            ></View>

        </View>
    )

}

function CheckBox({ name = 'Apply Leave', check = false, onPress = () => { } }) {

    // const [testCheck, settestCheck] = useState(false)

    const color = '#207398'

    return (<TouchableOpacity onPress={() => {
        onPress(check)
    }} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: "white", width: 25, height: 25, borderRadius: 5, margin: 8, marginRight: 10, marginBottom: 10, borderColor: color, borderWidth: 1, alignContent: 'center', alignItems: 'center', alignContent: 'center' }}
        // onPress={() => {
        //     onPress(check)
        // }}
        >

            <Text allowFontScaling={false} style={{ color: check ? color : "white", fontSize: 22, bottom: Platform.OS == "android" ? 3 : 0, fontFamily: Constant.MontserratRegular }} >✓</Text>

        </View>

        <Text allowFontScaling={false} style={{ color: 'black', fontSize: 13, fontFamily: Constant.MontserratRegular }}


        >

            {name}

        </Text>
    </TouchableOpacity>)
}

export default function QuickAccessView({ navigation, logOutFromAnywhere }) {

    const [openEditFav, setopenEditFav] = useState(false)

    // const [quickAccessArr, setquickAccessArr] = useState([

    //     {
    //         name: "Apply Leave",
    //         screenKey: "ApplyLeave",
    //         bgcolor: '#FFBF00',
    //         image: require(`../images/leaveFav.png`),
    //         isPayload: true,
    //         payload: { refreshList: () => { }, isEdit: '0' }
    //     },
    //     {
    //         name: "Add Expense",
    //         screenKey: "ProAddExpense",
    //         bgcolor: '#54CEDE',
    //         image: require(`../images/expenseFav.png`),
    //         isPayload: false,
    //         payload: {}
    //     },
    //     {
    //         name: "Apply\nRegularization",
    //         screenKey: "AttendanceTab",
    //         bgcolor: '#89D175',
    //         image: require(`../images/excerciseFav.png`),
    //         isPayload: true,
    //         payload: { "tabIndex": 1, "openApplyReg": true }
    //     },
    //     {
    //         name: "Apply\nSeperation",
    //         screenKey: "ProSeperationTab",
    //         bgcolor: '#427BF2',
    //         image: require(`../images/seperationFav.png`),
    //         isPayload: true,
    //         payload: { "tabIndex": 0, "openApplyReg": true }
    //     },
    //     {
    //         name: "Team Leaves",
    //         screenKey: "LeaveTab",
    //         bgcolor: '#955AED',
    //         image: require(`../images/teamLeavesFav.png`),
    //         isPayload: true,
    //         payload: {"tabIndex": 4, "openApplyReg": false}
    //     },
    //     {
    //         name: "Team Expense",
    //         screenKey: "ProExpenseTab",
    //         bgcolor: '#ff9999',
    //         image: require(`../images/teamExpenseFav.png`),
    //         isPayload: true,
    //         payload: {"tabIndex": 1, "openApplyReg": false}
    //     },
    //     {
    //         name: "Team\nRegularization",
    //         screenKey: "AttendanceTab",
    //         bgcolor: '#40CB6B',
    //         image: require(`../images/teamRegFav.png`),
    //         isPayload: true,
    //         payload: { "tabIndex": 2, "openApplyReg": false }
    //     }
    // ])

    const [quickAccessArr, setquickAccessArr] = useState([])

    const [quickAccessFinalData, setquickAccessFinalData] = useState([])

    const [quickAccessArrCopyForReset, setquickAccessArrCopyForReset] = useState([])

    const quickAccessImagesArrold = {

        "ApplyLeave": require(`../images/leaveFav.png`),
        "AddExpense": require(`../images/expenseFav.png`),
        "ApplyRegularization": require(`../images/excerciseFav.png`),
        "ApplySeperation": require(`../images/seperationFav.png`),
        "TeamLeaves": require(`../images/teamLeavesFav.png`),
        "TeamExpense": require(`../images/teamExpenseFav.png`),
        "TeamRegularization": require(`../images/teamRegFav.png`)

    }



    // let quickAccessMasterList = [

    //     {
    //         name: "Apply Leave",
    //         screenKey: "ApplyLeave",
    //         bgcolor: '#FFBF00',
    //         image: require(`../images/leaveFav.png`),
    //         isPayload: true,
    //         payload: { refreshList: () => { }, isEdit: '0' }
    //     },
    //     {
    //         name: "Add Expense",
    //         screenKey: "ProAddExpense",
    //         bgcolor: '#54CEDE',
    //         image: require(`../images/expenseFav.png`),
    //         isPayload: false,
    //         payload: {}
    //     },
    //     {
    //         name: "Apply\nRegularization",
    //         screenKey: "AttendanceTab",
    //         bgcolor: '#89D175',
    //         image: require(`../images/excerciseFav.png`),
    //         isPayload: true,
    //         payload: { "tabIndex": 1, "openApplyReg": true }
    //     },
    //     {
    //         name: "Apply\nSeperation",
    //         screenKey: "ProSeperationTab",
    //         bgcolor: '#427BF2',
    //         image: require(`../images/seperationFav.png`),
    //         isPayload: true,
    //         payload: { "tabIndex": 0, "openApplyReg": true }
    //     },
    //     {
    //         name: "Team Leaves",
    //         screenKey: "LeaveTab",
    //         bgcolor: '#955AED',
    //         image: require(`../images/teamLeavesFav.png`),
    //         isPayload: true,
    //         payload: {"tabIndex": 4, "openApplyReg": false}
    //     },
    //     {
    //         name: "Team Expense",
    //         screenKey: "ProExpenseTab",
    //         bgcolor: '#ff9999',
    //         image: require(`../images/teamExpenseFav.png`),
    //         isPayload: true,
    //         payload: {"tabIndex": 1, "openApplyReg": false}
    //     },
    //     {
    //         name: "Team\nRegularization",
    //         screenKey: "AttendanceTab",
    //         bgcolor: '#40CB6B',
    //         image: require(`../images/teamRegFav.png`),
    //         isPayload: true,
    //         payload: { "tabIndex": 2, "openApplyReg": false }
    //     }
    // ]

    const [quickAccessMasterList, setquickAccessMasterList] = useState([])

    function goToScreen(screenKey, isPayload, payload) {

        if (isPayload) {
            navigation.navigate(screenKey, payload)
        }

        else {
            navigation.navigate(screenKey)
        }

    }



    {/* {data.map((item, index) => {

                        return (

                            <>
                                {index == 1 || index == 3 ? <></> :  <View style={{ flexDirection: 'row' }}>

                                    

                                </View> }
                            </>

                        )

                    })} */}



    useEffect(() => {

        KeyStore.getKey('quickAccessMasterList', (err, value) => {

            if (value) {

                console.log('quickAccessMasterList', value);

                // setquickAccessMasterList(value)

                let setquickAccessMasterListFromDict = []

                if (value[0].borderColor == undefined) {
                    console.log('New UseEffect', value[0].borderColor);

                    value.forEach((item, index) => {

                        setquickAccessMasterListFromDict.push(quickAccessMasterListDict[item.image])

                    })

                    console.log('setquickAccessMasterListFromDict', setquickAccessMasterListFromDict);

                    setquickAccessMasterList(JSON.parse(JSON.stringify(setquickAccessMasterListFromDict)))

                    KeyStore.setKey('quickAccessMasterList', JSON.parse(JSON.stringify(setquickAccessMasterListFromDict)))
                }

                else {
                    setquickAccessMasterList(value)
                }



            }

            // else {
            //     Vibration.vibrate()
            //     Alert.alert(
            //         'From ProH2R',
            //         'Please Login Once To Enable Quick Access Feature !',
            //         [

            //             {
            //                 text: 'OK',
            //                 onPress: () => {
            //                     logOutFromAnywhere()
            //                 },
            //             },
            //         ],
            //         { cancelable: false },
            //     );
            // }
        });

        KeyStore.getKey('quickAccessArr', (err, value) => {

            if (value) {

                console.log('quickAccessArr', value);
                // setquickAccessArr(value)

                let setquickAccessMasterListFromDict = []


                if (value[0].borderColor == undefined) {
                    console.log('New UseEffect', value[0].borderColor);

                    value.forEach((item, index) => {

                        setquickAccessMasterListFromDict.push(quickAccessMasterListDict[item.image])

                    })

                    console.log('setquickAccessMasterListFromDict', setquickAccessMasterListFromDict);

                    setquickAccessArr(JSON.parse(JSON.stringify(setquickAccessMasterListFromDict)))

                    KeyStore.setKey('quickAccessArr', JSON.parse(JSON.stringify(setquickAccessMasterListFromDict)))
                }

                else {

                    setquickAccessArr(value)
                }

            }
        });




        // KeyStore.getKey('testingPurpose', (err, value) => {

        //     if (value) {

        //         console.log('if testingPurpose', value);


        //     }

        //     else{ 

        //         console.log('else testingPurpose', value)

        //         Alert.alert(
        //             'From ProH2R',
        //             'For Using Quick Access Feature, You Have To Login Again !',
        //             [

        //               {
        //                 text: 'OK',
        //                 onPress: () => {
        //                     logOutFromAnywhere()
        //                 },
        //               },
        //             ],
        //             { cancelable: false },
        //           );




        //     }
        // });


    }, [])


    // New UseEffect
    // useEffect(() => {

    //     KeyStore.getKey('quickAccessMasterList', (err, value) => {

    //         if (value) {

    //             if (value[0].borderColor == undefined) {
    //                 console.log('New UseEffect', value[0].borderColor);
    //             }

    //         }

    //         if (value[0].image != undefined) {
    //             console.log('New UseEffect Yes', value[0].image);
    //         }

    //     });

    // }, [])


    useEffect(() => {

        let chunkArr = createArrayChunk(quickAccessArr, 4)
        console.log('chunkArr', chunkArr);
        setquickAccessFinalData(chunkArr)

    }, [quickAccessArr])


    function matchFav(text) {

        for (let index = 0; index < quickAccessArr.length; index++) {

            // console.log('Loop No:- ', index)

            if (text == quickAccessArr[index].name) {


                // console.log('Found!')
                return ({ "status": true, "index": index })

                // return(true)

            }

        }

        return ({ "status": false, "index": -1 })


        // return(false)

    }




    return (
        <>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratSemiBold,
                        fontSize: 15,
                        color: 'black',
                        // paddingTop: 10,
                        paddingLeft: 16,
                        paddingBottom: 10,
                        backgroundColor: COLORS.FormBGColor,
                    }}>Quick Access</Text>

                <TouchableOpacity onPress={() => {
                    console.log('open');
                    setopenEditFav(true)
                    setquickAccessArrCopyForReset(JSON.parse(JSON.stringify(quickAccessArr)))
                    console.log(quickAccessArr);
                }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 12,
                            color: '#445FB6',
                            // paddingTop: 10,
                            paddingLeft: 16,
                            paddingBottom: 10,
                            backgroundColor: COLORS.FormBGColor,
                            paddingRight: 16,
                            // textDecorationLine: 'underline'
                        }}>{'Edit'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 210, width: WINDOW_WIDTH, }}>
                <Pages indicatorColor={'white'}>


                    {quickAccessFinalData.map((item, index) => {




                        console.log('kouv', item);

                        return (

                            <React.Fragment key={String(index)}>

                                {item?.length == 4 ?

                                    <View

                                        style={styles.quickAccessViewContainer}>

                                        <View style={styles.quickAccessViewRowContainer}>

                                            <FavCard name={item[0]?.name} bgcolor={item[0]?.bgcolor} borderColor={item[0]?.borderColor} textColor={item[0]?.textColor} image={quickAccessImagesArr[item[0]?.image]} onPress={() => goToScreen(item[0]?.screenKey, item[0]?.isPayload, item[0]?.payload)

                                            } />

                                            {/* <FavCard name={item[1]?.name} bgcolor={item[1]?.bgcolor} image={quickAccessImagesArr[item[1]?.image]} style={{ marginLeft: 15 }} onPress={() => goToScreen(item[1]?.screenKey, item[1]?.isPayload, item[1]?.payload)
                                            }
                                            /> */}



                                            <FavCard name={item[1]?.name} bgcolor={item[1]?.bgcolor} borderColor={item[1]?.borderColor} textColor={item[1]?.textColor} image={quickAccessImagesArr[item[1]?.image]} onPress={() => goToScreen(item[1]?.screenKey, item[1]?.isPayload, item[1]?.payload)


                                            } style={{ marginLeft: 15 }} />
                                        </View>

                                        <View style={styles.quickAccessViewRowContainer}>
                                            <FavCard name={item[2]?.name} bgcolor={item[2]?.bgcolor} borderColor={item[2]?.borderColor} textColor={item[2]?.textColor} image={quickAccessImagesArr[item[2]?.image]} onPress={() => goToScreen(item[2]?.screenKey, item[2]?.isPayload, item[2]?.payload)


                                            } />



                                            <FavCard name={item[3]?.name} bgcolor={item[3]?.bgcolor} borderColor={item[3]?.borderColor} textColor={item[3]?.textColor} image={quickAccessImagesArr[item[3]?.image]} onPress={() => goToScreen(item[3]?.screenKey, item[3]?.isPayload, item[3]?.payload)


                                            } style={{ marginLeft: 15 }} />

                                            {/* <FavCard name={item[2]?.name} bgcolor={item[2]?.bgcolor} image={quickAccessImagesArr[item[2]?.image]} onPress={() => goToScreen(item[2]?.screenKey, item[2]?.isPayload, item[2]?.payload)
                                            } />
                                            <FavCard name={item[3]?.name} bgcolor={item[3]?.bgcolor} image={quickAccessImagesArr[item[3]?.image]} style={{ marginLeft: 15 }} onPress={() => goToScreen(item[3]?.screenKey, item[3]?.isPayload, item[3]?.payload)
                                            } /> */}

                                            {/* <EmptyFavCard name={item[3]?.name} bgcolor={item[3]?.bgcolor} image={item[3]?.image} style={{ marginLeft: 15 }} /> */}
                                        </View>


                                    </View>

                                    :

                                    item?.length == 3 ?

                                        <View

                                            style={styles.quickAccessViewContainer}>

                                            <View style={styles.quickAccessViewRowContainer}>
                                                <FavCard name={item[0]?.name} bgcolor={item[0]?.bgcolor} borderColor={item[0]?.borderColor} textColor={item[0]?.textColor} image={quickAccessImagesArr[item[0]?.image]} onPress={() => goToScreen(item[0]?.screenKey, item[0]?.isPayload, item[0]?.payload)


                                                } />

                                                <FavCard name={item[1]?.name} bgcolor={item[1]?.bgcolor} borderColor={item[1]?.borderColor} textColor={item[1]?.textColor} image={quickAccessImagesArr[item[1]?.image]} onPress={() => goToScreen(item[1]?.screenKey, item[1]?.isPayload, item[1]?.payload)


                                                } style={{ marginLeft: 15 }} />
                                            </View>

                                            <View style={styles.quickAccessViewRowContainer}>
                                                <FavCard name={item[2]?.name} bgcolor={item[2]?.bgcolor} borderColor={item[2]?.borderColor} textColor={item[2]?.textColor} image={quickAccessImagesArr[item[2]?.image]} onPress={() => goToScreen(item[2]?.screenKey, item[2]?.isPayload, item[2]?.payload)


                                                } />

                                                <EmptyFavCard style={{ marginLeft: 15 }} />
                                            </View>


                                        </View>

                                        :

                                        item?.length == 2 ?

                                            <View

                                                style={styles.quickAccessViewContainer}>

                                                <View style={styles.quickAccessViewRowContainer}>
                                                    <FavCard name={item[0]?.name} bgcolor={item[0]?.bgcolor} borderColor={item[0]?.borderColor} textColor={item[0]?.textColor} image={quickAccessImagesArr[item[0]?.image]} onPress={() => goToScreen(item[0]?.screenKey, item[0]?.isPayload, item[0]?.payload)


                                                    } />

                                                    <FavCard name={item[1]?.name} bgcolor={item[1]?.bgcolor} borderColor={item[1]?.borderColor} textColor={item[1]?.textColor} image={quickAccessImagesArr[item[1]?.image]} onPress={() => goToScreen(item[1]?.screenKey, item[1]?.isPayload, item[1]?.payload)


                                                    } style={{ marginLeft: 15 }} />
                                                </View>

                                                <View style={styles.quickAccessViewRowContainer}>
                                                    <EmptyFavCard />

                                                    <EmptyFavCard name={item[3]?.name} bgcolor={item[3]?.bgcolor} image={quickAccessImagesArr[item[3]?.image]} style={{ marginLeft: 15 }} />
                                                </View>


                                            </View>
                                            :
                                            item?.length == 1 ?

                                                <View

                                                    style={styles.quickAccessViewContainer}>

                                                    <View style={styles.quickAccessViewRowContainer}>
                                                        <FavCard name={item[0]?.name} bgcolor={item[0]?.bgcolor} borderColor={item[0]?.borderColor} textColor={item[0]?.textColor} image={quickAccessImagesArr[item[0]?.image]} onPress={() => goToScreen(item[0]?.screenKey, item[0]?.isPayload, item[0]?.payload)


                                                        } />

                                                        <EmptyFavCard style={{ marginLeft: 15 }} />
                                                    </View>

                                                    <View style={styles.quickAccessViewRowContainer}>
                                                        <EmptyFavCard />

                                                        <EmptyFavCard style={{ marginLeft: 15 }} />
                                                    </View>


                                                </View> : <></>
                                }

                            </React.Fragment>

                        )

                    })}


                    {/* <View

                        style={{
                            flexDirection: 'column', backgroundColor: '', justifyContent: 'center', alignItems: 'center',
                            height: 190
                        }}>






                        <View style={{ flexDirection: 'row' }}>


                            <FavCard />
                            <FavCard bgcolor='#54CEDE' name='Apply Expense' image={require('../images/expenseFav.png')} style={{ marginLeft: 15 }} />



                        </View>
                        <View style={{
                            flexDirection: 'row',
                            // marginLeft: 15 
                        }}>

                            <FavCard bgcolor='#89D175' name={'Apply\nRegularization'} image={require('../images/excerciseFav.png')} />




                            <FavCard bgcolor='#427BF2' name={'Apply\nSeperation'} image={require('../images/seperationFav.png')} style={{ marginLeft: 15 }} />


                        </View>


                    </View>

                    <View

                        style={{
                            flexDirection: 'column', backgroundColor: '', justifyContent: 'center', alignItems: 'center',
                            height: 190
                        }}>






                        <View style={{ flexDirection: 'row' }}>


                            <FavCard bgcolor='#955AED' name='Team Leaves' image={require('../images/expenseFav.png')} />
                            <FavCard bgcolor='#ff9999' name={'Team\nExpenses'} image={require('../images/expenseFav.png')} style={{ marginLeft: 15 }} />



                        </View>
                        <View style={{
                            flexDirection: 'row',
                            // marginLeft: 15 
                        }}>

                            <FavCard bgcolor='#40CB6B' name={'Team\nRegularization'} image={require('../images/excerciseFav.png')} />

                            <FavCard bgcolor='#758283' name={'Future Task'} image={require('../images/seperationFav.png')} style={{ marginLeft: 15 }} />


                        </View>


                    </View> */}



                </Pages>
            </View>

            <Modal
                visible={openEditFav}
                transparent={true}
                onRequestClose={() => {

                    // KeyStore.setKey('quickAccessArr', JSON.parse(JSON.stringify(quickAccessArr)))

                    // setopenEditFav(false)

                    setquickAccessArr(JSON.parse(JSON.stringify(quickAccessArrCopyForReset)))
                    setopenEditFav(false)

                }}
                // style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                animationType='slide'
            >


                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center', alignItems: 'center'


                    }}>
                    <TouchableOpacity onPress={() => {

                        // KeyStore.setKey('quickAccessArr', JSON.parse(JSON.stringify(quickAccessArr)))

                        // setopenEditFav(false)
                        setquickAccessArr(JSON.parse(JSON.stringify(quickAccessArrCopyForReset)))
                        setopenEditFav(false)

                    }} activeOpacity={1} style={{ height: '60%', width: '100%', }}></TouchableOpacity>


                    <View style={{ flex: 1, width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>

                        <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {

                                //Reset
                                setquickAccessArr(JSON.parse(JSON.stringify(quickAccessArrCopyForReset)))
                                setopenEditFav(false)
                            }}>
                                <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#445FB6', fontWeight: '500', fontFamily: Constant.MontserratBold }}>{'Reset'}</Text>
                            </TouchableOpacity>
                            <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'black', fontWeight: '500', fontFamily: Constant.MontserratRegular }}>{'View Application'}</Text>
                            <TouchableOpacity onPress={() => {

                                if (quickAccessArr.length < 3) {

                                    Vibration.vibrate()

                                    Alert.alert("Atleast Keep 3 Quick Access");

                                    return

                                }

                                else {

                                    KeyStore.setKey('quickAccessArr', JSON.parse(JSON.stringify(quickAccessArr)))

                                    setopenEditFav(false)
                                }
                            }
                            }>
                                <Text allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#445FB6', fontWeight: '500', fontFamily: Constant.MontserratBold }}>{'Done'}</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={{
                            backgroundColor: '#ffff', width: '100%', height: '100%',
                            // borderTopStartRadius: 20, borderTopEndRadius: 20,
                            padding: 20, paddingHorizontal: 12
                        }} showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>


                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: testCheck ? color : "white", width: 25, height: 25, borderRadius: 5, margin: 8, marginRight: 10, borderColor: color, borderWidth: 1, alignContent: 'center', alignItems: 'center', alignContent: 'center' }}
                                    onPress={() => {
                                        settestCheck(!testCheck)
                                    }}
                                >

                                    <Text style={{ color: 'white', fontSize: 22 }} >✓</Text>

                                </TouchableOpacity>

                                <Text


                                >

                                    {'Apply Leave'}

                                </Text>
                            </View> */}

                            {

                                quickAccessMasterList.map((item, index) => {

                                    let checkItemOnList = matchFav(item?.name)

                                    return (<CheckBox check={checkItemOnList.status} key={String(index)}
                                        name={String(item?.name).replace('\n', ' ')}
                                        onPress={(check) => {

                                            console.log(check);

                                            if (check) {

                                                let tempquickAccessArr = JSON.parse(JSON.stringify(quickAccessArr))

                                                // if (tempquickAccessArr.length <= 3) {

                                                //     Vibration.vibrate()

                                                //     Alert.alert("Atleast Keep 3 Quick Access");

                                                //     return

                                                // }

                                                tempquickAccessArr.splice(checkItemOnList.index, 1)

                                                setquickAccessArr(tempquickAccessArr)



                                            }

                                            else {
                                                let tempquickAccessArr = JSON.parse(JSON.stringify(quickAccessArr))


                                                tempquickAccessArr.push(item)
                                                setquickAccessArr(tempquickAccessArr)
                                            }

                                        }}
                                    />
                                    )

                                })

                            }

                            {/* <CheckBox />
                            <CheckBox name='Apply Expense' />
                            <CheckBox name='Apply Regularization' />
                            <CheckBox name='Apply Seperation' /> */}
                            {/* <CheckBox name='Apply Expense'/> */}




                            <View style={{ marginBottom: 30 }}></View>



                        </ScrollView>
                    </View>

                </View>

            </Modal>


        </>
    );
}

