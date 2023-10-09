import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { Color } from "../helper/Color";
import style from "../helper/Styles";
import Swiper from "react-native-swiper"; // Import the swiper component

const MediaUploadCard = (props) => {
  const { mediaData, onUploadIconPress } = props;

  return (
    <View style={styles.container}>
      {mediaData && mediaData.length > 0 ? (
        <Swiper style={styles.swiper}   key={mediaData.length}
        >
          {mediaData.map((media, index) => (
            <View key={index} style={styles.slide}>
             <TouchableOpacity onPress={onUploadIconPress}>
                <Image source={{ uri: media.url }} style={style.defaultImage} />
              </TouchableOpacity>

            </View>
          ))}
        </Swiper>
      ) : (
        <TouchableOpacity onPress={onUploadIconPress}>
          <IconButton
            icon="cloud-upload"
            size={90}
            color="black"
            style={style.cameraColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    height: 300, // Adjust the height as needed
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default MediaUploadCard;
