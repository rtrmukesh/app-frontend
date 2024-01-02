import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraExample = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      await savePhotoToLibrary(photo.uri);
    }
  };

  const savePhotoToLibrary = async (uri) => {
    await MediaLibrary.saveToLibraryAsync(uri);
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null ? (
        <Button title="Request Camera Permission" onPress={() => setHasPermission('granted')} />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
            <Button title="Take Picture" onPress={takePicture} />
          </Camera>
          <Button title="Toggle Camera" onPress={toggleCameraType} />
          {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default CameraExample;
