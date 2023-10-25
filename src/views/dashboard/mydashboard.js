import { FontAwesome } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  createDrawerNavigator
} from "@react-navigation/drawer";
import axios from "axios";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import DotMenu from "../../components/Menu";
const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = "b349593e7cf077168b90cdf6a796f787";
    const city = "Mayiladuthurai";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        console.log("Temperature in Celsius:", response.data.main.temp);
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);
  let animationFile = "animation_lnn10e95.json"; // Replace with the correct animation file

  // if (weatherData && weatherData.main.temp <= 10) {
  //   animationFile = "snowy-animation.json";
  // } else if (weatherData && weatherData.main.temp > 10 && weatherData.main.temp <= 25) {
  //   animationFile = "sunny-animation.json";
  // } else if (weatherData && weatherData.main.temp > 25) {
  //   animationFile = "rainy-animation.json";
  // }
  console.log("animationFile >>>----------------------------->", animationFile);
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


const CustomDrawerContent = (props) => {
  const menuItems = [
    { name: "Dashboard", icon: "home" }, 
    { name: "Setting", icon: "setting" }, 
  ];

  const renderCustomItem = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => props.navigation.navigate(item.name)}
      style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
    >
        <FontAwesome name={item.icon} size={25} color="black" />
      <View style={{ marginLeft: 10 }}>
      <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          marginBottom: 2,
        }}
      >
        <View style={{ alignItems: "center", width: 100 }}>
          <Image
            source={require("../../../assets/sm.jpg")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <View style={{ marginLeft: 16, marginTop: 5, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Mukesh M...</Text>
          </View>
        </View>
      </View>
      {menuItems.map((item, index) => renderCustomItem(item, index))}
    </DrawerContentScrollView>
  );
};

const mydashboard = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

export default mydashboard;
