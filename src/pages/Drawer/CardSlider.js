import React, { Component, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import * as Constant from '../../Constant/Constants';
import DashboardHeader from '../../components/DashboardHeader';
import KeyModule from '../../components/KeyModuleComponent';
import OrganizationAnnoncement from '../../components/OrganizationAnnoncementComponent';
import EmployeeConnect from '../../components/EmployeeConnectComponent';
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from '../../Constant/Index';
import { Pages } from 'react-native-pages';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
const enableWorkaround = true;
const ScrollViewComponent = enableWorkaround ? GestureHandlerScrollView : ScrollView;





const CardSlider = ({ WINDOW_WIDTH, leaveArr, expenseArr, attendanceArr, arrowShadowColor, navigation, reloadLeaveSummary }) => {

  // console.log('CardSlider', (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2) + 15));

  const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2));

  console.log('CardSlider', cardSize);

  // const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2) + 15);
  

  const styles = StyleSheet.create({

    cardViewOuterShadow:{shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,},

    cardView: {
      height: 180,
      // width: (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2) + 15),
      width: (cardSize) - (cardSize / 19),
      backgroundColor: 'white',
      // marginLeft: 8,
      

      shadowColor: 'gray',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,
      elevation: 3,
      marginLeft: 8,
      
      borderRadius: 25,
      marginRight: 8,
      // paddingTop: 5,
      alignSelf: 'center',
      // borderWidth: 2,
      // borderColor: 'red',
      // resizeMode: 'contain',
      //                           alignItems: 'center',
      //                           justifyContent: 'center',

      marginBottom: 25,
      overflow: 'hidden'

    },
    cardViewAttendance: {
      height: 170,
      width: 290,
      backgroundColor: 'white',
      marginLeft: 8,

      shadowColor: 'gray',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,
      elevation: 3,
      margin: 8,
      borderRadius: 12,
      marginLeft: 16,
    },

    scrollViewCard: {
      // shadowOffset: { width: 0.5, height: 0.5 },
      // shadowColor: 'gray',
      // shadowOpacity: 3.0,
      // backgroundColor: 'rgba(240,240,240,1.0)',
      // height: 100,
      marginTop: -70,
      // marginBottom: 10,


    },

    arrowBtnShadow: {
      marginRight: 10,
      marginBottom: 5
    },

    arrowBtn: { borderRadius: 6, padding: 7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7FF', borderColor: '#0800CA', borderWidth: 0.5 },

    arrowBtnImg: {
      height: 10, width: 10, resizeMode: 'contain',  
    },

    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingLeft: 10
    },
    circleSizes:{ alignItems: 'center', width: cardSize / 3.3,   },



AttandaceView: {
  height: 17.5,
  width: 300,
  flexDirection: 'row',
  margin: 3,
  alignSelf: 'center',
  paddingHorizontal: 10
 
},

Day: {
  fontFamily: Constant.MontserratSemiBold,
                    fontSize: 12,
                    width: 90, 
                    color: 'black'
                    // backgroundColor: 'red'
},

DotContainer: {
  marginTop: 2, height: 17.5,  width: 30, justifyContent: 'center', alignItems: 'flex-start',
},

Dot: {width: 8, height: 8,  borderRadius: 4, 
  backgroundColor: 'white',
  },
  
  CheckIn: {
      fontFamily: Constant.MontserratSemiBold,
                    fontSize: 12,
                    width: 90,
                    color: 'black'
                    
  },

  CheckOut: {
      fontFamily: Constant.MontserratSemiBold,
      fontSize: 12,
      width: 90,
      color: 'black'
  
    },

    AttandaceViewContentMargin:{
      marginTop: 2,  justifyContent: 'center'
    }



  });

 


  return (

    // <View
    //   // onPress= {()=>{console.log(WINDOW_WIDTH);}} 
    //   style={{
    //     display: 'flex',
    //     height: 221,
    //     marginTop: -70,
    //     // borderWidth: 1,
    //     // borderColor: 'red',
    //     // width: '100%'
    //     flexDirection: 'row'
    //   }}>
      
    <ScrollView
        // nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewCard}>

        {/* Leave Card View*/}

      <View style={styles.cardViewOuterShadow}>

        <View style={styles.cardView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: 10,
              // marginLeft: 20,
              marginBottom: 15,
              marginRight: 10,
              justifyContent: 'space-between'
            }}>
            <View style={{ display: 'flex', flexDirection: 'row', overflow:'hidden',   }}>
              <Image
                style={{ height: 55, width: 55, resizeMode: 'stretch' }}
                source={require('../../images/leaveNewIcon.png')}></Image>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 15,
                  padding: 8,
                  top: '5%'
                }}>
                Leave Summary
              </Text>
            </View>
            {/* <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
              startColor={arrowShadowColor}
            // finalColor='#9b9aed' 
            // corners={'bottomRight'}
            > */}
              <TouchableOpacity onPress={() => {
                 navigation.navigate('LeaveTab', {"tabIndex": 0, "openApplyReg": false, reloadLeaveSummary: reloadLeaveSummary}) 

                //  reloadLeaveSummary()
                
                }
                } style={styles.arrowBtn
              } >

                <Image
                  style={styles.arrowBtnImg}
                  source={require('../../images/arrowRight.png')}></Image>

              </TouchableOpacity>
            {/* </Shadow> */}
          </View>

          <View style={{ flexDirection: 'row',  
          // justifyContent:"center", flex: 1, backgroundColor: 'white'
          }}>
            <ScrollViewComponent
              nestedScrollEnabled={true}
              scrollEnabled={leaveArr?.length <= 3 ? false : true}
              contentContainerStyle={styles.scrollContainer}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {leaveArr.length != 0 ? (leaveArr.map((subItem, index) => (
                <View
                  style={styles.circleSizes}
                  key={index}>
                  <View
                    style={{
                      height: WINDOW_WIDTH / 6,
                      width: WINDOW_WIDTH / 6,
                      // borderRadius: ((((cardSize/2)/2)/1.5)+8)/3,
                      borderRadius: ((WINDOW_WIDTH / 6) / 2) / 2,
                      // borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
                      borderWidth: 1,
                      // borderColor: 'rgba(229,229,229,1.0)',
                      borderColor: '#B4C3D6',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: '#181818',
                        fontFamily: Constant.MontserratSemiBold,
                        fontSize: 15,
                        padding: 2,
                      }}>{subItem.remainLeave}</Text>
                    <View style={{  borderColor: '#B4C3D6', width: ((((cardSize/2)/2)/1.5)+8)/2, backgroundColor: '#B4C3D6', height: 0.7}}></View>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: '#181818',
                        fontFamily: Constant.MontserratSemiBold,
                        fontSize: 15,
                        padding: 2,
                      }}>{subItem.totalLeave}</Text>
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: '#181818',
                      fontFamily: Constant.MontserratRegular,
                      fontSize: 12,
                      padding: 8,
                    }}
                    numberOfLines={1}>
                    {subItem.leaveName}
                  </Text>
                </View>
              ))): (<View
              style={{
                alignItems: 'center',
                width: 280,
                height: 75,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{ height: 40, width: 40, resizeMode: 'contain' }}
                source={require('../../images/noDataFound.png')}></Image>
              <Text
                allowFontScaling={false}
                style={{
                  color: '#999999',
                  fontFamily: Constant.MontserratRegular,
                  fontSize: 12,
                  paddingTop: 8,
                }}
                numberOfLines={1}>
                No Leave Found.
              </Text>
            </View>)}
            </ScrollViewComponent>

            {/* <ActivityIndicator size={'large'} style={{alignSelf: 'flex-start', marginTop: 20}}/> */}
          </View>

          {/* <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#f2f2f2',
                  height: 25,
                  width: 100,
                  justifyContent: 'center',
                  borderRadius: 4,
                  position: 'absolute',
                  bottom: 12,
                }}
                onPress={() => this.props.navigation.navigate('LeaveTab')}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratBold,
                    color: '#2b66b6',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity> */}
        </View>

        </View>

        {/* Expense Card */}

        <View style={styles.cardViewOuterShadow}>

        <View style={styles.cardView}>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 10,
              // marginLeft: 20,
              marginBottom: 15,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <View style={{ display: 'flex', flexDirection: 'row', overflow:'hidden' }}>
              <Image
                style={{ height: 56, width: 56,  }}
                source={require('../../images/expenseNewIcon.png')}></Image>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 15,
                  padding: 8,
                  top: '5%'
                }}>
                Expenses
              </Text>
            </View>
            {/* <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
              startColor={arrowShadowColor}
            // finalColor='#9b9aed' 
            // corners={'bottomRight'}
            > */}
              <TouchableOpacity onPress={() => { navigation.navigate('ProExpenseTab', {"tabIndex": 0, "openApplyReg": false}) }} style={styles.arrowBtn
              } >

                <Image
                  style={styles.arrowBtnImg}
                  source={require('../../images/arrowRight.png')}></Image>

              </TouchableOpacity>
            {/* </Shadow> */}
          </View>

          <View style={{ flexDirection: 'row', bottom: '2%' }}>
            <ScrollViewComponent
              nestedScrollEnabled={true}
              scrollEnabled={expenseArr?.length <= 3 ? false : true}
              contentContainerStyle={styles.scrollContainer}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {expenseArr.length != 0 ? (
                expenseArr.map((item, index) => (
                  <View
                    style={styles.circleSizes}
                    key={index}>
                    <View
                      style={{ height: 70, width: 70, flexDirection: 'row' }}>
                      <View
                        style={
                          item.status == 'APPROVED'
                            ? {
                              // height: ((((cardSize/2)/2)/1.5)+8),
                              // width: ((((cardSize/2)/2)/1.5)+8),
                              // borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
                              // borderWidth: 2,
                              // borderColor: 'rgba(94,184,45,1.0)',
                              // alignItems: 'center',
                              // justifyContent: 'center',
                              // height: ((((cardSize/2)/2)/1.5)+8),
                          width: ((((cardSize/2)/2)/1.5)+8),
                          height: ((((cardSize/2)/2)/1.5)+8),
                          borderRadius: ((((cardSize/2)/2)/1.5)+8)/3,
                          // borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
                          borderWidth: 1,
                          // borderColor: 'rgba(229,229,229,1.0)',
                          borderColor: 'rgba(94,184,45,1.0)',
                          alignItems: 'center',
                          justifyContent: 'center',
                            }
                            : item.status == 'REJECTED'
                              ? {
                                // height: 70,
                                // width: 70,
                                // borderRadius: 35,
                                // borderWidth: 2,
                                // borderColor: 'rgba(250,52,53,1.0)',
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                width: ((((cardSize/2)/2)/1.5)+8),
                                height: ((((cardSize/2)/2)/1.5)+8),
                          borderRadius: ((((cardSize/2)/2)/1.5)+8)/3,
                          // borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
                          borderWidth: 1,
                          // borderColor: 'rgba(229,229,229,1.0)',
                          borderColor: 'rgba(250,52,53,1.0)',
                          alignItems: 'center',
                          justifyContent: 'center',
                              }
                              : {
                                // height: 70,
                                // width: 70,
                                // borderRadius: 35,
                                // borderWidth: 2,
                                // borderColor: 'rgba(240,193,45,1.0)',
                                // alignItems: 'center',
                                // justifyContent: 'center',

                                width: ((((cardSize/2)/2)/1.5)+8),
                          height: ((((cardSize/2)/2)/1.5)+8),
                          borderRadius: ((((cardSize/2)/2)/1.5)+8)/3,
                          // borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
                          borderWidth: 1,
                          // borderColor: 'rgba(229,229,229,1.0)',
                          borderColor: 'rgba(240,193,45,1.0)',
                          alignItems: 'center',
                          justifyContent: 'center',
                              }
                        }>
                        <Text
                          allowFontScaling={false}
                          style={
                            item.status == 'APPROVED'
                              ? {
                                color: 'rgba(94,184,45,1.0)',
                                fontFamily: Constant.MontserratSemiBold,
                                fontSize: 15,
                              }
                              : item.status == 'REJECTED'
                                ? {
                                  color: 'rgba(250,52,53,1.0)',
                                  fontFamily: Constant.MontserratSemiBold,
                                  fontSize: 15,
                                }
                                : {
                                  color: 'rgba(240,193,45,1.0)',
                                  fontFamily: Constant.MontserratSemiBold,
                                  fontSize: 15,
                                }
                          }>
                          {item.reimbursement}
                        </Text>
                      </View>

                      <Image
                        style={{
                          height: 20,
                          width: 20,
                          resizeMode: 'contain',
                          top: 23,
                          right: 6,
                        }}
                        source={
                          item.status == 'APPROVED'
                            ? require('../../images/verified.png')
                            : item.status == 'REJECTED'
                              ? require('../../images/remove.png')
                              : require('../../images/pending.png')
                        }></Image>
                    </View>

                    <Text
                      allowFontScaling={false}
                      style={{
                        color: '#181818',
                        fontFamily: Constant.MontserratSemiBold,
                        fontSize: 11,
                        padding: 8,
                      }}
                      numberOfLines={1}>
                      {item.reportTitle}
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    width: 280,
                    height: 75,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{ height: 40, width: 40, resizeMode: 'contain' }}
                    source={require('../../images/noDataFound.png')}></Image>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: '#999999',
                      fontFamily: Constant.MontserratRegular,
                      fontSize: 12,
                      paddingTop: 8,
                    }}
                    numberOfLines={1}>
                    No Expense Found.
                  </Text>
                </View>
              )}
            </ScrollViewComponent>
          </View>

          {/* <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#f2f2f2',
                  height: 25,
                  width: 100,
                  justifyContent: 'center',
                  borderRadius: 4,
                  position: 'absolute',
                  bottom: 12,
                }}
                onPress={() => this.props.navigation.navigate('ProExpenseTab')}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratBold,
                    color: '#2b66b6',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity> */}
        </View>
        </View>
        {/* Attendance View */}
        <View style={styles.cardViewOuterShadow}>
        <View style={styles.cardView}>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 10,
              // marginLeft: 10,
              marginBottom: 10,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <View style={{ display: 'flex', flexDirection: 'row', overflow:'hidden', }}>
              <Image
                style={{ height: 56, width: 56, resizeMode: 'stretch' }}
                source={require('../../images/attendanceNewDesign.png')}></Image>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: Constant.MontserratSemiBold,
                  fontSize: 15,
                  padding: 8,
                  top: '5%'
                }}>
                Attendance
              </Text>
            </View>

            {/* <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
              startColor={arrowShadowColor}
            // finalColor='#9b9aed' 
            // corners={'bottomRight'}
            > */}
              <TouchableOpacity onPress={() => { navigation.navigate('AttendanceTab', {"tabIndex": 0, "openApplyReg": false}) }} style={styles.arrowBtn
              } >

                <Image
                  style={styles.arrowBtnImg}
                  source={require('../../images/arrowRight.png')}></Image>

              </TouchableOpacity>
            {/* </Shadow> */}

          </View>

          <ScrollViewComponent showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ marginBottom: 20, bottom: '2%' }}>
          <View
                style={[styles.AttandaceView, {backgroundColor: '#f2f2f2', }]}
                >
                <View style={styles.AttandaceViewContentMargin}>
                  <Text
                    allowFontScaling={false}
                    style={styles.Day}>{'Day'}</Text>
                  
                </View>
                <View style={styles.DotContainer}>
                  
                  <View style={[styles.Dot, {backgroundColor: '#f2f2f2'} ]}>

                  </View>
                  
                </View>
                <View style={styles.AttandaceViewContentMargin}>
                  <Text
                    allowFontScaling={false}
                    style={styles.CheckIn}>
                    Check In
                  </Text>
                  
                </View>
                <View style={styles.AttandaceViewContentMargin}>
                  <Text
                    allowFontScaling={false}
                    style={styles.CheckOut}>
                    Check Out
                  </Text>
                  
                </View>
              </View>
            {attendanceArr.map((item, index) => (
              <View
                style={styles.AttandaceView}
                key={index}>
                <View style={styles.AttandaceViewContentMargin}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.Day, {fontFamily: Constant.MontserratRegular}]}>
                    {item.day}
                  </Text>
                  
                </View>
                <View style={styles.DotContainer}>
                  
                  <View style={[styles.Dot, {backgroundColor: item.punchIn == "WEEK OFF" ? "#C9C9C9" : item.punchIn == "--:--" || item.punchOut == "--:--" || item.punchIn == "00:00" || item.punchOut == "00:00" ? "#FB0007" : "#0F7001"  } ]}>

                  </View>
                  
                </View>
                <View style={ styles.AttandaceViewContentMargin }>
                  <Text
                    allowFontScaling={false}
                    style={[styles.CheckIn,{fontFamily: Constant.MontserratRegular, color: item.punchIn == "WEEK OFF" ? "black" : item.punchIn == "--:--"  || item.punchIn == "00:00"  ? "#FB0007" : "#194299" }]}>
                    {item.punchIn}
                  </Text>
                </View>
                <View style={ styles.AttandaceViewContentMargin }>
                  <Text
                    allowFontScaling={false}
                    style={[styles.CheckOut, {fontFamily: Constant.MontserratRegular, fontFamily: Constant.MontserratRegular, color: item.punchOut == "WEEK OFF" ? "black" : item.punchOut == "--:--"  || item.punchOut == "00:00"  ? "#FB0007" : "#194299"}]}>
                    {item.punchOut}
                  </Text>
                  
                </View>
              </View>
            ))}


    <View style={{ height: 1,
                      width: 300,
                      
                      margin: 3,
                      alignSelf: 'center',
                      backgroundColor: '#DDDDDD',
                      marginTop: 10
                      // paddingHorizontal: 10
                    
                    }}
                    />

            <View
                style={{
                  height: 17.5,
                  width: 300,
                  flexDirection: 'row',
                  margin: 3,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  marginTop: 10
                 
                }}
                >

                  <View style={{ flexDirection: 'row',  alignItems: 'center', width: 150}}>
                  
                        <View style={{width: 8, height: 8,  borderRadius: 4, 
                              backgroundColor: '#0F7001', marginRight: 10
                              }}>

                        </View>
        
                          <Text allowFontScaling={false}  style={{fontFamily: Constant.MontserratRegular,
                            fontSize: 12,
                            color: 'black'}}>Present</Text>

                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 150}}>
                  
                        <View style={{width: 8, height: 8,  borderRadius: 4, 
                              backgroundColor: '#C9C9C9', marginRight: 10
                              }}>

                        </View>
        
                          <Text allowFontScaling={false}  style={{fontFamily: Constant.MontserratRegular,
                            fontSize: 12,
                            color: 'black'}}>Week Off</Text>

                  </View>

                  


                </View>

                <View
                style={{
                  height: 17.5,
                  width: 300,
                  flexDirection: 'row',
                  margin: 3,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  // marginTop: 10
                 
                }}
                >

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 150}}>
                  
                        <View style={{width: 8, height: 8,  borderRadius: 4, 
                              backgroundColor: '#FB0007', marginRight: 10
                              }}>

                        </View>
        
                          <Text  allowFontScaling={false} style={{fontFamily: Constant.MontserratRegular,
                            fontSize: 12,
                            color: 'black'}}>Absent</Text>

                  </View>

                 

                  


                </View>


          </ScrollViewComponent>
        </View>
        </View>

        </ScrollView>
      
    // </View>
  );



}

