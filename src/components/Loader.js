import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal, Alert, Vibration, Button } from 'react-native';
import RingAnimation from '../pages/Learning/RingAnimation';

class LoaderOld extends Component {

    constructor(props) {

        super(props)

        this.state = {

            timeoutLoading: true,
        }
    }

    render() {

        const { isLoader } = this.props

        return (
            // <Modal
            //     visible={isLoader}
            //     transparent={true}
            //     onRequestClose={() => {
            //     }}>
            <>
                {
                    isLoader ?
                        <>
                            {/* <RingAnimation /> */}
                            <View style={{ elevation: 3, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>

                                <View style={{ backgroundColor: 'white', borderRadius: 10, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>

                                    <ActivityIndicator size="large" color="rgba(63,59,192,1.0)" />
                                    <Text allowFontScaling={false} style={{ textAlign: 'center', padding: 8 }} >Loading...</Text>

                                </View>

                            </View>
                        </>
                        : <></>}
            </>
            // </Modal>

        );
    }

    timeOut() {

        setTimeout(() => {
            clearTimeout()
            if (this.props.isLoader) {
                this.setState({ timeoutLoading: false })
                Alert.alert("Internet Connection Lost.")
                Vibration.vibrate()
            }
        }, 20000);
    }
}

const PopupMsg = ({ AlertButtonMsg = "Yes", isAlert = false, msg = "", visible, onClickNo = () => {

}, onClickYes = () => {

} }) => {
    const [modalVisible, setModalVisible] = useState(visible);

    // const onClickNo = () => {
    //     setModalVisible(false);
    //     if (onClose) {
    //         onClose();
    //     }
    // };
    // const onClickYes = () => {
    //     setModalVisible(false);
    //     if (onClose) {
    //         onClose();
    //     }
    // };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClickNo}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>{msg}</Text>
                    {/* {!isAlert ? <Text style={{ fontSize: 18, marginBottom: 10 }}></Text> : <Text style={{ fontSize: 18, marginBottom: 10 }}>Please try after sometimes.</Text>} */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title={AlertButtonMsg} onPress={onClickYes} />
                        {!isAlert && <Button title={"No"} onPress={onClickNo} />}
                    </View>
                </View>
            </View>
        </Modal>
    );
};


function Loader({ isLoader = false, timeOut = 20000, setIsLoader = () => console.log("setIsLoader Called"), onReqFailed = () => console.log("onReqFailed Called"), enablePopUps = false }) {

    // 1. 20 sec to  first popup.
    // 2. 40 sec Second popup.
    // 3. 60 sec third popup.




    const [firstPopUp, setFirstPopUp] = useState({ state: false, trigger: false })
    const [secondPopUp, setSecondPopUp] = useState({ state: false, trigger: false })
    const [thirdPopUp, setThirdPopUp] = useState({ state: false, trigger: false })

    // Function to show popup after 10 seconds


    const firstPopUpMsg = () => {

        setFirstPopUp({ state: true, trigger: true })

        // return

        // Alert.alert('', 'We are experiencing heavy traffic at the server side. Do you wish to continue ?', [
        //     {
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel',
        //     },
        //     {
        //         text: 'OK', onPress: () => {
        //             console.log('second term initiated')
        //             setSecondPopUp(true)
        //         }
        //     },
        // ]);
    };

    const secondPopUpMsg = () => {


        setSecondPopUp({ state: true, trigger: true })

        return
        Alert.alert('', 'We are experiencing heavy traffic at the server side. Do you still wish to continue ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    setThirdPopUp(true)

                    console.log('third term initiated')
                }
            },
        ]);
    };

    const thirdPopUpMsg = () => {
        setThirdPopUp({ state: true, trigger: true })
        return
        Alert.alert('', 'We are experiencing heavy traffic at the server side. Try again sometime', [
            {
                text: 'OK', onPress: () => {
                    console.log('finished')
                }
            },
        ]);
    };




    useEffect(() => {



        let timerId;




        // Function to reset timer
        const resetTimer = () => {
            clearTimeout(timerId);
        };

        if (enablePopUps) {



            if (isLoader) {
                console.log("firstPopUpMsg");
                // Start timer when isLoader becomes true
                timerId = setTimeout(firstPopUpMsg, timeOut);
            } else {
                // Reset timer if isLoader becomes false before 10 seconds
                resetTimer();
                setFirstPopUp({ state: false, trigger: false })
                setSecondPopUp({ state: false, trigger: false })
                setThirdPopUp({ state: false, trigger: false })
            }
        }

        // Clean up the timer on component unmount or when isLoader changes
        return () => {
            resetTimer();
        };
    }, [isLoader]);

    useEffect(() => {
        let timerId;



        // Function to reset timer
        const resetTimer = () => {
            clearTimeout(timerId);
        };

        if (isLoader && secondPopUp.trigger) {
            console.log("secondPopUpMsg");

            // Start timer when isLoader becomes true
            timerId = setTimeout(secondPopUpMsg, timeOut);
        } else {
            // Reset timer if isLoader becomes false before 10 seconds
            resetTimer();
        }

        // Clean up the timer on component unmount or when isLoader changes
        return () => {
            resetTimer();
        };
    }, [isLoader, secondPopUp]);

    useEffect(() => {
        let timerId;



        // Function to reset timer
        const resetTimer = () => {
            clearTimeout(timerId);
        };

        if (isLoader && thirdPopUp.trigger) {
            console.log("thirdPopUpMsg");

            // Start timer when isLoader becomes true
            timerId = setTimeout(thirdPopUpMsg, timeOut);
        } else {
            // Reset timer if isLoader becomes false before 10 seconds
            resetTimer();
        }

        // Clean up the timer on component unmount or when isLoader changes
        return () => {
            resetTimer();
        };
    }, [isLoader, thirdPopUp]);


    return (
        // <Modal
        //     visible={isLoader}
        //     transparent={true}
        //     onRequestClose={() => {
        //     }}>
        <>
            {
                isLoader ?
                    <>

                        <PopupMsg msg='We are experiencing heavy traffic at Server Side. Do you wish to continue ?' visible={firstPopUp.state} onClickYes={() => {
                            setFirstPopUp({ state: false, trigger: false })
                            setSecondPopUp({ state: false, trigger: true })
                        }} onClickNo={() => {
                            setFirstPopUp({ state: false, trigger: false })
                            setIsLoader()
                            onReqFailed()
                            // setSecondPopUp({ state: false, trigger: true })

                        }} />
                        <PopupMsg msg='We are experiencing heavy traffic at Server Side. Do you wish to continue ?' visible={secondPopUp.state} onClickYes={() => {
                            setSecondPopUp({ state: false, trigger: false })
                            setThirdPopUp({ state: false, trigger: true })
                        }} onClickNo={() => {
                            setSecondPopUp({ state: false, trigger: false })
                            setIsLoader()
                            onReqFailed()
                        }} />
                        <PopupMsg AlertButtonMsg="OK" isAlert msg='Please try after sometimes.' visible={thirdPopUp.state} onClickYes={() => {
                            setThirdPopUp({ state: false, trigger: false })
                            onReqFailed()
                        }} onClickNo={() => {
                            setThirdPopUp({ state: false, trigger: false })
                            setIsLoader()
                            onReqFailed()

                        }} />


                        {/* <RingAnimation /> */}
                        <View style={{ elevation: 3, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>

                            <View style={{ backgroundColor: 'white', borderRadius: 10, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>

                                <ActivityIndicator size="large" color="rgba(63,59,192,1.0)" />
                                <Text allowFontScaling={false} style={{ textAlign: 'center', padding: 8 }} >Loading...</Text>

                            </View>

                        </View>
                    </>
                    : <></>}
        </>
        // </Modal>

    );

}

export default Loader