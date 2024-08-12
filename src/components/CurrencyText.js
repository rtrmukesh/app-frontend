import React from "react";
import { StyleSheet, Text } from 'react-native';
import Currency from "../lib/Currency";
import { Color } from "../helper/Color";
const CurrencyText = (props) => {
    const { amount,mrp } = props
    return (
        <Text style={[styles.currency,{color : mrp ? Color.GREY : Color.BLACK}]}> {Currency.IndianFormat(amount)}</Text>
    )
}
export default CurrencyText
const styles = StyleSheet.create({
    currency :{
        fontSize: 14,
       fontWeight: "bold"
},
})
