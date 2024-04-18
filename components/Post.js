import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Services/firebaseConfig";

const Post = ({ post, showComments, handleAddComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [postDate, setPostDate] = useState(post.postDate);
  const [editedContent, setEditedContent] = useState(post.postContent);


  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    handlePostDate();
  }, []);

  const handlePostDate = () => {
    // Random Date
    const date = new Date();
    const formattedDate = date.toDateString();
    setPostDate(formattedDate);
  }

  const handleSave = async () => {
    // Update the post content in the database
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, { postContent: editedContent });

    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Card key={post.id} style={styles.card}>
        <Card.Content>
          <Title>{post.userName}</Title>
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedContent}
              onChangeText={(text) => {
                setEditedContent(text);
              }}
              autoFocus={true}
              editable={true}
            />
          ) : (
            <Paragraph>{post.postContent}</Paragraph>
          )}
        </Card.Content>
        <Card.Actions>
   {/* Show the post date */}
            <Text style={{
                fontSize: 12,
                color: "#666",
                marginTop: 5,
                fontStyle: "italic"
            }}>{postDate}</Text>
        </Card.Actions>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 8,
    paddingBottom: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
});

export default Post;
