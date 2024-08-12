// Import React and Component
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Color } from "../../helper/Color";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu } from 'react-native-material-menu';
import DropDownMenu from '../DropDownMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import Message from '../Message';
import Button from '../Button';
import Setting from '../../lib/Setting';
import styles from '../../helper/Styles';
import StatusSelect from '../StatusSelect';
import asyncStorageService from '../../services/AsyncStorageService';
import settingService from '../../services/SettingService';
import { FontAwesome5 } from "@expo/vector-icons";


const ActionBar = ({
  title,
  buttonLabel,
  buttonLabel2,
  onPress,
  button2OnPress,
  showBackIcon,
  isKeyboardVisible,
  backButtonNavigationUrl,
  showScanner,
  openScanner,
  Add,
  showActionMenu,
  actionItems,
  updateValue,
  closeModal,
  ZunoMart,
  showFilter,
  onFilterPress,
  showMessage,
  params,
  showActionButton,
  setStatusBar,
  control,
  onSelect,
  currentStatusId,
  name,
  showStatusDropDown,
  onActionMenuPress,
  showActionDrawer,
  backButtonNavigationOnPress,
  showLogo,
  showProfile,
  onProfileHandle
}) => {

  const navigation = useNavigation();

  const [addVisible, setAddVisible] = useState(false);
  const [portalName, setPortalName] = useState("");
  const [themeColor, setThemeColor] = useState(Color.WHITE);
  const [textColor, setTextColor] = useState(Color.WHITE)

  const isFocused = useIsFocused();

  const hideAddMenu = () => setAddVisible(false);
  const showAddMenu = () => {
    setAddVisible(true)
  };

  useEffect(() => {
    getThemeColor();
  }, [isFocused])
  const showButton = showActionButton !== undefined ? showActionButton : true;   

 
  const getThemeColor = async () => {
    try {
          await settingService.getByName(Setting.PORTAL_HEADER_COLOR,(err,response)=>{
            setThemeColor(response)
            setStatusBar(response)
          })
          await settingService.getByName(Setting.PORTAL_HEADER_TEXT_COLOR,(err,response)=>{
            setTextColor(response)
          })
          await settingService.getByName(Setting.PORTAL_NAME,(err,response)=>{
            setPortalName(response)
          })
        
    } catch (error) {
        console.error("Error retrieving settings:", error);
        return null;
    }
};


  return (
    <>
      <View style={{
        flex: isKeyboardVisible ? 0.14 : 0.1,
        justifyContent: "center",
        backgroundColor: themeColor,
      }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            marginLeft: 10,
            backgroundColor: themeColor,
          }}
        >
          <View style={{ flex: (showStatusDropDown || buttonLabel2) ? 0.12 : 0.1, paddingTop: showStatusDropDown && 10 }}>
            {showBackIcon !== false && (
              <TouchableOpacity
                onPress={() => {
                  if (updateValue) {
                    updateValue();
                  } else {
                    backButtonNavigationUrl ? navigation.navigate(backButtonNavigationUrl, params) : navigation.goBack();
                    backButtonNavigationOnPress && backButtonNavigationOnPress()
                  }

                }}
                accessibilityLabel="menu"
              >
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color={Color.ACTIONBAR_TEXT}
                />
              </TouchableOpacity>

            )}

            {showLogo && (
              <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Image source={require('../../assets/PortalLogo.png')} style={{ height: 30, width: 150 }} />
              </View>
            )}

          </View>
          {title && (
            <View style={{ flex: showStatusDropDown ? 0.40 : buttonLabel ? 0.60 : 1, alignItems: showStatusDropDown && 'center', paddingTop: showStatusDropDown && 12 ,marginLeft : buttonLabel ? 0 : 5}}>
              <Text style={[styles.layoutTitle, { color: Color.ACTIONBAR_TEXT, textTransform: "capitalize" }]} numberOfLines={1}>{title}</Text>
            </View>
          )}

          {ZunoMart && (
            <View style={{ flex: 0.60, paddingBottom: 1 }}>
              <Text style={[styles.portal, { color: Color.ACTIONBAR_TEXT }]}>
                {portalName}
              </Text>
            </View>
          )}

          <View style={{ flex: buttonLabel ? 0.15 : 0.30, alignItems: "flex-end", justifyContent: "center" }}>

            {showScanner && (
              <View style={!buttonLabel ? { paddingRight: 25 } : {}}>
                 <FontAwesome5 name={"barcode"} size={26} color={Color.ACTIONBAR_TEXT} onPress={() => openScanner && openScanner()}/>
               
              </View>
            )}
          </View>

          {showButton && buttonLabel && (
            <View style={[{ flex: showActionMenu ? 0.4 : 0.3 }, styles.layoutButton]}>
              <Button title={buttonLabel} onPress={(e) => onPress(e)} backgroundColor={Color.ACTIONBAR_TEXT} />
            </View>
          )}
          {buttonLabel2 && (
            <View style={[styles.layoutButton]}>
              <Button title={buttonLabel2} onPress={button2OnPress} color={Color.ACTIONBAR_TEXT} />
            </View>
          )}


          {showFilter && (
            <View style={styles.layoutFilter}>
              <Ionicons
                name="filter-outline"
                size={35}
                color={Color.ACTIONBAR_TEXT}
                onPress={() => onFilterPress()}
              />
            </View>
          )}

          {showProfile && (
            <View style={styles.layoutFilter}>
              <Feather
                name="user"
                size={30}
                color={Color.INDIGO}
                onPress={() => onProfileHandle()}
              />
            </View>
          )}

          {showActionMenu && !showActionDrawer && (

            <DropDownMenu MenuItems={actionItems} onPress={()=>closeModal()} />

          )}
          {!showActionMenu && showActionDrawer && (

            <TouchableOpacity onPress={onActionMenuPress}>
              <Ionicons
                name={"ellipsis-vertical"}
                size={24}
                color={Color.ACTIONBAR_TEXT}
                style={{ paddingRight: 15, paddingTop: 5 }}
              />
            </TouchableOpacity>
          )}

          {Add && <Menu
            visible={addVisible}
            anchor={Add &&
              <TouchableOpacity onPress={showAddMenu} style={{ paddingHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', color: '#FFF', backgroundColor: "#FFF", justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 7 }}>
                  <Text>
                    Add
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </View>
              </TouchableOpacity>
            }
            onRequestClose={hideAddMenu}
          >
          </Menu>}

          {showMessage && (
            <Message />
          )
          }

          {showStatusDropDown && (
            <View style={{ width: '35%', height: '10%' }}>
              <StatusSelect
                control={control}
                onChange={onSelect}
                name={name}
                placeholder={`Select ${name}`}
                data={currentStatusId}
                disableSearch={true}
                currentStatusId={currentStatusId}

              />
            </View>
          )}

        </View>
      </View>
    </>
  );
};
export default ActionBar;
