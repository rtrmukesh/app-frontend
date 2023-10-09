import React, { useState, useRef } from "react";
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import Swiper from 'react-native-swiper';
import { Color } from "../helper/Color";
import { Video } from "expo-av";
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for play and pause icons
import styles from "../helper/Styles";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VideoCard = (props) => {
  const { mediaData } = props;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideoPlayback = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.replayAsync(); // Seek the video to the beginning and play again
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isVideoURL = (url) => {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    const fileExtension = url.slice(url.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(fileExtension);
  };

  return (
    <View style={[styles.containerVideo,{ height: windowHeight,}]}>
      <Swiper
        key={mediaData.length}
        index={10}
        loop={false}
        containerStyle={[styles.swiperContainer]}
      >
        {mediaData.map((item, index) => {
          return (
            <View key={index}>
              {isVideoURL(item.name) ? (
                <TouchableOpacity onPress={toggleVideoPlayback}>
                  <Video
                    ref={videoRef}
                    source={{ uri: item.url }}
                    style={[styles.video, { width: windowWidth, height: windowHeight }]}
                    resizeMode="contain"
                    shouldPlay={isPlaying}
                    isMuted={false}
                  />
                  <View style={styles.videoOverlay}>
                    <TouchableOpacity onPress={toggleVideoPlayback}>
                      <FontAwesome
                        name={isPlaying ? "" : !isPlaying && 'play'}
                        size={36}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ) : (
                <Image
                  source={{ uri: item.url }}
                  style={[styles.video, { width: windowWidth, height: windowHeight }]}
                />
              )}
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};


export default VideoCard;
