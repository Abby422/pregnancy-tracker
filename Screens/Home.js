import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, StatusBar,} from "react-native";
import { FIREBASE_APP } from "../Services/firebaseConfig";
import Svg from "react-native-svg";
import { pregnancyData } from "../lib/pregnancy";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import { fetchUserData, getUserData } from "../Services/fireStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InfoCard from "../components/InfoCard";
import ArticleCard from "../components/ArticleCard";

const auth = getAuth(FIREBASE_APP);

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});

const mapDispatch = (dispatch) => bindActionCreators({fetchUser}, dispatch)
const Home = () => {
  const [initializing, setInitializing] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const navigation = useNavigation();
  const [gestationAge, setGestationAge] = useState(0);
  const [remainingWeeks, setRemainingWeeks] = useState(null);

  const handleBabyDetailsPage = (id) => {
    navigation.navigate("ArticleDetailScreen", {
      id: id,
    });
  };

  const calculateWeeksPregnant = () => {
    // Parse the dueDate string into a Date object
    const dueDateObject = new Date(dueDate);
    if (isNaN(dueDateObject.getTime())) {
      console.error("Invalid due date format.");
      return;
    }

    const currentDate = new Date(); // Current date
    const gestationalAge = 40; // Gestational age in weeks
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in a week
    const currentTimestamp = currentDate.getTime();
    const dueTimestamp = dueDateObject.getTime();

    const gestationalWeeks = gestationalAge * millisecondsPerWeek;
    let pregnancyDuration =
      gestationalWeeks - (dueTimestamp - currentTimestamp);

    // If pregnancy duration is greater than the maximum gestational weeks, set it to maximum

    const weeksPregnant = Math.ceil(pregnancyDuration / millisecondsPerWeek);

    console.log("Pregnancy Duration:", pregnancyDuration);
    console.log("Gestational Weeks:", gestationalWeeks);
    console.log("Weeks Pregnant:", weeksPregnant);

    setGestationAge(weeksPregnant);
  };

  const calculateRemainingWeeks = () => {
    setRemainingWeeks(40 - gestationAge);
  };

  const handleMotherDetailsPage = (id) => {
    navigation.navigate("MotherDetailsScreen", {
      id: id,
    });
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid);
      console.log(user.uName)
      setUserName(user?.uName);
      if (initializing) setInitializing(false);
    });

    fetchUserData();
    console.log("called fetchUserData")
    if (dueDate) {
      calculateWeeksPregnant();
      calculateRemainingWeeks();
    }

    return () => {
      // Unsubscribe from auth state changes when component unmounts
      authStateChanged();
    };
  }, [userId, initializing]);

   function fetchUserData() {
    console.log("making call to fetchUser")
    fetchUser();
    console.log("empty",  fetchUser())
    // console.log("User data:", user);
  }
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
            <Image 
            style={{width: Dimensions.get("screen").width, height: 200, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1}}
             source= {require("../assets/wavvvy.jpg")}
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
          Welcome {userName ? userName : "User"}
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/Images/cute-baby.png")}
        />
        <View style={{margin: 10}}>
          <InfoCard style={styles.infoCard} label="Due Date" value={dueDate} />
          <View style={styles.infoContainer}>
            <InfoCard
              label="Weeks Pregnant"
              value={gestationAge !== null ? gestationAge.toString() : "6"}
              style={{width: Dimensions.get("screen").width * 0.4}}
            />

            <InfoCard
              label="Remaining Weeks"
              value={remainingWeeks !== null ? remainingWeeks.toString() : ""}
            />
          </View>
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
                onPress={() => handleBabyDetailsPage(week.id)}
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

export default connect(mapStateToProps, mapDispatch) (Home);
