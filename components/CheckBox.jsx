import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, Vibration, Animated } from 'react-native'
import color from '../assets/colors'

const CheckBox = ({ setter, getter }) => {

  const [animationCheckTrue, setAnimationCheckTrue] = useState(new Animated.Value(0))

  const handleCheck = () => {
    Vibration.vibrate(100)
    setter(!getter)
  }

  useEffect(() => {

    if (getter) {
      Animated.timing(
        animationCheckTrue,
        {
          toValue: 0,
          duration: 350,
          useNativeDriver: false
        }
      ).start();
    }
    else {
      Animated.timing(
        animationCheckTrue,
        {
          toValue: 20,
          duration: 350,
          useNativeDriver: false
        }
      ).start();
    }

  }, [getter])

  return (
    <Pressable style={styles.container} onPress={handleCheck}>
      <View style={styles.content}>
        <Animated.View style={[styles.check, {
          backgroundColor: !getter ? color.accent100 : color.bg300,
          elevation: !getter ? 4 : 0,
          right: !getter && 0, left: animationCheckTrue
        }]} />
      </View>
    </Pressable>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: color.bg100,
    borderRadius: 10
  },

  check: {
    width: '60%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.bg100,
    shadowColor: color.accent100
  }
})