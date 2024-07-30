import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions,Modal,TextInput,Picker,FlatList,Alert,Keyboard, Vibration } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import DialogInput from 'react-native-dialog-input';
import Toast, { DURATION } from 'react-native-easy-toast'
import ViewItemDetail from '../../components/ViewItemDetail';

import Loader from '../../components/Loader';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomPicker from '../../components/CustomPicker';

const styles = StyleSheet.create({

  container: {
      height: '100%',
      width: '100%',
     // justifyContent:'center'

  },

  approvedCardView:{
      width:'90%',
      backgroundColor:'white',
      alignSelf:'center',
      marginBottom:16,
      shadowColor: 'rgba(185,185,185,1.0)',
      shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
     elevation: 3,
     borderRadius:12,
     borderWidth:2,
     borderColor:'rgba(70,169,64,1.0)'
  },

      rejectCardView:{
          width:'90%',
          backgroundColor:'white',
          alignSelf:'center',
          marginBottom:16,
          shadowColor: 'rgba(185,185,185,1.0)',
          shadowOffset: {
              width: 0,
              height: 6,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.30,
          
          elevation: 3,          
           borderRadius:12,
         borderWidth:2,
         borderColor:'rgba(197,95,94,1.0)'

          },
          pendingCardView:{
              width:'90%',
              backgroundColor:'white',
              alignSelf:'center',
              marginBottom:16,
              shadowColor: 'rgba(185,185,185,1.0)',
              shadowOffset: {
                  width: 0,
                  height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.30,
              elevation: 3,   
             borderRadius:12,
             borderWidth:2,
             borderColor:'rgba(243,219,131,1.0)'
          },
          approveStatus:{fontFamily:Constant.MontserratRegular,fontSize:12,color:'rgba(70,169,64,1.0)',paddingTop:4,paddingLeft:16},
          rejectStatus:{fontFamily:Constant.MontserratRegular,fontSize:12,color:'rgba(197,95,94,1.0)',paddingTop:4,paddingLeft:16},
          pendingStatus:{fontFamily:Constant.MontserratRegular,fontSize:12,color:'rgba(237,205,70,1.0)',paddingTop:4,paddingLeft:16},
          approveBtn:{margin:16,height:35,width:"42%",justifyContent:'center',alignItems:'center',borderRadius:17.5,backgroundColor:'rgba(240,240,240,1.0)',flexDirection:'row'},
          rejectBtn:{margin:16,height:35,width:'42%',justifyContent:'center',alignItems:'center',flexDirection:'row',borderWidth:1,borderColor:'rgba(240,240,240,1.0)',borderRadius:17.5}
          
}
)

export default class TeamOnDutyRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            authDict:{},
            teamOnDutyReqArr: [],
            teamOnDutyDummyReqArr:[],
            isLoading:false,
            approveCheck:false,
            rejectCheck:false,
            dutyItemId:'',
            onDutyViewKeyArr: [],
            onDutyViewValueArr: [],
      
            reasonArr: [],

            isView: false,
            totalPendingRequest:0,
            comment:'',
            searchEnable:false,
            searchValue:'',
            requestNameArr:[],

            selectedEmployee:'',
            selectedEmpId:'',
            isModalVisible:false,
            startDate: '',
            startServerDate: '',
            endDate: '',
            endServerDate: '',
            startTime: '',
            startServerTime: '',
            endTime: '',
            endServerTime: '',
            empComment: '',
            reasonValue: '',
            reasonKey: '',
            defaultTimeStatus:false,
            commentMandatory:false,
            showEmpPicker:false,
        }
    }

    componentDidMount() {
  
        KeyStore.getKey('authDict', (err, value) => {
          if (value) {
            this.setState({ authDict: value })
             this.getTeamOnDutyRequestReq()
              // this.getOnDutyRequestName()
          }
        });
      }
      
      //WEB API

      async  getTeamOnDutyRequestReq() {

        this.setState({isLoading:true})
        var url = Constant.BASE_URL + Constant.GET_TEAM_ON_DUTY_REQUEST
        try {
          let response = await fetch(url, {
            method: 'GET',
            headers:  Constant.getHeader(this.state.authDict)
          }
          )
          let code = await response.status
          this.setState({isLoading:false})

          if (code == 200) {
           
            let responseJson = await response.json();
            
            let dataArr = []
            let dataArrPending = []

            console.log(responseJson)
         
            for(let i =0;i<responseJson.length;i++){

                let obj = responseJson[i]

                if(obj.onDutyRequestStatus != 'APPROVED'){
                
                  if(obj.onDutyRequestStatus == 'PENDING'){

                    dataArrPending.push(obj)
                  }else{
                    //dataArr.push(obj)

                  }
              }
            }
            dataArrPending.push(...dataArr)

            this.setState({teamOnDutyReqArr:dataArrPending,totalPendingRequest:dataArrPending.length,teamOnDutyDummyReqArr:dataArrPending})
            console.log(this.state.teamOnDutyReqArr)

        } else if(code==400){
          let responseJson = await response.json();
          this.refs.toast.show(responseJson.message,5000);
  
        }
        else if(code == 401 || code == 503){
  
          Utility.logoutOnError(this.state.authDict,this.props.navigation)
        }else{
  
          this.refs.toast.show('Something went wrong!');
  
        }
        } catch (error) {
          console.error(error);
        }
      }

      async  actionOnRequest(value,action) {

        this.setState({isLoading:true})
        var url = Constant.BASE_URL + Constant.ACTION_TEAM_ON_DUTY_REQUEST + action + '/' + this.state.dutyItemId
        let comment = value//action=='approve' ? (value == '' ? 'Approved' : value) : (value == '' ? 'Rejected' : value)

        var params = {comments:comment}

        try {
          let response = await fetch(url, {
            method: 'POST',
            body:JSON.stringify(params),
            headers:  Constant.getHeader(this.state.authDict)
          }
          )

          this.setState({isLoading:false})

          let code = await response.status

          if (code == 200 || code == 201) {
             
            let responseJson = await response.json();
            this.getTeamOnDutyRequestReq()
            console.log(responseJson)
        } else if(code==400){
          let responseJson = await response.json();
          this.refs.toast.show(responseJson.message,5000);
  
        }
        else if(code == 401 || code == 503){
  
          Utility.logoutOnError(this.state.authDict,this.props.navigation)
        }else{
  
          this.refs.toast.show('Something went wrong!');
  
        }
        } catch (error) {
          console.error(error);
        }
      }

      async  getOnDutyRequestName() {

        this.setState({ isLoading: true })
        var url = Constant.BASE_URL + Constant.ON_DUTY_RECORD
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
            let empArr = []
            responseJson.map((item,index)=>
           { 
             let name = item.firstName+item.lastName+'-'+item.empCode
           empArr.push(name)
          })
            this.setState({requestNameArr:empArr})
            console.log(responseJson)
          } else if (code == 400) {
            let responseJson = await response.json();
            Alert.alert(responseJson.message)

        Vibration.vibrate()
        
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
     this.state.searchEnable?
     <View style={{backgroundColor:'rgba(239,240,241,1.0)',height:60,width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

    <View style={{width:'90%',height:40,backgroundColor:'white',borderRadius:24,alignItems:'center',flexDirection:'row'}}>
  
  <TextInput  allowFontScaling={false}
    placeholder='Search'
    placeholderTextColor="#A9A9A9"
    style={{width:'82%',fontSize:13,fontFamily:Constant.MontserratMedium,color:'black',borderRadius:24,paddingLeft:16,paddingRight:40,paddingTop:14,paddingBottom:14}}
    autoFocus={true}
    value={this.state.searchValue}
    autoCorrect={false}
    onChangeText={(searchValue) => this.searchValue(searchValue)}
    returnKeyType="go" underlineColorAndroid="transparent"></TextInput>

<Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../images/searchGray.png')}></Image>

<TouchableOpacity style={{marginRight:10,marginLeft:8}} onPress = {()=>this.setState({teamOnDutyReqArr:this.state.teamOnDutyReqArr.reverse()})}> 
<Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../images/sort.png')}></Image>
</TouchableOpacity>
</View>

  </View>


     :<></>
 }           

  <Text allowFontScaling={false} style={{top:14,left:16,fontSize:17,fontWeight:'bold',color:'#A9A9A9'}}>Total Pending Requests: {this.state.totalPendingRequest}
    </Text>

                {
                    this.state.teamOnDutyReqArr.length != 0   ? 
            <FlatList style={{marginTop:30}}
            data={this.state.teamOnDutyReqArr}
            showsVerticalScrollIndicator={false}

            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item, index }) => this.renderList(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
           
                :
                            <Text allowFontScaling={false} style={{fontSize:20,fontWeight:'bold',color:'#A9A9A9',alignSelf:'center',marginVertical:Dimensions.get('window').height/3}}> No Data Found
                                
                                 </Text>
                    }

      {/* <TouchableOpacity style={{
          alignSelf: 'flex-end', height: 60, width: 60, borderRadius: 30,
          justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 60, shadowOffset: { width: 0, height: 5, },
          shadowColor: 'gray',
          shadowOpacity: 3.0,
          elevation: 3, right: 20
        }} onPress={() => this.toggleModal()}>
          <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
        </TouchableOpacity> */}

       
         {/* Loader  Modal */}
         <Loader isLoader={this.state.isLoading}> </Loader> 


            <DialogInput isDialogVisible={this.state.approveCheck}
            title={"Confirmation"}
            message={'Are you sure you want to approve this request?'}
            hintInput ={"Leave a comment"}
            textInputProps={{autoCorrect:false}}       
            dialogStyle={{marginTop:-150}}

            submitInput={ (inputText) => {
                    if(inputText != ''){                    
                    this.setState({comments:inputText,approveCheck:false})
                    this.actionOnRequest(inputText,'approve')
                  }
                
                }}

            closeDialog={ () => {this.setState({approveCheck:false})}}>
          </DialogInput>

        <DialogInput isDialogVisible={this.state.rejectCheck}
            title={"Confirmation"}
            message={'Are you sure you want to reject this request?'}
            hintInput ={"Leave a comment"}
            textInputProps={{autoCorrect:false}}       
            dialogStyle={{marginTop:-150}}

            submitInput={ (inputText) => {
              if(inputText != ''){                    
                    this.setState({comments:inputText,rejectCheck:false})
                    this.actionOnRequest(inputText,'reject')      
                  }        
                }}

            closeDialog={ () => {this.setState({rejectCheck:false})}}>
          </DialogInput>
         
          {
          this.state.isView?
          <ViewItemDetail  viewDetail = {this.state.isView} title='View On Duty Request' keyArr={this.state.onDutyViewKeyArr} valueArr = {this.state.onDutyViewValueArr} cancelAction={()=>this.setState({isView:false})}>
          </ViewItemDetail>
            :null
          }

                  {/* //:- Modal Module With Pop Up */}

        <Modal
          visible={this.state.isModalVisible}
          transparent={true}

          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
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
                <Text allowFontScaling={false} style={{ paddingTop: 12, paddingLeft: 16, fontSize: 12, fontFamily: Constant.MontserratMedium }}>Select Employee</Text>

                  <TouchableOpacity style={{
                    marginTop: 10, flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center', width: '92%', height: 40, alignSelf: 'center', borderRadius: 20,
                    borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)'
                  }}

                    onPress={() => this.state.isEdit ? console.log('cant edit') : (Keyboard.dismiss(), this.setState({ showEmpPicker:true,showReasonPicker:false }))}>
                <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingLeft: 8 }}>{this.state.selectedEmployee}</Text>

                  <Image
                    source={require('../../images/downArrow.png')}
                    style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }} />

                  </TouchableOpacity>

                  

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


                  <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 12, paddingLeft: 16, marginTop: 10 }}>Comment</Text>
                  <View style={{ alignSelf: 'center', width: '90%', height: 80, top: 5, borderRadius: 10, borderWidth: 0.4, borderColor: 'rgba(205,203,251,1.0)', backgroundColor: 'rgba(226,230,248,1.0)' }}>

                    <TextInput allowFontScaling={false} numberOfLines={10}

                      style={{ height: '100%', width: '100%', fontFamily: Constant.MontserratMedium, fontSize: 12, color: 'gray', paddingTop: 8, paddingLeft: 8, textAlignVertical: 'top' }}
                      placeholder='Write..'

                      placeholderTextColor="#A9A9A9"
                      value={this.state.empComment}
                      multiline={true}
                      maxLength={200}
                      onChangeText={(empComment) => this.setState({ empComment: empComment })}
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
              showPicker={this.state.showReasonPicker || this.state.showEmpPicker}
              arr={this.showReasonPicker()}
              title="Select Reason"
              handleClose={() => this.setState({ showReasonPicker: false,showEmpPicker:false })}
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
  

     
       
        <Toast ref="toast"/>
            </View>
        );
    }


    renderList = (item, index) =>

    <View style={ item.status == "APPROVED" ?  styles.approvedCardView : item.status == "REJECTED" ?  styles.rejectCardView :  styles.pendingCardView  } key={index}>

    <View style={{flexDirection:'row',marginTop:12,marginLeft:12,alignItems:'center'}} >

    <Image style={{height:40,width:40,resizeMode:'contain',marginLeft:16}} source={   require('../../images/userGroup.png')}></Image>

    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratSemiBold,fontSize:13,padding:8,color:'black',marginTop:10,flex:1}}>{item.employeeName}</Text>
    
      <TouchableOpacity style={{marginRight:10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.viewAction(index)} >

      <Image style={{ width: 20, height: 20,resizeMode:'contain' }}
        source={require('../../images/viewGray.png')}
      />
    </TouchableOpacity>


    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:3,marginLeft:16}}>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'rgba(148,149,150,1.0)',paddingTop:16,paddingLeft:16}}>Start Date</Text>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black',paddingTop:4,paddingLeft:16}}>{Moment(item.startDate + ' 00:00:00').format('DD-MM-YYYY')}</Text>

    </View>
    <View style={{flex:3}}>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'rgba(148,149,150,1.0)',paddingTop:16,paddingLeft:16}}>End Date</Text>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black',paddingTop:4,paddingLeft:16}}>{Moment(item.endDate + ' 00:00:00').format('DD-MM-YYYY')}</Text>

    </View>
    <View style={{flex:3}}>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'rgba(148,149,150,1.0)',paddingTop:16,paddingLeft:16}}>Reason</Text>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black',paddingTop:4,paddingLeft:16}}>{item.empReason}</Text>

    </View>


    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:3,marginLeft:16}}>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'rgba(148,149,150,1.0)',paddingTop:16,paddingLeft:16}}>Start Timing </Text>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black',paddingTop:4,paddingLeft:16}}>{item.onDutyStartTiming}</Text>

    </View>
    <View style={{flex:3}}>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'rgba(148,149,150,1.0)',paddingTop:16,paddingLeft:16}}>End Timing</Text>
    <Text numberOfLines={2} allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black',paddingTop:4,paddingLeft:16}}>
   {item.onDutyStartTiming}
      </Text>

    </View>
    <View style={{flex:3}}>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'rgba(148,149,150,1.0)',paddingTop:16,paddingLeft:16}}>Status</Text>
    <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black',paddingTop:4,paddingLeft:16}}>{Utility.splitStatus( item.onDutyRequestStatus)}</Text>

    </View>
    </View>

