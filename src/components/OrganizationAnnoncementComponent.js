import React, { Component, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, Dimensions, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import * as Constant from '../Constant/Constants';
import { Pages } from 'react-native-pages';
import { COLORS } from '../Constant/Index';

const styles = StyleSheet.create({

    imgStyle: {
        // marginLeft: 10,
        //backgroundColor:'white',
        height: 200,
        width: 350,
        alignSelf: 'center',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        borderRadius: 12,
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 3,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',

    },
    imgStyle1: {

        height: 200,
        width: 350,
        alignSelf: 'center',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 3,
        borderRadius: 12,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },


    scrollViewCard: {
        height: 225,
        // marginTop: 21
        // marginTop: -70,
        // borderWidth: 1,
        // borderColor: 'red',
        // width: '100%',
        // marginBottom: 5,

        backgroundColor: COLORS.FormBGColor

    },

});

const OrganizationAnnoncement = ({ arr, WINDOW_WIDTH }) => {

    const pagesRef = useRef()


    function scrollTo() {

        pagesRef.current.scrollToPage(0, true)

    }

    function showPageRef() {
        console.log('OrganizationAnnoncement', pagesRef);
    }

    // useEffect(() => {


    //     console.log('OrganizationAnnoncement', pagesRef);


    // }, [])


    return (
        <>
            <View
                // onPress= {()=>{console.log(WINDOW_WIDTH);}} 
                style={styles.scrollViewCard}>
                <Pages onScrollEnd={() => {

                    showPageRef()
                }} ref={pagesRef}>

                    {/* <View style={{ flex: 1, backgroundColor: 'red' }} />
            <View style={{ flex: 1, backgroundColor: 'green' }} />
            <View style={{ flex: 1, backgroundColor: 'blue' }} /> */}

                    {
                        arr.map((item, index) =>
                            <View

                                key={String(index)} style={{

                                    height: 200,
                                    // width: WINDOW_WIDTH - 64,
                                    // width: (WINDOW_WIDTH  - (((WINDOW_WIDTH / 2)/2)/2)+15),
                                    width: ((WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2)) + 3),
                                    alignSelf: 'center',
                                    // shadowColor: 'gray',
                                    // shadowOffset: {
                                    //     width: 0,
                                    //     height: 6,
                                    // },
                                    // shadowOpacity: 0.39,
                                    // shadowRadius: 8.30,
                                    // elevation: 3,

                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,

                                    borderRadius: 25,
                                    // resizeMode: 'contain',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                    // marginBottom: 15
                                }}>
                                <ImageBackground style={{
                                    height: '100%', width: '100%', overflow: 'hidden',
                                    // resizeMode: 'contain', 
                                    borderRadius: 25
                                }} source={item.img}>
                                </ImageBackground>

                            </View>


                        )
                    }


                </Pages>
            </View>

            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewCard}>
{
arr.map((item,index)=>
<View key={index} style={ index==arr.length-1 ?  styles.imgStyle1 :   styles.imgStyle}>
<ImageBackground style={{height:'100%',width:'100%' ,overflow:'hidden',resizeMode:'contain',borderRadius:12}}  source={item.img}>
</ImageBackground>

</View>


)
}
</ScrollView> */}
        </>
    );


}


export default OrganizationAnnoncement