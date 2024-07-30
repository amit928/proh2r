import {StyleSheet} from 'react-native';
import {Constant} from '../../Constant/Index';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
    alignItems: 'center',
    marginBottom: 20,
    right: 12,
    bottom: 10
    
  },
  ImageStyle: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    
  },
  titleStyle: {
    fontFamily: Constant.MontserratSemiBold,
    fontSize: 15,
    paddingLeft: 4,
    // color: 'rgba(0,65,163,1.0)',
    color: 'black',
    marginTop: 10,
  },
});
