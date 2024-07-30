import React, { Component, createRef, useState } from 'react';
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
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
import TeamMemberList from './TeamMemberList';
const { height, width } = Dimensions.get('screen');

export default function MyTeam({ navigation, dayNo, currentAttandaceArray = [], monthCalDate, setisLoading }) {


    return (
        <>
            {/* Head */}
            <View style={{ width: '100%', backgroundColor: '#3934ee', borderTopRightRadius: 17, borderTopLeftRadius: 17, alignItems: 'center', padding: 10, flexDirection: 'row', }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        fontFamily: Constant.MontserratSemiBold,
                        fontSize: 15,
                        color: 'white',
                        // width: '35%',
                        // alignSelf: 'center',
                        // backgroundColor: 'red',
                        textAlign: 'center',
                        paddingRight: 16
                    }}>
                    {'Total Team Members'}
                </Text>

            </View>

            {/* Member List */}

            {currentAttandaceArray.map((item, index) => {

                return (<TeamMemberList key={String(index)} navigation={navigation} empAttandaceDetails={item} dayNo={dayNo} monthCalDate={monthCalDate} setisLoading={setisLoading} />)
            })}

            {/* <FlatList nestedScrollEnabled={true}
                data={currentAttandaceArray}
                renderItem={({ item, index }) => <TeamMemberList key={String(index)} navigation={navigation} empAttandaceDetails={item} dayNo={dayNo} monthCalDate={monthCalDate} setisLoading={setisLoading} />}
                keyExtractor={(item, index) => String(index)}
                
            /> */}

            {/* <TeamMemberList navigation={navigation} />
            <TeamMemberList navigation={navigation} />
            <TeamMemberList navigation={navigation} /> */}
            {/* Member List */}
        </>
    )
}