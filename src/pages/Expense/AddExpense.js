import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, TextInput, Keyboard, Alert, Picker, Vibration } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Toast from 'react-native-easy-toast'
import Nav from '../../components/NavBar';
import Loader from '../../components/Loader';
import CustomPicker from '../../components/CustomPicker';

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',//'rgba(232,244,241,1.0)',
        height: '100%',
        width: '100%',
        alignItems: 'center',

    },

    navView: {
        height: 84,
        width: '100%',
        flexDirection: 'row',
    },

    backBtn: {
        height: '80%',
        width: '80%',
        resizeMode: 'contain',
        top: 20
    },
}
)

  

export default class AddExpense extends React.Component {
    static navigationOptions = {
        gesturesEnabled: false,
        disableGestures: true
    }

    constructor(props) {
        super(props)

        this.state = {
            navTitle:'Add Expense',
            isDateTimePickerVisible: false,
            date: 'Select Date',
            selectedExpenseCategory: 'Select Expense Category',
            popUpSelectDate: 'Select Date',
            amount: '',
            advanceAmount: '',
            expenseTitle: '',
            description: '',
            expenseCategory: [],
            authDict:{},
            isLoading: false,
            showPicker: false,
            methodType:'',
            expenseId:'',
            isFromNew:true,
        }
    }

    componentDidMount() {

        const {params} = this.props.navigation.state
        var isEdit = params.isEdit

        if(isEdit == '1'){

            let obj = params.indexData
            this.setState({expenseId:obj.expenseId,selectedExpenseCategory:obj.expenseName,date:obj.incurredDate,
                amount:obj.billable,advanceAmount:obj.advanceAmount ,expenseTitle:obj.reportTitle,description:obj.expenseReason,navTitle:'Edit Expense',methodType:'PUT',isFromNew:false})

            // console.log(obj)
        }else{

            this.setState({methodType:'POST'})


        }

        KeyStore.getKey('authDict', (err, value) => {
            if (value) {
                this.setState({ authDict: value })
                this.fetchExpenseTypeCategory()

            }
        });

    }

    componentWillUnmount(){

        this.props.navigation.state.params.refreshData();
      
      }


    showDateTimePicker = () => {


        this.setState({ isDateTimePickerVisible: true });

    };

    hideDateTimePicker = () => {


        this.setState({ isDateTimePickerVisible: false, isDateTimePickerVisible: false });

    };

    handleDatePicked = date => {

        const momentDate = Moment(date.toISOString());
        var pickedDt = Moment(momentDate).format('YYYY-MM-DD')
        this.state.date = String(pickedDt)
        this.hideDateTimePicker();
    };

    onSubmit = () => {

        Keyboard.dismiss()
        const { goBack } = this.props.navigation

        if (this.state.selectedExpenseCategory == 'Select Expense Category') {
            Alert.alert('Please select Expense category.')
        }
        else if (this.state.date == 'Select Date') {

            Alert.alert('Please select date.')
        }
        else if (this.state.amount == '') {
            Alert.alert('Please enter amount.')
        } 
        else if (this.state.expenseTitle == ''){
            Alert.alert('Please enter expense title.')
        }
        else {
            this.addExpenseData()
        }
    }

    //WEB API
    async fetchExpenseTypeCategory() {

        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + 'expensecategories/' + this.state.authDict.employeeCode
        this.setState({ isLoading: true })

        try {

            let response = await fetch(url, {
                method: 'GET',
                headers: Constant.getHeader(this.state.authDict),

            }
            )

            this.setState({ isLoading: false })

            let code = await response.status

            if (code == 200) {

                let responseJson = await response.json();

                var arr = responseJson

                var dataArr = [];

                for (let j = 0; j < arr.length; j++) {

                    var i = arr[j]

                    let expesename = i.expenseName

                    // let obj = {

                    //     value: expesename,
                    // }
                    dataArr.push(expesename)
                }

                this.setState({ expenseCategory: dataArr })


            } else {

                    this.refs.toast.show('Something went wrong!')

                //Alert.alert('Something went wrong!')
            }
        } catch (error) {
            this.setState({isLoading:false})
            Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
            Vibration.vibrate()
            console.error(error);
      
        }
    }

    async addExpenseData() {

        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        this.setState({ isLoading: true })

        var params = {"empCode":this.state.authDict.employeeCode,"expenseIncurredDate":this.state.date,"expenseName":this.state.selectedExpenseCategory,"amount":this.state.amount,
        "advanceAmount":this.state.advanceAmount,'expenseReport':this.state.expenseTitle,'expenseReason':this.state.description}
    
        var url = Constant.BASE_URL + Constant.EXPENSE_RECORD  + this.state.expenseId
        
        try {
          let response = await fetch(url, {
            method: this.state.methodType,
            body: JSON.stringify(
              params
            ),       
    
            headers: Constant.getHeader(this.state.authDict),
        }
          )

        //   console.log(response)
          this.setState({ isLoading: false })
          let code = await response.status
          if(code == 201){

            let responseJson = await response.json();

            // console.log(responseJson)
            let msg = responseJson.message
            // console.log(msg)
           Alert.alert(
            'Success',
            msg,
            [
              { text: 'OK', onPress: () => goBack()},
            ],
            { cancelable: false },
          );


        } else if(code==400){
            let responseJson = await response.json();
            Alert.alert(responseJson.message)

          //  this.refs.toast.show(responseJson.message,5000);
    
          }
          else if(code == 401 || code == 503){
    
            Alert.alert('Something went wrong!')
          }else{
            Alert.alert('Something went wrong!')

           // this.refs.toast.show('Something went wrong!');
    
          }
        }
        catch (error) {

            console.error(error);
        }
        };
    
