//react components
import React from 'react';
import {View, Text} from 'react-native';
//styles
import {styles} from './CirclularItemStyle';

const CircularItem = ({Value, Name}) => {
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text allowFontScaling={false} style={styles.valueText}>
          {Value}
        </Text>
      </View>
      <Text allowFontScaling={false} numberOfLines={2} style={styles.nameText}>
        {Name}
      </Text>
    </View>
  );
};

export default CircularItem;
