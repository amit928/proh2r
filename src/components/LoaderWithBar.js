import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal, Alert, Vibration } from 'react-native';
import ProgressBar from './ProgressBar';

export default class LoaderWithBar extends Component {

    constructor(props) {

        super(props)

        this.state = {

            timeoutLoading: true,
        }
    }

    render() {

        const { isLoader, progressValue } = this.props

        return (
            // <Modal
            //     visible={isLoader}
            //     transparent={true}
            //     onRequestClose={() => {
            //     }}>
            <>
                {
                    isLoader ?

                        <View style={{ elevation: 3, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>

                            <View style={{ backgroundColor: 'white', borderRadius: 10, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>

                                <ActivityIndicator size="large" color="rgba(63,59,192,1.0)" />
                                <Text allowFontScaling={false} style={{ textAlign: 'center', padding: 8 }} >Loading...</Text>

                                

                            </View>
                            <View style={{top: '78%', position: 'absolute'}}>
                                <ProgressBar value={progressValue} backgroundColor={"rgba(0,0,0,0.4)"}/>
                                </View>

                        </View>
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