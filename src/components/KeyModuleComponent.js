import React, { Component } from 'react';
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
} from 'react-native';
import * as Constant from '../Constant/Constants';
import { COLORS } from '../Constant/Index';

const styles = StyleSheet.create({
  scrollViewCard: {
    backgroundColor: COLORS.FormBGColor,
    // height: 100,
  },

  itemBtn: {
    // shadowColor: 'rgba(185,185,185,1.0)',
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.39,
    // shadowRadius: 8.3,
    // elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    marginLeft: 12,
    backgroundColor: 'white',
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },

  itemBtnLast: {
    // shadowColor: 'rgba(185,185,185,1.0)',
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.39,
    // shadowRadius: 8.3,
    // elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    marginLeft: 12,
    backgroundColor: 'white',
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginRight: 15
  },
});

export default class KeyModule extends React.Component {
  render() {
    const { arr, navigation, keyModuleAction } = this.props;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewCard}>
        {arr.map((item, index) => (
          <TouchableOpacity
            style={index == arr.length - 1 ? styles.itemBtnLast : styles.itemBtn}
            key={index}
            onPress={() => keyModuleAction(index)}>
            <Image
              style={{ width: 35, height: 35, resizeMode: 'contain' }}
              source={item.img}></Image>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: Constant.MontserratSemiBold,
                color: 'black',
                fontSize: 10,
                padding: 2,
                marginTop: 6,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
