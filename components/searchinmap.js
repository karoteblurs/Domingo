import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated } from 'react-native';

const SearchInMap = ({setIsMapModalOpen}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  const handlePress = () => {
    setIsAnimating(true);
    setIsMapModalOpen(true);
  }

  return (
    <TouchableOpacity
      style={[styles.button, isAnimating && styles.buttonAnimating]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Search in the Map</Text>
      <View style={[styles.buttonBefore, isAnimating && styles.buttonBeforeAnimating(animatedValue)]}></View>
      <View style={styles.buttonAfter}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#111',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 0,
  },
  buttonAnimating: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonBefore: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: '80%',
    height: '100%',
    zIndex: -1,
    borderRadius: 10,
    backgroundColor: 'transparent',
    backgroundSize: '400%',
    transitionProperty: 'background-color',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'linear',
  },
  buttonAfter: {
    position: 'absolute',
    width: '80%',
    height: '100%',
    backgroundColor: '#222',
    left: 0,
    top: 0,
    zIndex: -1,
    borderRadius: 10,
  },
  buttonBeforeAnimating: (animatedValue) => ({
    backgroundImage: 'linear-gradient(45deg, #48ff00, #000)',
    backgroundPosition: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0% 50%', '100% 50%'],
    }),
  }),
});

export default SearchInMap;