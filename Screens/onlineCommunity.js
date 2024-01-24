import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Card, Button, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TopicCard = ({ topic, description, onPress }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title>{topic}</Title>
      <Paragraph>{description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={onPress}>View Posts</Button>
    </Card.Actions>
  </Card>
);

const OnlineCommunity = () => {
  const navigation = useNavigation();

  const topics = [
  {
    id: 1,
    topic: "Pregnancy Vacation",
    description: "Plan the perfect getaway for expectant mothers! Share recommendations for pregnancy-friendly destinations, travel tips, and must-have items for a relaxing pregnancy vacation.",
  },
  {
    id: 2,
    topic: "Healthy Pregnancy Diet",
    description: "Explore and discuss nutritious food choices, recipes, and meal plans to ensure a healthy and balanced diet during pregnancy. Share your favorite prenatal snacks and get advice from other moms-to-be.",
  },
  {
    id: 3,
    topic: "Maternity Fashion",
    description: "Stay stylish and comfortable during pregnancy! Share fashion tips, outfit ideas, and recommendations for maternity clothing. Discuss where to find trendy and affordable maternity wear.",
  },
  {
    id: 4,
    topic: "Fitness for Moms-to-Be",
    description: "Stay active and fit during pregnancy! Discuss safe and effective exercises for expectant mothers, share prenatal workout routines, and get tips on maintaining a healthy fitness routine.",
  },
  {
    id: 5,
    topic: "Baby Shower Planning",
    description: "Plan the perfect baby shower celebration! Share ideas for themes, decorations, games, and gifts. Get advice on organizing a memorable event to celebrate the upcoming arrival of your little one.",
  },
  ];

  const navigateToPosts = (topic) => {
    navigation.navigate("Posts", { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10}} >Welcome to the Online Community</Text>
      <ScrollView>
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic.topic}
          description={topic.description}
          onPress={() => navigateToPosts(topic)}
        />
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  card: {
    marginBottom: 16,
  },
});

export default OnlineCommunity;
