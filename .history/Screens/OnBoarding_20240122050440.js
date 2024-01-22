import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Text } from "react-native-paper";
import Calendar from '../components/Calendar';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const OnBoarding = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome! 🥳</Text>
        <Card>
          <Card.Content>
            <Text variant="bodyMedium" style={styles.contentText}>
             
              Choose your due date to personalize your experience
            </Text>
            
            <Calendar />
          </Card.Content>
          <Card.Actions>
            <Button background={
              <LinearGradient
                colors={['#FF9800', '#F44336']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color:'#fff'
                }]}>Sign In</Text>
              </LinearGradient>
            
            }>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
   
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  }, 
  contentText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    margin: 10,
  }
})