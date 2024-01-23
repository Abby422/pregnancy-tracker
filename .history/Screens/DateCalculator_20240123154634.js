import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import {
  Icon,
  IconButton,
  MD3Colors,
  Button,
  Divider,
  RadioButton,
  List,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Dropdown from "../components/DropDown";
const DateCalculator = () => {
  const [method, setMethod] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [minDate, setMinDate] = useState(getDateTenMonthsAgo());
  const [maxDate, setMaxDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(null);
  const [ivf, setIVF] = useState(false);
  const [ultrasound, setUltrasound] = useState(false);
  const [checked, setChecked] = useState("3_days");
  const [selectedOption, setSelectedOption] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };



  useEffect(() => {
    if (method === "ivf") {
      setIVF(true);
      setUltrasound(false);
    } else if (method === "ultrasound") {
      setUltrasound(true);
      setIVF(false);
    } else {
      setIVF(false);
      setUltrasound(false);
    }
  }, [method]);

  function getDateTenMonthsAgo() {
    // Get the current date
    var currentDate = new Date();

    // Set the month to 10 months ago
    currentDate.setMonth(currentDate.getMonth() - 10);

    // Return the updated date
    return currentDate;
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
    setModalVisible(false);
  };

  const getLabel = () => {
    switch (method) {
      case "period":
        return "First day of last period";
      case "ivf":
        return "Date of implantation";
      case "conception":
        return "Date of conception";
      case "ultrasound":
        return "Date of Ultrasound";
      default:
        return "";
    }
  };

  const calculateDueDate = (date) => {
    console.log(date);
    // Add your calculation logic based on the selected method
    let dueDate;

    console.log("method", method, date);
    switch (method) {
      case "period":
        dueDate = new Date(date);
        dueDate.setMonth(dueDate.getMonth() + 9);
        dueDate.setDate(dueDate.getDate() + 7);
        break;
      case "ivf":
        if (checked === "3_days") {
          dueDate = new Date(date);
          dueDate.setDate(dueDate.getDate() + 263);
          break;
        } else if (checked === "5_days") {
          dueDate = new Date(date);
          dueDate.setDate(dueDate.getDate() + 261);
          break;
        }
        break;
      case "conception":
        dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 266);
        break;
      case "ultrasound":
        // Example: Due date is 41 weeks from the ultrasound date
        dueDate = new Date(date.getTime() + 41 * 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        // Default case, no specific method selected
        dueDate = null;
        break;
    }

    // Due date is calculated, you can use it as needed
    console.log("Due Date:", dueDate);
    return dueDate;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Icon source="calendar" color={MD3Colors.primary60} size={50} />
        <Text style={styles.headerText}>Due Date Calculator</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.formContainer}>
          <Text style={styles.contentText}>Method</Text>
          <Text style={styles.selectedMethod}>
            {method.toUpperCase() || "Select Method"}
          </Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>{getLabel()}</Text>
        <IconButton
          icon="calendar"
          iconColor={MD3Colors.primary30}
          size={20}
          onPress={showDatepicker}
        />
        {method !== "" && show && (
          <DateTimePicker
            testID="dateTimePicker"
            display="calendar"
            value={date}
            minimumDate={minDate}
            maximumDate={maxDate}
            mode="date"
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      <Divider />
      {ivf && (
        <>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            Embryo Transfer Date
          </Text>
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Day 3
            </Text>

            <RadioButton
              value="3_days"
              status={checked === "3_days" ? "checked" : "unchecked"}
              onPress={() => setChecked("3_days")}
            />
          </View>
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Day 5
            </Text>

            <RadioButton
              value="5_days"
              status={checked === "5_days" ? "checked" : "unchecked"}
              onPress={() => setChecked("5_days")}
            />
          </View>
        </>
      )}

      {ultrasound && (
        // select weeks and days
        <>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            Ultrasound Date
          </Text>
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Weeks
            </Text>

            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                width: 100,
              }}
              keyboardType="numeric"
              maxLength={42}
            />
          </View>
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Days
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                width: 100,
              }}
              maxLength={7}
              keyboardType="numeric"
            />
          </View>
        </>
      )}
      <Button
        style={{
          width: 200,
          marginTop: 10,
          alignSelf: "center",
        }}
        mode="contained"
        onPress={() => calculateDueDate(date)}
      >
        Calculate
      </Button>

      {/* notification to the user  */}
      <Text
        style={{
          fontSize: 10,
          fontStyle: "italic",
          textAlign: "center",
          margin: 10,
        }}
      >
        * This is an estimated value and the actual day may vary.
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          {dueDate && (
            <Text style={styles.Text}>
              DUE DATE : {moment(dueDate).format("DD MMM YYYY")}
            </Text>
          )}
          <ScrollView contentContainerStyle={styles.modalContent}>
            <List.Item
              title="Period"
              onPress={() => handleMethodChange("period")}
            />
            <List.Item title="IVF" onPress={() => handleMethodChange("ivf")} />
            <List.Item
              title="Conception Date"
              onPress={() => handleMethodChange("conception")}
            />
            <List.Item
              title="Ultrasound"
              onPress={() => handleMethodChange("ultrasound")}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DateCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginTop: 40,
    backgroundColor: MD3Colors.grey50,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: MD3Colors.grey900,
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  selectedMethod: {
    fontSize: 14,
    fontWeight: "bold",
    color: MD3Colors.primary30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 50,
  },
});
