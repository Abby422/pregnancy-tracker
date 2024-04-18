import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,

} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { FIREBASE_APP } from "../Services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Services/firebaseConfig";
import { getPostsData, getUserData } from "../Services/fireStore";
import LottieView from "lottie-react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Loader";
import Post from "../components/Post";
import TextInputComponent from "../components/TextInput";
import AddPostDialog from "../components/AddPostDialog";
import Header from "../components/Header";
import TopicInfo from "../components/TopicInfo";

const auth = getAuth(FIREBASE_APP);

const Posts = ({ route }) => {
  const navigation = useNavigation();
  const { topic } = route.params;
  const id = topic.id;
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [comment, setComment] = useState("");
  const [showCamApp, setShowCamApp] = useState(false);
  const textInputRef = useRef(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = async () => {
    const postsData = await getPostsData(id);
    setPosts(postsData);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    if (userId) {
      getUser();
    }
    getPosts();
  }, [userId]);

  const getUser = async () => {
    const user = await getUserData(userId);
    if (user) {
      setUser(user.uName);
    }
  };

  const addPost = async (id, post, username) => {
    if (!post) {
      return;
    }
    console.log(id, post, username);
    const postData = { topicID: id, postContent: post, userName: username };

    try {
      const docRef = await addDoc(collection(db, "posts"), postData);

      if (docRef.id) {
        setPosts([
          ...posts,
          {
            id: docRef.id,
            topicID: id,
            postContent: post,
            userName: username,
          },
        ]);
        console.log("Post added successfully with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  };

  const hideDialog = () => setVisible(false);

  const handleAddPost = (text) => {
    addPost(id, text, user);
    setSelectedPost("");
    hideDialog();
  };

  const showDialog = (post) => {
    setSelectedPost(post);
    setVisible(true);
  };

  const handleFABPress = () => {
    setShowCamApp(true);
  };

  const handleComment = () => {
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
        <Comment key={comment.id} comment={comment} />
      ));
    }
  };

  const renderPosts = () => {
    return posts.map((post) =>
      id === post.topicID ? (
        <Post
          key={post.id}
          post={post}
          showComments={showComments}
          handleAddComment={handleAddComment}
        />
      ) : null
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <Header navigation={navigation} />
        <TopicInfo topic={topic} />
        <ScrollView>
          {posts ? (
            <View style={styles.content}>{renderPosts()}</View>
          ) : (
            <Loader />
          )}
        </ScrollView>

        <AddPostDialog
          visible={visible}
          hideDialog={hideDialog}
          selectedPost={selectedPost}
          handleComment={handleComment}
          comment={comment}
          setComment={setComment}
        />

        <View>
          <TextInputComponent
            ref={textInputRef}
            placeholder="Add Post"
            mode="outlined"
            activeOutlineColor="#ccc"
            style={{ position: "absolute", bottom: 0 }}
            onSubmitEditing={handleAddPost}
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
  content: {
    marginTop: 10,
  },
});

export default Posts;
