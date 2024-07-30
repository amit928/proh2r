import React from 'react';
import { ScrollView,Text, View, TouchableOpacity, StyleSheet, Image, Dimensions ,Alert,TouchableHighlight,Modal, Vibration } from 'react-native';
import { Icon } from 'native-base';
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Loader from '../../components/Loader';
import Nav from '../../components/NavBar';
import Toast, { DURATION } from 'react-native-easy-toast'

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',

  },

  navView: {
    height: 80,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    height: 30,
    width: 30,
    left: 20,
    resizeMode: 'contain',
    top: 30
  },

  viewShadow: {
    shadowColor: "grey",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
}
)


export default class NotificationScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      notificationArr: [],
      isLoading:false,
      authDict:{}
    }
  }

  componentDidMount() {

   // 1173?pageSize=5&currentPage=1

   KeyStore.getKey('authDict', (err, value) => {
    if (value) {
      this.setState({ authDict: value })
      this.getNotificationList()
    }
  });

  }

  async  getNotificationList() {
    // + '?pageSize=5&currentPage=1'
    var url = Constant.BASE_URL + Constant.NOTIFICATION_LIST + this.state.authDict.employeeCode 
  
    this.setState({isLoading:true})
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )
      let code = await response.status
      this.setState({isLoading:false})

      if (code == 200) {
        let responseJson = await response.json();
        // console.log(responseJson)
        let arr = responseJson.userNotificationResVOList
        this.setState({notificationArr:arr})  

      }
      if (code == 404) {

        this.refs.toast.show('No Data Found.', 5000)

      }
      
      else {
  
        //this.refs.toast.show('Something Went Wrong!', 5000)

      }
    } catch (error) {
      this.setState({isLoading:false})
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")

      Vibration.vibrate()
      console.error(error);
}
  }

  render(rowData) {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;


    return (

      <View style={styles.container}>

    <Nav title="Notification" backAction={()=>goBack()}></Nav>
      
      
        {
             this.state.notificationArr.length != 0   
             
             ? 

        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>

          <View style={{ width: Dimensions.get('window').width - 20, left: 10, top: 8 }}>

            {
              this.state.notificationArr.map((m, i) =>
               <View style={{ width: '100%', overflow: 'hidden', backgroundColor: 'white', marginVertical: 5, borderRadius: 2, justifyContent:'center'}} key={i}>
                <Text  allowFontScaling={false} style={{  paddingLeft: 14, fontSize: 12,paddingTop:8,paddingRight:14 ,fontFamily:Constant.MontserratSemiBold}}>{m.notificationTitle}</Text>
                <Text  allowFontScaling={false} style={{  paddingLeft: 16, fontSize: 11,paddingTop:8,paddingBottom:8,paddingRight:16 ,fontFamily:Constant.MontserratRegular,color:'rgba(148,149,150,1.0)'}}>{m.notificationBody}</Text>
                <View style={{height:0.5,width:'90%',backgroundColor:'gray',marginTop:6,alignSelf:'center'}}></View>
                </View>
              )
            }
          </View>
        </ScrollView>

        :
            
            <View style={{marginVertical:Dimensions.get('window').height/3-80,alignItems:'center',justifyContent:'center'}}>
            <Image style={{height:170,width:170,resizeMode:'contain',}} source={require('../../images/noNotification.png')}></Image>
            <Text  allowFontScaling={false} style={{marginTop:16,fontSize:22,fontFamily:Constant.MontserratSemiBold,color:'gray'}}>No Notification Found.</Text>
         
            </View>

        }
        <Loader isLoader={this.state.isLoading}> </Loader> 
        <Toast ref="toast"/>

      </View>
    );
  }
}