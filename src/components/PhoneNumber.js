import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error';
import Required from './Required';
import { formatMobileNumber } from '../lib/Format';

const PhoneNumber = ({
    control,
    name,
    placeholder,
    currency,
    required,
    title,
    editable = true,
    values,
    onInputChange,
    maxLength
}) => {


    return (
        <>
            <Controller
                control={control}
                name={name}
              
                rules={{
                    required: required ? `Enter ${title}` : false,
                    pattern: {
                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                        message: `Invalid ${title}`,
                    },
                  }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                        <Required title={title} required={required} />

                        <View
                            style={[
                                styles.container,
                                { borderColor: 'gray', borderWidth: currency ? 0 : !editable ? 0: 1 },
                            ]}
                        >
                            <TextInput
                                value={(value || values) && formatMobileNumber(value || values)}
                                onBlur={onBlur}
                                maxLength={maxLength}
                                editable={editable}
                                placeholder={placeholder || title}
                                style={styles.input}
                                onChangeText={(e) => {
                                    onChange(onInputChange && onInputChange(e) || formatMobileNumber(e));
                                }}
                                underlineColorAndroid="transparent"
                                keyboardType="phone-pad"
                                returnKeyType={"done"} 
                            />
                        </View>
                        {error && <ErrorMessage placeholder={placeholder} title={title} error={error} />}
                    </>
                )}
            />
        </>
    );
};

export default PhoneNumber;

const styles = StyleSheet.create({
    input: {
        color: 'black',
        height: 47,
        borderColor: 'gray',
        paddingLeft: 8
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'gray',
        borderRadius: 8,
    },
});
