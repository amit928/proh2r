import {StyleSheet, Dimensions} from 'react-native';
import {Constant} from '../../Constant/Index';

const {width, height} = Dimensions.get('screen');

const mainView = width / 6
const textFontSize = (mainView / 6.7)

export const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // width: 120,
    margin: 5,
    width: mainView,
    // justifyContent: 'center',
    // alignSelf: 'center',
    // backgroundColor: 'white',
  },
  mainView: {
    // padding: 20,
    height: mainView,
    width: mainView,
    borderRadius: ((mainView) / 2) / 2,
    borderWidth: 1,
    borderColor: '#B4C3D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: 'black',
    fontFamily: Constant.MontserratSemiBold,
    // fontSize: 13,
    fontSize: textFontSize + 1,
  },
  nameText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: Constant.MontserratMedium,
    // fontSize: 12,
    fontSize: textFontSize,
    padding: 8,
  },
});
