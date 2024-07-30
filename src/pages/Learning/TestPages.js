import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert, Animated, NativeModules
} from 'react-native';
import ImageView from "react-native-image-viewing";
import Application from '../biometrics/Application.container';
import ExpandAnim from './ExpandAnim';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import AnimReani from './AnimReani';
import { DeviceInfoScreen } from './DeviceInfoScreen';
import NewTeamAttAPI from './NewTeamAttAPI';
import FileIO from './FileIO';
import Android_Apple_ID from './Android_Apple_ID';
import PickerUsingFList from './PickerUsingFList';
import VictoryTest from './VictoryTest';
import PanRes from './PanRes';
import { DeveloperOption } from './DeveloperOption';
import CallAPI from './CallAPI';
import RingAnimation from './RingAnimation';
import DrawerDemo from './DraweDemo';
import FlipCard from './FlipCard';
import NetInfoDemo from './NetInfoDemo';
import MapWithRoute from './MapDirection';
import LiveLocation from './LiveLocation';
import ForwardRef from './ForwardRef';
import TimerLoader from './TimerLoader';
// import RNHorizontalListPicker from '../../components/RNHorizontalList';





const TestPages = (props) => {


    const [animals, setanimals] = useState(['Elephant', 'Lion', 'Tiger', 'Bear', 'Zebra', 'Monkey', 'Dog', 'Cat', 'Bird', 'Fish'])
    const [birds, setbirds] = useState(['Eagle', 'Owl', 'Sparrow', 'Robin', 'Duck', 'Penguin', 'Hummingbird', 'Parrot', 'Swan', 'Crow'])
    const [gods, setgods] = useState(['Zeus', 'Hera', 'Poseidon', 'Demeter', 'Aphrodite', 'Ares', 'Athena', 'Apollo', 'Artemis', 'Hephaestus'])

    const [bird, setbird] = useState('')

    // useEffect(() => {

    //    EmulatorRootDetection().then((val)=>{
    //     console.log("EmulatorRootDetection", val);
    //    })


    // }, [])

    // async function EmulatorRootDetection() {
    //    return await NativeModules.EmulatorRootDetection.isEmulatedAndRooted()
    // }


    // const images = [
    //     {
    //         uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    //     },
    //     {
    //         uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    //     },
    //     {
    //         uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    //     },
    // ];

    // const [visible, setIsVisible] = useState(false);



    return (

        <>

            <TimerLoader />
            {/* <Application /> */}
            {/* <ForwardRef/> */}
            {/* <NetInfoDemo /> */}
            {/* <MapWithRoute /> */}
            {/* <LiveLocation/> */}
            {/* <DrawerDemo /> */}
            {/* <FlipCard/> */}

            {/* <RingAnimation/> */}
            {/* <PickerUsingFList.Comp/> */}

            {/* <PanRes /> */}
            {/* <DeveloperOption /> */}
            {/* <CallAPI /> */}
            {/* <VictoryTest /> */}
            {/* <AnimReani/> */}

            {/* <DeviceInfoScreen {...props}/> */}

            {/* <FileIO {...props}/>  */}

            {/* <Android_Apple_ID  {...props}/> */}

            {/* <NewTeamAttAPI/> */}



            {/* <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: "#EFEDF3" }}>

                <View style={{ width: '100%', height: '100%', paddingHorizontal: 10 }}>
                    <RNHorizontalListPicker title='Animals' data={animals} />
                    <RNHorizontalListPicker title='Birds' data={birds} sideTitle={bird} isSideTitle={true} onTap={(item, index) => {
                        setbird(item)
                    }} />
                    <RNHorizontalListPicker title='Gods' data={gods} />
                </View>



            </SafeAreaView> */}

            {/* <Application/> */}
            {/* <ExpandAnim/> */}
            {/* <View style={{ flex: 1 }} >


                <TouchableOpacity onPress={() => setIsVisible(true)} style={{ width: 250, height: 250, backgroundColor: 'red' }}>
                    <Text  allowFontScaling={false} >Hi</Text>
                </TouchableOpacity>


                <ImageView
                    images={images}
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => {
                        // console.log('higfyfsyuddguygjds');
                        setIsVisible(false)
                    }}
                />

            </View> */}
        </>
    )

}

export default TestPages