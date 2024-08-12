// Import React and Component
import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { Color } from "../../helper/Color";
import Permission from "../../helper/Permission";
import IconValue from "../../helper/navBarItems";
import PermissionService from "../../services/PermissionService";
import ToolBarItem from "../ToolBarItem";
import device from "../../lib/Device";
import asyncStorageService from "../../services/AsyncStorageService";
import Feature from "../../helper/Feature";


const BottomToolBar = (props) => {
    let { updateMenuState, setSideMenuOpen, menuOpen }=props
    const navigation = useNavigation();
    const [ticketViewPermission, setTicketViewPermission] = useState()
    const [orderViewPermission, setOrderViewPermission] = useState()
    const [replenishViewPermission, setReplenishViewPermission] = useState()
    const [productViewPermission, setProductViewPermission] = useState()
    const [transferViewPermission, setTransferViewPermission] = useState()
    const [reportViewPermission, setReportViewPermission] = useState()
    const [deliveryViewPermission, setDeliveryPermission] = useState()
    const [distributionViewPermission, setDistributionViewPermission] = useState()
    const [activitiesViewPermission, setActivitiesViewPermission] =useState()
    const [devicePendingStatus, setDevicePendingStatus]=useState(false)
    const [locationId, setLocationId] = useState([]);

    const screenWidth = Dimensions.get('window').width;

    const routeIndex = useNavigationState((state) => state?.index);
    const currentRoute = useNavigationState((state) => state?.routes[routeIndex]?.name);
    const menuItemValue = menuOpen ? IconValue.MENU : currentRoute ? currentRoute : "Dashboard";
    useEffect(() => {
        getPermission();
        getLocation();
    }, [props,currentRoute]);

    const getLocation = async()=>{
        let storeId = await asyncStorageService.getSelectedLocationId()
        setLocationId(storeId)
    }


    const getPermission = async () => {
        const transferView = await PermissionService.getFeaturePermission(Feature.ENABLE_TRANSFER,Permission.MOBILEAPP_DASHBOARD_MENU_TRANSFER);
        setTransferViewPermission(transferView)
        const productView = await PermissionService.getFeaturePermission(Feature.ENABLE_PRODUCT,Permission.MOBILEAPP_DASHBOARD_MENU_PRODUCT);
        setProductViewPermission(productView)
        const ticketView = await PermissionService.getFeaturePermission(Feature.ENABLE_TICKET,Permission.MOBILEAPP_DASHBOARD_MENU_TICKET);
        setTicketViewPermission(ticketView)
        const activitiesView = await PermissionService.getFeaturePermission(Feature.ENABLE_ACTIVITY,Permission.MOBILEAPP_DASHBOARD_MENU_ACTIVITIES);
        setActivitiesViewPermission(activitiesView)
        let replenishView =  await PermissionService.getFeaturePermission(Feature.ENABLE_REPLENISHMENT,Permission.MOBILEAPP_DASHBOARD_MENU_REPLENISH);
        setReplenishViewPermission(replenishView)
        let orderView =  await PermissionService.getFeaturePermission(Feature.ENABLE_ORDER,Permission.MOBILEAPP_DASHBOARD_MENU_ORDER);
        setOrderViewPermission(orderView)
        const deliveryView = await PermissionService.getFeaturePermission(Feature.ENABLE_DELIVERY_ORDER,Permission.MOBILEAPP_DASHBOARD_MENU_DELIVERY);
        setDeliveryPermission(deliveryView)
        const reportView = await PermissionService.getFeaturePermission(Feature.ENABLE_REPORT,Permission.MOBILEAPP_DASHBOARD_MENU_REPORTS);
        setReportViewPermission(reportView)
        const distributionView = await PermissionService.getFeaturePermission(Feature.ENABLE_DISTRIBUTION,Permission.MOBILEAPP_DASHBOARD_MENU_DISTRIBUTION);
        setDistributionViewPermission(distributionView)
       
       await device.isStatusBlocked((devicePendingStatus)=>{
            setDevicePendingStatus(devicePendingStatus)
        });
    }
    
    const getHideToolBarDetail=()=>{
        let showToolBarByRoute = ["Dashboard","Order","RecurringTask","Ticket","ProductReplenish","Report","Menu","Delivery","Sync","Location","OrderSalesSettlementDiscrepancyReport","StockEntry","Fine","Lead","GatePass","Accounts","Inspection","Users","Visitor","Candidate","OrderProduct","Salary","Attendance","inventoryTransfer","distributionTransfer","BrandAndCategoryList","StoreReplenish","ReplenishmentProduct","WishListProducts","SalesSettlement","Bills","Purchase","PurchaseOrder","Payments","ActivityList","Customers","Settings","Reports","CustomerSelector","LocationAllocation"]
       return showToolBarByRoute.includes(currentRoute ? currentRoute : "Dashboard" )
    }

        let showToolBar = getHideToolBarDetail()


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
    const handleDistributionPress = () => {
        navigation.navigate("distributionTransfer");
        setSideMenuOpen && setSideMenuOpen(false);
    };
    const handleProductPress = () => {
        navigation.navigate("BrandAndCategoryList");
        setSideMenuOpen && setSideMenuOpen(false);
    };
    const handleTicketPress = () => {
        navigation.navigate("Ticket");
        setSideMenuOpen && setSideMenuOpen(false);
    };

    const handleActivitiesPress = () => {
        navigation.navigate("ActivityList");
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
    const handleMenuPress = () => {
        navigation.navigate("Menu",{navigator: navigation});
    };

    const handleDelivery = () => {
        navigation.navigate("Delivery");
        setSideMenuOpen && setSideMenuOpen(false);
    }

    const renderToolBarItems = () => {
        const toolBarItems = [
            {
                icon: "home",
                label: "Home",
                onPress: handleHomePress,
                selected: menuItemValue === IconValue.DASHBOARD
            },
            {
                icon: "receipt",
                label: "Orders",
                onPress: handleOrderPress,
                selected: menuItemValue === IconValue.ORDER
            },
            {
                icon: "shipping-fast",
                label: "Replenish",
                onPress: handleReplenishPress,
                selected: menuItemValue === IconValue.REPLENISH
            },
            {
                icon: "truck-moving",
                label: "Transfers",
                onPress: handleTransferPress,
                selected: menuItemValue === IconValue.TRANSFER
            },
            {
                icon: "dolly",
                label: "Distribution",
                onPress: handleDistributionPress,
                selected: menuItemValue === IconValue.DISTRIBUTION,
            },
            {
                icon: "box-open",
                label: "Products",
                onPress: handleProductPress,
                selected: menuItemValue === IconValue.PRODUCT,
            },
            {
                icon : "shipping-fast",
                label : "Delivery",
                onPress : handleDelivery,
                selected : menuItemValue === IconValue.DELIVERY,
            },
            {
                icon : "ticket-alt",
                label : "Tickets",
                onPress : handleTicketPress,
                selected : menuItemValue === IconValue.TICKET,
            },
            {
                icon : "chart-line",
                label : "Activities",
                onPress : handleActivitiesPress,
                selected : menuItemValue === IconValue.ACTIVITY_LIST,
            },
            {
                icon : "file-alt",
                label : "Reports",
                onPress : handleReports,
                selected : menuItemValue === IconValue.REPORTS ||
                    menuItemValue === IconValue.ORDER_PRODUCT_REPORT ||
                    menuItemValue === IconValue.ORDER_SUMMARY_REPORT ||
                    menuItemValue === IconValue.ATTENDANCE_REPORT ||
                    menuItemValue === IconValue.ORDER_REPORT ||
                    menuItemValue === IconValue.ORDER_SALES_SETTLEMENT_REPORT ||
                    menuItemValue === IconValue.PURCHASE_RECOMMENDATION_REPORT || menuItemValue === IconValue.TRANSFER_PRODUCT_REPORT_USERWISE || menuItemValue === IconValue.STOCK_ENTRY_REPORT
            },
            {
                icon: "bars",
                label: "Menu",
                onPress: handleMenuPress,
                selected: menuItemValue === IconValue.MENU,
            },
        ];

const filteredItems = toolBarItems.filter(item => {
    switch (item.label) {
        case "Orders":
            return orderViewPermission && !devicePendingStatus && locationId;
        case "Replenish":
            return replenishViewPermission;
            case "Transfers":
                return transferViewPermission && !devicePendingStatus && locationId;
                case "Distribution":
                    return distributionViewPermission;
                    case "Products":
                        return productViewPermission && !devicePendingStatus;
                        case "Delivery":
                            return deliveryViewPermission;
                            case "Tickets":
                                return ticketViewPermission;
                                case "Activities":
                                    return activitiesViewPermission;
                                    case "Reports":
                                        return reportViewPermission;
        default:
            return true;
    }
});
if (filteredItems.length == 2) {
    return (
        <View style={style.centeredIcon}>
            <ToolBarItem
                icon="home"
                label="Home"
                onPress={handleHomePress}
                selected={menuItemValue === IconValue.DASHBOARD}
            />
            <ToolBarItem
                icon="bars"
                label="Menu"
                onPress={handleMenuPress}
                selected={menuItemValue === IconValue.MENU}
            />
        </View>
    );
}else if
 (filteredItems.length <= 5) {
    return filteredItems.map((item, index) => (
        <ToolBarItem
            key={index}
            icon={item.icon}
            label={item.label}
            onPress={item.onPress}
            selected={item.selected}
        />
    ));
}
 else {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  contentContainerStyle={{ width: filteredItems.length <= 5 ? screenWidth + 70 : "" }}>
            {filteredItems.map((item, index) => (
                <ToolBarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    onPress={item.onPress}
                    selected={item.selected}
                />
            ))}
        </ScrollView>
    );
}
};
return (
    showToolBar && <View style={style.bottomToolBar}>
    {renderToolBarItems()}
</View>
);
};

export default BottomToolBar;

const style = StyleSheet.create({
    bottomToolBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: 65,
        backgroundColor: "#fff",
        backgroundColor: Color.TOOL_BAR_BACKGROUND,
        elevation: 2,
    },
    centeredIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: "20%",
    },

});