const [selectedStartDate, setSelectedStartDate] = useState(null);

const onDateChange = (date) => {
  setSelectedStartDate(date);
};

const startDate = selectedStartDate ? selectedStartDate.toString() : "";

return (
  <View style={styles.container}>
    <CalendarPicker onDateChange={onDateChange} />

    <View>
      <Text>SELECTED DATE:{startDate}</Text>
    </View>
  </View>
);