export default CardSlider


// const CardSlider = ({ WINDOW_WIDTH, leaveArr, expenseArr, attendanceArr, arrowShadowColor, navigation }) => {

//   /
//   console.log('CardSlider', (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2)));

  
//   const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2));

//   const styles = StyleSheet.create({
//     cardView: {
//       height: 180,
      
//       width: (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2)) + 3,
//       backgroundColor: 'white',
    

//       shadowColor: 'gray',
//       shadowOffset: {
//         width: 0,
//         height: 6,
//       },
//       shadowOpacity: 0.39,
//       shadowRadius: 8.3,
//       elevation: 3,
      
//       borderRadius: 25,
      
//       paddingTop: 5,
//       paddingBottom: 5,
//       alignSelf: 'center',
      
//     },
//     cardViewAttendance: {
//       height: 170,
//       width: 290,
//       backgroundColor: 'white',
//       marginLeft: 8,

//       shadowColor: 'gray',
//       shadowOffset: {
//         width: 0,
//         height: 6,
//       },
//       shadowOpacity: 0.39,
//       shadowRadius: 8.3,
//       elevation: 3,
//       margin: 8,
//       borderRadius: 12,
//       marginLeft: 16,
//     },

//     scrollViewCard: {
//       shadowOffset: { width: 0.5, height: 0.5 },
//       shadowColor: 'gray',
//       shadowOpacity: 3.0,
//       backgroundColor: 'rgba(240,240,240,1.0)',
//       height: 100,
//     },

