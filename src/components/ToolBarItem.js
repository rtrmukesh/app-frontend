import React from 'react';
import { Color } from '../helper/Color';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from 'react-native';
import styles from '../helper/Styles';

const ToolBarItem =(props)=>{
    const {icon,selected,label,onPress} = props 

    return(
           <TouchableOpacity onPress={onPress} style={{marginRight:42}}>
                    <View style={styles.marginAlign}>
                        <FontAwesome5
                            name={icon}
                             size={28}
                             style={{paddingVertical:8}}
                            color={selected ? Color.BLUE : Color.TOOL_BAR}
                        />
                        <Text style={styles.iconName}>{label}</Text>
                    </View>
                </TouchableOpacity>
    )
}
export default ToolBarItem;

