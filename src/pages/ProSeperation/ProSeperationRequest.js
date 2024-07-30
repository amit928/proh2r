import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput, Picker, Animated, Alert, Vibration } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import DateTimePicker from "react-native-modal-datetime-picker";

import Loader from '../../components/Loader';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SwipeableList from '../../components/SwipeableList';


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


            <View style={{ width: '100%', height: '100%', backgroundColor: "#008000", justifyContent: 'center', alignItems: 'center' }}>

              <Image

                source={require('../../images/approveTimesheet.png')}
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
    borderColor: 'rgba(243,219,131,1.0)'
  },
  pendingApprovedCardView: {
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

export default class SeperationTeamRequest extends React.Component {

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
      approvePopUp: false,
      isDateTimePickerVisible: false,
      releavingDate: '',
      releavingServerDate: '',
      reqId: '',
    }
  }

  componentDidMount() {

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.getSeperationReuestsAndTypes(false, Constant.TEAM_SEPERATION_REQUEST + this.state.authDict.employeeCode)

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

        } else {

          console.log(responseJson)

          var arr = []
          let dict = { "sepTypeId": '', "description": "", "seperationType": "Select Seperation Type", "visibilityStatus": true }
          arr.push(dict)
          for (i in responseJson) {
            if (responseJson[i].visibilityStatus) {
              arr.push(responseJson[i])
            }
          }


          this.setState({ separationTypeArr: arr })
        }
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()
        //   this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
        Vibration.vibrate()

        //  this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  async separationApproveRequest() {


    var url = Constant.BASE_URL + Constant.TEAM_SEPERATION_APPROVE + this.state.reqId

    var params = { "comments": this.state.comment, "relievingDate": this.state.releavingServerDate }

    this.setState({ approvePopUp: false, releavingDate: '', comment: '', reqId: '', releavingServerDate: '', releavingDate: '', isLoading: true })
    console.log(params)
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: JSON.stringify(params),

      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 201) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        Vibration.vibrate()
        // this.refs.toast.show(responseJson.message, 5000)    

        this.getSeperationReuestsAndTypes(false, Constant.TEAM_SEPERATION_REQUEST + this.state.authDict.employeeCode)

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()

        //   this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
        Vibration.vibrate()

        //   this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert('Something went wrong!')
      Vibration.vibrate()

      //  this.refs.toast.show('Something went wrong!', 5000)
      console.error(error);
    }
  }

  render() {

    return (

      <View style={styles.container}>
        {
          this.state.seperationArr.length != 0 ?

            <ScrollView showsVerticalScrollIndicator={false}>

              {

                this.state.seperationArr.map((item, index) =>
                  <>

                    <SwipeableList title={item.seperationDetails.empName} statusMain={item.seperationDetails.resignationStatus} fromTo={'Date: ' + Moment(String(item.seperationDetails.raisedOn)).format('DD-MM-YYYY')} rightSwipeActions={(swipeRef) => rightSwipeActions(() => this.setState({ reqId: item.seperationDetails.separationReqId, approvePopUp: true, releavingServerDate: item.seperationDetails.relievingDate, releavingDate: Moment(item.seperationDetails.relievingDate).format('DD/MM/YYYY') }), item.seperationDetails.resignationStatus == "Pending")} onPress={() => {
                      
                      // this.setState({ processHistoryArr: item.processHistory, viewPopUp: true })

                      this.props.navigation.navigate('ViewSeperationRequest', { seperationData: item })
                      // console.log(this.props);


                    }

                    }
                    />

                    {/* <View style={item.seperationDetails.resignationStatus == "Approved" ? styles.approvedCardView : item.seperationDetails.resignationStatus == "Revoked" ?
                      styles.rejectCardView : item.seperationDetails.showHideApprovalButton ? styles.pendingApprovedCardView : styles.pendingCardView} key={index}>

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
                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Seperation Type</Text>
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
                        item.seperationDetails.showHideApprovalButton
                          ?
                          <View style={{
                            marginTop: 20, height: 45, flexDirection: 'row', justifyContent: 'center'
                            , alignItems: 'center', borderRadius: 8, width: Dimensions.get('window').width - 40
                          }}>

                            <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 17.5, backgroundColor: 'rgba(240,240,240,1.0)', flexDirection: 'row' }}
                              onPress={() => this.setState({ reqId: item.seperationDetails.separationReqId, approvePopUp: true, releavingServerDate: item.seperationDetails.relievingDate, releavingDate: Moment(item.seperationDetails.relievingDate).format('DD/MM/YYYY') })}>

                              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../images/approved.png')}></Image>
                              <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', fontSize: 13, marginLeft: 8 }}>Approve</Text>

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


        {/* Loader  Modal */}
        <Loader isLoader={this.state.isLoading}> </Loader>



        {/* View Pop Up */}
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


        {/* Approve Request */}

        <Modal
          visible={this.state.approvePopUp}
          transparent={true}
          onRequestClose={() => { }}>

          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ width: Dimensions.get('window').width - 40, height: 300, backgroundColor: 'white', borderRadius: 8 }}>

              <View style={{ height: 50, width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>

                <View style={{ flex: 3 }}></View>
                <View style={{ flex: 3, marginTop: -50, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../../images/dialog-logo.png')} style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 50 }}>
                  </Image>
                </View>
                <View style={{ flex: 3 }}>
                  <TouchableOpacity style={{ width: 100, height: 50, alignSelf: "flex-end" }} onPress={() => this.setState({ approvePopUp: false, releavingDate: '', comment: '' })}>
                    <Image
                      source={require('../../images/cross.png')}
                      style={{ height: '60%', width: '60%', resizeMode: 'contain', alignSelf: 'flex-end', marginTop: 10 }} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 17, color: 'black', fontWeight: '500', padding: 8 }}>Are you sure you want to approve this request?
              </Text>


              {/* SELECT DATE */}
              <View style={{ alignItems: 'center' }}>


                <TouchableOpacity style={{
                  flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', width: '90%', height: 45, marginTop: 8
                }} onPress={() => this.showDateTimePicker()}>

                  <Text allowFontScaling={false} style={{ fontSize: 13, color: 'grey', fontWeight: '100', paddingLeft: 8 }}>{this.state.releavingDate}</Text>

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
                  placeholder='Comment'
                  placeholderTextColor="#A9A9A9"
                  value={this.state.comment}
                  onChangeText={(comment) => this.setState({ comment: comment })}
                  returnKeyType="done" />
                <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                </View>

              </View>

              {/* Submit Button*/}

              <View style={{
                height: 60, flexDirection: 'row', justifyContent: 'space-between'
                , alignItems: 'center', marginTop: 16, borderRadius: 8, width: Dimensions.get('window').width - 40
              }}>


                <TouchableOpacity style={{ height: 35, width: '42%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(42,76,136,1.0)', left: 18 }}
                  onPress={() => this.setState({ approvePopUp: false, releavingDate: '', comment: '' })}>
                  <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Cancel</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ height: 35, width: "42%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)', right: 18 }}
                  onPress={() => this.separationApproveRequest()}>
                  <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Submit</Text>

                </TouchableOpacity>

              </View>


            </View>
            <DateTimePicker
              titleIOS=''
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker} />

          </View>
        </Modal>


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

  showDateTimePicker = () => {

    this.setState({ isDateTimePickerVisible: true });

  };

  hideDateTimePicker = () => {

    this.setState({
      isDateTimePickerVisible: false,
    });

  };

  handleDatePicked = date => {

    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('DD/MM/YYYY')
    var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD')

    this.setState({ releavingDate: String(pickedDt), releavingServerDate: pickedServerDt });
    this.hideDateTimePicker();
  };

}  