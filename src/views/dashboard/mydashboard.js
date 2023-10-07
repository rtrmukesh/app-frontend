import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const DashboardScreen = () => {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* You can add custom items to the drawer here */}
      {/* <DrawerItem label="Custom Item" onPress={() => {}} /> */}
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const mydashboard = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

export default mydashboard;
