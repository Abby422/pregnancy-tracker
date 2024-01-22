import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar as ReactNativePaperCalendar } from 'react-native-paper'

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null)

    const handleDateSelect = (date) => {
        setSelectedDate(date)
    }

    return (
        <View>
            <Text>Calendar</Text>
            <ReactNativePaperCalendar
                selectedDate={selectedDate}
                onDateChange={handleDateSelect}
            />
        </View>
    )
}

export default Calendar

const styles = StyleSheet.create({})