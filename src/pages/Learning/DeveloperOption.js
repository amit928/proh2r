import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { NativeModules, Platform } from 'react-native';
import LocalKeyStore from '../../Store/LocalKeyStore';
import { isDeveloperOptionsEnabled } from '@adityaindiadev/react-native-developer-options-android';


// const isDeveloperOptionsEnabled = NativeModules.DeveloperOptionsModule.isDeveloperOptionsEnabled();
// console.log('Developer Options Enabled:', isDeveloperOptionsEnabled);

function ifIOS(handleResult) {

    handleResult(false)

}


export const isDeveloperOptionOn = async (handleResult) => {

    const { DeveloperOptionsModule } = NativeModules;

    if (Platform.OS == 'android') {

        console.log("DeveloperOptionsModule Start");


        try {
            await DeveloperOptionsModule.checkDeveloperOptions(handleResult);
            // console.log('Developer Options Enabled', await DeveloperOptionsModule.isDeveloperOptionsEnabled())
        } catch (error) {
            console.error(error);
            // return false;
        }

        console.log("DeveloperOptionsModule End");

    }
    else {
        ifIOS(handleResult)
    }
};



export function DeveloperOption() {

    const { DeveloperOptionsModule } = NativeModules;


    const [isDeveloperOptions, setIsDeveloperOptions] = useState(false);
    const [developerOptionText, setdeveloperOptionText] = useState('');

    const handleResult = (isEnabled) => {
        console.log('Developer Options Enabled', isEnabled);
        setIsDeveloperOptions(isEnabled)

    };


    const checkDeveloperOptions = async () => {


        try {
            DeveloperOptionsModule.checkDeveloperOptions(handleResult);
            // console.log('Developer Options Enabled', await DeveloperOptionsModule.isDeveloperOptionsEnabled())
        } catch (error) {
            console.error(error);
            // return false;
        }
    };



    

    // const fetchDeveloperOptionsStatus = async () => {
    //     const isEnabled = await checkDeveloperOptions();
    //     console.log('Developer Options Enabled', DeveloperOptionsModule);
    //     setIsDeveloperOptionsEnabled(isEnabled);
    // };



    return (
        <View>
            <Button
                onPress={() => {
                    // fetchDeveloperOptionsStatus()
                    // checkDeveloperOptions()
                    // isDeveloperOptionOn((isEnabled) => {
                    //     console.log('Developer Options Enabled', isEnabled);
                    //     setIsDeveloperOptionsEnabled(isEnabled)
                    // })

                    isDeveloperOptionsEnabled(handleResult)
                }}
                title='Click Me!'
            />
            <TextInput
                placeholder='Enter Text'
                multiline
                value={developerOptionText}
                onChangeText={(text) => {

                    // setdeveloperOptionText(text)

                }}

            />
            <Button
                onPress={() => {

                    // LocalKeyStore.setKey("DeveloperOptionText", developerOptionText)

                }}
                title='Click Me!'
            />

            <Text>
                {
                    isDeveloperOptions
                    ? 'Developer Options are enabled' : 'Developer Options are not enabled'
                }
                
            </Text>
        </View>
    )
}