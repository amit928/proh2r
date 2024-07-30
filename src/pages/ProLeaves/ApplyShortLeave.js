import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    Dimensions,
    TextInput,
    Alert,
    Keyboard,
    Picker,
    Modal,
    Vibration
} from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import { Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';
import Nav from '../../components/NavBar';
import Loader from '../../components/Loader';
import CustomPicker from '../../components/CustomPicker';

import ImagePicker from 'react-native-image-crop-picker';
import { Shadow } from 'react-native-shadow-2';
// import * as ImagePicker from 'react-native-image-picker';
//server
import axios from 'axios';
import { COLORS } from '../../Constant/Index';
import SubmitBtn from '../../components/SubmitBtn';
import PillsDropDown from '../../components/PillsDropDown';
import CancelBtn from '../../components/CancelBtn';
import SubmitBtnWide from '../../components/SubmitBtnWide';
import CustomTextField from '../../components/CustomTextField';
import * as Utility from '../../Externel Constant/Utility';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.FormBGColor,
        height: '100%',
        width: '100%',
    },

    navView: {
        height: 80,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
    },

    backBtn: {
        height: '80%',
        width: '80%',
        resizeMode: 'contain',
        top: 20,
    },

    viewShadow: {
        shadowColor: 'grey',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1,
        },
    },
});

