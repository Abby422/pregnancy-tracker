import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { WebView } from "react-native-webview";
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

const handleArticlePress = (article) => {
  navigation.navigate("ArticleDetailScreen", {
    title: article.headline,
    url: article.url,
  });
  console.log(`Article ${article.headline} pressed`);
};


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
      console.log("data",data.mainEntityOfPage[1].mainEntityOfPage);

      const articles = data.mainEntityOfPage[1].mainEntityOfPage;

      setArticle(articles || []);
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{margin: 20, fontWeight: "bold", fontSize: 24}}>Welcome new user </Text>
      <Image style={styles.image} source={require("../assets/Images/cute-baby.png")} />
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
        {article.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.headline}
            onPress={() => handleArticlePress(article)}
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


const ArticleDetailScreen = ({ route }) => {
  const { title, url } = route.params;
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();
        setArticleContent(data);
      } catch (error) {
        console.log("Error fetching article content", error);
      }
    };

    fetchArticleContent();
  }, [url]);

  return (
    <View style={styles.container}>
      <Text style={styles.articleDetailTitle}>{title}</Text>
      <WebView source={{ html: articleContent }} style={styles.webView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 10,
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
