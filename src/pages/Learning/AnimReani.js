import React, { useEffect, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import {
    StyleSheet,
    Image,
    View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert, Button
} from 'react-native';

export default function AnimReani() {
    const offset = useSharedValue(0);

    // const animatedStyles = useAnimatedStyle(() => {
    //     return {
    //         transform: [{ translateX: offset.value * 255 }],
    //     };
    // });
    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [
            {
              translateX: withSpring(offset.value * 255),
            },
          ],
        };
      });

    return (
        <>
            <Animated.View style={[{ width: 50, height: 50, backgroundColor: 'blue', }, animatedStyles]} />
            <Button onPress={() => (offset.value = Math.random())} title="Move" />

            <Button
                onPress={() => {
                    offset.value = withSpring(Math.random());
                }}
                title="Move"
            />
        </>
    );
}