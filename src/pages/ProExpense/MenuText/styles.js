import { StyleSheet } from 'react-native'
//import { COLORS } from '../../CustomComponent/Colors';

const styles = StyleSheet.create(
    {
        signup_fieldview: {
            width: '90%',
            height: 50,
            borderWidth: 1,
            alignSelf: 'center', justifyContent: 'center',
            marginTop: '2%', borderColor: '#fff',
            borderRadius: 8, backgroundColor: '#fff', marginLeft: 5
        },
        Sports: {
            position: 'absolute',
            right: "5%",
            alignSelf: 'center'
            , width: 18, height: 10
        },
        menuText:
        {
            marginLeft: "8%", fontSize: 14, marginBottom: 5, fontFamily: 'Roboto-Medium', color: '#000'
        },
        textList:
            { fontFamily: 'Roboto-Medium', marginLeft: "8%", fontSize: 14, color: '#000' },
        menuView:
            { width: "83%", marginTop: "1%", height: '40%' }
    }
)

export default styles;