{/* Submit Button*/}

<View style={{flexDirection:'row',justifyContent:'space-between'
,alignItems:'center',marginTop:5,borderRadius:8,width:Dimensions.get('window').width-40}}>


<TouchableOpacity style={[styles.rejectBtn]}
onPress={() => this.rejectAction(index)} >

<Image style={{ width: 20, height: 20, resizeMode: 'contain'}} source={require('../../images/reject.png')}></Image> 

<Text allowFontScaling={false} style={{color:'rgba(42,76,136,1.0)',textAlign:'center',fontSize:13,marginLeft:8}}>Reject</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.approveBtn} 
onPress={() => this.approveAction(index)} >

<Image style={{ width: 20, height: 20, resizeMode: 'contain'}} source={require('../../images/approved.png')}></Image> 
<Text allowFontScaling={false} style={{color:'rgba(42,76,136,1.0)',textAlign:'center',fontSize:13,marginLeft:8}}>Approve</Text>

</TouchableOpacity>

</View>

     </View>


        viewAction(index) {

        let obj = this.state.teamOnDutyReqArr[index]
        var keyArr = ['Employee Name', 'Start Date', 'End Date', 'Start Timing', 'End Timing', 'Reason', 'Status','Comment']
        var arr = []

        arr.push(Utility.splitStatus(obj.employeeName))
        arr.push(Moment(obj.startDate + ' 00:00:00').format('DD-MM-YYYY'))
        arr.push(Moment(obj.endDate).format('DD-MM-YYYY'))
        arr.push(obj.onDutyStartTiming)
        arr.push(obj.onDutyEndTiming)

        arr.push(obj.empReason)
        arr.push(Utility.splitStatus(obj.onDutyRequestStatus))
        arr.push(obj.comments)

        this.setState({ onDutyViewKeyArr: keyArr, onDutyViewValueArr: arr, isView: true })

        console.log()
      }


    approveAction(index){
        let obj = this.state.teamOnDutyReqArr[index]
        if((obj.onDutyRequestStatus == 'LEVEL1PENDING' && !obj.primaryAppCommentsMandatory) || (obj.onDutyRequestStatus == 'LEVEL2PENDING' && !obj.secondaryAppCommentsMandatory) ){
          Alert.alert(
            'Confirmation',
            'Are you sure you want to approve this request?',
            [
              {text: 'Cancel'},
              {text: 'OK', onPress: () => {
                this.setState({dutyItemId:obj.applicationId})
                this.actionOnRequest('','approve')
                }
              },
            ],
           
            {cancelable: false},
          );  
        }else{
        this.setState({approveCheck:true,dutyItemId:this.state.teamOnDutyReqArr[index].applicationId})
      }

    }

    rejectAction(index){
      let obj = this.state.teamOnDutyReqArr[index]
      if((obj.onDutyRequestStatus == 'LEVEL1PENDING' && !obj.primaryRejCommentsMandatory) || (obj.onDutyRequestStatus == 'LEVEL2PENDING' && !obj.secondaryAppCommentsMandatory) ){
        Alert.alert(
          'Confirmation',
          'Are you sure you want to reject this request?',
          [
            {text: 'Cancel'},
            {text: 'OK', onPress: () => {
              this.setState({dutyItemId:obj.applicationId})
              this.actionOnRequest('','reject')
              }
            },
          ],
         
          {cancelable: false},
        );  
      }else{

      this.setState({rejectCheck:true,dutyItemId:this.state.teamOnDutyReqArr[index].applicationId})
      }
  }
    showSearchBars(){

      this.setState({searchEnable:!this.state.searchEnable,searchValue:'',teamOnDutyReqArr:this.state.teamOnDutyDummyReqArr})

  }

  searchValue(value){

    var arr = []

    this.setState({searchValue: value })

    this.state.teamOnDutyDummyReqArr.map((item,index)=>
   {
    if(item.employeeName.toLowerCase().includes(value.toLowerCase())) {
      arr.push(item)
   }  
  }
  )
    this.setState({teamOnDutyReqArr:arr})
  }

