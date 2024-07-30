import React, { useState } from 'react';
import { View, StyleSheet, Alert, FlatList, ScrollView, Text, Dimensions } from 'react-native';
//custom components
import Loader from '../../components/Loader';
import CircularItem from '../../components/CircularItem/CircularItem';
import TitleWithImage from '../../components/TitleWithImage/TitleWithImage';
//keyStore
import KeyStore from '../../Store/LocalKeyStore';
//Constant
import { COLORS, Constant } from '../../Constant/Index';
import { Shadow } from 'react-native-shadow-2';
import { Pages } from 'react-native-pages';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;


const LeaveSliderView = ({ leaveSliderData = [] }) => {

    const [containerHeight, setcontainerHeight] = useState(WINDOW_WIDTH / 2)

    return (

        <>
        
        <View
            // onPress= {()=>{console.log(WINDOW_WIDTH);}} 
            style={{
                height: containerHeight,
                // borderWidth: 1
            }}>

            <Pages indicatorColor={'#5b7ba4'}>

                {leaveSliderData?.map((leaveDetails, leaveDetailsIndex) => {



                    return (

                        <View onLayout={(event)=> {
                            const {x, y, width, height} = event.nativeEvent.layout;
                            console.log(height)
                            setcontainerHeight(height + 18)
                          }}
                          
                          key={String(leaveDetailsIndex)} style={{
                            alignSelf: 'center',
                            width: '100%',
                            
                            // borderRadius: 25,
                            backgroundColor: 'white',
                            justifyContent: 'space-around',
                            // alignItems: 'center',
                            flexDirection: 'row'
                          
                        }}>

                            {leaveDetails?.map((item, index) => {


                                return (

                                    <CircularItem
                                        key={item.name}
                                        Name={item.name}
                                        Value={String(item.count + " / " + item.total)}
                                    />

                                );

                            })}


                        </View>

                    );


                })}

               


            </Pages>


        </View>
        
        </>
    )

}

export default LeaveSliderView