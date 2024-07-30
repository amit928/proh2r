import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

// const screenDimensions = Dimensions.get('screen');

export default function RingAnimation() {

  const screenWidth = Dimensions.get('screen').width;

  const duration = 900;
  const animationWidth = screenWidth/11;

  const ring1WidthAndHeight = screenWidth/15
  const ring2WidthAndHeight = ring1WidthAndHeight*2

  const width = useSharedValue(ring1WidthAndHeight);
  const height = useSharedValue(ring1WidthAndHeight);
  const opacity = useSharedValue(1);

  const width2 = useSharedValue(ring2WidthAndHeight);
  const height2 = useSharedValue(ring2WidthAndHeight);
  const opacity2 = useSharedValue(1);

  


  // const [dimensions, setDimensions] = useState({
  //   screenWidth: screenDimensions.width,
  //   screenHeight: screenDimensions.height
  // });

  const startAnim = () => {
    width.value += animationWidth;
    height.value += animationWidth;
    opacity.value = withTiming(0, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }, () => runOnJS(resetValues)());

    width2.value += animationWidth;
    height2.value += animationWidth;
    opacity2.value = withTiming(0, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const resetValues = () => {
    width.value = ring1WidthAndHeight;
    height.value = ring1WidthAndHeight;
    // opacity.value = 1;
    opacity.value = withTiming(1, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }, () => runOnJS(startAnim)());

    width2.value = ring2WidthAndHeight;
    height2.value = ring2WidthAndHeight;
    opacity2.value = 1;
    // opacity.value = withTiming(1, {
    //   duration: duration,
    //   easing: Easing.inOut(Easing.ease),
    // }, () => resetValues());
  };

  const animatedProps = useAnimatedProps(() => ({
    width: withTiming(width.value, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }),
    height: withTiming(height.value, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }),
    opacity: withTiming(opacity.value, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    width: withTiming(width2.value, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }),
    height: withTiming(height2.value, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }),
    opacity: withTiming(opacity2.value, {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  useEffect(() => {
    runOnJS(startAnim)();

    console.log(screenWidth);

  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            borderRadius: 2000,
            borderWidth: 4,
            borderColor: 'rgba(52,74,235,0.5)',
            position: 'absolute',
          },
          animatedProps,
        ]}
      />
      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            borderRadius: 2000,
            borderWidth: 4,
            borderColor: 'rgba(52,74,235,0.8)',
            position: 'absolute',
          },
          animatedProps2,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 3, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', zIndex: 20
  },
});
