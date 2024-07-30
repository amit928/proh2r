import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
//import styles from './MyDropDownStyle'
import Loader from '../../components/Loader';
//import { ScrollView } from 'react-native-gesture-handler';

import * as Constant from '../../Constant/Constants';




const MyDropDown = ({ data = [],
    value, myFunc, showDropdown, setshowDropdown, valueKeyName
}) => {

    //const [data, setdata] = useState()
    //const [showDropdown, setshowDropdown] = useState(false)



    const [selectedExpenseNamePill, setselectedExpenseNamePill] = useState('')




    return (




        <ScrollView style={{ borderWidth: 0 }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >



            {
                data.map((val, i) => {

                    return (


                        <TouchableOpacity key={String(i)} style={{ alignSelf: 'center', padding: 12, backgroundColor: selectedExpenseNamePill == val[valueKeyName] ? 'rgba(52,74,235,1.0)' : 'white', borderRadius: 10, marginLeft: 5, marginRight: 5 }} onPress={() => {
                            console.log('click Button Name: ', val[valueKeyName], 'index', i)
          
                            myFunc(val)
          
                            setselectedExpenseNamePill(val[valueKeyName])
          
                          }}>
          
                            <Text allowFontScaling={false}  style={{
                              color: selectedExpenseNamePill == val[valueKeyName] ? "white" : 'black', fontFamily: Constant.MontserratMedium,
                              fontSize: 13,
                            }}> {val[valueKeyName]} </Text>
          
                          </TouchableOpacity>

                        // <TouchableOpacity style={{ backgroundColor: 'white', borderColor: 'white', borderWidth: 1, borderRadius: 5, padding: 4 }} key={String(i)}
                        //     onPress={() => {
                        //         myFunc(val)
                        //         setshowDropdown(false)
                        //     }}
                        // >
                        //     <Text>
                        //         {val[valueKeyName]}
                        //     </Text>
                        // </TouchableOpacity>

                    )
                })

            }



        </ScrollView>






    )

}

export default MyDropDown