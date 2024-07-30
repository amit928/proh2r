import React from 'react';
import KeyStore from '../Store/LocalKeyStore';
import { NavigationActions, StackActions } from 'react-navigation'
// import { Linking } from 'react-native'
import Moment from 'moment';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Modal, Button, Keyboard, Alert, Platform, Linking, Dimensions, StyleSheet } from "react-native";

export function getStatusArrayForSorting() {

  return {
    "getAll": [
      "LEVEL1PENDING",
      "APPROVED",
      "REJECTED",
      "LEVEL2PENDING",
      "CANCELLED"
    ],
    LEVEL1PENDING: ["LEVEL1PENDING"],
    APPROVED: ["APPROVED"],
    REJECTED: ["REJECTED"],
    LEVEL2PENDING: ["LEVEL2PENDING"],
    CANCELLED: ["CANCELLED"],
    PENDING: ["PENDING"]
  }

}

export function getDataSortedOnStatus(arr, key) {

  let dataArrApproved = []
  let dataArrRejected = []
  let dataArrCancelled = []
  let dataArrPending = []

  console.log('start');



  for (let i = 0; i < arr.length; i++) {

    // console.log('getDataSortedOnStatus', i);


    switch (String(arr[i][key])) {
      case 'APPROVED':
        dataArrApproved.push(arr[i])
        break;

      case 'REJECTED':
        dataArrRejected.push(arr[i])
        break;

      case 'CANCELLED':
        dataArrCancelled.push(arr[i])
        break;

      case 'LEVEL1PENDING':
        dataArrPending.push(arr[i])
        break;

      case 'LEVEL2PENDING':

        dataArrPending.push(arr[i])

        break;

      case 'PENDING':

        dataArrPending.push(arr[i])

        break;

      default:
        break;
    }

  }

  console.log('End');

  return {
    'APPROVED': dataArrApproved,
    'REJECTED': dataArrRejected,
    'CANCELLED': dataArrCancelled,
    'PENDING': dataArrPending
  }

}


export function rawDateToDDMMYYYY(rawDate) {



  const date = Moment(new Date(rawDate.split('T')[0]).toISOString())

  return Moment(date).format('DD-MM-YYYY')

}

export function rawDateToDDMMYYYY_HH_MM(rawDate) {

  if (!rawDate) {
    return ''
  }

  // console.log("rawDateToDDMMYYYY_HH_MM", rawDate);

  const dateArr = rawDate?.split('T')

  const date = Moment(new Date(dateArr[0]).toISOString())

  const time = dateArr[1].split(":").slice(0, 2).join(":");
  // console.log(time); 

  return Moment(date).format('DD-MM-YYYY') + " " + time

}


//Array Chunk Divide
export function createArrayChunk(arr, chunkSize) {

  let chunkArr = []

  if (arr.length != 0) {


    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize)
      // console.log(chunk)

      chunkArr.push(chunk)


    }

    console.log('chunkArr', chunkArr)
    return chunkArr

  }
  else {

    console.log('emptyArray')
    return []

  }


}

export const getSizeValueFromLayoutWidthORHeight = (LayoutWidthORHeight, sizeYouWant) => {

  const temp = (404 / sizeYouWant)

  return LayoutWidthORHeight / temp

}

export const isShowPendingBtnByLevelsForReg = (empId, { regularizationStatus, primarySupervisorId, secondarySupervisorId, }) => {

  if (primarySupervisorId == String(empId).toUpperCase() && (regularizationStatus == 'Level 1 Pending' || regularizationStatus == 'LEVEL1PENDING')) {

    return true

  }

  else if (secondarySupervisorId == String(empId).toUpperCase() && (regularizationStatus == 'Level 2 Pending' || regularizationStatus == 'LEVEL2PENDING')) {

    return true

  }

  else
    return false

}

export const isShowPendingBtnByLevels = ({ status, primary, secondary, }) => {

  if (primary && (status == 'Level 1 Pending' || status == 'LEVEL1PENDING')) {

    return true

  }

  else if (secondary && (status == 'Level 2 Pending' || status == 'LEVEL2PENDING')) {

    return true

  }

  else
    return false

}

export function fromDDMMYYYYHHmm_To_MMDDYYYYHmm(str, splitter) {



  console.log("S---------------------fromDDMMYYYYHHmm_To_MMDDYYYYHmm--------------------");
  console.log(typeof splitter);
  if (typeof str != 'string') {
    return ''
  }

  if (typeof splitter == undefined) {
    Alert.alert('Add Splitter !')
    return
  }

  let strDate = String(str).split(' ')[0]
  console.log('fromDDMMYYYYHHmm_To_MMDDYYYYHmm', strDate);
  let split = String(strDate).split(splitter);

  console.log('fromDDMMYYYYHHmm_To_MMDDYYYYHmm', split);

  console.log('fromDDMMYYYYHHmm_To_MMDDYYYYHmm', String(str).split(' ')[1]);
  console.log('fromDDMMYYYYHHmm_To_MMDDYYYYHmm', [split[1], split[0], split[2]].join(splitter) + ' ' + String(str).split(' ')[1]);



  console.log("E---------------------fromDDMMYYYYHHmm_To_MMDDYYYYHmm--------------------");
  return [split[1], split[0], split[2]].join(splitter) + ' ' + String(str).split(' ')[1];

}

