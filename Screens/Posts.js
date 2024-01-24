import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Portal,
  Dialog,
  TextInput,
  IconButton,
} from "react-native-paper";

const Posts = ({ route }) => {
  const navigation = useNavigation();
  const { topic } = route.params || {};

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Best Babymoon Destinations",
      content:
        "Share your favorite babymoon destinations and travel experiences during pregnancy. What are the must-visit places for expectant mothers?",
      topic: "Pregnancy Vacation",
    },
    {
      id: 2,
      title: "Nutritious Recipes for Moms-to-Be",
      content:
        "Discuss and share healthy recipes and meal plans for pregnant women. What are your favorite prenatal snacks and nutritious meals?",
      topic: "Healthy Pregnancy Diet",
    },
    {
      id: 3,
      title: "Stylish Maternity Outfits",
      content:
        "Show off your maternity fashion style! Share outfit ideas, where to find trendy maternity clothing, and tips for staying stylish during pregnancy.",
      topic: "Maternity Fashion",
    },
    {
      id: 4,
      title: "Safe Pregnancy Exercises",
      content:
        "Stay fit during pregnancy with safe exercises! Discuss prenatal workouts, yoga, and fitness routines for expectant mothers.",
      topic: "Fitness for Moms-to-Be",
    },
    {
      id: 5,
      title: "Creative Baby Shower Themes",
      content:
        "Share unique and creative baby shower themes. What themes have you seen or planned for baby showers? Get inspiration and ideas!",
      topic: "Baby Shower Planning",
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Filter posts based on the selected topic
    const filteredPosts = topic
      ? posts.filter((post) => post.topic === topic)
      : posts;

    setFilteredPosts(filteredPosts);
  }, [topic, posts]);

  const [filteredPosts, setFilteredPosts] = useState([]);

  const showDialog = (post) => {
    setSelectedPost(post);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleComment = () => {
    // Add logic to handle commenting on posts
    console.log(`Comment on post ${selectedPost.id}: ${comment}`);
    // You may want to update your state or send the comment to a backend here
    hideDialog();
  };

  const renderPosts = () => {
    if (filteredPosts.length === 0) {
      return <Text>No posts available for this topic.</Text>;
    }

    return filteredPosts.map((post) => (
      <Card key={post.id} style={styles.card}>
        <Card.Content>
          <Title>{post.title}</Title>
          <Paragraph>{post.content}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => showDialog(post)}>View Comments</Button>
        </Card.Actions>
      </Card>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={30} iconColor="#000" />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.content}>{renderPosts()}</View>
      </ScrollView>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{selectedPost.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{selectedPost.content}</Paragraph>
            {/* Add logic to display comments here */}
            <TextInput
              label="Your Comment"
              value={comment}
              onChangeText={(text) => setComment(text)}
              style={styles.commentInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleComment}>Comment</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Add a section for users to add new posts */}
      <View style={styles.addPostSection}>
        <Text style={styles.addPostText}>Add a New Post</Text>
        {/* Add input fields and a button for adding a new post */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  content: {
    marginTop: 20,
  },
  card: {
    marginBottom: 16,
  },
  commentInput: {
    marginBottom: 16,
  },
  addPostSection: {
    marginTop: 20,
  },
  addPostText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Posts;
