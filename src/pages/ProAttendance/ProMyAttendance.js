import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Picker,
  Alert,
  ImageBackground,
  FlatList,
} from 'react-native';
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
import MyAttandanceOverView from './MyAttandanceOverView';
import AttandanceRecord from './AttandanceRecord';
import AttandanceView from './AttandanceView';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.FormBGColor,
    height: '100%',
    width: '100%',
  },

  cardView: {
    height: 160,
    width: '90%',
    backgroundColor: 'white',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    borderRadius: 12,
    alignSelf: 'center',
  },
});

const checkNull = (value, passValue) => {
  if (value == null || value == 'null') {
    return passValue;
  } else {
    return value;
  }
};

export default class ProAttendance extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true,
  };
  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      isDateTimePickerPopUpVisible: false,
      date: 'Select Date',
      popUpSelectDate: 'Select Date',
      daysPresent: '',
      daysAbsent: '',
      leaveTaken: '',
      weaklyOff: '',
      holidays: '',
      totalHours: '',
      isModalVisible: false,
      monthArr: [],
      showPicker: false,
      month: '',
      attendanceArr: [],
      isLoading: false,
      date: '',
    };
  }

  componentDidMount() { }

  render() {
    const { present, absent, leaveTaken,
      weaklyOff, holiday, hours, afterProcessingOverViewData, attendanceRecordsOnDayVOList, navigation, setIsFromMyAttandance, setRegData, monthYearData, isLoading,
      setisLoading } = this.props;
    return (
      <View style={styles.container}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <ScrollView contentContainerStyle={{  alignItems: 'center' }}>

          <AttandanceView navigation={navigation} {...this.props} setIsFromMyAttandance={setIsFromMyAttandance} setRegData={setRegData} monthYearData={monthYearData} isLoading = {isLoading} setisLoading = {setisLoading}/>

          {/* 
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                marginLeft: 12,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  marginLeft: 16,
                }}
                source={require('../../images/attendanceMonthlyRecord.png')}></Image>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 15,
                  padding: 8,
                  color: 'black',
                  flex: 1,
                }}>
                Monthly Record
              </Text>
            </View>

            <View style={{ flexDirection: 'row', height: 50 }}>
              <View style={{ flex: 2, marginLeft: 16 }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 12,
                    color: 'rgba(148,149,150,1.0)',
                    paddingTop: 16,
                    paddingLeft: 16,
                  }}>
                  Days Present
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 12,
                    color: 'black',
                    paddingTop: 4,
                    paddingLeft: 16,
                  }}>
                  {present}
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 12,
                    color: 'rgba(148,149,150,1.0)',
                    paddingTop: 16,
                    paddingLeft: 16,
                  }}>
                  Days Absent
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 12,
                    color: 'black',
                    paddingTop: 4,
                    paddingLeft: 16,
                  }}>
                  {absent}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', height: 50 }}>
              <View style={{ flex: 2, marginLeft: 16 }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 11,
                    color: 'rgba(148,149,150,1.0)',
                    paddingTop: 16,
                    paddingLeft: 16,
                  }}>
                  Holidays
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 11,
                    color: 'black',
                    paddingTop: 4,
                    paddingLeft: 16,
                  }}>
                  {holiday}
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 11,
                    color: 'rgba(148,149,150,1.0)',
                    paddingTop: 16,
                    paddingLeft: 16,
                  }}>
                  Total Hours
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratRegular,
                    fontSize: 11,
                    color: 'black',
                    paddingTop: 4,
                    paddingLeft: 16,
                  }}>
                  {hours}
                </Text>
              </View>
            </View>
          </View> */}

          {/* <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratSemiBold,
              fontSize: 15,
              color: 'black',
              paddingTop: 16,
              paddingLeft: 24,
              paddingBottom: 16,
            }}>
            Attendance Record
          </Text> */}
          {/* </ScrollView> */}

          {/* <View style={{wid}}> */}
          {/* <FlatList style={{ backgroundColor: 'white', borderRadius: 10, width: '90%', alignSelf: 'center', marginBottom: 14 }}
            data={this.props.arr}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          {/* </View> */}
          <View style={{ marginTop: 20, }} />
        </ScrollView>
      </View>

    );
  }

  renderItem = (item, index) => (
    <View
      key={index}
      style={{
        marginTop: 8,
        width: '90%',
        alignSelf: 'center',
        height: 100,
        shadowColor: 'rgba(185,185,185,1.0)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 3,
      }}>
      <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
        <View style={{ flex: 3, height: '100%' }}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'rgba(148,149,150,1.0)',
              paddingLeft: 16,
              paddingTop: 6,
            }}>
            Date
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'black',
              paddingLeft: 16,
              paddingTop: 8,
            }}>
            {item.date}
          </Text>
        </View>
        <View style={{ flex: 3, height: '100%' }}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'rgba(148,149,150,1.0)',
              paddingLeft: 16,
              paddingTop: 6,
            }}>
            Total Hours
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'black',
              paddingLeft: 16,
              paddingTop: 8,
            }}>
            {item.hours}
          </Text>
        </View>
        <View style={{ flex: 3, height: '100%' }}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'rgba(148,149,150,1.0)',
              paddingLeft: 16,
              paddingTop: 6,
            }}>
            Status
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'black',
              paddingLeft: 16,
              paddingTop: 8,
            }}
            numberOfLines={1}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
        <View style={{ flex: 3, height: '100%' }}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'rgba(148,149,150,1.0)',
              paddingLeft: 16,
            }}>
            Check-In
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'black',
              paddingLeft: 16,
              paddingTop: 8,
            }}>
            {item.checkIn}
          </Text>
        </View>
        <View style={{ flex: 3, height: '100%' }}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'rgba(148,149,150,1.0)',
              paddingLeft: 16,
            }}>
            Check-Out
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'black',
              paddingLeft: 16,
              paddingTop: 8,
            }}>
            {item.checkOut}
          </Text>
        </View>
        <View style={{ flex: 3, height: '100%' }}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'rgba(148,149,150,1.0)',
              paddingLeft: 16,
            }}>
            Shift Timing
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: Constant.MontserratRegular,
              fontSize: 11,
              color: 'black',
              paddingLeft: 16,
              paddingTop: 8,
            }}>
            {item.shiftTiming}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
          height: 1,
          backgroundColor: 'rgba(241,242,243,1.0)',
          width: '90%',
        }}></View>
    </View>
  );
}
