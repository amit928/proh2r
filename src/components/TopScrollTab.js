import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import KeyStore from '../Store/LocalKeyStore'
import * as Constant from '../Constant/Constants';
import { Shadow } from 'react-native-shadow-2';

const styles = StyleSheet.create({
  selectedView: {
    // marginLeft:4,marginRight:5,
    // borderWidth:0.5,borderColor:'gray',
    // backgroundColor: 'rgba(52,74,235,1.0)'
    // ,borderRadius:15
    paddingLeft: 15, paddingRight: 15
    , height: '100%',
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4, borderBottomColor: 'rgba(68,102,179,1.0)', backgroundColor: 'white'
  },
  unSelectedView: {
    // marginLeft:4,marginRight:5,
    // borderWidth:0.5,borderColor:'gray',
    backgroundColor: 'white'
    // ,borderRadius:15
    , paddingLeft: 15, paddingRight: 15, height: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
  },
  selectedText: {
    fontFamily: Constant.MontserratMedium, color: 'rgba(68,102,179,1.0)', fontSize: 14
  },
  unSelectedText: {
    fontFamily: Constant.MontserratMedium, color: '#b3b3b3', fontSize: 14
  },
})

export default class TopScrollTab extends React.Component {

  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true
  }

  constructor(props) {
    super(props)
    this.state = {
      token: '',
      employeeCode: '',
      loading: false,
    }
  }

  componentDidMount() {

  }

  render() {

    const { itemArr, btnAction } = this.props
    return (

      <>
        <Shadow distance={5} containerViewStyle={{


          zIndex: 1
        }} offset={[0.2, 2]}
          startColor='#e6e6e6'

        >
          <View style={{

            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 8, 
            height: 45, width: '100%', backgroundColor: 'rgba(239,240,241,1.0)},', zIndex: 1
          }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
              flexGrow: 1, justifyContent: 'center'
              // , borderWidth: 0.5, borderColor: 'green'
              , backgroundColor: 'white', height: '100%'
            }}>
              {
                itemArr.map((item, index) => {

                  if (item.title == null)

                    return <React.Fragment key={index} />

                  else

                    return <TouchableOpacity style={item.isSelect ? styles.selectedView : styles.unSelectedView}

                      onPress={() => {
                        console.log(index);
                        btnAction(index)
                      }}

                      key={index}>
                      <Text allowFontScaling={false} style={item.isSelect ? styles.selectedText : styles.unSelectedText}>{item.title}</Text>
                    </TouchableOpacity>

                }
                )
              }

            </ScrollView>
          </View>

        </Shadow>

      </>


    );
  }
}