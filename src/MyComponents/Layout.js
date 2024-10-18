import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // You can use any icon library

const { width } = Dimensions.get("window");

const Layout = ({ HeaderLabel="Mukesh Profile", footerContent, children, onBackPress, onSettingsPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✴---StatusBar---✴ */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ✴---Container---✴ */}
      <View style={styles.container}>

        {/* ✴---Header with Back Icon, Title, and Settings Icon---✴ */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <Icon name="arrow-back" size={24} color="black" />

          </TouchableOpacity>

          <Text style={styles.headerText}>{HeaderLabel}</Text>

          <TouchableOpacity onPress={onSettingsPress} style={styles.iconContainer}>
            <Icon name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* ✴---Body---✴ */}
        <ScrollView style={styles.body}>{children}</ScrollView>

        {/* ✴---Footer---✴ */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{footerContent}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "gray",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F0F5FF",
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: width > 600 ? 24 : 18,
    fontWeight: 'bold',
    textAlign: "center",
    color:"#192838"
  },
  iconContainer: {
    width: 40,  
    alignItems: "center",
  },
  body: {
    flex: 1,
  },
  footer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: width > 600 ? 24 : 18,
    color: "#fff",
  },
});

export default Layout;
