import React from "react";
import UserAvatar from "react-native-user-avatar";
import { Color } from "../helper/Color";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getFullName } from "../lib/Format";
import styles from "../helper/Styles";

const UserCard = (props) => {
  const {
    image,
    size,
    firstName,
    lastName,
    mobileNumber,
    email,
    username,
    style,
    onPress,
    avatarStyle,
    text,
    name
  } = props;
  let fullName = getFullName(firstName, lastName);

  const show = props.showFullName !== undefined ? props.showFullName : true;

  return (
    <TouchableOpacity onPress={onPress} >
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
          {email && <Text style={styles.infoText}>{email}</Text>}
          {mobileNumber && <Text style={styles.infoText}>{mobileNumber}</Text>}
          {username && <Text style={styles.infoText}>{username}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;


