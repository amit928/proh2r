import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'
//import styles from './MyDropDownStyle'
import Loader from '../../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';





const MyDropDownNormal = ({ data = [],
    value, myFunc, 
}) => {

    //const [data, setdata] = useState()
    const [showDropdown, setshowDropdown] = useState(false)








    return (

        <View style={{marginBottom:10}}>

            <TouchableOpacity style={{ 
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#e2e6f8',
            padding: 8,
            // borderRadius: 22,
            //minHeight: 42,
            borderRadius: 20,  borderBottomEndRadius: showDropdown ? 0 : 20, borderBottomStartRadius: showDropdown ? 0 : 20, justifyContent: 'space-between',alignItems: 'center',borderWidth: 1,borderColor: 'black',borderBottomWidth: showDropdown ? 0 : 1
        }}
                activeOpacity={0.8}
                onPress={() => { setshowDropdown(!showDropdown) }}>

                    <Text allowFontScaling={false} > {'Choose an Option' }
                    </Text>

                    <Image style={{ transform: [{rotate: showDropdown? '180deg' : '0deg'}], marginRight: 5 }} source={require('../../images/downArrow.png')}/>

            </TouchableOpacity>

            
            <ScrollView style= {{maxHeight: 100, borderWidth: showDropdown? 1 : 0, borderColor: 'black', }} >

          { showDropdown ? 

          
              data.map((val, i) => {

                return(
                    
                   <TouchableOpacity style={{backgroundColor: 'white', borderColor: 'white', borderWidth: 1, borderRadius: 5, padding: 4}}  key={String(i)} 
                   onPress={()=> { 
                                   setshowDropdown(false)
                } }
                   >
                       <Text allowFontScaling={false} >
                           {val}
                       </Text> 
                   </TouchableOpacity>
                   
                )
            })

            
            
        : null
        }

</ScrollView>

</View>
        



    )

}

export default MyDropDownNormal