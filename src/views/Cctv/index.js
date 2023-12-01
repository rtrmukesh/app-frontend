// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import QRCodeScanner from "../../components/QrCodeScanner-me";
import VideoPlayer from "../../components/VideoPlayer-me";

const CCTVPage = () => {
  const [cameraStreamURL, setCameraStreamURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQRCodeScanned = (data) => {
    console.log('data >>>----------------------------->', data);
    // Assuming the QR code contains the camera stream URL
    setCameraStreamURL(data);
    Alert.alert('Camera Switched', 'Live camera feed updated!');
  };

  useEffect(() => {
    // You can add additional logic or cleanup here if needed
    return () => {
      // Cleanup logic (if any)
    };
  }, [cameraStreamURL]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : cameraStreamURL ? (
        <VideoPlayer streamURL={cameraStreamURL} />
      ) : (
        <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CCTVPage;
