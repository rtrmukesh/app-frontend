// VideoPlayer.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ streamURL }) => {
    console.log('streamURL >>>----------------------------->',streamURL);
  if (!streamURL) {
    return (
      <View style={styles.container}>
        <Text>No camera stream URL provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: streamURL }}
        style={styles.video}
        controls={true}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;