//     arrowBtnShadow: {
//       marginRight: 10,
//       marginBottom: 5
//     },

//     arrowBtn: { borderRadius: 6, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderColor: '#0800CA', borderWidth: 0.5 },

//     arrowBtnImg: {
//       height: 15, width: 15, resizeMode: 'contain', transform: [{ rotate: '270deg' }], tintColor: '#0800CA'
//     },

//     scrollContainer: {
//       flexGrow: 1,
//       justifyContent: 'center',
//       paddingLeft: 10
//     },
//     circleSizes:{ alignItems: 'center', width: 120,   }

//   });

//   const pagesRef = useRef()


//   function scrollTo() {

//     pagesRef.current.scrollToPage(0, true)

//   }

//   useEffect(() => {


//     console.log('OrganizationAnnoncement', pagesRef);


//   }, [])


//   return (

//     <View
     
//       style={{
//         height: 221,
//         marginTop: -70,
        
//       }}>
//       <Pages ref={pagesRef}>


//         {/* Leave Card View*/}
//         <View style={styles.cardView}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginTop: 10,
//               marginLeft: 20,
//               marginBottom: 15,
//               marginRight: 10,
//               justifyContent: 'space-between'
//             }}>
//             <View style={{ display: 'flex', flexDirection: 'row' }}>
//               <Image
//                 style={{ height: 30, width: 30, resizeMode: 'contain' }}
//                 source={require('../../images/leave.png')}></Image>
//               <Text
//                 allowFontScaling={false}
//                 style={{
//                   fontFamily: Constant.MontserratSemiBold,
//                   fontSize: 15,
//                   padding: 8,
//                 }}>
//                 Leave Summary
//               </Text>
//             </View>
//             <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
//               startColor={arrowShadowColor}
//             // finalColor='#9b9aed' 
//             // corners={'bottomRight'}
//             >
//               <TouchableOpacity onPress={() => { navigation.navigate('LeaveTab') }} style={styles.arrowBtn
//               } >

