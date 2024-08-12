// Import React and Component
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { MenuItem } from "react-native-material-menu";
import { SwipeListView } from "react-native-swipe-list-view";
import DropDownMenu from "../components/DropDownMenu";
import Layout from "../components/Layout";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import NoRecordFound from "../components/NoRecordFound";
import Refresh from "../components/Refresh";
import ShowMore from "../components/ShowMore";
import Tab from "../components/Tab";
import AsyncStorageConstants from "../helper/AsyncStorage";
import { Color } from "../helper/Color";
import Number from "../helper/Number";
import ObjectName from "../helper/ObjectName";
import Order from "../helper/Order";
import Permission from "../helper/Permission";
import Status from "../helper/Status";
import TabName from "../helper/Tab";
import AsyncStorage from "../lib/AsyncStorage";
import { default as DateTime } from "../lib/DateTime";
import OrderService from "../services/OrderService";
import shiftService from "../services/ShiftService";
import StatusService from "../services/StatusServices";
import storeService from "../services/StoreService";
import userService from "../services/UserService";
import OrderCard from "../views/order/components/OrderCard";
import FilterDrawer from "./Filter";
import PermissionService from "../services/PermissionService";
import CurrencyFormat from "../lib/Currency";
import Numbers from "../lib/Number";
import Date from "../helper/Date";

