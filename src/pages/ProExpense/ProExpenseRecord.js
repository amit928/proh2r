import React, { createRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, Alert, Button, Vibration, FlatList, ActivityIndicator } from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Toast from 'react-native-easy-toast'
import Loader from '../../components/Loader';
import * as Utility from '../../Externel Constant/Utility';
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import { Shadow } from 'react-native-shadow-2';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import SwipeableList from '../../components/SwipeableList';
import ViewItemDetail from '../../components/ViewItemDetail';
import { COLORS } from '../../Constant/Index';
import { ListViewUtlis } from '../../ListViewUtlis';

const rightSwipeActions = (rejectFunc, editFunc, index, status) => {



  // const finalWidth = Width - 240

  // const halfWidth = finalWidth / 2
  return (
    <>
      <TouchableOpacity
        style={{
          width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
          marginTop: 5, alignItems: 'center', paddingVertical: 2
        }}
        onPress={() => {

          editFunc()

          console.log(index);

        }}
      >

        <View
          style={{
            width: '100%', height: '100%', backgroundColor: '#008000', justifyContent: 'center', flexDirection: 'row'

          }}
        >


          <View style={{ width: '100%', height: '100%', backgroundColor: "#008000", justifyContent: 'center', alignItems: 'center' }}>

            {status == "REJECTED" ?
              <Image

                source={require('../../images/reinitiate.png')}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: 'white'
                  // alignSelf: 'center',
                  // right: 10,

                }} />

              :
              <Image

                source={require('../../images/editGray.png')}
                style={{
                  width: 21,
                  height: 21,
                  resizeMode: 'contain',
                  tintColor: 'white'
                  // alignSelf: 'center',
                  // right: 10,

                }} />

            }

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
      {!(status == 'REJECTED') ?
        <TouchableOpacity
          style={{
            width: '18%', height: 70, backgroundColor: 'white', justifyContent: 'center',
            marginTop: 5, alignItems: 'center', paddingVertical: 2
          }}
          onPress={() => {

            rejectFunc()

            console.log(index);

          }}
        >

          <View
            style={{
              width: '100%', height: '100%', backgroundColor: '#e03737', justifyContent: 'center', flexDirection: 'row'

            }}
          >


            <View style={{ width: '100%', height: '100%', backgroundColor: "#e03737", justifyContent: 'center', alignItems: 'center' }}>

              <Image

                source={require('../../images/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  // alignSelf: 'center',
                  // right: 10,
                  tintColor: 'white'

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

let unsubscribe;

const checkNull = (value, passValue) => {

  if (value == null || value == "null" || value == undefined || value == 'undefined') {
    return passValue
  }
  else {
    return value
  }
}

const styles = StyleSheet.create({

  container: {
    // height: '100%',
    // width: '100%',
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: Constant.BACKGROUNDCOLOR
    backgroundColor: COLORS.FormBGColor
  },

  approvedCardView: {
    height: 170,
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
    height: 170,
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
    height: 170,
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


export default class ProMyExpense extends React.Component {



  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true
  }

  constructor(props) {
    super(props)

    this.state = {

      MainAPIDataArray: [],
      SelectedAPIData: {},

      isDateTimePickerVisible: false,
      totalAmount: '1000',
      date: '',
      authDict: {},
      isLoading: false,
      expenseArr: [],
      isView: false,
      detailsKeyArr: [],
      detailsValueArr: [],
      expensecategories: [],
      showadvanceAmount: false,
      menuVisible: false,
      MenuItemClicked: 0,
      paginationLoader: false



    };

    this.totalRecords = createRef();
    this.totalPages = createRef();
    this.currentPageNumber = createRef();
    this.statusArray = createRef();

    // this.totalRecords = {current: null};
    // this.totalPages = {current: null};
    // this.currentPageNumber = {current: null};
    // this.statusArray = {current: null};

  }


  // getExpenseRecordPayload(pageNumber, empCode, status) {
  //   return {
  //     "department": ["null"],
  //     "location": ["null"],
  //     "band": ["null"],
  //     "designation": ["null"],
  //     "empCode": String(empCode).toLowerCase(),
  //     "pageNumber": pageNumber,
  //     "pageSize": 20,
  //     "search": "null",
  //     "status": status
  //   }
  // }


  componentDidMount() {

    console.log("componentDidMount", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

    this.currentPageNumber.current = 0

    this.statusArray.current = [
      "LEVEL1PENDING",
      "APPROVED",
      "REJECTED",
      "LEVEL2PENDING",
      "CANCELLED"
    ]

    KeyStore.getKey('authDict', (err, value) => {
      if (value) {
        this.setState({ authDict: value })
        // this.getExpenseRecord()
        this.executeGetExpenseRecord([], true)

      }
    });
    // unsubscribe = this.props.navigation.addListener('focus', () => {
    //   KeyStore.getKey('authDict', (err, value) => {
    //     if (value) {
    //       this.setState({ authDict: value })
    //       // this.getExpenseRecord()
    //       this.executeGetExpenseRecord([], true)

    //     }
    //   });
    // });




    // console.warn();

  }

  componentWillUnmount() {
    // unsubscribe();
  }

  refreshList() {
    this.executeGetExpenseRecord([], true)
  }

  clickMenu() {

    console.log("Click Menu !");
    this.setState({ menuVisible: true });

  }


  fetchMoreData() {

    console.log("fetchMoreData", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);
    if (this.currentPageNumber.current >= this.totalPages.current) {
      console.log("this.currentPageNumber.current >= this.totalPages.current");
      return
    }

    if (this.state.paginationLoader) {
      console.log("this.state.paginationLoader");
      return
    }

    if (this.state.expenseArr.length >= this.totalRecords) {
      console.log("this.state.expenseArr >= this.totalRecords");
      return
    }

    this.executeGetExpenseRecord()
    // this.setState({ paginationLoader: true })


  }


  onMenuClick(menuClickIndex, status) {
    this.setState({ MenuItemClicked: menuClickIndex, menuVisible: false })

    this.statusArray.current = Utility.getStatusArrayForSorting()[status]
    this.executeGetExpenseRecord([], true)
  }

  render() {

    return (

      <>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>


          <Menu
            onRequestClose={() => this.setState({ menuVisible: false })}
            // children={<TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }} onPress={() => setmenuVisible(false)}></TouchableOpacity>}

            visible={this.state.menuVisible}
          // anchor={<Text onPress={showMenu}>Show menu</Text>}
          // onRequestClose={hideMenu}
          >

            {this.state.MenuItemClicked == 0 ? <></> :

              <MenuItem onPress={() => {

                this.onMenuClick(0, "getAll")

              }}>Show All</MenuItem>

            }

            {this.state.MenuItemClicked == 1 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({ MenuItemClicked: 1, menuVisible: false })
                this.onMenuClick(1, "LEVEL1PENDING")

              }}>Level 1 Pending</MenuItem>
            }

            {this.state.MenuItemClicked == 2 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({ MenuItemClicked: 2, menuVisible: false })
                this.onMenuClick(2, "APPROVED")

              }}>Approved</MenuItem>
            }

            {this.state.MenuItemClicked == 3 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({ MenuItemClicked: 3, menuVisible: false })
                this.onMenuClick(3, "CANCELLED")

              }}>Cancelled</MenuItem>
            }


            {this.state.MenuItemClicked == 4 ? <></> :
              <MenuItem onPress={() => {

                // this.setState({ MenuItemClicked: 4, menuVisible: false })
                this.onMenuClick(4, "REJECTED")

              }}>Rejected</MenuItem>

            }
            {/* <MenuItem onPress={() => {
              
              this.setState({menuVisible: false})
            }
            }>Cancel</MenuItem> */}

          </Menu>

        </View>

        <View style={styles.container}>

          {
            this.state.expenseArr.length != 0 ?
              <>
                <FlatList
                  data={this.state.expenseArr}
                  showsVerticalScrollIndicator={false}
                  // ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={({ item, index }) => this.renderList(item, index)}
                  keyExtractor={(item, index) => String(item?.expenseId)}
                  // initialNumToRender={5}
                  // maxToRenderPerBatch={10}
                  // windowSize={10}
                  onEndReachedThreshold={0.5}
                  onEndReached={this.fetchMoreData.bind(this)}
                  ListFooterComponent={this.state.paginationLoader ? <ActivityIndicator size={'large'} /> : <View style={{ height: 10 }} />}
                />

                {/* renderItem={({ item, index }) => this.state.MenuItemClicked == 1 ? this.renderListOnlyForPending(item, index) : this.state.MenuItemClicked == 2 ? this.renderListOnlyForApproved(item, index) : this.state.MenuItemClicked == 3 ? this.renderListOnlyForCancelled(item, index) : this.state.MenuItemClicked == 4 ? this.renderListOnlyForRejected(item, index) : this.renderList(item, index)} */}

                {/* {this.state.paginationLoader && <ActivityIndicator size={'large'} />} */}
              </>
              // <ScrollView showsVerticalScrollIndicator={false}>
              //   {
              //     this.state.expenseArr.map((item, index) => this.state.MenuItemClicked == 1 ? this.renderListOnlyForPending(item, index) : this.state.MenuItemClicked == 2 ? this.renderListOnlyForApproved(item, index) : this.state.MenuItemClicked == 3 ? this.renderListOnlyForCancelled(item, index) : this.state.MenuItemClicked == 4 ? this.renderListOnlyForRejected(item, index) : this.renderList(item, index)

              //     )
              //     // .reverse()
              //   }
              // </ScrollView>
              :
              <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

              </Text>
          }

          {/* <TouchableOpacity style={{ alignSelf:'flex-end',height: 60, width: 60, borderRadius: 30,
                    justifyContent: 'center',alignItems:'center',position:'absolute',bottom:60, shadowOffset: { width: 0, height: 5, },
                shadowColor: 'gray',
                shadowOpacity: 3.0,
                elevation:3, right: 20
                    }} 
                    onPress={()=>this.props.navigation.navigate('AddExpense', { refreshData: this._onRefresh, isEdit: '0' })}>
                <Image style={{ width: "100%", height: "100%", resizeMode: 'contain'}} source={require('../../images/floatBtn.png')}></Image> 
                </TouchableOpacity> */}


          {/* Loader  Modal */}
          <Loader isLoader={this.state.isLoading}> </Loader>

          <Modal
            visible={this.state.isView}
            transparent={true}
            onRequestClose={() => { }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ width: Dimensions.get('window').width - 40, backgroundColor: 'white', borderRadius: 8 }}>
                <View style={{ width: 100, height: 100, borderRadius: 50, top: -50, alignSelf: 'center', justifyContent: 'center' }} >
                  <Image source={require('../../images/dialog-logo.png')} style={{ width: "100%", height: "100%", resizeMode: 'contain', }}>
                  </Image>
                </View>

                <TouchableOpacity style={{ width: 50, height: 50, alignSelf: 'flex-end', bottom: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ isView: false })}>
                  <Image
                    source={require('../../images/cross.png')}
                    style={{ height: '60%', width: '60%', resizeMode: 'contain' }} />
                </TouchableOpacity>

                <Text allowFontScaling={false} style={{ textAlign: 'center', justifyContent: 'center', textAlignVertical: "center", fontSize: 17, color: 'black', fontWeight: '500', top: -90 }}>Expense Details</Text>

                {

                  this.state.detailsKeyArr.map((m, i) =>

                    <View key={i} style={{ width: '100%', padding: 8, flexDirection: 'row', top: -70 }}>
                      <View style={{ flex: 3, justifyContent: 'center', }}>
                        <Text allowFontScaling={false} style={{ paddingLeft: 12, fontSize: 13, textAlign: "left", fontFamily: Constant.MontserratBold }}>{m + ":"}</Text>
                      </View>
                      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratMedium, fontSize: 13, alignSelf: 'flex-start', left: 10, width: 155 }}>{Utility.splitStatus(this.state.detailsValueArr[i])}</Text>
                      </View>
                    </View>



                  )}

                <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 20 }}
                  onPress={() => this.viewExpenseDetails(this.state.SelectedAPIData)}>
                  <Text style={{ color: 'blue' }}>View Details</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

          {/* <TouchableOpacity style={{
          alignSelf: 'flex-end', height: 60, width: 60, borderRadius: 30,
          justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 60, shadowOffset: { width: 0, height: 5, },
          shadowColor: 'gray',
          shadowOpacity: 3.0,
          elevation: 3, right: 20
        }} onPress={() => this.props.navigation.navigate('ProAddExpense')
        } >
          <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../images/floatBtn.png')}></Image>
        </TouchableOpacity> */}


          <FloatBtnComp clickBtn={() => this.props.navigation.navigate('ProAddExpense', {
            refreshList: () => {
              this.refreshList();
            }
          })} />


          <Toast ref="toast" />
        </View>

      </>
    );
  }


  renderList = (item, index) => {

    // console.log(item);
    return (<>

      <SwipeableList
        onPress={() => {
          this.viewAction(index)

        }}
        title={
          String(item.reportTitle).length <= 25 ? String(item.reportTitle) :
            String(item.reportTitle).substring(0, 25) + '...'}
        statusMain={Utility.splitStatus(item.status)}
        fromTo={'Total Amount: ' + Utility.checkNull(String(item.totalAmount))}
        rightSwipeActions={(swipeRef) => {

          if (item.status == 'LEVEL1PENDING' || item.status == 'REJECTED') {
            return rightSwipeActions(() => this.deleteAction(index), () => { this.editAction(index) }, index, item.status)
          }
          else return <></>

        }}
        statusMainColor={Utility.statusColor(item.status)}
      />


      {/* <View style={item.status == "APPROVED" ? styles.approvedCardView : item.status == "REJECTED" ? styles.rejectCardView : item.status == "CANCELLED" ? styles.rejectCardView : styles.pendingCardView} key={index}>

  <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, alignItems: 'center' }} >

    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/expenses.png')}></Image>

    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 14, padding: 8, color: 'black', flex: 1 }}>{item.reportTitle}</Text>

    <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.viewAction(index)} >

      <Image style={{ width: 20, height: 20, resizeMode: 'contain',  }}
        source={require('../../images/viewGray.png')} />
    </TouchableOpacity>

    {
      item.status == 'LEVEL1PENDING' || item.status == "REJECTED" ?

        <>
          <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.editAction(index) }} >

            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
              source={item.status == "REJECTED" ? require('../../images/reinitiate.png') : require('../../images/editGray.png')} />
          </TouchableOpacity>

          {item.status == "REJECTED" ? <></> :
            <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.deleteAction(index)} >

              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                source={require('../../images/deleteGray.png')} />
            </TouchableOpacity>

          }
        </>

        :

        <></>

    }

  </View>

  <View style={{ flexDirection: 'row', height: 50 }}>

    <View style={{ flex: 2, marginLeft: 16 }}>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Expense Name</Text>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.reportTitle}</Text>

    </View>
    <View style={{ flex: 2 }}>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Reimbursable</Text>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.reimbursement}</Text>

    </View>


  </View>

  <View style={{ flexDirection: 'row', height: 50 }}>
    <View style={{ flex: 2, marginLeft: 16 }}>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Billable </Text>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.billable}</Text>

    </View>

    <View style={{ flex: 2 }}>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Status</Text>
      <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 11, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Utility.splitStatus(item.status)}</Text>

    </View>
  </View>

</View> */}
    </>
    );

  }

  renderListOnlyForPending = (item, index) => <>

    {item.status == 'LEVEL1PENDING' ?

      <SwipeableList
        onPress={() => {
          this.viewAction(index)

        }}
        title={
          String(item.reportTitle).length <= 25 ? String(item.reportTitle) :
            String(item.reportTitle).substring(0, 25) + '...'}
        statusMain={Utility.splitStatus(item.status)}
        fromTo={'Total Amount: ' + Utility.checkNull(String(item.totalAmount))}
        rightSwipeActions={(swipeRef) => {

          if (item.status == 'LEVEL1PENDING' || item.status == 'REJECTED') {
            return rightSwipeActions(() => this.deleteAction(index), () => { this.editAction(index) }, index, item.status)
          }
          else return <></>

        }}
        statusMainColor={Utility.statusColor(item.status)}
      />
      :
      <></>
    }

  </>


  renderListOnlyForApproved = (item, index) => <>

    {item.status == 'APPROVED' ?

      <SwipeableList
        onPress={() => {
          this.viewAction(index)

        }}
        title={
          String(item.reportTitle).length <= 25 ? String(item.reportTitle) :
            String(item.reportTitle).substring(0, 25) + '...'}
        statusMain={Utility.splitStatus(item.status)}
        fromTo={'Total Amount: ' + Utility.checkNull(String(item.totalAmount))}
        rightSwipeActions={(swipeRef) => {

          if (item.status == 'LEVEL1PENDING' || item.status == 'REJECTED') {
            return rightSwipeActions(() => this.deleteAction(index), () => { this.editAction(index) }, index, item.status)
          }
          else return <></>

        }}
        statusMainColor={Utility.statusColor(item.status)}
      />
      : <></>}
  </>

  renderListOnlyForCancelled = (item, index) => <>

    {item.status == 'CANCELLED' ?

      <SwipeableList
        onPress={() => {
          this.viewAction(index)

        }}
        title={
          String(item.reportTitle).length <= 25 ? String(item.reportTitle) :
            String(item.reportTitle).substring(0, 25) + '...'}
        statusMain={Utility.splitStatus(item.status)}
        fromTo={'Total Amount: ' + Utility.checkNull(String(item.totalAmount))}
        rightSwipeActions={(swipeRef) => {

          if (item.status == 'LEVEL1PENDING' || item.status == 'REJECTED') {
            return rightSwipeActions(() => this.deleteAction(index), () => { this.editAction(index) }, index, item.status)
          }
          else return <></>

        }}
        statusMainColor={Utility.statusColor(item.status)}
      />
      : <></>}
  </>

  renderListOnlyForRejected = (item, index) => <>

    {item.status == 'REJECTED' ?

      <SwipeableList
        onPress={() => {
          this.viewAction(index)

        }}
        title={
          String(item.reportTitle).length <= 25 ? String(item.reportTitle) :
            String(item.reportTitle).substring(0, 25) + '...'}
        statusMain={Utility.splitStatus(item.status)}
        fromTo={'Total Amount: ' + Utility.checkNull(String(item.totalAmount))}
        rightSwipeActions={(swipeRef) => {

          if (item.status == 'LEVEL1PENDING' || item.status == 'REJECTED') {
            return rightSwipeActions(() => this.deleteAction(index), () => { this.editAction(index) }, index, item.status)
          }
          else return <></>

        }}
        statusMainColor={Utility.statusColor(item.status)}
      />


      : <></>}

  </>


  async executeGetExpenseRecord(statusArray, isInitial) {


    console.log("executeGetExpenseRecord", { statusArray, isInitial });
    if (isInitial) {
      this.setState({ isLoading: true })
      await this.getExpenseRecord(statusArray, isInitial)
      this.setState({ isLoading: false })
    }
    else {
      this.setState({ paginationLoader: true })
      await this.getExpenseRecord()
      this.setState({ paginationLoader: false })
    }




  }

  async getExpenseRecord(statusArray, isInitial) {



    var url = "https://proh2r.com/api/proh2r/v1/expense/application/getAllExpenseByEmpForMobile"

    console.log('getExpenseRecord', url);

    console.warn(this.state.authDict);

    // isInitial && this.setState({ isLoading: true })

    try {
      if (isInitial)
        this.currentPageNumber.current = 0

      const bodyPayload = ListViewUtlis.getExpenseRecordPayloadForEmp(isInitial ? 0 : this.currentPageNumber.current, this.state.authDict.employeeCode, this.statusArray.current)

      console.log("bodyPayload", bodyPayload);


      let response = await fetch(url, {
        method: 'POST',
        headers: Constant.getHeader(this.state.authDict),
        body: JSON.stringify(bodyPayload)
      }
      )
      console.log("body", bodyPayload);

      let code = await response.status
      // isInitial && this.setState({ isLoading: false })

      if (code == 200) {

        let responseJson = await response.json();
        console.log("responseJson_getExpenseRecord", responseJson?.content)

        this.totalPages.current = responseJson?.totalPages
        this.totalRecords.current = responseJson?.totalRecords

        if (isInitial)
          this.currentPageNumber.current = 1
        else
          this.currentPageNumber.current++


        console.log("code==200", "this.currentPageNumber.current, this.totalPages, this.totalRecords", this.currentPageNumber.current, this.totalPages, this.totalRecords);

        let copyData = []

        copyData = isInitial ? responseJson?.content : [...this.state.MainAPIDataArray, ...responseJson?.content]

        this.setState({ MainAPIDataArray: copyData })

        var arr = copyData
        var dataArr = []

        for (let i = 0; i < arr.length; i++) {
          var j = arr[i]

          let advanceAmount = j.amount - j.reimburseAmount

          var obj = {
            reportTitle: checkNull(String(j.expenseReportName), ''),
            reimbursement: checkNull(String(j.reimburseAmount), ''),
            billable: checkNull(String(j.billableAmount), ''),
            status: checkNull(String(j.expenseStatus), ''),
            //   expenseName: checkNull(String(j.expenseReportName), ''),
            // advanceAmount: checkNull(String(advanceAmount), ''),
            ///  expenseReason: checkNull(String(j.expenseReason), ''),
            expenseId: checkNull(String(j.expenseId)),
            totalAmount: j.totalAmount,
            expenseId: j.expenseId
          }
          dataArr.push(obj)
        }
        this.setState({ expenseArr: dataArr })

        // this.setState({isLoading: false})

        // this.state.expensecategories.length == 0 && await this.getAddExpenseData(this.state.authDict.employeeCode)

        if (this.state.expensecategories.length == 0) {
          this.getAddExpenseData(this.state.authDict.employeeCode)
        }

      }
      else if (code == 400) {
        // this.setState({ isLoading: false })
        let responseJson = await response.json();
        console.log(responseJson)
        Alert.alert('Something went wrong!')
      }
      else {

        let msg = await response.statusText
        this.refs.toast.show('Something went wrong!');
        console.log('getExpenseRecord', code);
        // this.setState({ isLoading: false })

        Alert.alert('Something went wrong!')
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAddExpenseData(empCode) {

    var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + "expensecategories/" + empCode

    // this.setState({ isLoading: true })

    // console.warn(url)

    // console.warn("authDict", authDict);

    // setisLoading(true)

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: Constant.getHeader(this.state.authDict)
      }
      )

      const authDictTemp = this.state.authDict

      console.log("yoyoyoyouyoyohy", response)

      let code = await response.status
      //setisLoading(false)

      if (code == 200) {

        let responseJson = await response.json();
        console.log("Response Json ", responseJson)
        //setisLoading(false)
        //setexpensecategories([])
        // responseJson.forEach((item, index) => {

        // expensecategories.push(item)
        //console.log(item.expenseName);


        // })

        this.setState({ expensecategories: responseJson })

        console.log("ExpenseCategoriesDropDownData ", this.state.expensecategories);

        (async function () {
          console.log('Immediately invoked function execution');
          var url2 = Constant.BASE_URL + 'advance/application/get/advance/expense/data?empCode=' + empCode

          console.log(url2);


          try {

            let response2 = await fetch(url2, {
              method: 'GET',
              headers: Constant.getHeader(authDictTemp)
            }
            )



            console.log("yoyoyoyouyoyohy", response2)

            let code2 = await response2.status

            if (code2 == 200) {

              let responseJson2 = await response2.json();
              console.log("Response Json2 ", responseJson2);

              this.setState({ showadvanceAmount: responseJson2.shouldAdvanceAmountFlowToExpense })

              // setshowadvanceAmount(responseJson2.shouldAdvanceAmountFlowToExpense)

              // this.setState({ isLoading: false })

            } else {
              // this.setState({ isLoading: false })
            }

          } catch (error) {
            console.error(error);
          }

        }.bind(this))();





      } else if (code == 400) {

        let responseJson = await response.json();
        console.log("Response Json ", responseJson)
        this.setState({ isLoading: false })

        Alert.alert("", responseJson?.message);

        // let msg = await response.statusText



        // this.refs.toast.show('Something went wrong!');
        // Alert.alert('Something Went Wrong')

        // Alert.alert('Something went wrong!')
        // setapirun(!apirun)
      }
      else {
        Alert.alert('Something went wrong!')
        this.setState({ isLoading: false })
      }
    } catch (error) {
      console.error(error);

    }


  }

  _onRefresh = () => {

    // this.getExpenseRecord()
  }

  viewAction(index) {


    // this.props.navigation.navigate('ProViewExpenseRecord', { item2: this.state.MainAPIDataArray[index] });

    let item = this.state.MainAPIDataArray[index]

    this.props.navigation.navigate('ProViewTeamExpenseRecord', { item: item, teamFlag: false, updateAction: () => { }, authDict: this.state.authDict });

    // let obj = this.state.expenseArr[index]
    // this.setState({ SelectedAPIData: this.state.MainAPIDataArray[index] })
    // this.setState({ isView: true })

    // const value = Object.values(obj)
    // const key = Object.keys(obj);

    // // var  arr = []
    // var keyArr = ['Expense Report Title', 'Reimbursement', 'Billable', 'Status']

    // this.setState({ detailsKeyArr: keyArr })
    // this.setState({ detailsValueArr: value })

    // console.log('exp lolarr', this.state.expenseArr[index])
    // console.log('MainAPIDataArray', this.state.MainAPIDataArray[index])


  }

  editAction(index) {

    this.props.navigation.navigate('ProEditExpense', { EditExpenseDataArryaResponse: this.state.MainAPIDataArray[index], showadvanceAmount: this.state.showadvanceAmount, authDict: this.state.authDict, expensecategories: this.state.expensecategories });

  }

  viewExpenseDetails(item2) {

    this.setState({ isView: false })
    this.props.navigation.navigate('ProViewExpenseRecord', { item2 });

  }

  deleteAction(index) {

    const { navigate } = this.props.navigation
    let obj = this.state.expenseArr[index]


    Alert.alert(
      "Alert !",
      "Do You Really Want To Cancel This Expense !",
      [
        {
          text: "OK",
          onPress: () => this.deleteExpense(obj.expenseId),
          style: "cancel",
        },
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    )

    // this.deleteExpense(obj.expenseId)

  }

  async deleteExpense(expenseId) {
    this.setState({ isLoading: true })

    var url = Constant.BASE_URL + Constant.EXPENSE_RECORD + expenseId + '/action?action=CANCEL&&comments='
    console.log(url)

    try {
      let response = await fetch(url, {
        method: 'PUT',
        body: {},
        headers: Constant.getHeader(this.state.authDict)
      }
      )
      let code = await response.status


      if (code == 200) {
        let responseJson = await response.json();
        console.log('yyyyyy', responseJson);
        Alert.alert(responseJson.message)
        // this.getExpenseRecord()
        this.executeGetExpenseRecord([], true)
      } else if (code == 400) {
        let responseJson = await response.json();
        Alert.alert(responseJson.message)

        Vibration.vibrate()
      }
      else if (code == 401 || code == 503) {
        this.setState({ isLoading: false })

        Utility.logoutOnError(this.state.authDict, this.props.navigation)
      } else {
        Alert.alert('Something went wrong!')

        Vibration.vibrate()

        //  this.refs.toast.show('Something went wrong!');

      }
    } catch (error) {
      this.setState({ isLoading: false })
      Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
      Vibration.vibrate()
      console.error(error);
    }
  }


}