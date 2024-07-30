import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const ExpandAnim = () => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    setExpanded(!expanded);
    // if (expanded) {
    //   Animated.timing(animation, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: false,
    //   }).start();
    // } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    // }
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text allowFontScaling={false}  style={styles.title}>Click to Expand</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height }]}>
        <Text allowFontScaling={false}  style={styles.text}>This is the content that will be expanded</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginVertical: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
  },
});

export default ExpandAnim;
