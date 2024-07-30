import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard}>
      <View style={styles.flipCardContainer}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.cardText}>Front</Text>
        </Animated.View>
        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
          <Text style={styles.cardText}>Back</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flipCardContainer: {
    width: 200,
    height: 300,
    perspective: 1000,
  },
  flipCard: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
  },
});

export default FlipCard;
