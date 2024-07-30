import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from "@react-native-community/netinfo";

const NetInfoDemo = () => {


    const { type, isConnected } = NetInfo.useNetInfo();
    // const [isConnected, setisConnected] = useState(false)

    

    useEffect(() => {
      
        // const unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        //   });

    
      return () => {

        console.log("unmounted");
        
        // unsubscribe()
        
      }
    }, [])
    

  return (
    <View style={{width: '100%', height: 450, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
            
    <Text>
        {/* Your Network: {" " + isConnected} */}
        Your Network: {type + " " + isConnected}
    </Text>

</View>
  )
}

export default NetInfoDemo

const styles = StyleSheet.create({})