const OrderList = ({ title, type, AddNew, onPress, showFilter }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(2);
    const [HasMore, setHasMore] = useState(true);
    const [OrderDeleteModalOpen, setOrderDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [manageOther, setManageOther] = useState(false);
    const [orderTotal, setOrderTotal] = useState(false);
    const [todayList, setTodayList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [values, setValues] = useState({        
            startDate: "",
            endDate:"",
        });
    const [selectedDate, setSelectedDate] = useState(DateTime.Today());
    const [selectedEndDate, setSelectedEndDate] = useState(DateTime.Today());
    const [statusList, setStatusList] = useState();
    const [userList, setUserList] = useState();
    const [locationList, setLocationList] = useState();
    const [shiftList, setShiftList] = useState();
    const [activeTab, setActiveTab] = useState(TabName.TODAY);
    const [count, setCount] = useState(0);
    const[permission,setPermission] = useState(false)
    const[totalCash,setTotalCash] = useState("")
    const[totalUpi,setTotalUpi] = useState("")
    const[totalDraftAmount,setTotalDraftAmount] = useState("")
    const [search, setSearch] = useState("");
    const stateRef = useRef();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    useEffect(() => {
        if (isFocused) {
            const storedFilterValues =  values;
            if (Object.keys(storedFilterValues).length > 0) {
                setValues(storedFilterValues);
            }
            if(activeTab === TabName.TODAY){
            getAllList(storedFilterValues, Date.TODAY);
            }else{
            getAllList(storedFilterValues);

            }
        }
    }, [isFocused,refreshing, values,activeTab]);



    useEffect(() => {
        getStatusList();
        getUserList();
        getStoreList();
        getShiftList();
    }, [isFocused]);

    useEffect(() => {
        let mount = true;
        mount && getPermission();
        mount && getTotalPermission();
        //get permission
        return () => {
            mount = false;
        };
    }, [isFocused]);



    const getStatusList = async () => {
        let status = [];
        const response = await StatusService.list(ObjectName.ORDER);

        response && response.forEach((statusList) => {
            status.push({
                label: statusList.name,
                value: statusList.status_id,
                id: statusList.status_id
            });
        });

        setStatusList(status);
    }
    const getUserList = () => {
        userService.list(null, (callback) => { setUserList(callback) });

    }
    const getStoreList = () => {
        storeService.list({},(error, response) => {
            const storeListOption = new Array();
            let storeList = response?.data?.data;
            if (storeList && storeList.length > 0) {
                for (let i = 0; i < storeList.length; i++) {
                    storeListOption.push({
                        label: storeList[i].name,
                        value: storeList[i].id,
                    });
                }

                setLocationList(storeListOption);
            }

        });
    }

    const getShiftList = () => {
        let shiftListOption = new Array();

        shiftService.getShiftList({ showAllowedShift: true }, (error, response) => {
            let shiftList = response?.data?.data;
            if (shiftList && shiftList.length > 0) {
                for (let i = 0; i < shiftList.length; i++) {
                    shiftListOption.push({
                        label: shiftList[i].name,
                        value: shiftList[i].id,
                    });
                }
                setShiftList(shiftListOption);
            }
        })
    }

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
        const addOrder = await PermissionService.hasPermission(Permission.ORDER_ADD);

        const manageOthers = await PermissionService.hasPermission(Permission.ORDER_MANAGE_OTHERS);

        setPermission({ orderAdd: addOrder, manageOthers: manageOthers})

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



    const getAllList = async (values, orderDate) => {
        try {
            
            let param

            param = { type: type, sort: "createdAt", sortDir: "DESC", };

            if (activeTab === TabName.ALL) {
                if (values?.startDate) {
                    param.startDate = DateTime.formatDate(values?.startDate);
                }
                if (values?.endDate) {
                    param.endDate = DateTime.formatDate(values?.endDate);
                }
            }


            if (values?.status) {
                param.status = values?.status;
            }
            
                param.search = search;
           

            if (values?.user) {
                param.user = values?.user;
            }
            if (values?.location) {
                param.location = values?.location;
            }
            if (values?.shift) {
                param.shift = values?.shift;
            }
             
                if(orderDate){
               param.orderDate = orderDate
               param.showTotalAmount= true
        
            }
            if (values?.paymentType) {
                param.paymentType = values?.paymentType;
            }
            setIsLoading(true);

            OrderService.searchOrder(param, (error, response) => {
                let orders = response && response?.data && response?.data?.data;
                setTodayList(orders);
                setIsLoading(false);
                setTotalCash( response.data.totalCash)
                setTotalUpi( response.data.totalUpi)
                setTotalDraftAmount( response.data.totalDraftAmount)
                if (activeTab === TabName.TODAY) {
                setCount( response &&response.data && response.data.totalCount>0?response.data.totalCount:0)
                }
            });

           


        } catch (err) {
            console.log(err);

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
                        menuStyle = {{position: 'absolute'}}
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
                        order_number={item.order_number !== null ? item.order_number : ""}
                        date={item.date}
                        customerName={item.customerName}
                        status={item.statusDetail?.name}
                        statusColor={item?.statusDetail?.color_code}
                        firstName = {item?.delivery_executive_firstName}
                        lastName = {item?.delivery_executive_lastName}
                        mediaUrl = {item?.delivery_executive_media_url}
                        payment_type={item.payment_type}
                        total_amount={item.total_amount}
                        index={index}
                        onPress={() => onPress && onPress(item)}
                        data={item}
                    />
                ) : <OrderCard
                    order_number={item.order_number !== null ? item.order_number : ""}
                    date={item.date}
                    locationName={item.locationName}
                    status={item.status}
                    statusColor={item?.statusDetail?.color_code}
                    payment_type={item.payment_type}
                    total_amount={item.total_amount}
                    shift={item.shift}
                    index={index}
                    onPress={() => onPress && onPress(item)}
                    data={item}
                />}

            </View>
        );
    };
  const handleSubmit = async () => {
    getAllList({...values, search:search});
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
                user: value.value,
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
                startDate: DateTime.Today(value),
            }));
            setSelectedDate(DateTime.Today(value));
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
                endDate: DateTime.Today(value),
            }));
            setSelectedEndDate(DateTime.Today(value));
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
                search: search?search : "",
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
            if(activeTab === TabName.ALL){
            if (values?.startDate) {
                params.startDate = DateTime.formatDate(values?.startDate);
            }
            if (values?.endDate) {
                params.endDate = DateTime.formatDate(values?.endDate);
            }
          }
            if(activeTab === TabName.TODAY){
                params.orderDate =  Date.TODAY
                params.showTotalAmount= true
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
                getAllList({...values,search: search})
            });
        }
    };
    const handleChange = async (value) => {
        setSearch(value);
    };
    return (
        <>
      <Layout
        title={title}
        buttonLabel={permission && permission.orderAdd ? "New" : ""}
        buttonOnPress={permission && permission.orderAdd ? AddNew : ""}
        refreshing={refreshing}
        showFilter={showFilter}
        onFilterPress={closeDrawer}
        showBackIcon={false}
        FooterContent={orderTotal && todayList && todayList.length > 0}
        closeModal={visible}
      >
        <View>
            <Tab
              title={[
                
                {
                  title: `${TabName.TODAY} (${
                    count !== Number.UNDEFINED && 
                     
                    count
                  })`,
                  tabName: TabName.TODAY,
                },
                {
                    title: `${TabName.ALL}`,
                    tabName: TabName.ALL,
                  },
                
              ]}
              setActiveTab={setActiveTab}
              defaultTab={activeTab}
            />
          </View>

        <FilterDrawer
          values={values}
          isOpen={openFilter}
          ObjectName={ObjectName.ORDER}
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
          statusList={statusList}
          userList={userList}
          locationList={locationList}
          shiftList={shiftList}
          showLocation
          showStatus
          showUser={permission && permission.manageOthers}
          showPayment
          showShift
          showDate
          showSearch
          handleSubmit={handleSubmit}
          clearFilter={() => {
            setValues("");
            getAllList();
            closeDrawer();
          }}
          applyFilter={(value) => applyFilter(value)}
          handleSearchChange={handleChange}
          searchParam={search}
          handleClearSearch={() => {
           setSearch("")
          }}
        />
      
          <DeleteConfirmationModal
            modalVisible={OrderDeleteModalOpen}
            toggle={orderDeleteModalToggle}
            item={selectedItem}
            updateAction={OrderDelete}
          />

          <>
        

           <Refresh refreshing={refreshing} isLoading={isLoading} setRefreshing={setRefreshing}>

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
            </Refresh>
          </>
      </Layout>
      {activeTab == TabName.TODAY && type !== Order.DELIVERY && todayList && todayList.length > 0 && 
      <View style={{ flex: 0.1, backgroundColor:Color.BLACK }}>
        <View style={{  flexDirection:"row", alignItems:"center",padding:3 }}>
           <View style={styles.totalAmount}>
           <View style={styles.align}>
             <Text style={styles.letterText}>
                Cash:&nbsp;&nbsp;
               <Text style={styles.letterColor}>
                 {
                   CurrencyFormat.getFormatted(
                       Numbers.Get(totalCash), true
                     )}
               </Text>
             </Text>
           </View>
         </View>
           <View style={styles.align}>
             <Text style={styles.letterText}>
             PayTM:&nbsp;&nbsp;
               <Text style={styles.letterColor}>
                 {CurrencyFormat.getFormatted(
                   Numbers.Get(totalUpi), true
                 )}
               </Text>
             </Text>
           </View>
         </View>
         <View style={styles.align}>
             <Text style={styles.letterText}>
             Draft:&nbsp;&nbsp;
               <Text style={styles.letterColor}>
                 {CurrencyFormat.getFormatted(
                   Numbers.Get(totalDraftAmount), true
                 )}
               </Text>
             </Text>
         </View>
         </View>
}
         </>
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
    totalAmount: {
        flex: 1,
        flexDirection: "row",
      },
      align: {
        flex: 1,
        alignItems: 'center'
      },
      letterText: {
        fontWeight: "bold",
        fontSize: 19,
        color: "white",

      },
      letterColor: {
        color: "white",
      },
      searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
      searchBarContainer: {
        width: '70%',
      },
      cancelButton: {
        width: '30%',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 4,
      },
});
