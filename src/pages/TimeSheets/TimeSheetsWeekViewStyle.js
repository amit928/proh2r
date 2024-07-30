import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, Constant } from '../../Constant/Index';
import * as Fonts from '../../components/Fonts';
//const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({

    MainBody: {
        flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: COLORS.FormBGColor
    },

    CalenderBar: {
        display: 'flex', borderBottomWidth: 0.5, width: '100%', height: '16%', backgroundColor: '#F6F6F6', borderBottomColor: '#BBBBBB', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'
    },

    CalenderUpDownButton: {
        height: 30, width: 30, resizeMode: 'contain'
    },


    WeekBody: { 
        borderBottomWidth: 0, 
        borderBottomColor: '#BBBBBB',
         width: '100%', height: '84%',
         padding: 10,
         paddingTop: 0
        // borderColor: 'blue',
        // borderWidth: 1
     },
         

    BottomButtons: {

        borderBottomWidth: 0, borderBottomColor: 'transparent', 
        width: '100%', height: '10%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10,
        // borderColor: 'red', borderWidth: 1,
        // backgroundColor: 'red'
    },

    DayMainView:{
        alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 9,
        // marginBottom: 10
    },

    DayTitleBarButton: {
        display: 'flex', flexDirection: 'row', width: '100%', height: 80, backgroundColor: 'white' , marginBottom: 10, borderRadius: 20
    },

    TimeStatusIndicatorAndDayTextBlockSpace: { marginLeft: 10 },

    DayTextBlock:{
        height: '100%', width: '50%', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 10, alignItems: 'center'
    },

    DayTextBlock_Day:
        { color: 'black', fontSize: 16, fontFamily: Constant.MontserratSemiBold}
    ,

    DayTextBlock_Date:
    { color: 'grey', marginTop: 3, fontSize: 14, fontFamily: Constant.MontserratRegular},

    DaySecondBlock:{ height: '100%', width: '50%',  justifyContent: 'center', alignItems: 'flex-end', paddingRight: 14 },

    // PlusButton: {
    //     width: 45, height: 45, alignItems: 'center', justifyContent: 'center',  marginBottom: 10
    // },

    PlusButton: 
       { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16 }
    ,

    DayInnerContentProjectBarButton:{ width: "95%", height: 60, backgroundColor: '#5683AF', flexDirection: 'row', marginBottom: 2 },

    DayInnerContentProjectTask:{ height: '100%', width: '50%', flexDirection: 'column', justifyContent: 'center', paddingLeft: 10},

    DayInnerContentProjectTaskFont:{  color: 'white', fontSize: 16, },

    DayInnerContentProjectHr:{ height: '100%', width: '30%',  justifyContent: 'center', alignItems: 'flex-end', paddingRight: 14, backgroundColor: 'green' },

    DayInnerContentProjectHrFont:{ color: 'white', fontSize: 16, }


});

export default styles
