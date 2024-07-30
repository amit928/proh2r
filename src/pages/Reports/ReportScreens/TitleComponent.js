import React from 'react';
import {
   
    Text,
    View, 
} from 'react-native';

import * as Constant from '../../../Constant/Constants';


export default function TitleComponent({title = 'Enter Title'}) {


    return (

        <>
            <View style={{ height: 80 }} />

            <View style={{ padding: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4231FF', borderRadius: 5, }}>
                <Text allowFontScaling={false} style={{
                    fontSize: 17,
                    //  fontWeight: 'bold', color: '#A9A9A9', 
                    color: 'white', fontFamily: Constant.MontserratRegular
                }}>{title}
                </Text>

            </View>
        </>
    )
}