//                 <Image
//                   style={styles.arrowBtnImg}
//                   source={require('../../images/downArrow.png')}></Image>

//               </TouchableOpacity>
//             </Shadow>
//           </View>

//           <View style={{ flexDirection: 'row' }}>
//             <ScrollViewComponent
//               nestedScrollEnabled={true}
//               contentContainerStyle={styles.scrollContainer}
//               horizontal
//               showsHorizontalScrollIndicator={false}>
//               {leaveArr.map((subItem, index) => (
//                 <View
//                   style={styles.circleSizes}
//                   key={index}>
//                   <View
//                     style={{
//                       height: ((((cardSize/2)/2)/1.5)+8),
//                       width: ((((cardSize/2)/2)/1.5)+8),
//                       borderRadius: ((((cardSize/2)/2)/1.5)+8)/3,
//                       // borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
//                       borderWidth: 1,
//                       // borderColor: 'rgba(229,229,229,1.0)',
//                       borderColor: '#B4C3D6',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
//                     <Text
//                       allowFontScaling={false}
//                       style={{
//                         color: '#181818',
//                         fontFamily: Constant.MontserratRegular,
//                         fontSize: 15,
//                         padding: 2,
//                       }}>{subItem.remainLeave}</Text>
//                     <View style={{  borderColor: '#B4C3D6', width: ((((cardSize/2)/2)/1.5)+8)/2, backgroundColor: '#B4C3D6', height: 0.7}}></View>
//                     <Text
//                       allowFontScaling={false}
//                       style={{
//                         color: '#181818',
//                         fontFamily: Constant.MontserratRegular,
//                         fontSize: 15,
//                         padding: 2,
//                       }}>{subItem.totalLeave}</Text>
//                   </View>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       color: '#181818',
//                       fontFamily: Constant.MontserratRegular,
//                       fontSize: 12,
//                       padding: 8,
//                     }}
//                     numberOfLines={1}>
//                     {subItem.leaveName}
//                   </Text>
//                 </View>
//               ))}
//             </ScrollViewComponent>
//           </View>

          
//         </View>

