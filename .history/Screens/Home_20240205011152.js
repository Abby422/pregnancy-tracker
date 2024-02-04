import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { FIREBASE_APP } from "../Services/firebaseConfig";
import Svg, { Path } from "react-native-svg";
import { pregnancyData } from "../lib/pregnancy";
import { Divider } from "react-native-paper";
import { fetchUserData } from "../Services/fireStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const auth = getAuth(FIREBASE_APP);
const Home = () => {
  const [initializing, setInitializing] = useState(true);
  const pregnancyDuration = 40;
  const [userId, setUserId] = useState(null);
  const [article, setArticle] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(null);
  const [remainingWeeks, setRemainingWeeks] = useState(null);
  const navigation = useNavigation();

  const handleArticlePress = (id) => {
    navigation.navigate("ArticleDetailScreen", {
      id: id,
    });
  };

  // Function to calculate the due date and remaining weeks
  const calculateDueDate = (currentDate, pregnancyDuration) => {
    const dueDate = new Date(currentDate);
    dueDate.setDate(dueDate.getDate() + pregnancyDuration * 7);
    const remainingWeeks = Math.ceil(
      (dueDate - currentDate) / (1000 * 60 * 60 * 24 * 7)
    );
    return { dueDate, remainingWeeks };
  };

  const handleMotherDetailsPage = (id) => {
    navigation.navigate("MotherDetailsScreen", {
      id: id,
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("userid", user.uid);
      setUserId(user.uid);
      if (initializing) setInitializing(false);
    });
    const fetchedUserData = async () => {
      const userData = await fetchUserData(userId);
      if (userData) {
        setDueDate(userData.dueDate);
      }
    };

    fetchedUserData();
  }, [userId]);

  const babyData = () => {
    pregnancyData.forEach((week) => {
      // Extract week number from the object keys
      const weekNumber = week.id;

      // Extract Baby and Mother information for the current week
      const babyInfo = week.Baby;

      // Log or process babyInfo and motherInfo as needed
      console.log(`Week ${weekNumber}`);
      console.log("Baby Info:", babyInfo);
      // console.log("Mother Info:", motherInfo);
      setArticle(babyInfo || []);
    });
  };

  // const getArticles = async () => {
  //   try {
  //     const response = await fetch("https://api.nhs.uk/pregnancy/", { method: 'GET', headers: { 'subscription-key': 'a0c4c4c4c4c44c4c8c4c4c4c4c4c4c4c' }});
  //     const data = await response.json();
  //     console.log("data",data.mainEntityOfPage[1].mainEntityOfPage);

  //     const articles = data.mainEntityOfPage[1].mainEntityOfPage;

  //     setArticle(articles || []);
  //   } catch (error) {
  //     console.log("Error fetching Data", error);
  //   }
  // };
  StatusBar.setHidden(true);
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.topWavy}
          >
            <Path
              fill="#f3daff"
              fill-opacity="1"
              d="M0,256L34.3,245.3C68.6,235,137,213,206,208C274.3,203,343,213,411,234.7C480,256,549,288,617,277.3C685.7,267,754,213,823,197.3C891.4,181,960,203,1029,229.3C1097.1,256,1166,288,1234,272C1302.9,256,1371,192,1406,160L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </Svg>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginLeft: 20,
            color: "#2e004d",
          }}
        >
          Welcome {" John Doe"}
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/Images/cute-baby.png")}
        />
        <InfoCard style={styles.infoCard} label="Due Date" value={dueDate} />
        <View style={styles.infoContainer}>
          <InfoCard
            label="Weeks Pregnant"
            value={`${pregnancyDuration - remainingWeeks}`}
          />

          <InfoCard
            label="Remaining Weeks"
            value={remainingWeeks !== null ? remainingWeeks.toString() : ""}
          />
        </View>

        <View style={styles.articlesContainer}>
          <Text style={{ margin: 20, fontWeight: "bold", fontSize: 24 }}>
            Info about your baby
          </Text>
          {pregnancyData.map((week) => {
            return (
              <ArticleCard
                key={week.id}
                Heading={week.Baby.Heading}
                onPress={() => handleArticlePress(week.id)}
              />
            );
          })}
        </View>
        <View style={styles.articlesContainer}>
          <Text style={{ margin: 20, fontWeight: "bold", fontSize: 24 }}>
            Info about your body
          </Text>
          {pregnancyData.map((week) => {
            return (
              <ArticleCard
                key={week.id}
                Heading={week.mother.heading}
                onPress={() => handleMotherDetailsPage(week.id)}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const InfoCard = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

// Component for displaying articles
const ArticleCard = ({ Heading, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{Heading}</Text>
    <Text style={styles.readMore}>Read More</Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  box: {
    backgroundColor: "#f3daff",
    height: 80,
  },
  topWavy: {
    top: 0,
    position: "absolute",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#fff000",
    width: "30%",
    overflow: "hidden",
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 50,
    elevation: 3,
  },
  articlesContainer: {
    // Adjust styles for article container as needed
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  readMore: {
    color: "blue",
  },
  articleDetailContainer: {
    padding: 20,
  },
  articleDetailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  webView: {
    marginTop: 20,
  },
});

export default Home;
