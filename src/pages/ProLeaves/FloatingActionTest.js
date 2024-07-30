import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text
} from 'react-native';

import { FloatingMenu } from 'react-native-floating-action-menu';



export const FloatingActionTest = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false)


    const items = [
        { label: 'Level 1 Pending', image: require('../../images/timesheetSubmitted.png') },
        { label: 'Approved Only' , image: require('../../images/timeSheetApproved.png')},
        { label: 'Rejected Only' , image: require('../../images/timesheetRejected.png')},
        // { label: 'Level 1 Pending', image: require('../../images/floatBtn.png') },
    ];

    const images = [
        {
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
    ];

    const handleMenuToggle = () =>
        setisMenuOpen(!isMenuOpen);

    const handleItemPress = (item, index) =>
        console.log('pressed item', item);


    const renderItemIcon = (item, index, menuState) => {
        const { itemsDown, dimmerActive } = menuState;

        console.log('renderItemIcon', menuState);

        const isItemPressed = itemsDown[index];
        const color = isItemPressed ? '#fff' : '#09f';

        // Icons can be rendered however you like.
        // Here are some examples, using data from the item object:



        return (
            <Image
                source={item.image}
                style={{ width: "100%", height: "100%", resizeMode: 'contain',  }}
                // style={{ tintColor: color }}
                // resizeMode="contain"
            />
        );
    }



    return (


        <View style={{
            width: '100%',
            height: '100%',
            position: 'relative',
        }}>
            <FloatingMenu
                isOpen={isMenuOpen}
                items={items}
                onMenuToggle={handleMenuToggle}
                onItemPress={handleItemPress}
                renderItemIcon={renderItemIcon}
            />
        </View>

    )

}

