import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { encode as base64Encode } from 'base-64';

const CheckMobileNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState(null);

  const checkPhoneStatus = async () => {
    try {
      const formattedPhoneNumber = phoneNumber.startsWith('+91')
        ? phoneNumber
        : `+91${phoneNumber}`;

      const credentials = `${'ACfad87f8d2ef589376cdf70b4680523b0'}:${'8802b53794f620fdc80336bd806c2f45'}`;
      const base64Credentials = base64Encode(credentials);

      const response = await axios.get(
        `https://lookups.twilio.com/v1/PhoneNumbers/${formattedPhoneNumber}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
console.log('response >>>----------------------------->',response);
      setResult(response.data);
    } catch (error) {
      console.error('Error checking phone status:', error);
    }
  };

  return (
    <View>
      <Text>Enter Phone Number:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <Button title="Check Phone Status" onPress={checkPhoneStatus} />
      {result && (
  <View>
    <Text>Status: {result.status}</Text>
    <Text>Country Code: {result.country_code}</Text>
    <Text>Phone Number: {result.phone_number}</Text>
    <Text>National Format: {result.national_format}</Text>
    {result.carrier ? (
      <Text>Carrier: {result.carrier.name}</Text>
    ) : (
      <Text>Carrier: Not available</Text>
    )}
    {/* Add more information as needed */}
  </View>
)}

    </View>
  );
};

export default CheckMobileNumber;
