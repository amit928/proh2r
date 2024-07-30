import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput, Picker, Animated, Vibration } from 'react-native';
import { Icon } from 'native-base';
import { FlatList, Alert } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast'
import CustomPicker from '../../components/CustomPicker';

import Loader from '../../components/Loader';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SwipeableList from '../../components/SwipeableList';
import SubmitBtnWide from '../../components/SubmitBtnWide';

const rightSwipeActions = (rejectFunc, isPending) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
    <>

      {isPending ?

        <TouchableOpacity
          style={{
            width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
            marginTop: 5, alignItems: 'center', paddingVertical: 2
          }}
          onPress={() => {

            rejectFunc()



          }}
        >

          <View
            style={{
              width: '100%', height: '100%', backgroundColor: '#e03737', justifyContent: 'center', flexDirection: 'row'

            }}
          >


            <View style={{ width: '100%', height: '100%', backgroundColor: "#e03737", justifyContent: 'center', alignItems: 'center' }}>

              <Image

                source={require('../../images/rejectTimesheet.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',

                }} />

            </View>

            {/* <Text
                  style={{
                      color: '#40394a',
                      paddingHorizontal: 10,
                      fontWeight: '600',
                      paddingHorizontal: 30,
                      paddingVertical: 20,
                      textAlign: 'right'
                  }}
              >
                  Approve
              </Text> */}

          </View>

        </TouchableOpacity>
        : <></>}
    </>
  );
};


const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center'

  },

  approvedCardView: {
    height: 190,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(70,169,64,1.0)'
  },

  rejectCardView: {
    height: 190,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(197,95,94,1.0)'

  },

  pendingCardView: {
    height: 235,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(243,219,131,1.0)'
  },

  approveStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(70,169,64,1.0)', paddingTop: 4, paddingLeft: 16 },
  rejectStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(197,95,94,1.0)', paddingTop: 4, paddingLeft: 16 },
  pendingStatus: { fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(237,205,70,1.0)', paddingTop: 4, paddingLeft: 16 }
}
)

