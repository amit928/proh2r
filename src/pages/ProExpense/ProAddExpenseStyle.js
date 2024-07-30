import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Colors, Constant } from '../../Constant/Index';

//const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    // backgroundColor: 'rgba(232,244,241,1.0)'
    // backgroundColor: '#f2f2f2'
    backgroundColor: COLORS.FormBGColor
  },

  MainView: {
    padding: 12,
    backgroundColor: "#EFEDF3",
    flex: 1
  },

  pendingCardView: {
    height: 220,
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
    // borderWidth:2,
    borderColor: 'rgba(243,219,131,1.0)'
  },
  pendingCardView2: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 12,
    // borderWidth:2,
    borderColor: 'rgba(243,219,131,1.0)',
    marginBottom: 10,
    paddingBottom: 10
  },


  ErrorCardView: {
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: 'rgba(185,185,185,1.0)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 12,
    // borderWidth:2,
    borderColor: 'red',
    marginBottom: 10,
    paddingBottom: 10,
    borderWidth: 1
  },

  bottomBtns: {
    flexDirection: 'column',
    // marginTop: 20,
    // marginLeft: 10,
    justifyContent: 'center',
    // alignSelf: 'stretch',
    marginBottom: 14,
    width: '100%',
    // height: '8%',
    alignItems: 'center'


  },


  modelConatiner: {
    backgroundColor: '#f2f6fa',
    width: '95%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '22%',
    alignItems: 'center',

  },

  datePickerComponentLabel: {
    fontFamily: Constant.MontserratMedium,
    paddingLeft: 16,
    fontSize: 13,
    color: 'black'
    // marginTop: 16,
  },

  datePickerComponentDateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    top: 5,
    height: 45,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'black',
    backgroundColor: 'white',
    marginBottom: 20,
    alignSelf: 'center',
    opacity: 1,
  },

  datePickerComponentDateButtonText: {
    color: '#A4A4A4',
    fontFamily: Constant.MontserratMedium,
    fontSize: 13,
    paddingLeft: 10,
  },

  datePickerComponentDateImageIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    right: 12,
  },

  textFieldReason: {
    width: '90%',
    height: 90,
    marginTop: 8,
    paddingLeft: 8, color: 'black', alignSelf: 'center',
    backgroundColor: 'white', borderRadius: 10,
    opacity: 1,
    top: 5,
    marginBottom: 20,
    textAlignVertical: 'top',

  },

  ComponentForFilePIcker: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    top: 5,
    height: 45,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'black',
    backgroundColor: 'white',
    // marginBottom: 20,
    alignSelf: 'center',
    opacity: 1,
    paddingLeft: 8,

  }

});

export default styles
