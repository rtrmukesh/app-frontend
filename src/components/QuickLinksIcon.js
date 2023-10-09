import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Color } from '../helper/Color';

const QuickLinksIcon = ({ iconName, label,label1, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.icon}>
      <FontAwesome5 name={iconName} size={30} color={Color.INDIGO} />
      </View>
      <Text style={styles.iconName}>{label}</Text>
      {label1 && (
      <Text style={styles.iconName1}>{label1}</Text>
      )}

    </TouchableOpacity>
  );
};

export default QuickLinksIcon;
const styles = StyleSheet.create({
    icon:{
        marginLeft:12
    },
    iconName: {
        marginTop: 5,
        fontSize: 10,
        marginRight:15,
        fontWeight: 'bold',
        color: Color.RED,
    },
    iconName1 :{
      marginBottom:-12,
      fontSize: 10,
      marginRight:15,
      fontWeight: 'bold',
      color: Color.RED,
    },

});

