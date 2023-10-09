import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'b349593e7cf077168b90cdf6a796f787';
    const city = 'mayiladuthurai';

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => {
        console.log('response >>>----------------------------->',response);
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="gray" />
      <Text>Dashboard</Text>
      {weatherData && (
        <View>
          <Text>Weather in {weatherData.name}:</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
        </View>
      )}
    </View>
  );
};


const mydashboard = ({ navigation }) => {
  return (
    <>
    <StatusBar backgroundColor="gray"/>
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
    </>
  );
};

export default mydashboard;
