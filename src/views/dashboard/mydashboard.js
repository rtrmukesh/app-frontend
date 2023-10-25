import {
  DrawerContentScrollView,
  createDrawerNavigator
} from "@react-navigation/drawer";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomDrawerItem from "../../components/CustomDrawerItem";
import Dashboard from "./components/Dashboard";
const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
  const menuItems = [
    { name: "Dashboard", icon: "home" }, 
    { name: "Setting", icon: "cog-outline" }, 
  ];



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
      <CustomDrawerItem menuItems={menuItems} navigation={props.navigation}/>
    </DrawerContentScrollView>
  );
};

const mydashboard = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default mydashboard;