export function convertToDayDDMMMYYYY(dateString) {

  console.log('convertToDayDDMMMYYYY', dateString);

  if (dateString == undefined) {
    return ''
  }

  const date = Moment(new Date(dateString).toISOString())

  const finalDate = Moment(date).format('DD MMM YYYY')

  const day = Moment(date).format('dddd')

  return day.slice(0, 3) + ", " + finalDate

}
export function convertToDDMMMYYYY(dateString) {

  if (dateString == undefined) {
    return ''
  }

  const date = Moment(new Date(dateString).toISOString())

  return Moment(date).format('DD MMM YYYY')

}

export function convertToMMMMYYYY(dateString) {

  if (dateString == undefined) {
    return ''
  }

  const date = Moment(new Date(dateString).toISOString())

  return Moment(date).format('MMMM-YYYY')

}

export function convertToDDMMYYYY(dateString) {

  const date = Moment(new Date(dateString).toISOString())

  return Moment(date).format('DD-MM-YYYY')

}

export function convertToStandardDate(dateString) {

  const date = Moment(new Date(dateString).toISOString())

  return Moment(date).format('DD-MMM-YYYY')

}


export function convertToPayloadDate(date) {

  let tempDateArr = date.split('-')

  const finalDate = tempDateArr[2] + '-' + tempDateArr[1] + '-' + tempDateArr[0]

  return finalDate

}


export const checkBlankAndNUll = (value) => {
  if (value == null || value == "null" || value == "") {
    return false
  }
  else {
    return true
  }
}

export const checkBlankAndReturnBlankArr = (value) => {
  if (value == null || value == "null" || value == "") {
    return []
  }
  else {
    return value
  }
}

export const logoutOnError = (dict, navigation) => {

  console.log("logoutOnError executed");
  // return

  let authDict = dict
  authDict.accessToken = ''
  authDict.employeeCode = ''
  KeyStore.setKey('loginKey', null)
  KeyStore.setKey('authDict', authDict)
  KeyStore.setKey('fcmToken', null)

  this.resetStack(navigation)
  //  navigation.navigate('Login')

}

export function setKey(key, value) {

  KeyStore.setKey(key, value)

}

export function getKey(key) {

  KeyStore.getKey(key, (err, value) => {
    if (value) {
      // this.setState({ authDict: value, logoUrl: value.companyLogoUrl })
      return value
    }
  });

}


resetStack = (navigation) => {
  navigation
    .dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      ],
    }))
}


export const convertTime = (time) => {

  if (checkBlankAndNUll(time)) {
    var splits = time.split(":");
    var hours = splits[0]
    var minutes = splits[1]

    if (hours >= 12) {

      hours = Math.abs(12 - hours)
      return hours + ':' + minutes + ' PM'
    } else {
      if (hours == 0) {
        hours = Math.abs(12 + hours)

      }
      return hours + ':' + minutes + ' AM'
    }
  }
  else {
    return ''
  }
}

export const checkNull = (value) => {
  if (value == null || value == "null" || value == "") {
    return ''
  }
  else {
    return value
  }
}

export function checkUndefined(value) {
  if (value == undefined) {

    return ''

  } else {

    return value

  }
}

export const convertToUserDt = (value) => {

  let arr = value.split(':')
  var timeString = ''
  arr[0] > 12 ? (timeString = String(arr[0] - 12 + ':' + arr[1] + ' pm')) : timeString = value + ' am'

  return timeString
}

export const calcPercentage = (value, percentage) => value * (percentage / 100)

export const splitStatus = (value) => {
  if (value == 'LEVEL1PENDING') {
    return 'Level 1 Pending'
  } else if (value == 'LEVEL2PENDING') {
    return 'Level 2 Pending'
  } else if (value == 'REJECTED') {
    return 'Rejected'
  } else if (value == 'APPROVED') {
    return 'Approved'
  } else if (value == 'PENDING') {
    return 'Pending'
  } else if (value == 'DELETED') {
    return 'Deleted'
  } else if (value == 'CANCELLED') {
    return 'Cancelled'
  }
  else {
    return value
  }
}


