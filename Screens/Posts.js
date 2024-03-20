import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Dimensions} from "react-native";
import { Card, Title, Paragraph, Button, Portal, Dialog, TextInput, IconButton, Icon } from "react-native-paper";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Services/firebaseConfig";
import { getPostsData } from "../Services/fireStore";
import LottieView from "lottie-react-native";

  const Loader = () => {
    return (
      <View style={styles.loader}>
        <LottieView
          source={require("../assets/animation.json")}
          autoPlay
          loop
          style={styles.loader}
        />
      </View>
    );
  };


const Posts = ({ route }) => {
  const navigation = useNavigation();
  const { topic } = route.params;
  console.log(topic, "topic");
  const id = topic.id;
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const postsData = await getPostsData(id);
    console.log(postsData, "postsData");
    setPosts(postsData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const addPost = async (id, post) => {
    const postData = { topicID: id, postContent: post };

    try {
      const docRef = await addDoc(collection(db, "posts"), postData);

      if (docRef.id) {
        setPosts([
          ...posts,
          {
            id: docRef.id,
            topicID: id,
            postContent: post,
          },
        ]);
        console.log("Post added successfully with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  };

  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [comment, setComment] = useState("");

  const textInputRef = useRef(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleAddPost = () => {
    // logic to handle adding a new post
    console.log(`Add post: ${selectedPost}`);
    addPost(id, selectedPost);
    // update state or send the post to backend here
    setSelectedPost("");
    hideDialog();
  };
  const showDialog = (post) => {
    setSelectedPost(post);
    setVisible(true);
  };

  
  const CustomTextInput = React.forwardRef((props, ref) => {
    const [text, setText] = React.useState("");

    const handleTextChange = (text) => {
      setText(text);
      if (props.onChangeText) {
        props.onChangeText(text);
      }
    }
    return (
      <View style={[styles.containerText, props.style]}>
        <TextInput {...props} style={styles.input} ref={ref} value={text} onChangeText={handleTextChange}/>
        <View style={styles.iconContainer}>
          <IconButton
            icon="camera"
            onPress={() => console.log("Camera icon pressed")}
            style={styles.icon}
          />
          <IconButton
            icon="send"
            onPress={() => handleAddPost()}
            style={styles.icon}
          />
        </View>
      </View>
    );
  });

  const hideDialog = () => setVisible(false);

  const [showCamApp, setShowCamApp] = useState(false);

  const handleFABPress = () => {
    setShowCamApp(true);
  };

  const handleComment = () => {
    // logic to handle commenting on posts
    console.log(`Comment on post ${selectedPost.id}: ${comment}`);
    setComments([
      ...comments,
      { id: comments.length + 1, postId: selectedPost.id, content: comment },
    ]);
    // update state or send the comment to backend here
    hideDialog();
  };

  const handleAddComment = (post) => {
    const updatedPosts = filteredPosts.map((p) => {
      if (p.id === post.id) {
        return { ...p, showCommentInput: !p.showCommentInput };
      }
      return p;
    });
    setFilteredPosts(updatedPosts);
  };

  const showComments = (postId) => {
    if (comments.length === 0) {
      return <Text>No comments available for this post.</Text>;
    }
    if (comments.postId == postId) {
      return comments.map((comment) => (
        <Card key={comment.id} style={styles.card}>
          <Card.Content>
            <Paragraph>{comment.content}</Paragraph>
          </Card.Content>
        </Card>
      ));
    }
  };
  const renderPosts = () => {
    return posts.map((post) =>
      id === post.topicID ? (
        <Card key={post.id} style={styles.card}>
          <Card.Content>
            <Title>user</Title>
            <Paragraph>{post.postContent}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <TouchableOpacity
              style={styles.button}
              onPress={() => showComments(post.id)}
            >
              <IconButton icon="comment" size={20} color="#007AFF" />
              <Text style={styles.buttonText}>View Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAddComment(post)}
            >
              <IconButton icon="pencil" size={20} color="#007AFF" />
              <Text style={styles.buttonText}>Add Comment</Text>
            </TouchableOpacity>
          </Card.Actions>
          {post.showCommentInput && (
            <CustomTextInput
              placeholder="Add a comment"
              onSubmitEditing={(text) => handleComment(post, text)}
            />
          )}
        </Card>
      ) : null
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconButton icon="arrow-left" size={30} iconColor="#000" />
        </TouchableOpacity>
        <View style={styles.topicContainer}>
          <Text style={styles.topicTitle}>{topic.topic}</Text>
          <Text style={styles.topicDescription}>{topic.description}</Text>
        </View>
        <ScrollView>
        {posts ? <View style={styles.content}>{renderPosts()}</View>
        :
        <><Loader /></>}
          
        </ScrollView>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{selectedPost.title}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{selectedPost.content}</Paragraph>
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
          <View>
            <CustomTextInput
              ref={textInputRef}
              placeholder="Add Post"
              mode="outlined"
              activeOutlineColor="#ccc"
              style={{ position: "absolute", bottom: 0 }}
            />
          </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  input: {
    borderRightColor: "#fff",
    flex: 1,
  },
  topicContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 16,
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    flexGrow : 1,
    width: 400,
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  content: {
    marginTop: 10,
  },
  card: {
    marginBottom: 8,
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Posts;
