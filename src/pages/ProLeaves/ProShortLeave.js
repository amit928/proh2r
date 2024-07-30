import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, FlatList, Alert, Easing, ImageBackground, ScrollView, TextInput, Button, ActivityIndicator, Vibration } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Toast, { DURATION } from 'react-native-easy-toast'
import { FloatBtnComp } from '../../components/CircularItem/FloatBtnComp';
import Moment from 'moment';
import * as Utility from '../../Externel Constant/Utility';
import Loader from '../../components/Loader';
import { Shadow } from 'react-native-shadow-2';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MyApplicationCache from '../../ReduxReducer/MyApplicationCache';
import { setMyApplicationCache } from '../../ReduxAction';
import { connect } from "react-redux";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { COLORS } from '../../Constant/Index';
import CustomTextField from '../../components/CustomTextField';
import CustomCommentInput from '../../components/CustomCommentInput';
import SwipeableList from '../../components/SwipeableList';
import DialogInput from 'react-native-dialog-input';

// let subscribe = false

const rightSwipeActions = (rejectFunc, index) => {



    // const finalWidth = Width - 240

    // const halfWidth = finalWidth / 2
    return (
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
                            tintColor: 'white'
                            // alignSelf: 'center',
                            // right: 10,

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
    );
};

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: COLORS.FormBGColor
    },

    approvedCardView: {
        height: 180,
        width: '93%',
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
        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'rgba(70,169,64,1.0)'
    },

    rejectCardView: {
        height: 180,
        width: '93%',
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
        borderColor: 'rgba(197,95,94,1.0)'

    },
    pendingCardView: {
        height: 180,
        width: '93%',
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

class ProShortLeave extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shortLeaveArr: [],
            isLoading: false,
            authDict: {},
            displayAddButton: false,
            isView: false,
            viewData: {},
            employeeProfileDetails: {},
            menuVisible: false,
            MenuItemClicked: 0,
            cancelCheck: false,
            leaveId: null,
            isListEmpty: false

        }

        // const { LoadingIndicator } = this.props
        // const { HideLoadingIndicator } = this.props
        // this.animateRotate = new Animated.Value(0)
    }

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }






    componentDidMount() {

        // subscribe = true

        KeyStore.getKey('authDict', (err, value) => {
            if (value) {



                this.setState({ authDict: value })

                console.log('authDict', value);

                this.getShortLeaves('GET', value.employeeCode, true)




            }
        });

        // KeyStore.getKey('employeeProfileDetails', (err, value) => {
        //   if (value) {
        //     console.log('employeeProfileDetails', value);
        //     if (subscribe) {
        //       this.setState({ employeeProfileDetails: value })
        //     }

        //   }
        // });

        // this.fadeAnim = new Animated.Value(0)
        // this.animatedWidth = new Animated.Value(0)
        // this.animatedHeight = new Animated.Value(0)
        // this.animatedRight = new Animated.Value(-80)

        // this.animateRotate = new Animated.Value(0)



    }

    // componentWillUnmount() {
    //   this.props?.HideLoadingIndicator()
    //   subscribe = false

    // }

    clickMenu() {

        console.log("Click Menu !");
        this.setState({ menuVisible: true });

    }

    loaderStart(shouldLoaderStart) {

        if (subscribe == false) {
            return
        }

        if (shouldLoaderStart) {
            this.setState({ isLoading: true })
        }
        else {
            this.props?.ShowLoadingIndicator()
        }



    }


    loaderEnd(shouldLoaderStop) {

        if (subscribe == false) {
            return
        }

        if (shouldLoaderStop) {
            this.setState({ isLoading: false })
        }

        else {
            this.props?.HideLoadingIndicator()
        }

    }



    //WEB API

    async getShortLeaves(methodType, code, shouldLoaderStart) {


        // this.loaderStart(shouldLoaderStart)
        this.setState({ isLoading: true })


        let url = ''

        url = Constant.BASE_URL + "short/leave/return/employee/short-leaves"

        console.log('getShortLeaves url, ', url);


        try {
            let response = await fetch(url, {
                method: methodType,
                headers: Constant.getHeader(this.state.authDict)
            }
            )
            let code = await response.status

            // this.loaderEnd(shouldLoaderStart)
            this.setState({ isLoading: false })

            if (code == 200) {

                // this.setState({ displayAddButton: true })


                let responseJson = await response.json();
              
                let arr = responseJson

                if (responseJson?.length == 0) {

                    this.setState({ isListEmpty: true });
                    return
                }

                let dataArr = []
                // let pendingArr = []
                // let cancelledArr = []
                // let rejectedArr = []

                console.log('getShortLeaves responseJson', responseJson)








                this.setState({ shortLeaveArr: responseJson })





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
            // this.loaderEnd(shouldLoaderStart)
            this.setState({ isLoading: false })
            Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
            Vibration.vibrate()
            console.error(error);
        }


    }

    async cancelShortLeaves(comment) {


        // this.loaderStart(shouldLoaderStart)
        this.setState({ isLoading: true })


        let url = ''

        url = Constant.BASE_URL + "short/leave/user"

        console.log('cancelShortLeaves url, ', url);

        const payload = {
            "action": "CANCELLED",
            "shortLeaveId": this.state.leaveId,
            "comments": comment
        }


        try {
            let response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: Constant.getHeader(this.state.authDict)
            }
            )
            let code = await response.status

            // this.loaderEnd(shouldLoaderStart)
            this.setState({ isLoading: false })

            if (code == 200) {

                // this.setState({ displayAddButton: true })


                let responseJson = await response.json();
                let arr = responseJson
                let dataArr = []
                // let pendingArr = []
                // let cancelledArr = []
                // let rejectedArr = []

                console.log('getShortLeaves responseJson', responseJson)
                Alert.alert(responseJson.message)





                this.getShortLeaves("GET")





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
            // this.loaderEnd(shouldLoaderStart)
            this.setState({ isLoading: false })
            Alert.alert("Internet connection appears to be offline. Please check your internet connection and try again.")
            Vibration.vibrate()
            console.error(error);
        }


    }





    navigate_toSecond_Screen() {
        this.props.navigation.navigate('ApplyShortLeave', { refreshList: this._refreshHistoryList, isEdit: '0' })
        // this.props.navigation.navigate('FloatingActionTest')

        //  console.log(Utility.convertToDDMMYYYY('2022-11-24'))
        //  console.log(Utility.convertToStandardDate('2022-11-24'))

        // this.props.navigation.navigate('TestPages')

        // this.props.navigation.navigate('ChartTesting')
    }

    render() {
        // const { LoadingIndicator } = this.props
        // const { HideLoadingIndicator } = this.props
        // const animatedStyle = { right: this.animatedRight }
        // const rotateStyle = { transform: [{ rotate: this.animateRotate+'deg' }] }
        // const spin = this.animateRotate.interpolate({
        //   inputRange: [0, 1],
        //   outputRange: ['45deg', '0deg']
        // })

        console.log('ref', this.refs)

        // console.log('rendring')
        return (
            <>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: COLORS.FormBGColor }}>


                    <Menu
                        onRequestClose={() => this.setState({ menuVisible: false })}
                        // children={<TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }} onPress={() => setmenuVisible(false)}></TouchableOpacity>}

                        visible={this.state.menuVisible}
                    // anchor={<Text onPress={showMenu}>Show menu</Text>}
                    // onRequestClose={hideMenu}
                    >

                        {this.state.MenuItemClicked == 0 ? <></> :

                            <MenuItem onPress={() => {

                                this.setState({ MenuItemClicked: 0, menuVisible: false })

                            }}>Show All</MenuItem>

                        }

                        {this.state.MenuItemClicked == 1 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({ MenuItemClicked: 1, menuVisible: false })

                            }}>Level 1 Pending</MenuItem>
                        }

                        {this.state.MenuItemClicked == 2 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({ MenuItemClicked: 2, menuVisible: false })

                            }}>Approved</MenuItem>
                        }

                        {this.state.MenuItemClicked == 3 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({ MenuItemClicked: 3, menuVisible: false })

                            }}>Cancelled</MenuItem>
                        }


                        {this.state.MenuItemClicked == 4 ? <></> :
                            <MenuItem onPress={() => {

                                this.setState({ MenuItemClicked: 4, menuVisible: false })

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
                        this.state.shortLeaveArr.length != 0 ?

                            <FlatList maxToRenderPerBatch={15}
                                data={this.state.shortLeaveArr}
                                showsVerticalScrollIndicator={false}

                                // ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={({ item, index }) => this.state.MenuItemClicked == 1 ? this.renderListOnlyForPending(item, index) : this.state.MenuItemClicked == 2 ? this.renderListOnlyForApproved(item, index) : this.state.MenuItemClicked == 3 ? this.renderListOnlyForCancelled(item, index) : this.state.MenuItemClicked == 4 ? this.renderListOnlyForRejected(item, index) : this.renderList(item, index)

                                }
                                keyExtractor={(item, index) => String(item.shortLeaveId)}
                            />
                            :
                            this.state.isListEmpty ?
                                <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: 'bold', color: '#A9A9A9', alignSelf: 'center', marginVertical: Dimensions.get('window').height / 3 }}> No Data Found

                                </Text>
                                : <></>


                    }


                    <FloatBtnComp clickBtn={() => {
                        // this.removeItemValue('LeaveApplicationHistory')
                        this.navigate_toSecond_Screen()
                        // this.callAPI()

                    }} />

                    {/* {this.state.displayAddButton ? <Animated.View style={[{ bottom: 60, right: 20, position: 'absolute', width: 60, height: 60 }, animatedStyle]}>
          <Shadow distance={5} containerViewStyle={{
            alignSelf: 'flex-end',
            //  alignItems: 'center',
            position: 'absolute',
          }} offset={[0.2, 2]}
            startColor='#A9A9A9'
          // finalColor='#9b9aed' 
          // corners={'bottomRight'}
          >

            <TouchableOpacity activeOpacity={0.5} style={{
              // alignSelf: 'flex-end', 



              borderRadius: 30,
              // justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 60, 
              // // shadowColor: 'grey',
              // // shadowOpacity: 3.0,
              // // elevation: 20, 
              // right: 20,
              // backgroundColor: "#0000",
              // shadowRadius: 2,
              // borderWidth: 0.4,
              // borderColor: 'grey',
              // overflow: 'hidden',
              // shadowOffset: { width: 0, height: 5, }


            }} onPress={() => {
              this.reverseAnimate()
            }
              // this.props.navigation.navigate('ApplyLeave', { refreshList: this._refreshHistoryList, isEdit: '0' })

            } >

              <Animated.Image style={{ width: 60, height: 60, resizeMode: 'contain', alignSelf: 'center', transform: [{ rotate: spin }] }} source={require('../../images/floatBtn.png')}></Animated.Image>

            </TouchableOpacity>


          </Shadow>
        </Animated.View>
          : <></>
        } */}
                    {/* New Slide View Screen */}

                    <Modal
                        visible={this.state.isView}
                        transparent={true}
                        onRequestClose={() => { this.setState({ isView: false }) }}
                        // style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        animationType='slide'
                    >


                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                justifyContent: 'center', alignItems: 'center'


                            }}>
                            <TouchableOpacity onPress={() => this.setState({ isView: false })} activeOpacity={1} style={{ height: '40%', width: '100%', }}></TouchableOpacity>




                            <View style={{ flex: 1, width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>

                                <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.7, borderColor: '#d7d0e1' }}>
                                    <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'black', fontWeight: '500', }}>{'View Application'}</Text>
                                </View>

                                <ScrollView style={{
                                    backgroundColor: '#ffff', width: '100%', height: '100%',
                                    // borderTopStartRadius: 20, borderTopEndRadius: 20,
                                    padding: 20, paddingHorizontal: 12
                                }} showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}>


                                    {/* <View style={{ width: '100%', height: 0.5, backgroundColor: 'grey', marginTop: '1.5%' }}>
                  </View> */}


                                    <CustomTextField editable={false} label='Status' value={this.state.viewData?.status} />

                                    <CustomTextField editable={false} label='Start Time' value={String(this.state.viewData?.startTime)} />

                                    <CustomTextField editable={false} label='End Time' value={String(this.state.viewData?.endTime)} />

                                    <CustomTextField editable={false} label='Total Duration (In Minutes)' value={String(this.state.viewData?.durationInMinutes)} />

                                    <CustomTextField editable={false} label='Applied By	' value={this.state.viewData?.appliedBy} />

                                    <CustomTextField editable={false} label='Applied On	' value={Utility.rawDateToDDMMYYYY_HH_MM(this.state.viewData?.appliedOn)} />

                                    <CustomCommentInput viewOnly={true} editable={false} label='Reason' value={String(this.state.viewData?.reason)} />

                                    {this.state.viewData?.comments &&

                                        <CustomCommentInput viewOnly={true} editable={false} label='Comments' value={String(this.state.viewData?.comments)} />
                                    }


                                    {this.state.viewData?.applicationRemarks && <>

                                        <CustomTextField editable={false} label='Level 1 Action Taken By' value={this.state.viewData?.applicationRemarks?.l1ApprovedBy} />

                                        <CustomTextField editable={false} label='Level 1 Action Taken On' value={this.state.viewData?.applicationRemarks?.l1ApprovedOn} />

                                        <CustomTextField editable={false} label='Level 1 Comment' value={this.state.viewData?.applicationRemarks?.l1ApprovalRemarks} />

                                        {this.state.viewData?.applicationRemarks?.l1ApprovedBy && <CustomTextField editable={false} label='Level 1 Status' value={"Level 1 Approved"} />}



                                        <CustomTextField editable={false} label='Level 2 Action Taken By' value={this.state.viewData?.applicationRemarks?.l2ApprovedBy} />

                                        <CustomTextField editable={false} label='Level 2 Action Taken On' value={this.state.viewData?.applicationRemarks?.l2ApprovedOn} />

                                        <CustomTextField editable={false} label='Level 2 Comment' value={this.state.viewData?.applicationRemarks?.l2ApprovalRemarks} />

                                        {this.state.viewData?.applicationRemarks?.l2ApprovedBy && <CustomTextField editable={false} label='Level 2 Status' value={"Level 2 Approved"} />}



                                        <CustomTextField editable={false} label='Level 3 Action Taken By' value={this.state.viewData?.applicationRemarks?.l3ApprovedBy} />

                                        <CustomTextField editable={false} label='Level 3 Action Taken On' value={this.state.viewData?.applicationRemarks?.l3ApprovedOn} />

                                        <CustomTextField editable={false} label='Level 3 Comment' value={this.state.viewData?.applicationRemarks?.l3ApprovalRemarks} />

                                        {this.state.viewData?.applicationRemarks?.l3ApprovedBy && <CustomTextField editable={false} label='Level 3 Status' value={"Level 3 Approved"} />}





                                        <CustomTextField editable={false} label='Admin Action Taken By' value={this.state.viewData?.applicationRemarks?.adminApprovedBy} />

                                        <CustomTextField editable={false} label='Admin Action Taken On' value={this.state.viewData?.applicationRemarks?.adminApprovedOn} />

                                        <CustomTextField editable={false} label='Admin Comment' value={this.state.viewData?.applicationRemarks?.adminApprovalRemarks} />

                                        {this.state.viewData?.applicationRemarks?.adminApprovedBy && <CustomTextField editable={false} label='Admin Status' value={"Admin Approved"} />}




                                        <CustomTextField editable={false} label='Cancel Action Taken By' value={this.state.viewData?.applicationRemarks?.cancelledBy} />

                                        <CustomTextField editable={false} label='Cancel Action Taken On' value={this.state.viewData?.applicationRemarks?.cancelledOn} />

                                        <CustomTextField editable={false} label='Cancel Comment' value={this.state.viewData?.applicationRemarks?.cancellationRemarks} />

                                        <CustomTextField editable={false} label='Status' value={this.state.viewData?.applicationRemarks?.cancelledByRole} />




                                        <CustomTextField editable={false} label='Reject Action Taken By' value={this.state.viewData?.applicationRemarks?.rejectedBy} />

                                        <CustomTextField editable={false} label='Reject Action Taken On' value={this.state.viewData?.applicationRemarks?.rejectedOn} />

                                        <CustomTextField editable={false} label='Reject Comment' value={this.state.viewData?.applicationRemarks?.rejectionRemarks} />

                                        <CustomTextField editable={false} label='Status' value={this.state.viewData?.applicationRemarks?.rejectedByRole} />

                                        

                                    </>
                                    }

                                    <View style={{ marginBottom: 30 }}></View>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 14, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }}>{'Status ' + ":"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 14,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(Utility.splitStatus(this.state.viewData?.status))}

                    >
                    </TextInput>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 14, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }}>{'Start Date ' + ":"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 14,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(this.state.viewData?.startDate)}

                    >
                    </TextInput>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 14, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }}>{'End Date ' + ":"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 14,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(this.state.viewData?.endDate)}

                    >
                    </TextInput>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 14, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }}>{'Total Leave Days ' + ":"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 14,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(this.state.viewData?.totalLeaves)}

                    >
                    </TextInput>
                  </View>



                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 14, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 }}>{'Reason ' + ":"}</Text>

                    <TextInput allowFontScaling={false} style={{
                      color: 'black',
                      fontSize: 14,
                      marginRight: 8,
                      paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
                      textAlign: 'left',
                      fontFamily: Constant.MontserratRegular,
                    }}
                      autoCorrect={false} keyboardType="ascii-capable" editable={false}
                      value={String(this.state.viewData?.leaveReason)}

                    >
                    </TextInput>
                  </View> */}







                                </ScrollView>
                            </View>

                        </View>

                    </Modal>

                    <Loader isLoader={this.state.isLoading}> </Loader>

                    <Toast ref="toast" />
                </View>
                <DialogInput isDialogVisible={this.state.cancelCheck}
                    title={'Confirmation'}
                    message={"Are you sure you want to cancel this leave application?"}
                    textInputProps={{ autoCorrect: false }}
                    dialogStyle={{ marginTop: -150 }}


                    hintInput={"Reason for cancellation"}

                    submitInput={(inputText) => {

                        if (inputText == '' || inputText == undefined) {

                            Alert.alert('Please Add Comment !')
                            return
                        }

                        //    if(inputText != ''){
                        this.cancelShortLeaves(inputText)
                        this.setState({ comments: inputText, cancelCheck: false })

                        // }

                    }}

                    closeDialog={() => { this.setState({ cancelCheck: false }) }}>
                </DialogInput>
            </>
        );
    }

    renderList = (item, index) => {
        const statusColor = Utility.statusColor(item.status)

        // console.log(item);

        return (
            <>

                <SwipeableList
                    title={'Short Leave'}
                    statusMain={item.status}
                    statusMainColor={statusColor}
                    onPress={() => {
                        this.setState({ isView: true })
                        this.setState({ viewData: item })

                    }}
                    fromTo={'Date: ' + item.slDate}
                    rightSwipeActions={(swipeRef) => (item.status == 'Level 1 Pending' || item.status == 'Level 2 Pending') ? rightSwipeActions(() => this.deleteAction(item), index) : <></>}
                />

                {/* <Swipeable


          renderRightActions={() => {

            if (item.status == 'LEVEL1PENDING') {
              return rightSwipeActions(() => this.deleteAction(index), index)
            }
            else return <></>

          }}

        >
          <TouchableOpacity style={{ height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '2%', marginTop: 5, backgroundColor: 'white', width: '100%' }}
            activeOpacity={1}

            onPress={() => {
              this.setState({ isView: true })
              this.setState({ viewData: item })

            }}
          >


            <Shadow distance={5} containerViewStyle={{



            }} offset={[0.2, 2]}
              startColor='#e6e6e6'

            >
              <View style={{

                borderRadius: 45,
                marginRight: 2,
                overflow: 'hidden',
                backgroundColor: 'white'
              }}>
                <Image style={{
                  width: 45, height: 45,
                  // resizeMode: 'contain', 
                  borderRadius: 22.5,
                  // borderWidth: 2
                }} source={require('../../images/userGroup.png')}></Image>
              </View>
            </Shadow>
          
            <View style={{
              flex: 1, width: '100%', height: '100%',
            
              borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
            }}>
              <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                
                <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                  <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{item.leaveType}</Text>
                  <Text allowFontScaling={false} style={item.status == "APPROVED" ? styles.approveStatus : item.status == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text>

                </View>

                <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                  <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Start Date</Text>
                  <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                </View>

                <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                  <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>End Date</Text>
                  <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                </View>

              </View>

              
              <Image style={{
                transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 7, width: 15,
                height: 15,
                resizeMode: 'contain',
              }} source={require('../../images/downArrow.png')} />





            </View>


          </TouchableOpacity>
        </Swipeable> */}

                {/*       
      <View style={item.status == "APPROVED" ? styles.approvedCardView : item.status == "REJECTED" ? styles.rejectCardView : styles.pendingCardView} key={index}> */}

                {/* <View style={{ flexDirection: 'row', marginTop: 8, marginLeft: 8, alignItems: 'center' }} >
          <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('../../images/supervisorGirl.png')}></Image>
          <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratSemiBold, fontSize: 15, padding: 4, color: 'black', marginTop: 10, flex: 1 }}>{item.leaveType}</Text> */}

                {/* {
     item.status == 'LEVEL1PENDING' || item.status == 'LEVEL2PENDING'
      ?  
      <TouchableOpacity style={{marginRight:10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.editAction(index)} >

      <Image style={{ width: 20, height: 20,resizeMode:'contain' }}
        source={require('../../images/editGray.png')}
      />
    </TouchableOpacity>

     :
     <></>
 } */}


                {/* {
            item.status == 'LEVEL1PENDING'
              ?
              <TouchableOpacity style={{ marginRight: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.deleteAction(index)} >

                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                  source={require('../../images/deleteGray.png')}
                />
              </TouchableOpacity>
              :
              <></>
          }

        </View>

        <View style={{ flexDirection: 'row', height: 50 }}>
          <View style={{ flex: 2, marginLeft: 16 }}>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Start Date</Text>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

          </View>
          <View style={{ flex: 2 }}>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>End Date</Text>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>


          </View>
        </View>

        <View style={{ flexDirection: 'row', height: 50 }}>
          <View style={{ flex: 2, marginLeft: 16 }}>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Total leave days</Text>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'black', paddingTop: 4, paddingLeft: 16 }}>{item.totalLeaves + " days"}</Text>

          </View>
          <View style={{ flex: 2 }}>
            <Text allowFontScaling={false} style={{ fontFamily: Constant.MontserratRegular, fontSize: 12, color: 'rgba(148,149,150,1.0)', paddingTop: 16, paddingLeft: 16 }}>Status</Text>
            <Text allowFontScaling={false} style={item.status == "APPROVED" ? styles.approveStatus : item.status == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text> */}

                {/* </View> */}
                {/* </View> */}

                {/* </View> */}
            </>);
    }

    renderListOnlyForPending = (item, index) => {
        const statusColor = Utility.statusColor(item.status)
        return (<>
            {item.status == 'LEVEL1PENDING' ?


                <SwipeableList
                    title={'Short Leave'}
                    statusMain={item.orgStatus}
                    statusMainColor={statusColor}
                    onPress={() => {
                        this.setState({ isView: true })
                        this.setState({ viewData: item })

                    }}
                    fromTo={'Date: ' + slDate}
                //   rightSwipeActions={(swipeRef) => (item.status == 'LEVEL1PENDING') ? rightSwipeActions(() => this.deleteAction(index), index) : <></>}
                />


                // <Swipeable


                //   renderRightActions={() => {

                //     if (item.status == 'LEVEL1PENDING') {
                //       return rightSwipeActions(() => this.deleteAction(index), index)
                //     }
                //     else return <></>

                //   }}

                // >
                //   <TouchableOpacity style={{ height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '2%', marginTop: 5, backgroundColor: 'white', width: '100%' }}
                //     activeOpacity={1}

                //     onPress={() => {
                //       this.setState({ isView: true })
                //       this.setState({ viewData: item })

                //     }}
                //   >
                //     {/* Image */}

                //     <Shadow distance={5} containerViewStyle={{



                //     }} offset={[0.2, 2]}
                //       startColor='#e6e6e6'

                //     >
                //       <View style={{
                //         // borderWidth: 0.7,
                //         borderRadius: 45,
                //         marginRight: 2,
                //         overflow: 'hidden',
                //         backgroundColor: 'white'
                //       }}>
                //         <Image style={{
                //           width: 45, height: 45,
                //           // resizeMode: 'contain', 
                //           borderRadius: 22.5,
                //           // borderWidth: 2
                //         }} source={require('../../images/userGroup.png')}></Image>
                //       </View>
                //     </Shadow>
                //     {/* Text Bar Container */}
                //     <View style={{
                //       flex: 1, width: '100%', height: '100%',
                //       // borderTopWidth: 0.4, 
                //       borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
                //     }}>
                //       <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                //         {/* All Text  */}
                //         <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //           <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{item.leaveType}</Text>
                //           <Text allowFontScaling={false} style={item.status == "APPROVED" ? styles.approveStatus : item.status == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text>

                //         </View>

                //         <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //           <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Start Date</Text>
                //           <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //         </View>

                //         <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //           <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>End Date</Text>
                //           <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //         </View>

                //       </View>

                //       {/* Arrow Image */}
                //       <Image style={{
                //         transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 7, width: 15,
                //         height: 15,
                //         resizeMode: 'contain',
                //       }} source={require('../../images/downArrow.png')} />





                //     </View>


                //   </TouchableOpacity>
                // </Swipeable>

                :

                <></>
            }
        </>);
    }


    renderListOnlyForApproved = (item, index) =>
        <>
            {item.status == 'APPROVED' ?

                <SwipeableList
                    title={item.leaveType}
                    statusMain={item.orgStatus}
                    statusMainColor={Utility.statusColor(item.status)}
                    onPress={() => {
                        this.setState({ isView: true })
                        this.setState({ viewData: item })

                    }}
                    fromTo={'From ' + item.startDate + ' to ' + item.endDate}
                />

                // <TouchableOpacity style={{ height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '2%', marginTop: 5, backgroundColor: 'white', width: '100%' }}
                //   activeOpacity={1}

                //   onPress={() => {
                //     this.setState({ isView: true })
                //     this.setState({ viewData: item })

                //   }}
                // >
                //   {/* Image */}

                //   <Shadow distance={5} containerViewStyle={{

                //     //  alignItems: 'center',

                //   }} offset={[0.2, 2]}
                //     startColor='#e6e6e6'
                //   // finalColor='#9b9aed' 
                //   // corners={'bottomRight'}
                //   >
                //     <View style={{
                //       // borderWidth: 0.7,
                //       borderRadius: 45,
                //       marginRight: 2,
                //       overflow: 'hidden',
                //       backgroundColor: 'white'
                //     }}>
                //       <Image style={{
                //         width: 45, height: 45,
                //         // resizeMode: 'contain', 
                //         borderRadius: 22.5,
                //         // borderWidth: 2
                //       }} source={require('../../images/userGroup.png')}></Image>
                //     </View>
                //   </Shadow>
                //   {/* Text Bar Container */}
                //   <View style={{
                //     flex: 1, width: '100%', height: '100%',
                //     // borderTopWidth: 0.4, 
                //     borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
                //   }}>
                //     <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                //       {/* All Text  */}
                //       <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{item.leaveType}</Text>
                //         <Text allowFontScaling={false} style={item.status == "APPROVED" ? styles.approveStatus : item.status == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text>

                //       </View>

                //       <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Start Date</Text>
                //         <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //       </View>

                //       <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>End Date</Text>
                //         <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //       </View>

                //     </View>

                //     {/* Arrow Image */}
                //     <Image style={{
                //       transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 7, width: 15,
                //       height: 15,
                //       resizeMode: 'contain',
                //     }} source={require('../../images/downArrow.png')} />





                //   </View>


                // </TouchableOpacity>


                :

                <></>
            }
        </>


    renderListOnlyForCancelled = (item, index) =>
        <>
            {item.status == 'CANCELLED' ?


                // <TouchableOpacity style={{ height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '2%', marginTop: 5, backgroundColor: 'white', width: '100%' }}
                //   activeOpacity={0.5}

                //   onPress={() => {
                //     this.setState({ isView: true })
                //     this.setState({ viewData: item })

                //   }}
                // >
                //   {/* Image */}

                //   <Shadow distance={5} containerViewStyle={{

                //     //  alignItems: 'center',

                //   }} offset={[0.2, 2]}
                //     startColor='#e6e6e6'
                //   // finalColor='#9b9aed' 
                //   // corners={'bottomRight'}
                //   >
                //     <View style={{
                //       // borderWidth: 0.7,
                //       borderRadius: 45,
                //       marginRight: 2,
                //       overflow: 'hidden',
                //       backgroundColor: 'white'
                //     }}>
                //       <Image style={{
                //         width: 45, height: 45,
                //         // resizeMode: 'contain', 
                //         borderRadius: 22.5,
                //         // borderWidth: 2
                //       }} source={require('../../images/userGroup.png')}></Image>
                //     </View>
                //   </Shadow>
                //   {/* Text Bar Container */}
                //   <View style={{
                //     flex: 1, width: '100%', height: '100%',
                //     // borderTopWidth: 0.4, 
                //     borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
                //   }}>
                //     <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                //       {/* All Text  */}
                //       <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{item.leaveType}</Text>
                //         <Text allowFontScaling={false} style={item.status == "APPROVED" ? styles.approveStatus : item.status == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text>

                //       </View>

                //       <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Start Date</Text>
                //         <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //       </View>

                //       <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>End Date</Text>
                //         <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //       </View>

                //     </View>

                //     {/* Arrow Image */}
                //     <Image style={{
                //       transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 7, width: 15,
                //       height: 15,
                //       resizeMode: 'contain',
                //     }} source={require('../../images/downArrow.png')} />





                //   </View>


                // </TouchableOpacity>

                <SwipeableList
                    title={item.leaveType}
                    statusMain={item.orgStatus}
                    statusMainColor={Utility.statusColor(item.status)}
                    onPress={() => {
                        this.setState({ isView: true })
                        this.setState({ viewData: item })

                    }}
                    fromTo={'From ' + item.startDate + ' to ' + item.endDate}
                />


                :

                <></>
            }
        </>

    renderListOnlyForRejected = (item, index) =>
        <>
            {item.status == 'REJECTED' ?


                // <TouchableOpacity style={{ height: 70, flexDirection: 'row', alignItems: 'center', padding: 2, marginLeft: '2%', marginTop: 5, backgroundColor: 'white', width: '100%' }}
                //   activeOpacity={0.5}

                //   onPress={() => {
                //     this.setState({ isView: true })
                //     this.setState({ viewData: item })

                //   }}
                // >
                //   {/* Image */}

                //   <Shadow distance={5} containerViewStyle={{

                //     //  alignItems: 'center',

                //   }} offset={[0.2, 2]}
                //     startColor='#e6e6e6'
                //   // finalColor='#9b9aed' 
                //   // corners={'bottomRight'}
                //   >
                //     <View style={{
                //       // borderWidth: 0.7,
                //       borderRadius: 45,
                //       marginRight: 2,
                //       overflow: 'hidden',
                //       backgroundColor: 'white'
                //     }}>
                //       <Image style={{
                //         width: 45, height: 45,
                //         // resizeMode: 'contain', 
                //         borderRadius: 22.5,
                //         // borderWidth: 2
                //       }} source={require('../../images/userGroup.png')}></Image>
                //     </View>
                //   </Shadow>
                //   {/* Text Bar Container */}
                //   <View style={{
                //     flex: 1, width: '100%', height: '100%',
                //     // borderTopWidth: 0.4, 
                //     borderBottomWidth: 0.4, borderColor: '#B5B5B5', flexDirection: 'row'
                //   }}>
                //     <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%' }}>

                //       {/* All Text  */}
                //       <View style={{ width: '38.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>{item.leaveType}</Text>
                //         <Text allowFontScaling={false} style={item.status == "APPROVED" ? styles.approveStatus : item.status == "REJECTED" ? styles.rejectStatus : styles.pendingStatus}>{item.orgStatus}</Text>

                //       </View>

                //       <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>Start Date</Text>
                //         <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.startDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //       </View>

                //       <View style={{ width: '33.33%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>

                //         <Text style={{ fontWeight: 'bold', fontSize: 12, fontFamily: Constant.MontserratRegular }}>End Date</Text>
                //         <Text style={{ fontSize: 12, color: '#686868', fontFamily: Constant.MontserratRegular }}>{Moment(String(item.endDate) + ' 00:00:00').format('DD-MM-YYYY')}</Text>

                //       </View>

                //     </View>

                //     {/* Arrow Image */}
                //     <Image style={{
                //       transform: [{ rotate: '270deg' }], marginTop: 12, marginRight: 7, width: 15,
                //       height: 15,
                //       resizeMode: 'contain',
                //     }} source={require('../../images/downArrow.png')} />





                //   </View>


                // </TouchableOpacity>

                <SwipeableList
                    title={item.leaveType}
                    statusMain={item.orgStatus}
                    statusMainColor={Utility.statusColor(item.status)}
                    onPress={() => {
                        this.setState({ isView: true })
                        this.setState({ viewData: item })

                    }}
                    fromTo={'From ' + item.startDate + ' to ' + item.endDate}
                />


                :

                <></>
            }
        </>


    editAction(index) {

        let obj = this.state.shortLeaveArr[index]
        var isEdit = "1"
        //  this.props.editAction(obj,isEdit)

        this.props.navigation.navigate('ApplyLeave', { refreshList: this._refreshHistoryList, isEdit: isEdit, data: obj })

    }

    deleteAction(leave) {

        console.log('deleteAction', leave);

        this.setState({ cancelCheck: true, leaveId: leave.shortLeaveId })

        return


        // Alert.alert(
        //     'Confirmation',
        //     'Are you sure you want to delete this leave.',
        //     [
        //         { text: 'Cancel' },
        //         {
        //             text: 'OK', onPress: () =>

        // this.getShortLeaves('PUT', this.state.shortLeaveArr[index].leaveId, true)
        //         },

        //     ],
        //     { cancelable: false },
        // );
    }

    _refreshHistoryList = (status) => {

        this.getShortLeaves('GET', this.state.authDict.employeeCode, status)

    }





}


// const mapStateToProps = (state) => {
//   return {
//     MyApplicationCache: state.MyApplicationCache
//   };
// };

// const mapDispatchToProps = {
//   setMyApplicationCache
// };


// export default connect(mapStateToProps, mapDispatchToProps)(MyApplication);
export default ProShortLeave;
