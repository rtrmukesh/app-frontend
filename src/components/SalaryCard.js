import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { Color } from "../helper/Color";
import styles from "../helper/Styles";
import Currency from "../lib/Currency";
import { getFullName } from "../lib/Format";


const SalaryCard = (props) => {
  const {
    image,
    size,
    firstName,
    lastName,
    startDate,
    style,
    onPress,
    avatarStyle,
    text,
    name,
    onLongPress,
    amount,
    endDate
  } = props;


  let fullName = getFullName(firstName, lastName);

  const show = props.showFullName !== undefined ? props.showFullName : true;

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} >
      <View style={style ? style : styles.assigneeRow}>
        <View style={styles.alignment}>
          {image ? (
            <Image source={{ uri: image }} style={avatarStyle ? avatarStyle : styles.source} />
          ) : (
            <UserAvatar
              size={size ? size : 20}
              name={fullName}
              bgColor={Color.PRIMARY}
            />
          )}

        </View>
        <View style={styles.infoContainers}>
          {show && <Text style={text ? styles.textName : name ? styles.userName : styles.nameText}>{fullName}</Text>}
          <Text>{`${startDate} To ${endDate}`}</Text>
          <Text style={styles.infoText}>{Currency.IndianFormat(amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SalaryCard;


