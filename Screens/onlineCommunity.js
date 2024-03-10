import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Card,
  Button,
  Paragraph,
  Title,
  Searchbar,
  FAB,
  Portal,
  Modal,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Services/firebaseConfig";
import { err } from "react-native-svg";
import { getTopicsData } from "../Services/fireStore";


const {width, height} = Dimensions.get('screen');
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
  const [visible, setVisible] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    try {
      let topicsObj = await getTopicsData();
      console.log(topicsObj, "topicsObj")
      setTopics(topicsObj);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, width: width * 0.8, height: height * 0.5, alignSelf: 'center'};

  const addTopic = async (topic, description) => {
    // Logic to add the new topic and description to firebase
    const topicData = { topicName : topic, description: description };

    try {
          // const userDocRef = doc(db, "topics", topic);

          const docRef = await addDoc(collection(db, "topics"), topicData);

          console.log("Topic added successfully:", topicData, docRef.id);


    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const handleNewTopic = async () => {
    // Logic to handle the new topic and description
    console.log("New Topic:", newTopic);
    console.log("New Description:", newDescription);

    // Add the new topic to the topics array
    await addTopic(newTopic, newDescription);
    // Clear the input fields
    setNewTopic("");
    setNewDescription("");

    // Close the modal
    hideModal();
  };

  const navigateToPosts = (topic) => {
    navigation.navigate("Posts", { topic: topic });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Online Community
      </Text>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.modalContent}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Add New Topic
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Topic Title"
              value={newTopic}
              onChangeText={setNewTopic}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              multiline
            />
            <Button
              onPress={handleNewTopic}
              mode="outlined"
              style={{ width: width * 0.4 }}
            >
              Add Topic
            </Button>
          </View>
        </Modal>
      </Portal>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        size="true"
        onIconPress={() => {
          console.log("Searching...");
        }}
      />
      <View style={styles.filter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FAB
            icon="plus"
            size="true"
            label="Add Topic"
            style={styles.fab}
            onPress={showModal}
          />
          <FAB
            icon="book"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
            label="Saved"
          />
          <FAB
            label="Popular"
            icon="fire"
            style={styles.fab}
            size="true"
            onPress={() => console.log("Pressed")}
          />
          <FAB
            icon=""
            label="Following"
            size="true"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
          />
        </ScrollView>
      </View>
      <ScrollView>
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic.topicName}
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
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    scrollable: true,
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
    width: width * 0.5,
    height: height * 0.05,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderCurve: 5,
    overflow: "hidden",
    borderStyle: "solid",
    borderWidth: 2,

  },
  fab: {
    backgroundColor: "white",
    margin: 8,
    width: "auto",
  },
});

export default OnlineCommunity;
