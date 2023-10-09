import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { height } = Dimensions.get("window");

import AsyncStorage from "../../lib/AsyncStorage";

import AsyncStorageConstants from "../../helper/AsyncStorage";

import Permission from "../../helper/Permission";

import { useNavigation, useRoute } from "@react-navigation/native";

import SideMenuCard from "../SideMenuCard";

import { Color } from "../../helper/Color";

import { NativeModules } from "react-native";

import { version } from '../../../package.json';



import { FontAwesome5 } from "@expo/vector-icons";

import BottomToolBar from "./bottomToolBar";
import settingService from "../../services/SettingService";
import Setting from "../../lib/Setting";
import styles from "../../helper/Styles";
const { BluetoothManager } = NativeModules;

const Menu = (props) => {
  useEffect(() => {
    getPermission();
    getThemeColor();
    getTextColor();
  }, [])
  const navigation = useNavigation();
  const route = useRoute();
  const routeNameArray = route.name.split('/');
  const menuItemValue = routeNameArray[0];
  const [permissionList, setPermissionList] = useState();
  const [themeColor,setThemeColor] = useState(Color.WHITE);
  const [textColor,setTextColor] = useState(Color.WHITE)


  const Logout = async () => {
    await AsyncStorage.clearAll()
    navigation.navigate("Login");
  };

  const getThemeColor = async ()=>{
    await settingService.get(Setting.PORTAL_HEADER_COLOR,async (err,response)=>{
      if(response && response.settings && response.settings[0].value){
        setThemeColor(response.settings[0].value)

      } 
  
    })
  }
  const getTextColor = async () => {
    await settingService.get(Setting.PORTAL_HEADER_TEXT_COLOR, (err, response) => {
      if (response && response.settings && response.settings[0].value) {
        setTextColor(response.settings[0].value)
      }

    })


  }
  const hasPermission = (permissionList, permission) => {
    let isExist = false;
    if (permissionList && permissionList.length > 0) {
      for (let i = 0; i < permissionList.length; i++) {
        if (permissionList[i].role_permission == permission) {
          isExist = true;
        }
      }
    }
    return isExist;
  };

  const getPermission = async () => {
    //get permission list
    let permissionList = await AsyncStorage.getItem(AsyncStorageConstants.PERMISSIONS);
    //validate permission list exist or not
    if (permissionList) {

      //convert string to JSON
      permissionList = JSON.parse(permissionList);
      setPermissionList(permissionList)
    }
  }
  let showSales = hasPermission(permissionList, Permission.SALE_SETTLEMENT_VIEW);
  let showBill = hasPermission(permissionList, Permission.PURCHASE_VIEW);
  let showAttendance = hasPermission(permissionList, Permission.ATTENDANCE_VIEW);
  let showProducts = hasPermission(permissionList, Permission.PRODUCT_VIEW);
  let showOrders = hasPermission(permissionList, Permission.ORDER_VIEW);
  let showTransfer = hasPermission(permissionList, Permission.TRANSFER_VIEW);
  let showStock = hasPermission(permissionList, Permission.STOCK_ENTRY_VIEW);
  let showWishList = hasPermission(permissionList, Permission.WISHLIST_VIEW);
  let showActivity = hasPermission(permissionList, Permission.ACTIVITY_VIEW);
  let showSettings = hasPermission(permissionList, Permission.SETTINGS_VIEW);
  let showTicket = hasPermission(permissionList, Permission.TICKET_VIEW);
  let showFine = hasPermission(permissionList, Permission.FINE_VIEW);
  let storeView = hasPermission(permissionList, Permission.LOCATION_VIEW);
   let showOrderProduct = hasPermission(permissionList,Permission.ORDER_PRODUCT_VIEW)
  let candidateView = hasPermission(permissionList, Permission.CANDIDATE_VIEW);
  let showVisitor = hasPermission(permissionList, Permission.VISITOR_VIEW);
  let showReplenish = hasPermission(permissionList, Permission.REPLENISH_VIEW);
  let showOrderReport = hasPermission(permissionList, Permission.ORDER_REPORT_VIEW)
  let showPayment = hasPermission(permissionList, Permission.PAYMENT_VIEW)
  let showSync = hasPermission(permissionList, Permission.SYNC_VIEW)
  let showInspection = hasPermission(permissionList, Permission.INSPECTION_VIEW)
  let showUser = hasPermission(permissionList, Permission.USER_VIEW)
  let showBills = hasPermission(permissionList, Permission.BILL_VIEW)
  let showLeads = hasPermission(permissionList, Permission.LEADS_VIEW)
  let showAccounts = hasPermission(permissionList, Permission.ACCOUNT_VIEW)
  let showGatePass = hasPermission(permissionList, Permission.GATE_PASS_VIEW)








  // Render User Profile
  const _renderUserProfile = () => {
    const { user, updateMenuState } = props;
    return (
      <View
      style={{ ...styles.menu, backgroundColor: themeColor }}
      >
        <Text style={[styles.name,{color:textColor}]}>Menu</Text>
        
      </View>
    );
  };

  const syncNavigation = async () => {

    navigation.navigate("Sync", { syncing: true });
  }


  // Render Settings
  const _renderStore = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Location")
          setSideMenuOpen(false)
        }}
        name={"Location"}
        Icon="warehouse"
      />
    );
  };
  const _renderOrderSalesSettlementDiscrepancyReport = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("OrderSalesSettlementDiscrepancyReport")
          setSideMenuOpen(false)
        }}
        name={"Order SalesSelttement Discrepancy Report"}
        Icon="list"
      />
    );
  };

  // Render Stocks
  const _renderStocks = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("StockEntry")
          setSideMenuOpen(false)
        }}
        name={"Stock Entry"}
        Icon="warehouse"
      />
    );
  };

  const _renderFine = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Fine")
          setSideMenuOpen(false)
        }}
        name={"Fines"}
        Icon={"money-bill-alt"}
      />
    );
  };

  const _renderLeads = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Lead")
          setSideMenuOpen(false)
        }}
        name={"Leads"}
        Icon={"address-book"}
      />
    );
  };

  const _renderGatePass = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("GatePass")
          setSideMenuOpen(false)
        }}
        name={"Gate Pass"}
        Icon={"address-book"}
      />
    );
  };

  const _renderAccounts = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Accounts")
          setSideMenuOpen(false)
        }}
        name={"Accounts"}
        Icon={"bank"}
        MaterialCommunityIcon
      />
    );
  };

  const _renderInspection = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Inspection")
          setSideMenuOpen(false)
        }}
        name={"Inspection"}
        Icon={"note"}
        MaterialCommunityIcon
      />
    );
  };
  const rendorToolBar = () => {
    const { updateMenuState, setSideMenuOpen, menuOpen } = props;
    return (
      <BottomToolBar
        updateMenuState={updateMenuState}
        setSideMenuOpen={setSideMenuOpen}
        menuOpen={menuOpen}
      />
    );
  };

  const _renderTicket = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Ticket")
          setSideMenuOpen(false)
        }}
        name={"Tickets"}
        Icon="ticket-alt"
      />
    );
  };
  const _renderUser = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Users")
          setSideMenuOpen(false)
        }}
        name={"Users"}
        Icon="user"
      />
    );
  };
  const _renderVisitor = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Visitor")
          setSideMenuOpen(false)
        }}
        name={"Visitors"}
        Icon="user-alt"
      />
    );
  };
  const _renderCandidate = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Candidate")
          setSideMenuOpen(false)
        }}
        name={"Candidate"}
        Icon="user-alt"
      />
    );
  };

  // Render Dashboard

  // Render Bill Entry
  const _renderBillEntry = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Order")
          setSideMenuOpen(false)
        }}
        name={"Orders"}
        Icon="receipt"
      />
    );
  };

  const _renderOrderProduct = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("OrderProduct")
          setSideMenuOpen(false)
        }}
        name={"Order Products"}
        Icon="cart"
        MaterialCommunityIcon
      />
    );
  };

  // Render Logout
  const _renderLogout = () => {
    const { setSideMenuOpen } = props;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSideMenuOpen(false)
            Logout();
          }}
          style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
          accessibilityLabel="logout"
        >
          <View style={{ borderRadius: 2, flex: 0.15, padding: 5 }}>
            <FontAwesome5 name="sign-out-alt" size={20} color={Color.PRIMARY} />
          </View>
          <Text style={styles.itemNavigation} accessibilityLabel="logoutTtile">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Logout
  const _renderAttendance = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Attendance")
          setSideMenuOpen(false)
        }}
        name={"Attendance"}
        Icon={"user"}
      >


      </SideMenuCard>


    );
  };

  // Render Logout
  const _renderInventoryTransfer = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("inventoryTransfer")
          setSideMenuOpen(false)
        }}
        name={"Transfer"}
        Icon="truck-moving"
      />
    );
  };

  // render Products
  const _renderProducts = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Products")
          setSideMenuOpen(false)
        }}
        name={"Products"}
        Icon="box-open"
      />
    );
  };

  // render Products
  const _renderStoreReplenish = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("StoreReplenish")
          setSideMenuOpen(false)
        }}
        name={"Store Replenish"}
        Icon="warehouse"
        MaterialCommunityIcon
      />
    );
  };

  // render Products
  const _renderReplenishProducts = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("ReplenishmentProduct")
          setSideMenuOpen(false)
        }}
        name={"Replenish Products"}
        Icon="transfer"
        MaterialCommunityIcon
      />
    );
  };

  // render Products
  const _renderWishList = () => {
    const { navigator, setSideMenuOpen } = props;
    return (

      <SideMenuCard
        Icon="cart-remove"
        onPress={() => {
          navigator.navigate("WishListProducts")
          setSideMenuOpen(false)
        }}
        name="Wishlist"
        MaterialCommunityIcon
      />
    );
  };

  // render sync
  const _renderSync = () => {
    const { setSideMenuOpen } = props;
    return (

      <SideMenuCard
        Icon="sync"
        onPress={async () => {
          await syncNavigation()
          setSideMenuOpen(false)
        }}
        name="Sync"
        MaterialCommunityIcon
      />
    );
  };

  // render sync
  const _renderSale = () => {
    const { navigator, setSideMenuOpen } = props;
    return (

      <SideMenuCard
        Icon="file-invoice"
        onPress={() => {
          navigator.navigate("SalesSettlement")
          setSideMenuOpen(false)
        }}
        name="Sales Settlement"
      />
    );
  };



  // Render Build Number
  const _renderBuildNumber = () => {
    return (
      <View
        style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "black", fontSize: 15 }}>{`Version ${version}`}</Text>
      </View>
    );
  };

  const _renderBills = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Bills")
          setSideMenuOpen(false)
        }}
        name={"Bills"}
        Icon="money-bill-wave-alt"
      />
    );
  };
  // Render Bill
  const _renderBill = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Purchase")
          setSideMenuOpen(false)
        }}
        name={"Purchases"}
        Icon="money-bill-wave-alt"
      />
    );
  };
  const _renderPayments = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Payments")
          setSideMenuOpen(false)
        }}
        name={"Payments"}
        Icon="money-bill-alt"
      />
    );
  };
  const _renderActivity = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("ActivityList")
          setSideMenuOpen(false)
        }}
        name={"Activity"}
        Icon={"chart-bar"}
        MaterialCommunityIcon
      />
    );
  };
  const _customer = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Customers")
          setSideMenuOpen(false)
        }}
        name={"Customer"}
        Icon={"user"}
      />
    );
  };

  const _renderDivider = () => {
    return (
      <View style={{ backgroundColor: "gray", height: 0.5, marginTop: 10 }} />
    );
  };


  // render sync
  const _renderSettings = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        Icon="cog-outline"
        onPress={() => {
          navigator.navigate("Settings")
          setSideMenuOpen(false)
        }}
        name="Settings"
        MaterialCommunityIcon
      />
    );
  };


  // Render Order Report
  const _renderOrderReports = () => {
    const { navigator, setSideMenuOpen } = props;
    return (
      <SideMenuCard
        onPress={() => {
          navigator.navigate("Reports")
          setSideMenuOpen(false)
        }}
        name={"Order Report"}
        Icon="list"
      />
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: Color.NAVIGATION_BAR_BACKGROUND }}>
      {_renderUserProfile()}
      <View style={{ backgroundColor: "gray", height: 0.5 }} />
      <View style={{ flex: 0.9 }}>
        <ScrollView style={{ height: "100%" }}>
          {showAccounts && _renderAccounts()}
          {showActivity && _renderActivity && _renderActivity()}
          {showAttendance && _renderAttendance && _renderAttendance()}
          {showBills && _renderBills &&_renderBills()}
          {candidateView && _renderCandidate()}
          {_customer && _customer()}
          {showFine && _renderFine && _renderFine()}
          {showGatePass && _renderGatePass && _renderGatePass()}
          {showInspection && _renderInspection && _renderInspection()}
          {showLeads && _renderLeads && _renderLeads()}
          {storeView && _renderStore()}
          {showOrders && _renderBillEntry && _renderBillEntry()}
          {showOrderProduct && _renderOrderProduct &&_renderOrderProduct()}
          {showPayment && _renderPayments() && _renderPayments()}
          {showProducts && _renderProducts && _renderProducts()}
          {showBill && _renderBill && _renderBill()}
          {showReplenish && _renderReplenishProducts && _renderReplenishProducts()}
          {showSales && _renderSale && _renderSale()}
          {showSettings && _renderSettings && _renderSettings()}
          {showStock && _renderStocks && _renderStocks()}
          {showReplenish && _renderStoreReplenish && _renderStoreReplenish()}
          {showSync && _renderSync() && _renderSync()}
          {showTicket && _renderTicket()}
          {showTransfer && _renderInventoryTransfer && _renderInventoryTransfer()}
          {showUser && _renderUser && _renderUser()}
          {showVisitor && _renderVisitor()}
          {showWishList && _renderWishList()}
          {_renderDivider()}
          {_renderLogout()}
          {_renderDivider()}
        </ScrollView>
      </View>
      {_renderBuildNumber()}
      {rendorToolBar()}
    </View>
  );
};

export default Menu;
