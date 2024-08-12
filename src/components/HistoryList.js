import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserCard from "./UserCard";
import styles from "../helper/Styles";
import DateTime from "../lib/DateTime";
import DateText from "./DateText"
import systemLogService from "../services/SystemLogService";
import AlternativeColor from "./AlternativeBackground";


const HistoryList = (props) => {
  const { objectId,objectName } = props;

  const [history, setHistory] = useState("")

  useEffect(()=>{
    historyList()
  },[])

  const historyList = async () => {
    let param = { objectId: objectId, objectName:objectName }

    await systemLogService.getHistoryList(param, (error, response) => {
        setHistory(response.data.data)
    })

}
  return (
    <View>
      {history && history.length>0 && history.map((item,index)=>{
        const containerStyle = AlternativeColor.getBackgroundColor(index)

         return(
          <TouchableOpacity  style={[styles.historyContainer, containerStyle]} >
            <View style={[styles.leadContainer]}>
          <View style={styles.user}>
          <View style={styles.cardAlign}>
            <UserCard firstName={item.first_name}  lastName = {item.last_name} size={20} image ={item.media_url}/>
          </View>
          </View>
           <View style={styles.cardDate}>
           <DateText date={item.updatedAt} />
         </View>
         <View>
        {item.message && item.message.length > 0 && item.message.map((item, index) => (
       <Text style={styles.cardDate} key={index}>{item}</Text>
))}
        </View>
         </View>
         </TouchableOpacity>

         )
        
      })}

</View>
  );
};

export default HistoryList;


