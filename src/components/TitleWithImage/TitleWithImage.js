//react components
import React from 'react';
import {View, Text, Image} from 'react-native';
//styles
import {styles} from './TitleWithImageStyle';

const TitleWithImage = ({ImageSource, TItle, styleObj={}, styleImage={}}) => {
  //UI
  return (
    <View style={[styles.container, styleObj]}>
      <Image style={[styles.ImageStyle, styleImage]} source={ImageSource} />
      <Text allowFontScaling={false} style={styles.titleStyle}>
        {TItle}
      </Text>
    </View>
  );
};

export default TitleWithImage;
