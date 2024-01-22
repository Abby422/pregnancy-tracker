import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OnBoarding = () => {
  return (
    <Swiper navigation={this.props.navigation}>
      {/* First screen */}
      <View style={styles.slide}>
        <Icon name="ios-home" {...iconStyles} />
        <Text style={styles.header}>one</Text>
        <Text style={styles.text}>one</Text>
      </View>
      {/* Second screen */}
      <View style={styles.slide}>
        <Icon name="ios-people" {...iconStyles} />
        <Text style={styles.header}>two</Text>
        <Text style={styles.text}>two</Text>
      </View>
      {/* Third screen */}
      <View style={styles.slide}>
        <Icon name="ios-videocam" {...iconStyles} />
        <Text style={styles.header}>three</Text>
        <Text style={styles.text}>three</Text>
      </View>
    </Swiper>
  );
}

export default OnBoarding

const styles = StyleSheet.create({})