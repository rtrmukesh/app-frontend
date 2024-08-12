import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import CustomCard from '../../../components/Card'
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const AddressCard = (props) => {

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
console.log('location>>>------------------------> ', location);
console.log('address>>>------------------------> ', address);

    useEffect(() => {
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          ).then(() => {
            getCurrentLocation();
          });
        } else {
          getCurrentLocation();
        }
      }, []);

      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
    
            // Fetch address details
            const addressData = await getAddressFromCoords(latitude, longitude);
            setAddress(addressData);
          },
          (error) => {
            console.log('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };

      const getAddressFromCoords = async (latitude, longitude) => {
        try {
          const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
            params: {
              latitude,
              longitude,
              localityLanguage: 'en',
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching address:', error);
          return null;
        }
      };



    return (
        <View>
            <CustomCard title={"Address"}>
                <View style={styles.childran}>
                    <Text style={styles.boldText}>City: <Text style={styles.normalText}>Mayiladuthurai</Text></Text>
                    <Text style={styles.boldText}>PinCode: <Text style={styles.normalText}>609118</Text></Text>
                </View>
            </CustomCard>

        </View>
    )
}

const styles = StyleSheet.create({
    childran: {
        paddingTop: 5
    },
    normalText: {
        fontSize: 12,
        color: "blue"
    },
    boldText: {
        fontWeight: "bold",
        color: "red",
        fontSize: 15
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 11
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    hello: {
        color: "red"
    },
    name: {
        color: "#003366"
    }
});

export default AddressCard
