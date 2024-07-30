import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const CallAPI = () => {


    useEffect(() => {

      console.log("start");
        const url = "https://adsso.airtel.com/adfs/ls?wa=wsignin1.0&wtrealm=urn%3ahive%3aairtel&wctx=https%3a%2f%2fhive.airtel.com&RedirectToIdentityProvider=AD+AUTHORITY";

        // const url = "https://video2gif.000webhostapp.com";

        const formData = new URLSearchParams();
        formData.append('UserName', `oneairtel\B0272833`);
        formData.append('PassWord', '0~Ogsewx');
        
        fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        })
          .then(response =>{
             console.log(response)
            //  console.log(response.headers['map']["set-cookie"])
            
            })
        //   .then(data => {
        //     console.log('Response:', data);
        //   })
          .catch(error => {
            console.error('Error:', error);
          });
        
    
      
    }, [])
    

  return (
    <View>
      <Text>CallAPI</Text>
    </View>
  )
}

export default CallAPI