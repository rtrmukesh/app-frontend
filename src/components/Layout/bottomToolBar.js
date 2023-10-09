// Import React and Component
import React, { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from "@expo/vector-icons";
import { Color } from "../../helper/Color";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconValue from "../../helper/navBarItems";
import AsyncStorage from "../../lib/AsyncStorage";
import AsyncStorageConstants from "../../helper/AsyncStorage";
import Permission from "../../helper/Permission";
import MenuName from "../../helper/navBarItems";
import ToolBarItem from "../ToolBarItem";
import styles from "../../helper/Styles";
import PermissionService from "../../services/PermissionService";



const BottomToolBar = ({ updateMenuState, setSideMenuOpen, menuOpen }) => {
    const [permissionList, setPermissionList] = useState();
    const [menuActive, setMenuActive] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const routeNameArray = route.name.split('/');
    const menuItemValue = menuOpen ? IconValue.MENU : routeNameArray[0];
    const [ticketViewPermission, setTicketViewPermission] = useState()
    const [orderViewPermission, setOrderViewPermission] = useState()
    const [replenishViewPermission, setReplenishViewPermission] = useState()
    const [productViewPermission, setProductViewPermission] = useState()
    const [transferViewPermission, setTransferViewPermission] = useState()
    const [reportViewPermission, setReportViewPermission] = useState()
    const [deliveryViewPermission, setDeliveryPermission] = useState()




    useEffect(() => {
        getPermission();
    }, []);

    const getPermission = async () => {
        const replenishView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_REPLENISH);
        setReplenishViewPermission(replenishView)
        const orderView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_ORDER);
        setOrderViewPermission(orderView)
        const transferView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_TRANSFER);
        setTransferViewPermission(transferView)
        const productView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_PRODUCT);
        setProductViewPermission(productView)
        const ticketView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_TICKET);
        setTicketViewPermission(ticketView)
        const reportView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_REPORTS);
        setReportViewPermission(reportView)
        const deliveryView = await PermissionService.hasPermission(Permission.MOBILEAPP_DASHBOARD_MENU_DELIVERY);
        setDeliveryPermission(deliveryView)
    }




    const handleHomePress = () => {
        navigation.navigate("Dashboard");
        setSideMenuOpen && setSideMenuOpen(false);
    };

    const handleOrderPress = () => {
        navigation.navigate("Order");
        setSideMenuOpen && setSideMenuOpen(false);
    };

    const handleTransferPress = () => {
        navigation.navigate("inventoryTransfer");
        setSideMenuOpen && setSideMenuOpen(false);
    };
    const handleProductPress = () => {
        navigation.navigate("Products");
        setSideMenuOpen && setSideMenuOpen(false);
    };
    const handleTicketPress = () => {
        navigation.navigate("Ticket");
        setSideMenuOpen && setSideMenuOpen(false);
    };

    const handleReplenishPress = () => {
        navigation.navigate("ProductReplenish");
        setSideMenuOpen && setSideMenuOpen(false);
    }
    const handleReports = () => {
        navigation.navigate("Report");
        setSideMenuOpen && setSideMenuOpen(false);
    }
    const handleMessages = () => {
        navigation.navigate("Messages");
        setSideMenuOpen && setSideMenuOpen(false);
    }

    const handleDelivery = () => {
        navigation.navigate("Delivery");
        setSideMenuOpen && setSideMenuOpen(false);
    }

    return (

        <View style={styles.bottomToolBar}>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <ToolBarItem
                    icon="home"
                    label="Home"
                    onPress={handleHomePress}
                    selected={menuItemValue === IconValue.DASHBOARD}
                />
                {orderViewPermission && (
                    <ToolBarItem
                        icon="receipt"
                        label="Orders"
                        onPress={(e) => handleOrderPress()}
                        selected={menuItemValue === IconValue.ORDER}
                    />
                )}

                {replenishViewPermission && (
                    <ToolBarItem
                        icon="shipping-fast"
                        label="Replenish"
                        onPress={handleReplenishPress}
                        selected={menuItemValue === IconValue.REPLENISH}
                    />
                )}
                {transferViewPermission && (
                    <ToolBarItem
                        icon="truck-moving"
                        label="Transfers"
                        onPress={handleTransferPress}
                        selected={menuItemValue === IconValue.TRANSFER}
                    />
                )}
                {productViewPermission && (
                    <ToolBarItem
                        icon="box-open"
                        label="Products"
                        onPress={handleProductPress}
                        selected={menuItemValue === IconValue.PRODUCT}
                    />
                )}
                {deliveryViewPermission && (
                <ToolBarItem
                    icon="shipping-fast"
                    label="Delivery"
                    onPress={handleDelivery}
                    selected={menuItemValue === IconValue.DELIVERY}
                />
                )}
                {ticketViewPermission && (
                    <ToolBarItem
                        icon="ticket-alt"
                        label="Tickets"
                        onPress={handleTicketPress}
                        selected={menuItemValue === IconValue.TICKET}
                    />
                )}
                {reportViewPermission && (
                    <ToolBarItem
                        icon="file-alt"
                        label="Reports"
                        onPress={handleReports}
                        selected={menuItemValue === IconValue.REPORTS ||
                            menuItemValue === IconValue.ORDER_PRODUCT_REPORT ||
                            menuItemValue === IconValue.ORDER_SUMMARY_REPORT ||
                            menuItemValue === IconValue.ATTENDANCE_REPORT ||
                            menuItemValue === IconValue.ORDER_REPORT ||
                            menuItemValue === IconValue.ORDER_SALES_SETTLEMENT_REPORT ||
                            menuItemValue === IconValue.PURCHASE_RECOMMENDATION_REPORT}
                    />
                )}
                


                <ToolBarItem
                    icon="bars"
                    label="Menu"
                    onPress={() => {
                        setMenuActive(true)
                        updateMenuState(true)
                    }}
                    selected={menuItemValue === IconValue.MENU}
                />
            </ScrollView>


        </View>

    );
};

export default BottomToolBar;

const style = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "scroll",
        backgroundColor: "#fff",
    },
    iconName: {
        marginTop: 5,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Color.ICONS_GREY
    },

});