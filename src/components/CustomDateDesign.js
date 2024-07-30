import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    Dimensions,
    TextInput,
    Alert,
    Keyboard,
    Modal,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Constant } from '../Constant/Index';



const CustomDateDesign = ({ Lable = 'Date:', onPress = () => { }, dateTitle = 'Select Date', iconImgPath=require('../images/calendar_new_icon.png'), iconImgSize={width: 15, height: 15}, width='100%', disabled=false}) => {


    
    // const [picker, setpicker] = useState(false)

    return (<>


        <View style={{ width: width, marginBottom: 16 }}>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: Constant.MontserratMedium,
                    fontSize: 15,
                    marginBottom: 15
                }}>{Lable}</Text>

            <TouchableOpacity disabled={disabled}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    // top: 5,
                    height: 40,
                    borderRadius: 10,
                    // borderColor: 'rgba(205,203,251,1.0)',
                    backgroundColor: 'white',
                    // marginTop: 10,
                    // marginLeft: 5
                }}
                onPress={() => {
                    onPress()
                    // setpicker(true)
                }
                }>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: 'black',
                        fontFamily: Constant.MontserratMedium,
                        fontSize: 13,
                        paddingLeft: 8,
                    }}>
                    {dateTitle}
                </Text>

                <Image
                    source={iconImgPath}
                    style={{
                        width: iconImgSize.width,
                        height: iconImgSize.height,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        right: 10,
                    }}
                />
            </TouchableOpacity>
        </View>

    </>);


}

export default CustomDateDesign