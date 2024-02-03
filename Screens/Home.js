import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import Svg, { Path } from "react-native-svg";
import { pregnancyData } from "../lib/pregnancy";
import { Divider } from "react-native-paper";

// Function to calculate the due date and remaining weeks
const calculateDueDate = (currentDate, pregnancyDuration) => {
  const dueDate = new Date(currentDate);
  dueDate.setDate(dueDate.getDate() + pregnancyDuration * 7);
  const remainingWeeks = Math.ceil(
    (dueDate - currentDate) / (1000 * 60 * 60 * 24 * 7)
  );
  return { dueDate, remainingWeeks };
};

const Home = () => {
  const pregnancyDuration = 40;
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

  const handleMotherDetailsPage = (id) => {
    navigation.navigate("MotherDetailsScreen", {
      id: id,
    });
  }
  useEffect(() => {
    const { dueDate, remainingWeeks } = calculateDueDate(
      currentDate,
      pregnancyDuration
    );
    setDueDate(dueDate);
    setRemainingWeeks(remainingWeeks);

    console.log(babyData);
  }, [currentDate]);

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

  return (
    <>
      <Svg
        height={200}
        width={Dimensions.get("screen").width}
        viewBox="0 0 1440 320"
        style={styles.topWavy}
      >
        <Path
          fill="#BBE7FE"
          d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </Svg>
      <ScrollView style={styles.container}>
        <Text style={{ margin: 20, fontWeight: "bold", fontSize: 24 }}>
          Welcome {" John Doe"}
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/Images/cute-baby.png")}
        />
        <InfoCard
          style={styles.infoCard}
          label="Due Date"
          value={dueDate ? dueDate.toDateString() : ""}
        />
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

const ArticleDetailScreen = ({ route }) => {
  const { id } = route.params;
  // const [articleContent, setArticleContent] = useState("");

  const data = pregnancyData.find((week) => week.id === id);
  const Baby = data.Baby;
  console.log("data", Baby);

  return (
    <View style={styles.container}>
      <Text style={styles.articleDetailTitle}>{Baby.Heading}</Text>
      <View>
        <Text>{Baby.Reviewed}</Text>
        <Text>{Baby.Written}</Text>
        <Divider />
        <Text>{Baby.subHeading}</Text>
        <Text>{Baby.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingTop: 10,
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
export { ArticleDetailScreen };
