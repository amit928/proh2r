import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, Modal, ImageBackground, Picker } from 'react-native';
import KeyStore from '../../Store/LocalKeyStore'
import * as Constant from '../../Constant/Constants';
import Loader from '../../components/Loader';
import Nav from '../../components/NavBar';
import TopScrollTab from '../../components/TopScrollTab';

import ProSepertionRequest from './ProSeperationRequest';
import ProSeperationInitiate from './ProSeperationInitiate';

import Moment from 'moment';


const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',

  },

  selectedView: {
    marginLeft: 4, marginRight: 5, borderWidth: 0.5, borderColor: 'gray'
    , backgroundColor: 'rgba(52,74,235,1.0)', borderRadius: 15
    , paddingLeft: 15, paddingRight: 15, height: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
  },
  unSelectedView: {
    marginLeft: 4, marginRight: 5, borderWidth: 0.5, borderColor: 'gray'
    , backgroundColor: 'white', borderRadius: 15
    , paddingLeft: 15, paddingRight: 15, height: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
  },
  selectedText: {
    fontFamily: Constant.MontserratSemiBold, color: 'white', fontSize: 10
  },
  unSelectedText: {
    fontFamily: Constant.MontserratSemiBold, color: 'gray', fontSize: 10
  },

}
)

const checkNull = (value, passValue) => {
  if (value == null || value == "null") {
    return passValue
  }
  else {
    return value
  }
}

export default class SeperationTab extends React.Component {

  static navigationOptions = {
    gesturesEnabled: false,
    disableGestures: true
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      topScrollTap: [{ title: 'Initiate/Check Separation Requests', isSelect: true }],
      navTitle: 'Separation',
      selectedPage: 0,

    }
  }

  componentDidMount() {

    KeyStore.getKey('separationSupervisor', (err, value) => {
      if (value) {

        let arr = [{ title: 'Initiate/Check Requests', isSelect: true }, { title: 'All Requests', isSelect: false }]
        this.setState({ topScrollTap: arr })
      }
    });
  }


  btnAction = (value) => {

    let arr = []

    this.state.topScrollTap.map((item, index) => {
      item.isSelect = false
      arr.push(item)
    }
    )

    arr[value].isSelect = true

    this.setState({ topScrollTap: arr, navTitle: arr[value].title, selectedPage: value })
  }

  render() {

    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (

      <View style={styles.container}>

        <Nav title={"Separation"} backHidden={false} backAction={() => goBack()}> </Nav>

        {
          this.state.topScrollTap.length != 1
            ? <>
              {/* <View style={{shadowOffset: { width: 0, height: 2, },shadowColor: 'rgba(224,225,227,1.0)',shadowOpacity: 3.0,
        elevation:3,marginTop:8,height:60,width:'100%',backgroundColor:'rgba(239,240,241,1.0)}'}}>       */}

              <TopScrollTab btnAction={this.btnAction} itemArr={this.state.topScrollTap}></TopScrollTab>

              {/* </View> */}
            </>
            :
            <></>
        }
        <View style={{ flex: 1 }}>
          {

            this.state.selectedPage == 0 ? <ProSeperationInitiate openApplyReg={this.props.route.params?.openApplyReg} navigation={this.props.navigation} goBack={goBack}></ProSeperationInitiate> :
              <ProSepertionRequest navigation={this.props.navigation}></ProSepertionRequest>
          }
        </View>

        <Loader isLoader={this.state.loading}> </Loader>
      </View>
    );
  }

}