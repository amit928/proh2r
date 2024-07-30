import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Alert,Modal,ImageBackground ,Picker} from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Loader from '../../components/Loader';
import Nav from '../../components/NavBar';
import TopScrollTab from '../../components/TopScrollTab';

import ProExpenseRecord from './ProExpenseRecord';
import ProTeamExpense from './ProTeamExpenseRecord';
import Moment from 'moment';


const styles = StyleSheet.create({
 
    container: {
    height: '100%',
    width: '100%',
   
  },
  selectedView: {
    marginLeft:4,marginRight:5,borderWidth:0.5,borderColor:'gray'
    ,backgroundColor:'rgba(52,74,235,1.0)',borderRadius:15
    ,paddingLeft:15,paddingRight:15,height:30,alignSelf:'center',alignItems:'center',justifyContent:'center'
},
unSelectedView:{
    marginLeft:4,marginRight:5,borderWidth:0.5,borderColor:'gray'
    ,backgroundColor:'white',borderRadius:15
    ,paddingLeft:15,paddingRight:15,height:30,alignSelf:'center',alignItems:'center',justifyContent:'center'
},
selectedText:{
    fontFamily:Constant.MontserratSemiBold,color:'white',fontSize:10
},
unSelectedText:{
    fontFamily:Constant.MontserratSemiBold,color:'gray',fontSize:10
},

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

export default class ExpenseTab extends React.Component {

    static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true
  }

  constructor(props) {
    super(props)
    this.state = {
      token: '',
      employeeCode: '',
      authDict:{},
      loading:false,
      topScrollTap:[{title:'My Expense',isSelect:true}],
      navTitle: this.props.route.params?.tabIndex == 1 ? 'Team Expense' : 'My Expense',
      selectedPage: this.props.route.params?.tabIndex,

    }
  }

  componentDidMount() {


    console.log('componentDidMount()', this.props.route.params);


    KeyStore.getKey('expenseSupervisor', (err, value) => {
        if(value) {

        let arr = [{title:'My Expense',isSelect:true},{title:'Team Expense',isSelect:false}]
          this.setState({topScrollTap:arr})
        }
      });
    }

    //WEB API 
  btnAction=(value)=>{

    let arr = []

    this.state.topScrollTap.map((item,index)=>
    {
    item.isSelect = false
    arr.push(item)
    }
    )

    arr[value].isSelect = true

    this.setState({topScrollTap:arr,navTitle: arr[value].title,selectedPage:value,searchEnable:false})
  }

  render() {

    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (
        
      <View style={styles.container}>
       
        <Nav rightAction={()=> this.state.selectedPage == 0 ? this.refs.expenseRecordRef.clickMenu() : this.refs.teamRef.clickMenu()} isRightBtn={true} rightImg={this.state.selectedPage == 0 ? require('../../images/dots.png') : require('../../images/dots.png')}  showPicker={()=>this.setState({showPicker:true})}  month={this.state.month} title={this.state.navTitle} backHidden={false} backAction={()=>goBack() } isSearchBtn = {this.state.selectedPage == 1 ? true : false}
        isSearchBtnAction={()=> this.state.selectedPage == 1 ? this.refs.teamRef.showSearchBar() : ()=>{} }
        > </Nav>
       
       {
        this.state.topScrollTap.length != 1 
        ? 
        // <View style={{shadowOffset: { width: 0, height: 2, },shadowColor: 'rgba(224,225,227,1.0)',shadowOpacity: 3.0,
        // elevation:3,height:60,width:'100%',backgroundColor: 'white', zIndex: 1
        // // 'rgba(239,240,241,1.0)'
        // }}>      

        this.props.route.params?.tabIndex == 0 ?

         <TopScrollTab btnAction={this.btnAction} itemArr = {this.state.topScrollTap}></TopScrollTab> 
         : <></>
       
        // </View>
      :
      <></>
       }

        <View style={{flex:1}}>
        {       
           
            this.state.selectedPage == 0 ? <ProExpenseRecord ref='expenseRecordRef' navigation={this.props.navigation}></ProExpenseRecord> : 
            <ProTeamExpense ref='teamRef' {...this.props} searchEnable={this.state.searchEnable}></ProTeamExpense>
            
        }

        </View>

     <Loader isLoader={this.state.loading}> </Loader> 
      </View>
    );
  }

}