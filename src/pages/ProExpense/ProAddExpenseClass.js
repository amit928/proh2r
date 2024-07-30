import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Nav from '../../components/NavBar';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import MenuField from './MenuText';
import styles from './ProAddExpenseStyle';
//import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class ProAddExpenseClass extends React.Component {


    static navigationOptions = {
        gesturesEnabled: false,
        disableGestures: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            reason: '',
            isStartDateTimePickerVisible: false,
            navTitle: 'Add New Expense Report Class',
            isEndDateTimePickerVisible: false,
            isHalfDayDateTimePickerVisible: false,
            leaveCategory: 'Select',
            startDate: 'Start Date',
            endDate: 'End Date',
            authDict: {},
            leaveArr: [],
            resonForLeave: '',
            halfDayCheck: true,
            yesCheck: false,
            halfDayDate: 'Select Half Day',
            showPicker: false,
            startFormatedDate: '',
            endFormatedDate: '',
            halfDayFormatedDate: '',
            isLoading: false,
            isFromNew: true,
            leaveId: '',
            commentMandatory: false,
            fileMandatory: false,
            imageFilePath: '',
            fileName: '',

            halfs: ['First Half', 'Second Half'],
            halfDayArr: [],
            showHalfDayPicker: false,
            halfIndex: 0,


            ExpTitle: '',
            isModelVisible: false,
            open: false,
            value: null,
            items: [
                { label: 'Accomodation', value: 'Accomodation' },
                { label: 'Convienience', value: 'Convienience' },
                { label: 'Distance', value: 'Distance' },
                { label: 'Hotel Claim', value: 'Hotel Claim' },
                { label: 'Per Day', value: 'Per Day' }
            ]
        };

        this.setValue = this.setValue.bind(this);
    }

    setOpen(open) {
        this.setState({
            open
        });
    }

    setValue(callback) {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    componentDidMount() {



    }



    componentWillUnmount() {
        // this.props.route.params.refreshList();
        // this.props.navigation.state.params.refreshList();
    }


    showDateTimePicker = value => {
        if (value == 'startDate') {
            this.setState({ isStartDateTimePickerVisible: true });
        } else if (value == 'halfDayDate') {
            if (this.state.startDate == 'Start Date') {
                Alert.alert('Please select start date.');
            }
            if (this.state.endDate == 'End Date') {
                Alert.alert('Please select end date.');
            } else {
                this.setState({ isHalfDayDateTimePickerVisible: true });
            }
        } else {
            if (this.state.startDate == 'Start Date') {
                Alert.alert('Please select start date.');
            } else {
                this.setState({ isEndDateTimePickerVisible: true });
            }
        }
    };

    hideDateTimePicker = () => {
        this.setState({
            isStartDateTimePickerVisible: false,
            isEndDateTimePickerVisible: false,
            isHalfDayDateTimePickerVisible: false,
        });
    };

    handleDatePicked = date => {
        const momentDate = Moment(date.toISOString());
        var pickedDt = Moment(momentDate).format('DD/MM/YYYY');
        var pickedServerDt = Moment(momentDate).format('YYYY-MM-DD');

        if (this.state.isStartDateTimePickerVisible) {
            this.setState({
                startFormatedDate: String(pickedServerDt),
                startDate: String(pickedDt),
                endDate: 'End Date',
                halfDayDate: 'Select Half Day',
                yesCheck: false,
                halfDayArr: [],
            });
        } else if (this.state.isEndDateTimePickerVisible) {
            var a = Moment(pickedDt, 'DD/MM/YYYY');
            var b = Moment(this.state.startDate, 'DD/MM/YYYY');
            var diff = a.diff(b, 'days');

            if (diff < 0) {
                this.refs.toast.show(
                    'Please select valid end date, end date should not below start date.',
                    5000,
                );
            } else {
                this.setState({
                    endFormatedDate: String(pickedServerDt),
                    endDate: String(pickedDt),
                    halfDayDate: 'Select Half Day',
                    halfDayArr: [],
                });
            }
        } else if (this.state.isHalfDayDateTimePickerVisible) {
            var a = Moment(pickedDt, 'DD/MM/YYYY');
            var b = Moment(this.state.startDate, 'DD/MM/YYYY');
            var c = Moment(this.state.endDate, 'DD/MM/YYYY');

            var diffStrDt = a.diff(b, 'days');
            var diffEndDt = c.diff(a, 'days');
            if (diffStrDt < 0 || diffEndDt < 0) {
                this.refs.toast.show(
                    'Please select valid half day date, half day date should between start date and end date.',
                    5000,
                );
            } else {
                let dict = { date: pickedServerDt, shift: 'Select Shift' };
                let arr = this.state.halfDayArr;
                arr.push(dict);

                this.setState({
                    halfDayFormatedDate: String(pickedServerDt),
                    halfDayDate: String(pickedDt),
                    halfDayArr: arr,
                });
            }
        }
        this.hideDateTimePicker();
    };


    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (

            <SafeAreaView style={styles.container}>
                <Nav
                    backHidden={false}
                    title={this.state.navTitle}
                    backAction={() => goBack()}>
                    {' '}
                </Nav>

                <View style={styles.MainView}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <TextInput allowFontScaling={false}
                            style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color: 'grey', alignSelf: 'center' }}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder='Expense Report Title'
                            placeholderTextColor="#A9A9A9"
                            value={this.state.ExpTitle}
                            onChangeText={(text) => this.setState({ ExpTitle: text })}
                            returnKeyType="done" />
                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%', alignSelf: 'center' }}>
                        </View>


                        {/* Cards */}

                        <View style={styles.pendingCardView2}>

                            <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

                                {/* <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/expenses.png')}></Image> */}

                                {/* <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1 }}>Hi</Text> */}

                                {/* <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => { }} >

                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                                    source={require('../../images/viewGray.png')} />
                            </TouchableOpacity> */}

                                {/* {
                                item.status == 'LEVEL1PENDING' ?

                                    <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.deleteAction(index)} >

                                        <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                                            source={require('../../images/deleteGray.png')} />
                                    </TouchableOpacity>

                                    :

                                    <></>

                            } */}

                            </View>

                            <View style={{ flexDirection: 'row', height: 50 }}>

                                <View style={{ flex: 2, marginLeft: 16, }}>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Incurred Date</Text>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Expense Yo</Text>

                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Category</Text>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Reimbursable Yo</Text>

                                </View>


                            </View>




                            <View style={{ flexDirection: 'row', height: 50 }}>
                                <View style={{ flex: 2, marginLeft: 16 }}>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Amount </Text>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Billable Yo</Text>

                                </View>

                                <View style={{ flex: 2 }}>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Reimbursable</Text>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Status Yo</Text>

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', height: 50 }}>
                                <View style={{ flex: 2, marginLeft: 16 }}>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Billable </Text>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Billable Yo</Text>

                                </View>

                                <View style={{ flex: 2 }}>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Actions</Text>
                                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>Status Yo</Text>

                                </View>
                            </View>



                        </View>
                        <View style={{}} />

                        {/* <FlatList /> */}





                    </ScrollView>

                    <TouchableOpacity style={{
                        height: 50, width: 60, borderRadius: 30,
                        justifyContent: 'center', alignItems: 'center', marginRight: 20, marginTop: 10, alignSelf: 'flex-end', shadowOffset: { width: 0, height: 5, },
                        shadowColor: 'gray',
                        shadowOpacity: 3.0,
                        //elevation:3, right: 20
                    }} onPress={() => { this.setState({ isModelVisible: true }) }
                    } >
                        <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
                    </TouchableOpacity>


                    <View style={styles.bottomBtns}>
                        <TouchableOpacity
                            style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                borderWidth: 0.5,
                                borderColor: 'rgba(42,76,136,1.0)',
                            }}
                            onPress={() => goBack()}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: 'rgba(42,76,136,1.0)',
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '100%',
                                    top: 8,
                                    fontSize: 13,
                                    fontFamily: Constant.MontserratBold,
                                }}>
                                Cancel
                            </Text>




                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: 35,
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                backgroundColor: 'rgba(42,76,136,1.0)',

                            }}
                            onPress={() => { }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '100%',
                                    top: 8,
                                    fontSize: 13,
                                    fontFamily: Constant.MontserratBold,
                                }}>
                                Submit
                            </Text>
                        </TouchableOpacity>




                        {/* <View style={styles.modelConatiner}> */}
                        {/* <MenuField
                                visible={visible}
                                placeHolder={VehicleType}
                                data={VehicleTypeList}
                                title={""}
                                showMenu={() => showMenu()}
                                hideMenu={() => hideMenu()}
                                selectAction={(brand_name, id) => {
                                    hideMenu();
                                    vehicleTypeAction(brand_name, id);
                                }}
                            /> */}





                    </View>


                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.isModelVisible}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                        {/*All views of Modal*/}

                        <View style={styles.modelConatiner}>
                            {/* <MenuField
                                visible={visible}
                                placeHolder={VehicleType}
                                data={VehicleTypeList}
                                title={""}
                                showMenu={() => showMenu()}
                                hideMenu={() => hideMenu()}
                                selectAction={(brand_name, id) => {
                                    hideMenu();
                                    vehicleTypeAction(brand_name, id);
                                }}
                            /> */}



                            <Button title='helo'
                                onPress={() => { this.setState({ isModelVisible: false }) }}
                            />

                            {/* <View>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150, borderRadius: 20, marginTop: 10 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
</View> */}

                            {/* <View>
                                <DropDownPicker
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                />
                            </View> */}

                            <View>
                                <DropDownPicker
                                    open={this.state.open}
                                    value={this.state.value}
                                    items={this.state.items}
                                    setOpen={this.setOpen}
                                    setValue={this.setValue}
                                    setItems={this.setItems}
                                />
                            </View>

                            <DateTimePicker
                                titleIOS=""
                                isVisible={
                                    this.state.isStartDateTimePickerVisible ||
                                    this.state.isEndDateTimePickerVisible ||
                                    this.state.isHalfDayDateTimePickerVisible
                                }
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                            />

                            
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontFamily: Constant.MontserratMedium,
                                            fontSize: 13,
                                        }}>
                                        Start Date
                                    </Text>

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '90%',
                                            top: 5,
                                            height: 40,
                                            borderRadius: 22.5,
                                            borderWidth: 0.4,
                                            borderColor: 'rgba(205,203,251,1.0)',
                                            backgroundColor: 'rgba(226,230,248,1.0)',
                                        }}
                                        onPress={() => (
                                            Keyboard.dismiss(), this.showDateTimePicker('startDate')
                                        )}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: 'gray',
                                                fontFamily: Constant.MontserratMedium,
                                                fontSize: 13,
                                                paddingLeft: 8,
                                            }}>
                                            {this.state.startDate}
                                        </Text>

                                        <Image
                                            source={require('../../images/downArrow.png')}
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



                    </Modal>


                </View>


                {/* <TextInput/>
                    <FlatList
                
                    />
                    <TouchableOpacity/> */}




                {/* <TouchableOpacity
                style={{
                    height: 35,
                    width: '48%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    borderWidth: 0.5,
                    borderColor: 'rgba(42,76,136,1.0)',
                }}
                onPress={() => goBack()}>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: 'rgba(42,76,136,1.0)',
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        top: 8,
                        fontSize: 13,
                        fontFamily: Constant.MontserratBold,
                    }}>
                    Cancel
                </Text> */}




                {/* </TouchableOpacity> */}
            </SafeAreaView >

        )


    }







}