import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Directions } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated'

const MyCheckBox = ({ label, func, val, fieldRef, fieldVal
    
 }) => {

   const [check, setcheck] = useState(false)

    let color = '#207398'


    return (

        <View style={styles.container}>
            
            <TouchableOpacity style={{ backgroundColor: fieldRef[fieldVal] ? color : "white" , width: 30, height: 30, borderRadius: 5, margin: 8, borderColor: color, borderWidth: 1, alignContent: 'center', alignItems: 'center', alignContent: 'center' }}
            
            onPress={() => {
                setcheck(!check)
                func(!check)
            }}
            >

                <Text allowFontScaling={false}  style={{  color: 'white', fontSize: 22}} >✓</Text>




            </TouchableOpacity>

            <Text 
            // onPress={() => {
                
            //     func(!check)
            // }}
            
            >
                
                {label} 
            
            </Text>



        </View>

    )


}

const styles = StyleSheet.create({
    container: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',



    }


});

export default MyCheckBox