//         {/* Expense Card */}

//         <View style={styles.cardView}>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginTop: 10,
//               marginLeft: 20,
//               marginBottom: 15,
//               marginRight: 10,
//               alignItems: 'center',
//               justifyContent: 'space-between'
//             }}>
//             <View style={{ display: 'flex', flexDirection: 'row' }}>
//               <Image
//                 style={{ height: 30, width: 30, resizeMode: 'contain' }}
//                 source={require('../../images/expenses.png')}></Image>
//               <Text
//                 allowFontScaling={false}
//                 style={{
//                   fontFamily: Constant.MontserratSemiBold,
//                   fontSize: 15,
//                   padding: 8,
//                 }}>
//                 Expenses
//               </Text>
//             </View>
//             <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
//               startColor={arrowShadowColor}
           
//             >
//               <TouchableOpacity onPress={() => { navigation.navigate('ProExpenseTab') }} style={styles.arrowBtn
//               } >

//                 <Image
//                   style={{ height: 15, width: 15, resizeMode: 'contain', transform: [{ rotate: '270deg' }], tintColor: '#808080' }}
//                   source={require('../../images/downArrow.png')}></Image>

//               </TouchableOpacity>
//             </Shadow>
//           </View>

//           <View style={{ flexDirection: 'row' }}>
//             <ScrollViewComponent
//               nestedScrollEnabled={true}
//               contentContainerStyle={styles.scrollContainer}
//               horizontal
//               showsHorizontalScrollIndicator={false}>
//               {expenseArr.length != 0 ? (
//                 expenseArr.map((item, index) => (
//                   <View
//                     style={styles.circleSizes}
//                     key={index}>
//                     <View
//                       style={{ height: 70, width: 70, flexDirection: 'row' }}>
//                       <View
//                         style={
//                           item.status == 'APPROVED'
//                             ? {
//                               height: ((((cardSize/2)/2)/1.5)+8),
//                               width: ((((cardSize/2)/2)/1.5)+8),
//                               borderRadius: ((((cardSize/2)/2)/1.5)+8)/2,
//                               borderWidth: 2,
//                               borderColor: 'rgba(94,184,45,1.0)',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }
//                             : item.status == 'REJECTED'
//                               ? {
//                                 height: 70,
//                                 width: 70,
//                                 borderRadius: 35,
//                                 borderWidth: 2,
//                                 borderColor: 'rgba(250,52,53,1.0)',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }
//                               : {
//                                 height: 70,
//                                 width: 70,
//                                 borderRadius: 35,
//                                 borderWidth: 2,
//                                 borderColor: 'rgba(240,193,45,1.0)',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }
//                         }>
//                         <Text
//                           allowFontScaling={false}
//                           style={
//                             item.status == 'APPROVED'
//                               ? {
//                                 color: 'rgba(94,184,45,1.0)',
//                                 fontFamily: Constant.MontserratSemiBold,
//                                 fontSize: 12,
//                               }
//                               : item.status == 'REJECTED'
//                                 ? {
//                                   color: 'rgba(250,52,53,1.0)',
//                                   fontFamily: Constant.MontserratSemiBold,
//                                   fontSize: 12,
//                                 }
//                                 : {
//                                   color: 'rgba(240,193,45,1.0)',
//                                   fontFamily: Constant.MontserratSemiBold,
//                                   fontSize: 12,
//                                 }
//                           }>
//                           {item.reimbursement}
//                         </Text>
//                       </View>

