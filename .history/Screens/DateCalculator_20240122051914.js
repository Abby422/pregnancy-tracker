import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

const DateCalculator = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = () => {
        // Handle submit logic here
    };

    return (
        <View>
            <PaperTextInput
                label="Name"
                value={name}
                onChangeText={setName}
            />
            <PaperTextInput
                label="Date"
                value={date}
                onChangeText={setDate}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default DateCalculator;
