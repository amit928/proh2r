import {View, Text, Modal, TouchableOpacity, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import Nav from '../../components/NavBar';
// import MyText from '../../components/MyText/MyText';
// import {Colors, MyIcons} from '../../global/Index';
// import MyButton from '../../components/MyButton/MyButton';
const WishList = (props) => {
  //data
  const expData = [
    {
      id: 1,
      name: 'selection 1',
    },
    {
      id: 2,
      name: 'selection 2',
    },
    {
      id: 3,
      name: 'selection 3',
    },
    {
      id: 4,
      name: 'selection 4',
    },
  ];
  const expensesListData = [
    {
      expensesFieldId: 0,
      fieldName: 'Service',
    },
    {
      expensesFieldId: 0,
      fieldName: 'In Time',
    },
    {
      expensesFieldId: 0,
      fieldName: 'Out Time',
    },
    {
      expensesFieldId: 0,
      fieldName: 'SI Name',
    },
    {
      expensesFieldId: 0,
      fieldName: 'Customer Name',
    },
    {
      expensesFieldId: 0,
      fieldName: 'From Location',
    },
    {
      expensesFieldId: 0,
      fieldName: 'To Location',
    },
  ];
  //states
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showFormView, setShowFormView] = useState(false);
  const [selectedExp, setSelectedExp] = useState('');
  const [reason, setReason] = useState('');
  const [isBillable, setIsBillable] = useState(false);
  const [MyExpFieldList, setMyExpFieldList] = useState(expensesListData);
  const [ExplistComp, setExplistComp] = useState(expensesListData);

  const { goBack } = props.navigation;
  //function : service function
  const _handleSubmit = () => {
    const dataForPost = {
      expType: selectedExp,
      reason: reason,
      date: '01/05/2000',
      billable: isBillable,
      expensesFieldList: MyExpFieldList,
    };
    console.warn('dataForPost', dataForPost);
  };
  //UI
  return (
    
    <View
      style={{
        flex: 1,
      }}>
        
        <Nav
                backHidden={false}
                title="Wishlist"
                backAction={() => goBack()}>
                {' '}
            </Nav>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          {/* <MyText text="OpenModal" /> */}
          <Text  allowFontScaling={false} >Hi There</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="fade"
        transparent>
        <View
          style={{
            flex: 1,
            
          }}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{flex: 1, backgroundColor:'red'}}
          />
          <View
            style={{
              padding: 20,
              backgroundColor: 'white',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginHorizontal: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => setShowDropDown(!showDropDown)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                }}>
                {/* <MyText text={selectedExp ? selectedExp : 'Select'} /> */}
                <Text  allowFontScaling={false} >{selectedExp ? selectedExp : 'Select'}</Text>
                {/* <MyIcons.AntDesign name="down" /> */}
              </TouchableOpacity>
              {showDropDown ? (
                <View style={{borderWidth: 1, borderRadius: 10, padding: 10}}>
                  {expData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedExp(item.name);
                          setShowDropDown(false);
                        }}
                        style={{
                          paddingVertical: 10,
                          borderBottomWidth:
                            expData.length - 1 == index ? 0 : 1,
                        }}
                        key={item.id.toString()}>
                        {/* <MyText text={item.name} /> */}
                        <Text  allowFontScaling={false} >{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
            <Text  allowFontScaling={false} Input
              placeholder="Reason"
              placeholderTextColor='black'
              onChangeText={text => setReason(text)}
              style={{borderWidth: 1, borderRadius: 10, marginVertical: 10}}
            />
            <View style={{borderRadius: 10, borderWidth: 1, padding: 10}}>
              {/* <MyText text="01/05/2000" /> */}
              <Text  allowFontScaling={false} >01/05/2000</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsBillable(!isBillable)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              {/* <MyIcons.AntDesign
                name={isBillable ? 'checksquare' : 'checksquareo'}
                size={24}
              /> */}
              {/* <MyText text="Billable" marginHorizontal={10} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowFormView(!showFormView)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}>
              {/* <MyText text="choose an option" /> */}
              <Text  allowFontScaling={false} >choose an option</Text>
              {/* <MyIcons.AntDesign name="down" /> */}
            </TouchableOpacity>
            
            { showFormView ? 
            
            ExplistComp.map((item, index) => {
              return (
                <Text  allowFontScaling={false} Input
                  placeholder={item.fieldName}
                  onChangeText={text => {
                    const index = MyExpFieldList.findIndex(
                      e => e.fieldName == item.fieldName,
                    );
                    console.warn(index);
                    MyExpFieldList[index].fieldValue = text;
                  }}
                />
              );
            })
          :
          null
          }
            
            <Button title="Submit" onPress={_handleSubmit}  />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default WishList;