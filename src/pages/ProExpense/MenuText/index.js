import React from 'react';
import { ScrollView, TouchableOpacity, Text, Image, View } from 'react-native';
import styles from './styles';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
//import { ImagesUrl } from '../../CustomComponent/ImageUrl';
//import { COLORS } from '../../CustomComponent/Colors';

const MenuField = ({ visible, placeHolder, showMenu, hideMenu, selectAction, data, title, signup_fieldview, placeText }) => {
    //console.log("dtata:::", data)
    return (
        <TouchableOpacity style={[styles.signup_fieldview, signup_fieldview]} onPress={showMenu}>
            <Menu
                style={{ width: "83%", marginTop: "0%", padding: 5, }}
                visible={visible}
                onRequestClose={hideMenu}
                anchor={
                    placeHolder != '' ?
                        <Text  allowFontScaling={false}  style={{
                            fontSize: 13, marginBottom: 5, fontFamily: 'Roboto-Regular', color:'#000'
                        }}>{title == "weight" || title == "One Weight" || title == "Two Weight" || title == "Three Weight" ? placeHolder + " lbs" : placeHolder}</Text>
                        :
                        <Text  allowFontScaling={false}  style={{
                            fontSize: 13, marginBottom: 5, fontFamily: 'Roboto-Regular', color:'#000'
                        }}>{placeText}</Text>

                }><ScrollView>
                    {title == "" ?
                        data.map((item, index) =>
                            <MenuItem
                                key={index.toString()}
                                onPress={() => {
                                    hideMenu();
                                    selectAction(item,item.id);
                                }}>
                                <Text  allowFontScaling={false}  style={{ fontFamily: 'Roboto-Regular', marginLeft: "8%", fontSize: 12, color:'#000' }}>{item.title}</Text>
                            </MenuItem>
                        ):
                        title == "xyz" ?
                        data.map((item, index) =>
                        <MenuItem
                            key={index.toString()}
                            onPress={() => {
                                hideMenu();
                                selectAction(item.title,item.id);
                            }}>
                            <Text  allowFontScaling={false}  style={{ fontFamily: 'Roboto-Regular', marginLeft: "8%", fontSize: 12, color:'#000' }}>{item.title}</Text>
                        </MenuItem>
                    )
                        :
                        null
                    }
                </ScrollView>
            </Menu>
            {/* <Image style={styles.Sports} source={ImagesU}></Image> */}
        </TouchableOpacity>
    )
}

export default MenuField;

