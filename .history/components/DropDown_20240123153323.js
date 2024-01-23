import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

const StyledDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownOptions = ["Option 1", "Option 2", "Option 3"];

  const renderRow = (rowData, rowID, highlighted) => {
    return (
      <TouchableOpacity>
        <Text style={{ padding: 10 }}>{rowData}</Text>
      </TouchableOpacity>
    );
  };

  const onSelect = (index, value) => {
    setSelectedOption(value);
    // You can perform additional actions here based on the selected value
  };

  return (
    <View>
      <ModalDropdown
        options={dropdownOptions}
        onSelect={onSelect}
        renderRow={renderRow}
        textStyle={{ padding: 10 }}
        dropdownStyle={{ padding: 10, marginTop: 2, marginLeft: -5 }}
        defaultValue={selectedOption || "Select an option"}
      />
    </View>
  );
};

export default StyledDropdown;