    render() {

        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (

            <View style={{ backgroundColor: 'clear',flex:1 }}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}
                    scrollEnabled={false}>
                    <View style={styles.container}>

                  <Nav  title={this.state.navTitle} backHidden={false} backAction={()=>goBack()}> </Nav>

                        {/* Select Category  */}
                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'center', width: '90%', height: 45, marginTop: 30
                        }} onPress={this.state.isFromNew  ? () => (Keyboard.dismiss(),this.setState({ showPicker: true }))  : console.log('')    }>

                            <Text allowFontScaling={false} style={{ fontSize: 13, color: 'grey', paddingLeft: 8,color:'grey' }}>{this.state.selectedExpenseCategory}</Text>

                            <Image
                                source={require('../../images/downArrow.png')}
                                style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                            />

                        </TouchableOpacity>

                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                        </View>

                        {/* Select Date  */}

                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'center', width: '90%', height: 45, marginTop: 8
                        }} onPress={this.state.isFromNew ? () => this.showDateTimePicker(): console.log('')  }>

                            <Text allowFontScaling={false} style={{ fontSize: 13, color: 'grey', paddingLeft: 8,color:'grey' }}>{this.state.date}</Text>

                            <Image
                                source={require('../../images/downArrow.png')}
                                style={{ width: 15, height: 15, resizeMode: 'contain', alignSelf: 'center', right: 10 }}
                            />

                        </TouchableOpacity>
                        
                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                        </View>

                        {/* Enter Amount  */}
                        <TextInput allowFontScaling={false}
                           style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8,color:'grey' }}
                           underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder='Amount'
                            placeholderTextColor="#A9A9A9"
                            value={this.state.amount}
                            keyboardType={'decimal-pad'}
                            onChangeText={(amount) => this.setState({ amount: amount })}
                            returnKeyType="done" 
                            editable={this.state.isFromNew}/>

                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                        </View>


                        {/* Enter Advance Amount  */}
                        <TextInput allowFontScaling={false}
                           style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color:'grey' }}
                           underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder='Advance Amount Received'
                            placeholderTextColor="#A9A9A9"
                            value={this.state.advanceAmount}
                            keyboardType={'decimal-pad'}
                            onChangeText={(advanceAmount) => this.setState({ advanceAmount: advanceAmount })}
                            returnKeyType="done" />

                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                        </View>

                        {/* Expense Title  */}

                        <TextInput allowFontScaling={false}
                           style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color:'grey' }}
                           underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder='Expense Title'
                            placeholderTextColor="#A9A9A9"
                            value={this.state.expenseTitle}
                            onChangeText={(expenseTitle) => this.setState({ expenseTitle: expenseTitle })}
                            returnKeyType="done" />

                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                        </View>

                        {/* Description Title  */}
                   
                        <TextInput allowFontScaling={false}
                           style={{ width: '90%', height: 45, marginTop: 8, paddingLeft: 8, color:'grey' }}
                           underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder='Description'
                            placeholderTextColor="#A9A9A9"
                            value={this.state.description}
                            onChangeText={(description) => this.setState({ description: description })}
                            returnKeyType="done" />

                        <View style={{ backgroundColor: 'grey', height: 1, width: '90%' }}>
                        </View>

                        <View style={{
                            height: 60, flexDirection: 'row', justifyContent: 'space-between'
                            , alignItems: 'center', marginTop: 16, borderRadius: 8, width: '90%'
                        }}>

                            <TouchableOpacity style={{ height: 35, width: '48%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.5,
                             borderColor: 'rgba(42,76,136,1.0)' }} onPress={()=>goBack()}>
                                <Text allowFontScaling={false} style={{ color: 'rgba(42,76,136,1.0)', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Cancel</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{ height: 35, width: "48%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'rgba(42,76,136,1.0)' }}
                                onPress={this.onSubmit.bind(this)}>
                                <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', width: '100%', height: '100%', top: 8, fontSize: 13 }}>Submit</Text>

                            </TouchableOpacity>

                        </View>


                        {/* <PickerBox
                        ref={ref => this.myref = ref}
                        data={this.state.expenseCategory}
                        onValueChange={value => this.setState({ selectedExpenseCategory: value })}
                        selectedValue={this.state.selectedValue}
                    /> */}

                        <DateTimePicker
                            titleIOS=''    
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker} 
                            maximumDate={new Date()}

                            />

                    </View>


        <Loader isLoader={this.state.isLoading}> </Loader> 


                </KeyboardAwareScrollView>


         {/* {
              this.state.showPicker ?

                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ width: '100%', height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.setState({ showPicker: false })}>
                            <Text style={{ marginLeft: 20, color: 'blue', fontSize: 18 }}>
                                Cancel
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ showPicker: false })}>
                            <Text style={{ marginRight: 20, color: 'blue', fontSize: 18 }}>
                                Done
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <Picker
                          selectedValue={this.state.expenseCategory[0].value}
                            onValueChange={(itemValue, j) => this.setState({ selectedExpenseCategory: itemValue })}>
                         {
                            this.state.expenseCategory.map((m, j) =>
                                <Picker.Item label={m.value} value={m.value} key={j} />
                            )
                        }
                    </Picker>
                </View>
                :
                <></>
                    }
 */}

                <CustomPicker 
                showPicker={ this.state.showPicker} 
                arr = { this.state.expenseCategory}
                title="Select Expense Category"
                handleClose={()=>this.setState({ showPicker: false})}
                handleSubmit={this.handleSubmit}>
                </CustomPicker>

                    
                    <Toast ref="toast"/>
            </View>
        );
    }

       //PICKER ACTION 
   handleSubmit = (val,index)=>{

    this.setState({ selectedExpenseCategory: val , showPicker: false})

    }
  
}