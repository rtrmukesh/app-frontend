import { StyleSheet } from "react-native";
import { Color } from "./Color";
import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
 modalStyle : {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999, 
 },
 modalText : {
  textDecorationLine: "line-through",
  fontSize : 18 
 },
 priceText : {
  paddingLeft: 10,
   fontWeight: "bold",
   fontSize : 18 
 },
 productModal : {
  fontWeight: "700" ,
  fontSize : 18
 },
 textWidth : {
  width : "90%"
 },
 fontSize : {
  fontSize : 18
 },
  commentCard: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
},
  commentContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
},
commentUserInfo: {
    marginBottom: 10,
    flexDirection: 'row'
},
userNameComment: {
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 5
},
commentMessageContainer: {
    flex: 3,
},
commentMessage: {
    marginBottom: 5,
},
commentActionsContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
},
commentActionIconContainer: {
    marginHorizontal: 5,
},
  ProductCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
  },
  productCardText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  userCardContainer : {
    marginTop : 20,
  },
  

  quantityBox: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderColor: "black",
    borderRadius: 3,
    borderWidth: 1,
  },

  productContainer: {
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignContent: 'space-between'
  },

  lineAlign : {
    textDecorationLine: "line-through" 
  },
  imageCardAlign :{
    paddingRight: 20, 
    flex: 0.15
  },
  amountAlign : {
    paddingLeft: 10, 
    fontWeight: 'bold' 
  },
  quantityAlign : {
    justifyContent: "center", 
    flex : 0.25,
    alignItems: "flex-end"
  },
  quantityAlignment : {
    justifyContent: "center", 
    flex : 0.5,
    alignItems: "flex-end"
  },
  quantity : {
    fontWeight: "500",
     fontSize: 16,
      color: Color.GREY
  },
  quantity_order_product : {
    fontWeight: "500",
     fontSize: 16,
      color: Color.BLACK
  },

  listContainer: {
    alignItems: "flex-start",
    paddingBottom: 10,
    paddingTop: 10,
  },

  alingCount :{
    flex: 1, alignItems: 'flex-end'
  },

  scrollView: {
    flexDirection: 'row',
  },
  cardFilter: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10,
    maxWidth: "100%",
    maxHeight: "100%",
    backgroundColor: Color.LIGHT_GREY
  },
  cardFilterContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  headline: {
    fontSize: 16,
  },
  menuStyle : {
    position: 'absolute',
    top: '9%',
    left: '95%',
  },
  countContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.INDIGO,
    padding: 8,
    flex: 1,
  },
  complete : {
    backgroundColor : Color.COMPLETE
  },
  cancel : {
    backgroundColor : Color.RED
  },
  imageSize : {
    width: "100%",
     height: "100%" 
  },
  alignType : {
    flexDirection: 'row', 
    flexWrap: 'wrap' ,
    marginLeft : 26
  },
  countContainer1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.RED,
    padding: 8,
    flex: 1,
  },
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
    color: Color.WHITE,
  },
  largeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Color.WHITE,
  },
  countLabel: {
    fontSize: 16,
    color: Color.WHITE,
  },
  halfWidth: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 5,
  },
  cardAttendance: {
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
    elevation: 5,
    flexDirection: "row",
    flex: 1,
  },
  totalCounts: {
    position: 'absolute',
    top: -1,
    left: 16,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
  },
  assigneeRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoContainers: {
    marginLeft: 7
  },
  nameText: {
    fontWeight: "bold",
    marginBottom: 2
  },
  userName: {
    fontWeight: "bold",
    color: Color.INACTIVE_STORE,
    marginBottom: 2,
  },
  textName: {
    marginBottom: 2

  },
  infoText: {
    marginBottom: 3
  },
  source: {
    width: 20,
    height: 20,
    borderRadius: 30
  },

  imageIcon: {
    height: 150,
    width: 150,
    borderRadius: 400 / 2
  },
  imageIconGatePass: {
    height: 200,
    width: 200,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    justifyContent: "flex-start",

  },
  orderAlign: {
    paddingTop: 10,
    paddingBottom: 10
  },
  view: {
    flex: 0.1,
    alignItems: "flex-end"
  },
  transferText: {
    fontSize: 16,
    flex: 0.9,
    marginTop: 5
  },
  transferView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 2,
    alignItems: "center"
  },
  containers: {
    height: 60,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  uploadedImage: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
  defaultImage: {
    height: 150,
    width: 150,
  },
  font: {
    fontWeight: "bold"
  },
  containerVideo: {
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
  },

  video: {
    resizeMode: 'contain',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  user: {
    width: "100%",
    flexDirection: "row",
  },
  summary: {
    flexDirection: "row",
    paddingBottom: 3,
    maxWidth: "100%",

  },
  fieldWidth: {
    width: "48%",
  },
  modalImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 20
  },
  infoContainer: {
    flex: 1,
    marginLeft: 1,
  },
  leadContainer: {
    alignItems: "flex-start",
    paddingBottom: 6,
    paddingTop: 6,
  },
  locationAllocationContainer: {
    alignItems: "flex-start",
    paddingBottom: 8,
    paddingTop: 6,
  },
  accounts: {
    alignItems: "flex-start",
    paddingBottom: 16,
    paddingTop: 16,
  },
  circleDirection: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  productCountCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: Color.GREY,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40

  },

  productCountText: {
    color: "white",
    fontSize: 13,
  },
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardRow: {
    alignItems: "flex-start",
    marginTop: 6,
    marginBottom: 6,
    width: "100%"
  },
  cardUser: {
    width: "100%",
    flexDirection: "row",
  },

  cardStatus: {
    width: "35%",
  },
  cardAlign: {
    width: "65%"
  },
  cardDate: {
    paddingLeft: 26,
  },
  actionBar: {
    flex: 1,
    overflow: "scroll",
    backgroundColor: "#fff",
    maxHeight: "100%"
  },
  portal: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 5
  },
  noRecordfound: {
    paddingVertical: 250,
    alignItems: "center"
  },
  item: {
    width: '50%'
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  buttons: {
    flex: 1,
    flexDirection: "row"
  },
  completeButton: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 3
  },

  inputDate: {
    color: "black",
    height: 50,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#dadae8",
  },
  layoutTitle: {
    fontSize: 20,
    paddingTop: 3,
    paddingLeft: 5
  },
  layoutFilter: {
    paddingRight: 10,
    paddingBottom: 1
  },
  layoutButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 1,
    marginRight: 10,
  },

  name: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "500",
  },
  itemNavigation: {
    fontSize: 16,
    fontWeight: "400",
    color: Color.TITLE,
    textAlign: "center",
    padding: 10,
  },

  menu: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },

  applyButton: {
    marginTop: 20
  },
  filterButton: {
    alignSelf: 'flex-end',
    marginLeft: 50
  },
  direction: {
    flexDirection: "row",
  },
  textColor: {
    color: Color.ACTIVE_STORE,
  },
  colorText: {
    color: Color.INACTIVE_STORE,
  },
  container: {
    flex: 1,
    overflow: "scroll",
    backgroundColor: "#fff",
  },
  productImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
  },
  productImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
  },
  swipeStyle: {
    flex: 1,
  },
  actionDeleteButton: {
    alignItems: "center",
    bottom: 10,
    justifyContent: "center",
    position: "absolute",
    top: 16,
    width: 70,
    backgroundColor: "#D11A2A",
    right: 7,
  },
  btnText: {
    color: Color.WHITE,
  },
  productEdit: {
    alignItems: "center",
    bottom: 10,
    justifyContent: "center",
    position: "absolute",
    top: 10,
    width: 70,
    backgroundColor: "grey",
    right: 0,
  },
  tabBar: {
    flexDirection: "row",
    height: 50,
    backgroundColor: Color.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Color.LIGHT_GRAY,
  },
  tabBars: {
    flexDirection: "row",
    height: 35,
    backgroundColor: Color.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Color.LIGHT_GRAY,
  },
  productDelete: {
    alignItems: "center",
    bottom: 10,
    justifyContent: "center",
    position: "absolute",
    top: 10,
    width: 70,
    backgroundColor: "#D11A2A",
    right: 70,
  },
  cashAmount: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  align: {
    flex: 1,
    alignItems: 'center'
  },
  letter: {
    fontWeight: "bold",
    fontSize: 19,
    letterSpacing: 1,
  },
  letterText: {
    fontWeight: "bold",
    fontSize: 19,
    letterSpacing: 1,

  },
  letterColor: {
    color: "red",
    letterSpacing: 1
  },
  totalAmount: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
  },
  iconName: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.ICONS_GREY
  },
  margin: {
    marginRight: 20,
  },
  marginAlign: {
    alignItems: "center"
  },
  bottomToolBar: {
    paddingHorizontal: 5,
    padding: 5,
    backgroundColor: Color.TOOL_BAR_BACKGROUND
  },

  swipeStyle: {
    flex: 1,

  },
  actionDeleteButton: {
    alignItems: 'center',
    bottom: 10,
    justifyContent: 'center',
    position: 'absolute',
    top: 16,
    width: 70,
    backgroundColor: '#D11A2A',
    right: 7
  },
  btnText: {
    color: Color.WHITE,
  },
  searchBar: {
    flex: 0.2,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  cameraColor: {
    backgroundColor: Color.LIGHT_GRAY
  },
  productModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    fontSize: 20,
    marginTop : height * 0.1
  },
  productModalContent: {
    marginTop: 5,
    alignItems: "flex-start",
    fontSize: 18
  },
  productModalCloseButton: {
    padding: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  ProductModelCloseButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  cartText: {
    fontSize: 18,
    textTransform: "capitalize",
    alignItems: "flex-start"
  },
  productModalImage: {
    height: 80,
    width: 80
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: Color.ACCORDION_HEADER
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  storeProductModalContainer: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 18,
    alignItems: "center",
  },
  storeTable: {
    backgroundColor: "white",
    fontSize: 18,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tableCellText: {
    fontWeight: "bold",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,

  },


  tableCellHeader: {
    flex: 1,
    backgroundColor: Color.LIGHT_GRAY,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    marginTop: 20,
    marginBottom: 20
  },
  tableCellHeaderText: {
    fontWeight: "bold",
    color: "black"
  },
  orderProductEdit: {
    backgroundColor: Color.SECONDARY,
    padding: 10,
    borderRadius: 5,
    rigth:0,
    alignItems:"center" ,
    justifyContent: "center",   
  },
  orderProductCancel: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    rigth:0,
    width:"35%",
    alignItems:"center"
  },

});

export default styles;
