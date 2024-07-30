import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    Picker,
    Alert,
    ImageBackground,
    FlatList,
} from 'react-native';
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
import NavBar from '../../components/NavBar';
import PunchTimeLineRecord from './PunchTimeLineRecord';


export default function PunchTimeline(props) {

    console.log('PunchTimeline', props.route.params);

    const { punchDetailsVOList } = props.route.params

    const renderItem = (item, index) => (
        <PunchTimeLineRecord first={item.markAttendanceType} second={String(item.punchTime).split('.')[0]} third={item.deviceType}/>
    );


    return (
        <>
            <NavBar title={'Punch Timeline'} backAction={props.navigation.goBack} />


            <View style={{height: 25}}/>
            <View style={{ flex: 1, width: '95%', alignItems: 'center', backgroundColor: 'white', alignSelf: 'center', borderTopRightRadius: 17, borderTopLeftRadius: 17 }}>

                

                <PunchTimeLineRecord first='Mark type' second='Time' third='Device' isHead={true}/>

                <FlatList style={{ backgroundColor: 'white', borderRadius: 10,  alignSelf: 'center', marginBottom: 14 }}
                    data={punchDetailsVOList}
                    horizontal={false}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => renderItem(item,index)}
                    keyExtractor={(item, index) => String(item.markAttendanceId)}
                />
            </View>

        </>



    )

}