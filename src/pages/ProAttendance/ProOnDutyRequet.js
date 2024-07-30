import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Keyboard, Alert, Modal, TextInput, Picker, FlatList } from 'react-native';
import { Icon } from 'native-base';
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import * as Utility from '../../Externel Constant/Utility';
import Loader from '../../components/Loader';
import ViewItemDetail from '../../components/ViewItemDetail';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast, { DURATION } from 'react-native-easy-toast'
import CustomPicker from '../../components/CustomPicker';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Constant.BACKGROUNDCOLOR

  },

  approvedCardView: {
    height: 180,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
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
    height: 180,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
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
    height: 180,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
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

const checkNull = (value, passValue) => {
  if (value == null || value == "null") {
    return passValue
  }
  else {
    return value
  }
}


export default class OnDutyRequest extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      authDict: {},
      onDutyArr: [],
      onDutyViewKeyArr: [],
      onDutyViewValueArr: [],
      reasonArr: [],
      reasonId: '',
      passReasonArr: [],
      isLoading: false,
      isModalVisible: false,
      isDateTimePickerVisible: false,
      showReasonPicker: false,
      isView: false,
      showReason: false,
      startDate: '',
      startServerDate: '',
      endDate: '',
      endServerDate: '',
      startTime: '',
      startServerTime: '',
      endTime: '',
      endServerTime: '',
      comment: '',
      reasonValue: '',
      reasonKey: '',
      defaultTimeStatus: false,
      commentMandatory: false,
    }
  }

  componentDidMount() {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        this.getOnDutyRecord()
        this.getReasons()
        this.getTemplateSettings()
      }
    });
  }

  async getOnDutyRecord() {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.ON_DUTY_RECORD + 'empcode'
    console.log(url)
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
        console.log(responseJson)
        let arr = responseJson
        this.setState({ onDutyArr: arr })

        console.log(this.state.onDutyArr)

      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        // this.refs.toast.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //  this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  async submitOnDutyRequest() {

    /// this.closeModel()
    this.setState({ isLoading: true })

    var url = Constant.BASE_URL + Constant.ON_DUTY_RECORD

    let params = {
      "applicationId": "", "empReason": this.state.reasonId, "empCode": this.state.authDict.employeeCode, "onDutyStartTiming": this.state.startServerTime,
      "onDutyEndTiming": this.state.endServerTime, "startDate": this.state.startServerDate,
      "endDate": this.state.endServerDate, "comments": this.state.comment
    }
    console.log(params)
    console.log(url)

    try {
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          params
        ),
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 201 || code == 200) {
        this.closeModel()
        this.getOnDutyRecord()
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')


      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOnDutyRequest(value) {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.DELETE_ON_DUTY_REQUEST + value
    console.log(url)
    try {
      let response = await fetch(url, {
        method: 'PUT',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })

      if (code == 200) {

        this.getOnDutyRecord()

      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        //   this.refs.toasts.show(responseJson.message,5000);

      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //  this.refs.toasts.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  async getReasons() {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GET_REASON_ON_DUTY + this.state.authDict.employeeCode

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
        this.setState({ reasonArr: responseJson.onDutyReasonList, showReason: responseJson.reasonFlag })
        console.log(responseJson)

      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        //  this.refs.toasts.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTemplateSettings() {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GET_TEMPLATE_SETTINGS + this.state.authDict.employeeCode

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      let code = await response.status
      this.setState({ isLoading: false })
      if (code == 200) {

        try {
          let responseJson = await response.json();
          if (responseJson.onDutyTemplate.defaultShiftTimingStatus) {

            this.getShiftSettings()
            this.setState({ defaultTimeStatus: responseJson.onDutyTemplate.defaultShiftTimingStatus, commentMandatory: responseJson.onDutyTemplate.commentMandatory })
          }
          console.log(responseJson)
        } catch {

        }




      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getShiftSettings() {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GET_SHIFT_SETTINGS + this.state.authDict.employeeCode

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
        if (responseJson.length != 0) {
          let obj = responseJson[0]

          var startServerTime = obj.shiftStartTime
          var startTime = Utility.convertToUserDt(obj.shiftStartTime)
          var endServerTime = obj.shiftEndTime
          var endTime = Utility.convertToUserDt(obj.shiftEndTime)
          this.setState({ defaultTimeStatus: true, endServerTime: endServerTime, endTime: endTime, startTime: startTime, startServerTime: startServerTime })

        }

        console.log(responseJson)

      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }



  render() {


    return (

      <View style={styles.container}>

        {
          this.state.onDutyArr.length != 0 ?


            <FlatList
              data={this.state.onDutyArr}
              showsVerticalScrollIndicator={false}

              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) => this.renderList(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
            :
            <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found
            </Text>
        }

        <FloatBtnComp clickBtn={() => this.toggleModal()} />

        {/* //:- Modal Module With Pop Up */}

        <Modal
          visible={this.state.isModalVisible}
          transparent={true}

          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}>

          <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ borderRadius: 8, width: '92%', backgroundColor: 'white', overflow: 'hidden' }}>

                <View style={{ width: '100%', height: 50, backgroundColor: 'rgba(47,109,196,1.0)', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', alignSelf: 'flex-start' }}>

                  <Text allowFontScaling={false} style={{ color: 'white', fontSize: 15, paddingLeft: 8, fontFamily: Constant.MontserratSemiBold }}>New On Duty Request
                  </Text>

                  <TouchableOpacity style={{ width: 45, height: 50, right: 0, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => this.closeModel()}>

                    <Image
                      source={require('../../images/cancel.png')}
                      style={{ height: 30, width: 30, resizeMode: 'contain' }} />

                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 16 }}>

                  <Text allowFontScaling={false} style={{ paddingTop: 12, paddingLeft: 16, fontSize: 12, fontFamily: Constant.MontserratMedium }}>Start Timing</Text>

                  <TouchableOpacity style={{
                    marginTop: 10, flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '92%', height: 40, alignSelf: 'center', borderRadius: 20,
                    borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)'
                  }}

                    onPress={() => this.state.isEdit ? console.log('cant edit') : (Keyboard.dismiss(), this.setState({ isStartDate: false, isEndDate: false, isStartTime: true, isEndTime: false }))}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingLeft: 8 }}>{this.state.startTime}</Text>

                    <Image
                      source={require('../../images/downArrow.png')}
                      style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }} />

                  </TouchableOpacity>

                  <Text allowFontScaling={false} style={{ paddingTop: 12, paddingLeft: 16, fontSize: 12, fontFamily: Constant.MontserratMedium }}>End Timing</Text>

                  <TouchableOpacity style={{
                    marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '92%', height: 40, alignSelf: 'center', borderRadius: 20,
                    borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)'
                  }}

                    onPress={() => this.state.isEdit ? console.log('cant edit') : (Keyboard.dismiss(), this.setState({ isStartDate: false, isEndDate: false, isStartTime: false, isEndTime: true }))}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingLeft: 8 }}>{this.state.endTime}</Text>

                    <Image
                      source={require('../../images/downArrow.png')}
                      style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }} />

                  </TouchableOpacity>

                  <Text allowFontScaling={false} style={{ paddingTop: 12, paddingLeft: 16, fontSize: 12, fontFamily: Constant.MontserratMedium }}>Start Date</Text>

                  <TouchableOpacity style={{
                    marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '92%', height: 40, alignSelf: 'center', borderRadius: 20,
                    borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)'
                  }}

                    onPress={() => this.state.isEdit ? console.log('cant edit') : (Keyboard.dismiss(), this.setState({ isStartDate: true, isEndDate: false, isStartTime: false, isEndTime: false }))}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingLeft: 8 }}>{this.state.startDate}</Text>

                    <Image
                      source={require('../../images/downArrow.png')}
                      style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }} />

                  </TouchableOpacity>


                  <Text allowFontScaling={false} style={{ paddingTop: 12, paddingLeft: 16, fontSize: 12, fontFamily: Constant.MontserratMedium }}>End Date</Text>
                  <TouchableOpacity style={{
                    marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '92%', height: 40, alignSelf: 'center', borderRadius: 20,
                    borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)'
                  }}

                    onPress={() => this.state.isEdit ? console.log('cant edit') : (Keyboard.dismiss(), this.setState({ isStartDate: false, isEndDate: true, isStartTime: false, isEndTime: false }))}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingLeft: 8 }}>{this.state.endDate}</Text>

                    <Image
                      source={require('../../images/downArrow.png')}
                      style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }} />

                  </TouchableOpacity>

                  {
                    this.state.showReason
                      ?
                      <>
                        <Text allowFontScaling={false} style={{ paddingTop: 12, paddingLeft: 16, fontSize: 12, fontFamily: Constant.MontserratMedium }}>Reason</Text>

                        <TouchableOpacity style={{
                          marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',
                          alignItems: 'center', width: '92%', height: 40, alignSelf: 'center', borderRadius: 20,
                          borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)'
                        }}

                          onPress={() => this.setState({ showReasonPicker: true })}>

                          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingLeft: 8 }}>{this.state.reasonValue}</Text>

                          <Image
                            source={require('../../images/downArrow.png')}
                            style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }} />

                        </TouchableOpacity>
                      </>
                      : null
                  }


                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, paddingLeft: 16, marginTop: 10 }}>Comment</Text>
                  <View style={{ alignSelf: 'center', width: '90%', height: 80, top: 5, borderRadius: 10, borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)' }}>

                    <TextInput allowFontScaling={false} numberOfLines={10}

                      style={{ height: '100%', width: '100%', fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingTop: 8, paddingLeft: 8, textAlignVertical: 'top' }}
                      placeholder='Write..'

                      placeholderTextColor="#A9A9A9"
                      value={this.state.comment}
                      multiline={true}
                      maxLength={200}
                      onChangeText={(comment) => this.setState({ comment: comment })}
                    />
                  </View>

                  <View style={{
                    height: 60, flexDirection: 'row', justifyContent: 'space-between'
                    , alignItems: 'center', marginTop: 16, width: '90%', alignSelf: 'center'
                  }}>

                    <TouchableOpacity style={{ height: 35, width: '48%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(42,76,136,1.0)' }}
                      onPress={() => this.closeModel()}>

                      <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13, fontFamily: Constant.MontserratBold }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 35, width: "48%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)' }}
                      onPress={() => this.onSubmit()}>
                      <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13, fontFamily: Constant.MontserratBold }}>Submit</Text>
                    </TouchableOpacity>

                  </View>

                </View>
              </View>
            </View>


            <CustomPicker
              showPicker={this.state.showReasonPicker}
              arr={this.showReasonPicker()}
              title="Select Reason"
              handleClose={() => this.setState({ showReasonPicker: false })}
              handleSubmit={this.handleSubmit}>
            </CustomPicker>


          </KeyboardAwareScrollView>

          <DateTimePicker
            titleIOS=''
            isVisible={this.state.isStartDate || this.state.isEndDate || this.state.isStartTime || this.state.isEndTime}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode={this.state.isStartTime || this.state.isEndTime ? 'time' : 'date'}
          />

          <Loader isLoader={this.state.isLoading}> </Loader>
        </Modal>
        {
          this.state.isView ?
            <ViewItemDetail viewDetail={this.state.isView} title='View On Duty Request' keyArr={this.state.onDutyViewKeyArr} valueArr={this.state.onDutyViewValueArr} cancelAction={() => this.setState({ isView: false })}>
            </ViewItemDetail>
            : null
        }
        <Toast ref="toasts" />

        <Loader isLoader={this.state.isLoading}> </Loader>
      </View>
    );
  }

  renderList = (item, index) =>
    <View style={item.onDutyRequestStatus == "APPROVED" ? styles.approvedCardView : item.onDutyRequestStatus == "REJECTED" || item.onDutyRequestStatus == "CANCELLED" ? styles.rejectCardView : styles.pendingCardView} key={index}>

      <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

        <Image style={{ height: 40, width: 40, resizeMode: 'contain', marginLeft: 16 }} source={item.onDutyRequestStatus == "APPROVED" ? require('../../images/grant_leaves-approved.png')

          : item.onDutyRequestStatus == "REJECTED" ? require('../../images/grant_leaves-reject.png') : require('../../images/grant_leaves-processing.png')}></Image>

        <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 13, padding: 8, color: 'black', marginTop: 10, flex: 1 }}>{Utility.splitStatus(item.onDutyRequestStatus)}</Text>

        <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.viewAction(index)}>

          <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
            source={require('../../images/viewGray.png')}
          />
        </TouchableOpacity>
        {
          item.onDutyRequestStatus == 'LEVEL1PENDING' || item.onDutyRequestStatus == 'LEVEL2PENDING'
            ?
            <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.deleteAction(index)}>
              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                source={require('../../images/block.png')}
              />
            </TouchableOpacity>

            :
            null
        }

      </View>

      <View style={{ flexDirection: 'row', height: 50 }}>
        <View style={{ flex: 2, marginLeft: 16 }}>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Start Timing</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Utility.checkNull(String(item.onDutyStartTiming))}</Text>

        </View>
        <View style={{ flex: 2 }}>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>End Timing</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Utility.checkNull(String(item.onDutyEndTiming))}</Text>

        </View>
      </View>

      <View style={{ flexDirection: 'row', height: 50 }}>
        <View style={{ flex: 2, marginLeft: 16 }}>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Start Date</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Moment(item.startDate + ' 00:00:00').format('DD-MM-YYYY')}</Text>
        </View>

        <View style={{ flex: 2 }}>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>End Date</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Utility.checkNull(String(item.endDate))}</Text>

        </View>
      </View>

    </View>

  showReasonPicker() {
    let arr = []
    this.state.reasonArr.map((item, index) => {
      arr.push(item.reason)
    })
    return arr
    //this.setState({})
  }

  //PICKER ACTION 
  handleSubmit = (val, index) => {

    this.setState({ reasonValue: val, reasonId: this.state.reasonArr[index].onDutyReasonId, showReasonPicker: false })

  }


  hideDateTimePicker = () => {

    this.setState({

      isStartDate: false,
      isEndDate: false,
      isStartTime: false, isEndTime: false
    });
  };

  handleDatePicked = date => {

    const momentDate = Moment(date.toISOString());
    var pickedDate = Moment(momentDate).format('DD/MM/YYYY')
    var pickedServerDate = Moment(momentDate).format('YYYY-MM-DD')
    var pickedTimeInServerDate = Moment(momentDate).format('HH:mm')

    var pickedTimeDate = Moment(momentDate).format('h:mm a')

    if (this.state.isStartDate) {
      this.setState({ startDate: pickedDate, startServerDate: pickedServerDate })

    } else if (this.state.isEndDate) {
      this.setState({ endDate: pickedDate, endServerDate: pickedServerDate })

    } else if (this.state.isStartTime) {
      this.setState({ startTime: pickedTimeDate, startServerTime: pickedTimeInServerDate })

    } else {
      this.setState({ endTime: pickedTimeDate, endServerTime: pickedTimeInServerDate })

    }
    this.hideDateTimePicker();

  };

  closeModel() {

    if (this.state.defaultTimeStatus) {
      this.setState({
        endDate: ''
        , endServerDate: '', startDate: '', startServerDate: '', comment: '', reasonValue: '', reasonId: ''
      })

    } else {
      this.setState({
        startTime: '', startServerTime: '', endDate: ''
        , endServerDate: '', endTime: '', endServerTime: '', startDate: '', startServerDate: '', comment: '', reasonValue: '', reasonId: ''
      })

    }

    this.toggleModal()
  }

  toggleModal = () => {

    this.setState({ isModalVisible: !this.state.isModalVisible });

  };

  onSubmit() {


    if (this.state.startTime == '') {
      Alert.alert('Please select start time.')
    } else if (this.state.endTime == '') {
      Alert.alert('Please select end time.')
    } else if (this.state.startDate == '') {
      Alert.alert('Please select start date.')
    } else if (this.state.endDate == '') {
      Alert.alert('Please select end date.')
    }
    else if (this.state.commentMandatory && this.state.comment == '') {
      Alert.alert('Please enter comment.')
    }
    else {
      this.submitOnDutyRequest()
    }
  }

  deleteAction(i) {

    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel this on duty request?',
      [
        { text: 'Cancel' },
        {
          text: 'OK', onPress: () =>
            this.deleteOnDutyRequest(this.state.onDutyArr[i].applicationId)
        },

      ],
      { cancelable: false },
    );
  }

  viewAction(index) {

    let obj = this.state.onDutyArr[index]

    const value = Object.values(obj);

    const key = Object.keys(obj);

    var keyArr = ['Employee Name', 'Start Date', 'End Date', 'Start Timing', 'End Timing', 'Reason', 'Status']

    var arr = []

    arr.push(Utility.splitStatus(obj.employeeName))
    arr.push(Moment(obj.startDate + ' 00:00:00').format('DD-MM-YYYY'))
    arr.push(Moment(obj.endDate).format('DD-MM-YYYY'))
    arr.push(obj.onDutyStartTiming)
    arr.push(obj.onDutyEndTiming)

    arr.push(obj.empReason)
    arr.push(Utility.splitStatus(obj.onDutyRequestStatus))

    this.setState({ onDutyViewKeyArr: keyArr, onDutyViewValueArr: arr, isView: true })

    console.log()
  }

  filterItem() {

    let arr = []
    if (this.state.showRequestPicker) {
      this.state.typeRequestArr.map((m, index) => {
        arr.push(m.value)
      })
    } else {
      this.state.resonArr.map((m, index) => {
        arr.push(m.assignedReason)

      })

    }

    return arr
  }
}