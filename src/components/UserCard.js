import React, { useEffect, useState } from "react";
import UserAvatar from "react-native-user-avatar";
import { Color } from "../helper/Color";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getFullName } from "../lib/Format";
import styles from "../helper/Styles";
import { Linking } from 'react-native';
import DateText from "./DateText";
import DateTime from "../lib/DateTime";


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
    name,
    phoneNumber,
    last_loggedIn_At,
    onLongPress,
    lastSynced
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
              bgColor={Color.AVATAR_BACKGROUND}
            />
          )}

        </View>
        <View style={styles.infoContainers}>
          {show && <Text style={text ? styles.textName : name ? styles.userName : styles.nameText}>{fullName}</Text>}
          {email && <Text style={styles.infoText}>{email}</Text>}
          {mobileNumber && <Text style={styles.infoText}>{mobileNumber}</Text>}
          {last_loggedIn_At && <><View style={styles?.direction}><Text>Last Logged In : </Text><DateText date={(last_loggedIn_At)} /></View></>}
          {lastSynced && <><View style={styles?.direction}><Text>Last Synced At : </Text><DateText date={DateTime.formatedDate(lastSynced)} /></View></>}

          {phoneNumber && <Text style={styles.infoText} onPress={() => {
            Linking.openURL(`tel:${phoneNumber}`);
          }}
          >
            {phoneNumber}
          </Text>}
          {username && <Text style={styles.infoText}>{username}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;


