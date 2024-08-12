// Import React and Component
import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  View,
  BackHandler, StatusBar, NativeModules, Platform,
  KeyboardAvoidingView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./ActionBar";

import Menu from "./NavigationDrawer";

import { useNavigation } from "@react-navigation/native";

import { Keyboard } from "react-native";

import { isLoggedIn } from "../../lib/Helper";

import NetInfo from '@react-native-community/netinfo';

import Spinner from "../Spinner";

import { Color } from "../../helper/Color";

import BottomToolBar from "./bottomToolBar";

import BackGroundFetch from "../BackGroundFetch";

import MessageSound from "../MessageSound";

import settingService from "../../services/SettingService";

import Setting from "../../lib/Setting";

import messageSound from "../../assets/audio/message.mp3";

import * as Notifications from 'expo-notifications';

import * as Device from 'expo-device';

import SyncService from "../../services/SyncService";
import platform from "../../lib/Platform";
import styles from "../../helper/Styles";
import * as Location from 'expo-location';
import UserLocationService from "../../services/UserLocation";



// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

const Layout = ({
  children,
  title,
  buttonOnPress,
  buttonLabel,
  showBackIcon,
  backButtonNavigationUrl,
  FooterContent,
  bottomToolBar,
  showScanner,
  openScanner,
  hideFooterPadding,
  Add,
  AddOnPress,
  headerButtonDisabled,
  sync,
  label,
  onNavigate,
  showActionMenu,
  actionItems,
  params,
  updateValue,
  emptyMenu,
  zunomart,
  HideSideMenu,
  isLoading,
  refreshing,
  buttonLabel2,
  button2OnPress,
  closeModal,
  showFilter,
  onFilterPress,
  showMessage,
  filter,
  showActionButton,
  control,
  onSelect,
  options,
  name,
  showStatusDropDown,
  data,
  currentStatusId,
  filteredValue,
  onActionMenuPress,
  showActionDrawer,
  backButtonNavigationOnPress,
  showLogo,
  showProfile,
  onProfileHandle,
  hideContentPadding
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [themeColor, setThemeColor] = useState(Color.WHITE)

  const { BackgroundFetch } = NativeModules;
  const [isInternetConnection, setIsInternetConnection] = useState(false)


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });
    settingService.get(Setting.MESSAGE_BACKGROUND_FETCH_INTERVAL, async (error, response) => {
      if (response && response?.settings && response.settings[0].value) {
        let interval = parseInt(response.settings[0].value);
        BackGroundFetch(MessageSound, interval);
        BackGroundFetch(UpdateUserLocation,interval)
      }
    })

    getSessionToken();

    const NoInternet = NetInfo.addEventListener(handleConnectivityChange);
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      NoInternet()
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const UpdateUserLocation = async () => {

    let location = await Location.getCurrentPositionAsync({});

    let data = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    UserLocationService.create(data, (err, result) => { })
}


  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }

    return false;
  };

  const getSessionToken = async () => {
    await isLoggedIn(navigation)
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: messageSound
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    return token;
  }

  const handleConnectivityChange = (state) => {
    setIsInternetConnection(state && state.isConnected)

    if (!state.isConnected) {
      navigation.navigate('NoInternet');
    }
  };

  const updateMenuState = (isMenuOpen) => {
    setMenuOpen(isMenuOpen)
    setSideMenuOpen(!isSideMenuOpen);
  };
  const backgroundColor = isInternetConnection ? themeColor : Color.RED;

  return (
    <>

      {platform.isIOS() ? (
        <View style={{ backgroundColor: backgroundColor, height: '4%' }}>
          <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
        </View>
      ) :
        <View style={{ backgroundColor: backgroundColor }}>

          <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
        </View>
      }
      {isSideMenuOpen ? (
     <SafeAreaView edges={['left', 'right', "bottom"]} style={styles.actionBar}>

        <Menu
          onItemSelected={"Settings"}
          user={""}
          navigator={navigation}
          isConnected={true}
          setSideMenuOpen={setSideMenuOpen}
          updateMenuState={updateMenuState}
          menuOpen={menuOpen}
        />
     </SafeAreaView>

      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1}}
        >
          <SafeAreaView edges={['left', 'right', "bottom"]} style={styles.actionBar}>
            <Header
              control={control}
              showStatusDropDown={showStatusDropDown}
              onSelect={onSelect}
              options={options}
              name={name}
              currentStatusId={currentStatusId}
              data={data}
              headerButtonDisabled={headerButtonDisabled}
              updateMenuState={updateMenuState}
              title={title}
              setStatusBar={setThemeColor}
              showActionButton={showActionButton}
              buttonLabel={buttonLabel}
              onPress={buttonOnPress}
              showBackIcon={showBackIcon}
              isKeyboardVisible={isKeyboardVisible}
              backButtonNavigationUrl={backButtonNavigationUrl}
              updateValue={updateValue}
              emptyMenu={emptyMenu}
              showScanner={showScanner}
              openScanner={openScanner}
              Add={Add}
              closeModal={closeModal}
              bottomToolBar={bottomToolBar}
              ZunoMart={zunomart}
              AddOnPress={AddOnPress}
              sync={sync}
              params={params}
              HideSideMenu={HideSideMenu}
              label={label}
              onNavigate={onNavigate}
              showActionMenu={showActionMenu}
              showFilter={showFilter}
              showMessage={showMessage}
              actionItems={actionItems}
              buttonLabel2={buttonLabel2}
              button2OnPress={button2OnPress}
              onFilterPress={onFilterPress}
              onActionMenuPress={onActionMenuPress}
              showActionDrawer={showActionDrawer}
              backButtonNavigationOnPress={backButtonNavigationOnPress}
              showLogo={showLogo}
              showProfile={showProfile}
              onProfileHandle={onProfileHandle}
            />

            <View>
              {filter}
            </View>
            <View>
              {filteredValue}
            </View>

            {isLoading && !refreshing ? (
              <Spinner />
            ) : (
              <View style={{ flex: 0.9, paddingHorizontal: !hideContentPadding ? 10 : 0 }}>
                {children}
              </View>
            )}

            {
              FooterContent && (
                <View style={[!hideFooterPadding ? { paddingHorizontal: 10, marginBottom: 10 } : { paddingHorizontal: 0, }]}>
                  {FooterContent}
                </View>
              )
            }
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}

    </>
  );
};
export default Layout;