//Add request for employee

showReasonPicker() {
  if(this.state.showEmpPicker){
    return this.state.requestNameArr
  }else{
    let arr = []
    this.state.reasonArr.map((item, index) => {
      arr.push(item.reason)
    })
    return arr
  }
}

  //PICKER ACTION 
  handleSubmit = (val, index) => {

    if(this.state.showEmpPicker){
      let emp = String(val).split('-')
      let empId = emp[1]
      this.setState({ selectedEmployee: val,showReasonPicker: false,showEmpPicker:false,selectedEmpId:empId })

      this.getReasons(empId)
      this.getTemplateSettings(empId)
      console.log(empId)
    }else{
      this.setState({ reasonValue: val, reasonId: this.state.reasonArr[index].onDutyReasonId, showReasonPicker: false })
    }
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

    // if(this.state.defaultTimeStatus)
    // {
    //   this.setState({
    //     endDate: ''
    //     , endServerDate: '', startDate: '', startServerDate: '', comment: '', reasonValue: '', reasonId: '',selectedEmpId:'',selectedEmployee:''
    //   })
  
    // }else{
      this.setState({
        startTime: '', startServerTime: '', endDate: ''
        , endServerDate: '', endTime: '', endServerTime: '', startDate: '', startServerDate: '', comment: '', reasonValue: '', reasonId: '',selectedEmpId:'',selectedEmployee:''
       })
  
    // }

    this.toggleModal()
  }

  toggleModal = () => {

    this.setState({ isModalVisible: !this.state.isModalVisible });

  };

  //Submit Action OF other empoyee Request
  onSubmit() {

    if(this.state.selectedEmployee == ''){
      Alert.alert('Please select employee.')
        Vibration.vibrate()
    }else
    if (this.state.startTime == '') {
      Alert.alert('Please select start time.')
        Vibration.vibrate()
    } else if (this.state.endTime == '') {
      Alert.alert('Please select end time.')
        Vibration.vibrate()
    } else if (this.state.startDate == '') {
      Alert.alert('Please select start date.')
        Vibration.vibrate()
    } else if (this.state.endDate == '') {
      Alert.alert('Please select end date.')
        Vibration.vibrate()
    } 
    else if(this.state.commentMandatory && this.state.empComment == ''){
      Alert.alert('Please enter comment.')
        Vibration.vibrate()
    }
    else {
      this.submitOnDutyRequest()
    }
  }


  //Emp Reason Array 
  async  getReasons(empId) {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GET_REASON_ON_DUTY + empId

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
        this.setState({ reasonArr: responseJson.onDutyReasonList })
        console.log(responseJson)

      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        Vibration.vibrate()
        //  this.refs.toasts.show('Something went wrong!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  async  getTemplateSettings(empId) {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GET_TEMPLATE_SETTINGS + empId

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
        this.setState({commentMandatory:responseJson.onDutyTemplate.commentMandatory})
         if(responseJson.onDutyTemplate.defaultShiftTimingStatus) {
          this.getShiftSettings(empId)
          this.setState({defaultTimeStatus:responseJson.onDutyTemplate.defaultShiftTimingStatus})
         }
        console.log(responseJson)

      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
        Vibration.vibrate()
      }
    } catch (error) {
      console.error(error);
    }
  }

  async  getShiftSettings(empId) {

    this.setState({ isLoading: true })
    var url = Constant.BASE_URL + Constant.GET_SHIFT_SETTINGS + empId

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
          if(responseJson.length != 0){
            let obj = responseJson[0]
            var startServerTime = obj.shiftStartTime
            var startTime = Utility.convertToUserDt(obj.shiftStartTime)  
            var endServerTime = obj.shiftEndTime
            var endTime = Utility.convertToUserDt(obj.shiftEndTime)
            this.setState({defaultTimeStatus:true,endServerTime:endServerTime,endTime:endTime,startTime:startTime,startServerTime:startServerTime})
          }
         
        console.log(responseJson)

      } else if (code == 400 || code == 404) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')
        Vibration.vibrate()
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
      "applicationId": "", "empReason": this.state.reasonId, "empCode": this.state.selectedEmpId, "onDutyStartTiming": this.state.startServerTime,
      "onDutyEndTiming": this.state.endServerTime, "startDate": this.state.startServerDate,
      "endDate": this.state.endServerDate, "comments": this.state.empComment
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
        this.getTeamOnDutyRequestReq()
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)
        Vibration.vibrate()
      }
      else if (code == 401 || code == 503) {

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        Vibration.vibrate()

      }
    } catch (error) {
      console.error(error);
    }
  }




}  