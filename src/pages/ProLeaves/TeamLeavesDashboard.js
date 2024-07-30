import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Moment from 'moment';
import * as Constant from '../../Constant/Constants';
import KeyStore from '../../Store/LocalKeyStore';
import * as Utility from '../../Externel Constant/Utility';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../../Constant/Index';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { tempData } from './TempData';
import TeamLeaveList from './TeamLeaveList';
import { useRef } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import ViewItem from '../../components/ViewItemDetail';

const colorAsPerStatus = {

    'LEVEL1PENDING': ['P', '#FFBF00'],
    'LEVEL2PENDING': ['P', '#FFBF00'],
    'APPROVED': ['A', '#0B9F01'],
    'REJECTED': ['R', '#ED1818'],

}

const TeamLeavesDashboard = (props) => {

    const pendingReq = useRef([])
    const approvedReq = useRef([])
    const rejectReq = useRef([])
    const [currentTab, setcurrentTab] = useState(0)

    const [viewKeyArr, setviewKeyArr] = useState([])
    const [viewValueArr, setviewValueArr] = useState([])
    const [LeaveModal, setLeaveModal] = useState(false)
    const [apprRejectIndex, setapprRejectIndex] = useState(null)

    function isSelected(tabIndex, color, index) {

        if (tabIndex == currentTab) {

            return [color, 'white']
        }
        else {
            return ['white', color]
        }

    }

    function getStatusMetaData(statusText) {



        if (colorAsPerStatus[statusText] == undefined) {

            return ['', '']

        }

        else {

            return colorAsPerStatus[statusText]

        }

    }


    const [countContainerWidth, setcountContainerWidth] = useState(0)



    const [currentReqArray, setcurrentReqArray] = useState([])

    function setcurrentReqArrayNow(arr) {

        setcurrentReqArray(JSON.parse(JSON.stringify(arr)))

    }

    function sortData() {

        tempData.forEach((item, index) => {

            if (item.status == 'LEVEL1PENDING') {

                pendingReq.current.push(item)

            }

            else if (item.status == 'APPROVED') {

                approvedReq.current.push(item)

            }
            else if (item.status == 'REJECTED') {

                rejectReq.current.push(item)

            }



        })

    }

    useEffect(() => {

        pendingReq.current = []
        approvedReq.current = []
        rejectReq.current = []

        setcurrentReqArrayNow(tempData)

        sortData()


    }, [])

    function viewAction(index, item) {
        


        // let obj = this.state.teamApplicationArr[index]
        let obj = item

        const value = Object.values(obj);

        const key = Object.keys(obj);

        var valueArr = []

        var keyArr = ['Name', 'Status', 'Start Date', 'End Date', 'Total Leave Taken', 'Category', 'Reason']


        valueArr.push(obj.name, obj.orgStatus, Moment(String(obj.startDate) + ' 00:00:00').format('DD-MM-YYYY'), Moment(String(obj.endDate) + ' 00:00:00').format('DD-MM-YYYY'), obj.totalLeaveTaken, obj.leaveCategory, obj.reason)

        setviewKeyArr(keyArr)
        setviewValueArr(valueArr)
        setapprRejectIndex(index)
        setLeaveModal(true)
       
    }


    const styles = StyleSheet.create({

        countWithTitleBG: {
            width: `${100 / 4}%`,
            //    backgroundColor: '#e6fff2',
            alignItems: 'center',
            paddingVertical: 5
            // borderWidth: 1,

        },
        countWithTitleBGTeam: {
            width: `${100 / 4}%`,
            //    backgroundColor: '#e6fff2',
            alignItems: 'center',
            paddingVertical: 5
        },


        count: { fontFamily: Constant.MontserratRegular, color: '#0B9F01', fontSize: 16 },

        title: { fontFamily: Constant.MontserratRegular, color: '#0B9F01', fontSize: 14, marginTop: 5 },

        countRadius: { width: countContainerWidth / 6.2, height: countContainerWidth / 6.3, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 16 }

    });

    return (
        <>
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // paddingBottom: 50,
                    }}>
                    {/* OverView */}
                    <View style={[{
                        width: '95%',
                        //  height: 200, 
                        backgroundColor: 'white', alignSelf: 'center', borderRadius: 20,
                        overflow: 'hidden'
                    },]}>

                        <View style={{ flexDirection: 'row', overflow: 'hidden', width: '100%', justifyContent: 'space-between' }}>

                            <View style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>

                                <Image

                                    source={require('../../images/MyAttandance.png')}
                                    style={{
                                        width: 65,
                                        height: 65,
                                        resizeMode: 'contain',
                                        // alignSelf: 'center',
                                        right: 10,
                                        bottom: 6

                                    }} />

                                <Text allowFontScaling={false} style={{
                                    fontFamily: Constant.MontserratMedium, color: 'black', fontSize: 14,
                                    bottom: 5, right: 5
                                }}>
                                    {'My Team'}
                                </Text>

                            </View>

                            {/* Date */}
                            <TouchableOpacity style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', paddingRight: 15, bottom: 3.5, }}
                                onPress={() => {

                                }}
                            >

                                <Image
                                    source={require('../../images/filterAtt.png')}
                                    style={{
                                        width: 19,
                                        height: 19,
                                        resizeMode: 'contain',
                                        // alignSelf: 'center',
                                        tintColor: '#3934ee',

                                    }}
                                />

                                <Text allowFontScaling={false} style={{
                                    fontFamily: Constant.MontserratMedium, color: '#3934ee', fontSize: 12, alignSelf: 'center',
                                    left: 2,
                                    //  bottom: 5,
                                    //  right: 5 
                                }}>
                                    {/* {'Mon, 5 Mar 2023'} */}
                                    {"June - 2023"}
                                </Text>


                            </TouchableOpacity>
                            {/* Date */}

                            {/* <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={new Date(monthCalDate)}
                        // minimumDate={new Date("2023-02-01")}
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    /> */}

                        </View>

                        <View style={[{
                            width: '100%',
                            // backgroundColor: '#e6ffff',
                            // marginTop: 25, 
                            flexDirection: 'column',
                            // padding: 20,
                            paddingHorizontal: 0,
                            paddingBottom: 20
                        },]}>

                            <View onLayout={(event) => {
                                const { x, y, width, height } = event.nativeEvent.layout;
                                console.log(width)
                                setcountContainerWidth(width)

                            }} style={{ width: '100%', flexDirection: 'row', }}>

                                <TouchableOpacity onPress={() => {
                                    setcurrentTab(0)
                                    setcurrentReqArrayNow(tempData)
                                    // onAll()
                                }
                                } style={[styles.countWithTitleBG, {}]}>



                                    <View style={[styles.countRadius, { borderColor: 'black', backgroundColor: isSelected(0, 'black')[0] }]}>
                                        <Text allowFontScaling={false} style={[styles.count, { color: isSelected(0, 'black')[1] }]}>
                                            {tempData.length}
                                        </Text>
                                    </View>

                                    <Text allowFontScaling={false} style={[styles.title, { color: 'black' }]}>
                                        {'All'}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setcurrentTab(1)
                                    setcurrentReqArrayNow(pendingReq.current)

                                }} style={[styles.countWithTitleBGTeam]}>



                                    <View style={[styles.countRadius, { borderColor: '#FFBF00', backgroundColor: isSelected(1, '#FFBF00')[0] }]}>
                                        <Text allowFontScaling={false} style={[styles.count, { color: isSelected(1, '#FFBF00')[1] }]}>
                                            {pendingReq.current.length}
                                        </Text>
                                    </View>

                                    <Text allowFontScaling={false} style={[styles.title, { color: '#FFBF00' }]}>
                                        {'Pending'}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setcurrentTab(2)
                                    setcurrentReqArrayNow(approvedReq.current)

                                }} style={[styles.countWithTitleBGTeam,]}>

                                    <View style={[styles.countRadius, { borderColor: '#0B9F01', backgroundColor: isSelected(2, '#0B9F01')[0] }]}>
                                        <Text allowFontScaling={false} style={[styles.count, { color: isSelected(2, '#0B9F01')[1] }]}>
                                            {approvedReq.current.length}
                                        </Text>
                                    </View>

                                    <Text allowFontScaling={false} style={[styles.title, { color: '#0B9F01' }]}>
                                        {'Approved'}
                                    </Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setcurrentTab(3)
                                    setcurrentReqArrayNow(rejectReq.current)

                                }
                                } style={[styles.countWithTitleBGTeam,]}>

                                    <View style={[styles.countRadius, { borderColor: '#ED1818', backgroundColor: isSelected(3, '#ED1818')[0] }]}>

                                        <Text allowFontScaling={false} style={[styles.count, { color: isSelected(3, '#ED1818')[1] }]}>
                                            {rejectReq.current.length}
                                        </Text>
                                    </View>

                                    <Text allowFontScaling={false} style={[styles.title, { color: '#ED1818' }]}>
                                        {'Rejected'}
                                    </Text>

                                </TouchableOpacity>

                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>




                            </View>
                        </View>

                    </View>

                    <View style={{ marginTop: 20 }} />



                    <View style={{ width: '95%', backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, borderRadius: 17, paddingBottom: 5, alignSelf: 'center' }}>

                        {/* Head */}
                        <View style={{ width: '100%', backgroundColor: '#3934ee', borderTopRightRadius: 17, borderTopLeftRadius: 17, alignItems: 'center', padding: 10, flexDirection: 'row', }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontFamily: Constant.MontserratSemiBold,
                                    fontSize: 15,
                                    color: 'white',
                                    // width: '35%',
                                    // alignSelf: 'center',
                                    // backgroundColor: 'red',
                                    textAlign: 'center',
                                    paddingRight: 16
                                }}>
                                {'Team Members'}
                            </Text>

                        </View>


                        {currentReqArray.map((item, index) => {

                            return (<TeamLeaveList showStatus={currentTab==0 ? false : true} {...props} name={item.name} bottomContent={ currentTab == 0 ? "EmpName" + " | " + "Designation"  : item.startDate + " To " + item.endDate} statusText={getStatusMetaData(item.status)[0]} statusColor={getStatusMetaData(item.status)[1]} onPress={()=>{
                                // viewAction(index, item)

                                props.navigation.navigate('MobileCharts', {screen: 'AgeGroup'})
                            }}/>)
                        })}



                    </View>

                </ScrollView>
            </View>


            {
            LeaveModal ?
              <ViewItem buttonDisable={false} viewDetail={LeaveModal} title='View Leave Application Details' keyArr={viewKeyArr} valueArr={viewValueArr}
                approvedApplication={() => {}}
                rejectApplication={() => {}}
                
                cancelAction={() =>{setLeaveModal(false)}}
                apprRejectBtn={ true}
                approveBtnAction={() => {

                  
                }} 
                
                rejectBtnAction={() => {
                  
                }}
              >
              </ViewItem>
              : null
          }

        </>
    )
}


export default TeamLeavesDashboard

