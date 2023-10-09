import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import DateTime from "../lib/DateTime";
import Label from './Label';
import CustomDivider from './Divider';
import { Controller } from 'react-hook-form';
import styles from '../helper/Styles';
import { Ionicons } from '@expo/vector-icons';


const DatePicker = ({onClear, selectedDate, onDateSelect, setSelectedDate, divider, format, disabled, title, showTime, name, control, isForm, required }) => {
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState("");

    let date =   selectedDateTime ?  DateTime.UTCtoLocalTime(selectedDateTime, (format ? format : "DD-MMM-YYYY")) : selectedDate ? DateTime.UTCtoLocalTime(selectedDate, (format ? format : "DD-MMM-YYYY")) : "";


    const time = selectedDate ? DateTime.UTCtoLocalTime(selectedDate, "hh:mm A") : "";

    function showDatePicker() {
        setDatePickerVisible(!datePickerVisible);
    };

    function showTimePicker() {
        setTimePickerVisible(true);
    };

    function onDateSelected(event, value) {
        setDatePickerVisible(false);
        onDateSelect(value);
    };

    function onTimeSelected(event, value) {
        setTimePickerVisible(false);
        onDateSelect(value);
    };

    return (
        <View style={styles.MainContainer}>
            <View style={{ paddingBottom: 2 }}>
                {title && <Label text={title} bold={true} />}
            </View>
            <View style={{ flexDirection: showTime ? 'row' : 'column' }}>
                <View style={[styles.inputDate,{flexDirection:"row",justifyContent:"space-between",}]}> 
                <TextInput
                    editable={disabled}
                    showSoftInputOnFocus={false}
                    onPressIn={() => showDatePicker()}
                    name="date"
                    value={date!== "Invalid date" ? date : ""}
                    placeholder="Select Date"
                />
                {date && (
                <TouchableOpacity onPress={onClear}>
                <Ionicons name="close" size={20} color="grey" style={{marginTop:5}} />

                </TouchableOpacity>
                )}
                </View>
              

                {divider && (
                    <CustomDivider />
                )}
                {showTime && (
                    <TextInput
                        editable={disabled}
                        showSoftInputOnFocus={false}
                        onPressIn={() => showTimePicker()}
                        name="time"
                        value={time}
                        placeholder="Select Time"
                        style={[styles.inputDate, { width: '50%' }]}
                    />
                )}
            </View>

            {datePickerVisible && (
                <>
                    {isForm ? (
                        <Controller
                            control={control}
                            name={name}
                            rules={required ? { required: `Enter ${placeholder}` } : ""}
                            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
                                return (
                                    <>
                                        <DateTimePicker
                                            value={value ? new Date(value) : new Date()}
                                            mode="date"
                                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                            onChange={(event, date) => { 
                                                setDatePickerVisible(false); 
                                                setSelectedDateTime(date)
                                                onChange(date);
                                            }}
                                        />
                                    </>
                                )

                            }}
                        />
                    ) : (
                        <DateTimePicker
                            value={selectedDate || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={onDateSelected}
                        />
                    )}
                </>
            )}

            {showTime && timePickerVisible && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    format="hh:mm A"
                    onChange={onTimeSelected}
                />
            )}
        </View>
    );
}

export default DatePicker;

const styleSheet = StyleSheet.create({

    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 3
    },

    input: {
        color: "black",
        height: 50,
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#dadae8",
    },

    
});
