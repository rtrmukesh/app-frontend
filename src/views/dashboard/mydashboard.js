import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'b349593e7cf077168b90cdf6a796f787';
    const city = 'Mayiladuthurai';

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => {
      console.log('Temperature in Celsius:', response.data.main.temp);
      setWeatherData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
  
  }, []);
  let animationFile = 'animation_lnn10e95.json'; // Replace with the correct animation file

  // if (weatherData && weatherData.main.temp <= 10) {
  //   animationFile = 'snowy-animation.json';
  // } else if (weatherData && weatherData.main.temp > 10 && weatherData.main.temp <= 25) {
  //   animationFile = 'sunny-animation.json';
  // } else if (weatherData && weatherData.main.temp > 25) {
  //   animationFile = 'rainy-animation.json';
  // }
console.log('animationFile >>>----------------------------->',animationFile);
  return (
    <View>
      <StatusBar backgroundColor="gray" />
      <Text>Dashboard</Text>
      {weatherData && (
        <View>
          <Text>Weather in {weatherData.name}:</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <LottieView
            source={require(`../../animation/${animationFile}`)} // Adjust the path to your animation files
            autoPlay
            loop
          />
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
