import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Modal,
  TextInput,
  Linking,
  Platform,
  FlatList,
} from 'react-native';
import { Icon } from 'native-base';

import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import Loader from '../../components/Loader';
import Nav from '../../components/NavBar';
import Toast, { DURATION } from 'react-native-easy-toast';
import ProfileDetail from '../Profile/ProfileDetail';

import * as Utility from '../..//Externel Constant/Utility';

import Moment from 'moment';
import CancelBtnWide from '../../components/CancelBtnWide';
import DisplayCountBar from '../../components/DisplayCountBar';
import ImageView from "react-native-image-viewing";
import { COLORS } from '../../Constant/Index';

const styles = StyleSheet.create({});

export default class EmployeeDirectly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loading: false,
      directoryArr: [],
      directoryDummyArr: [],
      searchValue: '',
      authDict: {},
      totalEmp: 0,
      visible: false,
      isLoading: false
    };
    this.images = []
  }

  componentDidMount() {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value });

        this.fetchEmployeeUser();
      }
    });
  }


  searchValue(value) {
    var arr = [];

    this.setState({ searchValue: value });

    this.state.directoryDummyArr.map((item, index) => {
      if (
        item.empName.toLowerCase().includes(value.toLowerCase()) ||
        item.empEmail.toLowerCase().includes(value.toLowerCase()) ||
        item.empMobileNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.position.toLowerCase().includes(value.toLowerCase())
      ) {
        arr.push(item);
      }
    });
    this.setState({ directoryArr: arr });
  }

  isImageNotPresent(item) {

    if (item.empProfilePhoto == '' ||
      item.empProfilePhoto == 'null' ||
      item.empProfilePhoto == null ||
      item.empProfilePhoto ==
      'https://s3.ap-south-1.amazonaws.com/proh2r/' ||
      item.docId == null) {

      return true

    }

    else {
      return false
    }

  }

  render() {
    const { goBack } = this.props.navigation;
    const { isBackhidden } = this.props;
    console.log('isBackhidden', isBackhidden);


    return (
      <View style={{ flex: 1, backgroundColor: 
        COLORS.FormBGColor
      // 'rgba(239,240,241,1.0)' 
      }}>

        {isBackhidden ?
          <Nav
            backHidden={true}
            backAction={() => goBack()}
            title="Organization"
            isRightBtn={false}
            rightImg={require('../../images/filter.png')}></Nav>

          :
          <Nav
            // backHidden={true}
            backAction={() => goBack()}
            title="Organization"
            isRightBtn={false}
            rightImg={require('../../images/filter.png')}></Nav>
        }

        {/* <Nav
          // backHidden={true}
          backAction={() => goBack()}
          title="Organization"
          isRightBtn={false}
          rightImg={require('../../images/filter.png')}></Nav> */}


        <View
          style={{
            backgroundColor: 
            COLORS.FormBGColor
            // 'rgba(239,240,241,1.0)'
            ,
            height: 60,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>



          <View
            style={{
              width: '90%',
              height: 40,
              backgroundColor: 'white',
              borderRadius: 24,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TextInput
              allowFontScaling={false}
              placeholder="Search"
              placeholderTextColor="#A9A9A9"
              style={{
                width: '90%',
                fontSize: 12,
                fontFamily: Constant.MontserratRegular,
                color: 'black',
                borderRadius: 24,
                paddingLeft: 16,
                // paddingRight: 40,
                // paddingTop: 14,
                // paddingBottom: 14,
                padding: 0
              }}
              value={this.state.searchValue}
              onChangeText={searchValue => this.searchValue(searchValue)}
              returnKeyType="go"
              underlineColorAndroid="transparent"></TextInput>

            <Image
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
              source={require('../../images/searchGray.png')}></Image>
          </View>
        </View>

        {/* <ScrollView style={{ width: '100%',marginBottom:8,marginTop:8 }} showsVerticalScrollIndicator={false}>
        {
          this.state.directoryArr.map((item,index)=>
           
           <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('ProfileDetail',{obj:item})}>
          
            <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
         
              <View style={{borderRadius:37.5,borderWidth:0.5,borderColor:'gray',marginLeft:10,width:76,height:76,justifyContent:'center',alignItems:'center',
             }}>
                <Image style={{height:75,width:75,borderRadius:37.5,resizeMode:'cover'}} source={(item.empProfilePhoto == "" || item.empProfilePhoto == 'null'
                 || item.empProfilePhoto == null || item.empProfilePhoto == 'https://s3.ap-south-1.amazonaws.com/proh2r/' || item.docId == null)  ? require('../../images/user.jpeg')  
                :  {uri:item.empProfilePhoto}}></Image>
              </View>
            <View style={{flex:1,height:'100%'}}>
             <Text allowFontScaling={false} style={{padding:16,fontFamily:Constant.MontserratMedium,fontSize:15,color:'black'}}>{item.empFirstName}{item.empMiddleName} {item.empLastName}</Text> 
            
            <View style={{flexDirection:'row'}}>
             <Text allowFontScaling={false} style={{paddingLeft:16,fontFamily:Constant.MontserratRegular,fontSize:11,color:'gray'}}>Email: </Text> 
             <Text allowFontScaling={false} style={{flex: 1, flexWrap: 'wrap',paddingRight:20,fontFamily:Constant.MontserratRegular,fontSize:11,color:'black'}}>{item.empEmail}</Text> 

            </View>

            <View style={{flexDirection:'row',marginTop:4}}>
             <Text allowFontScaling={false} style={{paddingLeft:16,fontFamily:Constant.MontserratRegular,fontSize:11,color:'gray'}}>Designation: </Text> 
             <Text allowFontScaling={false} style={{flex: 1, flexWrap: 'wrap',paddingRight:16,fontFamily:Constant.MontserratRegular,fontSize:11,color:'black'}} numberOfLines={2}>{item.position}</Text> 
             </View>

             <View style={{flexDirection:'row',marginTop:4}}>
             <Text allowFontScaling={false} style={{paddingLeft:16,fontFamily:Constant.MontserratRegular,fontSize:11,color:'gray'}}>Contact: </Text> 
             <Text allowFontScaling={false} style={{fontFamily:Constant.MontserratRegular,fontSize:11,color:'black'}} >{item.empMobileNumber}</Text> 
            </View>
            </View>
          
            </View>

            <View style={{alignSelf:'center',height:1,backgroundColor:'rgba(241,242,243,1.0)',width:'80%',marginTop:8}}></View>
            <Image style={{position:'absolute',height:15,width:15,resizeMode:'contain',right:10,top:50}} source={require('../../images/right-arrow.png')}></Image>
            </TouchableOpacity>
          )
        }

        </ScrollView> */}

        <DisplayCountBar topMargin={false} title={"Total Employees: "} total={this.state.totalEmp} />

        <FlatList
          data={this.state.directoryArr}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />

        <Loader isLoader={this.state.isLoading}> </Loader>

        <ImageView
          images={this.images}
          imageIndex={0}
          visible={this.state.visible}
          onRequestClose={() => {

            this.images.pop()


            // console.log('higfyfsyuddguygjds');
            this.setState({ visible: false })
          }}
        />

      </View>
    );
  }

  renderItem = (item, index) => (
    <TouchableOpacity
      style={{ paddingVertical: 12, }}

      key={index}
      onPress={() =>
        this.props.navigation.navigate('ProfileDetail', { obj: item })
      }>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={this.isImageNotPresent(item) ? 1 : 0}

          onPress={() => {

            if (this.isImageNotPresent(item)) {

              console.log('Image Not Found !');



            }

            else {

              console.log('Showing Image !');

              this.images.push({ uri: item.empProfilePhoto })

              this.setState({ visible: true })

            }



          }}

          style={{
            borderRadius: 37.5,
            // borderWidth: 0.5,
            borderColor: 'gray',
            marginLeft: 10,
            width: 76,
            height: 76,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 75,
              width: 75,
              borderRadius: 37.5,
              resizeMode: 'cover',
            }}
            source={
              this.isImageNotPresent(item)
                ? require('../../images/user.jpeg')
                : { uri: item.empProfilePhoto }
            }></Image>
        </TouchableOpacity>
        <View style={{ flex: 1, height: '100%', marginTop: 15 }}>
          <Text
            allowFontScaling={false}
            style={{
              paddingHorizontal: 16,
              // padding: 16,
              fontFamily: Constant.MontserratMedium,
              fontSize: 15,
              color: 'black',
              fontWeight: '600'
            }}>
            {item.empFirstName}
            {item.empMiddleName} {item.empLastName}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              paddingHorizontal: 16,
              // padding: 16,
              fontFamily: Constant.MontserratMedium,
              fontSize: 14,
              color: 'black',
            }}>
            {item.position}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              paddingHorizontal: 16,
              // padding: 16,
              fontFamily: Constant.MontserratMedium,
              fontSize: 14,
              color: 'black',
            }}>
            {item?.empId}
          </Text>


          {/* <View style={{ flexDirection: 'row' }}>
            <Text
              allowFontScaling={false}
              style={{
                paddingLeft: 16,
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'gray',
              }}>
              Email:{' '}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                flex: 1,
                flexWrap: 'wrap',
                paddingRight: 20,
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
              }}>
              {item.empEmail}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              allowFontScaling={false}
              style={{
                paddingLeft: 16,
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'gray',
              }}>
              Designation:{' '}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                flex: 1,
                flexWrap: 'wrap',
                paddingRight: 16,
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
              }}
              numberOfLines={2}>
              {item.position}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text
              allowFontScaling={false}
              style={{
                paddingLeft: 16,
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'gray',
              }}>
              Contact:{' '}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratRegular,
                fontSize: 11,
                color: 'black',
              }}>
              {item.empMobileNumber}
            </Text>
          </View> */}
        </View>
      </View>

      {/* <View style={{alignSelf:'center',height:1,backgroundColor:'rgba(241,242,243,1.0)',width:'80%',marginTop:8}}></View> */}
      <Image
        style={{
          position: 'absolute',
          height: 15,
          width: 15,
          resizeMode: 'contain',
          right: 10,
          top: 45,
        }}
        source={require('../../images/right-arrow.png')}></Image>
        <View style={{borderWidth: 0.7, borderColor: '#dcdbdc', top: 12}}/>
    </TouchableOpacity>
  );

  async fetchEmployeeUser() {
    var url = Constant.BASE_URL + Constant.FETCH_EMPLOYEE;
    this.setState({ isLoading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',

        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responsejson = await response.json();
        console.log('Employees Array', responsejson)
        var arr = [];

        for (let i = 0; i < responsejson.length; i++) {
          var obj = responsejson[i];

          var fNm = responsejson[i].empFirstName;
          var mNm = responsejson[i].empMiddleName;
          var lNm = responsejson[i].empLastName;
          var name = '';

          if (fNm == null || fNm == 'null') {
            fNm = '';
          }
          if (mNm == null || mNm == 'null') {
            mNm = '';
          }
          if (lNm == null || lNm == 'null') {
            lNm = '';
          }

          //  var obj =  {
          obj.empName = fNm + mNm + ' ' + lNm;

          obj.empId = responsejson[i].empCode;
          obj.empLocation = responsejson[i].empJobInfoLocation;

          obj.empDepartment = responsejson[i].empJobInfoDepartment;
          obj.empEmail = responsejson[i].empEmail;
          obj.empMobileNumber = Utility.checkNull(responsejson[i].empMobileNo);
          obj.empProfilePhoto =
            'https://s3.ap-south-1.amazonaws.com/proh2r/' +
            responsejson[i].docId;
          obj.position = Utility.checkNull(
            responsejson[i].empJobInfoDesignation,
          );
          obj.docId = responsejson[i].docId;
          if (obj.empDOB != '' && obj.empDOB != null) {
            obj.empDOB = Moment(obj.empDOB).format('DD-MM-YYYY');
          }

          arr.push(obj);
        }
        this.setState({ directoryArr: arr, directoryDummyArr: arr, totalEmp: arr.length });
      } else if (code == 400) {
        let responseJson = await response.json();
        this.refs.toast.show(responseJson.message);
      } else if (code == 401 || code == 503) {
        Utility.logoutOnError(this.state.authDict, this.props.navigation);
      } else {
        this.refs.toast.show('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  employeeCall(index) {
    Alert.alert(
      'Contact to ' + this.state.directoryArr[index].empName,
      'Do you want to make phone call to ' +
      this.state.directoryArr[index].empName,
      [
        { text: 'Cancel' },

        {
          text: 'OK',
          onPress: () => {
            if (Platform.OS !== 'android') {
              phoneNumber = `telprompt:${this.state.directoryArr[index].empMobileNumber}`;
            } else {
              phoneNumber = `tel:${this.state.directoryArr[index].empMobileNumber}`;
            }
            Linking.canOpenURL(phoneNumber)
              .then(supported => {
                if (!supported) {
                  Alert.alert('Phone number is not available');
                } else {
                  return Linking.openURL(phoneNumber);
                }
              })
              .catch(err => console.log(err));
          },
        },
      ],

      { cancelable: false },
    );
  }

  sendEmail(index) {
    Utility.sendEmailViaEmailApp(this.state.directoryArr[index].empEmail);
  }
}
