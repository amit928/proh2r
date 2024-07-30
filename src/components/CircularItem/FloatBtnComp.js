import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export const FloatBtnComp = ({ clickBtn = () => { }, iconImg = require('../../images/floatBtn.png') }) => {


    return (
        <Shadow distance={5} containerViewStyle={{
            zIndex: 10,
            alignSelf: 'flex-end',
            //  alignItems: 'center',
            position: 'absolute',
            bottom: 60, right: 20,
        }} offset={[0.2, 2]}
            startColor='#A9A9A9'
        // finalColor='#9b9aed' 
        // corners={'bottomRight'}
        >

            <TouchableOpacity activeOpacity={0.5} style={{
                // alignSelf: 'flex-end', 

                zIndex: 10,

                borderRadius: 30,
                // justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 60, 
                // // shadowColor: 'grey',
                // // shadowOpacity: 3.0,
                // // elevation: 20, 
                // right: 20,
                // backgroundColor: "#0000",
                // shadowRadius: 2,
                // borderWidth: 0.4,
                // borderColor: 'grey',
                // overflow: 'hidden',
                // shadowOffset: { width: 0, height: 5, }


            }} onPress={() => {
                clickBtn()
            }
                // this.props.navigation.navigate('ApplyLeave', { refreshList: this._refreshHistoryList, isEdit: '0' })

            } >

                <Image style={{ width: 50, height: 50, resizeMode: 'contain', alignSelf: 'center', }} source={iconImg}></Image>

            </TouchableOpacity>


        </Shadow>);

}