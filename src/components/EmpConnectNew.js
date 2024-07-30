import React, { Component, createRef, useState } from 'react';
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
import HorizontalListNew from './HorizontalListNew';

const enableWorkaround = true;
const ScrollViewComponent = enableWorkaround ? GestureHandlerScrollView : ScrollView;





const EmpConnectNew = ({ arr, WINDOW_WIDTH }) => {
  const [tabValue, settabValue] = useState(1)


  const cardSize = (WINDOW_WIDTH - (((WINDOW_WIDTH / 2) / 2) / 2));

  // console.log('CardSlider', cardSize);

  console.log('Employee_Connect_Arr', arr);

  const styles = StyleSheet.create({
    scrollViewCard: {
      shadowOffset: { width: 0.5, height: 0.5 },
      shadowColor: 'rgba(185,185,185,1.0)',
      shadowOpacity: 3.0,

      // backgroundColor: 'rgba(240,240,240,1.0)',
      //   marginBottom: 10,
      //   backgroundColor: 'blue'
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

    <>




      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={false}>

        <View style={{
          flexDirection: 'row', marginBottom: 7, marginLeft: 10, marginTop: 10,
          borderRadius: 7,
          //  width: WINDOW_WIDTH, 
          backgroundColor: 'white',
          alignItems: 'center', justifyContent: 'space-between',
          borderWidth: 0.7,
          borderColor: '#b3b3b3',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>


          <TouchableOpacity onPress={() => settabValue
            (1)} style={{
              flexDirection: 'row',
              // backgroundColor: tabValue == 1 ? '#031139' : 'white', 
              backgroundColor: tabValue == 1 ? '#3934ee' : 'white',
              borderRadius: 7, height: 32,
              width: WINDOW_WIDTH / 3.35, justifyContent: 'space-evenly', alignItems: 'center'
              //  marginLeft: 16,
            }}>
            <View style={{
              // width: 90,
              height: 32,
              // borderWidth: 0.5,borderRightWidth: 0,
              // marginTop: 5,
              // marginLeft: 16,
              borderRadius: 4,
              borderTopRightRadius: 0, borderBottomRightRadius: 0, alignItems: 'center', justifyContent: 'center',
              // backgroundColor: 'white', 
              padding: 6, paddingHorizontal: 10
            }}>

              <Text allowFontScaling={false}  style={{ alignItems: 'center', justifyContent: 'center', color: tabValue == 1 ? 'white' : 'black', fontFamily: tabValue == 1 ? Constant.MontserratSemiBold : Constant.MontserratMedium, fontSize: 12, }}>{'Birthday'}</Text>

            </View>

            <View style={{ height: 20, width: 0.5, backgroundColor: tabValue == 1 ? 'white' : 'black', alignSelf: 'center' }}>

            </View>

            <View style={{
              //  width: 30, 
              height: 32,
              //  borderWidth: 0.5, 
              //  marginTop: 5, 
              borderLeftWidth: 0, borderRightWidth: 0,
              borderTopRightRadius: 4, borderBottomRightRadius: 4,

              alignItems: 'center', justifyContent: 'center',
              // backgroundColor: 'white', 
              padding: 6, paddingHorizontal: 10
            }}>

              <Text allowFontScaling={false}  style={{
                alignItems: 'center', justifyContent: 'center', color: tabValue == 1 ? 'white' : 'grey', fontFamily: tabValue == 1 ? Constant.MontserratSemiBold : Constant.MontserratMedium,
                fontSize: 12,
              }}>{arr[0]?.arr.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settabValue
            (2)} style={{
              flexDirection: 'row', backgroundColor: tabValue == 2 ? '#3934ee' : 'white',
              borderRadius: 7,
              width: WINDOW_WIDTH / 3,
              //  marginLeft: 10
            }}>
            <View style={{
              // width: 90,
              height: 32,
              // borderWidth: 0.5,borderRightWidth: 0,
              // marginTop: 5,
              // marginLeft: 16,
              borderRadius: 4,
              borderTopRightRadius: 0, borderBottomRightRadius: 0,
              alignItems: 'center', justifyContent: 'center',
              // backgroundColor: 1 ? '#031139' : '#031139', 
              padding: 6, paddingHorizontal: 10
            }}>

              <Text allowFontScaling={false}  style={{ alignItems: 'center', justifyContent: 'center', color: tabValue == 2 ? 'white' : 'black', fontFamily: tabValue == 2 ? Constant.MontserratSemiBold : Constant.MontserratMedium, fontSize: 12, }}>{'Anniversary'}</Text>

            </View>

            <View style={{ height: 20, width: 0.5, backgroundColor: tabValue == 2 ? 'white' : 'black', alignSelf: 'center' }}>

            </View>

            <View style={{
              //  width: 30, 
              height: 32,
              //  borderWidth: 0.5, 
              //  marginTop: 5, 
              borderLeftWidth: 0, borderRightWidth: 0,
              borderTopRightRadius: 4, borderBottomRightRadius: 4,

              alignItems: 'center', justifyContent: 'center',
              //  backgroundColor: 1 ? '#031139' : '#031139',
              padding: 6,
              paddingHorizontal: 10
            }}>

              <Text allowFontScaling={false}  style={{
                alignItems: 'center', justifyContent: 'center', color: tabValue == 2 ? 'white' : 'grey', fontFamily: tabValue == 2 ? Constant.MontserratSemiBold : Constant.MontserratMedium,
                fontSize: 12,
              }}>{arr[1]?.arr.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settabValue
            (3)} style={{
              flexDirection: 'row', backgroundColor: 'white',
              borderRadius: 7,
              //  marginLeft: 10,
              backgroundColor: tabValue == 3 ? '#3934ee' : 'white', width: WINDOW_WIDTH / 3.1,
            }}>
            <View style={{
              // width: 90,
              height: 32,
              // borderWidth: 0.5,borderRightWidth: 0,
              // marginTop: 5,
              // marginLeft: 16,
              borderRadius: 4,
              borderTopRightRadius: 0, borderBottomRightRadius: 0,
              alignItems: 'center', justifyContent: 'center',
              //  backgroundColor: 'white', 
              padding: 6, paddingHorizontal: 10
            }}>

              <Text allowFontScaling={false}  style={{ alignItems: 'center', justifyContent: 'center', color: tabValue == 3 ? 'white' : 'black', fontFamily: tabValue == 3 ? Constant.MontserratSemiBold : Constant.MontserratMedium, fontSize: 12, }}>{'New Joinee'}</Text>

            </View>

            <View style={{ height: 20, width: 0.5, backgroundColor: tabValue == 3 ? 'white' : 'black', alignSelf: 'center' }}>

            </View>

            <View style={{
              //  width: 30, 
              height: 32,
              //  borderWidth: 0.5, 
              //  marginTop: 5, 
              borderLeftWidth: 0, borderRightWidth: 0,
              borderTopRightRadius: 4, borderBottomRightRadius: 4,

              alignItems: 'center', justifyContent: 'center',
              // backgroundColor: 'white',
              padding: 6, paddingHorizontal: 10
            }}>

              <Text allowFontScaling={false}  style={{
                alignItems: 'center', justifyContent: 'center', color: tabValue == 3 ? 'white' : 'grey', fontFamily: tabValue == 3 ? Constant.MontserratSemiBold : Constant.MontserratMedium,
                fontSize: 12,
              }}>{arr[2]?.arr.length}</Text>
            </View>
          </TouchableOpacity>

          {/* <View style={{ flexDirection: 'row' }}>
            <View style={{
              // width: 90,
              height: 32,
              borderWidth: 0.5,
              marginTop: 5, 
              // marginLeft: 16,
              borderRadius: 4, borderTopRightRadius: 0, borderBottomRightRadius: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 6, borderColor: 'grey'
            }}>

              <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'black', fontFamily: Constant.MontserratRegular, fontSize: 14, }}>{'Anniversary'}</Text>

            </View>
            <View style={{ height: 32, borderWidth: 0.5, marginTop: 5, borderLeftWidth: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFF0FF', borderColor: 'grey', padding: 6, paddingHorizontal: 10 }}>

              <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'black', fontFamily: Constant.MontserratRegular, fontSize: 14, }}>{'5'}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{
              // width: 90,
              height: 32,
              borderWidth: 0.5,
              marginTop: 5, 
              // marginLeft: 16,
              borderRadius: 4, borderTopRightRadius: 0, borderBottomRightRadius: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 6, borderColor: 'grey'
            }}>

              <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'black', fontFamily: Constant.MontserratRegular, fontSize: 14, }}>{'New Joinee'}</Text>

            </View>
            <View style={{ width: 30, height: 32, borderWidth: 0.5, marginTop: 5, borderLeftWidth: 0, borderTopRightRadius: 4, borderBottomRightRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBE7', borderColor: 'grey', padding: 6, paddingHorizontal: 10 }}>

              <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'black', fontFamily: Constant.MontserratRegular, fontSize: 14, }}>{'5'}</Text>
            </View>
          </View> */}







        </View>


      </ScrollView>

      <View
        // nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewCard}>
        {/* {arr.map((item, index) => (
        <HorizontalListNew key={String(index)} item={item} index={index} WINDOW_WIDTH={WINDOW_WIDTH} />
      ) */}

        {/* {arr.map((item, index) => (
          <HorizontalListNew tabChangeIndex={{ tabValue: tabValue, settabValue: settabValue }} item={arr[2]} index={2} WINDOW_WIDTH={WINDOW_WIDTH} />
        ))} */}


        {
          tabValue == 1 ? <HorizontalListNew tabChangeIndex={{ tabValue: tabValue, settabValue: settabValue }} item={arr[0]} index={0} WINDOW_WIDTH={WINDOW_WIDTH} />
            :
            tabValue == 2 ?
              <HorizontalListNew tabChangeIndex={{ tabValue: tabValue, settabValue: settabValue }} item={arr[1]} index={1} WINDOW_WIDTH={WINDOW_WIDTH} />

              :

              <HorizontalListNew tabChangeIndex={{ tabValue: tabValue, settabValue: settabValue }} item={arr[2]} index={2} WINDOW_WIDTH={WINDOW_WIDTH} />

        }



        {/* <HorizontalListNew tabChangeIndex={{ tabValue: tabValue, settabValue: settabValue }} item={arr[tabValue - 1]} index={tabValue - 1} WINDOW_WIDTH={WINDOW_WIDTH} />

        <HorizontalListNew tabChangeIndex={{ tabValue: tabValue, settabValue: settabValue }} item={arr[tabValue - 1]} index={tabValue - 1} WINDOW_WIDTH={WINDOW_WIDTH} /> */}



      </View>

    </>
  );

}


export default EmpConnectNew
