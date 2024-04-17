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
import { ActivityIndicator, Divider } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import { getPregnancyInfo, getUserData } from "../Services/fireStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InfoCard from "../components/InfoCard";
import ArticleCard from "../components/ArticleCard";
import CustomCalendar from "../components/CustomCalendar";
import ProgressBar from "../components/ProgressBar";

const auth = getAuth(FIREBASE_APP);

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatch = (dispatch) => bindActionCreators({ fetchUser }, dispatch);
const Home = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const navigation = useNavigation();
  const [gestationAge, setGestationAge] = useState(0);
  const [remainingWeeks, setRemainingWeeks] = useState(0);
  const [pregnancyInformation, setPregnancyInformation] = useState({});
  const [weeksPregnant, setWeeksPregnant] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleBabyDetailsPage = (id) => {
    navigation.navigate("ArticleDetailScreen", {
      id: id,
    });
  };
  const calculateWeeksPregnant = (dueDateString) => {
    // Parse the dueDate string into a Date object
    const dueDateObject = new Date(dueDateString);
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
    if (pregnancyDuration > gestationalWeeks) {
      pregnancyDuration = gestationalWeeks;
    }

    const weeksPregnant = Math.ceil(pregnancyDuration / millisecondsPerWeek);

    setWeeksPregnant(weeksPregnant);
    setGestationAge(weeksPregnant);
  };

  const calculateRemainingWeeks = (weeks) => {
    const remainingWeek = 40 - weeks;
    setRemainingWeeks(remainingWeek);
  };

  const handleMotherDetailsPage = (id) => {
    navigation.navigate("MotherDetailsScreen", {
      id: id,
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
      getPregnancyData(gestationAge.toString());
    }

    if (dueDate) {
      calculateWeeksPregnant(dueDate);
      calculateRemainingWeeks(weeksPregnant);
    }
  }, [userId, dueDate, gestationAge]);

  const fetchUserData = async () => {
    try {
      const userData = await getUserData(userId);
      if (userData) {
        setUserName(userData.uName);
        setDueDate(userData.dueDate);
        setLoading(false);
      } else {
        console.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getPregnancyData = async (week) => {
    try {
      const pregnancyData = await getPregnancyInfo(week);
      if (pregnancyData) {
        console.log(pregnancyData);
        setPregnancyInformation(pregnancyData);
      } else {
        console.log("Pregnancy data not found");
      }
    } catch (error) {
      console.error("Error fetching pregnancy data:", error);
    }
  };

  StatusBar.setHidden(true);
  return (
    <>
      <ScrollView style={styles.container}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#2e004d" />
          </View>
        ) : (
          <>

            <Text style={styles.header}>
              Welcome {userName ? userName : "User"}
            </Text>
            <View>
              
            </View>

            <View style={{ margin: 10 }}>
              <InfoCard
                style={styles.infoCard}
                label="Due Date"
                value={dueDate}
              />
              <View style={styles.infoContainer}>
                <InfoCard
                  label="Weeks Pregnant"
                  value={gestationAge !== null ? gestationAge.toString() : "6"}
                  style={{ width: Dimensions.get("screen").width * 0.4 }}
                />

                <InfoCard
                  label="Remaining Weeks"
                  value={
                    remainingWeeks !== null ? remainingWeeks.toString() : ""
                  }
                />
              </View>
            </View>

            <View style={styles.articlesContainer}>
              <Text style={{ margin: 20, fontWeight: "bold", fontSize: 24 }}>
                Info about your baby
              </Text>

              <ArticleCard
                Heading={"Baby Development at " + gestationAge + " weeks"}
                onPress={() => handleBabyDetailsPage(weeksPregnant)}
              />
            </View>
            <View style={styles.articlesContainer}>
              <Text style={{ margin: 20, fontWeight: "bold", fontSize: 24 }}>
                Info about your body
              </Text>
              <ArticleCard
                Heading={"Your body at " + gestationAge + " weeks"}
                onPress={() => handleMotherDetailsPage(weeksPregnant)}
              />
            </View>
          </>
        )}
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
  header: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
    color: "black",
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

export default connect(mapStateToProps, mapDispatch)(Home);
