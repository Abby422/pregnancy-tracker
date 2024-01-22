import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, MD3Colors } from "react-native-paper";


const DateCalculator = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Icon source="date" color={MD3Colors.error50} size={20} />
        <Text style={styles.headerText}>Due Date Calculator</Text>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.contentText}>
              Enter the first day of your last period to calculate your due date
              </Text>
                <Text style={styles.contentText}>
                  First Day of Last Period
              </Text>
              </View>
      <Button>
        <Text>Calculate</Text>
              </Button>
    </View>
  );
}

export default DateCalculator

const styles = StyleSheet.create({
    
})