//                       <Image
//                         style={{
//                           height: 20,
//                           width: 20,
//                           resizeMode: 'contain',
//                           top: 23,
//                           right: 6,
//                         }}
//                         source={
//                           item.status == 'APPROVED'
//                             ? require('../../images/verified.png')
//                             : item.status == 'REJECTED'
//                               ? require('../../images/remove.png')
//                               : require('../../images/pending.png')
//                         }></Image>
//                     </View>

//                     <Text
//                       allowFontScaling={false}
//                       style={{
//                         color: '#181818',
//                         fontFamily: Constant.MontserratSemiBold,
//                         fontSize: 11,
//                         padding: 8,
//                       }}
//                       numberOfLines={1}>
//                       {item.reportTitle}
//                     </Text>
//                   </View>
//                 ))
//               ) : (
//                 <View
//                   style={{
//                     alignItems: 'center',
//                     width: 280,
//                     height: 75,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}>
//                   <Image
//                     style={{ height: 40, width: 40, resizeMode: 'contain' }}
//                     source={require('../../images/noDataFound.png')}></Image>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       color: '#999999',
//                       fontFamily: Constant.MontserratRegular,
//                       fontSize: 12,
//                       paddingTop: 8,
//                     }}
//                     numberOfLines={1}>
//                     No Expense Found.
//                   </Text>
//                 </View>
//               )}
//             </ScrollViewComponent>
//           </View>

          
//         </View>

