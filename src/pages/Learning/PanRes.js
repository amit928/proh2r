import React, { useRef } from 'react';
import { PanResponder, View, StyleSheet, Animated } from 'react-native';

const PanRes = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ]),
    onPanResponderRelease: () => {
      // Handle release logic if needed
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});

export default PanRes;