export default class SeperationInitiate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      authDict: {},
      isLoading: false,
      seperationArr: [],

      openInitiate: false,
      separationType: 'Select Separation Type',
      comment: '',
      openPicker: false,
      separationTypeArr: [],
      processHistoryArr: [],
      sepObj: {},
      viewPopUp: false,
      typeArr: []
    }
  }

  componentDidMount() {

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.getSeperationReuestsAndTypes(false, Constant.SEPERATION_REQUEST + this.state.authDict.employeeCode)
        this.getSeperationReuestsAndTypes(true, Constant.SEPERATION_TYPES)
      }
    });

  }

  //WEB API

  async getSeperationReuestsAndTypes(isType, endPoint) {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + endPoint
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 200) {

        let responseJson = await response.json();


        if (!isType) {

          this.setState({ seperationArr: responseJson })

          if (this.props.openApplyReg == true) {

            this.setState({ openInitiate: true })

          }



        } else {

          console.log(responseJson)

          var arr = []
          var typeArr = []
          let dict = { "sepTypeId": '', "description": "", "seperationType": "Select Separation Type", "visibilityStatus": true }
          arr.push(dict)
          for (let i in responseJson) {
            if (responseJson[i].visibilityStatus) {

              arr.push(responseJson[i])
              typeArr.push(responseJson[i].seperationType)
            }
          }


          this.setState({ separationTypeArr: arr, typeArr: typeArr })
        }
      } else {
        Alert.alert('Something went wrong!')

        // this.refs.toast.show('Something went wrong!', 5000)
      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async separationRevokeRequest(id) {

    this.setState({ isLoading: true })

    var url = Constant.BASE_URL + Constant.SEPERATION_REVOKED_REQUEST + id
    console.log(url + '/n')
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 200) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message, 5000)    
        this.getSeperationReuestsAndTypes(false, Constant.SEPERATION_REQUEST + this.state.authDict.employeeCode)

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        // this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }

  async initiateSeparationRequest() {

    // this.setState({ openInitiate: false, separationType: 'Select Separation Type', comment: '', isLoading: true, sepObj: {} })

    this.setState({isLoading: true})

    var url = Constant.BASE_URL + Constant.RESIGNATION_REQUEST + this.state.sepObj.sepTypeId


    var params = {
      "empCode": this.state.authDict.employeeCode, "sepRequestTypes": {
        "sepTypeId": this.state.sepObj.sepTypeId,
        "seperationType": this.state.sepObj.seperationType, "description": this.state.sepObj.description, "visibilityStatus": this.state.sepObj.visibilityStatus
      }, "comments": this.state.comment
    }
    console.log('initiateSeparationRequest param', params)
    try {
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      console.log('initiateSeparationRequest', response);

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 201) {
        let responseJson = await response.json();
        console.log(responseJson)
        Alert.alert(responseJson.message)

        //  this.refs.toast.show(responseJson.message, 5000)  
        
        if (this.props.openApplyReg == true) {
         
          this.props.goBack()
        }

        else{
          this.getSeperationReuestsAndTypes(false, Constant.SEPERATION_REQUEST + this.state.authDict.employeeCode)
        }

        

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert('400', responseJson.message)
        console.log(responseJson);
        //  this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {

        // let responseJson = await response.json();
        // console.log(responseJson);

        Alert.alert('Something went wrong!')
        // this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }

    this.resetFunction()
  }

  // async  automatic() {

  // //  this.setState({openInitiate:false,separationType : 'Select Separation Type',comment:'',isLoading:true,sepObj:{}})
  //   var url = Constant.BASE_URL + Constant.RESIGNATION_REQUEST +  "1"


  //   var params =  {"empCode":'1173',"sepRequestTypes":{"sepTypeId":'1',
  //   "seperationType":'abscond',"description":'vccv',"visibilityStatus":true},"comments":'hfgghgh'}
  // console.log(params)
  //   try {
  //     let response = await fetch(url, {
  //       method: 'POST',
  //       body:JSON.stringify(params),
  //       headers: Constant.getHeader(this.state.authDict)
  //     }
  //     )

  //     let code = await response.status
  //     this.setState({isLoading:false})

  //     if (code == 201) {
  //       let responseJson = await response.json();          
  //       console.log(responseJson)
  //     //  Alert.alert(responseJson.message)

  //     //  this.refs.toast.show(responseJson.message, 5000)    

  //   //    this.getSeperationReuestsAndTypes(false,Constant.SEPERATION_REQUEST + this.state.authDict.employeeCode)

  //   } else if(code==400){
  //     let responseJson = await response.json();
  //     Alert.alert(responseJson.message)
  //   //  this.refs.toast.show(responseJson.message,5000);

  //   }
  //   else if(code == 401 || code == 503){

  //   //  Utility.logoutOnError(this.state.authDict,this.props.navigation)
  //   }else{
  //   //  Alert.alert('Something went wrong!')
  //    // this.refs.toast.show('Something went wrong!');

  //   }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }





  render() {


    return (

      <View style={styles.container}>
        {
          this.state.seperationArr.length != 0 ?

            <ScrollView showsVerticalScrollIndicator={false}>
              {
                this.state.seperationArr.map((item, index) =>
                  <>
                    <SwipeableList title={item.seperationDetails.empName} statusMain={item.seperationDetails.resignationStatus} fromTo={'Date: ' + Moment(String(item.seperationDetails.raisedOn)).format('DD-MM-YYYY')} rightSwipeActions={(swipeRef) => rightSwipeActions(() => this.revokeAction(index), item.seperationDetails.resignationStatus == "Pending")} onPress={() => {
                      // this.setState({ processHistoryArr: item.processHistory, viewPopUp: true })

                      this.props.navigation.navigate('ViewSeperationRequest', { seperationData: item })

                      // console.log(this.props.navigation);


                    }

                    }
                    />


                    {/* <View style={item.seperationDetails.resignationStatus == "Approved" ? styles.approvedCardView : item.seperationDetails.resignationStatus == "Revoked" ? styles.rejectCardView : styles.pendingCardView} key={index}>

                      <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

                        <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/seperation.png')}></Image>

                        <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1 }}>{item.seperationDetails.empName}</Text>

                        <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}
                          onPress={() =>

                            this.setState({ processHistoryArr: item.processHistory, viewPopUp: true })}>

                          <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            source={require('../../images/viewGray.png')} />
                        </TouchableOpacity>

                      </View>

                      <View style={{ flexDirection: 'row', height: 50 }}>
                        <View style={{ flex: 3, marginLeft: 8 }}>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Date</Text>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Moment(String(item.seperationDetails.raisedOn)).format('DD-MM-YYYY')}</Text>

                        </View>
                        <View style={{ flex: 3 }}>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Separation Type</Text>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.seperationDetails.separationType}</Text>

                        </View>
                        <View style={{ flex: 3 }}>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Status</Text>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.seperationDetails.resignationStatus}</Text>

                        </View>

                      </View>

                      <View style={{ flexDirection: 'row', height: 50 }}>
                        <View style={{ flex: 3, marginLeft: 8 }}>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>L1 Manager </Text>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.seperationDetails.l1Supervisor}</Text>

                        </View>
                        <View style={{ flex: 3 }}>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>L2 Manager</Text>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.seperationDetails.l2Supervisor}</Text>

                        </View>
                        <View style={{ flex: 3 }}>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>HR Manager</Text>
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.seperationDetails.hrmanagerSupervisor}</Text>

                        </View>
                      </View>

                  
                      {
                        item.seperationDetails.resignationStatus == "Pending"
                          ?
                          <View style={{
                            marginTop: 20, height: 45, flexDirection: 'row', justifyContent: 'center'
                            , alignItems: 'center', borderRadius: 8, width: Dimensions.get('window').width - 40
                          }}>

                            <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 17.5, backgroundColor: 'rgba(240,240,240,1.0)', flexDirection: 'row' }}
                              onPress={() => this.revokeAction(index)} >

                              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../images/undo.png')}></Image>
                              <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', fontSize: 13, marginLeft: 8 }}>Revoke Request</Text>

                            </TouchableOpacity>

                          </View>
                          : <></>

                      }

                    </View> */}
                  </>
                )
              }
            </ScrollView>
            :
            <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

            </Text>
        }

        <TouchableOpacity style={{
          alignSelf: 'flex-end', height: 60, width: 60, borderRadius: 30,
          justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 60, shadowOffset: { width: 0, height: 5, },
          shadowColor: 'gray',
          shadowOpacity: 3.0,
          elevation: 2, right: 20
        }} onPress={() => this.setState({ openInitiate: true })}>
          <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
        </TouchableOpacity>


        {/* Loader  Modal */}
        <Loader isLoader={this.state.isLoading}> </Loader>

        {/* Add Edit Grant Leave */}



        <Modal
          visible={this.state.openInitiate}
          transparent={true}
          onRequestClose={() => {

            if (this.props.openApplyReg == true) {

              this.props.goBack()

            }

            else{
              this.resetFunction()
            }

           }}
          animationType='slide'>

          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity onPress={() =>{ 
              

              if (this.props.openApplyReg == true) {
                this.resetFunction()
                this.props.goBack()
              }
  
              else{
                this.resetFunction()
              }

              }} activeOpacity={1} style={{ flex: 1, width: '100%' }}>

            </TouchableOpacity>

            <View style={{ width: Dimensions.get('window').width, height: '40%', backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius: 20, overflow: 'hidden', }}>

              <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#F6F4FB', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row', paddingHorizontal: 12 }}>

                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 17, color: 'black', fontWeight: '500', }}>Initiate Separation Request
                </Text>

              </View>

              {/* SELECT DATE */}
              <View style={{ alignItems: 'center' }}>

                <TouchableOpacity style={{
                  flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', width: '90%', height: 45, marginTop: 8
                }} onPress={() => this.setState({ openPicker: true })}>

                  <Text allowFontScaling={false} style={{ fontSize: 13, color: 'black', fontWeight: '100', paddingLeft: 8 }}>{this.state.separationType}</Text>

                  <Image
                    source={require('../../images/downArrow.png')}
                    style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                  />

                </TouchableOpacity>

                <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                </View>

                {/* Leave Comment*/}

                <TextInput allowFontScaling={false}
                  style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey' }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder='Leave Comment'
                  placeholderTextColor="#A9A9A9"
                  value={this.state.comment}
                  onChangeText={(comment) => this.setState({ comment: comment })}
                  returnKeyType="done" />
                <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                </View>

              </View>

              {/* Submit Button*/}

              <View style={{
                alignSelf: 'center', justifyContent: 'center'
                , alignItems: 'center', marginTop: '10%'
              }}>

                <SubmitBtnWide onPress={() => {
                  if (this.state.separationType == 'Select Separation Type') {
                    Alert.alert('Please select separation type.')

                    Vibration.vibrate()
                  } else if (this.state.comment == '') {
                    Alert.alert('Please enter comment.')
                    Vibration.vibrate()
                  } else {
                    this.initiateSeparationRequest()
                  }
                }} />




                {/* <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)', right: 18 }}
                  onPress={() => {
                    if (this.state.separationType == 'Select Separation Type') {
                      Alert.alert('Please select separation type.')

                      Vibration.vibrate()
                    } else if (this.state.comment == '') {
                      Alert.alert('Please enter comment.')
                      Vibration.vibrate()
                    } else {
                      this.initiateSeparationRequest()
                    }
                  }

                  }>
                  <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Initiate</Text>

                </TouchableOpacity> */}

              </View>

            </View>

            <CustomPicker
              showPicker={this.state.openPicker}
              arr={this.state.typeArr}
              title="Select Separation Type"

              handleClose={() => this.setState({ openPicker: false })}
              handleSubmit={this.handleSubmit}>
            </CustomPicker>

          </View>

        </Modal>

        <Modal
          visible={this.state.viewPopUp}
          transparent={true}
          onRequestClose={() => { }}>

          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, color: 'white', fontSize: 16, padding: 10, width: '100%', marginTop: 0, textAlign: 'center' }}>Process History</Text>

              {

                this.state.processHistoryArr.map((item, index) =>

                  <View style={{ width: '100%', flexDirection: 'row' }} key={index}>
                    <View style={{ width: 55, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
                      {
                        index != 0 ? <View style={{ height: 16, width: 2, backgroundColor: 'white' }}></View> : <></>

                      }
                      <View style={item.status != "Pending" ? { height: 55, width: 55, borderRadius: 27.5, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }
                        : { height: 55, width: 55, borderRadius: 27.5, backgroundColor: 'rgba(238,163,69,1.0)', justifyContent: 'center', alignItems: 'center' }}>

                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={item.status == "Pending" ? require('../../images/warningWhite.png') : require('../../images/approveWhite.png')}></Image>

                      </View>
                      {
                        index != this.state.processHistoryArr.length - 1 ?

                          <View style={{ height: 16, width: 2, backgroundColor: 'white' }}></View>
                          : <></>}
                    </View>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.0)', justifyContent: 'center' }} onPress={() => this.setState({ viewPopUp: false })}>
                      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratBold, color: 'white', fontSize: 13, padding: 10 }}>{item.stepValue}</Text>
                    </TouchableOpacity>
                  </View>

                )
              }
            </ScrollView>
          </View>
        </Modal>
        <Toast ref="toast" />

      </View>
    );
  }

  revokeAction(index) {

    this.setState({ revokeCheck: true })

    Alert.alert(
      'Confirmation',
      'Do you want to revoke this separation request?',
      [
        { text: 'Cancel' },
        {
          text: 'OK', onPress: () => { this.separationRevokeRequest(this.state.seperationArr[index].seperationDetails.separationReqId) }
        },
      ],

      { cancelable: false },
    );
  }

  resetFunction() {

    this.setState({ openInitiate: false, separationType: 'Select Separation Type', comment: '', openPicker: false, sepObj: {} })
  }

  //PICKER ACTION 
  handleSubmit = (val, index) => {

    console.log(this.state.separationTypeArr[index+1]);

    this.setState({ separationType: val, openPicker: false, sepObj: this.state.separationTypeArr[index+1] })

  }

}  