export default class ApplyShortLeave extends React.Component {
    static navigationOptions = {
        gesturesEnabled: false,
        disableGestures: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            navTitle: 'Apply Short Leave',
            authDict: {},
            isLoading: false,
            date: 'Date',
            startTime: 'Start Time',
            endTime: 'End Time',
            totalDuration: 0,
            reason: '',
            datePicker: false,
            startTimePicker: false,
            endTimePicker: false,
            dateForFormatting: null
        };
    }

    componentDidMount() {

        console.log('props', this.props);


        KeyStore.getKey('authDict', (err, value) => {
            if (value) {
                this.setState({ authDict: value });

            }
        });

        if (this.props.route.params.fromMyAttandance == true) {
            console.log('fromMyAttandance');

            // console.log(this.props.route.params.pickedServerDt
            //   );

            this.setState({
                startFormatedDate: String(this.props.route.params.pickedServerDt),
                startDate: String(this.props.route.params.pickedDt),
                endDate: 'End Date',
                halfDayDate: 'Select Half Day',
                yesCheck: false,
                halfDayArr: [],
            });

            this.setState({
                endFormatedDate: String(this.props.route.params.pickedServerDt),
                endDate: String(this.props.route.params.pickedDt),
                halfDayDate: 'Select Half Day',
                halfDayArr: [],
            });

        }

        else {
            console.log('fromMyAttandance not');
        }

    }

    componentWillUnmount() {
        // this.props.route.params.refreshList(false);
        // this.props.navigation.state.params.refreshList();
        if (typeof this.props.route.params.refreshList == 'function') {

            console.log(typeof this.props.route.params.refreshList, this.props.route.params.refreshList.isEdit);

            this.props.route.params.refreshList(false);

        }

        else {
            console.log(typeof this.props.route.params.refreshList, this.props.route.params.isEdit);
        }
    }

    showDatePicker = () => {
        this.setState({ datePicker: true })
    };

    showStartTimePicker = () => {
        this.setState({ startTimePicker: true })
    };

    showEndTimePicker = () => {
        this.setState({ endTimePicker: true })
    };

    hideDateTimePicker = () => {


        this.setState({
            datePicker: false,
            startTimePicker: false,
            endTimePicker: false
        })

    };

    timeToMilliseconds(time) {
        // Split the time string into hours and minutes
        const [hours, minutes] = time.split(':').map(Number);
      
        // Create a new Date object with the current date and the given hours and minutes
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
      
        // Get the milliseconds since January 1, 1970, 00:00:00 UTC
        return date.getTime();
      }

    onTimeChange(startTime, endTime) {

        console.log('before onTimeChange', startTime, endTime);
        if (startTime == '' || endTime == '') {

            console.log('onTimeChange return');
            return
        }

        if (startTime == 'Start Time' || endTime == 'End Time') {

            console.log('onTimeChange return');
            return
        }

        let compiledStartTime = Utility.fromDDMMYYYYHHmm_To_MMDDYYYYHmm(startTime,'-')
        let compiledEndTime = Utility.fromDDMMYYYYHHmm_To_MMDDYYYYHmm(endTime, '-')

        console.log('After onTimeChange', compiledStartTime, compiledEndTime);

        // const sT = new Date(compiledStartTime);
        // const eT = new Date(compiledEndTime);
        // let timeDiff = eT.getTime() - sT.getTime();
        // console.log('getTime Heelo', sT, eT);
        // console.log('getTime', eT.getTime(), sT.getTime());

        // New
        let timeDiff = this.timeToMilliseconds(compiledEndTime.split(' ')[1]) - this.timeToMilliseconds(compiledStartTime.split(' ')[1]);
        timeDiff = Math.round(timeDiff / (1000 * 60));

        console.log(timeDiff);

        if (timeDiff < 0) {
            Alert.alert("Duration cannot be less than 1 minutes")
            this.setState({
                totalDuration: 0, startTime: 'Start Time',
                endTime: 'End Time'
            })
            return
        }
        this.setState({ totalDuration: timeDiff })



    }

    handleDatePicked = (dt, picker) => {

        console.log('handleDatePicked', dt);
        this.hideDateTimePicker()

        // return 

        const momentDate = Moment(dt.toISOString());



        if (picker == 'datePicker') {
            let pickedDt = Moment(momentDate).format('DD-MM-YYYY');
            this.setState({ date: pickedDt, dateForFormatting: dt })
        }

        else {
            let pickedDt = Moment(momentDate).format('DD-MM-YYYY HH:mm');
            if (picker == 'startTimePicker') {
                this.setState({ startTime: pickedDt })
                this.onTimeChange(pickedDt, this.state.endTime)
            }
            else {
                this.setState({ endTime: pickedDt })
                this.onTimeChange(this.state.startTime, pickedDt)
            }
        }

        this.hideDateTimePicker();
    };

    onSubmit = () => {
        Keyboard.dismiss();


        // date: 'Date',
        //     startTime: 'Start Time',
        //     endTime: 'End Time',
        //     totalDuration: 0,
        //     reason: '',

        if (this.state.date == 'Date') {
            Alert.alert('Please select "Date".');
            Vibration.vibrate()
        }
        else if (this.state.startTime == 'Start Time') {
            Alert.alert('Please select "Start Time".');
            Vibration.vibrate()
        }
        else if (this.state.endTime == 'End Time') {
            Alert.alert('Please select "End Time".');
            Vibration.vibrate()
        }
        else if (this.state.totalDuration == 0) {
            Alert.alert('Duration cannot be less than 1 minutes.');
            Vibration.vibrate()
        }
        else if (this.state.reason == '') {
            Alert.alert('Please add "Reason"');
            Vibration.vibrate()
        }
        else {

            this.ApplyShortLeave()

        }
    };



    async ApplyShortLeave() {
        this.setState({ isLoading: true });
        //starting function
        let url = Constant.BASE_URL + "short/leave/";
        const { goBack } = this.props.navigation;
        //2021-03-16#First_Half

        let payload = {
            "durationInMinutes": this.state.totalDuration,
            "empCode": this?.state?.authDict.employeeCode,
            "endTime": String(this.state.endTime),
            "reason": String(this.state.reason),
            "shortLeaveId": null,
            "slDate": String(this.state.date),
            "startTime": String(this.state.startTime),
            "status": null
        }
        console.log(payload);
        // return

        try {
            var requestOptions = {
                method: 'POST',
                headers: Constant.getHeader(this?.state?.authDict),
                body: JSON.stringify(payload),

            };
            let response = await fetch(url, requestOptions);
            console.warn('data', response);
            let code = response?.status;
            this.setState({ isLoading: false });

            if (code == 201 || code == 200) {
                let responseJson = await response?.json();
                console.log('ApplyShortLeave responseJson', responseJson)
                Alert.alert(
                    'Success',
                    responseJson.message,
                    [{
                        text: 'OK', onPress: () => {
                            goBack()
                            if (typeof this.props.route.params.refreshList == 'function') {

                                console.log(typeof this.props.route.params.refreshList, this.props.route.params.refreshList.isEdit);

                                this.props.route.params.refreshList(false);

                            }

                            else {
                                console.log(typeof this.props.route.params.refreshList, this.props.route.params.isEdit);
                            }
                        }
                    }],
                    { cancelable: false },
                );
                Vibration.vibrate()
            } else if (code == 400) {
                let responseJson = await response.json();
                console.warn('message', responseJson);
                Alert.alert(responseJson.message);
            } else if (code == 401 || code == 503) {
                Utility.logoutOnError(this.state.authDict, this.props.navigation);
            } else {
                this.refs.toast.show('Something went wrong!', code);
            }
        } catch (error) {
            Alert.alert(
                '',
                'Internet connection appears to be offline. Please check your internet connection and try again.',
            );
            Vibration.vibrate()
            this.setState({ isLoading: false });
            console.error(error);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { date,
            startTime,
            endTime,
            totalDuration,
            reason } = this.state

        // console.log('this?.state?.authDict', this?.state?.authDict);

        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                scrollEnabled={false}>
                <View style={styles.container}>
                    <Nav
                        backHidden={false}
                        title={this.state.navTitle}
                        backAction={() => {
                            goBack()

                            if (typeof this.props.route.params.refreshList == 'function') {

                                console.log(typeof this.props.route.params.refreshList, this.props.route.params.refreshList.isEdit);

                                this.props.route.params.refreshList(false);

                            }

                            else {
                                console.log(typeof this.props.route.params.refreshList, this.props.route.params.isEdit);
                            }


                        }}>
                        {' '}
                    </Nav>

                    <View style={{ flex: 1, }}>
                        <ScrollView style={{ padding: 15, paddingLeft: 20, paddingRight: 20, }} >


                            <View style={{ justifyContent: 'center', }}>

                                <DateTimePicker
                                    titleIOS=""
                                    isVisible={
                                        this.state.datePicker
                                    }
                                    onConfirm={(date) => this.handleDatePicked(date, 'datePicker')}
                                    onCancel={this.hideDateTimePicker}
                                    mode='date'
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: Constant.MontserratMedium,
                                        fontSize: 15,
                                        marginBottom: 15
                                    }}>Date</Text>

                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        // top: 5,
                                        height: 40,
                                        borderRadius: 10,
                                        // borderColor: 'rgba(205,203,251,1.0)',
                                        backgroundColor: 'white',
                                        // marginTop: 10,
                                        // marginLeft: 5
                                    }}
                                    onPress={() => (
                                        Keyboard.dismiss(), this.showDatePicker()
                                    )}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            color: 'black',
                                            fontFamily: Constant.MontserratMedium,
                                            fontSize: 13,
                                            paddingLeft: 8,
                                        }}>
                                        {date}
                                    </Text>

                                    <Image
                                        source={require('../../images/calendar_new_icon.png')}
                                        style={{
                                            width: 15,
                                            height: 15,
                                            resizeMode: 'contain',
                                            alignSelf: 'center',
                                            right: 10,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>





                            <View
                                style={{
                                    width: '100%',
                                    // left: 16,
                                    height: 80,
                                    flexDirection: 'row',
                                    marginTop: 18,
                                    justifyContent: 'space-between'
                                    ,
                                    // backgroundColor: 'red'
                                }}>
                                <DateTimePicker
                                    titleIOS=""
                                    isVisible={
                                        this.state.startTimePicker
                                    }
                                    onConfirm={(date) => this.handleDatePicked(date, 'startTimePicker')}
                                    onCancel={this.hideDateTimePicker}
                                    mode='datetime'
                                    date={this.state.dateForFormatting ? this.state.dateForFormatting: new Date() }
                                />
                                <View style={{ flex: 2, justifyContent: 'center', }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontFamily: Constant.MontserratMedium,
                                            fontSize: 15,
                                            marginBottom: 15
                                        }}>Start Time</Text>

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '95%',
                                            // top: 5,
                                            height: 40,
                                            borderRadius: 10,
                                            // borderColor: 'rgba(205,203,251,1.0)',
                                            backgroundColor: 'white',
                                            // marginTop: 10,
                                            // marginLeft: 5
                                        }}
                                        onPress={() => {

                                            if (date == 'Date') {
                                                Alert.alert(`First Select "Date"`)
                                                return
                                            }

                                            Keyboard.dismiss(), this.showStartTimePicker()
                                        }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: 'black',
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 8,
                                            }}>
                                            {startTime}
                                        </Text>

                                        <Image
                                            source={require('../../images/calendar_new_icon.png')}
                                            style={{
                                                width: 15,
                                                height: 15,
                                                resizeMode: 'contain',
                                                alignSelf: 'center',
                                                right: 10,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 2, justifyContent: 'center', }}>

                                    <DateTimePicker
                                        titleIOS=""
                                        isVisible={
                                            this.state.endTimePicker
                                        }
                                        onConfirm={(date) => this.handleDatePicked(date, 'endTimePicker')}
                                        onCancel={this.hideDateTimePicker}
                                        mode='datetime'
                                        date={this.state.dateForFormatting ? this.state.dateForFormatting: new Date() }
                                    />

                                    <View style={{ width: '100%', marginLeft: '5%' }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 15,
                                                marginBottom: 15
                                            }}>
                                            End Time
                                        </Text>

                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '95%',
                                                // top: 5,
                                                height: 40,
                                                borderRadius: 10,
                                                // borderColor: 'rgba(205,203,251,1.0)',
                                                backgroundColor: 'white',
                                                // marginTop: 14
                                                // marginLeft: 5
                                            }}
                                            onPress={() => {
                                                if (startTime == 'Start Time') {
                                                    Alert.alert(`First Select "Start Time"`)
                                                    return
                                                }
                                                Keyboard.dismiss(), this.showEndTimePicker()
                                            }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    color: 'black',
                                                    fontFamily: Constant.MontserratMedium,
                                                    fontSize: 13,
                                                    paddingLeft: 8,
                                                }}>
                                                {endTime}
                                            </Text>

                                            <Image
                                                source={require('../../images/calendar_new_icon.png')}
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    resizeMode: 'contain',
                                                    alignSelf: 'center',
                                                    right: 10,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 18 }} />

                            <CustomTextField label='Total Duration (In Minutes)' editable={false} value={String(totalDuration)} />



                            <Text
                                allowFontScaling={false}
                                style={{
                                    // marginLeft: 13,
                                    fontFamily: Constant.MontserratMedium,
                                    fontSize: 15,
                                    marginTop: 19

                                }}>
                                Reason For Leave
                            </Text>
                            <View
                                style={{
                                    // left: 16,
                                    width: '100%',
                                    height: 80,
                                    // top: 5,
                                    borderRadius: 10,
                                    // borderWidth: 0.4,
                                    // borderColor: 'rgba(205,203,251,1.0)',
                                    backgroundColor: 'white',
                                    marginBottom: 18,
                                    marginTop: 15,
                                    // marginLeft: 5
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    numberOfLines={10}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        fontFamily: Constant.MontserratMedium,
                                        fontSize: 13,
                                        paddingTop: 8,
                                        paddingLeft: 8,
                                        textAlignVertical: 'top',
                                        color: 'black'
                                    }}
                                    placeholder="Write.."
                                    placeholderTextColor="#A9A9A9"
                                    value={reason}
                                    multiline={true}
                                    maxLength={200}
                                    onChangeText={reason => this.setState({ reason: reason })}
                                    returnKeyType="done"
                                />
                            </View>

                        </ScrollView>
                    </View>



                    <View style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: 5,
                        marginBottom: 14,
                        alignItems: 'center'
                    }}>
                        <SubmitBtnWide title='Apply Short Leave' onPress={() => this.onSubmit()} />
                        {/* <PillsDropDown dataArray={['ayyyyyyyyyy','bayyyyyyyyyy','cayyyyyyyyyy']}/> */}
                    </View>

                    {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} 
              defaultBgColor='#207398' TextOnPressIn='#207398' shadowColor='#d9d9d9'
              />
              
            </View> */}

                    {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} 
              defaultBgColor='#02B290' TextOnPressIn='#02B290' shadowColor='#d9d9d9'
              />
              
            </View> */}

                    {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <SubmitBtn title='Apply Leave' onPress={() => this.onSubmit()} 
              defaultBgColor='#1C8D73' TextOnPressIn='#1C8D73' shadowColor='#d9d9d9'
              />
             
            </View> */}

                    {/* <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 25,
              alignItems: 'center'
            }}>
              <CancelBtn/>
            </View> */}


                    <Toast ref="toast" />

                </View>

                {/* <PillsDropDown dataArray={['a','b','c']}/> */}

                <Loader isLoader={this.state.isLoading}> </Loader>
            </KeyboardAwareScrollView>
        );
    }









}
