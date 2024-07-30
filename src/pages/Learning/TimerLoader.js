import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, View } from 'react-native';
import Loader from '../../components/Loader';

function TimerLoader() {
    const [isActive, setIsActive] = useState(false);

    async function callingApi(params) {
        fetch('https://niletechinnovations.com/projects/journey/api/community-list', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer 451|haqoo9AxlRSASVaQodKtfUDEaAM4ZPQGL3L5eY5V75cb4ed1'
            },

        }).then( async val => {
            setIsActive(false)
            console.log( await val.json());
        }).catch(err => {
            console.error(err);
            setIsActive(false)
        });


    }

    // useEffect(() => {
    //     let timerId;

    //     // Function to show popup after 10 seconds
    //     const showPopup = () => {
    //         Alert.alert('Popup triggered after 10 seconds of active state.');
    //     };

    //     // Function to reset timer
    //     const resetTimer = () => {
    //         clearTimeout(timerId);
    //     };

    //     if (isActive) {
    //         // Start timer when isActive becomes true
    //         timerId = setTimeout(showPopup, 10000);
    //     } else {
    //         // Reset timer if isActive becomes false before 10 seconds
    //         resetTimer();
    //     }

    //     // Clean up the timer on component unmount or when isActive changes
    //     return () => {
    //         resetTimer();
    //     };
    // }, [isActive]);

    return (
        <>
            <Loader isLoader={isActive} setIsLoader={() => setIsActive(false)} enablePopUps onReqFailed={() => {
                setIsActive(false)
            }} />
            <View style={{ marginTop: 55 }}>
                <Button onPress={() => {
                    setIsActive(true)
                    callingApi()

                }} title='Start Timer'></Button>
                <Button onPress={() => {
                    setIsActive(false)
                    callingApi()

                }} title='Stop Timer'></Button>
                {/* {isActive && <ActivityIndicator />} */}
            </View>
        </>
    );
}

export default TimerLoader;
