import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OnBoarding = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>OnBoarding</Text>
      </View>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})