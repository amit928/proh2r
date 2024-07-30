import React, { Component, createRef } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import * as Constant from '../Constant/Constants';
import HorizontalList from './HorizontalList';

const enableWorkaround = true;
const ScrollViewComponent = enableWorkaround ? GestureHandlerScrollView : ScrollView;



const EmployeeConnect = ({ arr, WINDOW_WIDTH }) => {


  const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2));

 // console.log('CardSlider', cardSize);

console.log('Employee_Connect_Arr', arr);

  const styles = StyleSheet.create({
    scrollViewCard: {
      shadowOffset: { width: 0.5, height: 0.5 },
      shadowColor: 'gray',
      shadowOpacity: 3.0,
      // backgroundColor: 'rgba(240,240,240,1.0)',
      marginBottom: 10
      // backgroundColor: 'blue'
      // height: 200,
    },
    cardView: {
      height: 180,
      // width: 280,
      // backgroundColor: 'green',
      backgroundColor: 'white',
      marginLeft: 8,
      shadowOffset: { width: 0.5, height: 0.5 },
      shadowColor: 'gray',
      shadowOpacity: 3.0,
      elevation: 3,
      margin: 8,
      borderRadius: 12,
    },
  });



  return (
    <ScrollViewComponent
      // nestedScrollEnabled={true}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollViewCard}>
      {arr.map((item, index) => (
        <HorizontalList key={String(index)} item={item} index={index} WINDOW_WIDTH={WINDOW_WIDTH} />
      )

        // {
        //  const scrollRef = React.createRef();
        //  let scrollValue = 0
        //  const value= 300
        //  let currentScrollPosition = 0
        //  let isDisabled = false
        //  function scrollRight(){
        //   isDisabled = true
        //   scrollValue = scrollValue+value
        //   scrollRef.current?.scrollTo({ x: scrollValue, y: 0, animated: true })

        // }

        // function scrollLeft(){
        //   if (scrollValue<=0) {
        //     return
        //   }
        //   scrollValue = scrollValue-value
        //   scrollRef.current?.scrollTo({ x: scrollValue, y: 0, animated: true })

        // }

        //   return(
        //   <View style={styles.cardView} key={index}>
        //     <View
        //       style={{ flexDirection: 'row', margin: 12, alignItems: 'center' }}>
        //       <Image
        //         style={{ height: 30, width: 30, resizeMode: 'contain' }}
        //         source={item.img}></Image>
        //       <Text
        //         allowFontScaling={false}
        //         style={{
        //           fontFamily: Constant.MontserratSemiBold,
        //           fontSize: 14,
        //           padding: 8,
        //         }}>
        //         {item.name}
        //       </Text>
        //       <TouchableOpacity onPress={()=>{scrollRight()}} style={{ width: 20, height: 20, backgroundColor: 'red', marginRight: 10 }}></TouchableOpacity>
        //       <TouchableOpacity onPress={()=>{scrollLeft()}} style={{ width: 20, height: 20, backgroundColor: 'green' }} disabled={isDisabled}></TouchableOpacity>
        //     </View>
        //     {/* <FlatList
        //       horizontal
        //       data={item.arr}
        //       renderItem={function (subItem, index) {
        //         return (
        //           <View
        //             style={{alignItems: 'center', width: 93.33, height: 60}}
        //             key={index}>
        //             <Image
        //               style={{
        //                 height: 50,
        //                 width: 50,
        //                 borderRadius: 23,
        //                 borderWidth: 1,
        //                 borderColor: 'rgba(229,229,229,1.0)',
        //                 alignItems: 'center',
        //                 justifyContent: 'center',
        //               }}
        //               source={
        //                 subItem.profileImg == '' ||
        //                 subItem.profileImg == 'null' ||
        //                 subItem.profileImg == null
        //                   ? require('../images/user.jpeg')
        //                   : {uri: subItem.profileImg}
        //               }></Image>
        //             <Text
        //               allowFontScaling={false}
        //               style={{
        //                 color: 'black',
        //                 fontFamily: Constant.MontserratMedium,
        //                 fontSize: 12,
        //                 padding: 3,
        //                 marginTop: 6,
        //               }}
        //               numberOfLines={1}>
        //               {subItem.firstName + subItem.lastName}
        //             </Text>
        //             <Text
        //               allowFontScaling={false}
        //               style={{
        //                 color: 'gray',
        //                 fontFamily: Constant.MontserratRegular,
        //                 fontSize: 11,
        //                 marginTop: 2,
        //               }}
        //               numberOfLines={1}>
        //               {subItem.date}
        //             </Text>
        //             <Text
        //               allowFontScaling={false}
        //               style={{
        //                 color: 'gray',
        //                 fontFamily: Constant.MontserratRegular,
        //                 fontSize: 11,
        //                 padding: 3,
        //               }}
        //               numberOfLines={1}>
        //               {subItem.daysLeft}
        //             </Text>
        //           </View>
        //         );
        //       }}
        //       keyExtractor={(item, index) => index.toString()}
        //     /> */}
        //     <View style={{
        //       width: 300,
        //       // borderWidth: 5,
        //       // borderColor: 'red'
        //       alignItems: 'center',
        //       // justifyContent: 'center'
        //     }}>
        //       <ScrollViewComponent
        //       scrollEventThrottle={16}
        //         nestedScrollEnabled={true}
        //         ref={scrollRef}
        //         onScroll={(e) => console.log(e.nativeEvent)}
        //         // contentContainerStyle={{
        //         // flex: 1,
        //         // justifyContent: 'center',
        //         // backgroundColor: 'red',
        //         scrollEnabled={item.arr.length != 0}
        //         // }}
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //       >
        //         {item.arr.length != 0 ? (
        //           item.arr.map((subItem, index) => (
        //             <View
        //               style={{
        //                 padding: 2,
        //                 alignItems: 'center',
        //                 // width: 93.33, height: 60, 
        //                 backgroundColor: 'white',
        //                 // alignSelf: 'center'
        //                 // backgroundColor: 'red'
        //                 // borderWidth: 1,
        //                 // borderColor: 'red',
        //                 height: 115,
        //                 overflow: 'hidden',
        //                 width: 100
        //               }}
        //               key={index}>
        //               <Image
        //                 style={{
        //                   height: 50,
        //                   width: 50,
        //                   borderRadius: 23,
        //                   borderWidth: 1,
        //                   borderColor: 'rgba(229,229,229,1.0)',
        //                   alignItems: 'center',
        //                   justifyContent: 'center',
        //                 }}
        //                 source={
        //                   subItem.profileImg == '' ||
        //                     subItem.profileImg == 'null' ||
        //                     subItem.profileImg == null
        //                     ? require('../images/user.jpeg')
        //                     : { uri: subItem.profileImg }
        //                 }></Image>
        //               <Text
        //                 allowFontScaling={false}
        //                 style={{
        //                   color: 'black',
        //                   fontFamily: Constant.MontserratMedium,
        //                   fontSize: 12,
        //                   padding: 3,
        //                   marginTop: 6,
        //                 }}
        //                 numberOfLines={1}>
        //                 {subItem.firstName + " " + subItem.lastName}
        //               </Text>
        //               <Text
        //                 allowFontScaling={false}
        //                 style={{
        //                   color: 'gray',
        //                   fontFamily: Constant.MontserratRegular,
        //                   fontSize: 11,
        //                   marginTop: 2,
        //                 }}
        //                 numberOfLines={1}>
        //                 {subItem.date}
        //               </Text>
        //               <Text
        //                 allowFontScaling={false}
        //                 style={{
        //                   color: 'gray',
        //                   fontFamily: Constant.MontserratRegular,
        //                   fontSize: 11,
        //                   padding: 3,
        //                 }}
        //                 numberOfLines={1}>
        //                 {subItem.daysLeft}
        //               </Text>
        //             </View>
        //           ))
        //         ) : (
        //           <View
        //             style={{
        //               alignItems: 'center',
        //               width: 280,
        //               height: 120,
        //               alignItems: 'center',
        //               justifyContent: 'center',
        //             }}
        //             key={index}>
        //             <Image
        //               style={{ height: 50, width: 50, resizeMode: 'contain' }}
        //               source={require('../images/noDataFound.png')}></Image>
        //             <Text
        //               allowFontScaling={false}
        //               style={{
        //                 color: '#999999',
        //                 fontFamily: Constant.MontserratRegular,
        //                 fontSize: 12,
        //                 padding: 16,
        //               }}
        //               numberOfLines={1}>
        //               {item.noDataMsg}
        //             </Text>
        //           </View>
        //         )}
        //       </ScrollViewComponent>
        //     </View>
        //   </View>);
        // }
      )}
    </ScrollViewComponent>
  );

}


export default EmployeeConnect
