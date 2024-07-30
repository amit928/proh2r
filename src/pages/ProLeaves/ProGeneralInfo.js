//react components
import React from 'react';
import { View, StyleSheet, Alert, FlatList, ScrollView, Text, Dimensions, Vibration } from 'react-native';
//custom components
import Loader from '../../components/Loader';
import CircularItem from '../../components/CircularItem/CircularItem';
import TitleWithImage from '../../components/TitleWithImage/TitleWithImage';
//keyStore
import KeyStore from '../../Store/LocalKeyStore';
//Constant
import { COLORS, Constant } from '../../Constant/Index';
import { Shadow } from 'react-native-shadow-2';
import { Pages } from 'react-native-pages';
import LeaveSliderView from './LeaveSliderView';
import * as Utility from '../../Externel Constant/Utility';

const checkNull = (value, passValue) => {
  if (value == null || value == 'null') {
    return passValue;
  } else {
    return value;
  }
};

export default class ProGeneralInfo extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      supervisorArr: [],
      leaveArr: [],
      isLoading: false,
      authDict: {},
      holidayData: [],
      leaveSliderData: [],
      holidaySliderData: []
    };
  }

  componentDidMount() {
    KeyStore.getKey('authDict', (err, value) => {
      if (value) {

        console.log("componentDidMount", value);
        this.setState({ authDict: value });
        this.getSupervisors();
        this.getleaveSummary();
        this.getHolidayList();
      }
    });

    // KeyStore.getKey('authDictNewVar', (err, value) => {
    //   if (value) {

    //     console.log("authDictNewVar", value);
    //     this.setState({ authDict: value });
    //     this.getSupervisors();
    //     this.getleaveSummary();
    //     this.getHolidayList();
    //   }
    // });

  }

  //WEB API
  async getSupervisors() {
    var url =
      Constant.BASE_URL +
      Constant.LEAVE_ASSIGNMENT +
      this.state.authDict.employeeCode;
    this.setState({ isLoading: true });
    console.log("getSupervisorsUrl", url,this.state.authDict, Constant.getHeader(this.state.authDict));
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });
      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();
        let primary = checkNull(responseJson.primaryApprover, '');
        let secondory = checkNull(responseJson.secondaryApprover, '');
        let dataArr = [];

        if (primary != '') {
          let str = primary.split('-');
          let obj = {
            name: str[0],
            empCode: str[1],
            level: '1',
          };
          dataArr.push(obj);
        }
        if (secondory != '') {
          let str = secondory.split('-');
          let obj = {
            name: str[0],
            empCode: str[1],
            level: '2',
          };
          dataArr.push(obj);
        }
        this.setState({ supervisorArr: dataArr });
      } else {
        Alert.alert('Something went wrong!');
        Vibration.vibrate()
      }
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );

      Vibration.vibrate()
      console.error(error);
    }
  }

  async getleaveSummary() {
    var url =
      Constant.BASE_URL +
      Constant.LEAVE +
      this.state.authDict.employeeCode +
      '/leavescore';
    this.setState({ isLoading: true });

    console.log("getleaveSummary", url, Constant.getHeader(this.state.authDict));

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });

      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();
        var arr = responseJson.LeaveScore;
        var dataArr = [];
        console.log(responseJson);
        console.log('leaveArr', arr);

        let tempLeaveSliderData = [];

        if (arr.length != 0) {



          const chunkSize = 3;
          for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            // console.log(chunk)

            tempLeaveSliderData.push(chunk);



          }

          console.log('templeaveSliderData', tempLeaveSliderData);

        }



        // this.setState({ leaveArr: arr, leaveSliderData: tempLeaveSliderData });
        this.setState({ leaveSliderData: tempLeaveSliderData });

      } else {
        Alert.alert('Something went wrong!');
      }
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  async getHolidayList() {

    console.log('getHolidayList');
    var url =
      Constant.BASE_URL +
      'organization/holiday/' + new Date().getFullYear() + '/' + this.state.authDict.employeeCode;

    console.log('getHolidayList URL', url);
    this.setState({ isLoading: true });
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict),
      });
      let code = await response.status;
      this.setState({ isLoading: false });

      if (code == 200) {
        let responseJson = await response.json();
        console.log('getHolidayList Data', responseJson);



        let tempHolidaySliderData = [];

        if (responseJson.length != 0) {



          const chunkSize = 8;
          for (let i = 0; i < responseJson.length; i += chunkSize) {
            const chunk = responseJson.slice(i, i + chunkSize);
            // console.log(chunk)

            tempHolidaySliderData.push(chunk);



          }

          console.log('tempHolidaySliderData', tempHolidaySliderData);

        }





        this.setState({ holidayData: responseJson, holidaySliderData: tempHolidaySliderData })

      } else {
        Alert.alert('Something went wrong!');
      }
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert(
        'Internet connection appears to be offline. Please check your internet connection and try again.',
      );
      Vibration.vibrate()
      console.error(error);
    }
  }

  //UI
  render() {

    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const WINDOW_WIDTH = Dimensions.get('window').width;
    const textFontSize = ((WINDOW_WIDTH / 6) / 6.7) + 1

    console.log('WINDOW_WIDTH', WINDOW_WIDTH);

    if (this.state.holidaySliderData.length < 2) {
      console.log('holidaySliderData.length',  'Yes')
    }

    else console.log('holidaySliderData.length',  'No')

    return (
      <>
        <View style={styles.container}>






          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // paddingBottom: 50,
            }}>
            <View style={{ height: 2 }} />
            <View style={{ padding: 20, paddingBottom: 0, paddingTop: 0 }}>

              <View style={[styles.cardView, { borderRadius: WINDOW_WIDTH / 16.5, overflow: 'hidden' }]}>
                <TitleWithImage styleObj={{ marginBottom: 10 }}
                  TItle="Supervisor"
                  ImageSource={require('../../images/supervisor.png')}
                  styleImage={{}}
                />
                <FlatList horizontal style={{ alignSelf: 'center' }}
                  data={this.state.supervisorArr}
                  renderItem={({ item, index }) => {
                    return (
                      <CircularItem
                        key={item.name}
                        Name={item.name}
                        Value={item.level}
                      />
                    );
                  }}
                  keyExtractor={item => item.name}
                />
              </View>


              <View style={{ height: 20 }} />

              <View style={{ backgroundColor: 'white', borderRadius: WINDOW_WIDTH / 16.5, overflow: 'hidden'}}>
                <TitleWithImage styleObj={{ marginBottom: 10 }}
                  TItle="Leave Balance"
                  ImageSource={require('../../images/Leaveimg.png')}
                />
                <LeaveSliderView leaveSliderData={this.state.leaveSliderData} />
              </View>

              {/* Total Leave Card View*/}
              {/* <Shadow distance={2} containerViewStyle={{
              zIndex: 1,
              //  alignItems: 'center',
              // borderWidth: 1,
              // borderColor: 'red'
              // marginVertical: 20
              // borderRadius: 12,
            }}

              // radius={12}
              // offset={[20, 20]}
              startColor='#e6e6e6'
            // finalColor='#9b9aed' 
            // corners={'bottomRight'}
            >
              <View style={styles.cardView}>
                <TitleWithImage
                  TItle="Total Leaves"
                  ImageSource={require('../../images/leave.png')}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {this.state.leaveArr.map((item, index) => {
                    return (
                      <CircularItem
                        key={item.name}
                        Name={item.name}
                        Value={String(item.count + " / " + item.total)}
                      />
                    );
                  })}
                </View>

              </View>
            </Shadow>
            */}




              {/* Leave Card View*/}

              {/* <View style={styles.cardView}>
              <TitleWithImage
                TItle="Supervisor"
                ImageSource={require('../../images/supervisorGirl.png')}
              />
              <FlatList
                data={this.state.supervisorArr}
                renderItem={({ item, index }) => {
                  return (
                    <CircularItem
                      key={item.name}
                      Name={item.name}
                      Value={item.level}
                    />
                  );
                }}
                keyExtractor={item => item.name}
              />
            </View> */}


              <View style={{ height: 30 }} />

            </View>

            <View style={{ paddingLeft: 20 }}>
              <Text  allowFontScaling={false}   style={{
                fontFamily: Constant.MontserratSemiBold,
                fontSize: 18,
                // paddingLeft: 4,
                color: 'black',
                marginBottom: 20,
              }}>{"Holidays List, " + new Date().getFullYear() + '-' + parseInt(new Date().getFullYear() + 1)}</Text>

              <ScrollView nestedScrollEnabled={true} horizontal showsHorizontalScrollIndicator={false} >

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>

                  {this.state.holidaySliderData.map((holidayList, index) => {

                    return (

                      <View key={String(index)} style={{ backgroundColor: 'white', width: this.state.holidaySliderData.length < 2 ? (WINDOW_WIDTH / 1.106951) : (WINDOW_WIDTH / 1.21), borderRadius: WINDOW_WIDTH / 16.5, marginRight: 18 }}>



                        <View style={{ flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20, width: '100%', alignItems: 'center', justifyContent: 'space-between', }}>
                          <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: textFontSize, width: '33.33%' }}>Date</Text>
                          <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: textFontSize, width: '33.33%', textAlign: 'center' }}>Occasion</Text>
                          <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: textFontSize, width: '33.33%', textAlign: 'right' }}>Type</Text>
                        </View>

                        {holidayList?.map(((item, index) => {

                          const holidayDate = Utility.convertToDDMMYYYY(item.date)

                          return (


                            <View key={String(index)} style={{ paddingHorizontal: 18 }}>
                              <View  style={{ flexDirection: 'row', paddingHorizontal: 2, paddingVertical: 12, width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: '#ccc' }}>
                                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: textFontSize, color: '#7D7D7D', width: '33.33%' }}>{holidayDate}</Text>
                                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: textFontSize, color: '#7D7D7D', width: '33.33%', textAlign: 'center' }}>{item.assignedHoliday}</Text>
                                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: textFontSize, color: '#7D7D7D', width: '33.33%', textAlign: 'right' }}>{item.type}</Text>
                              </View>
                            </View>

                          );

                        }))}



                      </View>

                    );

                  })}

                </View>

              </ScrollView>

            </View>

            {/* <View style={{ height: 50 }} /> */}

            {/* Holidays */}

            {/* <Text  allowFontScaling={false}  allowFontScaling={false} style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 18,
              paddingLeft: 4,
              color: 'black',
              marginBottom: 20
            }}>{"  Holidays List, " + new Date().getFullYear() + '-' + parseInt(new Date().getFullYear() + 1)}</Text> */}


            {/* <View onLayout={(event) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              console.log('width, height', width, height)

            }} style={{ alignSelf: 'center', backgroundColor: 'white', width: '100%', borderRadius: WINDOW_WIDTH / 16.5 }}> */}

            {/* <TitleWithImage styleObj={{ marginBottom: 10 }}
                TItle={"  Holidays List, " + new Date().getFullYear() + '-' + parseInt(new Date().getFullYear()+1)}
                ImageSource={require('../../images/holiday.png')}
              /> */}

            {/* <View style={{ flexDirection: 'row', padding: 15, width: '100%', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: textFontSize, width: '33.33%' }}>Date</Text>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: textFontSize, width: '33.33%', textAlign: 'center' }}>Occasion</Text>
                <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratSemiBold, fontSize: textFontSize, width: '33.33%', textAlign: 'right' }}>Type</Text>
              </View>

              {this.state.holidayData.map(((item, index) => {

                return (

                  <View key={String(index)} style={{ flexDirection: 'row', padding: 12, width: '100%', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: textFontSize, color: '#7D7D7D', width: '33.33%' }}>{item.date}</Text>
                    <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: textFontSize, color: '#7D7D7D', width: '33.33%', textAlign: 'center' }}>{item.assignedHoliday}</Text>
                    <Text  allowFontScaling={false}  style={{ fontFamily: Constant.MontserratRegular, fontSize: textFontSize, color: '#7D7D7D', width: '33.33%', textAlign: 'right' }}>{item.type}</Text>
                  </View>

                );

              }))}



            </View> */}

          </ScrollView>


          <View style={{ height: 30 }} />

        </View>
        <Loader isLoader={this.state.isLoading} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: COLORS.FormBGColor
    // alignItems: 'center',
  },
  cardView: {
    // alignItems: 'center',
    // padding: 10,
    backgroundColor: 'white',
    // marginTop: 16,
    // shadowColor: 'grey',
    // shadowOffset: { width: 0.5, height: 0.5 },
    // shadowOpacity: 0.39,
    // shadowRadius: 8.3,
    // elevation: 3,
    borderRadius: 25
  },
});
