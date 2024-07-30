import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity, Modal, Dimensions, Image, ScrollView, ImageBackground
} from 'react-native';

import * as Utility from '../Externel Constant/Utility';
import * as Constant from '../Constant/Constants';
import CancelBtn from './CancelBtn';
import SubmitBtn from './SubmitBtn';
import { COLORS } from '../Constant/Index';
import SubmitBtnWide from '../components/SubmitBtnWide';
import CancelBtnWide from '../components/CancelBtnWide';
import CustomTextField from '../components/CustomTextField';
import CustomCommentInput from '../components/CustomCommentInput';
import { FloatBtnComp } from './CircularItem/FloatBtnComp';
import { Shadow } from 'react-native-shadow-2';
import ImageView from "react-native-image-viewing";
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({

  container: {
    height: "100%"
  },

  firstView: {
    width: "100%",

    alignItems: 'center',
    justifyContent: 'center'

  },

  titleView: { fontFamily: Constant.MontserratRegular, fontSize: 13, color: 'gray', paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: 150 },



  editBtn: { backgroundColor: 'rgba(242,242,242,1.0)', height: 40, width: "40%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginRight: 30 },

  saveBtn: { backgroundColor: 'rgba(86,105,233,1.0)', height: 40, width: "40%", justifyContent: 'center', alignItems: 'center', borderRadius: 20 },

});

export default class ViewItem extends Component {

  constructor(props) {

    super(props)

    this.state = {
      isEdit: false,
      btnContainerWidth: 0,
      isActionActive: false
    }

  }


  getTextStyle() {

    if (this.state.isEdit) {
      return {
        color: 'black',
        fontSize: 12,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, marginRight: 8,
        width: '50%',
        textAlign: 'left',
        fontFamily: Constant.MontserratRegular,
      }
    }
    else {
      return {
        color: 'black',
        fontSize: 12,
        marginRight: 8,
        paddingBottom: 6, paddingLeft: 20, paddingRight: 10, paddingTop: 20, width: '50%',
        textAlign: 'left',
        fontFamily: Constant.MontserratRegular,
      }
    }
  }



  render() {
    const { viewDetail, title, keyArr, valueArr, cancelAction, rejectApplication, actionIndex, approvedApplication, buttonDisable, apprRejectBtn, approveBtnAction, rejectBtnAction, showExpAttachment, openAttachment, viewAttachment, images,
      imageViewVisible,
      setimageViewVisible,
      pdfModal,
      setpdfModal,
      pdfSource } = this.props

    return (
      <>
        <Modal
          visible={viewDetail}
          transparent={true}
          onRequestClose={() => { cancelAction() }}
          animationType={'slide'}>


          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center', alignItems: 'center'


            }}>
            <TouchableOpacity onPress={() => cancelAction()} activeOpacity={1} style={{ height: '40%', width: '100%', }}></TouchableOpacity>




            <View style={{ flex: 1, width: '100%', borderTopStartRadius: 20, borderTopEndRadius: 20, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>

              {/* <FloatBtnComp/> */}





              <View style={{ display: 'flex', width: '100%', height: 50, backgroundColor: '#F6F4FB', alignItems: 'center', justifyContent: apprRejectBtn ? 'space-between' : 'center', borderBottomWidth: 0.7, borderColor: '#d7d0e1', flexDirection: 'row', paddingHorizontal: 12 }}>

                {apprRejectBtn ?

                  <TouchableOpacity onPress={approveBtnAction} style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>

                    <Image style={{
                      width: 20, height: 20, resizeMode: 'contain', tintColor: "#1e9603"
                      // marginLeft: 30,

                    }} source={require('../images/approvePopup.png')} />

                    <Text  allowFontScaling={false} style={{
                      alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#1e9603', fontFamily: Constant.MontserratRegular, marginLeft: 5
                      // fontWeight: 'bold'
                    }}>{'APPROVE'}</Text>

                  </TouchableOpacity>

                  : <></>}

                <Text  allowFontScaling={false} style={{ alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'black', fontWeight: '500', fontFamily: Constant.MontserratRegular }}>{'View Application'}</Text>

                {apprRejectBtn ?
                  <TouchableOpacity onPress={rejectBtnAction} style={{ width: 70, height: 30, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                    <Image style={{
                      width: 19, height: 19, resizeMode: 'contain', tintColor: '#c10b0b'
                      // marginLeft: 30,

                    }} source={require('../images/rejectPopup.png')} />

                    <Text  allowFontScaling={false} style={{
                      alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#c10b0b', fontFamily: Constant.MontserratRegular, marginLeft: 5
                      // fontWeight: 'bold'
                    }}>{'REJECT'}</Text>

                  </TouchableOpacity>
                  : <></>}

              </View>

              <ScrollView style={{
                backgroundColor: '#ffff', width: '100%', height: '100%',
                // borderTopStartRadius: 20, borderTopEndRadius: 20,
                padding: 20, paddingHorizontal: 12
              }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>


                {/* <View style={{ width: '100%', height: 0.5, backgroundColor: 'grey', marginTop: '1.5%' }}>
                  </View> */}

                {valueArr.map((m, i) =>
                  m != '' ?

                    parseInt(i + 1) == valueArr.length ?

                    keyArr[i] == "Comments" && (m == "undefined" || m == "null" || m == null || m == undefined) ?

                    <></>
                    :


                      <CustomCommentInput key={String(i)} viewOnly={true} editable={false} label={keyArr[i]} value={String(Utility.splitStatus(m))} />

                      :

                      

                      String(keyArr[i]) == "Attachment" ?

                        showExpAttachment ?

                          <View style={{ width: '100%', flexDirection: 'row' }}>
                            <View style={{ width: '75%' }}>
                              <CustomTextField key={String(i)} editable={false} label={keyArr[i]} value={String(Utility.splitStatus(m))} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 12, width: '20%', backgroundColor: '', alignItems: 'center', justifyContent: 'space-evenly' }}>

                              {openAttachment ?

                                <TouchableOpacity onPress={() => {
                                  openAttachment()
                                }}>
                                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../images/download.png')}></Image>
                                </TouchableOpacity>

                                :

                                <></>}

                              {viewAttachment ?

                                <TouchableOpacity onPress={() => {
                                  viewAttachment()
                                }}>
                                  <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: 'black' }} source={require('../images/eye.png')}></Image>
                                </TouchableOpacity>
                                :
                                <></>

                              }

                            </View>
                          </View>
                          : <CustomTextField key={String(i)} editable={false} label={keyArr[i]} value={String(Utility.splitStatus(m))} />

                        : <CustomTextField key={String(i)} editable={false} label={keyArr[i]} value={String(Utility.splitStatus(m))} />

                    :
                    <></>
                )

                }

                <View style={{ marginBottom: 30 }}></View>


              </ScrollView>
            </View>

          </View>

          {showExpAttachment ?

            <>

              <ImageView
                images={images}
                imageIndex={0}
                visible={imageViewVisible}
                onRequestClose={() => {

                  // let copyImages = images.length

                  // for (let index = 0; index < copyImages; index++) {

                  //   images.pop()

                  // }



                  // images.pop()


                  // console.log('higfyfsyuddguygjds');
                  setimageViewVisible()
                }}
              />


              <Modal
                animationType={"slide"}
                transparent={true}
                visible={pdfModal}
                onRequestClose={() => {


                  setpdfModal()

                }}
              >

                <View style={{
                  flex: 1,
                  backgroundColor: 'black'
                }}>

                  <View style={{ width: '100%', zIndex: 2, top: 0, backgroundColor: 'black', }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: '3%', marginTop: '7%', borderRadius: 22, padding: 3, }} onPress={() => {
                      setpdfModal()
                    }} >

                      <Image
                        source={require('../images/close.png')}
                        style={{
                          width: 22,
                          height: 22,
                          resizeMode: 'contain',
                          tintColor: 'white',


                        }} />

                    </TouchableOpacity>
                  </View>


                  <Pdf
                    source={pdfSource}
                    onLoadComplete={(numberOfPages, filePath) => {
                      console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                      console.log(error);
                    }}
                    onPressLink={(uri) => {
                      console.log(`Link pressed: ${uri}`);
                    }}
                    style={{
                      flex: 1,
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height - 80,
                      backgroundColor: 'black'
                    }} />



                </View>

              </Modal>
            </>

            : <></>}


        </Modal>
      </>
    )
  }
}