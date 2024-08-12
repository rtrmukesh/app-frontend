import React from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../helper/Styles";


const TransferField = (props)=>{
    const {label,onPress,disabled} = props
    return(
        <TouchableOpacity onPress= { onPress} style={styles.containers}>
        <View style={styles.transferView}>
            <Text style={styles.transferText}>{label}</Text>

            <View style={styles.view}>

              {disabled && <MaterialIcons name="chevron-right" size={30} color="gray" /> }
            </View>
        </View>
    </TouchableOpacity>
    )
}
export default TransferField