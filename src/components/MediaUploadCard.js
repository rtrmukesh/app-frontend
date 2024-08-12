import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Color } from "../helper/Color";
import style from "../helper/Styles";
import Swiper from "react-native-swiper"; // Import the swiper component

const MediaUploadCard = (props) => {
  const { mediaData, onUploadIconPress, size, isOrder ,onPressDelete} = props;

  return (
    <View style={styles.container}>
      {mediaData && mediaData.length > 0 ? (
        <Swiper style={styles.swiper} key={mediaData.length} showsPagination={false}>
          {mediaData.map((media, index) => (
            <>
            <View key={index} style={[styles.slideContainer ]}>
                <Image source={{ uri: media.url }} style={style.defaultImage} />
            </View>
            {onPressDelete &&
            <View style={styles.deleteContainer}>
                <TouchableOpacity onPress={() => onPressDelete(index)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
}
                </>
          ))}
        </Swiper>
      ) : (
        <TouchableOpacity >
        <Text onPress={onUploadIconPress} style={{color:"blue",fontWeight:"bold", fontSize:20 }}>+ Add</Text>
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
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  deleteContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    top:30,
    backgroundColor:"white"
  },
  delete: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    flex:1
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default MediaUploadCard;
