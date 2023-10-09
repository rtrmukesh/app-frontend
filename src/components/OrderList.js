// Import React and Component
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Color } from "../helper/Color";
import SearchBar from "./SearchBar";
import AsyncStorageConstants from "../helper/AsyncStorage";
import AsyncStorage from "../lib/AsyncStorage";
import { useIsFocused } from "@react-navigation/native";
import Layout from "../components/Layout";
import OrderCard from "../views/order/components/OrderCard";
import { SwipeListView } from "react-native-swipe-list-view";
import OrderService from "../services/OrderService";
import Permission from "../helper/Permission";
import { useForm } from "react-hook-form";
import { MenuItem } from "react-native-material-menu";
import DropDownMenu from "../components/DropDownMenu";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import NoRecordFound from "../components/NoRecordFound";
import Refresh from "../components/Refresh";
import ShowMore from "../components/ShowMore";
import { default as DateTime, default as dateTime } from "../lib/DateTime";
import FilterDrawer from "../views/order/Filter";
import Order from "../helper/Order";

const OrderList = ({ title, type, AddNew, onPress, showFilter }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [search, setSearch] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(2);
    const [HasMore, setHasMore] = useState(true);
    const [OrderDeleteModalOpen, setOrderDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [manageOther, setManageOther] = useState(false);
    const [orderTotal, setOrderTotal] = useState(false);
    const [todayList, setTodayList] = useState("");
    const [visible, setVisible] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [values, setValues] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());

    const stateRef = useRef();
    const isFocused = useIsFocused();

    const navigation = useNavigation();

    // render the stock entry list function
    useEffect(() => {
        if (isFocused) {
            let mount = true;
            mount && getAllList(values);

            //cleanup function
            return () => {
                mount = false;
            };
        }
    }, [isFocused, navigation]);

    useEffect(() => {
        getAllList(values);
    }, []);
    useEffect(() => {
        let mount = true;

        //get permission
        mount && getPermission();
        return () => {
            mount = false;
        };
    }, [isFocused]);
    useEffect(() => {
        let mount = true;
        mount && getTotalPermission();
        return () => {
            mount = false;
        };
    }, [isFocused]);

    const getPermission = async () => {
        //get permission list
        let permissionList = await AsyncStorage.getItem(
            AsyncStorageConstants.PERMISSIONS
        );
        //validate permission list exist or not
        if (permissionList) {
            //convert string to JSON
            permissionList = JSON.parse(permissionList);
            //validate permission list exist or not
            if (permissionList && permissionList.length > 0) {
                //get permission
                let manageOther =
                    permissionList &&
                        permissionList.find(
                            (option) => option.role_permission === Permission.ORDER_DELETE
                        )
                        ? true
                        : false;
                //set all user
                setManageOther(manageOther);
            }
        }
    };
    const getTotalPermission = async () => {
        let permissionList = await AsyncStorage.getItem(
            AsyncStorageConstants.PERMISSIONS
        );
        if (permissionList) {
            //convert string to JSON
            permissionList = JSON.parse(permissionList);
            //validate permission list exist or not
            if (permissionList && permissionList.length > 0) {
                let manageTotalView =
                    permissionList &&
                        permissionList.find(
                            (option) => option.role_permission === Permission.ORDER_TOTAL_VIEW
                        )
                        ? true
                        : false;
                setOrderTotal(manageTotalView);
            }
        }
    };



    const getAllList = async (values) => {
        try {
            setSearchPhrase("");
            setClicked(false);
            Keyboard.dismiss();
            setPage(2);
            setHasMore("0");
            searchPhrase == "" && setSearch(false);
            searchPhrase == "" && !refreshing && setIsLoading(true);

            let param = { type: type, sort: "createdAt", sortDir: "DESC" };
            if (values?.status) {
                param.status = values?.status;
            }


            if (values?.user) {
                param.user = values?.user;
            }
            if (values?.location) {
                param.location = values?.location;
            }
            if (values?.shift) {
                param.shift = values?.shift;
            }
            if (values?.paymentType) {
                param.paymentType = values?.paymentType;
            }
            if (values?.startDate) {
                param.startDate = DateTime.formatDate(values?.startDate);
            }
            if (values?.endDate) {
                param.endDate = DateTime.formatDate(values?.endDate);
            }

            OrderService.searchOrder(param, (error, response) => {
                let orders = response && response?.data && response?.data?.data;
                setTodayList(orders);
                setIsLoading(false);
                setVisible(false);
            });

            let params = { page: 1, sort: "createdAt", sortDir: "DESC", type: type };
            if (values?.status) {
                params.status = values?.status;
            }
            if (values?.user) {
                params.user = values?.user;
            }
            if (values?.location) {
                params.location = values?.location;
            }
            if (values?.shift) {
                params.shift = values?.shift;
            }
            if (values?.paymentType) {
                params.paymentType = values?.paymentType;
            }
            if (values?.startDate) {
                params.startDate = DateTime.formatDate(values?.startDate);
            }
            if (values?.endDate) {
                params.endDate = DateTime.formatDate(values?.endDate);
            }

            OrderService.searchOrder(params, (error, response) => {
                let orders = response && response?.data && response?.data?.data;

                // Set response in state
                setTodayList(orders);
                setIsLoading(false);
            });
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const closeDrawer = () => {
        setOpenFilter(!openFilter);
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const clearRowDetail = () => {
        if (stateRef) {
            const selectedItem = stateRef.selectedItem;
            const selectedRowMap = stateRef.selecredRowMap;
            if (selectedItem && selectedRowMap) {
                closeRow(selectedRowMap, selectedItem.id);
                setSelectedItem("");
                stateRef.selectedItem = "";
                stateRef.selecredRowMap = "";
            }
        }
    };

    const orderDeleteModalToggle = () => {
        setOrderDeleteModalOpen(!OrderDeleteModalOpen);
        clearRowDetail();
    };

    const renderHiddenItem = (data, rowMap) => {
        return (
            <>
                <View style={styles.more}>
                    <DropDownMenu
                        label="More"
                        color={Color.WHITE}
                        icon="ellipsis-horizontal"
                        MenuItems={[
                            <MenuItem
                                onPress={() => {
                                    setVisible(true), orderDeleteModalToggle();
                                    setSelectedItem(data?.item);
                                    stateRef.selectedItem = data?.item;
                                    stateRef.selecredRowMap = rowMap;
                                    closeRow(rowMap, data?.item.id);
                                }}
                            >
                                DELETE
                            </MenuItem>,
                        ]}
                        onPress={visible}
                    />
                </View>
                <View style={styles.swipeStyle}>
                    <TouchableOpacity
                        style={styles.actionDeleteButton}
                        onPress={() => {
                            navigation.navigate("Order/Invoice", { item: data.item });
                        }}
                    >
                        <Text style={styles.btnText}>View Invoice</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.container}>
                {item.type === Order.DELIVERY_TEXT ? (
                    <OrderCard
                        order_number={item.order_number}
                        date={item.date}
                        locationName={item.locationName}
                        status={item.DeliveryStatusDetail?.name}
                        statusColor={item?.DeliveryStatusDetail?.color_code}
                        payment_type={item.payment_type}
                        total_amount={item.total_amount}
                        shift={item.shift}
                        index={index}
                        onPress={() => onPress && onPress(item)}
                    />
                ) :  <OrderCard
                order_number={item.order_number}
                date={item.date}
                locationName={item.locationName}
                status={item.status}
                statusColor={item?.statusDetail?.color_code}
                payment_type={item.payment_type}
                total_amount={item.total_amount}
                shift={item.shift}
                index={index}
                onPress={() => onPress && onPress(item)}
            />}

            </View>
        );
    };
    const handleSubmit = async () => {
        getAllList(values);
        closeDrawer();
    };
    const statusOnSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                status: value,
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                status: "",
            }));
        }
    };
    const userOnSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                user: value,
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                user: "",
            }));
        }
    };
    const locationOnSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                location: value,
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                location: "",
            }));
        }
    };
    const shiftOnSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                shift: value,
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                shift: "",
            }));
        }
    };

    const paymentOnSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                paymentType: value,
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                paymentType: "",
            }));
        }
    };

    const onDateSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                startDate: new Date(value),
            }));
            setSelectedDate(new Date(value));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                startDate: "",
            }));
            setSelectedDate("");
        }
    };
    const onEndDateSelect = (value) => {
        if (value) {
            setValues((prevValues) => ({
                ...prevValues,
                endDate: new Date(value),
            }));
            setSelectedEndDate(new Date(value));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                endDate: "",
            }));
            setSelectedEndDate("");
        }
    };

    const TodayLoadMoreList = async () => {
        try {
            setIsFetching(true);

            let params;

            params = {
                page: page,
                search: searchParam ? searchParam : "",
                sort: "createdAt",
                sortDir: "DESC",
                type: type
            };
            if (values?.status) {
                params.status = values?.status;
            }

            if (values?.user) {
                params.user = values?.user;
            }
            if (values?.location) {
                params.location = values?.location;
            }
            if (values?.shift) {
                params.shift = values?.shift;
            }
            if (values?.paymentType) {
                params.paymentType = values?.paymentType;
            }
            if (values?.startDate) {
                params.startDate = DateTime.formatDate(values?.startDate);
            }
            if (values?.endDate) {
                params.endDate = DateTime.formatDate(values?.endDate);
            }
            OrderService.searchOrder(params, (error, response) => {
                let orders = response?.data?.data;

                // Set response in state
                setTodayList((prevTitles) => {
                    return [...new Set([...prevTitles, ...orders])];
                });
                setPage((prevPageNumber) => prevPageNumber + 1);
                setHasMore(orders.length > 0);
                setIsFetching(false);
            });
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const {
        control,
        formState: { errors },
    } = useForm();

    const OrderDelete = async () => {
        if (selectedItem) {
            OrderService.DeleteOrder(selectedItem.id, (error, response) => {
                getAllList();
            });
        }
    };
    const handleChange = async (search) => {
        setSearchParam(search);
        //Api Call
        OrderService.searchOrder(
            {
                search: search ? search : "",
                startDate: dateTime.formatDate(new Date()),
                endDate: dateTime.toISOEndTimeAndDate(new Date()),
                type: type
            },
            (error, response) => {
                let list = response.data.data;
                setTodayList(list);
                if (searchPhrase.length == 0) {
                    getAllList;
                }
            }
        );
    };

    return (
        <Layout
            title={title}
            buttonLabel={"New"}
            buttonOnPress={AddNew}
            isLoading={isLoading}
            refreshing={refreshing}
            showFilter={showFilter}
            onFilterPress={closeDrawer}
            bottomToolBar={true}
            FooterContent={orderTotal && todayList && todayList.length > 0}
        >
            <FilterDrawer
                values={values}
                isOpen={openFilter}
                closeDrawer={closeDrawer}
                paymentOnSelect={paymentOnSelect}
                shiftOnSelect={shiftOnSelect}
                locationOnSelect={locationOnSelect}
                statusOnSelect={statusOnSelect}
                userOnSelect={userOnSelect}
                onDateSelect={onDateSelect}
                onEndDateSelect={onEndDateSelect}
                selectedEndDate={selectedEndDate}
                selectedDate={selectedDate}
                handleSubmit={handleSubmit}
                clearFilter={() => {
                    setValues("");
                    getAllList();
                    closeDrawer();
                }}
                applyFilter={(value) => applyFilter(value)}
            />

            <Refresh refreshing={refreshing} setRefreshing={setRefreshing}>
                <DeleteConfirmationModal
                    modalVisible={OrderDeleteModalOpen}
                    toggle={orderDeleteModalToggle}
                    item={selectedItem}
                    updateAction={OrderDelete}
                />

                <>
                    <View style={styles.searchBar}>
                        <SearchBar
                            searchPhrase={searchPhrase}
                            setSearchPhrase={setSearchPhrase}
                            setClicked={setClicked}
                            clicked={clicked}
                            setSearch={setSearch}
                            onPress={getAllList}
                            handleChange={handleChange}
                            noScanner
                        />
                    </View>

                    <View>
                        {todayList && todayList.length > 0 ? (
                            <>
                                <SwipeListView
                                    data={todayList}
                                    renderItem={renderItem}
                                    renderHiddenItem={renderHiddenItem}
                                    rightOpenValue={-140}
                                    previewOpenValue={-40}
                                    previewOpenDelay={3000}
                                    disableRightSwipe={true}
                                    disableLeftSwipe={manageOther ? false : true}
                                    closeOnRowOpen={true}
                                    keyExtractor={(item) => String(item.id)}
                                />
                            </>
                        ) : (
                            <NoRecordFound iconName="receipt" />
                        )}

                        <ShowMore
                            List={todayList}
                            isFetching={isFetching}
                            HasMore={HasMore}
                            onPress={TodayLoadMoreList}
                        />
                    </View>
                </>
            </Refresh>
        </Layout>
    );
};

export default OrderList;
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        overflow: "scroll",
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        overflow: "scroll",
        backgroundColor: "#fff",
    },
    searchBar: {
        flex: 0.2,
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    headerStyle: {
        display: "flex",
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        backgroundColor: "#E8E8E8",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addStocks: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    addButton: {
        height: 10,
    },
    card: {
        height: 60,
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 5,
    },
    cartText: {
        fontSize: 16,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    swipeStyle: {
        flex: 1,
    },
    more: {
        alignItems: "center",
        bottom: 10,
        justifyContent: "center",
        position: "absolute",
        top: 10,
        width: 70,
        backgroundColor: Color.SECONDARY,
        right: 70,
    },
    actionDeleteButton: {
        alignItems: "center",
        bottom: 10,
        justifyContent: "center",
        position: "absolute",
        top: 10,
        width: 70,
        backgroundColor: Color.GREY,
        right: 0,
    },
    btnText: {
        color: Color.WHITE,
    },
});