//         {/* Attendance View */}

//         <View style={styles.cardView}>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginTop: 10,
//               marginLeft: 10,
//               marginBottom: 10,
//               marginRight: 10,
//               alignItems: 'center',
//               justifyContent: 'space-between'
//             }}>
//             <View style={{ display: 'flex', flexDirection: 'row' }}>
//               <Image
//                 style={{ height: 30, width: 30, resizeMode: 'contain' }}
//                 source={require('../../images/attendance.png')}></Image>
//               <Text
//                 allowFontScaling={false}
//                 style={{
//                   fontFamily: Constant.MontserratSemiBold,
//                   fontSize: 15,
//                   padding: 8,
//                 }}>
//                 Attendance
//               </Text>
//             </View>

//             <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
//               startColor={arrowShadowColor}
            
//             >
//               <TouchableOpacity onPress={() => { navigation.navigate('AttendanceTab') }} style={styles.arrowBtn
//               } >

//                 <Image
//                   style={styles.arrowBtnImg}
//                   source={require('../../images/downArrow.png')}></Image>

//               </TouchableOpacity>
//             </Shadow>

//           </View>

//           <ScrollViewComponent showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ marginBottom: 20 }}>
//             {attendanceArr.map((item, index) => (
//               <View
//                 style={{
//                   height: 35,
//                   width: 260,
//                   flexDirection: 'row',
//                   margin: 3,
//                   alignSelf: 'center',
//                 }}
//                 key={index}>
//                 <View style={{ marginTop: 2 }}>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       fontFamily: Constant.MontserratMedium,
//                       fontSize: 12,
//                       width: 100,
//                     }}>
//                     {item.day}
//                   </Text>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       fontFamily: Constant.MontserratRegular,
//                       fontSize: 11,
//                       color: 'gray',
//                       paddingTop: 4,
//                       width: 100,
//                     }}
//                     numberOfLines={1}>
//                     {item.date}
//                   </Text>
//                 </View>
//                 <View style={{ marginTop: 2 }}>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       fontFamily: Constant.MontserratMedium,
//                       fontSize: 12,
//                       width: 80,
//                       textAlign: 'center',
//                     }}>
//                     In
//                   </Text>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       fontFamily: Constant.MontserratRegular,
//                       fontSize: 11,
//                       color: 'gray',
//                       paddingTop: 4,
//                       width: 80,
//                       textAlign: 'center',
//                     }}>
//                     {item.punchIn}
//                   </Text>
//                 </View>
//                 <View style={{ marginTop: 2 }}>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       fontFamily: Constant.MontserratMedium,
//                       fontSize: 12,
//                       width: 80,
//                     }}>
//                     Out
//                   </Text>
//                   <Text
//                     allowFontScaling={false}
//                     style={{
//                       fontFamily: Constant.MontserratRegular,
//                       fontSize: 11,
//                       color: 'gray',
//                       paddingTop: 4,
//                       width: 80,
//                     }}>
//                     {' '}
//                     {item.punchOut}
//                   </Text>
//                 </View>
//               </View>
//             ))}
//           </ScrollViewComponent>
//         </View>


//       </Pages>
//     </View>
//   );



// }