export function IconOnStatus(value) {
  if (value == 'LEVEL1PENDING') {
    return <Image
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}
      source={require('../images/timesheetSubmitted.png')}></Image>
  } else if (value == 'LEVEL2PENDING') {
    return <Image
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}
      source={require('../images/timesheetSubmitted.png')}></Image>
  } else if (value == 'REJECTED') {
    return <Image
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}
      source={require('../images/timesheetRejected.png')}></Image>
  } else if (value == 'APPROVED') {
    return <Image
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}
      source={require('../images/timeSheetApproved.png')}></Image>
  } else if (value == 'PENDING') {
    return <Image
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}
      source={require('../images/timesheetSubmitted.png')}></Image>
  } else if (value == 'DELETED') {
    return <Image
      style={{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
      }}
      source={require('../images/timesheetRejected.png')}></Image>
  } else if (value == 'CANCELLED') {
    return <View style={{ backgroundColor: '#CBCBCB', width: '100%', height: '100%', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
      <View style={{ backgroundColor: '#808080', width: 20, height: 20, borderRadius: 14, }}></View>
    </View>
  }
  else {
    return <></>
  }
}

export const statusColor = (value) => {

  if (value == 'LEVEL1PENDING') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'LEVEL2PENDING') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'REJECTED') {
    return 'rgba(197,95,94,1.0)'
  } else if (value == 'APPROVED') {
    return 'rgba(70,169,64,1.0)'
  } else if (value == 'PENDING') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'DELETED') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'CANCELLED') {
    return 'rgba(237,205,70,1.0)'
  }
  else if (value == 'Level 1 Pending') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'Level 2 Pending') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'Rejected') {
    return 'rgba(197,95,94,1.0)'
  } else if (value == 'Approved') {
    return 'rgba(70,169,64,1.0)'
  } else if (value == 'Pending') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'Deleted') {
    return 'rgba(237,205,70,1.0)'
  } else if (value == 'Cancelled') {
    return 'rgba(237,205,70,1.0)'
  }
  else {
    return ''
  }

}

export function isPendingStatus(value) {

  if (value == 'LEVEL1PENDING') {
    return true
  } else if (value == 'LEVEL2PENDING') {
    return true
  }
  else if (value == 'PENDING') {
    return true
  }
  else {
    return false
  }

}

export const sendEmailViaEmailApp = (toMailId) => {
  //   if (!isUndefined(toMailId)) {
  //     let link = `mailto:${toMailId}`;
  //   if (!isUndefined(subject)) {
  //     link = `${link}?subject=${subject}`;
  //   }
  //  if (isUndefined(subject)) {
  //    link = `${link}?body=${body}`;
  //  } else {
  //    link = `${link}&body=${body}`;
  //  }
  let link = 'mailto:' + toMailId + '?subject=SendMail&body=Description'

  Linking.canOpenURL(link)
    .then(supported => {
      if (supported) {
        // 'mailto:support@example.com?subject=Billing Query&body=Description'
        Linking.openURL(link);
      }
    })
    .catch(err => console.error('An error occurred', err));

};

export const sendWhatsAppMessage = (link) => {

  Linking.canOpenURL(link)
    .then(supported => {
      if (!supported) {
        Alert.alert(
          'Whatsapp App Not Found!'
        );
      } else {
        return Linking.openURL(link);
      }
    })
    .catch(err => console.error('An error occurred', err));

};


export const removeEmojis = (string) => {
  // emoji regex from the emoji-regex library
  const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
  return string.replace(regex, '')
}

export const splitMonths = (month) => {

  let monthArr = []
  for (let i = 0; i < month.length; i++) {
    const value = convertMonths(month[i])
    monthArr.push(value)
  }

  return monthArr
}


export const convertMonths = (mon) => {
  let arr = mon.split('-')
  let value = arr[0]


  if (value == 'JANUARY') {

    return 'JAN' + '-' + arr[1]

  } else if (value == 'FEBRUARY') {
    return 'FEB' + '-' + arr[1]

  } else if (value == 'MARCH') {
    return 'MAR' + '-' + arr[1]

  } else if (value == 'APRIL') {
    return 'APR' + '-' + arr[1]

  } else if (value == 'MAY') {
    return 'MAY' + '-' + arr[1]

  } else if (value == 'JUNE') {
    return 'JUNE' + '-' + arr[1]

  } else if (value == 'JULY') {
    return 'JUL' + '-' + arr[1]

  } else if (value == 'AUGUST') {
    return 'AUG' + '-' + arr[1]

  } else if (value == 'SEPTEMBER') {
    return 'SPT' + '-' + arr[1]

  } else if (value == 'OCTOBER') {
    return 'OCT' + '-' + arr[1]

  } else if (value == 'NOVEMBER') {
    return 'NOV' + '-' + arr[1]

  } else if (value == 'DECEMBER') {
    return 'DEC' + '-' + arr[1]

  } else {
    return mon
  }
}




