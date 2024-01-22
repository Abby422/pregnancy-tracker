import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

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
  const pregnancyDuration = 40; // Adjust this value based on the average pregnancy duration
  const [article, setArticle] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(null);
  const [remainingWeeks, setRemainingWeeks] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const { dueDate, remainingWeeks } = calculateDueDate(
      currentDate,
      pregnancyDuration
    );
    setDueDate(dueDate);
    setRemainingWeeks(remainingWeeks);

    getArticles();
    console.log(getArticles());
  }, [currentDate]);
  const getArticles = async () => {
    try {

      

      const response = await fetch("https://api.nhs.uk/pregnancy/", { method: 'GET', headers: { 'subscription-key': 'a0c4c4c4c4c44c4c8c4c4c4c4c4c4c4c' }});
      const data = await response.json();
      console.log("data",data);

      const description = data.description;
      console.log("description",description);

      const headline = data.headline;
      console.log("headline",headline);

      const mainEntityOfPage = data.mainEntityOfPage;
      console.log("mainEntityOfPage",mainEntityOfPage);

      // const data = await response;
      // console.log(response.mainEntityOfPage);
      // setArticle(data.headlines || []);
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
        {article &&
          article.map((articles, index) => (
            <ArticleCard
              key={index}
              title={articles.headline}
              onPress={() => handleArticlePress(articles)}
            />
          ))}
      </View>
    </ScrollView>
  );
};

const InfoCard = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

// Component for displaying articles
const ArticleCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.readMore}>Read More</Text>
  </TouchableOpacity>
);

const handleArticlePress = (articleNumber) => {
  navigation.navigate("ArticleDetail", {
    title: article.headline,
    url: article.url,
  });
  console.log(`Article ${articleNumber} pressed`);
};

const ArticleDetailScreen = ({ route }) => {
  const { title, url } = route.params;

  return (
    <View style={styles.articleDetailContainer}>
      <Text style={styles.articleDetailTitle}>{title}</Text>
      <Text>{url}</Text>
      {/* You can display more details or load the content from the URL here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});

export default Home;
export { ArticleDetailScreen };
